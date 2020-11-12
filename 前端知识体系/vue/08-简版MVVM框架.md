## MVVM 框架三要素

数据响应式、模板引擎及其渲染

### 数据响应式

数据变化视图更新

### 模版引擎：提供描述视图的模版语法

为了将动态的数据在视图中显示出来，就需要提供描述视图的模版语法（如差值语法），并且能够生成更新函数，以便将来数据变化时能够更行视图，所以就需要实现模版引擎的语法。

### 渲染

实现了模版语法之后，我们必须把它解析，因为它不是真正的 html，所以还要涉及到渲染，把我们写的特殊的动态的绑定生成 html。

Vue1.0 中，即我们今天实现的简版 MVVM 框架中这个渲染指的就是跟新函数做的事情。Vue2.0 中，这个渲染指的是虚拟 DOM 相关的内容。

模板 => VDOM => DOM

把模版转换成虚拟 DOM，虚拟 DOM 就是 JS 对象，它们可以来描述真实的 DOM 对象，VDOM 和 DOM 之间有一个映射关系。当用户改数值的时候，其实用户只是修改虚拟 DOM。怎么个修改法呢，通过一种生成的方式，比如这个数据一变，就重新生成 VDOM，它是一棵树，能够反应这个视图的基本结构，将来再通过 DIFF 算法，把新老树之间做一个对比，得出真正应该做的最小的 DOM 操作。这个就是做渲染的一个策略。



## 最简单的数据响应式

```js
// 数组响应式
// 思路：找到数组原型，覆盖那七个修改数组的方法，让它除了做原来的事情之外，还能够额外做更新通知，这样就实现了数组的响应式操作。并将得到的新的原型设置到data中的数组实例原型上，这样这个数组执行调用这些方法的时候就会以我们添加的方法为准。
// 1.替换数组原型中那7个方法
// 拿到数组原型
const originalProto = Array.prototype
// 备份一份，修改备份
const arrayProto = Object.create(originalProto)

// splice,reverse,sort
['push', 'pop', 'shift', 'unshift'].forEach(method => {
  arrayProto[method] = function() {
    // 原始操作
    arrayProto[method].apply(this, arguments)
    // 覆盖操作：通知更新（对象响应式里的setter操作dep.notify）
    console.log('数组执行 ' + method + '操作');
    
  }
})

// 数据响应式
function defineReactive(obj, key, val) {
  // 递归
  observe(val)
  
  // 对传入obj进行访问拦截
  Object.defineProperty(obj, key, {
    get() {
      console.log('get ' + key);
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set ' + key + ':' + newVal);
        // 如果传入的newVal依然是obj，需要做响应化处理
        observe(newVal)
        val = newVal
        // 更新函数
        update()
      }
    }
  })
}

// 遍历做批量响应化处理
function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    // 希望传入的是obj
    return
  }
  
  // 数组数据响应化
  if (Array.isArray(obj)) {
    // 覆盖该数组的原型
    obj.__proto__ = arrayProto
    // 对数组内部的元素做响应化处理
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i])
    }
  } else {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
  
}

function set(obj,key,val) {
  defineReactive(obj,key,val)
}

// 更新函数
function update() {
  // 更新试图
  app.innerText = obj.foo
}

// 单个数据响应化处理
// defineReactive(obj, 'foo', 'foo')
// obj.foo
// obj.foo = 'fooooooooooooooooo'

const obj = { foo: 'foo', bar: 'bar', baz: { a: 1 }, arr: [1,2,3] }

observe(obj)

obj.foo
obj.foo = 'fooooooooooooooo'
obj.bar
obj.bar = 'barrrrrrrrrrrrrr'

// obj.baz.a = 10 // 深层的数据，拦截不到，需要递归处理里面的对象数据
obj.baz = {a:100} // 如果赋值依然是obj，拦截不到，需要在setter中赋值时做响应化处理
obj.baz.a = 100000

// obj.dong = 'dong' // 添加新的属性，拦截不到，使用set做一次响应化处理
set(obj, 'dong', 'dong')
obj.dong

// Object.defineProperty()对数组无效
// 分析：改变数组方法只有7个
// 解决方案：覆盖数组实例的原型方法，让他们在修改数组同时还可以通知更新
obj.arr.push(4)
```



## 简版 MVVM

![Vue数据响应式](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/Vue/Vue数据响应式.png)

* KVue：框架构造函数。
* Observer：
  * 执行数据响应化（分辨数据是对象还是数组，对这两种类型有不同的操作，所以我们多抽象出来了一层，用这个 Observer 来做）。
    * getter：依赖收集。
    * setter：执行更新函数。
* Compile
  * 编译模版：递归遍历 DOM 树，解析出 node 节点和该节点上动态绑定的值 vm.data.key，还有模版绑定语法类型。根据不同的模版语法创建相应的更新函数，接收解析出来的两个值，做 DOM 操作。
    * 初始化视图，执行更新函数。
    * 创建 Watcher 实例，传入更新函数。
* Watcher：管理更新函数。
* Dep：管理 Watcher。

kvue.js

```js
function defineReactive(obj, key, val) {
  // 递归
  observe(val)

  // 创建一个Dep和当前key一一对应
  const dep = new Dep()
  
  // 对传入obj进行访问拦截
  Object.defineProperty(obj, key, {
    get() {
      console.log('get ' + key);
      // 依赖收集在这里
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set ' + key + ':' + newVal);
        // 如果传入的newVal依然是obj，需要做响应化处理
        observe(newVal)
        val = newVal

        // 通知更新
        // watchers.forEach(w => w.update())
        dep.notify()
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    // 希望传入的是obj
    return
  }

  // 创建Observer实例
  new Observer(obj)
}

// 代理的原数据已经是响应式的了，所以代理数据不需要再做响应式了，只是单纯的做get，set代理操作就行了
// 代理函数，方便用户直接访问$data中的数据
function proxy(vm, sourceKey) {
  // vm是框架实例，sourceKey是vm中的$data
  // 遍历vm[$data]中的所有key，将它代理到vm上的key
  Object.keys(vm[sourceKey]).forEach(key => {
    // 将$data中的key代理到vm上
    Object.defineProperty(vm, key, {
      get() {
        return vm[sourceKey][key]
      },
      set(newVal) {
        vm[sourceKey][key] = newVal
      }
    })
  })
}

// 创建KVue构造函数
class KVue {
  constructor(options) {
    // 保存选项
    this.$options = options;
    this.$data = options.data;

    // 响应化处理
    observe(this.$data)

    // 代理
    proxy(this, '$data')

    // 创建编译器
    new Compiler(options.el, this)
  }
}

// 根据对象类型决定如何做响应化
class Observer {
  constructor(value) {
    this.value = value

    // 判断其类型
    if (typeof value === 'object') {
      this.walk(value)
    }
  }

  // 对象数据遍历响应化
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }

  // 数组数据响应化，待补充
}

// 观察者:保存更新函数，值发生变化调用更新函数
// const watchers = []
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm

    this.key = key

    this.updateFn = updateFn

    // watchers.push(this)

    // Dep.target静态属性上设置为当前watcher实例
    Dep.target = this
    this.vm[this.key] // 读取触发getter
    Dep.target = null // 收集完就置空，防止编译时，读取下一个同样的key时push进去的是该key的上一个更新函数。
  }

  // 更新函数
  update() {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

// Dep：依赖，管理某个key相关所有Watcher实例
class Dep {
  constructor(){
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  notify() {
    this.deps.forEach(dep => dep.update())
  }
}
```

compile.js

```js
// 编译器
// 递归遍历DOM树
// 判断节点类型，如果是文本，则判断是否是插值绑定
// 如果是元素，则遍历其属性判断是否是指令或事件，然后递归子元素
class Compiler {
  // el是宿主元素
  // vm是KVue实例
  constructor(el, vm) {
    // 保存kVue实例，保存需要操作的DOM元素
    this.$vm = vm
    this.$el = document.querySelector(el)

    if (this.$el) {
      // 执行编译，初始化视图
      this.compile(this.$el)
    }
  }

  // 遍历DOM树，开始做编译工作
  compile(el) {
    // 遍历el树
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      // 判断是否是元素
      if (this.isElement(node)) {
        // console.log('编译元素' + node.nodeName);
        this.compileElement(node)
      } else if (this.isInter(node)) {
        // console.log('编译插值绑定' + node.textContent);
        this.compileText(node)
      }

      // 递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  // 是否是元素
  isElement(node) {
    return node.nodeType === 1
  }

  // 是否是差值绑定
  isInter(node) {
    // 首先是文本标签，其次内容是{{xxx}}
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  // 文本节点编译
  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }

  // 元素节点编译
  compileElement(node) {
    // 节点是元素
    // 遍历其属性列表
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // 规定：指令以k-xx="oo"定义 k-text="counter"
      const attrName = attr.name // k-xx k-text
      const exp = attr.value // xx counter
      // 指令处理
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2) // xx text
        // 执行指令
        this[dir] && this[dir](node, exp)
      }
      // 事件处理
      if (this.isEvent(attrName)) {
        // @click="onClick"
        const dir = attrName.substring(1) // 得到click
        // 事件监听
        this.eventHandler(node, exp, dir)
      }
    })
  }

  // 是否是指令
  isDirective(attr) {
    return attr.indexOf('k-') === 0
  }
  
  // 是否是事件
  isEvent(attr) {
    return attr.indexOf('@') === 0
  }
  
  // k-text
  text(node, exp) {
    this.update(node, exp, 'text')
  }

  
  // k-html
  // 双向绑定，语法糖，它实际上做了两个事，value 值的设定和事件的监听。设置 v-model 就是要实现这两个事情，因此在代码的实现层面实现这两件事情就可以了。
  html(node, exp) {
    this.update(node, exp, 'html')
  }
  
  // k-model
  model(node, exp) {
    // update方法只完成赋值操作，是单向的
    // value赋值
    this.update(node, exp, 'model')
    // 事件监听
    node.addEventListener('input', e => {
      // 将新的值赋值给数据
      this.$vm[exp] = e.target.value
    })
  }

  // 编译函数
  update(node, exp, dir) {
    // 编译初始化
    // 组合最终的DOM更新函数xxUpdater
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    // 创建Watcher实例
    // 传入更新函数
    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val)
    })
  }

  textUpdater(node, value) {
    node.textContent = value
  }

  htmlUpdater(node, value) {
    node.innerHTML = value
  }
  
  modelUpdater(node, value) {
    // 表单元素赋值
    node.value = value
  }
  
  // 事件监听处理
  eventHandler(node, exp, dir) {
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp]
    node.addEventListener(dir, fn.bind(this.$vm))
  }
  
}
```
