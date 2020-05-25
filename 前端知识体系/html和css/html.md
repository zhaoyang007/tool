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

### 语义类标签是什么，使用它有什么好处？

语义类标签是工作中经常会用到的一类标签，它们的特点是视觉表现上互相都差不多，主要的区别在于它们表示了不同的语义，比如大家会经常见到的 section、nav、p，这些都是语义类的标签。

语义是我们说话表达的意思，多数的语义实际上都是由文字来承载的。语义类标签则是纯文字的补充，比如标题、自然段、章节、列表，这些内容都是纯文字无法表达的，我们需要依靠语义标签代为表达。

在讲语义之前，我们来说说为什么要用语义。

现在很多的前端工程师写起代码来，多数都不用复杂的语义标签， 只靠 div 和 span 就能走天下了。

这样做行不行呢？毫无疑问答案是行。那这样做好不好呢？按照正确的套路，我应该说不好，但是在很多情况下，答案其实是好。

这是因为在现代互联网产品里，HTML 用于描述“软件界面”多过于“富文本”，而软件界面里的东西，实际上几乎是没有语义的。比如说，我们做了一个购物车功能，我们一定要给每个购物车里的商品套上 ul 吗？比如说，加入购物车这个按钮，我们一定要用 Button 吗？

实际上我觉得没必要，因为这个场景里面，跟文本中的列表，以及表单中的 Button，其实已经相差很远了，所以，我支持在任何“软件界面”的场景中，直接使用 div 和 span。

不过，在很多工作场景里，语义类标签也有它们自己无可替代的优点。正确地使用语义标签可以带来很多好处。

* 语义类标签对开发者更为友好，使用语义类标签增强了可读性，即便是在没有 CSS 的时候，开发者也能够清晰地看出网页的结构，也更为便于团队的开发和维护。
* 除了对人类友好之外，语义类标签也十分适宜机器阅读。它的文字表现力丰富，更适合搜索引擎检索（SEO），也可以让搜索引擎爬虫更好地获取到更多有效信息，有效提升网页的搜索量，并且语义类还可以支持读屏软件，根据文章可以自动生成目录等等。

不过，不恰当地使用语义标签，反而会造成负面作用。这里我们举一个常见的误区作为例子。我们都知道 ul 是无序列表，ol 是有序列表，所以很多接触过语义这个概念，半懂不懂的前端工程师，特别喜欢给所有并列关系的元素都套上 ul。

实际上， ul 是长成下面的这种样子的 (以下来自 HTML 标准)。

I have lived in the following countries:

* Switzerland
* Norway
* United Kingdom
* United States

ul 多数出现正在行文中间，它的上文多数在提示：要列举某些项。但是，如果所有并列关系都用 ul，会造成大量冗余标签。

错误地使用语义标签，会给机器阅读造成混淆、增加嵌套，给 CSS 编写加重负担。

所以，对于语义标签，态度是：“用对”比“不用”好，“不用”比“用错”好。当然了，我觉得有理想的前端工程师还是应该去追求“用对”它们。

### 语义标签使用场景。

与 JavaScript 这样严格的编程语言相比，HTML 中语义标签的使用更接近我们平常说话用的自然语言。我们说话并没有唯一的标准措辞，语义标签的使用也是一样。下面，我挑选了几种（我认为）比较重要的语义标签使用场景，来为你介绍一下。

#### 作为自然语言延伸的语义类标签

语义标签的使用的第一个场景，也是最自然的使用场景，就是：作为自然语言和纯文本的补充，用来表达一定的结构或者消除歧义。

##### 我们先来看看“表达一定的结构”这个场景。

在日语中，有一个语法现象叫做：ルビ，它的读音是 ruby（著名的 ruby 语言就是据此命名的），它中文的意思大约类似于注音或者意思的注解，它的形式可以看下图：

![html语义ruby](images/html语义ruby.png)

在 HTML5 中，就引入了这个表示 ruby 的标签，它由 ruby、rt、rp 三个标签来实现。

所以说，这些情况里存在的语义，其实原本就存在了，只是我们用纯文字是没法表达的，HTML 作为一种“超文本”语言，支持这些文字表达就是必要的了。

##### 还有一种情况是，HTML 的有些标签实际上就是必要的，甚至必要的程度可以达到：如果没有这个标签，文字会产生歧义的程度。

当没有上下文时，如何消除歧义呢？这就要用到我们的 em 标签了。em 表示重音：

```html
今天我吃了一个<em>苹果</em>。
今天我吃了<em>一个</em>苹果。
```

通过 em 标签，我们可以消除这样的歧义。

一些文章常常会拿 em 和 strong 做对比，实际上，我们只要理解了 em 的真正意思，它和 strong 可谓天差地别，并没有任何混淆的可能。

#### 作为标题摘要的语义类标签

介绍完自然语言的语义场景后，我想介绍的另一个语义重要使用场景，就是文章的结构。中国古代小说就形成了“章 - 回”的概念，西方的戏剧也有幕的区分，所以人类的自然语言作品也是如出一辙。

HTML 也应该支持这样的需求。HTML 语义标签中，有不少是用于支持这样的结构的标签。

语义化的 HTML 能够支持自动生成目录结构，HTML 标准中还专门规定了生成目录结构的算法，即使我们并不打算深入实践语义，也应该尽量在大的层面上保证这些元素的语义化使用。

首先我们需要形成一个概念，一篇文档会有一个树形的目录结构，它由各个级别的标题组成。这个树形结构可能不会跟 HTML 元素的嵌套关系一致。

```html
例如：

<h1>HTML语义</h1>
<p>balah balah balah balah</p>
<h2>弱语义</h2>
<p>balah balah</p>
<h2>结构性元素</h2>
<p>balah balah</p>
......
```

这段 HTML 几乎是平铺的元素，但是它的标题结构是：

* HTML 语义
  * 弱语义
  * 结构性元素
  * ……

h1-h6 是最基本的标题，它们表示了文章中不同层级的标题。有些时候，我们会有副标题，为了避免副标题产生额外的一个层级，我们使用 hgroup 标签。

我们来看下有 / 无 hgroup 的对比：

```html
<h1>JavaScript对象</h1>
<h2>我们需要模拟类吗？</h2>
<p>balah balah</p>
......
```

此段生成以下标题结构：

* JavaScript 对象
  * 我们需要模拟类吗？
  * …

```html
<hgroup>
<h1>JavaScript对象</h1>
<h2>我们需要模拟类吗？</h2>
</hgroup>
<p>balah balah</p>
......
```

这一段生成以下标题结构：

* JavaScript 对象——我们需要模拟类吗？
  * …

通过两个效果的对比就可以知道，在 hgroup 中的 h1-h6 被视为同一标题的不同组成部分。

从 HTML 5 开始，我们有了 section 标签，这个标签可不仅仅是一个“有语义的 div”，它会改变 h1-h6 的语义。section 的嵌套会使得其中的 h1-h6 下降一级，因此，在 HTML5 以后，我们只需要 section 和 h1 就足以形成文档的树形结构：

```html
<section>
    <h1>HTML语义</h1>
    <p>balah balah balah balah</p>
    <section>
        <h1>弱语义</h1>
        <p>balah balah</p>
    </section>
    <section>
        <h1>结构性元素</h1>
        <p>balah balah</p> 
    </section>
......
</section>
```

这段代码同样会形成前面例子的标题结构：

* HTML 语义
  * 弱语义
  * 结构性元素
  * ……

#### 作为整体结构的语义类标签

我们想介绍的最后一个场景是，随着越来越多的浏览器推出“阅读模式”，以及各种非浏览器终端的出现，语义化的 HTML 适合机器阅读的特性变得越来越重要。

应用了语义化结构的页面，可以明确地提示出页面信息的主次关系，它能让浏览器很好地支持“阅读视图功能”，还可以让搜索引擎的命中率提升，同时，它也对视障用户的读屏软件更友好。

我们正确使用整体结构类的语义标签，可以让页面对机器更友好。比如，这里一个典型的 body 类似这样：

```html
<body>
    <header>
        <nav>
            ……
        </nav>
    </header>
    <aside>
        <nav>
            ……
        </nav>
    </aside>
    <section>……</section>
    <section>……</section>
    <section>……</section>
    <footer>
        <address>……</address>
    </footer>
</body>
```

在 body 下面，有一个 header，header 里面是一个 nav，跟 header 同级的有一个 aside，aside 里面也有一个 nav。接下来是文章的整体，也就是一个一个的 section。section 里面可能还有嵌套，但是我们就不管了，最后是一个 footer，这个 footer 里面可能有 address 这样的内容。

除此之外，还有 article，article 是一种特别的结构，它表示具有一定独立性质的文章。所以，article 和 body 具有相似的结构，同时，一个 HTML 页面中，可能有多个 article 存在。

一个典型的场景是多篇新闻展示在同一个新闻专题页面中，这种类似报纸的多文章结构适合用 article 来组织。

```html
<body>
    <header>……</header>
    <article>
        <header>……</header>
        <section>……</section>
        <section>……</section>
        <section>……</section>
        <footer>……</footer>
    </article>
    <article>
        ……
    </article>
    <article>
        ……
    </article>
    <footer>
        <address></address>
    </footer>
</body>
```

body 里面有自己的 header 和 footer，然后里面是竖篇的 article，每一个 article 里面都有自己的 header、section、footer。这是一个典型的多文章结构。

在这个结构里，我们看到了一些新标签，我也来逐个介绍一下。

* header，如其名，通常出现在前部，表示导航或者介绍性的内容。
* footer，通常出现在尾部，包含一些作者信息、相关链接、版权信息等。

header 和 footer 一般都是放在 article 或者 body 的直接子元素，但是标准中并没有明确规定，footer 也可以和 aside，nav，section 相关联（header 不存在关联问题）。

* aside 表示跟文章主体不那么相关的部分，它可能包含导航、广告等工具性质的内容。

aside 很容易被理解为侧边栏，实际上二者是包含关系，侧边栏是 aside，aside 不一定是侧边栏。

aside 和 header 中都可能出现导航（nav 标签），二者的区别是，header 中的导航多数是到文章自己的目录，而 aside 中的导航多数是到关联页面或者是整站地图。

最后 footer 中包含 address，这是个非常容易被误用的标签。address 并非像 date 一样，表示一个给机器阅读的地址，而是表示“文章（作者）的联系方式”，address 明确地只关联到 article 和 body。

### 总结

本篇中我们介绍了一些基本原则和 HTML 文档的整体结构，从整体上了解了 HTML 语义。

至此，我们可以回答是否要语义化的问题：我们应该分开一些场景来看语义，把它用在合适的场景下，可以获得额外的效果。本篇文中，我们至少涉及了三个明确的场景：

* 自然语言表达能力的补充；
* 文章标题摘要；
* 适合机器阅读的整体结构。

实际上，HTML 这种语言，并不像严谨的编程语言一样，有一条非此即彼的线。一些语义的使用其实会带来争议，所以我的建议是：你可以尽量只用自己熟悉的语义标签，并且只在有把握的场景引入语义标签。这样，我们才能保证语义标签不被滥用，造成更多的问题。

你最擅长使用哪些语义标签，会把它们用在哪些场景里呢？欢迎留言告诉我，我们一起讨论。



## HTML 元信息类标签

我们在前面的 HTML 部分的课程中，已经学习了语义标签。这些标签涵盖了我们日常开发用到的多数标签，也是我们编写代码时最常用的一批标签。

但是我们今天要讲的标签，重要性丝毫不弱于语义类标签，这就是页面元信息类标签。

我们可以先来了解一下什么是元信息类标签。所谓元信息，是指描述自身的信息，元信息类标签，就是 HTML 用于描述文档自身的一类标签，它们通常出现在 head 标签中，一般都不会在页面被显示出来（与此相对，其它标签，如语义类标签，描述的是业务）。

元信息多数情况下是给浏览器、搜索引擎等机器阅读的，有时候这些信息会在页面之外显示给用户，有时候则不会。

元信息类标签数量不多，我在这里就逐一为你介绍一下。

### head 标签

head 标签本身并不携带任何信息，它主要是作为盛放其它语义类标签的容器使用。

head 标签规定了自身必须是 html 标签中的第一个标签，它的内容必须包含一个 title，并且最多只能包含一个 base。如果文档作为 iframe，或者有其他方式指定了文档标题时，可以允许不包含 title 标签。

### title 标签

title 标签表示文档的标题，从字面上就非常容易理解。这里我就讲讲需要注意的地方。

你还记得吗，我们的语义类标签中也有一组表示标题的标签：h1-h6。

heading 和 title 两个英文单词意义区分十分微妙，在中文中更是找不到对应的词汇来区分。但是实际使用中，两者确实有一定区别。

在 HTML 标准中，特意讨论了这个问题。我们思考一下，假设有一个介绍蜜蜂跳舞求偶仪式的科普页面，我们试着把以下两个文字分别对应到 title 和 h1。

* 蜜蜂求偶仪式舞蹈
* 舞蹈

正确答案是“蜜蜂求偶仪式舞蹈”放入 title，“舞蹈”放入 h1。

我来讲一讲为什么要这样放呢？这主要是考虑到 title 作为元信息，可能会被用在浏览器收藏夹、微信推送卡片、微博等各种场景，这时侯往往是上下文缺失的，所以 title 应该是完整地概括整个网页内容的。

而 h1 则仅仅用于页面展示，它可以默认具有上下文，并且有链接辅助，所以可以简写，即便无法概括全文，也不会有很大的影响。

### base 标签

base 标签实际上是个历史遗留标签。它的作用是给页面上所有的 URL 相对地址提供一个基础。

base 标签最多只有一个，它改变全局的链接地址，它是一个非常危险的标签，容易造成跟 JavaScript 的配合问题，所以在实际开发中，我比较建议你使用 JavaScript 来代替 base 标签。

### meta 标签

meta 标签是一组键值对，它是一种通用的元信息表示标签。

在 head 中可以出现任意多个 meta 标签。一般的 meta 标签由 name 和 content 两个属性来定义。name 表示元信息的名，content 则用于表示元信息的值。

它基本用法是下面这样的，你也可以自己动手尝试一下：

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

我们还展开介绍了几种重要的 meta 标签，charset 表示页面编码，http-equiv 表示命令，还介绍了一些有约定的 meta 名称。

最后，给你留一个问题，你还见过哪些 meta 标签的用法？欢迎留言告诉我。



## HTML 链接

在前面的课程中，我讲到了 HTML 的语义和元信息标签，今天这一课，我们来讲另一类 HTML 元素：链接。

链接这种元素可以说是占据了整个互联网。也正是因为无处不在的超链接，才让我们的万维网如此繁荣。没有了超链接的 HTML，最多可以称为富文本，没法称作超文本（hyper text）。

我想，作为互联网从业者，我们一定对链接都非常熟悉了。链接能够帮助我们从一个网页跳转到另一个网页。

不过，除了肉眼可见的这些链接，其实 HTML 里面还规定了一些不可见链接的类型，这节课，我就来给你介绍链接家族的全员，让你对它们有一个完整的认识。

链接是 HTML 中的一种机制，它是 HTML 文档和其它文档或者资源的连接关系，在 HTML 中，链接有两种类型。一种是超链接型标签，一种是外部资源链接。

链接的家族中有 a 标签、area 标签和 link 标签。今天，我会逐一对它们进行介绍。

![链接](images/链接.png)

### link 标签

提到链接，我们都知道 a 标签可以成为超链接，但是我们今天的内容，要从一个大家不太熟悉的标签开始，也就是 link 标签。

我们已经介绍过元信息类标签。实际上，我们并没有介绍完全，有些 link 标签也是元信息类标签的一种。

我们已经讲过，HTML 标准并没有规定浏览器如何使用元信息，我们还讲到了元信息中有不少是被设计成“无需被浏览器识别，而是专门用于搜索引擎看的”。

link 标签也是元信息的一种，在很多时候，它也是不会对浏览器产生任何效果的，这也是很多人会忽略 link 标签学习的原因。

link 标签会生成一个链接，它可能生成超链接，也可能生成外部资源链接。

一些 link 标签会生成超链接，这些超链接又不会像 a 标签那样显示在网页中。这就是超链接型的 link 标签。

这意味着多数浏览器中，这些 link 标签不产生任何作用。但是，这些 link 标签能够被搜索引擎和一些浏览器插件识别，从而产生关键性作用。

比如，到页面 RSS 的 link 标签，能够被浏览器的 RSS 订阅插件识别，提示用户当前页面是可以 RSS 订阅的。

另外一些 link 标签则会把外部的资源链接到文档中，也就是说，会实际下载这些资源，并且做出一些处理，比如我们常见的用 link 标签引入样式表。

除了元信息的用法之外，多数外部资源型的 link 标签还能够被放在 body 中使用，从而起到把外部资源链接进文档的作用。

link 标签的链接类型主要通过 rel 属性来区分，在本篇文章中，我们提到 xx 型 link 即表示属性 rel 为 xx 的 link，其代码类似下面：

```html
<link rel="xx" ...>
```

下面我们先来看看超链接型 link 标签。

#### 超链接类 link 标签

超链接型 link 标签是一种被动型链接，在用户不操作的情况下，它们不会被主动下载。

link 标签具有特定的 rel 属性，会成为特定类型的 link 标签。产生超链接的 link 标签包括：具有 rel=“canonical” 的 link、具有 rel="alternate"的 link、具有 rel=“prev” rel="next"的 link 等等。

##### canonical 型 link

这种 link 的代码写法是这样：

```html
<link rel="canonical" href="...">
```

这个标签提示页面它的主 URL，在网站中常常有多个 URL 指向同一页面的情况，搜索引擎访问这类页面时会去掉重复的页面，这个 link 会提示搜索引擎保留哪一个 URL。

##### alternate 型 link

这种 link 的代码写法是这样：

```html
<link rel="alternate" href="...">
```

这个标签提示页面它的变形形式，这个所谓的变形可能是当前页面内容的不同格式、不同语言或者为不同的设备设计的版本，这种 link 通常也是提供给搜索引擎来使用的。

alternate 型的 link 的一个典型应用场景是，页面提供 rss 订阅时，可以用这样的 link 来引入：

```html
<link rel="alternate" type="application/rss+xml" title="RSS" href="...">
```

除了搜索引擎外，很多浏览器插件都能识别这样的 link。

##### prev 型 link 和 next 型 link

在互联网应用中，很多网页都属于一个序列，比如分页浏览的场景，或者图片展示的场景，每个网页是序列中的一个项。

这种时候，就适合使用 prev 和 next 型的 link 标签，来告诉搜索引擎或者浏览器它的前一项和后一项，这有助于页面的批量展示。

因为 next 型 link 告诉浏览器“这是很可能访问的下一个页面”，HTML 标准还建议对 next 型 link 做预处理，在本课后面的内容，我们会讲到预处理类的 link。

##### 其它超链接类的 link

其它超链接类 link 标签都表示一个跟当前文档相关联的信息，可以把这样的 link 标签视为一种带链接功能的 meta 标签。

* rel=“author” 链接到本页面的作者，一般是 mailto: 协议
* rel=“help” 链接到本页面的帮助页
* rel=“license” 链接到本页面的版权信息页
* rel=“search” 链接到本页面的搜索页面（一般是站内提供搜索时使用）

到这里，我们已经讲完了所有的超链接类的 link 标签用法了。接下来我们讲讲外部资源类 link 标签。

#### 外部资源类 link 标签

外部资源型 link 标签会被主动下载，并且根据 rel 类型做不同的处理。外部资源型的标签包括：具有 icon 型的 link、预处理类 link、modulepreload 型的 link、stylesheet、pingback。下面我们来一一介绍它们。

##### icon 型 link

这类链接表示页面的 icon。多数浏览器会读取 icon 型 link，并且把页面的 icon 展示出来。

icon 型 link 是唯一一个外部资源类的元信息 link，其它元信息类 link 都是超链接，这意味着，icon 型 link 中的图标地址默认会被浏览器下载和使用。

如果没有指定这样的 link，多数浏览器会使用域名根目录下的 favicon.ico，即使它并不存在，所以从性能的角度考虑，建议一定要保证页面中有 icon 型的 link。

只有 icon 型 link 有有效的 sizes 属性，HTML 标准允许一个页面出现多个 icon 型 link，并且用 sizes 指定它适合的 icon 尺寸。

##### 预处理类 link

我们都知道，导航到一个网站需要经过 dns 查询域名、建立连接、传输数据、加载进内存和渲染等一系列的步骤。

预处理类 link 标签就是允许我们控制浏览器，提前针对一些资源去做这些操作，以提高性能（当然如果你乱用的话，性能反而更差）。

下面我来列一下这些 link 类型：

* dns-prefetch 型 link 提前对一个域名做 dns 查询，这样的 link 里面的 href 实际上只有域名有意义。
* preconnect 型 link 提前对一个服务器建立 tcp 连接。
* prefetch 型 link 提前取 href 指定的 url 的内容。
* preload 型 link 提前加载 href 指定的 url。
* prerender 型 link 提前渲染 href 指定的 url。

##### modulepreload 型的 link

modulepreload 型 link 的作用是预先加载一个 JavaScript 的模块。这可以保证 JS 模块不必等到执行时才加载。

这里的所谓加载，是指完成下载并放入内存，并不会执行对应的 JavaScript。

```html
<link rel="modulepreload" href="app.js">
<link rel="modulepreload" href="helpers.js">
<link rel="modulepreload" href="irc.js">
<link rel="modulepreload" href="fog-machine.js">
<script type="module" src="app.js">
```

这个例子来自 HTML 标准，我们假设 app.js 中有 import “irc” 和 import “fog-machine”, 而 irc.js 中有 import “helpers”。这段代码使用 moduleload 型 link 来预加载了四个 js 模块。

尽管，单独使用 script 标签引用 app.js 也可以正常工作，但是我们通过加入对四个 JS 文件的 link 标签，使得四个 JS 文件有机会被并行地下载，这样提高了性能。stylesheet 型 link

##### stylesheet 型 link

样式表大概是所有人最熟悉的 link 标签用法了。它的样子是下面这样的。

```html
<link rel="stylesheet" href="xxx.css" type="text/css">
```

基本用法是从一个 CSS 文件创建一个样式表。这里 type 属性可以没有，如果有，必须是"text/css"才会生效。

rel 前可以加上 alternate，成为 rel=“alternate stylesheet”，此时必须再指定 title 属性。

这样可以为页面创建一份变体样式，一些浏览器，如 Firefox 3.0，支持从浏览器菜单中切换这些样式，当然了，大部分浏览器不支持这个功能，所以仅仅从语义的角度了解一下这种用法即可。

##### pingback 型 link

这样的 link 表示本网页被引用时，应该使用的 pingback 地址，这个机制是一份独立的标准，遵守 pingback 协议的网站在引用本页面时，会向这个 pingback url 发送一个消息。

以上就是 link 标签的所有用法了。接下来我们来介绍一下最熟悉的 a 标签，当然了，也可能你学过了本节课以后，觉得自己其实也没那么熟悉。

### a 标签

a 标签是“anchor”的缩写，它是锚点的意思，所谓锚点，实际上也是一种比喻的用法，古代船舶用锚来固定自己的位置，避免停泊时被海浪冲走，所以 anchor 标签的意思也是标识文档中的特定位置。

a 标签其实同时充当了链接和目标点的角色，当 a 标签有 href 属性时，它是链接，当它有 name 时，它是链接的目标。

具有 href 的 a 标签跟一些 link 一样，会产生超链接，也就是在用户不操作的情况下，它们不会被主动下载的被动型链接。

重点的内容是，a 标签也可以有 rel 属性，我们来简单了解一下，首先是跟 link 相同的一些 rel，包括下面的几种。

* alternate
* author
* help
* license
* next
* prev
* search

这些跟 link 语义完全一致，不同的是，a 标签产生的链接是会实际显示在网页中的，而 link 标签仅仅是元信息。

除了这些之外，a 标签独有的 rel 类型：

* tag 表示本网页所属的标签；
* bookmark 到上级章节的链接。

a 标签还有一些辅助的 rel 类型，用于提示浏览器或者搜索引擎做一些处理：

* nofollow 此链接不会被搜索引擎索引；
* noopener 此链接打开的网页无法使用 opener 来获得当前页面的窗口；
* noreferrer 此链接打开的网页无法使用 referrer 来获得当前页面的 url；
* opener 打开的网页可以使用 window.opener 来访问当前页面的 window 对象，这是 a 标签的默认行为。

a 标签基本解决了在页面中插入文字型和整张图片超链接的需要，但是如果我们想要在图片的某个区域产生超链接，那么就要用到另一种标签了——area 标签。

### area 标签

area 标签与 a 标签非常相似，不同的是，它不是文本型的链接，而是区域型的链接。

area 标签支持的 rel 与 a 完全一样，这里就不多说了。

area 是整个 html 规则中唯一支持非矩形热区的标签，它的 shape 属性支持三种类型。

* 圆形：circle 或者 circ，coords 支持三个值，分别表示中心点的 x,y 坐标和圆形半径 r。
* 矩形：rect 或者 rectangle，coords 支持两个值，分别表示两个对角顶点 x1，y1 和 x2，y2。
* 多边形：poly 或者 polygon，coords 至少包括 6 个值，表示多边形的各个顶点。

因为 area 设计的时间较早，所以不支持含有各种曲线的路径，但是它也是唯一一个支持了非矩形触发区域的元素，所以，对于一些效果而言，area 是必不可少的。

area 必须跟 img 和 map 标签配合使用。使用示例如下（例子来自 html 标准）。

```html
<p>
 Please select a shape:
 <img src="shapes.png" usemap="#shapes"
      alt="Four shapes are available: a red hollow box, a green circle, a blue triangle, and a yellow four-pointed star.">
 <map name="shapes">
  <area shape=rect coords="50,50,100,100"> <!-- the hole in the red box -->
  <area shape=rect coords="25,25,125,125" href="red.html" alt="Red box.">
  <area shape=circle coords="200,75,50" href="green.html" alt="Green circle.">
  <area shape=poly coords="325,25,262,125,388,125" href="blue.html" alt="Blue triangle.">
  <area shape=poly coords="450,25,435,60,400,75,435,90,450,125,465,90,500,75,465,60"
        href="yellow.html" alt="Yellow star.">
 </map>
</p>
```

这个例子展示了在一张图片上画热区并且产生链接，分别使用了矩形、圆形和多边形三种 area。

### 结语

本节课我们介绍了几种链接类型。在 HTML 中，链接有两种类型。一种是超链接型标签，一种是外部资源链接。

我们逐次讲到了 link 标签、a 标签和 area 标签，link 标签一般用于看不见的链接，它可能产生超链接或者外部资源链接，a 和 area 一般用于页面上显示的链接，它们只能产生超链接。

最后，留给你一个思考问题，你的工作中，是使用过哪些类型的 link 标签的呢？



## HTML替换型元素

我们今天来讲讲替换型元素。

我们都知道一个常识，一个网页，它是由多个文件构成的，我们在之前的课程中，已经学过了一种引入文件的方案：链接。

这节课我们要讲的替换型元素，就是另一种引入文件的方式了。替换型元素是把文件的内容引入，替换掉自身位置的一类标签。

我们首先来看一种比较熟悉的标签：script 标签。

### script

我们之所以选择先讲解 script 标签，是因为 script 标签是为数不多的既可以作为替换型标签，又可以不作为替换型标签的元素。

我们先来看看 script 标签的两种用法：

```html

<script type="text/javascript">
console.log("Hello world!");
</script>

<script type="text/javascript" src="my.js"></script>

```

这个例子中，我们展示了两种 script 标签的写法，一种是直接把脚本代码写在 script 标签之间，另一种是把代码放到独立的 js 文件中，用 src 属性引入。

这两种写法是等效的。我想这种等效性可以帮助你理解替换型元素的“替换”是怎么一回事。

这里我们就可以回答标题中的问题了：凡是替换型元素，都是使用 src 属性来引用文件的，而我们之前的课程中已经讲过，链接型元素是使用 href 标签的。

虽然我不知道当初是怎么设计的，但是 style 标签并非替换型元素，不能使用 src 属性，这样，我们用 link 标签引入 CSS 文件，当然就是用 href 标签啦。

接下来我们再看看别的替换型元素，先来了解一下 img 标签。

### img

毫无疑问我们最熟悉的替换型标签就是 img 标签了，几乎每个前端都会日常使用 img 标签。

img 标签的作用是引入一张图片。这个标签是没有办法像 script 标签那样作为非替换型标签来使用的，它必须有 src 属性才有意义。

如果一定不想要引入独立文件，可以使用 data uri，我们来看个实际的例子：

```html
<img src='data:image/svg+xml;charset=utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/></svg>'/>
```

这个例子中我们使用了 data uri 作为图片的 src，这样，并没有产生独立的文件，客观上做到了和内联相同的结果，这是一个常用的技巧。

img 标签可以使用 width 和 height 指定宽度和高度。也可以只指定其中之一。我们看个例子：

```html
<img src='data:image/svg+xml;charset=utf8,<svg width="600" height="400" version="1.1"
xmlns="http://www.w3.org/2000/svg"><ellipse cx="300" cy="150" rx="200" ry="80"
style="fill:rgb(200,100,50);
stroke:rgb(0,0,100);stroke-width:2"/></svg>' width="100"/>
```

这个例子中，为了方便你理解，我们把图片换成了椭圆，我们可以看到，当我们指定了宽度后，图片被等比例缩放了。这个特性非常重要，适用于那种我们既要限制图片尺寸，又要保持图片比例的场景。

如果从性能的角度考虑，建议你同时给出图片的宽高，因为替换型元素加载完文件后，如果尺寸发生变换，会触发重排版（这个概念我们在浏览器原理部分已经讲过，可以复习一下）。

此处要重点提到一个属性，alt 属性，这个属性很难被普通用户感知，对于视障用户非常重要，可以毫不夸张地讲，给 img 加上 alt 属性，已经做完了可访问性的一半。

img 标签还有一组重要的属性，那就是 srcset 和 sizes，它们是 src 属性的升级版（所以我们前面讲 img 标签必须有 src 属性，这是不严谨的说法）。

这两个属性的作用是在不同的屏幕大小和特性下，使用不同的图片源。下面一个例子也来自 MDN，它展示了 srcset 和 sizes 的用法

```html
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
```

srcset 提供了根据屏幕条件选取图片的能力，但是其实更好的做法，是使用 picture 元素。

### picture

picture 元素可以根据屏幕的条件为其中的 img 元素提供不同的源，它的基本用法如下：

```html
<picture>
  <source srcset="image-wide.png" media="(min-width: 600px)">
  <img src="image-narrow.png">
</picture>
```

picture 元素的设计跟 audio 和 video 保持了一致（稍后我会为你讲解这两个元素），它跟 img 搭配 srcset 和 sizes 不同，它使用 source 元素来指定图片源，并且支持多个。

这里的 media 属性是 media query，跟 CSS 的 @media 规则一致。

### video

在 HTML5 早期的设计中，video 标签跟 img 标签类似，也是使用 src 属性来引入源文件的，不过，我想应该是考虑到了各家浏览器支持的视频格式不同，现在的 video 标签跟 picture 元素一样，也是提倡使用 source 的。

下面例子是一个古典的 video 用法：

```html
<video controls="controls" src="movie.ogg">
</video>
```

这个例子中的代码用 src 来指定视频的源文件。但是因为一些历史原因，浏览器对视频的编码格式兼容问题分成了几个派系，这样，对于一些兼容性要求高的网站，我们使用单一的视频格式是不合适的。

现在的 video 标签可以使用 source 标签来指定接入多个视频源。

```html
<video controls="controls" >
  <source src="movie.webm" type="video/webm" >
  <source src="movie.ogg" type="video/ogg" >
  <source src="movie.mp4" type="video/mp4">
  You browser does not support video.
</video>
```

从这个例子中，我们可以看到，source 标签除了支持 media 之外，还可以使用 type 来区分源文件的使用场景。

video 标签的内容默认会被当做不支持 video 的浏览器显示的内容吗，因此，如果要支持更古老的浏览器，还可以在其中加入 object 或者 embed 标签，这里就不详细展开了。

video 中还支持一种标签：track。

track 是一种播放时序相关的标签，它最常见的用途就是字幕。track 标签中，必须使用 srclang 来指定语言，此外，track 具有 kind 属性，共有五种。

* subtitles：就是字幕了，不一定是翻译，也可能是补充性说明。
* captions：报幕内容，可能包含演职员表等元信息，适合听障人士或者没有打开声音的人了解音频内容。
* descriptions：视频描述信息，适合视障人士或者没有视频播放功能的终端打开视频时了解视频内容。
* chapters：用于浏览器视频内容。
* metadata：给代码提供的元信息，对普通用户不可见。

一个完整的 video 标签可能会包含多种 track 和多个 source，这些共同构成了一个视频播放所需的全部信息。

### audio

接下来我们来讲讲 audio，跟 picture 和 video 两种标签一样，audio 也可以使用 source 元素来指定源文件。我们看一下例子：

```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  <p>You browser does not support audio.</p>
</audio>
```

但比起 video，audio 元素的历史问题并不严重，所以使用 src 也是没有问题的。

### iframe

最后我们来讲一下 iframe，这个标签能够嵌入一个完整的网页。

不过，在移动端，iframe 受到了相当多的限制，它无法指定大小，里面的内容会被完全平铺到父级页面上。

同时很多网页也会通过 http 协议头禁止自己被放入 iframe 中。

iframe 标签也是各种安全问题的重灾区。opener、window.name、甚至 css 的 opacity 都是黑客可以利用的漏洞。

因此，在 2019 年，当下这个时间点，任何情况下我都不推荐在实际开发中用以前的 iframe。

当然，不推荐使用是一回事，因为没人能保证不遇到历史代码，我们还是应该了解一下 iframe 的基本用法：

```html
<iframe src="http://time.geekbang.org"></iframe>
```

这个例子展示了古典的 iframe 用法。

在新标准中，为 iframe 加入了 sandbox 模式和 srcdoc 属性，这样，给 iframe 带来了一定的新场景。我们来看看例子：

```html
<iframe sandbox srcdoc="<p>Yeah, you can see it <a href="/gallery?mode=cover&amp;amp;page=1">in my gallery</a>."></iframe>
```

这个例子中，使用 srcdoc 属性创建了一个新的文档，嵌入在 iframe 中展示，并且使用了 sandbox 来隔离。

这样，这个 iframe 就不涉及任何跨域问题了。

### 总结

这节课，我们又认识了一组 HTML 元素：替换型元素。它们的特点是，引入一个外部资源来进入页面，替换掉自身的位置。

我们通过对 script、img、picture、audio、video、iframe 几个标签的讲解，了解了不同的资源引入方式：

* src 属性；
* srcset 属性；
* source 标签；
* srcdoc 属性。

这中间，我们也介绍了一些小技巧，比如 src 属性的好朋友：data uri，这在实际开发中非常有用。

最后，留给你一个小问题，请查资料总结一下，在多数现代浏览器兼容的范围内，src 属性支持哪些协议的 uri（如 http 和我们提到的 data）。



## HTML 小实验：用代码分析HTML标准





## HTML 语言：DTD到底是什么？

今天，我们来聊一聊 HTML 语言。

我们平时写 HTML 语言，都习惯把关注点放到各种标签上，很少去深究它的语法。我想你应该会有模糊的感觉，HTML 这样的语言，跟 JavaScript 这样的语言会有一些本质的不同。

实际上，JavaScript 语言我们把它称为“编程语言”，它最大的特点是图灵完备的，我们大致可以理解为“包含了表达一切逻辑的能力”。像 HTML 这样的语言，我们称为“标记语言（mark up language）”，它是纯文本的一种升级，“标记”一词的概念来自：编辑审稿时使用不同颜色笔所做的“标记”。

在上世纪 80 年代，“富文本”的概念在计算机领域的热门，犹如如今的“AI”和“区块链”，而 Tim Berners-Lee 当时去设计 HTML，也并非是凭空造出来，他使用了当时已有的一种语言：SGML。

SGML 是一种古老的标记语言，可以追溯到 1969 年 IBM 公司所使用的技术，SGML 十分复杂，严格来说，HTML 是 SGML 中规定的一种格式，但是实际的浏览器没有任何一个是通过 SGML 引擎来解析 HTML 的。

今天的 HTML 仍然有 SGML 的不少影子，那么接下来我们就从 SGML 的一些特性来学习一下 HTML。这里我最想讲的是 SGML 留给 HTML 的重要的遗产：基本语法和 DTD。

### 基本语法

首先，HTML 作为 SGML 的子集，它遵循 SGML 的基本语法：包括标签、转义等。

SGML 还规定了一些特殊的节点类型，在我们之前的 DOM 课程中已经讲过几种节点类型，它们都有与之对应的 HTML 语法，我们这里复习一下：

![html基本语法](images/html基本语法.jpg)

这里我们从语法的角度，再逐个具体了解一下。

#### 标签语法

标签语法产生元素，我们从语法的角度讲，就用“标签”这个术语，我们从运行时的角度讲，就用“元素”这个术语。

HTML 中，用于描述一个元素的标签分为开始标签、结束标签和自闭合标签。开始标签和自闭合标签中，又可以有属性。

* 开始标签：\<tagname>
  * 带属性的开始标签：\<tagname attributename="attributevalue">
*  结束标签：\</tagname>
* 自闭合标签：\<tagname />

HTML 中开始标签的标签名称只能使用英文字母。

这里需要重点讲一讲属性语法，属性可以使用单引号、双引号或者完全不用引号，这三种情况下，需要转义的部分都不太一样。

属性中可以使用文本实体（后文会介绍）来做转义，属性中，一定需要转义的有下面几种。

* 无引号属性：\<tab> \<LF> \<FF> \<SPACE> & 五种字符。
* 单引号属性：' &两种字符。
* 双引号属性：" &两种字符。

一般来说，灵活运用属性的形式，是不太用到文本实体转义的。

#### 文本语法

在 HTML 中，规定了两种文本语法，一种是普通的文本节点，另一种是 CDATA 文本节点。

文本节点看似是普通的文本，但是，其中有两种字符是必须做转义的：< 和 &。

如果我们从某处拷贝了一段文本，里面包含了大量的 < 和 &，那么我们就有麻烦了，这时候，就轮到我们的 CDATA 节点出场了。

CDATA 也是一种文本，它存在的意义是语法上的意义：在 CDATA 节点内，不需要考虑多数的转义情况。

CDATA 内，只有字符组合]]>需要处理，这里不能使用转义，只能拆成两个 CDATA 节点。

#### 注释语法

HTML 注释语法以\<!--开头，以-->结尾，注释的内容非常自由，除了-->都没有问题。

如果注释的内容一定要出现 -->，我们可以拆成多个注释节点。

#### DTD 语法（文档类型定义）

SGML 的 DTD 语法十分复杂，但是对 HTML 来说，其实 DTD 的选项是有限的，浏览器在解析 DTD 时，把它当做几种字符串之一，关于 DTD，我在本篇文章的后面会详细讲解。

#### ProcessingInstruction 语法（处理信息）

ProcessingInstruction 多数情况下，是给机器看的。HTML 中规定了可以有 ProcessingInstruction，但是并没有规定它的具体内容，所以可以把它视为一种保留的扩展机制。对浏览器而言，ProcessingInstruction 的作用类似于注释。

ProcessingInstruction 包含两个部分，紧挨着第一个问号后，空格前的部分被称为“目标”，这个目标一般表示处理 ProcessingInstruction 的程序名。

剩余部分是它的文本信息，没有任何格式上的约定，完全由文档编写者和处理程序的编写者约定。

### DTD

现在我们来讲一下 DTD，DTD 的全称是 Document Type Defination，也就是文档类型定义。SGML 用 DTD 来定义每一种文档类型，HTML 属于 SGML，在 HTML5 出现之前，HTML 都是使用符合 SGML 规定的 DTD。

如果你是一个上个时代走过来的前端，一定还记得 HTML4.01 有三种 DTD。分别是严格模式、过渡模式和 frameset 模式。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

严格模式的 DTD 规定了 HTML4.01 中需要的标签。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

过渡模式的 DTD 除了 html4.01，还包含了一些被贬斥的标签，这些标签已经不再推荐使用了，但是过渡模式中仍保留了它们。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

frameset 结构的网页如今已经很少见到了，它使用 frameset 标签把几个网页组合到一起。

众所周知，HTML 中允许一些标签不闭合的用法，实际上这些都是符合 SGML 规定的，并且在 DTD 中规定好了的。但是，一些程序员喜欢严格遵守 XML 语法，保证标签闭合性，所以，HTML4.01 又规定了 XHTML 语法，同样有三个版本：

版本一

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

版本二

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "
http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

版本三

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

其实你看看就知道，这些复杂的 DTD 写法并没有什么实际作用（浏览器根本不会用 SGML 引擎解析它们），因此，到了 HTML5，干脆放弃了 SGML 子集这项坚持，规定了一个简单的，大家都能记住的 DTD：

```html
<!DOCTYPE html>
```

但是，HTML5 仍然保留了 HTML 语法和 XHTML 语法。

#### 文本实体

不知道你注意到没有，HTML4.01 的 DTD 里包含了一个长得很像是 URL 的东西，其实它是真的可以访问的——但是 W3C 警告说，禁止任何浏览器在解析网页的时候访问这个 URL，不然 W3C 的服务器会被压垮。我相信很多好奇的前端工程师都把它下载下来打开过。

这是符合 SGML 规范的 DTD，我们前面讲过，SGML 的规范十分复杂，所以这里我并不打算讲 SGML（其实我也不会），但是这不妨碍我们了解一下 DTD 的内容。这个 DTD 规定了 HTML 包含了哪些标签、属性和文本实体。其中文本实体分布在三个文件中：HTMLsymbol.ent HTMLspecial.ent 和 HTMLlat1.ent。

所谓文本实体定义就是类似以下的代码：

```html
&lt;
&nbsp;
&gt;
&amp;
```

每一个文本实体由&开头，由;结束，这属于基本语法的规定，文本实体可以用#后跟一个十进制数字，表示字符 Unicode 值。除此之外这两个符号之间的内容，则由 DTD 决定。

我这里数了一下，HTML4.01 的 DTD 中，共规定了 255 个文本实体，找出这些实体和它们对应的 Unicode 编码，就作为本次课程的课后小问题吧。

### 总结

今天的课程中我们讲了 HTML 的语法，HTML 语法源自 SGML，我们首先介绍了基本语法，包含了五种节点：标签（元素）、文本、注释、文档类型定义（DTD）和处理信息（ProcessingInstruction）。

之后我们又重点介绍了两部分内容：DTD 和文本实体。

DTD 在 HTML4.01 和之前都非常的复杂，到了 HTML5，抛弃了 SGML 兼容，变成简单的\<!DOCTYPE html>。

文本实体是 HTML 转义的重要手段，我们讲解了基本用法，HTML4.01 中规定的部分，就留给大家作为课后问题了。

今天的课后问题是：HTML4.01 的 DTD 中，共规定了 255 个文本实体，请你找出这些实体和它们对应的 Unicode 编码吧。



## HTML·ARIA：可访问性是只给盲人用的特性么？

### 总结

今天我介绍了 ARIA 相关的知识，我们分几个部分学习了如何使用 ARIA 属性来提高页面的可访问性。

我们以 ARIA 角色为中心，讲解了 ARIA 定义的语义体系。我们可以把 ARIA 分为三类。

* Widget 角色：主要是各种可交互的控件。
* 结构角色：文档的结构。
* 窗体角色：弹出的窗体。

今天的课后小问题是，请找一个支持图结构可视化的 JS 库，把所有 ARIA 的继承关系用可视化的方式展现出来。