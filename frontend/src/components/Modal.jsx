import ReactDOM from "react-dom";

function Modal({
  title, //il titolo della modale
  content, //il contenuto della modale
  show,//stato booleano per mostrare o nascondere la modale.
  onClose, //callback per chiudere la modale senza confermare
  onConfirm,//callback per eseguire l'azione quando si conferma
  confirmText = "Conferma",
}) {
  // Milestone 9: show controlla se la modale deve essere visibile o nascosta.
  if (!show) {
    return null;
  }

  // Milestone 9: createPortal rende la modale indipendente dal flusso della pagina.
  return ReactDOM.createPortal( //oppure destrutturato dall import
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          minWidth: "320px",
        }}
      >
        <h2>{title}</h2>
        <div>{content}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          {/* Milestone 9: pulsante Annulla chiude la modale senza confermare. */}
          <button type="button" onClick={onClose}>
            Annulla
          </button>
          
          {/* Milestone 9: pulsante Conferma esegue l'azione ricevuta nelle props. */}
          <button type="button" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
