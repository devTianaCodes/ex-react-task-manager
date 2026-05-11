import { useEffect, useState } from "react"

function useTasks() {
  const [tasks, setTasks] = useState([])
  const VITE_API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error))
  }, [VITE_API_URL])

  const addTask = async (newTask) => {
    const response = await fetch(`${VITE_API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })

    const { success, message, task } = await response.json()

    if (!success) {
      throw new Error(message)
    }

    setTasks((previousTasks) => [...previousTasks, task])
  }

  const removeTask = () => {}

  const updateTask = () => {}

  return { tasks, addTask, removeTask, updateTask }
}

export default useTasks
