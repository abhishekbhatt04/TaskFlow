import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { retrieveHelloWorldPathVar } from "./api/HelloWorldApiService";
import "./WelcomeComponent.css";
import {
  LuListTodo,
  LuClock3,
  LuBadgeCheck,
  LuChartColumn,
} from "react-icons/lu";
import { useAuth } from "./security/AuthContext";

export default function WelcomeComponent() {
  const { username } = useParams();
  const [message, setMessage] = useState(null);
  const authContext = useAuth();

  // console.log(username)
  function callHelloWorld() {
    // axios.get("http://localhost:8080/hello-world")
    // .then((response)=>ShowSucess(response))
    // .catch((error)=>ShowError(error))
    // .finally(()=>console.log("clean up"))

    // retrieveHelloWorld()
    // .then((response)=>ShowSucess(response))
    // .catch((error)=>ShowError(error))
    // .finally(()=>console.log("clean up"))

    retrieveHelloWorldPathVar("Abhishek", authContext.token)
      .then((response) => ShowSucess(response))
      .catch((error) => ShowError(error))
      .finally(() => console.log("clean up"));
  }

  function ShowSucess(response) {
    console.log(response);
    setMessage(response.data.message);
  }
  function ShowError(error) {
    console.log(error);
  }
  return (
    <div className="dashboard-container">
      {/* Greeting */}
      <div className="dashboard-header">
        <h1>Good Evening 👋</h1>
        <p>Welcome back, {username}</p>
      </div>

      {/* Statistics */}
      <div className="stats-container">
        <div className="stat-card">
          <LuListTodo className="stat-icon total-icon" />

          <h2>12</h2>

          <span>Total Tasks</span>
        </div>

        <div className="stat-card">
          <LuClock3 className="stat-icon pending-icon" />

          <h2>5</h2>

          <span>Pending</span>
        </div>

        <div className="stat-card">
          <LuBadgeCheck className="stat-icon completed-icon" />

          <h2>7</h2>

          <span>Completed</span>
        </div>

        <div className="stat-card">
          <LuChartColumn className="stat-icon progress-icon" />

          <h2>58%</h2>

          <span>Progress</span>
        </div>
      </div>
    </div>
  );
}
