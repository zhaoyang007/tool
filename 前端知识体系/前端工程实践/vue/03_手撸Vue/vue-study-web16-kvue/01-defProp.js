// 响应式

// 数组响应式
// 1.替换数组原型中那7个方法
const orginalProto = Array.prototype
// 备份，修改备份
const arrayProto = Object.create(orginalProto);
['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'].forEach(method => {
  arrayProto[method] = function() {
    // 原始操作
    orginalProto[method].apply(this, arguments)
    // 覆盖操作：通知更新，结合dep发送notify
    console.log('数组执行' + method + '操作')
  }
})

// 对象响应式
function defineReactive(obj, key, val) {
  // defineReactive里其实做了一个闭包，因为在内部保留了一个内部作用域的一个变量val，并且通过get方法暴露在了当前作用域之外了。
  // 外面可以访问到这个内部作用域的变量了。它实际上是不会释放的。这样我可以保存当前的状态，set中对局部的变量val在做赋值，看起来
  // 好像毫无意义，但由于这个闭包的存在，当外面引用了这个obj的值的时候，这个局部的val是不会释放的，所以是可以保存住多个key的多
  // 个val这些状态。所以这个函数将来它只要执行多次，我们就会有多个val在内存中去保存，这是它的内部细节。

  // 递归：函数内部需要再次调用该函数本身，在调用函数本身的前面需要有跳出这个互相调用的条件判断（通常是return函数本身），以避免死循环。
  // 递归，将所有的obj的数据，不管是多少层级，都做响应化的处理
  observe(val)

  // 对传入obj进行访问拦截
  Object.defineProperty(obj, key, {
    // get, set就是我们手动的去处理数据的读和写，就可以做数据的拦截了。
    get() {
      console.log('get ' + key);
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        // set会拦截到数据的更新，所以将来在这里做界面的更新逻辑
        console.log('set ' + key + ':' + newVal);
        // 如果传入的newVal依然是obj，需要做响应化处理
        observe(newVal)
        val = newVal
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    // 希望传入的是obj
    return
  }

  // 判断传入的obj类型
  if (Array.isArray(obj)) {
    // 覆盖原型，替换7个变更操作
    obj.__proto__ = arrayProto
    // 对数组内部元素执行响应化
    // const keys = Object.keys(obj)
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i])
    }
  } else {
    Object.keys(obj).forEach(key => {
      // 对obj的每一个属性key执行一下defineReactive。这样就把所有的obj里所有的属性都给它定义响应式了。
      defineReactive(obj, key, obj[key])
    })
  }
}

function set(obj,key,val) {
  defineReactive(obj,key,val)
}


// defineReactive(obj, 'foo', 'foo')
// obj.foo
// obj.foo = 'fooooooooooooooooo'

const obj = { foo: 'foo', bar: 'bar', baz: { a: 1 }, arr: [1,2,3] }

// 遍历做响应化处理
observe(obj)

obj.foo
obj.foo = 'fooooooooooooooo'
obj.bar
obj.bar = 'barrrrrrrrrrrrrr'

// obj.baz.a = 10 // no ok
obj.baz = {a:100}
obj.baz.a = 100000

// 之前这个属性不在这个对象里，它就不是响应式的属性，就需要手动的set一下
// obj.dong = 'dong'
set(obj, 'dong', 'dong')
obj.dong

// delete问题

// Object.defineProperty()对数组无效
// 分析：改变数组方法只有7个
// 解决方案：替换数组实例的原型方法，让他们在修改数组同时还可以通知更新
obj.arr.push(4)


