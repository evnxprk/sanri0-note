import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createNotebookThunk } from "../../store/notebook";

export default function CreateNotebook() {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const [hasSubmitted, setSubmitted] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const newName = (e) => setName(e.target.value);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (name.length < 1) {
      errors.push("Name must be longer than 1 character long.");
    }
    setErrors(errors);
    setSubmitted(false)
  }, [name]);

 const handleSubmit = (e) => {
   e.preventDefault();
   const newNotebook = {
     name,
   };
   dispatch(createNotebookThunk(newNotebook))
     .then((notebook) => {
       if (notebook) {
         history.push("/notebooks");
         closeModal();
       } 
     })
     .catch((error) => {
       setErrors([error.message]);
     });
 };



  return (
    <div>
      <div className="create-form-header">
        <h2>Create New Notebook</h2>
        <button
          type="button"
          onClick={closeModal}
          style={{ cursor: "pointer" }}
        >
          X
        </button>
      </div>
      <form className="create-form-content" onSubmit={handleSubmit}>
        <div className="form-errors">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <div className="form-fields">
          <label>Name</label>
          <input type="text" required value={name} onChange={newName} />
          <button className="create-notebook-button" type="submit">
            Create Notebook
          </button>
        </div>
      </form>
    </div>
  );
}
