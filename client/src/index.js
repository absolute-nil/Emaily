//jshint esversion:6
import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
//provider glues react and redux togather to make store easily accessible
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import App from "./components/App";
import reducers from "./reducers";
//creating instance
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

console.log(process.env.REACT_APP_STRIPE_KEY);