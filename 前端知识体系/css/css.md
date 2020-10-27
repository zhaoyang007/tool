### codepen

可以做兼容、可以找效果、可以在线编辑代码   



### bootstrap

简洁、直观、强悍的前端开发框架，让web开发更迅速、简单。可以用来搭建响应式网站



### 移动端 meta 标签

只要网页要在移动端显示，要做移动端的项目，或者是响应式的项目

```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
```



### input 属性 disabled 和 readonly 的区别

disabled 彻底禁用，用户不能输入、更改  表单也不会提交这个字段 

readonly ui禁用，用户不能输入、更改  表单会提交这个字段



### 弹性图片  img-responsive

图片本身是有一个大小的，在做项目的过程中应该让他根据屏幕的宽度去缩放，但是不能超过自己的本身一个最大值。

```css
.a img{
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
```



### rem  根据根元素的字体大小搞来搞去

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



### vw vh

vw：viewpoint width，视窗宽度，1vw等于视窗宽度的1%。

vh：viewpoint height，视窗高度，1vh等于视窗高度的1%。

vmin：vw和vh中较小的那个。

vmax：vw和vh中较大的那个。

IE9+局部支持，chrome/firefox/safari/opera支持，ios safari 8+支持，android browser4.4+支持，chrome for android39支持



### viewport 视图

1.页面不是直接放在屏幕里，是放到viewport里  $(window).width()获取到的其实不是浏览器的宽度，是viewport的宽度

2.pc 里  viewport 的宽就是浏览器的宽

3.移动端里的viewport的宽度不是浏览器的宽度

4.viewport的宽度在980一下的屏幕，宽度都是980,980以上就是浏览器的宽度.

5.移动端里因为viewport宽度超出浏览器的宽度，默认的把viewport给等比缩小，然后放到浏览器里

6.需要在页面title的上方写一个meta标签来设置viewport，让它的宽度和屏幕的宽度一样

老以前的诺基亚时代，访问一个pc网站的时候，只能访问到左上的一部分；
一个pc端的页面在移动端上也是可以把整个页面都演示完的，只不过会缩小显示，但是经过处理，就可以按照设计的想法
在移动端以不同的方式来演示，也就是响应式的技术

其实这个时候的处理就是要把整个页面给放到一个叫做viewport的东西里面，然后再把viewport给缩放一下，最后再渲染到手机屏幕中。



### 移动端事件

touch    touchstart  touchmove touchend touchcancel

click事件也能有效果，但是最好不要去使用   原因：在移动端里click事件会有300ms延迟

因为click事件不是移动端的事件，当点击的时候。浏览器就会处理  300ms   只有safari有

touch事件对象：

touches   targetTouches   changedTouches（touchend事件里面只有这个能用）



### height

* height 不会继承
* 在所有元素都不设置高度的情况下，如果想给某个元素设置 height: 100% 需要从 html 开始，每一层都要设置 height: 100%，才会有效。
* 父级元素的高度会被设置了高度的子元素撑开，高度就为子元素的高度。



### 字体

字体在浏览器中是怎么定义的。

字体族：serif（衬线字体）、sans-serif（非衬线字体）、monospace（等宽字体）、cursive（手写体）、fantasy（花体）。它不是具体的某一个字体，而是字体的一类，如果指定这个，就会在指定的字体族中找一个字体使用。使用中不加引号。

多字体 fallback 机制：系统会找自动寻找指定的字体，有哪个使用哪个，都没有就使用系统默认字体。顺序是根据平台独有的字体放前面。

网络字体（远程）、自定义字体（本地）的使用。

iconfont: 既然可以自定义字体，所谓自定义字体原理就是规定每个字长什么样，如果规定每个字是图标的样子，就可以把文字当做图标用了。

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



### 行高

文字和图片排在一行，图片下面有空隙。原因就是 img 也是符合 inline 元素基线对齐的方式，baseliue 和底线之间是有偏差的，偏差大小跟字体大小有关。解决方案：

- vertical-align: bottom; 调整为底线对齐。
- 将图片改为 block 元素。



### 背景

- 渐变色背景
- 多背景叠加
- base64 和性能优化：base64 是一种文本格式，这串文本就是代表图片本身。base64 格式的图片体积会增大三分之一，放入这个 base64 的文件体积也会增大，所以只适用于非常小的图标。base64 在传输上性能是有优势的，减少http 连接数，但是增大了浏览器解码的开销，要先把它转成图片数据再做其他操作。所以要应用在小量的小图标上。



### 边框

边框背景图

```
div {
  border-image: url(./border.png) 30 round;
}
```



### 滚动

当内容比容器多的时候会产生滚动。

- 滚动行为和滚动条

![滚动条](file:///Users/zhaoyang/tool/images/%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB/html%E5%92%8Ccss/%E6%BB%9A%E5%8A%A8%E6%9D%A1.png?lastModify=1597899655)

scroll：不管需不需要滚动，滚动条都存在。

auto：需要滚动时，滚动条才存在，不需要时不存在。



### 文本折行

文本折行跟滚动有一个相似的地方，都是面临显示不下的问题。当文字在一行显示不下的时候，就要考虑到换行的问题，换行的行为怎么控制，是否换行，什么时候换行，在哪换行。

- overflow-wrap(word-wrap) 通用换行控制，是否保留单词。
- word-break 针对多字节文字。是否把单词或字母看成一个单位。
- white-space 空白处是否换行。

装饰性属性及其他

- 字重（粗体）font-weight
- 斜体 font-style: italic
- 下划线 text-decoration
- 署标指针 cursor



### css  hack

hack 就是不合法但生效的写法。主要用于区分不同浏览器来做兼容的事情。

在一部分浏览器中生效的写法就被称为 css hack。作用是处理浏览器兼容性。

注意：标准属性写在前面，hach 写在后面。

缺点：难理解 难维护 易失效。

代替方案：检测浏览器有没有这样的特性，没有就针对性加 class。

css hack 虽然不是最优雅的最推荐的方式，但它确实是是一种简单粗暴的有效的 css 兼容性的解决方案。



### 案例

- 使用 css 做单选框/复选框的美化
  - label[for] 和 id
  - 隐藏原生 input
  - :checked + label
- 使用 css 和单选框/复选框做 tabs