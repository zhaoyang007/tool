css 层叠样式表，在控制台中最终生效的效果会在最上层。

选择器是由 CSS 最先引入的一个机制（但随着 document.querySelector 等 API 的加入，选择器已经不仅仅是 CSS 的一部分了）。

选择器的基本意义是：根据一些特征，选中元素树上的一批元素。

我们把选择器的结构分一下类，那么由简单到复杂可以分成以下几种。

* 简单选择器：针对某一特征判断是否选中元素。
* 复合选择器：连续写在一起的简单选择器，针对元素自身特征选择单个元素。
* 复杂选择器：由“（空格）”“ >”“ ~”“ +”“ ||”等符号连接的复合选择器，根据父元素或者前序元素检查单个元素。
* 选择器列表：由逗号分隔的复杂选择器，表示“或”的关系。

### 简单选择器

简单选择器是针对某一特征判断是否为选中元素。

- 类型选择器：根据一个元素的标签名来选中元素。
- 全体选择器：与类型选择器类似，选择任意元素。
- id 选择器：# 后面跟随 id 名。
- class 选择器：. 后面跟随 class 名。
- 属性选择器：根据 HTML 元素的属性来选中元素。
- 伪类选择器：一系列由 CSS 规定好的选择器，它们以冒号开头，伪类有普通型和函数型。

#### 类型选择器和全体选择器

它根据一个元素的标签名来选中元素。

这里有一个特殊的选择器，就是“ * ” ，它称为全体选择器，可以选中任意元素。它的用法跟类型选择器是完全一致的，这里就把它们放到一起介绍了。

比如：

```css
div { }
```

这看上去非常简单，但是实际上，我们还必须要考虑 HTML 或者 XML 元素的命名空间问题。

比如我们的 svg 元素，实际上在： http://www.w3.org/2000/svg 命名空间之下。

svg 和 HTML 中都有 a 元素，我们若要想区分选择 svg 中的 a 和 HTML 中的 a，就必须用带命名空间的类型选择器。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body>
<svg width="100" height="28" viewBox="0 0 100 28" version="1.1"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <desc>Example link01 - a link on an ellipse
  </desc>
  <a xlink:href="http://www.w3.org">
    <text y="100%">name</text>
  </a>
</svg>
<br/>
<a href="javascript:void 0;">name</a>
</body>
</html>

@namespace svg url(http://www.w3.org/2000/svg);
@namespace html url(http://www.w3.org/1999/xhtml);
svg|a {
  stroke:blue;
  stroke-width:1;
}

html|a {
  font-size:40px
}
```

#### id 选择器与 class 选择器

id 选择器和 class 选择器都是针对特定属性的选择器。id 选择器是“#”号后面跟随 id 名，class 选择器是“.”后面跟随 class 名。

```css
#myid {
  stroke:blue;
  stroke-width:1;
}

.mycls {
  font-size:40px
}
```

#### 属性选择器

属性选择器根据 HTML 元素的属性来选中元素。属性选择器有四种形态。

* 第一种，[att]

  直接在方括号中放入属性名，是检查元素是否具有这个属性，只要元素有这个属性，不论属性是什么值，都可以被选中。

* 第二种，[att=val]

  精确匹配，检查一个元素属性的值是否是 val。

* 第三种，[att~=val]

  多种匹配，检查一个元素的值是否是若干值之一，这里的 val 不是一个单一的值了，可以是用空格分隔的一个序列。

* 第四种，[att|=val]

  开头匹配，检查一个元素的值是否是以 val 开头，它跟精确匹配的区别是属性只要以 val 开头即可，后面内容不管。

有些 HTML 属性含有特殊字符，这个时候，可以把 val 用引号括起来，形成一个 CSS 字符串。CSS 字符串允许使用单双引号来规避特殊字符，也可以用反斜杠转义，这样，就可以表示出任意属性值啦。

#### 伪类选择器

伪类选择器是一系列由 CSS 规定好的选择器，它们以冒号开头。伪类选择器有普通型和函数型两种。

伪类是很大的一类简单选择器，它是选择器能力的一种补充。在实际使用中，我还是建议你尽量通过合适的 id 和 class 来标识元素，约束伪类的使用。最好只在不得不使用伪类的场景使用伪类，这对于 CSS 代码的性能和可读性都有好处。

##### 树结构关系伪类选择器

伪类中最常用的部分。

* :root 伪类表示树的根元素，在选择器是针对完整的 HTML 文档情况，我们一般用 HTML 标签即可选中根元素。但是随着 scoped css 和 shadow root 等场景出现，选择器可以针对某一子树来选择，这时候就很需要 root 伪类了。

* :empty 伪类表示没有子节点的元素，这里有个例外就是子节点为空白文本节点的情况。

* :nth-child 和 :nth-last-child 这是两个函数型的伪类，CSS 的 An+B 语法设计的是比较复杂的，我们这里仅仅介绍基本用法。我们还是看几个例子：

  ![-nth-child和-nth-last-child](/Users/zhaoyang/tool/images/前端知识体系/html和css/-nth-child和-nth-last-child.png)

* :nth-last-child 的区别仅仅是从后往前数。

* :first-child :last-child 分别表示第一个和最后一个元素。

* :only-child 按字面意思理解即可，选中唯一一个子元素。

of-type 系列，是一个变形的语法糖，S:nth-of-type(An+B) 是:nth-child(|An+B| of S) 的另一种写法。以此类推，还有 nth-last-of-type、first-of-type、last-of-type、only-of-type。

##### 链接与行为伪类选择器

链接与行为是第一批设计出来的伪类，也是最常用的一批。

* :any-link 表示任意的链接，包括 a、area 和 link 标签都可能匹配到这个伪类。
* :link 表示未访问过的链接， 
* :visited 表示已经访问过的链接。
* :hover 表示鼠标悬停在上的元素。
* :active 表示用户正在激活这个元素，如用户按下按钮，鼠标还未抬起时，这个按钮就处于激活状态。
* :focus 表示焦点落在这个元素之上。
* :target 用于选中浏览器 URL 的 hash 部分所指示的元素。

在 Selector Level 4 草案中，还引入了 target-within、focus-within 等伪类，用于表示 target 或者 focus 的父容器。

##### 逻辑伪类选择器

我们这里介绍一个逻辑伪类 —— :not 伪类。

这个伪类是个函数型伪类，它的作用时选中内部的简单选择器没命中的元素。

```css
*|*:not(:hover)
```

选择器 3 级标准中，not 只支持简单选择器，在选择器 4 级标准，则允许 not 接受一个选择器列表，这意味着选择器支持嵌套，仅靠 not 即可完成选择器的一阶真值逻辑完备，但目前还没有看到浏览器实现它。

##### 其它伪类选择器

还有一些草案中或者不常用的选择器，你仅做大概了解即可。

* 国际化：用于处理国际化和多语言问题。
  * dir
  * lang
* 音频 / 视频：用于区分音视频播放状态。
  * play
  * pause
* 时序：用于配合读屏软件等时序性客户端的伪类。
  * current
  * past
  * future
* 表格：用于处理 table 的列的伪类。
  * nth-col
  * nth-last-col

下面介绍选择器的几个机制：选择器的组合、选择器的优先级和伪元素。



### 选择器的组合

在 CSS 规则中，选择器部分是一个选择器列表。

选择器列表是用逗号分隔的复杂选择器序列；复杂选择器则是用空格、大于号、波浪线等符号连接的复合选择器；复合选择器则是连写的简单选择器组合。

根据选择器列表的语法，选择器的连接方式可以理解为像四则运算一样有优先级。

* 第一优先级
  * 无连接符号
* 第二优先级
  * “空格”
  * “~”
  * “+”
  * “>”
  * “||”
* 第三优先级
  * “,”

例如以下选择器：

```css
.c,.a>.b.d {
    /*......*/
}
```

我们应该理解为这样的结构。

* .c,.a>.b.d
  * .c
  * .a>.b.d
    * .a
    * .b.d
      * .b
      * .d

复合选择器表示简单选择器中“且”的关系，例如，例子中的“ .b.d ”，表示选中的元素必须同时具有 b 和 d 两个 class。

复杂选择器是针对节点关系的选择，它规定了五种连接符号。

* “空格”：后代，表示选中所有符合条件的后代节点， 例如“ .a .b ”表示选中所有具有 class 为 a 的后代节点中 class 为 b 的节点。
* “>” ：子代，表示选中符合条件的子节点，例如“ .a>.b ”表示：选中所有“具有 class 为 a 的子节点中，class 为 b 的节点”。
* “~” : 后继，表示选中所有符合条件的后继节点，后继节点即跟当前节点具有同一个父元素，并出现在它之后的节点，例如“ .a~.b ”表示选中所有具有 class 为 a 的后继中，class 为 b 的节点。
* “+”：直接后继，表示选中符合条件的直接后继节点，直接后继节点即 nextSlibling。例如 “.a+.b ”表示选中所有具有 class 为 a 的下一个 class 为 b 的节点。
* “||”：列选择器，表示选中对应列中符合条件的单元格。

我们在实际使用时，比较常用的连接方式是“空格”和“>”。

工程实践中一般会采用设置合理的 class 的方式，来避免过于复杂的选择器结构，这样更有利于维护和性能。

空格和子代选择器通常用于组件化场景，当组件是独立开发时，很难完全避免 class 重名的情况，如果为组件的最外层容器元素设置一个特别的 class 名，生成 CSS 规则时，则全部使用后代或者子代选择器，这样可以有效避免 CSS 规则的命名污染问题。

逗号表示“或”的关系，实际上，可以把它理解为“两条内容一样的 CSS 规则”的一种简写。如我们开头的例子，可以理解成与下面的代码等效：

```css
.c {
    /*......*/
}
.a>.b.d {
    /*......*/
}
```

到这里，我们就讲完了如何用简单选择器组合成复合选择器和复杂选择器，形成选择器列表，这能够帮助我们应对各种复杂的需求。

CSS 选择器是基于规则生效的，同一个元素命中多条规则是非常常见的事情。不同规则指定同一个属性为不同值时，就需要一个机制来解决冲突。这个机制，就是接下来我们要讲的选择器优先级。



### 选择器的优先级

CSS 标准用一个三元组 (a, b, c) 来构成一个复杂选择器的优先级。

* id 选择器的数目记为 a；
* 伪类选择器和 class 选择器的数目记为 b；
* 伪元素选择器和标签选择器数目记为 c；
* “*” 不影响优先级。

CSS 标准建议用一个足够大的进制，获取“ a-b-c ”来表示选择器优先级。

即：

```js
specificity = base * base * a + base * b + c
```

其中，base 是一个“足够大”的正整数。关于 base，历史中有些趣闻，早年 IE6 采用 256 进制，于是就产生“256 个 class 优先级等于一个 id”这样的奇葩问题，后来扩大到 65536，基本避免了类似的问题。

现代浏览器多采用了更大的数量，我们正常编写的 CSS 规则数量不太可能达到数万，因此我们可以认为这样的 base 就足够大了。

行内属性的优先级永远高于 CSS 规则，浏览器提供了一个“口子”，就是在选择器前加上“!import”。这个用法非常危险，因为它相当于一个新的优先级，而且此优先级会高于行内属性。

同一优先级的选择器遵循“后面的覆盖前面的”原则，我们可以看一个例子：调换“.x”和“.y”我们可以得到不同的显示效果。

```html
<div id="my" class="x y">text<div>
```

```css
.x {
    background-color:lightblue;
}
.y {
    background-color:lightgreen;
}
```

选择器的优先级是针对单条规则的，多条规则的选择器同时命中元素，优先级不会发生叠加。在这个例子中，“.x ”和“.z ”都指定了背景色为浅蓝色，但是因为“.y ”规则在最后，所以最终显示结果为浅绿色。

```html
<div id="my" class="x y z">text<div>
```

```css
.x {
    background-color:lightblue;
}
.z {
    background-color:lightblue;
}
.y {
    background-color:lightgreen;
}
```

选择器的优先级是针对复杂选择器的优先级，选择器列表不会合并计算优先级。我们看一个例子：这里选择器列表“ .x, .z”命中了 div，但是它的两项分别计算优先级，所以最终优先级仍跟“ .y” 规则相同。

```html
<div id="my" class="x y z">text<div>
```

```css
.x, .z {
    background-color:lightblue;
}
.y {
    background-color:lightgreen;
}
```

以上就是选择器优先级的相关规则了，虽然我们这里介绍了详细的计算方式，但是选择器的使用上，如果产生复杂的优先级计算，代码的可读性一定是有问题的。

所以实践中，建议你“根据 id 选单个元素”“class 和 class 的组合选成组元素”“tag 选择器确定页面风格”这样的简单原则来使用选择器，不要搞出过于复杂的选择器。



### 伪元素

我之所以没有把它放在简单选择器中，是因为伪元素本身不单单是一种选择规则，它还是一种机制。

伪元素的语法跟伪类相似，但是实际产生的效果却是把不存在的元素硬选出来。

目前兼容性达到可用的伪元素有以下几种。

* ::first-line
* ::first-letter
* ::before
* ::after

#### ::first-line 和 ::first-letter 伪元素

::first-line 和 ::first-letter 是比较类似的伪元素，其中一个表示元素的第一行，一个表示元素的第一个字母。

这一段代码把段落的第一行字母变为大写。注意这里的第一行指的是排版后显示的第一行，跟 HTML 代码中的换行无关。

```html
<p>This is a somewhat long HTML
paragraph that will be broken into several
lines. The first line will be identified
by a fictional tag sequence. The other lines
will be treated as ordinary lines in the
paragraph.</p>
```

```css
p::first-line { 
    text-transform: uppercase 
}
```

::first-letter 则指第一个字母。首字母变大并向左浮动是一个非常常见的排版方式。

```html
<p>This is a somewhat long HTML
paragraph that will be broken into several
lines. The first line will be identified
by a fictional tag sequence. The other lines
will be treated as ordinary lines in the
paragraph.</p>
```

```css
p::first-letter { 
    text-transform: uppercase;
    font-size:2em;
    float:left; 
}
```

虽然听上去很简单，但是实际上，我们遇到的 HTML 结构要更为复杂，一旦元素中不是纯文本，规则就变得复杂了。

CSS 标准规定了 first-line 必须出现在最内层的块级元素之内。因此，我们考虑以下代码。

这段代码最终结果第一行是蓝色，因为 p 是块级元素，所以伪元素出现在块级元素之内，所以内层的 color 覆盖了外层的 color 属性。

```html
<div>
  <p id=a>First paragraph</p>
  <p>Second paragraph</p>
</div>
```

```css
div>p#a {
    color:green;
}

div::first-line { 
    color:blue; 
}
```

如果我们把 p 换成 span，结果就是相反的。这段代码的最终结果是绿色，这说明伪元素在 span 之外。

```html
<div>
  <span id=a>First paragraph</span><br/>
  <span>Second paragraph</span>
</div>
```

```css
div>span#a {
    color:green;
}

div::first-line { 
    color:blue; 
}
```

::first-letter 的行为又有所不同，它的位置在所有标签之内，我们把前面的代码换成::first-letter。

执行这段代码，我们可以看到，首字母变成了蓝色，这说明伪元素出现在 span 之内。

```html
<div>
  <span id=a>First paragraph</span><br/>
  <span>Second paragraph</span>
</div>
```

```css
div>span#a {
    color:green;
}

div::first-letter { 
    color:blue; 
}
```

CSS 标准只要求 ::first-line 和 ::first-letter 实现有限的几个 CSS 属性，都是文本相关，这些属性是下面这些。

![first-line&first-letter](/Users/zhaoyang/tool/images/前端知识体系/html和css/first-line&first-letter.png)

####  ::before 和 ::after 伪元素。

这两个伪元素跟前面两个不同的是，它不是把已有的内容套上一个元素，而是真正的无中生有，造出一个元素。

::before 表示在元素内容之前插入一个虚拟的元素，::after 则表示在元素内容之后插入。

这两个伪元素所在的 CSS 规则必须指定 content 属性才会生效，我们看下例子：

```html
<p class="special">I'm real element</p>
```

```css
p.special::before {
    display: block;
    content: "pseudo! ";
}
```

这里要注意一点，::before 和 ::after 还支持 content 为 counter，如：

```html
<p class="special">I'm real element</p>
```

```css
p.special::before {
    display: block;
    content: counter(chapno, upper-roman) ". ";
}
```

这对于实现一些列表样式是非常有用的。

::before 和 ::after 中支持所有的 CSS 属性。实际开发中，这两个伪元素非常有用，有了这两个伪元素，一些修饰性元素，可以使用纯粹的 CSS 代码添加进去，这能够很好地保持 HTML 代码中的语义，既完成了显示效果，又不会让 DOM 中出现很多无语义的空元素。
