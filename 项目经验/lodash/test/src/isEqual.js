const { isArrayLike } = require("lodash")

function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

function isEqual(obj1, obj2) {
  // 有一个不是对象
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2
  }
  // 是同一个对象
  if (obj1 === obj2) {
    return ture
  }
  // 是不同的对象
  // 1.比较key的数量是否相等
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if (obj1Keys.length !== obj2Keys) {
    return false
  }
  // 2.以obj1为基准，和obj2依次递归比较它们的key/value
  for (let key in obj1) {
    const res = isEqual(obj1[key], obj2[key])
    if (!res) {
      return false
    }
  }
  // 全相等
  return true
}


const toString = Object.prototype.toString
const getTag = function(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  } 
  return toString.call(value)
}

console.log(isArrayLike([]))

function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

function isEqual2(val1, val2) {
  // 有一个不是对象，就进行值比较
  if (!isObject(val1) || !isObject(val2)) {
    return val1 === val2
  }
  // 是同一个对象
  if (val1 === val2) {
    return turn
  }
  // 不同的两个对象
  // 1.key的数量不一样
  const val1Keys = Object.keys(val1)
  const val2Keys = Object.keys(val2)
  if (val1Keys.length !== val2Keys.length) {
    return false
  }
  // 2.key的数量一样，挨个比较key/value具体值
  for (let key in val1) {
    const res = isEqual2(val1[key], val2[key])
    if (!res) {
      return false
    }
  }
  // 全相等
  return true
}




















