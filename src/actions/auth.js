import TogglAPIClient from '../helpers/TogglAPIClient';
import * as types from '../constants/authActionTypes';

/**
 * APIToken リクエストを実行
 *
 * @param {Object} userData userData
 * @param {string} userData.username username
 * @param {string} userData.password password
 * @return {function}
 */
function getToken(userData) {
  return dispatch => {
    const promise = TogglAPIClient.login(userData.username, userData.password);
    dispatch(requestToken());
    dispatch(receiveToken(promise));
  };
}

/**
 * ログインを実行
 *
 * @param {Object} userData userData
 * @param {string} userData.username username
 * @param {string} userData.password password
 * @return {function}
 */
export function login(userData) {
  return dispatch => {
    return dispatch(getToken(userData));
  };
}

/**
 * APIToken リクエスト完了時の処理
 *
 * @param {Promise} client TogglAPIClient.login の戻り値
 * @return {Object} action
 */
export function receiveToken(client) {
  return {type: types.RECEIVE_TOKEN, payload: client};
}

/**
 * APIToken リクエスト開始時の処理
 *
 * @return {Object} action
 */
export function requestToken() {
  return {type: types.REQUEST_TOKEN};
}
