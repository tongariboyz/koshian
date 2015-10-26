/* @flow */
/**
 * API クライアント実行ミドルウェア
 *
 * @param {function} getState getState
 * @return {function}
 */
export default function clientMiddleware({dispatch, getState}: {
  dispatch: Function,
  getState: Function
}): Function {
  return next => action => {
    const state = getState();
    if (action.meta && action.meta.client) {
      const {client, ...others} = action.meta;
      dispatch(Object.assign({
        type: client.type,
        payload: client.next(state.auth.client),
        meta: others
      }));
      return next(Object.assign({}, action, {meta: others}));
    }
    return next(action);
  };
}
