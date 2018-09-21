# 使用说明

1.打开Qzon产品列表

2.按F12,选择列表div,右键copy->copy element

3.打开input.txt,将数据删除后粘贴新的数据

4.Ozon.ru点击页面左上角安全Cookies全部禁用,点击一个产品刷新,F12点击Network找到第一个(数字串),复制request headers

5.粘贴到index.js,对比上下修改

6.运行 node tool\get.js和node tool\generateExcel.js

7.注意完成后将页面的cookies屏蔽解除