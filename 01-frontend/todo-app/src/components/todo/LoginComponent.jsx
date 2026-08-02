import { useState } from "react";
import "./LoginComponent.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { FaUser, FaLock } from "react-icons/fa";
import taskAmico from "./assests/Task-amico.svg";
import { FaClipboardCheck } from "react-icons/fa";

export default function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const authContext = useAuth();

  function clearFieldError(field) {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate() {
    const errors = {};
    if (!username.trim()) errors.username = "Username is required";
    if (!password.trim()) errors.password = "Password is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleButton() {
    setLoginError(false);
    if (!validate()) return;

    if (await authContext.login(username, password)) {
      setLoginError(false);
      navigate(`/welcome/${username}`);
    } else {
      setLoginError(true);
    }
  }

  return (
    <div className="container-fluid login-page">
      <div className="row min-vh-100">
        {/* Left Side */}
        <div className="col-lg-5 d-none d-lg-flex login-left">
          <div className="login-left-content">
            <div className="login-logo">
              <FaClipboardCheck className="logo-icon" />
              <span>TaskFlow</span>
            </div>

            <h1 className="text-white mt-4">Welcome Back!</h1>

            <p className="text-white mt-3 fs-5">
              Organize your work. Track your goals. Finish what matters.
            </p>

            <img
              src={taskAmico}
              alt="Task Management"
              className="login-illustration"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="col-lg-7 d-flex align-items-center justify-content-center">
          <div className="login-card">
            <h2 className="fw-bold mb-2">Welcome Back 👋</h2>

            <p className="text-muted mb-4">Sign in to continue to TaskFlow</p>

            {/* Login Error Banner */}
            {loginError && (
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
                  background: "#fff1f2",
                  color: "#9f1239",
                  border: "1px solid #fda4af",
                  animation: "fadeSlideIn 0.3s ease",
                }}
              >
                <span style={{ fontSize: "16px" }}>⚠️</span>
                Invalid username or password. Please try again.
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
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    clearFieldError("username");
                    setLoginError(false);
                  }}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError("password");
                    setLoginError(false);
                  }}
                />
              </div>
              {fieldErrors.password && (
                <span className="field-error">{fieldErrors.password}</span>
              )}
            </div>

            <button className="btn btn-primary w-100 mt-3" onClick={handleButton}>
              Sign In →
            </button>

            <div className="text-center mt-4">
              <span className="text-muted">Don't have an account?</span>

              <Link
                to="/signup"
                className="text-decoration-none ms-2 fw-semibold"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
