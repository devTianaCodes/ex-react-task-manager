import { createContext } from 'react'
import useTasks from '../hooks/useTasks'

const GlobalContext = createContext()

function GlobalProvider({ children }) {
  const { tasks, addTask, removeTask, updateTask } = useTasks()

  return (
    <GlobalContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalProvider }
