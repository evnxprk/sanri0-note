import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteListThunk } from "../../../store/list";

export default function ListDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { listId } = useParams();
  const lists = useSelector((state) => state.listReducer.allList);
  const list = lists[listId];

  const handleEditList = () => {
    history.push(`/todo/${listId}/edit`);
  };

  const handleDeleteList = () => {
    dispatch(deleteListThunk(listId))
      .then(() => {
        history.push("/tasks");
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
      <h4>{list.description}</h4>
      <button onClick={handleEditList}>Edit</button>
      <button onClick={handleDeleteList}>Delete</button>
    </div>
  );
}
