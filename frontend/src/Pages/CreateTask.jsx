import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

function CreateTask() {

  const navigate = useNavigate();

  const [projects, setProjects] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [project, setProject] =
    useState("");

  const [assignedTo,
    setAssignedTo] =
    useState("");

  const [status, setStatus] =
    useState("Pending");

  const [priority,
    setPriority] =
    useState("Medium");

  const [dueDate,
    setDueDate] =
    useState("");

  useEffect(() => {

    fetchProjects();

    fetchUsers();

  }, []);

  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/projects`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setProjects(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setUsers(
        res.data.filter(
          (user) =>
            user.role === "Member"
        )
      );

    } catch (error) {

      console.log(error);

    }
  };

  // CREATE TASK
  const handleCreateTask =
    async () => {

    try {

      if (
        !title ||
        !description ||
        !project ||
        !assignedTo ||
        !dueDate
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      const token =
        localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks`,
        {
          title,
          description,
          project,
          assignedTo,
          status,
          priority,
          dueDate,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Task Created Successfully"
      );

      navigate("/tasks");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to create task"
      );

    }
  };

  return (

    <Layout>

      <Navbar />

      <div
        className="form-container"
        style={{
          margin: "0 auto",
        }}
      >

        <h2>
          Create New Task
        </h2>

        {/* TASK TITLE */}

        <div className="form-group">

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

        </div>

        {/* DESCRIPTION */}

        <div className="form-group">

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows="5"
          />

        </div>

        {/* PROJECT */}

        <div className="form-group">

          <select
            value={project}
            onChange={(e) =>
              setProject(
                e.target.value
              )
            }
          >

            <option value="">
              Select Project
            </option>

            {projects.map((proj) => (

              <option
                key={proj._id}
                value={proj._id}
              >
                {proj.title}
              </option>

            ))}

          </select>

        </div>

        {/* ASSIGN MEMBER */}

        <div className="form-group">

          <select
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(
                e.target.value
              )
            }
          >

            <option value="">
              Assign Member
            </option>

            {users.map((user) => (

              <option
                key={user._id}
                value={user._id}
              >
                {user.name}
              </option>

            ))}

          </select>

        </div>

        {/* STATUS */}

        <div className="form-group">

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
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

        </div>

        {/* PRIORITY */}

        <div className="form-group">

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
          >

            <option value="Low">
              Low Priority
            </option>

            <option value="Medium">
              Medium Priority
            </option>

            <option value="High">
              High Priority
            </option>

          </select>

        </div>

        {/* DUE DATE */}

        <div className="form-group">

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
          />

        </div>

        {/* BUTTON */}

        <button
          className="submit-btn"
          onClick={
            handleCreateTask
          }
        >
          Create Task
        </button>

      </div>

    </Layout>
  );
}

export default CreateTask;