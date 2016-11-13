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
    thunkMiddleware // lets us dispatch() functions
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);


// May only work when accessing the app
function fetchSecretSauce() {
  return fetch('http://localhost:3000/announcements/581e9c24ac07af4076d82dc2');
}

// These are the normal action creators you have seen so far.
// The actions they return can be dispatched without any middleware.
// However, they only express “facts” and not the “async flow”.

function makeASandwich(forPerson, secretSauce) {
  return {
    type: 'MAKE_SANDWICH',
    forPerson,
    secretSauce
  };
}

function apologize(fromPerson, toPerson, error) {
  return {
    type: 'APOLOGIZE',
    fromPerson,
    toPerson,
    error
  };
}

function withdrawMoney(amount) {
  return {
    type: 'WITHDRAW',
    amount
  };
}

// Even without middleware, you can dispatch an action:
store.dispatch(withdrawMoney(100));

// But what do you do when you need to start an asynchronous action,
// such as an API call, or a router transition?

// Meet thunks.
// A thunk is a function that returns a function.
// This is a thunk.

function makeASandwichWithSecretSauce(forPerson) {

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return function (dispatch) {
    return fetchSecretSauce().then(
      sauce => dispatch(makeASandwich(forPerson, sauce)),
      error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    );
  };
}

// Thunk middleware lets me dispatch thunk async actions
// as if they were actions!

store.dispatch(
  makeASandwichWithSecretSauce('Me')
);

// It even takes care to return the thunk’s return value
// from the dispatch, so I can chain Promises as long as I return them.

store.dispatch(
  makeASandwichWithSecretSauce('My wife')
).then(() => {
  console.log('Done!');
});

// export const REQUEST_ANNOUNCEMENT = 'REQUEST_ANNOUNCEMENT'
// export function requestAnnouncement (announcementid) {
//   return {
//     type: REQUEST_ANNOUNCEMENT,
//     announcementid
//   }
// }

// export const RECEIVE_ANNOUNCEMENT = 'RECEIVE_ANNOUNCEMENT'
// export function receiveAnnouncement (json) {
//   console.log("In receive announcement");
//   return {
//     type: RECEIVE_ANNOUNCEMENT,
//     json
//   }
// } 

// // Async dispatch
// // a thunk (a function that returns a function)
// // This is not an action - it is a "thunk object"
// export function fetchAnnouncement(announcementid) {
//   console.log("In fetch announcement");
//   return function (dispatch) {
//     console.log("here in thunk stuff");

//     dispatch(requestAnnouncement(announcementid));

//     fetch(`localhost:3000/announcements/581e9c24ac07af4076d82dc2`)//${announcementid}`)//`${SERVER_URL}/announcement:${announcementid}`)
//       .then( 
//         response => response.json())
//       .catch(err => {
//         console.log("AN ERROR OCCURRED");
//       })
//       .then( json => dispatch(receiveAnnouncement(json)))
//       .catch(err => {
//         console.log("AN ERROR OCCURRED")
//       });

//     console.log("After");

//     return null;
//   }
// }

// store.dispatch(fetchAnnouncement);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
);
