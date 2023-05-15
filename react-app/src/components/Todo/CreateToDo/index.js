// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
// import { useModal } from "../../../context/Modal";
// import { addTodoThunk, getAllTodoThunk } from "../../../store/todo";


// export default function CreateTodo() {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const { closeModal } = useModal();
//   const [title, setTitle] = useState("");
//   const [errors, setErrors] = useState([]);
//   const sessionUser = useSelector((state) => state.session.user);

//   useEffect(() => {
//     const errors = [];
//     if (title.length < 2 || title.length > 50) {
//       errors.push(
//         "Title must be longer than 2 and less than 50 characters."
//       );
//     }
//     setErrors(errors);
//   }, [title]);

//   useEffect(() => {
//     dispatch(getAllTodoThunk());
//   }, [dispatch]);

//  const handleSubmit = async (e) => {
//    e.preventDefault();

//    let errors = [];
//    if (title.length < 2 || title.length > 50) {
//      errors.push("Title must be longer than 2 and less than 50 characters.");
//    }
//    setErrors(errors);
//    if (errors.length === 0) {
//      let newTodo = {
//        title: title,
//        writer_id: sessionUser.id,
//      };
//      console.log("New Todo:", newTodo);

//      const todo = await dispatch(addTodoThunk(newTodo)); // Dispatch the createTodoThunk thunk
//      console.log('todo hits?: ', todo)
//      if (todo) {
//        closeModal();
//        dispatch(getAllTodoThunk());
//        history.push("/dashboard");
//      }
//    }
//  };

//   return (
//     <div>
//       <div className="form-errors">
//         {errors.map((error, idx) => (
//           <div key={idx}>{error}</div>
//         ))}
//       </div>

//       <div className="todo-form-header">
//         <h2>Create New Todo</h2>
//       </div>
//       <form className="todo-form-content" onSubmit={handleSubmit}>
//         <div className="todo-form-errors"></div>
//         <div className="todo-form-fields">
//           <label>Title</label>
//           <input
//             type="text"
//             required
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <button className="create-todo-button" type="submit">
//             Create Todo
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { addTodoThunk, getAllTodoThunk } from "../../../store/todo";

export default function CreateTodo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    const errors = [];
    if (title.length < 2 || title.length > 255) {
      errors.push(
        "Title must be longer than 2 and less than 255 characters."
      );
    }
    setErrors(errors);
  }, [title]);

  useEffect(() => {
    dispatch(getAllTodoThunk());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = [];
    if (title.length < 2 || title.length > 255) {
      errors.push(
        "Title must be longer than 2 and less than 255 characters."
      );
    }
    setErrors(errors);
    if (errors.length === 0) {
      let newTodo = {
        title: title,
        writer_id: sessionUser.id,
      };

      const todo = await dispatch(addTodoThunk(newTodo));
      if (todo) {
        closeModal();
        // Fetch all todos again to update the state with the latest data
        dispatch(getAllTodoThunk());
        history.push("/dashboard");
      }
    }
  };

  return (
    <div>
      <div className="form-errors">
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>

      <div className="todo-form-header">
        <h2>Create New Todo</h2>
      </div>
      <form className="todo-form-content" onSubmit={handleSubmit}>
        <div className="todo-form-errors"></div>
        <div className="todo-form-fields">
          <label>Todo:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="create-todo-button" type="submit">
            Create todo
          </button>
        </div>
      </form>
    </div>
  );
}
