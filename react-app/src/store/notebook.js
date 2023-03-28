const GET_ALL_NOTEBOOKS = "/notebook/GET_ALL_NOTEBOOKS";
const GET_ONE_NOTEBOOK = "/notebook/GET_ONE_NOTEBOOK";
const CREATE_NOTEBOOK = "/notebook/CREATE_NOTEBOOK";
const EDIT_NOTEBOOK= "/notebook/EDIT_NOTEBOOK";
const DELETE_NOTEBOOK = "/notebook/DELETE_NOTEBOOK";

// ACTION CREATORS

const getAllNotebooks = (allNotebooks) => {
    return {
        type: GET_ALL_NOTEBOOKS,
        allNotebooks
    }
}

const getOneNotebook = (notebook) => {
    return {
        type: GET_ONE_NOTEBOOK,
        payload: notebook
    }
}

const createNotebook = (notebook) => {
    return {
        type: CREATE_NOTEBOOK,
        payload: notebook
    }
}

const updateNotebook = (notebook) => {
    return {
        type: EDIT_NOTEBOOK,
        payload: notebook
    }
}

const deleteNotebook = (notebook) => {
    return {
        type: DELETE_NOTEBOOK,
        payload: notebook
    }
}

// THUNKS

export const getAllNotebooksThunk = () => async (dispatch) => {
    const response = await fetch(`/api/notebooks/`)

    if(response.ok) {
        const data = await response.json()
        dispatch(getAllNotebooks(data))
    }
}

export const getOneNotebookThunk = (id) => async(dispatch) => {
    const response = await fetch(`/api/notebooks/${id}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getOneNotebook(data))
        return data
    }
}

export const createNotebookThunk = (notebook) => async (dispatch) => {
    const response = await fetch("/api/notebooks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notebook),
    });


    if(response.ok){
        const data = await response.json()
        dispatch(createNotebook(data))
        return data
    }
}

export const editNotebookThunk = (id, notebook) => async (dispatch) => {
  const response = await fetch(`/api/notebooks/${id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notebook),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateNotebook(data));
    return data;
  }
};


export const deleteNotebookThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/${id}/delete`, {
        method: "DELETE",
    })

    if(response.ok) {
        const data = await response.json()
        dispatch(deleteNotebook(data))
        console.log("this is data: ", data)
    } 
}

// REDUCER 

const initialState = {
  allNotebooks: {},
  singleNotebook: {},
};

export default function notebookReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_NOTEBOOKS: {
      const allNotebooks = {};
      action.allNotebooks.forEach((notebook) => {
        allNotebooks[notebook.id] = notebook;
      });
      return {
        ...state,
        allNotebooks,
      };
    }

    case GET_ONE_NOTEBOOK: {
      return {
        ...state,
        singleNotebook: action.payload,
      };
    }
    case CREATE_NOTEBOOK: {
      newState = { ...state };
      const newNotebook = action.payload;
      newState.allNotebooks[newNotebook.id] = newNotebook;
      newState.singleNotebook = {};
      return newState;
    }

    case EDIT_NOTEBOOK: {
      newState = { ...state };
      const updateNotebook = action.payload;
      const allNotebooks = newState.allNotebooks || {}; // added check for undefined
      return {
        ...state,
        allNotebooks: {
          ...allNotebooks,
          [updateNotebook.id]: updateNotebook,
        },
      };
    }

    case DELETE_NOTEBOOK: {
      const notebookId = action.payload;
      const newNotebook = { ...state.allNotebooks };
      delete newNotebook[notebookId];
      return {
        ...state,
        allNotebooks: newNotebook,
      };
    }

    default:
      return state;
  }
}
