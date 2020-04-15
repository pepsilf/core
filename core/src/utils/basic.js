const hasOwn = Object.prototype.hasOwnProperty;
const toString = Object.prototype.toString;
const getProto = Object.getPrototypeOf;
const isProto = Object.isPrototypeOf;

/**
 *  数据类型判断
 */
const _is = {};
["Object", "Array", "String", "Number", "Boolean", "Null", "Undefined", "Function", "Date", "RegExp", "Error"].forEach(v => {
  _is[`is${v}`] = obj => {
    let s = toString.call(obj);
    let d = `[object ${v}]`;
    if(v === "Function") {
      return s === d || s === "[object AsyncFunction]"
    }
    return s === d;
  }
})

/**
 *  空值判断
 */
const isEmpty = obj => {
  if(_is.isObject(obj) || _is.isArray(obj)){
    for (let key in obj) return false;
    return true;
  }
  return obj === undefined || obj === null || obj === "";

}

/**
 *  深克隆
 */
const deepClone = obj => {
  if(_is.isDate(obj)) return new Date(obj);
  if(_is.isRegExp(obj)) return new RegExp(obj);
  if(typeof obj !== 'object') return obj;
  if(_is.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  let newObj = {};
  if(_is.isObject(obj)) {
    for (let k in obj) {
      newObj[k] = deepClone(obj[k])
    }
  }
  return newObj
}

/**
 *  函数防抖
 */
const debounce = (fn, wait = 1000) => {
  let time = null;
  return () => {
    time && clearTimeout(time);
    time = setTimeout(() => fn.apply(this, arguments), wait);
  }
}

/**
 *  函数节流
 */
const throttle = (fn, wait = 1000) => {
  let p = 0;
  return ()=> {
    let n = +new Date();
    if (n - p > wait) {
      p = n;
      return fn.apply(this, arguments);
    }
  }
}

export default {
  hasOwn,
  isEmpty,
  deepClone,
  debounce,
  throttle,
  ..._is
}
