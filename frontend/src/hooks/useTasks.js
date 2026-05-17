import { useEffect, useState } from "react";

// //Milestone 4 - Creazione del Custom Hook useTasks() (GET)

// Creare un custom hook per centralizzare la gestione dei task e semplificare l'accesso ai dati.

//     Creare un hook useTasks() che recupera i task iniziali con una richiesta GET a /tasks e li memorizza in uno stato locale (useState).

//     Definire le funzioni addTask, removeTask, updateTask all'interno di useTasks(), lasciandole vuote per ora.

//     Rendere disponibili le funzioni e la lista dei task restituendole come valore dell'hook.

//     Integrare useTasks() nel GlobalContext, in modo che tutti i componenti possano accedere ai task e alle funzioni di gestione.


function useTasks() {  //useTasks hook centralizza stato e operazioni dei task.

  // stato locale salva la lista dei task.
  const [tasks, setTasks] = useState([]); //dependency array vuoto per eseguire l'effetto solo una volta al montaggio del componente
  
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  
  // Milestone 2 migrato da globalContext questo effetto recupera i task iniziali dall'API.
  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, [VITE_API_URL]);



  // Milestone 6:  funzione addTask  invia una POST e aggiorna lo stato se la creazione riesce.
  const addTask = async (newTask) => {
    const response = await fetch(`${VITE_API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const { success, message, task } = await response.json();

    if (!success) {
      throw new Error(message);
    }

    setTasks((previousTasks) => [...previousTasks, task]);
  };


  // Milestone 8: removeTask invia una DELETE e aggiorna lo stato se l'eliminazione riesce.
  const removeTask = async (taskId) => {
    const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
      method: "DELETE",
    }); // Invia una richiesta DELETE all'API per eliminare il task con l'id specificato

    const { success, message } = await response.json();
    // Attende la risposta e la converte in formato JSON

    if (!success) {
      throw new Error(message);
    }

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)// Rimuove il task eliminato dallo stato locale dall array
    );
  };



  // Milestone 10: updateTask invia una PUT e aggiorna lo stato se la modifica riesce.
  const updateTask = async (updatedTask) => {
    const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const { success, message, task } = await response.json();

    if (!success) {
      throw new Error(message);
    }

    setTasks((previousTasks) =>
      previousTasks.map((currentTask) =>
        currentTask.id === task.id ? task : currentTask 
    // Aggiorna il task modificato nello stato locale
      )
    );
  };

  return { tasks, addTask, removeTask, updateTask };
}

export default useTasks;
