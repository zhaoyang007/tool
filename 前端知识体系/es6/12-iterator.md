### Iterator

自定义数据结构的遍历问题，包括可遍历都是指的这个Iterator。

es6如何让支持遍历的数据结构可遍历呢，在复杂的本身不能被遍历的数据结构中遍历出想要的数据集合，它是很实用的功能。

#### es5 

```js
let authors = {
  allAuthors: {
    fiction: ['Agla', 'Skks', 'LP'],
    scienceFiction: ['Neal', 'Arthru', 'Ribert'],
    factory: ['J.R.Tole', 'J.M.R', 'Terry P.K']
  },
  Address: []
}
let r = []
for (let [k, v] of Object.entries(authors.allAuthors)) {
  r = r.concat(v)
}
console.log(r) // ['Agla', 'Skks', 'LP', 'Neal', 'Arthru', 'Ribert', 'J.R.Tole', 'J.M.R', 'Terry P.K']
```

#### es6

我希望它像一个数组一样，每次遍历的时候直接就拿到 v，这样是最简单的方式，我就可以拿到每个作者了。我不管你里面的嵌套是什么。我这样简单的一个遍历，我就能拿到我所有想要的名单。这样写起来就比上面的简单很多。它不仅写法上要优雅，而且你可以忽略掉这个数据结构里面的内置结构。你只要拿到这个对象，然后一遍历就能拿到所有作者的名单。这显而易见是我们想要的，对于这样的场景自定义遍历是非常的重要。

```js
let r = []
for (let v of authors) {
  r.push(v)
}
```

可是我们现在用这个理想的方式去做，会发现报错，authors is not iterable，authors 这个对象它不是可遍历的，你直接用 for of 的方式去遍历是不允许的。那我们怎么做才能让它支持这种写法呢。就是 iterator，iterator 就是一个可遍历的接口，如果你想让你的对象支持可遍历，一定是部署了可遍历接口。

##### 既然是部署接口，肯定要跟这个对象做关联。

这个接口就是一个方法。所以你要在这个对象上用挂载方法的方式来部署这个接口。

```js
authors[Symbol.iterator] = function () {

}
```

这个对象上要挂载一个 key，这个 key 不是一个字符串，它是 Symbol.iterator，只要你想自定义遍历器就必须这么写，就这么规定的，然后给这个 key 赋一个方法。

#### 接口书写规范

这个方法里面部署的这个接口怎么实现的肯定是不会约束你，既然是自定义，一定是让你随便写，但还是要有规范的，输入输出是有约束的，输入的是 this，this 就是对象本身，输出的是你的返回值，在这个方法中间怎么写就随意了。

返回值的约束，在自定义遍历的接口中一定要返回一个对象。这个对象有一个叫 next 的方法。这个 next 方法还要返回一个对象。这个对象也是有格式要求的，一定要有两个字段，一个是 done，一个是 value。done 用来表述你现在遍历是否结束，如果 done 等于 false，说明遍历没结束，done 等于 true，说明遍历结束了，所以你知道你的 done 该怎么赋值了吗。value 就是用来告诉你当前所遍历的项的值，比如说 1, 2, 3, 4 这是一共有四项，每次遍历的时候，1 和 2 就是你的这个值，当前被遍历到的这个值，你要填到 value 这个位置。这是最简单的 iterator 遍历接口规范，你的接口必须满足这些因素，才是一个符合规则的遍历器接口。

```js
authors[Symbol.iterator] = function () {
  return { 
    next () {
      return {
        done: false,
        value: 1
      }
    }
  }
}
```

#### 实现上面设定的目标，就是能通过简单的遍历就能遍历到所有的值

```js
authors[Symbol.iterator] = function () {
  // 这里执行一次
  let allAuthors = this.allAuthors // 拿到allAuthors
  let keys = Reflect.ownKeys(allAuthors) // 拿到allAuthors中所有的key
  let values = [] // 用来保存结果
  return { 
    next () {
      // 这里执行循环的次数
      // 一个技巧，我们在next方法里面去判断我们最终的返回值，因为它是一个遍历的过程，每一个遍历都要返
      // 回一个这个对象，然后里面包含done和value，这是规定的。所以在这里面我们要判断values的长度。
      // 我们用这个values来取，我们不是要对allAthors进行一个遍历吗，但是我们的遍历不会在一开始的过
      // 程中就把所有的都遍历一遍。我不会在每次遍历的时候都把这个对象遍历一遍。那样的话你的计算是多余
      // 的。我们希望在做这个自定义遍历器的时候，我们首先要做的就是说你遍历这个对象的第一个作者，我就
      // 应该找到第一个值，你遍历第二个的时候就应该找到第二个值。换句话说你要在这个自定义遍历的过程中
      // 控制你的指针。让指针先指向第一个值，再指向第二个值，然后以此类推，就是控制每一次给出去一个值。
      // 这个指针的控制逻辑是根据你的数据结构来确定的。在接口内部根据数据结构的特点实现你自己的业务逻
      // 辑。你只要保证返回正确的done和value就好了。
      if (!values.length) {
        if (keys.length) {
          values = allAuthors[keys[0]]
          keys.shift()
        }
      }
      return {
        done: !values.length,
        value: values.shift()
      }
    }
  }
}
```

你就可以把上面的代码放到一个模块中复用就行了，而在业务逻辑中，直接像下面这样遍历就好了，遍历的时候，你根本不需要关心这个对象里面的数据结构是什么样的，在你使用的时候是没有体现的。但是最终你就可以拿到这个结果。这样就能做到数据结构跟业务逻辑的解偶了，iterator 帮你起到了很大的作用，不用 iterator 是做不到的。

```js
let r = []
for (let v of authors) {
  r.push(v)
}
console.log(r)
```

### generator

为什么我们在部署这个可遍历的接口的时候一定要有那么多的规范和协议，其实这个地方有一个真正的协议，这个协议规定了两部分。

一个叫迭代器协议，一个叫可迭代协议，这两个概念就是对应上面遍历器接口框架的规范。

第一部分是在这个对象上找一个 Symbol.iterator 这样的 key，然后给它赋值这个 function 方法，管这种叫可迭代协议，你想判断一个对象是不是可迭代的，你就去找这个对象上有没有以 Symbol.iterator 为 key 的方法，如果没有那这个对象就是不可迭代的。反过来你想让它可迭代，就一定要部署以 Symbol.iterator 为 key 的这么一个方法。

第二部分叫迭代器协议。这个迭代器要求你必须返回一个对象，这个对象里面有一个方法是无参数的，而且必须命名为next，而 next 的返回值又必须是 done 和 value。

generator 和上面说的迭代器协议是一摸一样的，所以如果我们不想像上面那样写那么多规范去做可迭代的接口，不这样显示的写，在这个地方用 generator 就默认有了这些东西。所以在实现 iterator 的时候是可以用 generator 的，就不用自己去写那些 next, done, value 东西了。所以在 iterator 里面你可以用 generator 来大展宏图。generater 是遵循了迭代器协议的。

使用 generator 来实现 iterator 的可迭代接口。

```js
authors[Symbol.iterator] = function * () {
  let allAuthors = this.allAuthors
  let keys = Reflect.ownKeys(allAuthors)
  let values = []
  // 因为generator里面是通过yield来控制你的遍历节奏的。所以我们就不能像刚才那样是自己判断了。要判断
  // 它是不是空，判断它是不是有值，那都是自己去判断的。但对于yield来说，它不需要你那样去做了。我们就
  // 利用一个无限循环，因为yield具有暂停的功能，我就不需要自己去控制这个节奏。你什么时候没有值了，我
  // 再退出这个无限循环不就好了吗。所以这个地方我们是这么做。
  while (1) {
    if (!values.length) {
      if (keys.length) {
        values = allAuthors[keys[0]]
        keys.shift()
        // 唯独不一样的是不需要你写done,value了，这个节奏不需要你来控制了。
        yield values.shift()
      } else {
        // 如果keys没有了，退出这个无限循环
        return false
      }
    } else {
      yield values.shift()
    }
  }
  // 现在我们没有通过控制done这个节奏，以前是我必须控制这个done来决定是不是结束了。需要我们自己来判断跟我们使用         generator判断的思路不一样。其他的怎么去取作者，怎么去从左到右从上到下遍历都是一样的。只是节奏的控制方法不一样了。之前是手动的控制done，传递value。而使用generator的话你是通过yield来做的。完全没有显示的写done和value。你只是用yield传下值就可以了。至于说这个done是不是结束了，不需要你去来做。因为没有yield之后，它会帮你自动截断。所以这个代码的话写上去要比之前的更加的简洁。
}
```

对比显示的写的写法，generator 更加容易理解，更符合我们写代码的逻辑，我无限循环的过程中，因为你是个遍历的过程吗，我也不知道它什么时候结束，你只要遍历的话就就来取我这个值，取出一个值后就暂停，下一次遍历的时候进入到下一次遍历的值，这个是特别好理解的。如果对 generator 这种方式不理解，你手写迭代器协议也没问题。这两个方法都可以，哪个适合你你就用哪个。但是你的目标就是让它把你的这个不支持可遍历的数据结构变成可遍历，这才是你的终极目标。