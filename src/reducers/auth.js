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
  authToken: getTokenFromStorage(),
  isConnecting: false
}, action) {
  switch (action.type) {
  case RECEIVE_TOKEN:
    return Object.assign(
      {},
      state,
      {
        authToken: action.token,
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
