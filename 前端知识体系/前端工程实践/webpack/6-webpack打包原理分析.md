## webpack 命令行原理



## webpack 插件机制



## webpack 构建流程



## 编写一个简易的 webpack











### bundle 文件

一个自执行函数

函数体是 webpack 的启动器函数

参数是一个对象，对象的键是模块的路径，值是一个函数，函数的内容是对应模块的转换后的代码，并放到 eval() 中，这些代码是可以直接放到浏览器执行的，但是是有一些缺失的，有一些模块化的语法，所以这个函数传进来了两个参数 module 和 exports 来处理代码中的 import 或 require 这些模块化的代码，module 和 exports 是在上面的自启动函数里定义了。这样就能保证构建出来的代码是可以在浏览器中顺利执行的。

⼤概的意思就是，我们实现了⼀个 **\__webpack_require__** 来实现⾃⼰的模块化，把代码都缓存在 installedModules ⾥，代码⽂件以对象传递进来，key 是路径，value 是包裹的代码字符串，并且代码内部的 require，都被替换成了**\__webpack_require__**。