##### 元素滚动 API

形成滚动的要素：

* 父容器有固定高度
* 父容器设置 `overflow: scroll; `
* 子元素高度超出父元素高度

下面的所有属性和方法都是设置在滚动的父容器身上的：

* scrollTop：Y 方向上的滚动距离。
* scrollLeft：X 方向上的当前滚动距离。
* scrollWidth：可滚动区域的宽度，没有滚动时就为父容器的宽度。
* scrollHeight：可滚动区域的高度，没有滚动时就为父容器的高度。
* scroll(x, y)：使元素滚动到特定的位置，有别名 scrollTo，scrollBy，支持传入配置型参数 {top, left}。

可在元素上监听它的滚动事件 scroll：

```js
element.addEventListener("scroll", function(event){
  //......
})
```

