import { useEffect, useState } from 'react'

function useTasks() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setTasks(data)
      })
  }, [])

  return { tasks, setTasks }
}

export default useTasks
