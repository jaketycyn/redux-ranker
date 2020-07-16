import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import useStyles from "../styles/MUIstyles";

import MovieList from "../../features/movielist/MovieList";
import RankedItemDisplay from "../../features/movielist/RankedItemsDisplay";
import CreateUserList from "../../features/create/CreateUserList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function BottomNavbar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <Router>
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
          label="Add to List"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/rankList"
          label="Rank List"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/displayList"
          label="Display List"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
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
    </Router>
  );
}

//   <nav>
//     <ul>
//       <StyledLi>

//       </StyledLi>
//       <StyledLi>

//       </StyledLi>
//       <StyledLi>

//       </StyledLi>
//       <StyledLi>

//       </StyledLi>
//     </ul>
//   </nav>
//   <BottomNavbar />
//   <Switch>
//     <Route path="/createList">
//       <CreateUserList />
//     </Route>
//     <Route path="/rankList">
//       <MovieList />
//     </Route>
//     <Route path="/displayList">
//       <RankedItemDisplay />
//     </Route>
//   </Switch>
// </Router>;
