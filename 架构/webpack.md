## 基础使用

##### 配置分类

* 基础配置（webpack.base.js）
  * 资源解析
    * 解析 es6
    * 解析 react
    * 解析 css
    * 解析 less
    * 解析图片
    * 解析字体
  * 样式增强
    * 前缀补齐
    * px 转 rem
  * 清理目录
  * 多页面打包
  * 命令行信息显示优化
  * 错误捕获和处理
  * css 提取成单独的文件
* 开发环境配置（webpack.dev.js）
  * 代码热更新
    * js 热更新
    * css 热更新
  * sourcemap
* 生产环境配置（webpack.prod.js）
  * 代码压缩
  * 文件指纹
  * Tree Shaking
  * Scope Hoisting
  * 速度优化（基础包 CDN）
  * 体积优化（代码分割）
* SSR 配置（webpack.ssr.js）
  * Output 的 libiraryTarget 的设置
  * Css 解析 ignore

##### webpack

进入入口文件 index.js，webpack 会借助 babel 来分析页面里面的内容，哪些是依赖，哪些是语句，然后把代码处理成浏览器能够正确执行的 js。递归地找出⼊⼝⽂件的所有依赖，不断的处理编译，将⼊⼝和其所有的依赖打包到⼀个单独的⽂件中，最终形成一个代码块。    

chunk 是代码块的，bundle 是打包构建生成的资源文件，一个 chunk 对应一个 bundle。nodejs 里，万物皆模块，就是文件。

##### webpack 配置组成

```js
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

entry：

单入口

```js
module.exports = {
	entry: './src/index.js'
  // entry: ['./src/index.js', './src/index2.js']
}
```

多入口

```js
module.exports = {
  entry: {
    // main: './src/index.js', // 默认值就是main，等价于上面字符串的写法
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  }
}
```

output：

单入口

```js
module.exports = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
```

多入口

```js
module.exports = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js' // 多出口不可以指定名称
  }
}
```

##### babel

要解析 es6 需要安装 @babel/core，es6 的预设插件 @babel/preset-env，通过 babel-loader 去解析它们。

```bash
npm i @babel/core @babel/preset-env babel-loader -D
```

使用 babel-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
}
```

babel 配置文件：.babelrc

babel 在执⾏编译的过程中，会从项⽬根⽬录下的 .babelrc JSON ⽂件中读取配置。没有该⽂件会从 loader 的 options 地⽅读取配置。

babel 两个比较重要的概念，presets 和 plugins。plugins 可以理解成一个 plugin 对应一个功能，presets 是一系列 babel plugin 的集合。要解析es6，使用 es6 的预设 @babel/preset-env 就可以了。 

```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

解析 react jsx：

安装 react 相关

```bash
npm i react react-dom @babel/preset-react -D
```

增加 react 的 babel 预设，就可以解析 react 相关的语法了。

```json
{
  "presets": [
    "@babel/preset-react"
  ]
}
```

##### 解析 css

css-loader 作用是加载 .css 模块的内容，转成 commonjs 对象，插入到 js 模块中去。

然后通过 style-loader 将样式通过 \<style\> 标签插入到 head 中，这样样式才能显示出来。

```bash
npm i css-loader style-loader -D
```

配置 css-loader style-loader

有一点需要注意，loader 的调用顺序是从右到左的，因此需要先写 style-loader，再写 css-loader，实际执行的时候会先去使用 css-loader 去解析 css，然后再将解析好的 css 传递给 style-loader。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
```

使用 .vue 文件进行开发，应该使用 vue-style-loader 而不是 style-loader，这样 .vue 文件的样式也有热重载的功能了，.vue 文件和样式文件的样式都适用。

##### 解析 less 和 sass

```bash
npm i less less-loader -D
```

配置 less

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

##### 解析图片

file-loader 用于处理文件

```bash
npm i file-loader -D
```

配置图片解析 file-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      }
    ]
  }
}
```

##### 解析字体

在 webpack 里解析字体和解析图片做法是一样的，因为图片和字体都不是代码文件。图片和字体的解析都可以用file-loader 处理。

配置字体解析 file-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  }
}
```

##### 图片和字体解析的其他方式

url-loader 包含了 file-loader 的全部功能，只不过 url-loader 相比 file-loader，还可以做小图片或小字体，自动的做一个 base64 的转换，url-loader 内部也使用了 file-loader。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240 // 单位是字节 1024=1kb
          }
        }]
      }
    ]
  }
}
```

##### webpack 中的⽂件监听

⽂件监听是在发现源码发⽣变化时，⾃动重新构建出新的输出⽂件。

webpack 开启监听模式，有两种方式：

启动 webpack 命令时，带上 --watch 参数

```json
"scripts": {
  "watch": "webpack --watch"
}
```

在配置 webpack.config.js 中设置 watch: true

```js
module.exports = {
  // 默认false，也就是不开启
  watch: true,
  // 只有开启监听模式时，watchOptions才有意义
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配，默认为空
    ignored: /node_modules/,
    // 监听到变化后会等300ms再去执行，默认300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停轮询系统指定文件有没有变化实现的，默认每秒询问1000次
    poll: 1000
  }
}
```

缺陷：每次需要⼿动刷新浏览器。

文件监听的原理分析：

轮询判断⽂件的最后编辑时间是否变化。

某个⽂件发⽣了变化，并不会⽴刻告诉监听者，⽽是先缓存起来，等 aggregateTimeout，这个时间内如果有其他文件也发生了变化，它会把这些变化的文件列表一起去构建。

##### webpack-dev-server

基于 express 启动了一个小型服务。

WDS 会自动刷新浏览器。

WDS 输出的文件不放入磁盘里面，没有磁盘的 IO 操作，它输出的文件是放在内存里面，而不像watch这种方式是放在本地的磁盘文件里面。所以它的构建速度会有更大的优势。

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

##### webpack-dev-middleware

自己写本地服务的情况。

WDM 将 webpack 输出的⽂件传输给服务器。

适⽤于灵活的定制场景，可以对 webpack 的配置控制的更多。

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

##### 热更新

借助 webpack-dev-server，每次代码修改，自动构建，通过热更新的方式让浏览器的内容自动的变化。

启动 HMR 后，css 抽离会不⽣效，还有不⽀持 contenthash，chunkhash。

```js
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
}
```

热更新原理：

<img src="热更新原理.png" alt="热更新原理" style="zoom: 50%;" />

##### 文件指纹策略

常见的文件指纹有哪几种：

* hash：每次打包后整个项目的 hash 值，每构建一次就会有一个新的 hash 值。
* chunkhash：和 webpack 打包的 chunk 有关，不同的 entry 会⽣成不同的 chunkhash 值，根据不同入口 entry 进行依赖解析，构建对应的 chunk，生成相应的 hash，只要组成 entry 的模块没有内容改动，则对应的 hash 不变， 对于 js 文件的指纹，一般采用 chunkhash。
* contenthash：根据⽂件内容来定义 hash ，⽂件内容不变，则 contenthash 不变。 一个页面既有 js 资源也有 css 资源，如果 css 资源也使用 chunkhash 的话，会有一个问题，就是我们修改了 js，但是 css 并没有变，由于 css 也使用了 chunkhash，就会导致 css 内容没有变，但是发布上去的文件指纹发生了变化。因此对于 css ，通常根据内容进行文件指纹的生成，采用 contenthash。

JS 的⽂件指纹设置：

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

CSS 的⽂件指纹设置和 css 文件抽离：

使用 style-loader 和 css-loader 的话，那么这个 css 会由这个 style-loader 将这个 css 插入到 style 里面并且放到 head 头部。这时并没有独立的一个 css 文件，因此我们通常会采用插件把 css 提取成一个独立的文件。

css/sass/less 等 css 相关文件经过对应的 loader 处理之后，最终处理必须为 style-loader 将 css 样式放到 style 标签中或者使用文件提取的插件将 css 单独提取成独立 css 文件。两者必须存在一个，这样样式才能有效。两者同时存在时，style-loader 在前，生成独立 css 文件，style-loader 失效；提取文件的插件 loader 在前，编译过不了。

css 文件指纹也只需设置在生产环境。

webpack4：

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

webpack3：

使用 extract-text-webpack-plugin 把非 js 的代码，单独打包成一个静态资源文件。比如把css文件拎出来打包成一个单独的文件。

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

图片或字体的文件指纹设置：

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

##### html-webpack-plugin

html-webpack-plugin 默认支持 ejs 模版语法。

开发环境中的作用：

启动了 webpack-dev-server 后，它会在项目根目录中生成一个隐形的 index.html，如果 output 中配置了 publicPath，会生成在项目跟目录的 publicPath 中。webpack-dev-server 会自动在根目录下寻找这个 index.html，但是根目录里根本没有 index.html。所以访问页面出现的是项目目录结构，在 webpack-dev-server 中配置 historyApiFallback 就可以直接访问到 index.html。

生产环境打包中的作用：

生产环境打包，会生成一个 index.html 来包含我们打包好的 js 和 css 文件。

##### 自动清理构建目录

每次构建的时候不会清理⽬录，造成构建的输出⽬录 output ⽂件越来越多

通过 npm scripts 清理构建⽬录：

rm -rf ./dist && webpack

rimraf ./dist && webpack

⾃动清理构建⽬录：

使⽤ clean-webpack-plugin。它会默认删除 output 指定的输出⽬录。

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```

##### PostCSS 插件 autoprefixer

autoprefixer 插件通常是和 postcss-loader 一起使用。postcss-loader 的功能是比较强大的，除了做 css 样式补全之外，它还可以做支持 css module，style lint 等。

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
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  overrideBrowserslist: ["last 2 version", ">1%", "IOS 7"] // 指定autoprefixer所需要兼容的浏览器的版本
                })
              ]
            }
          }
        ]
      }
    ]
  }
}
```

##### 移动端 CSS px ⾃动转换成 rem

使用手淘比较成熟的方案 [lib-flexible ](https://github.com/amfe/lib-flexible) 库计算实际的设备分辨率根元素的 font-size 大小。

页面打开的时候就需要马上的计算这个值，所以它的位置需要前置放在前面的位置。

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

##### 静态资源内联

资源内联的意义：

代码层面：

* ⻚⾯框架的初始化脚本：如上节中 rem 计算的 js 库，要在打开页面的时候就要去计算。

* 上报相关打点：page start，css 初始化，css 加载完成，js 初始化和 js 加载完成等代码，这些都是需要内联到 html 里面去，而不能直接放到最终打包的 js 脚本中去。

* css 内联避免⻚⾯闪动

请求层⾯：

* 减少 HTTP ⽹络请求数

⼩图⽚或者字体内联使用 url-loader：

html 和 js 的内联：

raw-loader 的功能是读取一个文件，把这个文件的内容返回成一个 string，把这个 string 插入到对应的位置。

raw-loader 内联 html

```html
 <%= require('raw-loader!./meta.html') %>
```

raw-loader 内联 js

```html
<script>
  <%= require('raw-loader!babel-loader!../../node_modules/lib-flexible/flexible.js') %></script>
```

css 内联：

方案一：借助 style-loader

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

方案二：html-inline-css-webpack-plugin

它针对打包好的 css chunk 的代码，把它内联到 html 的 head 中。

```js
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

module.exports = {
  plugins: [
    new HTMLInlineCSSWebpackPlugin(),
  ]
}
```

##### 多页面应用打包通用方案

多页面优势

​	1.每个页面之间是解偶的

​	2.对 seo 更友好

多页面打包基本思路：

每个页面对应一个 entry，一个 html-webpack-plugin。

缺点：每次新增或删除页面需要手动修改 webpack 配置构建脚本。

多⻚⾯打包通⽤⽅案：

动态获取 entry 和设置 html-webpack-plugin 数量。

通过程序的思维动态获取某个目录下面指定的入口文件，需要有一个约定，把所有的页面都放在 src 的目录下面，每个页面的入口文件都约定为 index.js，这样我们就可以通过 js 脚本去获取src里面所有的目录，就可以知道入口文件的数量，打包的时候动态的设置 html-webpack-plugin。相比于自己写这个脚本，webpack 里面有一个更通用的做法是通过 glob 这个库，glob 的原理类似 linux 操作系统下面文件通配匹配的概念，根据匹配信息返回匹配到的目录内容，我们根据这个目录内容进行操作就可以了。

```js
const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  Object.keys(entryFiles)
    .map(index => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
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
    }));
  });
  return {
    entry,
    htmlWebpackPlugins
  }
}
const {entry, htmlWebpackPlugins} = setMPA()
```

##### webpack 打包组件和基础库

实现⼀个⼤整数加法库的打包：

需要打包压缩版和⾮压缩版本。

⽀持 AMD/CJS/ESM 模块引⼊，也支持script标签方式引入。

库的目录结构：

dist
    large-number.js
    large-number.min.js
webpack.config.js
package.json
index.js
src
    index.js

支持ES module：

```js
import * as largeNumber from 'large-number'
largeNumber.add('999', '1')
```

支持CJS：

```js
const largeNumber = require('large-number')
largeNumber.add('999', '1')
```

支持AMD：

```js
require(['large-number'], function(large-number) {
  largeNumber.add('999', '1')
})
```

直接通过script引入，脚本发布到cdn上去：

```html
<script src="https://unpkg.com/large-numer"></script>
<script>
  largeNumber.add('999', '1')
</script>
```

如何将库暴露出去：

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

如何只对 .min 压缩：

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

设置⼊⼝⽂件：

package.json 的 main 字段为 index.js

index.js

```js
if (process.env.NODE_ENV === "production") {
	module.exports = require("./dist/large-number.min.js");
} else {
	module.exports = require("./dist/large-number.js");
}
```

发布到npm上面去：

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

##### source map

源代码与打包后的代码的映射关系，通过 source map 定位到源代码，方便我们调试代码，内部借助了 sourcemap-loader 来实现的。

在 webpack.dev.js devtool 中设置。

开发环境默认开启，线上环境关闭

* 如果线上不关闭，会把我们的业务逻辑暴露出来，线上排查问题的时候可以将 sourcemap 上传到错误监控系统。

配置推荐：

```js
devtool: "cheap-module-eval-source-map", // 开发环境
devtool: "cheap-module-source-map", // 生产环境
```

source map 关键字：

eval: 使⽤ eval 包裹模块代码

source map: 产⽣ .map ⽂件

cheap: 不包含列信息，只包含行信息

inline: 将 .map 作为 DataURI 嵌⼊，不单独⽣成 .map ⽂件

module:包含 loader 的 sourcemap

source map类型：

可以根据前面的关键字排列组合得到。

##### ESLint

方案一：与CI/CD系统集成

把代码检查放在 CI/CD 的 pipeline build 里面去。

安装 husky：

它自动会在本地项目的 .git 目录下面去生成一个 hook，它会读取 package.json 里的一些内容，比如说我们的precommit。

注意：安装 husky 之前项目要 git init 初始化好，如果连 git 目录都没有，它安装的过程中生成的 git hook 就没法放进去。

```bash
npm i husky -D
```

本地开发阶段增加 precommit 钩⼦：

git 进行代码提交的时候，可以使用 precommit 的 git 钩子。在调用 git commit 的时候，触发 precommit 钩子，先运行 precommit 命令，"precommit": "npm run lint-fix"，自动帮我们去检测代码，如果代码不通过 eslint。没有办法提交代码。

增加 npm script，通过 lint-staged 增量检查修改的⽂件：

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

方案二：与webpack等构建工具集成

webpack 构建的时候，遇见 eslint 的语法问题，直接中断构建，语法修改正确后才能构建成功。 

比较适合新的，一开始就使用 eslint 的项目。不适合老的项目去接入，因为这种方案，webpack 构建的时候它会默认把所有的文件都会进行检查。

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

配置文件 .eslintrc

```json
{
  "extends": "standard",    // 使用哪个eslint规范。
  "plugins": ["html"],      // eslint检查.vue文件不报错。
  "parser": "babel-eslint"  // 代码都是要经过babel去处理过的，会有一些语法对eslint不是特别支持，可能就会出现一些问题，所以一般使用webpack和babel开发的项目都会指定它的parser是babel-eslint。 
}
```

使⽤ eslint-loader，构建时检查 JS 规范。

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

使用 package.json scripts 手动检查代码规范

```json
{
	"scripts": {
    "lint": "eslint --ext .js --ext .jsx --ext .vue src/", // 检查代码是否符合规则
    "lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue src/" // 修复代码
  }
}
```

##### 优化构建时命令行的显示日志

构建的过程，命令行里面会有一大堆的信息打印出来，很多不需要开发者关注，开发者更加关注的是，构建是否成功，构建报错的信息，构建 warning 的信息。对于构建成功的详细的信息，比如 loader 里输出的日志，插件的处理日志等并不是太需要关注的。

统计信息stats：

统计信息，可以分析构建速度或构建体积，也可以分析一些其他的数据出来。

![stats统计信息](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/stats统计信息.png)

命令行更加明显的提示信息：

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

使⽤效果：

success：构建成功的日志提示

warning：构建警告的日志提示

error：构建报错的日志提示

##### 构建异常和中断处理

在 webpack 里面怎么做错误的捕获和异常的处理。

如何判断构建是否成功：

构建完之后，接下来要部署或一些其他的操作，像 CI/CD 的系统或者发布系统它怎么知道这次构建是否成功呢。

每次构建完之后输入一个 echo $? 获取错误码。如果错误码不为 0 的话，说明这次构建是失败的。也可以获取到error 的信息。

构建异常和中断处理：

webpack4 之前的版本构建失败不会抛出错误码 (error code)。

webpack4 给我们抛出了错误码，但是我们想针对异常的情况需要加额外的处理怎么做呢？

通过 node.js 中的 process.exit 规范去把错误码抛出来。这个规范也是尊从命令行里面的 error

* 0 表示成功完成，回调函数中，err 为 null

* 非 0 表示执行失败，回调函数中，err 不为 null，err.code 就是传给 exit 的数字

如何主动捕获并处理构建错误：

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

## 打包优化

##### 速度分析：使用 speed-measure-webpack-plugin

更好的分析 webpack 构建的速度，怎么找出构建速度问题所在。

可以看到每个 loader 和插件执行耗时，重点的关注耗时较长的 loader 或插件，针对这些做优化。

```js
const SpeedMeatureWebpackPlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeatureWebpackPlugin()

const webpackConfig = smp.wrap({
  plugins: [
    new MyPlugin(),
    new MyOtherPlugin()
  ]
})
```

##### 体积分析：使用 webpack-bundle-analyzer

它可以把我们的项目打包出来的文件会进行一个分析，能很方便的看出体积的大小。面积越大体积越大，我们可以重点关注这些进行优化。

可以分析依赖的第三方模块文件大小。业务的组件代码图片大小，针对大的js可以做js的按需加载等优化操作。

构建完成后会在 8888 端口展示体积大小。

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  
 module.exports = {
   plugins: [
     new BundleAnalyzerPlugin()
   ]
 }
```

##### 使用高版本的 webpack 和 Node.js

##### 缩小构建目标

loader 是一个消耗性能的大户，官方不建议我们使用过多的 loader。

所以缩小构建范围主要是优化 loader 配置，缩小 loader 的查找范围。

test include exclude 三个配置项来缩⼩ loader 的处理范围，推荐 include。

目的：尽可能的少构建模块。

比如 babel-loader 不解析 node_modules。

```js
module.exports = {
	module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: 'node_modules'
      }
    ]
  }
}
```

##### 减少文件搜索范围

优化 resolve.modules 配置（减少模块搜索层级）：

resolve.modules 是模块解析的过程，webpack 解析时，模块的查找过程和 nodejs 的模块查找是比较类似的，会从当前的项目找，没找到会去找 node_modules。会依次去子目录找模块是否存在。

优化 resolve.mainFields 配置：

找入口文件的时候，会根据 package.json 里的 main 字段查找，因为发布到 npm 的组件的 package.json 会遵守一定的规范，都会有 main 这个字段，可以设置查找的时候直接读取 main 这个字段，这样也会减少一些不必要的分析过程。比如 package.json 里面没有这个 main ，那它再去读取根项目下的 index.js，没有再去找 lib 下面的 index.js，这就是它默认的查找过程，我们把这个默认的查找过程链路做一个优化，只找 package.json 中 main 字段指定的入口文件。

优化 resolve.extensions 配置：

模块路径的查找，比如 import 一个文件，没有写后缀，webpack 会先去找 .js，没有会找 .json，默认情况下webpack 只支持 js 和 json 的读取。extensions 数组里可以再设置其他的文件，如 .jsx .vue .ts 等。不过这个数组里面的内容越多的话，查找消耗的时间也会越多，因此我们可以缩小 extensions 查找的范围，比如只设置查找 .js，其他文件需要写的时候写全文件后缀。避免 webpack 做不必要的查找。

合理使用 alias：

别名，简短的缩写。比如模块的路径，我们找 react，它可能找了一圈，最后肯定是会找到 node_modules 里面去，它会经历一系列的查找过程，我们可以把这一系列的过程直接给它写好，告诉它比如你遇到了 react，就直接从指定的这个路径去找。这个也大大的缩短了查找的时间。

```js
module.exports = {
    // 子模块的查找策略
    resolve: {
      alias: {
        'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
      },
      modules: [path.resolve(__dirname, 'node_modules')],
      extensions: ['.js'],
      mainFields: ['main']
    }
  }
```

##### 多进程/多实例构建

方法一：使用 HappyPack 解析资源

原理：每次 webapck 解析一个模块，HappyPack 会将它及它的依赖分配给 worker 线程中。

每次 webpack 解析一个模块，webpack 自身开启一个进程去解析这个模块。HappyPack 会将这个模块进行划分，比如有多个模块，在 webpack compiler run 方法之后，到达 HappyPack，它会做一些初始化，创建一个线程池，线程池会将构建任务里的模块进行分配 ，比如将某个模块以及它的依赖分配给 HappyPack 其中的一个线程，以此类推，那么一个 HappyPack 的线程池可能会包括多个线程，这些线程会各自的处理这些模块以及它的依赖。处理完成之后，会有一个通信的过程，将处理好的资源传输给 HappyPack 的主进程，完成整个构建的过程。

![HappyPack工作流程](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/HappyPack工作流程.png)

```js
module.exports = {
	module: {
		rules: [
			{
        test: /\.js$/,
        include: path.resolve('src'),
        use: [
          // 'babel-loader', 
          'happypack/loader' 
        ]
      }
		]
	},
	plugins: [
    new HappyPack({
      id: 'jsx',
      threads: 4,
      loaders: ['babel-loader?cacheDirectory=true']
    }),
    new HappyPack({
      id: 'styles',
      threads: 2,
      loaders: ['style-loader', 'css-loader', 'less-loader']
    })
  ]
}
```

方法二：使用 thread-loader 解析资源

webpack4 原生提供 thread-loader 这个模块，它可以很好的替换 HappyPack，来做多进程/多实例的工作。

原理：跟 HappyPack 是差不多的。每次 webpack 解析一个模块，thread-loader 会将它及它的依赖分配给worker 线程中。

在其他的loader之前放上thread-loader，做一系列的解析，最后会通过thread-loader进行处理。

```js
module.exports = {
	module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3
            }
          },
          'babel-loader'
        ]
      }
    ]
  }
}
```

##### 多进程/多实例并行压缩代码

方法一：使用 webpack-parallel-uglify-plugin 插件

```js
const ParallelUglifyPluging = require('webpack-parallel-uglify-plugin')

module.exports = {
	plugins: [
    new ParallelUglifyPluging({
      uglifyJS: {
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warning: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    })
  ]
}
```

方法二：uglifyjs-webpack-plugin 开启 parallel 参数

webpack3 推荐采用的插件，不支持 es6 代码的压缩。

```js
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	plugins: [
    new UglifyjsWebpackPlugin({
      uglifyOptions: {
        warnings: false,
        parse: {},
        compress: {},
        mangle: true,
        output: null,
        tiplevel: false,
        nameCache: null,
        ie8: false,
        keep_fnames: false
      },
      parallel: true
    })
  ]
}
```

方法三：terser-webpack-plugin 开启 parallel 参数

webpack4 默认使用的，支持es6代码的压缩。

```js
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ]
  }
}
```

##### 充分利用缓存提升二次构建速度

缓存目的：提升二次构建速度。

缓存思路：

* babel-loader 开启缓存

* terser-webpack-plugin 开启缓存

  ```js
  const TerserPlugin = require('terser-webpack-plugin')
  
  module.exports = {
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true
        })
      ]
    }
  }
  ```

* 使用 cache-loader 或者 hard-source-webpack-plugin

  针对模块的缓存的开启

  ```js
  const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
  
  module.exports = {
    plugins: [
      new HardSourceWebpackPlugin()
    ]
  }
  ```

有缓存的话node_modules下面会有一个cache目录。

##### 代码压缩

js 文件的压缩：

webpack4 里，内置了uglifyjs-webpack-plugin 插件，所以默认打包出来的 js 文件就已经压缩过了。不需要再做其他的操作。当然也可以手动的安装这个插件，给它设置一些额外的参数，比如默认开启它的并行压缩。

css ⽂件的压缩：

webpack3 的时候我们可以通过 css-loader 去设置一个 minify 参数来压缩 css，但是 css-loader 在 1.0 的版本之后去掉了这个参数，所以现在是没办法直接通过 css-loader 设置参数的方式做 css 的压缩。

现在需要使用 optimize-css-assets-webpack-plugin 插件，同时使用 css 的预处理器 cssnano，匹配到所有的 css文件，再用这个 css 处理器进行 css 的压缩。

```js
const OptimizeCssAssetsWebpackgin = require('optimize-css-assets-webpack-plugin')

module.exports = {
	plugins: [
    new OptimizeCssAssetsWebpackgin({
      assectNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano') // 它是postcss的依赖，不用单独安装
    })
  ]
}
```

html ⽂件的压缩：

修改 html-webpack-plugin，设置压缩参数 minify。

```js
const path = require('path')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'), // HtmlWebpackPlugin它的html模版所在的位置
      filename: 'index.html', // 指定打包出来的html的文件名称
      chunks: ['index'], // 指定生成的这个html它要使用哪些chunk
      inject: true, // 打包出来的chunk的js css会自动的注入到html中来。
      minify: {
        html5: true,
        collapseWhitespace: true,
        perserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    })
  ]
}
```

##### 图片压缩

图片资源相对是较大的，我们可以通过在线工具手动进行图片的批量压缩。构建工具一部分的职责就是将平时我们手动完成的事做成自动化。

图片压缩：

要求：基于 Node 库的 imagemin 或者 tinypng API。

使用：配置 image-webpack-loader。

```js
module.exports = {
	module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // bypassOnDebug: true, // webpack@1.x
              // disable: true, // webpack@2.x and newer
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  }
}
```

Imagemin 的优点分析

* 有很多定制选项 

* 可以引入更多第三方优化插件，例如pngquant 

* 可以处理多种图片格式

Imagemin 的压缩原理

* pngquant: 是一款 PNG 压缩器，通过将图像转换为具有 alpha 通道（通常比 24/32 位 PNG 文件小 60-80％）的更高效的 8 位 PNG 格式，可显著减小文件大小。 

* pngcrush: 其主要目的是通过尝试不同的压缩级别和 PNG 过滤方法来降低 PNG IDAT 数据流的大小。 

* optipng: 其设计灵感来自于 pngcrush。optipng 可将图像文件重新压缩为更小尺寸，而不会丢失任何信息。 

* tinypng: 也是将 24 位 png 文件转化为更小有索引的 8 位图片，同时所有非必要的 metadata 也会被剥离掉。

##### 使用 cdn 静态资源

使⽤静态资源路径 publicPath（CDN）

```js
module.exports = {
  output:{
    publicPath: '//cdnURL.com' // 给输出的bundle文件补上url前缀
  }
}
```

使⽤ externals 优化 cdn 静态资源：

静态资源部署到 cdn 了，我的 bundle ⽂件⾥，就不⽤打包进去这个依赖了。

我们希望在使⽤时，仍然可以通过 import 的⽅式去引⽤(如 import $ from 'jquery' )，并且希望 webpack 不会对其进⾏打包，此时就可以配置 externals。

只要 html 模版中引入了库的资源，在本地开发时不 import 也可以直接使用 lodash 库暴露的全局变量，但是为了代码规范，比如让 eslint 可以通过，需要 import，所以也就需要配置 externals。

```js
import _ from 'lodash'
```

```js
module.exports = {
  externals: {
    'lodash': '_' // _是lodash库暴露的全局变量
  }
}
```

使用 html-webpack-externals-plugin 分离基础包：

思路：将 react react-dom vue 基包包通过 cdn 引入，不打入 bundle 中。

```js
module.exports = {
  plugins: [
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://cdn.bootcdn.net/ajax/libs/react/15.6.0/react.min.js', // 本地或cdn文件
          global: 'React'
        },
        {
          module: 'react-dom',
          entry: 'https://cdn.bootcdn.net/ajax/libs/react/15.6.0/react-dom.min.js',
          global: 'ReactDOM'
        }
      ]
    })
  ]
}
```

然后手动在 html 中将 react 和 react-dom 脚本引入进来。

#####  Code Splitting

提取页面公共资源。

SplitChunksPlugin：webpack4 内置的，替代 CommonsChunkPlugin 插件。

```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'async', // async：只异步引入的库进行分离（默认），initial：只同步引入的库进行分离，all：所有引入的库进行分析（推荐）
      minSize: 30000, // 抽离的公共包最小的大小，单位是字节
      maxSize: 0,			// 抽离的公共包最大的大小，单位是字节，对模块进⾏⼆次分割时使⽤，不推荐使⽤
      minChunks: 1,   // 使用的次数超过这个就提取成公共的文件
      maxAsyncRequests: 5,
      maxInitialRequests: 3, // 同时请求的异步资源的次数
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
```

分离基础包：

test：匹配出需要分离的包。

把 react 和 react-dom 提取出来，名字为 vendors。

```js
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  }
}
```

使用时需要把 vendors 添加到 HtmlWebpackPlugin 的 chunks 里面。

```js
new HtmlWebpackPlugin({
  template: path.join(__dirname, `./src/${pageName}/index.html`),
  filename: `${pageName}.html`,
  chunks: ['vendors', pageName],
  inject: true,
  minify: {
    html5: true,
    collapseWhitespace: true,
    perserveLineBreaks: false,
    minifyCSS: true,
    minifyJS: true,
    removeComments: false
  }
})
```

分离页面公共文件：

```js
module.exports = {
	optimization: {
    splitChunks: {
      minSize: 0,  // 分离的包体积的最小限制
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2  // 设置最⼩引⽤次数为2次
        }
      }
    }
  }
}
```

使用时需要把 commons 添加到 HtmlWebpackPlugin 的 chunks 里面。

```js
new HtmlWebpackPlugin({
  template: path.join(__dirname, `./src/${pageName}/index.html`),
  filename: `${pageName}.html`,
  chunks: ['vendors', 'commons', pageName],
  inject: true,
  minify: {
    html5: true,
    collapseWhitespace: true,
    perserveLineBreaks: false,
    minifyCSS: true,
    minifyJS: true,
    removeComments: false
  }
})
```

CommonsChunkPlugin：

webpack3 使用。

分离基础包：

```js
module.exports = {
	entry: {
    app: path(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    },
  	// 分离 webpack 相关的代码
  	new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime' // name指定一个在entry里面没有声明过的任何一个名字，一般会声明为runtime
    })
  ]
}
```

##### 进一步分包：预编译资源模块

externals cdn 的缺点：一个基础库需要指定一个 cdn，实际的项目中有很多包，需要引入的script标签太多。

SplitChunksPlugin 的缺点：它每次还是会对基础包进行分析。

分包来说，更好的方式就是 Dll 动态链接库。

Dll 动态链接库 其实就是做缓存，只会提升 webpack 打包的速度，并不能减少最后生成的代码体积。

.dll ⽂件称为动态链接库，在windows系统会经常看到。

每一次构建都会对 react react-dom 进行处理的步骤。

项⽬中引⼊了很多第三⽅库，这些库在很⻓的⼀段时间内，基本不会更新，打包的时候分开打包来提升打包速度，⽽DllPlugin 动态链接库插件，其原理就是把⽹⻚依赖的基础模块抽离出来打包到 dll ⽂件中，当需要导⼊的模块存在于某个 dll 中时，这个模块不再被打包，⽽是去 dll 中获取。

webpack 已经内置了对动态链接库的⽀持

* 动态链接库只需要被编译⼀次，项⽬中⽤到的第三⽅模块，很稳定，例如 react,react-dom，只要没有升级的需求。
* DllPlugin：⽤于打包出⼀个个单独的动态链接库⽂件。
* DllReferencePlugin：⽤于在主要的配置⽂件中引⼊ DllPlugin 插件打包好的动态链接库⽂件。

思路：将 react、react-dom、redux、react-redux 基础包和业务基础包打包成一个文件。

方法：使用 DLLPlugin 进行分包，DllReferencePlugin 对 manifest.json 引用。manifest.json 是对分离出来的包的描述。在模版中手动引入分离出的基础包文件。

使用 DLLPlugin 进行分包：

创建一个单独的构建配置文件，一般命名为 webpack.ddl.js。

```js
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    library: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: path.join(__dirname, 'build/library'),
    filename: '[name].[chunkhash].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name].[hash]',
      path: path.join(__dirname, 'build/library/[name].json'),
    })
  ]
}
```

使用 DLLReferencePlugin 引用 manifest.json：

在 webpack.config.js 中引入 DLLReferencePlugin。

```js
module.exports = {
  plugins: [
    new webpack.DLLReferencePlugin({
      manifest: require('./build/library/manifest.json')
    })
  ]
}
```

⻚⾯依赖的所有动态链接库都需要被加载到 html 模版：

```html
<!DOCTYPE html>
<html lang="en"> 
  <head> 
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initialscale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>webpack</title> 
    <link href="css/main_e2bf39.css" rel="stylesheet">
  </head> 
  <body> 
    <div id="app"></div> 
    
    <script type="text/javascript" src="react.dll.js"></script> 
    <script type="text/javascript" src="js/main_142e6c.js"></script>
  </body>
</html>
```

⼿动添加使⽤，体验不好，这⾥推荐使⽤add-asset-html-webpack-plugin插件帮助我们做这个事情。

它会将我们打包后的 dll.js ⽂件注⼊到我们⽣成的 index.html 中。

```js
module.exports = {
	plugins: [	
		new AddAssetHtmlWebpackPlugin({
    	filepath: path.resolve(__dirname, '../dll/react.dll.js') // 对应的dll⽂件路径
    })
	]
}
```

##### 代码分割和动态 import

代码分割的意义：

对于大的 web 应用而言，将所有的代码都放在一个文件中显然是不够有效的，特别是你的代码在一些情况下才会用到，首屏加载不会用到的。这时候我们针对首屏会打出一个 js 文件，对于其他的页面或 tab 切换的场景可以通过按需加载，也就是js懒加载的形式，它和懒加载图片是一样的道理，我们用到了这个脚本再加载它。这就是webpack 里面提供的一个懒加载的功能，webpack 将你的代码库分割成 chunks（语块），当代码运行到需要它们的时候再进行加载。

懒加载 JS 脚本的⽅式：

CommonJS：require.ensure

ES6：动态 import（⽬前还没有原⽣⽀持，需要 babel 转换）

如何使⽤动态 import：

import xxx from 'xxx' 是静态的，动态的是我们使用到的时候再 import，动态的 import 功能和 require 比较像，可以通过逻辑按需加载，而不是要一开始就把这个模块加载进来。

安装 babel 插件

```bash
npm install @babel/plugin-syntax-dynamic-import -D
```

.babelrc

```json
{
  "plugins": [
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```

webpack3 正式环境配置中需要加一个插件

```js
plugins: [
	new webpack.NamedChunksPlugin()
]
```

然后就可以在我们的代码中使用动态的import语法了。

```js
import('./text.js') // 返回的是promise对象
  .then(Text => {
    // Text就是import的这个文件export出去的内容
    console.log(Text)
  })
```

代码分割的效果：

使用了动态import的文件会分割出去一个js文件，当你代码用到的时候再异步的请求加载这个js文件。

原理：

webpack 使用 jsonp 的形式动态的添加一个 \<script\> 脚本进来。

##### Tree Shaking 的使用和原理

Tree Shaking（摇树优化）：

概念：1 个模块可能有多个⽅法，只要其中的某个⽅法使⽤到了，则整个⽂件都会被打到 bundle ⾥⾯去，tree shaking 就是只把⽤到的⽅法打⼊ bundle ，没⽤到的⽅法会在 uglify 阶段被擦除掉。是针对 css, js 的。

DCE (Dead code elimination)：

代码不会被执行，不可到达

代码执行的结果不会被用到

代码只会影响死变量（只写不读）

Tree-shaking 原理：

Tree Shaking 利用 DCE 的特点来分析哪些代码是需要被删除掉的。

代码擦除：Tree Shaking 将没有用到的代码加一些注释来标记，在 uglify 阶段删除无用代码。

CSS Tree Shaking：

PurifyCSS: 遍历代码，识别已经用到的 CSS 选择器，从CSS中删除未使用的选择器。

uncss: HTML 需要通过 jsdom 加载，所有的样式通过 PostCSS 解析，通过 document.querySelector 来识别在 html 文件里面不存在的选择器。

CSS Tree Shaking 的插件不能独立使用，如果没有任何 css 文件作为资产发出，则此插件将无效。需要提取 css 为一个文件后才能使用。在 webpack4 里需要和 mini-css-extract-plugin 配合使用，在 webpack3 里需要和 extract-text-webpack-plugin 配合使用。

方案一：

This package has been deprecated.

Author message: Use purgecss-webpack-plugin instead.

```bash
npm i glob-all purify-css purifycss-webpack -D
```

```js
const path = require('path')
const glob = require('glob-all')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      }
    ]
  },
  plugins:[
    new ExtractTextPlugin('[name].[contenthash].css'),
    new PurifyCSSPlugin({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径⽂件
        path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对html⽂件进⾏ tree shaking
        path.resolve(__dirname, './src/*.js')
      ])
    })
  ]
}
```

方案二：

如果需要多个路径，使用 npm 软件包 glob-all 代替 glob。

```bash
npm i glob purgecss-webpack-plugin -D
```

```js
const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true })
    })
  ]
}
```

JS Tree Shaking：

JS tree shaking 只支持 ES6 的语法，CJS 的⽅式不⽀持。

production mode 的情况下默认开启摇树优化，不需要配置，但是如果你使用 babel-preset-env，它会将你的 ES6 编译到可兼容性更好的 CommonJS，所以需要在 .babelrc ⾥设置 modules: false 让其保持 ES6 不动，不要翻译。这个处理不会有兼容问题，因为webpack最终会将代码转换到兼容的版本。

```json
{
  "presets": [
    "@babel/preset-env",
    {
      "modules": false
    }
  ]
}
```

开发环境为了我们调试，摇树的效果是没有的，只能从注释上面判断有没有生效。可以通过下面配置看到开发环境中摇树的注视变化效果。

```js
module.exports = {
	optimization: {
  	usedExports: true // 哪些导出的模块被使⽤了，再做打包
  }
}
```

JS 摇树副作用：

摇树副作用的意思是将我们符合 dead code，但是有用的代码也给摇掉了。

package.json 里面设置 sideEffects 来告诉 webpack 这里面的文件不要使用摇树。

```json
{
  "sideEffects": false, // 正常对所有模块进⾏tree shaking , 仅⽣产模式有效，需要配合usedExports
	"sideEffects": [      // 在数组⾥⾯排除不需要tree shaking的模块
    "*.less",
    "@babel/polyfill",
    "*.vue" // 如果是vue项目
  ]
}
```

在 js 中引入自定义的模块和第三方库的情况：

* 当引入自定义的模块或第三方库，但没有使用其中的方法时，development 会将没有使用到的一起打包，生产环境下webpack 会将其没有使用到的方法剔除掉。
* 在自定义的方法中使用了第三方库的方法，但没有调用该自定义方法时，在生产环境下第三方库的内容也会被打包。
* 在自定义的方法中使用自定义模块的方法，但没有调用该自定义方法时，在生产环境下该自定义模块的相关内容不会被打包。

示例：

```js
// demo.js
import lodash from 'lodash-es'
 
function sum (a, b){
    return a + b;
}
function min(a, b){
    return a - b;
}
function isArray(arg){
    return lodash.isArray(arg);
}
 
export {
    sum,
    min,
    isArray
}
 
```

```js
// index.js
import {sum} from './demo'
 
console.log('lemon', sum(5, 5)))
```

解决方法：webpack-deep-scope-plugin，深层作用域分析，提高 tree shaking。

```js
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
 
module.exports = {
  mode: 'production',
  plugins: [
    new WebpackDeepScopeAnalysisPlugin()
  ]
}
```

未使用webpack-deep-scope-plugin

![未使用webpack-deep-scope-plugin](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/未使用webpack-deep-scope-plugin.png)

使用webpack-deep-scope-plugin

![使用webpack-deep-scope-plugin](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/使用webpack-deep-scope-plugin.png)

按需导入：

我们导入模块的写法最好只导入我们需要使用的函数，不要整体导入或 as * 的方式。

```js
import { simpleSort } from "../../utils/utils"
```

第三方库：

在大多数情况下，上面的方法就足够了。但是，总有例外的情况。比如，Lodash 就不行。因为 Lodash 使用的是CommonJS 而不是 ES6 的写法，所以需要一些额外的工作：a) 安装 lodash-es 来替代lodash；b) 使用稍微不同的语法(叫做 cherry-picking):

```js
// This still pulls in all of lodash even if everything is configured right.
import { sortBy } from "lodash"

// This will only pull in the sortBy routine.
import sortBy from "lodash-es/sortBy"

import { sortBy } from "lodash-es"
```

如果你倾向于使用一致的 import 语法，你可以使用标准的 lodash 包，然后安装 babel-plugin-lodash。

如果有些模块使用 CommonJS 格式(module.exports)，那么 webpack 无法使用 tree shaking。一些插件 webpack-common-shake 为 CommonJS 提供 tree shaking。但是，因为 CommonJS 的模式是无法做 tree shaking 的。如果你想很保险地剔除掉没有使用的依赖，ES6 才是你最佳的选择。

我的 ui 库是不是可以通过`tree-shaking`大幅度缩减代码？并不会。因为大多数库只是导出一个变量，当然有的支持按需引入是可以的，比如 element-ui。

##### Scope Hoisting 的使用和原理

作⽤域提升（Scope Hoisting）是指 webpack 通过 ES6 语法的静态分析，分析出模块之间的依赖关系，尽可能地把模块放到同⼀个函数中。

没有开启 Scope Hoisting 的现象：

构建之后的代码存在大量的闭包代码。对于每一个模块打包出来都会有一个函数的包裹。

会导致的问题：

大量函数的闭包包裹代码，会导致打包出来的 bundle 文件体积增大（模块越多越明显）。

通过函数闭包的形式包裹代码，运行代码时创建的函数作用域变多，内存开销变大。

模块转换分析：

被 webpack 转换后的模块会带上⼀层包裹。

import 会被转换成 __webpack_require，export 也会做相应的转换。

进⼀步分析 webpack 的模块机制：

打包出来的是⼀个 IIFE (匿名闭包)

modules 是⼀个数组，每⼀项是⼀个模块初始化函数

__webpack_require ⽤来加载模块，返回 module.exports

通过 WEBPACK_REQUIRE_METHOD(0) 启动程序

scope hoisting 原理：

原理：将所有模块的代码按照引⽤顺序放在⼀个函数作⽤域⾥，然后适当的重命名⼀些变量以防⽌变量名冲突。

对⽐：通过 scope hoisting 可以减少函数声明代码和内存开销。

scope hoisting 使⽤：

必须是 ES6 语法，CJS 不⽀持。

webpack3 需要手动开启。

```js
module.exports = {
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
```

webpack4 mode 为 production 默认开启。webpack4 mode 为 development 时，可以使用 optimization.concatenateModules 开启 Scope Hoisting。

```js
module.exports = {
  optimization: {
    concatenateModules: true
  }
}
```

##### 使用动态 Polyfill 服务

Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign ）都不会转码。比如 ES6 在 Array 对象上新增了 Array.from 方法。Babel 就不会转码这个方法。如果想让这个方法运行，必须使用 babel-polyfill。  

Polyfill 方案：

![babel-polyfill方案](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/babel-polyfill方案.png)

方法一：@babel/polyfifill

以全局变量的⽅式注⼊进来的。windows.Promise，它会造成全局对象的污染。

```bash
npm install --save @babel/polyfill
```

```js
// index.js 顶部
import "@babel/polyfill"
```

babel-polyfill 打包后体积：88.49k，占比 29.6%。

按需加载，减少冗余：

会发现打包的体积⼤了很多，这是因为 polyfill 默认会把所有特性注⼊进来，假如我想我⽤到的 es6+，才会注⼊，没⽤到的不注⼊，从⽽减少打包的体积，可不可以呢，当然可以。

```json
{
  "presets": [
  	[
    	"@babel/preset-env",
     	{
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1"
        },
        corejs: 2, // 新版本需要指定核⼼库版本
        useBuiltIns: "usage" //按需注⼊
      }
    ]
	]
}
```

useBuiltIns 选项是 babel 7 的新功能，这个选项告诉babel如何配置@babel/polyfill。 它有三个参数可以使⽤： ①entry: 需要在webpack的⼊⼝⽂件⾥import "@babel/polyfill"⼀次。babel会根据你的使⽤情况导⼊垫⽚，没有使⽤的功能不会被导⼊相应的垫⽚。 ②usage: 不需要import，全⾃动检测，但是要安装@babel/polyfill。（试验阶段） ③false: 如果你import "@babel/polyfill"，它不会排除掉没有使⽤的垫⽚，程序体积会庞⼤。(不推荐)

请注意 usage 的⾏为类似 babel-transform-runtime，不会造成全局污染，因此也会不会对类似 Array.prototype.includes() 进⾏polyfifill。

方法二：@babel/plugin-transform-runtime

当我们开发的是组件库，⼯具库这些场景的时候，polyfill 就不适合了，因为 polyfifill 是注⼊到全局变量，window下的，会污染全局环境，所以推荐闭包⽅式：@babel/plugin-transform-runtime，它不会造成全局污染。

```bash
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

```json
{
  "presets": [
		"@babel/preset-env",
 	],
	"plugins": [
  	[
			"@babel/plugin-transform-runtime",
     	{
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
       }
 		]
 	]
}
```

方法三：构建体积优化，动态 polyfill

Polyfill Service 原理：

识别 User Agent，下发不同的 Polyfill。

如何使用动态 Polyfill service：

polyfill.io 官方提供的服务

https://polyfill.io/v3/polyfill.min.js

## 打包原理

##### 打包原理

webpack 打包阶段是有 compile 和 compilation。compile 是 webpack 启动的那一次创建一个 compile 对象，compilation 是只要有文件发生了变化，compilation 对象是会变化的。

源码分析，插件机制，启动流程，编译构建流程，资源输出流程。

1.webpack 启动过程：

```js
process.exitCode = 0 // 默认exitCode是0，代表webpack运行的时候是正常的执行返回。中间报错会修改exitCode，并抛出错误。
const runCommand = (command, args) => {} // 运行某个命令行命令
const isInstalled = packageName => {}; // 判断某个包是否安装
const CLIs = []; // webpack可用的CLI：webpack-cli和webpack-command
const installedClis = CLIs.filter(cli => cli.installed); // 判断两个cli是否安装了
if (installedClis.length === 0) { // 根据cli安装的数量进行处理
} else if (installedClis.length === 1) {
} else {
}
```

启动后的结果：

webpack 最终找到 webpack-cli (或webpack-command) 这个 npm 包，并且执行。

2.webpack-cli：

引入 yargs，对命令行进行定制。

分析命令行参数，对各个参数进行转换，组成编译配置项。

引用 webpack，根据配置项进行编译和构建。

```js
// 从 NON_COMPILATION_CMD 分析出不需要编译的命令
// webpack-cli 处理不需要经过编译的命令，就是不需要实例化webpack的NON_COMPILATION_ARGS
// webpack-cli提供的不需要编译(实例化webpack)的命令
const NON_COMPILATION_ARGS = [
  "init",              // 创建一份webpack配置文件
  "migrate",           // 运行webpack版本迁移
  "add",               // 往webpack配置文件中增加属性
  "remove",            // 往webpack配置文件中删除属性
  "serve",             // 运行webpack-serve
  "generate-loader",   // 生成webpack loader代码
  "generate-plugin",   // 生成webpack plugin代码
  "info"               // 返回与本地环境相关的一些信息
];
```

命令行工具包 yargs 介绍：

提供命令和分组参数

动态生成help帮助信息

webpack-cli 使用 args 分析

参数分组（config/config-args.js），将命令划分为9类：

* Config options: 配置相关参数（文件名称，运行环境等）
* Basic options: 基础参数（entry设置、debug模式设置、watch监听设置、devtool设置）
* Module options: 模块参数，给loader设置扩展
* Output options: 输出设置（输出路径，输出文件名称）
* Advanced options: 高级用法（记录设置、缓存设置、监听频率、bail等）
* Resolving options: 解析参数（alias和解析的文件后缀设置）
* Optimizing options: 优化参数
* Stats options: 统计参数
* options: 通用参数（帮助命令、版本信息等）

options（输入的options）

将命令行或 webpack.config.js 配置文件的配置解析出来组装成为 webpack 可识别的配置到 options 里面。

processOptions(options)

*  outputOptions（输出的options）

* 实例化一个 webpack，然后执行构建流程。

  ```js
  const webpack = require('webpack');
  let compiler = webpack(options);
  new Plugin({
    option: true
  }).apply(compiler);
  compiler.run();
  ```

3.Tapable 插件架构与 Hooks 设计

webpack 可以理解成一种基于事件流的编程范例，一系列的插件运行。内部有各种各样的插件，监听 compiler 和 compilation 上面定义的关键的事件节点。

compiler 和 compilation 都是继承自Tapable。

Tapable 是一个类似于 node.js 的 EventEmitter 的库，主要是提供钩子函数的发布与订阅，控制着 webpack插件系统的实现。

Tapable 库暴露了很多 Hook(钩子) 类，为插件提供挂载的钩子。每个钩子代表一个关键的事件节点，在插件中监听钩子，在不同的阶段做不同的事情。

钩子：两类，同步钩子和异步钩子

```js
const {
  SyncHook,                   // 同步钩子
  SyncBailHook,               // 同步熔断钩子，遇到return直接返回
  SyncWaterfallHook,          // 同步流水钩子，执行结果可以传递给下一个插件
  SyncLoopHook,               // 同步循环钩子
  AsyncParallelHook,          // 异步并发钩子
  AsyncParallelBailHook,      // 异步并发熔断钩子
  AsyncSeriesHook,            // 异步串行钩子 
  AsyncSeriesBailHook,        // 异步串行熔断钩子
  AsyncSeriesWaterfallHook,   // 异步串行流水钩子
} = require("tapable")
```

Tapable hooks 类型：

* Hook                 所有钩子的后缀
* Waterfall          同步方法，它会传值给下一个函数
* Bail                    熔断：当函数有任何返回值，就会在当前执行函数停止
* Loop                  监听函数返回true表示继续循环，返回undefined表示结束循环
* Sync                   同步方法
* AsyncSeries      异步串行钩子
* AsyncParallel    异步并行执行钩子

Tapable 的使用 - new Hook 新建钩子

Tapable 暴露出来的都是类方法，new 一个类方法获得我们需要的钩子。

class 接受数组参数 options，非必传。类方法会根据传参，接受同样数量的参数。

```js
// 创建一个同步的钩子
const hook1 = new SyncHook(['arg1', 'arg2', 'arg3']);
```

Tapable 的使用 - 钩子的绑定与执行

基于 hook 做发布和订阅。

Tapable 提供了同步&异步绑定钩子的方法，并且它们都有绑定事件和执行事件对应的方法。

​                         Async*                           Sync*          

绑定：tapAsync/tapPromise/tap         tap

执行：     callAsync/promise                 call

Tapable的使用 - hook 基本用法示例

```js
const hook1 = new SyncHook(['arg1', 'arg2', 'arg3']);
// 绑定事件到webpack事件流
hook1.tap('hook1', (arg1, arg2, arg3) => {console.log(arg1, arg2, arg3)});
// 执行绑定的事件
hook1.call(1, 2, 3);
```

4.Tapable 是如何和 webpack 进行关联起来的？

compiler 和 compilation 上面做 hooks 的调用。

插件有个 apply 方法，接收一个 compiler 参数。

插件里面做 compiler 和 compilation 的 hooks 的监听。

```js
options = new WebpackOptionsDefaulter().process(options);
compiler = new Compiler(options.context);
compiler.options = options;
new NodeEnvironmentPlugin({
  infrastructureLogging: options.infrastructureLogging
}).apply(compiler);
if (options.plugins && Array.isArray(options.plugins)) {
  for (const plugin of options.plugins) {
    if (typeof plugin === "function") {
      plugin.call(compiler, compiler);
    } else {
      plugin.apply(compiler);
    }
  }
}
compiler.hooks.environment.call();
compiler.hooks.afterEnvironment.call();
compiler.options = new WebpackOptionsApply().process(options, compiler);
```

5.webpack流程篇

webpack 编译按照下面的钩子调用顺序执行。

* entry-option 初始化 option
* run 开始编译
* make 从 entry 开始递归分析依赖，对每个依赖模块进行 build
* before-resolve 对模块位置进行解析
* build-module 开始构建某个模块
  * 通过 loader-runner 解析模块
  * 通过 parser 里的 acron 解析 loader 里的依赖，添加到依赖列表里去，不断的进行构建。
* normal-module-loader 将 loader 加载完成的 module 进行编译，生成 AST。
* program 遍历 AST，当遇到 require 等调用表达式时，收集依赖
* seal 所有依赖 build 完成，开始优化。
* emit 输出到 dist 目录

webpack流程篇：准备阶段

将配置的参数转换成内部的插件。

webpack流程篇：模块打包构建阶段

webpack流程篇：模块优化，代码生成

6.动手编写一个简易的 webpack

bundle 文件：

一个自执行函数

函数体是 webpack 的启动器函数

参数是一个对象，对象的键是模块的路径，值是一个函数，函数的内容是对应模块的转换后的代码，并放到 eval() 中，这些代码是可以直接放到浏览器执行的，但是是有一些缺失的，有一些模块化的语法，所以这个函数传进来了两个参数 module 和 exports 来处理代码中的 import 或 require 这些模块化的代码，module 和 exports 是在上面的自启动函数里定义了。这样就能保证构建出来的代码是可以在浏览器中顺利执行的。

⼤概的意思就是，我们实现了⼀个 **\__webpack_require__** 来实现⾃⼰的模块化，把代码都缓存在 installedModules ⾥，代码⽂件以对象传递进来，key 是路径，value 是包裹的代码字符串，并且代码内部的 require，都被替换成了**\__webpack_require__**。

## 编写 loader

loader 是一个导出为函数的 javascript 模块，且是声明式函数，不能用箭头函数，因为它要用 this 使用 loader 的 API。

接收 source，return source。

##### loader 执行顺序

函数组合的两种情况：

* 类似 unix 中的 pipeline，这个顺序是从左往右。

* Compose（webpack 采取的），这个顺序是从右往左。

  ```js
  compose = (f, g) => (...args) => f(g(...args))
  // 
  compose = (f, g) => {
    return (...args) => {
      return f(g(...args));
    }
  }
  compose(f, g)(source)·
  
  ```

##### 一个最简单的 loader 代码结构

定义：loader 只是一个导出为函数的 JavaScript 模块。意思是我们如果要写一个 loader，其实只需要写一个 JS 模块，然后把这个模块导出来就可以了。

```js
module.exports = function(source) {
	return source
}
```

##### 使用 loader-runner 进行 loader 的调试

```js
import { runLoaders } from "loader-runner"; 
runLoaders({ 
  resource: “/abs/path/to/file.txt?query”, // String: 资源的绝对路径(可以增加查询字符串) 
  loaders: [“/abs/path/to/loader.js?query”], // String[]: loader 的绝对路径(可以增加查询字符串) 		
  context: { minimize: true }, // 基础上下文之外的额外 loader 上下文 
  readResource: fs.readFile.bind(fs) // 读取资源的函数 
}, function(err, result) { 
  // err: Error? 
  // result.result: Buffer | String 
})
```

##### 开发一个 raw-loader

raw-loader 的功能是将一个文件的内容转换成一个 string。

loaders/raw-loader.js:

```js
module.exports = function(source) { 
  const json = JSON.stringify(source)
  	.replace(/\u2028/g, '\\u2028') // 为了安全起见, ES6模板字符串的问题 
    .replace(/\u2029/g, '\\u2029'); 
  
  return `export default ${json}`; 
};
```

src/demo.txt:

```txt
foobar
```

run-loader.js:

```js
const fs = require("fs"); 
const path = require("path"); 
const { runLoaders } = require("loader-runner"); 

runLoaders( 
  { 
    resource: "./demo.txt", 
    loaders: [path.resolve(__dirname, "./loaders/raw-loader")], 
    readResource: fs.readFile.bind(fs), 
	}, 
  (err, result) => (err ? console.error(err) : console.log(result)) 
);
```

运行查看结果：

```bash
node run-loader.js
```

### 更复杂的 loader 开发场景

#### loader 的参数获取

传参是设置 loader 的时候，把要传的参数放到 options 对象里面。

loader 里通过 loader-utils 的 getOptions 方法获取传过来的参数。

raw-loader.js:

```js
const loaderUtils = require("loader-utils");

module.exports = function(source) { 
  const { name } = loaderUtils.getOptions(this);
  // console.log(name)
  
  const json = JSON.stringify(source)
  	.replace(/\u2028/g, '\\u2028') // 为了安全起见, ES6模板字符串的问题 
    .replace(/\u2029/g, '\\u2029'); 
  
  return `export default ${json}`; 
};
```

run-loader.js:

```js
const fs = require("fs"); 
const path = require("path"); 
const { runLoaders } = require("loader-runner"); 

runLoaders( 
  { 
    resource: "./demo.txt", 
    loaders: [
      {
      	loader: path.resolve(__dirname, "./loaders/raw-loader"),
        options: {
					name: 'test'
        }
      }
    ], 
    readResource: fs.readFile.bind(fs), 
	}, 
  (err, result) => (err ? console.error(err) : console.log(result)) 
);
```

#### loader 异常处理

同步的 loader 的异常处理有两种方式。

1.loader 内直接 throw 一个 Error 对象出来。

2.通过 this.callback 把错误传递出来

返回结果除了上面的直接 return 的方式，也可以使用 this.callback 来做结果的返回，它可以返回多个值。

raw-loader.js:

```js
module.exports = function(source) { 
  const json = JSON.stringify(source)
  	.replace(/\u2028/g, '\\u2028') // 为了安全起见, ES6模板字符串的问题 
    .replace(/\u2029/g, '\\u2029'); 
  
  // throw new Error('Error')
  
  // return `export default ${json}`; 
  this.callback(null, json, 2, 3, 4)
};
```

#### loader 的异步处理（开发一个异步的 loader）

同步 loader 对内容的处理是同步的，异步 loader 处理的任务是一个耗时的任务，它可能需要执行一段时间，比如文件的读写，我们要处理内容的时候要先去读取一个文件，获取到文件的值之后，再去对传递进来的 source 进行处理，这就是一个异步的任务。异步任务完成之后再返回结果。

针对异步处理的场景的做法也比较简单，通过 this,async 来返回一个异步函数 ，第一个参数是 Error，第二个参数是处理的结果，它的用法跟 this.callback 是差不多的。

async.txt

```txt
async
```

raw-loader.js:

```js
const path = require('path');
const fs = require('fs')

module.exports = function(source) { 
  const callback = this.async();
  
  const json = JSON.stringify(source)
  	.replace(/\u2028/g, '\\u2028') // 为了安全起见, ES6模板字符串的问题 
    .replace(/\u2029/g, '\\u2029'); 
  	
  fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
    if (err) {
      callback(err, '');
    }
    callback(null, data);
  });
  
};
```

#### 在 loader 中使用缓存 

webpack 中默认开启 loader 缓存，可以使用 this.cacheable(false) 关掉缓存。

缓存生效条件： loader 的结果在相同的输入下有确定的输出。

有依赖的 loader 无法使用缓存。

```js
module.exports = function(source) { 
  this.cacheable(false)
  
  const json = JSON.stringify(source)
  	.replace(/\u2028/g, '\\u2028') // 为了安全起见, ES6模板字符串的问题 
    .replace(/\u2029/g, '\\u2029'); 
  
  return `export default ${json}`; 
};
```

#### loader 如何进行文件输出？

通过 this.emitFile 把内容输出到指定的位置，进行文件写入。

a-loader.js:

```js
const loaderUtils = require("loader-utils");

module.exports = function(source) { 
  const url = loaderUtils.interpolateName(this, "[name].[ext]", { 
    source, 
  });
  console.log(url)
  
  this.emitFile(url, source);
  
  return source; 
};
```

### 实战开发一个自动合成雪碧图的 loader

雪碧图在日常开发中使用的非常广泛，它是我们小图片的请求尽量的减少，平时使用雪碧图可能是从网上找一个在线的工具，将多张图片合成一个雪碧图，我们可以通过构建工具让这个事情更加的自动化，我们可以开发一个雪碧图的 loader。

#### 支持的语法：

background: url('a.png?__sprite')

​                                           						           -----》						background: url('sprite.png')

background: url('b.png?__sprite')

#### 准备知识：如何将两张图片合成一张图片？

使用 spritesmith (https://www.npmjs.com/package/spritesmith) 

验证 spritesmith 功能是不是正常的 test.js:

```js
const path = require('path')
const fs = require('fs')
const Spritesmith = require('spritesmith')

const sprites = ['./loaders/image/1.jpg', './loaders/image/2.jpg']

// 合成图片
Spritesmith.run({src: sprites}, (err, result) => {
  console.log(result.image)
  console.log(result.coordinates)
  console.log(result.properties)
  // 把合成后的图片内容输出到磁盘
  fs.writeFileSync(path.join(__dirname, 'dist/sprite.jpg'), result.image)
})
```

#### 开发 sprite-loader

run-loader.js:

```js
const fs = require("fs"); 
const path = require("path"); 
const { runLoaders } = require("loader-runner"); 

runLoaders( 
  { 
    resource: "./loaders/index.css", 
    loaders: [path.resolve(__dirname, "./loaders/sprite-loader")], 
    readResource: fs.readFile.bind(fs), 
	}, 
  (err, result) => (err ? console.error(err) : null) 
);
```

index.css:

```css
.img1 {
	background: url(./images/1.jpg?__sprite);
}
.img2 {
	background: url(./images/2.jpg?__sprite);
}
```

sprite-loader.js:

```js
const path = require('path')
const fs = require('fs')
const Spritesmith = require('spritesmith')

module.exports = function (source) {
  const callback = this.async()
  const imgs = source.match(/url\((\S*)\?__sprite/g)
  const matchedImgs = []
  
  for (let i = 0; i < imgs.length; i++) {
   	const img = imgs[i].match(/url\((\S*)\?__sprite/)[1]
    matchedImgs.push(path.join(__dirname, img))
  }
  
  Spritesmith.run({
    src: matchedImgs
  }, (err, result) => {
    // 正常开发是使用this.emitFile输出文件，但是loader-runner没有这个方法，所以这里用fs代替
    fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.jpg'), result.image)
    source = source.replace(/url\((\S*)\?__sprite/g, match => {
      return `url("dist/sprite.jpg")`
    })
    fs.writeFileSync(path.join(process.cwd(), 'dist/index.css'), source)
    callback(null, source)
  })
}
```



## 编写 plugin

loader 的作用是用来处理各种各样的静态资源，插件的功能是更加强大的，插件是伴随整个 webpack 从初始化到最终的资源生成的过程，整个过程都可以有插件的。loader 没法做的事情都是可以通过插件来做的。

插件没有像 loader 那样的独立运行环境，只能在 webpack 里面运行。

### 插件的基本结构 

插件是一个类，有一个 apply 方法。

webpack 执行插件的时候会运行每一个插件上面的 apply 方法，同时把 webpack 的 compiler 对象传递给插件，这样插件就具备监听 compiler hooks 的能力，通过 compiler.hooks 在不同的阶段可以做相应的事情。hooks 包括 compiler 和 compilation 的。

```js
class MyPlugin { 															// 插件名称
  apply(compiler) { 													// 插件上的apply方法
    compiler.hooks.done.tap(' My Plugin', ( 	// 插件的hooks
      stats /* stats is passed as argument when done hook is tapped. */ 
    ) => { 
      console.log('Hello World!'); 						// 插件处理逻辑
    }); 
  } 
}

module.exports = MyPlugin;
```

插件使用，添加到 webpack 配置文件中：

```js
const MyPlugin = require('my-plugin')

module.exports = {
	plugins: [
		new MyPlugin()
	]
}
```

### 搭建插件的运行环境

使用 webpack 配置文件。

### 开发一个最简单的插件

plugins/demo-plugin.js:

```js
module.exports = class DemoPlugin { 
  constructor(options) { 
    this.options = options; 
  }
  apply(compiler) { 
    console.log("options", this.options); 
  } 
};
```

加入到 webpack 配置中:

```js
const DemoPlugin = require('./plugins/demo-plugin')

module.exports = {
	plugins: [
		new DemoPlugin({
			name: 'demo'
		})
	]
}
```

### 更复杂的插件开发场景

#### 插件中如何获取传递的参数？

通过插件的构造函数进行获取。

```js
module.exports = class MyPlugin { 
  constructor(options) { 
    this.options = options; 
  }
  apply(compiler) { 
    console.log("apply", this.options); 
  } 
};
```

#### 插件的错误处理

参数校验阶段，比如在接收参数的时候，我们需要对参数的数据类型，参数的名称和参数的其他内容进行校验，参数不符合要求，可以直接通过 throw 的方式把错误抛出出来。

```js
throw new Error(“ Error Message”)
```

如果已经进入到 hook 里面去，通过 compilation 对象的 warnings 和 errors 接收。

```js
compilation.warnings.push("warning"); 
compilation.errors.push("error");
```

#### 通过 Compilation 进行文件写入 

Compilation 上的 assets 可以用于文件写入。

webpack 的构建流程的文件生成是在 emit 阶段，所以在插件里监听 compiler emit 这个 hooks，监听到这个 hook 之后我们可以获取到 compilation 这个对象，然后只需要将最终要输出的内容设置到 compilation.assets 对象上面去就可以了，之后在最终 webpack 生成文件的时候触发了 emit 之后，它就会去读取 compilation.assets 这个对象，然后把它输出到磁盘目录。

文件写入需要使用 webpack-sources (https://www.npmjs.com/package/webpack-sources)。

```js
const { RawSource } = require("webpack-sources"); // 将一段代码输出到文件里面就可以用 RawSource
module.exports = class DemoPlugin { 
  constructor(options) { 
    this.options = options; 
  }
  apply(compiler) { 
    const { name } = this.options; 
    compiler.hooks.emit.tapAsync("emit", (compilation, cb) => { 
      compilation.assets[name] = new RawSource("demo"); 
      cb(); 
    }); 
  } 
};
```

#### 插件扩展：编写插件的插件

 webpack 的插件是特别的强大的，除了通过插件来扩展 webpack 的能力，插件自身也可以通过暴露 hooks 的方式进行自身扩展。

以 html-webpack-plugin 为例： 

* html-webpack-plugin-alter-chunks (Sync) 
* html-webpack-plugin-before-html-generation (Async) 
* html-webpack-plugin-alter-asset-tags (Async) 
* html-webpack-plugin-after-html-processing (Async) 
* html-webpack-plugin-after-emit (Async)

### 编写一个压缩构建资源为 zip 包的插件

要求：

* 生成的 zip 包文件名称可以通过插件传入。
* 需要使用 compiler 对象上的特定 hooks 进行资源的生成。

#### 准备知识：Node.js 里面将文件压缩为 zip 包

使用 jszip (https://www.npmjs.com/package/jszip)

jszip 使用示例

```js
var zip = new JSZip(); 

zip.file("Hello.txt", "Hello World\n"); 

var img = zip.folder("images"); 
img.file("smile.gif", imgData, {base64: true}); 

zip.generateAsync({type:"blob"}).then(function(content) { 
	// see FileSaver.js 
	saveAs(content, "example.zip"); 
});
```

#### 复习：Compiler 上负责文件生成的 hooks

Hooks 是 emit，是一个异步的 hook (AsyncSeriesHook) 。

emit 生成文件阶段，读取的是 compilation.assets 对象的值，将 zip 资源包设置到 compilation.assets 对象上。

#### 开发 zip-plugin

zip-plugin.js:

```js
const JSZip = require('jszip');
const path = require('path');
const RawSource = require('webpack-sources').RawSource;

const zip = new JSZip();

module.exports = class ZipPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            const folder = zip.folder(this.options.filename);

            for (let filename in compilation.assets) {
                const source = compilation.assets[filename].source();
                folder.file(filename, source);
            }

            zip.generateAsync({
                type: 'nodebuffer'
            }).then((content) => {
                const outputPath = path.join(
                    compilation.options.output.path, 
                    this.options.filename + '.zip'
                );

                const outputRelativePath = path.relative(
                    compilation.options.output.path,
                    outputPath
                );
                compilation.assets[outputRelativePath] = new RawSource(content);

                callback();
            });
        });
    }
}
```