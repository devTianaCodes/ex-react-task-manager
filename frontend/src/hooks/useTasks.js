import { useEffect, useState } from "react";



// Milestone 4: useTasks hook centralizza stato e operazioni dei task.
function useTasks() {

  // Milestone 4: lo stato locale salva la lista dei task.
  const [tasks, setTasks] = useState([]); //dependency array vuoto per eseguire l'effetto solo una volta al montaggio del componente
  
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  
  // Milestone 2: questo effetto recupera i task iniziali dall'API.
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


  // Milestone 4: funzioni placeholder per le prossime operazioni sui task.
  const removeTask = () => {};

  const updateTask = () => {};

  return { tasks, addTask, removeTask, updateTask };
}

export default useTasks;
