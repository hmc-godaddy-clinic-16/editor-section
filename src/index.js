import 'babel-polyfill';
import thunkMiddleware from 'redux-thunk';
import React from "react";
import ReactDOM from "react-dom";
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from "react-redux";
import App from "./components/app.js";
import editor from "./reducers/editor.js";
import {fetchAnnouncement, putAnnouncement} from './actions/editor.js';
import {DEFAULT_ID} from './constants.js'

const reducers = combineReducers({
    editor
});

// Acts on any action so we can make a call to the API and update the database
const finalReducer = (state = reducers(), action) => {
    const nextState = reducers(state, action);

    // Update the database
    putAnnouncement(nextState, DEFAULT_ID);

    return nextState;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// The app redux store contains all of the app's data
const store = createStore(
  finalReducer,
 {
  editor: {
    _id: DEFAULT_ID,
    isPermanent: false,
    isFetching: true,
    title:"BUY ONE DOZEN GET ONE DOZEN FREE",
    bodyText: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply.",
    startDate: new Date(),
    endDate: new Date(),
    imgUrl: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg",
    link: "http://www.thedonutmanca.com/"
  } 
}, composeEnhancers(
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions (as well as actions)
  )
)
);

// Get the announcement data from the database
store.dispatch(fetchAnnouncement(DEFAULT_ID));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
);
