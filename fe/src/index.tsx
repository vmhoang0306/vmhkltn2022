import { ConnectedRouter } from "connected-react-router";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import "./assets/scss/styles.scss";
import "./index.css";
import { history } from "./utils";

const ConnectedApp = () => (
  <React.Fragment>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.Fragment>
);

const MOUNT_NODE = document.getElementById("root");

ReactDOM.render(<ConnectedApp />, MOUNT_NODE);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
