import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext'
import AddTask from './pages/AddTask'
import TaskList from './pages/TaskList'

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Task List</NavLink>
          <NavLink to="/add-task">Add Task</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
