#### es6 中是怎么声明一个类的

定义类

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

#### 类的属性

es5 中属性的读写，就是 this.属性，你想拦截，只读，属性的保护，有条件的读和写都做不到。es6 通过 getter 和 setter 的方式能让你在读写属性上面有更大的操作权。

* 保存一个私有属性 private
* 让属性是只读的

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

age 只是让你这个实例能访问一个数值的入口，在里面你可以返回任何值。在 set 和 get 函数体里面可以做你任何想做的逻辑。但是这个返回值跟你这个出入口的名字不要一样，set age 里面的赋值就不能是 age 本身。

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

可以把 setter 作为一个拦截，你想给这个 age 做赋值的时候，它会拦截你，然后做一些逻辑返回你想返回的值。这样就能够实现私有属性的保护。age 是暴露给这个实例对象操作的出入口，但真实存储这个变量不是 age，age 只是给读取这个属性的人看的。这就是 set 和 get 的价值所在。
