import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from './store/reducers/rootReducer';
import logger from './store/middlewares/logger';

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
  applyMiddleware(logger)
);

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
