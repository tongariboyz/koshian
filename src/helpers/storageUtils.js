/* @flow */
import {AsyncStorage} from 'react-native';


/**
 * AsyncStora.getItem
 *
 * @param {string} key キー
 * @return {Promise}
 */
export function getItem(key: string): Promise {
  return AsyncStorage.getItem(key);
}


/**
 * AsyncStora.removeItem
 *
 * @param {string} key キー
 * @return {Promise}
 */
export function removeItem(key: string): Promise {
  return AsyncStorage.removeItem(key);
}


/**
 * AsyncStora.setItem
 *
 * @param {string} key キー
 * @param {string} value 値
 * @return {Promise}
 */
export function setItem(key: string, value: string): Promise {
  return AsyncStorage.setItem(key, value);
}


export default {getItem, removeItem, setItem};
