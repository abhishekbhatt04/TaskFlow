import { useEffect, useState } from "react";
import { deleteTodoApi, retrieveTodosForUser } from "./api/TodosApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ListTodosComponent.css";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ListTodosComponent() {
  // const today =new Date()
  // const targetdate=new Date(today.getFullYear()+10,today.getMonth(),today.getDate())
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();

  // const todos=[
  //         //    {id:1,description:'Learn AWS' ,done:false,targetdate:targetdate},
  //         //     {id:2,description:'Learn Full Stack',done:false,targetdate:targetdate},
  //         //     {id:3,description:'Learn React',done:false,targetdate:targetdate}
  // ]

  useEffect(() => {
    refreshTodos();
  }, []);

  function refreshTodos() {
    retrieveTodosForUser(username)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }

  function deleteTodo(id) {
    console.log("clicked" + id);
    deleteTodoApi(username, id).then(() => {
      setMessage(`delete of todo with id= ${id} is successful`);
      refreshTodos();
    });
  }
  function updateTodo(id) {
    console.log("clicked" + id);
    navigate(`/todo/${id}`);
  }

  function addNewTodo() {
    navigate("/todo/-1");
  }

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <div>
          <h1>My Tasks</h1>
          <p>Manage all your tasks in one place.</p>
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}

      <div className="task-toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search tasks..."
        />

        <select className="toolbar-select">
          <option>All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select className="toolbar-select">
          <option>Sort by Date</option>
          <option>Task Name</option>
          <option>Status</option>
        </select>

        <button className="add-task-btn" onClick={addNewTodo}>
          + Add New Task
        </button>
      </div>

      <div className="table-card">
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>
                  {todo.status === "PENDING" && (
                    <span className="status pending">Pending</span>
                  )}

                  {todo.status === "IN_PROGRESS" && (
                    <span className="status in-progress">In Progress</span>
                  )}

                  {todo.status === "COMPLETED" && (
                    <span className="status completed">Completed</span>
                  )}
                </td>
                {/* <td>{todo.targetdate.toDateString()}</td> */}
                <td>
                  {new Date(todo.targetDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <FaTrash size={14} />  Delete
                  </button>
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => updateTodo(todo.id)}
                  >
                    <FaEdit size={14} />  Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
