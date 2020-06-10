### generator 发生器

如何让遍历停下来，每一步都可以控制是不是要继续进行。generator 就可以帮你做到如何让遍历停下来。

es5 中，一旦这个函数被调用，这个 for 循环就一次执行完了，它是不受控的，不能停下来。

```js
function loop () {
  for (let i = 0; i < 5; i++) {
    console.log(i)
  }
}
loop()
```

es6 generator的写法

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

这两种写法都在描述一个遍历的过程

核心语法上定义的区别：

* function 后面要加一个*，*两边都要有空格
* 想让它停下的地方要加一个 yield 关键字

执行上的区别：

es5 中执行的话直接调用 loop 去执行。

es6 中是在 loop 执行完之后返回的一个变量叫 l，l 并不能直接执行，这个变量是用来控制循环的。l.next() 去执行这个遍历中的一步，不调用 next 那这个循环就是暂停状态，执行完一次就暂停。每 next 一次，它就按照你的循环往前执行一步。通过这个方式就可以精细化的控制到遍历的每一个节奏，这个就是 generator，它让循环是受你控制的。

应用场景：

自定义遍历器，任意复杂的数据结构都可以自定义它的遍历，这个 es5 是做不到的。es6 generator 就可以帮你实现自定义遍历器，它是很重要的一部分内容。

### generator 语法

* 从定义来说，generator 就是一个函数，但是和普通函数不一样，它多一个 *
* 函数内部可以使用 yield 来暂停函数的执行
* 在调用的过程中，通过 next 来恢复程序的执行

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

yield 关键字只能在 generator 函数内部中使用，关键字做为表达式的一部分，既然是表达式，我们很关心它有没有返回值，yield 表达式返回 undefined，也就是没有返回值。

next 找函数体中的 yield 或者是函数的结尾，这两者找到一个就会暂停或者结束。

yield 后面可以加一个 *

既然我们是用 next 来控制函数的恢复执行，那它的返回值无非是两个数据。

我当前 yield 表达式的值是什么。

我的函数是否已经结束。

yield 加 * 之后，它表示的是后面可以是一个遍历的对象，专业术语叫可迭代的对象。或者是一个 generator 实例，也就是yield * 后面可以嵌套一个 generator 函数。

#### next

用 next 传值到 generator 函数中来控制函数内部的数据。next 传进来的值是给 yield 的返回值。也就是说通过改变 yield 返回值的方式来改变函数内部的数据或运行结果。

next 里面的 value 是 yield 后面的值或者函数 return 的值，yield 后面的值和 yield 的返回值是不一样的。

只要有 yield 就会停下来，后面即使是没有代码也需要再 next 一次这个函数才算执行完。next 里的 node 才为 true。

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

退出函数执行，也可以传值，跟next一样。

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
console.log(g.next()) // {value: 1, done: false}
console.log(g.next()) // {value: 1, done: false}
console.log(g.next()) // {value: 1, done: false}
console.log(g.next()) // {value: 1, done: false}
// 如果你不用generator，你用es5去写，你的页面已经死掉了，因为无限循环。但是用generator是死不掉的。因为它虽然是个无限循环，但是它的节奏是由外部来控制的。它就不是一个无限循环了。
g.throw(new Error('ss')) // ss
console.log(g.next()) // {value: 1, done: false}
// 类似与continue的方式，绕过去了。抛出异常的方式结束函数运行。
```

### generator 应用场景

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

输出3的倍数，按照es5的写法一定是死循环了。

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