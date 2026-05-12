import { useRef, useState } from "react";
import Modal from "./Modal";



function EditTaskModal({ show, onClose, task, onSave }) {
  // Milestone 10: ref collega il form alla conferma della modale con requestSubmit.
  const editFormRef = useRef(null);

  // Milestone 10: stato locale raccoglie tutti i campi modificabili della task.
  const [editedTask, setEditedTask] = useState(task);

  // Milestone 10: changeEditedTask aggiorna il campo modificato dentro editedTask.
  const changeEditedTask = (key, event) => {
    setEditedTask((previousTask) => ({
      ...previousTask,
      [key]: event.target.value,
    }));
  };

  const { title, description, status } = editedTask;

  // Milestone 10: submit invia onSave con la task aggiornata.
  const handleSubmit = (event) => {
    event.preventDefault();

    onSave(editedTask);
  };

  // Milestone 10: conferma della modale attiva il submit del form interno.
  const handleConfirm = () => {
    editFormRef.current.requestSubmit();
  };

  const formContent = (
    <form ref={editFormRef} onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="edit-title">Task Name</label>
        <input
          id="edit-title"
          type="text"
          value={title}
          onChange={(event) => changeEditedTask("title", event)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="edit-description">Description</label>
        <textarea
          id="edit-description"
          value={description}
          onChange={(event) => changeEditedTask("description", event)}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="edit-status">Status</label>
        <select
          id="edit-status"
          value={status}
          onChange={(event) => changeEditedTask("status", event)}
        >
          {["To do", "Doing", "Done"].map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </form>
  );

  return (
    <Modal
      title="Modifica Task"
      content={formContent}
      show={show}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmText="Salva"
    />
  );
}

export default EditTaskModal;
