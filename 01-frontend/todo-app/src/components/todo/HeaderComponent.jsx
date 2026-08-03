import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import "./HeaderComponent.css";
import { FaClipboardCheck, FaBars, FaTimes } from "react-icons/fa";

export default function HeaderComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const logout = authContext.logout;
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const hideHeader =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  if (hideHeader) return null;

  function handleLinkClick() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/logout");
  }

  return (
    <header className="taskflow-header">
      <div className="taskflow-nav-inner">
        {/* Logo */}
        <Link
          className="taskflow-logo"
          to={`/welcome/${authContext.username}`}
          onClick={handleLinkClick}
        >
          <FaClipboardCheck />
          TaskFlow
        </Link>

        {/* Hamburger button — React-controlled */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Center nav links */}
        <div className={`nav-center ${menuOpen ? "nav-open" : ""}`}>
          {isAuthenticated && (
            <Link
              className="taskflow-link"
              to={`/welcome/${authContext.username}`}
              onClick={handleLinkClick}
            >
              Dashboard
            </Link>
          )}

          {isAuthenticated && (
            <Link
              className="taskflow-link"
              to="/todos"
              onClick={handleLinkClick}
            >
              My Tasks
            </Link>
          )}

          {!isAuthenticated && (
            <Link
              className="taskflow-link"
              to="/login"
              onClick={handleLinkClick}
            >
              Login
            </Link>
          )}
        </div>

        {/* Right: logout */}
        <div className={`nav-actions ${menuOpen ? "nav-open" : ""}`}>
          {isAuthenticated && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
