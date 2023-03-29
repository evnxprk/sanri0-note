const GET_ALL_NOTES = "notes/GET_ALL_NOTES";
const GET_ONE_NOTE = "notes/GET_ONE_NOTE";
const CREATE_NOTE = "notes/CREATE_NOTE";
const EDIT_NOTE = "notes/EDIT_NOTE";
const DELETE_NOTE = "notes/DELETE_NOTE";
// const ADD_NOTE_TO_NOTEBOOK = 'notes/ADD_NOTE_TO_NOTEBOOK'
// const DELETE_NOTE_TO_NOTEBOOK = 'notes/DELETE_NOTE_TO_NOTEBOOK'

// ACTION CREATOR

const getAllNotes = (allNotes) => {
  return {
    type: GET_ALL_NOTES,
    allNotes,
  };
};

const getOneNote = (note) => ({
  type: GET_ONE_NOTE,
  payload: note,
});

const createNote = (note) => ({
  type: CREATE_NOTE,
  payload: note,
});

const updateNote = (note) => ({
  type: EDIT_NOTE,
  payload: note,
});

const deleteNote = (id) => ({
  type: DELETE_NOTE,
  payload: id,
});

// const editNote = (data) => {
//   return {
//     type: EDIT_NOTE,
//     payload: data,
//   };
// };

// const addNotetoNotebook = data => ({
//     type: ADD_NOTE_TO_NOTEBOOK,
//     payload: data
// })

// const deleteNotetoNotebook = data => ({
//     type: DELETE_NOTE_TO_NOTEBOOK,
//     payload: data
// })

// THUNKS

export const getAllNotesThunk = () => async (dispatch) => {
  const response = await fetch(`/api/notes/`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllNotes(data));
  }
};

export const getOneNoteThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/notes/${id}`, {
    headers: {
      "Content-Type": "application/JSON"
    }
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getOneNote(data));
    return data;
  }
};

export const createNoteThunk = (note) => async (dispatch) => {
  const response = await fetch("/api/notes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createNote(data));
    return data;
  }
};

export const editNoteThunk = (noteData, noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(noteData)
  });

  if (response.ok) {
    console.log("RESPONSE WENT THROUGH");
    console.log("DATA GONE THROUGH????")
    const data = await response.json();
    dispatch(updateNote(data));
    return data
  } 
};

export const removeNoteThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/notes/${id}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteNote(data));
    console.log("this is data: ", data);
    // return data
  }
};


// export const addNotetoNotebookThunk = (noteId, notebookId) => async (dispatch) => {
//   const response = await fetch(`/api/notes/${noteId}/notebooks/${notebookId}/add-new`, {
//     method: "PUT"
//   })

//   if(response.ok){ 
//     const data = await response.json()
//     dispatch(addNotetoNotebook(data))
//     return data
//   }
// }

// export const deleteNoteFromNotebookThunk = (noteId) => async(dispatch) => {
//   const response = await fetch(`/api/notes/${noteId}/delete`, {
//     method: 'PUT'
//   })
//   if(response.ok) {
//     const data = await response.json()
//     dispatch(deleteNotetoNotebook(data))
//     return data
//   }
// }

// REDUCER

const initialState = {
  allNotes: {},
  singleNote: {},
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTES: {
      const allNotes = {};
      action.allNotes.forEach((note) => {
        allNotes[note.id] = note;
      });
      return {
        ...state,
        allNotes,
      };
    }
    case GET_ONE_NOTE: {
      return {
        ...state,
        singleNote: action.payload,
      };
    }
    case CREATE_NOTE: {
      const newNote = action.payload;
      return {
        ...state,
        allNotes: {
          ...state.allNotes,
          [newNote.id]: newNote,
        },
      };
    }
    case EDIT_NOTE: {
      const editedNote = action.payload;
      return {
        ...state,
        allNotes: {
          ...state.allNotes,
          [editedNote.id]: editedNote,
        },
      };
    }
    case DELETE_NOTE: {
      const noteId = action.payload;
      const newNotes = { ...state.allNotes };
      delete newNotes[noteId];
      return {
        ...state,
        allNotes: newNotes,
      };
    }
    default:
      return state;
  }
};

export default notesReducer;
