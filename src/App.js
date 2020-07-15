import React from "react";

import MovieList from "./features/movielist/MovieList";
import RankedItemDisplay from "./features/movielist/RankedItemsDisplay";
import CreateList from "./features/create/CreateList";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { StyledLi } from "./app/display/components/li";

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
            <CreateList />
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

function Home() {
  return <h2>Home</h2>;
}

export default App;
