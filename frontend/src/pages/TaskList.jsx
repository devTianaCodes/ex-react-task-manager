import { useContext } from 'react'
import TaskRow from '../components/TaskRow'
import { GlobalContext } from '../context/GlobalContext'

function TaskList() {
  const { tasks } = useContext(GlobalContext)

  return (
    <div className="task-list-container">
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
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskList
