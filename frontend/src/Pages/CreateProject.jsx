import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import Layout from "../components/Layout";

import Navbar from "../components/Navbar";

function CreateProject() {

  const navigate = useNavigate();

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const handleCreateProject =
    async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/projects`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Project Created Successfully"
      );

      navigate("/projects");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to create project"
      );

    }
  };

  return (
    <Layout>

      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >

        <form
          className="form-container"
          onSubmit={
            handleCreateProject
          }
        >

          <h2>Create New Project</h2>

          <div className="form-group">

            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              required
            />

          </div>

          <div className="form-group">

            <textarea
              placeholder="Project Description"
              rows="6"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              required
            />

          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Create Project
          </button>

        </form>

      </div>

    </Layout>
  );
}

export default CreateProject;