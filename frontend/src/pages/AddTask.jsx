import { useMemo, useRef, useState } from "react"

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~"

function AddTask() {
  const [title, setTitle] = useState("")
  const descriptionRef = useRef(null)
  const statusRef = useRef(null)

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

  const titleError = useMemo(() => {
    if (!title.trim()) {
      return "Task name is required."
    }

    if ([...title].some((char) => symbols.includes(char))) {
      return "Task name cannot contain special symbols."
    }

    return ""
  }, [title])

  function handleSubmit(event) {
    event.preventDefault()

    if (titleError) {
      return;
    }

    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    }

    console.log(newTask)
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
          <button type="submit" disabled={!titleError}>
            Add Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTask
