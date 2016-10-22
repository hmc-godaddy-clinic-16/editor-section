import {UPDATE_TITLE} from '../constants';

// Redux action to edit/update the title of an anncouncement
export function updateTitle (title) {
	return {
		type: UPDATE_TITLE,
		title
	}
}