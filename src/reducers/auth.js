/* @flow */
import TogglAPIClient from '../helpers/TogglAPIClient';
import types from '../constants/authActionTypes';

type Action = {
  type: string,
  payload: Object
};
type State = {
  client: TogglAPIClient,
  isConnecting: boolean,
  isRestored: boolean
};


/**
 * ログイン
 *
 * @param {Object} state state
 * @param {Object} action action
 * @return {Object} state
 */
export function auth(state: State = {
  client: null,
  isConnecting: false,
  isRestored: false
}, action: Action): State {
  switch (action.type) {
  case types.LOGOUT:
    return Object.assign({}, state, {client: null});
  case types.RECEIVE_TOKEN:
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
  case types.REQUEST_TOKEN:
    return Object.assign(
      {},
      state,
      {isConnecting: true}
    );
  case types.RESTORE_TOKEN:
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
export function restoreToken(state: State, action: Action): State {
  if (action.error) {
    console.error(action.payload);
    return state;
  }
  const newState: Object = {isRestored: true};
  if (action.payload) {
    newState.client = new TogglAPIClient(action.payload);
  }
  return Object.assign({}, state, newState);
}
