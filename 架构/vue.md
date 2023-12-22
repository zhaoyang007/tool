# vue

##### 对 mvvm 的理解

* 模版引擎：提供描述视图的模版语法。
* 数据响应式：数据变化视图更新。
* 渲染：把模版转换成 render 函数，render 函数生成 vdom，最后将 vdom 转换成真实 dom。

##### vue 组件间通信

* props
* 自定义事件
* eventbus
* Vuex
* $parent/$root
* $children
* $refs
* provide/inject

##### vue 父子组件生命周期钩子执行顺序

1. 加载渲染过程
   `父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted`
2. 子组件更新过程
   `父beforeUpdate->子beforeUpdate->子updated->父updated`
3. 父组件更新过程
   `父beforeUpdate->父updated`
4. 销毁过程
   `父beforeDestroy->子beforeDestroy->子destroyed->父destroyed`

##### vue 双向绑定实现原理

数据响应式 + 事件发布订阅

##### vue-router 实现原理

监听地址变化，改变响应式数据 current，这个 current 就是路由表的 path，从路由表中获取到最新的 component，把它渲染到 router-view 里。

vue-router.js 

```js
import Link from './router-link';
import View from './router-view';

// 保存构造函数引用，避免import
let Vue;
class VueRouter {
  constructor(options) {
    this.$options = options;
    // 需要创建响应式的current属性
    // 变成响应式的好处是，在任何组件的template或render函数中用到current就会把它收集起来，将来只要我变了，就会通知用到的组件做更新，重新render
    Vue.util.defineReactive(this, 'current', '/');
    // 还可以使用这种方式实现current的响应式
    // this.app = new Vue({
    //   data() {
    //     return {
    //       current: '/'
    //     }
    //   }
    // })
    
    // 监控url变化
    window.addEventListener('hashchange', this.onHashChange.bind(this));
    window.addEventListener('load', this.onHashChange.bind(this));

    // 创建路由映射表
    this.routeMap = {};
    options.routes.forEach(route => {
      this.routeMap[route.path] = route;
    });
  }
  onHashChange() {
    this.current = window.location.hash.slice(1);
  }
}

// 1.实现一个插件
// 一个插件只是个普通对象，并实现 install 方法。
VueRouter.install = function (_Vue) {
  // 保存构造函数，在VueRouter里面使用
  Vue = _Vue;
  // 挂载$router
  Vue.mixin({
    beforeCreate() {
      // 根实例的时候才执行
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  });
  // 注册全局组件router-link和router-view
  Vue.component('router-link', Link);
  Vue.component('router-view', View);
}

export default VueRouter;
```

router-link.js 

```js
export default {
  props: {
    to: {
      type: String,
      required: true
    },
  },
  render(h) {
    // <a href="#/about">abc</a>
    // <router-link to="/about">xxx</router-link>
    // h(tag, data, children)
    console.log(this.$slots);
    return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default);
    // jsx
    // return <a href={'#' + this.to}>{this.$slots.default}</a>;
  }
}
```

router-view.js

```js
export default {  
  render(h) {    
    // 获取path对应的component    
    const { routeMap, current } = this.$router; 
    const component = routeMap[current].component || null;  
    return h(component);
  }
}
```

##### vuex 实现原理

vuex.js

```js
// 保存构造函数引用，避免import
let Vue;
class Store {
  constructor(options) {
    // this.$options = options;
    // 保存mutations、actions、getters选项
    this._mutations = options.mutations;
    this._actions = options.actions;
    this._getters = options.getters;
    // 定义computed选项
    const computed = {};
    // 给用户暴露一个getters
    this.getters = {};
    const store = this;
    Object.keys(this._getters).forEach(key => {
      // 获取用户定义的getters
      const fn = store._getters[key];
      // 转换为computed使用的无参数的形式，做一个高阶封装
      computed[key] = function() {
        return fn(store.state);
      }
      // 将getters设置为只读属性
      Object.defineProperty(store.getters, key, {
				get() {
          return store._vm[key];
        }
      });
    })
    // 响应化处理state 
    // this.state = new Vue({
    //   data: options.state
    // });
    this._vm = new Vue({
      data: {
        // 加两个$，Vue不做代理
        $$state: options.state
      },
      // 把getters当成一个计算属性去实现就可以了。注意computed的函数是无参数的。
      computed,
    });
    // 绑定commit、dispatch的上下文为store实例
    // 绑定commit上下文否则action中调用commit时可能出问题!!
    // 同时也把action绑了，因为action可以互调
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  // 保护state，防止用户直接修改state，利用存取器
  // 存取器， store.state
  get state() {
    console.log(this._vm);
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('你造吗？你这样不好！');
  }
  // 根据用户传入type执行对应mutation
  // store.commit('add', 1)
  // type: mutation的类型
  // payload：载荷，是参数
  commit(type, payload) {
    const entry = this._mutations[type]
    if (entry) {
      // 传递state给mutation
      entry(this.state, payload)
    }
  }
  // 根据用户传入type执行对应action，同时传递上下文 
  dispatch(type, payload) {
    const entry = this._actions[type]
    if (entry) {
      entry(this, payload)
    }
  }
}
function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
// Vuex
export default {
  Store,
  install
}
```

##### vue 数据响应式（2）

```js
// 数组响应式
// 思路：找到数组原型，覆盖那七个修改数组的方法，让它除了做原来的事情之外，还能够额外做更新通知，这样就实现了数组的响应式操作。并将得到的新的原型设置到data中的数组实例原型上，这样这个数组执行调用这些方法的时候就会以我们添加的方法为准。
// 1.替换数组原型中那7个方法
const arrayProto = Object.create(Array.prototype);
// splice,reverse,sort
['push', 'pop', 'shift', 'unshift'].forEach(method => {
  arrayProto[method] = function(...args) {
    // 原始操作
    arrayProto[method].call(this, ...args);
    // 覆盖操作：通知更新（对象响应式里的setter操作dep.notify）
    console.log('数组执行 ' + method + '操作');
  }
});

// 数据响应式
function defineReactive(obj, key, val) {
  // 递归
  observe(val);
  // 对传入obj进行访问拦截
  Object.defineProperty(obj, key, {
    get() {
      console.log('get ' + key);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set ' + key + ':' + newVal);
        // 如果传入的newVal依然是obj，需要做响应化处理
        observe(newVal);
        val = newVal;
        // 更新函数
        update();
      }
    }
  })
}

// 遍历做批量响应化处理
function observe(obj) {
  if (typeof obj !== 'object' || obj == null) return;
  if (Array.isArray(obj)) {
    // 数组数据响应化
    // 覆盖该数组的原型
    obj.__proto__ = arrayProto;
    // 对数组内部的元素做响应化处理
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i]);
    }
  } else {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
}

// 更新函数
function update() {
  // 更新试图
  app.innerText = obj.foo;
}

// 单个数据响应化处理
// defineReactive(obj, 'foo', 'foo')
// obj.foo
// obj.foo = 'fooooooooooooooooo'
const obj = { foo: 'foo', bar: 'bar', baz: { a: 1 }, arr: [1,2,3] };
observe(obj);
obj.foo;
obj.foo = 'fooooooooooooooo';
obj.bar;
obj.bar = 'barrrrrrrrrrrrrr';

// obj.baz.a = 10 // 深层的数据，拦截不到，需要递归处理里面的对象数据
obj.baz = {a:100}; // 如果赋值依然是obj，拦截不到，需要在setter中赋值时做响应化处理
obj.baz.a = 100000;

// obj.dong = 'dong' // 添加新的属性，拦截不到，使用set做一次响应化处理
set(obj, 'dong', 'dong');
obj.dong;

// Object.defineProperty()对数组无效
// 分析：改变数组方法只有7个
// 解决方案：覆盖数组实例的原型方法，让他们在修改数组同时还可以通知更新
obj.arr.push(4);
```

##### vue3

响应式内部写法变化

* 响应化需要递归遍历，性能消耗较大。
* 新增或删除属性无法监听
* 数组响应化需要额外实现

Composition API

* 复用性
* 代码组合：增加代码可读性，将变量和它的逻辑写到一块。之前分散在各个配置项比如 data， method 中的东西集中到 setup 的函数里，然后 return 一个对象作为 render 函数的上下文。也就是在 render 函数中想要访问的响应式的数据都会在 setup 函数中构造创建并且 return。响应式需要自己做。

##### 简版 MVVM

![Vue数据响应式](/Users/zhaoyang/tools/架构/Vue数据响应式.png)

* Vue：框架构造函数。
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

模版中出现一个值就会有一个 watcher，相同的值只对应一个 dep，所以一个 dep 对应 多个 watcher。

在模版编译的时候，比如指令或差值表达式，调用 Watcher，传入 Vue 实例 vm，data 中的哪个 key，和它对应的 dom 的更新函数 updateFn。

Watcher 中通过 Dep.target = this 将该 watcher 设置到一个 Dep.target 的全局变量中，并将模版中的 key 访问一遍触发 getter，再将 Dep.target 制空。

defineReactive 时创建 dep 实例。

getter 的时候将 Dep.target 也就是 watcher 收集到 dep 中。

setter 的时候调用 dep.notify 通知更新。

vue.js

```js
function defineReactive(obj, key, val) {
  // 递归
  observe(val);
  // 创建一个Dep和当前key一一对应
  const dep = new Dep();
  // 对传入obj进行访问拦截
  Object.defineProperty(obj, key, {
    get() {
      console.log('get ' + key);
      // 依赖收集
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set ' + key + ':' + newVal);
        // 如果传入的newVal依然是obj，需要做响应化处理
        observe(newVal);
        val = newVal;
        // 通知更新
        // watchers.forEach(w => w.update())
        dep.notify();
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj == null) return;
  // 创建Observer实例
  new Observer(obj);
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
        return vm[sourceKey][key];
      },
      set(newVal) {
        vm[sourceKey][key] = newVal;
      }
    })
  })
}

// 创建Vue构造函数
class Vue {
  constructor(options) {
    // 保存选项
    this.$options = options;
    this.$data = options.data;
    // 响应化处理
    observe(this.$data);
    // 代理
    proxy(this, '$data');
    // 创建编译器
    new Compiler(options.el, this);
  }
}

// 根据对象类型决定如何做响应化
class Observer {
  constructor(value) {
    this.value = value;
    // 判断其类型
    if (typeof value === 'object') {
      this.walk(value);
    }
  }
  // 对象数据遍历响应化
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key]);
    });
  }
  // 数组数据响应化，待补充
}

// 观察者:保存更新函数，值发生变化调用更新函数
// const watchers = []
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn;
    // watchers.push(this)
    // Dep.target静态属性上设置为当前watcher实例
    Dep.target = this;
    this.vm[this.key]; // 读取触发getter
    Dep.target = null; // 收集完就置空，防止编译时，读取下一个同样的key时push进去的是该key的上一个更新函数。
  }
  // 更新函数
  update() {
    this.updateFn.call(this.vm, this.vm[this.key]);
  }
}
// Dep：依赖，管理某个key相关所有Watcher实例
class Dep {
  constructor() {
    this.deps = [];
  }
  addDep(dep) {
    this.deps.push(dep);
  }
  notify() {
    this.deps.forEach(dep => dep.update());
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
  // vm是Vue实例
  constructor(el, vm) {
    // 保存Vue实例，保存需要操作的DOM元素
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

##### vue 源码调试技巧

搭建调试环境：

1. clone 源码，地址：https://github.com/vuejs/vue.git  版本:2.6.10

2. 安装依赖：npm install

3. 安装 rollup，Vue 的打包工具是 rollup：npm install -g rollup

4. 修改 package.json 中的 dev 打包脚本：增加 --sourcemap

   "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"

5. 打包，执行开发脚本，输出最终我们要用的 vue.js：npm run dev

   打包成功之后 dist 下会生成一个全新的 vue.js，和它的 map 文件 vue.js.map

6. 编写测试文件

   examples/test/01-test.html

   把刚才打包的 vue.js 引进来，写一个 vue 程序，接下来就可以调试了。


调试技巧：

* 打开指定文件：ctrl+p
* 断点
* 单步执行：单步跳过函数/单步进入函数

* 查看调用栈：调用栈中可以很好的看到整个的函数执行的流程。

* 定位当前源文件所在位置：sources 代码上右键，Reveal in sidebar 选项。


##### vue 源码分析

1.根据打包命令找到打包的入口文件

核心功能：扩展 $mount

src/platforms/web/entry-runtime-with-compiler.js：

* 针对 web 平台的特点对 $mount 做扩展，扩展的就是跟编译相关的事。(功能扩展的方式值得学习)

  处理 render > template > el 选项：

  选项中如果有 render 直接调用 mount 执行挂载；如果有 template 或 el，将它们进行一定处理最后变成 template，然后将这个 template 执行模版解析和编译，最终得到 render 函数并将其放到选项中去。最后执行挂载操作。

2.寻找 Vue 构造函数

核心功能：定义 $mount, \__patch__, 初始化全局 API(Vue.xxx), 定义 Vue, 初始化实例 API(Vue.prototype.xxx)

src/platforms/web/runtime/index.js：

* 安装 web 平台特有指令和组件；
* 在 Vue 原型上定义了补丁方法 Vue.prototype.\__patch__：把虚拟 DOM 转换成真实 DOM。初始化的赋值和以后的更新都会用到这个 patch，也是 diff 算法发生的地方；
* 定义 $mount：它只做了一件事，就是把 el 做 DOM 查询，然后调用 mountComponent 执行挂载，将首次渲染的结果替换 el。

src/core/index.js：

* 初始化全局 API：Vue.util, Vue.set, Vue.delete, Vue.nextTick, Vue.use, Vue.mixin, Vue.extend, Vue.component, Vue.directive, Vue.filter

src/core/instance/index.js：

* 定义 Vue 构造函数：内部只执行了一行初始化方法 this._init()。
* 使用混入的方式定义 Vue 实例 API（这个混入的方式扩展构造函数原型值得学习）
  * initMixin(Vue)：定义了初始化方法 _init
  * stateMixin(Vue)：定义了 $data,$props,$set,$delete,$watch
  * eventsMixin(Vue)：定义了 $on,$once,$off,$emit
  * lifecycleMixin(Vue)：定义了 _update,$forceUpdate,$destroy
  * renderMixin(Vue)：定义了 $nextTick,_render

3.总体流程：

* 模版编译：编译的结果是得到 render 函数并放入配置中。

  * 解析：ast = parse(template.trim(), options)
    * HTML解析器
    * 文本解析器
    * 过滤器解析器。
  * 优化：optimize(ast, options)
    * 在 AST 中标记静态子树：patch 时，可以跳过静态子树，提高性能。
  * 生成：code = generate(ast, options)
    * 把 AST 转换成代码字符串，传入 new Function(code) 中得到 render 函数。

* 实例化：将配置传入构造函数中，实例化一个根组件（Vue）实例或自定义组件（VueComponent）实例。

  * 初始化 _init：
    * 合并选项
    * initLifecycle(vm)：声明组件实例的 $parent, $root, $children, $refs
    * initEvents(vm)：对父组件传入的自定义事件添加监听
    * initRender(vm)：声明了 $slots, $createElement就是那个h，对$attrs, $listeners 做了响应化处理。
    * callHook(vm, 'beforeCreate')
    * initInjections(vm)：获取祖辈的注入数据
    * initState(vm)：初始化响应式数据 initProps, initMethods, initData, initComputed, initWatch
      * initData：数据响应式，有几个对象数据（包括data）就有几个 Observer 实例，dep 的数量是对象数据个数（包括 data） + data  内所有 key 的数量，几个组件就有几个 Watcher。
        * 数据命名冲突校验
        * 数据代理
        * 执行 observe，传入 data
          * 创建 Observer 实例
            * 创建对象数据的 dep。$set, array 那七个变更数组方法时会使用到这个的 dep 中存放的依赖来做通知更新。
            * 创建每个 key 对应的 dep。
            * 分别做数组和对象的响应化处理。
            * getter：分别对每个 key 的 dep 和对象数据的 dep 做依赖收集，收集的都是组件 Watcher
            * setter：劫持数据变化
              * dep.notify()：通知更新
              * 批量异步更新：将 dep 中收集的所有 Watcher 的更新函数批量异步的执行一遍。
                * watcher.update()
                * queueWatcher()
                * nextTick()
                * timerFunc()
                * flushSchedulerQueue()
                * watcher.run() 
                * watcher.get()
                * updateComponent()
    * initProvide(vm)：给后代提供数据
    * callHook(vm, 'created')
    * 最后判断选项里如果有 el，自动执行 $mount。

* 挂载 $mount

  * 执行 mountComponent

    * callHook(vm, 'beforeMount')

    * 声明更新函数 updateComponent

      * 执行 _render

        * render（配置中的 render）
          * createElement：h 方法，传入 tag, data, children 等
            * 原生标签：创建 vnode 并返回
            * 自定义组件：createComponent
              * 获取组件配置
              * 根据组件配置，获取组件构造函数
              * 安装组件管理钩子到该组件的 vnode 上。
                * init：组件初始化，创建组件实例，挂载。patch 时执行 init。
                * prepatch：组件更新之前执行，patch 之前的一些工作
                * insert：组件创建完插入 dom 元素里，调用子组件的 mounted 生命周期
                * destroy：组件销毁相关工作
              * 创建 vnode 并返回

      * 执行 _update，传入  vnode。

        * patch

          * new vnode 不存在就删除

          * old vnode 不存在就新增

            * createElm

          * 都存在

            * oldVnode 是原生标签

              * createElm：创建新节点，把 vnode 创建成 DOM 元素，然后递归创建子元素和子组件。
                * createComponent：如果要创建的是组件，走这个流程
                  * 获取创建组件 vnode 时安装的 init 组件管理钩子并执行：创建组件实例并挂载。
                  * insert：子组件 DOM 树插入父组件的 DOM 树上。
                * 原生标签的创建：
                  * 把 vnode 创建成真实的 DOM，createChildren 递归创建子元素
                  * insert：子组件 DOM 树插入父组件的 DOM 树上。

            * oldVnode 不是原生标签 && 是同一个 vnode 节点

              * patchVnode：执行 diff 更新。

                有孩子先比孩子调用 updateChildren，updateChildren 中还会调用 patchVnode，一直向下递归，将每个 vnode 节点都 patch 一遍。

                每个节点比较的和更新的就是三件事：属性更新，文本更新，子节点更新：

                * isPatchable(vnode)：节点本身的 patch 操作，属性更新。

                * 都无子节点：只是文本的替换。

                * 只有新有子节点：先清空老文本内容，然后为其新增子节点。 

                * 只有老有子节点：移除该节点的所有子节点。

                * 新老均有子节点：对子节点进行 Diff 操作，调用 updateChildren。

                  * updateChildren

                    * 设置双指针，首尾都没有找到相同的节点还是要做双循环。最后根据新老 vnode 的节点剩余情况做相应的新增或删除工作。

                      * 找到相同的节点调用 patchVnode（递归：深度优先）

                      * 移动节点位置（实际的 dom 操作），移动指针做下一个节点的对比（同级比较）

          * invokeInsertHook：调用组件管理钩子 insert。里面调用了 mounted 生命周期钩子。

    * 创建组件 Watcher，传入 updateComponent

      * 执行 updateComponent

    * callHook(vm, 'mounted')



## Vue

##### CSS Module

css-loader 的 modules 设置为 true 就会将我们写的 class 改掉，然后当你引入 css 文件模块的时候，它会给你返回一个 class 的列表，这个列表就是原来的 class 跟编译之后的 class 名字的对应关系。

```js
import styles from "./style.css";

element.innerHTML = '<div class="' + styles.className + '">';
```

选择器不能在模版中直接使用，而会把所有的选择器放到计算属性 $style 里，然后通过 $style.xx 去访问选择器。选择器会被动态的转换成很有特点的名字，来和其他的组件做区分。

生成的选择器：文件名\_选择器本身名字\_hash。它不会影响元素本身，只会影响你最终类名的生成。

选择器权重相同的情况下，父组件的样式会覆盖子组件的样式。

```vue
<template>
	<div>
    <a :class="$style.red">awesome-vue</a>
    <a :class="{[$style.red]:isRed}">awesome-vue</a>
    <a :class="[$style.red, $style.bold]">awesome-vue</a>
  </div>
</template>
<style lang="scss" module>
  .red {  
    color: #f00;
  }
  .bold {
    font-weight: bold;
  }
</style>
<script>
  export default {
    created () {
      // $style 是计算属性，所以在 JS 里也可以访问，从而做一些你想做的逻辑操作：
      console.log(this.$style.red)
    }
  }
</script>
```

##### 过度 & 动画

在插入、更新或者移除 DOM 时，使用 transition 组件做过渡或动画。

过渡和动画的过程都是设置在 active 上的。v-enter/v-leave/v-enter-to/v-leave-to 都是设置初始或结束状态的，可以没有。

css 方式是通过过渡类名，js 方式是通过钩子函数。

在下列情形中，可以给任何元素和组件添加进入/离开过渡

- 条件渲染 (使用 `v-if`)
- 条件展示 (使用 `v-show`)
- 动态组件
- 组件根节点

transition 组件基础使用：

transition 组件会为嵌套元素自动添加跟动画相关的类名称，使用这些类名称来做 css 过度动画就可以了。

1. 过渡被触发时，马上加 v-enter/v-leave 和 v-enter-active/v-leave-active。
2. 下一帧马上移除 v-enter/v-leave，然后添加 v-enter-to/v-leave-to。
3. 动画结束后移除 v-enter-active/v-leave-active 和 v-enter-to/v-leave-to。

```vue
<template>
	<transition name="fade"> 
    <div v-if="show"></div>
  </transition> 
</template>

<script>
export default {
  data() {
		return {
      show: true
    }
 	}
}
</script>

<style> 
  .fade-enter-active, .fade-leave-active { 
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to { 
    opacity: 0;
  } 
  .fade-enter-to, .fade-leave { 
    opacity: 1;
  }
</style>
```

结合 CSS 动画库：

通过自定义过度类名，使用第三方定义好的动画。

自定义过度类名：

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)

```html
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
```

```vue
<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
	<div></div>
</transition>
```

JavaScript 钩子：

```vue
<transition
  v-on:before-enter="beforeEnter" // 动画开始前，设置初始状态
  v-on:enter="enter" // 执行动画
  v-on:after-enter="afterEnter" // 动画结束，清理工作
  v-on:enter-cancelled="enterCancelled" // 取消动画
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
></transition>
```

保留 CSS 中过度动画的部分，加上 JS 钩子做动画起始状态：

```html
<style>
  .fade-enter-active, .fade-leave-active { 
    transition: opacity .5s; 
  }
</style>

<template>
	<transition 
		@before-enter="beforeEnter" 
		@enter="enter"
		@before-leave="beforeLeave" 
		@leave="leave">
  	<div></div>
  </transition>
</template>

<script>
export default {
	methods: {
    beforeEnter(el) {
    	el.style.opacity = 0; // 设置初始状态
    },
    enter(el, done) {
      document.body.offsetHeight; // 触发回流激活动画
      el.style.opacity = 1; // 设置结束状态
      el.addEventListener('transitionend', done); // 监听动画结束事件，并执行done函数
    },
    beforeLeave(el) {
    	el.style.opacity = 1; // 设置初始状态
    },
    leave(el, done) {
      document.body.offsetHeight; // 触发回流激活动画
      el.style.opacity = 0; // 设置结束状态
      el.addEventListener('transitionend', done); // 监听动画结束事件，并执行done函数
    }
  },
}
</script>
```

纯js方案：

```html
<template>
	<transition name="fade"
		:css="false" // 禁用css
    @before-enter="beforeEnter"
    @enter="enter"
    @before-leave="beforeLeave"
    @leave="leave"></transition>
</template>

<script>
import "https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js";
export default {
	methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      Velocity(el, { opacity: 1 }, { duration: 500, complete: done });
    },
    beforeLeave(el) {
      el.style.opacity = 1;
    },
    leave(el, done) {
      Velocity(el, { opacity: 0 }, { duration: 500, complete: done });
    }
  },
}
</script>
```

##### vuex 模块

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

##### 通用表单组件

需求分析：

在开始之前要做一个需求分析，到底要什么样的功能，为了实现这些功能要做一些什么事情。

* KForm 
  * 接收数据
  * 指定校验规则
* KformItem
  * 执行校验
  * 显示错误信息
* KInput
  * 维护数据 

实现 KInput.vue：

```vue
<template>
  <div>
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
  export default {
    inheritAttrs: false, // 避免传入的属性继承到根元素上
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value)
        // 通知父级执行校验
        this.$parent.$emit('validate')
      }
    },
  }
</script>
```

实现 KFormItem：

```vue
<template>
  <div>
    <!-- label -->
    <label v-if="label">{{label}}</label>

    <!-- KInput的坑位 -->
    <slot></slot>

    <!-- 校验信息显示 -->
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
// Asyc-validator
import Schema from "async-validator";

export default {
  inject: ["form"],
  data() {
    return {
      error: "" // error是空说明校验通过
    };
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      // 规则
      const rules = this.form.rules[this.prop];
      // 当前值
      const value = this.form.model[this.prop];

      // 校验描述对象
      const desc = { [this.prop]: rules };
      // 创建Schema实例
      const schema = new Schema(desc);
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          // 校验通过
          this.error = "";
        }
      });
    }
  }
};
</script>
```

实现 KForm：

```vue
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      // 获取所有孩子KFormItem
      const tasks = this.$children
        .filter(item => item.prop) // 过滤掉没有prop属性的Item
        .map(item => item.validate());

      // 统一处理所有Promise结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>
```

使用：

```vue
<template>
  <div>
    <!-- KForm -->
    <KForm :model="userInfo" :rules="rules" ref="loginForm">
      <!-- 用户名 -->
      <KFormItem label="用户名" prop="username">
        <KInput v-model="userInfo.username" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <!-- 密码 -->
      <KFormItem label="密码" prop="password">
        <KInput type="password" v-model="userInfo.password" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <!-- 提交按钮 -->
      <KFormItem>
        <button @click="login">登录</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import KInput from "@/components/form/KInput.vue";
import KFormItem from "@/components/form/KFormItem.vue";
import KForm from "@/components/form/KForm.vue";
import Notice from "@/components/Notice.vue";

export default {
  data() {
    return {
      userInfo: {
        username: "tom",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  components: {
    ElementTest,
    KInput,
    KFormItem,
    KForm
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate(valid => {
        const notice = this.$create(Notice, {
          title: "社会你杨哥喊你来搬砖",
          message: valid ? "请求登录!" : "校验失败!",
          duration: 2000
        });
        notice.show();
      });
    }
  }
};
</script>
```

修正 input 中 $parent 写法的问题:

想跨层级的去传参，还不能使用 $parent/$root/$children 等，element 官方用的是混入的方式，在 src/mixins 写了一个 emitter.js 派发器。它可以做两件事，一个叫广播一个叫冒泡派发事件，这个东西在 vue1.0 里是有的，2.0 之后删了。element 觉得它有用，所以自己实现了，这个东西可以隔层的去派事件，比如在 input 里可以不停的向上去找我想要的组件让它去派发事件。这个东西是作为一个混入被引入的，主要是为了复用。

1.mixin emitter
2.声明 componentName
3.dispatch()																				

##### 弹窗组件

其他的组件的内容都是在 app 里的，弹窗这类组件已经脱离出当前 Vue 管理的实例了。这样做的好处是比较好控制弹窗的位置等东西。它们在当前 Vue 根实例之外独立存在，通常挂载于 body，而不是 app，所以不能将它声明在任何一个 app 组件下的 compunents 选项作为当前 app 的组件从而使用 Vue 内部来创建构造函数和实例的能力，需要我们自己去创建实例。

需求：现在有一个 Notice.vue 这样的组件，要用函数的方式去创建这个组件的实例，并且将来把它挂在到 body 上面去。

实现 create 函数：

create 方法将来接收一个组件（其实就是组件的配置）和一些参数，创建这个组件的实例，并将其挂载到 body 上去，最终返回这个组件实例。

方法一： 

Vue.extend 方法是 Vue 的一个静态方法，它里面创建了一个子类 VueComponent，继承 Vue，组件实例就是通过 VueComponent 创建的。它是框架本身调的方法。

utils/create.js

```js
import Vue from 'vue'

function create(Component, props) {
  // 获得组件的构造函数
  const Ctor = Vue.extend(Component);
  // 获得组件实例，组件实例创建之后得到虚拟DOM
	// 用propsDate传递参数，相当于使用模版时父组件传过来的props
  cosnt comp = new Ctor({propsDate: props});
  // 组件实例挂载，得到真实DOM
  comp.$mount();
  // 获取真实DOM后，做手动挂载
  document.body.appendChild(comp.$el);
  // 作为一个组件，不停的往界面中去追加而不去清除，将来内存就爆了。
  comp.remove = function() {
    document.body.removeChild(comp.$el);
    comp.$destroy();
  }
  return comp;
}

export default create
```

方法二：

借助 Vue 来创建根实例，使用 render 方法，直接把传入的组件渲染出来，整个过程会有组件实例的创建，然后我们从中获取组件的实例就可以了。

utils/create.js

```js
import Vue from 'vue'

function create(Component, props) {
  // 这个实例会把这个组件作为根组件把它渲染出来了，所以我们就能得到虚拟DOM，挂载后得到真实DOM
  const vm = new Vue({
    render: h => h(Component, {props}),
  }).$mount(); // 不指定宿主元素，则会创建真实DOM，但是不会做追加操作，因为没有目标对象可追加，也不可以使用body
  // 获取真实DOM后，做手动挂载
  document.body.appendChild(vm.$el);
  // 获取传入的组件的实例
  const comp = vm.$children[0];
  // 清除自己
  comp.remove = function() {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  }
  return comp;
}

export default create
```

实现 Notice.vue：

```vue
<template>
  <div class="box" v-if="isShow">
    <h3>{{title}}</h3>
    <p class="box-content">{{message}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(this.hide, this.duration);
    },
    hide() {
      this.isShow = false;
      this.remove();
    }
  }
};
</script>

<style>
.box {
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  pointer-events: none;
  background-color: #fff;
  border: grey 3px solid;
  box-sizing: border-box;
}
.box-content {
  width: 200px;
  margin: 10px auto;
  font-size: 14px;  
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  margin-bottom: 8px;
}
</style>
```

main.js

```js
import create from './utils/create'

Vue.prototype.$create = create;
```

使用

```js
this.$create(Notice, {
  title: '弹窗组件',
  message: '提示信息',
  duration: 1000
}).show();
```

封装成 Vue 插件的形式，便于使用：

utils/create.js

```js
import Vue from 'vue'
import Notice from 'Notice.vue'

function create() {
  //...
}

export default {
  install(Vue) {
    Vue.prototype.$notice = function(options) {
      return create(Notice, options)
    }
  }
}
```

main.js

```js
import Vue from 'vue'
import create from './utils/create'

Vue.use(create)
```

##### 拖拽表单组件

需求:

后台管理：左侧固定列表中有一些表单，例如文本框，下拉框。可以将这些表单元素拖拽到右侧的自适应的区域，将表单以原来的宽度放入一行，放不下换行。保存右侧的表单信息和顺序到后端。

用户界面：将来可以在用户端按顺序显示后台操作保存的表单。

根据需求寻找适合的组件:

先到 vue 社区搜索 drag 相关的组件。

根据需求最终筛选出的组件：

* vuedraggable 
* vue-smooth-dnd 
* vue-drag-and-drop-kanban 基于 cue-smooth-dnd
* vue-formbuilder 基于 vuedraggable

设计思路:

1. 首先要实现样式操作上的符合：两个列表之间的双向拖拽，能够满足自适应的两列布局，拖拽过去后一行显示超出换行并且保持元素拖拽之前的宽度。
2. 可以将内容也拖拽过去。
3. 可以记录右侧列表的所有元素和顺序。

遇见的问题:

单纯使用 vuedraggable 的双列表进行的拖拽

1. 内容是元素或组件的时候，元素和组件无法复制过去。需要封装一个组件，使拖拽和被拖拽的列表内容都使用这个组件进行渲染，配合 list 数据判断渲染的元素类型。
2. list 数据只能接收 name, id 两个内容，无法接收其他内容。