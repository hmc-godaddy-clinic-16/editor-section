import 'babel-polyfill';
import thunkMiddleware from 'redux-thunk';
import React from "react";
import ReactDOM from "react-dom";
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from "react-redux";
import App from "./components/app.js";
import editor from "./reducers/editor.js";

// The app redux store contains all of the app's data
const store = createStore(combineReducers({
  editor
}),
 {
  editor: {
  	title: "Example Title",
  	content: "Content", 
  	imgUrl: "image url", 
  	startDate: null,
  	endDate: null,
    bodyText: "Some text",
    link: "Optional link"
  } 
},
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions (as well as actions)
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
);
