import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BotNavbar from "./display/layouts/BotNavbar";
import CreateUserList from "./features/add/CreateUserList";
import MovieList from "./features/rank/MovieList";
import RankedItemDisplay from "./features/review/RankedItemsDisplay";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/createList">
          <CreateUserList />
        </Route>
        <Route path="/rankList">
          <MovieList />
        </Route>
        <Route path="/displayList">
          <RankedItemDisplay />
        </Route>
      </Switch>
      <BotNavbar />
    </Router>
  );
}

export default App;
