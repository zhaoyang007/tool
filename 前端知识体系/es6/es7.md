### includes

es7 中的数组如何判断元素是否存在。

在 es6 的时候，我们利用 find 去找一个元素是不是存在。es5 的时候还讲过 filter 去过滤有没有一个元素，其实也可以间接的判断它有没有。到了 es7 把这个问题更加的简化了。更加的语义化了。

```js
const arr = [1, 2, 3, 4, 5, 6, 7]
console.log(arr.includes(4)) // true
```

这个 api 跟 find 差不多，但是 find 更侧重于我找到这个元素，而 includes 是说这个数组包不包含某个元素。从 es7 之后，你要习惯去用 includes 来做判断。

### **

数学乘方的简写

```js
console.log(Math.pow(2, 5)) // 32
console.log(2 ** 5) // 32
```

