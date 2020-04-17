## 组件之间的通信方式

### props
父给子传值

```
// child
props: { msg: String }
// parent
<HelloWorld msg="Welcome to Your Vue.js App"/>
```

### 自定义事件
子给父传值

```
// child
this.$emit('add', good)
// parent
<Cart @add="cartAdd($event)"></Cart>
```

### eventbus

事件总线

任意两个组件之间传值常用事件总线 或 vuex的方式。

```
// Bus:事件派发、监听和回调管理。发布订阅模式
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
// main.js
Vue.prototype.$bus = new Bus()
// child1
this.$bus.$on('foo', handle)
// child2
this.$bus.$emit('foo')
```

> 实践中通常用Vue代替Bus，因为Vue已经实现了相应接口

### vuex
创建唯一的全局数据管理者store，通过它管理数据并通知组件状态变更。 

### 边界情况（不太常用的）

我们在做一些通用组件的时候这些不常用的方式就用得着了。vuex等常用的通信方式这么好，为什么还要用这些不常用的方式，最主要
的原因是你不能强迫用户装vuex。因为我们现在要写的是通用组件，所以你能使用的是框架提供给你的最原始最基础的API，不可以使
用超出框架的其他东西，否则就有很强的侵入性，就不是一个很好的组件库了。

#### $parent / $root
子组件访问老爹可以用$parent。访问根元素可以用$root。

兄弟组件之间通信可通过共同祖辈搭桥，$parent或$root。从原理上来讲跟总线模式是一样的，互相通信的组件之间有一个共同的
中介人。

事件派发这个模式，事件它的派发和监听者必须是同一个。发布订阅模式，谁派发的谁监听。

```
// brother1
this.$parent.$on('foo', handle)
// brother2
this.$parent.$emit('foo')
```

#### $children 
老爹可以通过$children访问所有孩子元素。

父组件可以通过$children访问子组件实现父子通信。

```
// parent
this.$children[0].xx = 'xxx'
```

> 注意:$children不能保证子元素顺序

#### $attrs / $listeners（非prop（属性）特性）
凡是子组件里没有通过prop方式去声明，这时候还通过老爹给传进来了，它就会被收纳到$attrs里( class 和 style 除外)。
包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 ( class 和 style 除外)。当一个组件没有声明任何 prop 时，
这里会包含所有父作用域的绑定 ( class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别
的组件时非常有用。

```
// child:并未在props中声明foo 
<p>{{$attrs.foo}}</p>
// parent
<HelloWorld foo="foo"/>
```

$listeners和$attrs是类似的。

child组件被点击了我想做点事，但是做的这个事不是在child内部声明的，而是老爹传进来的。做比较高级的封装组件，你封了一
个其他组件，你还想给它传一个回调函数让它去调用，就可以用这种方式。回调函数是在老爹里声明的。

```
// child
<!-- $listeners会被展开并监听 -->
<p v-on="$listeners"></p>
// parent
<HelloWorld @click="handle"/>
```

#### $refs 

可以通过$refs的方式可以找到当前老爹里面包含的所有的孩子，直接去访问。除了组件实例本身，还能访问一些dom元素。平时用
的还是挺多的。

获取子节点引用

```
// parent
<HelloWorld ref="hw"/>
mounted() {
  this.$refs.hw.xx = 'xxx'
}
```

#### provide/inject

实际工作中不常遇到，因为有vuex。比如老祖宗组件里有一个值，想传给特别深的一个后代元素，这时候就能用到这个依赖注入这
种方式，一个是提供，一个是注入。它可以跨层级的传参，如果没有vuex可以使用的话，可以用这种方式。平时开发中很少用，只
限于UI库的开发过程。

能够实现祖先和后代之间传值

```
// ancestor
provide() {
    return {foo: 'foo'}
}
// descendant
inject: ['foo']
```
