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
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
            </Route>
            <Route exact path="/">
              <Notes />
          </Route>
          <Route exact path='/new'>
          <CreateNote />
          </Route>
          <Route exact path='/notes/:noteId'>
          <EditNote />
          </Route>
          <Route exact path='/notes/:noteId/delete'>
            <DeleteNote />
          </Route>
          <Route exact path='/'>
            <Notebook/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
