import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateUserList from "../../features/add/CreateUserList";
import MovieList from "../../features/rank/MovieList";
import RankedItemDisplay from "../../features/review/RankedItemsDisplay";

const MainDivWrapper = styled.div`
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
`;

const BotNavWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5em;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  background-color: lightpink;
  width: 100%;
  height: 5rem;

  /* For anchoring it to the bottom of the page */
  position: fixed;
  left: 0;
  bottom: 0;
`;

//Styling Link from React Router
//https://styled-components.com/docs/basics#styling-any-component
// const Link = ({ className, children }) => (
//   <a className={className}>{children}</a>
// );

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: green;
  font-weight: bold;
  padding: 0.5rem;
  font-size: 3em;
  border: 3px none;
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 5px;

  width: 100%;
`;

const BotNavbar = () => {
  const [value, setValue] = useState(0);
  return (
    <MainDivWrapper>
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
    </MainDivWrapper>
  );
};

export default BotNavbar;
