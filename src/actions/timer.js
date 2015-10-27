import {
  CHANGE_KEYBOARD,
  EDIT_START_FORM,
  EDIT_END_FORM,
  REQUEST_START,
  REQUEST_STOP,
  RECEIVE_START,
  RECEIVE_STOP
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

/**
 * 計測を終了
 *
 * @param {string} timeEntryId timeEntryId
 * @return {Object} action
 */
export function stop(timeEntryId) {
  return {
    type: REQUEST_STOP,
    meta: {
      client: {
        type: RECEIVE_STOP,
        next: client => client.stopTimeEntry(timeEntryId)
      }
    }
  };
}

/**
 * キーボードの変更
 *
 * @param {string} keyboardType keyboardType
 * @return {Object} action
 */
export function changeKeyboard(keyboardType) {
  return {type: CHANGE_KEYBOARD, payload: {keyboardType}};
}

/**
 * タイマー編集開始
 *
 * @return {Object} action
 */
export function editStartForm() {
  return {type: EDIT_START_FORM};
}

/**
 * タイマー編集終了
 *
 * @return {Object} action
 */
export function editEndForm() {
  return {type: EDIT_END_FORM};
}
