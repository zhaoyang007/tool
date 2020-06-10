### async/await

#### async

声明函数的前面加一个关键字 async

```js
async function firstAsync () {
  return 27 // 引擎会自动帮你转成这种效果Promise.resolve(27)
}
```

promise 是在函数内部通过手动的 new Promise 对象来返回一个 promise 实例，达到了一个异步操作的过程，这个函数的返回值是一个 promise 对象。这样的话，我们在执行这个函数的时候，就可以调一个 .then 方法来继续下一步的操作。这个就是异步操作的过程。函数的调用就是用来等待异步操作的过程，.then 是结果。

async 的作用就是不用你手动返回一个 promise，你只要在 function 前面加一个 async，在你返回的不是一个 promise 的时候，它会自动的帮你把返回值变成一个 promise 实例。

#### await

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

await promise 它是一个表达式了，表达式它是有一个结果的，表达式最终是用来计算出一个结果的。await 后面加了一个promise 对象它就是一个表达式了。而且这个表达式的值就是你 promise 所返回的值。await 后面必须跟一个 promise 对象，如果不是它会帮你自动处理成一个 promise 对象。await 必须配合 async 来用。 

async 和 await 是 promise 的语法糖。换了一种写法，背后还是 promise 的运作原理。只是使用的方式更加清晰，简洁，优雅。

### Object .keys .values .entries

es8新增的对object快速遍历的方法。

keys 是遍历所有的key到一个数组。

values 是遍历所有的value到一个数组。

entries 是把一个不支持遍历的对象变成一个可遍历的对象，并且可以解构赋值。

```js
let grade = {
  'lilei': 96,
  'hanmeimei': 99
}
// es5
let result = []
for (let k in grade) {
  result.push(k)
}
console.log(result) // ['lilei', 'hanmeimei']
// es8
console.log(Object.keys(grade)) // ['lilei', 'hanmeimei']
```

### 新增对字符串补白的方式

#### es5

```js
for (let i = 0; i < 32; i++) {
  if (i < 10) {
    console.log(`0${i}`)
  } else {
    console.log(i)
  }
}
```

#### es8

```js
for (let i = 0; i < 32; i++) {
  console.log(i.toString().padStart(2, '0'))
}
```

### 如何获取 object 数据的描述符

后端返回的数据中，某一条数据的是无用的，是不应该再显示这条数据的，它是没用的数据。但你不能直接用：delete data.Lima。这样数据就被删除了，但是这个数据只是现在不显示，以后可能还要用，所以不能删除。所以这个地方就要利用描述符了。

```js
let data = {
  PortLand: '78/50',
  Dublin: '88/52',
  Lima: '58/40'
}
```

描述符就是用来告诉你这个对象如何来操作这个数据。

#### defineProperty

```js
Object.defineProperty(data, 'Lima', {
  value: '58/40', // 值
  writable: true, // 可写
  enumerable: false, // 可枚举
  configurable: true // 可配置
})
console.log(Object.keys(data)) // ['PortLand', 'Dublin']
```

#### getOwnPropertyDescriptors

拿到 data 这个对象中所有的数据的描述符，利用这个就可以知道 data 所有数据的信息

```js
console.log(Object.getOwnPropertyDescriptors(data))
```

#### getOwnPropertyDescriptor

拿到data这个对象中某一项数据的描述符

```js
console.log(Object.getOwnPropertyDescriptor(data, 'Lima'))
```