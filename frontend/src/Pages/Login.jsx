import { useState } from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-left">

        <h1>Team Task Manager</h1>

        <p>
          Manage projects, assign tasks,
          and track team productivity
          efficiently.
        </p>

      </div>

      <div className="auth-right">

        <form
          className="auth-card"
          onSubmit={handleLogin}
        >

          <h2>Welcome Back</h2>

          <p>
            Login to continue managing
            your team.
          </p>

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

          <button type="submit">
            Login
          </button>

          <span>
            Don't have an account?
            <Link to="/register">
              Register
            </Link>
          </span>

        </form>

      </div>

    </div>
  );
}

export default Login;