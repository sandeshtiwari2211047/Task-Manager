import { useEffect, useState } from "react";

import axios from "axios";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

function Projects() {

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProjects();

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

      setLoading(false);

    } catch (error) {

      console.log(error);

    }
  };

  // LOADING
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

        {/* HEADER */}

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

            <h2>Projects</h2>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "8px",
              }}
            >
              Manage all team projects
              efficiently.
            </p>

          </div>

        </div>

        {/* TABLE */}

        <table>

          <thead>

            <tr>

              <th>Project Name</th>

              <th>Description</th>

              <th>Tasks</th>

              <th>Created By</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {projects.length > 0 ? (

              projects.map((project) => (

                <tr key={project._id}>

                  {/* PROJECT NAME */}

                  <td>

                    {project.title}

                  </td>

                  {/* DESCRIPTION */}

                  <td>

                    {project.description}

                  </td>

                  {/* TASK COUNT */}

                  <td>

                    <span
                      className="status-completed"
                    >

                      {project.taskCount} Tasks

                    </span>

                  </td>

                  {/* CREATED BY */}

                  <td>

                    {project.createdBy
                      ?.name || "Admin"}

                  </td>

                  {/* STATUS */}

                  <td>

                    <span
                      className="status-progress"
                    >
                      Active
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  style={{
                    textAlign:
                      "center",

                    padding: "30px",

                    color: "#94a3b8",
                  }}
                >

                  No projects created yet.
                  Start by creating your
                  first project.

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}

export default Projects;