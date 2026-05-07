import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import AddTask from './pages/AddTask'
import TaskList from './pages/TaskList'

function App() {
  return (
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
  )
}

export default App
