import {UPDATE_TITLE, UPDATE_START_DATE, UPDATE_END_DATE, UPDATE_IMAGE_URL, UPDATE_BODY_TEXT, UPDATE_LINK, RECEIVE_ANNOUNCEMENT} from '../constants';
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
export const SERVER_URL = "http://134.173.43.36:3000/";

export function receiveAnnouncement (json) {
	console.log("In receive announcement");
	console.log(json);
	return {
		type: RECEIVE_ANNOUNCEMENT,
		json
	}
} 


function requestError(announcementid, message) {
	console.log("ERROR OCCURRED");
	return {
		type: REQUEST_ERROR,
		announcementid,
		message
	}
}

export function fetchAnnouncement(announcementid) {
	console.log("in fetch announcemnt");
  return function (dispatch) {
  	console.log("HEHREHRHE");
    return fetch( 'http://134.173.43.36:3000/announcements/581e9c24ac07af4076d82dc2')///`${SERVER_URL}announcements/${announcementid}`)
       .then(response => response.json())
       .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveAnnouncement(json))
      )

  };
}


// export function putAnnouncement(announcement) {

//   return function (dispatch) {
//     return fetch(`${SERVER_URL}announcements/581e9c24ac07af4076d82dc2`, 
//     		{
//     			method: "PUT",
//     			body: JSON.stringify(announcement),
//     		}
//     	)
//       .then(
//      	 error => dispatch(requestError(announcement._id, error))
//        );
//   };
// }
