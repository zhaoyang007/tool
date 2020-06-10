### es6关于object的更新

#### 属性简写

#### 函数的简写

#### object key 值是变量的时候

es5只能这样写，没别的方式

```js
obj[z] = 5
```

es6 增加了一个语法让这个写法变得更加的简洁，这个 z 的地方可以写任何的变量或者是表达式

```js
let obj = {
  [z]: 5,
  [y + z]: 6
}
```

#### object 中的异步函数

在 es5 中是不允许在 object 对象中增加异步函数的。

在es6中是允许的，如果你想把object中的函数变成异步的话，前面加一个星号，这样表明了这个方法是异步的。

```js
let obj = {
  * hello () {}
}
```

上面这个简写的形式是跟这样声明的函数是一摸一样的。

```
function * hello () {}
```

这个是 generator 函数，执行这个异步函数之后，它并不是像我们常规函数那样去执行函数体了，它是先返回一个对象就叫genetator 对象，它返回之后要一步一步的操作才能执行函数体里面的内容。

### es6 中给大家设置了新的数据结构来存储数据

之前你要存储数据，你更多的是用数组或 object，现在你可以多了两个选择 Set 和 Map。

#### Set

Set 存储的成员不允许是重复的，如果你存入了重复的数据，它会帮你自动过滤掉。

##### 这样你就实例化了一个Set对象，但是没有初始化任何数据

```js
let s = new Set()
```

##### 初始化数据，Set所接受的参数是一个可遍历的对象，而不是只有数组

```js
let s = new Set([1, 2, 3, 4])
```

##### 对于数据的操作来说，无非就是写，读，找，删，改五个操作。

##### 往 Set 里面存数据

```js
s.add('hello')
s.add('hello').add('goodbye') // 也可以及联操作
```

##### 删除数据

```js
s.delete('hello') // 删除指定数据
s.clear() // 全部清空
```

##### 查找数据，判断有没有这个数据

```js
s.has('hello')
```

##### set已经存入数据的长度

```js
s.size
```

##### 拿到所有的 key 集合，value 集合，全部集合

它们都是返回的我们刚才所存储的这个值本身，是SetIterator，这个是遍历器。

我们推测一下 Set 这种数据结构本质上它还是一个 object 对象，object 对象就是 key, value 的形式，在目前来看，keys 返回的是 {'hello', 'goodbye'}，values 也返回的是这个，不难推测它还是 object 本质，也是 key, value 的形式存在。

```js
s.keys()    // SetIterator {'hello', 'goodbye'}
s.values()  // SetIterator {'hello', 'goodbye'}
s.entries() // SetIterator {'hello' => 'hello', 'goodbye' => 'goodbye'}
```

##### 遍历

所有 iterator 都可以用 for of 做，set 的实例对象返回的都是 iterator 对象

```js
s.forEach(item => {
  console.log(item)
})

for (let item of s) {
  console.log(item)
}
```

##### 改

Set对象并没有提供让你直接编辑数据的方法。如果你想改的话要先删再添加。

#### Map

Map 是用来实现类似于字典的数据结构。也就是 key, value 的形式，字典的 key, value 和 object 的 key, value 有什么区别呢。Map 这个数据结构里面，key 可以是任意值，Set 是每个元素可以是任意值。

传入的这个参数跟 set 一样是一个可遍历的对象，不同的是这个可遍历对象的每一项必须是 [1, 2]，前面是 key，后面是value。

```js
let map = new Map([[1, 2]])
console.log(map) // Map(1) {1 => 2}
```

##### 添加数据

set 意味着可以添加可以修改，add 只能是添加

```js
let map = new Map() // Map(0) {}
map.set(1, 2) // Map(1) {1 => 2}
```

##### 删除数据

```js
map.delete(1) // 删除的是key
map.clear() // 全部清除
```

##### 统计map数据条数

```js
map.size
```

##### 查找，判断有没有

```js
map.has(1)
```

##### 取值

```js
map.get(1)
```

##### 拿到所有的 key 集合，value 集合，全部集合

Set 的时候这三个拿到的是 SetIterator，在这里是 MapIterator，不管是 SetIterator 还是 MapIterator，它都是 Iterator，它都是可遍历对象，既然是可遍历对象，它就可以用 forEach，就可以用 for of。

```js
map.keys()    // MapIterator {1, 3}
map.values()  // MapIterator {3, 4}
map.entries() // MapIterator {1 => 3, 3 => 4}
```

##### 遍历

用 for of 遍历map的时候一定要写 key, value 用 [] 包起来。

```js
map.forEach((value, key) => {
  console.log(value, key)
})

for (let [key, value] of map) {
  console.log(key, value)
}
```

#### 注意

##### map键的类型可以是任意的。

```js
let o = function () {
  console.log('o')
}
map.set(o, 4)
```

object 里面没有拿 function 做 key 的。map是可以的，比如说我现在有一个函数它做了很多的功能，然后你想给这个函数标记一些数据，那么你就可以用 map 去存储这个数据了，这样的话就可以使这个函数跟这个数据做做一次关联，比如说 o 下面我可以挂载一些数据。

##### 键的顺序

遍历出的顺序是跟你初始化或者说你在添加 key 的时候顺序来决定的。

##### 性能

在关于 object 的操作和 map 的操作，map 的性能稍微会有一些优势，既然 es6 中新增了 map 这种字典型的数据结构，推荐大家以后别再用 object 去存储数据，而是要使用字典类型的这种数据结构 map，希望大家可以学会用新的数据结构去解决你的数据问题。比如说 set，比如说 map，而不是说上来就直接用数组或者 object，你的选择项要大了很多，你要发挥这些新的数据结构带来的这种特性。

### 关于对象的复制

#### es5

把一个对象挨个遍历一下，再赋值给另一个对象，就实现了对象的拷贝。

#### es6

```js
Object.assign(target, source)
```

assign 实现的是浅拷贝，浅拷贝是说对于不是引用类型的值，它给你做数据的替换，对于引用类型的值，它不再遍历，只是把引用的这个对象的地址给你一下。如果深拷贝要递归用 assign 再处理。