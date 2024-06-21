import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import melody from "../../images/melody.gif";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation();

  // Determine if the current location is the splash page ("/")
  const isSplashPage = location.pathname === "/";

  return (
    <NavLink exact to="/" className="nav-link">
      <div className="navbar">
        <img className="melody-logo" src={melody} alt="Melody Logo" />
        <div>Sanrio Note</div>
        <div className="splash-nav">
          {isSplashPage && <ProfileButton user={sessionUser} />}
        </div>
        {/* 
        {isLoaded && (
          <div className="profile-button">
            <ProfileButton user={sessionUser} />
          </div>
        )}
        */}
      </div>
    </NavLink>
  );
}

export default Navigation;
