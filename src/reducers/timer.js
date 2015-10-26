import {
  CHANGE_KEYBOARD,
  EDIT_START_FORM,
  EDIT_END_FORM,
  REQUEST_START,
  RECEIVE_START
} from '../constants/timer';

/**
 * @typedef {Object} TimerState
 * @property {string} state.keyboardType キーボードタイプ
 * @property {boolean} state.isEditing フォームの編集状態
 * @property {boolean} state.isRunning 計測中状態
 * @property {boolean} state.isTryingStart 計測開始状態
 * @property {Object} state.timeEntry 現在計測中の TimeEntry
 */


/**
 * タイマー
 *
 * @param {TimerState} state state
 * @param {Object} action action
 * @return {Object} state
 */
export function timer(state = {
  keyboardType: 'label',
  isEditing: false,
  isRunning: false,
  isTryingStart: false,
  timeEntry: {}
}, action) {
  switch (action.type) {
  case CHANGE_KEYBOARD:
    return Object.assign(
      {},
      state,
      {keyboardType: action.payload.keyboardType}
    );
  case EDIT_START_FORM:
    return Object.assign(
      {},
      state,
      {
        keyboardType: 'label',
        isEditing: true
      }
    );
  case EDIT_END_FORM:
    return Object.assign(
      {},
      state,
      {isEditing: false}
    );
  case REQUEST_START:
    return Object.assign(
      {},
      state,
      {isTryingStart: true}
    );
  case RECEIVE_START:
    return Object.assign(
      {},
      state,
      {
        isRunning: true,
        isTryingStart: false,
        timeEntry: action.payload.body.data
      }
    );
  default:
    return state;
  }
}
