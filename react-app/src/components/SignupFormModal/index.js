import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

 const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    if (username.length < 2 || username.length > 30) {
      errors.push("Username must be between 2 and 30 characters long.");
    }
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }
    if (password !== confirmPassword) {
      errors.push(
        "Confirm Password field must be the same as the Password field"
      );
    }
    if (!email.includes("@") || !email.includes(".")) {
      errors.push("Please enter a valid email address.");
    }
    if (errors.length === 0) {
      closeModal()
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(errors);

    }
  };

  return (
    <>
      <div className="signup-form-container">
        <h1>Sign Up</h1>
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
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
