import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./TodoApp.css";
import LogoutComponent from "./LogoutComponent";
import HeaderComponent from "./HeaderComponent";
import WelcomeComponent from "./WelcomeComponent";
import ListTodosComponent from "./ListTodosComponent";
import ErrorComponent from "./ErrorComponent";
import LoginComponent from "./LoginComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";
import TodoComponent from "./TodoComponent";

function AuthenticatedRoute({children}){
    const authContext=useAuth()
    if(authContext.isAuthenticated)
    return children
   return <Navigate to="/"/>

}

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route
              path="/welcome/:username"
              element={
              <AuthenticatedRoute><WelcomeComponent /></AuthenticatedRoute>}
            ></Route>
            <Route path="/todos" element={
                <AuthenticatedRoute><ListTodosComponent /></AuthenticatedRoute>}
                ></Route>
            <Route path="/logout" element={
                <AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>}
                ></Route>
             <Route path="/todo/:id" element={
                <AuthenticatedRoute><TodoComponent/></AuthenticatedRoute>}
                ></Route>
            <Route path="*" element={<ErrorComponent />}></Route>
          </Routes>
        </BrowserRouter>
       
      </AuthProvider>
    </div>
  );
}
