import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskThunk,
  editTaskThunk,
  getAllTasksThunk,
} from "../../store/task";
import AddTask from "../AddTasks";

export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskReducer.allTasks);
  const allTasks = Object.values(tasks);

  useEffect(() => {
    dispatch(getAllTasksThunk());
  }, [dispatch]);

  const editTaskChange = async (taskId, task) => {
    await dispatch(editTaskThunk(taskId, task));
  };

  const handleDelete = async (id) => {
    await dispatch(deleteTaskThunk(id));
    dispatch(getAllTasksThunk());
  };

  return (
    <div className="task-notebook-container">
      <h1 style={{ textAlign: "center" }}>Tasks</h1>
      <div className="task-list">
        <div id="task-toggle-modal">
          <OpenModalButton
            buttonText="Add Task"
            className="add-task-modal"
            modalComponent={<AddTask />}
          ></OpenModalButton>
        </div>
        <ul>
          {filteredTasks.map((task) => (
            <div id="task-container">
              <li id="task-list-one" key={task.id}>
                {task.task_content}
              </li>
              <div>
                <div id="task-toggle-modal-pencil">
                  <OpenModalButton
                    buttonText={pencil}
                    className=""
                    modalComponent={<EditTask taskId={task.id} task={task} />}
                  ></OpenModalButton>
                </div>
                <i
                  class="fa-solid fa-xmark"
                  onClick={() => handleDelete(task.id)}
                ></i>
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => handleCheckboxChange(task.id, task)}
                />
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
