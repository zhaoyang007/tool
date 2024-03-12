## Javascript

##### 数据类型

typeof：

值类型：'undefined', 'number', 'string', 'boolean', 'symbol'

引用类型：'function', 'object'(对象，数组，null)

Object.prototype.toString.call(obj)： 

'[object Undefined]', '[object Number]', '[object String]', '[object Boolean]', '[object Symbol]', '[object Function]', '[object Object]', '[object Array]', '[object Null]'

获取数据类型：

```js
function getType(value) {
  if (value === null) return value + "";
  if (typeof value === "object") {
    let valueClass = Object.prototype.toString.call(value),
    type = valueClass.split(" ")[1].split("");
    type.pop();
    return type.join("").toLowerCase();
  } else {
    return typeof value;
  }
}
```

##### 作用域

作用域：作用域就是变量，函数能够使用的范围。

作用域链：自由变量的查找是在函数定义的地方向上级作用域查找，不是在函数执行的地方。

自由变量：当前作用域中使用了却没有声明的变量。

##### 闭包

闭包是一个绑定了执行环境的函数。

* 函数的词法环境
* 函数中用到的未声明的变量
* 函数体

有两个函数，内部函数定义在外部函数中，并且内部函数使用了外部函数环境中定义的变量，当内部函数执行的时候，外部函数就形成了一个闭包。

```js
(function () {
  var a = 1;
  function add() {
    var b = 2;
    var sum = b + a;
    console.log(sum) // 3
  }
  add();
})();
```

闭包作用：

1.私有化数据。

函数中的 data 只能通过 get 和 set 访问，外部无法访问，相当于将变量私有化。

```js
function createPrivate() {
  const data = {};
  return {
    get(key) {
      return data[key];
    },
    set(key, value) {
      data[key] = value;
    }
  }
}
```

2.使局部变量常驻内存

```js
// 打印 10个10
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// 闭包
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
for (var i = 0; i< 10; i++){
  (function(i) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  })(i);
}
```

3.节流/防抖函数里都用到了闭包

##### 单线程和异步

单线程：只有一个线程，同一时间只能做一件事情。

单线程原因：避免 dom 渲染的冲突。

异步：在单线程的环境下，针对耗时很长的任务会阻塞后面代码的执行，造成页面卡死状态，所以要将这些任务变成异步来处理。

异步写法：

* 回调函数
* jquery deferred
* Promise
* async/await
* generator

##### event-loop

事件循环是浏览器对异步的实现方式。

整体的 js 代码这个宏任务先执行，同步代码执行完后有微任务执行微任务，没有微任务执行下一个宏任务，如此往复循环至结束。

**微任务宏任务api**

微任务：

1. Promise 回调：`.then()`, `.catch()`, 和 `.finally()` 方法的回调。
2. MutationObserver：通过 MutationObserver API 注册的回调，用于监视 DOM 变化的接口。
3. process.nextTick（Node.js 环境下）：在 Node.js 中，process 对象有一个 nextTick 方法，可以注册一个在事件循环结束后立即执行的回调。

宏任务：

1. setTimeout 和 setInterval：通过 `setTimeout` 和 `setInterval` 注册的回调。
2. I/O 操作：文件读写、网络请求等 I/O 操作的回调。
3. UI 渲染：DOM 渲染的回调。
4. postMessage：通过 `postMessage` 注册的回调。
5. MessageChannel：通过 `MessageChannel` API 注册的回调。
6. setImmediate（Node.js 环境下）：在 Node.js 中，`setImmediate` 注册的回调。

**宏任务之间会触发页面渲染**

```js
// 修改DOM
const $p1 = $('<p>一段文字</p>')
const $p2 = $('<p>一段文字</p>')
const $p3 = $('<p>一段文字</p>')
$('#container')
  .append($p1)
  .append($p2)
  .append($p3);
// 微任务：DOM 渲染之前执行
Promise.resolve().then(() => {
  const length = $('#container').children().length;
  alert(`micro task ${length}`);
});
// 宏任务：DOM 渲染之后执行
setTimeout(() => {    
  const length = $('#container').children().length;
  alert(`macro task ${length}`);
});
```

##### 原型和原型链

原型：

* 每个 class 都有显示原型 prototype

* 每个实例都有隐式原型 \_\_proto\_\_

* 实例的隐式原型 \_\_proto\_\_ 指向对应 class 的显示原型 prototype

* prototype 中有一个 constructor 属性，用来引用它的构造函数，Person.prototype.constructor === Person，这是一种循环引用。

原型链：我们把由 \_\_proto\_\_ 串起来的直到 Object.prototype.\_\_proto\_\_ 为 null 的链叫做原型链。

```js
Object.__proto__ === Function.prototype 
Function.__proto__ === Function.prototype 
Function.prototype.__proto__ === Object.prototype 
Object.prototype.__proto__ === null // 原型链顶端

Object instanceof Function; // true
Function instanceof Object; // true
```

##### 继承

对象冒充继承：

```js
function Person(name) {
  this.name = name;
}
function Student(name) {
  this.fn = Person;
  this.fn(name);
  delete this.fn;
}
```

call,apply,bind

call 和 apply 可以实现多重继承，一个子类能够继承多个父类，F1 可以同时从 F2, F3 ... 继承。

原型链继承：

对象继承类

```js
o.__proto__ = F.prototype;
```

类继承类

```js
Student.prototype.__proto__ = Person.prototype;
```

混合方式继承：

```js
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function() {
  console.log(this.name);
}
function Student(name, age) {
  Person.call(this, name);
  this.age = age;
}
Student.prototype.__proto__ = Person.prototype;
```

class 继承：

```js
class Person {}
class Student extends Person {
  constructor() {
    super()
  }
}
```

new 继承：

构造函数创建实例的过程本身就是一种继承，new 的内部其实是做了继承里面的合体工作。

```js
Student.prototype = new Person();
```

##### 模块化

https://juejin.cn/post/6866973719634542606

es module 

commonjs

amd

cmd

前端发展模块化历程及 js 模块化原理:

1.函数封装

我们在讲函数的时候提到，函数一个功能就是实现特定逻辑的一组语句打包，而且JavaScript的作用域就是基于函数的，所以把函数作为模块化的第一步是很自然的事情，在一个文件里面编写几个相关函数就是最开始的模块了。

```js
function fn1 () {
  statement
}
function fn2 () {
  statement
}
```

这样在需要的时候加载函数所在文件，调用函数就可以了。

这种做法的缺点很明显：污染了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间没什么关系。

2.对象

为了解决上面问题，对象的写法应运而生，可以把所有的模块成员封装在一个对象中。

```js
var myModule = {
  var1: 1,
  var2: 2,
  fn1: function () {

  },
  fn2: function () {

  }
}
```

这样我们在希望调用模块的时候引用对应文件，然后

myModule.fn2()

这样避免了变量污染，只要保证模块名唯一即可，同时同一模块内的成员也有了关系

看似不错的解决方案，但是也有缺陷，外部可以随意修改内部成员

myModel.var1 = 100;

这样就会产生意外的安全问题

3.立即执行函数

可以通过立即执行函数，来达到隐藏细节的目的

```js
var myModule = (function () {
  var var1 = 1;
  var var2 = 2;
  function fn1 () {

  }
  function fn2 () {

  }
  return {
    fn1: fn1,
    fn2: fn2
  }
})()
```

这样在模块外部无法修改我们没有暴露出来的变量、函数

4.放大模式(扩展模块本身)

如果一个模块很大，必须分成几个部分

```js
var module1 = (function (mod){
  mod.m3 = function () {
    //...
  };
  return mod;
})(module1 || {});
```

上面的代码为module1模块添加了一个新方法m3()，然后返回新的module1模块。

5.输入全局变量(依赖其他模块)

独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。

为了在模块内部调用全局变量，必须显式地将其他变量输入模块。

```js
var module1 = (function ($, YAHOO) {
  //...
})(jQuery, YAHOO);
```

上面的module1模块需要使用jQuery库和YUI库，就把这两个库（其实是两个模块）当作参数输入module1。

这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。

Javascript模块规范：CommonJS，AMD，CMD：

require.js实现AMD规范

sea.js实现CMD规范

定义模块(利用的就是模块化的原理，使用自执行函数)，导出模块；引入模块，使用模块

模块化博客：

Javascript模块化编程（一）：模块的写法    

http://www.ruanyifeng.com/blog/2012/10/javascript_module.html  

Javascript模块化编程（二）：AMD规范

http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html

Javascript模块化编程（三）：require.js的用法

http://www.ruanyifeng.com/blog/2012/11/require_js.htmls

模块化使用：

函数定义中调用引入的模块中的函数，始终是这样的两层结构。这个函数还可以作为模块被其他函数引用并且调用。调用时形成多层结构。一层一层的调用和传参。vuex 中的接口和 actions 的结合就能很好的体现这一点。

函数定义的时候是从外层到里层，调用的时候也是从外层到里层。

##### 跨 js 文件的时序问题解决，用回调函数

```js
// page1.js
var ensureGetIdFlag = false
var ensureGetIdCallbackQueue = []
function ensureGetId (callback) {
  if (ensureGetIdFlag === true) {
    callback()
    return
  }
  ensureGetIdCallbackQueue.push(callback)
}
$.ajax({
  url: "",
  data: "",
  type: "",
  success: function (data) {
    ensureGetIdFlag = true
    for(var i = ensureGetIdCallbackQueue.length - 1; i >= 0; i--){
      ensureGetIdCallbackQueue[i](data)
    }
  }
})
// page2.js
ensureGetId(function (data) {})
```

##### 如何捕获 js 程序中的异常

```js
// 1.手动捕获异常
// 这种方式用的比较常见，觉得哪个地方可能会风险比较高，那就用一个try catch给它包起来，然后有异常就输出
try {
  // todo
} catch (ex) {
  console.error(ex) // 手动捕获catch
} finally {
  // todo
}
// 2.自动捕获异常
// 一种兜底方案，比如说我们想要监听一下前端页面，已经上线了，我们做一个统计监听，我们看一下前端页面有没有什么js错误，一般我们第一种方式就是用上面的方式在该try catch的地方打上try catch，如果catch到我们就发一个统计打点，作为一个记录。第二种方式就是我们不可能每一行都用try catch。这样成本太高。我们只在一个高风险的地方用try catch，其他地方我们用一个window.onerror就可以了。它会自动捕获你程序中的一些问题。
window.onerror = function (message, source, lineNum, colNum, error) {
  // 报错信息 源码 行号 列号 错误栈
  // 第一，对跨域的js，如cdn，会告诉你错误了，但不会有详细的报错信息
  // 第二，对于压缩的js，还要配合sourceMap去反查到为压缩代码的行，列
}
//所以通过这两个方式来集合，你就能监听到页面上绝大部分的错误。
```

##### 强制类型转换

```js
/* 字符串转数字 */
// 1.parseInt(string, radix)
// 把 string 以 radix 进制解析成十进制整数，radix 默认是十进制
parseInt('11') // 11
parseInt('11', 2) // 3 
// 如果字符串前缀是 "0x" 或者 "0X"，则 parseInt 将其解释为十六进制数
parseInt('0x11') // 17
// 解析时会跳过空格，只解析字符串中的第一个数字，如果第一个非空格字符是非数字字符，则返回 NaN。
parseInt(' 11fagg') // 11
parseInt('a') // NaN
// 2.parseFloat(string) 
// 以十进制解析成十进制整数或浮点数。
parseFloat('11') // 11
parseFloat('11.3') // 11.3
// 解析时会跳过空格，只解析字符串中的第一个数字，如果第一个非空格字符是非数字字符，则返回 NaN。
parseInt(' 11fagg') // 11
parseInt('a') // NaN
// 3.Number(object)
// 将对象整体的值以十进制转换为十进制整数或浮点数的数字，如果对象整体的值无法转换为数字，返回 NaN。
Number('11') // 11
Number('11aa') // NaN
// 参数是 Boolean 值，返回 1 和 0。
// 参数是 null 值，返回 0。
// 参数是 undefined，返回 NaN。
// 参数是 Date 对象，返回从 1970 年 1 月 1 日至今的毫秒数。

/* 数字转字符串 */
// 1.Number 类定义的 toString(radix) 方法：把数字以十进制转为 radix 进制字符串，不指定此参数，转为十进制。
let a = 10;
a.toString() // '10'
a.toString(2) // '1010'
// 2.Number 类定义的 toFixed(x) 方法：把数字四舍五入为指定小数位数 x 的字符串。
let a = 10.156
a.toFixed(2) // '10.16'
```

##### sort(sortBy)

用于数组排序。

参数：可选，规定排序顺序，必须是函数。

如果没有使用参数，把数组的元素都转换成字符串（如有必要），按照字符编码的顺序进行排序。

如果想按照其他标准进行排序，需要提供比较函数，该函数接收要比较的两个值 a 和 b，返回一个用于说明这两个值的相对顺序的数字：

1 2 3     

3 2 1 

* a 小于 b，返回负数，升序（ascending）
* a 大于 b，返回正数，升序
* a 小于 b，返回正数，降序（descending）
* a 大于 b，返回负数，降序
* a 等于 b，返回 0

```js
// 对象数组中按某个对象的key做升降序排列
function compare(prop, order) {
  return function (obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (val1 < val2) {
      if (order === 'ascending') {
        return -1
      } else {
        return 1
      }
    } else if (val1 > val2) {
      if (order === 'descending') {
        return 1
      } else {
        return -1
      }
    } else {
      return 0;
    }
  }
}
const arr = [
  {a: 1, b: 2, c: 3},
  {a: 3, b: 2, c: 3},
  {a: 2, b: 2, c: 3},
]
arr.sort(compare('a', 'ascending'))
```

##### Javascript 固有对象 API

在自己的浏览器中计算出来 JavaScript 有多少固有对象。

```js
var set = new Set()
var objects = [
  eval,
  isFinite,
  isNaN,
  parseFloat,
  parseInt,
  decodeURI,
  decodeURIComponent,
  encodeURI,
  encodeURIComponent,
  Array,
  Date,
  RegExp,
  Promise,
  Proxy,
  Map,
  WeakMap,
  Set,
  WeakSet,
  Function,
  Boolean,
  String,
  Number,
  Symbol,
  Object,
  Error,
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
  ArrayBuffer,
  SharedArrayBuffer,
  DataView,
  Float32Array,
  Float64Array,
  Int8Array,
  Int16Array,
  Int32Array,
  Uint8Array,
  Uint16Array,
  Uint32Array,
  Uint8ClampedArray,
  Atomics,
  JSON,
  Math,
  Reflect]
objects.forEach(o => set.add(o))

for(var i = 0; i < objects.length; i++) {
  var o = objects[i]
  for(var p of Object.getOwnPropertyNames(o)) {
    var d = Object.getOwnPropertyDescriptor(o, p)
    if( (d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
      if(!set.has(d.value))
        set.add(d.value), objects.push(d.value)
    if( d.get )
      if(!set.has(d.get))
        set.add(d.get), objects.push(d.get)
    if( d.set )
      if(!set.has(d.set))
        set.add(d.set), objects.push(d.set)
  }
}
```

JavaScript 所有固有对象：

mac系统：Google Chrome：版本 79.0.3945.130（正式版本） （64 位）：总共 989 个 JavaScript 固有对象。

主要使用 Object.getOwnPropertyNames, Object.getOwnPropertyDescriptor 两种方法。

全部的 JavaScript 固有对象基本包含：

* 函数
* 函数中的 prototype 属性
* 构造器
* 构造器中的 object 和 functions 还有 get set 的属性，一般就是 function 属性和 get set 属性
* 构造器原型
* 构造器原型中的 object 和 function 还有 get set 的属性，一般就是 function 属性和 get set 属性
* Atomics, JSON, Math, Reflect
* Atomics, JSON, Math, Reflect 中的 object 和 function 还有 get set 的属性，一般就是 function 属性和 get set 属性

1.三个值：（3）

```
Infinity、NaN、undefined
```

2.九个函数：（11）

```js
eval
isFinite
isNaN
parseFloat
	parseFloat.prototype: {constructor: ƒ parseFloat()}
parseInt
	parseInt.prototype: {constructor: ƒ parseInt()}
decodeURI
decodeURIComponent
encodeURI
encodeURIComponent
```

3.一些构造器：（共880个）

```js
		Array: function Array() { [native code] }（共65个）
      function isArray() { [native code] }
      function from() { [native code] }
      function of() { [native code] }
      function () { [native code] } // pop
      function () { [native code] } // reverse
      function () { [native code] } // shift
      function () { [native code] } // keys
      function () { [native code] } // values
      function () { [native code] } // entries
      function () { [native code] } // indexOf
      function () { [native code] } // every
      function () { [native code] } // some
      function () { [native code] } // forEach
      function () { [native code] } // map
      function () { [native code] } // filter
      function () { [native code] } // find
      function () { [native code] } // findIndex
      function () { [native code] } // includes
      function () { [native code] } // join
      function () { [native code] } // slice
      function () { [native code] } // concat
      function () { [native code] } // push
      function () { [native code] } // splice
      function () { [native code] } // unshift
      function () { [native code] } // sort
      function () { [native code] } // lastIndexOf
      function () { [native code] } // reduce
      function () { [native code] } // reduceRight
      function () { [native code] } // copyWithin
      function () { [native code] } // fill
      Array.prototype: Array(0)，是个数组
        function concat() { [native code] }
        function copyWithin() { [native code] }
        function fill() { [native code] }
        function find() { [native code] }
        function findIndex() { [native code] }
        function lastIndexOf() { [native code] }
        function pop() { [native code] }
        function push() { [native code] }
        function reverse() { [native code] }
        function shift() { [native code] }
        function unshift() { [native code] }
        function slice() { [native code] }
        function sort() { [native code] }
        function splice() { [native code] }
        function includes() { [native code] }
        function indexOf() { [native code] }
        function join() { [native code] }
        function keys() { [native code] }
        function entries() { [native code] }
        function values() { [native code] }
        function forEach() { [native code] }
        function filter() { [native code] }
        function flat() { [native code] }
        function flatMap() { [native code] }
        function map() { [native code] }
        function every() { [native code] }
        function some() { [native code] }
        function reduce() { [native code] }
        function reduceRight() { [native code] }
        function toLocaleString() { [native code] }
        function toString() { [native code] }
        function flatten() { [native code] }
          flatten.prototype: {constructor: ƒ flatten()}
    Date: function Date() { [native code] }（共50个）
      function now() { [native code] }
      function parse() { [native code] }
      function UTC() { [native code] }
      Date.prototype: Object
        function toString() { [native code] }
        function toDateString() { [native code] }
        function toTimeString() { [native code] }
        function toISOString() { [native code] }
        function toUTCString() { [native code] }
        function getDate() { [native code] }
        function setDate() { [native code] }
        function getDay() { [native code] }
        function getFullYear() { [native code] }
        function setFullYear() { [native code] }
        function getHours() { [native code] }
        function setHours() { [native code] }
        function getMilliseconds() { [native code] }
        function setMilliseconds() { [native code] }
        function getMinutes() { [native code] }
        function setMinutes() { [native code] }
        function getMonth() { [native code] }
        function setMonth() { [native code] }
        function getSeconds() { [native code] }
        function setSeconds() { [native code] }
        function getTime() { [native code] }
        function setTime() { [native code] }
        function getTimezoneOffset() { [native code] }
        function getUTCDate() { [native code] }
        function setUTCDate() { [native code] }
        function getUTCDay() { [native code] }
        function getUTCFullYear() { [native code] }
        function setUTCFullYear() { [native code] }
        function getUTCHours() { [native code] }
        function setUTCHours() { [native code] }
        function getUTCMilliseconds() { [native code] }
        function setUTCMilliseconds() { [native code] }
        function getUTCMinutes() { [native code] }
        function setUTCMinutes() { [native code] }
        function getUTCMonth() { [native code] }
        function setUTCMonth() { [native code] }
        function getUTCSeconds() { [native code] }
        function setUTCSeconds() { [native code] }
        function valueOf() { [native code] }
        function getYear() { [native code] }
        function setYear() { [native code] }
        function toJSON() { [native code] }
        function toLocaleString() { [native code] }
        function toLocaleDateString() { [native code] }
        function toLocaleTimeString() { [native code] }
    RegExp: function RegExp() { [native code] }（共54个）
      function get input() { [native code] }
      function set input() { [native code] }
      function get $_() { [native code] }
      function set $_() { [native code] }
      function get lastMatch() { [native code] }
      function set lastMatch() { [native code] }
      function get $&() { [native code] }
      function set $&() { [native code] }
      function get lastParen() { [native code] }
      function set lastParen() { [native code] }
      function get $+() { [native code] }
      function set $+() { [native code] }
      function get leftContext() { [native code] }
      function set leftContext() { [native code] }
      function get $`() { [native code] }
      function set $`() { [native code] }
      function get rightContext() { [native code] }
      function set rightContext() { [native code] }
      function get $'() { [native code] }
      function set $'() { [native code] }
      function get $1() { [native code] }
      function set $1() { [native code] }
      function get $2() { [native code] }
      function set $2() { [native code] }
      function get $3() { [native code] }
      function set $3() { [native code] }
      function get $4() { [native code] }
      function set $4() { [native code] }
      function get $5() { [native code] }
      function set $5() { [native code] }
      function get $6() { [native code] }
      function set $6() { [native code] }
      function get $7() { [native code] }
      function set $7() { [native code] }
      function get $8() { [native code] }
      function set $8() { [native code] }
      function get $9() { [native code] }
      function set $9() { [native code] }
      function escape() { [native code] }
        escape.prototype: {constructor: ƒ escape()}
      RegExp.prototype: Object
        function exec() { [native code] }
        function get dotAll() { [native code] }
        function get flags() { [native code] }
        function get global() { [native code] }
        function get ignoreCase() { [native code] }
        function get multiline() { [native code] }
        function get source() { [native code] }
        function get sticky() { [native code] }
        function get unicode() { [native code] }
        function compile() { [native code] }
        function toString() { [native code] }
        function test() { [native code] }
    Promise: function Promise() { [native code] }（共14个）
      function all() { [native code] }
      function race() { [native code] }
      function resolve() { [native code] }
      function reject() { [native code] }
      function allSettled() { [native code] }
      function(){return e.apply(o,arguments)} // finally
        {constructor: ƒ ()}
      function try() { [native code] }
        try.prototype: {constructor: ƒ try()}
      Promise.prototype: Promise
        function then() { [native code] }
        function catch() { [native code] }
        function finally() { [native code] }
    Proxy: function Proxy() { [native code] }（共2个）
      function Proxy() { [native code] }
      function revocable() { [native code] }
    Map: function Map() { [native code] }（共20个）
      function(){return e.apply(o,arguments)} // toJSON
        {constructor: ƒ ()}
      function of() { [native code] }
        of.prototype: {constructor: ƒ of()}
      function from() { [native code] }
        from.prototype: {constructor: ƒ from()}
      Map.prototype: Map
        function get() { [native code] }
        function set() { [native code] }
        function has() { [native code] }
        function delete() { [native code] }
        function clear() { [native code] }
        function entries() { [native code] }
        function forEach() { [native code] }
        function keys() { [native code] }
        function get size() { [native code] }
        function values() { [native code] }
        function toJSON() { [native code] }
          toJSON.prototype: {constructor: ƒ toJSON()}
    WeakMap: function WeakMap() { [native code] }（共10个）
      function of() { [native code] }
        of.prototype: {constructor: ƒ of()}
      function from() { [native code] }
        from.prototype: {constructor: ƒ from()}
      WeakMap.prototype: WeakMap
        function delete() { [native code] }
        function get() { [native code] }
        function set() { [native code] }
        function has() { [native code] }
    Set: function Set() { [native code] }（共18个）
      function(){return e.apply(o,arguments)} // toJSON
        {constructor: ƒ ()}
      function of() { [native code] }
        of.prototype: {constructor: ƒ of()}
      function from() { [native code] }
        from.prototype: {constructor: ƒ from()}
      Set.prototype: Set
        function has() { [native code] }
        function add() { [native code] }
        function delete() { [native code] }
        function clear() { [native code] }
        function entries() { [native code] }
        function forEach() { [native code] }
        function get size() { [native code] }
        function values() { [native code] }
        function toJSON() { [native code] }
          toJSON.prototype: {constructor: ƒ toJSON()}
    WeakSet: function WeakSet() { [native code] }（共9个）
      function of() { [native code] }
        of.prototype: {constructor: ƒ of()}
      function from() { [native code] }
        from.prototype: {constructor: ƒ from()}
      WeakSet.prototype: WeakSet
        function delete() { [native code] }
        function has() { [native code] }
        function add() { [native code] }
    Function: function Function() { [native code] }（共8个）
      function () { [native code] } // 不明
      Function.prototype: function () { [native code] }
        function apply() { [native code] }
        function bind() { [native code] }
        function call() { [native code] }
        function toString() { [native code] }
          toString.prototype: {constructor: ƒ toString()}
    Boolean: function Boolean() { [native code] }（共4个）
      Boolean.prototype: Boolean
        function toString() { [native code] }
        function valueOf() { [native code] }
    String: function String() { [native code] }（共54个）
      function fromCharCode() { [native code] }
      function fromCodePoint() { [native code] }
      function raw() { [native code] }
      String.prototype: String
        function anchor() { [native code] }
        function big() { [native code] }
        function blink() { [native code] }
        function bold() { [native code] }
        function charAt() { [native code] }
        function charCodeAt() { [native code] }
        function codePointAt() { [native code] }
        function concat() { [native code] }
        function endsWith() { [native code] }
        function fontcolor() { [native code] }
        function fontsize() { [native code] }
        function fixed() { [native code] }
        function includes() { [native code] }
        function indexOf() { [native code] }
        function italics() { [native code] }
        function lastIndexOf() { [native code] }
        function link() { [native code] }
        function localeCompare() { [native code] }
        function match() { [native code] }
        function matchAll() { [native code] }
        function normalize() { [native code] }
        function padEnd() { [native code] }
        function padStart() { [native code] }
        function repeat() { [native code] }
        function replace() { [native code] }
        function search() { [native code] }
        function slice() { [native code] }
        function small() { [native code] }
        function split() { [native code] }
        function strike() { [native code] }
        function sub() { [native code] }
        function substr() { [native code] }
        function substring() { [native code] }
        function sup() { [native code] }
        function startsWith() { [native code] }
        function toString() { [native code] }
        function toLocaleLowerCase() { [native code] }
        function toLocaleUpperCase() { [native code] }
        function toLowerCase() { [native code] }
        function toUpperCase() { [native code] }
        function valueOf() { [native code] }
        function trim() { [native code] }
          trim.prototype: {constructor: ƒ trim()}
        function at() { [native code] }
          at.prototype: {constructor: ƒ at()}
        function trimStart() { [native code] }
          trimStart.prototype: {constructor: ƒ trimStart()}
        function trimEnd() { [native code] }
          trimEnd.prototype: {constructor: ƒ trimEnd()}
    Number: function Number() { [native code] }（共16个）
      function isFinite() { [native code] }
      function isInteger() { [native code] }
      function isNaN() { [native code] }
      function isSafeInteger() { [native code] }
      function parseFloat() { [native code] }
        parseFloat.prototype: {constructor: ƒ parseFloat()}
      function parseInt() { [native code] }
        parseInt.prototype: {constructor: ƒ parseInt()}
      Number.prototype: Number
        function toExponential() { [native code] }
        function toFixed() { [native code] }
        function toPrecision() { [native code] }
        function toString() { [native code] }
        function valueOf() { [native code] }
        function toLocaleString() { [native code] }
    Symbol: function Symbol() { [native code] }（共11个）
      "asyncIterator"
      "hasInstance"
      "isConcatSpreadable"
      "iterator"
      "match"
      "matchAll"
      "replace"
      "search"
      "species"
      "split"
      "toPrimitive"
      "toStringTag"
      "unscopables"
      "observable"
      function for() { [native code] }
      function keyFor() { [native code] }
      function useSetter() { [native code] }
        useSetter.prototype: {constructor: ƒ useSetter()}
      function useSimple() { [native code] }
        useSimple.prototype: {constructor: ƒ useSimple()}
      Symbol.prototype: Symbol
        function toString() { [native code] }
        function valueOf() { [native code] }
        function get description() { [native code] }
    Object: function Object() { [native code] }（共35个）
      function assign() { [native code] }
      function getOwnPropertyDescriptor() { [native code] }
      function getOwnPropertyDescriptors() { [native code] }
      function getOwnPropertyNames() { [native code] }
      function getOwnPropertySymbols() { [native code] }
      function is() { [native code] }
      function preventExtensions() { [native code] }
      function seal() { [native code] }
      function create() { [native code] }
      function defineProperties() { [native code] }
      function defineProperty() { [native code] }
      function freeze() { [native code] }
      function getPrototypeOf() { [native code] }
      function setPrototypeOf() { [native code] }
      function isExtensible() { [native code] }
      function isFrozen() { [native code] }
      function isSealed() { [native code] }
      function keys() { [native code] }
      function entries() { [native code] }
      function fromEntries() { [native code] }
      function values() { [native code] }
      Object.prototype: Object
        function __defineGetter__() { [native code] }
        function __defineSetter__() { [native code] }
        function hasOwnProperty() { [native code] }
        function __lookupGetter__() { [native code] }
        function __lookupSetter__() { [native code] }
        function isPrototypeOf() { [native code] }
        function propertyIsEnumerable() { [native code] }
        function toString() { [native code] }
        function valueOf() { [native code] }
        function get __proto__() { [native code] }
        function set __proto__() { [native code] }
        function toLocaleString() { [native code] }
    Error: function Error() { [native code] }（共6个）
      function captureStackTrace() { [native code] }
      function isError() { [native code] }
        isError.prototype: {constructor: ƒ isError()}
      Error.prototype: Object
        "message"
        function toString() { [native code] }
    EvalError: function EvalError() { [native code] }（共3个）
      EvalError.prototype: Error
        "message"
        function toString() { [native code] }
    RangeError: function RangeError() { [native code] }（共3个）
      RangeError.prototype: Error
        "message"
        function toString() { [native code] }
    ReferenceError: function ReferenceError() { [native code] }（共3个）
      ReferenceError.prototype: Error
        "message"
        function toString() { [native code] }
    SyntaxError: function SyntaxError() { [native code] }（共3个）
      SyntaxError.prototype: Error
        "message"
        function toString() { [native code] }
    TypeError: function TypeError() { [native code] }（共3个）
      TypeError.prototype: Error
        "message"
        function toString() { [native code] }
    URIError: function URIError() { [native code] }（共3个）
      URIError.prototype: Error
        "message"
        function toString() { [native code] }
    ArrayBuffer: function ArrayBuffer() { [native code] }（共7个）
      function isView() { [native code] }
      function(){return e.apply(o,arguments)} //
        function.prototype: {constructor: ƒ useSimple()}
      ArrayBuffer.prototype: ArrayBuffer
        function get byteLength() { [native code] }
        function slice() { [native code] }
    SharedArrayBuffer: function SharedArrayBuffer() { [native code] }（共4个）
      SharedArrayBuffer.prototype: SharedArrayBuffer
        function get byteLength() { [native code] }
        function slice() { [native code] }
    DataView: function DataView() { [native code] }（共25个）
      DataView.prototype: DataView
        function get buffer() { [native code] }
        function get byteLength() { [native code] }
        function get byteOffset() { [native code] }
        function getInt8() { [native code] }
        function setInt8() { [native code] }
        function getUint8() { [native code] }
        function setUint8() { [native code] }
        function getInt16() { [native code] }
        function setInt16() { [native code] }
        function getUint16() { [native code] }
        function setUint16() { [native code] }
        function getInt32() { [native code] }
        function setInt32() { [native code] }
        function getUint32() { [native code] }
        function setUint32() { [native code] }
        function getFloat32() { [native code] }
        function setFloat32() { [native code] }
        function getFloat64() { [native code] }
        function setFloat64() { [native code] }
        function getBigInt64() { [native code] }
        function setBigInt64() { [native code] }
        function getBigUint64() { [native code] }
        function setBigUint64() { [native code] }
    Typed Array
    Float32Array: function Float32Array() { [native code] }（共50个）
    Float64Array: function Float64Array() { [native code] }（共50个）
    Int8Array: function Int8Array() { [native code] }（共50个）
    Int16Array: function Int16Array() { [native code] }（共50个）
    Int32Array: function Int32Array() { [native code] }（共50个）
    Uint8Array: function Uint8Array() { [native code] }（共50个）
    Uint16Array: function Uint16Array() { [native code] }（共50个）
    Uint32Array: function Uint32Array() { [native code] }（共50个）
    Uint8ClampedArray: function Uint8ClampedArray() { [native code] }（共50个）
```

4.四个用于当作命名空间的对象：（共108个）

```js
		Atomics: Atomics（共14个）
      function load() { [native code] }
      function store() { [native code] }
      function add() { [native code] }
      function sub() { [native code] }
      function and() { [native code] }
      function or() { [native code] }
      function xor() { [native code] }
      function exchange() { [native code] }
      function compareExchange() { [native code] }
      function isLockFree() { [native code] }
      function wait() { [native code] }
      function wake() { [native code] }
      function notify() { [native code] }
    JSON: JSON（共3个）
      function parse() { [native code] }
      function stringify() { [native code] }
    Math: Math（共57个）
      function abs() { [native code] }
      function acos() { [native code] }
      function acosh() { [native code] }
      function asin() { [native code] }
      function asinh() { [native code] }
      function atan() { [native code] }
      function atanh() { [native code] }
      function atan2() { [native code] }
      function ceil() { [native code] }
      function cbrt() { [native code] }
      function expm1() { [native code] }
      function clz32() { [native code] }
      function cos() { [native code] }
      function cosh() { [native code] }
      function exp() { [native code] }
      function floor() { [native code] }
      function fround() { [native code] }
      function hypot() { [native code] }
      function imul() { [native code] }
      function log() { [native code] }
      function log1p() { [native code] }
      function log2() { [native code] }
      function log10() { [native code] }
      function max() { [native code] }
      function min() { [native code] }
      function pow() { [native code] }
      function random() { [native code] }
      function round() { [native code] }
      function sign() { [native code] }
      function sin() { [native code] }
      function sqrt() { [native code] }
      function tan() { [native code] }
      function tanh() { [native code] }
      function trunc() { [native code] }
      function sinh() { [native code] }
        sinh.prototype: {constructor: ƒ sinh()}
      function clamp() { [native code] }
        clamp.prototype: {constructor: ƒ clamp()}
      function degrees() { [native code] }
        degrees.prototype: {constructor: ƒ degrees()}
      function fscale() { [native code] }
        fscale.prototype: {constructor: ƒ fscale()}
      function iaddh() { [native code] }
        iaddh.prototype: {constructor: ƒ iaddh()}
      function isubh() { [native code] }
        isubh.prototype: {constructor: ƒ isubh()}
      function imulh() { [native code] }
        imulh.prototype: {constructor: ƒ imulh()}
      function radians() { [native code] }
        radians.prototype: {constructor: ƒ radians()}
      function scale() { [native code] }
        scale.prototype: {constructor: ƒ scale()}
      function umulh() { [native code] }
        umulh.prototype: {constructor: ƒ umulh()}
      function signbit() { [native code] }
        signbit.prototype: {constructor: ƒ signbit()}
    Reflect: Object（共34个）
      function defineProperty() { [native code] }
      function deleteProperty() { [native code] }
      function apply() { [native code] }
      function construct() { [native code] }
      function get() { [native code] }
      function getOwnPropertyDescriptor() { [native code] }
      function getPrototypeOf() { [native code] }
      function has() { [native code] }
      function isExtensible() { [native code] }
      function ownKeys() { [native code] }
      function preventExtensions() { [native code] }
      function set() { [native code] }
      function setPrototypeOf() { [native code] }
      function enumerate() { [native code] }
        enumerate.prototype: {constructor: ƒ enumerate()}
      function defineMetadata() { [native code] }
        defineMetadata.prototype: {constructor: ƒ defineMetadata()}
      function deleteMetadata() { [native code] }
        deleteMetadata.prototype: {constructor: ƒ deleteMetadata()}
      function getMetadata() { [native code] }
        getMetadata.prototype: {constructor: ƒ getMetadata()}
      function getMetadataKeys() { [native code] }
        getMetadataKeys.prototype: {constructor: ƒ getMetadataKeys()}
      function getOwnMetadata() { [native code] }
        getOwnMetadata.prototype: {constructor: ƒ getOwnMetadata()}
      function getOwnMetadataKeys() { [native code] }
        getOwnMetadataKeys.prototype: {constructor: ƒ getOwnMetadataKeys()}
      function hasMetadata() { [native code] }
        hasMetadata.prototype: {constructor: ƒ hasMetadata()}
      function hasOwnMetadata() { [native code] }
        hasOwnMetadata.prototype: {constructor: ƒ hasOwnMetadata()}
      function metadata() { [native code] }
        metadata.prototype: {constructor: ƒ metadata()}
```

##### Javascript 常用 API

数组

push pop shift unshift reverse sort splice forEach some every reduce 会改变原数组

```js
Array: function Array() { [native code] }（共65个）
  function isArray() { [native code] }
  function from() { [native code] }
  function of() { [native code] }
	Array.prototype: Array(0)，是个数组
    function forEach() { [native code] }
    function push() { [native code] }
    function indexOf() { [native code] }
    function map() { [native code] }
    function filter() { [native code] }
    function find() { [native code] }
    function findIndex() { [native code] }
    function splice() { [native code] }
    function slice() { [native code] }
    function join() { [native code] }
    function sort() { [native code] }
    function concat() { [native code] }
    function includes() { [native code] }
    function fill() { [native code] }
    function every() { [native code] }
    function some() { [native code] }
    function reduce() { [native code] }
    function lastIndexOf() { [native code] }
    function pop() { [native code] }
    function shift() { [native code] }
    function unshift() { [native code] }
    function reverse() { [native code] }
    function reduceRight() { [native code] }
    function flat() { [native code] }
    function flatMap() { [native code] } // 相当于先map再flat
    function toString() { [native code] }
```

object

```js
Object: function Object() { [native code] }
	function keys() { [native code] } // 返回一个对象自身可枚举属性组成的数组
	function values() { [native code] } // 返回一个对象自身可枚举属性值组成的数组
  function entries() { [native code] } // 返回一个对象自身可枚举属性的键值对数组，object转数组
	function fromEntries() { [native code] } // 把键值对列表转换为一个对象，数组转object
  function assign() { [native code] } // 将所有可枚举属性的值从一个或多个源对象分配到目标对象。返回目标对象。
	function create() { [native code] } // 创建一个对象，可以设置其__proto__和自身属性。
	function is() { [native code] } // 判断两个值是否为同一个值
	function getOwnPropertyNames() { [native code] } // 返回一个对象的所有自身属性的属性名组成的数组
	function getOwnPropertyDescriptor() { [native code] } // 获取对象上某个自有属性的属性描述符
	function defineProperty() { [native code] } // 在一个对象上定义新的属性或修改现有属性
  Object.prototype:
    function hasOwnProperty() { [native code] } // 判断指定属性是否为该对象自身的属性
    function propertyIsEnumerable() { [native code] } // 判断指定属性是否为该对象可枚举的属性
```

利用 entries 和 fromEntries 来使用数组的 api 操作 object

```js
// 过滤出key的长度为3的的项
const obj = {
  abc: 1,
  def: 2,
  ghijk: 3
}
let res = Object.fromEntries(
  Object.entries(obj).filter(([key, val]) => key.length === 3)
)
console.log(res)
```

字符串 & 正则 & 数字：

```js
String.prototype:
  function charAt() { [native code] } // 根据下标得到对应字符
  function charCodeAt() { [native code] } // 根据下标得到对应字符的编码
  function codePointAt() { [native code] } // 根据下标得到对应字符的编码
  function concat() { [native code] } // 拼接字符串并返回
  function includes() { [native code] } // 判断一个字符串是否包含另外一个字符串
  function indexOf() { [native code] } // 第一次出现的指定值的索引
  function lastIndexOf() { [native code] } // 最后一次出现的指定值的索引
  function match() { [native code] } // 识别出正则匹配到的东西组成一个数组 
  function matchAll() { [native code] }
  function replace() { [native code] }
  function search() { [native code] }
  function slice() { [native code] } // 字符串截取，负数就是从后面数
  function split() { [native code] }
  function substring() { [native code] }
  function toLowerCase() { [native code] }
  function toUpperCase() { [native code] }
  function trim() { [native code] }
  function trimStart() { [native code] }
  function trimEnd() { [native code] }

RegExp.prototype:
  function exec() { [native code] }
  function test() { [native code] }

Number: function Number() { [native code] }
	function isInteger() { [native code] } // 判断给定的参数是否为整数
	Number.prototype:
    function toFixed() { [native code] } // 取小数点后几位，会做四舍五入
    function toString() { [native code] } // 将数字转换成字符串
    function toLocaleString() { [native code] }
```

Set & Map：

Set 和 Map 都是可遍历对象，都可以使用 for of 做遍历。

Map 的 key 可以是任意值，Set 的每个元素可以是任意值。

```js
let set = new Set([1, 2, 3])
let map = new Map([[1, 2], [3, 4], [5, 6]])
```

```js
Set.prototype:
	function add() { [native code] } // 末尾添加元素
  function has() { [native code] } // 是否存在某元素
  function delete() { [native code] } // 删除元素
  function clear() { [native code] } // 删除所有元素
	function get size() { [native code] } // 返回Set对象中元素的个数
	function keys() { [native code] } // 返回所有的keys值组成的SetIterator
	function values() { [native code] } // 返回所有的values值组成的SetIterator
  function entries() { [native code] } // 返回所有[key,vluea]值组成的SetIterator
	function forEach() { [native code] } // 遍历set

WeakSet.prototype:
	function add() { [native code] } // 末尾添加元素
	function has() { [native code] } // 是否存在某元素
  function delete() { [native code] } // 删除元素
  
Map.prototype:
  function get() { [native code] } // 获取元素
  function set() { [native code] } // 设置元素
  function has() { [native code] } // 是否存在某元素
  function delete() { [native code] } // 删除元素
  function clear() { [native code] } // 删除所有元素
	function get size() { [native code] } // 元素数量
  function keys() { [native code] } // 返回所有的keys值组成的MapIterator
  function values() { [native code] } // 返回所有的values值组成的MapIterator
 	function entries() { [native code] } // 返回所有[key,vluea]值组成的MapIterator
  function forEach() { [native code] } // 遍历map
    
WeakMap.prototype:
  function get() { [native code] } // 获取元素
  function set() { [native code] } // 设置元素
  function has() { [native code] } // 是否存在某元素
	function delete() { [native code] } // 删除元素
```

全局函数：

```js
eval
isNaN
parseFloat
parseInt
decodeURI
decodeURIComponent
encodeURI
encodeURIComponent
```

用于当作命名空间的对象：

```js
JSON:
  function parse() { [native code] } // 用来解析JSON字符串
  function stringify() { [native code] } // 将一个JavaScript对象或值转换为JSON字符串
Math:
  function abs() { [native code] }
  function ceil() { [native code] }
  function floor() { [native code] }
  function fround() { [native code] }
  function max() { [native code] }
  function min() { [native code] }
  function pow() { [native code] }
  function random() { [native code] }
  function round() { [native code] }
```

##### es6

getter setter：

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

generator：

generator 函数执行后返回一个对象，这个对象中有一个 next 函数，是用来控制 generator 函数内部代码的执行的。

函数内部可以使用 yield 来暂停函数的执行。

在调用的过程中，通过 next 来恢复程序的执行。

yield：

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

next：

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

return：

退出函数执行，也可以传值，跟 next 一样。

```js
l.return()
```

throw：

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

应用场景：

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

Iterator 自定义遍历器：

es5

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

es6

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

## Javascript API 实现

##### 实现 let

```js
// 1
{
  let a = 1;
  console.log(a); // 1
}
console.log(a);
// 相当于
(function () {
  var a = 1;
  console.log(a); // 1
})();
console.log(a); // a is not defined

// 2
var fns = [];
for (let i = 0; i < 10; i++) {
  fns[i] = function() {
    console.log(i);
  };
}
fns[0](); // 0
// 相当于
var fns = [];
for (var i = 0; i < 10; i++) {
  (function(i) {
    fns[i] = function() {
      console.log(i);
    };
  })(i);
}
fns[0](); // 0
```

##### 实现 const

```js
function _const(key, value) {
  window.key = value;
  Object.defineProperty(window, key, {
    enumerable: false,
    configurable: false,
    writable: false,
    get() {
      return value;
    },
    set(newVal) {
      throw new TypeError('不能重复定义');
    }
  });
}
```

##### 实现数组 push

```js
Array.prototype.push = function(...args) {
  for (let i = 0; i < args.length; i++) {
    this[this.length] = args[i];
  }
  return this.length;
}
```

##### 实现数组 filter

```js
Array.prototype.filter = function(fn) {
  if (typeof fn !== 'function') throw TypeError('参数必须是一个函数');
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i)) res.push(this[i]); 
  }
  return res;
}
```

##### 实现数组 map

```js
Array.prototype.map = function(fn) {
  if (typeof fn !== 'function') throw TypeError('参数必须是一个函数');
  const res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(fn(this[i], i));
  }
  return res;
}
```

##### 实现数组 flat

```js
// 1 reduce + 递归
function flat(arr, depth = 1) {
  if(!Array.isArray(arr) || depth <= 0) return arr;
  return arr.reduce((acc, cur) => {
    return Array.isArray(cur) ？ acc.concat(flat(cur, depth - 1)) : acc.concat(cur);
  }, []);
}
// 2 迭代
function flat(arr) {
  const res = [];
  const arrs = [...arr];
  while(arrs.length) {
    const tmp = arrs.shift();
    Array.isArray(tmp) ? arrs.unshift(...tmp) : res.push(tmp);
  }
  return res;
}
// 3 递归
function flat(arr, depth = 1) {
  if(!Array.isArray(arr) || depth <= 0) return arr;
  const res = [];
  arr.forEach(item => {
    Array.isArray(item) ? res.push(...flat(item, depth - 1)) : res.push(item);
  })
  return res;
}
```

##### 实现字符串 trim

```js
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, '');
}
```

##### 实现字符串 repeat

```js
// 1
String.prototype.repeat = function(n) {
	return (new Array(n + 1)).join(this);
}
// 2 递归
String.prototype.repeat = function(n) {
  return n > 0 ? this.repeat(n - 1) + this : '';
}
```

##### 实现 Object.create

```js
Object.create = function(obj) {
  function F() {};
  F.prototype = obj;
  return new F();
}
```

##### 实现 Object.is

```js
Object.is = function (x, y) {
  // 全等情况下，只有 +0 -0 返回 false
  if (x === y) {
    // 1/+0 === Infinity 1/-0 === -Infinity
    return x !== 0 || 1 / x === 1 / y;
  }
	// 不全等情况下，只有 NaN NaN 返回 true
  return x !== x && y !== y;
};
```

##### 实现 Object.assign

```js
Object.assign = function(target, ...sources) {
    if (target == null) throw new TypeError('Cannot convert undefined or null to object');
  	const res = Object(target);
    sources.forEach(source => {
      for (let key in source) {
        if (source.hasOwnProperty(key)) res[key] = source[key];
      }
    });
    return res;
}
```

##### 实现 instanceof

```js
function Instanceof(left, right) {
  while (true) {
    if (left == null) return false;
    if (left.__proto__ === right.prototype) return true;
    left = left.__proto__;
  }
}
```

##### 实现 JSON.parse

```js
// 1 eval
JSON.parse = function(jsonStr) {
  return eval(`(${jsonStr})`);
}
// 2 new Function()
JSON.parse = function(jsonStr) {
	return (new Function(`return ${jsonStr}`))();
}
```

##### 实现 new

```js
function New(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const res = fn.call(obj, ...args);
  if (res && (typeof res === 'object' || typeof res === 'function')) return res;
  return obj;
}
```

##### 实现 call apply bind

call

```js
Function.prototype.call = function (obj, ...args) {
  obj = obj == null ? window : Object(obj);
  obj.fn = this;
  const res = obj.fn(...args);
  delete obj.fn;
  return res;
}
```

apply   

```js
Function.prototype.apply = function (obj, args) {
  obj = obj == null ? window : Object(obj);
  obj.fn = this;
  const res = args ? obj.fn(...args) : obj.fn();
  delete obj.fn;
  return res;
}
```

bind

```js
Function.prototype.bind = function(obj, ...args) {
  obj = obj == null ? window : Object(obj);
  const fn  = this;
  const bound = function(...innerArgs) {
    if (this instanceof bound) {
      return new fn(...args, ...innerArgs);
    } else {
      // return fn.call(obj, ...args, ...innerArgs);
      obj.fn = fn;
      const res = obj.fn(...args, ...innerArgs);
      delete obj.fn;
      return res;
    }
  }
  return bound;
}
```

##### 实现 Promise

```js
class Promise {
  constructor(fn) {
    this.status = 'pending';
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    // 更改成功后的状态
    const resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.onFulfilledCallbacks.forEach(fn => fn(value));
      }
    }
    // 更改失败后的状态
    const reject = err => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.onRejectedCallbacks.forEach(fn => fn(err));
      }
    }
    try {
      fn(resolve, reject)
    } catch(err) {
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err};
    // 为了链式调用，这里直接返回一个 Promise
    return new Promise((resolve, reject) => {
      const fulfilledMicrotask = value =>  {
        queueMicrotask(() => {
          try {
            const res = onFulfilled(value);
            res instanceof Promise ? res.then(resolve, reject) : resolve(res);
          } catch(err) {
            reject(err);
          } 
        })  
      }
      const rejectedMicrotask = value => { 
        queueMicrotask(() => {
          try {
            const res = onRejected(value);
            res instanceof Promise ? res.then(resolve, reject) : reject(res);
          } catch(err) {
            reject(err);
          } 
        }) 
      }
      this.onFulfilledCallbacks.push(fulfilledMicrotask);
      this.onRejectedCallbacks.push(rejectedMicrotask);
    });
  }
  static resolve(value) {
    if (value instanceof Promise) {
      return value;
    }
    return new Promise(resolve =>  {
      resolve(value);
    });
  }
  static reject(err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
}
```

##### 实现 Promise.all

```js
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    const result = [];
  	let count = 0;
    if (promises.length === 0) {
      resolve(result);
    } else {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(res => {
          result[i] = res;
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        }, err => {
          reject(err);
        });
      }
    }
  });
}
```

##### 实现 Promise.race

```js
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    }
  });
}
```

##### 实现 Promise.prototype.finally

```js
Promise.prototype.finally = function(cb) {
  return this.then(res => {
    return Promise.resolve(cb()).then(() => res);
  }, err => {
    return Promise.resolve(cb()).then(() => { throw err });
  });
}
```

##### 实现取消 promise

```js
class CancellationError extends Error {
    constructor(message = 'Promise canceled') {
        super(message);
        this.name = 'CancellationError';
    }
}

class CancellationController {
    constructor() {
        this.isCancelled = false;
    }

    cancel() {
        this.isCancelled = true;
    }
}

function createCancelablePromise(executor) {
    const cancellationController = new CancellationController();

    const promise = new Promise((resolve, reject) => {
        if (cancellationController.isCancelled) {
            reject(new CancellationError());
            return;
        }

        executor(
            value => {
                if (cancellationController.isCancelled) {
                    reject(new CancellationError());
                } else {
                    resolve(value);
                }
            },
            reason => {
                if (cancellationController.isCancelled) {
                    reject(new CancellationError());
                } else {
                    reject(reason);
                }
            }
        );
    });

    promise.cancel = () => {
        cancellationController.cancel();
    };

    return promise;
}

// Usage example:
const cancelablePromise = createCancelablePromise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise resolved');
    }, 1000);
});

cancelablePromise.then(
    value => console.log('Resolved:', value),
    reason => {
        if (reason instanceof CancellationError) {
            console.log('Promise canceled');
        } else {
            console.error('Rejected:', reason);
        }
    }
);

// Cancel the promise after 500ms
setTimeout(() => {
    cancelablePromise.cancel();
}, 500);
```

## Javascript 手写题

##### 数组去重

```js
// 1.传统方式，遍历元素挨个比较，去重
function uniqueArr(arr) {
  const res = [];
  const map = new Map();
  for (let item of arr) {
  	if (!map.has(item)) {
			res.push(item);
      map.set(item, 1);
    }
  }
  return res;
}
// 2.使用Set（无序，不能重复）
function uniqueArr(arr) {
  return [...new Set(arr)];
}
```

##### 浅拷贝

```js
// Object.assign
let a = {a: 1, b: 2};
let b = Object.assign({}, a);
// ...
let a = {a: 1, b: 2};
let b = {...a};
// slice
let a = [1, {a: 1}];
let b = a.slice();
// concat
let a = [1, {a: 1}];
let b = [].concat(a);
```

##### 深拷贝

```js
// 1 
// 1.如果obj里面存在时间对象,JSON.parse(JSON.stringify(obj))之后，时间对象变成了字符串。
// 2.如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象。
// 3.如果obj里有函数，undefined，则序列化的结果会把函数，undefined丢失。
// 4.如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null。
// 5.JSON.stringify()只能序列化对象的可枚举的自有属性。如果obj中的对象是有构造函数生成的，则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的构造函数constructor，即无法继续使用构造函数原型上的属性。
// 6.如果对象中存在循环引用的情况也无法正确实现深拷贝。
const o = JSON.parse(JSON.stringify(obj));

// 2
function isObject(val) {
  return typeof val === "object" && val !== null;
}
function deepClone(obj, hash = new WeakMap()) {
  if (!isObject(obj)) return obj;
  if (hash.has(obj)) return hash.get(obj);
  const res = Array.isArray(obj) ? [] : {};
  hash.set(obj, res);
  // Reflect.ownKeys(obj)=Object.getOwnPropertyNames(obj)+Object.getOwnPropertySymbols(obj)
  [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj),
  ].forEach(key => {
    res[key] = deepClone(obj[key], hash);
  });
  return res;
}
```

##### 节流

节流是频繁操作的时候保持一个频率触发。比如拖拽一个元素时，要随时拿到这个元素被拖拽的位置。

```js
// 定时器版
function throttle(fn, delay = 100) {
  let flag = true;
  return function(...args) {
		if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.call(this, ...args);
      flag = true;
    }, delay);
  }
}
// 时间戳版
function throttle(fn, delay = 100) {
  let prev = 0;
  return function(...args) {
    const now = Date.now();
    if (now - prev > delay) {
      fn.call(this, ...args);
      prev = now;
    }
  }
}
// 使用
div.addEventListener('drag', throttle(function(e) {
  console.log(e.offsetX, e.offsetY);
}, 300));
```

##### 防抖

防抖是频繁操作的最后时刻触发。比如输入停止后一段时间没有再输入才会请求接口。

```js
// 定时器版
function debounce (fn, delay = 100) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, ...args);
      timer = null;
    }, delay)
  }
}
// 使用
input.addEventListener('keyup', debounce(function() {
  console.log(input.value);
}, 300));
```

##### 发布订阅

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(name, handler){
    this.events[name] = this.events[name] || [];
    this.events[name].push(handler);
  }
  emit(name, ...args) {
    if (!this.events[name]) throw new Error('该事件未注册');
    this.events[name].forEach(fn => fn.call(this, ...args));
  }
  off(name, handler) {
    if (!this.events[name]) throw new Error('该事件未注册');
    if (!handler) {
			delete this.events[name];
    } else {
      this.events[name] = this.events[name].filter(fn => fn !== handler);
    }
  }
  once(name, handler) {
    funlction fn(...args) {
      handler.call(this, ...args);
      this.off(name, fn);
    }
    this.on(name, fn);
  }
}
```

##### sleep 函数

```js
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
// 使用
sleep(1000).then(()=>{
  console.log(1);
})
async function output() {
  let out = await sleep(1000);
  console.log(1);
}
output();
```

##### 通用事件封装

```js
function bindEvent (elem, type, selector, fn) {
  if (fn == null) {
    fn = selector;
    selector = null;
  }
  elem.addEventListener(type, event => {
    const target = event.target;
    if (selector) {
      // 代理绑定
      if (selector.contains(target)) {
        fn.call(target, event);
      }
    } else {
      // 普通绑定
      fn.call(target, event);
    }
  })
}
```

##### ajax 封装

```js
function axios (url, method, postData) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(xhr.responseText));
        }
      }
    }
    method === 'GET' ? xhr.send() : xhr.send(JSON.stringify(postData));
  });
}
```

##### setTimeout 实现 setInterval

```js
function setInterval(fn, time) {
	function interval() {
    fn();
    setTimeout(interval, time);
  }
  return setTimeout(interval, time);
}
```

##### setInterval 实现 setTimeout

```js
const setTimeout = (fn, time) => {
  const timer = setInterval(() => {
    fn();
    clearInterval(timer);
  }, time);
  return timer;
}
```

##### Jsonp 封装

```js
// 发送请求
function createScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.type = "text/javascript";
  document.body.appendChild(script);
}
createScript("http://xxx.xxx.com/xxx.js?callback=handleResponse");
// 接收数据
function handleResponse(res) {
  console.log(res);
}
// 接口返回一个携带数据的函数调用的js
handleResponse({a: 1, b: 2});
```

##### 解析 URL Params

```js
// 1.传统方式，查找location.search
function query(name) {
  const search = location.search.substring(1);
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const res = search.match(reg);
  return res ? res[2] : null;
}
// 2.新api，URLSearchParams
function query(name) {
  const p = new URLSearchParams(location.search);
  return p.get(name);
}
```

##### 对象扁平化

```js
function isObject(val) {
  return typeof val === "object" && val !== null;
}
function flatten(obj) {
  if (!isObject(obj)) return obj;
  const res = {};
  function dfs(cur, prefix) {
    if (isObject(cur)) {
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`);
        });
      } else {
        for (let key in cur) {
          dfs(cur[key], `${prefix}${prefix ? "." : ""}${key}`);
        }
      }
    } else {
      res[prefix] = cur;
    }
  };
  dfs(obj, '');
  return res;
}
// 测试
const obj = {
  a: {
    b: 1,
    c: 2,
    d: {e: 5}
  },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
};
flatten(obj);
```

##### 函数柯里化

柯里化（currying）是把接受多个参数的函数变换成接受一个参数的函数，并且返回接受剩余参数且返回结果的新函数的技术。

柯里化后的函数接收参数的数量与原函数的形参数量相等时，执行原函数；当接收的参数数量小于原函数形参数量时，返回一个用于接收剩余参数的函数。

```js
// 1 只能传被柯里化函数形参的个数，多少都不行
function currying(fn, ...args) {
    const length = fn.length;
    return function(...newArgs) {
        const allArgs = [...args, ...newArgs];
        if (allArgs.length < length) {
            return currying.call(this, fn, ...allArgs);
        } else {
            return fn.apply(this, allArgs);
        }
    }
}
const add = (a, b, c) => a + b + c;
const addCurrying = currying(add);
console.log(addCurrying(1)(2)(3));
console.log(addCurrying(1,2)(3));
console.log(addCurrying(1)(2,3));
console.log(addCurrying(1,2,3));

// 2 参数长度不固定，最后需要手动调用一次
function currying(fn, ...args) {
    let allArgs = [...args];
    return function temp(...newArgs) {
        if (newArgs.length) {
            allArgs = [...allArgs, ...newArgs];
            return temp;
        } else {
            const res = fn.apply(this, allArgs);
            allArgs = [...args];
            return res;
        }
    }
}
const add = (...args) => args.reduce((a, b) => a + b);
const addCurrying = currying(add);
console.log(addCurrying(1)(2)(3)(4,5)());
console.log(addCurrying(1)(2)(3,4,5)());
console.log(addCurrying(1)(2,3,4,5)());
```

柯里化用途

1. **部分应用（Partial Application）：** 柯里化允许你固定一部分参数并生成一个新的函数。这样，你可以在后续的调用中只提供剩余的参数，实现部分应用，使得函数的调用更灵活。

   ```js
   // 不使用柯里化
   function add(x, y, z) {
     return x + y + z;
   }
   
   const result = add(1, 2, 3);
   
   // 使用柯里化
   function curryAdd(x) {
     return function(y) {
       return function(z) {
         return x + y + z;
       };
     };
   }
   
   const curriedAdd = curryAdd(1)(2);
   const result = curriedAdd(3);
   ```

2. **参数复用：** 柯里化可以使得参数复用更容易。通过提供一部分固定的参数，你可以创建一个新的函数，然后多次调用这个函数并传入不同的剩余参数。

   ```js
   // 参数复用
   const greet = curryConcatenate('Hello, ');
   const greetWorld = greet('world');
   const greetUser = greet('user');
   
   console.log(greetWorld('!'));  // 输出 "Hello, world!"
   console.log(greetUser('!'));   // 输出 "Hello, user!"
   ```

3. **延迟执行：** 柯里化可以用于延迟函数的执行。通过逐步传递参数，你可以等到所有参数都准备好之后再执行函数。

   ```js
   // 延迟执行
   const delayedAdd = curryAdd(1)(2);
   // 在后续的代码中...
   const result = delayedAdd(3);
   ```

4. **函数组合：** 柯里化可以用于实现函数组合。你可以将多个柯里化的函数组合在一起，形成一个新的函数管道。

   ```js
   // 函数组合
   const compose = (f, g) => x => f(g(x));
   const toUpperCase = str => str.toUpperCase();
   const exclaim = str => `${str}!`;
   
   const shout = compose(exclaim, toUpperCase);
   const result = shout('hello');  // 输出 "HELLO!"
   ```

总体而言，柯里化是一种强大的技术，可以帮助提高代码的可维护性和可读性，使得函数更加灵活和复用

```js
// 1 校验规则
// 原函数
function checkByRegExp(regExp, string) {
    return regExp.test(string);  
}
// 普通使用
checkByRegExp(/^1\d{10}$/, '18642838455'); // 校验电话号码
checkByRegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, 'test@163.com'); // 校验邮箱
// 柯里化后使用
let check = currying(checkByRegExp);
let checkCellPhone = check(/^1\d{10}$/);
let checkEmail = check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);
checkCellPhone('18642838455'); // 校验电话号码
checkCellPhone('13109840560'); // 校验电话号码
checkCellPhone('13204061212'); // 校验电话号码
checkEmail('test@163.com'); // 校验邮箱
checkEmail('test@qq.com'); // 校验邮箱
checkEmail('test@gmail.com'); // 校验邮箱
// 2 提取对象数组的某一属性
const list = [
    {name:'lucy'},
    {name:'jack'}
];
// 普通使用
const names = list.map(item => item.name);
// 柯里化使用
const prop = currying((key, obj) => obj[key]);
const names = list.map(prop('name'));
```

##### compose

compose是一个用于函数组合的高阶函数。它接受多个函数作为参数，返回一个新的函数，这个新函数按照参数的顺序将输入传递给每个函数，并返回最终的结果。

`compose` 函数的作用在于将多个函数组合成一个新的函数，这个新函数按照给定的顺序依次执行传入的函数，形成一个函数管道。其主要用途包括：

1. **函数组合：** `compose` 可以将多个函数组合在一起，形成一个更加复杂和强大的函数。这样的组合可以帮助提高代码的可读性，将复杂的逻辑分解为简单的函数单元。
2. **代码可读性：** 使用 `compose` 可以更清晰地表达函数的执行顺序。通过从右到左的阅读顺序，你可以直观地理解函数的作用。
3. **提高函数复用性：** 通过将一些通用的操作封装成单一的函数，可以更容易地在不同的上下文中复用这些操作。这样的函数可以在不同的组合中使用，而不需要修改原始函数。
4. **函数式编程：** `compose` 是函数式编程中的一个重要概念。函数式编程鼓励将问题分解为小的、可组合的函数，`compose` 正是用于组合这些小函数的工具之一。

```js
function compose(...fns) {
    if (!fns.length) return v => v;
    if (fns.length === 1) return fns[0];
    return fns.reduce((pre, cur) => (...args) => pre(cur(...args)));
}
function compose(...fns) {
    if (!fns.length) return v => v;
    if (fns.length === 1) return fns[0];
    return fns.reduce((pre, cur) => {
        return (...args) => {
            return pre(cur(...args));
        }
    });
}
// 使用
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4); // a = (...args) => fn1(fn2(fn3(fn4(...args))))
console.log(a(1)); // 1+4+3+2+1=11
```



##### LazyMan

```js
class LazyManClass {
  constructor(name) {
    this.tasks = [];
    const task = () => {
      console.log(`Hi! This is ${name}`);
      this.next();
    };
    this.tasks.push(task);
    setTimeout(() => {
      // 所有任务添加完之后开始初始化执行任务队列的任务。
      this.next();
    }, 0);
  }
  next() {
    // 取第一个任务执行
    const task = this.tasks.shift();
    task && task();
  }
  sleep(time) {
    this.sleepWrapper(time, false);
    return this;
  }
  sleepFirst(time) {
    this.sleepWrapper(time, true);
    return this;
  }
  sleepWrapper(time, isFirst) {
    const task = () => {
      setTimeout(() => {
        console.log(`等待${time}秒`);
        this.next();
      }, time * 1000);
    };
    if (isFirst) {
      this.tasks.unshift(task);
    } else {
      this.tasks.push(task);
    }
  }
  eat(name) {
    const task = () => {
      console.log(`eat ${name}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }
}
function LazyMan(name) {
  return new LazyManClass(name);
}
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');
```

##### 对象反扁平化

```js
function unflatten(data) {
  if (!isObject(data) || Array.isArray(data)) return data;
  const regex = /\.?([^.\[\]]+)|\[(\d+)\]/g;
  const resultholder = {};
  for (let p in data) {
    let cur = resultholder;
    let prop = "";
    let m;
    while(m = regex.exec(p)) {
      cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
      prop = m[2] || m[1];
    }
    cur[prop] = data[p];
  }
  return resultholder[""] || resultholder;
}
```

##### 循环打印红黄绿

红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次。如何让3个灯不断交替重复亮灯？

```js
function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}
// callback
const task = (timer, light, callback) => {
    setTimeout(() => {
        if (light === 'red') {
            red()
        }
        else if (light === 'green') {
            green()
        }
        else if (light === 'yellow') {
            yellow()
        }
        callback()
    }, timer)
}
const step = () => {
    task(3000, 'red', () => {
        task(2000, 'green', () => {
            task(1000, 'yellow', step)
        })
    })
}
step()

// promise
const task = (timer, light) => 
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (light === 'red') {
                red()
            }
            else if (light === 'green') {
                green()
            }
            else if (light === 'yellow') {
                yellow()
            }
            resolve()
        }, timer)
    })
const step = () => {
    task(3000, 'red')
        .then(() => task(2000, 'green'))
        .then(() => task(2100, 'yellow'))
        .then(step)
}
step()

// async/await
const taskRunner =  async () => {
    await task(3000, 'red')
    await task(2000, 'green')
    await task(2100, 'yellow')
    taskRunner()
}
taskRunner()
```

##### 每隔一秒打印 1,2,3,4

```js
// 使用闭包实现
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })(i);
}
// 使用 let 块级作用域
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}
```

##### 分片思想解决大数据量渲染问题

```js
let ul = document.getElementById("container");
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total / once;
//每条记录的索引
let index = 0;
//循环加载数据
function loop(curTotal, curIndex) {
  if (curTotal <= 0) {
    return false;
  }
  //每页多少条
  let pageCount = Math.min(curTotal, once);
  window.requestAnimationFrame(function () {
    for (let i = 0; i < pageCount; i++) {
      let li = document.createElement("li");
      li.innerText = curIndex + i + " : " + ~~(Math.random() * total);
      ul.appendChild(li);
    }
    loop(curTotal - pageCount, curIndex + pageCount);
  });
}
loop(total, index);
```

##### 将虚拟 Dom 转化为真实 Dom

```js
{
  tag: 'DIV',
  attrs:{
  id:'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
}
// 把上诉虚拟Dom转化成下方真实Dom
<div id="app">
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>

// 真正的渲染函数
function _render(vnode) {
  // 如果是数字类型转化为字符串
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  // 字符串类型直接就是文本节点
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    // 遍历属性
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  // 子数组进行递归操作
  vnode.children.forEach((child) => dom.appendChild(_render(child)));
  return dom;
}
```

##### DOM2JSON

```js
<div>
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>

把上诉dom结构转成下面的JSON格式

{
  tag: 'DIV',
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
}

function dom2Json(domtree) {
  let obj = {};
  obj.name = domtree.tagName;
  obj.children = [];
  domtree.childNodes.forEach((child) => obj.children.push(dom2Json(child)));
  return obj;
}
```

##### 程序把 entry 转换成如下对象

```js
var entry = {
a: {
b: {
  c: {
    dd: 'abcdd'
  }
},
d: {
  xx: 'adxx'
},
e: 'ae'
}
}

// 要求转换成如下对象
var output = {
'a.b.c.dd': 'abcdd',
'a.d.xx': 'adxx',
'a.e': 'ae'
}

```

##### 把 entry 转换成如下对象

```js
var entry = {
'a.b.c.dd': 'abcdd',
'a.d.xx': 'adxx',
'a.e': 'ae'
}

// 要求转换成如下对象
var output = {
a: {
b: {
  c: {
    dd: 'abcdd'
  }
},
d: {
  xx: 'adxx'
},
e: 'ae'
}
}

```

##### 列表转成树形结构

```js
[
    {
        id: 1,
        text: '节点1',
        parentId: 0 //这里用0表示为顶级节点
    },
    {
        id: 2,
        text: '节点1_1',
        parentId: 1 //通过这个字段来确定子父级
    }
    ...
]

转成
[
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id:2,
                text: '节点1_1',
                parentId:1
            }
        ]
    }
]
// 1
function listToTree(data) {
  let temp = {};
  let treeData = [];
  for (let i = 0; i < data.length; i++) {
    temp[data[i].id] = data[i];
  }
  for (let i in temp) {
    if (+temp[i].parentId != 0) {
      if (!temp[temp[i].parentId].children) {
        temp[temp[i].parentId].children = [];
      }
      temp[temp[i].parentId].children.push(temp[i]);
    } else {
      treeData.push(temp[i]);
    }
  }
  return treeData;
}

// 2
function convert(list) {
	const res = []
	const map = list.reduce((res, v) => (res[v.id] = v, res), {})
	for (const item of list) {
		if (item.parentId === 0) {
			res.push(item)
			continue
		}
		if (item.parentId in map) {
			const parent = map[item.parentId]
			parent.children = parent.children || []
			parent.children.push(item)
		}
	}
	return res
}
// 3
const convert = list => {
  let map = new Map();
  let result = []
  list.forEach(el => {
    map.set(el.id, el);
  });
  list.forEach(el => {
		let parent = map.get(el.parentId);
		if (!parent) {
			// parentId === 0
			el.children = []
			return 
		}
    if (parent.hasOwnProperty('children')) {
      parent.children.push(el);
    } else {
      parent['children'] = [];
      parent.children.push(el);
    }
	});
	for (let i = 0; i < list.length; i++) {
		const el = list[i];
		if (el.parentId === 0) {
			result.push(el)
		}
	}
	return result
};
let list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];
convert(list)

```

##### 树形结构转成列表

```js
[
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id:2,
                text: '节点1_1',
                parentId:1
            }
        ]
    }
]
转成
[
    {
        id: 1,
        text: '节点1',
        parentId: 0 //这里用0表示为顶级节点
    },
    {
        id: 2,
        text: '节点1_1',
        parentId: 1 //通过这个字段来确定子父级
    }
    ...
]

function treeToList(data) {
  let res = [];
  const dfs = (tree) => {
    tree.forEach((item) => {
      if (item.children) {
        dfs(item.children);
        delete item.children;
      }
      res.push(item);
    });
  };
  dfs(data);
  return res;
}
```

##### jsonToTree

```js
// 方法1
var treeList = [
    {
        title: '系统管理',
        parentName: '',
        parentId: 0,
        id: 1,
    },
    {
        title: '菜单管理',
        parentName: '系统管理',
        parentId: 1,
        id: 11,
    },
    {
        title: '菜单新增',
        parentName: '菜单管理',
        parentId: 11,
        id: 111,
    },
    {
        title: '菜单编辑',
        parentName: '菜单管理',
        parentId: 11,
        id: 112,
    },
    {
        title: '菜单删除',
        parentName: '菜单管理',
        parentId: 11,
        id: 113,
    },
    {
        title: '角色管理',
        parentName: '系统管理',
        parentId: 1,
        id: 22,
    },
    {
        title: '角色新增',
        parentName: '角色管理',
        parentId: 22,
        id: 221,
    },
    {
        title: '角色编辑',
        parentName: '角色管理',
        parentId: 22,
        id: 222,
    },
    {
        title: '角色删除',
        parentName: '角色管理',
        parentId: 22,
        id: 223,
    },
    {
        title: '用户管理',
        parentName: '系统管理',
        parentId: 1,
        id: 33,
    },
    {
        title: '用户新增',
        parentName: '用户管理',
        parentId: 33,
        id: 331,
    },
    {
        title: '用户编辑',
        parentName: '用户管理',
        parentId: 33,
        id: 332,
    },
    {
        title: '用户删除',
        parentName: '用户管理',
        parentId: 33,
        id: 333,
    }
]
function jsonToTree(lists, id, parentId) {
    var idList = {},
        treeList = [];
    for (var i = 0, len = lists.length; i < len; i++) {
        //生成一个以id为键的对象
        idList[lists[i][id]] = lists[i]
    }
    for (var j = 0, len1 = lists.length; j < len1; j++) {
        var aVal = lists[j];
        var aValParent = idList[aVal[parentId]];
        //如果aValParent存在；就说明当前的aVal是aValParent的孩子
        if (aValParent) {
            if ('chindren' in aValParent) {
                aValParent['children'].push(aVal)
            } else {
                aValParent['children'] = [];
                aValParent['children'].push(aVal)
            }
        } else {
            treeList.push(aVal)
        }
    }
    return treeList
}
// 方法2
var data=[
  { id: 40, parentId: 31, note: "的萨达是" }, 
  { id: 20, parentId: 11, note: "的萨达是" },
  { id: 22, parentId: 20, note: "dsadas" },
  { id: 12, parentId: null, note: "dsadasad萨达s" }, 
  { id: 11, parentId: undefined, note: "dqwds" }, 
  { id: 24, parentId: 22, note: "搜索" },
  { id: 34, parentId: 22, note: "搜索" }
]
function fnSetTreeData(data) {
  var data = [...data];
  var tree = data.filter((father) => {
    var branchArr = data.filter((child) => {
      if (father.id == child.parentId) child._hasParent = true;
      return father.id == child.parentId;

      // MARK 为什么这样写就报错 ? 
      // if (father.id == child.parentId) child._hasParent = true;
      // return child._hasParent
    });
    if (branchArr.length > 0) father.children = branchArr;
    return !father._hasParent;
  });
  // MARK 为什么在这里还得加一个过滤
  tree = tree.filter((item) => {
    return !item._hasParent;
  })
  return tree
}
console.log(JSON.stringify(fnSetTreeData(data), null, 2))
// 方法3
var data = [
  { id: 40, parentId: 31, note: "的萨达是" }, 
  { id: 20, parentId: 11, note: "的萨达是" },
  { id: 22, parentId: 20, note: "dsadas" },
  { id: 12, parentId: null, note: "dsadasad萨达s" }, 
  { id: 11, parentId: undefined, note: "dqwds" }, 
  { id: 24, parentId: 22, note: "搜索" },
  { id: 34, parentId: 22, note: "搜索" }
]
function listToTree(data) {
  let arr = JSON.parse(JSON.stringify(data))
  const listChildren = (obj, filter) => {
    [arr, obj.children] = arr.reduce((res, val) => {
      if (filter(val))
        res[1].push(val)
      else
        res[0].push(val)
      return res
    }, [[],[]])
    obj.children.forEach(val => {
      if (arr.length)
      listChildren(val, obj => obj.parentId === val.id)
    })
  }

  const tree = {}
  listChildren(tree, val => arr.findIndex(i => i.id === val.parentId) === -1)
  return tree.children
}
// 方法4
var aaa= [{name:'wwb',id:111},{name:'aaa',id:0,pid:"mei"},{name:'a',id:1,pid:"mei"},{name:'b',id:2,pid:1},{name:'c',id:3,pid:1},{name:'d',id:4,pid:2},{name:'e',id:5,pid:2}];

function test(ary,data){

    var data=data?data:(function(ary){
      var tempAry=[];
      var idList=[];
      ary.forEach(function(item){idList.push(item.id)});
     function deb(id,idList){
         var flag=true;
        for(var ida in idList){
            if(id==idList[ida]){
                flag=false;
            }       
        }
         return flag;
     }

      for(var i=0,len=ary.length;i<len;i++){
        if(ary[i].pid==undefined||(ary[i].pid!=undefined&&deb(ary[i].pid,idList))){
          var obj={name:ary[i].name,id:ary[i].id};
          tempAry.push(obj);
        }
       }
        return tempAry; 
    }(ary));

    var temp=0;
   if(data.constructor==Array){
     for(var i=0,len=data.length;i<len;i++){
        for(var j=0,lenA=ary.length;j<lenA;j++){
           if(ary[j].pid==data[i].id){
           var obj={name:ary[j].name,id:ary[j].id};
           data[i].child=data[i].child||[];
           data[i].child.push(obj);
           temp++;
       }
     }
    }
   }

   if(temp>0){
     if(data.constructor==Array){
      for(var n=0,lenB=data.length;n<lenB;n++){
        data[n].child=test(ary,data[n].child?data[n].child:[]);
        if(data[n].child.length==0){
            delete data[n].child;
        }
          delete data[n].id;
      } 
    }
   }else{
       for(var n=0,lenB=data.length;n<lenB;n++){
          delete data[n].id;
       } 

   }
    return data;

}
var a=test(aaa);
sconsole.log(a)
```

##### 实现模板字符串解析

```js
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}
render(template, data); // 我是姓名，年龄18，性别undefined
```

##### 找出 element 元素的全部 input 元素

```js
function findAllInputElement(element) {
  const rec = function (element, arr) {
    if (element.nodeName.toUpperCase() === "INPUT") {
      arr.push(element)
    }
    let children = element.childNodes
    children.forEach(element => {
      rec(element, arr)
    });
    return arr
  }
  return rec(element, [])
}
```

##### 判读对象是否存在循环引用

```js
const isCycleObject = (obj,parent) => {
    const parentArr = parent || [obj];
    for(let i in obj) {
        if(typeof obj[i] === 'object') {
            let flag = false;
            parentArr.forEach((pObj) => {
                if(pObj === obj[i]){
                    flag = true;
                }
            })
            if(flag) return true;
            flag = isCycleObject(obj[i],[...parentArr,obj[i]]);
            if(flag) return true;
        }
    }
    return false;
}


const a = 1;
const b = {a};
const c = {b};
const o = {d:{a:3},c}
o.c.b.aa = a;

console.log(isCycleObject(o))
```

##### 根据以下要求，写一个数组去重函数

1. 如传入的数组元素为`[123, "meili", "123", "mogu", 123]`，则输出：`[123, "meili", "123", "mogu"]`
2. 如传入的数组元素为`[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]`，则输出：`[123, [1, 2, 3], [1, "2", 3], "meili"]`
3. 如传入的数组元素为`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]`，则输出：`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]`

## 算法

##### 找出字符串中连续出现最多的字符和个数

```js
// 'abcaakjbb' => {'a':2,'b':2}
// 'abbkejsbcccwqaa' => {'c':3}
function maxRepeat(s) {
    const res = {};
    const arr = s.match(/(\w)\1*/g);
    const maxLen = Math.max(...arr.map(s => s.length));
    for (let item of arr) {
        if (item.length === maxLen) {
            res[item[0]] = maxLen;
        }
    }
    return res;
}
```

##### LRU 算法

```js
//  一个Map对象在迭代时会根据对象中元素的插入顺序来进行
// 新添加的元素会被插入到map的末尾，整个栈倒序查看
class LRUCache {
  constructor(capacity) {
    this.secretKey = new Map();
    this.capacity = capacity;
  }
  get(key) {
    if (this.secretKey.has(key)) {
      let tempValue = this.secretKey.get(key);
      this.secretKey.delete(key);
      this.secretKey.set(key, tempValue);
      return tempValue;
    } else return -1;
  }
  put(key, value) {
    // key存在，仅修改值
    if (this.secretKey.has(key)) {
      this.secretKey.delete(key);
      this.secretKey.set(key, value);
    }
    // key不存在，cache未满
    else if (this.secretKey.size < this.capacity) {
      this.secretKey.set(key, value);
    }
    // 添加新key，删除旧key
    else {
      this.secretKey.set(key, value);
      // 删除map的第一个元素，即为最长未使用的
      this.secretKey.delete(this.secretKey.keys().next().value);
    }
  }
}
// let cache = new LRUCache(2);
// cache.put(1, 1);
// cache.put(2, 2);
// console.log("cache.get(1)", cache.get(1))// 返回  1
// cache.put(3, 3);// 该操作会使得密钥 2 作废
// console.log("cache.get(2)", cache.get(2))// 返回 -1 (未找到)
// cache.put(4, 4);// 该操作会使得密钥 1 作废
// console.log("cache.get(1)", cache.get(1))// 返回 -1 (未找到)
// console.log("cache.get(3)", cache.get(3))// 返回  3
// console.log("cache.get(4)", cache.get(4))// 返回  4
```

##### 动态规划求解硬币找零问题

##### 请把俩个数组 [A1, A2, B1, B2, C1, C2, D1, D2] 和 [A, B, C, D]，合并为 [A1, A2, A, B1, B2, B, C1, C2, C, D1, D2, D]

```js
// 1
function concatArr (arr1, arr2) {
   const arr = [...arr1];
  let currIndex = 0;
 for (let i = 0; i < arr2.length; i++) {
    const RE = new RegExp(arr2[i])
    while(currIndex < arr.length) {
      ++currIndex
      if (!RE.test(arr[currIndex])) {
         arr.splice(currIndex, 0, a2[i])
         break;
       }
     }
   }
  return arr
 }
 var a1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 
 var a2 = ['A', 'B', 'C', 'D']
 const arr = concatArr(a1, a2)
 console.log(a1) // ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 
 console.log(a2) // ['A', 'B', 'C', 'D']
 console.log(arr) // ['A1', 'A2', 'A', B1', 'B2', 'B', C1', 'C2', 'C', D1', 'D2', 'D'] 
// 2
const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
const arr2 = ['A', 'B', 'C', 'D']
const ret = []
let tmp = arr2[0]
let j = 0
for (let i=0;i<arr1.length;i++) {
  if (tmp === arr1[i].charAt(0)){
    ret.push(arr1[i])
  }else {
    ret.push(tmp)
    ret.push(arr1[i])
    tmp=arr2[++j]
  }
   if(i===arr1.length-1){
      ret.push(tmp)
    }
}
console.log(ret)
// 3
let a1 =  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
let a2 = ['A', 'B', 'C', 'D'].map((item) => {
  return item + 3
})

let a3 = [...a1, ...a2].sort().map((item) => {
  if(item.includes('3')){
    return item.split('')[0]
  }
  return item
})

// 4
var arr1 = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"]
var arr2 = ["A", "B", "C", "D"]
var arr3 = arr1.concat(arr2);
arr3.sort().sort(function(a,b){
   if (a.charAt(0) == b.charAt(0) && a.length > b.length){
       return -1
   }
	
})
// 5
var arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
var arr2 = ['A', 'B','C', 'D'];

function fn (arr1, arr2) {
let arr3 = [...arr1];
let index = -1;
arr2.forEach((v, i) => {
index = index + 3;
arr3.splice(index, 0, v);
});
return arr3;
}

```

##### 版本号排序算法

```js
// 有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']

arr.sort((a, b) => {
  let i = 0;
  const arr1 = a.split(".");
  const arr2 = b.split(".");

  while (true) {
    const s1 = arr1[i];
    const s2 = arr2[i];
    i++;
    if (s1 === undefined || s2 === undefined) {
      return arr2.length - arr1.length;
    }

    if (s1 === s2) continue;

    return s2 - s1;
  }
});
console.log(arr);
```

##### 计算数组的交集

给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。

##### 随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]

```js
// 生产随机数
var arr = (function(len){
    var a = []
    for(var i = 0; i < len; i++) {
        a.push(Math.floor(Math.random() * 100))
    }
    return a
})(20)

// 排序
arr.sort(function(a, b) {
    return a - b
})
// 去重 (arr 转 set 然后 set 转 arr)
arr = [...(new Set([...arr]))]

var subArr = []

// 用 map 存储
var map = {}
arr.forEach(item => {
    var key = Math.floor(item / 10)
    if(!map[key]) {
        map[key] = []
    }
    map[key].push(item)
})

// map 转 数组
for(var key in map) {
    subArr.push(map[key])
}

console.log(JSON.stringify(subArr))
```

##### 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。

```js
// 1
const find = (S, T) => {
  if (S.length < T.length) return -1
  for (let i = 0; i < S.length; i++) {
    if (S.slice(i, i + T.length) === T) return i
  }
  return -1
}
// 2
const find = (S,T) => S.indexOf(T)
// 3
const find = (S, T) => S.search(T)
// 4
const find = (S, T) => {
  const matched = S.match(T) 
  return matched ? matched.index : -1 
}
```

##### 打印 1-10000之间所有对称数

```js
// 1
[...Array(10000).keys()].filter((x) => { 
  return x.toString().length > 1 && x === Number(x.toString().split('').reverse().join('')) 
})
// 2
var result = [];
for (let i = 1; i <= 10000; i++) {
	let origin = '' + i;
	let reverse = origin.split('').reverse().join('');
	if(origin === reverse) {
		result.push(i);
	}
}
```

##### 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))。

##### 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

##### 输入 `'1, 2, 3, 5, 7, 8, 10'` 输出 `'1~3, 5, 7~8, 10'`

##### 统计 1 ~ n 整数中出现 1 的次数

##### 在一个字符串数组中有红、黄、蓝三种颜色的球，且个数不相等、顺序不一致，请为该数组排序。使得排序后数组中球的顺序为:黄、红、蓝。

例如：红蓝蓝黄红黄蓝红红黄红，排序后为：黄黄黄红红红红红蓝蓝蓝。

##### 1 到 12 月份的销售额存在一个数组里面

```js
const obj = {1:222, 2:123, 5:888};
const result = Array.from({ length: 12 }).map((_, index) => obj[index + 1] || null);
console.log(result)
```

##### 实现千位分隔符

```js
let format = n => {
    let num = n.toString() // 转成字符串
    let decimals = ''
        // 判断是否有小数
    num.indexOf('.') > -1 ? decimals = num.split('.')[1] : decimals
    let len = num.length
    if (len <= 3) {
        return num
    } else {
        let temp = ''
        let remainder = len % 3
        decimals ? temp = '.' + decimals : temp
        if (remainder > 0) { // 不是3的整数倍
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp
        } else { // 是3的整数倍
            return num.slice(0, len).match(/\d{3}/g).join(',') + temp 
        }
    }
}
format(12323.33)  // '12,323.33'

// 无小数版
let format = n => {
    let num = n.toString() 
    let len = num.length
    if (len <= 3) {
        return num
    } else {
        let remainder = len % 3
        if (remainder > 0) { // 不是3的整数倍
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') 
        } else { // 是3的整数倍
            return num.slice(0, len).match(/\d{3}/g).join(',') 
        }
    }
}
format(1232323)  // '1,232,323'
```

##### 大数相加

```js
// 1
function sumBigNumber(a, b) {
  let res = '';
  let temp = 0;
  
  a = a.split('');
  b = b.split('');
  
  while (a.length || b.length || temp) {
    temp += ~~a.pop() + ~~b.pop();
    res = (temp % 10) + res;
    temp  = temp > 9
  }
  return res.replace(/^0+/, '');
}
// 2
let a = "9007199254740991";
let b = "1234567899999999999";

function add(a ,b){
   //...
}

function add(a ,b){
   //取两个数字的最大长度
   let maxLength = Math.max(a.length, b.length);
   //用0去补齐长度
   a = a.padStart(maxLength , 0);//"0009007199254740991"
   b = b.padStart(maxLength , 0);//"1234567899999999999"
   //定义加法过程中需要用到的变量
   let t = 0;
   let f = 0;   //"进位"
   let sum = "";
   for(let i=maxLength-1 ; i>=0 ; i--){
      t = parseInt(a[i]) + parseInt(b[i]) + f;
      f = Math.floor(t/10);
      sum = t%10 + sum;
   }
   if(f!==0){
      sum = '' + f + sum;
   }
   return sum;
}
```

##### 大数相乘

```js
function multiplyBigNum(num1, num2) {
    //判断输入是不是数字
    if (isNaN(num1) || isNaN(num2)) return "";
    num1 = num1 + ""
    num2 = num2 + ""
    let len1 = num1.length,
        len2 = num2.length;
    let pos = [];

    //j放外面，先固定被乘数的一位，分别去乘乘数的每一位，更符合竖式演算法
    for (let j = len2 - 1; j >= 0; j--) {
        for (let i = len1 - 1; i >= 0; i--) {
            //两个个位数相乘，最多产生两位数，index1代表十位，index2代表个位
            let index1 = i + j,
                index2 = i + j + 1;
            //两个个位数乘积加上当前位置个位已累积的数字，会产生进位，比如08 + 7 = 15，产生了进位1
            let mul = num1[i] * num2[j] + (pos[index2] || 0);
            //mul包含新计算的十位，加上原有的十位就是最新的十位
            pos[index1] = Math.floor(mul / 10) + (pos[index1] || 0);
            //mul的个位就是最新的个位
            pos[index2] = mul % 10;
        }
    }

    //去掉前置0
    let result = pos.join("").replace(/^0+/, "");

    return result - 0 || '0';
}
```

##### 手机号中间4位变*

```js
// 1
const tel = 18877776666; 
tel = "" + tel; 
var ary = tel.split(""); 
ary.splice(3,4,"****"); 
var tel1 = ary.join(""); 
console.log(tel1);
// 2
const tel = 18877776666; 
tel = "" + tel; 
var tel1 = tel.substr(0,3) + "****" + tel.substr(7) 
console.log(tel1);
// 3
const tel = 18877776666;  
tel = "" + tel; 
var tel1 =tel.replace(tel.substring(3,7), "****") 
console.log(tel1);
// 4
const tel = 18877776666;  
tel = "" + tel; 
var reg=/(\d{3})\d{4}(\d{4})/; 
var tel1 = tel.replace(reg, "$1****$2") 
console.log(tel1)
```
