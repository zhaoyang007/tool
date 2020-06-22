## webpack 核心概念

### 核心概念之 entry

entry ⽤来指定 webpack 的打包⼊⼝。

#### 理解依赖图的含义

![依赖图](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/依赖图.png)       

webpack 是一个模块打包器，会把一切的资源，不管是 js css 等代码资源，还是图片字体等非代码资源都会当成一个个的模块，模块之间存在着依赖关系，webpack 根据入口文件去找到它的依赖，形成一颗依赖图，只要遇到依赖，webpack 就会将依赖文件加入到依赖图里面去。最终遍历完后，生成打包之后的一些资源。

#### entry 的用法

单入口：entry 是一个字符串

```js
module.exports = {
	entry: './path/to/my/entry/file.js'
}
```

多入口：entry 是一个对象

```js
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  }
}
```

### 核心概念之 output

output 用来告诉 webpack 如何将编译后的文件输出到磁盘。

#### output 的用法

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
    filename: '[name].js'
  }
}
```

### 核⼼概念之 loaders

webpack 开箱即用只支持 JS 和 JSON 两种文件类型，对于其他的文件如 css less jsx vue 指令，webpack 是并不了解的，就需要通过 loaders 处理，去支持其它文件类型并且把它们转化成有效的模块，并且可以添加到依赖图中。loaders 本身是一个函数，接受源文件作为参数，返回转换的结果。

#### loaders 的用法

一个 webpack 配置里面可能会存在多个 loader，这些loader是需要放在配置根节点下的 module，module 是一个对象，这个对象里面有一个 rules，rules 是一个数组，我们只需要把需要用的 loader 放到 rules 数组里面就可以了。对于每一个 rule，通过 test 指定匹配规则，使用 use 指定当前使用的 loader 的名称。

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

### 核心概念之 plugins

plugins 作用是用来增强 webpack 的功能，plugins 通常用于打包输出的 js 文件的优化，资源的管理和环境变量的注入，可以把 plugins 理解为，任何 loaders 没办法做到的事情都可以通过 plugins 去完成。比如构建之前需要手动的去删除打包目录，像这种操作都是可以通过 plugins 很灵活的完成，plugins 是作用于整个构建过程，就是从构建开始到构建结束整个阶段都是可以使用 plugins 的。 

#### plugins 的用法

在plugins数组里面将定义好的插件放进去就可以了。

```js
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.htmls'
    })
  ]
}
```

### 核心概念之 mode

mode 是用来指定当前构建环境：production development none。

设置 mode 的好处是可以自动的触发 webpack 内置的函数，比如你设置成 development，webpack 会默认的去开启在开发阶段的一些比较实用的参数和插件的一些功能。设置成 production 会默认开启在生产阶段的参数和插件的一些功能，设置成 none 就什么都不会帮你做。默认值为 production。

#### mode 的用法

```js
module.exports = {
  mode: 'production'
}
```

#### Mode 的内置函数功能

![Mode的内置函数功能](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/Mode的内置函数功能.png)



## 资源解析

### 解析 es6

#### 安装 babel

要解析 es6 需要安装 @babel/core，es6 的预设 @babel/preset-env，通过 babel-loader 去解析它们。

```bash
npm i @babel/core @babel/preset-env babel-loader -D
```

#### 使用 babel-loader

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

#### babel 的配置文件是：.babelrc

babel 两个比较重要的概念，presets 和 plugins。plugins 可以理解成一个 plugin 对应一个功能，presets 是一系列 babel plugin 的集合。要解析es6，使用es6的预设@babel/preset-env就可以了。 

```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

### 解析 react jsx

#### 安装 react 相关

```bash
npm i react react-dom @babel/preset-react -D
```

#### 增加 react 的 babel 预设，就可以解析 react 相关的语法了。

```json
{
  "presets": [
    "@babel/preset-react"
  ]
}
```

### 解析 css

css-loader 作用是加载 .css ⽂件，并将它转换成 commonjs 对象，插入到 js 代码里去。

然后通过 style-loader 将样式通过 \<style\> 标签插入到 head 中，这样样式才能显示出来。

#### 安装css-loader style-loader
```bash
npm i css-loader style-loader -D
```

#### 配置 css-loader style-loader

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

使用 .vue 文件进行开发，应该使用 vue-style-loade r而不是 style-loader，这样 .vue 文件的样式也有热重载的功能了，.vue 文件和样式文件的样式都适用。

### 解析 less 和 sass

less-loade r的作用就是将 less 转换成 css。

#### 安装 less 和 less-loader

less-loader 是依赖于 less 的。

```bash
npm i less less-loader -D
```

#### 配置less

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

### 解析图片

file-loader 用于处理文件

#### 安装 file-loader

```bash
npm i file-loader -D
```

#### 配置图片解析 file-loader

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

### 解析字体

在 webpack 里解析字体和解析图片做法是一样的，因为图片和字体都不是代码文件。图片和字体的解析都可以用file-loader 处理。

#### 配置字体解析 file-loader

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

### 图片和字体解析的其他方式

url-loader 和 file-loader 功能上是差不多的，只不过 url-loader 相比 file-loader，还可以做小图片或小字体，自动的做一个 base64 的转换，url-loader 内部也使用了 file-loader。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        }]
      }
    ]
  }
}
```



## webpack 中的⽂件监听

⽂件监听是在发现源码发⽣变化时，⾃动重新构建出新的输出⽂件。

### webpack 开启监听模式，有两种方式：

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
    // 默认为空，不监听的文件或文件夹，支持正则匹配
    ignored: /node_modules/,
    // 监听到变化后会等300ms再去执行，默认300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停轮询系统指定文件有没有变化实现的，默认每秒询问1000次
    poll: 1000
  }
}
```

缺陷：webpack 中的⽂件监听是可以自动构建，但是每次需要⼿动刷新浏览器

### 文件监听的原理分析

轮询判断⽂件的最后编辑时间是否变化。

某个⽂件发⽣了变化，并不会⽴刻告诉监听者，⽽是先缓存起来，等 aggregateTimeout，这个时间内如果有其他文件也发生了变化，它会把这些变化的文件列表一起去构建。



## webpack 中的热更新

### webpack-dev-server

借助 webpack-dev-server，每次代码修改，自动构建，构建完成后，通过热更新的方式让浏览器的内容自动的变化。

WDS 不刷新浏览器。

WDS 还有一个优势是它输出的文件不放入磁盘里面，没有磁盘的 IO 操作，它输出的文件是放在内存里面，而不像watch这种方式是放在本地的磁盘文件里面。所以它的构建速度会有更大的优势。

WDS通常需要配合HotModuleReplacementPlugin插件一起使用。

#### 使用WDS

```js
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // 配置devServer
  devServer: {
    // wds服务的基础的目录
    contentBase: './dist',
    // 开启热更新
    hot: true
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

### 热更新的原理分析

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



## 文件指纹策略

什么是文件指纹：打包后输出的文件名后缀。

文件指纹的好处：用来做版本的管理。

### 常见的文件指纹有哪几种：

* hash：和整个项目的构建相关，只要有一个文件发生变化，整个项⽬构建的 hash 值就会更改。
* chunkhash：和 webpack 打包的 chunk 有关，不同的 entry 会⽣成不同的 chunkhash 值，对于 js 文件的指纹，一般采用 chunkhash。
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

### CSS 的⽂件指纹设置

设置 MiniCssExtractPlugin 的 filename，使⽤ [contenthash]。

使用 style-loader 和 css-loader 的话，那么这个 css 会由这个 style-loader 将这个 css 插入到 style 里面并且放到 head 头部。这时并没有独立的一个 css 文件，因此我们通常会采用 MiniCssExtractPlugin 插件把 css 提取成一个独立的文件。加入 MiniCssExtractPlugin 插件的 loader。

css/sass/less 等 css 相关文件经过对应的 loader 处理之后，最终处理必须为 style-loader 将 css 样式放到style标签中或者使用文件提取的插件将 css 单独提取成独立 css 文件。两者必须存在一个，这样样式才能有效。两者同时存在时，style-loader 在前，生成独立 css 文件，style-loader 失效；提取文件的插件 loader 在前，编译过不了。

css 文件指纹也只需设置在生产环境。

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

![文件占位符](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/文件占位符.png)



## 代码压缩

### js 文件的压缩

webpack4 里，内置了uglifyjs-webpack-plugin 插件，所以默认打包出来的 js 文件就已经压缩过了。不需要再做其他的操作。当然也可以手动的安装这个插件，给它设置一些额外的参数，比如默认开启它的并行压缩。

### css ⽂件的压缩

webpack3 的时候我们可以通过 css-loader 去设置一个 minify 参数来压缩 css，但是 css-loader 在 1.0 的版本之后去掉了这个参数，所以现在是没办法直接通过 css-loader 设置参数的方式做 css 的压缩。

现在需要使用 optimize-css-assets-webpack-plugin 插件，同时使用 css 的预处理器 cssnano，匹配到所有的 css文件，再用这个 css 处理器进行 css 的压缩。

```js
const OptimizeCssAssetsWebpackgin = require('optimize-css-assets-webpack-plugin')

module.exports = {
	plugins: [
    new OptimizeCssAssetsWebpackgin({
      assectNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
  ]
}
```

### html ⽂件的压缩

修改 html-webpack-plugin，设置压缩参数

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
