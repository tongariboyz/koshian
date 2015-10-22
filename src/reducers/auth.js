import TogglAPIClient from '../helpers/TogglAPIClient';
import {
  RECEIVE_TOKEN,
  REQUEST_TOKEN
} from '../constants/authActionTypes';


/**
 * ログイン
 *
 * @param {Object} state state
 * @param {Object} action action
 * @return {Object} state
 */
export function auth(state = {
  client: null,
  isConnecting: false
}, action) {
  switch (action.type) {
  case RECEIVE_TOKEN:
    if (action.error) {
      console.error(action.payload);
      break;
    }
    const token = action.payload.body.data.api_token;
    return Object.assign(
      {},
      state,
      {
        client: new TogglAPIClient(token),
        isConnecting: false
      }
    );
  case REQUEST_TOKEN:
    return Object.assign(
      {},
      state,
      {isConnecting: true}
    );
  default:
    return state;
  }
}

/**
 * ストレージからトークンを取得
 *
 * @return {string} Token
 */
function getTokenFromStorage() {
  return '';
}
