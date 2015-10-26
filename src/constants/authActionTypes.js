/* @flow */
import uniqueActionTypes from '../helpers/uniqueActionTypes';


export default uniqueActionTypes('AUTH/', [
  'LOGOUT',
  'REQUEST_TOKEN',
  'RECEIVE_TOKEN',
  'REMOVE_TOKEN',
  'RESTORE_TOKEN'
]);
