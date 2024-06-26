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
import { getAllTasksThunk } from "../../store/task";
import { getAllListThunk } from "../../store/list";
import pochogif from '../../images/pochacco.gif'
import pomgif from '../../images/pompom.gif'
import tuxsam from '../../images/tuxsam.gif'
import frog from '../../images/frog.gif'
import Tasks from "../Tasks/AllTasks";
import Lists from "../List/AllLists";
import twingif from '../../images/twin.gif'
import cini from '../../images/cini.gif'
import hellokitty from '../../images/hellokitty.gif'
import mymel from '../../images/mymel.gif'
import skateboard from '../../images/skateboard.gif'
// import Lists from "../List/AllLists";

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
    dispatch(getAllTasksThunk())
    dispatch(getAllListThunk())
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-nav-links">
          {sessionUser && (
            <div
              style={{ fontWeight: "bold", color: "hotPink", fontSize: "18px" }}
            >
              Welcome {sessionUser.first_name}!
            </div>
          )}
          <NavLink to="/notes/new" className="create-note-button">
            <img style={{ width: "30px" }} src={cinicookiegif}></img> Create
            Note
          </NavLink>
          <NavLink to="/tasks/new" className="create-tasks-button">
            <img style={{ width: "42px" }} src={tuxsam}></img> Create Task
          </NavLink>

          <NavLink to="/notebooks/new" className="create-notebook-button">
            <img style={{ width: "30px" }} src={cinigif}></img> Create Notebook
          </NavLink>
          <NavLink to="/todo/new" exact className="create-list-button">
            <img style={{ width: "30px" }} src={twingif}></img> Create List
          </NavLink>

          {/* <NavLink to="/notes" className="all-notes-button">
            <img style={{ width: "30px" }} src={cini}></img> My Notes
          </NavLink>
          <NavLink to="/notebooks" className="all-notebooks-button">
            <img style={{ width: "30px" }} src={hellokitty}></img> My Notebooks
          </NavLink>
          <NavLink to="/tasks" className="all-tasks-button">
            <img style={{ width: "30px" }} src={mymel}></img> My Tasks
          </NavLink>
          <NavLink to="/todos" className="all-todos-button">
            <img style={{ width: "30px" }} src={skateboard}></img> My Lists
          </NavLink> */}
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
        <div className="tasks-container">
          {/* <img style={{ width: "30px" }} src={frog}> */}
          <h1 className="section-title">Tasks </h1>
          {/* </img> */}
          <Tasks />
        </div>
        <div className="list-container">
          {/* <img style={{ width: "30px" }} src={frog}> */}
          <h1 className="section-title">List </h1>
          {/* </img> */}
          <Lists />
        </div>
      </div>
    </div>
  );
}
