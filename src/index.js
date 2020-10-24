import React from "react";
import ReactDOM from "react-dom";
import {Router} from 'react-router-dom'

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import { store } from "./redux/store";

import {App} from "./App";
import {history} from './_helpers'
import {accountService} from './_services'
import { ThemeProvider } from "styled-components";
import theme from "./display/utils/theme";
import GlobalStyles from "./display/utils/global";


// setup fake backend (will remove later)
import {configureFakeBackend} from './_helpers'
configureFakeBackend();

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() {
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router history ={history}>
              <App />
              <GlobalStyles />
            </Router>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}
