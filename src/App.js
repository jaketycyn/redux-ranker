import React from "react";

import MovieList from "./features/movielist/MovieList";
import RankedItemDisplay from "./features/movielist/RankedItemsDisplay";
import CreateUserList from "./features/create/CreateUserList";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BottomNavbar from "./display/layouts/BottomNavbar";
import { StyledLi } from "./display/components/li";

function App() {
  return <BottomNavbar />;
}

export default App;
