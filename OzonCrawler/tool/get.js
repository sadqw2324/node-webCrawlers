const https = require('https')
const fs = require('fs')
const iconv = require('iconv-lite')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
var config = require('../config')

var items = new Array()

var getInput = () => {
    var result = fs.readFileSync(__dirname + '/../input/input.txt')
    const dom = new JSDOM(result.toString())
    // const dom = new JSDOM('<div><div class="a">1<div/><div class="a"><div>2<div/><div/><div/>')
    var lines = dom.window.document.getElementsByClassName('bOneTile inline')
    var i = 1
    for (var line of lines) {
        // console.log(line['href'])
        var href = line.getElementsByClassName('eOneTile_link')[0].href
        //链接找整个div参数data-itemid的值
        //var id = line.getAttribute('data-itemid')
        //图片找第一个eOneTile_image_link的参数data-image-src
        var img = line.getElementsByClassName('eOneTile_image_link')[0].getAttribute('data-image-src')
        //商品名找整个div参数的data-name
        var name = line.getAttribute('data-name')
        //价钱找整个div参数的data-price
        var price = (line.getAttribute('data-price') !== undefined) ? line.getAttribute('data-price') : 'null'
        //评论数找eOneTile_ReviewsCount的innerhtml
        var cnum = (line.getElementsByClassName('eOneTile_ReviewsCount')[0] === undefined ? '0' : line.getElementsByClassName('eOneTile_ReviewsCount')[0].innerHTML)
        items.push({
            href: href,
            img: img,
            name: name,
            price: price,
            cnum: cnum
        })
        // console.log(i++ + ' ' + href + '  ' + cnum)
    }
}

var getDetail = idx => {
    var item = items[idx]
    config.options.path = item.href
    const req = https.get(config.options, res => {
        var datas = []
        var size = 0
        res.on('data', data => {
            datas.push(data)
            size += data.length
            // console.log(data)
        })
        res.on('end', () => {
            var buff = Buffer.concat(datas, size)
            var result = iconv.decode(buff, 'win1251')
            // console.log(result)
            // fs.writeFile('out',result, err => console.log(err))

            const dom = new JSDOM(result.toString())
            // const dom = new JSDOM('<div><div class="a">1<div/><div class="a"><div>2<div/><div/><div/>')
            var lines = dom.window.document.getElementsByClassName('eItemProperties_line')
            item.params = new Array()
            for (var line of lines) {
                var key = line.childNodes[1].innerHTML
                var value = line.childNodes[3].innerHTML
                item.params.push({
                    key: key,
                    value: value
                })
            }
        })
    })
    req.end()
    config.options.headers.referer = config.baseURL + item.href // 这里修正了他的referer，模拟浏览器
}

var getAllDetail = (idx, end) => () => {
    if (idx < end) {
        console.log(idx)
        getDetail(idx)
        setTimeout(getAllDetail(idx + 1, end), config.timeout)
    }
    else {
        // console.log(items)
        setOutput()
    }
}

var setOutput = () => {
    fs.writeFile(__dirname + '/../tmp/mid_output.json',JSON.stringify(items), err => console.log(err))
}

getInput()

setOutput()

getAllDetail(0, items.length)()