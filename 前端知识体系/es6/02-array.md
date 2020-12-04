#### every

every 遍历数组，能不能继续向下遍历取决于参数函数的返回值，默认是 false，也就是默认不要继续往下遍历，如果想改变它的默认行为，就 return true，这样就能遍历所有的元素。这时它和 forEach 的行为很像了，那为什么要新增 every 的 api，因为 forEach 不支持 break 和 continue。但 every 可以，因为 every 能不能向下遍历取决于你这个函数的返回值，这样就受你程序的控制了。every 返回值是布尔值，每次遍历的函数体都返回 true，那么 every 的返回值为 true，否则为 false。

#### forEach 和 every 虽然不能直接写 break 和 continue，但是可以实现一样的效果。

##### 1.forEach

**实现 continue**

可以使用条件判断的方式实现

**实现break**

* try catch throw

  ```js
  let arr = [1, 2, 3, 4, 5]
  try{
    arr.forEach(item => {
      if (item === 3) {
        throw new Error('出错了')
      } else {
        console.log(item)
      }
    })
  } catch(e){
    throw e
  }
  ```

* 空跑循环

  在外层加一个标识。这种会影响性能，因为效果是实现了，但是循环并没有停止，会一直遍历到最后。

  ```js
  let breakFlag = false
  let arr = [1,2,3,4,5]
  arr.forEach(item => {
    if (breakFlag === true) {
      return
    }
    if (item===3) {
      breakFlag = true
      return
    }
    console.log(item)
  })
  ```

##### 2.every

可以使用条件判断的方式实现 continue。使用条件判断加上 return false 的方式实现 break。
