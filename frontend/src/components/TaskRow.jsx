import { memo } from 'react'

const TaskRow = memo(({ task }) => {
  let statusColor = ''

  if (task.status === 'To do') {
    statusColor = '#f7c8c8'
  } else if (task.status === 'Doing') {
    statusColor = '#f8edb8'
  } else if (task.status === 'Done') {
    statusColor = '#cfeccf'
  }

  return (
    <tr>
      <td>{task.title}</td>
      <td style={{ backgroundColor: statusColor }}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  )
})

export default TaskRow;
