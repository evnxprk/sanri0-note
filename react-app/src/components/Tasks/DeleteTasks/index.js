import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deleteTaskThunk, getAllTasksThunk } from "../../../store/task";

export default function DeleteTask() {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const history = useHistory()
  const {taskId} = useParams()
  
  const handleDelete = async () => {
    await dispatch(deleteTaskThunk(taskId))
    await dispatch(getAllTasksThunk())
    closeModal()
    history.push('/all-tasks')
  }
   return (
     <>
       <h1>Are you sure you want to delete this task?</h1>
       <button
         onClick={handleDelete}
         style={{ backgroundColor: "red", color: "white" }}
       >
         Yes
       </button>
       <button onClick={handleDelete}>No</button>
     </>
   );
}