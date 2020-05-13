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



## PostCSS 插件 autoprefixer 自动补齐 CSS3 前缀

由于现在移动设备的浏览器众多，因此需要面对很多兼容性的问题，有些兼容问题可以在构建阶段去尽量避免的，比如 css3 前缀的问题，为什么 css3 的属性需要添加前缀呢，因为由于浏览器的标准并没有完全的统一，目前来看还是有四种浏览器内核，IE Trident(-ms), Firefox Geko(-moz), Chrome Webkit(-webkit), Opera Presto(-o)。

在 webpack 里我们可以通过 PostCSS 插件的 autoprefixer 来自动补齐 css3 前缀的。

autoprefixer 是 css 的后置处理器，与 less 和 sass 不同，less 和 sass 是 css 的预处理器，预处理器一般是在打包前置去处理，autoprefixer 是在样式处理好之后，代码生成完之后，再对它进行后置处理。

### 使用autoprefixer

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



## 移动端 CSS px 自动转换成 rem

### 浏览器分辨率

移动设备流行之后，不同机型的分辨率是不一样的，这对前端开发来说，就会造成比较大的问题，需要不断的对
页面进行适配。

![浏览器分辨率](/Users/zhaoyang/Downloads/浏览器分辨率.png)

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



## 静态资源内联

### 资源内联的意义

#### 代码层面：

* ⻚⾯框架的初始化脚本：如上节中 rem 计算的 js 库，要在打开页面的时候就要去计算。

* 上报相关打点：page start，css 初始化，css 加载完成，js 初始化和 js 加载完成等代码，这些都是需要内联到 html 里面去，而不能直接放到最终打包的 js 脚本中去。

* css 内联避免⻚⾯闪动

#### 请求层⾯：减少 HTTP ⽹络请求数

⼩图⽚或者字体内联 (url-loader)

### html和js的内联

raw-loader的功能是读取一个文件，把这个文件的内容返回成一个string，把这个string插入到对应的位置。
#### raw-loader内联html
```html
 <%= require('raw-loader!./meta.html') %>
```

#### raw-loader内联js

```html
<script>
  <%= require('raw-loader!babel-loader!../../node_modules/lib-flexible/flexible.js') %></script>
```

### css内联

#### 方案一：借助style-loader

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

它针对打包好的css chunk的代码，把它内联到html的head中。

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



## 使用 source map

作⽤：通过 source map 定位到源代码

开发环境开启，线上环境关闭

* 如果线上不关闭，会把我们的业务逻辑暴露出来，线上排查问题的时候可以将 sourcemap 上传到错误监控系统。

### source map 关键字

eval: 使⽤ eval 包裹模块代码

source map: 产⽣ .map ⽂件

cheap: 不包含列信息，只包含行信息

inline: 将 .map 作为 DataURI 嵌⼊，不单独⽣成 .map ⽂件

module:包含 loader 的 sourcemap

### source map类型

可以根据前面的关键字排列组合得到。

![sourcemap类型](/Users/zhaoyang/tool/前端知识体系/前端工程实践/webpack/images/sourcemap类型.png)

### 本地开发时使用 sourcemap 进行代码调试

在webpack.dev.js devtool 中加入 sourcemap。



## 提取页面公共资源

### 基础库分离





























