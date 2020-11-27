##### _.difference

比较两个数组的每个值，返回在第一个数组中不同值组成的新数组。

```js
const res = _.difference([3, 2, 1], [4, 2])
console.log(res) // [3, 1]
```

```js
const res = _difference([{'x': 1, 'y': 1}, {'x': 2, 'y': 2}], [{'x': 1, 'y': 1}, {'x': 3, 'y': 2}])
console.log(res) // [{'x': 1, 'y': 1}, {'x': 2, 'y': 2}]
```

##### _.differenceBy

对数组的每一项作处理后，在进行比较

```js
const res1 = _.differenceBy([{ 'x': 2 , 'y': 3}, { 'x': 1 , 'y': 4}], [{ 'x': 2 , 'y': 4}], 'x');
const res2 = _.differenceBy([{ 'x': 2 , 'y': 3}, { 'x': 1 , 'y': 4}], [{ 'x': 2 , 'y': 4}], 'y');
console.log(res1) // [{ 'x': 1 , 'y': 4}]
console.log(res2) // [{ 'x': 2 , 'y': 3}]
```

```js
const res = _.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
console.log(res) // [3.1, 1.3]
```

##### _.differenceWith

比较两个对象型数组每个对象元素的具体 key/value 是否相等，返回一个在第一个数组中他们不同的的元素组成的新数组。

使用：

```js
const objects1 = [{'x': 1, 'y': 1}, {'x': 2, 'y': 2}, {'x': 3, 'y': 3}]
const objects2 = [{'x': 1, 'y': 1}, {'x': 3, 'y': 2}, {'x': 3, 'y': 4}]

const res = _.differenceWith(objects2, objects1, _.isEqual)

console.log(res) // [{'x': 3, 'y': 4}]
```

源码：

```js
function differenceWith(array, ...values) {
  // 取出comparator
  let comparator = last(values)
  // 如果comparator是类数组，说明没传，将它至undefined
  if (isArrayLikeObject(comparator)) {
    comparator = undefined
  }
  // 参数一传入的是数组或类数组进行数组的比较，否则返回[]
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
    : []
}
```



##### _.isEqual

比较两个值是否相等，如果是对象类型，比较对象的 key/value 是否相等。

```js
var object = { 'a': 1 }
var other = { 'a': 1 }
 
_.isEqual(object, other) // true
 
object === other // false
```

代码实现：

```js
// 判断是否是对象或数组
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

function isEqual(obj1,obj2) {
  // 两个数据有任何一个不是对象或数组
  if (!isObject(obj1) || !isObject(obj2)) {
    // 值类型(注意：参与equal的一般不会是函数)
    return obj1 === obj2
  }
  // 如果传的两个参数都是同一个对象或数组
  if (obj1 === obj2) {
    return true
  }

  // 两个都是对象或数组，而且不相等
  // 1.先比较obj1和obj2的key的个数，是否一样
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }

  // 如果key的个数相等,就是第二步
  // 2.以obj1为基准，和obj2依次递归比较
  for (let key in obj1) {
    // 比较当前key的value  --- 递归
    const res = isEqual(obj1[key], obj2[key])
    if (!res) {
      return false
    }
  }

  // 3.全相等
  return true
}

const arr1 = [1, 2, 3]
const arr2 = [1, 2, 3, 4]
console.log(isEqual(arr1,arr2))  // false

const obj1  = {a:100,b:{x:10,y:20}}
const obj2  = {a:100,b:{x:10,y:20}}
console.log(isEqual(obj1,obj2)) // false
```



##### 基础通用

```js
// isArrayLikeObject
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value)
}
// isObjectLike 是否是非空对象类型数据
function isObjectLike(value) {
  return typeof value === 'object' && value !== null
}
// isArrayLike 是否是集合或者数组
function isArrayLike(value) {
  return value != null && typeof value !== 'function' && isLength(value.length)
}
// isLength
const MAX_SAFE_INTEGER = 9007199254740991
function isLength(value) {
  return typeof value === 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}
```















