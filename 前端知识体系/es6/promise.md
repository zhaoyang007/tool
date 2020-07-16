/* todo      
  1.promise链式调用原理？
  2.then中的错误回调和catch有什么区别？
  3.then中函数返回和不返回promise对象，对链式调用的影响？
*/

### 回调

一个函数执行完之后调用另一个函数，这个时候就要用到回调了。尤其第一个函数是异步操作的过程，不能让两个函数连续执行，并行执行的话起不到 a 执行完之后再去执行 b，所以通常是使用回调来完成的。回调地狱是 a 回调 b，b 回调 c，c 回调 d，层层嵌套，非常难维护。es5 的异步都是用回调来完成的。es6 中新增的 promise 对象就是为了解决回调地狱的问题。这就是异步操作与回调的关系。

```js
function loadScript (src, callback) {
  let script = document.createElement('script')
  script.src = src
  script.onload = () => {callback(src)}
  script.onerror = (err) => {callback(err)}
  document.head.append(script)
}

loadScript('./1.js', function (src) {
  loadScript('./2.js', function (src) {
    loadScript('./3.js', function (src) {

    })
  })
})
```

### Promise

Promise 它就是个异步的结果。

Promise 接收一个函数做为参数。这个函数有两个参数 resolve, reject，函数体里要去做我们异步的事，异步成功调用 resolve，失败调用 reject。

写法上它不是一层一层去嵌套了，而是平行的结构，这样的话，在后期的维护以及在代码可读性上做了很大程度上的增强，这个在实际的业务开发中是非常重要的。

```js
function loadScript (src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = src
    script.onload = () => {resolve(src)}
    script.onerror = () => {reject(src)}
    document.head.append(script)
  })
}

loadScript('./1.js')
  .then(loadScript('./2.js'))
  .then(loadScript('./3.js'))
```

### promise 工作原理

在执行 new Promise() 的时候，要关心两个值，一个是 state 状态，一个是 result 结果，初始化的时候状态是 pending，结果是 undefined。resolve 和 reject 这两个方法是用来改变 promise 状态和结果的。异步成功，调用 resolve，它会把 promise 状态改成 fulfilled，也就是完成，result 就是你调用方法传进去的值。异步失败，调用 reject，promise 的状态就变成 rejected，result 就是传进去的 error。这个状态的变化是单向的，不可逆的。比如我调用了 resolve 把它的状态从 pending 改成了fulfilled，那这个状态就不可能再变成 rejected 了。也就是说 resolve 和 reject 只能一个被执行，这关系到你 promise 对象最终的状态和结果。整个 promise 对象运行的过程，就是在执行 resolve 和 reject 的过程。

### then

#### then基本语法

这两个参数 onFulfilled 是必选的，onRejected 是可选的。

onFulfilled 跟 onRejected 对应着 resolve 和reject，这两个方法跟 promise 对象的状态是息息相关的。这两个参数都是函数类型，如果这两个参数被遗漏或者传的是非函数，它就忽略掉这两个参数的内容了。既然我们这个东西被忽略掉，它为
什么又执行了。是因为它去判断你这个参数的时候，这个参数的内容是要做为一个表达式的。什么叫表达式，它是表达式它就要计算表达式的值。一旦被计算，那意味着它就要被执行，它被执行，那就执行了 promise 内的这个过程。

```js
promise.then(onFulfilled, onRejected)
```

#### .then().then() 这种链式调用的工作原理

then 方法会返回一个新的 promise 实例。传的是非函数它会返回一个空的 promise 对象。因为返回一个空的 promise 对象，它就会认为是 resolve 的，也就是我们这个 fulfilled 状态，然后它就能进入到后面的 then 的过程。这样就能保证只要调用 then 就一定能返回一个 promise 对象，也就能保证我们能连续的使用链式调用。传入了正确的参数 then 方法时，如果传入的函数中没有手动 return 的话，then 也会返回一个新的空的 promise 实例。如果你想用你的 promise 对象的结果影响下一个，一定是手动的加 return 返回你的 promise 实例来控制你接下来的 then 是什么状态和 then 是怎么执行的。

### 错误的处理

then 的 err 回调和 catch 都是能够捕获到 reject 抛出的错误。只不过 then 的 err 回调是针对一个 promise 对象的错误回调，而 catch 能接收一系列的异步链式调用的异常，也就是异步链式中写一个 catch 就能够捕获到每一个异步的异常。用catch 捕获异常的方式比在每个 then 上都要部署异常的处理的方式更加的优雅。

还有就是不要用 throw new Error() 的方式去触发你的错误，而是要用 promise 对象中的 reject 去改变 promise 状态的方式让 catch 去捕获这种错误。catch 它捕获的是改变 promise 状态也就是 promise 状态变成 rejected 的时候，它去捕获。

```js
loadScript('./1.js')
  .then(() => {
    loadScript('./2.js')
  }, err => {
    console.log(err)
  })
  .then(() => {
    loadScript('./3.js')
  }, err => {
    console.log(err)
  })
```

### resolve & reject

Promise 有两个静态方法，是用来帮你做类型转换的。比如我想把一个数据转换成一个 promise 对象。

```js
Promise.resolve(42)
```

在一些特殊场景，没有异步操作的时候，你可以用 Promise.resolve() 的方式加数据。这样就可以把一些非异步的操作变成异步操作，这样就可以统一的调 then 方法了。这个是非常有用的一个技巧，大家可以学会在什么样的场合用它来帮你快速生成一个 promise 实例。

### 异常处理 catch

```js
loadScript('./1.js')
  .then(() => {
    loadScript('./2.js')
  })
  .then(() => {
    loadScript('./3.js')
  })
  .catch(err => {
    console.log(err)
  })
```

### all

有时候我们做异步操作还有可能是并行的，三个接口出去，我不知道哪个接口先回来，我只关心你们都回来的时候我要把数据聚合。

因为有多个异步操作，所以 all 接受一个数组，这个数组就是不同的异步操作 promise 实例。利用 all 这个函数你可以轻松
的去完成不同的并行接口的实现。

```js
const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = Promise.resolve(3)
Promise.all([p1, p2, p3])
  .then(value => {
  console.log(value) // [1, 2, 3]
})
```

### rase

竞争，谁先到谁先得。一线路二线路都存着我们想要的数据。一二线路有一个线路能加载出来我就用谁的。

由于 p1 执行较快，Promise 的 then() 将获得结果1。p2 仍在继续执行，但执行结果将被丢弃。

```js
const p1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(1)
    }, 0)
  })
}
const p2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(2)
    }, 1000)
  })
}
Promise.race([p1(), p2()])
  .then(value => {
    console.log(value) // 1
  })
```