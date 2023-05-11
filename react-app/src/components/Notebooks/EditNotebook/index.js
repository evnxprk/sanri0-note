// import { useModal } from "../../context/Modal";
import { editNotebookThunk } from "../../../store/notebook";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteNotebookThunk } from "../../../store/notebook";
import { useModal } from "../../../context/Modal";
import Modal from "../../Modal";
import './editNotebook.css'
// import sam from '../../images/sam.gif'
import { getNotesByNotebookIdThunk } from "../../../store/note";

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
    dispatch(getNotesByNotebookIdThunk(notebookId))
  }, [dispatch])

  useEffect(() => {
    if (notebooks.name) {
      setName(notebooks.name);
    }
  }, [notebooks]);


  const notesAttachedSel = useSelector((state) => state.notesReducer)
  const notesAttached = Object.values(notesAttachedSel.allNotes)
  console.log('hi', notesAttached)

  useEffect(() => {
    if (notebooks.name) {
      setName(notebooks.name);
    }
  }, [notebooks]);

  useEffect(() => {
    const errors = []
     if (name.length < 2 || name.length > 50) {
       errors.push("Name must be longer than 2 and less than 50 characters.");
     }
     setErrors(errors)
  },[name])

 const handleSubmit = async (e) => {
   e.preventDefault();

   const notebookData = {
     name,
   };

   const errors = [];
   if (name.length < 2 || name.length > 50) {
     errors.push("Name must be longer than 2 and less than 50 characters.");
   }
   setErrors(errors);

   if (errors.length === 0) {
     if (notebookId) {
       await dispatch(editNotebookThunk(notebookId, notebookData)).catch(
         (res) => {
           console.error("Invalid response format:", res);
         }
       );
     }
     history.push("/dashboard");
   }
 };





  //* Delete Merge

  const allNotebooks = useSelector(
    (state) => state.notebookReducer.allNotebooks
  );
  const notebookValues = Object.values(allNotebooks);
  const { ModalContent, closeModal, setModalContent } = useModal();
  const [editedNotebookName, setEditedNotebookName] = useState("");
  const [notebookToEdit, setNotebookToEdit] = useState(null);

    const handleDelete = (notebookId) => {
      setModalContent(
        <div>
          <p>Are you sure you want to delete this notebook?</p>
          <button
            onClick={() => {
              dispatch(deleteNotebookThunk(notebookId))
                .then(() => {
                  closeModal();
                  setModalContent(null);
                  history.push("/");
                })
                .catch((err) => console.log(err));
            }}
          >
            Yes
          </button>
          <button onClick={closeModal}>No</button>
        </div>
      );
    };

  return (
    <>
      <div className="edit-notebook-form"></div>
      <div className="edit-form-container">
        <div className="edit-form-errors">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <div
          className="form-box"
          style={{ border: "1px solid black", borderRadius: "20px", width:"50%", justifyContent:'center', display:"grid" }}
        >
          <div
            style={{ fontSize: "24px", textAlign: "center", marginTop: "10px" }}
          >
            <img style={{ width: "100px", marginLeft: "20px" }}></img>
            Edit Notebook
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
              Save Changes
            </button>
          </form>
          <div
            className="notebook-delete-container"
            style={{ justifyContent: "center", display: "flex" }}
          >
            <button
              className="edit-notebook-delete-button"
              onClick={() => handleDelete(notebookId)}
            >
              Delete Notebook
            </button>
          </div>
        </div>
        {notebookToEdit && (
          <form onSubmit={handleSubmit}>
            <label>
              Notebook Name:
              <input
                type="text"
                value={editedNotebookName}
                onChange={(e) => setEditedNotebookName(e.target.value)}
                required
              />
            </label>
            {/* <button type="submit">Save Changes</button> */}
          </form>
        )}
        <Modal ModalContent={ModalContent} />
        <ul className='notes-attached-box' style={{ fontWeight: '600', fontSize: '20px'}}>Notes Attached
        {notesAttached.map((note) => {
          return (
            <li style={{ fontWeight: '100', fontSize: '15px'}}>{note.title}</li>
            )
          })}
          </ul>
      </div>
    </>
  );
}
