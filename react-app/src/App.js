import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Notes from "./components/Notes";
import CreateNote from "./components/Notes/CreateNote";
import EditNote from "./components/Notes/EditNote";
import DeleteNote from "./components/Notes/DeleteNote";
import Notebook from "./components/Notebooks";
import EditNotebook from "./components/Notebooks/EditNotebook";
import CreateNotebook from "./components/Notebooks/CreateNotebook";
import DeleteNotebook from "./components/Notebooks/DeleteNotebook";
import DashBoard from "./components/Dashboard";
import SplashPage from "./components/SplashPage";
import XNoteDetails from "./components/XNoteDetails";
import CreateTask from "./components/Tasks/AddTasks";
import Tasks from "./components/Tasks/AllTasks";
import EditTask from "./components/Tasks/EditTasks";
import DeleteTask from "./components/Tasks/DeleteTasks";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/dashboard">
            <DashBoard />
          </Route>
          <Route exact path='/tasks/new'>
            <CreateTask />
          </Route>
          <Route exact path='/tasks/:taskId/edit'>
            <EditTask />
          </Route>
        <Route exact path ='/tasks/:taskId/delete'>
          <DeleteTask />
        </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/notes">
            <Notes />
          </Route>
          <Route exact path="/notes/new">
            <CreateNote />
          </Route>
          <Route exact path="/notes/:noteId/edit">
            <EditNote />
          </Route>
          <Route exact path="/notes/:noteId/delete">
            <DeleteNote />
          </Route>
          <Route exact path="/notebooks/:notebookId/delete">
            <DeleteNotebook />
          </Route>
          <Route exact path="/notebooks">
            <Notebook />
          </Route>
          <Route exact path="/notebooks/new">
            <CreateNotebook />
          </Route>
          <Route exact path="/notebook/:notebookId/edit">
            <EditNotebook />
          </Route>

          <Route exact path='/note/:noteId'>
            <XNoteDetails/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;


