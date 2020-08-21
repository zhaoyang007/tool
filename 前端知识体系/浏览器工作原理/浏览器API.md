## 浏览器 DOM API

首先我们先来讲一讲什么叫做文档对象模型。

顾名思义，文档对象模型是用来描述文档，这里的文档，是特指 HTML 文档（也用于 XML 文档，但是本课不讨论 XML）。同时它又是一个“对象模型”，这意味着它使用的是对象这样的概念来描述 HTML 文档。

说起 HTML 文档，这是大家最熟悉的东西了，我们都知道，HTML 文档是一个由标签嵌套而成的树形结构，因此，DOM 也是使用树形的对象模型来描述一个 HTML 文档。

DOM API 大致会包含 4 个部分。

* 节点：DOM 树形结构中的节点相关 API。
* 事件：触发和监听事件相关 API。
* Range：操作文字范围相关 API。
* 遍历：遍历 DOM 需要的 API。

DOM API 数量很多，我希望给你提供一个理解 DOM API 设计的思路，避免单靠机械的方式去死记硬背。

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

Node 是 DOM 树继承关系的根节点，它定义了 DOM 节点在 DOM 树上的操作，首先，Node 提供了一组属性，来表示它在 DOM 树中的关系，它们是：

* parentNode
* childNodes
* firstChild
* lastChild
* nextSibling
* previousSibling

从命名上，我们可以很清晰地看出，这一组属性提供了前、后、父、子关系，有了这几个属性，我们可以很方便地根据相对位置获取元素。当然，Node 中也提供了操作 DOM 树的 API，主要有下面几种。

* appendChild
* insertBefore
* removeChild
* replaceChild

这个命名跟上面一样，我们基本可以知道 API 的作用。这几个 API 的设计可以说是饱受诟病。其中最主要的批评是它不对称——只有 before，没有 after，而 jQuery 等框架都对其做了补充。

实际上，appendChild 和 insertBefore 的这个设计，是一个“最小原则”的设计，这两个 API 是满足插入任意位置的必要 API，而 insertAfter，则可以由这两个 API 实现出来。

我个人其实不太喜欢这个设计，对我而言，insertAt(pos) 更符合审美一些。当然，不论喜不喜欢，这个标准已经确定，我们还是必须要掌握它。

这里从设计的角度还想要谈一点，那就是，所有这几个修改型的 API，全都是在父元素上操作的，比如我们要想实现“删除一个元素的上一个元素”，必须要先用 parentNode 获取其父元素。

这样的设计是符合面向对象的基本原则的。还记得我们在 JavaScript 对象部分讲的对象基本特征吗？“拥有哪些子元素”是父元素的一种状态，所以修改状态，应该是父元素的行为。这个设计我认为是 DOM API 中好的部分。

到此为止，Node 提供的 API 已经可以很方便（大概吧）地对树进行增、删、遍历等操作了。

除此之外，Node 还提供了一些高级 API，我们来认识一下它们。

* compareDocumentPosition 是一个用于比较两个节点中关系的函数。
* contains 检查一个节点是否包含另一个节点的函数。
* isEqualNode 检查两个节点是否完全相同。
* isSameNode 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用“===”。
* cloneNode 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。

DOM 标准规定了节点必须从文档的 create 方法创建出来，不能够使用原生的 JavaScript 的 new 运算。于是 document 对象有这些方法。

* createElement
* createTextNode
* createCDATASection
* createComment
* createProcessingInstruction
* createDocumentFragment
* createDocumentType

上面的这些方法都是用于创建对应的节点类型。你可以自己尝试一下。

#### Element 与 Attribute

Node 提供了树形结构上节点相关的操作。而大部分时候，我们比较关注的是元素。Element 表示元素，它是 Node 的子类。

元素对应了 HTML 中的标签，它既有子节点，又有属性。所以 Element 子类中，有一系列操作属性的方法。

我们需要注意，对 DOM 而言，Attribute 和 Property 是完全不同的含义，只有特性场景下，两者才会互相关联。

首先，我们可以把元素的 Attribute 当作字符串来看待，这样就有以下的 API：

* getAttribute
* setAttribute
* removeAttribute
* hasAttribute

如果你追求极致的性能，还可以把 Attribute 当作节点：

* getAttributeNode
* setAttributeNode

此外，如果你喜欢 property 一样的访问 attribute，还可以使用 attributes 对象，比如 document.body.attributes.class = “a” 等效于 document.body.setAttribute(“class”, “a”)。

#### 查找元素

document 节点提供了查找元素的能力。比如有下面的几种。

* querySelector
* querySelectorAll
* getElementById
* getElementsByName
* getElementsByTagName
* getElementsByClassName

我们需要注意，getElementById、getElementsByName、getElementsByTagName、getElementsByClassName，这几个 API 的性能高于 querySelector。

而 getElementsByName、getElementsByTagName、getElementsByClassName 获取的集合并非数组，而是一个能够动态更新的集合。

我们看一个例子：

```js
var collection = document.getElementsByClassName('winter');
console.log(collection.length);
var winter = document.createElement('div');
winter.setAttribute('class', 'winter')
document.documentElement.appendChild(winter)
console.log(collection.length);
```

在这段代码中，我们先获取了页面的 className 为 winter 的元素集合，不出意外的话，应该是空。

我们通过 console.log 可以看到集合的大小为 0。之后我们添加了一个 class 为 winter 的 div，这时候我们再看集合，可以发现，集合中出现了新添加的元素。

这说明浏览器内部是有高速的索引机制，来动态更新这样的集合的。所以，尽管 querySelector 系列的 API 非常强大，我们还是应该尽量使用 getElement 系列的 API。

### 事件

#### 事件概述

在开始接触具体的 API 之前，我们要先了解一下事件。一般来说，事件来自输入设备，我们平时的个人设备上，输入设备有三种：

* 键盘；
* 鼠标；
* 触摸屏。

**这其中，触摸屏和鼠标又有一定的共性，它们被称作 pointer 设备，所谓 pointer 设备，是指它的输入最终会被抽象成屏幕上面的一个点。**但是触摸屏和鼠标又有一定区别，它们的精度、反应时间和支持的点的数量都不一样。

我们现代的 UI 系统，都源自 WIMP 系统。WIMP 即 Window Icon Menu Pointer 四个要素，它最初由施乐公司研发，后来被微软和苹果两家公司应用在了自己的操作系统上。

WIMP 是如此成功，以至于今天很多的前端工程师会有一个观点，认为我们能够“点击一个按钮”，实际上并非如此，我们只能够点击鼠标上的按钮或者触摸屏，是操作系统和浏览器把这个信息对应到了一个逻辑上的按钮，再使得它的视图对点击事件有反应。这就引出了我们第一个要讲解的机制：捕获与冒泡。

#### 捕获与冒泡

很多文章会讲到捕获过程是从外向内，冒泡过程是从内向外，但是这里我希望讲清楚，为什么会有捕获过程和冒泡过程。

我们刚提到，实际上点击事件来自触摸屏或者鼠标，鼠标点击并没有位置信息，但是一般操作系统会根据位移的累积计算出来，跟触摸屏一样，提供一个坐标给浏览器。

那么，把这个坐标转换为具体的元素上事件的过程，就是捕获过程了。而冒泡过程，则是符合人类理解逻辑的：当你按电视机开关时，你也按到了电视机。

所以我们可以认为，捕获是计算机处理事件的逻辑，而冒泡是人类处理事件的逻辑。

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

在我们实际监听事件时，我建议这样使用冒泡和捕获机制：默认使用冒泡模式，当开发组件时，遇到需要父元素控制子元素的行为，可以使用捕获机制。

理解了冒泡和捕获的过程，我们再看监听事件的 API，就非常容易理解了。

addEventListener 有三个参数：

* 事件名称；
* 事件处理函数；
* 捕获还是冒泡。

事件处理函数不一定是函数，也可以是个 JavaScript 具有 handleEvent 方法的对象，看下例子：

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

实际使用，在现代浏览器中，还可以不传第三个参数，我建议默认不传第三个参数，因为我认为冒泡是符合正常的人类心智模型的，大部分业务开发者不需要关心捕获过程。除非你是组件或者库的使用者，那就总是需要关心冒泡和捕获了。

##### 事件代理

事件代理是基于事件冒泡做的。有了事件冒泡这个机制，我们才能在这个机制的基础上去实现事件代理，所谓代理就是因为数量太多或结果比较复杂，不好去挨个都去绑定事件，所以把事件绑到某一个父元素上，在事件里判断是不是我们想要触发事件的那个元素，再去做一些其他的动作。

#### 焦点

我们讲完了 pointer 事件是由坐标控制，而我们还没有讲到键盘事件。

键盘事件是由焦点系统控制的，一般来说，操作系统也会提供一套焦点系统，但是现代浏览器一般都选择在自己的系统内覆盖原本的焦点系统。

焦点系统也是视障用户访问的重要入口，所以设计合理的焦点系统是非常重要的产品需求，尤其是不少国家对可访问性有明确的法律要求。

在旧时代，有一个经典的问题是如何去掉输入框上的虚线框，这个虚线框就是 Windows 焦点系统附带的 UI 表现。

现在 Windows 的焦点已经不是用虚线框表示了，但是焦点系统的设计几十年间没有太大变化。

焦点系统认为整个 UI 系统中，有且仅有一个“聚焦”的元素，所有的键盘事件的目标元素都是这个聚焦元素。

Tab 键被用来切换到下一个可聚焦的元素，焦点系统占用了 Tab 键，但是可以用 JavaScript 来阻止这个行为。

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

注意，这里旧的自定义事件方法（使用 document.createEvent 和 initEvent）已经被废弃。

#### 总结

今天这一节课，我们讲了浏览器中的事件。

我们分别介绍了事件的捕获与冒泡机制、焦点机制和自定义事件。

捕获与冒泡机制来自 pointer 设备输入的处理，捕获是计算机处理输入的逻辑，冒泡是人类理解事件的思维，捕获总是在冒泡之前发生。

焦点机制则来自操作系统的思路，用于处理键盘事件。除了我们讲到的这些，随着输入设备的不断丰富，还有很多新的事件加入，如 Geolocation 和陀螺仪等。

最后给你留个小问题。请你找出你所知道的所有事件类型，和它们的目标元素类型。

### 遍历

前面已经提到过，通过 Node 的相关属性，我们可以用 JavaScript 遍历整个树。实际上，DOM API 中还提供了 NodeIterator 和 TreeWalker 来遍历树。

比起直接用属性来遍历，NodeIterator 和 TreeWalker 提供了过滤功能，还可以把属性节点也包含在遍历之内。

总的来说，我个人不太喜欢 TreeWalker 和 NodeIterator 这两个 API，建议需要遍历 DOM 的时候，直接使用递归和 Node 的属性。

### Range

Range API 是一个比较专业的领域，如果不做富文本编辑类的业务，不需要太深入。这里我们就仅介绍概念和给出基本用法的示例，你只要掌握即可。

Range API 表示一个 HTML 上的范围，这个范围是以文字为最小单位的，所以 Range 不一定包含完整的节点，它可能是 Text 节点中的一段，也可以是头尾两个 Text 的一部分加上中间的元素。

我们通过 Range API 可以比节点 API 更精确地操作 DOM 树，凡是 节点 API 能做到的，Range API 都可以做到，而且可以做到更高性能，但是 Range API 使用起来比较麻烦，所以在实际项目中，并不常用，只有做底层框架和富文本编辑对它有强需求。



## 浏览器 CSSOM API

DOM 中的所有的属性都是用来表现语义的属性，CSSOM 的则都是表现的属性，width 和 height 这类显示相关的属性，都属于我们今天要讲的 CSSOM。

顾名思义，CSSOM 是 CSS 的对象模型，在 W3C 标准中，它包含两个部分：描述样式表和规则等 CSS 的模型部分（CSSOM），和跟元素视图相关的 View 部分（CSSOM View）。

在实际使用中，CSSOM View 比 CSSOM 更常用一些，因为我们很少需要用代码去动态地管理样式表。

### CSSOM

首先我们来介绍下 CSS 中样式表的模型，也就是 CSSOM 的本体。

我们通常创建样式表也都是使用 HTML 标签来做到的，我们用 style 标签和 link 标签创建样式表，例如：

```html
<style title="Hello">
  a {
    color:red;
  }
</style>
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">
```

我们创建好样式表后，还有可能要对它进行一些操作。如果我们以 DOM 的角度去理解的话，这些标签在 DOM 中是一个节点，它们有节点的内容、属性，这两个标签中，CSS 代码有的在属性、有的在子节点。这两个标签也遵循 DOM 节点的操作规则，所以可以使用 DOM API 去访问。

但是，这样做的后果是我们需要去写很多分支逻辑，并且，要想解析 CSS 代码结构也不是一件简单的事情，所以，这种情况下，我们直接使用 CSSOM API 去操作它们生成的样式表，这是一个更好的选择。

我们首先了解一下 CSSOM API 的基本用法，一般来说，我们需要先获取文档中所有的样式表：

```js
document.styleSheets
```

document 的 styleSheets 属性表示文档中的所有样式表，这是一个只读的列表，我们可以用方括号运算符下标访问样式表，也可以使用 item 方法来访问，它有 length 属性表示文档中的样式表数量。样式表只能使用 style 标签或者 link 标签创建（对 XML 来说，还可以使用，咱们暂且不表）。我们虽然无法用 CSSOM API 来创建样式表，但是我们可以修改样式表中的内容。

样式表只能使用 style 标签或者 link 标签创建（对 XML 来说，还可以使用，咱们暂且不表）。

此外，CSSOM 还提供了一个非常重要的方法，来获取一个元素最终经过 CSS 计算得到的属性：

```js
window.getComputedStyle(elt, pseudoElt);
```

其中第一个参数就是我们要获取属性的元素，第二个参数是可选的，用于选择伪元素。

### CSSOM View

CSSOM View 这一部分的 API，可以视为 DOM API 的扩展，它在原本的 Element 接口上，添加了显示相关的功能，这些功能，又可以分成三个部分：窗口部分，滚动部分和布局部分，下面我来分别带你了解一下。

#### 窗口 API

窗口 API 用于操作浏览器窗口的位置、尺寸等。

* moveTo(x, y) 窗口移动到屏幕的特定坐标；
* moveBy(x, y) 窗口移动特定距离；
* resizeTo(x, y) 改变窗口大小到特定尺寸；
* resizeBy(x, y) 改变窗口大小特定尺寸。

此外，窗口 API 还规定了 window.open() 的第三个参数：

```js
window.open("about:blank", "_blank" ,"width=100,height=100,left=100,right=100" )
```

一些浏览器出于安全考虑没有实现，也不适用于移动端浏览器，这部分你仅需简单了解即可。下面我们来了解一下滚动 API。

#### 滚动 API

要想理解滚动，首先我们必须要建立一个概念，在 PC 时代，浏览器可视区域的滚动和内部元素的滚动关系是比较模糊的，但是在移动端越来越重要的今天，两者必须分开看待，两者的性能和行为都有区别。

##### 视口滚动 API

可视区域（视口）滚动行为由 window 对象上的一组 API 控制，我们先来了解一下：

* scrollX 是视口的属性，表示 X 方向上的当前滚动距离，有别名 pageXOffset；
* scrollY 是视口的属性，表示 Y 方向上的当前滚动距离，有别名 pageYOffset；
* scroll(x, y) 使得页面滚动到特定的位置，有别名 scrollTo，支持传入配置型参数 {top, left}；
* scrollBy(x, y) 使得页面滚动特定的距离，支持传入配置型参数 {top, left}。

通过这些属性和方法，我们可以读取视口的滚动位置和操纵视口滚动。不过，要想监听视口滚动事件，我们需要在 document 对象上绑定事件监听函数：

```js
document.addEventListener("scroll", function(event){
  //......
})
```

视口滚动 API 是页面的顶层容器的滚动，大部分移动端浏览器都会采用一些性能优化，它和元素滚动不完全一样，请大家一定建立这个区分的意识。

##### 元素滚动 API

接下来我们来认识一下元素滚动 API，在 Element 类（参见 DOM 部分），为了支持滚动，加入了以下 API。

* scrollTop 元素的属性，表示 Y 方向上的当前滚动距离。
* scrollLeft 元素的属性，表示 X 方向上的当前滚动距离。
* scrollWidth 元素的属性，表示元素内部的滚动内容的宽度，一般来说会大于等于元素宽度。
* scrollHeight 元素的属性，表示元素内部的滚动内容的高度，一般来说会大于等于元素高度。
* scroll(x, y) 使得元素滚动到特定的位置，有别名 scrollTo，支持传入配置型参数 {top, left}。
* scrollBy(x, y) 使得元素滚动到特定的位置，支持传入配置型参数 {top, left}。
* scrollIntoView(arg) 滚动元素所在的父元素，使得元素滚动到可见区域，可以通过 arg 来指定滚到中间、开始或者就近。

除此之外，可滚动的元素也支持 scroll 事件，我们在元素上监听它的事件即可：

```js
element.addEventListener("scroll", function(event){
  //......
})
```

这里你需要注意一点，元素部分的 API 设计与视口滚动命名风格上略有差异，你在使用的时候不要记混。

#### 布局 API

最后我们来介绍一下布局 API，这是整个 CSSOM 中最常用到的部分，我们同样要分成全局 API 和元素上的 API。

##### 全局尺寸信息

window 对象上提供了一些全局的尺寸信息，它是通过属性来提供的，我们一起来了解一下来这些属性。

![全局尺寸信息](/Users/zhaoyang/tool/images/前端知识体系/浏览器工作原理/全局尺寸信息.png)

* window.innerHeight, window.innerWidth 这两个属性表示视口的大小。
* window.outerWidth, window.outerHeight 这两个属性表示浏览器窗口占据的大小，很多浏览器没有实现，一般来说这两个属性无关紧要。
* window.devicePixelRatio 这个属性非常重要，表示物理像素和 CSS 像素单位的倍率关系，Retina 屏这个值是 2，后来也出现了一些 3 倍的 Android 屏。
* window.screen （屏幕尺寸相关的信息）
  * window.screen.width, window.screen.height 设备的屏幕尺寸。
  * window.screen.availWidth, window.screen.availHeight 设备屏幕的可渲染区域尺寸，一些 Android 机器会把屏幕的一部分预留做固定按钮，所以有这两个属性，实际上一般浏览器不会实现的这么细致。
  * window.screen.colorDepth, window.screen.pixelDepth 这两个属性是固定值 24，应该是为了以后预留。

虽然 window 有这么多相关信息，在我看来，我们主要使用的是 innerHeight、innerWidth 和 devicePixelRatio 三个属性，因为我们前端开发工作只需要跟视口打交道，其它信息大概了解即可。

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



## 手动整理浏览器全部 API

浏览器的 API 数目繁多，我们在之前，已经一起学习了其中几个比较有体系的部分：比如之前讲到过的 DOM 和 CSSOM 等等。但是，如果你留意过，会发现我们讲到的 API 仍然是标准中非常小的一部分。

所以这一节课，我设计了一个实验，我们一起来给 API 分分类。

我们按照每个 API 所在的标准来分类。所以，我们用代码来反射浏览器环境中全局对象的属性，然后我们用 JavaScript 的 filter 方法来逐步过滤掉已知的属性。

接下来，我们整理 API 的方法如下：

* 从 Window 的属性中，找到 API 名称；
* 查阅 MDN 或者 Google，找到 API 所在的标准；
* 阅读标准，手工或者用代码整理出标准中包含的 API；
* 用代码在 Window 的属性中过滤掉标准中涉及的 API。

重复这个过程，我们可以找到所有的 API 对应的标准。首先我们先把前面已经讲过的 API 过滤掉。

大部分的 API 属于 Window 对象（或者说全局对象），我们可以用反射来看一看现行浏览器中已经实现的 API。，我这里使用 Mac 下的 Chrome 83.0.4103.61 版本。

我们首先调用 Object.getOwnPropertyNames(window)。在我的环境中，可以看到，共有 1085 个属性。

### JavaScript 中规定的 API

这里包含了 JavaScript 标准规定的属性，我们做一下过滤：

```js
{
    let js = new Set();
    let objects = ["BigInt", "BigInt64Array", "BigUint64Array", "Infinity", "NaN", "undefined", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Array", "Date", "RegExp", "Promise", "Proxy", "Map", "WeakMap", "Set", "WeakSet", "Function", "Boolean", "String", "Number", "Symbol", "Object", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint16Array", "Uint32Array", "Uint8ClampedArray", "Atomics", "JSON", "Math", "Reflect", "escape", "unescape"];
    objects.forEach(o => js.add(o));
    let names = Object.getOwnPropertyNames(window)
    names = names.filter(e => !js.has(e));
}
```

这一部分我们已经在 JavaScript 部分讲解过了（JavaScript 对象：你知道全部的对象分类吗），所以这里我就采用手工的方式过滤出来。

### DOM 中的元素构造器

接下来我们看看已经讲过的 DOM 部分，DOM 部分包含了 document 属性和一系列的构造器，我们可以用 JavaScript 的 prototype 来过滤构造器。

```js
names = names.filter( e => {
  try { 
    return !(window[e].prototype instanceof Node)
  } catch(err) {
    return true;
  }
}).filter( e => e != "Node")
```

这里我们把所有 Node 的子类都过滤掉，再把 Node 本身也过滤掉，这是非常大的一批了。

### Window 对象上的属性

接下来我们要找到 Window 对象的定义，我们在下面链接中可以找到。

* https://html.spec.whatwg.org/#window

这里有一个 Window 接口，是使用 WebIDL 定义的，我们手工把其中的函数和属性整理出来，如下：

```js
window,self,document,name,location,history,customElements,locationbar,menubar,personalbar,scrollbars,statusbar,toolbar,status,close,closed,stop,focus,blur,frames,length,top,opener,parent,frameElement,open,navigator,applicationCache,alert,confirm,prompt,print,postMessage
```

接下来，我们编写代码，把这些函数和属性，从浏览器 Window 对象的属性中去掉，JavaScript 代码如下：

```js
{
    let names = Object.getOwnPropertyNames(window)
    let js = new Set();
    let objects = ["BigInt", "BigInt64Array", "BigUint64Array", "Infinity", "NaN", "undefined", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Array", "Date", "RegExp", "Promise", "Proxy", "Map", "WeakMap", "Set", "WeakSet", "Function", "Boolean", "String", "Number", "Symbol", "Object", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint16Array", "Uint32Array", "Uint8ClampedArray", "Atomics", "JSON", "Math", "Reflect", "escape", "unescape"];
    objects.forEach(o => js.add(o));
    names = names.filter(e => !js.has(e));

    names = names.filter( e => {
        try { 
            return !(window[e].prototype instanceof Node)
        } catch(err) {
            return true;
        }
    }).filter( e => e != "Node")

    let windowprops = new Set();
    objects = ["window", "self", "document", "name", "location", "history", "customElements", "locationbar", "menubar", " personalbar", "scrollbars", "statusbar", "toolbar", "status", "close", "closed", "stop", "focus", " blur", "frames", "length", "top", "opener", "parent", "frameElement", "open", "navigator", "applicationCache", "alert", "confirm", "prompt", "print", "postMessage", "console"];
    objects.forEach(o => windowprops.add(o));
    names = names.filter(e => !windowprops.has(e));
}
```

我们还要过滤掉所有的事件，也就是 on 开头的属性。

```js
names = names.filter( e => !e.match(/^on/))
```

webkit 前缀的私有属性我们也过滤掉：

```js
names = names.filter( e => !e.match(/^webkit/))
```

除此之外，我们在 HTML 标准中还能找到所有的接口，这些我们也过滤掉：

```js
let interfaces = new Set();
objects = ["ApplicationCache", "AudioTrack", "AudioTrackList", "BarProp", "BeforeUnloadEvent", "BroadcastChannel", "CanvasGradient", "CanvasPattern", "CanvasRenderingContext2D", "CloseEvent", "CustomElementRegistry", "DOMStringList", "DOMStringMap", "DataTransfer", "DataTransferItem", "DataTransferItemList", "DedicatedWorkerGlobalScope", "Document", "DragEvent", "ErrorEvent", "EventSource", "External", "FormDataEvent", "HTMLAllCollection", "HashChangeEvent", "History", "ImageBitmap", "ImageBitmapRenderingContext", "ImageData", "Location", "MediaError", "MessageChannel", "MessageEvent", "MessagePort", "MimeType", "MimeTypeArray", "Navigator", "OffscreenCanvas", "OffscreenCanvasRenderingContext2D", "PageTransitionEvent", "Path2D", "Plugin", "PluginArray", "PopStateEvent", "PromiseRejectionEvent", "RadioNodeList", "SharedWorker", "SharedWorkerGlobalScope", "Storage", "StorageEvent", "TextMetrics", "TextTrack", "TextTrackCue", "TextTrackCueList", "TextTrackList", "TimeRanges", "TrackEvent", "ValidityState", "VideoTrack", "VideoTrackList", "WebSocket", "Window", "Worker", "WorkerGlobalScope", "WorkerLocation", "WorkerNavigator"];
objects.forEach(o => interfaces.add(o));

names = names.filter(e => !interfaces.has(e));

```

这样过滤之后，我们已经过滤掉了所有的事件、Window 对象、JavaScript 全局对象和 DOM 相关的属性，但是，竟然还剩余了很多属性！你是不是很惊讶呢？好了，接下来我们才进入今天的正题。

### 其它属性

这些既不属于 Window 对象，又不属于 JavaScript 语言的 Global 对象的属性，它们究竟是什么呢？

我们可以一个一个来查看这些属性，来发现一些我们以前没有关注过的标准。

首先，我们要把过滤的代码做一下抽象，写成一个函数：

```js
function filterOut(names, props) {
    let set = new Set();
    props.forEach(o => set.add(o));
    return names.filter(e => !set.has(e));
}
```

每次执行完 filter 函数，都会剩下一些属性，接下来，我们找到剩下的属性来看一看。

查找这些属性来历的最佳文档是 MDN，当然，你也可以使用 Google。

#### ECMAScript 2018 Internationalization API

* http://www.ecma-international.org/ecma-402/5.0/index.html#Title

```js
names = names.filter(e => e != "Intl")
```

#### Streams 标准

* https://streams.spec.whatwg.org/#blqs-class

```js
names = filterOut(names, ["ReadableStream", "ReadableStreamDefaultReader", "ReadableStreamBYOBReader", "ReadableStreamDefaultController", "ReadableByteStreamController", "ReadableStreamBYOBRequest", "WritableStream", "WritableStreamDefaultWriter", "WritableStreamDefaultController", "TransformStream", "TransformStreamDefaultController", "ByteLengthQueuingStrategy", "CountQueuingStrategy"]);
```

#### WebGL

* https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15

```js
names = filterOut(names, ["WebGLContextEvent","WebGLObject", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLTexture", "WebGLUniformLocation", "WebGLActiveInfo", "WebGLShaderPrecisionFormat", "WebGLRenderingContext", "WebGLVertexArrayObject", "WebGLTransformFeedback", "WebGLSync", "WebGLSampler", "WebGLQuery", "WebGL2RenderingContext"]);
```

#### Web Audio API

* https://www.w3.org/TR/webaudio/

```js
names = filterOut(names, ["AudioContext", "AudioNode", "AnalyserNode", "AudioBuffer", "AudioBufferSourceNode", "AudioDestinationNode", "AudioParam", "AudioListener", "AudioWorklet", "AudioWorkletGlobalScope", "AudioWorkletNode", "AudioWorkletProcessor", "BiquadFilterNode", "ChannelMergerNode", "ChannelSplitterNode", "ConstantSourceNode", "ConvolverNode", "DelayNode", "DynamicsCompressorNode", "GainNode", "IIRFilterNode", "MediaElementAudioSourceNode", "MediaStreamAudioSourceNode", "MediaStreamTrackAudioSourceNode", "MediaStreamAudioDestinationNode", "PannerNode", "PeriodicWave", "OscillatorNode", "StereoPannerNode", "WaveShaperNode", "ScriptProcessorNode", "AudioProcessingEvent"]);
```

* https://webaudio.github.io/web-audio-api/

```js
names = filterOut(names, ["OfflineAudioContext", "OfflineAudioCompletionEvent", "BaseAudioContext", "AudioScheduledSourceNode"]);
```

#### Encoding 标准

* https://encoding.spec.whatwg.org/#dom-textencoder

```js
names = filterOut(names, ["TextDecoder", "TextEncoder", "TextDecoderStream", "TextEncoderStream"]);
```

#### Web Background Synchronization

这个属性比较特殊，它并没有被标准化

* https://wicg.github.io/BackgroundSync/spec/#sync-manager-interface

```js
names = names.filter(e => e != "SyncManager")
```

#### Web Cryptography API

* https://www.w3.org/TR/WebCryptoAPI/

```js
names = filterOut(names, ["CryptoKey", "SubtleCrypto", "Crypto", "crypto"]);
```

#### Media Source Extensions

* https://www.w3.org/TR/media-source/

```js
names = filterOut(names, ["MediaSource", "SourceBuffer", "SourceBufferList"]);
```

#### The Screen Orientation API

* https://www.w3.org/TR/screen-orientation/

```js
names = names.filter(e => e != "ScreenOrientation")
```

### 结语

我们可以看到，在整理 API 的过程中，我们可以找到各种不同组织的标准，比如：

* ECMA402 标准来自 ECMA；
* Encoding 标准来自 WHATWG；
* WebGL 标准来自 Khronos；
* Web Cryptography 标准来自 W3C；
* 还有些 API，根本没有被标准化。

浏览器环境的 API，正是这样复杂的环境。我们平时编程面对的环境也是这样的一个环境。

所以，面对如此繁复的 API，我建议在系统掌握 DOM、CSSOM 的基础上，你可以仅仅做大概的浏览和记忆，根据实际工作需要，选择其中几个来深入学习。

做完这个实验，你对 Web API 的理解应该会有很大提升。

完成所有的 API 到标准的归类，不同的浏览器环境应该略有不同。



## BOM

### location

地址的一些信息，分析拆解 url 的各个部分。

整个的网址都是通过这些信息拼接出来的。

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



## 存储

### cookie

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

但是 cookie 当时的设计并不是为了做本地存储，它是为了浏览器和服务端进行通讯，它只是被借用来做本地存储，它本来不是干这个活的，所以用它来做本地存储肯定会有一些问题。

cookie的缺点：

* 存储大小，cookie 是有存储大小限制的，最大存4kb，超过了4kb，就存不下了，为什么有这个限制呢，因为在发送请求的时候，是要把 cookie 带上的。如果 cookie 的内容很多。每次请求都带上 cookie，会严重影响每次的请求。
* cookie 回跟随 http 请求发送出去，你存什么东西，每次请求都会带到服务器上去，增加请求的数据量，请求会变慢一些。
* 只能用 document.cookie = '' 这种方式来修改，这种 api 太过简陋也太不好理解。

### localStorage sessionStorage

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
* sessionStorage 的数据只存在于当前会话，当前会话就是当前你和服务端的一个连接，比如说浏览器关闭的时候它会清空，sessionStorage 类似于服务端的一个 session。session 是和登录和用户验证有关系的。sessionStorage 它会存在于用户活跃的这段事件，如果用户关闭浏览器走了，不再访问这个网站了，它就会自动清空了。
* 用的话一般用 localStorage 会更多一些。











## DOM

#### attribute

获取节点之后，我们可以操作它的 attribute。

我们可以通过 getAttribute 和 setAttribute 这样的 api 去直接修改这个 html 的结构，它是能真正作用到 dom 结构里面去的，它是修改标签的一个属性。

```js
const pList = document.querySelectorAll('p')
const p = pList[0]

p.getAttribute('data-name')
p.setAttribute('data-name', 'imooc')
p.getAttribute('style')
p.setAttribute('style', 'font-size: 30px;')
```

#### property

property 是通过 js 对象属性的形式来去操作 dom 里面的一些东西。property 本身不是一个 api 的名字。它是一种通过修改或获取js的属性的方式来去改变页面样式或页面渲染结构的一种形式。

我们可以对这个属性进行设置和获取，读和写都可以。设置完了之后它真正的渲染到了页面上。

property 修改的是 js 变量的属性，不会对标签产生影响。attribute 它修改的是标签的属性，设置上之后，标签上就会有这个属性。两者都有可能引起 dom 的重新渲染。

平常建议尽量用 property 去操作，因为 property 可能会在 js 的一些机制中去重复，避免一些 dom 不必要的渲染。attribute 你一旦改了这个 html 结构，它肯定引起重新渲染。dom 的重新渲染是比较耗费性能的。如果必须要修改标签结构的话当然也要用 attribute。 

```js
const pList = document.querySelectorAll('p')
const p = pList[0]

p.style.width // 获取样式
p.style.width = '100px' // 修改样式
p.className // 获取class
p.className = 'p1' // 修改class
p.nodeName // 获取nodename
p.nodeType // 获取nodeType
```



## 事件

### 编写通用事件监听函数

```js
function bindEvent (elem, type, fn) {
  elem.addEventListener(type, fn)
}

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



## ajax

### XMLHttpRequest

网页实现 ajax 最核心的一个 api。

### ajax 基本工作过程

xhr.readyState 等于 4 的时候才说明 ajax 请求成功了，其他需要判断的东西只有 xhr.status 也就是 http 状态码了。比如
网络断开的情况下 xhr 不可能等于 4，所以前端 ajax 请求的业务逻辑中根本就不用判断类似断网的这种情况。

#### get 请求

```js
const xhr = new XMLHttpRequest()
xhr.open('GET', '/api', true)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      alert(xhr.responseText) // 返回的信息是字符串
    } else {
      console.log('其他情况')
    }
  }
}
xhr.send()
```

post 请求

```js
const xhr = new XMLHttpRequest()
xhr.open('POST', '/api', true)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      alert(xhr.responseText) // 返回的信息是字符串
    } else {
      console.log('其他情况')
    }
  }
}
const postData = {
  username: 'zhangsan',
  password: 'xxx'
}
// 使发送的数据也是字符串
xhr.send(JSON.stringifypost(Data))
```

#### 手写一个简易的 ajax

```js
// 回调函数版
function ajax (url, method, successFn, errorFn) {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successFn(
          JSON.parse(xhr.responseText)
        )
      } else if (xhr.status === 404) {
        errorFn(new Error('404 not found'))
      }
    }
  }
  xhr.send()
}
```

```js
// promise版
function ajax (url, method) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(
            JSON.parse(xhr.responseText)
          )
        } else if (xhr.status === 404) {
          reject(new Error('404 not found'))
        }
      }
    }
    xhr.send()
  })
  return p
}

const url = '/data/test.json'
const method = 'GET'
ajax(url, method)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
```



## 跨域

### 什么是跨域

#### 同源策略

ajax 请求的时候，浏览器要求当前网页和 server 必须同源（安全）。在服务端或非浏览器的环境下是可以请求的。这个同源策略是浏览器要求的。

#### 同源

对于一个 url 来说，前端页面和 server 端做对比，协议、域名、端口，三者必须一致。

#### 加载图片，css，js 可无视同源策略

同源策略第一个条件就是 ajax 请求，如果不是 ajax 请求，比如说图片，css，js 等文件的加载可无视同源策略，它们的地址都可以跨域，浏览器不会限制。

```html
<img src="跨域的图片地址" />
<link href="跨域的css地址" />
<script src="跨域的js地址"></script>
```

应用：

图片，css，js 可以无视同源策略可以实现跨域，它们都是有一定的功能的，浏览器也是为了它们有一定功能做了一些考虑的，并不是这三个平白无故的就实现了跨域的。

1.\<img/>

图片可用于统计打点。统计可能是使用第三方统计服务，比如站长之家，百度统计等，这些都是外域的，统计打点无非就是发一个请求嘛，这个时候如果我们用 ajax 发的话那就出现跨域，那就不好解决了。所以说我们用图片，去初始化一个图片，然后把图片的地址写成第三方统计服务的地址，然后在地址里面写上我们各种各样需要的参数，通过图片去发这个请求，就不会出现跨域的问题。 

2.\<link/> \<script>

\<link /> \<script> 可以使用 cdn，cdn 一般都是外域。

3.\<script> 可以实现 jsonp

jsonp 是前端实现跨域一个比较常用的方案。

#### 跨域

所有的跨域，都必须经过 server 端允许和配合。

如果未经 server 端允许就实现的跨域，说明浏览器有漏洞，是一个危险信号。

### 跨域解决方案

#### Jsonp

我们先看一个问题，浏览器随便访问一个网址，服务端返回的一定是一个 html 文件吗。服务端拿到这个网址 url 之后分析，获取这个请求文件的内容，然后把文件内容返回，其实服务端不一定返回一个 html 文件的内容，服务端可以动态拼接任何的数据内容返回，只要符合相应文件的格式要求，同理 script 去访问一个 js 地址，也不一定就返回一个 js 静态文件。

##### Jsonp 原理

* \<script> 可以绕过跨域限制
* 服务端可以拼接任意动态数据返回
* 所以就可以通过 \<script> 获得跨域的数据，只要服务端愿意返回

##### jsonp 简易 demo

```html
<script>
  window.callback = function (data) {
    // 这是我们跨域接收的信息
    console.log(data)
  }
</script>

<!-- 这个script将返回 callback({x: 100, y: 200}) -->
<script src="https://imooc.com/getData.js?cb=callback&id=123"></script>
```

#### cors

服务端支持的一种解决跨域的方式，是纯服务器端的操作。

cors 其实是一个统称，就是服务器端可以设置 http header，在服务端 response 返回的时候可以设置 header，如下面这些东西。

```js
response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081') // 允许的域名是什么 
response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')     // 允许的headers是什么 
response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS') // 允许的methods是什么 
response.setHeader('Access-Control-Allow-Credentials', 'true') // 接收跨域的cookie，是否允许传cookie
```





