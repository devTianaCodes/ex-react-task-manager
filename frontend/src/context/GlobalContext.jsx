import { createContext } from "react";
import useTasks from "../hooks/useTasks";



// Milestone 2: global context condivide task e funzioni in tutta l'app.
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
