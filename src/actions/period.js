import {
  CHANGE_PERIOD_VIEW_INDEX,
  CHANGE_VIEW_PERIOD
} from '../constants/period';

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

/**
 * 表示する期間を変更
 *
 * @param {number} direction direction
 * @return {function}
 */
export function changeViewPeriod(direction) {
  return {
    type: CHANGE_VIEW_PERIOD,
    payload: {direction}
  };
}
