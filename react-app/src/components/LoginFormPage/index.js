import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

   const handleSubmit = async (e) => {
     e.preventDefault();
     const errors = [];
    //  if (password.length < 6) {
    //    errors.push("Password must be at least 6 characters long.");
    //  }
    
     if (password !== confirmPassword) {
       errors.push(
         "Confirm Password field must be the same as the Password field"
       );
     }
     if (!email.includes("@") || !email.includes(".")) {
       errors.push("Please enter a valid email address.");
     }
     if (errors.length === 0) {
       const data = await dispatch(login(email, password));
       if (data) {
         setErrors(data);
       }
     } else {
       setErrors(errors);
     }
   };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button
          className="login-button"
          type="submit"
          style={{ backgroundColor: "antiqueWhite" }}
        >
          Log In
        </button>
      </form>
    </>
  );
}

export default LoginFormPage;
