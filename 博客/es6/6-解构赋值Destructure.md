1. 解构赋值Destructure
    如何从一个复杂的数据结构中提取数据
2. es5
  * 在es5中从复杂的数据结构中去挑数据是需要层层的遍历或者是引用，会相当麻烦。
  * demo: es5从复杂的数据解构中取出我们想要的数据
    ```
    let arr = ['hello', 'world']
    let firstName = arr[0]
    let surName = arr[1]
    console.log(firstName, surName)
    ```
    * 为什么要用变量来获取这个数据，如果说这个数据频繁使用，每次都是通过索引去取显然是不合适的，因为每次从数组
    按照索引去取值它是需要花时间的，当你频繁的去取的时候是会消耗性能的。如果你用缓存，也就是用变量来存储下你
    的数据，那就会解决这个性能的问题。这就是为什么在复杂的数据结构中一定要把你关心的或频繁访问的数据拿出来放
    到变量中去。就是这么一个背景。当你的数组足够长，然后你对里面的一些数据感兴趣，你是不是需要频繁的声明变量
    ，然后还要通过索引的方式再赋值给这个变量，当你的代码量很复杂的时候你会发现光这一部分操作就占据了你这个代
    码的很多行。从这个角度讲它就不是很便捷的方式，因为你要逐一操作。
3. es6
  * 而es6中所谓的更优雅更便捷的方式就是解构赋值。
  * demo: es6从复杂的数据解构中取出我们想要的数据
    ```
    let arr = ['hello', 'world']
    let [firstName, surName] = arr
    console.log(firstName, surName)
    ```
    * es5的时候是通过let两次声明变量，而到了es6只用了一个let，然后它所有的变量放到变量的集合里面，左面是你变
    量的集合，右面是你的数据。这样的话就轻松的拿到了你所关心的数据以及和变量的对应。相当于是一次集体的赋值，
    它不是逐一赋值，是集体的赋值，一下就赋值过去了。这就叫解构赋值。什么叫解构呢，解构就是说把数据给你拆解开，
    拆解开的目的是什么呢，是把你拆解出的数据赋值给一些变量。所以这就是解构赋值的意思。越复杂的数据解构就越会
    体现出解构赋值的优越性。
      1. Array的解构赋值
          ```
          let arr = ['a', 'b', 'c', 'd']
          ```
        1. 如何跳过某个赋值元素
            ```
            let [firstName, , thirdName] = arr // 取数组的第一三项 
            ```
        2. 凡是可遍历的对象的数据解构都可以解构赋值，这个可遍历的对象是什么呢，比如我们前面讲的set，map，字符串。
          数组或者是字符串，你可以用索引来取某一位或某一项内容。但如果是set，我们是怎么获取某一个元素的？是用
          get或者遍历的方式吧，它是不支持索引的。但是利用解构赋值的话，它根本就不用索引的方式，你只要左边写中括
          号，默认按照索引的位置排序去取就可以了。不需要显示的指定索引值。根本就不需要关心右边这个数据解构该怎么
          取的问题。
          
            ```
            let [firstName, , thirdName] = new Set([1, 2, 3, 4])
            ```
        3. 如果左边不新生成变量，而是把它赋值到一个对象属性上面去，那该怎么做呢？
            ```
            let user = {name: 's', surname: 't'}
            ```
            1. es5
                ```
                user.name = arr[0]
                user.surname = arr[1]
                ```
            2. es6
                ```
                [user.name, user.surname] = [1, 2]
                ```
              * 解构赋值不仅可以赋简单的变量，还可以赋值对象的属性。
        4. 循环
            * 声明临时变量item用来保存数据
            1. es5
                ```
                for (let i = 0, item; i < arr.length; i++) {
                  item = arr[i]
                }
                ```
            2. es6
                ```
                let user = {}
                for (let [k, v] of Object.entries(user)) {
                  console.log(k, v)
                }
                ```
              * 这是解构赋值的另一种形式，它在循环体中是这么用的。
        5. rest
            ```
            let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            let [firstName, curName, ...last] = arr
            console.log(firstName, curName, last)
            ```
        6. 前面讲的都是正常的情况，数据足够多，然后给这个赋值。但我们知道赋值的时候你不能保证你的数据一定是有内
          容的，这不就是极端或者是异常的情况吗。
            ```
            let arr = [1, 2, 3]
            let [firstName, curName, ...last] = arr
            console.log(firstName, curName, last) // 1 2 [3]
            let arr = [1, 2]
            console.log(firstName, curName, last) // 1 2 []
            let arr = [1]
            console.log(firstName, curName, last) // 1 undefined []
            let arr = []
            console.log(firstName, curName, last) // undefined undefined []
            ```

            * 当你的数据量不够的时候，通过解构赋值，这个变量的值就跟我们没赋值一样，就是undefined，不是说你给它
            做了解构赋值，这个变量就一定有值，它取决于你的这个数据有没有值，没有的话一律是undefined。
            ```
            let arr = []
            console.log(firstName = 'hello', curName, last) // hello undefined []
            ```
            * 如果数据没有你这个变量对应的值的时候不想得到undefined的话，可以在声明变量的时候给它设置一个默认值。
    2. Object的解构赋值
        1. Object解构赋值基础情况
            ```
            let options = {
              title: 'menu',
              width: 100,
              height: 200
            }
            let {title, width, height} = options
            console.log(title, width, height)
            ```
          * 简写的方式，新声明的变量必须跟对象属性名一样，如果这个变量跟属性不一样，它解构赋值的时候就不知道你
          这个变量要和哪个属性匹配，取哪个值。
            ```
            let {title: title2, width, height} = options
            console.log(title2, width, height)
            ```
          * 如果说你不想让这个变量跟属性名一样，就不能简写了。后面的话必须要有一个变量名称。
        2. 默认值的问题
            ```
            let {title: title2, width = 130, height} = options
            console.log(title2, width, height)  
            ```
        3. rest
            ```
            let {title, ...last} = options
            console.log(title2, last)  
            ```
        4. 复杂的嵌套的数据结构
            ```
            let options = {
              size: {
                width: 100,
                height: 200
              },
              items: ['Cake', 'Donut'],
              extra: true
            }
            let {size: {width: width2, height}, items: [item1]} = options
            console.log(width2, height, item1)  
            ```
          * 它是一层一层的对应，解构的过程其实就是按照左边的变量的结构和右边数据的结构要一致，然后我们挨个匹
          配，匹配到之后，右边的是数据项，左边的是变量，一一来对应，一一映射。它是这么一个工作原理。也就是
          说你在用解构赋值左侧声明变量的时候也要跟数据保持一样的解构。
        5. 函数参数复杂的时候也可以用解构赋值
        