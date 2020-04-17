import Vue from 'vue'

// 用函数的方式创建组件的实例，将来挂载到body上去。这个组件实例怎么创建，怎么脱离当前vue的实例去单独的挂载到body上。

// 接收一个组件的配置。弹窗显示内容的配置参数。
function create(Component, props) { 
  // 组件构造函数如何获取？我们.vue文件export的对象不是构造函数，它只是一个配置对象，这个配置对象将来必须要变成实例，就是通过
  // 构造函数变的。这些组件的配置需要变成构造函数，然后才能创建它的实例。
  // 这两种方法可以得到构造函数
  // 1.Vue.extend()
  const Ctor = Vue.extend(Component)
  // 创建组件实例
  const comp = new Ctor({propsData: props})
  comp.$mount()
  document.body.appendChild(comp.$el)
  comp.remove = function() {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }

  // 2.render
  // const vm = new Vue({
  //   // h是createElement, 返回VNode，是虚拟dom
  //   // 需要挂载才能变成真实dom
  //   render: h => h(Component, {props}),
  // }).$mount() // 不指定宿主元素，则会创建真实dom，但是不会追加操作

  // // 获取真实dom
  // document.body.appendChild(vm.$el)

  // const comp = vm.$children[0]

  // // 删除
  // comp.remove = function() {
  //   document.body.removeChild(vm.$el)
  //   vm.$destroy()
  // }

  return comp

}

export default create
