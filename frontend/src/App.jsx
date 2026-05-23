import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import Dashboard from "./Pages/Dashboard";

import Projects from "./Pages/Projects";

import CreateProject from "./Pages/CreateProject";

import CreateTask from "./Pages/CreateTask";

import Tasks from "./Pages/Tasks";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/create-project"
          element={<CreateProject />}
        />

        <Route
          path="/create-task"
          element={<CreateTask />}
        />

        <Route
  path="/tasks"
  element={<Tasks />}
/>

      </Routes>

    </BrowserRouter>

  );
}

export default App;