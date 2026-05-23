export default function RecentTasks({ tasks }) {

  return (
    <div className="table-container">

      <h2>Recent Tasks</h2>

      <table>

        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Due Date</th>
          </tr>
        </thead>

        <tbody>

          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>

  <span
    className={
      task.status === "Completed"
        ? "status-completed"

        : task.status === "In Progress"
        ? "status-progress"

        : "status-pending"
    }
  >
    {task.status}
  </span>

</td>
              <td>{task.assignedTo?.name}</td>
              <td>
                {new Date(task.dueDate).toLocaleDateString()}
              </td>
            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}