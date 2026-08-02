import { useState, useEffect } from "react";
import "./LoginComponent.css";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "./api/AuthenticationApiService";

import { FaUser, FaLock, FaClipboardCheck } from "react-icons/fa";
import taskAmico from "./assests/Task-amico.svg";

export default function SignupComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  // Auto-dismiss message after 4 seconds
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [message]);

  function showMessage(text, type = "error") {
    setMessage({ text, type });
  }

  function clearFieldError(field) {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validateFields() {
    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required";
    } else if (username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function register() {
    if (!validateFields()) return;

    const user = { username, password };

    registerApi(user)
      .then((response) => {
        if (response.data === "Username already exists") {
          showMessage("Username already taken. Please choose a different one.");
          return;
        }
        showMessage("Account created successfully! Redirecting...", "success");
        setTimeout(() => navigate("/login"), 1500);
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 400) {
          showMessage(error.response.data);
        } else {
          showMessage("Registration failed. Please try again.");
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

            {/* Inline Message Banner */}
            {message && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  marginBottom: "16px",
                  fontSize: "14px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  animation: "fadeSlideIn 0.3s ease",
                  ...(message.type === "success"
                    ? {
                        background: "#ecfdf5",
                        color: "#065f46",
                        border: "1px solid #6ee7b7",
                      }
                    : {
                        background: "#fff1f2",
                        color: "#9f1239",
                        border: "1px solid #fda4af",
                      }),
                }}
              >
                <span style={{ fontSize: "16px" }}>
                  {message.type === "success" ? "✅" : "⚠️"}
                </span>
                {message.text}
              </div>
            )}

            {/* Username */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaUser />
                </span>

                <input
                  type="text"
                  className={`form-control ${fieldErrors.username ? "is-invalid-field" : ""}`}
                  placeholder="Enter username (min. 3 chars)"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); clearFieldError("username"); }}
                />
              </div>
              {fieldErrors.username && (
                <span className="field-error">{fieldErrors.username}</span>
              )}
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
                  className={`form-control ${fieldErrors.password ? "is-invalid-field" : ""}`}
                  placeholder="Enter password (min. 6 chars)"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }}
                />
              </div>
              {fieldErrors.password && (
                <span className="field-error">{fieldErrors.password}</span>
              )}
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
                  className={`form-control ${fieldErrors.confirmPassword ? "is-invalid-field" : ""}`}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError("confirmPassword"); }}
                />
              </div>
              {fieldErrors.confirmPassword && (
                <span className="field-error">{fieldErrors.confirmPassword}</span>
              )}
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
