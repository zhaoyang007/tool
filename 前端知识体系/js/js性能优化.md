### 性能优化介绍

性能优化是一个综合性的问题，没有标准答案，但要求尽量全面，面试的是想听到尽量全面的方案或比较全面的思考。所以我们本着这个思路去分析一下应该怎么去回答这个问题。

某些细节问题可能会单独提问：比如手写防抖、手写节流。防抖和节流它算是一个体验性的优化方案，也算这个性能优化方案之内。

### 性能优化原则

* 多使用内存、缓存或其他方法。
* 减少 cpu 计算量，减少网络加载耗时。

所以要明白多用什么少用什么，所谓性能优化就是让这个网页加载的更快，渲染的更快，运行的更流畅一些。你想要更快更流畅，你需要多使用内存，缓存这种方法。这种方法适用于所有编程的性能优化，都是用空间换时间，算法中的时间复杂度的减小也是通过空间换时间。

### 从何入手

性能优化就是让它更快，怎么让它更快呢。

* 让加载更快：就是下载东西更快，别人下载一个页面或所有的文件需要 2s 钟，那我的代码让人下载完只需要 1s钟，这样不就更快了吗。
* 让渲染更快：我的代码逻辑结构更加合理，没有什么重复的多余的渲染操作，没有无用功，没有等待。让渲染更快，至少是在同一时间内，让用户看得更快。

### 让加载更快

#### 减少资源体积：压缩代码

js 代码，css 代码，包括图片也可以压缩，服务器端也会进行一些其他的压缩方式，比如服务器端会进行 gzip 压缩，这个和我们前端没有太多的关系，这是服务器端做的压缩，然后浏览器进行解压。gzip 压缩一般能把代码压缩到体积三分之一左右。

#### 减少访问次数：合并代码，ssr服务端渲染，缓存

##### 合并代码

http 请求每次访问都是很耗时的，同样的代码，比如说一共三个代码，每个代码 3kb，一共是 9kb。如果是你分三次访问，每次访问 3kb 和一次访问 9kb 的时间是不一样的，选后者，访问次数比较少的那个，性能比较好。js 代码，css 代码，图片都是可以合并的。

##### ssr 服务端渲染

服务端渲染为什么能减少访问次数呢，服务端渲染就是服务端把页面以及页面要显示的内容一块给前端，前端拿到内容之后就可以立马去把内容展示出来。如果不是服务端渲染，我们页面拿到之后，再通过 ajax 再去加载资源，然后再渲染到页面上去。

##### 缓存

比如我们的页面要访问 10 个资源，如果没有缓存，那就是访问 10 个资源，也就是 10 次。如果其中 6 个都命中缓存，那我们就只需要访问 4 个资源，次数就变少了。

#### 使用更快的网络：cdn

cdn 是根据区域来去做服务器的一个处理。如果用 cdn 的话，你从北京访问的 ip 和你从上海访问的 ip 是不一样的。因为它会根据区域来去联系运营商的服务器，然后让下载更快一些。

### 让渲染更快

* css 放在 head 里面，js 放到 body 最下面
* 尽早执行 js，用 DOMContentLoaded 去触发
* 懒加载（图片懒加载，上滑加载更多）：上滑的时候加载更多，图片是懒加载的，图片没必要直接加载，可以什么时候用什么时候加载，这样渲染就会更快一些。
* 对 dom 查询进行缓存
* 频繁 dom 操作，合并到一起插入 dom 结构
* 节流 throttle 防抖 debounce：你要知道节流防抖是怎么回事，节流防抖不是让渲染更快，而是让渲染更加流畅，是体验性的优化。当然归到让渲染更快，渲染优化里面也没问题。

### 示例

#### 资源合并

```html
<script src="a.js"></script>
<script src="b.js"></script>
<script src="c.js"></script>
```

合并后

```html
<script src="abc.js"></script>
```

#### 缓存

```js
bundle.[contenthash].js
bundle.jffjq0482nf.js
```

* 静态资源加 hash 后缀，根据文件内容计算 hash。

* 文件内容不变，则 hash 不变，则 url 不变。

* url 和文件不变，则会自动触发 http 缓存机制，返回 304。

  如果我们每次访问一个js的资源，它的url如果不变，并且服务器判断它的文件也不变的话，如果是第一次访问成功之后，第二次再去访问，浏览器已经访问过一次了，服务器就会告诉浏览器说这个是304了，304就是说我们的资源根本没有变，所以说你就回去把，我就不用给你了。这样直接返回一个304的状态码，那这个内容就非常少了，可能用几个字节就能把这个事情搞定了。就告诉浏览器说这个没变，你就用之前的就行了。立马就可以启动这个缓存机制，然后就不用下载了，就可以用之前的缓存的这个文件了。所以这个机制不是我们前端去写js实现的，而它是http的缓存机制，浏览器和服务器都会遵从这个机制去做缓存。所以说我们只需要符合这个机制去让它尽可能的去命中这个缓存就可以了。

#### cdn

#### ssr

服务端渲染：将网页和数据一起加载，一起渲染

非 ssr：先加载网页，网页的 ajax 再加载数据，返回后再渲染数据

所以 ssr 确实是为了性能考虑来做的。如果是有 ssr 的话这个性能会提高很多。特别是再网络速度比较慢的情况下会提高很多。所以 ssr 也是一种减少网络请求的一种思路。

早先的 jsp asp php 都属于 ssr。ssr是一个比较宽泛的概念。server side render 就是服务端渲染。现在的 vue react 做 ssr 也是借助 node 的一些能力来做。从服务端渲染这个思路上和 jsp asp php 也没有什么本质上的区别。只不过它用的更加高级的前端框架而已。

#### 懒加载

比如说一个图片，有时候我们需要图片加载，有时候不需要，比如一个很长的新闻列表，每一个列表项中都有一个图片，这个时候其实我们不希望图片一下子全部加载完，我们希望第一屏看到的图片就是在手机屏幕上的图片，我们加载完，比如前五个或前八个让它加载完，然后随着用户往上去滑动页面的时候，这个图片慢慢的一个一个加载出来，并不是说我页面下载完之后所有图片立马加载出来。所以我们利用懒加载，可以把这个图片默认赋值成一个 src="preview.png" 就是一个预览的一个图片，这个图片的体积非常小，很容易加载，然后我们把真正的图片地址放到 data-realsrc="abc.png" 里面，放在这里面的话这个图片不会去加载这个地址。当浏览器判断到用户往上滑，当这个图片露出这个屏幕的时候我们再去把这个图片地址的 data-realsrc 赋值给这个图片的 src，去加载真正的图片地址。这就是懒加载。这个是很常见的，也是性能优化的一个很好的一钟方式。

```html
<img id="img1" src="preview.png" data-realsrc="abc.png" />

<script type="text/javascript">
  var img1 = document.getElementById('img1')
  img1.src = img1.getAttribute('data-realsrc')
</script>
```

#### 缓存 dom 查询

#### 多个 dom 操作合并到一起插入到dom结构

#### 尽早开始 js 执行

#### 防抖 debounce

* 监听一个输入框，文字变化后触发 change 事件。
* 直接监听 keyup 事件，则会频繁触发 change 事件。
* 防抖：用户在输入结束或暂停的时候，才会触发 change 事件。

防抖简易 demo：

```js
const input1 = document.getElementById('input1')
let timer = null
input1.addEventListener('keyup', function () {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    // 模拟触发change事件
    console.log(input1.value)
    // 清空定时器
    timer = null
  }, 500)
})
// debounce是对函数的封装，所以它最终返回应该是一个函数
// 函数的封装就是将大部分逻辑封装起来，使使用的时候更加简单，只写业务逻辑就行了。jq zepto等库和插件都是这个原理。
function debounce (fn, delay = 500) {
  // 这个timer是在闭包中的，timer这个数据就被隐藏了，不会被外面轻易拿到
  let timer = null

  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      // this是为了获取添加事件的dom对象，arguments是为了将事件函数接收到的参数透传给fn
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

// 使用
input1.addEventListener('keyup', debounce(function () {
  console.log(input1.value)
}, 300))
```

#### 节流 throttle

防抖的场景是频繁输入和频繁操作的时候最后的时候才去触发。节流是你在频繁输入频繁操作的时候它会保持一个频率连续触发。

* 比如拖拽一个元素时，要随时拿到这个元素被拖拽的位置。
* 如果直接用 drag 事件，则会频繁触发，很容易导致卡顿。
* 这个时候我们需要节流：无论拖拽的速度多快，都会每隔 100ms 触发一次。

防抖简易 demo：

```js
const div1 = document.getElementById('div1')
let timer = null
div1.addEventListener('drag', function (e) {
  if (timer) {
    return 
  }
  timer = setTimeout(() => {
    console.log(e.offsetX, e.offsetY)
    timer = null
  }, 100)
})
// 节流函数封装
function throttle (fn, delay = 100) {
  let timer = null
  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

// 使用
input1.addEventListener('drag', throttle(function (e) {
  console.log(e.offsetX, e.offsetY)
}, 200))
```