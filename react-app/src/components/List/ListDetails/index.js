import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteListThunk, getOneListThunk } from "../../../store/list";

export default function ListDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { listId } = useParams();
  const list = useSelector((state) => state.listReducer.singleList);

  useEffect(() => {
    dispatch(getOneListThunk(listId));
  }, [dispatch, listId]);

  const handleEditList = () => {
    history.push(`/todos/${listId}/edit`);
  };

  const handleDeleteList = () => {
    dispatch(deleteListThunk(listId))
      .then(() => {
        history.push("/todos");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!list) {
    return <h1>List not found</h1>;
  }

  return (
    <div>
      <h1>{list.title}</h1>
      <h3>{list.description}</h3>
      <button onClick={handleEditList}>Edit</button>
      <button onClick={handleDeleteList}>Delete</button>
    </div>
  );
}
