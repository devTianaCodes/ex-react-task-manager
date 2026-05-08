import { useRef, useState } from 'react'

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~"

function AddTask() {
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')
  const descriptionRef = useRef(null)
  const statusRef = useRef(null)

  function validateTitle(value) {
    if (value.trim() === '') {
      setTitleError('Task name is required.')
      return false
    }

    for (let i = 0; i < value.length; i += 1) {
      if (symbols.includes(value[i])) {
        setTitleError('Task name cannot contain special symbols.')
        return false
      }
    }

    setTitleError('')
    return true
  }

  function handleSubmit(event) {
    event.preventDefault()

    const isTitleValid = validateTitle(title)

    if (!isTitleValid) {
      return
    }

    const newTask = {
      title,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    }

    console.log(newTask)
  }

  return (
    <div>
      <h1>Add Task</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Task Name</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => {
              const newTitle = event.target.value
              setTitle(newTitle)
              validateTitle(newTitle)
            }}
          />
        </div>
        {titleError && <p>{titleError}</p>}

        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" ref={descriptionRef}></textarea>
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select id="status" ref={statusRef} defaultValue="To do">
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  )
}

export default AddTask
