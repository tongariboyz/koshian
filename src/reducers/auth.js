import TogglAPIClient from '../helpers/TogglAPIClient';
import {
  LOGOUT,
  RECEIVE_TOKEN,
  RESTORE_TOKEN,
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
  isConnecting: false,
  isRestored: false
}, action) {
  switch (action.type) {
  case LOGOUT:
    return Object.assign({}, state, {client: null});
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
  case RESTORE_TOKEN:
    return restoreToken(state, action);
  default:
    return state;
  }
}


/**
 * ストレージから AuthToken 取得時完了時の処理
 *
 * @param {Object} state state
 * @param {Object} action action
 * @return {Object}
 */
export function restoreToken(state, action) {
  if (action.error) {
    console.error(action.payload);
    return state;
  }
  const newState = {isRestored: true};
  if (action.payload) {
    newState.client = new TogglAPIClient(action.payload);
  }
  return Object.assign({}, state, newState);
}
