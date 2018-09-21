// fs 文件系统模块
var fs = require('fs')
// 读取json中的数据，用String的concat函数拼接
var datas = require('../tmp/mid_output.json')

var culs = new Object()

// 数据处理函数，将数据中的','和'\n'替换成'，'和';'
var prepare = str => {
  if (str === undefined) {
    return null
  }
  else {
    // 这里的/,/g和/\n/g是正则表达式
    return str.replace(/,/g,'，').replace(/\n/g, ';')
  }
}

// 删除没有params的数据
var num = 0;

for(var i = 0;i<datas.length;i++){
  if(datas[i].params === undefined){
    datas.splice(i,1);
  }
}

var num1 = 0;

for(var i = 0;i<datas.length;i++){
  if(datas[i].params == undefined){
    num1 ++;
  }
}

datas.splice(datas.length-num1,num1);

for (var data of datas) {
  // console.log(data)
  for (var param of data.params) {
    // 将datas中的所有的params的key，添加到culs中
    if (culs[param.key] === undefined) culs[param.key] = true
    // 将datas中的params[i].key和params[i].value变成data[param.key] = param.value
    data[param.key] = param.value
  }
  // 删除data中的params
  delete data.params
}

// console.log(datas[0].prototype === datas[1].prototype)

// console.log(culs)

// console.log(datas)

var columnsName = 'number,href,img,name,price,cnum'
for (var key in culs) {
  columnsName += ',' + prepare(key)
}
columnsName += '\n'
fs.writeFileSync(__dirname + '/../output/output.csv', columnsName, {flag: 'a'}, err => console.log(err))

var cnt = 1
for (var data of datas) {
  var str = ''
  str += cnt++
  str += ',' + prepare(data.href)
  str += ',' + prepare(data.img)
  str += ',' + prepare(data.name)
  str += ',' + prepare(data.price)
  str += ',' + prepare(data.cnum)
  for (var key in culs) {
    str += ',' + prepare(data[key])
  }
  str += '\n'
  // 同步的写文件，将str写到'output.txt'，将flag设置为'a'，即append，将数据追加到源文件结尾
  fs.writeFileSync(__dirname + '/../output/output.csv', str, {flag: 'a'}, err => console.log(err))
}

console.log(cnt)