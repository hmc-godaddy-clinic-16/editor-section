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
    title:"BUY ONE DOZEN GET ONE DOZEN FREE",
    bodyText: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply.",
    startDate: null,
    endDate: null,
    imgUrl: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg",
    link: "http://www.thedonutmanca.com/"
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
