import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import { store } from "./redux/store";

import { ThemeProvider } from "styled-components";
import theme from "./display/utils/theme";
import GlobalStyles from "./display/utils/global";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <GlobalStyles />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
