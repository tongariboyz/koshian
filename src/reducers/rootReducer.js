import {combineReducers} from 'redux';
import {auth} from './auth';
import {period} from './period';


const rootReducer = combineReducers({auth, period});

export default rootReducer;
