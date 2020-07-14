## 路由 - Vue Router

vue-router 主要完成的任务是路由的问题。因为我们单页面应用程序需要在不同的页面内容之间来进行切换，所以我们就需要路由这样的一个库。

Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

### 安装

vue-cli 环境下

```bash
vue add router
```

### 基础

#### 起步

路由规划、配置，src/router/index.js。

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

将 router 加入到程序根组件的配置选项中去，这样的话将来在组件中就可以通过 this.$route 的方式来访问全局的 VueRouter 的单实例。

```js
import Vue from  'vue'
import router form './router'
import App form 'app.vue'

new Vue({
	router,
  render: h => h(App)
}).$mount('#app')
```

####

路由出口、导航，App.vue。一般来讲在根组件上加。将来我们路由的内容就会在这里去显示了。

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

#### 动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由配置中加上一个占位符，官方叫“动态路径参数”(dynamic segment) 来达到这个效果：它的特点是在前面加上一个冒号，表明这是将来的参数，

```js
{ path: '/user/:id', component: User }
```

范例：查看课程详情：

路由配置，router/index.js

```js
{
  path: '/course/:name',
  component: () => import('../views/Detail.vue')
}
```

参数传递，views/List.vue

```vue
<template>
	<div>
    <router-link :to="`/course/${c.name}`">
      {{ c.name }}
    </router-link>
  </div>
</template>
```

参数获取，views/Detail.vue

```vue
<template>
  <div>
    <h2>detail page</h2>
    <p>{{$route.params.name}} ...</p>
  </div>
</template>
```

通过上面的例子知道，我们可以匹配一个模式，所以我们可以更加广泛和通用的做一个通配符匹配：适合做404页面路由

将来这个配置会作为没有任何匹配的处理，匹配顺序是按路由配置表从上往下的，如果前面都没有任何匹配，那就只能会走到这里，这个一定会匹配，匹配之后会有一个 404 的组件。

```js
{
  // 会匹配所有路径
  path: '*', // 
  component: () => import('../views/404.vue')
}
```

#### 嵌套路由

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件。

因为组件实际是有嵌套的，所以路由上也用嵌套的形式去把它展现出来是最佳方式。

路由其实做到跳转的路径和配置的路径相匹配就可以了。

范例：嵌套方式显示课程详情。

路由配置，router/index.js

```js
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
  ]
}
```

views/List.vue

```vue
<template>
	<div>
    <router-link :to="`/about/course/${c.name}`">
      {{ c.name }}
    </router-link>
    // 嵌套内容的出口
    <router-view></router-view>
  </div>
</template>
```

实现嵌套路由之后会有一个隐藏的，很容易出现错误的地方，假设我需要根据详情页的 name 参数发送一个 AJXA 请求，来获取课程的详情，这时我会在 Detail.vue 的 created 钩子里去发送这个请求，但是你会发现，这个请求只有在这个组件创建的时候发送了，以后每次切换路由的时候不再发送了，内在的原因其实是组件的复用，因为为了提高程序的效率，它会发现虽然路由发生了变化，但是这个 Detail 组件根本就不需要重新创建了，它只是复用就可以了，在这种情况下这个组件不会销毁并且重新创建了，于是我们没有机会让它去多次执行 created 这个生命周期，那怎么办呢，一般来讲，解决这个问题的方式是大家可以写一个关于当前路由对象 $route 的监听器。监听路由的变化，这样就满足了我们平常工作中的一些特别的情况。

响应路由参数变化，views/Detail.vue

```js
export default {
  watch: {
    $route: {
      handler: () => {
        console.log("$route change");
        // 在这重新发请求
      },
      immediate: true
    }
  }
}
```

#### 编程导航

路由的导航跳转除了上面使用的 router-link 的方式，我们还有一种编程式的导航，可以用 JS 代码的方式进行跳转，这种方式更加灵活方便，借助路由器的实例 router 的方法，可编写 JS 代码来实现编程式导航。

router 方法的名字来自于底层具体的实现，H5 里面有一个 History API，这里有些方法叫 push pop，它可以往历史记录的堆栈中去添加新的记录或弹出记录。

```js
router.push(location, onComplete?, onAbort?)
```

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

范例：修改为课程详情跳转为编程导航

```vue
<template>
  <div @click="selectedCourse = c; $router.push(`/course/${c.name}`)">
    {{ c.name }}
  </div>
</template>
```

命名路由

通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：

```vue
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

调用 router.push() 时：

```js
router.push({ name: 'user', params: { userId: 123 }})
```

### 进阶

#### 路由守卫

vue-router 提供一个守卫的方式，主要是来保护用户的路由的安全，主要通过跳转或取消的方式守卫导航，比如我现在有一些路由，如果用户没有权限的话，他不应当看到这个路由所对应的内容，这个时候我们对这个路由进行保护就显得比较重要了。

我们对路由的保护有几种方式，有多种机会植入路由导航过程中，主要是在进入路由之前进行一个拦截，拦截的时间点有三种：全局的，单个路由独享的，或者组件级的。

##### 全局守卫

全局守卫是所有的路由在进行导航之前必定会经过的关卡，我们在这里就可以做一个统一的验证，这是范围最大的一种守卫。

在 router/index.js 里可以对这个路由器定义一个全局守卫。

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
```

##### 路由独享的守卫

守卫的规模影响范围可以变得更小，可以在某个路由的配置上直接定义 beforeEnter 守卫：

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

守卫最小的级别，就是组件级，就只守卫一个组件。可以在路由组件内直接定义以下路由导航守卫：

* beforeRouteEnter
* beforeRouteUpdate
* beforeRouteLeave

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
  }
}
</script>
```

#### 数据获取时机

关于路由的数据获取我们也有一个讨论的必要。主要是因为路由在激活的时候，我们有可能有一些异步数据的获取。

以前我们用的比较多的是 created 或 mounted，创建或者挂载的时候，但是涉及到路由的时候呢，这个行为就需要多考虑一下了。因为你会发现当我每次切换路由的时候，数据又重新的加载了一次，这意味着我们实际上在切换路由的时候，这个组件默认情况下总是会重新创建，这就有一个问题了，我有没有这个必要去频繁的获取数据，或者说我在获取这个数据的时候到底是在什么时间点比较合适。

如果需要获取异步数据，我们要考虑在什么时机获取数据比较合适，有两个时机：

获取时机的问题：官方的例子

在路由导航前，去做获取数据和数据处理的过程：

```js
// 在进入路由之前，组件未渲染，通过给next传递回调访问组件实例
beforeRouteEnter (to, from, next) {
  getPost(to.params.id, post => {
    next(vm => vm.setData(post))
  })
},
// 在做更新操作的时候，组件已渲染，因为组件复用了，组件不会重新创建，可以访问this直接赋值
beforeRouteUpdate (to, from, next) {
  // 既然组件不会重新创建，它会不停的走这个beforeRouteUpdate，这时组件实例已经存在且不会销毁，我们可以把数据至		 空，然后重新获取，获取完后再重新设置为最新的，这样就可以实现数据的更新了。
  this.post = null
  getPost(to.params.id, post => {
    this.setData(post)
    next()
  })
}
```

在组件创建之后，路由导航完成之后：

```js
// 在created直接获取数据
created () {
  this.fetchData()
},
// 观察路由的变化，重新获取数据
watch: {
	'$route': 'fetchData'
}
```

#### 动态路由

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

#### 路由组件缓存

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

#### 路由懒加载

路由组件的懒加载能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

```js
() => import("../views/About.vue")
```

把组件按组分块

```js
() => import(/* webpackChunkName: "group-about" */ "../views/About.vue")
```



## 统一状态管理 - Vuex

统一状态管理 Vuex 具体的使用，以及它存在的价值。

工作机制：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用**集中式存储和管理**应用的所有组件的状态，并以相应的规则保证状态以**可预测的方式**发生变化。 

**集中式存储和管理**的好处，组件之间更方便的通信，测试性，维护性等。也有利于服务端渲染的同构开发。

**可预测的方式**的好处，让程序更健壮，出了问题更容易反查。

那我怎么做到这一点呢，每次用户想要改变数据的时候，不能有改变数据的权利，组件想要改 Vuex 里面的状态的时候，它不能直接去设置这个状态，我们可以做到它只要设置就报错，我们就很好的保存了这个状态，我只能去派发一个动作或者提交一个 Mutation 之类的方式，总之我要传递一个信号去告诉 Vuex 说，我想更新这个状态，这时 Vuex 才会接受这个更新，做相应状态的变更，这个状态变更之后，还要把最新改变的状态反馈到视图中，Vuex 的做法是怎样的，它和 Vue 之间做了一个紧耦合，它利用了 Vue 的数据响应式，一旦某个数据发生变化之后，我可以立刻做响应，我的响应方式是把数据的变化传递到组件中，使之重新渲染。其实就是因为我们利用了数据响应式，所以界面中的这些绑定的数据自动的就会重新刷新了。这样一个非常简单的单向数据流就形成了。这样的话，整个系统的结构会变得非常健康，简单，出了问题一定可以找出来，因为每个人在提交状态变更之前，是可以拦截做变更的，所以我完全可以在这做任何事情，只要有消息进来，我就可以判断这个消息是谁发的，它想干什么，我可以做记录，把之前的状态和现在的状态都记录下来，这是个典型的记录器模式，我们做事件漫游等等都可以完成，所以有了这种可预测的方式，程序变得更好了。软件工程里面强调的一个思想，就把它实践和践行了。这是 Vuex 的必要性。

![Vuex](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/Vue/Vuex.png)

### 安装

```bash
vue add vuex
```

### 起始

Vuex 里面核心的概念：

在 **Vuex** 里面抽象出来了一个存储状态的一个**容器 Store**，可以理解为它是一个数据仓库来存储我们的状态。我们的**状态是 State**，这个状态将来有可能会变更，**能变更状态的只有一种方式就是 Mutation**，用户可以提交变更来更新状态。但是为什么还有一个 Actions 呢，因为在实际的工作中，很多操作根本不是同步的，所以我们需要一个前置的东西，也就是这些 **Action 去做这些异步的复杂的业务**，完成异步的复杂的任务之后才真正的提交本地状态的更新。**所以就引出了这么三个概念，分别是 Actions、Mutations 和 State，当然还有它们共同的容器叫 Store。**

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

#### State

将应用全局状态定义在 state 中。

```js
export default new Vuex.Store({
  state: {
    isLogin: false
  }
}
```

#### Mutation

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

#### Action

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

#### 模块化

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
export default new Vuex.Store({
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

#### 映射方法 mapState()/mapMutation()/mapAction()

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

#### 派生状态 Getter

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

#### 严格模式

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