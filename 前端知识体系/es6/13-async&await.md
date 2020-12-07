### async/await

async/await 内部是使用 promise 结合 generator 来实现的。

then 只是将 callback 拆分了，它的写法还是异步的写法，本质上还是 callback，因为 then 里面传的是一个函数，只不过比 callback 写法更加模块化，可以链式的串行，不用嵌套很多层。

#### async/await 是直接用同步的写法来写异步

其实我们解决了这么长时间的异步，我们无法改变 js 单线程，异步这种本质。但是单线程，异步的本质导致的问题是编写代码的顺序和执行的顺序不一致。所以我们一直在解决那种 callback 所带来的这个问题，现在有了终极解决方案，就是 async/await，它看上去就是一个直接的同步代码写法。

这完全是同步的写法，使用上没有一个回调函数，可能回调函数的事情封装起来了，使用上是完全的同步的写法。

```js
const load = async function () {
  const result1 = await loadImg(src1)
  console.log(result1)
  const result2 = await loadImg(src2)
  console.log(result2)
}
load()
```

#### 语法

* 使用 await，函数必须用 async 标识，这个函数也可以作为一个普通的函数来执行。 
* await 后面必须跟一个 promise 实例，如果不是它会帮你自动处理成一个 promise 对象，await 的返回值就是这个 promise 实例 resolve 或 reject 传出来的结果。

#### async

声明函数的前面加一个关键字 async。

promise 是在函数内部通过手动的 new Promise 对象来返回一个 promise 实例，达到一个异步操作的过程，这个函数的返回值是一个 promise 对象。这样的话，我们在执行这个函数的时候，就可以调一个 .then 方法来继续下一步的操作。这个就是异步操作的过程。函数的调用就是用来等待异步操作的过程，.then 是结果。

async 的作用就是不用你手动返回一个 promise，你只要在 function 前面加一个 async，在你返回的不是一个 promise 的时候，它会自动的帮你把返回值变成一个 promise 实例。

```js
async function firstAsync () {
  return 27 // 引擎会自动帮你转成这种效果Promise.resolve(27)
}
```

```js
async function firstAsync () {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('now it is done')
    }, 10)
  })
  promise.then(val => {
    console.log(val)
  })
  console.log(2)
  return 3
}
firstAsync().then(val => {
  console.log(val)
})
// 2
// 3
// now it is done
```



### for await of

#### 异步操作集合的遍历

* for of 是用来遍历同步操作的，如果你的数组或集合里面有异步操作 for of 是不能拿到正确结果的。
* 使用 for of 配合await的对于集合中存在几个异步操作的时候，结果不是很理想的。
* for await of 是真正操作异步结合的。

```js
function Gen (time) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(time)
    }, time)
  })
}
async function test () {
  let arr = [Gen(2000), Gen(100), Gen(3000)]
  for await (let item of arr) {
    console.log(Date.now(), item)
  }
}
test()
```

#### 自定义遍历器中存在异步操作的时候

```js
const obj = {
  count: 0,
  Gen (time) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve({done: false, value: time})
      }, time)
    })
  },
  [Symbol.asyncIterator] () {
    let self = this
    return {
      next () {
        self.count++
        if (self.count < 4) {
          return self.Gen(Math.random() * 1000)
        } else {
          return Promise.resolve({
            done: true,
            value: ''
          })
        }
      }
    }
  }
}
async function test () {
  for await (let item of obj) {
    console.log(Date.now(), item)
  }
}
test()
```
