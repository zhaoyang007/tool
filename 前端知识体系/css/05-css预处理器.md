##### css 预处理器的能力

* 嵌套 反应层级和约束范围
* 变量和计算 减少重复代码
* extend 和 mixin 代码片段
* 循环 适用于复杂有规律的样式
* import css 文件模块化

##### 变量

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

##### mixin

当有一段代码想要复用的时候。

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

##### extend

引用 mixin 的地方更多，mixin 代码体积更大的时候。编译好的 css 会有很多代码的重复。extend 就是为了解决这个问题的。extend 和 mixin 都是在 css 内部完成样式的复用，但最后生成的结果是有一些不一样的，mixin 是直接把代码复制过来，extend 是把选择器提取出来，然后把公共的样式写到一起。

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

##### loop

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

##### import

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

##### css 预处理器框架

预处理器为我们带来了使用他人代码的可能性，通过 css 使用其他的代码只能使用一整套，通过 html 引用 css 文件的方式去做。预处理器的模块化可以使我们按需使用他人写好的代码，也就是 css 预处理器框架。

编译后是我们用了什么代码才会有什么代码。

鼓励使用一些 css 预处理器的框架，也可以自己写一个，把一些常用的 mixin 提出来，在项目中复用。

* sass - compass
* less - lesshat / est
* 提供现成的 mixin
* 类似 js 类库，封装常用功能 
