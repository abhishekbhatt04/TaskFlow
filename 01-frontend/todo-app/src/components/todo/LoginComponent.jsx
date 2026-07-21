import { useState } from "react";
import "./LoginComponent.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
export default function LoginComponent() {
 <h1>Lets start with your login!</h1>
  const [username, setUsername] = useState("in28minutes");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const authContext=useAuth()

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
    if (await authContext.login(username,password)) {
    //   setShowSuccess(true);
      setShowError(false);
      navigate(`/welcome/${username}`)//use tild whrn we want a value to change 
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
          <h2 className="fw-bold text-white">TaskFlow</h2>

          <h1 className="text-white mt-5">Welcome Back!</h1>

         <p className="text-white mt-3 fs-5">
           Organize your work.
         Track your goals.
        Finish what matters.
         </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-lg-7 d-flex align-items-center justify-content-center">

        <div className="login-card">

          <h2 className="fw-bold mb-2">Login to your account</h2>

          <p className="text-muted mb-4">
            Enter your credentials to access your account
          </p>

          <div className="mb-3">
            <label className="form-label">Username</label>

            <input
              type="text"
              className="form-control"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleButton}
          >
            Login
          </button>

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