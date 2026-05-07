function TaskRow({ task }) {
  let statusColor = ''

  if (task.status === 'To do') {
    statusColor = 'red'
  } else if (task.status === 'Doing') {
    statusColor = 'yellow'
  } else if (task.status === 'Done') {
    statusColor = 'green'
  }

  return (
    <tr>
      <td>{task.title}</td>
      <td style={{ backgroundColor: statusColor }}>{task.status}</td>
      <td>{task.createdAt}</td>
    </tr>
  )
}

export default TaskRow
