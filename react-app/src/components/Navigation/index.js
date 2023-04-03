import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import melody from '../../images/melody.gif'
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
      <NavLink exact to="/" className="nav-link">
    <div className="navbar">
        <img className="melody-logo" src={melody} /> 
        <div >Sanrio Note</div>
      {/* {isLoaded && (
        <div className="profile-button">
        <ProfileButton user={sessionUser} />
        </div>
      )} */}
    </div>
      </NavLink>
  );
}

export default Navigation;
