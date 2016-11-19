import {UPDATE_TITLE, UPDATE_START_DATE, UPDATE_END_DATE, UPDATE_IMAGE_URL, UPDATE_BODY_TEXT, UPDATE_LINK, RECEIVE_ANNOUNCEMENT} from '../constants';

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
				startDate: action.date
			});

		case UPDATE_END_DATE:
			console.log("updated end date");
			return Object.assign ( {}, state, {
				endDate: action.date
			});

		case UPDATE_IMAGE_URL:
			console.log("updated image url");
			return Object.assign ( {}, state, {
				imgUrl: action.imgUrl
			});

		case UPDATE_BODY_TEXT:
			console.log("updated body text");
			return Object.assign ( {}, state, {
				bodyText: action.bodyText
			})

		case UPDATE_LINK:
			console.log("updated link");
			return Object.assign ( {}, state, {
				link: action.link
			});

		case RECEIVE_ANNOUNCEMENT:
			console.log("Received annoucement");
			console.log(action.json);
			console.log("After announcement console log statement");
			//return action.json;

			return Object.assign( {}, state, {
				title: action.json.title,
				startDate: Date(action.json.startDate),
				endDate: Date(action.json.endDate),
				imgUrl: action.json.imgUrl,
				link: action.json.link
			});
	}

	return state;
}