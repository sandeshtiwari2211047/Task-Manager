import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function StatsCards({ stats }) {

  const cards = [
    {
      title: "Total Tasks",
      value: stats.total,
      color:
        "linear-gradient(135deg,#2563eb,#3b82f6)",
      icon: <FaTasks />,
    },

    {
      title: "Completed",
      value: stats.completed,
      color:
        "linear-gradient(135deg,#16a34a,#22c55e)",
      icon: <FaCheckCircle />,
    },

    {
      title: "Pending",
      value: stats.pending,
      color:
        "linear-gradient(135deg,#dc2626,#ef4444)",
      icon: <FaClock />,
    },

    {
      title: "Overdue",
      value: stats.overdue,
      color:
        "linear-gradient(135deg,#ea580c,#f97316)",
      icon: <FaExclamationTriangle />,
    },
  ];

  return (
    <div className="cards-grid">

      {cards.map((card, index) => (

        <div
          key={index}
          className="dashboard-card"
          style={{
            background: card.color,
          }}
        >

          <div className="card-top">

            <span className="card-icon">
              {card.icon}
            </span>

          </div>

          <h3>{card.title}</h3>

          <h1>{card.value}</h1>

        </div>
      ))}

    </div>
  );
}