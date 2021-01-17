### class 与 style 绑定

操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是 attribute，所以我们可以用 `v-bind` 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 `v-bind` 用于 `class` 和 `style` 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。对象的方式更常用。

##### class

对象语法

这个 class 是否存在取决于数据 isActive，hasError 的 truthiness：

```vue
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

data {
  isActive: true,
  hasError: false
}
```

绑定的数据对象不必内联定义在模板里：

```vue
<div v-bind:class="classObject"></div>

data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

也可以绑定一个返回对象的计算属性，这是一个常用且强大的模式：

```vue
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

可以传递一个数组，以应用一个 class 列表：

```vue
<div v-bind:class="[activeClass, errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

如果也想根据条件切换列表中的 class，可以用三元表达式：

这样写将始终添加 `errorClass`，但是只有在 `isActive` 是 truthy 时才添加 `activeClass`。

```vue
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：

```vue
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

##### style

对象语法

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```vue
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

data: {
  activeColor: 'red',
  fontSize: 30
}
```

直接绑定到一个样式对象通常更好，这会让模板更清晰：

```vue
<div v-bind:style="styleObject"></div>

data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

同样的，对象语法常常结合返回对象的计算属性使用。

如果想根据条件切换 style 属性的值，可以用三元表达式：

```vue
<div v-bind:style="{cursor: scatterHasData?'pointer':'not-allowed'}"></div>
```

数组语法

数组语法可以将多个样式对象应用到同一个元素上：

```vue
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```



### 计算属性和监听器

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护，此时就可以考虑计算属性和监听器。

计算属性具有缓存性：计算所得的值如果没有变化不会重复执行，页面不会重新渲染。其实计算属性里的逻辑挪到methods 里面也是可以实现的，但是不管这个值有没有变化，每次都会重新计算。

默认情况下 watch 在初始化时不执行，监听的值变了才执行，想要初始化时执行，要使用带选项的 watcher。

区别：

* 简洁性，且计算属性具有缓存性。所以实际开发中，如果能用 computed 实现就用 computed。
* 从语境上说
  * computed：一个值是由其他值得来的，这些值变了这个值也要变，适合做多个值影响一个值的情形。
  * watch：一个值变化了，我要做一些事情，适合做一个数据影响多个数据的情形。
* 监听器选项提供了更通用的方法，适合执行异步操作或较大开销操作的情况。



### 事件

事件的监听者和派发者是同一个实例。事件谁派发，谁监听。

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