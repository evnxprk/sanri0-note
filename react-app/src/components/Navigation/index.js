import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import melody from '../../images/melody.jpg'
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="sidebar">
      <NavLink exact to="/" className="nav-link">
        <img className="melody-logo" src={melody} style={{width:'30px'}}/> 
      </NavLink>
      {/* {isLoaded && (
        <div className="profile-button">
          <ProfileButton user={sessionUser} />
        </div>
      )} */}
    </div>
  );
}

export default Navigation;
