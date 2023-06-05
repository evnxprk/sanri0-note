import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteListThunk } from "../../../store/list";
import './list.css'

export default function ListDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { todoId } = useParams();
  const lists = useSelector((state) => state.listReducer.allList);
  const list = lists[todoId];

  const handleEditList = () => {
    history.push(`/todos/${todoId}/edit`);
  };

  const handleDeleteList = () => {
    dispatch(deleteListThunk(todoId))
      .then(() => {
        history.push("/");
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
      <h1 className="list-title">{list.title}</h1>
      <h4 className="list-desc"> {list.description}</h4>
      <button onClick={handleEditList} className="list-edit">
        Edit
      </button>
      <button onClick={handleDeleteList} className="list-delete">
        Delete
      </button>
    </div>
  );
}
