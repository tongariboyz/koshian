/* @flow */
import reaction from 'dacho';


// TODO: Add flowtype for dacho module
const types: {[key: string]: string} = reaction([
  'LOGOUT',
  'REQUEST_TOKEN',
  'RECEIVE_TOKEN',
  'REMOVE_TOKEN',
  'RESTORE_TOKEN'
], 'AUTH/');

export default types;
