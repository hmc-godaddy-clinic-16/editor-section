import {UPDATE_TITLE} from '../constants';

export default (state = "", action) => {
	switch (action.type) {
		case UPDATE_TITLE:
			console.log("updated title");
			return action.title;
	}

	return state;
}