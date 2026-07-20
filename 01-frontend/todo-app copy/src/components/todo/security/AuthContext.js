import { createContext, useContext, useState } from "react";
import { executeBasicAuthService, executeJwtAuthService } from "../api/AuthenticationApiService";
import { apiCLient } from "../api/ApiClient";


 export const AuthContext=createContext()

export const useAuth= ()=>useContext(AuthContext)
  

export default function AuthProvider({children}){
    // const[number,setNumber]=useState(10 )
    const[isAuthenticated,SetAuthenticated]=useState(false)
    const[username,setUsername]=useState(null)
    const[token,setToken]=useState(null)

    // setInterval(()=>setNumber(number+1),10000)
    // const valueTobeShared={number,isAuthenticated,SetAuthenticated};//this is not recommended we use shorthand instead like below

//     function login(username,password){
//       if (username.trim() !== "" && password === "dummy") {
//        SetAuthenticated(true)
//        setUsername(username)
//       return true
     
//     } else {
//       SetAuthenticated(false)
//       setUsername(null)
//       return false
//     }
//   }
// async function login(username,password){
// const baToken='Basic '+ window.btoa(username+":"+password)
// try{
//  const response=await executeBasicAuthService(baToken)
// if (response.status==200) {
//        SetAuthenticated(true)
//        setUsername(username)
//        setToken(baToken)
//         apiCLient.interceptors.request.use(
//         (config)=>{
//             console.log("Interceptes and added token")
//             config.headers.Authorization=baToken
//             return config
//         }
//       )
//       return true
//     } 
//     else {
//       logout()  
//       return false
//     }
// }catch(error){
//       logout()
//       return false
// }
//   }

async function login(username,password){
try{
const response=await executeJwtAuthService(username,password)
if (response.status==200) {
       const jwtToken='Bearer '+ response.data.token
       SetAuthenticated(true)
       setUsername(username)
       setToken(jwtToken)
        apiCLient.interceptors.request.use(
        (config)=>{
            console.log("Interceptes and added token")
            config.headers.Authorization=jwtToken
            return config
        }
      )
      return true
    } 
    else {
      logout()  
      return false
    }
}catch(error){
      logout()
      return false
}
  }

function logout(){
        SetAuthenticated(false)
        setToken(null)
        setUsername(null)
    }


    
    return(
        <AuthContext.Provider value={{isAuthenticated,SetAuthenticated,login,username,token,logout}}>
            {children}
        </AuthContext.Provider>

    )
}