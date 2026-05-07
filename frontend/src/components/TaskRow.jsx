import { memo } from 'react'

function TaskRow({ task }) {
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
      <td>{task.createdAt}</td>
    </tr>
  )
}

export default memo(TaskRow)
