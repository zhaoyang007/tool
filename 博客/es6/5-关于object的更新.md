1. 属性简写
  ```
    let x = 1; let y = 2; let z = 3
    let obj = {
      'x': x,
      y,
      [z]: 5,
      hello: function () {

      }
    }
  ```
2. object key值是变量的时候
    1. es5 
        ```
        obj[z] = 5
        ```
       * es5只能这样写，没别的方式

    2. es6 <br>
       * 在es6增加了一个语法让这个写法变得更加的简洁
          ```
          let obj = {
            [z]: 5,
            [y + z]: 6
          }
          ```
       * 这个z的地方可以写任何的变量或者是表达式
3. object中的函数的简写
    ```
    let obj = {
      hello () {}
    }
    ```
4. object中的异步函数
   * 在es5中是不允许在object对象中增加异步函数的。
   * 在es6中是允许的，如果你想把object中的函数变成异步的话，前面加一个星号，这样表明了这个方法是异步的。
      ```
      let obj = {
        * hello () {}
      }
      ```
   * 这个简写的形式是其实跟这样声明的函数是一摸一样的
      ```
      function * hello () {}
      ```
   * 这个是generator函数，执行这个异步函数之后，它并不是像我们常规函数那样去执行函数体了，它是先返回一
  个对象就叫genetator对象，它返回之后要一步一步的操作才能执行函数体里面的内容。
5. 我们除了可以用object存储数据，在es6中给大家设置了新的数据结构来存储数据
    1. Set
        * 之前你要存储数据，你更多的是用数组或object，现在你可以多了一个选择叫Set。用Set存储数据有一个什么
        好处呢，就是它所存储的数据必须是唯一的，Set存储的成员不允许是重复的，如果你存入了重复的数据，它会
        帮你自动过滤掉。
        1. 这样你就实例化了一个Set对象，但是没有初始化任何数据
            ```
            let s = new Set()
            ```
        2. 初始化数据，Set所接受的参数是一个可遍历的对象，而不是只有数组
            ```
            let s = new Set([1, 2, 3, 4])
            ```
        3. 有了一个对象了，我们要往里面存数据该怎么做呢，存数据用它提供的add api
            ```
            s.add('hello')
            ```
            * 也可以及联操作
            ```
            s.add('hello').add('goodbye')
            ```
        4. 删除数据，对于数据的操作来说，无非就是写，读，找，删，改五个操作。
            1. 删除指定数据
                ```
                s.delete('hello')
                ```
            2. 全部清空
                ```
                s.clear()
                ```
        5. 查找数据，我用这个数据结构的时候，我特别想知道我里面有没有这个数据
            ```
            s.has('hello')
            ```
        6. set已经存入数据的长度
            ```
            s.size
            ```
        7. 读，遍历
            ```
            s.keys() // 返回的是SetIterator，这个是遍历器
            s.values() // 它们都是返回的我们刚才所存储的这个值本身
            ```
          * 我们推测一下Set这种数据结构本质上它还是一个object对象，我们前面在讲object对象的时候，是不是key,
          value的形式，在目前来看，keys返回的是{'hello', 'goodbye'}, values也返回的是这个。不难推测它
          还是object本质，也是key,value的形式存在。这是大家要注意的一个点。
          keys返回的是键，value返回的是值，如果你想返回键值对。
            ```
            s.entries() // {'hello' => 'hello', 'goodbye' => 'goodbye'}
            s.forEach(item => {
              console.log(item)
            })
            ```
          * 所有iterator都可以用for of做，set的实例对象它返回的都是iterator对象
            ```
            for (let item of s) {
              console.log(item)
            }
            ```
        8. 改 
            * Set对象并没有提供让你直接编辑数据的方法。如果你想改的话要先删再添加
    2. Map
      * Map是用来实现类似于字典的数据结构。也就是key,value的形式，字典的key,value和object的key,value
      有什么区别呢。Map这个数据结构里面，key可以是任意值，Set是每个元素可以是任意值。
        ```
        let map = new Map([[1, 2]])
        console.log(map) // Map(1) {1 => 2}
        ```
      * 传入的这个参数跟set一样是一个可遍历的对象，不同的是这个可遍历对象的每一项必须是[1, 2]，前面是key,
      后面是value。
        1. 添加数据
            ```
            let map = new Map() // Map(0) {}
            map.set(1, 2) // Map(1) {1 => 2}
            ```
           * set意味着可以添加可以修改，add只能是添加
        2. 删除数据
            ```
            map.delete(1) 
            ```
            * 删除的是key
        3. 全部清除
            ```
            map.clear()
            ```
        4. 统计map数据条数
            ```
            map.size
            ```
        5. 查找
            ```
            map.has(1)
            ```
        6. 取值
            ```
            map.get(1)
            ```
        7. 拿到所有的key集合，value集合，全部集合
            ```
            map.keys() // MapIterator {1, 3}
            map.values() // MapIterator {3, 4}
            map.entries() // MapIterator {1 => 3, 3 => 4}
            ```
            * 再Set的时候这三个拿到的是SetIterator，在这里是MapIterator，不管是SetIterator还是MapIterator，
            它都是Iterator，它都是可遍历对象，既然是可遍历对象，它就可以用forEach，就可以用for of
        8. 遍历
            ```
            map.forEach((value, key) => {
              console.log(value, key)
            })
            for (let [key, value] of map) {
              console.log(key, value)
            }
            ```
            * 用for fo遍历map的时候一定要写key, value用[]包起来
        9. 注意
            1. map键的类型可以是任意的。
                ```
                let o = function () {
                  console.log('o')
                }
                map.set(o, 4)
                ```
              * 这个是你之前绝对没有见过的，object里面没有拿function做key的。map是可以的，比如说我现在有一个
              函数它做了很多的功能，然后你想给这个函数标记一些数据，那么你就可以用map去存储这个数据了，这样的话就
              可以使这个函数跟这个数据做做一次关联，比如说o下面我可以挂载一些数据。
            2. 键的顺序
                * 遍历出的顺序是跟你初始化或者说你在添加key的时候你的那个key的顺序来决定的。
            3. 性能
                * 在关于object的操作和map的操作的时候，map的性能稍微会有一些优势，既然es6中新增了map这种字典型的数据
                结构，推荐大家以后别再用object去存储数据，而是要使用字典类型的这种数据结构map，希望大家可以学会用新
                的数据结构去解决你的数据问题。比如说set，比如说map，而不是说上来就直接用数组或者object，你的选择项
                要大了很多，你要发挥这些新的数据结构带来的这种特性。
6. 关于对象的复制
    1. es5
       * 把一个对象挨个遍历一下，再赋值给另一个对象，就实现了对象的拷贝
    2. es6
        ```
        Object.assign(target, source)
        ```
        * assign实现的是浅拷贝，浅拷贝是说对于不是引用类型的值，它给你做数据的替换，对于引用类型的值，它不再遍历
        ，只是把引用的这个对象的地址给你换一下。如果在应用浅拷贝的时候，你可以考虑使用Object.assign，但如果
        说你使用深拷贝在使用assign的时候还要学会递归，就是你如果发现它是一个对象，你要递归用assign再处理，这样
        的话就可以实现深拷贝了。
      