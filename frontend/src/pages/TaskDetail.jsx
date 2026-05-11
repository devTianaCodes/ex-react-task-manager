import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";


function TaskDetail() {
  // Milestone 7: pagina dettaglio legge l'id dai parametri della rotta.
  const { id } = useParams();
  const { tasks } = useContext(GlobalContext);

  const task = tasks.find((currentTask) => currentTask.id === Number(id));

  if (!task) {
    return <h1>Task not found</h1>;
  }

  const handleDelete = () => {
    console.log("Elimino task: ", task.id);
  };

  return (
    <div>
      <h1>{task.title}</h1>
      <p>Description: {task.description}</p>
      <p>Status: {task.status}</p>
      <p>Created At: {new Date(task.createdAt).toLocaleDateString()}</p>
      <button type="button" onClick={handleDelete}>
        Delete Task
      </button>
    </div>
  );
}

export default TaskDetail;
