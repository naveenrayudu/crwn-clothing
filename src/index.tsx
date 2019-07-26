import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createSagaMiddleware  from 'redux-saga';

import rootReducer from "./store/reducers/rootReducer";
import logger from "./store/middlewares/logger";
import toasterMiddleware from "./store/middlewares/toaster-notification";
import rootSaga from "./store/reducers/rootSagas";
const sagaMiddleware = createSagaMiddleware();


let store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, toasterMiddleware)
);

if (process.env.NODE_ENV === "development") {
  const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, toasterMiddleware));
  store = createStore(rootReducer, enhancer);
}

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
