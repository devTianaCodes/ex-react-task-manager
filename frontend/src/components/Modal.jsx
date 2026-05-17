import ReactDOM from "react-dom";
import "./Modal.css";



function Modal({

  title, //il titolo della modale
  content, //il contenuto della modale
  show,//stato booleano per mostrare o nascondere la modale.
  onClose, //callback per chiudere la modale senza confermare
  onConfirm,//callback per eseguire l'azione quando si conferma
  confirmText = "Confirm",

}) {

  
  // Milestone 9: show controlla se la modale deve essere visibile o nascosta.
  if (!show) {
    return null;
  }

  // Milestone 9: createPortal rende la modale indipendente dal flusso della pagina.
  return ReactDOM.createPortal( //oppure destrutturato dall import
    
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>{title}</h2>
        <div>{content}</div>
        <div className="modal-actions">
          
          {/* pulsante Annulla chiude la modale senza confermare. */}
          <button
            className="modal-cancel-button"
            type="button"
            onClick={onClose}
          >
            X Cancel
          </button>

          {/* Conferma esegue l'azione ricevuta nelle props. */}
          <button
            className="modal-confirm-button"
            type="button"
            onClick={onConfirm}
          >
            V {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;

// 📌 Milestone 9 - Componente Modal e Conferma Eliminazione Task

// Creare un componente Modal riutilizzabile e utilizzarlo per confermare l’eliminazione di un task.

//     1.Creare il componente Modal.jsx, che deve:
//         Accettare i seguenti props:
//             title: il titolo della modale.
//             content: il contenuto principale della modale.
//             show: stato booleano per mostrare o nascondere la modale.
//             onClose: funzione per chiudere la modale.
//             onConfirm: funzione eseguita al click del bottone di conferma.
//             confirmText (opzionale, default "Conferma"): testo del bottone di conferma.
//         Utilizzare ReactDOM.createPortal per rendere la modale indipendente dal flusso di rendering.
//         Implementare i pulsanti "Annulla" (chiude la modale) e "Conferma" (esegue onConfirm).

//     2.Integrare il componente Modal in TaskDetail.jsx per confermare l'eliminazione:
//         Quando l’utente clicca su "Elimina Task", deve aprirsi la modale di conferma.
//         Se l’utente conferma, vengono eseguite le stesse operazioni della Milestone 8.
