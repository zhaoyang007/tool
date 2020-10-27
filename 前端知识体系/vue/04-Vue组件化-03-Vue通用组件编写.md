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

#### 实现 create 函数

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

#### 实现 Notice.vue

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

#### 项目入口文件中引入 create 并挂载到 Vue 原型上

main.js

```js
import create from './utils/create'

Vue.prototype.$create = create
```

#### 使用

传一个组件，传一些参数，然后让它显示，大概就是这样。

```js
this.$create(Notice, { 
  title: '社会你杨哥喊你来搬砖',
  message: '提示信息',
  duration: 1000
}).show();
```

#### 封装成 Vue 插件的形式，便于使用。

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