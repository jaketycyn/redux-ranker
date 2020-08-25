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
import Userlists from "../../features/userlists/Userlists";
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

//testing new development git branch
//testing new development git branch
export default LandingPage;
