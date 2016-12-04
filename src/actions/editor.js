import {UPDATE_TITLE, UPDATE_START_DATE, UPDATE_END_DATE, UPDATE_IMAGE_URL, UPDATE_BODY_TEXT, UPDATE_LINK, RECEIVE_ANNOUNCEMENT, SERVER_URL, REQUEST_ERROR} from '../constants';
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

// Communication with the RESTful API

// Action for when we get the announcement back from
// the database
export function receiveAnnouncement (json) {
	return {
		type: RECEIVE_ANNOUNCEMENT,
		json
	}
} 

// Get the announcement from the database
export function fetchAnnouncement(announcementid) {

  return function (dispatch) {
  	
    return fetch( `${SERVER_URL}/announcements/${announcementid}`, {
    	method: "GET"
    })
       .then(
       	response => response.json()
      		)
       .then(json => dispatch(receiveAnnouncement(json)))

  };
}

// Update the database with the user-input announcement data
export function putAnnouncement(announcement, announcementid) {

	if (announcement.editor.gotAnnouncement = false) {
		return;
	}

	announcement.editor.gotAnnouncement = false;
    return fetch(`${SERVER_URL}/announcements/${announcementid}`, 
    		{  	headers: {
    				'Accept': 'application/json',
    				'Content-Type': 'application/json'

    			},
    			method: "PUT",
    			body: JSON.stringify(announcement.editor),
    		}
    	)
      .then(
     	 error => console.log(error)
       );
}