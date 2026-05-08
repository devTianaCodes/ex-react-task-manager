import { useRef, useState } from 'react'

function AddTask() {
  const [title, setTitle] = useState('')
  const descriptionRef = useRef(null)
  const statusRef = useRef(null)

  return (
    <div>
      <h1>Add Task</h1>

      <form>
        <div>
          <label htmlFor="title">Task Name</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

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
