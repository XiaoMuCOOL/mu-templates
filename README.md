<div align="center">
  <a href="http://www.bingblue.com">
    <img width="112" heigth="112" src="https://github.com/bingblue/group/blob/master/public/img/logo-b-square.png">
  </a>
  <br>
  <br>
	<a href="https://standardjs.com">
		<img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
	</a>
	<a href="https://github.com/stylelint/stylelint">
		<img src="https://img.shields.io/badge/css%20style-stylelint-brightgreen.svg">
	</a>
  <a href="https://jq.qq.com/?_wv=1027&k=5tyQDAd">
		<img src="https://img.shields.io/badge/QQ%20Group-215259343-blue.svg">
	</a>
  <h1>Mu-Simple</h1>
  <br>
  <p>
    A simple template with ESlint & Stylelint(最简单的模板，有js和css语法检测)
  <p>
  <br>
  <br>
</div>

## 基本信息

**作者** ： 小牧COOL

**QQ号** ： 895355044

**QQ群** ： [215259343][1]

**官网** ： www.bingblue.com

## Usage

```cmd
// 安装依赖
$ cnpm i

// 运行项目
$ npm start

// 替换HTML内容
$ npm run html //如:head.html代码在part文件夹下，运行此命令会替换所有html的头部代码

// 编译less,检查css、js语法
$ npm run dev

// 编译less,检查css、js语法,替换HTML内容
$ npm run build

// 删除替换HTML内容,删除生成文件
$ npm run del
```

## Mu-Simple 涉及技术

- [H5][2]     -   HTML5
- [JQuery][3] -   Javascript类库
- [gulp][4]   -   自动化构建工具([中文文档][5])
- [gulp-postcss][6]   -   css预/后 处理器,使用了插件[[cssnano][7] [postcss-cssnext][8] [precss][9]]
- [gulp-html-replace][10] -   用HTML替换构建块
- [gulp-sequence][12]   -   按顺序运行一系列的gulp任务
- [gulp-standard][13]   -   js规范检测,基于`JavaScript Standard Style`代码规范
- [browser-sync][15]   -   省时的浏览器同步/热加载测试工具([中文文档][19])
- [stylelint][16]   -   css规范检测,基于[stylelint-config-standard][17]
- [del][18]   -   删除文件/文件夹

## License

**Mu-Simple** is licensed under the GNU GENERAL PUBLIC LICENSE, Version 3. [View the license file](https://github.com/xiaomucool/mu-templates/blob/master/LICENSE)

Copyright © 2018 · 滨清科技 , Inc. 

All Rights Reserved · Powered by : **小牧COOL**

[1]:https://jq.qq.com/?_wv=1027&k=5tyQDAd
[2]:https://developer.mozilla.org/zh-CN/docs/Web/HTML
[3]:http://jquery.com/
[4]:http://www.gulpjs.com/
[5]:http://www.gulpjs.com.cn/
[6]:http://postcss.org/
[7]:http://cssnano.co/
[8]:http://cssnext.io/
[9]:https://github.com/jonathantneal/precss
[10]:https://www.npmjs.com/package/gulp-html-replace
[12]:https://github.com/teambition/gulp-sequence
[13]:https://standardjs.com/readme-zhcn.html
[15]:https://browsersync.io/
[16]:http://stylelint.cn/
[17]:https://github.com/stylelint/stylelint-config-standard
[18]:https://github.com/sindresorhus/del
[19]:http://www.browsersync.cn/
