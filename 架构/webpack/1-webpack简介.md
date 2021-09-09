### webpack

进入入口文件 index.js，webpack 会借助 babel 来分析页面里面的内容，哪些是依赖，哪些是语句，然后把代码处理成浏览器能够正确执行的 js。分析完入口文件后，会进入依赖的模块里面去，同样分析这个模块中的依赖和语句，对代码进行转义和处理。通过一个入口模块，递归地找出⼊⼝⽂件的所有依赖，不断的处理编译，将⼊⼝和其所有的依赖打包到⼀个单独的⽂件中，最终它会形成一个代码块。    

一个 chunk 对应一个 bundle，bundle 是打包构建生成的资源文件，chunk 是代码块的意思。一个 chunk 代码块可能是多个模块组成的，nodejs 里，万物皆模块，就是文件。

chunk：⼀个⼊⼝肯定是⼀个 chunk，但是⼀个 chunk 不⼀定只有⼀个依赖。



### 环境搭建

##### 安装 Node.js 和 NPM

安装 nvm（https://github.com/nvm-sh/nvm）

* 通过 curl 安装：curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
* 通过 wget 安装：wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

将 nvm 添加到环境变量里面

* source ~/.bash_profile

安装 Node.js 和 NPM

* nvm install v10.15.3

* 检查是否安装成功：node -v, npm -v

##### 安装 webpack 和 webpack-cli

全局安装 webpack

全局安装 webpack，这会将你项⽬中的 webpack 锁定到指定版本，造成不同的项⽬中因为 webpack 依赖不同版本⽽导致冲突，构建失败，所以不推荐全局安装。

```bash
# 安装webpack V4+版本时，需要额外安装webpack-cli
npm install webpack webpack-cli -g
# 检查版本
webpack -v
# 卸载
npm uninstall webpack webpack-cli -g
```

项目安装 webpack

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



### 初识 webpack

##### 配置文件

webpack 配置是一个对象。

webpack 执行构建会默认找 webpack.config.js 这个默认的配置文件。

也可以通过 webpack --config 指定配置文件。

##### webpack 配置组成

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

##### 零配置 webpack 包含哪些内容？

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



### 运行打包

##### 直接运行

./node_modules/.bin/webpack 

npx webpack

##### 通过 npm script 运⾏ webpack

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



### webpack 核心概念

##### entry

```js
module.exports = {
  // 单入口：entry 是一个字符串或数组。
	entry: './src/index.js'
  // entry: ['./src/index.js', './src/index2.js']
  
  // 多入口：entry 是一个对象
  entry: {
    // main: './src/index.js', // 默认值就是main，等价于上面字符串的写法
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  }
}
```

##### output

output 用来告诉 webpack 如何将编译后的文件输出到磁盘。

单入口配置

```js
module.exports = {
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
}
```

多入口配置

```js
module.exports = {
  output: {
    path: __dirname + '/dist',
    filename: '[name].js' // 多出口不可以指定名称
  }
}
```

##### loaders

webpack 开箱即用只支持 JS 和 JSON 两种文件类型，对于其他的文件如 css less jsx vue 指令，webpack 并不了解，就需要通过 loader处理，去支持其它文件类型并且把它们转化成有效的模块，并且可以添加到依赖图中，loader 就是模块转换器。loaders 本身是一个函数，接受源文件作为参数，返回转换的结果。⼀个loader只处理⼀件事情。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  }
}
```

##### plugins

plugin 作用是用来增强 webpack 的功能，plugin 通常用于打包输出的 js 文件的优化，资源的管理和环境变量的注入，任何 loader 没办法做到的事情都可以通过 plugin 去完成。比如构建之前需要手动的去删除打包目录，像这种操作都是可以通过 plugins 很灵活的完成，plugin 是作用于整个构建过程，就是从构建开始到构建结束整个阶段都是可以使用 plugin 的，webpack的打包过程是有（⽣命周期概念）钩⼦，plugin 可以在webpack运⾏到某个阶段的时候，帮你做⼀些事情，类似于⽣命周期的概念。 plugin 本身是一个类。

```js
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.htmls'
    })
  ]
}
```

##### mode

mode 是用来指定当前构建环境：production development none。

设置 mode 的好处是可以自动的触发 webpack 内置的函数，比如你设置成 development，webpack 会默认的去开启在开发阶段的一些比较实用的参数和插件。设置成 production 会默认开启在生产阶段的参数和插件的一些功能，设置成 none 就什么都不会帮你做。默认值为 production。

```js
module.exports = {
  mode: 'production'
}
```

DefinePlugin：

mode 其实就是设置的这个插件。

定义了这个，就可以在业务 js 代码中引用到 process.env.NODE_ENV。

使用 vue, react 这些框架时，一定要用的 plugin，webpack 会根据环境变量选择不同的 vue 或 react 版本打包。

```js
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
	plugins: [
		new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    })  
	]
}
```
