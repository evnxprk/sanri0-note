import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { addListThunk, getAllListThunk } from "../../../store/list";

export default function CreateList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    const errors = [];
    if (title.length < 2 || title.length > 255) {
      errors.push(
        "Title must be longer than 2 and less than 255 characters."
      );
    }
    setErrors(errors);
  }, [title]);

  useEffect(() => {
    dispatch(getAllListThunk());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = [];
    if (title.length < 2 || title.length > 255) {
      errors.push(
        "Title must be longer than 2 and less than 255 characters."
      );
    }
    setErrors(errors);
    if (errors.length === 0) {
      let newList = {
        title: title,
        writer_id: sessionUser.id,
      };

      const list = await dispatch(addListThunk(newList));
      if (list) {
        closeModal();
        // Fetch all Lists again to update the state with the latest data
        dispatch(getAllListThunk());
        history.push("/dashboard");
      }
    }
  };

  return (
    <div>
      <div className="form-errors">
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>

      <div className="list-form-header">
        <h2>Create New List</h2>
      </div>
      <form className="list-form-content" onSubmit={handleSubmit}>
        <div className="list-form-errors"></div>
        <div className="list-form-fields">
          <label style={{textDecoration:'bold'}}>Create List</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="create-list-button" type="submit">
            Create List
          </button>
        </div>
      </form>
    </div>
  );
}
