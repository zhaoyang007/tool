### ES5 中数组有多少种遍历的方法？

#### 1.for 循环

#### 2.forEach

跟 for 相比，forEach 的写法更加简洁，但是它不支持 break 和 continue，它所遍历的就是从头到尾，每个元
素必须遍历到。

#### 3.every

```js
const arr = [1, 2, 3, 4, 5]
arr.every(function (item) {
  console.log(item) // 1
  // return true
})
```

every 遍历数组，能不能继续向下遍历取决于这个函数体的返回值，默认是 false，也就是默认不要继续往下遍历，如果想改变它的默认行为，就 return true，这样就能遍历所有的元素。这时它和 forEach 的行为很像了，那为什么要新增 every 的 api，因为 forEach 不支持 break 和 continue。但 every 可以，因为 every 能不能向下遍历取决于你这个函数的返回值，这样就受你程序的控制了。every 返回值是布尔值，每次遍历的函数体都返回 true，那么 every 的返回值为 true，否则为 false。

#### forEach 和 every 虽然不能直接写 break 和 continue，但是可以实现一样的效果。

##### 1.forEach

**实现 continue**

可以使用条件判断的方式实现

**实现break**

* try catch throw

  ```js
  let arr = [1, 2, 3, 4, 5]
  try{
    arr.forEach(item => {
      if (item === 3) {
        throw new Error('出错了')
      } else {
        console.log(item)
      }
    })
  } catch(e){
    throw e
  }
  ```

* 空跑循环

  在外层加一个标识。这种会影响性能，因为效果是实现了，但是循环并没有停止，会一直遍历到最后。

  ```js
  let breakFlag = false
  let arr = [1,2,3,4,5]
  arr.forEach(item => {
    if (breakFlag === true) {
      return
    }
    if (item===3) {
      breakFlag = true
      return
    }
    console.log(item)
  })
  ```

##### 2.every

可以使用条件判断的方式实现 continue。使用条件判断的加上 return false 的方式实现 break。

#### 4.for in

for in 是为 object 做遍历来设计的，不是为数组设计的。它确实能遍历数组，但是会有问题。

```js
const arr = [1, 2, 3, 4, 5]
for (let index in arr) {
  console.log(index, arr[index]) // 0 1, 1 2, 2 3, 3 4, 4 5
}
```

之所以 for in 能遍历数组，有两个因素。第一数组也是对象的一种，第二，数组是可遍历的。在 ES6 中，关于一个对象是不是可遍历的，会有另一种定义，一个对象是不是可遍历不是你理解的像数组那样它就是，比如说你觉得对象是可遍历的，数组是可遍历的，除了这两种结构之外，都是不可遍历的。用这个方式去判断一个对象是不是可遍历的，那就大错特错。

数组既然是对象，就能往这个对象上挂一些属性，比如说 arr.a = 8，我们希望这个自定义属性应该不是数组中的一个元素，这个数组的元素依然是12345。实际上 for in 不仅把 12345 遍历出来了，还把 a 和 8 遍历出来了，这个就有点怪异了，数组的索引一般都是数字，不应该是一个字符串。这就是 for in 遍历数组的瑕疵。数组的索引可以是数字，也可以是字符串。for in 遍历出数组的索引 index 是字符串，for 遍历的 index 是数字。

break 和 continue 是遍历的时候非常重要的控制元素，for in 是支持的。



### ES6 中是怎么做遍历的？

#### for of

every forEach for 都是针对数组的遍历。for in 是为 object 设计的遍历。还有很多对象跟数组或 object 不一样，但是还能被遍历。就是 for of。

在 es6 之前，你要认为只有数组和 object 可以遍历，没什么问题，因为大家平时的遍历接触的无非就是 object 和数组。但是 es6 这样了，es6 允许你自定义数据结构，这个数据结构不是数组也不是 object，什么样的数据结构和类型都可以，你可以随意组装一个数据结构，只要按照 es6 规定的标准就可以。把它构造成一个可遍历的，这个可遍历的对象不能用 for forEach every for in 去遍历。要用 for of。for of 也可以遍历数组，只是它的功能比遍历数组更强大而已。



### 数组的转换功能

#### 伪数组

函数的 arguments 和 dom 中的 nodelist 就是伪数组，它和数组非常相似，伪数组具备数组的一些特性，比如长度、都能遍历，但它不能直接调用数组的方法。想使用数组的 api，首先要把它转换成数组。

伪数组具备两个特征：

* 这个对象是按照索引方式存储数据的
* 有一个 length 属性

{0: 'a', 1: 'b', length: 2} 这个对象就叫伪数组。

#### es5中将伪数组转换成数组

```js
[].slice.call(arguments) // 把arguments转换成数组
[].slice.call(document.querySelectorAll('img')) // 把NodeList转换成数组
```

#### es6的做法

##### Array.from 函数签名

Array.from(arrayLike, mapFn, thisArg)

* arrayLike  伪数组
* mapFn  遍历函数，说明 from 还具备 map 也就是遍历的功能
* thisArg  mapFn中的 this 指向

##### Array.from 转换伪数组到数组

```js
let args = Array.from(arguments)
let img = Array.from(document.querySelectorAll('img'))
```

##### 使用 Array.from 初始化一个长度为 5，每项为 1 的数组

es5

这里用forEach不行

```js
let array = Array(5)
for (let i = 0, len = array.length; i < len; i++) {
  array[i] = 1
}
```

es6

```js
let array = Array.from({length: 5}, function () {return 1})
```



### 如何创建一个新数组

#### es5生成新数组

```js
let array = Array(5)
let array = []
```

#### es6生成新数组

##### Arrar.from

##### Array.of

快速的把 n 个元素放到一个数组里面去。

1.es5 使用生成一个新数组，然后往里面 push 的方法。

2.es6

```js
let array = Array.of(1, 2, 3, 4, 5)
```

##### Array.prototype.fill

Array.prototype.fill(value, start, end)

* value 填充的值
* start 填充指定范围的起始位置，默认值是 0
* end 填充指定范围的截止位置，默认值是数组的最后一个元素

生成一个长度为5每一项为1的数组

```js
let array = Array(5).fill(1)
```

也可以用做对已有数组的填充，就是替换数组的某一块区域的值

```js
// 将数组的第三项第四项更换为8
let array = [1, 2, 3, 4, 5]
console.log(array.fill(8, 2, 4)) // [1, 2, 8, 8, 5]
console.log(array) // [1, 2, 8, 8, 5]
```



### 如何查找数组

在遍历的过程中去找都可以，只要是遍历都能找到这个元素

关于查找分几个概念

* 查找的目的是为了验证某个元素在这个数组当中
* 还有个维度是要把满足每个条件的筛出来

#### es5

filter

```js
let array = [1, 2, 3, 4, 5]
let find = array.filter(function (item) {
  return item === 3 // return item === 6
})
console.log(find) // [3]
console.log(find) // []
```

filter 做查找的时候，会返回一个数组，如果找到，返回的这个数组一定是不为空的，你要去判断这个数组的长度来确定元素有没有，这是判断有无。

filter 去查找的时候，它会把所有满足条件的元素都给筛出来。所以查找的两个 filter 都能够达到维度。filter 功能上很全面，缺点是如果数组长度非常大，我就想知道这个数组中有没有这个元素，我不关心它有多少个，出现多少次，我要确保性能，它虽然能实现这个东西，但它不是最高效的。那么在 es6 中新增加了一个方法验证查找的，就是来弥补这个缺陷
的。这个方法叫 find。

#### es6

Array.prototype.find

```js
let array = [1, 2, 3, 4, 5]
let find = array.find(function (item) {
  return item === 2
})
console.log(find) // 2
```

find 不关注返回的所有的值，我找到了 2 我就返回 2 这个数据，没有就返回 undefined，而 find 关注的是满足条件的第一个值，找到了满足你条件的第一个值，就返回，不再往下找了，它关注的是有和没有而不是所有，这是它的优点也是它的缺点。它跟 filter 的返回值完全不一样。filter 关注的是满足条件的所有值。

Array.prototype.findIndex

它跟 find 是一对，原理和特点都是一样的。唯独的区别就是 find 找符合的元素，findIndex 找符合元素的下标。
