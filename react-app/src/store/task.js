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
  const res = await fetch(`/api/tasks/`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getAllTasks(data));
    console.log('this got hit whoo')
    return data;
  } else {
    console.error("Failed to fetch tasks");
    return [];
  }
};

export const getOneTaskThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getOneTask(data));
    return data;
  }
};

export const addTaskThunk = (task) => async (dispatch) => {
  const response = await fetch("/api/tasks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createTasks(data));
    return data;
  }
};


export const editTaskThunk = (task, id) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editTask(data));
    // return data;
  }
};

export const deleteTaskThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${id}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteTask(id));
  }
};

//reducer 

const initialState = {
  allTasks: {}, // Initialize allTasks as an empty object
  singleTask: {},
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      const newTasks = {};
      action.payload.forEach((task) => {
        newTasks[task.id] = task;
      });
      return {
        ...state,
        allTasks: newTasks,
      };
    case GET_ONE_TASK:
      return {
        ...state,
        singleTask: action.payload,
      };
    case CREATE_TASK:
      const newTask = action.payload;
      return {
        ...state,
        allTasks: {
          ...state.allTasks,
          [newTask.id]: newTask,
        },
      };
    case EDIT_TASK:
      const updatedTask = action.payload;
      return {
        ...state,
        allTasks: {
          ...state.allTasks,
          [updatedTask.id]: updatedTask,
        },
      };
    case DELETE_TASK:
      const updatedTasks = { ...state.allTasks };
      delete updatedTasks[action.payload];
      return {
        ...state,
        allTasks: updatedTasks,
      };
    default:
      return state;
  }
};

export default taskReducer;
