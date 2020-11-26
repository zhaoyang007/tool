DOM 中的所有的属性都是用来表现语义的属性，CSSOM 的则都是表现的属性，width 和 height 这类显示相关的属性，都属于 CSSOM。

顾名思义，CSSOM 是 CSS 的对象模型，在 W3C 标准中，它包含两个部分：描述样式表和规则等 CSS 的模型部分（CSSOM），和跟元素视图相关的 View 部分（CSSOM View）。

在实际使用中，CSSOM View 比 CSSOM 更常用一些，因为我们很少需要用代码去动态地管理样式表。

### CSSOM

创建样式表也都是使用 HTML 标签来做到的，用 style 标签和 link 标签创建样式表：

```html
<style title="Hello">
  a {
    color:red;
  }
</style>
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">
```

获取文档中所有的样式表：

```js
document.styleSheets
```

CSSOM 还提供了一个非常重要的方法，来获取一个元素最终经过 CSS 计算得到的属性：

```js
window.getComputedStyle(elt, pseudoElt);
```



### CSSOM View

CSSOM View 这一部分的 API，可以视为 DOM API 的扩展，它在原本的 Element 接口上，添加了显示相关的功能，这些功能，可以分成三个部分：窗口部分，滚动部分和布局部分。

#### 窗口 API

窗口 API 用于操作浏览器窗口的位置、尺寸等。

* moveTo(x, y) 窗口移动到屏幕的特定坐标；
* moveBy(x, y) 窗口移动特定距离；
* resizeTo(x, y) 改变窗口大小到特定尺寸；
* resizeBy(x, y) 改变窗口大小特定尺寸。

窗口 API 还规定了 window.open() 的第三个参数，一些浏览器出于安全考虑没有实现，也不适用于移动端浏览器。

```js
window.open("about:blank", "_blank" ,"width=100,height=100,left=100,right=100" )
```

#### 滚动 API

要想理解滚动，首先我们必须要建立一个概念，在 PC 时代，浏览器可视区域的滚动和内部元素的滚动关系是比较模糊的，但是在移动端越来越重要的今天，两者必须分开看待，两者的性能和行为都有区别。

##### 视口滚动 API

可视区域（视口）滚动行为由 window 对象上的一组 API 控制，通过这些属性和方法，我们可以读取视口的滚动位置和操纵视口滚动。

* scrollX 是视口的属性，表示 X 方向上的当前滚动距离，有别名 pageXOffset；
* scrollY 是视口的属性，表示 Y 方向上的当前滚动距离，有别名 pageYOffset；
* scroll(x, y) 使得页面滚动到特定的位置，有别名 scrollTo，支持传入配置型参数 {top, left}；
* scrollBy(x, y) 使得页面滚动特定的距离，支持传入配置型参数 {top, left}。

监听视口滚动事件，需要在 document 对象上绑定事件监听函数：

```js
document.addEventListener("scroll", function(event){
  //......
})
```

视口滚动 API 是页面的顶层容器的滚动，大部分移动端浏览器都会采用一些性能优化，它和元素滚动不完全一样，请大家一定建立这个区分的意识。

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

#### 布局 API

最后我们来介绍一下布局 API，这是整个 CSSOM 中最常用到的部分，我们同样要分成全局 API 和元素上的 API。

##### 全局尺寸信息

window 对象上提供了一些全局的尺寸信息，它是通过属性来提供的。

![全局尺寸信息](/Users/zhaoyang/tool/images/前端知识体系/浏览器工作原理/全局尺寸信息.png)

* window.innerHeight, window.innerWidth 这两个属性表示视口的大小。
* window.outerWidth, window.outerHeight 这两个属性表示浏览器窗口占据的大小，很多浏览器没有实现，一般来说这两个属性无关紧要。
* window.devicePixelRatio 这个属性非常重要，表示物理像素和 CSS 像素单位的倍率关系，Retina 屏这个值是 2，后来也出现了一些 3 倍的 Android 屏。
* window.screen （屏幕尺寸相关的信息）
  * window.screen.width, window.screen.height 设备的屏幕尺寸。
  * window.screen.availWidth, window.screen.availHeight 设备屏幕的可渲染区域尺寸，一些 Android 机器会把屏幕的一部分预留做固定按钮，所以有这两个属性，实际上一般浏览器不会实现的这么细致。
  * window.screen.colorDepth, window.screen.pixelDepth 这两个属性是固定值 24，应该是为了以后预留。

我们主要使用的是 innerHeight、innerWidth 和 devicePixelRatio 三个属性，因为我们前端开发工作只需要跟视口打交道，其它信息大概了解即可。

##### 元素的布局信息

最后我们来到了本节课一开始提到的问题，我们是否能够取到一个元素的宽（width）和高（height）呢？

实际上，我们首先应该从脑中消除“元素有宽高”这样的概念，我们课程中已经多次提到了，有些元素可能产生多个盒，事实上，只有盒有宽和高，元素是没有的。

所以我们获取宽高的对象应该是“盒”，于是 CSSOM View 为 Element 类添加了两个方法：

* getClientRects();
* getBoundingClientRect()。

getClientRects 会返回一个列表，里面包含元素对应的每一个盒所占据的客户端矩形区域，这里每一个矩形区域可以用 x, y, width, height 来获取它的位置和尺寸。

getBoundingClientRect ，这个 API 的设计更接近我们脑海中的元素盒的概念，它返回元素对应的所有盒的包裹的矩形区域，需要注意，这个 API 获取的区域会包括当 overflow 为 visible 时的子元素区域。

根据实际的精确度需要，我们可以选择何时使用这两个 API。

这两个 API 获取的矩形区域都是相对于视口的坐标，这意味着，这些区域都是受滚动影响的。

如果我们要获取相对坐标，或者包含滚动区域的坐标，需要一点小技巧：

```js
var offsetX = document.documentElement.getBoundingClientRect().x - element.getBoundingClientRect().x;
```

如这段代码所示，我们只需要获取文档跟节点的位置，再相减即可得到它们的坐标。

这两个 API 的兼容性非常好，定义又非常清晰，建议你如果是用 JavaScript 实现视觉效果时，尽量使用这两个 API。
