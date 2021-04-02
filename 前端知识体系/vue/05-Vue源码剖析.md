## 源码剖析准备

### 搭建调试环境

1. clone 源码，地址：https://github.com/vuejs/vue.git  版本:2.6.10

2. 安装依赖：npm install

3. 安装 rollup，因为 Vue 的打包工具用的是 rollup：npm install -g rollup

4. 修改开发脚本：添加代码映射，调试的过程中能够直接调试和研究源码。

   修改 package.json 中的 dev 打包脚本：

   "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"

5. 打包，执行开发脚本，输出最终我们要用的 vue.js：npm run dev

   打包成功之后 dist 下会生成一个全新的 vue.js，和它的 map 文件 vue.js.map

6. 编写测试文件

   创建一个测试脚本来看看我们打包的东西是否正常。在任何地方写都可以，vue 有些案例在 examples 里，我们就可以在这来编写测试文件。

   examples/test/01-test.html

   把刚才打包的 vue.js 引进来，剩下的就正常的写一个 vue 程序就行了。

   浏览器打开不报错的跑起来，并且有 vue 初始化的一些输出就可以了，接下来就可以调试了。

### 调试技巧

* 打开指定文件：ctrl+p

* 断点：想知道某个地方到底发生了什么事情，让浏览器执行到这个地方的时候停下来，继不继续向下执行由我们调试控制。

* 单步执行

  * 单步跳过函数
  * 单步进入函数

* 查看调用栈

  研究代码的过程中，想搞清楚先后之间的调用关系，有时函数进入过深的时候，往往就搞不清楚了。这时就可以好好的研究这个 Call Stack，可以很有效的帮你把思路理顺，是谁调用的谁，整个过程会显得很清晰，调用栈中可以很好的看到整个的函数执行的流程。

* 定位当前源文件所在位置

  以方便下次再研究的时候心中有数，以后就知道在哪找到这个代码了，随着这个过程研究的次数越来越多，我可能就把整个源码的脉络都熟悉了。

  sources 代码上右键，找到 Reveal in sidebar 命令，在侧边栏里就会显示这个文件所在的目录。 

### 源码目录结构

以后自己研究的过程中应该很清楚的找到这些目录和想要的文件才行。

/dist                              发布目录，最终输出的所有js文件都在这里，各个发布版本之间存在差异。
/examples                    范例，里面有我们研究源码时的测试代码
/flow                             2.6 这个版本还是基于 flow 去写的，所以还会有 flow 这个类型声明文件，针对 flow 的类型声明
/types                           对 TS 的类型声明
/packages                    里面有一些核心代码之外的独立库，这些东西它认为不应当是项目核心的东西，它单独的拆分写到									 这些包 里头了，所以它跟我们核心代码无关。
/scripts                         我们要找入口文件，还要跟这里的构建脚本打打交道
/src                               源码，我们就是要研究这里面的所有东西
    /compiler                  编译器相关
    /core                         核心代码，要常来这里看看啊
    	/components        通用组件，keep-alive，为什么只有这一个组件，因为它是所有平台通用的。weex 或 web 平台会									 有特殊的像 transition 这样的组件，它会写到其他的目录去。就会写到 platforms 这个目录的 									 weex 或 web 里头单独去组织，所以代码的分工是非常清楚的，很值得去借鉴。
    	/instance     		 构造函数等，在核心代码中，最应该关心的目录应该是这个。Vue 的构造函数就会在这里头。查找									 的思路是什么呢，怎么会找到这里。
   	 /global-api            全局 API
        /observer              响应式相关
        /vdom                   虚拟 DOM 相关

### 输出的各个发布版本的含义

* runtime：仅包含运行时，不包含编译器，意味着写程序的时候不能使用 template 这个配置项去写字符串的模版。
* common：只能用于像 nodejs 的 require 的方式称为 commonjs，用 cjs 规范来进行打包的，用于像 webpack1，broswerify 等老旧版本打包工具，现在很少用到。
* esm：ES（ECMA Script）模块规范，主要用于 webpack2+ 这些打包工具。
* umd：universal module definition，就是什么都不加的，如 vue.js。浏览器里面直接引，不经过打包工具打包的一般会用这个版本。兼容 cjs 和 amd 规范（异步模块），浏览器里面加载模块都希望是异步的啊，所以 amd 规范特别适合在浏览器里使用。

### 找入口

使用打包工具的项目的源码入口文件怎么找，一般先从 package.json 开始，找到我们打包的脚本命令 dev，是 rollup 打包的，-c 指明了配置文件在哪，然后根据打包脚本命令的参数和打包工具配置文件的代码逻辑就能够找到你想要那个输出版本的入口文件到底是谁。

从这个源码入口文件开始研究源码，我们要多次与这个入口文件打交道，尤其是初始化过程。



## Vue 总体流程

虚拟 DOM 就是真实 DOM 的一个映射，用来描述真实 DOM，更轻量，更快速。

模版转换成渲染函数，渲染函数最终生成一个虚拟 DOM，再结合着 Vue 的响应式系统，Vue 就能够根据将来值发生变化之后，再次执行渲染函数，得到一个全新的虚拟 DOM，在新旧虚拟 DOM 之间经过比对，就可以知道我们真正要做的 DOM 操作，最后把虚拟 DOM 再变成真实的 DOM。

Vue 控制的其实只是这些 data 数据，跟数据相关的东西。它并不控制 DOM 节点，你随便怎么做操作 DOM。

从入口文件开始，根据文件或模块的引用路径寻找 Vue 构造函数。发现每个文件模块的作用，最后根据一个简单的 new Vue() 程序，断点调试，串联整理整个初始化流程。

**src/platforms/web/entry-runtime-with-compiler.js 入口文件：**

保存一份原型上的 $mount，然后针对该平台的特点对 $mount 做扩展。这里是 web 平台，所以扩展的就是跟编译相关的事，处理 render，template，el 选项。选项中如果有 render 直接调用 mount 执行挂载；如果有 template 或 el，将它们进行一定处理最后变成 template，然后将这个 template 执行模版解析和编译工作，最终得到 render 函数并将其放到选项中去，然后调用 mount 执行挂载。所以不管是 render，template 还是 el，最终都是要得到 render 渲染函数。 

**src/platforms/web/runtime/index.js：**

* 安装 web 平台特有指令和组件；
* 在 Vue 原型上定义了补丁方法 Vue.prototype.\__patch__ 把虚拟 DOM 转换成真实 DOM，初始化的赋值和以后的更新都会用到这个 patch；
* 实现了 $mount，它只做了一件事，就是把传过来的宿主 el 做 DOM 查询，然后调用 mountComponent 执行初始化挂载，将首次渲染的结果替换 el。

**src/core/index.js：**

开始进入到核心代码里了。定义全局 API。

**src/core/instance/index.js：**

* 定义 Vue 构造函数，构造函数内部只执行了一行代码，就是初始化方法 this._init()，这个方法是通过混入的方式混入进来的，具体是通过 initMixin(Vue) 方法给 Vue 原型添加 \_init 方法，将来 new Vue() 的时候执行这个初始化方法；
* 使用混入的方式定义 Vue 实例 API：initMixin(Vue)，状态相关api stateMixin(Vue)，事件相关api eventsMixin(Vue)，跟生命周期相关的更新渲染等 lifecycleMixin(Vue)，渲染函数相关api renderMixin(Vue)

**src/core/instance/init.js：**

* 初始化方法 _init 定义的地方；
* _init 方法做的事情是创建组件实例，初始化其数据、属性、事件等，然后执行挂载 $mount。

```js
initLifecycle(vm)     // 声明组件实例的$parent $root $children $refs，组件创建的顺序是自上而下的，挂载的顺序是自下而上的，当我创建完毕之后，立刻执行挂载，找到老爹执行一次挂载。
initEvents(vm)       // 处理父组件传入的事件和回调，就是对父组件传入的事件添加监听，事件的派发和监听是一个人
initRender(vm)       // 跟渲染相关的东西，也就是跟虚拟dom相关的东西。声明了$slots,$createElement就是那个h

callHook(vm, 'beforeCreate') // 完成了上面三件事之后，会调一个beforeCreate，所以beforeCreate里面可以用上面声明的所有的东西

initInjections(vm)    // 注入数据 resolve injections before data/props
initState(vm)         // 重要：数据的初始化props，methods，data，computed，watch，数据响应式
initProvide(vm)       // 提供数据 resolve provide after data/props

callHook(vm, 'created') // 上面的事情都做完后，会有一个created这个生命周期，这个时候所有的初始化全部完成了，你可以放心大胆做你任何想做的事情了。
```

1. new Vue() 进入到构造函数，调用 _init()

2. _init() 里执行一系列的初始化工作。最后判断有 el 执行 $mount，使用 template 或 render 需要手动执行 $mount。

   * initState(vm)：数据响应式，这里做了一系列数据的初始化，包括 props、methods、data、computed 和 watch。
     * initData(vm)：data 响应式，获取 data，设置代理，启动响应式 observe。
       * observe(value)：判断传入的数据 value 是不是对象，不是直接 return。然后尝试从 value 中获取一个 Observer 实例 ob = value.\__ob__，如果该对象数据是响应式的，就会有这个 ob，不是的话，就创建 Observer 实例，进行响应化处理，最后返回 Observer 实例 ob。也就是说一个对象类型的数据要进行一次响应式观察处理，每次只处理一个对象数据和里面的一层，然后递归把所有深层次的数据都处理到。
         * Observer(value)：做数据响应化，它只处理对象类型的数据。
           * 为每一个对象类型的数据本身的 ob 创建一个 dep。object 里面新增($set)或者删除属性，array 那七个变更数组方法时会使用到这个的 dep 中存放的依赖来做这个对象本身变化的通知更新。
           * 给这个要做响应化处理的对象类型的数据设置 \__ob__ 的属性，值为当前的 Observer 实例 this，就是为每个对象类型的数据都附加一个 Observer 实例。
           * 分别做数组和对象的响应化处理：
             * 数组
               * 替换数组原型。
                 * 执行原来的方法功能
                 * 通知更新：使用 ob 中的 dep 来通知更新。
               * 如果数组里面的元素是对象，还需要对其做响应化处理，对其执行 observe
             * 对象
               * defineReactive：遍历，对每个 key 做数据响应化。
                 * 创建每个 key 对应的 dep，这个细粒度的 dep 是为用户 Watcher 准备的，而不是为了整个组件的渲染 Watcher。
                 * 使用 observe(val) 做递归处理，因为 val 有可能是对象，并且 observe 可以返回 ob，依赖收集时会用到。
                 * Object.defineProperty：数据劫持，为每个 key 做响应化拦截。
                   * get：收集依赖，最终收集的 Watcher 都是一个，就是该组件实例对应的那个 Watcher。render 函数里有动态的值需要去访问，这时就触发了 getter，然后做依赖收集。
                     * 对每个 key 对应的 dep 做收集。
                     * 如果要做响应化的数据是对象，也就是说存在 ob，还要对他们中的 ob 对应的 dep 做收集。
                     * 如果要做响应化的数据是数组，要把数组中的对象或数组，还要对他们中的 ob 对应的 dep 做收集。
                   * set：
                     * 如果赋的新值是对象，也要做响应化处理。
                     * dep.notify()：数据的变化后，通知更新，下面开始异步批量更新的实现
                       * watcher.update()：执行所有收集的 Watcher 的 update 方法
                         * queueWatcher(watcher)：将 watcher 入队
                           * nextTick(flushSchedulerQueue)：传入 flushSchedulerQueue
                             * timerFunc()：启动了一个微任务，传入执行 flushSchedulerQueue 的方法 flushCallbacks，Promise.resolve.then(flushCallbacks)，将来会执行 flushSchedulerQueue
                               * flushSchedulerQueue()：真正的更新操作
                                 * watcher.run() 
                                   * watcher.get()：调用 watcher 创建时传入的更新函数。
                                     * updateComponent()
                                       * 跟初始化一样的操作...

   * vm.$mount()，执行挂载，只做了 mountComponent 这一个事。
     * mountComponent()，执行挂载转换

       * 声明 updateComponent() 更新函数，并没有调用，里面执行下面两个方法

         * vm.\_render()：调用 render 函数获取当前组件对应的最新的虚拟 DOM，并把虚拟 DOM 传入 \_update() 中

           * render()：返回 vnode
             * createElement()：h 方法
               * 如果编译后生成的 render 函数的 tag 是字符串
                 * tag 是保留标签直接创建 vnode
                   * vnode = new VNode()
                 * tag 是自定义组件
                   * resolveAsset()：获取组件构造函数
                   * vnode = createComponent()：把构造函数，props，事件等作为参数传进去，根据用户写的组件的所有配置创建一个与之相对应的 vnode。
                     * 处理传递的数据，属性，事件等。
                     * installComponentHooks()：安装它体内的自定义组件管理钩子到该组件的 vnode 上，涉及到组件如何实例化创建和挂载的地方。
                       * componentVNodeHooks：默认的组件管理钩子
                         * init：将来的某个时刻会执行这个初始化
                           * 如果是 keep-alive 组件，就不需要再创建组件实例，直接从缓存中拿出来就行了。
                           * 不是 keep-alive，组件需要重新创建。这个组件创建和挂载的过程是在 patch 中执行的。
                             * child = createComponentInstanceForVnode()：创建组件实例
                             * child.$mount()：创建完实例后挂载，然后接着执行该组件的 _init watcher render update createComponent... 等一系列的这个组件下的那些事情，递归向下创建它下面的那些组件和 DOM 的那棵树。
                         * prepatch
                         * insert
                         * destroy
                     * new VNode()：创建 vnode 并返回，自定义组件的 vnode 中会有一个特别的属性 componentInstance，将来组件实例创建完成之后，这个属性会被填充，patch 的时候执行组件管理钩子 init，创建组件实例。
                 * tag 是选项或构造函数
                   * vnode = createComponent()

         * vm.\_update()：执行更新

           * vm.\__patch__()：它就是 patch 函数，传入新老 vnode，做对比找出最小变化，执行 DOM 操作，返回 vnode。把 vnode 转换为真实 DOM，这里执行完，页面就会有显示了，初始化过程就结束了。这里的 vnode 就是组件对应的整棵虚拟 DOM 树，首先进行组件的整棵 vnode 树的比较，可能有三种情况：

             * 组件的 new vnode 树不存在就删

             * 组件的 old vnode 树不存在就增：从上到下，创建挂载创建挂载，最后把整棵树创建完毕后一起放到页面中去，然后删除之前的宿主。虚拟 DOM 创建完成了，就要开始执行 patch 了，patch 里发现以前没有现在有，所以要执行一次创建元素，要把 vnode 批量创建成 DOM 元素，在创建 DOM 树的过程中就要做组件实例的创建和挂载。

               * createElm：把 vnode 变成真实 DOM，根组件执行更新函数时，会递归创建子元素和子组件，首次执行 _update() 时，patch() 会通过 createElm() 创建根元素，子元素创建研究从这里开始。
                 * createComponent()：如果要创建的是组件，走这个流程
                   * 获取创建组件 vnode 时安装的组件管理钩子并执行，创建组件实例并挂载
                   * initComponent()：组件实例的属性，事件，样式等初始化
                     * invokeCreateHooks()：执行属性相关的钩子，如事件监听 updateDOMListeners()
                   * insert()：该组件对应的 DOM 树枝插入父组件的 DOM 树上的操作
                 * 原生标签的创建，把之前得到的 vnode 转换为真实的 DOM
                   * createChildren()：递归创建子元素
                   * invokeCreateHooks()：执行属性相关的钩子，如事件监听 updateDOMListeners()
                     * addEventListener()：原生的事件监听
                   * insert()：该组件对应的 DOM 树枝插入父组件的 DOM 树上的操作

             * 都存在就执行 diff 执行更新。

               * patchVnode：diff 算法发生的地方。对组件的整棵 vnode 树中的每个 vnode 节点进行比较。自顶向下，从最顶层的根节点开始比较，判断是一个节点，对这个节点本身做打补丁操作，这个操作主要是该节点本身的属性更新操作。深度优先：有孩子先比孩子调用 updateChildren，updateChildren 中还会调用 patchVnode，一直向下递归，直到该分支上没有孩子为止，将每个 vnode 节点都 patch 一遍。

                 * isPatchable(vnode)：节点属性更新，根据平台特性拿出属性的更新函数并传入新老 vnode 去执行属性的更新。

                 * 当新老节点都无子节点的时候，只是文本的替换。

                 * 如果老节点没有子节点而新节点有子节点，先清空老节点的文本内容，然后为其新增子节点。 

                 * 当新节点没有子节点而老节点有子节点的时候，则移除该节点的所有子节点。

                 * 新老节点均有子节点，则对子节点进行 Diff 操作，调用 updateChildren。

                   * updateChildren：同级比较，深度优先的递归走完后，再比同一级别数组的下一个节点，直到全部比较完成。

                     比较的过程同时做了 DOM 操作，DOM 操作也是微任务，所以浏览器会等这些 Diff 过程中的 DOM 操作都做完后才统一刷新。

                     updateChildren 主要作用是用一种较高效的方式比对新旧两个 VNode 的 children 得出最小操作补丁。

                     两个数组的比较方式：大部分操作都是有规律的，前后插入或正序倒序等。所以为了提高效率，会做一些假设，就是在新老孩子数组的首尾很有可能找到相同的节点，这样就避免做循环了，方法是设置双指针，首尾都没有找到相同的节点还是要做双循环。

                     找到相同的节点做该节点本身的打补丁操作，移动节点位置，移动指针做下一个节点的对比。

       * 构建组件实例的时候，创建了一个和组件实例相关的 Watcher，传入更新函数，初始化过程 Watcher 会执行一次更新函数，以后有更新，Watcher 会让更新函数再次执行。



## 重要知识

### Vue 批量异步更新策略

侦听到数据变化，不会把对应的 Watcher 直接更新，而是开启一个队列，存放所有需要变化的组件 Watcher，启动一个微任务 Promise.resolve().then()，在面里遍历队列，一次性的执行所有 Watcher 的更新函数，更新函数把所有的 DOM 更新全部做完之后，浏览器统一的刷新一次，就达到了我们期待的高效方式。

如果一个 key 同时被多次修改，导致 Watcher 被多次触发，只会被推入到队列中一次，去重对于避免不必要的计算和 DOM 操作是非常重要的。

异步策略的选择会有优先级，根据当前执行环境的支持情况，会分别使用 Promise.then、MutationObserver、setImmediate、setTimeout，如果使用宏任务做的话，用户体验就不好了，因为它只能到下一个循环才能看到结果了。

### 事件循环

我们之所以能做批量异步更新，就是利用浏览器的这个机制。

事件循环：浏览器为了协调事件处理、脚本执行、网络请求和渲染等任务而制定的一套工作机制。 

宏任务：宏就是一系列操作的小集合，代表一个个离散的、独立工作单元，它跟其他事情是不相干的，自己是一套，能完成一个组合的事情。宏任务主要包括创建主文档对象、解析 HTML、执行主线 JS 代码以及各种事件如页面加载、输入、网络事件和定时器等，这些宏任务都在任务队列里保存。浏览器每次只执行一个宏任务，下一个宏任务执行开始前，需要刷新一次，刷新是指它会重新渲染页面里所有 UI 的部分，重新去摆一摆，放一放，因为数据变了，UI 可能会发生变化。

微任务：微任务是更小的任务，是在当前宏任务执行结束后立即执行的任务。如果在微任务队列中存在微任务，浏览器会清空微任务之后再重新渲染。微任务主要有 promise then 回调函数、DOM 发生变（mutation observer）等。

调用栈：执行代码的时候会有一个调用栈 Call Stack，先进后出的方式把该执行的代码推进去执行，最后把 Call Stack 清空掉。

代码执行的顺序是先走同步任务，再走异步任务，循环的执行宏任务，微任务。

### 虚拟 DOM

数据变化时通过新旧虚拟 DOM 比对可以得到最小 DOM 操作量，从而提升性能。

### 模版编译

模板编译的主要目标是将模板 template 转换为渲染函数 render。这个过程是一个字符串模版被转换成 JS 函数。

模板编译必要性：Vue 2.0 需要用到 VNode 描述视图以及各种交互，而 VNode 是需要 render 函数来生成的，手写 render 显然不切实际，因此用户只需编写类似 HTML 代码的 Vue 模板，通过编译器将模板转换为可返回 VNode 的 render 函数。

入口文件 entry-runtime-with-compiler.js 中，如果存在 template 或 el 选项就会执行编译，会执行 compileToFunctions 方法，把模版传进去。通过方法名就可以知道，它可以把字符串模版变成一个函数，它会返回 render 函数。

编译分为三步：解析、优化和生成，src/compiler/index.js。

* 解析 - parse：解析器把模版转换为 AST 对象，抽象语法树，它是对我们将来我们要生成的代码的 JS 对象的描述，将来遍历这棵树，把代码生成。这是底层代码生成器的必要知识。用对象的形式来描述 JS 代码，先把字符串变成对象，这个对象是有格式规定的，能描述将来要生成的代码。解析器内部分了HTML解析器、文本解析器和过滤器解析器。
* 优化 - optimize：在 AST 中标记静态子树，静态子树是界面中永远不变的节点，如两层嵌套以上的纯文本节点。
  * 每次重新渲染，不需要为静态子树创建新节点。
  * 虚拟 DOM 中 patch 时，可以跳过静态子树。
* 代码生成 - generate：把 AST 转换成代码字符串，比如一个字符串形式的函数，然后用 new Function(code) 把字符串函数的代码作为参数传进去就可以得到一个真正的 render 函数。

processIf 用于解析 v-if，genIf 用于生成条件语句相关代码。

processFor 用于解析 v-for 指令，genFor 用于生成相应代码。

v-if，v-for 这些指令只能在编译器阶段处理，如果我们要在 render 函数处理条件或循环只能使用 if 和 for，然后生成VNode。

### 组件化机制

组件化机制就是从 new Vue().$mount() 创建根组件实例和挂载的过程开始，先处理组件自身的 DOM 元素和属性，然后创建子组件，然后子组件会在组件的 patch 过程中实例化和挂载，再走一遍子组件的上述的过程，就这样一层一层的向下创建，直到完成整个树的创建。自定义组件创建有两个关键的过程，一个是 vnode 的创建过程，一个是 vnode 转真实 DOM 的过程，这两个过程的关键方法都叫创建组件 createComponent。一个是安装组件的实例化和挂载的，一个是调用组件的实例化和挂载的。

组件就是组件实例，配置项就是组件的配置项，template 是带有配置项的模版，render 是带有配置项的函数，vnode 是 描述 DOM 的 JS 对象。

组件声明了之后，接下来一定会去创建实例和挂载。创建实例了才能够走 Vue 中的流程，挂载了才能跟 DOM 有联系。

有几个组件 _init 就会执行几次了，从根组件开始向下依次执行。

首次 render 时，会得到整棵树的 VNode 结构。

根组件的构造函数是 Vue，组件的构造函数是 VueComponent。

组件创建和挂载顺序：组件创建顺序自上而下，组件挂载顺序自下而上，这里的挂载指的不是 $mount，而是实际的 dom 插入父级的时机。

