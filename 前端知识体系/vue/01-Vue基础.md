### class 与 style 绑定

##### class

对象语法

```vue
<!-- 对象语法 -->
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
data {
  isActive: true,
  hasError: false
}
<!-- 数据对象放在 data 中 -->
<div v-bind:class="classObject"></div>
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
<!-- 数据对象放在计算属性 -->
<div v-bind:class="classObject"></div>
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

数组语法

```vue
<!-- 数组语法 -->
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
<!-- 三元表达式 -->
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
<!-- 数组语法中也可以使用对象语法 -->
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

##### style

对象语法

```vue
<!-- 对象语法 -->
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
<!-- 数据对象放在 data 中。也可以放在 computed 中。 -->
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
<!-- 三元表达式 -->
<div v-bind:style="{cursor: scatterHasData?'pointer':'not-allowed'}"></div>
```

数组语法

```vue
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```



### CSS

##### Scoped CSS

html 上该组件下的所有元素和子组件的根元素上都会添加上一个 date-v-xxx 的自定义属性，CSS 选择器也会加上这个属性去选择。

所以想要控制 scoped 的子组件的样式，父级也要加上 scoped，只能控制子组件跟元素，不能穿透子组件去控制子组件里面的样式。

深度作用选择器：使用 >>> 操作符，必须配合 scoped 的 style 使用才能生效。

预处理器无法正确解析 >>> ，可以使用 /deep/ 或 ::v-deep 操作符取而代之。

原理：

```vue
<!-- 父组件 -->
<div class="father">
  <h1>父组件</h1>
  <son />
</div>
<style lang="scss" scoped>
h1 {
  color: skyblue;
}
.father {
  /deep/ h2 {
    color: bisque;
  }
}
</style>
<!-- 子组件 -->
<template>
  <div class="son">
    <h2>子组件</h2>
  </div>
</template>
<style scoped lang="scss">
h2 {
  color: red;
}
</style>

<!-- 最终生成的代码 -->
<div data-v-fae5bece class="father">
	<h1 data-v-fae5bece>父组件</h1>
	<div data-v-469af010 data-v-fae5bece class="son">
		<h2 data-v-469af010> 子组件</h2>
  </div>
</div>
<style>
h1[data-v-fae5bece] { // scope 原理
  color: skyblue;
}
.father[data-v-fae5bece] h2 { // 穿透原理
  color: bisque; 
}
h2[data-v-469af010] {
  color: red; // 没生效
}
</style>
```

##### CSS Module

css-loader 的 modules 设置为 true 就会将我们写的 class 改掉，然后当你引入 css 文件模块的时候，它会给你返回一个 class 的列表，这个列表就是原来的 class 跟编译之后的 class 名字的对应关系。

```js
import styles from "./style.css";
// import { className } from "./style.css";

element.innerHTML = '<div class="' + styles.className + '">';
```

选择器不能在模版中直接使用，而会把所有的选择器放到计算属性 $style 里，然后通过 $style.xx 去访问选择器。选择器会被动态的转换成很有特点的名字，来和其他的组件做区分。

生成的选择器：文件名\_选择器本身名字\_hash。它不会影响元素本身，只会影响你最终类名的生成。

选择器权重相同的情况下，父组件的样式会覆盖子组件的样式。

```vue
<template>
	<div>
    <a :class="$style.red">awesome-vue</a>
    <a :class="{[$style.red]:isRed}">awesome-vue</a>
    <a :class="[$style.red, $style.bold]">awesome-vue</a>
  </div>
</template>
<style lang="scss" module>
  .red {  
    color: #f00;
  }
  .bold {
    font-weight: bold;
  }
</style>
<script>
  export default {
    created () {
      // $style 是计算属性，所以在 JS 里也可以访问，从而做一些你想做的逻辑操作：
      console.log(this.$style.red)
    }
  }
</script>
```



### 过度 & 动画

在插入、更新或者移除 DOM 时，使用 transition 组件做过渡或动画。

过渡和动画的过程都是设置在 active 上的。v-enter/v-leave/v-enter-to/v-leave-to 都是设置初始或结束状态的，可以没有。

css 方式是通过过渡类名，js 方式是通过钩子函数。

在下列情形中，可以给任何元素和组件添加进入/离开过渡

- 条件渲染 (使用 `v-if`)
- 条件展示 (使用 `v-show`)
- 动态组件
- 组件根节点

##### transition 组件基础使用

transition 组件会为嵌套元素自动添加跟动画相关的类名称，使用这些类名称来做 css 过度动画就可以了。

1. 过渡被触发时，马上加 v-enter/v-leave 和 v-enter-active/v-leave-active。
2. 下一帧马上移除 v-enter/v-leave，然后添加 v-enter-to/v-leave-to。
3. 动画结束后移除 v-enter-active/v-leave-active 和 v-enter-to/v-leave-to。

```vue
<template>
	<transition name="fade"> 
    <div></div>
  </transition> 
</template>

<style> 
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
```

##### 结合 CSS 动画库

通过自定义过度类名，使用第三方定义好的动画。

自定义过度类名：

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)

```html
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
```

```vue
<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
	<div></div>
</transition>
```

##### JavaScript 钩子

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

保留 CSS 中过度动画的部分，加上 JS 钩子做动画起始状态：

```html
<style>
  .fade-enter-active, .fade-leave-active { 
    transition: opacity .5s; 
  }
</style>

<template>
	<transition 
		@before-enter="beforeEnter" 
		@enter="enter"
		@before-leave="beforeLeave" 
		@leave="leave">
  	<div></div>
  </transition>
</template>

<script>
export default {
	methods: {
    beforeEnter(el) {
    	el.style.opacity = 0; // 设置初始状态
    },
    enter(el, done) {
      document.body.offsetHeight; // 触发回流激活动画
      el.style.opacity = 1; // 设置结束状态
      el.addEventListener('transitionend', done); // 监听动画结束事件，并执行done函数
    },
    beforeLeave(el) {
    	el.style.opacity = 1; // 设置初始状态
    },
    leave(el, done) {
      document.body.offsetHeight; // 触发回流激活动画
      el.style.opacity = 0; // 设置结束状态
      el.addEventListener('transitionend', done); // 监听动画结束事件，并执行done函数
    }
  },
}
</script>
```

纯js方案：

```html
<template>
	<transition name="fade"
		:css="false" // 禁用css
    @before-enter="beforeEnter"
    @enter="enter"
    @before-leave="beforeLeave"
    @leave="leave"></transition>
</template>

<script>
import "https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js";
export default {
	methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      Velocity(el, { opacity: 1 }, { duration: 500, complete: done });
    },
    beforeLeave(el) {
      el.style.opacity = 1;
    },
    leave(el, done) {
      Velocity(el, { opacity: 0 }, { duration: 500, complete: done });
    }
  },
}
</script>
```
