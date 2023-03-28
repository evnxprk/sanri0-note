import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { getAllNotebooksThunk } from "../../store/notebook";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();
    const password = "password";
    const credential = "demo@aa.io";
    const response = await dispatch(login(credential, password));
    dispatch(getAllNotebooksThunk());
    closeModal();
  };

  return (
    <>
      <div className="login-modal-wrapper">
        <h1>Log In</h1>
        <div className="login-form-container"></div>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <button className="login-button" type="submit">
            Log In
          </button>
        </form>
        <div className="demo-user-container">
          <div className="or">Or</div>
            <button className="demo-user" onClick={demoUser}>
              Demo User
            </button>
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;
