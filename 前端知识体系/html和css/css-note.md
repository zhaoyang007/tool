## css 基础

### css 选择器

css 层叠样式表，在控制台中最终生效的效果会在最上层。

选择器权重计算不进位。

### 字体

字体在浏览器中是怎么定义的。

字体族：serif（衬线字体）、sans-serif（非衬线字体）、monospace（等宽字体）、cursive（手写体）、fantasy（花体）。它不是具体的某一个字体，而是字体的一类，如果指定这个，就会在指定的字体族中找一个字体使用。使用中不加引号。

多字体 fallback 机制：系统会找自动寻找指定的字体，有哪个使用哪个，都没有就使用系统默认字体。顺序是根据平台独有的字体放前面。

网络字体（远程）、自定义字体（本地）的使用。

iconfont: 既然可以自定义字体，所谓自定义字体原理就是规定每个字长什么样，如果规定每个字是图标的样子，就可以把文字当做图标用了。

指定字体：

```css
body {
  font-family: 'PingFang SC', 'Microsoft Yahei', serif;
}
```

自定义字体：

```css
@font-face {
	font-family: 'IF';
  src: url('./IndieFlower.ttf');
}
.custom-font {
	font-family: 'IF';
}
```

### 行高

文字和图片排在一行，图片下面有空隙。原因就是 img 也是符合 inline 元素基线对齐的方式，baseliue 和底线之间是有偏差的，偏差大小跟字体大小有关。解决方案：

* vertical-align: bottom; 调整为底线对齐。
* 将图片改为 block 元素。

### 背景

* 渐变色背景
* 多背景叠加
* base64 和性能优化：base64 是一种文本格式，这串文本就是代表图片本身。base64 格式的图片体积会增大三分之一，放入这个 base64 的文件体积也会增大，所以只适用于非常小的图标。base64 在传输上性能是有优势的，减少http 连接数，但是增大了浏览器解码的开销，要先把它转成图片数据再做其他操作。所以要应用在小量的小图标上。

### 边框

边框背景图

```css
div {
	border-image: url(./border.png) 30 round;
}
```

### 滚动

当内容比容器多的时候会产生滚动。

* 滚动行为和滚动条

![滚动条](/Users/zhaoyang/tool/images/前端知识体系/html和css/滚动条.png)

scroll：不管需不需要滚动，滚动条都存在。

auto：需要滚动时，滚动条才存在，不需要时不存在。

### 文本折行

文本折行跟滚动有一个相似的地方，都是面临显示不下的问题。当文字在一行显示不下的时候，就要考虑到换行的问题，换行的行为怎么控制，是否换行，什么时候换行，在哪换行。

* overflow-wrap(word-wrap) 通用换行控制，是否保留单词。
* word-break 针对多字节文字。是否把单词或字母看成一个单位。
* white-space 空白处是否换行。

装饰性属性及其他

* 字重（粗体）font-weight
* 斜体 font-style: italic
* 下划线 text-decoration
* 署标指针 cursor

### css  hack

hack 就是不合法但生效的写法。主要用于区分不同浏览器来做兼容的事情。

在一部分浏览器中生效的写法就被称为 css hack。作用是处理浏览器兼容性。

注意：标准属性写在前面，hach 写在后面。

缺点：难理解 难维护 易失效。

代替方案：检测浏览器有没有这样的特性，没有就针对性加 class。

css hack 虽然不是最优雅的最推荐的方式，但它确实是是一种简单粗暴的有效的 css 兼容性的解决方案。

### 案例

* 使用 css 做单选框/复选框的美化
  * label[for] 和 id
  * 隐藏原生 input
  * :checked + label
* 使用 css 和单选框/复选框做 tabs



## css 布局

### 布局发展历程

早期以 table 为主。因为表格的解析并不是流式的，如果表格很长，浏览器会把整个表格的代码拉完之后才会解析，会造成用户等待的时间过长。现代浏览器这个问题其实已经不存在了。所以可以适当使用 table 布局。

后来以技巧性布局为主。并不是用来布局的，这些方法会遇到很多困难。后来规范替我们做了处理有了下面的专门用来布局的方式。

现在有 flexbox / grid。正统的专门用来布局的。

响应式布局做多端屏幕的适配。

### 常用布局方法

* table 表格布局
* float 浮动 + margin
* inline-block 布局
* flexbox 布局

### 表格布局

后来的 css 规范中，可以设定一个元素长得像表格。

```css
table {
  width: 800px;
  height: 200px;
  border-collapse: collapse;
}
.table {
  width: 800px;
  height: 200px;
	display: table;
}
.table-row {
  display: table-row;
}
.table-cell {
  display: table-cell;
}
.left { background-color: lightgreen;}
.right { background-color: lightblue;}
```

```html
<table>
  <tr>
    <td class="left">左</td>
    <td class="right">右</td>
  </tr>
</table>
<div class="table">
  <div class="table-row">
    <div class="table-cell left">左</div>
    <div class="table-cell right">右</div>
  </div>
</div>
```

### flexbox 布局

标准提供的真正用于布局的方式。float 是用于图文混排的。

* 弹性盒子：每个盒子是有弹性的，可以伸缩的。
* 盒子本来就是并列的，解决了并列的问题，布局基本就解决了。因为纵向就是一个一个堆叠起来的，不需要我们做任何事情。所以布局的难点就是怎么把块横向的堆叠起来。
* 指定宽度即可。提供了更多关于宽度的控制。

可以指定盒子的对齐方式，占不满空间时和占多了空间时怎么办，要不要换行，指定顺序。

flexbox 的写法中间有过三次变更，每个浏览器兼容的写法不一样，所以要写很多兼容的写法来兼容不同浏览器。这样大部分的浏览器是可以兼容的。react native 和微信小程序可以直接用 flex 布局。

### float 布局

浮动元素会脱离文档流，但是不会脱离文本流。这种布局方式正式 float 本身的含义，float 本来就是用来做类似于图文混排的文字环绕之类的效果的。

浮动元素会形成“块”（BFC）。

float 会找到它能占据的最上面最左（右）边的位置。但是如果已经被别的元素占用的空间，它是不能占用的。

#### 清除浮动

为什么要清除浮动：

* 浮动元素不会占据父元素的布局空间，父元素布局的时候不会去管浮动元素，有可能浮动元素就会超出父元素从而对其他的元素产生影响，所以作为父元素一定要清除浮动，保证对外面是无害的，不会影响其他元素。

* 解决浮动元素的父元素高度塌陷的问题。

##### 1. 父级添加 overflow 属性（父元素添加 overflow: hidden; ）（不推荐）

通过触发 BFC 方式（就是负责接管自己的宽高），实现清除浮动。

```css
.fahter {
  /* 设置了overflow 属性，父元素就需要知道内容的高度来设置相应的行为，所以这种方式就可以阻止高度塌陷，从而清除浮     			动 */
  overflow: hidden; /* auto 也可以 */
}
```

优点：代码简洁。

缺点：内容增多的时候容易造成不会自动换行导致内容被隐藏掉，无法显示要溢出的元素。

##### 2. 额外标签法（不推荐）

在最后一个浮动标签后，新加一个标签，给其设置 clear: both; 

优点：通俗易懂，方便。

缺点：添加无意义标签，语义化差。

##### 3. 使用 after 伪元素清除浮动（推荐使用）

有一个元素超出浮动元素的部分，刚好到浮动元素的最下面，这时父级可以根据这个元素而被撑起来，撑起来的位置刚好是浮动元素的最下面，就刚好是整个父级应有的高度。

```css
.clearfix::after {/*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: " ";
  display: block; /* 伪元素默认是 inline 的，inline 元素无法帮我们做清除浮动的事情。 */
  height: 0;
  /* 
  	clear: both;的意思是保证这个元素的左右两边都是干净的，没有浮动元素，因为这个浮动元素是尽量靠上的，所以这个			元素只能在浮动元素的下方才能保证左右都没有浮动元素，这个位置就是放置 clear: both; 元素的地方。就是靠这个元		素把父级撑起来，从而把浮动的影响去掉，解决高度塌陷。
  */
  clear: both; 
  visibility: hidden;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
```

优点：符合闭合浮动思想，结构语义化正确。

缺点：ie6-7不支持伪元素 ::after，使用 zoom: 1 触发 hasLayout。

##### 4. 使用 before 和 after 双伪元素清除浮动（推荐使用）（万能清除法）

```css
.clearfix::before, .clearfix::after {
  display: block;
  content: " ";
}
.clearfix::after {
  clear: both;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
```

优点：代码更简洁。

缺点：ie6-7不支持伪元素 ::after，使用 zoom: 1 触发 hasLayout。

### inline-block 布局

像文本一样排 block 元素。

需要处理间隙：因为文字之间是有间隙的，所以每个 inline-block 的元素之间也存在间隙。解决办法是把父元素的字体大小设为 0。在里面的元素设置相应的字体大小。或者把空白去掉或改成注释。

缺点：做自适应比较困难。比较适合做定宽的布局。

### 响应式

让页面在不同的设备上都能正常使用。

一般主要处理屏幕大小的问题。

主要方法：

* 设计的支持：隐藏 + 折行 + 自适应空间
* rem / viewport / media query
  * rem：通过 html 的字体大小来确定元素大小，使用这个单位进行布局，针对不同大小的屏幕给出不同大小的字号，元素就会跟着缩放。rem 有时换算完是不精准的。
  * viewport：确定要将页面整个界面放到多大。
  * media query：媒体查询，根据不同设备的特性来匹配不同的样式，给小屏和大屏分别写一套样式。大屏幕的样式写在上面。

### 自适应

#### 自适应的一些概念

* 像素：https://github.com/jawil/blog/issues/21
* viewport
* rem
  * css单位
  * 根据跟标签html的字体大小进行计算
  * em是相对于父元素字体大小进行计算
* http://www.woshipm.com/ucd/198774.html
  * 分辨率(像素) 1920PX * 1080PX
  * 设备尺寸 5.2英寸
  * 像素密度(ppi, 每英寸所拥有的像素数目)
    * ppi = √(横向^2 + 纵向^2) / 屏幕尺寸(inch)
  * 小结：
    * 我们平时做的适配就是关心的分辨率而不是屏幕尺寸。
    * 在同一个设备上，它的像素个数和像素大小是固定的了，也就是系统的最高分辨率，这是厂商在出厂时就设置好了的，只有不同的设备之间，才有像素大小的区别。像素这个东西，就像金箍，能变大能变小。系统调节分辨率是使用虚拟色彩块来充当部分像素块，以达到降低分辨率的效果。
    * 像素密度是决定屏幕显示清晰度的。也就是分辨率和尺寸大小共同决定的。



## css 效果

### box-shadow

盒子的阴影

* 营造层次感（立体感）
* 充当没有宽度的边框，它不会占据布局空间
* 特殊效果，无限投影的方式做一些图案

```css
div {
	width: 200px;
  height: 200px;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, .2); /* x方向偏移 y方向偏移 模糊区域 扩展区域 颜色 */
  box-shadow: inset 5px 5px 10px 0 rgba(0, 0, 0, .2); /* 内阴影 */
}
```

### text-shadow

文本的阴影

* 立体感
* 印刷品质感

```css
div {
	text-shadow: 1px 1px 0 #ddd; /* x方向偏移 y方向偏移 模糊区域 颜色 */
}
```

### border-radius

* 圆角矩形
* 圆形
* 半圆/扇形（分别设置四个角）
* 一些奇怪的角角（分别设置半径）

### background

* 纹理、图案
* 渐变
* 雪碧图动画
* 背景图尺寸适应

### clip-path 

按路径进行裁剪

* 对容器进行裁剪
* 常见几何图形
* 自定义路径
* 可以和 svg 一同使用完成裁剪。

### transform

变换 transform

* translate 位移
* scale 缩放
* skew 斜切
* rotate 旋转

3D 变换

在 3D 空间中进行变换



## css 动画

### 动画的原理

* 视觉暂留作用：我们看到的任何画面在我们的脑海中都是会保留一段时间的。在看到一系列差别不大的画面的时候，就会把它想象成连续的动画。
* 画面逐渐变化来产生动画，每秒钟多少个画面，持续不断的呈现。
* 这两点就能产生一个动画。

### 动画的作用

* 愉悦感
* 引起注意
* 反馈
* 掩饰

### css 中的动画类型

* transition 补间动画：两个状态的切换之间的动画。有开头有结尾，中间的过程是补出来的。
* keyframe 关键帧动画：动画的部分还是补间动画，区别是它可以有很多个关键帧，每一种状态之间都可以有一个动画。你指定的每一个状态就是一个关键帧。 
* 逐帧动画：在关键帧动画的基础上可以做逐帧动画，中间是没有补间的，就是没有计算出来的画面。有的只是从第一个跳到第二个的画面。

### transition 补间动画

给出两点的状态，它会去算中间的过程，不能算所有的属性，比如 dispaly: block; 和 display: none; 是有和没有的区别，它中间的渐变是没法算的，所以只能计算一部分属性。

* 位置 - 平移（left/right/margin/transform）
* 方位 - 旋转（transform）
* 大小 - 缩放（transform）
* 透明度（opacity）
* 其他 - 线性变换（transform）

```css
div {
  transition-property: width; /* 动画属性 */
  transition-duration: 3s; /* 动画时间 */
  /* 用来指定动画的时间和进度的关系。除了css内置的属性，还可以自己指定贝塞尔曲线 */ 
  transition-timing-function: ease;  /* 速度曲线 */
  transition-delay: 1s; /* 延迟时间 */
  transition: width 3s ease 1s; /* property duration timing-function delay */
}
```

支持多个属性同时变动：

```css
div {
  transition: width 1s, background 3s; 
  transition: all 1s; /* 该元素所有能够补间动画的属性都加上动画 */
}
```

贝塞尔曲线调试：https://matthewlein.com/tools/ceaser

### keyframes 动画

动画的过程相当于多个补间动画组合到一起，有多个状态之间的变更。它跟过度动画最大的区别是过度动画要求元素的状态得有变化才能有动画，比如 hover 或给它加一个 class。关键帧动画不要求元素的状态有变化，可以给元素指定播放某个动画。定义更加灵活，能控制的更多。

```css
div {
  animation-duration: 3s; /* 动画时间 */
  animation-timing-function: ease-in; /* 速度曲线 */
  animation-delay: 1s; /* 延迟时间 */
  animation-iteration-count: 2; /* 动画播放次数 */
  animation-direction: reverse; /* 指定是否应该轮流反向播放动画 */
  animation-fill-mode: both; /* 当动画不播放时，要应用到元素的样式 */
  animation-play-state: paused; /* 指定动画是否正在运行或已暂停 */
  animation-name: run; /* 关键帧动画名称 */
 	/* duration timing-function delay iteration-count direction fill-mode play-state name */ 
	animation: 3s ease-in 1s 2 reverse both paused run;
}
@keyframes run {
  0% {
		width: 100px;
  }
  100% {
		width: 800px;
  }
}
```

### 逐帧动画

每一帧都是关键帧，中间没有补间的过程。它属于关键帧动画特殊的用法，适用于无法补间计算的动画。因为每一帧都是一个单独的表现，所以资源会比较大，一般需要很多图片来实现逐帧动画。因为关键帧动画中间默认是有补间过度的，所以使用 animation-timing-function: steps(1); 使它在每个关键帧的时间静止，不要有中间的过度。steps() 是指定关键帧之间要有几个过度画面，不想有补间过度就设置 1。



## css 预处理器

### 什么是 css 预处理器

* 基于 css 的另外一种语言
* 通过工具编译成 css
* 添加了很多 css 不具备的特性

### css 预处理器的作用

* 帮助更好的组织 css 代码
* 提高代码复用率
* 提升可维护性

### css 预处理器的能力

* 嵌套 反应层级和约束范围
* 变量和计算 减少重复代码
* extend 和 mixin 代码片段
* 循环 适用于复杂有规律的样式
* import css文件模块化

### 变量

一处定义多处使用。

less

```less
@fontSize: 12px;
@bgColor: red;

div {
	font-size: @fontSize;
  background-color: @bgColor;
}
```

sass

```scss
$fontSize: 12px;
$bgColor: red;

div {
	font-size: $fontSize;
  background-color: $bgColor;
}
```

### mixin

当有一段代码想要服用的时候。

less 

```less
.block(@fontSize) {
  font-size: @fontSize;
  border: 1px solid #ccc;
  border-radius: 4px;
}
div {
  .block(@fontSize);
}
```

sass

```scss
@mixin block($fontSize) {
	font-size: $fontSize;
  border: 1px solid #ccc;
  border-radius: 4px;
}
div {
  @include block($fontSize);
}
```

### extend

引用 mixin 的地方更多，mixin 代码体积更大的时候。编译好的 css 会有很多代码的重复。extend 就是为了解决这个问题的。extend 和 mixin 都是在 css 内部完成样式的服用，但最后生成的结果是有一些不一样的，mixin 是直接把代码复制过来，extend 是把选择器提取出来，然后把公共的样式写到一起。

如果不需要参数来控制，或追求编译的结果是比较小的，就可以考虑使用 extend。如果场景比较复杂，或者带条件的情况就需要 mixin 处理。

less

```less
.block {
	font-size: @fontSize;
  border: 1px solid #ccc;
  border-radius: 4px;
}
div:extend(.block) {
  background-color: #333;
}
```

sass

```scss
.block {
	font-size: @fontSize;
  border: 1px solid #ccc;
  border-radius: 4px;
}
div {
  @extend .block
  background-color: #333;
}
```

### loop

按照一定的规则生成一系列的 css 代码。

less 

less 中实际是没有循环的，但是一个 mixin 是可以调用自己的，所以可以做到递归来达到跟循环类似的效果，定义一个 mixin，然后给 mixin 一个出口，不管是循环还是递归一定要有一个出口，不然就会变成一个死循环。

```less
.gen-col(@n) when (@n > 0) {
	.gen-col(@n - 1);
  .col-@{n} {
		width: 1000px/12*@n;
  }
}
.gen-col(12);
```

循环适用于网格系统、复杂的动画效果、很多元素动画延迟不一样的、很多元素有微小差异样式的，都可以通过循环的方式处理的。

sass 

mixin 递归的方式：

```scss
@mixin gen-col($n) {
  @if $n > 0 {
    @include gen-col($n - 1);
    .col-#{$n} {
      width: 1000px/12*$n;
    }
  }
}
@include gen-col(12);
```

for 循环：

```scss
@for $i from 1 through 12 {
  .col-#{$i} {
    width: 1000px/12*$i;
  }
}
```

### import

处理 css 模块化。css 本身的 import 不会做合并或加载的时候复用连接，它只能一个文件一个文件的请求，这样会增加 http 的连接数，造成性能问题。css 预处理器的 import 会在编译的时候将文件编译到一起，产生一整个 css 文件。

有了模块之后，就可以按照 css 结构去组织文件，按需去拆解 css 文件。

预处理器的变量是可以跨文件使用的，只要正确的 import 引入了即可。

less 

```less
@import "./module1";
@import "./module2";
```

sass

```scss
@import "./module1";
@import "./module2";
```

### css 预处理器框架

预处理器为我们带来了使用他人代码的可能性，通过 css 使用其他的代码只能使用一整套，通过 html 引用 css 文件的方式去做。预处理器的模块化可以使我们按需使用他人写好的代码，也就是 css 预处理器框架。

编译后是我们用了什么代码才会有什么代码。

鼓励使用一些 css 预处理器的框架，也可以自己写一个，把一些常用的 mixin 提出来，在项目中复用。

* sass - compass
* less - lesshat / est
* 提供现成的 mixin
* 类似 js 类库，封装常用功能 



## Bootstrap css组件库

js 框架就是为你框定的一些 js 的编写规范。按照这样的方式去写，框架就能帮你搞定数据同步、渲染之类的。提供了一些基础的东西，你去用。css 框架也是类似的概念。

### Bootstrap

使用的时候，只需要引入它，按照它规定的方式编写，使用指定的 class 就可以完成一个基本的页面。在文档中找到对应的 class 加上就行了。

* 一个 css 框架
* twitter 出品
* 提供通用基础样式

### Bootstrap4

* 兼容 IE10+
* 全面使用 flexbox 布局
* 抛弃 normalize.css
* 提供布局和 reboot 版本

### Bootstrap 基础功能

* 基础样式
* 常用组件
* js 插件

### Bootstrap js插件

Bootstrap 虽然为我们提供了 js 插件，但是它限制还是比较大的，对 html 结构有非常严格的限制，它的 js 是基于 jquery 的，并且需要引入指定的 js。如果我们只是想用 Bootstrap 的样式而不想用 jquery 的技术体系。因此大部分情况下，我们可能不会直接使用 Bootstrap 的 js 插件，尤其是在一些大型需要长期维护的项目中，可能需要自己对组件做一些封装的。如果是管理后台或临时性的项目去使用 js 插件来完成功能是非常快速的。

### Bootstrap 响应式布局

在不同的分辨率下设置不同的分配。

![bootstrap响应式布局](/Users/zhaoyang/tool/images/前端知识体系/html和css/bootstrap响应式布局.png)

![bootstrap响应式布局2](/Users/zhaoyang/tool/images/前端知识体系/html和css/bootstrap响应式布局2.png)

### Bootstrap 定制化

Bootstrap 为我们提供了一套默认的样式，这套样式如果在没有设计的情况下，大部分时候还是觉得比较好看，但是如果你的项目是有设计的，或者风格跟 Bootstrap 有明显的不同的话，就可以对 Bootstrap 进行定制，就是对它的部分风格进行一些修改，以便让它符合我的设计风格。 

* 使用 css 类名覆盖：找到类对应的样式，然后覆盖它。
  * 优点：容易上手，操作简单。
  * 缺点：没法再使用 Bootstrap 写好的变量之间的关系、容易遗漏，需要非常全面的去覆盖 css，否则会产生非常奇怪的 bug。所以这种方法并不是特别推荐使用，但是它用起来很简单，所以如果场景很简单用这种方法也没有太多的问题。
* 修改源码重新构建：Bootstrap 是用预处理器写的，Bootstrap3 是用 less，Bootstrap4 是用 sass，可以直接修改 less 或 sass 的源文件，然后重新编译，这样就会产生一个自己的 Bootstrap 版本。
  * 优点：修改源码的方式是一个非常方便的方式，你只需要找到 Bootstrap 里面的逻辑关系，然后修改一个地方，可能就会达到你想要的效果，很合理，不会留下隐患，做的非常彻底。Bootstrap 源码内部结构非常合理，它把一些东西全部抽象成了变量或 mixin，你只需要修改变量或 mixin，就能改变整个 Bootstrap 的结果，也能把它定制的非常的彻底。
  * 缺点：需要了解 Bootstrap 的源码结构，知道它大概的组织方式。
* 引用 scss 源文件，修改变量：使用自己的 sass 文件，将 Bootstrap 引进来作为 mixin 的方式来使用，把 Bootstrap 当作一个预处理器的框架来使用，可以定制参数，也可以修改里面的变量，可以按需挑选我们需要的模块，并且可以对这些模块做一些定制。
  * 优点：定制的非常干净，使用起来更灵活，可以按需使用，可以控制体积，可以非常好的做定制。
  * 缺点：需要对 Bootstrap 的结构的了解提出了更高的要求，我们需要非常了解 Bootstrap 各个模块的关系，每个模块是做什么的，才能精准的选择使用哪个模块，才能够很好的做定制。

### Bootstrap 的优缺点

优点：源码结构合理、现成的样式可以使用

缺点：定制较为繁琐、体积大

### 自己写 css 框架

#### 设计或选择一个 UI 框架的要点

* 交互友好，美观
* 可复用，提高效率
* 源码可修改可覆盖，易扩展

#### UI 框架的使用所关注的点

* 结构和样式（样式一般都是使用类名来加载的）
* 怎么覆盖或修改ui框架中的默认样式
  * 直接使用ui框架里面的类名进行样式的覆盖
  * 在ui组件上添加一个新的类名做ui框架的样式覆盖或新增一些我们需要的样式
  * 可以在原有ui组件上添加结构和样式来实现相应的样式需求



## css 工程化方案

工程化的本质就是在一个工程或项目中，怎么让这个项目更好的跑起来，所以针对不同的公司和项目，工程化有很多不同的做法，所以没有标准的答案，什么叫做工程化，做到哪些事情叫做工程化，笼统来说，工程化会关注这样几件事情：

* 组织：代码的组织，把代码分成怎样的目录，怎样的模块才方便大家去合作。
* 优化
* 构建：代码写完后需要经过哪些处理步骤，有可能需要优化，有可能需要压缩，再去上线，上线本身也可能属于构建过程的一部分。
* 维护

### postcss

css 工程化中非常有利的一个工具。post 是后的意思，它跟预处理器的概念是相对的，预处理器是把一个不是 css 的语音经过处理之后变成 css，就是先有预处理语言，再有 css。postcss 的过程是把 css 变成 css，是先有 css，再去对 css 代码进行处理。postcss 现在无所谓前置还是后置，它们都是把一段代码进行转换得到最终的 css。预处理器和 postcss 现在本质上没有太大的区别，都是做一些代码解析转换的工作。

过程就是 css 经过 postcss 的解析转换，最后变成 css。 这个解析转换的过程中我们可以做很多事情：

* 模块化：可以对 css 的模块化进行一些处理，解析出来之后把它们的模块做一些合并。
* 加前缀
* 兼容性
* ......

#### postcss 能做什么

* postcss 本身只有解析的能力：就是将一段 css 代码解析成一段结构化的 css。它会告诉你这个地方有一个选择器，选择器里面又一些样式，样式有这样一些属性，它的值是什么。
* 那些变换的能力全部是来自于插件。
* 目前至少有 200 多个插件。

#### 常见的 postcss 插件

* import 模块合并
* autoprefixer 自动加前缀
* cssnano 压缩代码
* cssnext 使用 css 新特性
* precss 变量、mixin、循环等

#### postcss 支持的构建工具

postcss 作为一个 css 处理工具，它本身并不十分擅长构建工作，因此它可以跟其他的构建工具合作使用。基本上不管使用什么构建工具，都可以把 postcss 非常方便的集成进去。

* postcss 自带的 cli 命令行工具
* webpack postcss-loader
* gulp gulp-postcss
* grunt grunt-postcss
* rollup rollup-postcss
* ......

### css-modules

一个组件如何封装好自己的样式，不干扰别人，也不接受别人的干扰。

之所以可能会发生样式冲突，是因为我们定义的 class 等 css 选择器有可能被其他人使用，就是命名冲突，产生互相干扰的问题。所以我们自然就会有一个想法，就是让这些 class 不跟别人的重复。

早期的解决方案就是加前缀名，但是不利于开发。所以我们想能不能照样按照我们方式去写，写完之后产生一个不跟别人冲突的 class，css modules 就是实现了这个的一个方案，就是通过编译将你写的 class 名都改掉，css-loader 的 modules 设置为 true 就会将我们写的 class 改掉，然后当你引入 css 文件模块的时候，它会给你返回一个 class 的列表，这个列表就是原来的 class 跟编译之后的 class 名字的对应关系，然后我们在 html 中使用这个对应关系中的原始类名就可以了。

```js
import styles from "./style.css";
// import { className } from "./style.css";

element.innerHTML = '<div class="' + styles.className + '">';
```

### webpack 和 css

webpack 给 css 提供了相当多的能力和处理方式。

* css-loader 将 css 变成 js
* style-loader 将 js 样式插入 head
* ExtractTextWebpackPlugin 将 css 从 js 中提取出来
* css modules 解决 css 命名冲突的问题
* less-loader sass-loader 等各类预处理器
* postcss-loader postcss处理

### 为什么使用 js 来引用、加载 css

* js 作为入口，管理资源有天然的优势
* 将组件的结构、样式、行为封装到一起，增强内聚
* 可以做更多的灵活处理（webpack）

这些都是使用 js 来管理加载 css 的优势，这也是前端工程化发展的一个重要方向，css 会越来越多的出现在 js 的文件中，作为 js 的依赖而出现，通过编译来实现。



## 三大框架中的 css

### shadowDOM

看到的是一个 DOM，事实上内部有更多的结构，如 \<video>。在浏览器控制台中打开显示 shadowDOM 选项之后，就能看到它的内部结构。shadowDOM 是一种很好的封装页面组件的方法。

* 逻辑上的一个 DOM
* 结构上存在子集结构

### scoped css

scoped css 是跟 shadowDOM 同时代提出来的东西，因为 shadowDOM 是有内部结构的，但是对外这个结构又是不能暴露的，那结构的样式怎么办呢，既然不能对外暴露就不能通过外部样式给它写样式，所以样式只能写在 shadowDOM 的内部，不对外暴露，所以你内部的样式也不可以影响外部的。

* 限定了范围的 css
* 无法影响外部元素
* 外部样式一般不影响内部
* 可以通过 /deep/ 或 >>> 穿透：在 shadowDOM 最后定稿的时候，留了一些余地，可以通过这样的方式去做选择器的穿透，在这种情况下，外部样式是可以影响内部样式的。

### 模拟 scoped css

因为 shadowDOM 和 scoped css 的兼容性都不是很理想，所以想要达到组件样式封装的效果可能还是通过模拟的方式。模拟 scoped css 主要是模拟它的特性，就是内部和外部样式尽量隔离，互相不影响。

* 方案一：随机选择器（css modules的形式）
* 方案二：随机属性
  * \<div abcdefg> 
  * div[abcdefg] { }