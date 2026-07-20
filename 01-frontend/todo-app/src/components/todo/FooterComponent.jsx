import { AuthContext } from "./security/AuthContext"
import { useContext } from "react"
export default function FooterComponent(){
     const authContext= useContext(AuthContext)
        console.log(`footer component-${authContext.number}`)
    
    return(
        <footer className="FooterComponent">
              <div className="container">
                Footer
              </div>
        </footer>
    )
}