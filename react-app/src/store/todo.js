const GET_ALL_TODO = "todo/GET_ALL_TODO";
const GET_ONE_TODO = "todo/GET_ONE_TODO";
const CREATE_TODO = "todo/CREATE_TODO";
const EDIT_TODO = "todo/EDIT_TODO";
const DELETE_TODO = "todo/DELETE_TODO";

//action creators

const getAllTodos = (todo) => ({
  type: GET_ALL_TODO,
  payload: todo,
});

const getOneTodo = (todo) => ({
  type: GET_ONE_TODO,
  payload: todo,
});

const createTodo = (todo) => ({
  type: CREATE_TODO,
  payload: todo,
});

const editTodo = (todo) => ({
  type: EDIT_TODO,
  payload: todo,
});

const deleteTodo = (todo) => ({
  type: DELETE_TODO,
  payload: todo,
});

//thunks

export const getAllTodoThunk = () => async (dispatch) => {
  const response = await fetch(`/api/todo`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllTodoThunk(data));
    return data;
  }
};

export const getOneTodoThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${id}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getOneTodo(data));
    return data;
  }
};

export const createTodoThunk = (todo) => async (dispatch) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createTodo(data));
    return data;
  }
};

export const editTodoThunk = (todo, id) => async (dispatch) => {
  const response = await fetch(`/api/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editTodo(data));
    // return data;
  }
};

export const deleteTodoThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${id}/delete`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteTodo(id));
  }
};

const initialState = {
  allTodo: {},
  singleTodo: {},
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TODO:
      const newTodo = {};
      action.payload.forEach((todo) => {
        newTodo[todo.id] = todo;
      });
      return {
        ...state,
        allTodo: newTodo,
      };
    case GET_ONE_TODO:
      return {
        ...state,
        singleTodo: action.payload,
      };
    case CREATE_TODO:
      const newTodos = action.payload;
      return {
        ...state,
        allTodo: {
          ...state.allTodo,
          [newTodos.id]: newTodo,
        },
      };
    case EDIT_TODO:
      const updatedTodo = action.payload;
      return {
        ...state,
        allTodo: {
          ...state.allTodo,
          [updatedTodo.id]: updatedTodo,
        },
      };
    case DELETE_TODO:
      const updateTodo = { ...state.allTodo };
      delete updateTodo[action.payload];
      return {
        ...state,
        allTodo: updateTodo,
      };
    default:
      return state;
  }
};

export default todoReducer;
