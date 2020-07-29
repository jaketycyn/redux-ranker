import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import BotNavbar from "./display/layouts/BotNavbar";
import CreateUserList from "./features/add/CreateUserList";
import MovieList from "./features/rank/MovieList";
import RankedItemDisplay from "./features/review/RankedItemsDisplay";

import styled from "styled-components";

const AppDiv = styled.div`
  display: grid;
  grid-template-rows: (95% 5%);
`;

function App() {
  return (
    <AppDiv>
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
    </AppDiv>
  );
}

export default App;
