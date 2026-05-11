import { useContext, useMemo, useRef, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";



// Milestone 5: costante contiene i simboli non permessi nel titolo.
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";



function AddTask() {
  // Milestone 6: pagina addTask usa il contesto per creare una nuova task.
  const { addTask } = useContext(GlobalContext);

  // Milestone 5: il titolo è un campo controllato gestito con useState.
  const [title, setTitle] = useState("");

  // Milestone 5: descrizione e stato sono campi non controllati gestiti con useRef.
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);

  // function validateTitle(value) {
  //   if (value.trim() === "") {
  //     setTitleError("Task name is required.")
  //     return false
  //   }
  //
  //   for (let i = 0; i < value.length; i += 1) {
  //     if (symbols.includes(value[i])) {
  //       setTitleError("Task name cannot contain special symbols.")
  //       return false
  //     }
  //   }
  //
  //   setTitleError("")
  //   return true
  // }


  // Milestone 5: controllo calcola l'errore del titolo senza salvare stato extra.
  const titleError = useMemo(() => {
    if (!title.trim()) {
      return "Task name is required.";
    }

    if ([...title].some((char) => symbols.includes(char))) {
      return "Task name cannot contain special symbols.";
    }

    return "";
  }, [title]);
  

  // Milestone 6:  submit valida, invia la task e resetta il form se va tutto bene.
  async function handleSubmit(event) {
    event.preventDefault();

    if (titleError) {
      return;
    };

    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    }

    try {
      await addTask(newTask);// se addTask lancia un errore, il codice si ferma qui e passa al catch
      alert("Task created successfully.");
      setTitle("");// reset titolo controllato
      descriptionRef.current.value = "";// reset descrizione non controllata
      statusRef.current.value = "To do";//reset stato non controllato
    } catch (error) {
      alert(error.message);
    }
  }





  return (
    <div className="add-task-container">
      <h1>Add Task</h1>

      <form className="add-task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Name</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        {titleError && <p className="form-error">{titleError}</p>}

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" ref={descriptionRef}></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" ref={statusRef} defaultValue="To do">
            
            {["To do", "Doing", "Done"].map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}

            {/* <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option> */}
          </select>
        </div>

        <div className="submit-container">
          <button type="submit" disabled={Boolean(titleError)}>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
