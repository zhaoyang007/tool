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

##### 事件

事件来自输入设备，输入设备有三种：

* 键盘
* 鼠标
* 触摸屏

###### 捕获与冒泡

捕获过程是从外向内，冒泡过程是从内向外。

在一个事件发生时，捕获过程跟冒泡过程总是先后发生，跟你是否监听毫无关联。

建议这样使用冒泡和捕获机制：默认使用冒泡模式，当开发组件时，遇到需要父元素控制子元素的行为，可以使用捕获机制。

这是捕获和冒泡发生的完整顺序：

```html
<body>
  <input id="i"/>
</body>

<script>
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
  
// key1
// key2
// key22
// key11
  
</script>
```

addEventListener 三个参数：

* 事件名称
* 事件处理函数
* 捕获还是冒泡

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

###### 事件代理

事件代理是基于事件冒泡做的，在事件冒泡这个机制的基础上去实现事件代理，代理就是因为数量太多或结果比较复杂，不好去挨个都去绑定事件，所以把事件绑到某一个父元素上，在事件里判断是不是我们想要触发事件的那个元素，再去做一些其他的操作。

###### 焦点

浏览器 API 提供了 API 来操作焦点：

其实原本键盘事件不需要捕获过程，但是为了跟 pointer 设备保持一致，也规定了从外向内传播的捕获过程。

```js
document.body.focus()
document.body.blur()
```

###### 事件应用

通用事件监听函数

```js
// 定义
function bindEvent (elem, type, fn) {
  elem.addEventListener(type, fn)
}
// 使用
const btn1 = document.getElementById('btn1')
bindEvent(btn1, 'click', event => {
  console.log(event.target) // 触发事件的目标元素，就是这个btn1这个dom对象
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



### BOM

##### location

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

##### history

前进后退等路由信息

```js
history.back()    // 网页后退
history.forward() // 网页前进
```

##### navigator

##### 存储

###### cookie

cookie 本身是用于浏览器端和 server 端通讯的，也就是 http 请求的一部分。

早期没有专门的本地存储，只能用 cookie 来做本地存储。

cookie api：

cookie是个字符串，中间用分号分割，每一部分都是key=value的形式。

```js
document.cookie = 'key=value;path=path;domain=domain;max-age=max-age-in-seconds;expires=date-in-GMTString-format;secure'
```

每次赋值，相同的key会覆盖，不同key会追加：

```js
document.cookie = 'a=100'
console.log(document.cookie) // 'a=100'
document.cookie = 'b=200'
console.log(document.cookie) // 'a=100; b=200'
document.cookie = 'a=300'
console.log(document.cookie) // 'b=200; a=300'
```

简化`document.cookie` 的获取方法

```js
var docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

// 使用
docCookies.setItem("test0", "Hello world!");
docCookies.setItem("test1", "Unicode test: \u00E0\u00E8\u00EC\u00F2\u00F9", Infinity);
docCookies.setItem("test2", "Hello world!", new Date(2020, 5, 12));
docCookies.setItem("test3", "Hello world!", new Date(2027, 2, 3), "/blog");
docCookies.setItem("test4", "Hello world!", "Sun, 06 Nov 2022 21:43:15 GMT");
docCookies.setItem("test5", "Hello world!", "Tue, 06 Dec 2022 13:11:07 GMT", "/home");
docCookies.setItem("test6", "Hello world!", 150);
docCookies.setItem("test7", "Hello world!", 245, "/content");
docCookies.setItem("test8", "Hello world!", null, null, "example.com");
docCookies.setItem("test9", "Hello world!", null, null, null, true);
docCookies.setItem("test1;=", "Safe character test;=", Infinity);
 
alert(docCookies.keys().join("\n"));
alert(docCookies.getItem("test1"));
alert(docCookies.getItem("test5"));
docCookies.removeItem("test1");
docCookies.removeItem("test5", "/home");
alert(docCookies.getItem("test1"));
alert(docCookies.getItem("test5"));
alert(docCookies.getItem("unexistingCookie"));
alert(docCookies.getItem());
alert(docCookies.getItem("test1;="));
```

###### localStorage sessionStorage

html5 专门为存储设计的，每个 host 域最大可存储 5M，空间更大。

api 简单易用：

```js
localStorage.setItem('a', 100)
localStorage.getItem('a')
localStorage.removeItem('a')
localStorage.clear() // 移除所有
```

localStorage 和 sessionStorage 的区别：

* localStorage 的数据会永久存储，除非使用代码或手动删除。
* sessionStorage 的数据只存在于浏览器当前会话，浏览器页面关闭的时候它会清空。
* localStorage 用的更多一些。
