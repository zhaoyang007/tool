### 函数参数的默认值

#### es5

这个函数有3个参数x,y,z，x是必须的参数，yz是可选的参数，既然是可选也就是说允许它为空，同时对于可选的参数，我们一般情况下希望它提供默认值。

```js
function f (x, y, z) {
  // 如何对待参数缺省的处理，利用这种方式实现了默认值。
  if (y === undefined) {
    y = 7
  }
  if (z === undefined) {
    z = 42
  }
  return x + y + z
}
```

#### es6

我们在写参数的时候，就同时指定了默认值，要把没有默认值的参数往前写，有默认值的往后靠。

```js
function f (x, y = 7, z = 42) {
  return x + y + z
}
console.log(f(1, 8, 43))
```

中间的参数需要使用默认值时传 undefined 就行了。

```js
console.log(f(1, undefined, 43))
```

参数的默认值可以是包含其他参数的表达式

```js
function f (x, y = 7, z = x + y) {
  return x + y + z
}
```

### 不确定参数的问题

#### es5

f.length，函数体的 length 属性是你定义的时候没有默认值的参数的个数，不是执行时输入的参数的个数。

使用arguments

```js
function sum () {
  let num = 0
  Array.from(arguments).forEach(function (item) {
    num += item * 1
  })
  return num
}
```

#### es6

使用rest，它的含义是，用...表示这个函数的所有参数都放在nums这个变量中。

```js
function sum (...nums) {
  let num = 0
  nums.forEach(function (item) {
    num += item * 1
  })
  return num
}
```

rest 参数是用来获取函数执行时的所有参数。

nums它是数组，不是伪数组。

它还可以拆开，你可以先指定1, 2, 3，剩余的不确定的参数都放到它这里面去。

#### spread

传入的数据是数组，然后把数组的每一项拆解出来作为函数的参数。

```
function sun (x = 1, y = 2, z = 3) {
  return x + y + z
}
let data = [4, 5, 6] // 后端返回数据
```

##### es5

1.把数组中的数据按照索引分别取出来，对应函数的参数 x, y, z

```js
sum(data[0], data[1], data[2])
```

2.使用 apply 传参是数组的特性，它允许把函数的参数收敛到一个数组中去调用，它会帮你自动的去做 0, 1, 2 跟函数的参数的对应。

```js
sum.apply(this, data)
```

##### es6

spread 利用 ... 就把数组的内容打散到我指定的 x, y, z 上面去。rest 是将 x, y, z 的三个参数我收敛到数组中去。它们可以理解为是一个相反的操作。

```js
sum(...data)
```

### 箭头函数

#### es5 声明函数

```js
function hello () {}
let hello = function () {}
```

#### es6 

```js
let hello = () => {}
```

有且只有一个参数的时候 () 可以省略。

返回值是表达式时，可以省略 {} 和 return，如果返回值是一个字面量对象，外面要加一个 ()，这个小括号就当作运算表达式的作用。

#### this 问题

普通函数和箭头函数对 this 的指向定义不同了，普通函数是谁在调用这个函数 this 就指向谁，箭头函数是我在定义的时候this 指向的是什么，执行时 this 还是什么。