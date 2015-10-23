import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import clientMiddleware from '../middlewares/client';
import rootReducer from '../reducers/rootReducer';

const logger = createLogger({predicate: () => __DEV__});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware,
  clientMiddleware,
  logger
)(createStore);

/**
 * ストアを作成
 *
 * @return {Object} store
 */
export default function configureStore() {
  return createStoreWithMiddleware(rootReducer);
}
