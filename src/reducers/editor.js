import {UPDATE_TITLE, UPDATE_START_DATE, UPDATE_END_DATE, UPDATE_IMAGE_URL, UPDATE_BODY_TEXT, UPDATE_LINK,REQUEST_ANNOUNCEMENT, RECEIVE_ANNOUNCEMENT} from '../constants';

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
			});

		case UPDATE_LINK:
			console.log("updated link");
			return Object.assign ( {}, state, {
				link: action.link
			});

		case REQUEST_ANNOUNCEMENT:
			console.log("requesting announcement from database...");

			return Object.assign({}, state, {
				isFetching: true
			});

		case RECEIVE_ANNOUNCEMENT:
			console.log("received annoucement from database");
			console.log(action);

			return Object.assign( {}, state, {
				id: action.json._id,
				isFetching: false,
				title: action.json.title,
				bodyText: action.json.bodyText,
				startDate: new Date(action.json.startDate),
				endDate: new Date(action.json.endDate),
				imgUrl: action.json.imgUrl,
				link: action.json.link
			});
	}

	return state;
}