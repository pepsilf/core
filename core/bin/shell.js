require('shelljs/global');

function addVer(v) {
  let verlist = v.split(".");
  function changeVer(index,verList) {
    let verNum = Number(verList[index])+1;
    if(verNum>100) {
      verList[index] = 0;
      changeVer(index-1,verList);
    }else {
      verList[index] = verNum;
    }
    return verList;
  }
  return changeVer(verlist.length-1,verlist).join(".")
}

let v = process.env.VERSION || require('../package.json').version;

let nextVer = addVer(v);

console.log('Start', '正在发布...');
exec(`npm publish`);
console.log('Finished', '发布完成！');

