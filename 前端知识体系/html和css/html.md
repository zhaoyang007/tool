## 目录

* HTML 语义
* HTML 元信息类标签
* HTML 链接
* HTML 替换型元素
* HTML 小实验：用代码分析HTML标准
* HTML 语言：DTD到底是什么？
* HTML·ARIA：可访问性是只给盲人用的特性么？



## HTML 语义

HTML 并不简单，它是典型的“入门容易，精通困难”的一部分知识。深刻理解 HTML 是成为优秀的前端工程师重要的一步。

HTML 的标签可以分为很多种，比如 head 里面的元信息类标签，又比如 img、video、audio 之类的替换型媒体标签。我今天要讲的标签是：语义类标签。

### 语义类标签是什么，使用它有什么好处？

现在我们很多的前端工程师写起代码来，多数都不用复杂的语义标签， 只靠 div 和 span 就能走天下了。

这样做行不行呢？毫无疑问答案是行。那这样做好不好呢？按照正确的套路，我应该说不好，但是在很多情况下，答案其实是好。

我支持在任何“软件界面”的场景中，直接使用 div 和 span。

不过，在很多工作场景里，语义类标签也有它们自己无可替代的优点。正确地使用语义标签可以带来很多好处。

* 语义类标签对开发者更为友好，使用语义类标签增强了可读性，即便是在没有 CSS 的时候，开发者也能够清晰地看出网页的结构，也更为便于团队的开发和维护。
* 除了对人类友好之外，语义类标签也十分适宜机器阅读。它的文字表现力丰富，更适合搜索引擎检索（SEO），也可以让搜索引擎爬虫更好地获取到更多有效信息，有效提升网页的搜索量，并且语义类还可以支持读屏软件，根据文章可以自动生成目录等等。

不过，不恰当地使用语义标签，反而会造成负面作用。

错误地使用语义标签，会给机器阅读造成混淆、增加嵌套，给 CSS 编写加重负担。

所以，对于语义标签，我的态度是：“用对”比“不用”好，“不用”比“用错”好。当然了，我觉得有理想的前端工程师还是应该去追求“用对”它们。

比较重要的语义标签使用场景。

* 自然语言表达能力的补充；
* 文章标题摘要；
* 适合机器阅读的整体结构。

实际上，HTML 这种语言，并不像严谨的编程语言一样，有一条非此即彼的线。一些语义的使用其实会带来争议，所以我的建议是：你可以尽量只用自己熟悉的语义标签，并且只在有把握的场景引入语义标签。这样，我们才能保证语义标签不被滥用，造成更多的问题。



## HTML 元信息类标签

所谓元信息，是指描述自身的信息，元信息类标签，就是 HTML 用于描述文档自身的一类标签，它们通常出现在 head 标签中，一般都不会在页面被显示出来（与此相对，其它标签，如语义类标签，描述的是业务）。

元信息多数情况下是给浏览器、搜索引擎等机器阅读的，有时候这些信息会在页面之外显示给用户，有时候则不会。

### head 标签

head 标签本身并不携带任何信息，它主要是作为盛放其它语义类标签的容器使用。

head 标签规定了自身必须是 html 标签中的第一个标签，它的内容必须包含一个 title，并且最多只能包含一个 base。如果文档作为 iframe，或者有其他方式指定了文档标题时，可以允许不包含 title 标签。

### title 标签

title 标签表示文档的标题。

title 作为元信息，可能会被用在浏览器收藏夹、微信推送卡片、微博等各种场景，这时侯往往是上下文缺失的，所以 title 应该是完整地概括整个网页内容的。

而 h1 则仅仅用于页面展示，它可以默认具有上下文，并且有链接辅助，所以可以简写，即便无法概括全文，也不会有很大的影响。

### base 标签

base 标签实际上是个历史遗留标签。它的作用是给页面上所有的 URL 相对地址提供一个基础。

base 标签最多只有一个，它改变全局的链接地址，它是一个非常危险的标签，容易造成跟 JavaScript 的配合问题，所以在实际开发中，我比较建议你使用 JavaScript 来代替 base 标签。

### meta 标签

meta 标签是一组键值对，它是一种通用的元信息表示标签。

在 head 中可以出现任意多个 meta 标签。一般的 meta 标签由 name 和 content 两个属性来定义。name 表示元信息的名，content 则用于表示元信息的值。

```html
<meta name=application-name content="lsForums">
```

这个标签表示页面所在的 web-application，名为 IsForums。

这里的 name 是一种比较自由的约定，HTTP 标准规定了一些 name 作为大家使用的共识，也鼓励大家发明自己的 name 来使用。

除了基本用法，meta 标签还有一些变体，主要用于简化书写方式或者声明自动化行为。下面我就挑几种重点的内容来分别讲解一下。

#### 具有 charset 属性的 meta

从 HTML5 开始，为了简化写法，meta 标签新增了 charset 属性。添加了 charset 属性的 meta 标签无需再有 name 和 content。

```html
<meta charset="UTF-8" >
```

charset 型 meta 标签非常关键，它描述了 HTML 文档自身的编码形式。因此，我建议这个标签放在 head 的第一个。

```html
<html>
<head>
<meta charset="UTF-8">
……
```

这样，浏览器读到这个标签之前，处理的所有字符都是 ASCII 字符，众所周知，ASCII 字符是 UTF-8 和绝大多数字符编码的子集，所以，在读到 meta 之前，浏览器把文档理解多数编码格式都不会出错，这样可以最大限度地保证不出现乱码。

一般情况下，HTTP 服务端会通过 http 头来指定正确的编码方式，但是有些特殊的情况如使用 file 协议打开一个 HTML 文件，则没有 http 头，这种时候，charset meta 就非常重要了。

#### 具有 http-equiv 属性的 meta

具有 http-equiv 属性的 meta 标签，表示执行一个命令，这样的 meta 标签可以不需要 name 属性了。

例如，下面一段代码，相当于添加了 content-type 这个 http 头，并且指定了 http 编码方式。

```html
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
```

除了 content-type，还有以下几种命令：

* content-language 指定内容的语言；
* default-style 指定默认样式表；
* refresh 刷新；
* set-cookie 模拟 http 头 set-cookie，设置 cookie；
* x-ua-compatible 模拟 http 头 x-ua-compatible，声明 ua 兼容性；
* content-security-policy 模拟 http 头 content-security-policy，声明内容安全策略。

#### name 为 viewport 的 meta

实际上，meta 标签可以被自由定义，只要写入和读取的双方约定好 name 和 content 的格式就可以了。

我们来介绍一个 meta 类型，它没有在 HTML 标准中定义，却是移动端开发的事实标准：它就是 name 为 viewport 的 meta。

这类 meta 的 name 属性为 viewport，它的 content 是一个复杂结构，是用逗号分隔的键值对，键值对的格式是 key=value。

例如：

```html
<meta name="viewport" content="width=500, initial-scale=1">
```

这里只指定了两个属性，宽度和缩放，实际上 viewport 能控制的更多，它能表示的全部属性如下：

* width：页面宽度，可以取值具体的数字，也可以是 device-width，表示跟设备宽度相等。
* height：页面高度，可以取值具体的数字，也可以是 device-height，表示跟设备高度相等。
* initial-scale：初始缩放比例。
* minimum-scale：最小缩放比例。
* maximum-scale：最大缩放比例。
* user-scalable：是否允许用户缩放。

对于已经做好了移动端适配的网页，应该把用户缩放功能禁止掉，宽度设为设备宽度，一个标准的 meta 如下：

```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

#### 其它预定义的 meta

在 HTML 标准中，还定义了一批 meta 标签的 name，可以视为一种有约定的 meta，我在这里列出来，你可以简单了解一下。

* application-name：如果页面是 Web application，用这个标签表示应用名称。

* author: 页面作者。
* description：页面描述，这个属性可能被用于搜索引擎或者其它场合。
* generator: 生成页面所使用的工具，主要用于可视化编辑器，如果是手写 HTML 的网页，不需要加这个 meta。
* keywords: 页面关键字，对于 SEO 场景非常关键。
* referrer: 跳转策略，是一种安全考量。
* theme-color: 页面风格颜色，实际并不会影响页面，但是浏览器可能据此调整页面之外的 UI（如窗口边框或者 tab 的颜色）。

### 结语

在本课，我们又学习了一批标签，它们是文档用于描述自身的元信息类标签。一些元信息标签可以产生实际的行为，掌握它们对于我们编写代码是必须的。

另一些元信息仅仅是对页面的描述，掌握它们可以使我们编写的页面跟各种浏览器、搜索引擎等结合地更好。

主要包括下面这些内容。

* head：元信息的容器。
* title：文档标题。
* base：页面的基准 URL。
* meta: 元信息通用标签。



## HTML 链接

链接是 HTML 中的一种机制，它是 HTML 文档和其它文档或者资源的连接关系，在 HTML 中，链接有两种类型。一种是超链接型标签，一种是外部资源链接。

链接的家族中有 a 标签、area 标签和 link 标签。今天，我会逐一对它们进行介绍。

![链接](images/链接.png)



## HTML替换型元素

这节课，我们又认识了一组 HTML 元素：替换型元素。它们的特点是，引入一个外部资源来进入页面，替换掉自身的位置。

我们通过对 script、img、picture、audio、video、iframe 几个标签的讲解，了解了不同的资源引入方式：

* src 属性；
* srcset 属性；
* source 标签；
* srcdoc 属性。

这中间，我们也介绍了一些小技巧，比如 src 属性的好朋友：data uri，这在实际开发中非常有用。























