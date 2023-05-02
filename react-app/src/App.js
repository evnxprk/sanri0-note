import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Notes from "./components/Notes";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
import DeleteNote from "./components/DeleteNote";
import Notebook from "./components/Notebooks";
import EditNotebook from "./components/EditNotebook";
import CreateNotebook from "./components/CreateNotebook";
import DeleteNotebook from "./components/DeleteNotebook";
import DashBoard from "./components/Dashboard";
import SplashPage from "./components/SplashPage";
import XNoteDetails from "./components/XNoteDetails";

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
          {/* <Route exact path="/notes" component={Notes} /> */}
          {/* <Route exact path="/dashbboard"/> */}
          <Route exact path="/dashboard">
            <DashBoard />
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


