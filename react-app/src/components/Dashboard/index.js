import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Notebook from "../Notebooks";
import Notes from "../Notes";
import ProfileButton from "../Navigation/ProfileButton";
import "./dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import cinigif from "../../images/cinigif.gif";
// import pochaccogif from "../../images/pochaccogif.gif";
import cinicookiegif from "../../images/cinicookiegif.gif";
import { getAllNotebooksThunk } from "../../store/notebook";
import { getAllNotesThunk } from "../../store/note";
import pochogif from '../../images/pochacco.gif'
import pomgif from '../../images/pompom.gif'
import tuxsam from '../../images/tuxsam.gif'
import frog from '../../images/frog.gif'

export default function Dashboard() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  console.log("hi sessionUser", sessionUser)

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getAllNotebooksThunk());
    dispatch(getAllNotesThunk());
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-nav-links">
          {sessionUser && (
            <div
              style={{ fontWeight: "bold", color: "hotPink", fontSize: "18px" }}
            >
              Welcome {sessionUser.username}!
            </div>
          )}
          <NavLink to="/notes/new" className="create-note-button">
            <img style={{ width: "30px" }} src={cinicookiegif}></img> Create
            Note
          </NavLink>
          <NavLink to="/notebooks/new" className="create-notebook-button">
            <img style={{ width: "30px" }} src={cinigif}></img> Create Notebook
          </NavLink>
          <NavLink
            className="github-button"
            to={{ pathname: "https://github.com/evnxprk" }}
            style={{ textDecoration: "none", color: "inherit" }}
            target="_blank"
            rel="noreferrer"
          >
            <img style={{ width: "30px" }} src={pochogif}></img> Github
          </NavLink>
          <NavLink
            className="linkedin-button"
            to={{ pathname: "https://www.linkedin.com/in/eunicexpark01/" }}
            style={{ textDecoration: "none", color: "inherit" }}
            target="_blank"
            rel="noreferrer"
          >
            <img style={{ width: "30px" }} src={pomgif}></img> LinkedIn
          </NavLink>
        </div>
        <div className="logout-sidebar-button" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <div className="main-content">
        <div className="notebooks-container">
          {/* <img style={{ width: "30px" }} src={tuxsam}> */}
            <h1 className="section-title">Notebooks </h1>
          {/* </img> */}
          <Notebook />
        </div>
        <div className="notes-container">
          {/* <img style={{ width: "30px" }} src={frog}> */}
          <h1 className="section-title">Notes </h1>
          {/* </img> */}
          <Notes />
        </div>
      </div>
    </div>
  );
}
