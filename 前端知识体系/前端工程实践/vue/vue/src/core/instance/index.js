import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

//zy Vue构造函数，非常简单，只执行了一行代码
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  //zy 初始化，这个init方法是通过initMixin这种混入的方式混入进来的。这是一种混入的模式。
  this._init(options)
}

// 所有的实例方法都在这去声明。
initMixin(Vue)  //zy 通过该方法给Vue添加_init方法
stateMixin(Vue) //zy 状态相关api的混入 $data,$props,$set,$delete,$watch
eventsMixin(Vue) //zy 事件相关api的混入 $on,$once,$off,$emit
lifecycleMixin(Vue) //zy 跟生命周期相关的更新，渲染等事情 _update,$forceUpdate,$destroy
renderMixin(Vue) //zy 和渲染函数相关的渲染api _render,$nextTick
// $nextTick：更改数据想立刻看到dom更改的结果。在这行代码的下面看的话，这个结果并没有，因为vue做的是异步更新的操作，想要看到dom变化必须写在$nextTick的回调中。

export default Vue
