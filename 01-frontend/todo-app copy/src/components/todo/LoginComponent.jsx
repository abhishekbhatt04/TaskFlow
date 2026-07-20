import { useState } from "react";
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
    <div className="Login">
        <h1>Lets start with your login!</h1>
      <div className="LoginForm">
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </div>
        <div>
          <button type="button" name="login" onClick={handleButton}>
            Login
          </button>
        </div>
      </div>

      {/* <ErrorMsgComponenet/> 
      <SuccessMsgComponenet/> */}

      {/* Easier way insteda of using components */}
     
      {showError && <div className="errorMsg">Authentication Failed</div>}
    </div>
  );
}