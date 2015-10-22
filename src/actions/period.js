import {
  CHANGE_PERIOD_VIEW_INDEX,
  CHANGE_VIEW_PERIOD,
  INITIALIZE_PERIOD_VIEW_INDEX,
  RESPONSE_PERIOD_TIME_ENTRIES
} from '../constants/period';

/**
 * PeriodScrollView の表示中の index を変更
 *
 * @param {number} index index
 * @return {Object}
 */
export function changePeriodViewIndex(index) {
  return {
    type: CHANGE_PERIOD_VIEW_INDEX,
    payload: {index}
  };
}

/**
 * 表示する期間を変更
 *
 * @param {string} direction direction
 * @return {Object}
 */
export function changeViewPeriod(direction) {
  return {
    type: CHANGE_VIEW_PERIOD,
    payload: {direction}
  };
}


export function initializePeriodViewIndex() {
  return {
    type: INITIALIZE_PERIOD_VIEW_INDEX,
    meta: {
      client: {
        type: RESPONSE_PERIOD_TIME_ENTRIES,
        next: client => client.getTimeEntries()
      }
    }
  };
}
