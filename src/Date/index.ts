/**
 *
 * @param start
 * @param end
 */
// 二个日期之间的天数
export function getTime(start: string, end: string) {
  let preTime: Date = new Date(start);
  let nowTime: Date = new Date(end);
  let preTimeNums = Date.parse(preTime.toString()); //parse() 方法可解析一个日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数。
  let nowTimeNums = Date.parse(nowTime.toString());
  let diffTimeNums = Math.abs(nowTimeNums - preTimeNums);
  let day = Math.floor(diffTimeNums / (1000 * 60 * 60 * 24));
  let hour = Math.floor(diffTimeNums / (1000 * 60 * 60)) - day * 24;
  let minute =
    Math.floor(diffTimeNums / (1000 * 60)) - day * 24 * 60 - hour * 60;
  let second =
    Math.floor(diffTimeNums / 1000) -
    day * 24 * 60 * 60 -
    hour * 60 * 60 -
    minute * 60;
  //console.log(day, hour, minute, second);
}
// getTime('2022-07-08 18:00:00', new Date().toString())
//console.log(new Date().toString());
getTime(new Date().toString(), "2022-07-08 18:00:00");

/**
 * @param time  时间戳转时间
 * @returns
 */
export function changeTimeFormat(time: number) {
  const date = new Date(time);
  const month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const currentDate =
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const mm =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return (
    date.getFullYear() + "-" + month + "-" + currentDate + " " + hh + ":" + mm
  );
}

export function hourToDay(value: number) {
  const day = value / 24;
  const hour = value % 24;
  console.log(day,hour);
}
hourToDay(1440);
