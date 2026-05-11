import { memo } from "react";
import { Link } from "react-router-dom";



// Milestone 3: React.memo evita render inutili della singola riga.
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
        <Link to={`/task/${task.id}`}>{task.title}</Link>
      </td>
      <td style={{ backgroundColor: statusColor }}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
