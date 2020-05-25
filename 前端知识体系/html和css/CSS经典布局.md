## 布局

### 什么是布局

简单来说就是HTML页面的整体结构或骨架，类似于传统的报纸或杂志中的排版。

布局不是某个技术内容，而是一种设计思想。



## 居中布局

### 什么是居中布局

一个元素在页面中呈现居中效果。 

### 居中布局的分类

水平居中布局

垂直居中布局

居中布局（水平 + 垂直）

### 水平居中布局

#### 什么是水平居中布局

当前元素在父级元素容器中，水平方向是居中显示的。 

#### 水平居中布局实现方式

* inline-block + text-align 属性配合使用
* table + margin 属性配合使用
* absolute + transform 属性配合使用

#### 第一种解决方案：inline-block + text-align

根据水平居中概念，我们需要在 html 页面中定义一个父子结构的元素：

```html
<div class="parent">
	<div class="child"> 啦啦啦 </div>
</div>
```

通过 css 样式代码实现水平方向居中布局效果：

```css
.parent { text-align: center; }
.child { display: inline-block; }
```

##### 优点：

浏览器兼容性比较好。就是对老版本浏览器是比较友好的。

##### 缺点：

text-align 属性具有继承性，导致子级元素的文本也是居中显示的。

解决：给子级元素设置想要的 text-align 值。

#### 第二种解决方案：table + margin

在 html 页面中定义一个父子结构的元素：

```html
<div class="parent">
	<div class="child"> 啦啦啦 </div>
</div>
```

通过 css 样式代码实现水平方向居中布局效果：

```css
.child { 
  /* display: block; */ /* block也可以 */
  display: table; /* 设置当前元素为<table>这样元素的效果 */
  margin: 0 auto;
}
```

实现居中的 css 属性都是设置给子级元素。不需要给父级元素设置样式。

##### 优点：

只需要对子级元素进行设置。

##### 缺点：

如果子级元素脱离文档流，导致 margin 属性的值无效。

#### 第三种解决方案：absolute + transform

在 html 页面中定义一个父子结构的元素：

```html
<div class="parent">
	<div class="child"> 啦啦啦 </div>
</div>
```

通过 css 样式代码实现水平方向居中布局效果：

```css
.parent { position: relative; }
.child {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

##### 优点：

父级元素是否脱离文档流，不影响子级元素水平居中效果。

##### 缺点：

transform 属性是 css3 中新增属性，浏览器支持情况不好。

### 垂直居中布局

#### 什么是垂直居中布局

当前元素在父级元素容器中，垂直方向是居中显示的。

#### 垂直居中布局实现方式

* table-cell + vertical-align 属性配合使用
* absolute + transform 属性配合使用

#### 第一种解决方案：table-cell + vertical-align

在 html 页面中定义一个父子结构的元素：

```html
<div class="parent">
	<div class="child"> 啦啦啦 </div>
</div>
```

通过 css 样式代码实现垂直方向居中布局效果：

```css
.parent {
	display: table-cell; /* 设置当前元素为<td>这样元素的效果（单元格），单元格的内容是可以设置水平垂直对齐的 */
  vertical-align: middle; /* 用于设置文本内容的垂直方向对齐方式 */
}
```

css 样式都是设置给父级元素。

##### 优点：

浏览器兼容性比较好。

##### 缺点：

vertical-align 属性具有继承性，导致父级元素的文本也是居中显示的。

#### 第二种解决方案：absolute + transform

在 html 页面中定义一个父子结构的元素：

```html
<div class="parent">
	<div class="child"> 啦啦啦 </div>
</div>
```

通过 css 样式代码实现垂直方向居中布局效果：

```css
.parent { position: relative; }
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

##### 优点：

父级元素是否脱离文档流，不影响子级元素垂直居中效果。

##### 缺点：

transform 属性是 css3 中新增属性，浏览器支持情况不好。

### 水平垂直居中布局

#### 什么是水平垂直居中布局

既要水平方向居中，也要垂直方向居中。

#### 居中布局实现方案

就是将水平和垂直居中方案进行整合。

这三种方式都可以实现定宽高和不定宽高元素的水平垂直居中。

* table + margin 实现水平方向居中，table-cell + vertical-align 实现垂直方向居中。
* inline-block + text-align 实现水平方向居中，table-cell + vertical-align 实现垂直方向居中。
* absolute + transform 实现水平方向和垂直方向居中。

#### 第一种解决方案：

在 html 页面中定义一个父子结构的元素：

```html
<div class="parent">
	<div class="child"> 啦啦啦 </div>
</div>
```

通过 css 样式代码实现水平垂直居中布局效果：

```css
.parent {
	display: table-cell; 
  vertical-align: middle; 
}
.child { 
  display: table; /* 为了更加符合语义化，改成block也可以，但是只能实现定宽元素的水平垂直居中 */
  margin: 0 auto;
}
```

#### 第二种解决方案：

在 html 页面中定义一个父子结构的元素：

```html
<div class="parent">
	<div class="child"> 啦啦啦 </div>
</div>
```

通过 css 样式代码实现水平垂直居中布局效果：

```css
.parent {
	display: table-cell; 
  vertical-align: middle; 
  text-align: center;
}
.child { 
  display: inline-block;
}
```

#### 第三种解决方案：

在 html 页面中定义一个父子结构的元素：

```html
<div class="parent">
	<div class="child"> 啦啦啦 </div>
</div>
```

通过 css 样式代码实现水平垂直居中布局效果：

```css
.parent {
	position: relative; /* 不脱离文档流 */
}
.child { 
  position: absolute; 
  top: 50%;
  left: 50%;
  transfrom: translate(-50%, -50%);
}
```

每种方案都有优缺点，要根据实际的需求选择合适的方案。



## 多列布局

### 什么是多列布局

所谓多列布局，就是几个元素呈现水平方式排列的效果。 

块级元素默认垂直排列，浮动可以使其水平排列。内联元素和行内块元素默认水平排列。

所以想要实现多列布局只要搞定块级元素，使用浮动使其水平排列就可以了。

多列布局是经典布局中用的场景最多的，解决方案最复杂的。

### 多列布局的分类

* 两列布局
* 三列布局
* 圣杯布局与双飞翼布局
* 等分布局
* 等高布局
* css3 多列布局

### 两列布局

#### 什么是两列布局

两列布局一般是指定宽与自适应布局，两列中左列是确定的宽度，右列是自动填满剩余空间的布局效果。

#### 两列布局实现方式

* float + margin 属性配合使用
* float + overflow 属性配合使用
* display 属性的 table 相关值使用

#### 第一种解决方案：float + margin

在 html 页面中定义两列的元素：

```html
<div class="left"> 左：定宽 </div>
<div class="right"> 右：自适应 </div>
```

通过 css 样式代码实现两列布局效果：

```css
.left {
	width: 100px;
  float: left;
}
.right { margin-left: 100px; }
```

##### 优点：

实现方式简单。

##### 缺点：

自适应元素的 margin 属性值需与定宽元素的 width 属性值保持一致。产生高耦合。

一个元素浮动（脱离文档流），另一个不浮动。存在层次问题。

老版本浏览器中一个元素浮动，另一个不浮动，会有显示问题的（两个元素之间存在空白区域）。导致兼容性不好。

自适应元素的子级元素中如果存在 clear: both; 会出现显示问题。

#### 第一种解决方案优化版

在 html 页面中定义两列的元素：

```html
<div class="left"> 左：定宽 </div>
<!-- 为自适应元素定义父级元素 -->
<div class="right-fix">
  <div class="right"> 右：自适应 </div>
</div>
```

通过 css 样式代码实现两列布局效果：

```css
.left {
	width: 100px;
  float: left;
  position: relative; /* 设置显示层级更高 */
}
.right-fix {
  float: right;
  width: 100%; /* 浮动元素没有默认继承父级的宽度，所以需要设置宽度 */
  margin-left: -100px;
}
```

##### 优点：

解决了234问题。

##### 缺点：

实现方式复杂。

#### 第二种解决方案：float + overflow

在 html 页面中定义两列的元素：

```html
<div class="left"> 左：定宽 </div>
<div class="right"> 右：自适应 </div>
```

通过 css 样式代码实现两列布局效果：

```css
.left {
	width: 100px;
  float: left;
}
.right { 
  /* 作用：1.溢出时隐藏 2.开启 BFC 模式：当前元素的内部环境与外界完全隔离。 */
  overflow: hidden; 
}
```

##### 优点：

实现方式简单。

第一种方案的问题都没有。

##### 缺点：

BFC 模式开启会有副作用。这里副作用就是 overflow 原本的作用。

#### 第三种解决方案：display 属性的 table 相关值使用

在 html 页面中定义两列的元素及其父元素：

```html
<div class="parent">
	<div class="left"> 左：定宽 </div>
  <div class="right"> 右：自适应 </div>
</div>
```

通过 css 样式代码实现两列布局效果：

```css
.parent {
  display: table; /* 表格的单元格的宽度如果不设置会自动分配 */
  width: 100%; /* 表格不默认继承父元素宽度 */
  table-layout: fixed; 
}
.left, .right { display: table-cell; }
.left { width: 100px; }
```

##### 优点：

浏览器兼容性比较好。

##### 缺点：

将元素的 display 属性设置为 table 相关值，收到相应制约。表格本身的一些特点在布局中是不能出现的，所以要设置其他的相关属性解决。

### 三列布局

#### 什么是三列布局

三列布局一般是指三列中左边两列是确定的宽度，右边一列是自动填满剩余所有空间的一种布局效果。

就是在两列布局的基础上，增加了一列定宽。所以实现方式跟两列布局类似。

#### 三列布局实现方式

* float + margin 属性配合使用
* float + overflow 属性配合使用
* display 属性的 table 相关值使用

#### 实现方式基本与两列布局一致

在 html 页面中定义三列的元素：

```html
<div class="left"></div>
<div class="center"></div>
<div class="right"></div>
```

通过 css 样式代码实现三列列布局效果：

```css
.left, .center {
	width: 100px;
  float: left;
}
.right { 
  margin-legt: 200px; 
}
```

由此可见，我们把三列布局换成四列布局，三个定宽加一个自适应的解决方案依旧是这样的。五列、六列、n 多列都是这样的。

### 圣杯布局

#### 什么是圣杯布局

圣杯布局是来源于该布局效果类似圣杯而得名。简单来说，就是指三行三列布局。

​              头部

定宽 + 自适应 + 定宽

​              底部

#### 圣杯布局核心

圣杯布局主要是实现中间主体部分中的左右定宽 + 中间自适应的三列布局效果。

#### 三列布局实现方式补充

在 html 页面中定义三列的元素：

```html
<div class="left"></div>
<div class="right"></div>
<!-- 非浮动元素可以占据浮动元素的位置，浮动元素不能占据非浮动元素的位置，所以html结构位置要这样排放 -->
<div class="center"></div> 
```

通过 css 样式代码实现三列布局效果：

```css
.left{
	width: 100px;
  float: left;
}
.right { 
  width: 100px;
  float: right;
}
.center {
	margin-legt: 100px;
  margin-right: 100px;
}
```

##### 缺点：

作为主要内容存放容器的 center 放在最后面，不利于搜索引擎的抓取。

#### 圣杯布局的解决方案

在 html 页面中定义三列的元素及其父级元素：

```html
<!-- 在页面布局上小的套路，当原有的html结构没有办法很好的解决的时候，就在现有结构中增加父级结构.或子级元素
，就是改变其结构 -->
<div class="parent">
  <div class="center"></div> <!-- 为了对搜索引擎友好，center放在最前面 -->
  <div class="left"></div>
  <div class="right"></div>
</div>
```

通过 css 样式代码实现圣杯布局效果：

```css
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
  background-color: hotpink;
  width: 100px;
  margin-left: -100%;
  position: relative;
  left: -100px;
  /* transform: translateX(-300px); */
}
.center {
  background-color: khaki;
	width: 100%:
}
.right {
  background-color: lawngreen;
  width: 100px;
  margin-left: -100px;
  position: relative;
  right: -100px;
  /* transform: translateX(300px); */
}
```

### 双飞翼布局

#### 什么是双飞翼布局

双飞翼布局最早由淘宝团队提出，是针对圣杯布局的优化解决方案，主要是优化了圣杯布局中开启定位的问题。

#### 双飞翼布局的解决方案

在 html 页面中定义三列的元素及其父级元素：

```html
<div class="parent">
  <div class="center">
  	<div class="inner"></div>
  </div>
  <div class="left"></div>
  <div class="right"></div>
</div>
```

通过 css 样式代码实现双飞翼布局效果：

```css
.parent {
  height: 300px; /* 解决高度塌陷 */ 
}
.left, .center, .right {
	height: 300px;
  float: left;
}
.left {
  background-color: hotpink;
  width: 100px;
  margin-left: -100%;
}
.center {
  background-color: khaki;
	width: 100%:
}
.right {
  background-color: lawngreen;
  width: 100px;
  margin-left: -100px;
}
.inner {
  height: 300px;
  background-color: lightgrey;
  margin-left: 100px;
  margin-right: 100px;
}
```



## 等分布局

等分布局就是指一行被分为若干列，每一列的宽度是相同的值。

### 等分布局的实现方式

* float 属性实现等分布局效果
* display 属性有关 table 的值实现等分布局效果

### 第一种解决方案

在 html 页面中定义若干列的元素及其父级元素：

```html
<div class="parent">
  <div class="column"></div>
  <div class="column"></div>
  <div class="column"></div>
  <div class="column"></div>
</div>
```

通过 css 样式代码实现等分布局效果：

```css
.column {
  float: left;
  width: 25%;
  height: 300px; /* div默认宽度100%，高度0 */
}
```

### 第二种解决方案

在 html 页面中定义若干列的元素及其父级元素：

```html
<div class="parent">
  <div class="column"></div>
  <div class="column"></div>
  <div class="column"></div>
  <div class="column"></div>
</div>
```

通过 css 样式代码实现等分布局效果：

```css
.parent {
  display: table;
  width: 100%;
  table-layout: fixed;
}
.column {
	display: table-cell;
  height: 300px;
}
```

### 等分布局存在间距的情况

公式：间距 + 容器宽度 = （间距 + 列宽）* N

#### 第一种解决方案

在原有 html 代码基础上，添加一个容器元素：

```html
<div class="parent-fix">
  <div class="parent">
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
  </div>
</div>
```

通过 css 样式代码实现等分布局效果：

```css
.parent-fix {
  overflow: hidden;
}
.parent {
  height: 300px;
  margin-left: -10px; /* 去掉多余的那个 margin-left */
}
.column {
  float: left;
  width: 25%;
  height: 300px; 
  box-sizing: border-box; /* 宽度包括 border padding */
  padding-left: 10px;
}
```

#### 第二种解决方案

在原有 html 代码基础上，添加一个容器元素：

```html
<div class="parent-fix">
  <div class="parent">
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
  </div>
</div>
```

通过 css 样式代码实现等分布局效果：

```css
.parent-fix {
  overflow: hidden;
}
.parent {
  display: table;
  width: 100%;
  table-layout: fixed;
  margin-left: -10px;
}
.column {
	display: table-cell;
  height: 300px;
  box-sizing: border-box;
  padding-left: 10px;
}
```



## 等高布局

### 什么是等高布局

等高布局就是一行被划分成若干列，每一列的高度是相同的值。

### 等高布局的实现方式

* display 属性有关 table 的值实现等高布局效果
* padding + margin 属性实现等高布局效果

### 第一种解决方案

在 html 页面中定义若干列的元素及其父级元素：

```html
<div class="parent">
  <div class="left">aj;fafja;f</div>
  <div class="right">ahf;a fah;f nfha;kjf90wufngna;  ahfakfja;ljfa;lfj fahfaof a faj;</div>
</div>
```

通过 css 样式代码实现等高布局效果：

```css
.parent {
  display: table;
  table-layout: fixed;
}
.left, .right { 
  display: table-cell; /* 表格的单元格默认是等高的 */
  width: 100px;
}
```

### 第二种解决方案

在 html 页面中定义若干列的元素及其父级元素：

```html
<div class="parent">
  <div class="left">aj;fafja;f</div>
  <div class="right">ahf;a fah;f nfha;kjf90wufngna;  ahfakfja;ljfa;lfj fahfaof a faj;</div>
</div>
```

通过 css 样式代码实现等高布局效果：

```css
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
```

这种解决方案实现的不是真正的等高布局，只是视觉上等高的伪等高布局。



## css3 多列布局

### columns 属性

columns 属性是一个简写属性

* column-count 属性：用于定义列的数量或者允许的最大列数。
  * auto：默认值，用于表示列的数量由其他 css 属性决定。
  * number：必须是正整数，定义列的数量。
* column-width 属性：用于定义列的宽度或者列的最小宽度。
  * auto：默认值，用于表示列的宽度由其他 css 属性决定。
  * number：必须是正整数，可以用百分比值或像素值来设定，用于定义列的宽度。

### 列的间距

css3 的多列布局效果会默认分配列与列之间的空白间隙。这个间隙也可以通过相关属性设置。

column-gap 属性用于设置列与列之间的间距。

* normal：用于表示使用浏览器定义列的默认间距，默认值为 1 em。
* length：必须是正整数，用于表示列之间的间距值。

### 列的边框

column-rule 属性用于定义列与列之间的边框，其中包括边框宽度、边框颜色以及边框样式。

* column-rule-width 属性：用于表示列与列之间的边框宽度。
* column-rule-color 属性：用于表示列与列之间的边框颜色。
* column-rule-style 属性：用于表示列与列之间的边框样式。

### 横跨多列

column-span 属性用于定义一个列元素是否跨列。

* none：用于表示元素不跨列。
* all：用于表示元素跨所有列。

### 列的填充

column-fill 属性用于定义列的高度是由内容决定，还是统一高度。

* auto：默认值，表示列的高度是由内容决定的。
* balance：表示列的高度根据内容最多的一列高度为准。

在 html 页面中定义若干列的元素及其父级元素：

```html
<div class="parent">
  <div class="col1"></div>
  <div class="col2"></div>
  <div class="col3"></div>
  <div class="col4"></div>
</div>
<div class="parent2">
  <div class="col5"></div>
</div>
```

通过 css 样式代码实现多列布局效果：

```css
.parent, .parent2 {
  /* column-count: 4;
  column-width: 300px; */
  columns: 4 300px;
  column-gap: 10px;
  /* column-rule-width: 5px;
  column-rule-color: tomato;
  column-rule-style: double; */
  column-rule: 5px tomato double;
}
.col5 {
  column-span: all;
}
.col1, .col2, .col3, .col4, .col5 { height: 300px; }
```



## 全屏布局

### 什么是全屏布局

全屏布局就是指 html 页面铺满整个浏览器窗口，并且没有滚动条，而且还可以跟随浏览器的大小变化而变化。

整个页面的高度和宽度都是自适应的效果。全屏布局中充斥着各种自适应的效果。 最终才能展示出全屏布局的理想效果。是一种整合的解决方案，办法也是多种多样的。

### 全屏布局的解决方案

在 html 页面中定义全屏效果的元素：

```html
<header></header>
<div class="content">
  <div class="left"></div>
  <div class="right"></div>
</div>
<footer></footer>
```

通过 css 样式代码实现全屏布局效果：

```css
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
  height: 100%;
  position: fixed;
  left: 0;
  top: 100px;
  bottom: 100px;
  background-color: lightcoral;
}
.content .right {
  height: 100px; /* 块元素默认高度是其子级元素的高度撑起的，并不能设置100%。定位脱离文档流后可以设置100% */
  margin-left: 300px;
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
```



## 总结

未讲解到的 css 布局

* 网格布局
* 弹性盒布局

没有一招鲜吃遍天的解决方案。