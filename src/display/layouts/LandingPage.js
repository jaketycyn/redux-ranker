import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetListStatus } from "../../redux/slices/movielistSlice";

import CreateUserList from "../../features/add/CreateUserList";
import Userlists from "../../features/userlists/Userlists";
import styled from "styled-components";
import { StyledBaseDiv } from "../components/Divs";

//Signin/up could be its own function that links to this landing page which is an intermediarry between signin/up and the createList page
//for now just testing this out for learning react router functionality
const LandingPage = () => {
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    console.log(location);
    dispatch(resetListStatus());
  }, [location]);

  return (
    <Router>
      <Switch>
        <Route exact path="/createList">
          <CreateUserList />
        </Route>
        <Route exact path="/userlists">
          <Userlists />
        </Route>
        <StyledBaseDiv landingPage>
          <div>
            <Link to="/createList">Sign In</Link>
          </div>
          <div>
            <Link to="/userlists">Take me to my lists</Link>
          </div>
        </StyledBaseDiv>
      </Switch>
    </Router>
  );
};

export default LandingPage;
