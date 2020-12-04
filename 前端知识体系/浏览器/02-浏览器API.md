## DOM

HTML 文档是一个由标签嵌套而成的树形结构，因此，DOM 也是使用树形的对象模型来描述一个 HTML 文档。

DOM API 大致会包含 4 个部分：

* 节点：DOM 树形结构中的节点相关 API。
* 事件：触发和监听事件相关 API。
* Range：操作文字范围相关 API。
* 遍历：遍历 DOM 需要的 API。

document.documentElement 表示的是整个 html。

document.body 

### 节点

DOM 的树形结构所有的节点有统一的接口 Node，我们按照继承关系，给你介绍一下节点的类型。

![接口 Node](/Users/zhaoyang/tool/images/前端知识体系/浏览器工作原理/接口 Node.png)

在这些节点中，除了 Document 和 DocumentFrangment，都有与之对应的 HTML 写法，我们可以看一下。

```
Element: <tagname>...</tagname>
Text: text
Comment: <!-- comments -->
DocumentType: <!Doctype html>
ProcessingInstruction: <?a 1?>
```

我们在编写 HTML 代码并且运行后，就会在内存中得到这样一棵 DOM 树，HTML 的写法会被转化成对应的文档模型，而我们则可以通过 JavaScript 等语言去访问这个文档模型。

这里我们每天都需要用到，要重点掌握的是：Document、Element、Text 节点。

DocumentFragment 也非常有用，它常常被用来高性能地批量添加节点。

#### Node

Node 是 DOM 树继承关系的根节点，它定义了 DOM 节点在 DOM 树上的操作。

##### 首先，Node 提供了一组属性

来表示它在 DOM 树中的关系，这一组属性提供了前、后、父、子关系，可以很方便地根据相对位置获取元素。它们是：

* parentNode
* childNodes
* firstChild
* lastChild
* nextSibling
* previousSibling

##### Node 中也提供了操作 DOM 树的 API，主要有下面几种：

从命名上我们基本可以知道 API 的作用，所有这几个修改型的 API，全都是在父元素上操作的。

* appendChild
* insertBefore
* removeChild
* replaceChild

##### 除此之外，Node 还提供了一些高级 API。

* contains 检查一个节点是否包含另一个节点的函数。
* cloneNode 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。
* isEqualNode 检查两个节点是否完全相同。
* isSameNode 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用“===”。
* compareDocumentPosition 比较两个节点中关系的函数。

##### 创建 DOM 节点

* createElement
* createTextNode
* createCDATASection
* createComment
* createProcessingInstruction
* createDocumentFragment
* createDocumentType

#### 查找元素

document 节点提供了查找元素的能力。

* querySelector
* querySelectorAll
* getElementById
* getElementsByName
* getElementsByTagName
* getElementsByClassName

getElementById、getElementsByName、getElementsByTagName、getElementsByClassName 这几个 API 的性能高于 querySelector。

getElementsByName、getElementsByTagName、getElementsByClassName 获取的是一个能够动态更新的集合。所以，尽管 querySelector 系列的 API 非常强大，我们还是应该尽量使用 getElement 系列的 API。

#### Attribute

Node 提供了树形结构上节点相关的操作。而大部分时候，我们比较关注的是元素。Element 表示元素，它是 Node 的子类。

元素对应了 HTML 中的标签，它既有子节点，又有属性。所以 Element 子类中，有一系列操作属性的方法。

我们需要注意，对 DOM 而言，Attribute 和 Property 是完全不同的含义，只有特性场景下，两者才会互相关联。

首先，我们可以把元素的 Attribute 当作字符串来看待，这样就有以下的 API：

* getAttribute
* setAttribute
* removeAttribute
* hasAttribute

像 property 一样的访问 attribute，还可以使用 attributes 对象，比如 document.body.attributes.class = “a” 等效于 document.body.setAttribute(“class”, “a”)。

attribute 和 property 的区别是 property 不能修改和获取节点的自定义属性，attribute 可以。

### 事件

一般来说，事件来自输入设备，我们平时的个人设备上，输入设备有三种：

* 键盘；
* 鼠标；
* 触摸屏。

#### 捕获与冒泡

捕获过程是从外向内，冒泡过程是从内向外。

以下代码展示了事件传播顺序：

```html
<body>
  <input id="i"/>
</body>
```

```js
document.body.addEventListener("mousedown", () => {
  console.log("key1")
}, true)

document.getElementById("i").addEventListener("mousedown", () => {
  console.log("key2")
}, true)

document.body.addEventListener("mousedown", () => {
  console.log("key11")
}, false)

document.getElementById("i").addEventListener("mousedown", () => {
  console.log("key22")
}, false)
```

我们监听了 body 和一个 body 的子元素上的鼠标按下事件，捕获和冒泡分别监听，可以看到，最终产生的顺序是：

* “key1”
* “key2”
* “key22”
* “key11”

这是捕获和冒泡发生的完整顺序。

在一个事件发生时，捕获过程跟冒泡过程总是先后发生，跟你是否监听毫无关联。

在我们实际监听事件时，建议这样使用冒泡和捕获机制：默认使用冒泡模式，当开发组件时，遇到需要父元素控制子元素的行为，可以使用捕获机制。

addEventListener 有三个参数：

* 事件名称；
* 事件处理函数；
* 捕获还是冒泡。

事件处理函数不一定是函数，也可以是个 JavaScript 具有 handleEvent 方法的对象：

```js
var o = {
  handleEvent: event => console.log(event)
}
document.body.addEventListener("keydown", o, false);
```

第三个参数不一定是 bool 值，也可以是个对象，它提供了更多选项。

* once：只执行一次。
* passive：承诺此事件监听不会调用 preventDefault，这有助于性能。
* useCapture：是否捕获（否则冒泡）。

事件代理：

事件代理是基于事件冒泡做的，在事件冒泡这个机制的基础上去实现事件代理，代理就是因为数量太多或结果比较复杂，不好去挨个都去绑定事件，所以把事件绑到某一个父元素上，在事件里判断是不是我们想要触发事件的那个元素，再去做一些其他的动作。

#### 焦点

键盘事件是由焦点系统控制的，操作系统也会提供一套焦点系统，但是现代浏览器一般都选择在自己的系统内覆盖原本的焦点系统。

在旧时代，有一个经典的问题是如何去掉输入框上的虚线框，这个虚线框就是 Windows 焦点系统附带的 UI 表现。

焦点系统认为整个 UI 系统中，有且仅有一个“聚焦”的元素，所有的键盘事件的目标元素都是这个聚焦元素。Tab 键被用来切换到下一个可聚焦的元素，焦点系统占用了 Tab 键，但是可以用 JavaScript 来阻止这个行为。

浏览器 API 还提供了 API 来操作焦点，如：

```js
document.body.focus();
document.body.blur();
```

其实原本键盘事件不需要捕获过程，但是为了跟 pointer 设备保持一致，也规定了从外向内传播的捕获过程。

#### 自定义事件

除了来自输入设备的事件，还可以自定义事件，实际上事件也是一种非常好的代码架构，但是 DOM API 中的事件并不能用于普通对象，所以很遗憾，我们只能在 DOM 元素上使用自定义事件。

```js
var evt = new Event("look", {"bubbles":true, "cancelable":false});
document.dispatchEvent(evt);
```

这里使用 Event 构造器来创造了一个新的事件，然后调用 dispatchEvent 来在特定元素上触发。

我们可以给这个 Event 添加自定义属性、方法。

#### 事件应用

通用事件监听函数

```js
// 定义
function bindEvent (elem, type, fn) {
  elem.addEventListener(type, fn)
}
// 使用
const btn1 = document.getElementById('btn1')
bindEvent(btn1, 'click', event => {
  console.log(event.target) // 我们触发点击的元素，就是这个btn1这个dom对象
  event.preventDefault() // 阻止浏览器默认行为
  event.stopPropagation() // 阻止事件冒泡
  console.log('clicked')
})
```

适用普通的绑定和事件代理的绑定。

```js
// 定义
function bindEvent (elem, type, selector, fn) {
  if (fn == null) {
    fn = selector
    selector = null
  }
  elem.addEventListener(type, event => {
    const target = event.target
    if (selector) {
      // 代理绑定
      if (target.matched(selector)) {
        fn.call(target, event)
      }
    } else {
      // 普通绑定
      fn.call(target, event)
    }
  })
}

// 使用
const btn1 = document.getElementById('btn1')
const div3 = document.getElementById('div3')
bindEvent(btn1, 'click', function (event) {
  event.preventDefault()
  alert(this.innerHTML)
})
bindEvent(div3, 'click', 'a', function (event) {
  event.preventDefault()
  alert(this.innerHTML)
})
```



## CSSOM View 

CSSOM View API 可以视为 DOM API 的扩展，在原本的 Element 接口上，添加了显示相关的功能，可以分成三个部分：窗口部分，滚动部分和布局部分。

### 窗口 API

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

### 滚动 API

##### 视口滚动

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

##### 元素滚动

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

### 布局 API

##### 设备屏幕，浏览器窗口，视口的布局信息

前端开发工作只需要跟视口打交道，所以主要使用 innerHeight、innerWidth 和 devicePixelRatio 这三个属性。

* window.innerHeight, window.innerWidth：视口大小。
* window.devicePixelRatio：表示物理像素和 CSS 像素单位的倍率关系，Retina 屏这个值是 2，后来也出现了一些 3 倍的 Android 屏。
* window.outerWidth, window.outerHeight：浏览器窗口占据的大小。
* window.screen：设备的屏幕尺寸相关信息。

##### 元素的布局信息（都是只读信息）

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



## BOM

### location

地址的一些信息

```js
// https://coding.imooc.com/lesson/400.html?a=100&b=200#mid=30309
location.href        // https://coding.imooc.com/lesson/400.html#mid=30309
location.protocol    // 'https:'  
location.host        // 'coding.imooc.com'  
location.pathname    // '/lesson/400.html'
location.search      // '?a=100&b=200'
location.hash        // '#mid=30309'
```

### history

前进后退这些信息。

```js
history.back()    // 网页后退
history.forward() // 网页前进
```

### navigator

### 存储

#### cookie

cookie 本身是用于浏览器端和 server 端通讯的，也就是 http 请求的一部分。

早期是被借用来做本地存储，因为 localStorage 和 sessionStorage 是 09 年 html5 之后提出来的，之前没有，所以早期我们只能用 cookie 来做本地存储。

前端可以用 document.cookie = '' 的方式来去修改。后端也可以修改 cookie，因为 cookie 本身是通讯的一个标准。

cookie 的价值不在于本地存储，而在于本地和服务器端进行通讯。cookie 的信息中一般是有用户个人的一些信息标识的。

cookie 是个字符串，中间通过分号分割的形式，每一部分都是 key=value 的形式。

怎么加一个 cookie：

```js
document.cookie = 'a=100'
console.log(document.cookie) // 'a=100'
document.cookie = 'b=200'
console.log(document.cookie) // 'a=100; b=200'
// 每赋值一个就追加一遍，这是一个追加的过程，不是覆盖的过程，所以说这个api看着还比较怪异。同一个key它会覆盖，不同key它会追加
document.cookie = 'a=300'
console.log(document.cookie) // 'b=200; a=300'
```

所以这种 api 的计算形式和我们之前做的 js 的普通计算形式不一样，很难让人理解，不知道的话可能就会掉到坑里面去。所以从 api 的易用程度来说，cookie 做本地存储就不合适。

我们加上 cookie 之后，以后访问这个页面的时候，Request Headers 里面就带了这个 cookie，后端是可以接收到这个cookie 的。比如这个 cookie 里面有一个 userId=xxx，服务端接收到这个 cookie 之后，就知道登录用户是谁了，登录的过程通常可以用 cookie 来实现。

我们存储了一些 cookie 信息，刷新页面后，还能够查到这些信息，也就是说只要我们的 cookie 不清除，页面不管怎么刷新，cookie 存储信息都会在的，浏览器会帮我们存下来。所以说它能做本地存储。这也是我们在 html5 规范出来或普及之前唯一的能在页面中做本地存储的一种能力。

但是 cookie 当时的设计并不是为了做本地存储，它是为了浏览器和服务端进行通讯，它只是被借用来做本地存储，它本来不是干这个活的，所以用它来做本地存储肯定会有一些问题：

* 存储大小，cookie 是有存储大小限制的，最大存 4kb，超过了 4kb，就存不下了，为什么有这个限制呢，因为在发送请求的时候，是要把 cookie 带上的。如果 cookie 的内容很多。每次请求都带上 cookie，会严重影响每次的请求。
* cookie 回跟随 http 请求发送出去，你存什么东西，每次请求都会带到服务器上去，增加请求的数据量，请求会变慢一些。
* 只能用 document.cookie = '' 这种方式来修改，这种 api 太过简陋也太不好理解。

#### localStorage sessionStorage

这两个是 html5 专门为存储设计的，最大可存储 5M，空间更大，因为前端存储的信息基本上也就存储个字符串或数字，就是简单的缓存一下。不会存一些很大的数据量，所以说 5M 绝对是绰绰有余，而且这 5M 是针对每个域名来说的。每个 host，每个域我们可以存储 5M。

api 简单易用，是用 setItem getItem 来做的。这个方式就完全符合于我们自己写一个存储的功能或者缓存的功能。get set这种 api，很多这种 key value 的库都是用这种 get set api，所以说非常符合我们的使用。

```js
localStorage.setItem('a', 100)
localStorage.getItem('a')
sessionStorage.setItem('b', 200)
sessionStorage.getItem('b')
```

不会随着 http 请求被发送出去，如果是 5M 都随便发的话那就麻烦了。你如果是自己实现一个类似于存储缓存的一个功能的话，其实也是有一个 get 有一个 set 就可以了，别的基本上用处不是很大。

localStorage 和 sessionStorage 的区别：

* localStorage 的数据会永久存储，除非使用代码或手动删除。
* sessionStorage 的数据只存在于当前会话，当前会话就是当前你和服务端的一个连接，比如说浏览器关闭的时候它会清空，sessionStorage 类似于服务端的一个 session。session 是和登录和用户验证有关系的。sessionStorage 它会存在于用户活跃的这段时间，如果用户关闭浏览器走了，不再访问这个网站了，它就会自动清空了。
* 用的话一般用 localStorage 会更多一些。

