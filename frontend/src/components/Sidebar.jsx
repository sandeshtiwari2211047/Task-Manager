import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {

  const navigate = useNavigate();

  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <div className="sidebar">

      <div>

        <h1 className="logo">
          Task Manager
        </h1>

        <div className="menu">

          {/* DASHBOARD */}

          <Link
            to="/dashboard"
            className={
              location.pathname === "/dashboard"
                ? "active-link"
                : ""
            }
          >
            <FaHome />
            Dashboard
          </Link>

          {/* PROJECTS */}

          <Link
            to="/projects"
            className={
              location.pathname === "/projects"
                ? "active-link"
                : ""
            }
          >
            <FaProjectDiagram />
            Projects
          </Link>

          {/* ADMIN ONLY → CREATE PROJECT */}

          {user?.role === "Admin" && (

            <Link
              to="/create-project"
              className={
                location.pathname === "/create-project"
                  ? "active-link"
                  : ""
              }
            >
              <FaPlusCircle />
              New Project
            </Link>

          )}

          {/* TASKS */}

          <Link
            to="/tasks"
            className={
              location.pathname === "/tasks"
                ? "active-link"
                : ""
            }
          >
            <FaTasks />
            Tasks
          </Link>

          {/* ADMIN ONLY → CREATE TASK */}

          {user?.role === "Admin" && (

            <Link
              to="/create-task"
              className={
                location.pathname === "/create-task"
                  ? "active-link"
                  : ""
              }
            >
              <FaPlusCircle />
              New Task
            </Link>

          )}

        </div>

      </div>

      <button
        className="logout-btn"
        onClick={logout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>

  );
}