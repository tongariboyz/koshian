import uniqueActionTypes from '../helpers/uniqueActionTypes';


export default uniqueActionTypes('TIMER/', [
  'REQUEST_START',
  'REQUEST_STOP',
  'RECEIVE_START',
  'RECEIVE_STOP'
]);
