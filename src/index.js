import React from "react";
import ReactDOM from "react-dom";
import {createStore, combineReducers} from 'redux';
import {Provider} from "react-redux";
import App from "./components/app.js";
import title from "./reducers/title.js";


// The app redux store contains all of the app's data
const store = createStore(combineReducers({
  title
}), {
  title: "This is a test title"
},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
);
