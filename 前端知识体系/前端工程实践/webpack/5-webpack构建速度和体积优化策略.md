## 初级分析：使用 webpack 内置的 stats

利用 webpack 内置的 stats 对象。

它可以帮我们分析基本的一些信息，比如构建总共的时间，构建资源的大小。

### package.json 中使用 stats

指定输出的是一个 json 对象，生成一个 json 文件

```json
"scripts": {
  "build:stats": "webpack --config webpack.prod.js --json > stats.json"
}
```

### node.js 中使用

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

这两种方式颗粒度太粗，看不出问题所在。想要分析实际的问题，比如哪个组件比较大，哪个 loader 耗的时间比较长，是无法很好的分析出来的。



## 速度分析：使用 speed-measure-webpack-plugin

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



## 体积分析：使用 webpack-bundle-analyzer

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



## 使用高版本的 webpack 和 Node.js

在 webpack 里做速度的优化。

在软件这一块，性能往往不是最大的问题，软件不断的迭代过程中，可以不断的提升性能，对于构建而言同样是适用的，所以推荐采用高版本的 webpack 和 node.js。

### 使用 webpack4：优化原因

* V8带来的优化，很多对原生方法的优化（for of 代替 forEach、Map 和Set 代替 Object、includes 代替 indexOf）

* 默认使用更快的 md4 的 hash 算法

* webpacks AST 可以直接从 loader 传递给 AST，减少解析时间

* 使用字符串的方法替代正则表达式

### 采用更高版本的 node.js

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

includes 和 indexOf 的性能差异

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



## 缩小构建目标

### 缩小构建目标

loader 是一个消耗性能的大户，官方不建议我们使用过多的 loader。

所以缩小构建范围主要是优化 loader 配置，缩小 loader 的查找范围。

test include exclude 三个配置项来缩⼩ loader 的处理范围，推荐include。

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



## 多进程/多实例构建

### 多进程/多实例构建：资源并行解析可选方案

![资源并行解析可选方案](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/资源并行解析可选方案.png)

### 多进程/多实例：使用 HappyPack 解析资源

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

### 多进程/多实例：使用 thread-loader 解析资源

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
      cssProcessor: require('cssnano') // 它是postcss的依赖，不用单独安装
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



## 使用 webpack 进行图片压缩

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



## 使用 cdn 静态资源

### 使⽤静态资源路径 publicPath（CDN）

```js
module.exports = {
  output:{
    publicPath: '//cdnURL.com' // 给输出的bundle文件补上url前缀
  }
}
```

### 使⽤ externals 优化 cdn 静态资源

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

### 使用 html-webpack-externals-plugin 分离基础包

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



##  Code Splitting

提取页面公共资源。

### SplitChunksPlugin

webpack4 内置的，替代 CommonsChunkPlugin 插件。

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

#### 分离基础包

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

#### 分离页面公共文件

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

### CommonsChunkPlugin

webpack3 使用。

####  分离基础包

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



## 进一步分包：预编译资源模块

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

### 使用 DLLPlugin 进行分包

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

### 使用 DLLReferencePlugin 引用 manifest.json

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

### ⻚⾯依赖的所有动态链接库都需要被加载到 html 模版

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



## 代码分割和动态 import

### 代码分割的意义

对于大的 web 应用而言，将所有的代码都放在一个文件中显然是不够有效的，特别是你的代码在一些情况下才会用到，首屏加载不会用到的。这时候我们针对首屏会打出一个 js 文件，对于其他的页面或 tab 切换的场景可以通过按需加载，也就是js懒加载的形式，它和懒加载图片是一样的道理，我们用到了这个脚本再加载它。这就是webpack 里面提供的一个懒加载的功能，webpack 将你的代码库分割成 chunks（语块），当代码运行到需要它们的时候再进行加载。

### 懒加载 JS 脚本的⽅式

CommonJS：require.ensure

ES6：动态 import（⽬前还没有原⽣⽀持，需要 babel 转换）

### 如何使⽤动态 import?

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

然后就可以在我们的代码中使用动态的import语法了。

```js
import('./text.js') // 返回的是promise对象
  .then(Text => {
    // Text就是import的这个文件export出去的内容
    console.log(Text)
  })
```

### 代码分割的效果

使用了动态import的文件会分割出去一个js文件，当你代码用到的时候再异步的请求加载这个js文件。

### 原理

webpack 使用 jsonp 的形式动态的添加一个 \<script\> 脚本进来。



## Tree Shaking 的使用和原理

### Tree Shaking（摇树优化）

概念：1 个模块可能有多个⽅法，只要其中的某个⽅法使⽤到了，则整个⽂件都会被打到 bundle ⾥⾯去，tree shaking 就是只把⽤到的⽅法打⼊ bundle ，没⽤到的⽅法会在 uglify 阶段被擦除掉。是针对 css, js 的。

### DCE (Dead code elimination)

代码不会被执行，不可到达

代码执行的结果不会被用到

代码只会影响死变量（只写不读）

### Tree-shaking 原理

Tree Shaking 利用 DCE 的特点来分析哪些代码是需要被删除掉的。

代码擦除：Tree Shaking 将没有用到的代码加一些注释来标记，在 uglify 阶段删除无用代码。

### CSS Tree Shaking

PurifyCSS: 遍历代码，识别已经用到的 CSS 选择器，从CSS中删除未使用的选择器。

uncss: HTML 需要通过 jsdom 加载，所有的样式通过 PostCSS 解析，通过 document.querySelector 来识别在 html 文件里面不存在的选择器。

CSS Tree Shaking 的插件不能独立使用，如果没有任何 css 文件作为资产发出，则此插件将无效。需要提取 css 为一个文件后才能使用。在 webpack4 里需要和 mini-css-extract-plugin 配合使用，在 webpack3 里需要和 extract-text-webpack-plugin 配合使用。

#### 方案一

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

#### 方案二

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

### JS Tree Shaking

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

#### JS 摇树副作用

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

#### 在 js 中引入自定义的模块和第三方库的情况

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

#### 按需导入

我们导入模块的写法最好只导入我们需要使用的函数，不要整体导入或 as * 的方式。

```js
import { simpleSort } from "../../utils/utils"
```

#### 第三方库

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



## Scope Hoisting 的使用和原理

作⽤域提升（Scope Hoisting）是指 webpack 通过 ES6 语法的静态分析，分析出模块之间的依赖关系，尽可能地把模块放到同⼀个函数中。

### 没有开启 Scope Hoisting 的现象：

构建之后的代码存在大量的闭包代码。对于每一个模块打包出来都会有一个函数的包裹。

### 会导致的问题：

大量函数的闭包包裹代码，会导致打包出来的 bundle 文件体积增大（模块越多越明显）。

通过函数闭包的形式包裹代码，运行代码时创建的函数作用域变多，内存开销变大。

### 模块转换分析

被 webpack 转换后的模块会带上⼀层包裹。

import 会被转换成 __webpack_require，export 也会做相应的转换。

### 进⼀步分析 webpack 的模块机制

打包出来的是⼀个 IIFE (匿名闭包)

modules 是⼀个数组，每⼀项是⼀个模块初始化函数

__webpack_require ⽤来加载模块，返回 module.exports

通过 WEBPACK_REQUIRE_METHOD(0) 启动程序

### scope hoisting 原理

原理：将所有模块的代码按照引⽤顺序放在⼀个函数作⽤域⾥，然后适当的重命名⼀些变量以防⽌变量名冲突。

对⽐：通过 scope hoisting 可以减少函数声明代码和内存开销。

### scope hoisting 使⽤

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



## 使用动态 Polyfill 服务

Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign ）都不会转码。比如 ES6 在 Array 对象上新增了 Array.from 方法。Babel 就不会转码这个方法。如果想让这个方法运行，必须使用 babel-polyfill。  

### Polyfill 方案

![babel-polyfill方案](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/babel-polyfill方案.png)

### @babel/polyfifill

以全局变量的⽅式注⼊进来的。windows.Promise，它会造成全局对象的污染。

```bash
npm install --save @babel/polyfill
```

```js
// index.js 顶部
import "@babel/polyfill"
```

babel-polyfill 打包后体积：88.49k，占比 29.6%

![babel-polyfill构建体积占比](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/babel-polyfill构建体积占比.png)

### 按需加载，减少冗余

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

### @babel/plugin-transform-runtime

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

### 构建体积优化：动态 polyfill

#### Polyfill Service 原理

识别 User Agent，下发不同的 Polyfill。

![polyfill-service](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/webpack/polyfill-service.png)

#### 如何使用动态 Polyfill service

polyfill.io 官方提供的服务

https://polyfill.io/v3/polyfill.min.js

基于官方自建polyfill服务

//huayang.qq.com/polyfill/v3/polyfill.min.js?unknown=polyfill&features=Promise,Map,Set



## 总结

### 分析工具

* 初级分析：使用 webpack 内置的 stats
* 速度分析：使用 speed-measure-webpack-plugin
* 体积分析：使用 webpack-bundle-analyzer

### 构建速度优化策略

* 使用高版本的 webpack 和 Node.js
* 缩小构建目标
* 多进程/多实例构建
* 多进程/多实例并行压缩代码
* 充分利用缓存提升二次构建速度

### 体积优化策略

* 代码、图片压缩
* 使用 cdn 静态资源
* Code Splitting
* 代码分割和动态 import
* Tree Shaking
* Scope Hoisting
* 动态 polyfill
