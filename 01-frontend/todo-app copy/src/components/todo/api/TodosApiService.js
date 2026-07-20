import axios from "axios";
import { apiCLient } from "./ApiClient";

//adding a base url to stop repeatition

export const retrieveTodosForUser
                          =(username)=>apiCLient.get(`/username/${username}/todos`)

export const deleteTodoApi
                          =(username,id)=>apiCLient.delete(`/username/${username}/todos/${id}`)

export const retrieveTodoApi
                          =(username,id)=>apiCLient.get(`/username/${username}/todos/${id}`)

export const updateTodoApi
                          =(username,id,todo)=>apiCLient.put(`/username/${username}/todos/${id}`,todo)     
        
export const addTodoApi
                          =(username,todo)=>apiCLient.post(`/username/${username}/todos`,todo)