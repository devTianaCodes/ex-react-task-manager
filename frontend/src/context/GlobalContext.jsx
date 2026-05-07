import { createContext, useState } from 'react'

const GlobalContext = createContext()

function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([])

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalProvider }
