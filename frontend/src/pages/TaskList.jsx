import { useCallback, useContext, useMemo, useState } from "react";
import TaskRow from "../components/TaskRow";
import { GlobalContext } from "../context/GlobalContext";



function TaskList() {
  // Milestone 3: questa pagina legge i task dal contesto globale.
  const { tasks } = useContext(GlobalContext);

  // Milestone 11: stato salva il criterio corrente di ordinamento.
  const [sortBy, setSortBy] = useState("createdAt");

  // Milestone 11: stato salva la direzione corrente di ordinamento.
  const [sortOrder, setSortOrder] = useState(1);

  // Milestone 12: stato salva il valore della ricerca digitata dall'utente.
  const [searchQuery, setSearchQuery] = useState("");
  
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

  

  // Milestone 12: useMemo filtra e ordina i task quando cambiano dati o criteri.
  const filteredAndSortedTasks = useMemo(() => {

    return [...tasks]
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((firstTask, secondTask) => {
        let comparison; // Variabile per memorizzare il risultato del confronto

        if (sortBy === "title") {
          comparison = firstTask.title.localeCompare(secondTask.title);
        } 
        else if (sortBy === "status") {
          const statusOptions = ["To do", "Doing", "Done"];
          const firstIndex = statusOptions.indexOf(firstTask.status);
          const secondIndex = statusOptions.indexOf(secondTask.status);
          comparison = firstIndex - secondIndex;
        } 
        else if (sortBy === "createdAt") {
          const firstDate = new Date(firstTask.createdAt).getTime();
          const secondDate = new Date(secondTask.createdAt).getTime();
          comparison = firstDate - secondDate;
        }

        return comparison * sortOrder;
      });

      
  }, [tasks, sortBy, sortOrder, searchQuery]);


  // Milestone 12: debounce ritarda l'aggiornamento della ricerca per migliorare le prestazioni.
  const debounce = useCallback((callback, delay) => {
    let timeoutId;

    return (value) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(value);
      }, delay);
    };
  }, []);

  // Milestone 12: funzione memorizzata aggiorna la ricerca con un piccolo ritardo.
  const debouncedSetSearchQuery = useCallback(
    debounce(setSearchQuery, 500),
    []
  );



  return (
    <div className="task-list-container">
      <h1 className="task-list-title">Task List</h1>
     

      {/* Milestone 12: input non controllato permette di cercare una task per nome. */}
      <input
        type="text"
        placeholder="Search task"
        onChange={(event) => debouncedSetSearchQuery(event.target.value)}
      />


      {/* Milestone 3: tabella connome, stato e data di creazione. */}
      <table className="task-table">
        <thead>
          <tr>
            <th
              className={sortBy === "title" ? "task-table-sort-active" : ""}
              onClick={() => handleSort("title")}
              style={{
                backgroundColor:
                  sortBy === "title" ? "#f7f1dd" : "#d9f0eb",
              }}
            >
              <span className="task-table-header-label">Name</span>
              <span className="task-table-sort-icon">
                {sortBy === "title" ? sortIcon : " "}
              </span>
            </th>
            <th
              className={sortBy === "status" ? "task-table-sort-active" : ""}
              onClick={() => handleSort("status")}
              style={{
                backgroundColor:
                  sortBy === "status" ? "#f7f1dd" : "#d9f0eb",
              }}
            >
              <span className="task-table-header-label">Status</span>
              <span className="task-table-sort-icon">
                {sortBy === "status" ? sortIcon : " "}
              </span>
            </th>
            <th
              className={sortBy === "createdAt" ? "task-table-sort-active" : ""}
              onClick={() => handleSort("createdAt")}
              style={{
                backgroundColor:
                  sortBy === "createdAt" ? "#f7f1dd" : "#d9f0eb",
              }}
            >
              <span className="task-table-header-label">Creation Date</span>
              <span className="task-table-sort-icon">
                {sortBy === "createdAt" ? sortIcon : " "}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>

          {/* Milestone 3: ogni riga è delegata a TaskRow per separare il rendering. */}

          {filteredAndSortedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
