### Proxy 代理的基本语法

代理的核心价值是屏蔽原始信息，保证原始信息的安全。

```js
let o = {
  name: 'xiaoming',
  price: 190
}
let d = new Proxy(o, {})
```

* 第一个参数：你要代理谁。

* 第二个参数：代理之后我能干什么。比如劫持构造函数，劫持你的 get, set。但是经常使用的就是读和取。因为我们在写业务的过程中百分之九十九都是在读写数据，对于其他的操作来说基本用不到。

操作传成 {} 就相当于没操作，没操作就等于是透传，

### Proxy 使用场景

#### 将数据变为只读

利用 proxy，就可以保证 o 不会被修改，因为把 o 保护起来了，不要把 o 暴露出去，暴露的是 d，让用户访问的永远是 d 对象，而不让用户访问到 o。

```js
let o = {
  name: 'xiaoming',
  price: 190
}
let d = new Proxy(o, {
  get (target, key) {
    return target[key]
  },
  set (target, key, value) {
    return false
  }
})
d.price = 300
console.log(d.price, d.name) // 190 'xiaoming'
```

es5

es5 的这种做法是让 o 彻底的锁死了，不能被修改。不光用户不能改，你自己也修改不了了。而对于代理来说就不一样了，它是有处理空间的，在 get, set 函数里是可以进行各种操作的。 从用户的角度看是被锁死的，但中介可以操作。这就是这两者的区别。虽然从结果上看，这两个做法都可以把数据变成只读的，但是这两者的原理完全不一样。代理更好用一些，因为代理拦的是用户，不能拦我们自己。

```js
for (let [key] of Object.entries(o)) {
  Object.defineProperty(o, key, {
    writable: false
  })
}
o.price = 300
console.log(d.price, d.name) // 190 'xiaoming'
```

#### 校验

js 更多的是对用户交互操作做服务的，难免会有一些不合理的数据和操作进来，要保证我们收回来的数据是符合我们规范的，就需要我们做校验。校验是我们 js 操作里面最频繁最常用的一个功能，之前写可能都耦合在业务里面，做校验的事情会非常的困难，耦合性非常高。proxy 会有更加合适优雅的方式去帮你做校验的处理。

```js
let o = {
  name: 'xiaoming',
  price: 190
}
```

用上面的数据做表单的收集，默认就是这个数据。现在我们让用户改，不希望他给我们瞎改这个数据。

需求：

1.我们这个信息里面有效的数据就两项name,price，我不希望给我增加删除数据。不能破坏我的数据结构。

2.你只能修改我的价格，而且这个价格不能超过300，超过300的那也是无效的数据。也就是拦截无效的数据。

有了这两个原则之后，我们就能保证我们这个数据是有效的。

```js
let d = new Proxy(o, {
  get (target, key) {
    return target[key] || ''
  },
  set (target, key, value) {
    if (Reflect.has(target, key)) {
      if (key === 'price') {
        if (value > 300) {
          return false
        } else {
          target[key] = value
        }
      } else {
        target[key] = value
      }
    } else {
      return false
    }
  }
})
```

#### 监控

为了提升用户体验，有时候我们特别想知道哪些用户在干着违规的操作。因为这样的话会帮助我们改善我们的产品，这是提升产品质量非常有效的一个手段，俗称监控。我们希望通过监控发现这样违规的事情并上报到服务端。然后我们在服务端拿到所有的数据，再筛选给到产品，这样的话就能帮我们分析用户使用的情况。

在不符合规则的里面直接写上报的逻辑，但是当你的校验规则有很多个的时候，你把上报的东西再耦合到校验的规则里面，如果有十个一百个这样的校验规则，那你就要写十份一百份的上报的的机制。这显然不合理。还有就是封装一个上报的模块，听上去也可以，但还是耦合了，如果有一天说要把所有的监控都要去掉或者做些修改，你要去模块中把所有的都移除。显然也不合适。

在这里我们提供一个比较好用的方式。在不符合的规则的时候我要做一个错误的触发，因为本身就是违规了，违规的话是不是就要做触发报错啊。报错跟你上报它是两个逻辑，错了就是错了，就算有一天我不想上报，但是我还是要触发错误的，这样就彻底解偶开。

我们触发了这么一个错误告诉它这是一个违规操作，这个代码跟我们上报一点关系没有吧。

```js
// 监听错误
window.addEventListener('error', (e) => {
  console.log(e.message)
  // 上报逻辑
  report('./') // 有一天你想去掉上报逻辑了，注释掉这个代码就行了。我不用在校验规则里找。
}, true) // 最后一个参数设置成true是要捕获，而不是冒泡
// 校验规则
let d = new Proxy(o, {
  get (target, key) {
    return target[key] || ''
  },
  set (target, key, value) {
    if (Reflect.has(target, key)) {
      if (key === 'price') {
        if (value > 300) {
          // 不满足规则错误触发
          throw new TypeError('price exceed 300')
          // return false
        } else {
          target[key] = value
        }
      } else {
        target[key] = value
      }
    } else {
      return false
    }
  }
})
```

#### 给实例生成随机唯一只读的 id



```js
class Component {
  contructor () {
    this.proxy = new Proxy({
      id: Math.random().toString(36).slice(-8)
    })
  }
  get id () {
    return this.proxy.id
  }
}
let com = new Component()
let com2 = new Component()
for (let i = 0; i < 10; i++) {
  console.log(com.id, com2.id)
}
com.id = 'abc'
console.log(com.id, com2.id)
```

### proxy 的撤销

它可以代理，也是可以被撤销的。也就是让代理失效。

可撤销的代理就是读完一次可能就不让你读了，临时代理的场景，如阅后即焚的软件的功能。

```js
let o = {
  name: 'xiaoming',
  price: 190
}
let d = Proxy.revocable(o, {
  get (target, key) {
    if (key === 'price') {
      return target[key] + 20
    } else {
      return target[key]
    }
  }
})
d.proxy就是new Proxy的信息，就是被代理的数据信息
d.revoke() // 撤销代理的操作
```