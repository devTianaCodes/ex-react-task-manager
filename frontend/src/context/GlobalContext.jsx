import { createContext } from "react";
import useTasks from "../hooks/useTasks";


// global context condivide task e funzioni in tutta l'app.
const GlobalContext = createContext();

function GlobalProvider({ children }) {
  
  // Milestone 4: il provider espone i dati restituiti dal custom hook useTasks.
  const { tasks, addTask, removeTask, updateTask } = useTasks();

  return (
    <GlobalContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };

// Milestone 2 - Setup Context API e Fetch Iniziale

// Creare un contesto globale per la gestione dei dati e recuperare la lista dei task dall'API.

//     Salvare l'URL dell'API nel file .env del progetto frontend:
//         Creare un file .env nella cartella del progetto frontend e aggiungere lo URL della API raccolto alla Milestone 1.
//         In questo modo, l'URL sarà accessibile in tutto il progetto senza doverlo scrivere manualmente nel codice.
//     Creare un Context API (GlobalContext) per gestire lo stato globale dell'applicazione.
//     Definire uno useState all'interno del provider, per memorizzare la lista dei task.
//     Effettuare una richiesta GET a /tasks al caricamento dell'app, utilizzando useEffect, e salvare i dati nello stato.
//     Stampare in console i dati ricevuti per verificare il corretto recupero delle informazioni.
//     Rendere disponibile il GlobalContext.Provider in App.jsx, avvolgendo l'intera applicazione.

