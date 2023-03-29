// import { useModal } from "../../context/Modal";
import { editNotebookThunk } from "../../store/notebook";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import { useParams } from "react-router-dom";

export default function EditNotebook() {
    // console.log("sup");
  const dispatch = useDispatch();
  const history = useHistory();
  const { notebookId } = useParams();
  const notebooks = useSelector(
    (state) => state.notebookReducer.singleNotebook
  );
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (notebooks.name) {
      setName(notebooks.name);
    }
  }, [notebooks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notebookData = {
      name,
    };

    if (notebookId) {
      await dispatch(editNotebookThunk(notebookId, notebookData))
        .then(() => {
          // closeModal();
        })
        .catch(async (res) => {
          if (res && res.json) {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          } else {
            console.error("Invalid response format:", res);
          }
        });
      }
      history.push('/dashboard');
  };

  return (
    <>
      <div className="edit-notebook-form">
        <h1> Edit Notebook</h1>
      </div>
      <div className="edit-form-container">
        <div className="edit-form-errors">
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
        <form className="edit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            required
          />
          <button className="edit-submit-button" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
}
