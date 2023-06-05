import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllListThunk } from "../../../store/list";
import "../todo.css"; // Import the CSS file for Tasks component

export default function Lists() {
  const dispatch = useDispatch();
  const history = useHistory();
  const getAllLists = useSelector((state) => state.listReducer);
  const lists = Object.values(getAllLists.allList);

  useEffect(() => {
    dispatch(getAllListThunk());
  }, [dispatch]);

  if (lists.length === 0) {
    return <h1 className="first-list">Create your first list!</h1>;
  }

  const handleTaskClick = (todoId) => {
    history.push(`/todos/${todoId}`);
  };

  return (
    <div className="list-main-box">
      {lists.map((list) => (
        <div
          key={list.id}
          className="list-box"
          onClick={() => handleTaskClick(list.id)}
        >
          {list.title}
        </div>
      ))}
    </div>
  );
}
