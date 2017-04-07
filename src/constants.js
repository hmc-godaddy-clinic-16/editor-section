// Constants for redux actions
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_START_DATE = 'UPDATE_START_DATE';
export const UPDATE_END_DATE = 'UPDATE_END_DATE';
export const UPDATE_IMAGE_URL = 'UPDATE_IMAGE_URL';
export const UPDATE_BODY_TEXT = 'UPDATE_BODY_TEXT';
export const UPDATE_LINK = 'UPDATE_LINK';
export const UPDATE_IS_PERMANENT = 'UPDATE_IS_PERMANENT';
export const UPDATE_THEME = 'UPDATE_THEME';

// Client/Server communication
// If a different host for the server is being used, change SERVER_URL
// to the appopriate value so requests will be sent to the right place


// local MongoDB host
export const DEFAULT_ID = '588b8efc69074b2987764095';
export const SERVER_URL = 'http://127.0.0.1:3000'; // local host

// export const DEFAULT_ID = '588b9391c56b5b3a2c4de76c';
// export const SERVER_URL = 'http://localhost:3000';

export const REQUEST_ANNOUNCEMENT = 'REQUEST_ANNOUNCEMENT';
export const RECEIVE_ANNOUNCEMENT = 'RECEIVE_ANNOUNCEMENT';
