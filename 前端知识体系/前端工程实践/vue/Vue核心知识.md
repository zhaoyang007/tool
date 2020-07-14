## 模版语法

Vue 使用基于 HTML 的方式来声明页面的样式，同时可以把我们在 Vue 中声明的数据 data 动态的展示在界面中，这就是模版语法。

### 差值文本

数据绑定最常见的形式就是使用 “Mustache” 语法 (双大括号) 的文本插值。

HTML 特性不能用 Mustache 语法，应该使用 v-bind 指令。

```vue
{{}} v-bind: v-once v-text v-html
```

### 列表渲染

v-for

### 条件渲染

```vue
v-if v-else v-else-if v-show
```

### 表单输入绑定

你可以用 v-model 指令在表单 <input> 、 <textarea> 及 <select> 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。 v-model 本质上是语法糖。它将转换为输入事件以更新数据，并对一些极端场景进行一些特殊处理。

### 事件处理

可以用 v-on 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。

事件修饰符。

### class 与 style 绑定

操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以我们可以用 v-bind 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 v-bind 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组，对象的方式更常用。

### 模版和函数渲染

模版语法是如何实现的。

我们编写的模版，看起来像 HTML 代码的内容它到底是什么呢。

实际上，将来 Vue 会将我们编写的这些模版转换成渲染函数，渲染函数最终的目标是要为了能够生成虚拟 DOM，再结合着 Vue 的响应式系统，Vue 就能够根据将来值发生变化之后，再次执行渲染函数，得到一个全新的虚拟 DOM，在新旧虚拟 DOM 之间经过比对，就可以知道我们真正要做的 DOM 操作。

这个渲染函数将来执行之后，它能够 return 一个结果，return 的这个结果就是虚拟 DOM。

```js
// 输出vue替我们生成的渲染函数一窥究竟 
console.log(app.$options.render)

// 它长这个样子 
(function anonymous( ) { with(this){return _c('div',{attrs:{"id":"app"}},[_c('h2',{attrs: {"title":title}},[_v("\n "+_s(title)+"\n ")]),_v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value: (course),expression:"course"}],attrs:{"type":"text"},domProps:{"value": (course)},on:{"keydown":function($event) {if(!$event.type.indexOf('key')&&_k($event.keyCode,"enter",13,$event.key,"Enter" ))return null;return addCourse($event)},"input":function($event) {if($event.target.composing)return;course=$event.target.value}}}),_v(" "),_c('button',{on:{"click":addCourse}},[_v("新增课程")]),_v(" "),(courses.length == 0)?_c('p',[_v("没有任何课程信息")]):_e(),_v(" "),_c('ul',_l((courses),function(c){return _c('li',{class:{active: (selectedCourse === c)},on:{"click":function($event){selectedCourse = c}}}, [_v(_s(c))])}),0)])} })
```

改写为渲染函数版本：

```js
const app = new Vue({ 
  // 引入上面的render函数 
  render() { 
    with (this) { return ... } 
  } 
})
```

所以实际上我们在编写模版的时候其实我们不是在写 HTML，在 Vue 的内部其实是把它转换成了一个 JS 的函数，这个才是真正的模版技术的工作机制。



## 计算属性和监听器

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护，此时就可以考虑计算属性和监听器。

计算属性具有缓存性：计算所得的值如果没有变化不会重复执行，页面不会重新渲染。其实计算属性里的逻辑挪到methods 里面也是可以实现的，但是不管这个值有没有变化，每次都会重新计算。

默认情况下 watch 在初始化时不执行，监听的值变了才执行，想要初始化时执行，要使用带选项的 watcher。

区别：

* 简洁性，且计算属性具有缓存性。所以实际开发中，如果能用 computed 实现就用 computed。
* 从语境上说
  * computed：一个值是由其他值得来的，这些值变了这个值也要变，适合做多个值影响一个值的情形。
  * watch：一个值变化了，我要做一些事情，适合做一个数据影响多个数据的情形。
* 监听器选项提供了更通用的方法，适合执行异步操作或较大开销操作的情况。



## 生命周期

每个 Vue 实例在被创建时都要经过一系列的过程。例如，初始化、更新过程、销毁过程、需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等，这一系列的过程统称为 Vue 实例的生命周期。

### 生命周期钩子

既然组件它将来要实例化，它会有生命周期，那么为了我们方便去写程序，Vue 为我们准备了一些叫做生命周期钩子的函数。可以在组件的选项中按照它规定的名字直接去写就可以了。

* created：组件实例已创建，它自己的所有的数据以及父组件传下来的所有数据都可以访问到了。由于没有挂载，所以当前这些数据还没有转换成真实的 DOM 元素，DOM 元素还不存在。
* mounted：mounted 的时间点更靠后，它做了挂载，挂载实际上做的操作是将所有渲染函数执行之后得到的虚拟 DOM 转换成真实 DOM。所以 mounted 里已经可以访问到 DOM 元素了。

created 到 mounted 的这个过程是很快的，所以 ated 和 mounted 本质上是没有差别的。

### 使用场景分析

生命周期分为三阶段：初始化、更新、销毁。

* 初始化：beforeCreate、created、beforeMount、mounted
* 更新：beforeUpdate、updated
* 销毁：beforeDestroy、destroyed

### 探讨生命周期

#### 生命周期图示

* new Vue()：我们 new Vue 的时候创建了整个应用程序的根实例。
* 初始化 事件&生命周期：接下来是一系列子组件和子实例的创建和挂载，首先要做的事情是一些数据的准备，包括事件的监听和生命周期等，这个生命周期主要是一些特别的属性的创建，像老爹的引用 $parent，孩子的引用 $children 等等一些跟生命有关的，因为出生了就肯定知道老爹是谁了，但是还不知道孩子是谁，但是这些变量的初始化已经做好了。
* beforeCreate：接下来是 beforeCreate 这个生命周期钩子，这个时间点是非常早的，所以我们开发项目的过程中，可能很少会用到它。
* 初始化 注入&校验：这是一些数据的传入，在这个阶段会有一些来自父组件注入的特别的数据，父辈祖辈传过来的，Vue 还做了一些相关的校验工作，比如说这些数据有没有冲突，跟我组件当前的 data 或 props 有没有冲突。
* created：这些所有数据全部准备就绪了，才会 created。所以我们平时获取异步数据为什么要放到这呢，因为现在所有数据都准备好了，特别安全合理可靠。于情于理都应该写在这。所以这获取异步数据就挺合适的。
* 接下来会执行挂载逻辑，这是 Vue 内部去执行的，大家不用去关心，我们只要找着这个宿主了，把当前这个数据结合着我写的模版变成 DOM，就算完成了，完成之后呢，就要执行挂载，其实是 DOM 的追加操作了。我希望把我的内容追加到宿主元素上。
* beforeMount：在执行一些列的转换过程之前，会先 beforeMount 一下，通知一下我准备去干这个事了，但现在实际上还没有开始做转换。
* mounted：当我把转换的事情都做完后，vm.$el 就是这个 DOM 元素已经转换完成了，它转换完成后会触发 mounted，会通知用户现在已经可以访问 DOM 了，可以放心的访问和更新 DOM 了。到这挂载是完毕的，初始化流程结束了。
* beforeUpdate：只要这个组件不死，不被删除掉，那它就处于这个循环过程，就不停的监控数据的更新，一旦数据发生更新，准备做更新之前，先 beforeUpdate。
* updated：等我把所有的更新操作做完，DOM 操作更新完了，再通知用户 updated。如果你要再更新之前，想记录一下状态，你要在 beforeUpdate，反之，你要希望看到更新之后的结果，你要在 updated 这个钩子里面去做事情。
* beforeDestory：如果用户手动的去调 $detory() 去销毁当前的组件实例，也不是立刻销毁，在销毁之前给用户一个机会再做点事，这里还可以访问组件实例，比如把程序中的定时器销毁掉，解除一些绑定，销毁子组件，事件监听等等一系列可能造成内存泄露的东西把它先解除掉，防止出问题。
* destoryed：真正销毁完毕的事件是这个 destoryed，这个时候组件实例都没有了，灰飞烟灭。

![Vue生命周期图示](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/Vue/Vue生命周期图示.png)

#### 生命周期列表

除了上面的生命周期图示的理解，我们还要完整的掌握生命周期列表。在 API 中，关于生命周期会有一个详细的列表展示。[生命周期图示](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

### 生命周期钩子使用场景分析

一般情况下，这些带 before 的，我们在实际开发中用的都会少。因为在这些 before 的状态中，要么数据还没准备好，要么元素还没准备好，总是少了那么点东西。

```js
{
  beforeCreate(){} // 执行时组件实例还未创建，这个时间点非常之早，各种各样的数据还不齐全，所以大家在做操作的时候，不要随意的访问各种各样的数据，可能根本就访问不到，通常用于插件开发中执行一些初始化任务
  created(){} // 组件初始化完毕，各种数据可以使用，常用于异步数据获取
  beforeMounted(){} // 未执行渲染、更新，dom未创建
  mounted(){} // 初始化结束，dom已创建，可用于获取访问数据和dom元素
  beforeUpdate(){} // 更新前，可用于获取更新前各种状态，比如有一个列表更新了，你要记录它更新之前滚动条的位置，显然是在这个时候去保存是最合理的。
  updated(){} // 更新后，所有状态已是最新，得到上列滚动条最新的高度，位置可能都有变化，这个时候可以做一些更新之后的操作。
  beforeDestroy(){} // 销毁前，可用于一些定时器或订阅的取消，防止内存泄露，这个时候组件实例还在
  destroyed(){} // 组件已销毁，作用同上，组件实例已经不在了
}
```



## 组件化基础

组件化就是把我们应用程序中的一些比较独立的功能的模块或者单元，把它抽取出来，然后把它封装成组件。就像工程化过程中的一些零件。搭积木时候积木的零件。以后在开发后续程序的过程中，维护，复用都会得到进一步的提升。

官方对组件的定义：组件是可复用的 Vue 实例，带有一个名字，我们可以在一个通过 new Vue 创建的 Vue 根实例中，把这个组件作为自定义元素来使用。

### 组件的注册、使用及数据传递

Vue.component(name, options) 可用于注册组件。

props 用于接收数据。

template 用于编写组件模版。

### 自定义事件及其监听

当子组件需要和父级组件进行通信，可以派发并监听自定义事件。

公用的状态放在父组件。

### 在自定义组件上使用双向数据绑定

v-model 是一个语法糖，v-model 最终会转换成一个属性的传递 :value="values" 和一个事件的监听 @input="onInput"。

onInput 回调函数里具体的逻辑是，将内部派发事件传递的那个最新的要变更的值赋值给 values，就是 @input = "values=$event"，$event 是固定的名字，表示传递出来的参数，把它赋值给当前的 values 变量。

```vue
<course-add v-model="values"></course-add> 
// 相当于：
<course-add :value="values" @input="values=$event"></course-add>
```

在组件的内部，要做的事情是，接受一个属性叫 value 和派发一个默认的 input 事件，把最新的值作为参数传递出来。

```js
Vue.component('course-add', {
	props: ['values'],
  template: `
		<div>
			<!-- 需要实现input的:value和@input --> 
			<input :value="values" @input="onInput"/> 
		</div> 
	`,
	methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
})
```

非自定义组件和表单元素的 v-model 做的事是一样的，只不过组件内部做的事 Vue 已经在绑定了 v-model 的表单元素上做好了。所以在表单元素上使用数据双向绑定只需写一个 v-model 就行了。

### 插槽

在开发的过程中，我们经常会遇到一些这样的需求，比如说一个对话框要去组件化，这个对话框的内容在用的时候是在父组件中去指定的，但是这块内容将来是要把它显示在子组件内部的，这个就是内容分发。在外面去提供内容，将来分发到里面的指定位置，这就是内容分发技术。

Vue 中组件的内容分发，我们用的是插槽，这个名字非常的形象，我留出这个位置，内容实际上是不确定的，通过父组件传递过来，我用插槽来接收。

**普通插槽**

```vue
<message :show.sync="show">新增课程成功！</message>
```

```js
// slot作为占位符 
Vue.component('message', { 
  props: ['show'], 
  template: ` 
		<div class="message-box" v-if="show"> 
			<slot></slot> 
			<span class="message-box-close" @click="$emit('update:show', false)">X</span>
		</div>
	`
})
```

sync 修饰符：为了写法更简洁。:show.sync="isShow" 将来会展开成 :show="isShow" @update:show="show=$event" 的形式。所以将来子组件要派发的事件就是 update:show。

**如果存在多个独立内容要分发，可以使用具名插槽，把指定的内容放到指定的位置。**

```vue
<message :show.sync="show"> 
  // 通过template的方式
	<template v-slot:title>
		<h2>恭喜</h2>
  </template> 
  <template>新增课程成功！</template> 
</message>
```

```js
Vue.component('message', { 
  props: ['show'], 
  template: ` 
		<div class="message-box" v-if="show"> 
			<strong><slot name="title">默认标题</slot></strong>
			<slot></slot> 
		</div>
	`
})
```

**作用域插槽： 数据值来自于子组件内部还是父组件。**

```vue
<message :show.sync="show"> 
  // 通过template的方式
	<template v-slot:title="slotProps">
		<h2>{{slotProps.title}}</h2>
  </template> 
  <template>新增课程成功！</template> 
</message>
```

```js
Vue.component('message', { 
  props: ['show'],
  template: ` 
		<div class="message-box" v-if="show"> 
			<slot name="title" title="来自message的标题">默认标题</slot>
			<slot></slot> 
		</div>
	`
})
```

### Vue 组件化探讨

Vue 应用就是由一个个组件构成的。Vue 的组件化涉及到的内容非常多。

组件化是 Vue 的最精髓的特性，也是体现使用 Vue 的熟练程度，精通程度的一个非常重要的参考。于是在面试的过程中经常被问到：谈一下你对 Vue 组件化的理解，这时候有可能无从下手，组件化这个问题很大，怎么能够把它具体的落地去回答到这个问题中，可以从以下几点进行阐述，由浅入深来说：

* 首先遵循的原则是先要介绍下组件化含义是什么：组件是可复用的 Vue 实例，准确讲它们是 VueComponent 的实例，继承自 Vue。

* 组件化其实是软件工程中的一些原则性的践行，软件工程中一个最重要的原则就是**高内聚，低耦合**，从而增强程序的复用性，可维护性，可测试性，这些优点在 Vue 程序中就是用组件化去实现的。

* 组件化的使用场景：什么时候使用组件？组件用到什么地方去？以下分类可作为参考：

  * 通用组件：实现最基本的功能，具有通用性、复用性，例如按钮组件、输入框组件、布局组件等，类似 elementUI 等组件库的功能，这些组件库共同的特点是基本上就是最小的功能单元了，不可能再区分了。
  * 业务组件：它们完成具体业务，具有一定的复用性，例如登录组件、轮播图组件。可以把这些通用组件做一个有机的组合来完成一个功能。
  * 页面组件：组织应用各部分独立内容，需要时在不同页面组件间切换，例如列表页、详情页组件

* 如何使用组件

  * 定义：全局定义 Vue.component()，局部定义 components 选项，sfc
  * 分类：有状态组件，functional（函数式组件，无状态组件），abstract（抽象组件，完成一些特定的功能，它不管视图，可能实现一个特别的逻辑控制，逻辑功能，比如一个防抖组件，keep-alive，transition 加上这些组件去包装）
  * 组件化过程中一些常见的通信手段：props，$emit()/$on()，provide/inject，$children/$parent/$root/$attrs/$listeners
  * 内容分发：<slot>，<template>，v-slot
  * 使用及优化：动态组件 is，keep-alive，异步组件

* 组件的本质

  组件到底是什么，组件的本质是什么，组件最终的输出目标是什么。

  Vue 中的组件经历如下过程：

  组件配置 => VueComponent 实例 => render() => Virtual DOM => DOM

  所以组件最终的输出目标是虚拟 DOM。

  组件大家平常写的只是配置对象，但是这个过程中 Vue 内部到底做了什么事情呢，是中间这三步，大家看不到的，因为你写了配置最后希望看到 DOM，但实际上 Vue 内部为你做了三件事。

  * 首先它把你写的组件配置转换成了 VueComponent 实例。
  * 实例里面会有 render 方法，render 方法是我们写的模版转换的，render 方法在合适的时间去执行获得虚拟 DOM。
  * 虚拟 DOM 又通过更新的过程转换成真实 DOM。

  所以隐藏在 Vue 内部的这个过程你应当知道。

  最后我们需要知道组件的本质就是产生虚拟 DOM。



## Vue 必会 API 盘点

### 数据相关 API

#### Vue.set

后续动态的向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。

使用方法： Vue.set(target, propertyName/index, value)

#### Vue.delete

动态的删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。

使用 delete obj['property'] 这种方式删除的时候，我们定义的拦截器是无法拦截到的，所以导致这样删除，最终界面中是不会响应的。

使用方法： Vue.delete(target, propertyName/index)

#### vm.$set vm.$delete 这两个同名的实例方法是上面两个方法的别名。

### 事件相关 API

#### vm.$on

监听当前实例上的自定义事件。事件可以由 vm.$emit 触发。回调函数会接收所有传入事件触发函数的额外参数。

相当于在模版中@事件的方式：@test="callback"

```js
vm.$on('test', function (msg) {
  console.log(msg)
})
```

事件监听的时候，虽然我们 @test 是写在父组件里头，但是这个事件的监听者其实是事件的派发者。事件的监听者和派发者是同一个实例。而不是在子组件中派发事件，在父组件中监听，要区分开来，只是用 @ 那种语法写到父组件。将来转换成真正的代码其实还是 $on 这样的。

#### vm.$emit 

触发当前实例上的事件。附加参数都会传给监听器回调。

#### 典型应用：事件总线

$on 和 $emit 其实有一个比较常见的应用方式，叫事件总线。

通过在 Vue 的构造函数的原型上添加另外一个独立的 Vue 的实例，把它作为事件总线，这是一个设计模式，总线模式，因为我是放到了原型上，那将来我在任意的组件中都可以通过 this.$bus 的方式来访问到这个 new Vue() 的实例，所以这个 Vue 的实例就可以作为所有组件的中间人，在任何的组件中只要想给其他的组件传递消息你都可以用 $bus 进行 $emit，在其他组件里用 $on 去监听，这样大家的通信就非常方便了，实现组件间相互通信，不受组件间关系的影响。比如之前我们只能在父子间去通信，而现在哪怕跨很多层，没有任何关系都可以随意的去通信，是一种非常好的组件通信的手段。

```js
Vue.prototype.$bus = new Vue();
```

#### vm.$once

监听一个自定义事件，但是只触发一次。一旦触发之后，监听器立刻就会解除绑定。

```js
vm.$once('test', function (msg) { 
	console.log(msg) 
})
```

#### vm.$off

移除自定义事件监听器。

随着参数不同，它的处理方式也不同。

* 如果没有提供参数，则移除当前实例上面绑定的所有事件的所有监听器；
* 如果只提供了事件，则移除该事件所有的监听器；
* 如果同时提供了事件与回调，则只移除这个事件的这个监听器。

```js
vm.$off() // 移除所有的事件监听器 
vm.$off('test') // 移除该事件所有的监听器 
vm.$off('test', callback) // 只移除这个回调的监听器
```

### 组件或元素引用

#### ref 和 vm.$refs

ref 被用来给元素或子组件来设置引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件的实例。

范例：改造 message 组件显示隐藏方式，可以在子组件内部暴露出控制组件显示隐藏的方法，然后在父组件里通过 ref 引用到子组件的方法。

注意：

* ref 是作为渲染结果被创建的，所以访问的时间点至少在 mounted 之后，在初始渲染时不能访问它们。
* $refs 不是响应式的，不要试图用它在模板中做数据绑定。 
* 如果在 v-for 中去设置 ref，$refs 引用信息将是包含 DOM 节点或组件实例的数组。