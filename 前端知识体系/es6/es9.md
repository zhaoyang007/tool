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

### promise.finally

finally始终都会被执行

```js
const Gen = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (time < 500) {
        resolve(time)
      } else {
        reject(time)
      }
    }, time)
  })
}
Gen(Math.random() * 1000)
  .then(val => console.log('resolve' + val))
  .catch(err => console.log('reject' + err))
  .finally(() => console.log('finish'))
```

### 新增 Object 的 rest 和 spread 方法

#### spread

Object 的 spread 是使用深拷贝的方式做的，不是直接引用地址的方式。之前要合并对象是非常麻烦的。现在变得很容易。

```js
const input = {
  a: 1,
  b: 2
}
const output = {
  ...input,
  c: 3
}
console.log(input, output) // {a: 1, b: 2} {a: 1, b: 2, c: 3}
input.a = 4
console.log(input, output) // {a: 4, b: 2} {a: 1, b: 2, c: 3}
```

#### rest

```js
const input = {
  a: 1, 
  b: 2,
  c: 3,
  d: 4,
  e: 5
}
const {a, b, ...rest} = input
console.log(a, b, rest) // 1 2 {c: 3, d: 4, e: 5}
```

### es9关于正则的新增知识点

能力大幅提升

* dotAll
* 命名分组捕获
* 后行断言