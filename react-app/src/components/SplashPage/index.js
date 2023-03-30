import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ProfileButton from "../Navigation/ProfileButton";
import "./Splashpage.css";
import { Link } from "react-router-dom";
import notepage  from "../../images/Cinnamoroll.jpg";

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
      <h1
        className="sanrio-note-title"
        style={{
          fontSize: "56px",
          fontFamily: "Soleil_Medium,Helvetica,Arial,sans-serif",
          color: "#3EB489",
        }}
      >
        Sanrio Note
      </h1>
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
          <Link className='login-link'to="/login">Already have an account? Log in! </Link>
        </div>
      </div>
      <p className="sanrio-description" style={{ fontSize: "30px" }}>
        Remember everything and tackle any project with your notes, and
        notebooks all in one place.
      </p>
      <h3 className="login-description">
        Click on login or sign up to see what Sanrio Note has to offer...
      </h3>
    </div>
  );
}
