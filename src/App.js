import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import BotNavbar from "./display/layouts/BotNavbar";
import CreateUserList from "./features/add/CreateUserList";
import MovieList from "./features/rank/MovieList";
import LandingPage from "./display/layouts/LandingPage";
import RankedItemDisplay from "./features/review/RankedItemsDisplay";

function App() {
  return (
    <Router>
      <AppWrapper name="AppWrapper">
        <Switch>
          <Route exact path="login" />
          <Route exact path="dashboard_main" />
          <Route exact path="signup" />
          {}
          <Route exact path="/createList">
            <CreateUserList />
          </Route>
          <Route exact path="/rankList">
            <MovieList />
          </Route>
          <Route exact path="/displayList">
            <RankedItemDisplay />
          </Route>

          <Route path="/">
            <LandingPage />
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
  background-color: ${(props) => props.theme.colors.mainBlack};
  height: 100vh;
`;

export default App;
