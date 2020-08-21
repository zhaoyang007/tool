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