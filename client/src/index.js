//jshint esversion:6
import React from "react";
import ReactDOM from "react-dom";
//provider glues react and redux togather to make store easily accessible
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";
//creating instance
const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
