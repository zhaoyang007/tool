## 目 录

01 基础篇：webpack 与构建发展简史

02 基础篇：webpack 基础用法

03 基础篇：webpack 进阶用法

04 进阶篇：编写可维护的 webpack 构建配置

05 进阶篇：webpack 构建速度和体积优化策略

06 原理篇：通过源码掌握 webpack 打包原理

07 原理篇：编写 Loader 和插件

08 实战篇：React 全家桶 和 webpack 开发商城项目



## 为什么需要构建工具

前端发展迅速，而浏览器对新出现的语言支持不好，为了我们能够在本地开发使用新的语言和技术来提高我们的开发效率，就需要一个构建工具来把浏览器不支持的语言转换成浏览器支持的。

转换 ES6 语法

转换 JSX

CSS 前缀补全/预处理器

压缩混淆

图片压缩

![es6支持情况](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/es6支持情况.png)

​																ES6 module 主流浏览器支持情况

 

## 为什么选择 webpack

|              | ***\*webpack\**** | ***\*grunt\**** | ***\*gulp\**** |
| ------------ | ----------------- | --------------- | -------------- |
| 定义         | Module bundler    | Task runner     | Task runner    |
| 语言         | JavaScript        | Node.js         | Node.js        |
| 发布时间     | 2012.3            | 2012.6          | 2013.7         |
| GitHub stars | 40766             | 11796           | 29427          |
| 周下载量     | 3,385,392         | 478,876         | 816,228        |

社区生态丰富

配置灵活和插件化扩展

官方更新迭代速度快



## 前端构建演变之路

无代码压缩和混淆  ——》 通过在线工具压缩混淆代码  ——》 ant + YUI Toll 在本地对代码压缩混淆 ——》 requirejs commonjs 模块化概念的出现，前端模块化的编写方式也越来越复杂，演变出了grunt ——》 gulp fis3 ——》 rollup webpack parcel



## webpack

webpack is a module bundler（模块打包⼯具），是⼯程化、⾃动化思想在前端开发中的体现。

模块化开发，当前流行的单页面应用是只有一个入口的，那怎么把整个项目给串起来呢，就是通过模块化语句 require import 等来引入模块，形成依赖。

进入入口文件 index.js，webpack 会借助 babel 来分析页面里面的内容，哪些是依赖，哪些是语句，然后对代码处理成浏览器能够正确执行的 js。分析完入口文件后，会进入依赖的模块里面去，同样分析这个模块中的依赖和语句，对代码进行转义和处理。通过一个入口模块，递归地找出⼊⼝⽂件的所有依赖，不断的处理编译，将⼊⼝和其所有的依赖打包到⼀个单独的⽂件中，最终它会形成一个代码块。    

一个 chunk 对应一个 bundle，bundle 是打包构建生成的资源文件，chunk 是代码块的意思。一个 chunk 代码块可能是多个模块组成的，nodejs 里，万物皆模块，就是文件。

chunk：⼀个⼊⼝肯定是⼀个chunk，但是⼀个chunk不⼀定只有⼀个依赖。



## 环境搭建

### 安装 Node.js 和 NPM

#### 安装 nvm（https://github.com/nvm-sh/nvm）

* 通过 curl 安装：curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
* 通过 wget 安装：wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

#### 将nvm添加到环境变量里面

* source ~/.bash_profile

#### 安装 Node.js 和 NPM

* nvm install v10.15.3

* 检查是否安装成功：node -v, npm -v

### 安装 webpack 和 webpack-cli

#### 创建空目录和 package.json

* mkdir 

* my-project

* npm init -y

#### 全局安装 webpack

全局安装 webpack，这会将你项⽬中的 webpack 锁定到指定版本，造成不同的项⽬中因为 webpack 依赖不同版本⽽导致冲突，构建失败，所以不推荐全局安装。

```bash
# 安装webpack V4+版本时，需要额外安装webpack-cli
npm install webpack webpack-cli -g
# 检查版本
webpack -v
# 卸载
npm uninstall webpack webpack-cli -g
```

#### 项目安装 webpack

```bash
# 安装最新的稳定版本
npm install webpack webpack-cli --save-dev
# 安装指定版本
npm i -D webpack@<version>
# 安装最新的体验版本 可能包含bug,不要⽤于⽣产环境
npm i -D webpack@beta
# 检查是否安装成功
webpack -v # command not found 默认在全局环境中查找
npx webpack -v # npx会生成一个软链接path指向到当前目录的node_modules的可执行目录.bin⾥的webpack命令
./node_modules/.bin/webpack -v # 到当前目录的node_modules的可执行目录.bin⾥查找webpack命令
```



## 初识 webpack

webpack 配置就是一个对象。

### 配置文件名称

webpack 执行构建会默认找 webpack.config.js 这个默认的配置文件。

也可以通过 webpack --config 指定配置文件。

### webpack 配置组成

```js
// webpack 是基于 nodejs 的
module.exports = { 
  context: process.cwd() // 上下文，项目打包的相对路径，必须是绝对路径
	entry: './src/index.js', 
  output: './dist/main.js',
  mode: 'production',
	module: {
    rules: [	
    	{ 
        test: /\.txt$/, 
        use: 'raw-loader' 
      }
    ]
  },
  plugins: [
  	new HtmlwebpackPlugin({ 
      template: './src/index.html’
  	})
  ]
}
```

### 零配置 webpack 包含哪些内容？

 ```js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"), // 必须是绝对路径
    filename: "main.js"
  }
}
 ```



## 运行打包

### 直接运行

./node_modules/.bin/webpack 

npx webpack

### 通过 npm script 运⾏ webpack

```json
{
  "name": "hello-webpack",
  "version": "1.0.0", 
  "description": "Hello webpack", 
  "main": "index.js",
  "scripts": {
  	"build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

通过 npm run build 运行构建

原理：局部安装的依赖，如果有创建一些命令，会通过 shell 脚本在 node_modules/.bin 目录下创建一个软链接，package.json 是可以默认的读取到 .bin 目录下的这些命令的。
