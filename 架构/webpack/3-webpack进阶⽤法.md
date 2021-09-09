## 移动端 CSS px 自动转换成 rem

### 浏览器分辨率

移动设备流行之后，不同机型的分辨率是不一样的，这对前端开发来说，就会造成比较大的问题，需要不断的对
页面进行适配。

### CSS 媒体查询实现响应式布局

以前有一种比较常用的方式，就是使用 css 的媒体查询去实现响应式的布局。

缺陷：需要写多套适配样式代码，影响开发效率的。

```css
@media screen and (max-width: 980px) {
  .header {
  	width: 900px;
  } 
}
@media screen and (max-width: 480px) {
  .header {
  	height: 400px;
  } 
}
@media screen and (max-width: 350px) {
  .header {
  	height: 300px;
  } 
}
```

### rem 是什么？

css3 里面提出了一个 rem 的单位，根元素 font-size 的大小，也就是说 rem 是一个相对的单位。px 是绝对单位。

### 移动端 CSS px ⾃动转换成 rem

编写代码的时候，按照 px 的单位去写，通过构建工具，自动的将 px 转换成 rem，这个工具就是 px2rem-loader。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // rem相对于px的转换的单位，75代表1rem=75px，这个比较适合750的设计稿，750个像素对应着10个rem。
              remPrecision: 8 // px转成rem，后面小数点的位数。
            }
          }
        ]
      }
    ]
  }
}
```

使用手淘比较成熟的方案 [lib-flexible ](https://github.com/amfe/lib-flexible) 库计算实际的设备分辨率根元素的 font-size 大小。

页面打开的时候就需要马上的计算这个值，所以它的位置需要前置放在前面的位置。



## webpack 中的热更新

### webpack-dev-server

基于 express 启动了一个小型服务。

WDS 会刷新浏览器。

WDS 输出的文件不放入磁盘里面，没有磁盘的 IO 操作，它输出的文件是放在内存里面，而不像watch这种方式是放在本地的磁盘文件里面。所以它的构建速度会有更大的优势。

#### 使用 WDS

```js
module.exports = {
  mode: 'development',
  // 配置devServer
  devServer: {
    // wds 服务的基础的目录
    contentBase: './dist',
    // 代理
    proxy: {
      '/api': {
				target: 'http://localhost:9092'
      }
    },
    // 防止我们没有使用vue-router的api进行跳转，比如在地址栏直接输入我们的路由，这时就会请求到我们本地服务器，由于这个路由是前端路由，服务器是不认识这个路径的，所以会返回找不到页面。加了这个配置就可以在这种情况下，让服务器去找我们htmlPlugin生成的index.html，这样就可以进到我们前端的页面来了。只要进到我们前端的页面，那么路由就由我们前端来掌控了，就不会有问题了。
    historyApiFallback: { 
			index: '/public/index.html' // 这个index它的写法跟我们在webpack.config.base.js中output里的publicPath是有关系是对应的，这个publicPath就是作为historyApiFallback里index的基路径。如果你不这么写它是找不到的。
		}
    // mock数据，跟wds中间件机制有关。wds中间件给我们提供了两个钩子，加载中间件之前和之后的概念。
    before(app, server) {
      // 就相当于在这里做服务器接口的工作
			app.get("/api/mock.json", (req, res) => {
        res.json({
          hello: "express",
        })
      })
    },
    after() {
      
    }
  }
}
```

```json
"scripts": {
  "dev": "webpack-dev-server --open"
}
```

运行构建

```bash
npm run dev
```

### webpack-dev-middleware

WDM 将 webpack 输出的⽂件传输给服务器。

适⽤于灵活的定制场景，可以对 webpack 的配置控制的更多。

#### 使用WDM

```js
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleWare = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

app.use(webpackDevMiddleWare(compiler, {
  publicPath: config.output.publicPath
}))

app.listen(3000, function() {
  console.log('Example app listening on port 3000')
})
```

### 热更新

借助 webpack-dev-server，每次代码修改，自动构建，构建完成后，通过热更新的方式让浏览器的内容自动的变化。

启动 HMR 后，css 抽离会不⽣效，还有不⽀持 contenthash，chunkhash。

#### 使用 HMR

```js
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // 配置devServer
  devServer: {
    // 开启热更新
    hot: true,
    // 即便HMR不⽣效，浏览器也不⾃动刷新，就开启hotOnly
 		hotOnly: true
  }
}
```

案例：

```js
// index.js
import "./css/index.css";
var btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);
btn.onclick = function() {
  var div = document.createElement("div");
  div.innerHTML = "item";
  document.body.appendChild(div);
};
```

```css
/* index.css */
div:nth-of-type(odd) {
	background: yellow; 
}
```

#### 处理 js 模块 HMR

上面的方式就直接能处理 css 的热更新了，处理 js 的热更新需要使⽤ module.hot.accept 来观察模块更新，从⽽更新。

案例：

```js
// counter.js
function counter() {
  var div = document.createElement("div");
  div.setAttribute("id", "counter");
  div.innerHTML = 1;
  div.onclick = function() {
  	div.innerHTML = parseInt(div.innerHTML, 10) + 1;
  };
  document.body.appendChild(div);
}
export default counter;
```

```js
// number.js
function number() {
  var div = document.createElement("div");
  div.setAttribute("id", "number");
  div.innerHTML = 13000;
  document.body.appendChild(div);
}
export default number;
```

```js
// index.js
import counter from "./counter";
import number from "./number";
counter();
number();
if (module.hot) {
  module.hot.accept("./b", function() {
    document.body.removeChild(document.getElementById("number"));
    number();
 	});
}
```

##### 热更新的原理分析

* Webpack Compile：webpack 编译器，将 JS 源代码编译成 Bundle。

* HMR Server：将热更新的文件输出给 HMR Runtime。

* Bundle Server：提供文件在浏览器的访问，比如编译好的 Bundle 其实在浏览器里正常访问到的是文件目录，bundle server 可以让你通过服务器的方式访问。localhost:8080/bundle.js

* HMR Runtime：在开发阶段将 HMR Runtime 注入到浏览器端bundle.js，浏览器端的 bundle.js 就可以和服务器建立一个连接，通常这个连接是一个 websocket。当收到文件的更新数据回包，就会自动的更新这个文件。

* bundle.js：构建输出的文件。

  ![热更新](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/热更新.png) 

#### 热更新的过程

启动阶段，在文件系统里进行编译，将初始的代码经过webpack compiler进行打包，将编译好的文件传输给
bundle server，它是一个服务器，它可以让文件以server的方式让浏览器可以访问的到。                   

文件更新的阶段，本地开发，有文件的变化，文件系统发生变化，代码经过 webpack compiler 进行编译，编译好之后它会将代码发送给 HMR Server，HMR Server 就可以知道哪些资源哪些模块发生了改变，这里的模块是指源代码部分的这些模块，然后 HMR Server 就会通知 HMR Runtime，就是 server 端通知客户端哪些文件发生了变化，通常是以 json 数据进行传输，传输到了 HMR Runtime 之后，HMR Runtime 就会更新代码。最终代码就会经过改变并且不需要刷新浏览器。这就是热更新的原理。



## 在 webpack 中使用 ESLint

### eslint 的必要性

代码检查，代码规范。写 js 代码时将明显的问题及时的暴露出来。

### 行业里面优秀的 eslint 规范实践

airbnb：eslint-config-airbnb eslint-config-airbnb-base

### 制定团队的 eslint 规范，遵循以下原则

* 不重复造轮子，基于 eslint:recommend 配置去改进

* 能够帮助发现代码错误的规则，全部开启 
* 帮助保持团队的代码风格统一，而不是限制开发体验

### ESLint 执⾏落地

#### ⽅案⼀：与CI/CD系统集成

![eslint与CI:CD集成](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/eslint与CI:CD集成.png)

把代码检查放在 CI/CD 的 pipeline build 里面去。

##### 安装 husky

它自动会在本地项目的 .git 目录下面去生成一个 hook，它会读取 package.json 里的一些内容，比如说我们的precommit。

注意：安装 husky 之前项目要 git init 初始化好，如果连 git 目录都没有，它安装的过程中生成的 git hook 就没法放进去。

```bash
npm i husky -D
```

##### 本地开发阶段增加 precommit 钩⼦。

git 进行代码提交的时候，可以使用 precommit 的 git 钩子。在调用 git commit 的时候，触发 precommit 钩子，先运行 precommit 命令，"precommit": "npm run lint-fix"，自动帮我们去检测代码，如果代码不通过 eslint。没有办法提交代码。

##### 增加 npm script，通过 lint-staged 增量检查修改的⽂件。

```json
"scripts": {
	"precommit": "lint-staged"
},
"lint-staged": {
  "linters": {
  	"*.{js,scss}": ["eslint --fix", "git add"]
  }
}
```

#### 方案二：与webpack等构建工具集成

webpack 构建的时候，遇见 eslint 的语法问题，直接中断构建，语法修改正确后才能构建成功。 

比较适合新的，一开始就使用 eslint 的项目。不适合老的项目去接入，因为这种方案，webpack 构建的时候它会默认把所有的文件都会进行检查。

##### 安装

eslint 基础解析包

```bash
npm i eslint eslint-loader -D
```

比较好且流行的eslint书写规范，我们自己就不定义这个规范了。

```bash
npm i eslint-config-standard -D
```

上面官方推荐我们安装的，它的校验规则要依赖于这些plugin进行验证。

```bash
npm i eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node -D
```

因为.vue文件类似于html的格式，不是标准的javascript文件。eslint没法直接识别.vue文件里面的javascript代码，这个插件够让 eslint 识别一个文件里 script 标签下面的javascript。所以就用这个工具去解析我们的.vue文件就可以了。官方的推荐也是这么去做。

```bash
npm i eslint-plugin-html -D
```

兼容 babel 和 eslint

```bash
npm i babel-eslint -D
```

##### 配置文件 .eslintrc

```json
{
  "extends": "standard",    // 使用哪个eslint规范。
  "plugins": ["html"],      // eslint检查.vue文件不报错。
  "parser": "babel-eslint"  // 代码都是要经过babel去处理过的，会有一些语法对eslint不是特别支持，可能就会出现一些问题，所以一般使用webpack和babel开发的项目都会指定它的parser是babel-eslint。 
}
```

##### 使⽤ eslint-loader，构建时检查 JS 规范。

开发的过程中，每次修改代码，自动进行 eslint 检查。

```js
module.exports = {
	module: {
    rules: [
      {
				test: /\.(vue|js|jsx)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
				enforce: 'pre'
			}
    ]
  }
}

```

##### 使用 package.json scripts 手动检查代码规范

```json
{
	"scripts": {
    "lint": "eslint --ext .js --ext .jsx --ext .vue src/", // 检查代码是否符合规则
    "lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue src/" // 修复代码
  }
}
```



## vue-loader

vue-loader.config.js

```js
module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: !isDev, // 将.vue文件里的css也通过extract-text-webpack-plugin这个插件单独打包到我们的那个大css文件中去，对于异步加载的.vue文件，这个作用就失效了。
    cssModules: {}, // 实现css module的功能
  }
}
```



## 文件指纹策略

什么是文件指纹：打包后输出的文件名后缀。

文件指纹的好处：用来做版本的管理。

### 常见的文件指纹有哪几种：

* hash：每次打包后整个项目的 hash 值，每构建一次就会有一个新的 hash 值。
* chunkhash：和 webpack 打包的 chunk 有关，不同的 entry 会⽣成不同的 chunkhash 值，根据不同入口 entry 进行依赖解析，构建对应的 chunk，生成相应的 hash，只要组成 entry 的模块没有内容改动，则对应的 hash 不变， 对于 js 文件的指纹，一般采用 chunkhash。
* contenthash：根据⽂件内容来定义 hash ，⽂件内容不变，则 contenthash 不变。 一个页面既有 js 资源也有 css 资源，如果 css 资源也使用 chunkhash 的话，会有一个问题，就是我们修改了 js，但是 css 并没有变，由于 css 也使用了 chunkhash，就会导致 css 内容没有变，但是发布上去的文件指纹发生了变化。因此对于 css ，通常根据内容进行文件指纹的生成，采用 contenthash。

### JS 的⽂件指纹设置

设置 output 的 filename，使⽤ [chunkhash]。

chunkhash是没办法和热更新的HotModuleReplacementPlugin一起使用的，所以只需设置在生产环境。

```js
module.exports = {
  output: {
    filename: '[name].[chunkhash:8].js',
    path: __dirname + '/dist'
  }
}
```

### CSS 的⽂件指纹设置和 css 文件抽离

使用 style-loader 和 css-loader 的话，那么这个 css 会由这个 style-loader 将这个 css 插入到 style 里面并且放到 head 头部。这时并没有独立的一个 css 文件，因此我们通常会采用插件把 css 提取成一个独立的文件。

css/sass/less 等 css 相关文件经过对应的 loader 处理之后，最终处理必须为 style-loader 将 css 样式放到 style 标签中或者使用文件提取的插件将 css 单独提取成独立 css 文件。两者必须存在一个，这样样式才能有效。两者同时存在时，style-loader 在前，生成独立 css 文件，style-loader 失效；提取文件的插件 loader 在前，编译过不了。

css 文件指纹也只需设置在生产环境。

#### webpack4

使用 MiniCssExtractPlugin 插件的 loader。

设置 MiniCssExtractPlugin 的 filename，使⽤ [contenthash]。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
	plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    })
  ]
}
```

#### webpack3

使用 extract-text-webpack-plugin 把非 js 的代码，单独打包成一个静态资源文件。比如把css文件拎出来打包成一个单独的文件，因为这些文件可能是要做浏览器缓存。

使用 ExtractTextPlugin 的 loader。

设置 ExtractTextPlugin 的 filename，使⽤ [contenthash]。

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        ]
      },
      {
        test: /\.less/,
        use: [
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'less-loader'
            ]
          })
        ]
      }
    ]
  },
	plugins: [
    new ExtractTextPlugin('styles.[contentHash:8].css')
  ]
}
```

###  图片或字体的文件指纹设置

设置 file-loader 或 url-loader 的 name，使⽤ [hash]。

这里的 hash 也是指文件内容的 hash，这个 hash 是采用 md5 生成的。

```js
module.exports = {
	module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]'
          }
        }
      }
    ]
  }
}
```



## 静态资源内联

### 资源内联的意义

代码层面：

* ⻚⾯框架的初始化脚本：如上节中 rem 计算的 js 库，要在打开页面的时候就要去计算。

* 上报相关打点：page start，css 初始化，css 加载完成，js 初始化和 js 加载完成等代码，这些都是需要内联到 html 里面去，而不能直接放到最终打包的 js 脚本中去。

* css 内联避免⻚⾯闪动

请求层⾯：

* 减少 HTTP ⽹络请求数

### ⼩图⽚或者字体内联使用 url-loader

### html 和 js 的内联

raw-loader 的功能是读取一个文件，把这个文件的内容返回成一个 string，把这个 string 插入到对应的位置。

#### raw-loader 内联 html

```html
 <%= require('raw-loader!./meta.html') %>
```

#### raw-loader 内联 js

```html
<script>
  <%= require('raw-loader!babel-loader!../../node_modules/lib-flexible/flexible.js') %></script>
```

### css 内联

#### 方案一：借助 style-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top', // 样式插入到 <head>
              singleton: true, // 将所有的style标签合并成一个
            }
          },
          "css-loader",
          "less-loader"
        ]
      }
    ]
  }
}
```

#### 方案二：html-inline-css-webpack-plugin

它针对打包好的 css chunk 的代码，把它内联到 html 的 head 中。

```js
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

module.exports = {
  plugins: [
    new HTMLInlineCSSWebpackPlugin(),
  ]
}
```



## 多页面应用打包通用方案

### 多页面应用（MPA）概念

多页面发布上线之后，它有很多个入口。

每一次页面跳转的时候，后台服务器都会返回一个新的 html 文档。

多页面优势

​	1.每个页面之间是解偶的

​	2.对 seo 更友好

### 多页面打包基本思路

每个页面对应一个 entry，一个 html-webpack-plugin。

缺点：每次新增或删除页面需要手动修改 webpack 配置构建脚本。

### 多⻚⾯打包通⽤⽅案

动态获取 entry 和设置 html-webpack-plugin 数量。

通过程序的思维动态获取某个目录下面指定的入口文件，需要有一个约定，把所有的页面都放在 src 的目录下面，每个页面的入口文件都约定为 index.js，这样我们就可以通过 js 脚本去获取src里面所有的目录，就可以知道入口文件的数量，打包的时候动态的设置 html-webpack-plugin。相比于自己写这个脚本，webpack 里面有一个更通用的做法是通过 glob 这个库，glob 的原理类似 linux 操作系统下面文件通配匹配的概念，根据匹配信息返回匹配到的目录内容，我们根据这个目录内容进行操作就可以了。

```js
const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  Object.keys(entryFiles)
    .map(index => {
    const entryFile = entryFiles[index]
    const match = entryFile.match(/src\/(.*)\/index\.js/)
    const pageName = match && match[1]
    entry[pageName] = entryFile
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(__dirname, `./src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: [pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        perserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }))
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}
const {entry, htmlWebpackPlugins} = setMPA()
```



## webpack 打包组件和基础库

webpack 除了可以⽤来打包应⽤，也可以⽤来打包 js 库。

对于打包组件或基础库，除了 webpack，rollup 更加适合，因为它打包相对 webpack 更加纯粹，使用更加简单。但是由于 webpack 功能比较强大，使用 webpack 打包组件和库的场景还是很多的。

### 实现⼀个⼤整数加法库的打包

需要打包压缩版和⾮压缩版本。

⽀持 AMD/CJS/ESM 模块引⼊，也支持script标签方式引入。

### 库的目录结构

dist
    large-number.js
    large-number.min.js
webpack.config.js
package.json
index.js
src
    index.js

### 支持的模块使用方式

#### 支持ES module

```js
import * as largeNumber from 'large-number'
largeNumber.add('999', '1')
```

#### 支持CJS

```js
const largeNumber = require('large-number')
largeNumber.add('999', '1')
```

#### 支持AMD

```js
require(['large-number'], function(large-number) {
  largeNumber.add('999', '1')
})
```

#### 直接通过script引入，脚本发布到cdn上去

```html
<script src="https://unpkg.com/large-numer"></script>
<script>
  largeNumber.add('999', '1')
</script>
```

### 如何将库暴露出去

```js
module.exports = {
  mode: 'production',
  entry: {
    'large-number': './src/index.js',
    'large-number.min': './src/index.js'
  },
  output: {
    filename: '[name].js',   
    library: 'largeNumber',   // 指定库它暴露出去的库的名称，同时也可以通过全局变量的方式去引入到它。
    libraryTarget: 'umd',     // 支持库引入的方式，设置成umd就可以支持上述四种方式的引用。
    libraryExport: 'default'  // 如果不设置成default，要通过largeNumber.default使用，不是很方便。
  }
}
```

### 如何只对 .min 压缩

通过 include 设置只压缩 min.js 结尾的⽂件

```js
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
	optimization: {
    minimize: true,
    minimizer: [
      // 压缩js，遇到se6不会报错
      new TerserWebpackPlugin({
        include: /\.min\.js$/
      })
    ]
  }
}
```

### 设置⼊⼝⽂件

package.json 的 main 字段为 index.js

index.js

```js
if (process.env.NODE_ENV === "production") {
	module.exports = require("./dist/large-number.min.js");
} else {
	module.exports = require("./dist/large-number.js");
}
```

### 发布到npm上面去
增加npm script钩子，每次npm publish的时候会执行一下打包

```json
"scripts": {
	"prepublish": "webpack"
}
```

登陆npm账号

```bash
npm login
```

发布

```bash
npm publish
```



## webpack实现SSR打包



## 优化构建时命令行的显示日志

构建的过程，命令行里面会有一大堆的信息打印出来，很多不需要开发者关注，开发者更加关注的是，构建是否成功，构建报错的信息，构建 warning 的信息。对于构建成功的详细的信息，比如 loader 里输出的日志，插件的处理日志等并不是太需要关注的。

### 统计信息stats

统计信息，可以分析构建速度或构建体积，也可以分析一些其他的数据出来。

![stats统计信息](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/stats统计信息.png)

### 命令行更加明显的提示信息

使用 friendly-errors-webpack-plugin，对于构建成功，警告，错误都有很明显的信息提示。

stats 设置成 errors-only，生产环境直接设置。开发环境如果用的是 webpack-dev-server，就设置到这里。

```js
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  plugins: [
  	new FriendlyErrorsWebpackPlugin()
  ],
  stats: 'errors-only'
};
```

### 使⽤效果

success：构建成功的日志提示

warning：构建警告的日志提示

error：构建报错的日志提示



## 构建异常和中断处理

在 webpack 里面怎么做错误的捕获和异常的处理。

### 如何判断构建是否成功？

构建完之后，接下来要部署或一些其他的操作，像 CI/CD 的系统或者发布系统它怎么知道这次构建是否成功呢。

每次构建完之后输入一个 echo $? 获取错误码。如果错误码不为 0 的话，说明这次构建是失败的。也可以获取到error 的信息。

### 构建异常和中断处理

webpack4 之前的版本构建失败不会抛出错误码 (error code)。

webpack4 给我们抛出了错误码，但是我们想针对异常的情况需要加额外的处理怎么做呢？

通过 node.js 中的 process.exit 规范去把错误码抛出来。这个规范也是尊从命令行里面的 error

* 0 表示成功完成，回调函数中，err 为 null

* 非 0 表示执行失败，回调函数中，err 不为 null，err.code 就是传给 exit 的数字

### 如何主动捕获并处理构建错误？

compiler 在每次构建结束后会触发 done 这个 hook，我们只要监听 done 这个 hook，就可以对它进行额外的一些操作。比如数据上报相关的信息。错误信息可以通过 stats 获取到。

process.exit 主动处理构建报错。

```js
module.exports = {
	plugins: [
    function() {
      this.hooks.done.tap('done', stats => {
        if (
          stats.compilation.errors && 
          stats.compilation.errors.length && 
          process.argv.indexOf('--watch') === -1
        ) {
          console.log('build error')
          process.exit(1)
        }
      })
    }
  ]
}
```