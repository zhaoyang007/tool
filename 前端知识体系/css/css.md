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



### 36.移动端事件

touch    touchstart  touchmove touchend touchcancel

click事件也能有效果，但是最好不要去使用   原因：在移动端里click事件会有300ms延迟

因为click事件不是移动端的事件，当点击的时候。浏览器就会处理  300ms   只有safari有

touch事件对象：

touches   targetTouches   changedTouches（touchend事件里面只有这个能用）