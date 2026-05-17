import { useCallback, useContext, useMemo, useState } from "react";
import TaskRow from "../components/TaskRow";
import { GlobalContext } from "../context/GlobalContext";




function TaskList() {
  // Milestone 3:  legge i task dal contesto globale.
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

  

  // Milestone 11: useMemo ordina i task quando cambiano dati o criteri.
  const sortedTask = useMemo(() => {

    return [...tasks].sort((a, b) => {
        let comparison; // Variabile per memorizzare il risultato del confronto

        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title);
        } 

        else if (sortBy === "status") {
          const statusOptions = ["To do", "Doing", "Done"];
          const indexA = statusOptions.indexOf(a.status);
          const indexB = statusOptions.indexOf(b.status);
          comparison = indexA - indexB;
        } 

        else if (sortBy === "createdAt") {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          comparison = dateA - dateB;
        }

        return comparison * sortOrder;
      });

      
  }, [tasks, sortBy, sortOrder]);



  // Milestone 12: useMemo filtra i task ordinati quando cambia la ricerca.
  const filteredAndSortedTasks = useMemo(() => {

    return sortedTask.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  }, [sortedTask, searchQuery]);


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
        className="task-search-input"
        type="text"
        placeholder="Search task"
        onChange={(event) => debouncedSetSearchQuery(event.target.value)}
      />


      {/* Milestone 3: tabella connome, stato e data di creazione. */}
      <table className="task-table">
        <thead>
          <tr>
            <th
              className={sortBy === "title" ? "task-table-sort-active" : ""} //evidenzia colonna ordinamento attivo.
              onClick={() => handleSort("title")}// click cambia criterio o inverte direzione.
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



// 📌 Milestone 3 - Lista dei Task (Pagina)

// Visualizzare l'elenco dei task in una tabella e ottimizzare il rendering con React.memo().
//     Recuperare la lista dei task dal GlobalContext e mostrarla nella pagina TaskList.jsx.
//     Strutturare TaskList.jsx come una tabella, con le intestazioni Nome, Stato, Data di Creazione.



// 📌 Milestone 11 - Ordinamento delle Task

// Implementare un sistema di ordinamento nella tabella delle task, permettendo all'utente di ordinare i task in base a diversi criteri.

//     1 Aggiungere due state in TaskList.jsx:
//         sortBy: rappresenta il criterio di ordinamento (title, status, createdAt).
//         sortOrder: rappresenta la direzione (1 per crescente, -1 per decrescente).
//         Il default di sortBy è createdAt, il default di sortOrder, è 1.

//     2 Modificare la tabella per rendere cliccabili le intestazioni (th), in modo che al click:
//         Se la colonna è già selezionata (sortBy uguale alla colonna cliccata), invertire sortOrder.
//         Se la colonna è diversa, impostare sortBy sulla nuova colonna e sortOrder su 1.

//     3 Implementare la logica di ordinamento con useMemo(), in modo che l’array ordinato venga ricalcolato solo quando cambiano tasks, sortBy o sortOrder:
//         Ordinamento per title → alfabetico (localeCompare).
//         Ordinamento per status → ordine predefinito: "To do" < "Doing" < "Done".
//         Ordinamento per createdAt → confrontando il valore numerico della data (.getTime()).
//         Applicare sortOrder per definire se l’ordine è crescente o decrescente.




// 📌 Milestone 12 - Ricerca dei Task con Debounce

// Aggiungere un campo di ricerca che permette all’utente di filtrare i task in base al nome, ottimizzando le prestazioni con debounce.

//     1 Creare un input di ricerca controllato
//         Aggiungere un input di ricerca controllato in TaskList.jsx sopra la tabella, in modo che l’utente possa digitare per cercare un task.
//         Creare uno stato searchQuery (useState) per memorizzare il valore dell'input.

//     2 Modificare l'useMemo() per filtrare e ordinare i task
//         Applicare il filtraggio basato su searchQuery.
//         La ricerca deve essere case insensitive.
//         Ordinare i risultati in base ai criteri esistenti (es. nome, stato, data di creazione).

//     3 Aggiungere il debounce per migliorare le prestazioni

//         Creare una funzione debounce con setTimeout() per ritardare l’aggiornamento di searchQuery.
//         Usare useCallback() per memorizzare la funzione di debounce e prevenire inutili ricalcoli.


//         💡 Importante:
//             Il debounce non funziona bene sugli input controllati.
//             Rimuovere value dall’input, rendendolo non controllato, affinché il debounce possa funzionare correttamente.