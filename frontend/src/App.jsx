import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom"
import { GlobalProvider } from "./context/GlobalContext"
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"
import "./App.css"

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className="app-container">
          <nav className="main-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-button nav-button-active" : "nav-button"
              }
            >
              Task List
            </NavLink>
            <NavLink
              to="/add-task"
              className={({ isActive }) =>
                isActive ? "nav-button nav-button-active" : "nav-button"
              }
            >
              Add Task
            </NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add-task" element={<AddTask />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
