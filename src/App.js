import React from "react";

import MovieList from "./features/movielist/MovieList";
import RankedItemDisplay from "./features/movielist/RankedItemsDisplay";
import CreateList from "./features/create/CreateList";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/createList">Add to List</Link>
            </li>
            <li>
              <Link to="/rankList">Rank List</Link>
            </li>
            <li>
              <Link to="/displayList">Display List</Link>
            </li>
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
