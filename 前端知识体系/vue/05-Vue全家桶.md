## 路由 - Vue Router

vue-router 主要完成的任务是路由的问题，因为我们单页面应用程序需要在不同的页面内容之间来进行切换，所以我们就需要路由这样的一个库。

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

入口文件 src/main.js：

将 router 加入到程序根组件的配置选项中去，这样的话将来在组件中就可以通过 this.$router 的方式来访问全局的 VueRouter 的单实例。

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

一般来讲在根组件上加，将来我们路由的内容就会在这里去显示了。

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



### 动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。我们可以在 `vue-router` 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：

```js
const router = new VueRouter({
  routes: [
    // 动态路径参数，使用冒号标记
    { path: '/user/:id', component: User }
  ]
})

// 当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
```

你可以在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params` 中。例如：

|             模式              |      匹配路径       |            $route.params             |
| :---------------------------: | :-----------------: | :----------------------------------: |
|        /user/:username        |     /user/evan      |         { username: 'evan' }         |
| /user/:username/post/:post_id | /user/evan/post/123 | { username: 'evan', post_id: '123' } |



### 编程式导航

借助 router 的实例方法，通过编写代码来实现路由的导航链接。

在 Vue 实例内部，你可以通过 `$router` 访问路由实例。

<router-link> 上实现的功能和编程式导航实现的功能是相同的。

##### router.push(location, onComplete?, onAbort?)

这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

```js
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

注意：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path`：

```js
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 下面的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

同样的规则也适用于 `router-link` 组件的 `to` 属性。

##### router.replace(location, onComplete?, onAbort?)

跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

|              声明式               |        编程式         |
| :-------------------------------: | :-------------------: |
| `<router-link :to="..." replace>` | `router.replace(...)` |

##### router.go(n)

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。



### 路由对象 $route

一个路由对象 (route object) 表示当前激活的路由信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的路由记录 (route records)。

每次成功的导航后都会产生一个新的对象。

这个属性是只读的，里面的属性是 immutable (不可变) 的，不过你可以 watch (监测变化) 它。

- $route.params

  - 类型: `Object`

    一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。

- $route.query

  - 类型: `Object`

    一个 key/value 对象，表示 URL 查询参数。例如，对于路径 `/foo?user=1`，则有 `$route.query.user == 1`，如果没有查询参数，则是个空对象。

    

### Router 实例 $router



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

统一状态管理 Vuex 具体的使用，以及它存在的价值。

工作机制：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用**集中式**存储和管理应用的所有组件的状态，并以相应的规则保证状态以**可预测**的方式发生变化。 

**集中式**存储和管理的好处，组件之间更方便的通信，测试性，维护性等。要是分散到各个组件里头就极容易出问题。因为组件之间要有同步的问题。也是为了程序的稳定。而且这样统一的管理很有利有同构开发，服务端渲染 ssr 只需要在服务器上跑一个 Vue 的实例，然后把当前 Store 里存的状态渲染出来，然后把渲染出来这个页面的 html 信息直接返回给前端就行了。

**可预测**的方式的好处，让程序更健壮，出了问题更容易反查。将来调试的时候任何状态变化有问题很容易查出来是谁在尝试着变更新的状态。数据变更之前也可以做很多事情，做日志记录，统计分析等。主要是错误的排查和可追溯。遵循单向数据流。

那我怎么做到这一点呢，每次用户想要改变数据的时候，不能有改变数据的权利，组件想要改 Vuex 里面的状态的时候，它不能直接去设置这个状态，我们可以做到它只要设置就报错，我们就很好的保存了这个状态，我只能去派发一个动作或者提交一个 Mutation 之类的方式，总之我要传递一个信号去告诉 Vuex 说，我想更新这个状态，这时 Vuex 才会接受这个更新，做相应状态的变更，这个状态变更之后，还要把最新改变的状态反馈到视图中，Vuex 的做法是怎样的，它和 Vue 之间做了一个紧耦合，它利用了 Vue 的数据响应式，一旦某个数据发生变化之后，我可以立刻做响应，我的响应方式是把数据的变化传递到组件中，使之重新渲染。其实就是因为我们利用了数据响应式，所以界面中的这些绑定的数据自动的就会重新刷新了。这样一个非常简单的单向数据流就形成了。这样的话，整个系统的结构会变得非常健康，简单，出了问题一定可以找出来，因为每个人在提交状态变更之前，是可以拦截做变更的，所以我完全可以在这做任何事情，只要有消息进来，我就可以判断这个消息是谁发的，它想干什么，我可以做记录，把之前的状态和现在的状态都记录下来，这是个典型的记录器模式，我们做事件漫游等等都可以完成，所以有了这种可预测的方式，程序变得更好了。软件工程里面强调的一个思想，就把它实践和践行了。这是 Vuex 的必要性。

![Vuex](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/Vue/Vuex.png)



### 起始

Vuex 里面核心的概念：

在 **Vuex** 里面抽象出来了一个存储状态的一个**容器 Store**，可以理解为它是一个数据仓库来存储我们的状态。我们的**状态是 State**，这个状态将来有可能会变更，**能变更状态的只有一种方式就是 Mutation**，用户可以提交变更来更新状态。但是为什么还有一个 Actions 呢，因为在实际的工作中，很多操作根本不是同步的，所以我们需要一个前置的东西，也就是这些 **Action 去做这些异步的复杂的业务逻辑**，完成异步的复杂的任务之后才真正的提交本地状态的更新。**所以就引出了这么三个概念，分别是 Actions、Mutations 和 State，当然还有它们共同的容器叫 Store。**

那我们现在要玩这个东西的话，我们首先要创建 Store，并且在 Store 中间设置这三个状态。

创建 Store：

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

入口文件 src/main.js：

将 store 加入到程序根组件的配置选项中去，这样的话将来在组件中就可以通过 this.$store 的方式来访问咱们全局的 Store 的单实例。

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

##### Mutation

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

##### Action

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
      this.$store.dispatch('login', 'admin').then(() => {
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



### 最佳实践

##### 模块化

程序变得很大之后，程序的状态会非常庞大，它是一棵完整的树，为了能够很好的维护这棵树，一个最好的方式是模块化，Vuex 模块化的方式其实就是在创建 Store 的时候，加上一个 modules 这样的选项就可以了。

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

##### 映射方法 mapState()/mapMutation()/mapAction()

现在我们要解决的是访问 store 的状态过长的问题，于是我们就想到怎么能够偷懒，在 Vuex 中提供了一些帮助方法，我们叫映射方法，用这些映射方法，我们可以很巧妙的把它映射到当前组件实例上，加上一些方法或加上一些计算属性，这样我们在访问的时候就比较轻松了，可以少敲几个字，而且避免了对 $store 的直接访问，减少耦合的问题。

state相关修改：

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
      // this['user/login']()
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

##### 派生状态 Getter

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

##### 严格模式

严格模式主要是为了防止用户直接去改 Store 里的状态。

严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

```js
const store = new Vuex.Store({
  strict: true
})
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