import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editNoteThunk, getOneNoteThunk } from "../../store/note";
import {
  getAllNotebooksThunk,
  getOneNotebookThunk,
} from "../../store/notebook";

function XNoteDetails() {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const myNotebookState = useSelector(
    (state) => state.notebookReducer.allNotebooks
  );
  const myNotebooks = Object.values(myNotebookState);
  const myNote = useSelector((state) => state.notesReducer.singleNote);
  const [selectedNotebook, setSelectedNotebook] = useState("");
  const title = myNote.title;
  const description = myNote.description;

  useEffect(() => {
    if (myNote && myNote.notebook_id) {
      dispatch(getOneNotebookThunk(myNote.notebook_id));
    }
  }, [dispatch, myNote]);

  const myNoteNotebook = useSelector(
    (state) => state.notebookReducer.singleNotebook
  );

  useEffect(() => {
    dispatch(getAllNotebooksThunk());
    dispatch(getOneNoteThunk(noteId));
  }, [dispatch, noteId]);

  function addNoteToNotebook(notebookId) {
    const noteData = {
      title,
      description,
      notebook_id: notebookId,
      writer_id: myNote.writer_id,
    };

    dispatch(editNoteThunk(noteData, noteId))
      .then(() => dispatch(getOneNoteThunk(noteId)))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <h1>Edit Note</h1>
      <div>
        <div>{myNote.notebook_id}</div>
        <div>
          {myNoteNotebook ? <div>{myNoteNotebook.name}</div> : <div></div>}
        </div>
        <label>Notebook:</label>
        <select
          value={selectedNotebook}
          onChange={(e) => setSelectedNotebook(e.target.value)}
        >
          <option value="">Select a notebook</option>
          {myNotebooks.map((notebook) => (
            <option key={notebook.id} value={notebook.id}>
              {notebook.name}
            </option>
          ))}
        </select>
        <button onClick={() => addNoteToNotebook(selectedNotebook)}>
          Save
        </button>
      </div>
    </>
  );
}

export default XNoteDetails;
