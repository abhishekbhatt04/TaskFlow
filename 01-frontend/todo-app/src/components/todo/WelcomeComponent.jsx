import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { retrieveHelloWorldPathVar } from "./api/HelloWorldApiService";
import "./WelcomeComponent.css";
import "./TaskStatisticsChart";

import {
  LuListTodo,
  LuClock3,
  LuBadgeCheck,
  LuChartColumn,
} from "react-icons/lu";

import { useAuth } from "./security/AuthContext";
import TaskStatisticsChart from "./TaskStatisticsChart";
import { retrieveTodoApi, retrieveTodosForUser } from "./api/TodosApiService";

export default function WelcomeComponent() {
  const [message, setMessage] = useState(null);
  const [todos, setTodos] = useState([]);
  const authContext = useAuth();
  const username = authContext.username;

  useEffect(() => {
    retrieveTodos();
  }, []);

  function retrieveTodos() {
    retrieveTodosForUser(username)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }

  const totalTasks = todos.length;

  const completedTasks = todos.filter((todo) => todo.done).length;

  const pendingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

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

  const upcomingTodos = [...todos]
    .filter((todo) => !todo.done)
    .sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate))
    .slice(0, 3);

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
          <h2>{totalTasks}</h2>
          <span>Total Tasks</span>
        </div>

        <div className="stat-card">
          <LuClock3 className="stat-icon pending-icon" />
          <h2>{pendingTasks}</h2>
          <span>Pending</span>
        </div>

        <div className="stat-card">
          <LuBadgeCheck className="stat-icon completed-icon" />
          <h2>{completedTasks}</h2>
          <span>Completed</span>
        </div>

        <div className="stat-card">
          <LuChartColumn className="stat-icon progress-icon" />
          <h2>{progress}%</h2>
          <span>Progress</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="dashboard-bottom">
        {/* Upcoming Tasks */}
        <div className="upcoming-card">
          <h3 className="upcoming-title">Upcoming Tasks</h3>

          {upcomingTodos.length === 0 ? (
            <p className="no-task">🎉 No pending tasks!</p>
          ) : (
            upcomingTodos.map((todo) => (
              <div className="task-row" key={todo.id}>
                <div className="task-left">
                  <div className="task-dot"></div>

                  <div className="task-content">
                    <h5>{todo.description}</h5>
                    <span>
                      📅 {new Date(todo.targetDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <span className="status-badge pending-badge">Pending</span>
              </div>
            ))
          )}

          <button className="view-all-link">View all tasks →</button>
        </div>

        {/* Chart Card */}
        <div className="chart-card">
          <h3>Task Statistics</h3>

          <div className="chart-container">
            <TaskStatisticsChart
              completedTasks={completedTasks}
              pendingTasks={pendingTasks}
              progress={progress}
            />
          </div>
        </div>
      </div>

      {/* API Testing (Hidden for now) */}

      {message && <div className="alert alert-success mt-4">{message}</div>}
    </div>
  );
}
