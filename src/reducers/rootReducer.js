import {combineReducers} from 'redux';
import {auth} from './auth';
import {period} from './period';
import {timer} from './timer';


const rootReducer = combineReducers({auth, period, timer});

export default rootReducer;
