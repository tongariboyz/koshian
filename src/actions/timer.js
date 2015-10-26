import {
  REQUEST_START,
  RECEIVE_START
} from '../constants/timer';


/**
 * 計測を開始
 *
 * @param {Object} rawTimeEntry rawtimeentry
 * @return {Object} action
 */
export function start(rawTimeEntry) {
  const time_entry = Object.assign(
    {},
    rawTimeEntry,
    {created_with: 'こしあん'}
  );
  return {
    type: REQUEST_START,
    meta: {
      client: {
        type: RECEIVE_START,
        next: client => client.startTimeEntry({time_entry})
      }
    }
  };
}
