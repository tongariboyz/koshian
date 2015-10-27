/* @flow */
import types from '../constants/timer';

type Action = {
  type: string,
  payload: Object
};
type State = {
  keyboardType: string,
  isEditing: boolean,
  isRunning: boolean,
  isTryingStart: boolean,
  isTryingStop: boolean,
  timeEntry: Object
};

/**
 * @typedef {Object} TimerState
 * @property {string} state.keyboardType キーボードタイプ
 * @property {boolean} state.isEditing フォームの編集状態
 * @property {boolean} state.isRunning 計測中状態
 * @property {boolean} state.isTryingStart 計測開始状態
 * @property {boolean} state.isTryingStop 計測終了状態
 * @property {Object} state.timeEntry 現在計測中の TimeEntry
 */


/**
 * タイマー
 *
 * @param {TimerState} state state
 * @param {Object} action action
 * @return {Object} state
 */
export function timer(state: State = {
  keyboardType: 'label',
  isEditing: false,
  isRunning: false,
  isTryingStart: false,
  isTryingStop: false,
  timeEntry: {}
}, action: Action): State {
  switch (action.type) {
  case types.CHANGE_KEYBOARD:
    return Object.assign(
      {},
      state,
      {keyboardType: action.payload.keyboardType}
    );
  case types.EDIT_START_FORM:
    return Object.assign(
      {},
      state,
      {
        keyboardType: 'label',
        isEditing: true
      }
    );
  case types.EDIT_END_FORM:
    return Object.assign(
      {},
      state,
      {isEditing: false}
    );
  case types.REQUEST_START:
    return Object.assign(
      {},
      state,
      {isTryingStart: true}
    );
  case types.REQUEST_STOP:
    return Object.assign(
      {},
      state,
      {isTryingStop: true}
    );
  case types.RECEIVE_START:
    return Object.assign(
      {},
      state,
      {
        isRunning: true,
        isTryingStart: false,
        timeEntry: action.payload.body.data
      }
    );
  case types.RECEIVE_STOP:
    return Object.assign(
      {},
      state,
      {
        isEditing: false,
        isRunning: false,
        isTryingStop: false,
        timeEntry: {}
      }
    );
  default:
    return state;
  }
}
