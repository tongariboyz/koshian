import {CHANGE_PERIOD_VIEW_INDEX} from '../constants/period';

/**
 * PeriodScrollView の表示中の index を変更
 *
 * @param {number} index index
 * @return {function}
 */
export function changePeriodViewIndex(index) {
  return {
    type: CHANGE_PERIOD_VIEW_INDEX,
    payload: {index}
  };
}
