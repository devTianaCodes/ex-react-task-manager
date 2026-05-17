import { useContext, useMemo, useRef, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";


// 📌 Milestone 5 - Creazione del Form per Aggiungere un Task

// Creare un form per aggiungere un task, senza ancora inviare i dati all'API.

//     Aggiornare la pagina AddTask.jsx per contenere un form con i seguenti campi:
//         Nome del task (title) → Input controllato (useState).
//         Descrizione (description) → Textarea non controllata (useRef).
//         Stato (status) → Select non controllata (useRef), con opzioni "To do", "Doing", "Done", e valore predefinito "To do".

//     Validare il campo Nome (title):
//         Il campo non può essere vuoto.
//         Non può contenere simboli speciali.
//         Se il valore è errato, mostrare un messaggio di errore.
//         Utilizzare una costante con i caratteri vietati:

//     const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";

//     Gestione del Submit del Form:
//         Al click del bottone "Aggiungi Task", il form deve SOLO stampare in console l’oggetto task con i valori inseriti (NON deve ancora essere inviata la richiesta all’API).


const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";


function AddTask() {
  // pagina addTask usa il contesto per creare una nuova task.
  const { addTask } = useContext(GlobalContext);

  // titolo è un campo controllato gestito con useState.
  const [taskTitle, setTitle] = useState("");

  // descrizione e stato sono campi non controllati gestiti con useRef.
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);

  // function validateTitle(value) {
  //   if (value.trim() === "") {
  //     setTitleError("Task name is required.")
  //     return false
  //   }
  //
  //   for (let i = 0; i < value.length; i += 1) {
  //     if (symbols.includes(value[i])) {
  //       setTitleError("Task name cannot contain special symbols.")
  //       return false
  //     }
  //   }
  //
  //   setTitleError("")
  //   return true
  // }


  // controllo calcola l'errore del titolo senza salvare stato extra.
  const taskTitleError = useMemo(() => {
    if (!taskTitle.trim()) {
      return "Task name is required.";
    }

    if ([...taskTitle].some((char) => symbols.includes(char))) {
      return "Task name cannot contain special symbols.";
    }

    return "";
  }, [taskTitle]);
  

  // 📌 Milestone 6 - Integrazione dell'API per Aggiungere un Task (POST)

  //   2. Modificare la gestione del Submit del Form in AddTask.jsx:
  //       Eseguire la funzione addTask di useTasks(), passando l’oggetto con title, description e status.
  //       Se la funzione esegue correttamente l'operazione:
  //           Mostrare un alert di conferma dell’avvenuta creazione della task.
  //           Resettare il form.
  //       Se la funzione lancia un errore:
  //           Mostrare un alert con il messaggio di errore ricevuto.

  // submit valida, invia la task e resetta il form se va tutto bene o erore
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (taskTitleError) {
      return;
    };

    const newTask = {
      title: taskTitle.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    }

    try {
      await addTask(newTask);// se addTask lancia un errore, il codice si ferma qui e passa al catch
      alert("Task created successfully.");
      setTitle("");// reset titolo controllato
      descriptionRef.current.value = "";// reset descrizione non controllata
      statusRef.current.value = "To do";//reset stato non controllato
    } catch (error) {
      alert(error.message);
    }
  }





  return (
    <div className="add-task-container">
      <h1>Add Task</h1>

      <form className="add-task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Name</label>
          <input
            id="title"
            type="text"
            value={taskTitle}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        {taskTitleError && <p className="form-error">{taskTitleError}</p>}

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" ref={descriptionRef}></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" ref={statusRef} defaultValue="To do">
            
            {["To do", "Doing", "Done"].map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}

            {/* <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option> */}
          </select>
        </div>

          //bottone disabilitato se c'è un errore di validazione del titolo.
        <div className="submit-container">
          <button type="submit" disabled={Boolean(taskTitleError)}>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
} 

export default AddTask;
