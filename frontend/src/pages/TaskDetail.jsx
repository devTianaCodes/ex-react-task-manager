import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { GlobalContext } from "../context/GlobalContext";




function TaskDetail() {

  // Milestone 7: pagina dettaglio legge l'id dai parametri della rotta.
  const { id } = useParams();

  // Milestone 8: navigate reindirizza alla lista dopo l'eliminazione.
  const navigate = useNavigate();

  // Milestone 8: contesto espone task e funzione removeTask.
  const { tasks, removeTask } = useContext(GlobalContext);
  
  // Milestone 9: stato booleano controlla l'apertura della modale di conferma.
  const [showModal, setShowModal] = useState(false);

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

  // Milestone 9: click sul bottone apre la modale prima dell'eliminazione.
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Milestone 9: funzione chiude la modale senza eliminare la task.
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>{task.title}</h1>
      <p>Description: {task.description}</p>
      <p>Status: {task.status}</p>
      <p>Created At: {new Date(task.createdAt).toLocaleDateString()}</p>
      
      <button type="button" onClick={handleOpenModal}>
        Delete Task
      </button>
      
      <Modal
        title="Conferma eliminazione"
        content="Vuoi davvero eliminare questa task?"
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default TaskDetail;
