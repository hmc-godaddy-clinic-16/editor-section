import 'babel-polyfill';
import thunkMiddleware from 'redux-thunk';
import React from "react";
import ReactDOM from "react-dom";
import {createStore, combineReducers, applyMiddleware} from 'redux';
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

// The app redux store contains all of the app's data
const store = createStore(
  finalReducer,
 {
  editor: {
    _id: DEFAULT_ID,
    gotAnnouncement: false,
    title:"BUY ONE DOZEN GET ONE DOZEN FREE - DEFAULT",
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


// // The app redux store contains all of the app's data
// const store = createStore(combineReducers({
//   editor
// }),
//  {
//   editor: {
//     _id: DEFAULT_ID,
//     title:"BUY ONE DOZEN GET ONE DOZEN FREE - DEFAULT",
//     bodyText: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply.",
//     startDate: null,
//     endDate: null,
//     imgUrl: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg",
//     link: "http://www.thedonutmanca.com/"
//   } 
// },
//   applyMiddleware(
//     thunkMiddleware // lets us dispatch() functions (as well as actions)
//   ),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );

// Get the announcement data from the database
store.dispatch(fetchAnnouncement(DEFAULT_ID));

// Update the announcement in the database   
//store.subscribe( () => store.dispatch(putAnnouncement(store.getState(), DEFAULT_ID)));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
);
