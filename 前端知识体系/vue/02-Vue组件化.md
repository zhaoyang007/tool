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

在 Vue 的原型上添加另外一个独立的 Vue 的实例，把它作为事件总线，那么在任意的组件中都可以通过 this.$bus 的方式来使用事件监听和派发，这样就可以实现跨层级的组件传参了。

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

父组件可以通过 $children 访问子组件。

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

通过这种方式设置的值不是响应式的，所以不要改它，不然会有警告。但是你要传一个引用类型进来，访问里面动态的值，然后修改它，也是完全可行的。但是很少这样做，一般都是单向的，就是从上往下传个值就完了。

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

sync 修饰符：为了写法更简洁。:show.sync="isShow" 将来会展开成 :show="isShow" @update:show="isShow=$event" 的形式。所以将来子组件要派发的事件就是 update:show。

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
  <slot :foo="data"></slot>
</div>
```



### 双向绑定

##### 自定义组件

v-model 是一个语法糖，v-model 最终会转换成一个属性的传递 :value="values" 和一个事件的监听 @input="values=$event"。$event 是固定的名字，表示传递出来的参数。

```vue
<course-add v-model="data"></course-add>
// 相当于：
<course-add :value="values" @input="values=$event"></course-add>
```

上面的事是 Vue 给我们做好了的，我们要做的事情是在组件的内部，接收一个叫 value 的 prop 属性，根据业务需求触发一个事件，事件中触发 input 事件，把值传出去，this.$emit('input', newValue)。

```js
// 非表单元素绑定
Vue.component('course-add', {
	props: ['value'],
  template: `
		<div>
			<!-- 需要实现input的:value和@input --> 
			<div @click="handleClick"> {{ value }} </div>
		</div> 
	`,
	methods: {
    handleClick() {
      const newValue = 123
      this.$emit('input', newValue)
    }
  }
})
// 表单元素绑定
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

##### 非自定义组件

表单元素的 v-model 和上面做的事是一样的，只不过组件内部做的事 Vue 已经在绑定了 v-model 的表单元素上做好了。所以在表单元素上使用数据双向绑定只需写一个 v-model 就行了。

```vue
<input v-model="data" />
// 相当于：
<input :value="data" @input="handleInput" />

<script>
export default {
  data() {
    return {
      data: ''
    }
  },
  methods: {
    // Vue已经做好的
    handleInput(e) {
			this.data = e.target.value
    }
  }
}
</script>
```



### Vue 组件化实践

配合路由创建相应组件，组件里搭建整体结构，然后在相应位置插入子组件，一层一层向下写。

基本页面上的每一块都分成组件，然后按照不分组件的时候怎么写就怎么写里面的功能，然后再处理需要处理的组件之间的数据通信问题就行了。将几个组件公用的数据放到公共的父组件中。



### Vue 组件化探讨

对 Vue 组件化的理解：

* 组件化的含义：组件是可复用的 Vue 实例，准确讲它们是 VueComponent 的实例，继承自 Vue。

* 组件化是软件工程中一些原则性的践行：软件工程中一个最重要的原则就是高内聚，低耦合，从而增强程序的复用性，可维护性，可测试性。

* 组件分类：

  * 通用组件：实现最基本的功能，具有通用性、复用性，例如按钮组件、输入框组件、布局组件等，类似 elementUI 等组件库的功能，这些组件库共同的特点是基本上就是最小的功能单元了，不可能再区分了。
  * 业务组件：它们完成具体业务，具有一定的复用性，例如登录组件、轮播图组件。可以把这些通用组件做一个有机的组合来完成一个功能。
  * 页面组件：组织应用各部分独立内容，需要时在不同页面组件间切换，例如列表页、详情页组件

* 组件的使用

  * 定义：全局定义 Vue.component()，局部定义 components 选项，sfc
  * 分类
    * 有状态组件
    * functional（函数式组件，无状态组件）
    * abstract（抽象组件，完成一些特定的功能，它不管视图，可能实现一个特别的逻辑控制，逻辑功能，比如一个防抖组件，keep-alive，transition 加上这些组件去包装）
  * 组件化过程中一些常见的通信手段
  * 内容分发：\<slot>，\<template>，v-slot
  * 使用及优化：动态组件 is，keep-alive，异步组件

* 组件的本质

  Vue 中的组件经历的过程：组件配置 => VueComponent 实例 => render() => Virtual DOM => DOM。

  因为你写了配置最后希望看到 DOM，组件里写的只是配置对象，Vue 内部为你做了中间这三件事。组件最终的目标就是产出虚拟 DOM。

  * 首先它把你写的组件配置转换成了 VueComponent 实例。
  * 实例里面会有 render 方法，render 方法是我们写的模版转换的，render 方法在合适的时间去执行获得虚拟 DOM。
  * 虚拟 DOM 又通过更新的过程转换成真实 DOM。



### vue 高级组件开发

#### notification 全局通用性通知组件

Vue 是基于组件化的形式进行开发，它本身的组件是要通过我们在模版里面去声明然后再去用的，这种方法其实比较的不适合于我们去使用像一些notification这种组件的，那么我们有什么办法去让它变成我们api调用的方式呢。

##### notification.vue

这是一个基本组件，就是我们这个组件长的样式以及它的一些基础的内容。

##### index.js

通过它将notification制作成一个vue的插件，并将notification这个组件注册到全局，让每个页面都能都使用这个组件。

将api调用的方法加到Vue.prototype中去。

##### func-notification.js

扩展notification.vue这个组件

通过vue的extends的功能扩展notification这个组件

##### function.js

实现我们的notification通过fucniton去调用的这种方式。主要的方法调用涉及到的逻辑都在这里写。

我们要通过js的方法调用去创建一个vue的组件，这个组件我们怎么去创建最方便呢，我们肯定是通过去new一下，我们可以直接通过new Vue()然后去创建一个组件，那么同样我们可以通过Vue的extend它返回的这个方法然后我们去创建一个组件。

这就是我们的notification的全局通用性组件，这里面会涉及到一些最主要的内容就是我们如何去通过js方法调用的形式动态的创建一个组件，并且动态的把它渲染到我们的dom里面，然后再经过一系列的操作之后呢，我们又动态的去把它删除掉，那么这些内容其实相对来说是跟vue的组件化不太配套的一个内容，但是呢它会在我们日常的代码开发里面非常的有用。

#### tabs 组件



### js组件化设计原则

* 复用
* 高内聚低耦合：一个组件内不要依赖任何其他组件，组件的功能尽量不要收页面其他组件的控制
* 周期性迭代，长期打造一个越来越好的代码设计，让组件越来越完美，最适合自己的业务场景。
* 参数传递
* 不断抽象出一个跟业务没有关系的模块，而这些业务模块对它是可以继承的，那么这种抽象的设计就是组件化设计思维非常大的一个转换。
* 抽象组件不涉及业务，是抽象的最高层，但是你必须要支持各种配置怎么传进去，这个抽象组件在最上层，业务组件去用的时候，我怎么继承你的默认这个框架，还要把我自己想要的东西定制进去，说白了就是一个传参的过程
* 组件抽象是要抽象到一个通用性较强的架子，并且还要有相对可以的功能，不能只是一个什么都没有的架子。
* 一个组件的复杂度不能太高，也不能太低(除非这个复杂度特别低的组件的复用性特别高)
* 组件抽象时不要考虑里面的具体内容，而是抽象出大致的框架



### vue 第三方组件

vue轮子工厂：http://www.wheelsfactory.cn

vue-awesome



### 通用表单组件

##### 通用组件注意事项

1. 高内聚，低耦合，功能应该尽量单一，功能越多复用性越差，也就不太内聚了。所以为了 KInput 功能较单一，我们在它的外面还要再设计一层 KFormItem，让它去做校验的事。KInput 只做一件事，就是双向绑定，能把数据管理起来就可以了。
2. 接收数据的是 KForm，真正使用数据的是 KInput 或 KFormItem，所以就涉及到组件之间的传参的问题了。跨层级的传参，所以用 provide/inject 来进行数据的注入就是一个非常好的方式。

##### 需求分析

在开始之前要做一个需求分析，到底要什么什么样的功能，为了实现这些功能要做一些什么事情。

功能分析：收集数据、校验数据并提交。

* KForm 
  * 接收数据
  * 指定校验规则
* KformItem
  * 执行校验
  * 显示错误信息
* KInput
  * 维护数据 

##### 实现 KInput.vue

components/form/KInput.vue

```vue
<template>
  <div>
    <!-- 自定义组件双向绑定：:value  @input -->
    <!-- v-bind="$attrs"展开$attrs，每一项单独设置上去 -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
  export default {
    inheritAttrs: false, // 设置为false避免传入的属性继承到根元素上
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    methods: {
      onInput(e) {
        // 派发一个input事件即可
        this.$emit('input', e.target.value)

        // 通知父级执行校验
        this.$parent.$emit('validate')
      }
    },
  }
</script>
```

##### 实现 KFormItem

components/form/KFormItem.vue

```vue
<template>
  <div>
    <!-- label -->
    <label v-if="label">{{label}}</label>

    <!-- KInput的坑位 -->
    <slot></slot>

    <!-- 校验信息显示 -->
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
// Asyc-validator
import Schema from "async-validator";

export default {
  inject: ["form"],
  data() {
    return {
      error: "" // error是空说明校验通过
    };
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      // 规则
      const rules = this.form.rules[this.prop];
      // 当前值
      const value = this.form.model[this.prop];

      // 校验描述对象
      const desc = { [this.prop]: rules };
      // 创建Schema实例
      const schema = new Schema(desc);
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          // 校验通过
          this.error = "";
        }
      });
    }
  }
};
</script>
```

##### 实现 KForm

components/form/KForm.vue

```vue
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      // 获取所有孩子KFormItem
      // [resultPromise]
      const tasks = this.$children
        .filter(item => item.prop) // 过滤掉没有prop属性的Item
        .map(item => item.validate());

      // 统一处理所有Promise结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>
```

##### 使用 KInput/KFormItem/KForm

components/form/index.vue

```vue
<template>
  <div>
    <!-- KForm -->
    <KForm :model="userInfo" :rules="rules" ref="loginForm">
      <!-- 用户名 -->
      <KFormItem label="用户名" prop="username">
        <KInput v-model="userInfo.username" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <!-- 密码 -->
      <KFormItem label="密码" prop="password">
        <KInput type="password" v-model="userInfo.password" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <!-- 提交按钮 -->
      <KFormItem>
        <button @click="login">登录</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import KInput from "@/components/form/KInput.vue";
import KFormItem from "@/components/form/KFormItem.vue";
import KForm from "@/components/form/KForm.vue";
import Notice from "@/components/Notice.vue";

export default {
  data() {
    return {
      userInfo: {
        username: "tom",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  components: {
    ElementTest,
    KInput,
    KFormItem,
    KForm
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate(valid => {
        const notice = this.$create(Notice, {
          title: "社会你杨哥喊你来搬砖",
          message: valid ? "请求登录!" : "校验失败!",
          duration: 2000
        });
        notice.show();
        // if (valid) {
        //   alert("submit");
        // } else {
        //   console.log("error submit!");
        //   return false;
        // }
      });
    }
  }
};
</script>
```



### 弹窗组件

对于组件的构造函数和实例，平时的工作中几乎不会和它有接触。但是写底层的通用组件库时，我们可能就要接触到构造函数。

其他的所有组件所有内容都是在 app 里头的，而弹窗这类组件已经脱离出当前 Vue 管理的实例了，单独存在。这样做的好处是比较好控制弹窗的位置等东西。

它们在当前 Vue 根实例之外独立存在，通常挂载于 body，而不是 app，所以不能将它声明在任何一个 app 组件下的 compunents 选项作为当前 app 的组件从而使用 Vue 内部来创建构造函数和实例的能力，我们需要自己去创建实例，完成 Vue 替我们做的关于创建构造函数和实例的过程。

这时就涉及到一些问题了，这个组件实例怎么创建，又怎么脱离当前的 Vue 根实例去单独的挂载到 body 上，这就涉及到一些相对较底层的 API 了。

需求：我现在有一个 Notice.vue 这样的组件，要用函数的方式去创建这个组件的实例，并且将来还能把它挂在到 body 上面去。

##### 实现 create 函数

这个 create 方法将来接收一个组件（其实就是组件的配置）和一些参数，通过 JS 的方式创建这个组件的实例，不需要在任何组件中通过 components 选项声明，并将其挂载到 body 上去，最终返回这个组件实例。

那现在有几个问题要思考：

这个 Component 组件怎么能够变成构造函数，组件构造函数如何获取？我们平常写的组件，它只是一个 export 出去的一个配置对象，它不是构造函数。这个配置对象将来必须要变成实例，那它凭什么变成实例啊，它必须得有构造函数，所以我们平常写的这些组件的配置需要变成构造函数，然后才能创建它的实例。

* 方法一：使用 Vue.extend() 方法，可以得到构造函数，然后创建组件的实例。Vue.extend 开发中很少接触，它是框架本身调的方法。
* 方法二：借助 Vue 来创建根实例，使用 render 方法，直接把传入的组件渲染出来，整个过程会有组件实例的创建，然后我们从中获取组件的实例就可以了。

方法一： 

Vue.extend 的用法：

extend 方法时 Vue 的一个静态方法，它里面将 Vue 设置为超类，又创建了一个子类 Sub，名字叫 VueComponent，Sub 继承 Vue，也就是说所有组件的类型都是 VueComponent，它们都是 Vue 构造函数的子类。

```js
// 我们有一个组件的配置，一般是一个对象
const comp = {data: {}, props: {}} 
// 如果想得到这个组件的构造函数，就用Vue.extend方式把这个组件的配置对象传进去，就会得到一个构造函数
const Ctor = Vue.extend(comp)
// new一下这个构造函数，就可以得到这个组件的实例了。
// 接下来的问题是怎么传参，官方给的接口是用propsDate的方式去传递参数，就相当于使用模版时父组件传过来的props参数
new Ctor({propsDate: {}})
// 既然得到组件实例了，后面的写法就跟之前的比较类似了
```

utils/create.js

```js
import Vue from 'vue'

function create(Component, props) {
  // 组件的继承vue.extend()来扩展我们的vue, 可以简单理解为extend之后得到的是vue这个类的一个子类。
  // 获得组件构造函数
  const Ctor = Vue.extend(Component)
  // 获得组件实例，组件实例创建之后得到虚拟DOM
  cosnt comp = new Ctor({propsDate: props})
  
  // 组件实例挂载后得到真实DOM
  comp.$mount()
  
  // 获取真实DOM后，做手动挂载
  document.body.appendChild(comp.$el)

  // 清除自己，因为作为一个组件，不停的往界面中去追加而不去淘汰，将来内存就爆了。
  comp.remove = function() {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }

  return comp

}

export default create
```

方法二：

utils/create.js

```js
import Vue from 'vue'

function create(Component, props) {
  // 组件的构造函数如何获取？
  // 1.Vue.extend()
  // 2.render
  // 这个实例会把这个组件作为根组件把它渲染出来了，所以我们就能得到虚拟DOM，挂载后得到真实DOM
  const vm = new Vue({
    // h是createElement, 返回VNode虚拟DOM
    // 挂载后变成真实DOM，最终把真实DOM放到宿主元素上去。
    render: h => h(Component, {props}),
  }).$mount() // 不指定宿主元素，则会创建真实DOM，但是不会做追加操作，因为没有目标对象可追加，也不可以使用body

  // 获取真实DOM后，做手动挂载
  document.body.appendChild(vm.$el)
	
  // 获取传入的组件的实例
  const comp = vm.$children[0]

  // 清除自己，因为作为一个组件，不停的往界面中去追加而不去淘汰，将来内存就爆了。
  comp.remove = function() {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }

  return comp

}

export default create
```

##### 实现 Notice.vue

components/Notice.vue

```vue
<template>
  <div class="box" v-if="isShow">
    <h3>{{title}}</h3>
    <p class="box-content">{{message}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(this.hide, this.duration);
    },
    hide() {
      this.isShow = false;
      this.remove();
    }
  }
};
</script>

<style>
.box {
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  pointer-events: none;
  background-color: #fff;
  border: grey 3px solid;
  box-sizing: border-box;
}
.box-content {
  width: 200px;
  margin: 10px auto;
  font-size: 14px;  
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  margin-bottom: 8px;
}
</style>
```

##### 项目入口文件中引入 create 并挂载到 Vue 原型上

main.js

```js
import create from './utils/create'

Vue.prototype.$create = create
```

##### 使用

传一个组件，传一些参数，然后让它显示，大概就是这样。

```js
this.$create(Notice, { 
  title: '社会你杨哥喊你来搬砖',
  message: '提示信息',
  duration: 1000
}).show();
```

##### 封装成 Vue 插件的形式，便于使用。

utils/create.js

```js
import Vue from 'vue'
import Notice from 'Notice.vue'

function create() {
  //...
}

export default {
  install(Vue) {
    Vue.prototype.$notice = function(options) {
      return create(Notice, options)
    }
  }
}
```

main.js

```js
import Vue from 'vue'
import create from './utils/create'

Vue.use(create)
```



### 遗漏问题

##### 修正 input 中 $parent 写法的问题

想跨层级的去传参，还不能使用 $parent/$root/$children 等，element 官方用的是混入的方式，在 src/mixins 写了一个
emitter.js 派发器。它可以做两件事，一个叫广播一个叫冒泡派发事件，这个东西在 vue1.0 里是有的，2.0 之后删了。element 觉得它有用，所以自己实现了，这个东西可以隔层的去派事件，比如在 input 里可以不停的向上去找我想要的组件让它去派发事件。这个东西是作为一个混入被引入的，主要是为了复用。

1.mixin emitter
2.声明 componentName
3.dispatch()

##### 树形（递归）组件的设计与实现

循环引用，在做树形组件的时候，会用到递归组件

##### Vue 组件化知识点思维导图

https://www.processon.com/view/link/5d430271e4b01ed2c6aa4171#map

##### 开源组件库

学会看开源组件库源码，有些功能遇到难处了，怎么从组件库的源码中找到解决办法；

* github 中搜索 element
* packages：几乎所有源码都在这里
* src 是暴露一些接口的地方，有一些通用方法，例如混入和指令等



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

