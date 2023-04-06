import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ProfileButton from "../Navigation/ProfileButton";
import { Link, NavLink } from "react-router-dom";
import pochogif from "../../images/pochacco.gif";
import pomgif from "../../images/pompom.gif";
import notepage from "../../images/Cinnamoroll.jpg";
import "./Splashpage.css";

export default function SplashPage() {
  const sessionUser = useSelector((state) => state.session.user);

  // If the user is already logged in, redirect to the home page
  if (sessionUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="splash-page-container">
      <div className="splash-nav">
        <ProfileButton user={sessionUser} />
      </div>

      <div className="splash-content">
        <div className="notepage-photo">
          <img id="note-logo" src={notepage} alt="Sanrio Note logo" />
        </div>

        <div className="description">
          <h1 className="title">Welcome to Sanrio Note</h1>
          <p className="subtitle">
            Keep track of your notes and notebooks. Create a single note, or
            create multiple. The options are endless when it comes to organizing
            your thoughts.
          </p>

          <div className="cta-buttons">
            <Link to="/signup">
              <button className="sign-up-button">Sign Up For Free</button>
            </Link>
            <Link className="login-link" to="/login">
              Already have an account? Log in!
            </Link>
          </div>
        </div>
      </div>

      <div className="features">
        <h2 className="features-title">Features</h2>

        <div className="feature">
          <img src={notepage} alt="Notebook icon" className="feature-icon" />
          <h3 className="feature-title">Notebooks</h3>
          <p className="feature-description">
            Organize your notes into notebooks, and keep them all in one place.
          </p>
        </div>

        <div className="feature">
          <img src={notepage} alt="Note icon" className="feature-icon" />
          <h3 className="feature-title">Notes</h3>
          <p className="feature-description">
            Create notes with ease, and customize them to fit your needs.
          </p>
        </div>

        <div className="feature">
          <img src={notepage} alt="Calendar icon" className="feature-icon" />
          <h3 className="feature-title">Reminders</h3>
          <p className="feature-description">
            Set reminders for your notes, and never forget an important task
            again.
          </p>
        </div>
      </div>
 

      <div className="pricing">
        <h2 className="pricing-title">Pricing</h2>

        <div className="plan">
          <h3 className="plan-title">The best part of all this is that it's free!</h3>
          <p className="plan-description">
            Get started with Sanrio Note for free, and enjoy basic features like
            notes and notebooks.
          </p>
          <Link to="/signup">
            <button className="plan-button">Sign Up For Free</button>
          </Link>
        </div>
      </div>

      <div className="footer">
        <div className="happy-place">
          <p className="happy-place-title">
            Find your happy place at Sanrio Note!
          </p>
        </div>

        <div className="social-media">
          <span className="social-media-title">Follow us on social media:</span>

          <div className="social-media-buttons">
            <NavLink
              className="github-button"
              to={{ pathname: "https://github.com/evnxprk" }}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Github
              <img src={pochogif} alt="GitHub icon" />
            </NavLink>

            <NavLink
              className="linkedin-button"
              to={{ pathname: "https://www.linkedin.com/in/eunicexpark01/" }}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
              <img src={pomgif} alt="LinkedIn icon" />
            </NavLink>
          </div>
        </div>

        <div className="legal">
          <NavLink to="/terms" className="legal-link">
            Terms of Service
          </NavLink>
          <NavLink to="/privacy" className="legal-link">
            Privacy Policy
          </NavLink>
          <span className="legal-text">© 2023 Sanrio Note</span>
        </div>
      </div>
    </div>
  );
}

