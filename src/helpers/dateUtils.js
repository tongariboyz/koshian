import moment from 'moment';


/**
 * 指定日時から開始/終了日を返す
 *
 * 開始日時を日 (Date) に直して指定間隔後の日とあわせて返す
 *
 * @param {Date} currentDate 開始日時
 * @param {number} [duration] 間隔
 * @return {Date[]}
 */
export function getPeriodDates(currentDate, duration = 1) {
  const start = moment(currentDate).startOf('day');
  const end = start.clone().add(duration, 'd');
  return [start.toDate(), end.toDate()];
}


/**
 * Date/文字列からtimeEntry配列格納キーを作成して返す
 *
 * @param {Date|string} date 対象日時
 * @return {string}
 */
export function createTimeEntryKey(date) {
  return moment(date).format('YYYYMMDD');
}
