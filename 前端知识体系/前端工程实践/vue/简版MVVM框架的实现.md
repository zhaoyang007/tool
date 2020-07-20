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
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
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
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2) // xx text
        // 执行指令
        this[dir] && this[dir](node, exp)
      }
    })
  }

  // 是否是指令
  isDirective(attr) {
    return attr.indexOf('k-') === 0
  }
  
  // k-text
  text(node, exp) {
    this.update(node, exp, 'text')
  }

  // k-html
  html(node, exp) {
    this.update(node, exp, 'html')
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
  
}
```



## 遗漏问题

### 实现数组响应式

思路：

1.找到数组原型，因为在数组的原型中存在着我们希望覆盖的方法

2.覆盖那些能够修改数组的更新方法，使其可以通知更新

我们把这些方法给覆盖掉，让它除了做之前的事情之外，还能额外的做上一个更新通知。数据发生变化之后，可以让它发送一个update这样的通知，视图中就可以做响应了，这样就实现了数组的响应式操作。

3.将得到的新的原型设置到数组实例原型上

### 完成后续 k-model、@xx

@xx

k-model：双向绑定，语法糖，它实际上做了两个事，value值的设定和事件的监听。

### 问题
vue 的 vdom + diff + 操作 dom 就比直接原生或 jquery 直接操作 dom 的性能更高吗

### Vue1.0 和 Vue2.0

以上简版的 MVVM 框架只是 Vue1.0的实现，因为没有涉及虚拟 DOM，直接做 DOM 操作，很粗暴，问题也很明显，因为随着程序的扩大，界面中这些 Watcher 绑定会大量出现，会导致 Watcher 大量的创建，程序大到一定规模之后就扛不住了。所以 Vue1.0 的性能问题主要出在这里。扛不住大程序。所以 2.0 里面做了一个操作是抽取出来一个虚拟 DOM 的概念。一个组件对应一个虚拟 DOM，每一个组件只有一个 Watcher，组件里有这么多的 key，不管哪一个 key 发生变化，我都通知那一个 Watcher 去执行更新，这个 Watcher 执行更新的时候，它怎么知道这个界面中哪个地方发生变化了。所以这就是虚拟 DOM 不得不引进来的必要因素了，这时候就必须有虚拟 DOM 的概念，我根据最新的值计算出来一个新的虚拟 DOM 和老的一比较（diff一下）得到一个差值，就知道是哪里变化了。Vue2.0 之所以要引入虚拟 DOM，其实和它对于这个 watcher 粒度的调整有一个直接的关系的，它不是随随便便引进来的，也不是看 React的虚拟 DOM 好它就用，这是它升级实现性能提升的一个必须要走的步骤。