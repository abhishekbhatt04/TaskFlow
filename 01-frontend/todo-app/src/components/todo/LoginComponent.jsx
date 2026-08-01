import { useState } from "react";
import "./LoginComponent.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { FaUser, FaLock } from "react-icons/fa";
import taskAmico from "./assests/Task-amico.svg";
import { FaClipboardCheck } from "react-icons/fa";
export default function LoginComponent() {
  <h1>Lets start with your login!</h1>;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useAuth();

  //   const [showSuccess, setShowSuccess] = useState(false);

  const [showError, setShowError] = useState(false);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    // console.log(event.target.value)
    setPassword(event.target.value);
  }

  async function handleButton() {
    if (await authContext.login(username, password)) {
      //   setShowSuccess(true);
      setShowError(false);
      navigate(`/welcome/${username}`); //use tild whrn we want a value to change
      // console.log("success")
    } else {
      // console.log("failed")
      //   setShowSuccess(false);
      setShowError(true);
    }
  }

  //this is very long procedure
  // function SuccessMsgComponenet(){
  //     if(showSuccess){
  //         return <div className="successMsg" >Authentication successfull</div>
  //     }
  //     return null
  // }

  // function ErrorMsgComponenet(){
  //     if(showError){
  //         return <div className="successMsg">Authentication Failed</div>
  //     }
  //     return null
  // }

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

            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaUser />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
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

            {showError && (
              <div className="alert alert-danger mt-3">
                Authentication Failed
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
