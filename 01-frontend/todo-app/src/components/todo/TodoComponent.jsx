import { useNavigate, useParams } from "react-router-dom";
import {
  addTodoApi,
  retrieveTodoApi,
  updateTodoApi,
} from "./api/TodosApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import { FaClipboardCheck, FaCalendarAlt, FaTasks, FaCheckCircle } from "react-icons/fa";
import "./TodoComponent.css";

export default function TodoComponent() {
  const authContext = useAuth();
  const username = authContext.username;
  const { id } = useParams();
  const isNew = id == -1;

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [status, setStatus] = useState("PENDING");

  const navigate = useNavigate();

  useEffect(() => retrieveTodo(), [id]);

  function retrieveTodo() {
    if (!isNew) {
      retrieveTodoApi(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
          setStatus(response.data.status);
        })
        .catch((error) => console.log(error));
    }
  }

  function onSubmit(values) {
    if (isNew) {
      const todo = {
        username,
        description: values.description,
        targetDate: values.targetDate,
      };
      addTodoApi(username, todo)
        .then(() => navigate("/todos"))
        .catch((error) => console.log(error));
    } else {
      const todo = {
        id: Number(id),
        username,
        description: values.description,
        targetDate: values.targetDate,
        status: values.status,
      };
      updateTodoApi(username, id, todo)
        .then(() => navigate("/todos"))
        .catch((error) => console.log(error));
    }
  }

  function validate(values) {
    const errors = {};

    // Description validation
    if (!values.description || !values.description.trim()) {
      errors.description = "Task description is required";
    } else if (values.description.trim().length < 5) {
      errors.description = "Description must be at least 5 characters";
    } else if (values.description.trim().length > 100) {
      errors.description = "Description must be 100 characters or fewer";
    }

    // Date validation — fix: call isValid() as a function
    if (!values.targetDate) {
      errors.targetDate = "Target date is required";
    } else if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "Please enter a valid date";
    } else if (moment(values.targetDate).isBefore(moment(), "day")) {
      errors.targetDate = "Target date cannot be in the past";
    }

    return errors;
  }

  return (
    <div className="todo-page">
      <div className="todo-form-card">
        {/* Header */}
        <div className="todo-form-header">
          <div className="todo-form-icon">
            {isNew ? <FaTasks size={24} /> : <FaCheckCircle size={24} />}
          </div>
          <div>
            <h1 className="todo-form-title">
              {isNew ? "Create New Task" : "Edit Task"}
            </h1>
            <p className="todo-form-subtitle">
              {isNew
                ? "Fill in the details to add a new task"
                : "Update the task details below"}
            </p>
          </div>
        </div>

        <Formik
          initialValues={{ description, targetDate, status }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ errors, touched }) => (
            <Form className="todo-form-body">

              {/* Description */}
              <div className="todo-field-group">
                <label className="todo-field-label">
                  <FaTasks size={13} style={{ marginRight: 6 }} />
                  Task Description
                </label>
                <Field
                  className={`todo-field-input ${
                    errors.description && touched.description ? "todo-field-error" : ""
                  }`}
                  type="text"
                  name="description"
                  placeholder="What do you need to do? (5–100 chars)"
                />
                <ErrorMessage name="description">
                  {(msg) => <span className="todo-error-hint">⚠ {msg}</span>}
                </ErrorMessage>
              </div>

              {/* Target Date */}
              <div className="todo-field-group">
                <label className="todo-field-label">
                  <FaCalendarAlt size={13} style={{ marginRight: 6 }} />
                  Target Date
                </label>
                <Field
                  className={`todo-field-input ${
                    errors.targetDate && touched.targetDate ? "todo-field-error" : ""
                  }`}
                  type="date"
                  name="targetDate"
                />
                <ErrorMessage name="targetDate">
                  {(msg) => <span className="todo-error-hint">⚠ {msg}</span>}
                </ErrorMessage>
              </div>

              {/* Status (edit only) */}
              {!isNew && (
                <div className="todo-field-group">
                  <label className="todo-field-label">
                    <FaCheckCircle size={13} style={{ marginRight: 6 }} />
                    Status
                  </label>
                  <Field as="select" className="todo-field-input" name="status">
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </Field>
                </div>
              )}

              {/* Actions */}
              <div className="todo-form-actions">
                <button
                  type="button"
                  className="todo-cancel-btn"
                  onClick={() => navigate("/todos")}
                >
                  Cancel
                </button>
                <button type="submit" className="todo-save-btn">
                  {isNew ? "✚ Create Task" : "✔ Save Changes"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
