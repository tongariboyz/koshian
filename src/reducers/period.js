import moment from 'moment';
import {
  CHANGE_PERIOD_VIEW_INDEX,
  CHANGE_VIEW_PERIOD
} from '../constants/period';

const INITIAL_CURRENT_DATE = new Date();
const PERIOD_VIEW_LENGTH = 8;

/**
 * @typedef {Object} PeriodState
 * @property {Date} state.currentDate 現在表示している期間の日付
 * @property {number} state.distance 表示期間を変更する間隔
 * @property {number} state.index 現在表示しているビュー番号
 * @property {Object[]} state.stack 表示する期間のデータセット
 */

/**
 * 期間表示
 *
 * @param {PeriodState} state state
 * @param {Object} action action
 * @return {PeriodState} state
 */
export function period(state = {
  currentDate: INITIAL_CURRENT_DATE,
  distance: 0,
  index: PERIOD_VIEW_LENGTH,
  stack: getViewPeriods(INITIAL_CURRENT_DATE)
}, action) {
  switch (action.type) {
  case CHANGE_PERIOD_VIEW_INDEX:
    return Object.assign(
      {},
      state,
      {
        distance: Math.abs(state.index - action.payload.index),
        index: action.payload.index}
    );
  case CHANGE_VIEW_PERIOD:
    const currentDate = getNextCurrentDate(
      state.currentDate,
      state.distance,
      {direction: action.payload.direction}
    );
    return Object.assign(
      {},
      state,
      {
        currentDate,
        index: PERIOD_VIEW_LENGTH,
        stack: getViewPeriods(currentDate)
      }
    );
  default:
    return state;
  }
}

/**
 * 次に表示する期間を返す
 *
 * @param {Date} beforeCurrentDate beforeCurrentDate
 * @param {number} distance distance
 * @param {Object} [opts] options
 * @param {string} [opts.direction] direction
 * @return {Date} currentDate
 */
function getNextCurrentDate(beforeCurrentDate, distance, opts = {}) {
  const currentDate = moment(beforeCurrentDate);
  if (opts.direction === 'prev') {
    currentDate.subtract(distance, 'd');
  } else if (opts.direction === 'next') {
    currentDate.add(distance, 'd');
  }
  return new Date(currentDate.format());
}

/**
 * 表示する期間セットを返す
 *
 * @param {Date} currentDate currentDate
 * @return {Object[]} viewPeriods
 */
function getViewPeriods(currentDate) {
  const prevs = [];
  const nexts = [];
  for (let v = PERIOD_VIEW_LENGTH; v >= 1; v--) {
    prevs.push({date: new Date(moment(currentDate).subtract(v, 'd').format())});
  }
  for (let v = 1; v <= PERIOD_VIEW_LENGTH; v++) {
    nexts.push({date: new Date(moment(currentDate).add(v, 'd').format())});
  }
  return prevs.concat({date: currentDate, name: 'Current'}, nexts);
}
