import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";
import TaskList from "./pages/TaskList";
import "./App.css";


function App() {


  return (

    <GlobalProvider>

      {/* Milestone 1: aggiunto BrowserRouter per gestire la navigazione principale tra le pagine. */}
      
      <BrowserRouter>
        <div className="app-container">
          
          {/* Milestone 1: aggiunto la navbar che usa NavLink per spostarsi tra lista e form. */}
          
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

          {/* Milestone 1: le rotte collegano ogni URL alla sua pagina. */}
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskDetail />} />
          </Routes>
        </div>

      </BrowserRouter>
      
    </GlobalProvider>
  );
}

export default App;


// Milestone 1 - Setup e Routing

//...
//     Aggiungere una barra di navigazione con NavLink, per permettere all'utente di spostarsi tra le pagine.

//     Definire le rotte con Routes e Route, associando ogni percorso alla rispettiva pagina.
