/* @flow */
import types from '../constants/timerActionTypes';

type Action = {
  type: string,
  payload: any
};
type ClientAction = {
  type: string,
  meta: {
    client: {
      type: string,
      next: Function
    }
  }
};
type TimeEntry = {
  desctiption: string
};

/**
 * 計測を開始
 *
 * @param {Object} rawTimeEntry rawtimeentry
 * @return {Object} action
 */
export function start(rawTimeEntry: TimeEntry): ClientAction {
  const time_entry = Object.assign(
    {},
    rawTimeEntry,
    {created_with: 'こしあん'}
  );
  return {
    type: types.REQUEST_START,
    meta: {
      client: {
        type: types.RECEIVE_START,
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
export function stop(timeEntryId: string): ClientAction {
  return {
    type: types.REQUEST_STOP,
    meta: {
      client: {
        type: types.RECEIVE_STOP,
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
export function changeKeyboard(keyboardType: string): Action {
  return {type: types.CHANGE_KEYBOARD, payload: {keyboardType}};
}

/**
 * タイマー編集開始
 *
 * @return {Object} action
 */
export function editStartForm(): {type: string} {
  return {type: types.EDIT_START_FORM};
}

/**
 * タイマー編集終了
 *
 * @return {Object} action
 */
export function editEndForm(): {type: string} {
  return {type: types.EDIT_END_FORM};
}
