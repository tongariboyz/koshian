import {
  REQUEST_START,
  RECEIVE_START
} from '../constants/timer';

/**
 * @typedef {Object} TimerState
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
  isRunning: false,
  isTryingStart: false,
  timeEntry: {}
}, action) {
  switch (action.type) {
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
