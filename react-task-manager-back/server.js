import express from "express";
import fs from "fs/promises";
import {existsSync, readFileSync} from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "tasks.json");

const app = express();
const PORT = 3001;

// Middleware
app.use(
    morgan('dev', {
        skip: (req) => req.method === 'OPTIONS',
    })
);
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json({ limit: 'Infinity' }));

// **CACHE in memoria**
let tasksCache = [];

// **Sistema di locking per operazioni critiche**
let isOperationInProgress = false;
const pendingOperations = [];

// **Mutex per operazioni critiche**
const executeCriticalOperation = async (operation) => {
    return new Promise((resolve, reject) => {
        pendingOperations.push(async () => {
            try {
                const result = await operation();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
        
        if (!isOperationInProgress) {
            processPendingOperations();
        }
    });
};

const processPendingOperations = async () => {
    if (isOperationInProgress || pendingOperations.length === 0) return;
    
    isOperationInProgress = true;
    
    while (pendingOperations.length > 0) {
        const operation = pendingOperations.shift();
        await operation();
    }
    
    isOperationInProgress = false;
};

// **Coda per scritture asincrone**
const writeQueue = [];

// **Gestore della coda di scrittura**
const processWriteQueue = async () => {
    if (writeQueue.length === 0) return;
    const task = writeQueue.shift(); // Prende la prima operazione in coda
    await task(); // Esegue l'operazione
    if (writeQueue.length > 0) {
        setImmediate(processWriteQueue); // Continua con la prossima operazione
    }
};

// **Caricare i dati all'avvio**
const loadTasks = async () => {
    try {
        const data = await fs.readFile(DATA_FILE, "utf-8");
        tasksCache = JSON.parse(data);
        console.log("✅ Dati caricati in memoria.");
    } catch (error) {
        console.error("⚠️ Errore nel caricamento dei dati:", error);
        tasksCache = [];
    }
};

// **Salvare i dati nel file (usando la coda)**
const saveTasks = async () => {
    return new Promise((resolve, reject) => {
        writeQueue.push(async () => {
            try {
                await fs.writeFile(DATA_FILE, JSON.stringify(tasksCache, null, 2), "utf-8");
                console.log("✅ Dati salvati su file.");
                resolve();
            } catch (error) {
                console.error("⚠️ Errore nel salvataggio:", error);
                reject(error);
            }
        });
        if (writeQueue.length === 1) {
            processWriteQueue(); // Avvia la scrittura solo se la coda era vuota
        }
    });
};

// **Validazione del task**
const validateTask = (task) => {
    const errors = [];
    if (!task.title || typeof task.title !== "string" || task.title.trim() === "") {
        errors.push("Il campo 'title' è obbligatorio e deve essere una stringa non vuota.");
    }
    if (typeof task.description !== "string") {
        errors.push("Il campo 'description' deve essere una stringa.");
    }
    const validStatuses = ["To do", "Doing", "Done"];
    if (!validStatuses.includes(task.status)) {
        errors.push(`Il campo 'status' deve essere uno tra: ${validStatuses.join(", ")}.`);
    }
    return errors;
};

// 📌 **GET /tasks - Ottieni tutti i task**
app.get("/tasks", (req, res) => {
    res.json(tasksCache);
});

// 📌 **POST /tasks - Aggiungi un nuovo task**
app.post("/tasks", async (req, res) => {
    try {
        const result = await executeCriticalOperation(async () => {
            const newTask = req.body;
            
            // Validazione
            const errors = validateTask(newTask);
            if (errors.length > 0) {
                throw new Error(errors.join(" "));
            }

            // Creazione ID univoco
            newTask.id = tasksCache.length > 0 ? Math.max(...tasksCache.map((t) => t.id)) + 1 : 1;
            newTask.createdAt = new Date().toISOString();

            tasksCache.push(newTask);
            await saveTasks();

            return { success: true, task: newTask };
        });

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// 📌 **PUT /tasks/:id - Modifica un task**
app.put("/tasks/:id", async (req, res) => {
    try {
        const result = await executeCriticalOperation(async () => {
            const taskId = parseInt(req.params.id);
            const updatedTask = req.body;

            // Validazione
            const errors = validateTask(updatedTask);
            if (errors.length > 0) {
                throw new Error(errors.join(" "));
            }

            const taskIndex = tasksCache.findIndex((t) => t.id === taskId);
            if (taskIndex === -1) {
                throw new Error("Task non trovato.");
            }

            tasksCache[taskIndex] = { ...tasksCache[taskIndex], ...updatedTask };
            await saveTasks();

            return { success: true, task: tasksCache[taskIndex] };
        });

        res.json(result);
    } catch (error) {
        if (error.message === "Task non trovato.") {
            res.status(404).json({ success: false, message: error.message });
        } else {
            res.status(400).json({ success: false, message: error.message });
        }
    }
});

// 📌 **DELETE /tasks/:id - Elimina un task**
app.delete("/tasks/:id", async (req, res) => {
    try {
        const result = await executeCriticalOperation(async () => {
            const taskId = parseInt(req.params.id);

            const taskIndex = tasksCache.findIndex((task) => task.id === taskId);
            if (taskIndex === -1) {
                throw new Error("Task non trovato.");
            }

            tasksCache.splice(taskIndex, 1);
            await saveTasks();

            return { success: true };
        });

        res.json(result);
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
});

// **Se il file JSON non esiste, crearlo con dati iniziali**
if (!existsSync(DATA_FILE) || readFileSync(DATA_FILE, "utf-8").trim() === "") {
    console.log("⚡ File tasks.json non trovato o vuoto, creazione con dati iniziali...");
    
    const getRandomDateInLastWeek = () => {
        const now = new Date();
        const pastDate = new Date();
        pastDate.setDate(now.getDate() - Math.floor(Math.random() * 7));
        return pastDate.toISOString();
    };

    tasksCache = [
        { title: "Comprare il latte", description: "Supermercato sotto casa", status: "To do", id: 1, createdAt: getRandomDateInLastWeek() },
        { title: "Leggere un libro", description: "Capitolo 3", status: "To do", id: 2, createdAt: getRandomDateInLastWeek() },
        { title: "Chiamare il dottore", description: "Prenotare visita annuale", status: "To do", id: 3, createdAt: getRandomDateInLastWeek() },
        { title: "Completare progetto React", description: "Task Manager avanzato", status: "Doing", id: 4, createdAt: getRandomDateInLastWeek() },
        { title: "Scrivere articolo", description: "Nuovo post su blog tecnico", status: "Doing", id: 5, createdAt: getRandomDateInLastWeek() },
        { title: "Fare esercizio", description: "30 minuti di corsa", status: "Done", id: 6, createdAt: getRandomDateInLastWeek() }
    ];

    await saveTasks();
    console.log("✅ Dati iniziali creati con successo.");
}else{
    // 📌 **Caricamento dei dati iniziali all'avvio del server**
    await loadTasks();
}


// **Avvio del server**
app.listen(PORT, () => {
    console.log(`✅ Server in ascolto su http://localhost:${PORT}`);
});
