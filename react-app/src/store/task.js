const GET_ALL_TASKS = "tasks/GET_ALL_TASKS";
const GET_ONE_TASK = "tasks/GET_ONE_TASK";
const CREATE_TASK = "tasks/CREATE_TASK";
const EDIT_TASK = "tasks/EDIT_TASK";
const DELETE_TASK = "tasks/DELETE_TASK";

// action creators

const getAllTasks = (tasks) => ({
  type: GET_ALL_TASKS,
  payload: tasks,
});

const getOneTask = (task) => ({
  type: GET_ONE_TASK,
  payload: task,
});

const createTasks = (task) => ({
  type: CREATE_TASK,
  payload: task,
});

const editTask = (task) => ({
  type: EDIT_TASK,
  payload: task,
});

const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

// thunks

export const getAllTasksThunk = () => async (dispatch) => {
  const res = await fetch("/api/tasks");
  if (res.ok) {
    const data = await res.json();
    dispatch(getAllTasks(data));
    return data;
  }
};

// export const getOneTaskThunk = (id) => async(dispatch) => {
//     const res = await fetch (`/api/tasks/${id}`, {

//     })
// }

export const addTaskThunk = (tasks) => async (dispatch) => {
  const res = await fetch("/api/tasks/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tasks),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(createTasks(data));
    return data;
  }
};

export const editTaskThunk = (task, id) => async (dispatch) => {
  const res = await fetch(`/api/tasks/edit/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editTask(data));
    return data;
  }
};

export const deleteTaskThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/tasks/delete/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteTask(id));
  }
};

// reducer

const initialState = {
  allTasks: [],
  singleTask: {},
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TASKS:
      const newTasks = {};
      action.payload.forEach((task) => {
        newTasks[task.id] = task;
      });
      return {
        ...state,
        allTasks: action.payload,
      };
    case GET_ONE_TASK:
      return {
        ...state,
        singleTask: action.payload,
      };
    case CREATE_TASK:
      return {
        ...state,
        allTasks: [action.payload, ...state.allTasks],
      };
    case EDIT_TASK:
      return {
        ...state,
        allTasks: state.allTasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      const updatedTasks = state.allTasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        allTasks: updatedTasks,
      };
    default:
      return state;
  }
}
