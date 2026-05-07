import { createContext, useEffect, useState } from 'react'

const GlobalContext = createContext()

function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setTasks(data)
      })
  }, [])

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalProvider }
