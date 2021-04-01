## 过度 & 动画

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的过渡效果，Vue 会给我们一些钩子或者一些关键的样式来帮助我们实现，包括以下工具：

* 在 CSS 过渡和动画中自动应用 class
* 可以配合使用第三方 CSS 动画库，如 Animate.css
* 在过渡钩子函数中使用 JavaScript 直接操作 DOM
* 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

### CSS 过度动画

组件在进行显示的时候，transition 组件会为嵌套元素自动添加一些跟动画相关的类名称，这个类名称取决于你在 transition 组件上起的 name，所以我们使用这些类名称来做 css 过度动画就可以了。 

```html
<style> 
  /* 定义过度动画 */ 
  .fade-enter-active, .fade-leave-active { 
    transition: opacity .5s; 
  }
  .fade-enter, .fade-leave-to { 
    opacity: 0; 
  } 
  .fade-enter-to, .fade-leave { 
    opacity: 1; 
  } 
</style>

<script> 
  Vue.component('message', { 
    // 使用transition组件应用过度动画 
    template: ` 
			<transition name="fade"> 
				<div> /* 这个div元素上面将来就会动态的添加一些跟动画相关的类 */
  				...
  			</div>
  		</transition> 
		`, 
  })
</script>
```

#### 过度类名

![transition组件类名](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/Vue/transition组件类名.png)

1. v-enter ：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. v-enter-active ：定义进入过渡生效时的状态。在元素被插入之前生效，在过渡/动画完成之后移除。
3. v-enter-to : 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
4. v-leave : 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. v-leave-active ：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. v-leave-to : 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

### 使用 CSS 动画库

我们可以使用一些现成的像 animate.css 这样的动画库来制作更精美的动画效果。

animate.css 里面是有自己的动画类名称的，它跟 Vue 动态添加的类名称是不一样的，那我们怎么把它们结合起来呢，就是通过自定义 Vue 过度状态的类名的方式，这样我们设置的自定义的类名将来就会在相对应的 Vue 的六个过渡状态的时机代替原有的 Vue 的过度类名出现在需要做动画的元素上，就达到了使用第三方定义好的动画类名的效果。

结合 CSS 动画库，动画设计的过程就不需要操心了，只需要在合适的时间点把类名给它加上去或者移除就可以了。

引入animate.css

```html
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
```

transition 组件设置

```vue
<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
	<div> /* 将来这个元素上的类名会是这样 class="animated bounceIn v-enter-to" */
    ...
  </div>
</transition>
```

#### 自定义过度类名

他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 [Animate.css](https://daneden.github.io/animate.css/) 结合使用十分有用。

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)

### JavaScript 钩子

可以在 transition 属性中声明 JavaScript 钩子，使用JS实现动画。

```vue
<transition
  v-on:before-enter="beforeEnter" // 动画开始前，设置初始状态
  v-on:enter="enter" // 执行动画
  v-on:after-enter="afterEnter" // 动画结束，清理工作
  v-on:enter-cancelled="enterCancelled" // 取消动画
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
></transition>
```

#### 保留 CSS 中过度的部分，加上 JS 钩子做动画起始状态：

```html
<style>
	/* 定义过度动画 */ 
  .fade-enter-active, .fade-leave-active { 
    transition: opacity .5s; 
  }
  /* opacity修改不用css做 */
  /*
  .fade-enter, .fade-leave-to { 
    opacity: 0; 
  } 
  .fade-enter-to, .fade-leave { 
    opacity: 1; 
  } 
  */
</style>

<script>
Vue.component('message', {
  template: `
    <transition 
			@before-enter="beforeEnter" 
			@enter="enter"
			@before-leave="beforeLeave" 
			@leave="leave"
		>
      ...
    </transition>
  `,
	methods: {
    beforeEnter(el) {
    	el.style.opacity = 0 // 设置初始状态
    },
    enter(el, done) {
      document.body.offsetHeight; // 触发回流激活动画
      el.style.opacity = 1 // 设置结束状态
      el.addEventListener('transitionend', done) // 监听动画结束事件，并执行done函数
    },
    beforeLeave(el) {
    	el.style.opacity = 1 // 设置初始状态
    },
    leave(el, done) {
      document.body.offsetHeight; // 触发回流激活动画
      el.style.opacity = 0 // 设置结束状态
      el.addEventListener('transitionend', done) // 监听动画结束事件，并执行done函数
    }
  },
})
</script>
```

#### 纯js方案：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<script>
	Vue.component('message', {
    template: `
      <transition name="fade"
        :css="false" // 禁用css
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave">
      </transition>
    `,
    methods: {
      beforeEnter(el) {
        el.style.opacity = 0
      },
      enter(el, done) {
        Velocity(el, { opacity: 1 }, { duration: 500, complete: done })
      },
      beforeLeave(el) {
        el.style.opacity = 1
      },
      leave(el, done) {
        Velocity(el, { opacity: 0 }, { duration: 500, complete: done })
      }
    },
  })
</script>
```

### 列表过度

有时候列表中，条目的新增或删除也需要加入一些动画，这时候可以考虑列表过度的方式。

利用 transition-group 可以对 v-for 渲染的每个元素应用过度。

用 transition-group 包裹 v-for 的元素，最终 transition-group 会展开成 n 个 transition，每一个 transition 包裹着一个单独的 v-for 元素。

```vue
<transition-group name="fade">
  <div v-for="c in courses" :key="c.name">
    {{ c.name }} - ￥{{c.price}}
    <button @click="addToCart(c)">加购</button>
  </div>
</transition-group>
```



### 开发中的一些知识

#### 处理资源路径

当你在 JavaScript、CSS 或 *.vue 文件中使用相对路径 (必须以 . 开头) 引用一个静态资源时，该资源模块将被 webpack 处理，需要打包，给它起个合适的名字放到一个合适的地方去。

转换规则：

* 如果 URL 是一个绝对路径 (例如 /images/foo.png )，它将会被保留不变。

  ```vue
  <img alt="Vue logo" src="/assets/logo.png"> 
  <img alt="Vue logo" src="http://image.xx.com/logo.png">
  ```

* 如果 URL 以 . 开头会作为一个相对模块请求被解释并基于文件系统相对路径。

  ```vue
  <img alt="Vue logo" src="./assets/logo.png">
  ```

* 如果 URL 以 ~ 开头会作为一个模块请求被解析。这意味着你甚至可以引用 Node 模块中的资源：

  ```vue
  <img src="~some-npm-package/foo.png">
  ```

* 如果 URL 以 @ 开头会作为一个模块请求被解析。Vue CLI 默认会设置一个指向 src 的别名 @ 。

  ```js
  import Hello from '@/components/Hello.vue'
  ```

#### 何时使用 public 文件夹：

关于 public 里面存放素材的选择。

将来静态的资源会放到 public 里头，因为 public 会作为开发服务器的静态路径。这里的资源 webpack 是不会处理的，原封不动，位置和名字都不会变。

通过 webpack 的处理（相对路径）并获得如下好处：

* 脚本和样式表会被压缩且打包在一起，从而避免额外的网络请求。
* 文件丢失会直接在编译时报错，而不是到了用户端才产生 404 错误。
* 最终生成的文件名包含了内容哈希，因此你不必担心浏览器会缓存它们的老版本。

如下情况考虑使用 public 文件夹：

* 你需要在构建输出中指定一个固定的文件名字。
* 你有上千个图片，需要动态引用它们的路径。
* 有些库可能和 webpack 不兼容，除了将其用一个独立的 <script> 标签引入没有别的选择。

使用 public 文件夹的注意事项：

一般情况下，没有特别需要的话，别用这个 public，它会增添很多繁琐的使用。

* 如果你的应用没有部署在域名的根部，那么你需要为你的 URL 配置 publicPath 前缀

  ```js
  // vue.config.js 
  module.exports = { 
    publicPath: process.env.NODE_ENV === 'production' 
    	? '/cart/' 
    	: '/' 
  }
  ```

* 在 public/index.html 等通过 html-webpack-plugin 用作模板的 HTML 文件中，你需要通过 <%= BASE_URL %> 设置链接前缀：

  ```html
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
  ```

* 在模板中，先向组件传入 BASE_URL：

  ```js
  data () { 
  	return { 
  		publicPath: process.env.BASE_URL 
  	} 
  }
  ```

  然后：

  ```vue
  <img :src="`${publicPath}my-image.png`">
  ```

#### CSS

##### Scoped CSS

其原理是通过使用 PostCSS 来实现以下转换：

将来该组件下的所有元素和子组件的根元素上都会添加一个 date-v-xxx 这样的自定义属性，CSS 选择器也会加上这个属性去选择。

```vue
<template>
	<div data-v-f3f3eg9 class="red">hi</div>
</template>

<style>
  .red[data-v-f3f3eg9] {
    color: red;
  }
</style>
```

所以想要控制 scoped 的子组件的样式，父级也要加上 scoped，由于自定义属性会加载子组件的根元素上，所以只能控制子组件跟元素，不能穿透子组件去控制子组件里面的样式。

```vue
// app.vue
<template>
	<div id="app">
    <div class="red">hi</div>
		<hello></hello>
  </div>
</template>

<style scoped>
  #app {
    background-color: #ccc;
  }
  .hello { // 生效
		color: #fff;
  }
  .hello p { // 不生效
		color: #ddd;
  }
</style>
```

```vue
// hello.vue
<template>
	<div class="hello">
    <div class="red">hi</div>
		<p>hello</p>
  </div>
</template>

<style scoped>
  div {
    color: #333;
  }
</style>
```

深度作用选择器：使用 >>> 操作符可以使 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，在父级控制子组件里面的样式。必须配合 scoped 的 style 使用才能生效。

如果这个子组件是你自己写的，是没有必要使用这个深度选择器的，但是如果你用的是一个第三方的 UI 库，你是不太方便直接去修改别人的源码的，就可以使用这种方式穿透去改。

```vue
<style scoped>
  #app >>> a {
    color: red;
  }
</style>
```

Sass 之类的预处理器无法正确解析 >>> ，这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之

```vue
<style scoped lang="scss">
  #app {
    /deep/ a {
      color: rgb(196, 50, 140)
    }
    ::v-deep a {
      color: rgb(196, 50, 140)
    }
  }
  #app /deep/ a {
    color: rgb(196, 50, 140)
  }
  #app ::v-deep a {
    color: rgb(196, 50, 140)
  }
</style>
```

穿透原理：

```vue
// app.vue
<template>
  <div id="app">
    <hello></hello>
    <h3>标题</h3>
    <div>
      <p>afaf</p>
    </div>
  </div>
</template>

<style scoped>
.hello { // 生效
  border: 1px solid lime;
}
#app p { // 生效
  color: pink;
}
#app a { // 不生效
  color: #f60;
}
#app >>> a { // 生效
  color: red;
}
</style>
```

```vue
// hello.vue
<template>
  <div class="hello">
    <a>超链接</a>
  </div>
</template>

<style scoped>
.hello {
  width: 100%;
}
</style>
```

最终生成代码：

```html
// html
<div data-v-7ba5bd90 id="app">
	<div data-v-469af010 data-v-7ba5bd90 class="hello">
    <a data-v-469af010>超链接</a>
  </div> 
  <h3 data-v-7ba5bd90>标题</h3> 
  <div data-v-7ba5bd90>
    <p data-v-7ba5bd90>afaf</p>
  </div>
</div>
```

```css
// css
.hello[data-v-7ba5bd90] {
  border: 1px solid lime;
}
#app p[data-v-7ba5bd90] {
  color: pink;
}
#app a[data-v-7ba5bd90] {
  color: #f60;
}
#app[data-v-7ba5bd90] a {
  color: red;
}
```

##### CSS Module

如何用模块化的方式来写 CSS。CSS Modules 是一个流行的，用于模块化和组合 CSS 的系统。 vue-loader 提供了与 CSS Modules 的一流集成，可以作为模拟 Scoped CSS 的替代方案。它与 Scoped CSS 非常类似，但是又有不同。

添加 module

```vue
<style module lang="scss">
  .red {  
    color: #f00;
  }
  .bold {
    font-weight: bold;
  }
</style>
```

它不能在模版中直接去用，而会变成一个计算属性，会放到 $style 上，然后通过 $style.xx 去访问选择器。这些选择器将来会被动态的转换成很有特点的名字，来和其他的组件做区分。

这个有特点的名字的组成：文件名\_选择器本身名字\_hash，这种方式非常有利于项目规模扩大之后，它不会影响元素本身，它只会影响你最终类名的生成。而 Scoped CSS 的方式在元素上添加 data-v-hash 这样特殊的自定义属性，最终影响选择器。所以这是两种异曲同工的方式，显然这种方式更灵活一些。

```vue
<a :class="$style.red">awesome-vue</a>
<a :class="{[$style.red]:isRed}">awesome-vue</a>
<a :class="[$style.red, $style.bold]">awesome-vue</a>
```

因为 $style 是计算属性，所以在 JS 里头也可以访问，从而做一些你想做的逻辑操作：

```vue
<script>
  export default {
    created () {
      // -> "red_1VyoJ-uZ"
      // 一个基于文件名和类名生成的标识符
      console.log(this.$style.red)
    }
  }
</script>
```

#### 数据访问相关

##### 数据模拟

使用开发服务器配置 before 选项，可以编写接口，提供模拟数据。

```js
// vue.config.js
module.exports = {
  devServer:{
    before(app) {
      // app是一个express的实例
      // 这里就可以在express实例的上面添加一些你想要模拟的接口
      app.get('/api/courses', (req, res) => {
        // 做一个json的返回，这里如果想做一些网络延迟的模拟，可以做个定时器。
        res.json([{ name: 'web全栈', price: 8999 }, { name: 'web高级', price:8999 }])
      })
    }
  }
}
```

调用

```js
import axios from 'axios'

export function getCourses() {
  return axios.get('/api/courses').then(res => res.data)
}
```

##### 代理

设置开发服务器代理选项可以有效避免调用接口时出现的跨域问题。

```js
// vue.config.js
module.exports = {
	devServer: {
    // 将来项目发送一个请求，这个请求作为静态资源的处理的时候没有找到，就把它转发到代理服务器上去。
  	proxy: 'http://localhost:3000'
  }
}
```

```js
import axios from 'axios'

export function getCourses() {
  // 将来请求这个地址时，刚开始会假设这个地址是一个静态资源，先尝试去找一找，发现在整个静态资源里没有任何和它相匹			配的，这时开发服务器就会做一个选择，把它做转发，转发到我们配置的代理服务器上。
  return axios.get('/api/courses').then(res => res.data)
}
```

使用这个代理之后，我们打开浏览器的 network，看到请求的地址依然是 8080，并不是我们设置的代理服务器 3000 端口，其实这个并不奇怪，因为这个代理发生的地方是在 8080 服务器上，你是看不到的，所以对于浏览器来说，我们还是在请求本地的这个开发服务，然后开发服务再转发这个请求到代理 3000 端口服务，所以浏览器看不到 3000 端口服务器。