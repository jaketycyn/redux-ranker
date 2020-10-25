import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Role } from '/_helpers';
import { accountService } from '/_services';
import { Nav, PrivateRoute, Alert } from '/_components';

import { Home } from './display/layouts/Home';
import { Profile } from './features/profile';
import { Admin } from './features/admin';
import { Account } from './features/ccount';

function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});

  useEffect(()=> {
    const subscription = accountService.user.subscribe(x => setUser(x));
    return subscription.unsubscribe;
  }, []);

  return (
    <div>
      <Nav />
      <Alert />
      <Switch>
        <Redirect from ="/:url*(/+)" to={pathname.slice(0, -1)} />
        <PrivateRoute exact path="/" component={Home}/>
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
        <Route path="/account" component={Account} />
        <Redirect from ="*" to="/" />
      </Switch>
    </div>
  )
}

export {App}

//old app style
// import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import styled from "styled-components";

// import BotNavbar from "./display/layouts/BotNavbar";
// import CreateUserList from "./features/add/CreateUserList";
// import MovieList from "./features/rank/MovieList";
// import LandingPage from "./display/layouts/LandingPage";
// import RankedItemDisplay from "./features/review/RankedItemsDisplay";

// function App() {
//   return (
//     <Router>
//       <AppWrapper name="AppWrapper">
//         <Switch>
//           <Route exact path="login" />
//           <Route exact path="dashboard_main" />
//           <Route exact path="signup" />
//           {}
//           <Route exact path="/createList">
//             <CreateUserList />
//           </Route>
//           <Route exact path="/rankList">
//             <MovieList />
//           </Route>
//           <Route exact path="/displayList">
//             <RankedItemDisplay />
//           </Route>

//           <Route path="/">
//             <LandingPage />
//           </Route>
//         </Switch>
//         <BotNavbar />
//       </AppWrapper>
//     </Router>
//   );
// }

// const AppWrapper = styled.div`
//   display: block;
//   grid-template-columns: 95% 5%;
//   background-color: ${(props) => props.theme.colors.mainBlack};
//   height: 100vh;
// `;

// export default App;
