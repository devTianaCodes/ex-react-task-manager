import { useContext, useState } from "react";
import EditTaskModal from "../components/EditTaskModal";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { GlobalContext } from "../context/GlobalContext";



function TaskDetail() {

  // Milestone 7: pagina dettaglio legge l'id dai parametri della rotta.
  const { id } = useParams();

  // Milestone 8: navigate reindirizza alla lista dopo l'eliminazione.
  const navigate = useNavigate();

  // Milestone 8: contesto espone task e funzione removeTask.
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);
  
  // Milestone 9: stato booleano controlla l'apertura della modale di conferma.
  const [showModal, setShowModal] = useState(false);

  // Milestone 10: stato booleano controlla l'apertura della modale di modifica.
  const [showEditModal, setShowEditModal] = useState(false);



  const task = tasks.find((currentTask) => currentTask.id === parseInt(id));

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

  // Milestone 10: click sul bottone apre la modale di modifica.
  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  // Milestone 10: funzione chiude la modale di modifica senza salvare.
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  // Milestone 10: handleSave aggiorna la task, mostra un alert e chiude la modale.
  const handleSave = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      alert("Task updated successfully.");
      setShowEditModal(false);
    } catch (error) {
      alert(error.message);
    }
  };


  
  return (
    <div>
      <h1>{task.title}</h1>
      <p>Description: {task.description}</p>
      <p>Status: {task.status}</p>
      <p>Created At: {new Date(task.createdAt).toLocaleDateString()}</p> 
      {/*toLocaleDateString converte la data in un formato leggibile.*/}

      <button type="button" onClick={handleOpenEditModal}>
        Edit Task
      </button>
      
      <button type="button" onClick={handleOpenModal}>
        Delete Task
      </button>

      <EditTaskModal
        show={showEditModal}
        onClose={handleCloseEditModal}
        task={task}
        onSave={handleSave}
      />
      
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

// 📌 Milestone 7 - Creazione della Pagina Dettaglio Task

// Creare la pagina TaskDetail.jsx, che visualizza i dettagli di un task

//     1.Aggiornare TaskRow.jsx
//         Rendere il title un link a /task/:id, in modo che cliccando sul nome del task si venga reindirizzati alla pagina di dettaglio
//     2.Aggiornare App.jsx per aggiungere la rotta TaskDetail.jsx
//         Aggiungere la rotta /task/:id che caricherà il componente TaskDetail.jsx.
//     3.Creare TaskDetail.jsx per mostrare:
//         Nome (title) 
//         Descrizione (description)
//         Stato (status)
//         Data di creazione (createdAt)
//         Un bottone "Elimina Task", che per ora stampa solo "Elimino task" in console.




// 📌 Milestone 8 - Funzione di Eliminazione Task (DELETE)

// Aggiungere la funzionalità di eliminazione di un task con una chiamata API e aggiornare lo stato.

//     2.Gestire l'eliminazione della task in TaskDetail.jsx:
//         Al click su "Elimina Task", chiamare removeTask passando l'id del task.
//         Se la funzione esegue correttamente l'operazione:
//             Mostrare un alert di conferma dell’avvenuta eliminazione.
//             Reindirizzare l’utente alla lista dei task (/).
//         Se la funzione lancia un errore:
//             Mostrare un alert con il messaggio di errore ricevuto.
