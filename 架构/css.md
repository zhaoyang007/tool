# css

## 隐藏页面的方式

`opacity: 0`：占据空间，可以交互。

`visibility: hidden`：占据空间，不可交互。

`display: none`：不占据空间，不可交互。

`transform: scale(0, 0)`：占据空间，不可交互。

## 水平垂直居中

水平居中：

```html
<div class="parent">
	<div class="child"> 啦啦啦 </div>
</div>

<style>
/* 方案一：inline-block + text-align */
.parent { text-align: center; }
.child { display: inline-block; }
/* 方案二：block + margin */
.child { 
  width: 100px; /* 需要设置宽度 */
  display: block; /* 设置成table可以不设置宽度 */
  margin: 0 auto;
}
/* 方案三：absolute + transform/margin */
.parent { position: relative; }
.child {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
```

垂直居中：

```html
<div class="parent">
	<div class="child"> 啦啦啦 </div>
</div>

<style>
/* 方案一：table-cell + vertical-align */
.parent {
	display: table-cell; /* 单元格的内容是可以设置水平垂直对齐的 */
  vertical-align: middle; /* 用于设置文本内容的垂直方向对齐方式 */
}
/* 方案二：absolute + transform/margin */
.parent { position: relative; }
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
```

## BFC（块级格式化上下文）

BFC 是指一块独立的区域，与外部的元素不互相产生影响。

BFC 触发条件：

* position: fixed/absolute
* float 不是 none
* display: flex/inline-block/table-cell/table-caption
* overflow 不为 visible

BFC 应用：

1. 清除浮动
2. 防止同一 BFC 容器中的相邻元素间的外边距重叠问题

## 清除浮动

1.父级添加 overflow 属性

通过触发 BFC 方式（就是负责接管自己的宽高），实现清除浮动。

```css
.fahter {
  overflow: hidden; /* auto 也可以 */
}
```

2.额外标签 clear: both;

在最后一个浮动标签后，新加一个标签，给其设置 clear: both; 

3.使用 after 伪元素清除浮动

```css
.clearfix::after {
  display: block; /* 伪元素默认是 inline 的，inline 元素无法帮我们做清除浮动的事情。 */
  content: " ";
  clear: both;
  height: 0;
  visibility: hidden;
  overflow：hidden;
}
```

4.万能清除法

```css
.clearfix::before, .clearfix::after {
  display: block;
  content: " ";
}
.clearfix::after {
  clear: both;
}
```

## css 怎么开启硬件加速(GPU 加速)

- transform: translate3d(0, 0, 0) （当 3D 变换的样式出现时会使用 GPU 加速）
- opacity
- filter

再使用 will-change 设置上面属性。

## 对 requestAnimationFrame 的理解

请求动画的 API

## rem  根据根元素的字体大小搞来搞去

```css
html {
  font-size: 62.5%; /* 10÷16=62.5% */
}
@media only screen and (min-width: 481px){
  html {
    font-size: 94%!important; /* 15.04÷16=94% */
  }
}
@media only screen and (min-width: 561px){
  html {
    font-size: 109%!important; /* 17.44÷16=109% */
  }
}
@media only screen and (min-width: 641px){
  html {
    font-size: 125%!important; /* 20÷16=125% */
  }
}
```

## 字体

指定字体：

```
body {
  font-family: 'PingFang SC', 'Microsoft Yahei', serif;
}
```

自定义字体：

```
@font-face {
  font-family: 'IF';
  src: url('./IndieFlower.ttf');
}
.custom-font {
  font-family: 'IF';
}
```

iconfont: 

既然可以自定义字体，所谓自定义字体原理就是规定每个字长什么样，如果规定每个字是图标的样子，就可以把文字当做图标用了。

## 移动端1像素边框实现

```css
@charset "utf-8";
.border,
.border-top,
.border-right,
.border-bottom,
.border-left,
.border-topbottom,
.border-rightleft,
.border-topleft,
.border-rightbottom,
.border-topright,
.border-bottomleft {
    position: relative;
}
.border::before,
.border-top::before,
.border-right::before,
.border-bottom::before,
.border-left::before,
.border-topbottom::before,
.border-topbottom::after,
.border-rightleft::before,
.border-rightleft::after,
.border-topleft::before,
.border-topleft::after,
.border-rightbottom::before,
.border-rightbottom::after,
.border-topright::before,
.border-topright::after,
.border-bottomleft::before,
.border-bottomleft::after {
    content: "\0020";
    overflow: hidden;
    position: absolute;
}
/* border
 * 因，边框是由伪元素区域遮盖在父级
 * 故，子级若有交互，需要对子级设置
 * 定位 及 z轴
 */
.border::before {
    box-sizing: border-box;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: 1px solid #eaeaea;
    transform-origin: 0 0;
}
.border-top::before,
.border-bottom::before,
.border-topbottom::before,
.border-topbottom::after,
.border-topleft::before,
.border-rightbottom::after,
.border-topright::before,
.border-bottomleft::before {
    left: 0;
    width: 100%;
    height: 1px;
}
.border-right::before,
.border-left::before,
.border-rightleft::before,
.border-rightleft::after,
.border-topleft::after,
.border-rightbottom::before,
.border-topright::after,
.border-bottomleft::after {
    top: 0;
    width: 1px;
    height: 100%;
}
.border-top::before,
.border-topbottom::before,
.border-topleft::before,
.border-topright::before {
    border-top: 1px solid #eaeaea;
    transform-origin: 0 0;
}
.border-right::before,
.border-rightbottom::before,
.border-rightleft::before,
.border-topright::after {
    border-right: 1px solid #eaeaea;
    transform-origin: 100% 0;
}
.border-bottom::before,
.border-topbottom::after,
.border-rightbottom::after,
.border-bottomleft::before {
    border-bottom: 1px solid #eaeaea;
    transform-origin: 0 100%;
}
.border-left::before,
.border-topleft::after,
.border-rightleft::after,
.border-bottomleft::after {
    border-left: 1px solid #eaeaea;
    transform-origin: 0 0;
}
.border-top::before,
.border-topbottom::before,
.border-topleft::before,
.border-topright::before {
    top: 0;
}
.border-right::before,
.border-rightleft::after,
.border-rightbottom::before,
.border-topright::after {
    right: 0;
}
.border-bottom::before,
.border-topbottom::after,
.border-rightbottom::after,
.border-bottomleft::after {
    bottom: 0;
}
.border-left::before,
.border-rightleft::before,
.border-topleft::after,
.border-bottomleft::before {
    left: 0;
}
@media (max--moz-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.49), (max-device-pixel-ratio: 1.49), (max-resolution: 143dpi), (max-resolution: 1.49dppx) {
    /* 默认值，无需重置 */
}
@media (min--moz-device-pixel-ratio: 1.5) and (max--moz-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49), (min-device-pixel-ratio: 1.5) and (max-device-pixel-ratio: 2.49), (min-resolution: 144dpi) and (max-resolution: 239dpi), (min-resolution: 1.5dppx) and (max-resolution: 2.49dppx) {
    .border::before {
        width: 200%;
        height: 200%;
        transform: scale(.5);
    }
    .border-top::before,
    .border-bottom::before,
    .border-topbottom::before,
    .border-topbottom::after,
    .border-topleft::before,
    .border-rightbottom::after,
    .border-topright::before,
    .border-bottomleft::before {
        transform: scaleY(.5);
    }
    .border-right::before,
    .border-left::before,
    .border-rightleft::before,
    .border-rightleft::after,
    .border-topleft::after,
    .border-rightbottom::before,
    .border-topright::after,
    .border-bottomleft::after {
        transform: scaleX(.5);
    }
}
@media (min--moz-device-pixel-ratio: 2.5), (-webkit-min-device-pixel-ratio: 2.5), (min-device-pixel-ratio: 2.5), (min-resolution: 240dpi), (min-resolution: 2.5dppx) {
    .border::before {
        width: 300%;
        height: 300%;
        transform: scale(.33333);
    }
    .border-top::before,
    .border-bottom::before,
    .border-topbottom::before,
    .border-topbottom::after,
    .border-topleft::before,
    .border-rightbottom::after,
    .border-topright::before,
    .border-bottomleft::before {
        transform: scaleY(.33333);
    }
    .border-right::before,
    .border-left::before,
    .border-rightleft::before,
    .border-rightleft::after,
    .border-topleft::after,
    .border-rightbottom::before,
    .border-topright::after,
    .border-bottomleft::after {
        transform: scaleX(.33333);
    }
}
```

## 布局

### 经典布局

行内盒变为块级盒的方式：

* float
* position: absolute/fixed
* display: block/inline-block/table-cell

脱离文档流：元素脱离文档流后，margin: 0 auto 属性值会失效。

正常流布局主要是使用：

* table 属性。
* inline-block 利用块级元素的纵向排布和行内元素的横向排布来完成布局的。
* float 使块级元素横向排布。

##### 表格布局

表格

```html
<style>
  table {
    width: 800px;
    height: 200px;
    border-collapse: collapse; /* 合并边框 */
  }
</style>

<table>
  <tr>
    <td class="left">左</td>
    <td class="right">右</td>
  </tr>
</table>
```

css 规范中，可以设定一个元素长得像表格。

```html
<style>
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
</style>

<div class="table">
  <div class="table-row">
    <div class="table-cell left">左</div>
    <div class="table-cell right">右</div>
  </div>
</div>
```

##### inline-block 布局

因为文字之间是有间隙的，所以每个 inline-block 的元素之间也存在间隙。

* 把父元素的字体大小设为 0，在里面的元素设置相应的字体大小。
* 把空格去掉或改成注释。

缺点：做自适应比较困难。比较适合做定宽的布局。

##### float

浮动元素会脱离文档流，但是不会脱离文本流。这种布局方式正是 float 本身的含义，float 本来就是用来做类似于图文混排的文字环绕之类的效果的。

浮动元素会形成“块”（BFC）。

float 盒：

* 把盒移动到当前行的最上和最左或最右。
* 上面和当前行的行内级格式上下文的上边缘对齐，左/右和当前行的块级格式上下文的左/右边缘对齐。

### 经典布局应用

##### 两列布局

左列定宽，右列自适应。

左边两列是定宽，右边一列自适应，就是三列布局。四列、五列、六列、n 多列都是这样。

```html
<div class="parent">
	<div class="left"> 左：定宽 </div>
  <div class="right"> 右：自适应 </div>
</div>

<style>
/* 方案一：float + margin */
.left {
	width: 100px;
  float: left;
}
.right { 
  margin-left: 100px; 
}
/* 方案二：float + overflow */
.left {
	width: 100px;
  float: left;
}
.right { 
  overflow: hidden; /* 作用：1.溢出时隐藏 2.开启 BFC 模式：当前元素的内部环境与外界完全隔离。 */
}
/* 方案三：table 相关属性 */
.parent {
  display: table; /* 表格的单元格的宽度如果不设置会自动分配 */
  width: 100%; /* 表格不默认继承父元素宽度 */
}
.left, .right { 
  display: table-cell; 
}
.left { 
  width: 100px; 
}
</style>
```

##### 圣杯布局

左右定宽，中间自适应。

圣杯布局是来源于该布局效果类似圣杯而得名。简单来说，就是指三行三列布局。

​              头部

定宽 + 自适应 + 定宽

​              底部

传统三列布局实现圣杯布局效果：

缺点：作为主要内容存放的容器 center 放在最后面，不利于搜索引擎的抓取。

```html
<div class="left"></div>
<div class="right"></div>
<!-- 非浮动元素可以占据浮动元素的位置，浮动元素不能占据非浮动元素的位置，所以html结构位置要这样排放 -->
<div class="center"></div> 

<style>
.left{
	width: 100px;
  float: left;
}
.right { 
  width: 100px;
  float: right;
}
.center {
	margin-left: 100px;
  margin-right: 100px;
}
</style>
```

圣杯布局：

三列都左浮动之后，center 占 100%，然后使用 margin 把被挤下去的左右定宽挪到相应位置即可。

```html
<!-- 当原有的html结构没有办法很好的解决的时候，就在现有结构中增加父级结构或子级元素，改变其结构 -->
<div class="parent">
  <div class="center"></div> <!-- 为了对搜索引擎友好，center放在最前面 -->
  <div class="left"></div>
  <div class="right"></div>
</div>

<style>
.parent {
  height: 300px; /* 解决高度塌陷 */
  margin-left: 100px;
  margin-right: 100px;
}
.left, .center, .right {
	height: 300px;
  float: left;
}
.left {
  width: 100px;
  margin-left: -100%;
  position: relative;
  left: -100px;
  /* transform: translateX(-100px); */
}
.center {
	width: 100%;
}
.right {
  width: 100px;
  margin-left: -100px;
  position: relative;
  right: -100px;
  /* transform: translateX(100px); */
}
</style>
```

##### 双飞翼布局

针对圣杯布局的优化，主要是优化了圣杯布局中开启定位的问题。

```html
<div class="parent">
  <div class="center">
  	<div class="inner"></div>
  </div>
  <div class="left"></div>
  <div class="right"></div>
</div>

<style>
.parent {
  height: 300px;
}
.left, .center, .right {
	height: 300px;
  float: left;
}
.left {
  width: 100px;
  margin-left: -100%;
}
.center {
	width: 100%:
}
.right {
  width: 100px;
  margin-left: -100px;
}
.inner {
  height: 300px;
  margin-left: 100px;
  margin-right: 100px;
}
</style>
```

##### 等分布局

一行被分为若干列，每一列的宽度是相同的。

```html
<div class="parent">
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
</div>

<style>
/* 方案一：百分比宽度 + inline-block。 */
/* float 也可以实现类似的效果，但是 float 元素只能做顶对齐，不如 inline-block 灵活。 */
.parent {
  font-size: 0;
}
.column {
  width: 33.33%;
 	height: 300px;
  display: inline-block;
  outline: solid 1px blue;
 	font-size: 30px;
}
/* 方案二：百分比宽度 + float */
.parent {
  height: 300px;
  /* 等分布局存在间距的情况，去掉多余的那个 margin-left
  margin-left: -10px; 
  */
}
.column {
  float: left;
  width: 25%;
  height: 300px; 
  /* 等分布局存在间距的情况
  box-sizing: border-box;
  padding-left: 10px;
  */
}
/* 方案三：display: table; + display: table-cell; */
.parent {
  display: table;
  width: 100%;
  /* 等分布局存在间距的情况，去掉多余的那个 margin-left
  margin-left: -10px;
 	*/
}
.column {
	display: table-cell;
  height: 300px;
  /* 等分布局存在间距的情况
  box-sizing: border-box;
  padding-left: 10px;
  */
}
</style>
```

##### 等高布局

一行被划分成若干列，每一列的高度是相同的。

```html
<div class="parent">
  <div class="left">aj;fafja;f</div>
  <div class="right">ahf;a fah;f nfha;kjf90wufngna;  ahfakfja;ljfa;lfj fahfaof a faj;</div>
</div>

<style>
/* 方案一：float + padding + margin */
/* 这种解决方案实现的不是真正的等高布局，只是视觉上等高的伪等高布局。 */
.parent {
  overflow: hidden; /* 解决浮动元素的父级元素高度塌陷问题 */
}
.left, .right { 
  width: 100px;
  float: left;
  padding-bottom: 9999px;
  margin-bottom: -9999px;
}
.right {overflow: hidden;}
/* 方案二：display: table + display: table-cell; */
.parent {
  display: table;
  width: 100%;
}
.left, .right { 
  display: table-cell; /* 表格的单元格默认是等高的 */
  width: 100px;
}
</style>
```

##### 全屏布局

全屏布局是指 html 页面铺满整个浏览器窗口，没有滚动条，可以跟随浏览器的大小变化而变化。

整个页面的高度和宽度都是自适应的效果。

主要的实现方式就是使用定位。

```html
<header></header>
<div class="content">
  <div class="left"></div>
  <div class="right"></div>
</div>
<footer></footer>

<style>
  html, body {
    margin: 0;
    overflow: hidden; /* 保证垂直或水平方向不会出现滚动条 */
  }
  header {
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: lightgray;
  }
  .content {
    position: fixed;
    left: 0;
    right: 0;
    top: 100px;
    bottom: 100px;
    background-color: lightblue; 
    overflow: auto; /* 处理内容溢出 */
  }
  .content .left {
    width: 300px;
    position: fixed;
    left: 0;
    top: 100px;
    bottom: 100px;
    background-color: lightcoral;
  }
  .content .right {
    position: fixed;
    top: 100px;
    bottom: 100px;
    right: 0;
    left: 300px;
    background-color: greenyellow;
  }
  footer {
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: lightslategray;
  }
</style>
```

### 弹性布局（flexbox）

##### 弹性容器

弹性容器控制的就是：主轴方向，是否可以换行，子元素在主轴和侧轴的排列（对齐）方式。

```js
// 设置在弹性父元素身上，子元素的布局方式就会按照flex的方式去排版
display: flex; 

// 设置主轴方向
flex-direction: row;            // 主轴为水平轴，从左到右。默认值
flex-direction: row-reverse;    // 主轴为水平轴，从右到左
flex-direction: column;         // 主轴为垂直轴，从上到下
flex-direction: column-reverse; // 主轴为垂直轴，从下到上

// 当弹性子元素超出弹性容器范围时是否换行
flex-wrap: nowrap;       // 不换行，超出的话，每个子元素都会缩小。默认值。
flex-wrap: wrap;         // 换行
flex-wrap: wrap-reverse; // 换行，且侧轴的起始和结束位置互换

// flex-direction和flex-wrap的复合属性
flex-flow: row nowrap;

// 设置子元素在主轴方向上的排列方式
justify-content: flex-start;    // 从主轴开始点位置开始排列。默认值。
justify-content: flex-end;      // 从主轴结束点位置开始排列
justify-content: center;        // 从中间位置开始排列
justify-content: space-between; // 把主轴上的剩余空间分成n-1份（n是一行子元素的个数）然后插入到子元素中间
justify-content: space-around;  // 把主轴上的剩余空间分成2n份（n是一行子元素的个数）然后在每一个子元素两侧都分配一份

// 设置子元素在侧轴方向上的排列方式
// 一般用于一行元素侧轴排列方式，使元素位于行中
align-items: flex-start; // 从侧轴开始点位置开始排列。默认值。
align-items: flex-end; 	 // 从侧轴结束点位置开始排列
align-items: center;     // 从中间位置开始排列
align-items: stretch;    // 当子元素不设置侧轴方向的宽高属性的时候，会自动去侵占剩余空间
align-items: baseline;   // 子元素会以内容区域去互相对齐
// 一般用于多行元素侧轴排列方式，使行位于容器中
align-content: flex-start;    // 从侧轴开始点位置开始排列。默认值。
align-content: flex-end;      // 从侧轴结束点位置开始排列
align-content: center;        // 从中间位置开始排列
align-content: space-between; // 把侧轴上的剩余空间分成n-1份（n是一行子元素的个数）然后插入到子元素中间
align-content: space-around;  // 把主轴上的剩余空间分成2n份（n是一行子元素的个数）然后在每一个子元素两侧都分配一份
```

##### 弹性子元素

弹性子元素控制的就是：子元素的扩展，收缩，宽度，覆盖父容器在侧轴的单行情况设置的排列方式。

```js
// 设置弹性子元素的扩展比率
// 可以控制子元素侵占主轴方向上的剩余空间，把剩余空间按照子元素的flex-grow去分割，然后按需分配
flex-grow: 0; // 默认值0

// 设置弹性子元素的收缩比率
// 可以控制在超出并且不换行的子元素主轴方向上的收缩，把需要空出来的空间按照子元素的flex-shrink去分割，然后按需分配
flex-shrink: 1; // 默认值1

// 分配剩余空间前，决定弹性子元素在主轴方向上的大小
// 优先级：max-width/min-width > flex-basis > width
// 当flex-item宽度和大于flex容器宽度，不管通过哪个属性设置的宽度，flex-item宽度要根据flex-shrink值缩小。
flex-basis: auto;  // 如果未指定宽度，则宽度将根据内容决定。默认值。
flex-basis: 100px; // 固定宽度
flex-basis: 10%;   // 占弹性容器的百分比

// flex-grow, flex-shrink和flex-basis的复合属性
flex: 0 1 100px;

// 控制弹性子元素的顺序
// 如果子元素的order值相同，按照文档里的顺序去排列。如果子元素的order值不同，按照order值从小到大排列
order: 0; // 默认值0

// 允许独立的弹性子元素覆盖弹性容器的默认在侧轴且是单行的对齐方式(align-items)
align-self: flex-start; // 从侧轴开始点位置开始排列。默认值。
align-self: flex-end; 	// 从侧轴结束点位置开始排列
align-self: center;     // 从中间位置开始排列
align-self: stretch;    // 当子元素不设置侧轴方向的宽高属性的时候，会自动去侵占剩余空间
align-self: baseline;   // 子元素会以内容区域去互相对齐
```

### 页面适配

##### 屏幕显示概念

* 像素：https://github.com/jawil/blog/issues/21
* 设备尺寸，分辨率，像素密度
  * 分辨率(单位像素) 1920PX * 1080PX
    * 像素：屏幕上呈现图像的最小单位
  * 设备尺寸 5.2英寸（对角线长度）
  * 像素密度(ppi, 每英寸所拥有的像素数目)
    * ppi = √(横向^2 + 纵向^2) / 屏幕尺寸(inch)
    * 像素密度越大，相当于同尺寸下拥有的像素越多，所以显示效果更细腻，更好，实际的像素物理尺寸更小，就可以显示下更多的像素（色彩块）。
  * 小结：
    * 做适配要关心的是分辨率而不是屏幕尺寸。
    * 在同一个设备上，它的像素个数和像素大小是固定的了，也就是系统的最高分辨率，这是厂商在出厂时就设置好了的，只有不同的设备之间，才有像素大小的区别。像素是没有实际的物理尺寸的，像素这个东西，就像金箍，能变大能变小。系统调节分辨率是使用虚拟色彩块来充当部分像素块，以达到降低分辨率的效果。
    * 像素密度是决定屏幕显示清晰度的。也就是分辨率和尺寸大小共同决定的。

##### 自适应

同一个页面在不同尺寸的屏幕下，页面都能完美呈现。

百分比 

* width：基于父级宽度
* height：基于父级高度
* margin, padding：基于父级宽度
* left：基于父级宽度
* top：基于父级高度

flex 

media 

rem 

vw vh 

##### 响应式

同一个页面在不同尺寸的屏幕下，元素的排列、展示的形式都会不同。

企业站、资讯类等等页面结构简单的网站，适合响应式。

优点：

* 节省成本，只写一套网页就能让多种终端完美适配

缺点：

* 有兼容问题，低版本浏览器不兼容
* 页面体积会变大，移动端访问耗费流量，响应速度变慢
* 代码冗余，开发难度增大

主要方法：

* 设计的支持：隐藏 + 折行 + 自适应空间

* 技术实现

  * rem：通过 html 的字体大小来确定元素大小，使用这个单位进行布局，针对不同大小的屏幕给出不同大小的字号，元素就会跟着缩放。rem 有时换算完是不精准的。

  * viewport：确定要将页面整个界面放到多大，一般都是设置成设备的宽度。

  * media query：媒体查询，根据不同设备的特性来匹配不同的样式，给小屏和大屏分别写一套样式。大屏幕的样式写在上面，优先满足小屏。

    ```css
    @media screen and (min-width:750px){
      section div{
        width: 50%;
      }
    }
    ```

## Css 动画

##### transition 补间动画

两个状态的切换之间的动画。有开头有结尾，中间的过程是补出来的。

给出两点的状态，它会去算中间的过程，不能算所有的属性，比如 dispaly: block; 和 display: none; 是有和没有的区别，它中间的渐变是没法算的，所以只能计算一部分属性。

* 位置 - 平移（left/right/margin/transform）
* 方位 - 旋转（transform）
* 大小 - 缩放（transform）
* 透明度（opacity）
* 其他 - 线性变换（transform）

```css
div {
  /* 要变换的动画属性 */
  transition-property: width; 
  /* 动画的时长 */
  transition-duration: 3s; 
  /* 速度时间曲线，用来指定动画的时间和进度的关系。除了css内置的属性，还可以自己指定贝塞尔曲线，贝塞尔曲线的作用就是让变化平滑的度过 */
  transition-timing-function: ease;  
  /* 延迟时间 */
  transition-delay: 1s; 
  /* 组合写法 */
  /* property duration timing-function delay */
  transition: width 3s ease 1s; 
}
```

transition 可以重复多次，指定多个属性的变换规则。

```css
div {
  transition: width 1s, background 3s; 
  transition: all 1s; /* 该元素所有能够补间动画的属性都加上动画 */
}
```

##### keyframes 动画

动画的部分还是补间动画，区别是它可以有很多个关键帧。

```css
div {
  animation-duration: 3s; /* 动画时间 */
  animation-timing-function: ease-in; /* 动画的速度时间曲线 */
  animation-delay: 1s; /* 动画开始前的延迟时间 */
  animation-iteration-count: 2; /* 动画播放次数 */
  animation-direction: reverse; /* 指定是否应该轮流反向播放动画 */
  animation-fill-mode: both; /* 当动画不播放时，要应用到元素的样式 */
  animation-play-state: paused; /* 指定动画是否正在运行或已暂停 */
  animation-name: run; /* 关键帧动画名称 */
  /* 组合写法 */
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

transition 和 animation 组合使用，抛弃 animation 的 timing-function，以编排不同段用不同的曲线。

在这个例子中，在 keyframes 中定义了 transition 属性，以达到各段曲线都不同的效果。

```js
@keyframes mykf {
  from { top: 0; transition:top ease}
  50% { top: 30px; transition:top ease-in }
  75% { top: 10px; transition:top ease-out }
  to { top: 0; transition:top linear}
}
```

##### 逐帧动画

在关键帧动画的基础上可以做逐帧动画，中间是没有补间的，就是没有计算出来的画面。有的只是从第一个跳到第二个的画面。

每一帧都是关键帧，中间没有补间的过程。它属于关键帧动画特殊的用法，适用于无法补间计算的动画。因为每一帧都是一个单独的表现，所以资源会比较大，一般需要很多图片来实现逐帧动画。因为关键帧动画中间默认是有补间过度的，所以使用 animation-timing-function: steps(1); 使它在每个关键帧的时间静止，不要有中间的过度。steps() 是指定关键帧之间要有几个过度画面，不想有补间过度就设置 1。