import {UPDATE_TITLE, UPDATE_START_DATE, UPDATE_END_DATE} from '../constants';

export default (state = "", action) => {
	switch (action.type) {
		case UPDATE_TITLE:
			console.log("updated title");
			return Object.assign( {}, state, {
				title: action.title
			});
			
		case UPDATE_START_DATE:
			console.log("updated start date");
			return Object.assign ( {}, state, {
				startDate: action.startDate
			});

		case UPDATE_END_DATE:
			console.log("updated end date");
			return Object.assign ( {}, state, {
				endDate: action.endDate
			});
	}

	return state;
}