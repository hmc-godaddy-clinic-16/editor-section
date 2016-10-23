import {ADD_FRIEND} from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_FRIEND:
      return [...state, action.friend];
  }
  return state;
}
