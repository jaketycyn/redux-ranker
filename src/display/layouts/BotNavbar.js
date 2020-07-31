import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AddToList } from "@styled-icons/entypo";
import CreateUserList from "../../features/add/CreateUserList";
import MovieList from "../../features/rank/MovieList";
import RankedItemDisplay from "../../features/review/RankedItemsDisplay";

//!Potential Issues
// https://styled-components.com/docs/basics#styling-any-component
// taking Link from react router then turning it into a styled component that is further turned into another

const MainDivWrapper = styled.div`
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
`;

const BotNavWrapper = styled.div`
  display: grid;
  width: 100%;
  height: 2em;
  margin: 0;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.mainDark};
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
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: 3px none;
  border-radius: 5px;

  color: ${(props) => props.theme.colors.whiteColor};
  font-size: 1em;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
`;

//gives button props to the link
const StyledButton = styled(StyledLink)`
  color: ${(props) => props.theme.colors.errorRed};
`;

const BotNavbar = () => {
  return (
    <MainDivWrapper>
      <BotNavWrapper
        name="NavMain"
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
      >
        <StyledButton to="/createList">
          <AddToList />
          Add
        </StyledButton>
        <StyledButton to="/rankList">Rank</StyledButton>
        <StyledButton to="/displayList">Review</StyledButton>
      </BotNavWrapper>
    </MainDivWrapper>
  );
};

export default BotNavbar;
