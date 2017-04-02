import * as constants from '../constants';

export default (state = "", action) => {
	switch (action.type) {
		case constants.UPDATE_TITLE:
			console.log("updated title");
			return Object.assign( {}, state, {
				title: action.title
			});
			
		case constants.UPDATE_START_DATE:
			console.log("updated start date");
			return Object.assign ( {}, state, {
				startDate: action.date
			});

		case constants.UPDATE_END_DATE:
			console.log("updated end date");
			return Object.assign ( {}, state, {
				endDate: action.date
			});

		case constants.UPDATE_IMAGE_URL:
			console.log("updated image url");
			return Object.assign ( {}, state, {
				imgUrl: action.imgUrl
			});

		case constants.UPDATE_BODY_TEXT:
			console.log("updated body text");
			return Object.assign ( {}, state, {
				bodyText: action.bodyText
			});

		case constants.UPDATE_LINK:
			console.log("updated link");
			return Object.assign ( {}, state, {
				link: action.link
			});

		case constants.UPDATE_IS_PERMANENT:
			console.log("updated is permanent");
			return Object.assign ( {}, state, {
				isPermanent: action.isPermanent
			});

		case constants.REQUEST_ANNOUNCEMENT:
			console.log("requesting announcement from database...");

			return Object.assign({}, state, {
				isFetching: true
			});

		case constants.RECEIVE_ANNOUNCEMENT:
			console.log("received annoucement from database");
			console.log(action);

			return Object.assign( {}, state, {
				id: action.json._id,
				isFetching: false,
				isPermanent: action.json.isPermanent,
				title: action.json.title,
				bodyText: action.json.bodyText,
				startDate: new Date(action.json.startDate),
				endDate: new Date(action.json.endDate),
				imgUrl: action.json.imgUrl,
				link: action.json.link,
				theme: action.json.theme
			});

		case constants.UPDATE_THEME:
			console.log("Updated theme");

			return Object.assign( {}, state, {
				theme: action.theme
			});
	}

	return state;
}