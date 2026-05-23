import { useState } from "react";
import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("Member");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          name,
          email,
          password,
          role,
        }
      );

      alert(
        "Registration Successful"
      );

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-left">

        <h1>Team Task Manager</h1>

        <p>
          Create your account and start
          managing projects, teams, and
          tasks efficiently.
        </p>

      </div>

      <div className="auth-right">

        <form
          className="auth-card"
          onSubmit={handleRegister}
        >

          <h2>Create Account</h2>

          <p>
            Register to access your
            workspace.
          </p>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="Member">
              Member
            </option>

            <option value="Admin">
              Admin
            </option>
          </select>

          <button type="submit">
            Register
          </button>

          <span>
            Already have an account?
            <Link to="/">
              Login
            </Link>
          </span>

        </form>

      </div>

    </div>
  );
}

export default Register;