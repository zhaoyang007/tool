### JavaScript 中的对象分类
  * 宿主对象（host Objects）：由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。
  * 内置对象（Built-in Objects）：由 JavaScript 语言提供的对象。
    * 固有对象（Intrinsic Objects ）：由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。
    * 原生对象（Native Objects）：可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象。
    * 普通对象（Ordinary Objects）：由{}语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承。

### 宿主对象
在浏览器环境中，我们都知道全局对象是 window，window 上又有很多属性，如 document。

实际上，这个全局对象 window 上的属性，一部分来自 JavaScript 语言，一部分来自浏览器环境。

JavaScript 标准中规定了全局对象属性，W3C 的各种标准中规定了 Window 对象的其它属性。

宿主对象也分为固有的和用户可创建的两种，比如 document.createElement 就可以创建一些 DOM 对象。

宿主也会提供一些构造器，比如我们可以使用 new Image 来创建 img 元素，这些我们会在浏览器的 API 部分详细讲解。

### 内置对象·固有对象
固有对象是由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。

固有对象在任何 JavaScript 代码执行前就已经被创建出来了，它们通常扮演者类似基础库的角色。我们前面提到的“类”其实就
  是固有对象的一种。

ECMA 标准为我们提供了一份固有对象表，里面含有 150+ 个固有对象。你可以通过这个链接查看。

### 内置对象·原生对象
我们把 JavaScript 中，能够通过语言本身的构造器创建的对象称作原生对象。在 JavaScript 标准中，提供了 30 多个构造器。

通过这些构造器，我们可以用 new 运算创建新的对象，所以我们把这些对象称作原生对象。

几乎所有这些构造器的能力都是无法用纯 JavaScript 代码实现的，它们也无法用 class/extend 语法来继承。

### 获取全部 JavaScript 固有对象
我们从 JavaScript 标准中可以找到全部的 JavaScript 对象定义。JavaScript 语言规定了全局对象的属性。

三个值：

  ```
  Infinity、NaN、undefined。
  ```

九个函数：

  ```
  eval
  isFinite
  isNaN
  parseFloat
  parseInt
  decodeURI
  decodeURIComponent
  encodeURI
  encodeURIComponent
  ```

一些构造器：

  ```
  Array、Date、RegExp、Promise、Proxy、Map、WeakMap、Set、WeakSet、Function、Boolean、String、Number、
  Symbol、Object、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError、
  ArrayBuffer、SharedArrayBuffer、DataView、Typed Array、Float32Array、Float64Array、Int8Array、
  Int16Array、Int32Array、UInt8Array、UInt16Array、UInt32Array、UInt8ClampedArray。
  ```

四个用于当作命名空间的对象：

  ```
  Atomics
  JSON
  Math
  Reflect
  ```

我们使用广度优先搜索，查找这些对象所有的属性和 Getter/Setter，就可以获得 JavaScript 中所有的固有对象。

在浏览器中计算出来 JavaScript 有多少固有对象。

  ```
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
