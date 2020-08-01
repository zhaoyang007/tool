## 源码剖析准备

我们的目标是除了学习知识之外，还要学会学习方法，比如代码的基本的组织方式，怎么去调试，看到源码之后应该有怎样的策略去拆解它学习它。

看完官方的实现之后，自己动手琢磨琢磨，反复的去试，思维就逐渐形成了，这样训练能力。

理顺一下 Vue 整个源码的学习流程，以后怎么自己去掌握它。

Vue 源码学习使我们能够深入理解原理，解答很多开发中的疑惑，规避很多潜在的错误，写出更好的代码。学习大神的代码，能够学习编程思想，设计模式，训练基本功，提升内力。  

### 搭建调试环境

1. clone 源码，地址：https://github.com/vuejs/vue.git  版本:2.6.10

2. 安装依赖：npm install

3. 安装 rollup，因为 Vue 的打包工具用的是 rollup：npm install -g rollup

4. 修改开发脚本：添加代码映射，调试的过程中能够直接调试和研究源码。

   修改 package.json 中的打包脚本：

   "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"

5. 打包，执行开发脚本：npm run dev

   打包成功之后 dist 下会生成一个全新的 vue.js，和它的 map 文件 vue.js.map

6. 编写测试文件

   创建一个测试脚本来看看我们打包的东西是否正常。在任何地方写都可以，vue 有些案例在 examples 里，我们就可以在这来编写测试文件。

   test/01-test.html

   把刚才打包的 vue.js 引进来，剩下的就正常的写一个 vue 程序就行了。

   浏览器打开不报错的跑起来，并且有 vue 初始化的一些输出就可以了。

### 调试技巧

* 打开指定文件：ctrl+p

* 断点：想知道某个地方到底发生了什么事情

* 单步执行

  * 单步跳过函数
  * 单步进入函数

* 查看调用栈

  研究代码的过程中，想搞清楚先后之间的调用关系，有时函数进入过深的时候，往往就搞不清楚了。这时就可以好好的研究这个 Call Stack，可以很有效的把你的思路去理顺，是谁调用的谁，整个过程会显得很清晰。调用栈中就可以很好的看到整个的函数执行的流程。

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
    	/components        通用组件，keep-alive，为什么只有这一个组件，因为它是所有平台通用的。weex 或 web 平台会									 有特殊的像 transition 这样的组件，它会写到其他的目录去。就会写到 platforms 这个目录的 									 weex或 web 里头单独去组织，所以代码的分工是非常清楚的。很值得去借鉴。
    	/instance     		 构造函数等，在核心代码中，最应该关心的目录应该是这个。Vue 的构造函数就会在这里头。查找									 的思路是什么呢，怎么会找到这里。
   	 /global-api            全局 API
        /observer              响应式相关
        /vdom                   虚拟 DOM 相关

### 输出的各个发布版本的含义

* runtime：仅包含运行时，不包含编译器，意味着写程序的时候不能使用 template 这个配置项去写字符串的模版。
* common：只能用于像 nodejs 那边的 require 的方式称为 commonjs，用 cjs 规范来进行打包的，用于像 webpack1，broswerfiy 等老旧版本打包工具。
* esm：ES（ECMA Script）模块，主要用于 webpack2+ 这些打包工具。
* umd：universal module definition，就是什么都不加的，如 vue.js，兼容 cjs 和 amd 规范（异步模块），浏览器里面加载模块都希望是异步的啊，所以 amd 规范特别适合在浏览器里使用，浏览器里面直接用不经过打包工具打包的一般会用这个版本。



![Vue流程](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/Vue/Vue流程.png)



## 找入口

使用打包工具的项目的源码入口文件怎么找。

从这个源码入口文件开始研究源码。

入口怎么找，一般先从 package.json 开始，找到我们打包的脚本命令 dev，是 rollup 打包的，-c 指明了配置文件在哪，然后根据打包脚本命令的参数和打包工具配置文件就能够找到你想要那个输出版本的入口文件到底是谁。

研究源码我们要多次与这个入口文件打交道，尤其是初始化过程。



## Vue 初始化过程研究

从入口文件开始，根据文件或模块的引用路径寻找 Vue 构造函数。发现每个文件模块的作用。最后通过调试 new Vue() 的程序来整理出整个初始化流程。

### src/platforms/web/entry-runtime-with-compiler.js

扩展 $mount，处理 template 或 el 选项，执行模版解析和编译工作。

### src/platforms/web/runtime/index.js

安装 web 平台特有指令和组件 

定义 \__patch__

定义 $mount

### src/core/index.js

定义全局 API

### src/core/instance/index.js

定义 Vue 构造函数

定义 Vue 实例 API

```js
initMixin(Vue)       // 实现init函数
stateMixin(Vue)      // 状态相关api $data,$props,$set,$delete,$watch 
eventsMixin(Vue)     // 事件相关api $on,$once,$off,$emit 
lifecycleMixin(Vue)  // 生命周期api _update,$forceUpdate,$destroy 
renderMixin(Vue)     // 渲染api _render,$nextTick
// $nextTick：更改数据想立刻看到dom更改的结果。在这行代码的下面看的话，这个结果并没有，因为vue做的是异步更新的操作，想要看到dom变化必须写在$nextTick的回调中。
```

### src/core/instance/init.js

初始化方法 _init 定义的地方

创建组件实例，初始化其数据、属性、事件等

```js
initLifecycle(vm)     // 声明$parent $root $children $refs，组件创建的顺序是自上而下的，挂载的顺序是自下而上的，因为当我创建完毕之后，我要立刻执行挂载，找到老爹执行一次挂载。
initEvents(vm)        // 处理父组件传入的事件和回调，就是对父组件传入的事件添加监听
initRender(vm)        // 跟渲染相关的东西，渲染相关那肯定也就是跟虚拟dom相关的东西。声明了$slots, 		  
											// $createElement

// 完成了上面三件事之后，会调一个beforeCreate，所以beforeCreate里面可以用上面声明的所有的东西
callHook(vm, 'beforeCreate') // 调用beforeCreate钩子

initInjections(vm)    // 注入数据 resolve injections before data/props
initState(vm)         // 重要：数据的初始化props，methods，data，computed，watch，数据响应式
initProvide(vm)       // 提供数据 resolve provide after data/props

// 上面的事情都做完后，会有一个created这个生命周期，这个时候所有的初始化全部完成了，你可以放心大胆做你任何想做的事情了。
callHook(vm, 'created')
```

### src/core/instance/lifecycle.js

mountComponent：执行挂载，获取 VDOM 并转换为 DOM

### src/core/instance/render.js

render()：渲染组件，获取 VDOM

### src/core/instance/lifecycle.js

update()：执行更新，将传入 VDOM 转换为 DOM，初始化时执行的是 DOM 创建操作

### 初始化总体流程

根据一个简单的 Vue 程序，断点调试，串联整个初始化流程。

构建组件实例的时候创建 Watcher

1. new Vue() 进入到构造函数，调用 init()
2. init 里执行一系列的初始化工作
3. $mount()，执行挂载 
   * mountComponent()，执行挂载转换，渲染更新组件
     * 声明 updateComponent，更新函数
       * \_render()：调用 render 函数获取最新的虚拟 DOM
       * \_update()：
         * \__patch__()：把虚拟 DOM 转换为真实 DOM
           * patchVnode：Diff 算法真正发生的地方。
     * 创建 Watcher，传入更新函数：这个 watcher 和组件绑定，管理这个组件实例。
       * 初始化执行一次 updateComponent
       * 每次这个组件实例的数据变化再次执行 updateComponent，这就是虚拟 DOM 的存在价值，这个组件可能有很多数据发生变化，所以必须通过比对得出哪个地方变了。



## 深入数据响应式

数据响应式是在 Vue 初始化工作 init 里面的 initState 方法里做的。

initState 这个方法来自于 src/core/instance/state.js，这里面做了一系列数据的初始化，包括 props、methods、data、computed 和 watch。

#### data 响应式

initData：获取 data，设置代理，启动响应式 observe。

#### observe

src/core/observer/index.js，跟响应式所有有关的代码都在这个 observer 文件夹中。

#### observer 方法

判断出入的对象数据是不是响应式的，是的话直接返回 Observer 实例。不是的话创建 Observer 实例。

也就是说一个对象数据要进行一次响应式观察处理。一次只处理一个对象数据和里面的一层。

#### Observer 类

* 为每一个对象数据创建一个 Dep 实例，当这个对象数据发生变化的时候能够通知界面更新。
* 分别做数组和对象的响应化处理
  * defineReactive 
    * 创建每一个 key 对应的 dep，然后为每个 key 做响应化拦截。这个细粒度的 dep 是为用户 Watcher 准备的，而不是为了整个组件的渲染 Watcher。
    * 收集依赖的时候，会考虑到要响应化的数据中存在对象数据，要把该数据和它里面的对象数据中的每个 key 都做依赖收集起来，利用的就是之前创建的 ob。这样值变化能做到通知界面。如果要做响应化的数据是数据要把数组中的每一项都做依赖收集起来。它们最终收集的 Watcher 都是一个，就是该组件实例对应的那个 Watcher。

一个组件实例只有一个 Watcher。

### Vue2.0 中响应式的缺点

各种递归遍历，性能会受影响，如果数据很大，有一个超大的数据，一开始光做这些递归循环去给它们做响应式的拦截就非常非常可怕。所以 Vue3 里才会用 Proxy 去避免这个事，它只会在外面加壳。

API 不统一，对于数组和 object 是两套方案。所以这两套方案调用的时候很多细节就要知道，尽量去规避这些情况。有时候一不小心就会出现数据改了，界面不会变，就是因为没有合适的做这个操作。

这些问题 Proxy 都能很好的去解决实现。



## Vue 批量异步更新策略

Vue 高效的秘诀是一套批量、异步的更新策略，还有虚拟 DOM。

在一次事件循环周期之内，可能有很多数据发生变化，导致很多组件发生变化，最好的方式就是把这些组件批量的放在一起做 DOM 的更新操作，全部更新完之后浏览器一下子刷新页面，这时候的效果是最好的最快的，这就是 Vue 的批量异步更新策略。

有一个队列存放所有需要变化的 Watcher，Promise.resolve().then() 里遍历执行 Watcher 的更新函数，更新函数把所有的 DOM 操作、DOM 更新全部做完之后，这样就相当于在一个微任务中执行了所有变化，然后浏览器统一的刷新一次，就达到了我们期待的高效方式。

### 事件循环

我们之所以能做批量异步更新，就是利用浏览器的这个机制。

事件循环：浏览器为了协调事件处理、脚本执行、网络请求和渲染等任务而制定的一套工作机制。 

宏任务：宏就是一系列操作的小集合，代表一个个离散的、独立工作单元，它跟其他事情是不相干的，自己是一套，能完成一个组合的事情。宏任务主要包括创建主文档对象、解析 HTML、执行主线 JS 代码以及各种事件如页面加载、输入、网络事件和定时器等，这些宏任务都在任务队列里保存。浏览器每次只执行一个宏任务，下一个宏任务执行开始前，需要刷新一次，刷新是指它会重新渲染页面里所有 UI 的部分，重新去摆一摆，放一放，因为数据变了，UI 可能会发生变化。

微任务：微任务是更小的任务，是在当前宏任务执行结束后立即执行的任务。如果在微任务队列中存在微任务，浏览器会清空微任务之后再重新渲染。微任务主要有 promise 回调函数、DOM 发生变（mutation observer）等。

执行代码的时候会有一个调用栈 Call Stack，先走同步任务，再走异步任务，最后把 Call Stack 清空掉。循环的执行宏任务，微任务。

### Vue 中的具体实现

异步：只要侦听到数据变化，Vue 将开启一个队列，把要更新的事放到队列里头，主要是 Watcher。如果同一个 Watcher 被多次触发，只会被推入到队列中一次。去重对于避免不必要的计算和 DOM 操作是非常重要的。异步策略的选择会有优先级，根据当前执行环境的支持情况，会分别使用 Promise.then、MutationObserver、setImmediate、setTimeout，如果使用宏任务做的话，用户体验就不好了，因为它只能到下一个循环才能看到结果了。

批量：在接下来的某个时刻，一次性的把刚才队列中的所有的 Watcher 执行一次。在下一个的事件循环“tick”中，Vue 刷新队列执行实际工作。

代码实现应该从 defineReactive 中的 setter 里的通知更新的方法 dep.notify 开始，因为这里会知道数据的变化并且做通知更新操作，notify 中会执行所有收集的 Watcher 的 update 方法，update 方法中执行 queueWatcher 方法，这个方法里会创建一个队列 queue，将 Watcher 入队，最后执行 nextTick 方法，传入 flushSchedulerQueue 方法，该方法做的是真正的更新操作，timerFunc 方法中启动了一个微任务 Promise，promise.then 中会执行 flushSchedulerQueue。



## 虚拟 DOM

### 概念

虚拟 DOM 就是 JS 对象，能够描述 DOM 结构和关系，它是一棵树，和 DOM 树是完全对应的。

![虚拟DOM](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/Vue/虚拟DOM.png) 

数据的变更通过数据响应式的 setter 做了更新通知，更新里调了 watcher 的 run，run 里调用了更新函数，之后实际上是重新的计算了一次 render 得到最新的虚拟 DOM。

这时就得到了新旧虚拟 DOM，通过 patch 的过程做一个对比，得出我可以做的最小的 DOM 操作就可以了。

1.0 是数据变更直接操作 DOM，2.0 是在 1.0 的基础上加了一层虚拟 DOM 做比较，替我们做了最小的 DOM 操作，让我们可以直接和数据打交道，而不是直接写 DOM 操作。

### 优点和必要性

优点：

* 轻量、快速：当它们发生变化时通过新旧虚拟 DOM 比对可以得到最小 DOM 操作量，从而提升性能。

  比如一个列表操作，如果用 JQuery 来做的话，要往里头插入、push、或刷新数据的时候，我们可能用比较粗暴的方式，先把列表清空掉，然后把新的数据遍历一遍创建 n 个元素再重新追加进去，效率是非常差的，我们不会去做对比的算法，但是虚拟 DOM 帮我们做了这件事，无论我们的数据做了多少变化，虚拟 DOM 都会经过 Diff 算法算出真正的 DOM 变化的地方，然后做最小的 DOM 操作。

* 跨平台：将虚拟 DOM 更新转换为不同运行时特殊操作实现跨平台。

* 兼容性：还可以加入兼容性代码增强操作的兼容性。

必要性：

Vue1.0 中有细粒度的数据变化侦测，它是不需要虚拟 DOM 的，但是细粒度造成了大量开销，这对于大型项目来说是不可接受的。因此，Vue2.0 选择了中等粒度的解决方案，每一个组件一个 Watcher 实例，这样状态变化时只能通知到组件，不管组件中哪个值变了都要通知 Watcher 做组件的渲染，但是又不能将整个组件都重新渲染一遍，那样的性能就比 Vue1.0 更低了，所以只重新渲染变了的那部分，想做到这点就需要引入虚拟 DOM 去进行比对和渲染。所以 Vue2.0 由于 Watcher 粒度的变化，是必须要使用虚拟 DOM 这个角色的。

### patch 过程

patch 作用：传入 DOM 或虚拟 DOM，对比两个虚拟 DOM，然后执行 DOM 操作，返回值也是个虚拟 DOM。

```js
patch(vnode, h('div#app', obj.foo))
```



![Vnode](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/Vue/Vnode.png)

#### patch

首先进行整棵 VNode 有无的比较，可能有三种情况。

* new VNode 树不存在就删
* old VNode 树不存在就增
* 都存在就执行 Diff 执行更新

#### patchVnode

自顶向下，从最顶层的根节点开始比较，判断是一个节点，对这个节点本身做打补丁操作，这个操作主要是该节点本身的属性更新操作。

深度优先：先比孩子，向下递归，直到该分支的叶子节点才结束。

* 当新老节点都无子节点的时候，只是文本的替换。
* 如果老节点没有子节点而新节点有子节点，先清空老节点的文本内容，然后为其新增子节点。 
* 当新节点没有子节点而老节点有子节点的时候，则移除该节点的所有子节点。
* 新老节点均有子节点，则对子节点进行 Diff 操作，调用 updateChildren。

#### updateChildren

同级比较：深度优先的递归走完后，再比同一级别数组的下一个节点，直到全部比较完成。

比较的过程同时做了 DOM 操作，DOM 操作也是微任务，所以浏览器会等这些 Diff 过程中的 DOM 操作都做完后才统一刷新。

updateChildren 主要作用是用一种较高效的方式比对新旧两个 VNode 的 children 得出最小操作补丁。

两个数组的比较方式：大部分操作都是有规律的，前后插入或正序倒序等。所以为了提高效率，会做一些假设，就是在新老孩子数组的首尾很有可能找到相同的节点，这样就避免做循环了，方法是设置双指针，首尾都没有找到相同的节点还是要做双循环。

找到相同的节点做该节点本身的打补丁操作，移动节点位置，移动指针做下一个节点的对比。

![Diff](/Users/zhaoyang/tool/images/前端知识体系/前端工程实践/Vue/Diff.png)



## 模版编译

模板编译的主要目标是将模板 template 转换为渲染函数 render。这个过程是一个字符串模版被转换成 JS 函数。

模板编译必要性：Vue 2.0 需要用到 VNode 描述视图以及各种交互，而 VNode 是需要 render 函数来生成的，手写 render 显然不切实际，因此用户只需编写类似 HTML 代码的 Vue 模板，通过编译器将模板转换为可返回 VNode 的 render 函数。

### 整体流程

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



## 组件化机制

组件，组件实例，配置项，template，render，虚拟 DOM 到底是什么关系。

### 组件的注册声明

使用 Vue.component('comp', {})

initAssetRegisters 方法中定义了 Vue['component'] = function(id, definition) {}，里面使用 Vue.extend 的方式将传进来的组件配置 definition 变成了组件构造函数。然后在根配置选项里面注册这个组件 this.options['components']\['id'] = Ctor，所有的组件实例继承于这个根选项，所以每一个组件实例里其实就已经有了这个配置选项的定义，所以可以随便的去用。

### 组件实例的创建及挂载 

组件声明了之后，接下来一定会去创建实例 new Ctor 和挂载 $mount。

创建组件和创建元素比并没有什么特殊之处，编译出来的 render 函数显示它们只是名称不同而已。

/src/core/instance/init.js 组件初始化的地方，所以从这里开始。有几个组件 _init 就会执行几次。从根组件开始向下一次执行。

首先创建的是根实例，然后是根组件，然后是里面的自定义组件，首次 render 时，会得到整棵树的 VNode 结构。

根组件的构造函数是 Vue，组件的构造函数是 VueComponent。

new Vue()  =>  $mount()  =>  vm._render()  =>  $createElement()  =>  createElement() h方法  =>  

_createElement() 根据标签名称 tag 做相应操作生成虚拟 DOM：

* tag 是字符串 
  * tag 是保留标签：vnode = new VNode()
  * 自定义组件：
    * resolveAsset()：获取组件构造函数
    * vnode = createComponent()：把构造函数，props，事件等作为参数传进去，创建自定义组件虚拟 DOM，就是根据用户写的组件的所有配置创建一个与之相对应的 VNode 对象。
      * 处理传递的数据，属性，事件等。
      * installComponentHooks() 安装自定义组件管理钩子到该组件的 vnode 上：涉及到组件如何实例化创建和挂载的地方。
        * componentVNodeHooks 默认的组件管理钩子
          * init：将来的某个时刻会执行这个初始化
            * createComponentInstanceForVnode 传入 vnode 创建组件实例，因为 vnode 中有构造函数 Ctor
            * 将得到的组件实例执行挂载 $mount，然后接着执行该组件的 render update watcher  createComponent... 等一些列的这个组件下的那些事情。这个自定义组件这棵子树它的创建过程。递归向下。
          * prepatch
          * insert
          * destroy
      * 虚拟 DOM 的创建
      * 最终返回虚拟 DOM，自定义组件的 vnode 中会有一个特别的属性 componentInstance，将来组件实例创建完成之后，这个属性会被填充，patch 的时候执行组件管理钩子 init，创建组件实例。
* tag 是选项或构造函数：vnode = createComponent(tag, data, context, children)
* 最终返回 vnode

=>  虚拟 DOM 创建完成了，就要开始执行 patch 了，patch 里发现以前没有现在有，所以要执行一次创建元素，要把虚拟 DOM 批量创建成 DOM 元素，在创建 DOM 树的过程中就要做组件实例的创建  =>  

* createElm 根组件执行更新函数时，会递归创建子元素和子组件，首次执行_update()时，patch()会通过createEle()创建根元素，子元素创建研究从这里开始
  * createComponent()：把之前得到的虚拟 DOM vnode 转换为真实的 DOM
    * 获取组件管理钩子并执行，创建组件实例并挂载
    * initComponent()：上步创建的组件实例的属性，事件，样式等初始化，元素引用指定 vnode.elm，元素属性创建等
    * insert()：该组件对应的 DOM 树枝插入父组件的 DOM 树上的操作
  * 原生标签的创建



## 遗漏问题

### 数组响应化

这也反映了一个问题，我们平常写代码的时候，有些方式是不可以的，必须通过方法或 set 去改变数组。

```js
items = [1, 3]
item[0] = 'abc' // no ok
Vue.set(itme, 0, 'abc') // ok
```

### 数据响应式里的源码具体实现问题

dep，watcher，observer 之间的关系。

### 自己尝试编写测试案例调试

编写测试案例，找一些断点把自己的想法想要观察的地方动手调试一下。这个技能非常重要，它是学习源码深入理解这些问题的一个非常重要的手段。

### 自己研究一下 Vue.set/delete/$watch 等 API

你在研究这些东西的时候，从哪开始呢，它在哪个文件，但是一开始根本不知道它在哪，不太容易找，怎么办呢，可以写上一个测试的页面，在里面调一下你要研究的api接口，一调试不就知道它在哪了吗。这是一个最简单的方式，在我们刚开始学习的阶段是很有效的。

### 尝试看看 Vue 异步更新队列是如何实现的

1.Queue

既然是异步更新，显然要涉及一个概念就是队列 Queue，将来 vue 会创建一个队列，每一次提交更新的时候不会立刻做这件事，而是尝试把这个Watcher直接往队列里面放，如果这个Watcher已经在队列里了，会做去重，不让它再进去了。所以一个Watcher在一个队列中只可能出现一次，同时对组件里的n个key做了修改，最终进入到队列的Watcher只有一个。

2.批量异步

### Vue 初始化流程和数据响应式知识点思维导图

理清整体的流程，每个文件从哪开始怎么进去，它们是做什么的，有什么作用，把整个过程流程给理顺理通。 

https://www.processon.com/view/link/5d1eb5a0e4b0fdb331d3798c



## 遗漏问题

### patch 函数是怎么获取的?

### 节点属性是如何更新的

### 组件化机制是如何实现的

1.注册：Vue.component()
2.实例化

### 口述 Diff



## 遗漏问题

### 事件处理

思路：注意编译的结果

原生事件
自定义事件 

### 双向绑定

思路：注意编译的结果

赋值、事件监听

### 尝试去看源码，解答你的疑惑

### 组件创建和挂载顺序？

组件创建顺序自上而下

组件挂载顺序自下而上