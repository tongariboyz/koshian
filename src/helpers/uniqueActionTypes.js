/* @flow */
const registeredKeys = [];

/**
 * ユニークな action type export 用オブジェクトを作成して返す
 *
 * @param {string} prefix action type の重複チェックキーに使用する prefix
 * @param {string[]} actionTypes action type 名リスト
 * @return {Object}
 */
export default function uniqueActionTypes(prefix: string, actionTypes: Array<string>): {
  [key: string]: string
} {
  const ret = {};
  actionTypes.forEach(type => {
    const key = `${prefix}${type}`;
    if (registeredKeys.indexOf(key) >= 0) {
      throw new Error(`ActionType duplicated: ${type} -> ${key}`);
    }
    ret[type] = key;
    registeredKeys.push(key);
  });
  return ret;
}
