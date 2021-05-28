### class

##### es6 中的类

```js
class Animal {
  // 构造函数
  constructor (type) { 
    this.type = type
  }
  // 公用方法，挂载在原型上的方法
  eat () { 

  }
  // 定义类的静态方法
  static walk () {

  }
}

// 继承
class Dog extends Animal {
  constructor (type) {
    // super调用必须放到构造函数第一行，这个super就是父类的构造函数
    super(type)
  }
}
```

##### getter setter

getter 是所访问的属性的真正的返回。

setter 在属性赋值的时候会拦截到，然后做一些你想做的逻辑。通常是做一些判断来控制 getter 中真正返回的那个值。

```js
class Animal {
  constructor (type) { 
    this.type = type
  }
  get age () {
    return 4
  }
  set age (val) {
    this.realAge = val // 这里不能再给age赋值了，不然就变成死循环了
  }
}
let dog = new Animal()

console.log(dog.age) // 4
dog.age = 5
console.log(dog.age) // 4
console.log(dog.realAge) // 5
```

```js
let _age = 4
class Animal {
  constructor (type) { 
    this.type = type
  }
  get age () {
    return _age
  }
  set age (val) {
    if (val > 4 && val < 7) {
      _age = val
    }
  }
}
let dog = new Animal('dog')
console.log(doa.age)
dog.age = 5
console.log(dog.age)
```

### generator

generator 函数执行后返回一个对象，这个对象中有一个 next 函数，是用来控制 generator 函数内部代码的执行的。

函数内部可以使用 yield 来暂停函数的执行。

在调用的过程中，通过 next 来恢复程序的执行。

##### yield

```js
function * gen () {
  let val
  // 遇到yield，执行完yield后面的表达式后就会停止。并不会执行赋值操作，下一次next才会赋值。
  val = yield 1 
  console.log(val)
}
const l = gen()
l.next() //
l.next() // undefined
```

next 找函数体中的 yield 或者是函数的结尾，这两者找到一个就会暂停或者结束。

yield 后面可以加一个 *，yield 加 * 之后，它表示的是后面可以是一个可遍历的对象，专业术语叫可迭代的对象。或者是一个 generator 实例，也就是 yield * 后面可以嵌套一个 generator 函数。

##### next

next 用来控制函数的恢复执行，next 函数的返回值是一个包含两个属性的对象，done：函数是否已经结束，value：yield 后面的值或者函数 return 的值。

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

##### return

退出函数执行，也可以传值，跟 next 一样。

```js
l.return()
```

##### throw

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

##### 应用场景

1.处理无限循环的流程

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

2.控制循环

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

### Iterator 自定义遍历器

##### es5

```js
let authors = {
  allAuthors: {
    fiction: ['Agla', 'Skks', 'LP'],
    scienceFiction: ['Neal', 'Arthru', 'Ribert'],
    factory: ['J.R.Tole', 'J.M.R', 'Terry P.K']
  },
  Address: []
}
let r = [];
for (let [k, v] of Object.entries(authors.allAuthors)) {
  r = r.concat(v);
}
console.log(r); // ['Agla', 'Skks', 'LP', 'Neal', 'Arthru', 'Ribert', 'J.R.Tole', 'J.M.R', 'Terry P.K']
```

##### es6

可迭代协议：在对象上存在 Symbol.iterator 这样的 key，值是一个 function，你想判断一个对象是不是可迭代的，你就去找这个对象上有没有以 Symbol.iterator 为 key 的方法，如果没有那这个对象就是不可迭代的。

迭代器协议：一个函数返回一个对象，这个对象里面有一个方法 next，next 的返回值是 done 和 value。generater 是遵循了迭代器协议的。

```js
authors[Symbol.iterator] = function () {
  return { 
    next () {
      return {
        done: false,
        value: 1
      }
    }
  }
}
```

实现自定义遍历器：

输入是 this。

输出是返回值：done 用来表述遍历是否结束，value 用来告诉当前所遍历的值。

```js
authors[Symbol.iterator] = function () {
  // 这里执行一次
  let allAuthors = this.allAuthors;
  let keys = Reflect.ownKeys(allAuthors);
  let values = [];
  return { 
    next () {
      // 最终生成的遍历器循环几次这里就执行几次
      // 返回每次的done和value
      if (!values.length) {
        if (keys.length) {
          values = allAuthors[keys[0]];
          keys.shift();
        }
      }
      return {
        done: !values.length,
        value: values.shift()
      }
    }
  }
}
```

使用 generator 来实现 iterator 的可迭代接口：

```js
authors[Symbol.iterator] = function * () {
  let allAuthors = this.allAuthors;
  let keys = Reflect.ownKeys(allAuthors);
  let values = [];
  // 写一个无限循环，只要keys有值就yield出值，没有值说明遍历结束，直接return退出循环
  while (1) {
    if (!values.length) {
      if (keys.length) {
        values = allAuthors[keys[0]];
        keys.shift();
        yield values.shift();
      } else {
        return false;
      }
    } else {
      yield values.shift();
    }
  }
}
```

使用：

```js
let r = [];
for (let v of authors) {
  r.push(v);
}
console.log(r);
```

