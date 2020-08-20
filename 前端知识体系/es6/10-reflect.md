### es6 新增的知识点，反射的意思。

java 的反射机制是在编译阶段不知道是哪个类被加载，java 是以类为单元的，而是在运行的时候才加载、执行。

### 反射机制的意义

在你静态扫描的时候，你不知道是哪个方法在用 apply，因为你直接是用的 Reflect，这个 apply 没有绑定到某个方法上。当你真正执行 apply 的时候，这个方法是做为一个参数传进来的，才去调 Reflect 这个方法，在静态扫描的时候 Math.floor 这个方法是并没有被执行的。

```js
Math.floor.apply(null, [1.72])
Reflect.apply(Math.floor, null, [1.72])
```



### 反射机制的用途

因为 apply 前面必须要指定方法，而用反射的话我直接调用 apply，然后根据这个条件再来选择执行 apply 的时候去调用哪个方法。

```js
// es5
let price = 91.5
if (price > 100) {
  price = Math.floor.apply(null, [price])
} else {
  price = Math.ceil.apply(null, [price])
}
// es6
let price = 91.5
Reflect.apply(price > 100 ? Math.floor : Math.ceil, null, [price])
```



### Reflect.construct

有的时候会根据不同的场景来实例化不同的子类。之前的做法是用 if else 去 new 不同的类。现在我们可以用更加简洁的方式，也就是反射的方式去实现类的实例。

用反射一定要在反射上找到这个 api，它是用来实例化类的。

通过这种方式，我就可以轻松的实现调用不同的类去动态的实例化一个对象，而不是通过 new 的方式去做。

```js
// es5
let d = new Date()
// es6
Reflect.construct(Date, []) // 这里的这个空数组的参数必须传
```

通过apply和construct这两个方法，你要明白，什么是反射机制，什么样的场景下用反射机制比直接用更加的简单更加的动态化。



### Reflect.defineProperty

跟 Object.defineProperty 是一摸一样的。只不过把原来 Object 下的很多方法都迁移到 Reflect。按照 w3c 的规范，是说所有之前作为一个具备反射机制的一些功能性的函数都会放到 Reflect 上面去。

区别：返回值不同。

### Reflect.get

get就是用来读数据。

帮我们提供了一种读取数据的操作的方式。

```js
const obj = {x: 1, y: 2}
obj.x
Reflect.get(obj, 'x')
```

### Reflect.set

写数据

```js
Reflect.set(obj, 'x', 4)
```

### 获取object对象下面的属性的具体的描述符

属性描述符就是值是什么，是不是只读的，可不可以枚举，可不可以配置等等。

```js
Object.getOwnPropertyDescriptor(obj, 'x')
Reflect.getOwnPropertyDescriptor(obj, 'x')
```

### 某个对象的原型对象是什么

有的时候当你调用别人的类的实例的时候，你不知道它的原型对象是什么。你可以用这个方法，快速打印出它的原型
对象上到底部署了哪些方法，你就可以一眼看出来了。

```js
let d = new Date()
Reflect.getPrototypeOf(d)
```

### 给一个实例对象修改它的原型对象，那这样的话就能修改它的原型链了。

```js
const arr = [1, 2, 3]
console.log(Reflect.getPrototypeOf(arr))
Reflect.setPrototypeOf(arr, String.prototype)
```

### 判断一个对象上面有没有一个属性

```js
// 以前通过 obj.x 是不是undefined来验证有没有
let obj = {x: 1, y: 2}
Reflect.has(obj, 'x') // 更优雅的方式，Object下没有这个方法
```

### 判断一个对象是不是可扩展的

这个方法也可以用作判断一个对象是不是冻结过，是不是处于不可扩展状态。

```js
let obj = {x: 1, y: 2}
Object.freeze(obj) // 冻结一个对象
obj.z = 3 // 冻结后就不可扩展了
Reflect.isExtensible(obj) // false
```

### 判断某个对象下面的自有属性

大家可以看出来，现在 obj 自身的属性只有 x 和 y，如果你去遍历的话，你发现它的属性不只是 x 和 y，但有的时候我们需要判断这个对象自身的属性。因为有的时候这个对象它是有原型链的，原型对象的东西也算它属性的一部分，有时我只想知道你自身的属性，而不是原型对象的属性。对象中非原型上的属性都包括。

```js
Reflect.ownKeys(obj)
Reflect.ownKeys([1, 2]) // ['0', '1', 'length']
// Symbol: es6中新增加的数据类型，不是很常用
// ownKeys和Symbol也有关系，ownKeys对Symbol也是有处理的。
```

### 禁止对象扩展

它起到跟 freeze 相同的作用，禁止对象扩展

```js
let obj = {x: 1, y: 2}
Reflect.preventExtensions(obj)  
Reflect.isExtensible(obj) // false
```