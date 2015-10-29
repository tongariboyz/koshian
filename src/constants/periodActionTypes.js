/* @flow */
import reaction from 'dacho';


// TODO: Add flowtype for dacho module
const types: {[type: string]: string} = reaction([
  'CHANGE_PERIOD_VIEW_INDEX',
  'FETCH_TIME_ENTRIES',
  'INITIALIZE_PERIOD_VIEW_INDEX',
  'RESPONSE_PERIOD_TIME_ENTRIES'
], 'PERIOD/');

export default types;
