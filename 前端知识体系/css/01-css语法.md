CSS 的顶层样式表由两种规则组成的规则列表构成：

* at-rule：at 规则，由 @ 关键字和一个区块组成。
* qualified rule：普通规则，由选择器和属性指定构成的规则。



### at 规则

* @charset ： https://www.w3.org/TR/css-syntax-3/
* @import ：https://www.w3.org/TR/css-cascade-4/
* @media ：https://www.w3.org/TR/css3-conditional/
* @page ： https://www.w3.org/TR/css-page-3/
* @counter-style ：https://www.w3.org/TR/css-counter-styles-3
* @keyframes ：https://www.w3.org/TR/css-animations-1/
* @fontface ：https://www.w3.org/TR/css-fonts-3/
* @supports ：https://www.w3.org/TR/css3-conditional/
* @namespace ：https://www.w3.org/TR/css-namespaces-3/

##### @charset

@charset 用于提示 CSS 文件使用的字符编码方式，如果被使用，必须出现在最前面。这个规则只在给出语法解析阶段前使用，并不影响页面上的展示效果。

```css
@charset "utf-8";
```

##### @import

@import 用于引入一个 CSS 文件，除了 @charset 规则不会被引入，@import 可以引入另一个文件的全部内容。

```css
@import "mystyle.css";
@import url("mystyle.css");
```

```css
@import [ <url> | <string> ]
        [ supports( [ <supports-condition> | <declaration> ] ) ]?
        <media-query-list>? ;
```

通过代码，我们可以看出，import 还支持 supports 和 media query 形式。

##### @media

media query 使用规则，能够对设备的类型进行一些判断。在 media 的区块内，是普通规则列表。

```css
@media print {
    body { font-size: 10pt }
}
```

##### @page

page 用于分页媒体访问网页时的表现设置，页面是一种特殊的盒模型结构，除了页面本身，还可以设置它周围的盒。

```css
@page {
  size: 8.5in 11in;
  margin: 10%;

  @top-left {
    content: "Hamlet";
  }
  @top-right {
    content: "Page " counter(page);
  }
}
```

##### @ counter-style

counter-style 产生一种数据，用于定义列表项的表现。

```css
@counter-style triangle {
  system: cyclic;
  symbols: ‣;
  suffix: " ";
}
```

##### @ key-frames

keyframes 产生一种数据，用于定义动画关键帧。

```css
@keyframes diagonal-slide {
  from {
    left: 0;
    top: 0;
  }

  to {
    left: 100px;
    top: 100px;
  }
}
```

##### @ fontface

fontface 用于定义一种字体，icon font 技术就是利用这个特性来实现的。

```css
@font-face {
  font-family: Gentium;
  src: url(http://example.com/fonts/Gentium.woff);
}

p { font-family: Gentium, serif; }
```

##### @ support

support 检查环境的特性，它与 media 比较类似。

##### @ namespace

用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间。

##### @ viewport

用于设置视口的一些特性，不过兼容性目前不是很好，多数时候被 HTML 的 meta 代替。

##### 其它

除了以上这些，还有些目前不太推荐使用的 at 规则。

* @color-profile 是 SVG1.0 引入的 CSS 特性，但是实现状况不怎么好。
* @document 还没讨论清楚，被推迟到了 CSS4 中。
* @font-feature-values 。



### 普通规则

qualified rule 主要是由选择器和声明区块构成。声明区块又由属性和值构成。

* 普通规则
  * 选择器
  * 声明区块
    * 属性
    * 值
