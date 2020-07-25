import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateUserList from "../../features/add/CreateUserList";
import MovieList from "../../features/rank/MovieList";
import RankedItemDisplay from "../../features/review/RankedItemsDisplay";

const BotNavWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  padding: 26px 20px;
  width: 100%;

  overflow: hidden;

  /* For anchoring it to the bottom of the page */
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
`;

//Styling Link from React Router
//https://styled-components.com/docs/basics#styling-any-component
// const Link = ({ className, children }) => (
//   <a className={className}>{children}</a>
// );

const StyledLink = styled(Link)`
  color: green;
  font-weight: bold;
  margin: 1rem;
  align-items: center;
  justify-content: center;
  border: 3px none;
  width: %;
`;

const BotNavbar = () => {
  const [value, setValue] = useState(0);
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
      <BotNavWrapper
        name="NavMain"
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
      >
        <StyledLink to="/createList">Add</StyledLink>

        <StyledLink to="/rankList">Rank</StyledLink>
        <StyledLink to="/displayList">Review</StyledLink>
      </BotNavWrapper>
    </Router>
  );
};

export default BotNavbar;
