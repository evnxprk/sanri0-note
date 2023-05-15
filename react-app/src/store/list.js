const GET_ALL_LIST = "list/GET_ALL_LIST";
const GET_ONE_LIST = "list/GET_ONE_LIST";
const CREATE_LIST = "list/CREATE_LIST";
const EDIT_LIST = "list/EDIT_LIST";
const DELETE_LIST = "list/DELETE_LIST";

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

const deleteList = (listId) => ({
  type: DELETE_LIST,
  payload: listId,
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
  }
};

export const addListThunk = (list) => async (dispatch) => {
  const response = await fetch("/api/todos/", {
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

export const editListThunk = (list, id) => async (dispatch) => {
  const res = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editList(data));
    // return data;
  }
};

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
      const allList = {};
      action.payload.forEach((list) => {
        allList[list.id] = list;
      });
      return {
        ...state,
        allList: allList,
      };
    case GET_ONE_LIST:
      return {
        ...state,
        singleList: action.payload,
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
      const updatelist = action.payload;
      return {
        ...state,
        allList: {
          ...state.allList,
          [updatelist.id]: updatelist,
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
