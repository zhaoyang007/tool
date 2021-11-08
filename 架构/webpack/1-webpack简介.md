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

##### entry

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

##### output

单入口

```js
module.exports = {
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
}
```

多入口

```js
module.exports = {
  output: {
    path: __dirname + '/dist',
    filename: '[name].js' // 多出口不可以指定名称
  }
}
```
