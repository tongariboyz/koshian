import uniqueActionTypes from '../helpers/uniqueActionTypes';


export default uniqueActionTypes('TIMER/', [
  'CHANGE_KEYBOARD',
  'EDIT_START_FORM',
  'EDIT_END_FORM',
  'REQUEST_START',
  'REQUEST_STOP',
  'RECEIVE_START',
  'RECEIVE_STOP'
]);
