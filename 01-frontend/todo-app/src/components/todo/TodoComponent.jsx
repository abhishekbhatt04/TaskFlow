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

export default function TodoComponent() {
  const authContext = useAuth();
  const username = authContext.username;
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [status, setStatus] = useState("PENDING");

  const navigate = useNavigate();

  useEffect(() => retrieveTodo(), [id]);
  function retrieveTodo() {
    if (id != -1) {
      retrieveTodoApi(username, id)
        .then((response) => {
          console.log(response);
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
          setStatus(response.data.status);
        })
        .catch((error) => console.log(error));
    }
  }
  function onSubmit(values) {
    console.log(values);
    if (id == -1) {
      const todo = {
        username: username,
        description: values.description,
        targetDate: values.targetDate,
      };

      addTodoApi(username, todo)
        .then(() => navigate("/todos"))
        .catch((error) => console.log(error));
    } else {
      const todo = {
        id: Number(id), 
        username: username,
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
    let errors = {
      // description:"Enter valid description",
      // targetDate:"Enter valid date"
    };
    if (values.description.length < 5)
      errors.description = "Enter at 5 characters";
    if (!values.targetDate || !moment(values.targetDate).isValid)
      errors.targetDate = "Enter valid date";
    // console.log(values)
    return errors;
  }
  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      <div>
        <Formik
          initialValues={{
            description,
            targetDate,
            status,
          }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  className="form-control"
                  type="text"
                  name="description"
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Target Date</label>
                <Field className="form-control" type="date" name="targetDate" />
              </fieldset>

              {id != -1 && (
                <fieldset className="form-group">
                  <label>Status</label>
                  <Field as="select" className="form-control" name="status">
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </Field>
                </fieldset>
              )}

              <div>
                {" "}
                <button className="btn btn-success m-5" type="submit" o>
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
