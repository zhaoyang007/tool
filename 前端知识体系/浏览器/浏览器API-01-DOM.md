## 浏览器 DOM API

文档对象模型：顾名思义，文档对象模型是用来描述文档，这里的文档，是特指 HTML 文档，同时它又是一个“对象模型”，这意味着它使用的是对象这样的概念来描述 HTML 文档。

HTML 文档是一个由标签嵌套而成的树形结构，因此，DOM 也是使用树形的对象模型来描述一个 HTML 文档。

DOM API 大致会包含 4 个部分：

* 节点：DOM 树形结构中的节点相关 API。
* 事件：触发和监听事件相关 API。
* Range：操作文字范围相关 API。
* 遍历：遍历 DOM 需要的 API。



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

DocumentFragment 也非常有用，它常常被用来高性能地批量添加节点。因为 Comment、DocumentType 和 ProcessingInstruction 很少需要运行时去修改和操作，所以有所了解即可。

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

到此为止，Node 提供的 API 已经可以很方便地对树进行增、删、遍历等操作了。

##### 除此之外，Node 还提供了一些高级 API。

* compareDocumentPosition 是一个用于比较两个节点中关系的函数。
* contains 检查一个节点是否包含另一个节点的函数。
* isEqualNode 检查两个节点是否完全相同。
* isSameNode 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用“===”。
* cloneNode 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。

##### 创建 DOM 节点

DOM 标准规定了节点必须从文档的 create 方法创建出来，不能够使用原生的 JavaScript 的 new 运算。这些方法都是用于创建对应的节点类型。

* createElement
* createTextNode
* createCDATASection
* createComment
* createProcessingInstruction
* createDocumentFragment
* createDocumentType

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

自定义事件的代码示例如下（来自 MDN）：

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
