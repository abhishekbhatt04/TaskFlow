import { apiCLient } from "./ApiClient";

export const executeBasicAuthService
                          =(token)=>apiCLient.get(`/basicauth`,
                            // {
                            //     headers:{
                            //         Authorization:token
                            //   }
                            // }
                          )

export const executeJwtAuthService
                          =(username,password)=>apiCLient.post(`/authenticate`,{username,password})