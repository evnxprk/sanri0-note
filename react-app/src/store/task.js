const GET_ALL_TASKS = "/tasks/GET_ALL_TASKS";
const GET_ONE_TASK = "/tasks/GET_ONE_TASK";
const CREATE_TASK = "/tasks/CREATE_TASK";
const EDIT_TASK= "/tasks/EDIT_TASK";
const DELETE_TASK = "/tasks/DELETE_TASK";

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
  try {
    const res = await fetch(`/api/tasks/`);
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data = await res.json();
    dispatch(getAllTasks(data));
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const getOneTaskThunk = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/api/tasks/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch task");
    }
    const data = await res.json();
    dispatch(getOneTask(data));
    return data;
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
  }
};

export const addTaskThunk = (task) => async (dispatch) => {
  try {
    const res = await fetch("/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      throw new Error("Failed to create task");
    }
    const data = await res.json();
    dispatch(createTasks(data));
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

export const editTaskThunk = (taskId, updatedTask) => async (dispatch) => {
  try {
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    if (!res.ok) {
      throw new Error("Failed to update task");
    }
    const data = await res.json();
    dispatch(editTask(data));
    return data;
  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error);
    throw error;
  }
};

export const deleteTaskThunk = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/api/tasks/${id}/delete`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete task");
    }
    dispatch(deleteTask(id));
    return true; // Return true or any relevant data upon successful delete
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw error;
  }
};
const initialState = {
  allTasks: {},
  singleTask: {},
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return {
        ...state,
        allTasks: action.payload.reduce(
          (acc, task) => ({
            ...acc,
            [task.id]: task,
          }),
          {}
        ),
      };
    case GET_ONE_TASK:
      return {
        ...state,
        singleTask: action.payload,
      };
    case CREATE_TASK:
      return {
        ...state,
        allTasks: {
          ...state.allTasks,
          [action.payload.id]: action.payload,
        },
      };
    case EDIT_TASK:
      return {
        ...state,
        allTasks: {
          ...state.allTasks,
          [action.payload.id]: action.payload,
        },
      };
    case DELETE_TASK:
      const { [action.payload]: deletedTask, ...remainingTasks } =
        state.allTasks;
      return {
        ...state,
        allTasks: remainingTasks,
      };
    default:
      return state;
  }
};

export default taskReducer;