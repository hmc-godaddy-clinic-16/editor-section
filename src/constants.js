// Constants for redux actions
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_START_DATE = 'UPDATE_START_DATE';
export const UPDATE_END_DATE = 'UPDATE_END_DATE';
export const UPDATE_IMAGE_URL = 'UPDATE_IMAGE_URL';
export const UPDATE_BODY_TEXT = 'UPDATE_BODY_TEXT';
export const UPDATE_LINK = 'UPDATE_LINK';
export const UPDATE_IS_PERMANENT = 'UPDATE_IS_PERMANENT';

// Client/Server communication
// If a different host for the server is being used, change SERVER_URL
// to the appopriate value so requests will be sent to the right place

// export const DEFAULT_ID = '583114642a35736e4aacc3ef';
// export const SERVER_URL = 'http://134.173.43.36:3000';

// local MongoDB host
export const DEFAULT_ID = '588b8d11c835d451aca04872';
export const SERVER_URL = 'http://localhost:3000'; // local host

export const REQUEST_ANNOUNCEMENT = 'REQUEST_ANNOUNCEMENT';
export const RECEIVE_ANNOUNCEMENT = 'RECEIVE_ANNOUNCEMENT';
