import {UPDATE_TITLE, UPDATE_START_DATE, UPDATE_END_DATE, UPDATE_IMAGE_URL, UPDATE_BODY_TEXT, UPDATE_LINK} from '../constants';
import fetch from 'isomorphic-fetch';

// Redux action to edit/update the title of an anncouncement
export function updateTitle (title) {
	return {
		type: UPDATE_TITLE,
		title
	}
}

export function updateStartDate (date) {
	return {
		type: UPDATE_START_DATE,
		date
	}
}

export function updateEndDate (date) {
	return {
		type: UPDATE_END_DATE,
		date
	}
}

export function updateImageUrl (imgUrl) {
    return {
        type: UPDATE_IMAGE_URL,
        imgUrl
    }
}

export function updateBodyText (bodyText) {
	return {
		type: UPDATE_BODY_TEXT,
		bodyText
	}
}

export function updateLink (link) {
	return {
		type: UPDATE_LINK,
		link
	}
}



// SERVER REQUESTS 
// May need to have a parameter passed like
// the other actions
// TODO: Move constants to constants.js
// TODO: Figure out how to import w/o 
// explicity importing specific things
// TODO: Add more actions once the basic ones are working

// Placeholder announcement id: 581e9c24ac07af4076d82dc2
export const SERVER_URL = "localhost:6000";

export const REQUEST_ANNOUNCEMENT = 'REQUEST_ANNOUNCEMENT'
export function requestAnnouncement (announcementid) {
	return {
		type: REQUEST_ANNOUNCEMENT,
		announcementid
	}
}

export const RECEIVE_ANNOUNCEMENT = 'RECEIVE_ANNOUNCEMENT'
export function receiveAnnouncement (json) {
	console.log("In receive announcement");
	return {
		type: RECEIVE_ANNOUNCEMENT,
		json
	}
} 

// Async dispatch
// a thunk (a function that returns a function)
// This is not an action - it is a "thunk object"
// export function fetchAnnouncement(announcementid) {
// 	console.log("In fetch announcement");
// 	return function (dispatch) {
// 		console.log("here in thunk stuff");

// 		dispatch(requestAnnouncement(announcementid));

// 		fetch(`localhost:3000/announcements/581e9c24ac07af4076d82dc2`)//${announcementid}`)//`${SERVER_URL}/announcement:${announcementid}`)
// 			.then( 
// 				response => response.json())
// 			.catch(err => {
// 				console.log("AN ERROR OCCURRED");
// 			})
// 			.then( json => dispatch(receiveAnnouncement(json)))
// 			.catch(err => {
// 				console.log("AN ERROR OCCURRED")
// 			});

// 		console.log("After");

// 		return null;
// 	}
// }

export function makeASandwich(forPerson, secretSauce) {
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

export function fetchAnnouncement(announcementid) {

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return function (dispatch) {
    return fetch('http://localhost:3000/announcements/581e9c24ac07af4076d82dc2').then(
      sauce => dispatch(makeASandwich(forPerson, sauce)),
      error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    );
  };
}

