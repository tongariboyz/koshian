/* eslint camelcase: 0 */
import Base64 from 'base64util';
import moment from 'moment';
import request from 'superagent';

import {
  API_ENDPOINT,
  API_METHODS,
  TIME_FORMAT
} from '../constants/togglAPI';


function createBasicAuthHeader(username, password) {
  const query = `${username}:${password}`;
  return {Authorization: `Basic ${Base64.encode(query)}`};
}


export default class TogglAPIClient {

  /**
   * constructor
   *
   * @param {string} apiToken API Token
   */
  constructor(apiToken) {
    API_METHODS.forEach(method => {
      this[method] = this.constructor[method].bind(this);
    });

    /**
     * API Token
     *
     * @type {string}
     */
    this.apiToken = apiToken;
  }

  /**
   * 指定時間内の TimeEntry リスト取得リクエストを送信する
   *
   * @param {Date} start 開始日時
   * @param {Date} end 終了日時
   * @return {Promise}
   */
  getTimeEntries(start, end) {
    return this.get('/time_entries', {query: {
      end_date: moment(end).format(TIME_FORMAT),
      start_date: moment(start).format(TIME_FORMAT)
    }});
  }

  /**
   * TimeEntry 作成リクエストを送信する
   *
   * @param {Object} timeEntry timeentry
   * @return {Promise}
   */
  createTimeEntriy(timeEntry) {
    return this.post('/time_entries', {data: timeEntry});
  }

  /**
   * TimeEntry 開始リクエストを送信する
   *
   * @param {Object} timeEntry timeentry
   * @return {Promise}
   */
  startTimeEntry(timeEntry) {
    return this.post('/time_entries/start', {data: timeEntry});
  }

  /**
   * ログインリクエストを送信する
   *
   * @param {string} username username
   * @param {string} password password
   * @return {Promise}
   */
  static login(username, password) {
    return this.get('/me', {headers: createBasicAuthHeader(username, password)});
  }
}

// Static method として基底リクエストメソッド群を生成
API_METHODS.forEach(method => {
  TogglAPIClient[method] = function method2(path, opts = {}) {
    let req = request[method](`${API_ENDPOINT}${path}`);
    let headers = opts.headers || {};
    if (this.apiToken) {
      headers = Object.assign(
        {},
        createBasicAuthHeader(this.apiToken, 'api_token'),
        headers
      );
    }
    Object.keys(headers).forEach(key => {
      req = req.set(key, headers[key]);
    });
    if (opts.query) {
      req = req.query(opts.query);
    }
    if (opts.data) {
      req = req.send(opts.data);
    }
    return new Promise((resolve, reject) => {
      req.end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            body: res.body,
            headers: res.header,
            request: {
              headers,
              data: opts.data || {},
              query: opts.query || {}
            }
          });
        }
      });
    });
  };
});
// export default TogglAPIClient;
