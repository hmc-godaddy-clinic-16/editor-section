import {UPDATE_TITLE, UPDATE_START_DATE, UPDATE_END_DATE, UPDATE_IMAGE_URL, UPDATE_LINK} from '../constants';

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

export function updateBodyText (text) {
	return {
		type: UPDATE_BODY_TEXT,
		text
	}
}

export function updateLink (link) {
	return {
		type: UPDATE_LINK,
		link
	}
}