import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ProfileButton from "../Navigation/ProfileButton";
import "./Splashpage.css";
import { Link, NavLink} from "react-router-dom";
import pochogif from "../../images/pochacco.gif";
import pomgif from "../../images/pompom.gif";
import notepage from "../../images/Cinnamoroll.jpg";

export default function SplashPage() {
  const sessionUser = useSelector((state) => state.session.user);

  // If the user is already logged in, redirect to the home page
  if (sessionUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="sanrio-note-landing">
      <div className="splash-nav">
        <ProfileButton user={sessionUser} />
      </div>
      <div className="splash-container">

      {/* <div
        className="sanrio-note-title"
        style={{
          fontSize: "56px",
          fontFamily: "Soleil_Medium,Helvetica,Arial,sans-serif",
          display:'flex',
          justifyContent:'justify'
          // color: "#3EB489",
        }}
        >
        Sanrio Note
      </div> */}
      <div className="notepage-photo">
        <img id="note-logo" src={notepage} />
      </div>
      <div className="signup">
        <Link to="/signup">
          <button className="sign-up-button">Sign Up For Free</button>
        </Link>
      </div>
      <div className="account-container">
        <div className="account-login">
          <Link className="login-link" to="/login">
            Already have an account? Log in!{" "}
          </Link>
        </div>
      </div>
      <div className="sanrio-description">
        Sanrio Note helps you keep track of your notes and notebooks. Create a
        single note, or create multiple. The options are endless when it comes
        to organizing your thoughts.
      </div>
      <h3 className="login-description">
        Click on login or sign up to see what Sanrio Note has to offer...
      </h3>
        </div>
        <div className="happy-place" style={{fontSize:'18px', fontWeight:'bold'}}>
          Find your happy place at Sanrio Note!
        </div>

      <footer className="social-media-footer">
        <NavLink
          className="github-button"
          to={{ pathname: "https://github.com/evnxprk" }}
          style={{ textDecoration: "none", color: "inherit" }}
          target="_blank"
          rel="noreferrer"
        >
          <img style={{ width: "50px" }} src={pochogif}></img> Github
        </NavLink>
        <NavLink
          className="linkedin-button"
          to={{ pathname: "https://www.linkedin.com/in/eunicexpark01/" }}
          style={{ textDecoration: "none", color: "inherit" }}
          target="_blank"
          rel="noreferrer"
        >
          <img style={{ width: "50px", paddingLeft:'20px' }} src={pomgif}></img> LinkedIn
        </NavLink>
      </footer>
    </div>
  );
}
