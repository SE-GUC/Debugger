import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../src/store/reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { saveState } from "../src/store/localStorage";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
let persistor = persistStore(store);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
