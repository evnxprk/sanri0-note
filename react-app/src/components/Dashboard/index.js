import React from "react";
import { NavLink } from "react-router-dom";
import Notebook from "../Notebooks";
import Notes from "../Notes";
import ProfileButton from "../Navigation/ProfileButton";
import "./dashboard.css";
import { useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";

export default function Dashboard() {
  const sessionUser = useSelector((state) => state.session.user)
  const dispatch = useDispatch()

   const handleLogout = (e) => {
     e.preventDefault();
     dispatch(logout());
   };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-nav-links">
          <NavLink to="/notes/new" className="create-note-button">
            <i className="fas fa-sticky-note"></i> Create New Note
          </NavLink>
          <NavLink to="/notebooks/new" className="create-notebook-button">
            <i className="fas fa-book"></i> Create New Notebook
          </NavLink>
        </div>
        <div className='logout-sidebar-button' onClick={handleLogout}>Logout</div>
        </div>
      <div className="main-content">
        <div className="notebooks-container">
          <h1 className="section-title">My Notebooks:</h1>
          <Notebook />
        </div>
        <div className="notes-container">
          <h1 className="section-title">My Notes:</h1>
          <Notes />
        </div>
      </div>
    </div>
  );
}
