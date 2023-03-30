// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
// import { useModal } from "../../context/Modal";
// import { editNoteThunk, removeNoteThunk } from "../../store/note";
// import { getAllNotebooksThunk } from "../../store/notebook";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// // import "./NoteDetail.css";

// export default function NoteDetail() {
//   const { noteId } = useParams();
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const sessionUser = useSelector((state) => state.session.user);
//   const note = useSelector((state) => state.noteReducer.notes[noteId]);
//   const [errors, setErrors] = useState([]);
//   const [editing, setEditing] = useState(false);
//   const [title, setTitle] = useState(note?.title);
//   const [description, setDescription] = useState(note?.description);
//   const [notebookId, setNotebookId] = useState(note?.notebook_id);
//   const allNotebooks = useSelector(
//     (state) => state.notebookReducer.allNotebooks
//   );

//   useEffect(() => {
//     const editor = new Quill("#editor-container", {
//       theme: "snow",
//     });
//     editor.root.innerHTML = note?.description;
//     editor.on("text-change", () => {
//       setDescription(editor.root.innerHTML);
//     });
//   }, [note?.description]);

//   useEffect(() => {
//     const errors = [];
//     if (title.length < 2 || title.length > 50) {
//       errors.push("Title must be longer than 2 and less than 50 characters.");
//     }
//     if (description.length < 2 || description.length > 255) {
//       errors.push(
//         "Description must be longer than 2 and less than 255 characters."
//       );
//     }
//     setErrors(errors);
//   }, [title, description]);

//   useEffect(() => {
//     dispatch(getAllNotebooksThunk());
//   }, [dispatch]);

//   const handleCancelClick = () => {
//     setTitle(note?.title);
//     setDescription(note?.description);
//     setNotebookId(note?.notebook_id);
//     setEditing(false);
//   };

//   const handleEditClick = () => {
//     setEditing(true);
//   };

//   const handleSaveClick = async () => {
//     const editedNote = {
//       id: noteId,
//       title,
//       description,
//       notebook_id: notebookId,
//     };

//     const savedNote = await dispatch(editNoteThunk(editedNote));
//     if (savedNote) {
//       setEditing(false);
//     }
//   };

//   const handleDeleteClick = async () => {
//     const deletedNote = await dispatch(removeNoteThunk(noteId));
//     if (deletedNote) {
//       history.push("/dashboard");
//     }
//   };

//   const renderNoteDetail = () => {
//     if (editing) {
//       return (
//         <div className="note-detail">
//           <input
//             type="text"
//             required
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <div id="editor-container" className="editor-container"></div>
//           <div>
//             <select
//               value={notebookId}
//               onChange={(e) => setNotebookId(e.target.value)}
//             >
//               <option value="">None</option>
//               {allNotebooks.map((notebook) => (
//                 <option key={notebook.id} value={notebook.id}>
//                   {notebook.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="note-buttons">
//             <button onClick={handleCancelClick}>Cancel</button>
//             <button
//               onClick={handleSaveClick}
//               disabled={errors.length > 0 || !title}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="note-detail">
//         <h2>{note?.title}</h2>
//         <div dangerouslySetInnerHTML={{ __html: note?.description }}></div>
//         <div className="note-meta">
//           <div>{note?.writer.username}</div>
//           <div>{note?.notebook?.name || "No notebook"}</div>
//           <div>{new Date(note?.created_at).toLocaleDateString()}</div>
//           <div className="note-buttons">
//             {sessionUser.id === note?.writer.id && (
//               <>
//                 <button onClick={handleEditClick}>Edit</button>
//                 <button onClick={handleDeleteClick}>Delete</button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="note-detail-container">
//       {note ? (
//         renderNoteDetail()
//       ) : (
//         <div className="no-note-message">No note found</div>
//       )}
//     </div>
//   );
// }
