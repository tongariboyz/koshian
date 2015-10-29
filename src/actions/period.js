/* @flow */
import types from '../constants/periodActionTypes';
import {getPeriodDates} from '../helpers/dateUtils';

type Action = {
  type: string,
  payload: any
};


/**
 * PeriodScrollView の表示中の index を変更
 *
 * @param {number} index index
 * @return {Object}
 */
export function changePeriodViewIndex(index: number): Action {
  return {
    type: types.CHANGE_PERIOD_VIEW_INDEX,
    payload: {index}
  };
}

/**
 * 表示する TimeEntries を取得
 *
 * @param {Date} currentDate 現在表示対象の日時
 * @return {Object}
 */
export function fetchTimeEntries(currentDate: Date): {
  type: string,
  meta: {
    client: {
      type: string,
      next: Function
    }
  }
} {
  const [start, end] = getPeriodDates(currentDate, 1);
  return {
    type: types.FETCH_TIME_ENTRIES,
    meta: {
      client: {
        type: types.RESPONSE_PERIOD_TIME_ENTRIES,
        next: client => client.getTimeEntries(start, end)
      }
    }
  };
}


/**
 * PeriodScrollView 内での API 初期リクエスト実行 action を発行
 *
 * @param {Date} currentDate 現在表示対象の日時
 * @return {Object}
 */
export function initializePeriodViewIndex(currentDate: Date): {
  type: string,
  meta: {
    client: {
      type: string,
      next: Function
    }
  }
} {
  const [start, end] = getPeriodDates(currentDate, 1);
  return {
    type: types.INITIALIZE_PERIOD_VIEW_INDEX,
    meta: {
      client: {
        type: types.RESPONSE_PERIOD_TIME_ENTRIES,
        next: client => client.getTimeEntries(start, end)
      }
    }
  };
}
