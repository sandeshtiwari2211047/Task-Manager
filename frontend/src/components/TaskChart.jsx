import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TaskChart({ tasks }) {

  const completed =
    tasks.filter(
      (task) =>
        task.status === "Completed"
    ).length;

  const pending =
    tasks.filter(
      (task) =>
        task.status === "Pending"
    ).length;

  const inProgress =
    tasks.filter(
      (task) =>
        task.status === "In Progress"
    ).length;

  const data = [

    {
      name: "Completed",
      value: completed,
    },

    {
      name: "Pending",
      value: pending,
    },

    {
      name: "In Progress",
      value: inProgress,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#3b82f6",
  ];

  return (

    <div className="chart-container">

      <div className="chart-header">

        <h2>Task Analytics</h2>

        <p>
          Task progress overview
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >

            {data.map(
              (entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />

              )
            )}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default TaskChart;