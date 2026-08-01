import { useState } from "react";
import "./LoginComponent.css";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "./api/AuthenticationApiService";

import { FaUser, FaLock, FaClipboardCheck } from "react-icons/fa";
import taskAmico from "./assests/Task-amico.svg";

export default function SignupComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function register() {
    if (username.trim() === "") {
      alert("Username is required");
      return;
    }

    if (password.trim() === "") {
      alert("Password is required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      username,
      password,
    };

    registerApi(user)
      .then(() => {
        alert("Account created successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);

        if (error.response?.status === 400) {
          alert(error.response.data);
        } else {
          alert("Registration failed");
        }
      });
  }

  return (
    <div className="container-fluid login-page">
      <div className="row min-vh-100">
        {/* Left */}

        <div className="col-lg-5 d-none d-lg-flex login-left">
          <div className="login-left-content">
            <div className="login-logo">
              <FaClipboardCheck className="logo-icon" />
              <span>TaskFlow</span>
            </div>

            <h1 className="text-white mt-4">Create Your Account</h1>

            <p className="text-white mt-3 fs-5">
              Join TaskFlow and organize your work efficiently.
            </p>

            <img src={taskAmico} alt="Task" className="login-illustration" />
          </div>
        </div>

        {/* Right */}

        <div className="col-lg-7 d-flex align-items-center justify-content-center">
          <div className="login-card">
            <h2 className="fw-bold mb-2">Create Account 🚀</h2>

            <p className="text-muted mb-4">Create your TaskFlow account</p>

            {/* Username */}

            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaUser />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Confirm Password */}

            <div className="mb-4">
              <label className="form-label fw-semibold">Confirm Password</label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button className="btn btn-primary w-100" onClick={register}>
              Create Account →
            </button>

            <div className="text-center mt-4">
              Already have an account?
              <Link to="/login" className="text-decoration-none ms-2">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
