### DOM

document.documentElement 表示的是整个 html。

document.body 和 document.documentElement 是一个意思，在文档没有设置 Doctype 的时候使用。

##### 节点

根据相对位置获取元素：

* parentNode
* childNodes
* firstChild
* lastChild
* nextSibling
* previousSibling

操作 DOM 树的 API，全都是在父元素上操作的：

* appendChild
* insertBefore
* removeChild
* replaceChild

一些高级 API：

* contains 检查一个节点是否包含另一个节点的函数。
* cloneNode 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。
* isEqualNode 检查两个节点是否完全相同。
* isSameNode 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用“===”。
* compareDocumentPosition 比较两个节点中关系的函数。

创建 DOM 节点：

* createElement
* createTextNode
* createCDATASection
* createComment
* createProcessingInstruction
* createDocumentFragment
* createDocumentType

查找元素：

* querySelector
* querySelectorAll
* getElementById
* getElementsByName
* getElementsByTagName
* getElementsByClassName

##### Attribute

对 DOM 而言，Attribute 和 Property 是完全不同的含义，只有特性场景下，两者才会互相关联。

首先，我们可以把元素的 Attribute 当作字符串来看待，这样就有以下的 API：

* getAttribute
* setAttribute
* removeAttribute
* hasAttribute

像 property 一样的访问 attribute，可以使用 attributes 对象，比如 document.body.attributes.class = “a” 等效于 document.body.setAttribute(“class”, “a”)。

attribute 和 property 的区别是 property 不能修改和获取节点的自定义属性，attribute 可以。



### CSSOM View 

CSSOM View API 可以视为 DOM API 的扩展，在原本的 Element 接口上，添加了显示相关的功能，可以分成三个部分：窗口部分，滚动部分和布局部分。

##### 窗口 API

* moveTo(x, y), moveBy(x, y) 移动窗口位置
* resizeTo(x, y), resizeBy(x, y) 改变窗口大小
* window.open() 打开窗口

```html
<input type="button" value="打开窗口" onclick="openWindow()" />
<input type="button" value="移动窗口" onclick="moveWindow()" />

<script>
  function openWindow() {
    myWindow = window.open('','_blank','width=200,height=100,left=100,right=100')
  }
  function moveWindow() {''
    myWindow.moveTo(200,100)
    myWindow.resizeTo(300,200)
    myWindow.focus()
  }
</script>
```

##### 滚动 API

###### 视口滚动：

相当于视口是父容器，html 为滚动子元素，html 的宽高超出视口，就会发生滚动。

视口滚动行为由 window 对象上的一组 API 控制，我们可以读取视口的滚动位置和操纵视口滚动。

* scrollX： X 方向上的当前滚动距离，有别名 pageXOffset
* scrollY：Y 方向上的当前滚动距离，有别名 pageYOffset
* scroll(x, y)：使页面滚动到特定的位置，有别名 scrollTo，支持传入配置型参数 {top, left}
* scrollBy(x, y)：使页面滚动特定的距离，支持传入配置型参数 {top, left}

监听视口滚动事件，需要在 document 或 window 对象上绑定事件监听函数：

```js
document.addEventListener("scroll", function(event){
  console.log(event.target) // target是document
})
```

###### 元素滚动：

形成滚动的要素：

* 父容器有固定高度
* 父容器设置 `overflow: scroll; `
* 子元素高度超出父元素高度

下面的所有属性和方法都是设置在滚动的父容器身上的：

* scrollTop：Y 方向上子元素的滚动距离。
* scrollLeft：X 方向上子元素的当前滚动距离。
* scrollWidth：子元素可滚动区域的宽度，没有滚动时就为父容器的宽度。
* scrollHeight：子元素可滚动区域的高度，没有滚动时就为父容器的高度。
* scroll(x, y)：使子元素滚动到特定的位置，有别名 scrollTo，支持传入配置型参数 {top, left}。
* scrollBy(x, y) 使子元素滚动特定的距离，支持传入配置型参数 {top, left}。

可在父容器元素上监听它的滚动事件 scroll：

```js
element.addEventListener("scroll", function(event){
  console.log(event.target) // target是滚动父容器
})
```

##### 布局 API

###### 设备屏幕，浏览器窗口，视口的布局信息：

前端开发工作只需要跟视口打交道，所以主要使用 innerHeight、innerWidth 和 devicePixelRatio 这三个属性。

* window.innerHeight, window.innerWidth：视口大小。
* window.devicePixelRatio：表示物理像素和 CSS 像素单位的倍率关系，Retina 屏这个值是 2，后来也出现了一些 3 倍的 Android 屏。
* window.outerWidth, window.outerHeight：浏览器窗口占据的大小。
* window.screen：设备的屏幕尺寸相关信息。

###### 元素的布局信息（都是只读信息）：

* clientRect 系列

  * element.getClientRects()：返回一个包含元素对应的每一个盒所占据的客户端矩形区域的列表。
  * element.getBoundingClientRect()：返回元素对应的盒的布局信息对象。
    * x, y：顶点坐标，相对于视口。
    * width, height：宽高，包括 content, padding, border。跟 offset 系列的宽高一样。
    * top, right, bottom, left：四个边的坐标，相对于视口。

* offset 系列

  document.documentElement.offsetHeight：html 的宽高

  * element.offsetParent：返回一个最近的包含该元素的定位元素或者最近的 `table,` `td,` `th,` `body`元素
  * element.offsetTop：当前元素相对于其 `offsetParent` 元素的顶部距离
  * element.offsetLeft：当前元素相对于其 `offsetParent` 元素的左部距离
  * element.offsetWidth：盒子的宽度，包括 content, padding, border，不包括 margin 和滚动条的尺寸
  * element.offsetHeight：盒子的高度，包括 content, padding, border，不包括 margin 和滚动条的尺寸

* client 系列

  document.documentElement.clientHeight：视口的宽高

  * element.clientTop：盒子的上边框的宽度
  * element.clientLeft：盒子的左边框的宽度
  * element.clientWidth：盒子的宽度，包括 content, padding 的尺寸，不包括 border, margin 和滚动条的尺寸
  * element.clientHeight：盒子的高度，包括 content, padding 的尺寸，不包括 border, margin 和滚动条的尺寸
