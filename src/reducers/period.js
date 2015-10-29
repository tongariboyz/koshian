/* @flow */
import moment from 'moment';
import types from '../constants/periodActionTypes';
import {createTimeEntryKey} from '../helpers/dateUtils';

const INITIAL_CURRENT_DATE = moment().startOf('day').toDate();
const PERIOD_VIEW_LENGTH = 52;

type Action = {
  type: string,
  payload: Object
};
type State = {
  currentDate: Date,
  index: number,
  stack: any[],
  timeEntries: {[key: string]: Object[]}
};

/**
 * @typedef {Object} PeriodState
 * @property {Date} state.currentDate 現在表示している期間の日付
 * @property {number} state.index 現在表示しているビュー番号
 * @property {Object[]} state.stack 表示する期間のデータセット
 * @property {Object} state.timeEntries 日付文字列をキーにしたTimeEntryの配列
 */

/**
 * 期間表示
 *
 * @param {PeriodState} state state
 * @param {Object} action action
 * @return {PeriodState} state
 */
export function period(state : State = {
  currentDate: INITIAL_CURRENT_DATE,
  timeEntries: {},
  index: PERIOD_VIEW_LENGTH,
  stack: getViewPeriods(INITIAL_CURRENT_DATE)
}, action: Action): State {
  switch (action.type) {
  case types.CHANGE_PERIOD_VIEW_INDEX:
    const currentDate = getNextCurrentDate(
      state.currentDate,
      state.index,
      action.payload.index
    );
    return Object.assign(
      {},
      state,
      {
        currentDate,
        index: action.payload.index
      }
    );
  case types.RESPONSE_PERIOD_TIME_ENTRIES:
    // FIXME: 一旦格納方法は適当
    const query = action.payload.request.query;
    const key = createTimeEntryKey(query.start_date);
    const timeEntries = Object.assign({}, state.timeEntries);
    // XXX: Flow v0.17 時点では computed property の assign は未サポート
    timeEntries[key] = action.payload.body.slice().reverse();
    return Object.assign(
      {},
      state,
      {timeEntries}
    );
  default:
    return state;
  }
}

/**
 * 次に表示する期間を返す
 *
 * @param {Date} beforeCurrentDate beforeCurrentDate
 * @param {number} currentIndex currentIndex
 * @param {number} nextIndex nextIndex
 * @return {Date} currentDate
 */
function getNextCurrentDate(
  beforeCurrentDate: Date,
  currentIndex: number,
  nextIndex: number
): Date {
  const currentDate = moment(beforeCurrentDate);
  const distance = Math.abs(currentIndex - nextIndex);
  if (currentIndex > nextIndex) {
    currentDate.subtract(distance, 'd');
  } else {
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
function getViewPeriods(currentDate: Date): Object[] {
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
