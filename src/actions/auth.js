import TogglAPIClient from '../helpers/TogglAPIClient';
import storageUtils from '../helpers/storageUtils';
import * as types from '../constants/authActionTypes';
import {AUTH_TOKEN_KEY} from '../constants/storage';

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
 * ログアウトを実行
 *
 * @return {function}
 */
export function logout() {
  return dispatch => {
    dispatch(removeToken());
    return dispatch({type: types.LOGOUT});
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


/**
 * Auth Token をストレージから取得する ActionCreator
 *
 * @return {Object}
 */
export function restoreToken() {
  const promise = storageUtils.getItem(AUTH_TOKEN_KEY);
  return {type: types.RESTORE_TOKEN, payload: promise};
}


/**
 * AuthToken を Storage に保存する ActionCreator
 *
 * @param {string} token Auth Token
 * @return {Object}
 */
export function saveToken(token) {
  const promise = storageUtils.setItem(AUTH_TOKEN_KEY, token);
  return {type: types.SAVE_TOKEN, payload: promise};
}


/**
 * AuthToken の保存の必要がある場合に Storage に保存する ActionCreator
 *
 * 以下の条件のいずれかに合致した場合のみ保存する
 *
 * - AuthToken が Storage に保存されていない
 * - AuthToken が Storage に保存されているものと異なる
 *
 * @param {string} token auth token
 * @return {function}
 */
export function saveTokenIfNeeded(token) {
  return dispatch => {
    storageUtils.getItem(AUTH_TOKEN_KEY)
      .then(oldToken => {
        if (oldToken !== token) {
          dispatch(saveToken(token));
        }
      });
  };
}


/**
 * AuthToken を Storage から削除する ActionCreator
 *
 * @return {Object}
 */
export function removeToken() {
  const promise = storageUtils.removeItem(AUTH_TOKEN_KEY);
  return {type: types.REMOVE_TOKEN, payload: promise};
}
