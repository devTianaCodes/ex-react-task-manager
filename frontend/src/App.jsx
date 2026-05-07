import { BrowserRouter, NavLink } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Task List</NavLink>
        <NavLink to="/add-task">Add Task</NavLink>
      </nav>
    </BrowserRouter>
  )
}

export default App
