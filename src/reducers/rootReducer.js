import {combineReducers} from 'redux';
import {login} from './login';
import {period} from './period';


const rootReducer = combineReducers({login, period});

export default rootReducer;
