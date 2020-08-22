### generator 语法

generator 可以让函数执行停下来。

generator 函数执行后返回一个对象，这个对象中有一个 next 函数，是用来控制 generator 函数内部代码的执行的。

* 从定义来说，generator 就是一个函数，但是和普通函数不一样，它多一个 *。
* 函数内部可以使用 yield 来暂停函数的执行。
* 在调用的过程中，通过 next 来恢复程序的执行。

#### yield

```js
function * gen () {
  let val
  // 遇到yield，然后执行完yield后面的表达式后就会停止。并不会执行赋值操作，在下一次的next在会赋值。
  val = yield 1 
  console.log(val)
}
const l = gen()
l.next() //
l.next() // undefined
```

yield 关键字只能在 generator 函数内部中使用，关键字做为表达式的一部分。既然是表达式，我们就会关心它的返回值。

next 找函数体中的 yield 或者是函数的结尾，这两者找到一个就会暂停或者结束。

yield 后面可以加一个 *，yield 加 * 之后，它表示的是后面可以是一个可遍历的对象，专业术语叫可迭代的对象。或者是一个 generator 实例，也就是 yield * 后面可以嵌套一个 generator 函数。

#### next

next 用来控制函数的恢复执行，next 函数的返回值是一个包含两个属性的对象：{ done: true, value: undefined}，
done：函数是否已经结束，value：yield 后面的值或者函数 return 的值。

next 传递的参数会作为 yield 表达式的返回值来控制函数内部的数据，不传就是 undefined。也就是说可以通过改变 yield 返回值的方式来改变函数内部的数据或运行结果。

只要有 yield 就会停下来，后面即使是没有代码也需要再 next 一次这个函数才算执行完。done 才为 true。

```js
function * gen () {
  let val
  val = yield [1, 2, 3]
  console.log(val)
}
const l = gen()
console.log(l.next())
console.log(l.next())
// {value: Array(3), done: false}
// undefined
// {value: undefined, done: true}

function * gen () {
  let val
  val = yield [1, 2, 3]
  console.log(val)
}
const l = gen()
console.log(l.next(10))
console.log(l.next(20))
// {value: Array(3), done: false}
// 20
// {value: undefined, done: true}
```

#### return

退出函数执行，也可以传值，跟 next 一样。

```js
l.return()
```

#### throw

```js
function * gen () {
  while (true) {
    try {
      yield 1
    } catch (e) {
      console.log(e.message)
    }
  }
}
const g = gen()
// 如果你不用generator，用es5去写，你的页面已经死掉了，因为无限循环。但是用generator是死不掉的。因为它虽然是个无限循环，但是它的节奏是由外部来控制的。它就不是一个无限循环了。
console.log(g.next()) // {value: 1, done: false}
console.log(g.next()) // {value: 1, done: false}
console.log(g.next()) // {value: 1, done: false}
console.log(g.next()) // {value: 1, done: false}
// 类似于continue的方式，绕过去了。抛出异常的方式结束函数运行。
g.throw(new Error('ss')) // ss
console.log(g.next()) // {value: 1, done: false}
```



### generator 应用场景

#### 自定义遍历器

任意复杂的数据结构都可以自定义它的遍历，这个 es5 是做不到的。es6 generator 就可以帮你实现自定义遍历器，它是很重要的一部分内容。

#### 抽奖模块

es5 

```js
function draw (first = 1, second = 3, third = 5) {
  let firstPrize = ['1A', '1B', '1C', '1D', '1E']
  let secondPrize = ['2A', '2B', '2C', '2D', '2E', '2F', '2G', '2H', '2I']
  let thirdPrize = ['3A', '3B', '3C', '3D', '3E', '3F', '3G', '3H', '3I']
  let result = []
  let random
  // 抽一等奖
  for (let i = 0; i < first; i++) {
    random = Math.floor(Math.random() * firstPrize.length)
    result = result.concat(firstPrize.splice(random, 1))
  }
  // 抽二等奖
  for (let i = 0; i < second; i++) {
    random = Math.floor(Math.random() * secondPrize.length)
    result = result.concat(secondPrize.splice(random, 1))
  }
  // 抽三等奖
  for (let i = 0; i < third; i++) {
    random = Math.floor(Math.random() * thirdPrize.length)
    result = result.concat(thirdPrize.splice(random, 1))
  }
  return result
}
let t = draw()
for (let value of t) {
  console.log(value)
}
```

es6 generator

```js
function * draw (first = 1, second = 3, third = 5) {
  let firstPrize = ['1A', '1B', '1C', '1D', '1E']
  let secondPrize = ['2A', '2B', '2C', '2D', '2E', '2F', '2G', '2H', '2I']
  let thirdPrize = ['3A', '3B', '3C', '3D', '3E', '3F', '3G', '3H', '3I']
  let count = 0
  let random
  while (1) {
    if (count < first) {
      random = Math.floor(Math.random() * firstPrize.length)
      yield firstPrize[random]
      count++
      firstPrize.splice(random, 1)
    } else if (count < first + second) {
      random = Math.floor(Math.random() * secondPrize.length)
      yield secondPrize[random]
      count++
      secondPrize.splice(random, 1)
    } else if (count < first + second + third) {
      random = Math.floor(Math.random() * thirdPrize.length)
      yield thirdPrize[random]
      count++
      thirdPrize.splice(random, 1)
    } else {
      return false
    }
  }
}
let d = draw()
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
```

#### 处理无限循环的流程

输出 3 的倍数，按照 es5 的写法一定是死循环了。

```js
function * count (x = 1) {
  while (1) {
    if (x % 3 === 0) {
      yield x
    }
    x++
  }
}
let num = count()
console.log(num.next().value) // 3
console.log(num.next().value) // 6
console.log(num.next().value) // 9
console.log(num.next().value) // 12
console.log(num.next().value) // 15
```

#### generator 控制循环

es5 中，一旦这个函数被调用，这个 for 循环就会一次执行完，它是不受控的，不能停下来。

```js
function loop () {
  for (let i = 0; i < 5; i++) {
    console.log(i)
  }
}
loop()
```

如何让遍历停下来，每一步都可以控制是不是要继续进行。generator 就可以帮你做到如何让遍历停下来。

```js
function * loop () {
  for (let i = 0; i < 5; i++) {
    yield console.log(i)
  }
}
const l = loop()
l.next() // 0
l.next() // 1
l.next() // 2
l.next() // 3
l.next() // 4
l.next() // 什么都不会打印了
```
