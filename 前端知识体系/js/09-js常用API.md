### 常用 API

##### 数组

```js
Array: function Array() { [native code] }（共65个）
  function isArray() { [native code] }
  function from() { [native code] }
  function of() { [native code] } // 创建新数组
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
    function includes() { [native code] } // 判断一个数组是否包含一个指定的值
    function fill() { [native code] } // 用一个固定值填充一个数组
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
    function flatMap() { [native code] }
    function toString() { [native code] }
```

##### object

```js
Object: function Object() { [native code] }
	function keys() { [native code] } // 返回一个对象自身可枚举属性组成的数组
	function values() { [native code] } // 返回一个对象自身可枚举属性值组成的数组
  function entries() { [native code] } // 返回一个对象自身可枚举属性的键值对数组
	function fromEntries() { [native code] } // 把键值对列表转换为一个对象
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

##### 字符串 & 正则 & 数字

```js
String.prototype:
  function charAt() { [native code] } // 根据下标得到对应字符
  function charCodeAt() { [native code] } // 根据下标得到对应字符的编码
  function codePointAt() { [native code] } // 根据下标得到对应字符的编码
  function concat() { [native code] } // 拼接字符串并返回
  function includes() { [native code] } // 判断一个字符串是否包含另外一个字符串
  function indexOf() { [native code] } // 第一次出现的指定值的索引
  function lastIndexOf() { [native code] } // 最后一次出现的指定值的索引
  function match() { [native code] }
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

##### Set & Map

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

##### 全局函数

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

##### 用于当作命名空间的对象

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



### 注意事项

##### toString 和 toLocaleString 的区别

* 当目标是四位以上数字时，会以 ',' 三个做一个分隔

* 当目标是标准时间格式时

  ```js
  var sd = new Date()
  
  console.log(sd) // Wed Feb 15 2017 11:21:31 GMT+0800 (CST)
  console.log(sd.toString()) // "Wed Feb 15 2017 11:21:31 GMT+0800 (CST)"
  console.log(sd.toLocaleString()) // "2017/2/15 上午11:21:31"
  ```

##### sort(sortBy)

用于数组排序。

参数：可选，规定排序顺序，必须是函数。

如果没有使用参数，把数组的元素都转换成字符串（如有必要），按照字符编码的顺序进行排序。

如果想按照其他标准进行排序，需要提供比较函数，该函数接收要比较的两个值 a 和 b，返回一个用于说明这两个值的相对顺序的数字：

* a 小于 b，返回负数，升序
* a 大于 b，返回正数，升序
* a 小于 b，返回正数，降序
* a 大于 b，返回负数，降序
* a 等于 b，返回 0

```js
// 对象型数组，按某个对象的key做升降序排列
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
      if (order === 'ascending') {
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

##### 会改变原数组的方法

```js
push, pop, shift, unshift, reverse, sort, splice
```

