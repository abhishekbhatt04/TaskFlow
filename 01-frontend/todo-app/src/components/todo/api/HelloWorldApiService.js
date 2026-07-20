import axios from "axios";
import { apiCLient } from "./ApiClient";

// export function retrieveHelloWorld(){
//     return axios.get("http://localhost:8080/hello-world-bean")
// }

//using arrow function to make it simpler
export const retrieveHelloWorld
                          =()=>apiCLient.get("/hello-world-bean")

                            
export const retrieveHelloWorldPathVar
                          =(username,token)=>apiCLient.get(`/hello-world/path-variable/${username}`,
                            // {
                            //     headers:{
                            //         Authorization:token
                            //   }
                            // }
                          )

