## 路由 - Vue Router

### 起步

* 创建路由表
* 创建路由实例，并传入配置
* 将 router 实例放入 Vue 根组件配置中
* 使用 <router-link> <router-view> 来跳转和容纳路由

src/router/index.js。

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
		name: 'home',
    component: Home
  },
  {
    path: '/admin',
		name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```

src/main.js：

```js
import Vue from  'vue'
import router form './router'
import App form 'app.vue'

new Vue({
	router,
  render: h => h(App)
}).$mount('#app')
```

路由出口、导航 App.vue：

```vue
<template>
	<div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/about">管理</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>
```

### 编程式导航

在 Vue 实例内部，可以通过 $router 访问路由实例。

`<router-link>` 实现的功能和编程式导航是相同的。`router.push` 等效于 `<router-link :to="...">` ，`router.replace` 等效于 `<router-link :to="..." replace>` 。

`router.replace` 用法跟  `router.push` 一样，但是会替换掉当前的 history 记录。

query 设置了 url 上就会有，params 需要在路由配置的时候做动态路由匹配 url 上才会有。

##### router.push(location, onComplete?, onAbort?)

参数是字符串路径或一个描述地址的对象。

```js
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
```

##### router.resolve()

```js
// this.$router.push(url)
// 跳转新页面
const routeUrl = this.$router.resolve(url)
window.open(routeUrl.href, '_blank')
```

##### router.go(n)

参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。

### 导航守卫

##### 全局守卫

全局守卫是所有的路由在进行导航之前必定会经过的关卡，在这里可以做一个统一的验证，这是范围最大的一种守卫。

```js
const router = new VueRouter({ 
  routes: [ 
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    },
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

##### 路由独享的守卫

```js
const router = new VueRouter({ 
  routes: [ 
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    },
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

##### 组件内守卫

```vue
// Admin.vue
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

### 动态添加路由

通过 router.addRoutes(routes) 方式动态添加路由， 可以用编程的方式在运行时动态的添加路由。这个就在一些场景有应用价值了。

我们之前是的做法是，所有的路由已经配置好了，但用户能不能进去，我们会做一个拦截判断。反过来想一下，如果这个人压根就没有权限去看这个路由，为什么还要把它配置到路由列表里呢，我能不能根据当前用户的登录角色信息，来决定它能看什么就给路由表里加什么，这岂不是一种更好的方式，所以在很多程序里面会采用这种方式去做路由的动态配置。

```js
// 全局守卫修改为：要求用户必须登录，否则只能去登录页
router.beforeEach((to, from, next) => {
  if (window.isLogin) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login?redirect=' + to.fullPath)
    }
  }
})
```

```js
// Login.vue用户登录成功后动态添加/admin
login() {
  window.isLogin = true;
  this.$router.addRoutes([
    {
      path: "/admin", //...
    }
  ]);
  const redirect = this.$route.query.redirect || "/";
  this.$router.push(redirect);
}
```

### 路由组件缓存

前面有一个场景就是页面路由切换的时候数据反复的加载，因为组件每次都会重新加载，如果确定数据加载之后不会变化，就没必要让它频繁的加载，浪费资源，这时可以把组件缓存下来，不要让它去重置状态，重新创建，这样它就不会重新去获取请求数据了。

利用 keepalive 做组件缓存，保留组件状态，提高执行效率。

范例：缓存 admin 组件

```vue
<keep-alive include="admin">
  <router-view></router-view>
</keep-alive>
```

使用 include 或 exclude 时要给组件设置 name。如果缓存的组件太多，占的资源就会太大，还有一个属性叫 max="3"，超过这个数字，进一个要出一个，最老的缓存的那个要出去，新的进来，保证资源的合理利用。

两个特别的生命周期：activated、deactivated。这个组件它活着，它不再被删除了，那它的显示和隐藏其实只是激活和取消激活这两者，所以 keepalive 的组件只是在这两个生命周期之间来回切换。



## 统一状态管理 - Vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。采用**集中式**存储和管理应用的所有组件的状态，并以相应的规则保证状态以**可预测**的方式发生变化。 

### 起始

* 创建 store，并且在 store 中间设置 state、mutations 和 actions 这三个状态。
* 将 store 实例放入 Vue 根组件配置中。

src/store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```

src/main.js：

```js
import Vue from  'vue'
import store form './store'
import App form 'app.vue'

new Vue({
	store,
  render: h => h(App)
}).$mount('#app')
```

##### State

将应用全局状态定义在 state 中。

```js
export default new Vuex.Store({
  state: {
    isLogin: false
  }
}
```

##### Mutations

一旦出现了状态，就一定会有状态配套的修改的 mutations。

```js
export default new Vuex.Store({
  mutations: {
    login(state) {
      state.isLogin = true
    },
    logout(state) {
      state.isLogin = false
    }
  }
}
```

获取和修改状态

```vue
<template>
	// 使用$store.state获取状态
  <button @click="login" v-if="!$store.state.isLogin">登录</button>
  <button @click="logout" v-else>登出</button>
</template>

<script>
export default {
  methods: {
    login() {
      // 修改状态只能通过store.commit(mutation)
      this.$store.commit('login')
      this.$store.commit('logout')
    }
  }
}
</script>
```

##### Actions

 Action 类似于 mutation，不同在于：Action 提交的是 Mutation，而不是直接变更状态。Action 可以包含任意异步操作。

```js
export default new Vuex.Store({
  actions: {
    login({commit}, username) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === 'admin') {
            commit('login')
            resolve()
          } else {
            reject()
          }
        }, 1000);
      })
    }
  }
}
```

派发动作

```vue
<script>
export default {
  methods: {
		login() {
      this.$store.dispatch('login', 'admin')
        .then(() => {
          const redirect = this.$route.query.redirect || '/'
          this.$router.push(redirect)
        })
        .catch(() => {
          alert('用户名或密码错误')
        })
    }
  }
}
</script>
```

##### Getters

可以对已有的 state 状态做一些处理操作，得到一些新的状态，Getter 的好处是，一旦跟我相关的那个状态发生变化了，我派生的这个状态也会跟着发生变化，它其实是计算属性在 Vuex 中的一个迁移和实现，可以使用 getters 从 store 的 state 中派生出一些状态。

```js
export default new Vuex.Store({
  namespaced: true,
  state: {
    username: '' // 用户名
  },
  getters: { // 派生出欢迎信息
    welcome: state => {
      return state.username + ',欢迎回来';
    }
  },
  mutations: {
    setUsername(state, username) {
      state.username = username
    }
  },
  actions: {
    login({ commit }, username) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === 'admin') {
            // 登录成功，设置用户名
            commit('setUsername', username)
            resolve()
          } else {
            reject()
          }
        }, 1000);
      })
    }
  }
}
```

### 模块

使用 modules 定义多个子模块利于组件复杂状态

```js
import user from './user'

export default new Vuex.Store({
  modules: {
    user
  }
})
```

移动先前登录状态相关代码到 user.js

```js
export default {
  namespaced: true, // 设置独立的命名空间，避免命名冲突，副作用是访问的时候稍微麻烦一点 
  state: {
    isLogin: false
  },
  mutations: {
    login(state) {
      state.isLogin = true
    },
    logout(state) {
      state.isLogin = false
    }
  },
  actions: {
    login({commit}, username) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === 'admin') {
            commit('login')
            resolve()
          } else {
            reject()
          }
        }, 1000);
      })
    }
  }
}
```

访问方式响应变化：

访问的时候要加上明确的命名空间，也就是我们在 modules 里注册的模块的名称。

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
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
      }).catch(() => {
        alert('用户名或密码错误')
      })
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

### 映射方法

用这些映射方法，我们可以很巧妙的把它映射到当前组件实例上，这样我们在访问的时候就比较轻松了，而且避免了对 $store 的直接访问，减少耦合。

state 相关修改：

mapState 返回的是一个对象键值对的形式，键是 isLogin，值是将来要生成的 function，这个 function 返回的值就是 Store 中 isLogin 的值。所以在使用这些 map 的时候，前面要加上属性展开运算符，把它变成 key:value 的形式放到组件实例的属性或方法中去。

```vue
<template>
	<button @click="login" v-if="!isLogin">登录</button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    // ...mapState('user/isLogin') // 映射出来的名字是 user/isLogin
    ...mapState('user', ['isLogin']) // 映射出来的名字是 isLogin
  } 
}
</script>
```

mutations actions 相关修改:

```vue
<template>
	<button @click="login" v-if="!isLogin">登录</button>
</template>

<script>
import { 
  mapMutations,
  mapActions
} from 'vuex'
  
export default {
  methods: {
    // ...mapMutations('user', ['login'])
    // ...mapActions('user', ['login']),
    ...mapMutations(['user/login']),
    ...mapActions(['user/login']),
    login() {
      // this['login']()
      this['user/login']('admin').then(() => {
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(this.$route.query.redirect)
      }).catch(() => {
        alert('用户名或密码错误')
      })
    }
  }
}
</script>
```

### 严格模式

严格模式主要是为了防止用户直接去改 Store 里的状态。

严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

```js
const store = new Vuex.Store({
  strict: true
})
```

### 给 vuex 加上热更替的功能

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

### 插件

Vuex 也是有插件机制的，我们什么时候用插件呢，当你要做一些很额外的业务的时候，和你的状态本身之间没有一个很直接的关系，如果你把这个东西写到状态管理里面去，可能会导致一些情况。

比如我们要实现一个状态的持久化，持久化的方式有很多，存到本地 localStorage，存到 cookie，存到服务器上都可以的， 但这个业务本身和状态变更其实是无关的，如果你把这些代码写到一起会很难看，很难维护，而且如果不同的状态都会影响到这个业务逻辑的时候，我们维护起来就更难了，这时候用插件的形式去做，把它拆分出来单独的去做就比较合理。

Vuex 的 store 接受 plugins 选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函数，它接收 store 作为唯
一参数：

```js
const myPlugin = store => {
  // 当 store 初始化后调用
}
```

注册插件：

```js
import persist from './plugins/persist'

const store = new Vuex.Store({
  plugins: [persist]
})
```

范例：实现登录状态持久化，store/plugins/persist.js

```js
export default store => {
  // store初始化的时候，将存储在localStorage的登录状态还原
  if(localStorage) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      store.commit('user/login')
      store.commit('user/setUsername', user.username)
    }
  }
  // 如果用户登录状态发生变化时，自动的缓入localStorage
  // 订阅所有的mutation，只要mutation有变化，就执行这个回调函数
  store.subscribe((mutation, state) => {
    // 这个type就是mutation里的包含命名空间的方法名 mutation:{type: 'user/login'}
    if (mutation.type === 'user/login') {
      const user = JSON.stringify(state.user)
      localStorage.setItem('user', user)
    } else if (mutation.type === 'user/logout') {
      localStorage.removeItem('user')
    }
  })
}
```
