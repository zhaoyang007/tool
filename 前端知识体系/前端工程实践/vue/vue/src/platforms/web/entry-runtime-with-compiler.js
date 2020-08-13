/* @flow */

import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})
//zy 保存原来的$mount
const mount = Vue.prototype.$mount
/** zy
 * 覆盖（扩展）默认的$mount，由于现在是web平台，而且是跟编译器相关的事情，所以这里做的事情一定是编译这件事，
 * 这里扩展的就是跟编译器相关的东西我们平时在写代码new Vue的时候，会传上一个el，但我们现在通常是使用$mount
 * 挂载的方式，这些方法有什么区别呢，假设在el的写法中还设置了template:'<div>template</div>'，还写了一个
 * render(h){return h('div','render')}，它们谁会起作用，谁的优先级高呢，我们可以从下面的源码里获得答案。
 */
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  //zy 研究源码的过程，有些代码是你可以直接忽略的，我们可以直接看核心的代码
  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }
  //zy 解析用户传进来的option选项
  const options = this.$options
  
  /** zy
   * 优先级：render > template > el
   * 这个优先级在使用中其实是有差别的，如果用template就必须明确的调用$mount方法去挂载最终的目标，不然就没
   * 法正常的渲染。el是不需要$mount的。这就是平时初始化代码为什么这样写，区别是什么。测试阶段el是最方便的
   * 方式。
   */
  //zy 先判断如果没有render的情况下，才会执行里面的代码，如果设置了render，里面的代码都不会执行了。
  // resolve template/el and convert to render function
  if (!options.render) {
    //zy 拿出template
    let template = options.template
    //zy 对template进行判断
    //zy 有template就用template，否则就用el
    if (template) {
      //zy template是不是字符串
      if (typeof template === 'string') {
        //zy 看看template是不是选择器，所以平时我们用template的时候可以这样指定一个选择器template: '#app'。有什么区别呢？
        if (template.charAt(0) === '#') {
          //zy 按照选择器的方式去找到template作为模版
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      //zy el方式，它直接把当前的el元素所代表的outHTML就作为模版了，所以整个这一块就会作为模版去解析了。
      template = getOuterHTML(el)
    }
    //zy 如果模版存在，执行编译，这就是这个文件里要做的最重要的事情
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      /**zy
       * 它会把刚才拿到的模版执行一下编译，最终就是为了得到渲染函数。所以说不管用户怎么去写，最终还是希望得到
       * 一个render函数。就是我们希望用html的方式去写，然后让编译器帮我们去把这个render函数生成，最后得到
       * 这个渲染函数。然后把这个渲染函数放到我的选项里头。其实和用户在选项中写render是一样的。
       */ 
      //zy 这大概就是初始化的整个过程，了解这些写法的区别。
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')   
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  //zy 当这个render函数出现之后，我就可以执行挂载了。真正的挂载是父级的那个原始的那个mount方法，所以我们下一步肯定要去研究那个父级的mount方法。
  return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions

export default Vue
