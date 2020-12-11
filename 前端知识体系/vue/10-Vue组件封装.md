### 如何编写一个 Vue 插件

##### 搭建项目

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

##### 编写组件

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

##### 插件注册

Vue.js 的插件是一个对象或类，暴露一个 install 方法，里面来包含我们要处理的业务。这个方法的第一个参数是 Vue 构造器 , 第二个参数是一个可选的选项对象。

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

##### 插件使用

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

##### 打包

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

##### 发布到 npm

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

##### 测试

在其他项目中安装你的插件，看看使用是否正常。

##### 如何将一个业务组件完整的功能变成一个插件

1. 将所有引用关系正确的匹配，包括组件，css，图片字体等资源。
2. 将接口调用正确的运行。
3. 将路由跳转关系进行正确的匹配。



### 组件封装总结

常见基础组件封装

* tab
* 表单
* 表格
* 弹窗
* 提示框
* 树形组件
* menu
* 分页

组件二次封装：将 elment-ui 进行二次封装，主要是为了样式风格。



### 表单业务组件封装

* 组件外部

  * 传入遍历数据
    * 表单的类型
    * label 
    * 是否展示 label
    * 当前表单需要绑定的 v-model 变量名
    * model 的默认值（非必须）
    * 一些其他属性的传递
  * 绑定所有表单对应的 v-model 对象集合
  * 接收内部触发出来的事件，主要是内部提交表单的事件，外部做列表的刷新

  ```vue
  <template>
    <div>
      <div class="searchHeader">
        <sel-header-component
          :sel-header-list="search.selHeaderList"
          v-model="search.selHeaderModelObj"
          @submit="searchResult"
        />
      </div>
    </div>
  </template>
  <script>
  import SelHeaderComponent from '@/components/configSelHeader'
  
  export default {
    components: {
      SelHeaderComponent
    },
    data () {
      return {
        // 查询条件
        search: {
          selHeaderList: [ // header可选项的初始化list
            {
              key: 'nameCn',
              label: '请输入目录的中文名称',
              showLabel: false,
              selType: 'input',
              width: 300
            },
            {
              key: 'nameEn',
              label: '请输入目录的英文名称',
              showLabel: false,
              selType: 'input',
              width: 300
            },
            {
              key: 'creator',
              label: '请输入创建人',
              showLabel: false,
              selType: 'input',
              width: 300
            }
          ],
          selHeaderModelObj: {} // model
        }
      }
    },
    created() {
      const obj = {}
      this.search.selHeaderList.forEach(td => {
        if (td.defaultValue) {
          obj[td.key] = td.defaultValue
        } else {
          obj[td.key] = ''
        }
      })
      this.selHeaderModelObj = obj
    }
  }
  </script>
  ```

* 组件内部

  * 根据数据遍历出所有表单
    * 将所有表单类型写出来，根据传入的数据判断哪个显示
    * 是否展示 label
    * 当前表单需要绑定的 v-model 变量名
    * 一些其他属性的传递
  * 表单上绑定的事件，使用 $emit 触发出来
  * v-model 的处理
    * 使用 prop value 接收传进来的 v-model 对象集合，并绑定到每个表单元素上。
    * 当值变化时，触发 @input 事件把组件上 v-model 对象集合传出去
      * 可以使用 @input 事件
      * 使用 watch

  ```vue
  <template>
    <div class="selHeaderWrap">
      <el-form :inline="true">
        <el-form-item
          v-for="(item,index) in selHeaderList"
          :key="index"
          :label="item.showLabel ? item.label : ''"
        >
          <el-input
            v-if="item.selType==='input'"
            v-model="value[item.key]"
            :placeholder="item.label"
            size="small"
            clearable
            @keyup.enter.native="submit"
            @clear="submit"
            :style="{width: item.width+'px'}"
            @input="input($event, item.key)"
          >
            <i slot="prefix" class="el-input__icon el-icon-search" />
          </el-input>
        </el-form-item>
      </el-form>
    </div>
  </template>
  <script>
  export default {
    props: {
      selHeaderList: {
        type: Array,
        default: () => []
      },
      value: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      submit (val) {
        this.$emit('submit', val)
      },
      input(e, key) {
        this.value[key] = e
        this.$emit('input', this.value)
      }
    }
  }
  </script>
  ```

select 的 options 的数据可以放在每个数据中，也可以像 modelObj 一样做一个映射。



### 拖拽表单组件

##### 需求

后台管理：左侧固定列表中有一些表单，例如文本框，下拉框。可以将这些表单元素拖拽到右侧的自适应的区域，将表单以原来的宽度放入一行，放不下换行。保存右侧的表单信息和顺序到后端。

用户界面：将来可以在用户端按顺序显示后台操作保存的表单。

##### 根据需求寻找适合的组件

先到 vue 社区搜索 drag 相关的组件。

根据需求最终筛选出的组件：

* vuedraggable 
* vue-smooth-dnd 
* vue-drag-and-drop-kanban 基于 cue-smooth-dnd
* vue-formbuilder 基于 vuedraggable

##### 设计思路

1. 首先要实现样式操作上的符合：两个列表之间的双向拖拽，能够满足自适应的两列布局，拖拽过去后一行显示超出换行并且保持元素拖拽之前的宽度。
2. 可以将内容也拖拽过去。
3. 可以记录右侧列表的所有元素和顺序。

##### 遇见的问题

单纯使用 vuedraggable 的双列表进行的拖拽

1. 内容是元素或组件的时候，元素和组件无法复制过去。需要封装一个组件，使拖拽和被拖拽的列表内容都使用这个组件进行渲染，配合 list 数据判断渲染的元素类型。
2. list 数据只能接收 name, id 两个内容，无法接收其他内容。

