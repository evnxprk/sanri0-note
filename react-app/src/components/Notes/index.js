import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllNotesThunk } from "../../store/note";

export default function Notes() {
  const history = useHistory();
  const dispatch = useDispatch();
  const getAllNotes = useSelector((state) => state.notesReducer);
  const notes = Object.values(getAllNotes.allNotes);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllNotesThunk());
  }, [dispatch]);

  if (!sessionUser) {
    history.push("/");
    return null; 
  }

  if (notes.length === 0) {
    return <h1 className="first-note"> NO NOTES!!! Create your first note! </h1>;
  }

  return (
    <>
      {notes.map((note) => {
        return (
        <>
        <NavLink to={`/notes/${note.id}`}>
          <div key={note.id}>
            <div>{note.title}</div>
            <div>{note.description}</div>
          </div>
        </NavLink>
        </>
        );
      })}
    </>
  );
}
