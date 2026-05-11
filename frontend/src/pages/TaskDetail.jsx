import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";


// TaskDetail component to display details of a specific task
function TaskDetail() {
  const { id } = useParams();// Get the task ID from the URL parameters
  const { tasks } = useContext(GlobalContext);// Access the tasks from the global context 

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
