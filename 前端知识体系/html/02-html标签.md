## 元信息类标签

所谓元信息，是指描述自身的信息，元信息类标签，就是 HTML 用于描述文档自身的一类标签，它们通常出现在 head 标签中，一般都不会在页面被显示出来（与此相对，其它标签，如语义类标签，描述的是业务）。

元信息多数情况下是给浏览器、搜索引擎等机器阅读的，有时候这些信息会在页面之外显示给用户，有时候则不会。

另一些元信息仅仅是对页面的描述，掌握它们可以使我们编写的页面跟各种浏览器、搜索引擎等结合地更好。

主要包括下面这些内容。

* head：元信息的容器。
* title：文档标题。
* base：页面的基准 URL。
* meta: 元信息通用标签。



### head 标签

head 标签本身并不携带任何信息，它主要是作为盛放其它语义类标签的容器使用。

head 标签规定了自身必须是 html 标签中的第一个标签，它的内容必须包含一个 title，并且最多只能包含一个 base。如果文档作为 iframe，或者有其他方式指定了文档标题时，可以允许不包含 title 标签。



### title 标签

title 标签表示文档的标题。

title 作为元信息，可能会被用在浏览器收藏夹、微信推送卡片、微博等各种场景，这时侯往往是上下文缺失的，所以 title 应该是完整地概括整个网页内容的。



### base 标签

base 标签实际上是个历史遗留标签。它的作用是给页面上所有的 URL 相对地址提供一个基础。

base 标签最多只有一个，它改变全局的链接地址，它是一个非常危险的标签，容易造成跟 JavaScript 的配合问题，所以在实际开发中，我比较建议你使用 JavaScript 来代替 base 标签。



### meta 标签

meta 标签是一组键值对，它是一种通用的元信息表示标签。

在 head 中可以出现任意多个 meta 标签。一般的 meta 标签由 name 和 content 两个属性来定义。name 表示元信息的名，content 表示元信息的值。

它基本用法是：

```html
<meta name=application-name content="lsForums">
```

这个标签表示页面所在的 web-application，名为 IsForums。

name 是一种比较自由的约定，HTTP 标准规定了一些 name 作为使用的共识，也鼓励大家发明自己的 name 来使用。

除了基本用法，meta 标签还有一些变体，主要用于简化书写方式或者声明自动化行为。

##### 具有 charset 属性的 meta

从 HTML5 开始，为了简化写法，meta 标签新增了 charset 属性。添加了 charset 属性的 meta 标签无需再有 name 和 content。

```html
<meta charset="UTF-8" >
```

charset 型 meta 标签非常关键，它描述了 HTML 文档自身的编码形式。因此，我建议这个标签放在 head 的第一个。

```html
<html>
<head>
<meta charset="UTF-8">
……
```

这样，浏览器读到这个标签之前，处理的所有字符都是 ASCII 字符，众所周知，ASCII 字符是 UTF-8 和绝大多数字符编码的子集，所以，在读到 meta 之前，浏览器把文档理解多数编码格式都不会出错，这样可以最大限度地保证不出现乱码。

一般情况下，HTTP 服务端会通过 http 头来指定正确的编码方式，但是有些特殊的情况如使用 file 协议打开一个 HTML 文件，则没有 http 头，这种时候，charset meta 就非常重要了。

##### 具有 http-equiv 属性的 meta

具有 http-equiv 属性的 meta 标签，表示执行一个命令，这样的 meta 标签可以不需要 name 属性了。

例如，下面一段代码，相当于添加了 content-type 这个 http 头，并且指定了 http 编码方式。

```html
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
```

除了 content-type，还有以下几种命令：

* content-language 指定内容的语言；
* default-style 指定默认样式表；
* refresh 刷新；
* set-cookie 模拟 http 头 set-cookie，设置 cookie；
* x-ua-compatible 模拟 http 头 x-ua-compatible，声明 ua 兼容性；
* content-security-policy 模拟 http 头 content-security-policy，声明内容安全策略。

##### name 为 viewport 的 meta

实际上，meta 标签可以被自由定义，只要写入和读取的双方约定好 name 和 content 的格式就可以了。

我们来介绍一个 meta 类型，它没有在 HTML 标准中定义，却是移动端开发的事实标准：它就是 name 为 viewport 的 meta。

这类 meta 的 name 属性为 viewport，它的 content 是一个复杂结构，是用逗号分隔的键值对，键值对的格式是 key=value。

```html
<meta name="viewport" content="width=500, initial-scale=1">
```

这里只指定了两个属性，宽度和缩放，实际上 viewport 能控制的更多，它能表示的全部属性如下：

* width：页面宽度，可以取值具体的数字，也可以是 device-width，表示跟设备宽度相等。
* height：页面高度，可以取值具体的数字，也可以是 device-height，表示跟设备高度相等。
* initial-scale：初始缩放比例。
* minimum-scale：最小缩放比例。
* maximum-scale：最大缩放比例。
* user-scalable：是否允许用户缩放。

通过 meta 标签来设置 viewport 可以使页面在移动端渲染的更完美

对于已经做好了移动端适配的网页，应该把用户缩放功能禁止掉，宽度设为设备宽度，一个标准的 meta 如下：

```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

##### 其它预定义的 meta

在 HTML 标准中，还定义了一批 meta 标签的 name，可以视为一种有约定的 meta，我在这里列出来，你可以简单了解一下。

* application-name：如果页面是 Web application，用这个标签表示应用名称。

* author: 页面作者。
* description：页面描述，这个属性可能被用于搜索引擎或者其它场合。
* generator: 生成页面所使用的工具，主要用于可视化编辑器，如果是手写 HTML 的网页，不需要加这个 meta。
* keywords: 页面关键字，对于 SEO 场景非常关键。
* referrer: 跳转策略，是一种安全考量。
* theme-color: 页面风格颜色，实际并不会影响页面，但是浏览器可能据此调整页面之外的 UI（如窗口边框或者 tab 的颜色）。



## 链接

作为互联网从业者，我们一定对链接都非常熟悉了。链接能够帮助我们从一个网页跳转到另一个网页。

链接是 HTML 中的一种机制，它是 HTML 文档和其它文档或者资源的连接关系，在 HTML 中，链接有两种类型。一种是超链接型标签，一种是外部资源链接。

链接的家族中有 a 标签、area 标签和 link 标签。



### link 标签

有些 link 标签也是元信息类标签的一种。

link 标签会生成一个链接，可能是超链接，也可能是外部资源链接。

一些 link 标签会生成超链接，这些超链接又不会像 a 标签那样显示在网页中。这就是超链接型的 link 标签。

多数浏览器中，这些 link 标签不产生任何作用。但是，这些 link 标签能够被搜索引擎和一些浏览器插件识别，从而产生关键性作用。比如，到页面 RSS 的 link 标签，能够被浏览器的 RSS 订阅插件识别，提示用户当前页面是可以 RSS 订阅的。

另外一些 link 标签则会把外部的资源链接到文档中，也就是说，会实际下载这些资源，并且做出一些处理，比如我们常见的用 link 标签引入样式表。

除了元信息的用法之外，多数外部资源型的 link 标签还能够被放在 body 中使用，从而起到把外部资源链接进文档的作用。

link 标签的链接类型主要通过 rel 属性来区分，其代码类似下面：

```html
<link rel="xx" ...>
```

#### 超链接类 link 标签

超链接型 link 标签是一种被动型链接，在用户不操作的情况下，它们不会被主动下载。

link 标签具有特定的 rel 属性，会成为特定类型的 link 标签。产生超链接的 link 标签包括：具有 rel=“canonical” 的 link、具有 rel="alternate"的 link、具有 rel=“prev” rel="next"的 link 等等。

#### 外部资源类 link 标签

外部资源型 link 标签会被主动下载，并且根据 rel 类型做不同的处理。外部资源型的标签包括：具有 icon 型的 link、预处理类 link、modulepreload 型的 link、stylesheet、pingback。

##### icon 型 link

这类链接表示页面的 icon。多数浏览器会读取 icon 型 link，并且把页面的 icon 展示出来。

icon 型 link 是唯一一个外部资源类的元信息 link，其它元信息类 link 都是超链接，这意味着，icon 型 link 中的图标地址默认会被浏览器下载和使用。

如果没有指定这样的 link，多数浏览器会使用域名根目录下的 favicon.ico，即使它并不存在，所以从性能的角度考虑，建议一定要保证页面中有 icon 型的 link。

只有 icon 型 link 有有效的 sizes 属性，HTML 标准允许一个页面出现多个 icon 型 link，并且用 sizes 指定它适合的 icon 尺寸。

##### 预处理类 link

我们都知道，导航到一个网站需要经过 dns 查询域名、建立连接、传输数据、加载进内存和渲染等一系列的步骤。

预处理类 link 标签就是允许我们控制浏览器，提前针对一些资源去做这些操作，以提高性能（当然如果你乱用的话，性能反而更差）。

下面我来列一下这些 link 类型：

* dns-prefetch 型 link 提前对一个域名做 dns 查询，这样的 link 里面的 href 实际上只有域名有意义。
* preconnect 型 link 提前对一个服务器建立 tcp 连接。
* prefetch 型 link 提前取 href 指定的 url 的内容。
* preload 型 link 提前加载 href 指定的 url。
* prerender 型 link 提前渲染 href 指定的 url。

##### modulepreload 型的 link

modulepreload 型 link 的作用是预先加载一个 JavaScript 的模块。这可以保证 JS 模块不必等到执行时才加载。

这里的所谓加载，是指完成下载并放入内存，并不会执行对应的 JavaScript。

```html
<link rel="modulepreload" href="app.js">
<link rel="modulepreload" href="helpers.js">
<link rel="modulepreload" href="irc.js">
<link rel="modulepreload" href="fog-machine.js">
<script type="module" src="app.js">
```

这个例子来自 HTML 标准，我们假设 app.js 中有 import “irc” 和 import “fog-machine”, 而 irc.js 中有 import “helpers”。这段代码使用 moduleload 型 link 来预加载了四个 js 模块。

尽管，单独使用 script 标签引用 app.js 也可以正常工作，但是我们通过加入对四个 JS 文件的 link 标签，使得四个 JS 文件有机会被并行地下载，这样提高了性能。

##### stylesheet 型 link

样式表大概是所有人最熟悉的 link 标签用法了。

```html
<link rel="stylesheet" href="xxx.css" type="text/css">
```

基本用法是从一个 CSS 文件创建一个样式表。这里 type 属性可以没有，如果有，必须是"text/css"才会生效。

rel 前可以加上 alternate，成为 rel=“alternate stylesheet”，此时必须再指定 title 属性。

这样可以为页面创建一份变体样式，一些浏览器，如 Firefox 3.0，支持从浏览器菜单中切换这些样式，当然了，大部分浏览器不支持这个功能，所以仅仅从语义的角度了解一下这种用法即可。



### a 标签

a 标签是“anchor”的缩写，锚点的意思，标识文档中的特定位置。

a 标签同时充当了链接和目标点的角色，当 a 标签有 href 属性时，它是链接，当它有 name 时，它是链接的目标。

具有 href 的 a 标签跟一些 link 一样，会产生超链接，也就是在用户不操作的情况下，它们不会被主动下载的被动型链接。

a 标签基本解决了在页面中插入文字型和整张图片超链接的需要。

a 标签也可以有 rel 属性。



### area 标签

area 标签与 a 标签非常相似，不同的是，它不是文本型的链接，而是区域型的链接。

area 标签支持的 rel 与 a 完全一样。

area 是整个 html 规则中唯一支持非矩形热区的标签，它的 shape 属性支持三种类型。

* 圆形：circle 或者 circ，coords 支持三个值，分别表示中心点的 x,y 坐标和圆形半径 r。
* 矩形：rect 或者 rectangle，coords 支持两个值，分别表示两个对角顶点 x1，y1 和 x2，y2。
* 多边形：poly 或者 polygon，coords 至少包括 6 个值，表示多边形的各个顶点。

因为 area 设计的时间较早，所以不支持含有各种曲线的路径，但是它也是唯一一个支持了非矩形触发区域的元素，所以，对于一些效果而言，area 是必不可少的。

area 必须跟 img 和 map 标签配合使用。

这个例子展示了在一张图片上画热区并且产生链接，分别使用了矩形、圆形和多边形三种 area。

```html
<p>
 Please select a shape:
 <img src="shapes.png" usemap="#shapes"
      alt="Four shapes are available: a red hollow box, a green circle, a blue triangle, and a yellow four-pointed star.">
 <map name="shapes">
  <area shape=rect coords="50,50,100,100"> <!-- the hole in the red box -->
  <area shape=rect coords="25,25,125,125" href="red.html" alt="Red box.">
  <area shape=circle coords="200,75,50" href="green.html" alt="Green circle.">
  <area shape=poly coords="325,25,262,125,388,125" href="blue.html" alt="Blue triangle.">
  <area shape=poly coords="450,25,435,60,400,75,435,90,450,125,465,90,500,75,465,60"
        href="yellow.html" alt="Yellow star.">
 </map>
</p>
```



## 替换型元素

替换型元素是把文件的内容引入，引入一个外部资源来进入页面，替换掉自身位置的一类标签。

* script
* img
* picture
* video
* audio
* Iframe



### script

script 标签是为数不多的既可以作为替换型标签，又可以不作为替换型标签的元素。

script 标签的两种用法：

```html
<script type="text/javascript">
console.log("Hello world!");
</script>

<script type="text/javascript" src="my.js"></script>
```

凡是替换型元素，都是使用 src 属性来引用文件的，链接型元素是使用 href 标签的。

style 标签并非替换型元素，不能使用 src 属性，这样，我们用 link 标签引入 CSS 文件，当然就是用 href 标签啦。



### img

img 标签的作用是引入一张图片。它不能像 script 标签那样作为非替换型标签来使用，必须有 src 属性才有意义。

如果一定不想要引入独立文件，可以使用 data uri，我们来看个实际的例子：

```html
<img src='data:image/svg+xml;charset=utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/></svg>'/>
```

这个例子中我们使用了 data uri 作为图片的 src，这样，并没有产生独立的文件，客观上做到了和内联相同的结果，这是一个常用的技巧。

img 标签可以使用 width 和 height 指定宽度和高度。也可以只指定其中之一：

```html
<img src='data:image/svg+xml;charset=utf8,<svg width="600" height="400" version="1.1"
xmlns="http://www.w3.org/2000/svg"><ellipse cx="300" cy="150" rx="200" ry="80"
style="fill:rgb(200,100,50);
stroke:rgb(0,0,100);stroke-width:2"/></svg>' width="100"/>
```

这个例子中，为了方便你理解，我们把图片换成了椭圆，我们可以看到，当我们指定了宽度后，图片被等比例缩放了。这个特性非常重要，适用于那种我们既要限制图片尺寸，又要保持图片比例的场景。

如果从性能的角度考虑，建议你同时给出图片的宽高，因为替换型元素加载完文件后，如果尺寸发生变换，会触发重排版。

此处要重点提到一个属性，alt 属性，这个属性很难被普通用户感知，对于视障用户非常重要，可以毫不夸张地讲，给 img 加上 alt 属性，已经做完了可访问性的一半。

img 标签还有一组重要的属性，那就是 srcset 和 sizes，它们是 src 属性的升级版。这两个属性的作用是在不同的屏幕大小和特性下，使用不同的图片源。下面一个例子也来自 MDN，它展示了 srcset 和 sizes 的用法

```html
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
```

srcset 提供了根据屏幕条件选取图片的能力，但是其实更好的做法，是使用 picture 元素。



### picture

picture 元素可以根据屏幕的条件为其中的 img 元素提供不同的源，它的基本用法如下：

```html
<picture>
  <source srcset="image-wide.png" media="(min-width: 600px)">
  <img src="image-narrow.png">
</picture>
```

picture 元素的设计跟 audio 和 video 保持了一致，它跟 img 搭配 srcset 和 sizes 不同，它使用 source 元素来指定图片源，并且支持多个。

这里的 media 属性是 media query，跟 CSS 的 @media 规则一致。



### video

在 HTML5 早期的设计中，video 标签跟 img 标签类似，也是使用 src 属性来引入源文件的，不过，考虑到各家浏览器支持的视频格式不同，现在的 video 标签跟 picture 元素一样，也是提倡使用 source 的。

下面例子是一个古典的 video 用法：

```html
<video controls="controls" src="movie.ogg">
</video>
```

这个例子中的代码用 src 来指定视频的源文件。但是因为一些历史原因，浏览器对视频的编码格式兼容问题分成了几个派系，这样，对于一些兼容性要求高的网站，我们使用单一的视频格式是不合适的。

现在的 video 标签可以使用 source 标签来指定接入多个视频源。

```html
<video controls="controls" >
  <source src="movie.webm" type="video/webm" >
  <source src="movie.ogg" type="video/ogg" >
  <source src="movie.mp4" type="video/mp4">
  You browser does not support video.
</video>
```

从这个例子中，我们可以看到，source 标签除了支持 media 之外，还可以使用 type 来区分源文件的使用场景。

video 标签的内容默认会被当做不支持 video 的浏览器显示的内容吗，因此，如果要支持更古老的浏览器，还可以在其中加入 object 或者 embed 标签，这里就不详细展开了。

video 中还支持一种标签：track。

track 是一种播放时序相关的标签，它最常见的用途就是字幕。track 标签中，必须使用 srclang 来指定语言，此外，track 具有 kind 属性，共有五种。

* subtitles：就是字幕了，不一定是翻译，也可能是补充性说明。
* captions：报幕内容，可能包含演职员表等元信息，适合听障人士或者没有打开声音的人了解音频内容。
* descriptions：视频描述信息，适合视障人士或者没有视频播放功能的终端打开视频时了解视频内容。
* chapters：用于浏览器视频内容。
* metadata：给代码提供的元信息，对普通用户不可见。

一个完整的 video 标签可能会包含多种 track 和多个 source，这些共同构成了一个视频播放所需的全部信息。



### audio

跟 picture 和 video 两种标签一样，audio 也可以使用 source 元素来指定源文件：

```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  <p>You browser does not support audio.</p>
</audio>
```

比起 video，audio 元素的历史问题并不严重，所以使用 src 也是没有问题的。



### iframe

最后我们来讲一下 iframe，这个标签能够嵌入一个完整的网页。

不过，在移动端，iframe 受到了相当多的限制，它无法指定大小，里面的内容会被完全平铺到父级页面上。

同时很多网页也会通过 http 协议头禁止自己被放入 iframe 中。

iframe 标签也是各种安全问题的重灾区。opener、window.name、甚至 css 的 opacity 都是黑客可以利用的漏洞。

因此，在 2019 年，当下这个时间点，任何情况下我都不推荐在实际开发中用以前的 iframe。

iframe 的基本用法：

```html
<iframe src="http://time.geekbang.org"></iframe>
```

这个例子展示了古典的 iframe 用法。

在新标准中，为 iframe 加入了 sandbox 模式和 srcdoc 属性，这样，给 iframe 带来了一定的新场景。我们来看看例子：

```html
<iframe sandbox srcdoc="<p>Yeah, you can see it <a href="/gallery?mode=cover&amp;amp;page=1">in my gallery</a>."></iframe>
```

这个例子中，使用 srcdoc 属性创建了一个新的文档，嵌入在 iframe 中展示，并且使用了 sandbox 来隔离。

这样，这个 iframe 就不涉及任何跨域问题了。