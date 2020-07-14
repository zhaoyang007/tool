/* @flow */

import Vue from 'core/index'
import config from 'core/config'
import { extend, noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser } from 'core/util/index'

import {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} from 'web/util/index'

import { patch } from './patch'
import platformDirectives from './directives/index'
import platformComponents from './components/index'

// install platform specific utils
//zy 装了一些基本的配置
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
//zy 安装了一些web平台特有的指令和组件
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

//zy 我们主要研究这下面这两个比较重要的步骤
// install platform patch function
//zy 1.指定了一个补丁方法，这个方法非常重要，它其实就是diff算法要发生的地方，patch的意思就是更新升级打补丁
//zy   这个打补丁的方法主要做的事情是就是把用户传入的虚拟dom转换为真实dom。
//zy   vue中patch有两种功能，一个是初始化时第一次的赋值，一个是以后的更新。
//zy   它跟我们写的vue1.0实现的编译器的逻辑有点像，但它是基于虚拟dom实现的操作
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
//zy 2.实现$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  //zy 用户在$mount方法中传入的宿主el查到
  el = el && inBrowser ? query(el) : undefined
  //zy 这里就是执行初始化呢，将首次渲染的结果替换el
  return mountComponent(this, el, hydrating)
}

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(() => {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue)
      } else if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test'
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        )
      }
    }
    if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        `You are running Vue in development mode.\n` +
        `Make sure to turn on production mode when deploying for production.\n` +
        `See more tips at https://vuejs.org/guide/deployment.html`
      )
    }
  }, 0)
}

export default Vue
