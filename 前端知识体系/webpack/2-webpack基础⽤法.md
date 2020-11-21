

## 资源解析

### 解析 es6

babel 是 JavaScript 编译器，能将 ES6 代码转换成 ES5 代码，让我们开发过程中放⼼使⽤JS新特性⽽不⽤担⼼兼容性问题。并且还可以通过插件机制根据需求灵活的扩展。

#### 安装 babel

要解析 es6 需要安装 @babel/core，es6 的预设插件 @babel/preset-env，通过 babel-loader 去解析它们。

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

babel 在执⾏编译的过程中，会从项⽬根⽬录下的 .babelrc JSON ⽂件中读取配置。没有该⽂件会从 loader 的 options 地⽅读取配置。

babel 两个比较重要的概念，presets 和 plugins。plugins 可以理解成一个 plugin 对应一个功能，presets 是一系列 babel plugin 的集合。要解析es6，使用 es6 的预设 @babel/preset-env 就可以了。 

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

css-loader 作用是加载 .css 模块的内容，转成 commonjs 对象，插入到 js 模块中去。

然后通过 style-loader 将样式通过 \<style\> 标签插入到 head 中，这样样式才能显示出来。

#### 安装 css-loader style-loader

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

使用 .vue 文件进行开发，应该使用 vue-style-loader 而不是 style-loader，这样 .vue 文件的样式也有热重载的功能了，.vue 文件和样式文件的样式都适用。

### 解析 less 和 sass

less-loader 的作用就是将 less 转换成 css。

#### 安装 less 和 less-loader

less-loader 是依赖于 less 的。

```bash
npm i less less-loader -D
```

#### 配置 less

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



## html-webpack-plugin

html-webpack-plugin 默认支持 ejs 模版语法。

### 开发环境中的作用

启动了 webpack-dev-server 后，它会在项目根目录中生成一个隐形的 index.html，如果 output 中配置了 publicPath，会生成在项目跟目录的 publicPath 中。webpack-dev-server 会自动在根目录下寻找这个 index.html，但是根目录里根本没有 index.html。所以访问页面出现的是项目目录结构，在 webpack-dev-server 中配置 historyApiFallback 就可以直接访问到 index.html。

### 生产环境打包中的作用

生产环境打包，会生成一个 index.html 来包含我们打包好的 js 和 css 文件。



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

缺陷：webpack 中的⽂件监听是可以自动构建，但是每次需要⼿动刷新浏览器。

### 文件监听的原理分析

轮询判断⽂件的最后编辑时间是否变化。

某个⽂件发⽣了变化，并不会⽴刻告诉监听者，⽽是先缓存起来，等 aggregateTimeout，这个时间内如果有其他文件也发生了变化，它会把这些变化的文件列表一起去构建。



## PostCSS 插件 autoprefixer

由于现在移动设备的浏览器众多，因此需要面对很多兼容性的问题，有些兼容问题可以在构建阶段去尽量避免的，比如 css3 前缀的问题，为什么 css3 的属性需要添加前缀呢，因为由于浏览器的标准并没有完全的统一，目前来看还是有四种浏览器内核，IE Trident(-ms), Firefox Geko(-moz), Chrome Webkit(-webkit), Opera Presto(-o)。

通过 PostCSS 的插件 autoprefixer 来自动补齐 css3 前缀的。

postcss 是 css 的后置处理器，与 less 和 sass 不同，less 和 sass 是 css 的预处理器，预处理器一般是在打包前置去处理，autoprefixer 是在样式处理好之后，代码生成完之后，再对 css 进行后置处理。通过postcss去优化css代码。优化的过程就是通过一系列的组件去优化。

### 使用 autoprefixer

autoprefixer 插件通常是和 postcss-loader 一起使用的。postcss-loader 的功能是比较强大的，除了做 css 样式补全之外，它还可以做支持 css module，style lint 等。

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



## 自动清理构建目录

每次构建的时候不会清理⽬录，造成构建的输出⽬录 output ⽂件越来越多

### 通过 npm scripts 清理构建⽬录

rm -rf ./dist && webpack

rimraf ./dist && webpack

### ⾃动清理构建⽬录

使⽤ clean-webpack-plugin。它会默认删除 output 指定的输出⽬录。

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```



## 使用 source map

源代码与打包后的代码的映射关系，通过 source map 定位到源代码，方便我们调试代码，内部借助了 sourcemap-loader 来实现的。

在 webpack.dev.js devtool 中设置。

开发环境默认开启，线上环境关闭

* 如果线上不关闭，会把我们的业务逻辑暴露出来，线上排查问题的时候可以将 sourcemap 上传到错误监控系统。

### 配置推荐

```js
devtool: "cheap-module-eval-source-map", // 开发环境配置
devtool: "cheap-module-source-map", // 线上⽣成配置
```

### source map 关键字

eval: 使⽤ eval 包裹模块代码

source map: 产⽣ .map ⽂件

cheap: 不包含列信息，只包含行信息

inline: 将 .map 作为 DataURI 嵌⼊，不单独⽣成 .map ⽂件

module:包含 loader 的 sourcemap

### source map类型

可以根据前面的关键字排列组合得到。