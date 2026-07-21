import { Link } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import { useLocation } from "react-router-dom";
import './HeaderComponent.css'
export default function HeaderComponent(){
    // const authContext= useContext(AuthContext) using its easier version below
    
    const authContext=useAuth()
    const isAuthenticated=authContext.isAuthenticated
    const logout = authContext.logout;  
    // console.log(authContext) 
     const location = useLocation();

    const hideHeader =
        location.pathname === "/" ||
        location.pathname === "/login";

    if(hideHeader){
        return null;
    }
   
    return(
              <header className="taskflow-header">
            <div className="container">
                <div className="row">
                  <nav className="navbar navbar-expand-lg taskflow-navbar">

    <div className="container-fluid">

        <Link
            className="navbar-brand taskflow-logo"
            to="/welcome/in28minutes"
        >
            🚀 TaskFlow
        </Link>

        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        <div
            className="collapse navbar-collapse"
            id="navbarNav"
        >

            <ul className="navbar-nav mx-auto">

                {isAuthenticated && (
                    <li className="nav-item">
                        <Link
                            className="nav-link taskflow-link"
                            to="/welcome/in28minutes"
                        >
                            Dashboard
                        </Link>
                    </li>
                )}

                {isAuthenticated && (
                    <li className="nav-item">
                        <Link
                            className="nav-link taskflow-link"
                            to="/todos"
                        >
                            My Tasks
                        </Link>
                    </li>
                )}

            </ul>

            <ul className="navbar-nav">

                {!isAuthenticated && (
                    <li className="nav-item">
                        <Link
                            className="nav-link taskflow-link"
                            to="/login"
                        >
                            Login
                        </Link>
                    </li>
                )}

                {isAuthenticated && (
                    <li className="nav-item">
                        <Link
                            className="logout-btn"
                            to="/logout"
                            onClick={logout}
                        >
                            Logout
                        </Link>
                    </li>
                )}

            </ul>

        </div>

    </div>

</nav>
                </div>
            </div>
        </header>

    )
}