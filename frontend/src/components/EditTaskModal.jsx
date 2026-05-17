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
      // aggiorna solo il campo specifico, mantenendo gli altri invariati
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



  return (
    <Modal

      title="Edit Task"
      content={
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
      }
      show={show}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmText="Save"
    />
  );
}

export default EditTaskModal;


// 📌 Milestone 10 - Modale e Funzione di Modifica Task (PUT)

// Creare una modale per modificare i dettagli di un task e aggiornare i dati tramite API.
 
//     Creare il componente EditTaskModal.jsx:
//         Deve accettare i seguenti props:
//             show (boolean): determina se la modale è visibile.
//             onClose (function): funzione per chiudere la modale.
//             task (object): oggetto che rappresenta il task da modificare.
//             onSave (function): funzione che viene chiamata al salvataggio con il task aggiornato.
//         Utilizzare il componente Modal per creare la modale di modifica, passandogli i seguenti valori:
//             title: "Modifica Task".
//             content: un form contenente i campi del task da modificare.
//             confirmText: "Salva".
//             onConfirm: deve attivare il submit del form.


//     💡 Importante:
//         Per attivare il submit del form, dobbiamo ottenere un riferimento diretto al form all'interno del componente. Creiamo una ref con useRef() e associamola al form.
//         Questo ci permette di chiamare il metodo editFormRef.current.requestSubmit() quando l'utente clicca su "Salva" nella modale, simulando il comportamento di un normale submit.

//         Strutturare il form all'interno della modale, includendo i seguenti campi:
//             Nome (title) → Input di testo controllato (useState).
//             Descrizione (description) → Textarea controllata (useState).
//             Stato (status) → Select controllata (useState) con opzioni "To do", "Doing", "Done".
//         L'onSubmit del form deve eseguire onSave, passandogli la task modificata.

