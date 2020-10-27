### 组件间通信

##### props

###### 父给子传值

props 用于接收父组件传递过来的数据。

```js
// parent
<HelloWorld msg="Welcome to Your Vue.js App"/>
  
// child
props: { msg: String }
```

###### 写法

```js
// 1.字符串数组形式
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
// 2.对象形式
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
// 3.带有验证需求的对象
props: {
  // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
  propA: Number,
  // 多个可能的类型
  propB: [String, Number],
  // 必填的字符串
  propC: {
   	type: String,
    required: true
	},
  // 带有默认值的数字
  propD: {
    type: Number,
    default: 100
  },
  // 带有默认值的对象
  propE: {
    type: Object,
    // 对象或数组默认值必须从一个工厂函数获取
    default: function () {
      return { message: 'hello' }
    }
  },
  // 自定义验证函数
  propF: {
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['success', 'warning', 'danger'].indexOf(value) !== -1
    }
  }
}
```

###### 传入一个布尔值

```vue
<!-- 该 prop 没有值的情况，意味着 `true`。-->
<blog-post is-published></blog-post>
```

###### 传入一个对象的所有 property

如果你想要将一个对象的所有 property 都作为 prop 传入，你可以使用不带参数的 `v-bind` (取代 `v-bind:prop-name`)

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

```vue
<blog-post v-bind="post"></blog-post>
```

等价于：

```vue
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

###### 单向数据流

你不应该在一个子组件内部改变 prop。

有两种常见的试图变更一个 prop 的情形：

1.希望将 prop 作为一个本地的数据来使用，在这种情况下，最好定义一个本地的 data property 并将这个 prop 用作其初始值。

```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

2.这个 prop 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

注意：对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态。如果不想影响父组件的状态要用 watch 监听该 prop，监听中对这个数据进行深拷然后赋值给子组件的 data 数据。

###### 非 Prop 的 Attribute

是指传向一个组件，但是没有相应 prop 定义的 attribute。

显式定义的 prop 适用于约定好的向一个子组件传入信息，然而组件库的作者并不总能预见组件会被用于怎样的场景。这也是为什么组件可以接受任意的 attribute，而这些 attribute 会被添加到这个组件的根元素上。

inheritAttrs: false 可以禁止这些非 prop 的属性被添加到根元素。它不会影响 style 和 class 的绑定。

所有的非 prop 属性和值会以对象键值对的形式被收纳到子组件实例的 $attrs 里头( class 和 style 除外)。

有了 inheritAttrs: false 和 $attrs，你就可以手动决定这些 attribute 会被赋予哪个元素。可以使用 $attrs 将属性绑定到子组件的任意一个元素上。

###### $listeners

$listeners 和 $attrs 是类似的。

子组件的事件处理函数没有在当前子组件内部声明，而是老爹传进来的。

用处：做比较高级的封装组件，你封了一个其他组件，还想给它传一个回调函数让它去调用，就可以用这种方式，回调函数是在老爹里声明的。

```js
// parent
<HelloWorld @click="handle"/>
methods: {
	handle() {
		console.log('来自老爹的回调', this)
  }
}

// child
// $listeners会被展开并监听
<p v-on="$listeners"></p>
```

###### 替换/合并已有的 Attribute

大多数从外部提供给组件的 attribute 的值会替换掉组件内部设置好的值。class 和 style attribute 的值会被合并起来。



##### 自定义事件

子给父传值

当子组件需要和父级组件进行通信，可以派发并监听自定义事件。

```js
// parent
<Cart @add="cartAdd($event)"></Cart>

// child
this.$emit('add', good)
```



##### eventbus

事件总线

任意两个组件之间传值常用事件总线或 Vuex 的方式。

实践中通常用 Vue 代替 Bus，因为 Vue 已经实现了相应接口。

Bus 只要实现事件派发和监听这两个接口，并且把用户关心的所有回调收集起来就行了，这是一个典型的发布订阅模式。

```js
class Bus {
  constructor(){
    this.callbacks = {}
  }
  $on(name, fn){
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(fn)
  }
  $emit(name, args){
    if(this.callbacks[name]){
      this.callbacks[name].forEach(cb => cb(args))
    }
  } 
}
```

```js
// main.js
Vue.prototype.$bus = new Bus()

// child1
this.$bus.$on('foo', handle)

// child2
this.$bus.$emit('foo')
```



##### Vuex

创建唯一的全局数据管理者 Store，通过它管理数据并通知组件状态变更，它是组件通信的最佳实践。



##### 边界情况

我们在做一些通用组件的时候这些不常用的方式就用得着了。Vuex 等常用的通信方式这么好，为什么还要用这些不常用的方式，最主要的原因是不能强迫用户装 Vuex。因为我们现在要写的是通用组件，所以你能使用的是框架提供给你的最原始最基础的 API，不可以使用超出框架的其他东西，否则就有很强的侵入性，就不是一个很好的组件库了。

###### $parent/$root

子组件访问老爹可以用 $parent，访问根元素可以用 $root。

兄弟组件之间通信可通过共同祖辈搭桥，$parent 或 $root。从原理上来讲跟总线模式是一样的，互相通信的组件之间有一个共同的中介人。

发布订阅模式，事件它的派发和监听者必须是同一个，事件谁派发谁监听。

```js
// brother1
this.$parent.$on('foo', handle)

// brother2
this.$parent.$emit('foo')
```

###### $children

父组件可以通过 $children 访问子组件实现父子通信。

老爹可以通过$children访问所有孩子元素。

注意：$children 不能保证子元素顺序，比如孩子组件中有异步组件，那它将来注册在 children 里面的位置是在后面的，虽然它声明在前面。

```js
// parent
this.$children[0].xx = 'xxx'
```

###### $refs

获取子节点引用。

可以通过 $refs 的方式找到当前老爹里面包含的所有的孩子，直接去访问。除了组件实例本身，还能访问一些 DOM 元素，平时用的还是挺多的。

```js
// parent
<HelloWorld ref="hw"/>

mounted() {
  this.$refs.hw.xx = 'xxx'
}
```

###### provide/inject

实际工作中不常遇到，因为有 Vuex。比如祖宗组件里有一个值，想传给特别深的一个后代元素，这时候就能用到依赖注入这种方式，一个是提供，一个是注入。它可以跨层级的传参，如果没有 Vuex 可以使用的话，可以用这种方式。平时开发中很少用，只限于 UI 库的开发过程。

这个通过这个方式设置的值不是响应式的，所以不要改它，不然会有警告。但是你要传一个引用类型进来，访问里面动态的值，然后修改它，也是完全可行的。但是很少这样做，一般都是单向的，就是从上往下传个值就完了。

```js
// ancestor
provide() {
  return {foo: 'foo'}
}

// descendant
inject: ['foo']
```



### 复合组件

在外面提供内容，将来分发到里面的指定位置，这就是内容分发技术。

Vue 中用插槽来做组件的内容分发，组件中使用插槽留出位置来接收父组件传递过来的不确定的内容。

插槽是 Vue 实现的内容分发 API，用于复合组件开发。该技术在通用组件库开发中有大量应用。

子组件中使用 \<slot>\</slot> 占据坑位，父组件中使用 \<template>\</template> 模版占位符填充坑位。

##### 匿名插槽

```vue
<!-- parent -->
<comp>hello</comp>

<!-- comp -->
<div>
  <slot></slot>
</div>
```

sync 修饰符：为了写法更简洁。:show.sync="isShow" 将来会展开成 :show="isShow" @update:show="show=$event" 的形式。所以将来子组件要派发的事件就是 update:show。

##### 具名插槽

如果存在多个独立内容要分发，可以使用具名插槽，把内容分发到指定的位置。

```vue
<!-- parent -->
<Comp2>
  <!-- 默认插槽用default做参数 -->
  <template v-slot:default>具名插槽</template> 
  <!-- 具名插槽用插槽名做参数 -->
  <template v-slot:content>内容...</template>
</Comp2> 

<!-- comp2 -->
<div>
  <slot></slot>
	<slot name="content"></slot>
</div>
```

##### 作用域插槽

在你声明的 \<template>\</template> 里面的数据到底是用来自当前的父组件的还是来自于子组件的，如果分发内容要用到子组件中的数据就用作用域插槽，否则就用普通插槽。

```vue
<!-- parent -->
<Comp3>
  <!-- 把v-slot的值指定为一个作用域上下文对象 slotProps: {foo: 'xxxxx'}--> 
  <template v-slot:default="slotProps">
		来自子组件数据:{{slotProps.foo}} 
  </template>
</Comp3>

<!-- comp3 -->
<div>
  <slot :foo="foo"></slot>
</div>
```



### 在自定义组件上使用双向数据绑定

v-model 是一个语法糖，v-model 最终会转换成一个属性的传递 :value="values" 和一个事件的监听 @input="onInput"。

onInput 回调函数里具体的逻辑是，将内部派发事件传递的那个最新的要变更的值赋值给 values，就是 @input = "values=$event"，$event 是固定的名字，表示传递出来的参数。

```vue
<course-add v-model="values"></course-add> 
// 相当于：
<course-add :value="values" @input="values=$event"></course-add>
```

上面的事是 Vue 给我们做好了的，我们要做的事情是，在组件的内部，接受一个属性叫 value 把它绑定到 input 元素的 value 上并且在 input 上派发一个默认的 input 事件，把最新的值作为参数传递出来。

```js
Vue.component('course-add', {
	props: ['value'],
  template: `
		<div>
			<!-- 需要实现input的:value和@input --> 
			<input :value="value" @input="onInput"/> 
		</div> 
	`,
	methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
})
```

非自定义组件表单元素的 v-model 和上面做的事是一样的，只不过组件内部做的事 Vue 已经在绑定了 v-model 的表单元素上做好了。所以在表单元素上使用数据双向绑定只需写一个 v-model 就行了。
