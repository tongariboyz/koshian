import {CHANGE_PERIOD_VIEW_INDEX} from '../constants/period';

/**
 * 期間表示
 *
 * @param {Object} state state
 * @param {Object} action action
 * @return {Object} state
 */
export function period(state = {
  index: 0,
  stack: [{name: 'Scene 1'}]
}, action) {
  switch (action.type) {
  case CHANGE_PERIOD_VIEW_INDEX:
    return Object.assign(
      {},
      state,
      {index: action.payload.index}
    );
  default:
    return state;
  }
}
