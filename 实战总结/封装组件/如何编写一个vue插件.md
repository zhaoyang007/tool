### 搭建项目

使用 vue/cli 初始化项目，并修改项目结构。

```
├── src                            // 源码目录
│   ├── lib                        // 源码
│   │   ├── index.js               // 插件入口
│   │   ├── MyPlugin.vue           // 组件
│   ├── App.vue                    // 测试写的插件
│   ├── main.js                    // 程序入口文件，加载各种公共组件
├── index.html                     // 入口html文件
```




### 编写组件

```vue
<template>
  <div>
    
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>
```



### 插件注册

Vue.js 的插件应该暴露一个 install 方法，里面来包含我们要处理的业务。这个方法的第一个参数是 Vue 构造器 , 第二个参数是一个可选的选项对象。

```js
const MyPlugin = {
  install (Vue, options) {
		// 1. 添加全局方法或 property
    Vue.myGlobalMethod = function () {
      // 逻辑...
    }

    // 2. 添加全局资源
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        // 逻辑...
      }
    })

    // 3. 注入组件选项
    Vue.mixin({
      created: function () {
        // 逻辑...
      }
    })

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
      // 逻辑...
    }
  }
}

// 导出插件
export default MyPlugin
```



### 插件使用

通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成。

```js
import MyPlugin from 'MyPlugin'

Vue.use(MyPlugin)
// 也可以传入一个可选的选项对象
Vue.use(MyPlugin, { someOption: true })

new Vue({
  // ...组件选项
})
```

Vue.use 会自动阻止多次注册相同插件，即使多次调用也只会注册一次该插件。

使用 script 标签引入插件代码时，无法使用 import 或 require 等形式进行插件模块的导入，也就无法使用 Vue.use()，所以一些插件内部注册的时候在检测到 Vue 是可访问的全局变量时会自动调用 Vue.use() 来使用插件。Vue 只有在 script 的形式时才是可访问的全局变量，所以模块化开发的时候我们都要手动 Vue.use()。

```js
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MyPlugin);
}
```



### 打包

方式一：添加打包命令：package.json

```json
"build:lib": "vue-cli-service build --target lib --name falcons-header src/lib/header/index.js",
```

```bash
npm run build:lib
```

方式二：修改 webpack 配置：vue.config.js

```js
module.exports = {
	entry: './src/lib/index.js',
  output: {
    path: path.resolve(__dirname, './dist'), 
    publicPath: '/dist/',
    filename: 'my-plugin.js' // 打包后输出的文件名，起一个与插件功能相对应的
    library: 'MyPlugin', // library指定的就是你使用require时的模块名，这里便是require("MyPlugin")
    libraryTarget: 'umd', // libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
    umdNamedDefine: true // 会对UMD的构建过程中的AMD模块进行命名。否则就使用匿名的define。
  }
}
```

```bash
npm run build
```



### 发布

修改 package.json

```json
{
  "name": "my-plugin", // 最终包的名字，install和import的就是这个名字。先到npm搜索有没有被用过。
  "version": "1.0.0",
  "private": false,
  "description": "MyPlugin插件",
  "main": "dist/my-plugin.js", // 当你引入模块的时候，它默认就会去找这个文件
  "repository": { // 配置这个地址存放你项目在github上的位置
    "type": "git",
    "url": "https://github.com/zhaoyang007/my-plugin"
  }, 
  "keywords": [],
  "author": "",
  "license": "MIT"
}
```

发布到 npm：

查看当前 npm 用户：npm whoami

添加用户：npm adduser

登录 npm 账户：npm login

升级版本：

* 升级补丁版本号：npm version patch
* 升级小版本号：npm version minor
* 升级大版本号：npm version major

先提交 git，然后运行 npm version 命令会自动更新 npm 版本号，并且自动 git 提交一次版本号的更新，且自动的帮你打上一个版本号的 git tag，最后提交 git 远程。

发布版本：npm publish



### 测试

在其他项目中安装你的插件，看看使用是否正常。



### 如何将一个业务组件完整的功能变成一个插件

1. 将所有引用关系正确的匹配，包括组件，css，图片字体等资源。
2. 将接口调用正确的运行。
3. 将路由跳转关系进行正确的匹配。