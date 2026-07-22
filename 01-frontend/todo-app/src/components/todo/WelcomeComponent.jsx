import { useState } from "react";
import { useParams } from "react-router-dom";
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

  function callHelloWorld() {
    retrieveHelloWorldPathVar("Abhishek", authContext.token)
      .then((response) => ShowSuccess(response))
      .catch((error) => ShowError(error))
      .finally(() => console.log("clean up"));
  }

  function ShowSuccess(response) {
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

      {/* Statistics Cards */}
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

      {/* Bottom Section */}
      <div className="dashboard-bottom">

        {/* Upcoming Tasks */}
        <div className="upcoming-card">

          <h3 className="upcoming-title">Upcoming Tasks</h3>

          <div className="task-row">

            <div className="task-left">

              <div className="task-dot"></div>

              <div className="task-content">
                <h5>Learn Spring Boot</h5>
                <span>📅 20 Jul 2026</span>
              </div>

            </div>

            <span className="status-badge progress-badge">
              In Progress
            </span>

          </div>

          <div className="task-row">

            <div className="task-left">

              <div className="task-dot"></div>

              <div className="task-content">
                <h5>Prepare AWS Notes</h5>
                <span>📅 21 Jul 2026</span>
              </div>

            </div>

            <span className="status-badge pending-badge">
              Pending
            </span>

          </div>

          <div className="task-row">

            <div className="task-left">

              <div className="task-dot"></div>

              <div className="task-content">
                <h5>Finish React Project</h5>
                <span>📅 25 Jul 2026</span>
              </div>

            </div>

            <span className="status-badge progress-badge">
              In Progress
            </span>

          </div>

          <button className="view-all-link">
            View all tasks →
          </button>

        </div>

        {/* Chart Card */}
        <div className="chart-card">

          <h3>Task Statistics</h3>

          <div className="chart-placeholder">
            📊
            <p>Chart Coming Soon</p>
          </div>

        </div>

      </div>

      {/* API Testing (Hidden for now) */}

      {message && (
        <div className="alert alert-success mt-4">
          {message}
        </div>
      )}

    </div>
  );
}