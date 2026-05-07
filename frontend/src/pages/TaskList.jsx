import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

function TaskList() {
  const { tasks } = useContext(GlobalContext)

  return (
    <div>
      <h1>Task List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{task.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskList
