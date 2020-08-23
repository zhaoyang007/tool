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



## 可复用性

### 过滤器

Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：

```js
{{ c.price | currency('RMB') }} 
// 局部方式
filters: { 
  currency(value, symbol = '￥') { 
    return symbol + value; 
  } 
}
// 全局方式
Vue.filter('currency', function(value, symbol = '￥') {
  // 工厂函数，接收一个值返回一个值
  return symbol + value; 
})
```

### 自定义指令

除了核心功能默认内置的指令 ( v-model 和 v-show )，Vue 也允许注册自定义指令。在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，仍然需要对普通 DOM 元素进行底层操作的复用功能的时候，就会用到自定义指令。因为 Vue 的设计理念是数据驱动，一般情况下尽量不要直接接触底层 DOM 操作，如果要做那最好用自定义指令的方式去做这件事情。

范例：输入框获取焦点

```js
Vue.directive('focus', { 
	inserted(el) { 
    el.focus() 
  } 
})
```

```vue
<input v-focus>
```

自定义指令钩子函数：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)
- componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。`
- `unbind`：只调用一次，指令与元素解绑时调用。

钩子函数参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM。
- binding：一个对象，包含以下 property：
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

### 渲染函数

渲染函数的主要作用是在将来程序进行更新的时候，它再次执行，从而得到最新的虚拟 DOM，

Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用渲染函数，它比模板更接近编译器。

#### 渲染函数函数签名

```js
// render函数接收一个参数createElement叫创建元素，createElement函数会返回VNode称为虚拟DOM，这个元素就是一	 个原生的JS对象，可以描述我们的DOM结构，将来在后续的虚拟DOM的比对中来产生它的作用。
render: function (createElement) {
  return createElement(
    tag,     // 标签名称，组件名字，组件配置对象，组件构造函数
    data,    // 传递属性
    children // 子节点数组
  )
}
```

使用 render 方法实现 heading 组件：

```js
Vue.component('heading', { 
  props: ['level', 'title'], 
  render(h) { // Vue虚拟DOM在底层使用的算法叫snabdom，这个算法里生成虚拟DOM的方法就叫h
    // 返回createElement返回的VNode
    return h( 
      'h' + level,        // 参数1：tagname
      										// 参数2：Vue有一个默认行为，如果属性你没处理，会把所有组件上传递的属性动态的移到																	 组件内部的根结点上。
      this.$slots.default // 参数3：子节点VNode数组
    ) 
  } 
})
```

```vue
<heading :level="2" :title="title">{{title}}</heading>
```

### 虚拟 DOM

虚拟 DOM 到底是什么，它是怎样的一个结构。

Vue 通过建立一个虚拟 DOM 来追踪自己要如何改变真实 DOM。虚拟 DOM 就是真实 DOM 的一个映射，用来描述真实 DOM，更轻量，更快速。

它的结构是通过一些属性来描述它将来到底是一个什么样的节点，VNode 本身是一棵树，和真实的 DOM 树是对应的。将来通过一些算法把这个 VNode 转换成真实的 DOM 结构，这就是虚拟 DOM 的核心思想了。我们比较熟悉的 diff 算法将来也是主要在这上面进行的。

范例：输出虚拟 DOM 观察其结构：

```js
const vnode = h( 
  'h' + level, 
  { attrs: { title: this.title } }, // 之前省略了title的处理 
  this.$slots.default 
)
console.log(vnode);
```

### createElement 参数

接下来你需要熟悉的是如何在 createElement 函数中使用模板中的那些功能。这里是 createElement 接受的参数：

```js
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  'div',
  // {Object}
  // 一个与模板中属性对应的数据对象。可选。
  {
    // (详情见下一节)
  },
  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

深入数据对象

有一点要注意：正如 `v-bind:class` 和 `v-bind:style` 在模板语法中会被特别对待一样，它们在 VNode 数据对象中也有对应的顶层字段。该对象也允许你绑定普通的 HTML attribute，也允许绑定如 `innerHTML` 这样的 DOM property (这会覆盖 `v-html` 指令)。

```js
{
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
```

范例：处理 title、添加 icon：

```js
Vue.component('heading', { 
  props: ['level', 'title', 'icon'], 
  render(h) { 
    // 子节点数组
    let children = []; 
  	// 添加图标功能 
    // <svg><use xlink:use="#icon-xxx"></use></svg> 
    if (this.icon) { 
      children.push(h( 
        'svg', 
        { class: 'icon' }, 
        [ h('use', { attrs: { 'xlink:href': '#icon-' + this.icon } }) ]
      )) 
    }
    children = children.concat(this.$slots.default) 
    vnode = h( 
      'h' + level, 
      { attrs: { this.title } }, // 之前省略了title的处理 
      children 
    )
    console.log(vnode); 
   	return vnode 
	} 
})
```

### 函数式组件

组件没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法时，可以将组件标记为 functional ，这意味它无状态（没有响应式数据），也没有实例（没有 this 上下文），这样它就更加轻量了，消耗资源会更少，这是一种优化手段。

```js
Vue.component('heading', { 
  functional: true, // 标记函数式组件 
  props: ['level', 'title', 'icon'], 
  render(h, context) { // 上下文传参 
    let children = []; 
    const {icon, title, level} = context.props // 属性获取 
    if (icon) { 
      children.push(h( 
        'svg',
        { class: 'icon' }, 
        [h('use', { attrs: { 'xlink:href': '#icon-' + icon } })]
      ))
   	}
    children = children.concat(context.children) 
    vnode = h( 
      'h' + level, 
      { attrs: { title } }, 
      children 
    )
    console.log(vnode); 
    return vnode 
  } 
})                                                       
```

### 混入

关于可复用性的一个重要特性叫混入，它是一种设计模式。

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。比如在一个组件中有一个方法，这个方法它很常用，除了当前组件，另外的几个组件也会用到，这时就可以把这个方法单独的提取出来放到一个公用的地方，将来大家想用的时候把它注入进来，然后直接使用。

混入是一种非常重要的组件扩展和逻辑复用的一种方式。

一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

mixin 在以后插件的开发和源码的学习中会多次的见到。

```js
// 定义一个混入对象 
var myMixin = { 
  created: function () { 
    this.hello() 
  },
  methods: { 
    hello: function () { 
      console.log('hello from mixin!') 
    } 
  } 
}
// 定义一个使用混入对象的组件 
Vue.component('comp', { 
  mixins: [myMixin] 
})
```

#### 选项合并

当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。

详情见文档。

### 插件

插件是 Vue 扩展的终极方案，我们前面说的像自定义指令、自定义组件、自定义过滤器、自定义混入等等所有这些东西，其实不适合去分发，就是需要把这些东西放到 github、npm 上想要发给别人，让别人去用最佳的方式应该是用插件的形式来组织，因为插件是最安全、最好、最有效的方式。别人引入的时候如果重复引也可以有效的规避，而且在插件里也可以很好的组织这些上述说到的复用功能。

我们平常用到的 vue-router、vuex 都是典型的插件。

插件通常用来为 Vue 添加全局功能，插件的功能范围一般有下面几种：

1. 添加全局方法或者属性。如: vue-custom-element
2. 添加全局资源：指令/过滤器/过渡等。如 vue-touch
3. 通过全局混入来添加一些组件选项。如 vue-router
4. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router

#### 插件声明

Vue.js 的插件应该暴露一个 install 方法，这个 install 方法将来会被 Vue 的构造函数去调用，就可以有效的和 Vue 进行交互了，这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。

在 install 方法里面我们就可以做很多事情了。

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {}
  // 2. 添加全局资源
  Vue.directive('my-directive', {})
  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
  })
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {}
}
```

#### 插件使用

使用 Vue.use 即可引入插件

```js
Vue.use(MyPlugin)
```

范例：修改heading组件为插件

```js
const MyPlugin = {
	install (Vue, options) {
		Vue.component('heading', {...})
	}
}
if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(MyPlugin)
}
```



## 工程化

### Vue Cli

Vue Cli 是一个脚手架的工具。cli 的全称是 command line interface 命令行的接口，通过这个命令行的接口我们可以执行一系列的自动化的方式来创建、管理项目。是我们平常开发项目所必须的，我们需要它最重要的原因是我们自己写的项目太缺乏一些系统性的工程化管理了。

#### 快速原型开发

当你不需要创建一个大型项目，只是想很快的看到一个用 Vue 的方式去写的一个组件它最终生成的样子给你的领导或客户去看。用这种方式就最佳不过了。它是最快速的开发页面组件原型的方式。

安装 @vue/cli-service-global 扩展

```bash
npm install -g @vue/cli-service-global
```

然后你就可以使用 vue serve 和 vue build 命令对单个 *.vue 文件进行快速原型开发。vue serve 是运行效果，vue build 是打包。

准备一个内容原型 Hello.vue。

启动一个服务并运行原型。

```bash
vue serve Hello.vue
```

#### 创建项目

我们现在要真正的开发一个完整项目，我要创建一个新的基于 Vue 的项目。

使用 vue create 创建一个 Vue 项目：

这时候命令行的接口工具会提供一系列的问题让你去回答，主要是一些项目的选项。这些选项都选完后，就会经历项目的基本结构的创建和依赖的安装的过程，需要等上几分钟时间。

所有的配置文件会在 package.json 来组织。

```bash
vue create my-vue-test
```

图形化项目管理

有一个有用的功能就是可以输出 webpack 配置，因为 vue-cli3.0 开始我们已经完全看不到 webpack 配置了。

```bash
vue ui
```

##### vue-cli 2.x（对应的是 webpack3.x）

* npm install -g vue-cli 安装
* vue init webpack my-project 新建基于webpack模版的新项目
* npm install 安装项目依赖
* 搞定，可以进行项目开发了

#### Vue CLI 插件

Vue CLI 使用了一套基于插件的架构，插件可以修改 webpack 的内部配置，也可以向 vue-cliservice 注入命令，插件的架构可以很方便的扩展一些功能。在项目创建的过程中，绝大部分列出的特性都是通过插件来实现的。 

在现有的项目中安装插件：

如果你想在一个已经被创建好的项目中安装一个插件，可以使用 vue add 命令。路由、状态管理、UI 库等都需要用这种插件的方式去安装。

```bash
vue add router
```

这种方式安装，插件本身可能对你的项目产生破坏性的结构上的变更，甚至是文件的修改，它可能破坏掉你文件中所有的代码结构，因为它这次的修改一定要满足它安装的插件能够顺利的跑起来，不会管你原来的代码的，你的代码如果跟新安装的插件有冲突，那它会把你的代码全部干掉。所以在做这个操作的时候，要保留你之前的代码版本。 

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

#### CSS 相关

##### 使用预处理器

如果创建项目时没有选择需要的预处理器（Sass/Less/Stylus），则需手动安装相应 loader。

```bash
# Sass 
npm install -D sass-loader node-sass 
# Less 
npm install -D less-loader less 
# Stylus 
npm install -D stylus-loader stylus
```

范例：App.vue 修改为 Sass

```vue
<style scoped lang="scss"> 
  $color: #42b983; 
  a { 
    color: $color; 
  } 
</style>
```

##### 自动化导入样式

CSS 预处理器中的变量等希望作为一个通用的东西单独抽出来放到一个地方方便配置和修改。这时候就需要自动化导入样式文件（用于颜色、变量、mixin等），使用 style-resources-loader，用它去加载一些全局的配置就行了。

```bash
npm i -D style-resources-loader
```

创建通用样式文件 src/styles/imports.scss：

```scss
$color: #42b983; 
```

配置

我希望将来有一个 loader 可以在每次启动的时候，自动的把这个样式通用文件加载到使用的地方，这样我就能直接用了。

```js
// vue.config.js 
const path = require('path') 

function addStyleResource(rule) { 
  rule.use('style-resource') 
    	.loader('style-resources-loader') 
    	.options({ 
    		patterns: [ 
          path.resolve(__dirname, './src/styles/imports.scss')
        ]
  		})
}

module.exports = { 
  chainWebpack: config => { 
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'] 
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type))) 
  } 
}
```

##### Scoped CSS

有时我们在写一个组件的时候，希望它的样式仅仅作用于当前组件。

在 \<style> 标签加上 scoped 属性时，它的 CSS 只作用于当前组件中的元素。

```vue
<style scoped>
  .red {
    color: red;
  }
</style>
```

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

全局和局部样式可以混用，分别写到两个 style 标签里，最后在 head 里会生成两个独立的 style 标签。

```vue
<style>
  /* 全局样式 */
</style>

<style scoped>
  /* 当前组件样式 */
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