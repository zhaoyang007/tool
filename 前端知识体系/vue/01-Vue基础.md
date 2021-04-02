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

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的过渡效果，Vue 会给我们一些钩子或者一些关键的样式来帮助我们实现，包括以下工具：

* 在 CSS 过渡和动画中自动应用 class
* 可以配合使用第三方 CSS 动画库，如 Animate.css
* 在过渡钩子函数中使用 JavaScript 直接操作 DOM
* 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

##### CSS 过度动画

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

##### 使用 CSS 动画库

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

##### 自定义过度类名

他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 [Animate.css](https://daneden.github.io/animate.css/) 结合使用十分有用。

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)

##### JavaScript 钩子

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

##### 保留 CSS 中过度的部分，加上 JS 钩子做动画起始状态：

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

##### 纯js方案：

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

##### 列表过度

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

