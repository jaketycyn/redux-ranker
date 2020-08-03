import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import BotNavbar from "./display/layouts/BotNavbar";
import CreateUserList from "./features/add/CreateUserList";
import MovieList from "./features/rank/MovieList";
import RankedItemDisplay from "./features/review/RankedItemsDisplay";

function App() {
  return (
    <Router>
      <AppWrapper name="AppWrapper">
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
      </AppWrapper>
    </Router>
  );
}

const AppWrapper = styled.div`
  display: block;
  grid-template-columns: 95% 5%;
`;

export default App;
