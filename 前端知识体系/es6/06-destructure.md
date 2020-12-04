### 解构赋值

如何从一个复杂的数据结构中提取数据。

在 es5 中从复杂的数据结构中去挑数据是需要层层的遍历或者是引用，相当麻烦。

```js
let arr = ['hello', 'world']
let firstName = arr[0]
let surName = arr[1]
console.log(firstName, surName)
```

为什么要用变量来获取这个数据，如果说这个数据频繁使用，每次都是通过索引去取是会消耗性能的。

es6 中所谓的更优雅更便捷的方式就是解构赋值。

```js
let arr = ['hello', 'world']
let [firstName, surName] = arr
console.log(firstName, surName)
```

es5 的时候是通过 let 两次声明变量，而 es6 只用了一个 let。

左面是你变量的集合，右面是你的数据。这样的话就轻松的拿到了数据和变量的对应。相当于是一次集体的赋值。

解构就是说把数据给你拆解开，然后把拆解出的数据赋值给一些变量。这就是解构赋值的意思。越复杂的数据解构就越会体现出解构赋值的优越性。



### Array 的解构赋值

```js
let arr = ['a', 'b', 'c', 'd']
```

#### 如何跳过某个赋值元素

```js
let [firstName, , thirdName] = arr // 取数组的第一三项 
```

#### 凡是可遍历的数据解构都可以使用 Array 形式的解构赋值，比如 set，map，字符串。

数组或字符串如果不用解构赋值，你还可以用索引来取某一位或某一项内容。但如果是 set，我们是怎么获取某一个元素的？是用 get 或者遍历的方式吧，它是不支持索引的。但是利用解构赋值的话，它根本就不用索引的方式，你只要左边写中括号，默认按照索引的位置排序去取就可以了。

```js
let [firstName, , thirdName] = new Set([1, 2, 3, 4])
```

#### 如果左边不新生成变量，而是把它赋值到一个对象属性上面去

解构赋值不仅可以赋简单的变量，还可以赋值对象的属性。

```js
let user = {name: 's', surname: 't'}
// es5
user.name = arr[0]
user.surname = arr[1]
// es6
[user.name, user.surname] = [1, 2]
```

##### 循环

声明临时变量 item 用来保存数据。

这是解构赋值的另一种形式，它在循环体中是这么用的。

```js
// es5
for (let i = 0, item; i < arr.length; i++) {
  item = arr[i]
}
// es6
let user = {}
for (let [k, v] of Object.entries(user)) {
  console.log(k, v)
}
```

#### 结合 rest

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let [firstName, curName, ...last] = arr
console.log(firstName, curName, last)
```

#### 前面讲的都是正常的情况，数据足够多，然后给这个赋值。但赋值的时候你不能保证你的数据一定是有内容的，极端或者异常的情况。

当你的数据量不够的时候，通过解构赋值，这个变量的值就跟我们没赋值一样，就是 undefined，不是说你给它做了解构赋值，这个变量就一定有值，它取决于你的这个数据有没有值，没有的话一律是 undefined。

```js
let arr = [1, 2, 3]
let [firstName, curName, ...last] = arr
console.log(firstName, curName, last) // 1 2 [3]
let arr = [1, 2]
console.log(firstName, curName, last) // 1 2 []
let arr = [1]
console.log(firstName, curName, last) // 1 undefined []
let arr = []
console.log(firstName, curName, last) // undefined undefined []
```

如果数据中没有这个变量对应的值，不想得到 undefined 的话，可以在声明变量的时候给它设置一个默认值。

```js
let arr = []
console.log(firstName = 'hello', curName, last) // hello undefined []
```



### Object 的解构赋值

#### Object 解构赋值基础情况

简写的方式，新声明的变量必须跟对象属性名一样，如果这个变量跟属性不一样，它解构赋值的时候就不知道你这个变量要和哪个属性匹配，取哪个值。

```js
let options = {
  title: 'menu',
  width: 100,
  height: 200
}
let {title, width, height} = options
console.log(title, width, height)
```

如果说你不想让这个变量跟属性名一样，就不能简写了。后面的话必须要有一个变量名称。

```js
let {title: title2, width, height} = options
console.log(title2, width, height)
```

#### 默认值的问题

```js
let {title: title2, width = 130, height} = options
console.log(title2, width, height)  
```

#### 结合 rest

```js
let {title, ...last} = options
console.log(title2, last)  
```

#### 复杂的嵌套的数据结构

解构的过程其实就是按照左边的变量的结构和右边数据的结构要保持一致，然后我们挨个匹配，左边的是变量，右边的是数据项，一一来对应，一一映射。

```js
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ['Cake', 'Donut'],
  extra: true
}
let {size: {width: width2, height}, items: [item1]} = options
console.log(width2, height, item1)  
```

#### 函数参数复杂的时候也可以用解构赋值