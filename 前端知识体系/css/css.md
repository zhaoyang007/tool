## CSS 排版

今天我们来聊聊 CSS 的正常流。

我想，在 CSS 中，大家最讨厌的大概就是排版部分了。因为早年的 CSS 设计上不能够很好地支持软件排版需求，导致大家需要使用很多黑科技，让很多新人望而却步。

现在 CSS 提供了很多种排版方式，我们有很多选项可以选择自己适合的那一种，然而，正常流却是我们绕不开的一种排版。

我们能够在网上看到关于正常流的各种资料，比如：块级格式化上下文、margin 折叠等等……这一系列的概念光是听起来就令人非常头痛。

所以我相信很多同学一定会奇怪：正常流到底正常在哪里。事实上，我认为正常流本身是简单和符合直觉的东西。

我们之所以会觉得它奇怪，是因为如果我们从严苛的 CSS 标准角度去理解正常流，规定排版的算法，就需要引入上述那些复杂的概念。但是，如果我们单纯地从感性认知的层面去理解正常流，它其实是简单的。

下面，就让我们先抛弃掉所有的已知概念，从感性认知的角度出发，一起去理解一下正常流。

### 正常流的行为

首先，我们先从词源来讲一讲排版这件事。

在毕昇发明活字印刷之前，排版这项工作是不存在的，相应的操作叫做“雕版”。人们要想印刷书籍，就需要依靠雕版工人去手工雕刻印版。

活字印刷的出现，将排版这个词引入进来，排版是活字印刷的 15 道工序之一，不论是古代的木质活字印刷，还是近代的铅质活字印刷，排版的过程是由排版工人一个字一个字从字架捡出，再排入版框中。实际上，这个过程就是一个流式处理的过程。

从古代活字印刷开始，到现代的出版行业，再到今天的 Web，排版过程其实并没有什么本质的变化，只不过，今天在我们的 CSS 中，排版需要处理的内容，不再是简单的大小相同的木字或者铅字，而是有着不同字体和字号的富文本，以及插入在富文本中大小不等的盒。

并且，在这些过程中，都会有一个正常流的存在。那么，正常流是什么样的呢？

**我们可以用一句话来描述正常流的排版行为，那就是：依次排列，排不下了换行。**这个操作很简单吧，我想，任何一个不懂排版的人都会将其作为排版时的第一反应。

理解了正常流的基本概念，剩下的功能只需要在它的基础上延伸一下就好。

在正常流基础上，我们有 float 相关规则，使得一些盒占据了正常流需要的空间，我们可以把 float 理解为“文字环绕”。

<img src="images/文字环绕.png" alt="文字环绕" style="zoom: 67%;" />

我们还有 vertical-align 相关规则规定了如何在垂直方向对齐盒。vertical-align 相关规则看起来复杂，但是实际上，基线、文字顶 / 底、行顶 / 底都是我们正常书写文字时需要用到的概念，只是我们平时不一定会总结它们。

下图展示了在不同的 vertical-align 设置时，盒与文字是如何混合排版的。为了方便你理解，我们用代码给大家标注了基线、文字顶 / 底、行顶 / 底等概念。

![排版基线](images/排版基线.png)

除此之外，margin 折叠是很多人非常不理解的一种设计，但是实际上我们可以把 margin 理解为“一个元素规定了自身周围至少需要的空间”，这样，我们就非常容易理解为什么 margin 需要折叠了。

### 正常流的原理

我们前面描述了正常流的行为，接下来我们要切换一下模式，用比较严谨的姿势来理解一下正常流。

在 CSS 标准中，规定了如何排布每一个文字或者盒的算法，这个算法依赖一个排版的“当前状态”，CSS 把这个当前状态称为“格式化上下文（formatting context）”。

我们可以认为排版过程是这样的：

> 格式化上下文 + 盒 / 文字 = 位置

> formatting context + boxes/charater = positions

我们需要排版的盒，是分为块级盒和行内级盒的，所以排版需要分别为它们规定了块级格式化上下文和行内级格式化上下文。

与正常流一样，如果我们单纯地看格式化上下文，规则其实是非常简单的。

块级格式化上下文顺次排列元素：

<img src="images/块级格式化上下文顺次排列元素.png" alt="块级格式化上下文顺次排列元素" style="zoom: 67%;" />

行内级格式化上下文顺次排列元素：

<img src="images/行内级格式化上下文顺次排列元素.png" alt="行内级格式化上下文顺次排列元素" style="zoom:67%;" />

注意，块级和行内级元素的排版，受文字书写方向的影响，这里我们讲上下左右只是为了方便你直观理解。

当我们要把正常流中的一个盒或者文字排版，需要分成三种情况处理。

* 当遇到块级盒：排入块级格式化上下文。
* 当遇到行内级盒或者文字：首先尝试排入行内级格式化上下文，如果排不下，那么创建一个行盒，先将行盒排版（行盒是块级，所以到第一种情况），行盒会创建一个行内级格式化上下文。
* 遇到 float 盒：把盒的顶部跟当前行内级上下文上边缘对齐，然后根据 float 的方向把盒的对应边缘对到块级格式化上下文的边缘，之后重排当前行盒。

我们以上讲的都是一个块级格式化上下文中的排版规则，实际上，页面中的布局没有那么简单，一些元素会在其内部创建新的块级格式化上下文，这些元素有：

1. 浮动元素；
2. 绝对定位元素；
3. 非块级但仍能包含块级元素的容器（如 inline-blocks, table-cells, table-captions）；
4. 块级的能包含块级元素的容器，且属性 overflow 不为 visible。

这里的最后一条比较绕，实际上，我个人喜欢用另一种思路去理解它：

自身为块级，且 overflow 为 visible 的块级元素容器，它的块级格式化上下文和外部的块级格式化上下文发生了融合，也就是说，如果不考虑盒模型相关的属性，这样的元素从排版的角度就好像根本不存在。

好了，到这里我们已经讲完了正常流的排版详细规则，但是理解规则仅仅是基础，我们还需要掌握一些技巧。

### 正常流的使用技巧

现在，我们就一起来动手用实际的例子来研究一下。我们今天来看看等分布局和自适应宽，从这两种经典布局问题入手，一起来探索一下正常流的使用技巧。

#### 等分布局问题

横向等分布局是一个很常见的需求，按照一般的思路，我们可以使用百分比宽度来解决，我们参考以下代码：

```html
<div class="outer">
    <div class="inner"></div>
    <div class="inner"></div>
    <div class="inner"></div>
</div>
.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
}
```

在这段 HTML 代码中，我们放了三个 div，用 CSS 给它们指定了百分比宽度，并且指定为 inline-block。

但是这段代码执行之后，效果跟我们预期不同，我们可以发现，每个 div 并非紧挨，中间有空白，这是因为我们为了代码格式加入的换行和空格被 HTML 当作空格文本，跟 inline 盒混排了的缘故。

解决方案是修改 HTML 代码，去掉空格和换行：

```html
<div class="outer"><div class="inner"></div><div class="inner"></div><div class="inner"></div></div>
```

但是这样做影响了源代码的可读性，一个变通的方案是，改变 outer 中的字号为 0。

```css
.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
    font-size:30px;
}
.outer {
    font-size:0;
}
```

在某些浏览器中，因为像素计算精度问题，还是会出现换行，我们给 outer 添加一个特定宽度：

```css
.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
}
.outer {
    width:101px
}
```

这个代码在某些旧版本浏览器中会出现换行。为了保险起见，我们给最后一个 div 加上一个负的右 margin：

```css
.outer {
    width:101px
}

.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
}

.inner:last-child {
    margin-right:-5px;
}
```

这样就可以解决旧版本浏览器的问题了。

除了使用 inline-block，float 也可以实现类似的效果，但是 float 元素只能做顶对齐，不如 inline-block 灵活。

#### 自适应宽

我们再来说说自适应宽。在 IE6 统治浏览器市场的旧时代，自适应宽（一个元素固定宽度，另一个元素填满父容器剩余宽度）是个经典的布局问题，我们现在就看一下如何使用正常流来解决。

我们首先来看一下问题。

```html
<div class="outer">
    <div class="fixed"></div>
    <div class="auto"></div>
</div>
.fixed {
    width:200px;
}
.fixed, .auto {
    height:300px;
    outline:solid 1px blue;
}
```

这里 fixed 这个 div 宽度已经被指定好，我们需要添加 css 代码尝试让.auto 填满剩余宽度。

使用正常流解决这个问题的思路是，利用负 margin：

```css
.fixed {
    display:inline-block;
    vertical-align:top;
}
.auto {
    margin-left:-200px;
    width:100%;
    display:inline-block;
    vertical-align:top;
}
```

但是，这样做会导致 auto 中的内容位置不对，所以我们还需要使用 padding 把内容挤出来，最终完整代码如下：

```css
.fixed {
    display:inline-block;
    vertical-align:top;
}
.auto {
    margin-left:-200px;
    padding-left:200px;
    box-sizing:border-box;
    width:100%;
    display:inline-block;
    vertical-align:top;
}
```

这样就给 auto 添加了 padding-left 和 box-sizing 两个属性。

总的来说，正常流布局主要是使用 inline-block 来作为内容的容器，利用块级格式化上下文的纵向排布和行内级格式化上下文的横向排布来完成布局的，我们需要根据需求的横向和纵向排布要求，来选择元素的 display 属性。

### 结语

这次的文章中，我们一起学习了正常流，我们可以用一句话来描述正常流的排版行为，那就是：依次排列，排不下了换行。这也是理解它最简单最源头的方式。

我们将正常流的知识分成了三个部分。

* 正常流的行为部分，我们从一些感性认知出发，帮助你从思路和源头上理解正常流的行为。
* 正常流的原理部分，我用更严格的描述方式，给你讲解了 CSS 标准中规定的正常流排版逻辑。
* 最后的正常流应用部分，我以两个经典布局问题等分布局和自适应宽为例，为你讲解了正常流实际使用的一些技巧。

最后，留给你一个思考题：用 JavaScript 写一个仅包含 inline-block 的正常流布局算法。你写好的话，可以留言给我，我们一起讨论。



## CSS Flex排版

今天我们来谈谈 Flex 排版。

我们在前面多次讲过，正常流排版的设计来源于数百年来出版行业的排版经验，而 HTML 诞生之初，也确实是作为一种“超文本”存在的。

但是，自上世纪 90 年代以来，Web 标准和各种 Web 应用蓬勃发展，网页的功能逐渐从“文本信息”向着“软件功能”过渡，这个思路的变化导致了：CSS 的正常流逐渐不满足人民群众的需求了。

这是因为文字排版的思路是“改变文字和盒的相对位置，把它放进特定的版面中”，而软件界面的思路则是“改变盒的大小，使得它们的结构保持固定”。

因此，在早年的 CSS 中，“使盒按照外部尺寸变化”的能力非常弱。在我入行前端的时间（大约 2006 年），CSS 三大经典问题：垂直居中问题，两列等高问题，自适应宽问题。这是在其它 UI 系统中最为基本的问题，而到了 CSS 中，却变成了困扰工程师的三座大山。

机智的前端开发者们，曾经创造了各种黑科技来解决问题，包括著名的 table 布局、负 margin、float 与 clear 等等。在这种情况下，Flex 布局被随着 CSS3 一起提出（最初叫 box 布局），可以说是解决了大问题。

React Native 则更为大胆地使用了纯粹的 Flex 排版，不再支持正常流，最终也很好地支持了大量的应用界面布局，这一点也证明了 Flex 排版的潜力。

今天，我们就从设计、原理和应用三个方面来学习一下 Flex 布局，我们先从设计开始。

### Flex 的设计

Flex 在英文中是可伸缩的意思，一些翻译会把它译作弹性，我觉得有点不太准确，但是确实中文中没有更好的词。

Flex 排版的核心是 display:flex 和 flex 属性，它们配合使用。具有 display:flex 的元素我们称为 flex 容器，它的子元素或者盒被称作 flex 项。

flex 项如果有 flex 属性，会根据 flex 方向代替宽 / 高属性，形成“填补剩余尺寸”的特性，这是一种典型的“根据外部容器决定内部尺寸”的思路，也是我们最常用的 Windows 和 Apple 窗口系统的设计思路。

### Flex 的原理

说完了设计，我们再来看看原理，Flex 的实现并不复杂，我曾经写过一个基本实现提交给 spritejs 项目，代码可以[参考这里](https://github.com/spritejs/sprite-core/commit/8757b4d3888b4f237b1089e94e075ab58ca952a6#diff-677d382da9f8d81f61d50af24f937b32R32)。

下面我们就来讲解一下，如何实现一个 Flex 布局。

首先，Flex 布局支持横向和纵向，这样我们就需要做一个抽象，我们把 Flex 延伸的方向称为“主轴”，把跟它垂直的方向称为“交叉轴”。这样，flex 项中的 width 和 height 就会称为交叉轴尺寸或者主轴尺寸。

而 Flex 又支持反向排布，这样，我们又需要抽象出交叉轴起点、交叉轴终点、主轴起点、主轴终点，它们可能是 top、left、bottom、right。

Flex 布局中有一种特殊的情况，那就是 flex 容器没有被指定主轴尺寸，这个时候，实际上 Flex 属性完全没有用了，所有 Flex 尺寸都可以被当做 0 来处理，Flex 容器的主轴尺寸等于其它所有 flex 项主轴尺寸之和。

接下来我们开始做 Flex 排版。

##### 第一步是把 flex 项分行，有 flex 属性的 flex 项可以暂且认为主轴尺寸为 0，所以，它可以一定放进当前行。

接下来我们把 flex 项逐个放入行，不允许换行的话，我们就“无脑地”把 flex 项放进同一行。允许换行的话，我们就先设定主轴剩余空间为 Flex 容器主轴尺寸，每放入一个就把主轴剩余空间减掉它的主轴尺寸，直到某个 flex 项放不进去为止，换下一行，重复前面动作。

分行过程中，我们会顺便对每一行计算两个属性：交叉轴尺寸和主轴剩余空间，交叉轴尺寸是本行所有交叉轴尺寸的最大值，而主轴剩余空间前面已经说过。

##### 第二步我们来计算每个 flex 项主轴尺寸和位置。

如果 Flex 容器是不允许换行的，并且最后主轴尺寸超出了 Flex 容器，就要做等比缩放。

如果 Flex 容器有多行，那么根据我们前面的分行算法，必然有主轴剩余空间，这时候，我们要找出本行所有的带 Flex 属性的 flex 项，把剩余空间按 Flex 比例分给它们即可。

做好之后，我们就可以根据主轴排布方向，确定每个 flex 项的主轴位置坐标了。

如果本行完全没有带 flex 属性的 flex 项，justify-content 机制就要生效了，它的几个不同的值会影响剩余空白如何分配，作为实现者，我们只要在计算 flex 项坐标的时候，加上一个数值即可。

例如，如果是 flex-start 就要加到第一个 flex 项身上，如果是 center 就给第一个 flex 项加一半的尺寸，如果是 space-between，就要给除了第一个以外的每个 flex 项加上“flex 项数减一分之一”。

##### 第三步我们来计算 flex 项的交叉轴尺寸和位置。

交叉轴的计算首先是根据 align-content 计算每一行的位置，这部分跟 justify-content 非常类似。

再根据 alignItems 和 flex 项的 alignSelf 来确定每个元素在行内的位置。

计算完主轴和交叉轴，每个 flex 项的坐标、尺寸就都确定了，这样我们就完成了整个的 Flex 布局。

### Flex 的应用

接下来我们来尝试用 flex 排版来解决一下当年的 CSS 三大经典问题（简直易如反掌）。

垂直居中：

```html
<div id="parent">
  <div id="child">
  </div>
</div>
```

```css
#parent {
  display:flex;
  width:300px;
  height:300px;
  outline:solid 1px;
  justify-content:center;
  align-content:center;
  align-items:center;
}
#child {
  width:100px;
  height:100px;
  outline:solid 1px;
}
```

思路是创建一个只有一行的 flexbox，然后用 align-items:center; 和 align-content:center; 来保证行位于容器中，元素位于行中。

两列等高：

```html
<div class="parent">
  <div class="child" style="height:300px;">
  </div>
  <div class="child">
  </div>
</div>
<br/>
<div class="parent">
  <div class="child" >
  </div>
  <div class="child" style="height:300px;">
  </div>
</div>
```

```css
.parent {
  display:flex;
  width:300px;
  justify-content:center;
  align-content:center;
  align-items:stretch;
}
.child {
  width:100px;
  outline:solid 1px;
}
```

思路是创建一个只有一行的 flexbox，然后用 stretch 属性让每个元素高度都等于行高。

自适应宽：

```html
<div class="parent">
  <div class="child1">
  </div>
  <div class="child2">
  </div>
</div>
```

```css
.parent {
  display:flex;
  width:300px;
  height:200px;
  background-color:pink;
}
.child1 {
  width:100px;
  background-color:lightblue;
}
.child2 {
  width:100px;
  flex:1;
  outline:solid 1px;
}
```

这个就是 Flex 设计的基本能力了，给要自适应的元素添加 flex 属性即可。

### 总结

今天我们从 Flex 的设计、原理和应用三个方面一起学习了 Flex 排版。

我们先从感性的角度，介绍了 Flex 的设计，Flex 的设计是一种不同于流布局的，自外而内的设计思路。

接下来我们讲解了 Flex 的实现原理，也就是具体的排版算法。要想理解 Flex 排版的原理，主轴和交叉轴是非常重要的抽象，Flex 排版三个步骤：分行、计算主轴、计算交叉轴。

最后我们给出了几个例子，解决了旧时代的 CSS 三大经典问题。

最后，给你留一个小问题，请根据我的代码和文字，编写一段使用“position:absolute”来模拟 Flex 布局的 js。大家可以根据自己的水平，简化需求，比如可以实现一个仅仅支持横向的、单行的所有 flex 项必须指定高度的 Flex 布局。
