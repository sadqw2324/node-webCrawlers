const https = require('https')
const fs = require('fs')
const iconv = require('iconv-lite')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

var items = new Array()

var getInput = () => {
    var datas = fs.readFileSync('./input-ali.txt')
    const dom = new JSDOM(datas.toString())
    var lines = dom.window.document.getElementsByClassName('_3liAhj _1R0K0g')
    for (var line of lines) {
        var info1 = line.getElementsByClassName('_2cLu-l')[0]
        var href = info1.getAttribute('href')
        var name = info1.getAttribute('title')
        var price = line.getElementsByClassName('_1vC4OE')[0].innerHTML
        var cnum = (line.getElementsByClassName('_38sUEc')[0] === undefined ? '0' : line.getElementsByClassName('_38sUEc')[0].innerHTML)
        var onum = (line.getElementsByClassName('_2_KrJI')[0] === undefined ? '0' : line.getElementsByClassName('_2_KrJI')[0].innerHTML)
        var info2 = line.getElementsByClassName('_1Nyybr  _30XEf0')[0]
        var img =  (info2.getAttribute('src') == null ? info2.getAttribute('image-src') : info2.getAttribute('src'))
        items.push({
            href: href,
            img: img,
            name: name,
            price: price,
            cnum: cnum,
            onum: onum
        })
    }
}

var setOutput = () => {
    fs.writeFile('./Electric_pressure_cooker/mid_output_ali.txt', JSON.stringify(items), err => console.log(err))
}

var prepare = str => {
    if (str === undefined) {
      return null
    }
    else {
      // 这里的/,/g和/\n/g是正则表达式
      return str.replace(/,/g,'，').replace(/\n/g, ' ')
    }
}

var toExcel = () => {
    var cnt = 1
    for (var data of items) {
        var str = ''
        str += cnt++
        str += ',' + prepare(data['href'])
        str += ',' + prepare(data['img'])
        str += ',' + prepare(data['name'])
        str += ',' + prepare(data['price'])
        str += ',' + prepare(data['cnum'])
        str += ',' + prepare(data['onum'])
        str += '\n'
        // 同步的写文件，将str写到'output.txt'，将flag设置为'a'，即append，将数据追加到源文件结尾
        fs.writeFileSync('./output-ali.csv', str, {flag: 'a'}, err => console.log(err))
    }
}

getInput()

//console.log(items[0])
//setOutput()

toExcel()