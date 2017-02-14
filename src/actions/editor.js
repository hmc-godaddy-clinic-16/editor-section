import * as constants from '../constants';
import fetch from 'isomorphic-fetch';

// Redux action to edit/update the title of an anncouncement
export function updateTitle (title) {
	return {
		type: constants.UPDATE_TITLE,
		title
	}
}

export function updateStartDate (date) {
	return {
		type: constants.UPDATE_START_DATE,
		date
	}
}

export function updateEndDate (date) {
	return {
		type: constants.UPDATE_END_DATE,
		date
	}
}

export function updateImageUrl (imgUrl) {
    return {
        type: constants.UPDATE_IMAGE_URL,
        imgUrl
    }
}

export function updateBodyText (bodyText) {
	return {
		type: constants.UPDATE_BODY_TEXT,
		bodyText
	}
}

export function updateLink (link) {
	return {
		type: constants.UPDATE_LINK,
		link
	}
}

export function updateIsPermanent (isPermanent) {
	return {
		type: constants.UPDATE_IS_PERMANENT,
		isPermanent
	}
}

// Communication with the RESTful API

export function requestAnnouncement (announcementid) {
	return {
		type: constants.REQUEST_ANNOUNCEMENT,
		announcementid
	}
}

// Action for when we get the announcement back from
// the database
export function receiveAnnouncement (json) {
	return {
		type: constants.RECEIVE_ANNOUNCEMENT,
		json
	}
} 

// Get the announcement from the database
export function fetchAnnouncement(announcementid) {

  return function (dispatch) {

  	dispatch(requestAnnouncement(announcementid))
  	
    return fetch( `${constants.SERVER_URL}/announcements/${announcementid}`, {
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

	if (announcement.editor.isFetching == true) {
		return;
	}

    return fetch(`${constants.SERVER_URL}/announcements/${announcementid}`, 
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