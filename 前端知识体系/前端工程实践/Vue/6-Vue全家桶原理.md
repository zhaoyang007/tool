## VueRouter

### 核心使用步骤

步骤一：注册，应用 VueRouter 插件

```js
import Router from 'vue-router' 
Vue.use(Router)
```

步骤二：创建 VueRouter 实例

```js
export default new Router({...})
```

步骤三：在根组件上添加该实例

挂载这个实例是为了在所有组件都可以使用 $router，可以访问到路由的实例，全局使用是需要把它注册到 prototype 上去的：Vue.prototype.$router = router。我在这只是注册了一个 router，它怎么将它挂到 prototype 上去的呢，所以 router 插件里面要做的一件事就是拿出当前的选项，然后挂载到 Vue.prototype.$router上。

```js
import router from './router' 
new Vue({ 
  router 
}).$mount("#app");
```

步骤四：添加路由视图 router-view

路由出口，它起到容器或坑位的作用，将来所有的内容就会在这里面做刷新和替换，它到底是怎么替换的？

router-link 和 router-view 这两个组件为什么可以直接用。说明 router 插件里面会有这两个组件的声明和注册。

```vue
<router-view></router-view>
```

步骤五：导航 router-link

```vue
<router-link to="/">Home</router-link> 
```

### 需求设计思路

通过使用的分析，大概就能知道做 vue-router 插件有哪些任务了。

需求是当浏览器 url 的地址发生变化的时候我们能够知道，并且页面不刷新，同时还能切换页面内容。

浏览器里有两种解决方案：

hash：添加 hash 浏览器不会刷新，而且会收到 hashchange 这个事件，这样我们就知道 hash 发生变化了。

h5 的 history API：h5 的 history API 有一个 pushState/replaceState 事件，利用的真实的 url 变化，操作 history 历史记录的堆栈，利用这些事件，url 是会发生变化的，但是浏览器的行为是依然不跳转。

### 源码实现

具体任务：

根据地址的变化，从路由表中获取到最新的 component，把它渲染到 router-view 里，就是让 router-view 重新渲染。

* 实现一个插件，vue-router 是一个插件：实现 VueRouter 类和 install 方法 
* 实现两个全局组件：router-view 用于显示匹配组件内容，router-link 用于跳转 
* 监控 url 变化：监听 hashchange 或 popstate 事件 
* 响应最新 url：创建一个响应式的属性 current，当它改变时获取对应组件并显示

krouter/kvue-router.js 

```js
import Link from './krouter-link'
import View from './krouter-view'

let Vue;

class KVueRouter {
  constructor(options) {
    this.$options = options
    console.log(this.$options);

    // 需要创建响应式的current属性
    // 利用Vue提供的defineReactive做响应化
    // 变成响应式的好处是，在任何组件的template或render函数中用到current就会把它收集起来，将来只要我变了，就			 会通知用到的组件做更新，就是重新render
    Vue.util.defineReactive(this, 'current', '/')
		
    // 还可以使用这种方式实现current的响应式
    // this.app = new Vue({
    //   data() {
    //     return {
    //       current: '/'
    //     }
    //   }
    // })
    
    // 监控url变化
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))

    // 创建一个路由映射表
    this.routeMap = {}
    options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
  }

  onHashChange() {
    console.log(window.location.hash);

    this.current = window.location.hash.slice(1)
  }
}

// 1.实现一个插件
// 一个插件只是个普通对象，并实现 install 方法。
KVueRouter.install = function (_Vue) {
  // 保存构造函数，在KVueRouter里面使用
  Vue = _Vue;

  // 任务1：挂载$router
  // 怎么获取根实例中的router选项
  // 我只要混入一个生命周期的钩子或者是任何一个方法，我在钩子或方法里面就可以拿到组件的实例了。
  // 加上一个全局的混入，这里写的生命周期的钩子将来会在所有的组件中都执行一遍。
  // 为什么要用混入方式写？主要原因是use代码在前，Router实例创建在后，而install逻辑又需要用到该实例
  Vue.mixin({
    beforeCreate() {
      // 确保根实例的时候才执行
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 任务2：注册两个全局组件router-link和router-view
  // 这里不能使用template的方式去描述标签的原因是我们使用的是纯运行时的Vue版本，因为是webpack环境，最终的编译		 版本中是不存在编译器的，所以没有办法编译template。
  // 所以这里要用到render函数，纯运行时环境只能用render函数来描述你的组件。
  Vue.component('router-link', Link) 
  Vue.component('router-view', View)
}

export default KVueRouter
```

krouter/router-link.js 

```js
export default {
  props: {
    to: {
      type: String,
      required: true
    },
  },
  render(h) {
    // <a href="#/about">abc</a>
    // <router-link to="/about">xxx</router-link>
    // h(tag, data, children)
    console.log(this.$slots);
    return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
    // jsx
    // return <a href={'#' + this.to}>{this.$slots.default}</a>
  }
}
```

krouter/router-view.js

```js
export default {
  render(h) {
    // 获取path对应的component
    const {routeMap, current} = this.$router;
    console.log(routeMap, current);
    
    const component = routeMap[current].component || null;
    return h(component)
  }
}
```



## Vuex

### 需求设计思路

有一个视图 view，有一个 Vuex 的 Store 实例，Store 里有一个 state 属性，在 view 里使用 $store.state.xx 来访问 Store 里的数据。我们现在要实现一个 view 和 Store 之间的单向数据流，我想改 state，必须通过 Store 提供的 commit 方法提交一个 mutation 去改，所以 Store 里面还要实现一个 commit 方法，根据 type 参数可以从用户配置的那些 mutations 里找到对应的修改方法，然后用这个方法对state做修改，但是这个单向数据流还是没有打通，这个 state 状态的变化怎么能够通知界面去重新的 render 呢？这是我们要实现 store 的核心，要想办法让这个 state 能够是一个响应式的数据，Vue 最重要的功能就是实现数据响应式，所以我们利用 Vue 来做 state 的数据响应式。这样 state 发生变化的时候，可以让界面重新 render 渲染，也就起到了更新的作用。所以 Vuex 是跟 Vue 强耦合的，只能用在 Vue 里面就是这个原因。 

要实现一个 Store 类，里面有一个 state 属性，还有两个方法，commit 和 dispath。commit 可以直接改 state，dispatch是给它传个上下文，让它通过调 commit 的方式来改 state。这是写 store 之前的一个思路想法。还有一个数据响应式的问题，是通过 new Vue({data: options.state}) 的方式将 state 变成响应式数据的，这样 state 发生变化，使用 state 数据的组件就会重新 render。

### 源码实现

kstore/kvuex.js

```js
// 保存构造函数引用，避免import
let Vue;

class Store {
  constructor(options) {
    // this.$options = options;
    // 保存mutations、actions、getters选项
    this._mutations = options.mutations;
    this._actions = options.actions;
    this._getters = options.getters;
    
    // 定义computed选项
    const computed = {}
    // 给用户暴露一个getters
    this.getters = {}
    
    const store = this
    
    Object.keys(this._getters).forEach(key => {
      // 获取用户定义个getters
      const fn = store._getters[key]
      // 转换为computed使用的无参数的形式，做一个高阶封装
      computed[key] = function() {
        return fn(store.state)
      }
      // 将getters设置为只读属性
      Object.defineProperty(store.getters, key, {
				get() {
          return store._vm[key]
        }
      })
    })

    // 响应化处理state 
    // this.state = new Vue({
    //   data: options.state
    // })
    
    this._vm = new Vue({
      data: {
        // 加两个$，Vue不做代理
        $$state: options.state
      },
      // 把getters当成一个计算属性去实现就可以了。注意computed的函数是无参数的。
      computed: {
      	a: function() {
          return this.state.a + this.state.b
        }
      }
      
    })
		
    // 绑定commit、dispatch的上下文为store实例
    // 绑定commit上下文否则action中调用commit时可能出问题!!
    // 同时也把action绑了，因为action可以互调
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  // 保护state，防止用户直接修改state，利用存取器
  // 存取器， store.state
  get state() {
    console.log(this._vm);
    
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('你造吗？你这样不好！');
  }

  // 根据用户传入type执行对应mutation
  // store.commit('add', 1)
  // type: mutation的类型
  // payload：载荷，是参数
  commit(type, payload) {
    const entry = this._mutations[type]
    if (entry) {
      // 传递state给mutation
      entry(this.state, payload)
    }
  }

  // 根据用户传入type执行对应action，同时传递上下文 
  dispatch(type, payload) {
    const entry = this._actions[type]
    if (entry) {
      entry(this, payload)
    }
  }

}

function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })

}

// Vuex
export default {
  Store,
  install
}
```



## 遗漏问题

### 尝试去看看 VueRouter 的源码，并解答：嵌套路由的解决方式

 GitHub，所有代码在 src

* 做 router-view 的深度标记
* 路由匹配时获取代表深度层级的 matched 数组

### 尝试去看看 Vuex 的源码

GitHub，所有代码在 src，要研究的主要目标是入口 index.js 和 store 实例的地方 store.js。

### 了解 Vue 数据响应原理 

Vue 常见的数据响应式的实现：

```js
Object.defineProperty() // 这是最底层的
Vue.util.defineReactive()
Vue.observable()
new Vue({
  data() {}
})
//...等
```

这些东西的内部是怎么去做数据修改的追踪拦截的。

像数组这样的不支持 Object.defineProperty() 的应该怎么去做。

界面中视图的更新函数到底从哪来，怎么这个数据变了那个部分就要去更新呢，就会涉及到依赖收集这样的概念。

### Vue 全家桶知识点思维导图

https://www.processon.com/view/link/5e146d6be4b0da16bb15aa2a#map