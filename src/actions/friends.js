import {ADD_FRIEND} from '../constants';

export function addFriend (friend) {
  return {
    type: ADD_FRIEND,
    friend
  }
}
