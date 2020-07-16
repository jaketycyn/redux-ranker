import React from "react";

import MovieList from "./features/movielist/MovieList";
import RankedItemDisplay from "./features/movielist/RankedItemsDisplay";
import CreateUserList from "./features/create/CreateUserList";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { StyledLi } from "./display/components/li";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <StyledLi>
              <Link to="/">Home</Link>
            </StyledLi>
            <StyledLi>
              <Link to="/createList">Add to List</Link>
            </StyledLi>
            <StyledLi>
              <Link to="/rankList">Rank List</Link>
            </StyledLi>
            <StyledLi>
              <Link to="/displayList">Display List</Link>
            </StyledLi>
          </ul>
        </nav>

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
      </div>
    </Router>
  );
}

export default App;
