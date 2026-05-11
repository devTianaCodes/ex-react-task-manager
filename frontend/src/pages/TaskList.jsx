import { useContext } from "react";
import TaskRow from "../components/TaskRow";
import { GlobalContext } from "../context/GlobalContext";



function TaskList() {
  // Milestone 3: questa pagina legge i task dal contesto globale.
  const { tasks } = useContext(GlobalContext);

  return (
    <div className="task-list-container">
      <h1>Task List</h1>
      {/* Milestone 3: tabella connome, stato e data di creazione. */}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>

          {/* Milestone 3: ogni riga è delegata a TaskRow per separare il rendering. */}

          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
