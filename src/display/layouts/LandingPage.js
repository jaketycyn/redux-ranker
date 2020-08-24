import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import CreateUserList from "../../features/add/CreateUserList";

import styled from "styled-components";
import { StyledBaseDiv } from "../components/Divs";

//Signin/up could be its own function that links to this landing page which is an intermediarry between signin/up and the createList page
//for now just testing this out for learning react router functionality
const LandingPage = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/createList">
          <CreateUserList />
        </Route>
        <StyledBaseDiv landingPage>
          <div>
            <Link to="/createList">Sign In</Link>
          </div>
          <div>
            <a>Sign Up</a>
          </div>
        </StyledBaseDiv>
      </Switch>
    </Router>
  );
};

export default LandingPage;
