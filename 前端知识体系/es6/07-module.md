/* todo

​	1. 导出的都是对象吗，导入也都是按对象去接收的吗？

​	2. 2导入3，1导入2，那么1能引用到3中的内容吗，就是说相当于1导入了3吗。

*/

### 模块化（如何把代码进行模块化设计）

在 es6 之前，如果想把 js 分成不同的模块，那一定要借助第三方的框架，比如像 require.js，sea.js。其实这个是很久之前的事情了。到了 es6 之后，已经有了专门的语法来做模块化设计的导入和导出功能。下面我们就通过代码给大家演示一下
es6 是如何把代码进行模块化设计的。

首先，既然是模块化设计，一定会有导入和导出两个功能，对应的至少两个不同的文件，因为有一个文件要做为模块导出，还有另一个文件要做导入。

es6 提供了非常强大的功能来解决模块的导入导出，方便你去做模块化设计，这样，你的代码就有很多是可以提炼出来做为一个公共模块被多个文件去引用，利用 es6 的模块化，就可以轻而易举的做到了。

### 导出模块(导出的文件)，导入模块(导入的文件)

导出变量，函数，类，对象等都可以。导出的关键词叫 export。对于导入来说其实非常的简单，它也有一个关键字叫 import。

#### 导出变量

对于这个模块来说，name='hello' 就理解为是写死的，我可以在任何其他的文件引入这个模块来使用 name 这个变量。

导入时要加一个 {}，它的作用是引用导入的模块里面定义的变量名称，它不是解构赋值的作用。导出的地方叫 name，你这里也要叫 name，from 后面是引用模块的文件名，.js 后缀是可以省略的。

```js
export const name = 'hello'
```

```js
import { name } from './module'
```

#### 导出多个变量

```js
export const name = 'hello'
export let addr = 'Beijing'
```

```js
import { name, addr } form './module'
```

#### 导出数组类型变量

```js
export const name = 'hello'
export let addr = 'Beijing'
export var list = [1, 2, 3]
```

```js
import { name, addr, list } form './module'
```

#### 一起导出多个

这种导出多个的写法并不是导出了一个对象，而就是 es6 模块化导出多个内容的写法。

```js
const name = 'hello'
let addr = 'Beijing'
var list = [1, 2, 3]

export {
	name,
  addr,
  list
}
```

#### 导出默认值，导入的时候不需要用 {} 来引用

我默认导出 name 的这个变量，同时还导出 addr 和 list。

```js
const name = 'hello'
let addr = 'Beijing'
var list = [1, 2, 3]

export default name
export {
	addr,
  list
}
```

```js
import name, { addr, list } form './module'
```

只想导入 name 的时候

```js
import name form './module'
```

#### 使用自己的名字导入

对于默认导出的，导入时可以随意命名，因为每个文件或者说模块可以导出多个内容，但是只能有一个默认导出。

对于普通导出的，导入时都要在 {} 里面。也可以改名字，但是都必须要知道它在导出时的命名。

```js
import name, { addr as addr2, list } form './module'
```

#### 导出函数

在函数的导入导出上跟变量没有太大的区别，只不过在 export 的时候必须显示的声明一下它是函数，这是唯一的区别。

```js
export function say (content) {
  console.log(content)
}
```

```js
import { say } from './module'
```

#### 导出多个函数（跟导出多个变量是一样的）

```js
export function say (content) {
  console.log(content)
}
export function run (content) {
  console.log('i am running')
}
```

```js
import { say, run } from './module'
```

#### 函数默认导出

```js
export default function say (content) {
  console.log(content)
}
export function run () {
  console.log('i am running')
}
```

```js
import say, { run } from './module'
```

#### 导出多个函数

```js
const say = (content) => {
  console.log(content)
}
const run = () => {
  console.log('i am running')
}

export {
	say,
  run
}
```

```js
import { say, run } from './module'
```

#### 导出对象

现在这有一个简单的对象。

```js
{
  code: 0,
  message: 'success'
}
```

如果我想把这个对象往外导出，按照我们之前的做法的话，一定是加一个 export

```js
export {
  code: 0,
  message: 'success'
}
```

但我们导出多个的时候也是像上面这样的方式。

但是你发现这个时候呢已经报错了。为什么呢，想象一下，前面导出多个的时候是用 {} 的形式，如果按现在这样的写法，它无法区分是导出多个，还是你里面就是要导出个对象。还有一种原因是 export 导出必须要有名字。

这时，你说如果用一个 {} 里面再嵌入一个对象怎么样。

```js
export {
  {
    code: 0.
    message: 'success'
  }
}
```

它是不支持的，因为对象一定是 key, value 形式，这样写的话就不是个对象了，从语义上来说，就出了问题。

像这样的 object 对象，它是不允许你这么导入导出的。想导出这个对象，你可以在前面加一个关键字 default。

```js
export default {
  code: 0,
  message: 'success'
}
```

这样 default 它就可以把后面这个对象进行导出了，这时默认导出的 {} 就代表对象了。

如果我们有多个对象，该如何导出呢，换一种思路，就是用变量的形式。

```js
const data = {
  code: 0,
  message: 'success'
}
const des = {
  age: 20,
  addr: 'Beijing'
}

export default {
  data, 
  des
}
```

```js
import obj from './module'
```

因为 obj 是一个对象，我们可以利用 object 对象的解构赋值的方式，来接收我们刚才导出的两个模块。

```js
import { data, des } from './module'
```

这时又报错了，因为解构赋值是用花括号的形式，非默认模块导入也也是用花括号的形式，又冲突了，所以解构赋值在导入默认对象的时候是不能用的，但是你可以先接收下来这个模块，然后在后面做解构赋值的操作。

关于对象的导出要比变量函数的导出要麻烦一点，这里主要是解决歧义的问题。因为导出其他模块也是用到对象 {} 这种形式，如果我们再导出这样一个对象的话，它就歧义，引擎就无法理解你到底是导出一个 object 对象，还是用 object 对象。

#### 导出一个类

```js
class Test {
  constructor () {
    this.id = 2
  }
}  

export {
	Test
}
```

或者直接导出的时候定义

```js
export class Test {
  constructor () {
    this.id = 2
  }
}  
```

```js
import {Test} from './module'
```

#### 导出多个类

```js
class Test {
  constructor () {
    this.id = 2
  }
}  
class Test2 {
  constructor () {
    this.id = 2
  }
} 

export {
	Test,
  Test2
}
```

```js
import { Test, Test2 } from './module'
```

#### 默认导出类

不用再用对象那样再去包了。 

```js
class Test {
  constructor () {
    this.id = 2
  }
}  

export default Test
```

或者直接导出的时候定义类

```js
export default class Test {
  constructor () {
    this.id = 2
  }
}  
```

或者默认导出时不加名字

```js
export default class {
  constructor () {
    this.id = 2
  }
}  
```

```js
import Test from './module'
```

#### 导入所有的导出内容

也就是说把所有导出的模块都放到 Mod 这个对象下面去。如果有默认的导出，那个 default 的值在 Mod.default 里面。

```js
import * as Mod from './module'
```

#### 被导出的模块是能在本模块中引用到的

```js
export function say () {
  console.log('say')
}
export function run () {
  say()
}
```



### 模块化之前的自己的总结

#### es6

关键字：export, export default, import

export 和 export default 的区别：

* export 不限变量数可以导出多个，且导出的东西必须要命名过的，导出变量名字(这个名字为上面定义好的值，函数或对象)时一定要加上 {}，只有在导出时在 export 后面现命名的时候不需要加 {}。

* export 导出的变量想要使用必须使用 {} 来盛放，即 import 时需要知道所加载的变量名或函数名。export default 不需要，只要 import 任意一个名字来接收对象即可。

#### CommonJS

关键字：exports, module.exports, require