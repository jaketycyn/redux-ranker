import React from "react";

import MovieList from "./features/movielist/MovieList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MovieList />
      </header>
    </div>
  );
}

export default App;
