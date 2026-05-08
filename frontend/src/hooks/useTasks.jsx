import { useEffect, useState } from 'react'

function useTasks() {
  const [tasks, setTasks] = useState([])

  function addTask() {}

  function removeTask() {}

  function updateTask() {}

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setTasks(data)
      })
  }, [])

  return { tasks, addTask, removeTask, updateTask }
}

export default useTasks
