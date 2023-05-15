const GET_ALL_TODO = "todo/GET_ALL_TODO";
const GET_ONE_TODO = "todo/GET_ONE_TODO";
const CREATE_TODO = "todo/CREATE_TODO";
const EDIT_TODO = "todo/EDIT_TODO";
const DELETE_TODO = "todo/DELETE_TODO";

// action creators

const getAllTodo = (todo) => ({
  type: GET_ALL_TODO,
  payload: todo,
});

const getOneTodo = (todo) => ({
  type: GET_ONE_TODO,
  payload: todo,
});

const addTodo = (todo) => ({
  type: CREATE_TODO,
  payload: todo,
});

const editTodo = (todo) => ({
  type: EDIT_TODO,
  payload: todo,
});

const deleteTodo = (todoId) => ({
  type: DELETE_TODO,
  payload: todoId,
});

// thunks

export const getAllTodoThunk = () => async (dispatch) => {
  const res = await fetch(`/api/todo/`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getAllTodo(data));
    return data;
  } else {
    console.error("Failed to fetch todo");
    return [];
  }
};

export const getOneTodoThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/todo/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getOneTodo(data));
    return data;
  }
};

export const addTodoThunk = (todo) => async (dispatch) => {
  const response = await fetch("/api/todo/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addTodo(data));
    return data;
  }
};

export const editTodoThunk = (todo, id) => async (dispatch) => {
  const res = await fetch(`/api/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editTodo(data));
    // return data;
  }
};

export const deleteTodoThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/todo/${id}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteTodo(id));
  }
};

//reducer

const initialState = {
  allTodo: {}, 
  singleTodo: {},
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TODO:
      const allTodo = {};
      action.payload.forEach((todo) => {
        allTodo[todo.id] = todo;
      });
      return {
        ...state,
        alltodo: allTodo,
      };
    case GET_ONE_TODO:
      return {
        ...state,
        singleTodo: action.payload,
      };
    case CREATE_TODO:
      const newTodo = action.payload;
      return {
        ...state,
        alltodo: {
          ...state.allTodo,
          [newTodo.id]: newTodo,
        },
      };
    case EDIT_TODO:
      const updateTodo = action.payload;
      return {
        ...state,
        alltodo: {
          ...state.allTodo,
          [updateTodo.id]: updateTodo,
        },
      };
    case DELETE_TODO:
      const updatedTodo = { ...state.allTodo };
      delete updatedTodo[action.payload];
      return {
        ...state,
        alltodo: updatedTodo,
      };
    default:
      return state;
  }
};

export default todoReducer;
