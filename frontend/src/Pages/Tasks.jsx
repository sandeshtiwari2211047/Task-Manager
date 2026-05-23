import { useEffect, useState } from "react";

import axios from "axios";

import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

function Tasks() {

  const [tasks, setTasks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchTasks();

  }, []);

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

    }
  };

  // UPDATE TASK STATUS
  const updateTaskStatus = async (
    taskId,
    newStatus
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to update task status"
      );

    }
  };

  // DELETE TASK
  const deleteTask = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this task?"
      );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert("Delete failed");

    }
  };

  // EDIT TASK
  const handleEdit = (task) => {

    const newTitle = prompt(
      "Edit task title",
      task.title
    );

    if (!newTitle) return;

    updateTaskTitle(
      task._id,
      newTitle
    );
  };

  // UPDATE TASK TITLE
  const updateTaskTitle = async (
    id,
    title
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/edit/${id}`,
        {
          title,
          description:
            "Updated Task",
          status:
            "Pending",
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert("Update failed");

    }
  };

  // STATUS CLASS
  const getStatusClass = (
    status
  ) => {

    if (status === "Completed")
      return "status-completed";

    if (status === "Pending")
      return "status-pending";

    return "status-progress";
  };

  // LOADING SCREEN
  if (loading) {

    return (

      <div className="loading">

        Loading...

      </div>

    );
  }

  return (

    <Layout>

      <Navbar />

      <div className="table-container">

        {/* TOP SECTION */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "30px",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >

          <div>

            <h2>Tasks</h2>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "8px",
              }}
            >
              Track and manage all
              assigned tasks.
            </p>

          </div>

          {/* SEARCH INPUT */}

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              padding: "14px 18px",
              borderRadius: "14px",
              border:
                "1px solid #334155",
              background: "#0f172a",
              color: "white",
              outline: "none",
              width: "260px",
              fontSize: "15px",
            }}
          />

        </div>

        {/* TABLE */}

        <table>

          <thead>

            <tr>

              <th>Task</th>

              <th>Status</th>

              <th>Assigned To</th>

              <th>Project</th>

              <th>Due Date</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {tasks
              .filter((task) =>
                task.title
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  )
              )
              .length > 0 ? (

              tasks
                .filter((task) =>
                  task.title
                    .toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )
                )
                .map((task) => (

                  <tr key={task._id}>

                    <td>
                      {task.title}
                    </td>

                    <td>

                      <select
                        value={task.status}
                        onChange={(e) =>
                          updateTaskStatus(
                            task._id,
                            e.target.value
                          )
                        }
                        className={
                          getStatusClass(
                            task.status
                          )
                        }
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                      </select>

                    </td>

                    <td>

                      {task.assignedTo
                        ?.name ||
                        "Not Assigned"}

                    </td>

                    <td>

                      {task.project
                        ?.title ||
                        "No Project"}

                    </td>

                    <td>

                      <span
                        className={
                          new Date(
                            task.dueDate
                          ) < new Date()

                            ? "status-overdue"

                            : "status-progress"
                        }
                      >

                        {new Date(
                          task.dueDate
                        ).toLocaleDateString()}

                      </span>

                    </td>

                    <td>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(task)
                          }
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteTask(
                              task._id
                            )
                          }
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  style={{
                    textAlign:
                      "center",
                    padding: "30px",
                    color: "#94a3b8",
                  }}
                >

                  No tasks available yet.
                  Create a new task to begin.

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}

export default Tasks;