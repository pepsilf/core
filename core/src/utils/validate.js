const isIdCade = v => /(^\d{15}&)|(^\d{18})|(^\d{17}(\d|X|x)$)/.test(v);

const isMobile = v => /^1[3-9]\d{9}/.test(v);

const isEmail = v => /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(v);

const isBank = v => /^([1-9]{1})(\d{15}|\d{18})$/.test(v);

const isZn = v => /^[\u4E00-\u9FA5\uf900-\ufa2d]$/.test(v);

const isEn = v => /(^[a-zA-Z]+$)/.test(v);

const isNumber = v => /^\d+$/.test(v);

const isFloat = v => /^\d+(\.\d+)?$/.test(v);

const checkZn = v => v.replace(/[^\u4E00-\u9FA5\uf900-\ufa2d]/g, "");

const checkEn = v => v.replace(/[^a-zA-Z]/g, "");

const checkNumber = v => v.replace(/[^\d]/g, "");

const checkFloat = (v,l = 2) => {
  if(!v.includes(".")) return checkNumber(v);
  v = v.replace(/[^\d|\.]/g, "");
  let n = v.split(".");
  return n[0] + "." + n[1].slice(0,l)
}

export default {
  isIdCade,
  isMobile,
  isEmail,
  isBank,
  isZn,
  isEn,
  isNumber,
  isFloat,
  checkZn,
  checkEn,
  checkNumber,
  checkFloat,
}
