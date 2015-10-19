import request from 'superagent';
import Base64 from 'base64util';
import * as types from '../constants/login';

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
    dispatch(requestToken());
    const query = `${userData.username}:${userData.password}`;
    return request.get('https://www.toggl.com/api/v8/me')
      .set('Authorization', `Basic ${Base64.encode(query)}`)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          dispatch(receiveToken(res.body.data.api_token));
        }
      });
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
 * APIToken 取得成功時の処理
 *
 * @param {string} token token
 * @return {Object} action
 */
export function receiveToken(token) {
  return {type: types.RECEIVE_TOKEN, token};
}

/**
 * APIToken リクエスト完了時の処理
 *
 * @return {Object} action
 */
export function requestToken() {
  return {type: types.REQUEST_TOKEN};
}
