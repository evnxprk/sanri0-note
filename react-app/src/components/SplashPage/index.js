import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ProfileButton from "../Navigation/ProfileButton";
import "./Splashpage.css";
import { Link } from "react-router-dom";

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
        What is Sanrio Note?
      </h1>
      <Link to="/signup">
        <button className="sign-up-button">Sign Up For Free</button>
      </Link>
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
