import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import authMiddleware from '../middlewares/auth';
import rootReducer from '../reducers/rootReducer';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  authMiddleware
)(createStore);

/**
 * ストアを作成
 *
 * @return {Object} store
 */
export default function configureStore() {
  return createStoreWithMiddleware(rootReducer);
}
