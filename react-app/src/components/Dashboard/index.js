import React from "react";
import { NavLink } from "react-router-dom";
import Notebook from "../Notebooks";
import Notes from "../Notes";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <NavLink to="/notebooks/new" className="create-notebook-button">
          <i className="fas fa-book"></i> Create New Notebook
        </NavLink>
        <NavLink to="/notes/new" className="create-note-button">
          <i className="fas fa-sticky-note"></i> Create New Note
        </NavLink>
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
