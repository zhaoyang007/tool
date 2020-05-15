## 初级分析：使用webpack内置的stats

利用webpack内置的stats对象

它可以帮我们分析基本的一些信息，比如构建总共的时间，构建资源的大小

### package.json 中使用 stats

指定输出的是一个json对象，生成一个json文件

```json
"scripts": {
  "build:stats": "webpack --config webpack.prod.js --json > stats.json"
}
```

### node.js中使用

```js
const webpack = require('webpack')
const config = require('./webpack.config.js')('production')

webpack(config, (err, stats) => {
  if (err) {
    return console.error(err)
  }
  if (stats.hasErrors()) {
    return console.error(stats.toString('errors-only'))
  }
  console.log(stats)
})
```

这两种方式颗粒度太粗，看不出问题所在。想要分析实际的问题，比如哪个组件比较大，哪个loader耗的时间比较长，是无法很好的分析出来的。




## 速度分析：使用speed-measure-webpack-plugin

更好的分析webpack构建的速度，怎么找出构建速度问题所在。

### 使用speed-measure-webpack-plugin

可以看到每个loader和插件执行耗时，重点的关注耗时较长的loader或插件，针对这些做优化。



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


### 速度分析插件作用

分析整个打包总耗时

每个loader和插件的耗时情况



## 体积分析：使用webpack-bundle-analyzer

它可以把我们的项目打包出来的文件会进行一个分析，能很方便的看出体积的大小。面积越大体积越大，我们可以重点关注这些进行优化。

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  
 module.exports = {
   plugins: [
     new BundleAnalyzerPlugin()
   ]
 }
```

构建完成后会在8888端口展示体积大小。


### 可以分析哪些问题

依赖的第三方模块文件大小。

业务的组件代码图片大小，针对大的js可以做js的按需加载等优化操作。



## 使用高版本的webpack和Node.js

在 webpack 里做速度的优化。

在软件这一块，性能往往不是最大的问题，软件不断的迭代过程中，可以不断的提升性能，对于构建而言同样是适用的，所以推荐采用高版本的 webpack 和 node.js。

### 使用webpack4：优化原因

* V8带来的优化，很多对原生方法的优化（for of 代替 forEach、Map 和Set 代替 Object、includes 代替 indexOf）

* 默认使用更快的 md4 的 hash 算法

* webpacks AST 可以直接从 loader 传递给 AST，减少解析时间

* 使用字符串的方法替代正则表达式

### 采用更高版本的node.js

高版本的node.js对原生的js API或数据结构是有做一些优化的。

验证高版本node.js比低版本node.js性能更快，针对相同的api、相同的代码做比较。

```js
// 设置10000个key，运行100次

const runCount = 100
const keyCount = 10000

let map = new Map()

let keys = new Array(keyCount)
for (let i = 0; i < keyCount; i++) keys[i] = {}

for (let key of keys) map.set(key, true)

let startTime = process.hrtime()

for (let i = 0; i < runCount; i++) {
  for (let key of keys) {
    let value = map.get(key)
    if (value !== true) throw new Error()
  }
}

let elapsed = process.hrtime(startTime)
let [seconds, nanoseconds] = elapsed
console.log(elapsed)

let milliseconds = Math.round(seconds * 1e3 + nanoseconds * 1e-6)

console.log(`${process.version} ${milliseconds} ms`)
```

includes和indexOf的性能差异

```js
const ARR_SIZE = 1000000
const hugeArr = new Array(ARR_SIZE).fill(1)

// includes
const includesTest = () => {
  const arrCopy = []
  console.time('includes')
  let i = 0
  while (i < hugeArr.length) {
    arrCopy.includes(i++)
  }
  console.timeEnd('includes')
}

// indexOf
const indexOfTest = () => {
  const arrCopy = []
  console.time('indexOf')
  for (let item of hugeArr) {
    arrCopy.indexOf(item)
  }
  console.timeEnd('indexOf')
}

includesTest()
indexOfTest()
```



## 多进程/多实例构建

### 多进程/多实例构建：资源并行解析可选方案


### 多进程/多实例：使用HappyPack解析资源

原理：每次 webapck 解析一个模块，HappyPack 会将它及它的依赖分配给 worker 线程中。

每次 webpack 解析一个模块，webpack 自身开启一个进程去解析这个模块。HappyPack 会将这个模块进行划分，比如有多个模块，在 webpack compiler run 方法之后，到达 HappyPack，它会做一些初始化，创建一个线程池，线程池会将构建任务里的模块进行分配 ，比如将某个模块以及它的依赖分配给 HappyPack 其中的一个线程，以此类推，那么一个 HappyPack 的线程池可能会包括多个线程，这些线程会各自的处理这些模块以及它的依赖。处理完成之后，会有一个通信的过程，将处理好的资源传输给 HappyPack 的主进程，完成整个构建的过程。
									

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

### 多进程/多实例：使用thread-loader解析资源

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



## 多进程/多实例并行压缩代码

### 方法一：使用 webpack-parallel-uglify-plugin 插件

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

### 方法二：uglifyjs-webpack-plugin 开启 parallel 参数

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

### 方法三：terser-webpack-plugin 开启 parallel 参数

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



## 进一步分包：预编译资源模块

### 分包：设置Externals
思路：将react, react-dom基础包通过cdn引入，不打入bundle中。

方法：使用html-webpack-externals-plugin。

缺点：一个基础库需要指定一个cdn，实际的项目中有很多包，需要引入的script标签太多 。

### 通过split-chunks-plugin插件分离基础包，

缺点：它每次还是会对基础包进行分析。

### 进一步分包：预编译资源模块

分包来说，更好的方式。

思路：将react、react-dom、redux、react-redux基础包和业务基础包打包成一个文件。

方法：使用 DLLPlugin 进行分包，DllReferencePlugin 对 manifest.json 引用。manifest.json 是对分离出来的包的描述。

#### 使用 DLLPlugin 进行分包

创建一个单独的构建配置文件，一般命名为 webpack.ddl.js，DLLPlugin 也会提高打包的速度。

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

#### 使用 DLLReferencePlugin 引用 manifest.json

在 webpack.config.js 中引入

```js
module.exports = {
  plugins: [
    new webpack.DLLReferencePlugin({
      manifest: require('./build/library/manifest.json')
    })
  ]
}
```



## 充分利用缓存提升二次构建速度

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

  * 针对模块的缓存的开启

    ```js
    const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
    
    module.exports = {
      plugins: [
        new HardSourceWebpackPlugin()
      ]
    }
    ```

有缓存的话node_modules下面会有一个cache目录



## 缩小构建目标

### 缩小构建目标

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

### 减少文件搜索范围

#### 优化 resolve.modules 配置（减少模块搜索层级）

resolve.modules 是模块解析的过程，webpack 解析时，模块的查找过程和 nodejs 的模块查找是比较类似的，会从当前的项目找，没找到会去找 node_modules。会依次去子目录找模块是否存在。

#### 优化 resolve.mainFields 配置

找入口文件的时候，会根据 package.json 里的 main 字段查找，因为发布到 npm 的组件的 package.json 会遵守一定的规范，都会有 main 这个字段，可以设置查找的时候直接读取 main 这个字段，这样也会减少一些不必要的分析过程。比如 package.json 里面没有这个 main ，那它再去读取根项目下的 index.js，没有再去找 lib 下面的 index.js，这就是它默认的查找过程，我们把这个默认的查找过程链路做一个优化，只找 package.json 中 main 字段指定的入口文件。

#### 优化 resolve.extensions 配置

模块路径的查找，比如 import 一个文件，没有写后缀，webpack 会先去找 .js，没有会找 .json，默认情况下webpack 只支持 js 和 json 的读取。extensions 数组里可以再设置其他的文件，如 .jsx .vue .ts 等。不过这个数组里面的内容越多的话，查找消耗的时间也会越多，因此我们可以缩小 extensions 查找的范围，比如只设置查找 .js，其他文件需要写的时候写全文件后缀。避免 webpack 做不必要的查找。

#### 合理使用 alias

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



## 使用Tree Shaking擦除无用的JavaScript和CSS

### 无用的css如何删除掉？

PurifyCSS: 遍历代码，识别已经用到的 CSS class。

uncss: HTML 需要通过 jsdom 加载，所有的样式通过 PostCSS 解析，通过 document.querySelector 来识别在 html 文件里面不存在的选择器。

### 在 webpack 中如何使用 PurifyCSS? 

使用 purgecss-webpack-plugin，它不能独立使用，需要提取 css 为一个文件后才能使用。在 webpack4里需要和 mini-css-extract-plugin 配合使用，在 webpack3 里需要和 extract-text-webpack-plugin 配合使用。

```js
const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin')

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
    new PurgecssWebpackPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true })
    })
  ]
}
```



## 使用webpack进行图片压缩

图片资源相对是较大的，我们可以通过在线工具手动进行图片的批量压缩。构建工具一部分的职责就是将平时我们手动完成的事做成自动化。

### 图片压缩

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

### Imagemin 的优点分析

* 有很多定制选项 

* 可以引入更多第三方优化插件，例如pngquant 

* 可以处理多种图片格式

### Imagemin 的压缩原理

* pngquant: 是一款 PNG 压缩器，通过将图像转换为具有 alpha 通道（通常比 24/32 位 PNG 文件小 60-80％）的更高效的 8 位 PNG 格式，可显著减小文件大小。 

* pngcrush: 其主要目的是通过尝试不同的压缩级别和 PNG 过滤方法来降低 PNG IDAT 数据流的大小。 

* optipng: 其设计灵感来自于 pngcrush。optipng 可将图像文件重新压缩为更小尺寸，而不会丢失任何信息。 

* tinypng: 也是将 24 位 png 文件转化为更小有索引的 8 位图片，同时所有非必要的 metadata 也会被剥离掉。



## 使用动态Polyfill服务

Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如Object.assign ）都不会转码。比如 ES6 在 Array 对象上新增了 Array.from 方法。Babel 就不会转码这个方法。如果想让这个方法运行，必须使用 babel-polyfill。

### 构建体积优化：动态polyfill

babel-polyfill  

打包后体积：88.49k，占比 29.6%


### Promise 的浏览器支持情况


### Polyfill 方案


### Polyfill Service原理

识别 User Agent，下发不同的 Polyfill。

### 如何使用动态 Polyfill service

polyfill.io 官方提供的服务

https://polyfill.io/v3/polyfill.min.js

基于官方自建polyfill服务

//huayang.qq.com/polyfill/v3/polyfill.min.js?unknown=polyfill&features=Promise,Map,Set

### 体积优化策略总结：

* Scope Hoisting

* Tree Shaking

* 公共资源分离

* 图片压缩

* 动态 polyfill

