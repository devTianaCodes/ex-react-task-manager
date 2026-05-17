import { memo } from "react";
import { Link } from "react-router-dom";


// Milestone 3: con React.memo si evita render inutili della singola riga.
const TaskRow = memo(({ task }) => {
  let statusColor = "";

  if (task.status === "To do") {
    statusColor = "#f7c8c8";
  } else if (task.status === "Doing") {
    statusColor = "#f8edb8";
  } else if (task.status === "Done") {
    statusColor = "#cfeccf";
  }

  return (
    <tr>
      <td>
        // Milestone 7: title è un link alla pagina di dettaglio del task.
        //useParameters legge l'id dalla rotta, Link crea un link alla rotta con l'id del task.
        <Link to={`/task/${task.id}`}>{task.title}</Link> 
      </td>
      <td style={{ backgroundColor: statusColor }}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;

//     Milestone 3:Creare un componente TaskRow.jsx, che rappresenta una singola riga della tabella e mostra solo le proprietà title, status e createdAt (escludendo description).

//     Applicare uno stile differente alla colonna status, assegnando i seguenti colori di sfondo alle celle in base al valore dello stato:
//         "To do" → rosso
//         "Doing" → giallo
//         "Done" → verde

//     Utilizzare React.memo() su TaskRow.jsx per ottimizzare le prestazioni ed evitare render inutili.

