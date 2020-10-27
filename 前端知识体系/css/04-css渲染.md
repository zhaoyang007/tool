CSS 中渲染相关的属性：颜色和形状。

布局的 CSS 属性决定了盒的位置，渲染的属性决定了盒如何渲染。



### 颜色

最常见的颜色相关的属性就是 color 和 background-color。

##### RGB 颜色

计算机中，最常见的颜色表示法是 RGB 颜色，它符合光谱三原色理论：红、绿、蓝三种颜色的光可以构成所有的颜色。

计算机中用 0 - 255 的数字表示每一种颜色，这正好占据了一个字节，每一个颜色就占据三个字节。

##### CMYK 颜色

颜料三原色其实是红、绿、蓝的补色，也就是：品红、黄、青。

在印刷行业，使用的就是这样的三原色（品红、黄、青）来调配油墨，这种颜色的表示法叫做 CMYK，它用一个四元组来表示颜色。

##### HSL 颜色

表示人类认知中的颜色，专业的术语叫做色相（H）。加上颜色的纯度（S）和明度（L），就构成了一种颜色的表示。

特别推荐 HSL 颜色，因为它是一种语义化的颜色。

##### 其它颜色

RGBA 表示带透明度的颜色。

名称型的颜色。

##### 渐变

我们可以把渐变看作是一个更复杂的颜色，它非常实用，能够用渐变绘制很多的图像。

background-image 这样的属性，可以设为渐变。CSS 中支持两种渐变：线性渐变，放射性渐变。

###### 线性渐变

```css
linear-gradient(direction, color-stop1, color-stop2, ...);
```

direction：方向或具体的角度

* to bottom
* to top
* to left
* to right
* to bottom left
* to bottom right
* to top left
* to top right
* 120deg
* 3.14rad

color-stop：一个颜色和一个区段

* rgba(255,0,0,0)
* orange
* yellow 10%
* green 20%
* lime 28px

组合一下，产生一个“真正的金色”的背景：

```html
<style>
#grad1 {
    height: 200px;
    background: linear-gradient(45deg, gold 10%, yellow 50%, gold 90%); 
}
</style>
<div id="grad1"></div>
```

###### 放射性渐变

放射性渐变需要一个中心点和若干个颜色：

```css
radial-gradient(shape size at position, start-color, ..., last-color);
```

当我们应用的每一种颜色都是 HSL 颜色时，就产生了一些非常有趣的效果，比如，我们可以通过变量来调整一个按钮的风格：

```html
<style>
.button {
    display: inline-block;
    outline: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font: 14px/100% Arial, Helvetica, sans-serif;
    padding: .5em 2em .55em;
    text-shadow: 0 1px 1px rgba(0,0,0,.3);
    border-radius: .5em;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
    color: white;
    border: solid 1px ;
}
</style>

<div class="button orange">123</div>

<script>
var btn = document.querySelector(".button");
var h = 25;
setInterval(function(){
  h ++;
  h = h % 360;
  btn.style.borderColor=`hsl(${h}, 95%, 45%)`
  btn.style.background=`linear-gradient(to bottom,  hsl(${h},95%,54.1%),  hsl(${h},95%,84.1%))`
},100)
</script>
```



### 形状

CSS 中的很多属性还会产生形状，比如我们常见的属性：

* border
* box-shadow
* border-radius

这些产生形状的属性非常有趣，我们也能看到很多利用它们来产生的 CSS 黑魔法。

然而，这里有一个相反的建议，我们仅仅把它们用于基本的用途，把 border 用于边框、把阴影用于阴影，把圆角用于圆角，所有其它的场景，都有一个更好的替代品：datauri+svg。



### 渲染相关属性

##### background

* 纹理、图案
* 渐变
* 雪碧图动画
* 背景图尺寸适应

##### box-shadow

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

##### text-shadow

文本的阴影

* 立体感
* 印刷品质感

```css
div {
	text-shadow: 1px 1px 0 #ddd; /* x方向偏移 y方向偏移 模糊区域 颜色 */
}
```

##### border-radius

* 圆角矩形
* 圆形
* 半圆/扇形（分别设置四个角）
* 一些奇怪的角角（分别设置半径）

##### clip-path

按路径进行裁剪

* 对容器进行裁剪
* 常见几何图形
* 自定义路径
* 可以和 svg 一同使用完成裁剪。
