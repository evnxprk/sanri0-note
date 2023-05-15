import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import {
  addTodoThunk,
  deleteTodoThunk,
  getAllTodoThunk,
} from "../../../store/todo";

// import "../tasks.css";


export default function Todo() {
  const dispatch = useDispatch();
  const getAllTodo = useSelector((state) => state.todoReducer);
  const todo = Object.values(getAllTodo.allTodo);
  const history = useHistory();
  const { closeModal, setModalContent, ModalContent } = useModal();
  const [todoToDelete, setTodoToDelete] = useState(null);
  const sessionUser = useSelector((state) => state.session.user);
  const [newTitle, setNewTitle] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  useEffect(() => {
    dispatch(getAllTodoThunk());
  }, [dispatch]);

  const handleDeleteTask = async (todoId) => {
    await dispatch(deleteTodoThunk(todoId));
    // history.push('/dashboard')
  };

  const handleConfirmDelete = (todoId) => {
    dispatch(deleteTodoThunk(todoId))
      .then(() => {
        setNewTitle(null);
        history.push("/dashboard");
        closeModal();
        setModalContent(null);
      })
      .catch((err) => console.log(err));
  };
  if (todo.length === 0) {
    return <h1 className="first-todo"> Create your first todo item! </h1>;
  }
  if (!sessionUser) {
    history.push("/");
    return null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      title: newTitle,
      writer_id: selectedTodoId,
    };
    dispatch(addTodoThunk(newTodo))
      .then(() => {
        setNewTitle("");
        setSelectedTodoId(null);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (todoId) => {
    history.push(`/todo/${todoId}/edit`);
  };

  if (!todo.length) return null;

  return (
    <div className="todo-main-box">
      {todo.map((todos) => {
        return (
          <div
            key={todos.id}
            className="todo-box"
            onClick={() => handleEdit(todos.id)}
          >
            <div>{todos.title}</div>
          </div>
        );
      })}
    </div>
  );
}
