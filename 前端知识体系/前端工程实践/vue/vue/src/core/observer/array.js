/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

//zy 获取数组原型
const arrayProto = Array.prototype
//zy 备份
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
//zy 覆盖7个方法
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    //zy 执行数组方法原定的任务
    const result = original.apply(this, args)
    //zy 通知
    const ob = this.__ob__
    //zy 如果操作是插入操作，还需要额外的响应化处理
    //zy 因为push,unshift,splice这三个方法有新成员加进来了，新加入进来的元素需要做响应化的处理。
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    //zy 把对象上附加的ob上面的dep拿出来，去通知那些watcher去执行更新
    ob.dep.notify()
    return result
  })
})
