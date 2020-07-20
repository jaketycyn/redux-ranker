import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddIcon from "@material-ui/icons/Add";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import VisibilityIcon from "@material-ui/icons/Visibility";
import useStyles from "../styles/MUIstyles";

import CreateUserList from "../../features/add/CreateUserList";
import MovieList from "../../features/rank/MovieList";
import RankedItemDisplay from "../../features/review/RankedItemsDisplay";

export default function BottomNavbar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
      <div className={classes.footer}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            component={Link}
            to="/createList"
            label="Add"
            icon={<AddIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/rankList"
            label="Rank"
            icon={<CompareArrowsIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/displayList"
            label="Review"
            icon={<VisibilityIcon />}
          />
        </BottomNavigation>
      </div>
    </Router>
  );
}
