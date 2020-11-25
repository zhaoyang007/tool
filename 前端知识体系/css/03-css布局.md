### 布局发展历程

* 早期以 table 为主的表格布局。
* 后来以技巧性布局为主的经典布局。
* 现在有 flexbox / grid，正统的专门用来布局的。



### 经典布局

正常流排版：依次排列，排不下了换行。

块级盒和行内级盒：

* 块级元素从上到下顺次排列元素，单独占据一行。
* 行内元素从左至右顺次排列元素到一行，排不下换行。

行内盒变为块级盒的方式：

* float
* position: absolute/fixed
* display: block/inline-block/table-cell

脱离文档流：元素脱离文档流后，margin: 0 auto 属性值会失效。

BFC：

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

像文本一样排 block 元素。

因为文字之间是有间隙的，所以每个 inline-block 的元素之间也存在间隙。

* 把父元素的字体大小设为 0，在里面的元素设置相应的字体大小。
* 把空格去掉或改成注释。

缺点：做自适应比较困难。比较适合做定宽的布局。

##### float

浮动元素会脱离文档流，但是不会脱离文本流。这种布局方式正是 float 本身的含义，float 本来就是用来做类似于图文混排的文字环绕之类的效果的。

浮动元素会形成“块”（BFC）。

###### float 盒：

* 把盒移动到当前行的最上和最左或最右。
* 上面和当前行的行内级格式上下文的上边缘对齐，左/右和当前行的块级格式上下文的左/右边缘对齐。

###### 清除浮动：

* 父元素布局的时候不会去管浮动元素，有可能浮动元素会超出父元素从而对其他的元素产生影响，所以作为父元素一定要清除浮动，保证对外面是无害的，不会影响其他元素。

* 浮动元素不会占据父元素的布局空间，解决浮动元素的父元素高度塌陷的问题。

1.父级添加 overflow 属性（不推荐）

通过触发 BFC 方式（就是负责接管自己的宽高），实现清除浮动。

设置了 overflow 属性，父元素就需要知道内容的高度来设置相应的行为，所以这种方式就可以阻止高度塌陷，从而清除浮动。

```css
.fahter {
  overflow: hidden; /* auto 也可以 */
}
```

2.额外标签法（不推荐）

在最后一个浮动标签后，新加一个标签，给其设置 clear: both; 

3.使用 after 伪元素清除浮动（推荐使用）

因为浮动元素只会影响他后面的块的排列，所以在父元素内部的最下面加一个清除浮动的元素，clear: both; 的意思是保证这个元素的左右两边都是干净的，没有浮动元素，这样就能把父级撑起来它应有的高度，从而把浮动的影响去掉，解决高度塌陷。

```css
.clearfix::after {
  display: block; /* 伪元素默认是 inline 的，inline 元素无法帮我们做清除浮动的事情。 */
  content: " ";
  clear: both;
  height: 0;
  visibility: hidden;
  overflow：hidden;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
```

4.使用 before 和 after 双伪元素清除浮动（万能清除法）（推荐使用）

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



### 经典布局应用

多列布局，就是让几个元素呈现水平方式排列的效果。 

块级元素默认垂直排列，行内元素和行内块元素默认水平排列。

所以想要实现多列布局只要搞定块级元素，使用浮动或把它变成行内块。

##### 居中布局

水平居中布局：

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
  display: block;
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

垂直居中布局：

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

水平垂直居中布局：

就是将水平和垂直居中方案进行整合，这三种方式都可以实现定宽高和不定宽高元素的水平垂直居中。

```html
<div class="parent">
	<div class="child"> 啦啦啦 </div>
</div>

<style>
/* 方案一：inline-block + text-align 实现水平方向居中，table-cell + vertical-align 实现垂直方向居中 */
.parent {
	display: table-cell; 
  vertical-align: middle; 
  text-align: center;
}
.child { 
  display: inline-block;
}
/* 方案二：table/block + margin 实现水平方向居中，table-cell + vertical-align 实现垂直方向居中 */
.parent {
	display: table-cell; 
  vertical-align: middle; 
}
.child { 
  display: table; /* 为了更加符合语义化，改成block也可以，但是只能实现定宽元素的水平垂直居中 */
  margin: 0 auto;
}
/* 方案三：absolute + transform/margin 实现水平方向和垂直方向居中 */
.parent {
	position: relative; /* 不脱离文档流 */
}
.child { 
  position: absolute; 
  top: 50%;
  left: 50%;
  transfrom: translate(-50%, -50%);
}
</style>
```

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

###### 传统三列布局实现圣杯布局效果：

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

###### 圣杯布局：

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

##### 弹性盒演示工具 flexbox-playground

codepen: https://codepen.io/peiqun/pen/WYzzYX

https://github.com/randyviandaputra/flexbox-playground



### 网格布局



### 页面适配

##### 屏幕显示概念

* 像素：https://github.com/jawil/blog/issues/21
* 设备尺寸，分辨率，像素密度
  * 分辨率(单位像素) 1920PX * 1080PX
    * 像素：屏幕上呈现图像的最小单位
  * 设备尺寸 5.2英寸（对角线长度）
  * 像素密度(ppi, 每英寸所拥有的像素数目)
    * ppi = √(横向^2 + 纵向^2) / 屏幕尺寸(inch)
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
