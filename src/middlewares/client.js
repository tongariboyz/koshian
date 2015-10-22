/**
 * API クライアント実行ミドルウェア
 *
 * @param {function} getState getState
 * @return {function}
 */
export default function clientMiddleware({getState}) {
  return next => action => {
    const state = getState();
    if (action.meta && action.meta.client) {
      const {client, ...others} = action.meta;
      next(Object.assign({}, action, {meta: others}));
      return next(Object.assign({
        type: client.type,
        payload: client.next(state.auth.client),
        meta: others
      }));
    }
    return next(action);
  };
}
