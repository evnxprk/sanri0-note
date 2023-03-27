import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getAllNotebooksThunk } from "../../store/notebook";

export default function Notebook() {
  const history = useHistory();
  const dispatch = useDispatch();
  const allNotebooks = useSelector((state) => state.notebookReducer);
  console.log('this', allNotebooks)
  const notebooks = Object.values(allNotebooks.allNotebooks)
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllNotebooksThunk());
  }, [dispatch]);

  if (!sessionUser) {
    history.push("/");
    return null;
  }

  if (notebooks.length === 0) {
    return (
      <h1 className="first-notebook">
        {" "}
        No Notebooks! Create your first notebook!
      </h1>
    );
  }

  return (
    <>
      {notebooks.map((notebook) => {
        return (
          <NavLink to={`/notebooks/${notebook.id}`} key={notebook.id}>
            <div>
              <div>{notebook.name}</div>
            </div>
          </NavLink>
        );
      })}
    </>
  );
}
