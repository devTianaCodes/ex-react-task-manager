import { useContext, useState } from "react";
import TaskRow from "../components/TaskRow";
import { GlobalContext } from "../context/GlobalContext";



function TaskList() {
  // Milestone 3: questa pagina legge i task dal contesto globale.
  const { tasks } = useContext(GlobalContext);
  // Milestone 11: stato salva il criterio corrente di ordinamento.
  const [sortBy, setSortBy] = useState("createdAt");
  // Milestone 11: stato salva la direzione corrente di ordinamento.
  const [sortOrder, setSortOrder] = useState(1);
  
  const sortIcon = sortOrder === 1 ? "↓" : "↑";

  // Milestone 11: click sull'intestazione cambia criterio o inverte la direzione.
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((previousOrder) => previousOrder * -1);
      return;
    }

    setSortBy(column);
    setSortOrder(1);
  };

  return (
    <div className="task-list-container">
      <h1>Task List</h1>
      {/* Milestone 3: tabella connome, stato e data di creazione. */}

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>
              Name {sortBy === "title" && sortIcon}
            </th>
            <th onClick={() => handleSort("status")}>
              Status {sortBy === "status" && sortIcon}
            </th>
            <th onClick={() => handleSort("createdAt")}>
              Creation Date {sortBy === "createdAt" && sortIcon}
            </th>
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
