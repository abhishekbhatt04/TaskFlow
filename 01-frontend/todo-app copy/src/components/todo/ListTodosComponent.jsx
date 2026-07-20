import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveTodosForUser } from "./api/TodosApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

export default function ListTodosComponent(){

    // const today =new Date()
    // const targetdate=new Date(today.getFullYear()+10,today.getMonth(),today.getDate())
    const[todos,setTodos]=useState([])
    const[message,setMessage]=useState(null)
    const authContext=useAuth()
    const username=authContext.username
    const navigate=useNavigate()

        // const todos=[
        //         //    {id:1,description:'Learn AWS' ,done:false,targetdate:targetdate},
        //         //     {id:2,description:'Learn Full Stack',done:false,targetdate:targetdate},
        //         //     {id:3,description:'Learn React',done:false,targetdate:targetdate}
        // ]

        useEffect(
            ()=>{
                refreshTodos() 
            },[]     
        )
        
        function refreshTodos(){
            retrieveTodosForUser(username)
            .then(response=>
                {
                    console.log(response.data)
                    setTodos(response.data)
                }
                )
            .catch(error=>console.log(error))
        }
    
        function deleteTodo(id){
            console.log("clicked"+id)
            deleteTodoApi(username,id)
            .then(
                ()=> {
                    setMessage(`delete of todo with id= ${id} is successful`)
                    refreshTodos()
                }
              
            )
        }
          function updateTodo(id){
            console.log("clicked"+id)
            navigate(`/todo/${id}`)
        }
        
        function addNewTodo(){
            navigate('/todo/-1')
        }

    return(
        <div className="container">
        <h1>Thing you want to do!</h1>
        {message &&<div className="alert alert-warning">{message}</div>}
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>description</th>
                        <th>is done?</th>
                        <th>targetdate</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(
                        todo=>(
                        <tr key={todo.id}>
                        <td>{todo.description}</td>
                        <td>{todo.done.toString()}</td>
                        {/* <td>{todo.targetdate.toDateString()}</td> */}
                        <td>{todo.targetDate.toString()}</td>
                        <td ><button className="btn btn-warning" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                        <td><button className="btn btn-success" onClick={()=>updateTodo(todo.id)}>Update</button></td>
                    </tr>
                        )
                    )
                    }
                     
                </tbody>
            </table>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
        </div>
    )
}