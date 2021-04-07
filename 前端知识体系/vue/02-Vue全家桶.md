### VueRouter

##### 编程式导航

\<router-link> 实现的功能和编程式导航是相同的。router.push 等效于 \<router-link :to="..."> ，router.replace 等效于 \<router-link :to="..." replace> 。

router.replace 用法跟  router.push 一样，但是会替换掉当前的 history 记录。

query 设置了 url 上就会有，params 需要在路由配置的时候做动态路由匹配 url 上才会有。

```js
// router.push(location, onComplete?, onAbort?)
// 参数是字符串路径或一个描述地址的对象。
// 字符串
router.push('user') // 字符串路径
router.push('/user') // 字符串路径
router.push(`/user/${userId}`) // 带params参数的字符串路径
router.push(`/user?userId=${userId}`) // 带query参数的字符串路径
// 对象 path
router.push({ path: 'user' })
router.push({ path: '/user' })
router.push({ path: `/user/${userId}` })
router.push({ path: `/user?userId=${userId}` })
router.push({ path: '/user', params: { userId: '123' }}) // 失效，页面拿不到params的信息
router.push({ path: '/user', query: { userId: '123' }})
// 对象 name
router.push({ name: 'user' })
router.push({ name: 'user', params: { userId: '123' }})
router.push({ name: 'user', query: { userId: '123' }})

// router.resolve()
// 跳转新页面
const routeUrl = this.$router.resolve(url)
window.open(routeUrl.href, '_blank')

// router.go(n)
// 参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。
```

##### 导航守卫

全局守卫

```js
const router = new VueRouter({ 
  routes: [ 
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */'../views/About.vue'),
      children: [
        {
          path: '/about/course/:name', // 基于父路由的相对路径
          name: 'detail',
          component: () => import('../views/Detail.vue')
  			}
      ],
			meta: {
        auth: true                  
      }
    }
  ] 
})

// 在每一次路由跳转的时候，这3个钩子都会被触发
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象，我要去哪的路由
  // from: Route: 当前导航正要离开的路由，我来自于哪的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。我应不应该放行的next函数。
  
  // 判断要去的路由是否需要守卫，因为不是所有路由都需要守卫的。
  // 这里有一些比较常见的手法，比如利用meta数据的方式。
  if (to.meta.auth) {
		// 判断用户是否登录
    // 在一个全局公共的地方去保存这个登录状态
    if (window.isLogin) {
      // 登录了放行
    	next() 
    } else {
      // 没登录跳到登录页面，并把原本要去的也买呢传递过去，使其登录后可以直接跳到原本想去的页面
      next('/login?redirect=' + to.fullPath)
    }
  } else {
    // 不需要守卫的路由，它可以直接访问。
    next()
  }
})
router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})
// 每次导航跳转之后会触发，所以就不需要next了
router.afterEach((to, from) => {
  console.log('after each invoked')
})
```

路由独享的守卫

```js
const router = new VueRouter({ 
  routes: [
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */'../views/About.vue'),
      children: [
        {
          path: '/about/course/:name', // 基于父路由的相对路径
          name: 'detail',
          component: () => import('../views/Detail.vue')
  			}
      ],
     	// 这个钩子只有在我们进入这个路由之前，才会被调用
			beforeEnter(to, from, next) {
        if (window.isLogin) {
          next()
        } else {
          next('/login?redirect=' + to.fullPath)
        }
      }
    }
  ] 
})
```

组件内守卫

```vue
<script>
export default {
  beforeRouteEnter(to, from, next) {
    if (window.isLogin) {
      next();
    } else {
      next("/login?redirect=" + to.fullPath);
    }
    // 这里获取不到组件实例this，因为进入组件路由之前组件实例还没有创建，想要使用组件实例，需要在next的回调中获取。
    // next(vm => {
    //   console.log(vm.id)
    // })
  },
  
  // 不同的路由下使用同一个组件时触发，例如params变化时，可以在这个时候重新获取数据，避免了使用watch来观察params中的id变化。因为使用的是同一个组件所以mounted只会触发一次，所以数据的获取不能在mounted里做，只能使用beforeRouteUpdate这个路由钩子或者使用watch来获取数据
  beforeRouteUpdate (to, from, next) {
    console.log('todo update enter')
    next()
  },
  
  // 路由离开的时候，这时可以做提醒用户是否要离开的操作，用来控制页面离开的行为
  beforeRouteLeave (to, from, next) {
    console.log('todo leave enter')
    if (global.confirm('are you sure?')) {
      next()
    }	
  }
}
</script>
```



### Vuex

##### 模块

user.js

```js
export default {
  namespaced: true, // 设置独立的命名空间，避免命名冲突，副作用是访问的时候稍微麻烦一点 
  state: {
    isLogin: false
  },
  mutations: {
    login(state) {
      state.isLogin = true
    }
  },
  actions: {
    login({commit}, username) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === 'admin') {
            commit('login');
            resolve();
          } else {
            reject();
          }
        }, 1000);
      })
    }
  }
}
```

```js
import user from './user'

export default new Vuex.Store({
  modules: {
    user
  }
})
```

访问和调用

```vue
<template>
	<button @click="login" v-if="!$store.state.user.isLogin">登录</button>
</template>

<script>
export default {
  methods: {
		login() {
			// this.$store.commit('user/login')
      this.$store.dispatch('user/login', 'admin').then(() => {
       
      }).catch(() => {})
    }
  }
}
</script>
```

模块之间的调用：

```js
// 1. 在actions中使用
commit('a/getList', {}, { root: ture })
dispatch('a/getList', {}, { root: ture })
// 可以从actions接收的store对象中解构出rootState和rootGetters，使用这两个对象就可以获取其他模块的state和getters
actions: {
  a({ rootState, rootGetters}, params) {
    console.log(rootState.a.data)
    console.log(rootGetters['a/getterData'])
	}
}
// 2.在任何地方使用，直接把相应模块文件引入
```

##### 映射方法

mapState 返回的是一个对象键值对的形式，键是 isLogin，值是将来要生成的 function，这个 function 返回的值就是 Store 中 isLogin 的值，正好对应 computed 的形式。

```vue
<template>
	<button v-if="!isLogin" @click="login">登录</button>
</template>

<script>
import { 
  mapState,
  mapMutations,
  mapActions
} from 'vuex'

export default {
  computed: {
    // ...mapState('user/isLogin') // 映射出来的名字是 user/isLogin
    ...mapState('user', ['isLogin']) // 映射出来的名字是 isLogin
  },
  methods: {
    // ...mapMutations('user', ['login'])
    // ...mapActions('user', ['login']),
    ...mapMutations(['user/login']),
    ...mapActions(['user/login']),
    login() {
      // this['login']();
      this['user/login']();
    }
  }
}
</script>
```

##### 给 vuex 加上热更替的功能

store.js

```js
if (module.hot) {
  module.hot.accept([
    // 这个数组里面的列表对应的就是我们去引用的那几个文件它的地址
    './state/state',
    './mutations/mutations',
    './getters/getters',
    './actions/actions'
  ], () => {
    const newState = require('./state/state').default
    const newMutations = require('./mutations/mutations').default
    const newGetters = require('./getters/getters').default
    const newActions = require('./actions/actions').default
    store.hotUpdate({
      state: newState,
      mutations: newMutations,
      getters: newGetters,
      actions: newActions
    })
  })
}
```



### VueRouter 原理

##### 核心使用步骤

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

##### 需求设计思路

通过使用的分析，大概就能知道做 vue-router 插件有哪些任务了。

需求是当浏览器 url 的地址发生变化的时候我们能够知道，并且页面不刷新，同时还能切换页面内容。

浏览器里有两种解决方案：

hash：添加 hash 浏览器不会刷新，而且会收到 hashchange 这个事件，这样我们就知道 hash 发生变化了。

h5 的 history API：h5 的 history API 有一个 pushState/replaceState 事件，利用的真实的 url 变化，操作 history 历史记录的堆栈，利用这些事件，url 是会发生变化的，但是浏览器的行为是依然不跳转。

##### 源码实现

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
  // 为什么要用混入方式写？主要原因是use代码在前，Router实例创建在后，install中还不能直接拿到创建好的router实例，所以要用mixin的方式在Vue实例创建的时候在钩子函数中将router放到Vue.prototype上。
  Vue.mixin({
    beforeCreate() {
      // 确保根实例的时候才执行
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 任务2：注册两个全局组件router-link和router-view
  // 这里不能使用template的方式去描述标签的原因是我们使用的是纯运行时的Vue版本，因为是webpack环境，最终的编译版本中是不存在编译器的，所以没有办法编译template。
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
    const {routeMap, current} = this.$router
    const component = routeMap[current].component || null
    return h(component)
  }
}
```



### Vuex 原理

##### 需求设计思路

有一个视图 view，有一个 Vuex 的 Store 实例，Store 里有一个 state 属性，在 view 里使用 $store.state.xx 来访问 Store 里的数据。我们现在要实现一个 view 和 Store 之间的单向数据流，我想改 state，必须通过 Store 提供的 commit 方法提交一个 mutation 去改，所以 Store 里面还要实现一个 commit 方法，根据 type 参数可以从用户配置的那些 mutations 里找到对应的修改方法，然后用这个方法对 state 做修改，让这个 state 是一个响应式的数据，state 状态的变化就能够通知界面去重新的 render，我们利用 Vue 来做 state 的数据响应式。所以 Vuex 是跟 Vue 强耦合的，只能用在 Vue 里面。

要实现一个 Store 类，里面有一个 state 属性，还有两个方法，commit 和 dispath。commit 可以直接改 state，dispatch是给它传个上下文，让它通过调 commit 的方式来改 state。这是写 store 的思路。还有一个数据响应式的问题，是通过 new Vue({data: options.state}) 的方式将 state 变成响应式数据的，这样 state 发生变化，使用 state 数据的组件就会重新 render。

##### 源码实现

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
      // 获取用户定义的getters
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

