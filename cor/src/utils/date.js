const S_SECONDS = 1000;
const M_SECONDS = 60 * S_SECONDS;
const H_SECONDS = 60 * M_SECONDS;
const D_SECONDS = 24 * H_SECONDS;
const TIME_ZONE = - new Date().getTimezoneOffset() * M_SECONDS;
const WEEKS = ["日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];

const GAPS = [
  { s: "年", l: 365 * D_SECONDS },
  { s: "个月", l: 30 * D_SECONDS },
  { s: "天", l: D_SECONDS },
  { s: "小时", l: H_SECONDS },
  { s: "分钟", ss: "分", l: M_SECONDS },
  { s: "秒钟", ss: "秒", l: S_SECONDS }
]

/**
 *  格式化日期时间格式
 */
const format = function (d, f = "yyyy-MM-dd hh:mm:ss") {
  if(!d) return ""
  let t = {
    yyyy: d.getFullYear(),
    M: d.getMonth() + 1,
    d: d.getDate(),
    h: d.getHours(),
    m: d.getMinutes(),
    s: d.getSeconds(),
    w: `星期${WEEKS[d.getDay()]}`,
    S: d.getMilliseconds()
  }
  for (let k in t) {
    if(k != "yyyy"){
      let v = t[k];
      t[k + k] = v < 10 ? "0" + v : v
    }
  }
  return f.replace(/(?!\\)(yyyy|MM|M|dd|d|hh|h|mm|m|ss|s|SS|S|ww|w)/g, function (f) {
    return t[f]
  })
}

/**
 *  时间间隔描述
 */
const timeInterval = (b, t = new Date())=>{
    let d = Math.abs(t - b);
    if(isNaN(d)) return ""
    if(d <= 10 * S_SECONDS){
      return "刚刚"
    }
    let i = GAPS.find(item => {
      return d >= item.l
    })
    return Math.floor(d / i.l) + i.s;
}

/**
 *  时间间隔详细描述
 */
const timeIntervals = (b, t = new Date(), c = 2)=>{
  let d = Math.abs(t - b);
  if(isNaN(d)) return ""
  if(d <= 10 * S_SECONDS){
    return "刚刚"
  }
  let des = "",count = 0;
  GAPS.forEach(item => {
    if(d >= item.l && count< c){
      count++;
      des += (Math.floor(d / item.l) + (item.ss || item.s));
      d = d % item.l;
    }
  })
  return des;
}

/**
 *  获取当年还剩几天
 */
const queryOverDay = (t = new Date()) => {
  let l = new Date((t.getFullYear() + 1).toString()) - TIME_ZONE;
  return Math.floor((l - t) / D_SECONDS);
}

/**
 *  获取当年的第几天
 */
const queryWhichDay = (t = new Date()) => {
  let l = new Date(t.getFullYear().toString()) - TIME_ZONE;
  return Math.ceil(( t - l)/D_SECONDS);
}

/**
 *  获取当年的第几周
 */
const queryWhichWeek = (t = new Date()) => {
  return Math.ceil(queryWhichDay(t)/7);
}

export default {
  format,
  timeInterval,
  timeIntervals,
  queryOverDay,
  queryWhichDay,
  queryWhichWeek,
}
