import { FaSearch, FaBell } from "react-icons/fa";

export default function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="navbar">

      <div>

        <h1>Dashboard</h1>

        <p>
          Welcome back, {user?.name}
        </p>

      </div>

      <div className="navbar-right">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search tasks..."
          />

        </div>

        <div className="notification-icon">
          <FaBell />
        </div>

        <div className="role-badge">
          {user?.role}
        </div>

      </div>

    </div>
  );
}