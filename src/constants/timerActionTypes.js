/* @flow */
import reaction from 'dacho';


// TODO: Add flowtype for dacho module
const types: {[key: string]: string} = reaction([
  'CHANGE_KEYBOARD',
  'EDIT_START_FORM',
  'EDIT_END_FORM',
  'REQUEST_START',
  'REQUEST_STOP',
  'RECEIVE_START',
  'RECEIVE_STOP'
], 'TIMER/');

export default types;
