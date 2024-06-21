const GET_ALL_LIST = "todos/GET_ALL_LIST";
const GET_ONE_LIST = "todos/GET_ONE_LIST";
const CREATE_LIST = "todos/CREATE_LIST";
const EDIT_LIST = "todos/EDIT_LIST";
const DELETE_LIST = "todos/DELETE_LIST";
const UPDATE_TASKS_FOR_LIST = "todos/UPDATE_TASKS_FOR_LIST";

// action creators

const getallList = (list) => ({
  type: GET_ALL_LIST,
  payload: list,
});

const getOneList = (list) => ({
  type: GET_ONE_LIST,
  payload: list,
});

const addList = (list) => ({
  type: CREATE_LIST,
  payload: list,
});

const editList = (list) => ({
  type: EDIT_LIST,
  payload: list,
});

const deleteList = (todoId) => ({
  type: DELETE_LIST,
  payload: todoId,
});

// thunks

export const getAllListThunk = () => async (dispatch) => {
  const res = await fetch(`/api/todos/`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getallList(data));
    return data;
  } else {
    console.error("Failed to fetch list");
    return [];
  }
};

export const getOneListThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/todos/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getOneList(data));
    return data;
  } else {
    console.error('cannot get one id')
  }
};

export const addListThunk = (list) => async (dispatch) => {
  const response = await fetch(`/api/todos/`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addList(data));
    return data;
  }
};

export const editListThunk = (listData, id) => async (dispatch) => {
  const { title } = listData; 

  const response = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listData), 
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editList(data));
  } else {
    console.error("Failed to update the list");
  }
};

export const getTasksForListThunk = (listId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/lists/${listId}/tasks`);
    if (res.ok) {
      const data = await res.json();
     
      dispatch(updateTasksForList(listId, data));
      return data;
    } else {
      console.error("Failed to fetch tasks for list", listId);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const updateTasksForList = (listId, tasks) => ({
  type: UPDATE_TASKS_FOR_LIST,
  payload: { listId, tasks },
});



export const deleteListThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/todos/${id}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteList(id));
  }
};

//reducer

const initialState = {
  allList: {},
  singleList: {},
};


const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LIST:
      const allLists = {};
      action.payload.forEach((list) => {
        allLists[list.id] = list;
      });
      return {
        ...state,
        allList: allLists,
      };
    case GET_ONE_LIST:
      return {
        ...state,
        singleList: action.payload,
        tasksByListId: {
          ...state.tasksByListId,
          [action.payload.id]: action.payload.tasks || [], 
        },
      };

    case CREATE_LIST:
      const newlist = action.payload;
      return {
        ...state,
        allList: {
          ...state.allList,
          [newlist.id]: newlist,
        },
      };
    case EDIT_LIST:
      return {
        ...state,
        allList: {
          ...state.allList,
          [action.payload.id]: action.payload,
        },
      };
    case DELETE_LIST:
      const updatedlist = { ...state.allList };
      delete updatedlist[action.payload];
      return {
        ...state,
        allList: updatedlist,
      };
    default:
      return state;
  }
};

export default listReducer;
