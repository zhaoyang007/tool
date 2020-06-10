### es5 中的做法

#### es5 中是怎么声明一个类的

es5 中是用函数来描写类的，对于一个类来说，肯定要有构造函数。构造函数解决的问题，第一个是传参数，第二个是实例化，也就是初始化。

```js
let Animal = function (type) {

}
```

我们要想区分这个动物是什么类别，不能大家都长的一样吧，这个时候要定义一个属性。

```js
let Animal = function (type) {
  this.type = type
}
```

把它们共有的方法写在这个类的原型上去，函数都有一个prototype这个对象，你可以往这个上面去写，也就是类继承的工作原理，它会沿着原型链一直往上找。

```js
Animal.prototype.eat = function () {}
```

那这样一个类的声明基本上就做完了。

### es6中的做法

#### es6 中是怎么声明一个类的

es6已经有了专用的语法。

定义类

```js
class Animal {

}
```

类定义完了，接着还是刚才那两个步骤，构造函数初始化传参，在 es6 中它的构造函数是这样的。构造函数就是为了传参的。

```js
class Animal {
  // 构造函数
  constructor (type) { 
    this.type = type
  }
}
```

公用方法，挂载在原型上的方法

```js
class Animal {
  // 构造函数
  constructor (type) { 
    this.type = type
  }
  // 公用方法，挂载在原型上的方法
  eat () { 

  }
}
```

#### 类的属性

es5 中属性的读写，就是this.属性，你想拦截，只读，属性的保护，有条件的读和写都做不到。es6 通过 getter 和 setter 的方式能让你在读写属性上面有更大的操作权。

* 保存一个私有属性private
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

可以把 setter 作为一个拦截，你想给这个age做赋值的时候，它会拦截你，然后做一些逻辑返回你想返回的值。这样就能够实现私有属性的保护。age 是暴露给这个实例对象操作的出入口，但真实存储这个变量不是 age，age 只是给读取这个属性的人看的。这就是 set 和 get 的价值所在。

#### 操作方法

这个方法指两个概念，一个是对象实例的方法；一个是类的静态方法，静态方法它不属于实例对象的，而是属于这个类的。

##### es5

```js
let Animal = function (type) {
  this.type = type
  this.eat = function () {}
}
Animal.prototype.eat = function () {

}
Animal.walk = function () {}
```

##### es6

```js
class Animal {
  constructor (type) { 
    this.type = type
  }
  eat () { 
    Animal.walk()
  }
  // 定义类的静态方法
  static walk () {

  }
}
```

##### 什么时候用实例对象的方法，什么时候用类的静态方法

如果这个方法依赖于对象的某些属性或者是方法，那就必须定义为类的实例对象方法。如果这个方法里面不会涉及到实例对象的内容，就要用类的静态方法，类的静态方法拿不到当前的实例对象。如果你把这个方法定义为一个静态方法，那这个方法跟这个实例对象都绝缘了。要根据业务场景和代码设计去决定。它们本身之间没有优点和缺点。只是哪个更适合，哪个不适合。

#### 类的继承

面向对象之所以强大，就是因为有继承，什么叫继承呢，就是爹有的东西可以继承给儿子，你爹有的东西，儿子只要继承他爹，那他的所有的财产所有的东西，即使儿子什么都不动，他都有。

父类

```js
let Animal = function (type) {
  this.type = type
}
Animal.prototype.eat = function () {

}
```

##### es5 如何实现继承的

Animal 是父类，Dog 是子类，Dog 类要继承 Animal 类，你要做的第一件事情就是在 Dog 的构造函数中要执行 Animal 的构造函数。

```js
let Dog = function () {
  Animal.call(this, 'dog')
}
```

并且把实例对象的指针指向当前的 Dog 类。

```js
Dog.prototype = Animal.prototype
```

##### es6 如何实现继承的

子类不声明构造函数，此时es6给你写了一个默认的constructor

```js
class Dog extends Animal {
        
}
```

子类声明构造函数

```js
class Dog extends Animal {
  constructor (type) {
    // super调用必须放到构造函数第一行，这个super就是父类的构造函数
    super(type)
  }
}
```

#### class 和普通构造函数有何区别

```js
class Animal {
	// ...
}
const a = new Animal()
typeof Animal // 'function'
console.log(Animal === Animal.prototype.constructor) // true
console.log(a.__proto__ === Animal.prototype) // true
```

根据上面这三个判断，可以证明 class 就是构造函数方式的语法糖。