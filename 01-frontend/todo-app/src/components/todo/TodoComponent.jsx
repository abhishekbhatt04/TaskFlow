import { useNavigate, useParams } from "react-router-dom"
import { addTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodosApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment"

export default function TodoComponent(){

   const authContext=useAuth()
   const username=authContext.username
   const{id}=useParams()
   const[description,setDescription]=useState("")
   const[targetDate,setTargetDate]=useState("")
   const navigate=useNavigate() 

   useEffect(
       ()=>retrieveTodo(),[id]
    )
   function retrieveTodo(){
        
    if(id!=-1){
        retrieveTodoApi(username,id)
        .then(
            response=>{console.log(response)
            setDescription(response.data.description)
            setTargetDate(response.data.targetDate)
            }
        )
        .catch(error=>console.log(error))
}}
 function onSubmit(values){
    console.log(values)
    const todo={
        username:username,
        id:id,
        description:values.description,
        targetDate:values.targetDate,
        done:false
    }
    console.log(todo)

    if(id==-1){
        addTodoApi(username,todo)
        .then(
            response=>{
                navigate('/todos')
            }
        )
        .catch(error=>console.log(error))
    }
    else{
    updateTodoApi(username,id,todo)
     .then(
            response=>{
                navigate('/todos')
            }
        )
        .catch(error=>console.log(error))
 }}

 function validate(values){
    let errors={
        // description:"Enter valid description",
        // targetDate:"Enter valid date"
    }
    if(values.description.length<5)
    errors.description="Enter at 5 characters"
    if(!values.targetDate||!moment(values.targetDate).isValid)
    errors.targetDate="Enter valid date"
    // console.log(values)
    return errors
 }
    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
               <Formik initialValues={{description,targetDate}}
               enableReinitialize={true}
               onSubmit={onSubmit}
               validate={validate}
               validateOnChange={false}
               validateOnBlur={false}
               >
                {
                    (props)=>(
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
                                <Field className="form-control" type="text" name="description"/>
                            </fieldset>

                             <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field  className="form-control" type="date" name="targetDate"/>
                            </fieldset>
                            <div> <button className="btn btn-success m-5" type="submit" o>Save</button>
                            </div>
                           </Form>
                    )
                }
               </Formik>
            </div>
        </div>
    )
}