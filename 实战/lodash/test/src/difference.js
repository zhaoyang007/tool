// import _ from 'lodash'
const _ = require('lodash')

// const objects1 = [{'x': 3, 'y': 4}, {'x': 1, 'y': 2}, {'x': 2, 'y': 1}]
const objects1 = {a: 1, b: 2}
// const objects2 = [{'x': 3, 'y': 4}, {'x': 1, 'y': 3}, {'x': 2, 'y': 1, 'z': 3}]
const objects2 = {a: 1, b: 3}

const res = _.differenceWith(objects2, objects1, _.isEqual)

const res2 = _.difference(objects1, objects2)

const res3 = _.differenceBy([{ 'x': 2 , 'y': 3}, { 'x': 1 , 'y': 4}], [{ 'x': 2 , 'y': 4}], 'y');

console.log('differenceWith: ', res)

// console.log(_.isEqual({a:1, b:2}, {a: 1, b:3}))


const MAX_SAFE_INTEGER = 9007199254740991
function isLength(value) {
  return typeof value === 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}
function isArrayLike(value) {
  return value != null && typeof value !== 'function' && isLength(value.length)
}

const obj = [1]
console.log('isArrayLike: ', isArrayLike(obj), obj.length)

function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value)
}
// isObjectLike
function isObjectLike(value) {
  return typeof value === 'object' && value !== null
}

console.log('isArrayLikeObject: ', isArrayLikeObject([{a: 1}]))



