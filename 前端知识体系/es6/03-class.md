##### es6 中的类

```js
class Animal {
  // 构造函数
  constructor (type) { 
    this.type = type
  }
  // 公用方法，挂载在原型上的方法
  eat () { 

  }
  // 定义类的静态方法
  static walk () {

  }
}

// 继承
class Dog extends Animal {
  constructor (type) {
    // super调用必须放到构造函数第一行，这个super就是父类的构造函数
    super(type)
  }
}
```

##### getter setter

getter 是所访问的属性的真正的返回。

setter 在属性赋值的时候会拦截到，然后做一些你想做的逻辑。通常是做一些判断来控制 getter 中真正返回的那个值。

```js
class Animal {
  constructor (type) { 
    this.type = type
  }
  get age () {
    return 4
  }
  set age (val) {
    this.realAge = val // 这里不能再给age赋值了，不然就变成死循环了
  }
}
let dog = new Animal()

console.log(dog.age) // 4
dog.age = 5
console.log(dog.age) // 4
console.log(dog.realAge) // 5
```

```js
let _age = 4
class Animal {
  constructor (type) { 
    this.type = type
  }
  get age () {
    return _age
  }
  set age (val) {
    if (val > 4 && val < 7) {
      _age = val
    }
  }
}
let dog = new Animal('dog')
console.log(doa.age)
dog.age = 5
console.log(dog.age)
```
