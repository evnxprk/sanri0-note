import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteNotebookThunk } from "../../../store/notebook";

export default function NotebookDetails() {
  const { notebookId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const notebooks = useSelector((state) => state.notebookReducer.allNotebooks);

  const notebook = notebooks[notebookId];

  if (!notebook) {
    return <h1>Notebook not found</h1>;
  }

  const handleDelete = () => {
    dispatch(deleteNotebookThunk(notebookId))
      .then(() => {
        history.push("/notebooks"); // Redirect to the notebooks page after deletion
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    history.push(`/notebooks/${notebookId}/edit`); // Redirect to the notebook edit page
  };

  return (
    <div>
      <h1>Notebook Details</h1>
      <h2>Name: {notebook.name}</h2>
      {/* Include other notebook details as needed */}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      
    </div>
  );
}
