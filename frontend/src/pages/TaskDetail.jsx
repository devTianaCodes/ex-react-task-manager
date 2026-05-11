import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";


function TaskDetail() {

  // Milestone 7: pagina dettaglio legge l'id dai parametri della rotta.
  const { id } = useParams();

  // Milestone 8: navigate reindirizza alla lista dopo l'eliminazione.
  const navigate = useNavigate();

  // Milestone 8: contesto espone task e funzione removeTask.
  const { tasks, removeTask } = useContext(GlobalContext);

  const task = tasks.find((currentTask) => currentTask.id === Number(id));

  if (!task) {
    return <h1>Task not found</h1>;
  }

  // Milestone 8: handleDelete elimina la task, mostra un alert e torna alla lista.
  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task deleted successfully.");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
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
