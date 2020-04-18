import Link from './krouter-link'
import View from './krouter-view'

let Vue;

// 1.实现一个插件：挂载$router实例到prototype上 
// 一个vue插件就是一个普通对象，它只需要实现一个install方法就可以了

// 按照这个思路，我们先创建一个class
class KVueRouter {
  // 接收用户传进来的配置参数options
  constructor(options) {
    this.$options = options
    console.log(this.$options);
    

    // 需要创建响应式的current属性
    // 利用Vue提供的defineReactive做响应化
    // current变成响应式的了，不管在任何组件中用到这个current，我们就会把它收集起来，这样将来current变化的时候，依赖的组件
    // 会重新render
    Vue.util.defineReactive(this, 'current', '/')

    // 嵌套路由更改 
    // this.current = window.location.hash.slice(1) || '/'
    // Vue.util.defineReactive(this, 'matched', [])
    // // match方法可以递归的遍历路由表，获得匹配关系的数组
    // this.match()

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
    // 提前处理路由表避免在krouter-view的render里每次都循环查找对应的路由component
    this.routeMap = {}
    options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
  }

  onHashChange() {
    console.log(window.location.hash);

    this.current = window.location.hash.slice(1)
    // this.matched = []
    // this.match()
  }

  // match (routes) {
  //   routes = routes || this.$options.routes

  //   // 递归遍历路由表
  //   for (const route of routes) {
  //     if (route.path === '/' && this.current === '/') {
  //       this.matched.push(route)
  //       return
  //     }
  //     // /about/info
  //     if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
  //       this.matched.push(route)
  //       if (route.children) {
  //         this.match(route.children)
  //       }
  //       return
  //     }
  //   }
  // }
}

KVueRouter.install = function (_Vue) {
  // 保存构造函数，在KVueRouter里面使用
  Vue = _Vue;

  // 挂载$router
  // 怎么获取根实例中的router选项
  // 只要混入一个生命周期的钩子或者是任何一个方法，在钩子或方法里面就可以拿到组件的实例了
  Vue.mixin({
    // 全局混入中的这个生命周期钩子将来会在所有的组件中都执行一遍
    beforeCreate() {
      // 确保根实例的时候才执行
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }

    }
  })
  // 为什么要用混入方式写?主要原因是use代码在前，Router实例创建在后，而install逻辑又需要用到该实例


  // 任务2：实现两个全局组件router-link和router-view
  
  // Vue.component('router-link', {
  //   template: '<a></a>' // 为什么这不能写template，原因是当前使用的是纯运行时的版本，现在使用的是webpack环境，在最终
  //                       // 编译的版本中是不存在编译器的，template就没办法编译。所以不能用template这种方式去描述你的
  //                       // 组件。在纯运行时的环境，只能使用render函数来描述你的组件。
  // })
  Vue.component('router-link', Link)
  Vue.component('router-view', View)
}

export default KVueRouter