## DOM

### dom 本质

dom 是浏览器内存里面已经初始化好的树的一个结构，dom 的本质是从 html 文件解析出来的一棵树。

### dom 节点操作

节点操作就是针对单个节点的。

#### 获取 dom 节点

```js
document.getElementById('div1') // 元素
document.getElementsByTagName('div') // 集合
document.getElementsByClassName('container') // 集合
document.querySelectorAll('p') // css选择器来获取，集合
```

#### attribute

获取节点之后，我们可以操作它的 attribute。

我们可以通过 getAttribute 和 setAttribute 这样的 api 去直接修改这个 html 的结构，它是能真正作用到 dom 结构里面去的，它是修改标签的一个属性。

```js
const pList = document.querySelectorAll('p')
const p = pList[0]

p.getAttribute('data-name')
p.setAttribute('data-name', 'imooc')
p.getAttribute('style')
p.setAttribute('style', 'font-size: 30px;')
```

#### property

property 是通过 js 对象属性的形式来去操作 dom 里面的一些东西。property 本身不是一个 api 的名字。它是一种通过修改或获取js的属性的方式来去改变页面样式或页面渲染结构的一种形式。

我们可以对这个属性进行设置和获取，读和写都可以。设置完了之后它真正的渲染到了页面上。

property 修改的是 js 变量的属性，不会对标签产生影响。attribute 它修改的是标签的属性，设置上之后，标签上就会有这个属性。两者都有可能引起 dom 的重新渲染。

平常建议尽量用 property 去操作，因为 property 可能会在 js 的一些机制中去重复，避免一些 dom 不必要的渲染。attribute 你一旦改了这个 html 结构，它肯定引起重新渲染。dom 的重新渲染是比较耗费性能的。如果必须要修改标签结构的话当然也要用 attribute。 

```js
const pList = document.querySelectorAll('p')
const p = pList[0]

p.style.width // 获取样式
p.style.width = '100px' // 修改样式
p.className // 获取class
p.className = 'p1' // 修改class
p.nodeName // 获取nodename
p.nodeType // 获取nodeType
```

### dom 结构操作

因为 dom 是一棵树，对于树的结构操作一般会分为这么几个。

* 新增/插入节点
* 获取子节点列表，获取父节点
* 删除子节点

```js
const div1 = document.getElementsById('div1')
const p1 = document.createElement('p') // 新增一个节点
p1.innerHTML = 'this is p1'
div1.appendChild(p1)                   // 插入节点
const p2 = document.getElementById('p2')
div1.appendChild(p2)                   // 移动一个节点
const child = div1.childNodes          // 获取子节点列表
const parent = div1.parentNode         // 获取父节点
div1.removeChild(child[0])             // 删除子节点
```

### dom 性能

dom 操作是比较耗时和耗 cpu 的。

dom 操作可能会导致浏览器的重绘或重排就是重新渲染，所以要避免频繁的 dom 操作。

#### 对 dom 查询做缓存

现在电脑的内存都还好，所以我们做一些 dom 查询的缓存，会减少我们 dom 的操作。查出来之后就先存起来，存起来之后就不要再查了。

为什么浏览器自己不缓存呢，因为 js 有可能会操作 dom，比如每次循环里面我们都对这个 p 进行一些修改，这样的话，浏览器是不是就没办法做到它保存完之后的正确性了。所以缓存得由我们自己来决定，既然浏览器不能缓存，我们就自己缓存。

```js
// 不缓存dom查询结果
for (let i = 0; i < document.getElementsByTagName('p').length; i++) {
  // 每次循环，都会计算length，频繁进行dom查询
}
// 缓存dom查询结果
const pList = document.getElementsByTagName('p')
const length = pList.length
for (let i = 0; i < length; i++) {
  // 缓存length，只进行一次dom查询
}
// 如果p的数量多了之后，这个性能的差异还是很大的。
```

#### 将频繁操作改为一次性操作，合并处理

有时候我们可能会频繁插入一些东西，这时可以打个包一块插入进去，这样也避免了频繁的 dom 操作。

```js
const listNode = document.getElementById('list')
// 创建一个文档片段，此时还没有插入到dom树中
const frag = document.createDocumentFragment()
// 执行插入
for (let i = 0; i < 10; i++) {
  const li = document.createElement('li')
  li.innerHTML = 'list item ' + i
  frag.appendChild(li)
}
// 都完成之后，再插入到dom树中
listNode.appendChild(frag)
```



## BOM

### location

地址的一些信息，分析拆解 url 的各个部分。

整个的网址都是通过这些信息拼接出来的。

```js
// https://coding.imooc.com/lesson/400.html?a=100&b=200#mid=30309
location.href        // https://coding.imooc.com/lesson/400.html#mid=30309
location.protocol    // 'https:'  
location.host        // 'coding.imooc.com'  
location.pathname    // '/lesson/400.html'
location.search      // '?a=100&b=200'
location.hash        // '#mid=30309'
```

### history

前进后退这些信息。

```js
history.back()    // 网页后退
history.forward() // 网页前进
```



## 事件

### 事件绑定

事件绑定就是 addEventListener

```js
const btn = document.getElementById('btn1')
btn.addEventListener('click', event => {
  console.log('clicked')
})
```

### 事件冒泡

事件触发完之后，是像一种冒泡机制一样，顺着这个 dom 结构往上一层一层的冒，在当前这个元素中监听事件和在它上级或上上级，只要是它的上级监听事件，都可以把这个事件给监听到。

### 事件代理

事件代理是基于事件冒泡做的。有了事件冒泡这个机制，我们才能在这个机制的基础上去实现事件代理，所谓代理就是因为数量太多或结果比较复杂，不好去挨个都去绑定事件，所以把事件绑到某一个父元素上，在事件里判断是不是我们想要触发事件的那个元素，再去做一些其他的动作。

#### 代码简洁

事件代理的代码比较简洁，如果每一个元素都给它绑一个事件的话，代码就会麻烦，至少你还得做个 dom 查询，还得做个循环。

#### 减少浏览器内存使用

如果需要绑定事件的元素非常多的话，每一个元素都去挂一个事件监听，是非常耗费内存的。但是利用事件代理只在父元素上去挂一个事件，就没有那么耗费内存。

#### 不要滥用

只有在一些情况下可以用，比如数量太多结果复杂的不好去每个元素都绑定事件的情况下才应该去应用事件代理，不要到处都去用代理，它的代码简洁程度虽然也比较简洁，但是它的简洁是相比于每个元素都做事件监听的情况。比如一个按钮的绑定就不至于用代理了。

### 编写通用事件监听函数

```js
function bindEvent (elem, type, fn) {
  elem.addEventListener(type, fn)
}

const btn1 = document.getElementById('btn1')
bindEvent(btn1, 'click', event => {
  console.log(event.target) // 我们触发点击的元素，就是这个btn1这个dom对象
  event.preventDefault() // 阻止浏览器默认行为
  event.stopPropagation() // 阻止事件冒泡
  console.log('clicked')
})
```

适用普通的绑定和事件代理的绑定。

```js
function bindEvent (elem, type, selector, fn) {
  if (fn == null) {
    fn = selector
    selector = null
  }
  elem.addEventListener(type, event => {
    const target = event.target
    if (selector) {
      // 代理绑定
      if (target.matched(selector)) {
        fn.call(target, event)
      }
    } else {
      // 普通绑定
      fn.call(target, event)
    }
  })
}

const btn1 = document.getElementById('btn1')
const div3 = document.getElementById('div3')
bindEvent(btn1, 'click', function (event) {
  event.preventDefault()
  alert(this.innerHTML)
})
bindEvent(div3, 'click', 'a', function (event) {
  event.preventDefault()
  alert(this.innerHTML)
})
```



## ajax

### XMLHttpRequest

网页实现 ajax 最核心的一个 api。

### 状态码

xhr.send() 之后，这个 xhr.readyState 才开始从 0-4 变化

#### xhr.readyState

* 0 - （未初始化）还没有调用send()方法
* 1 - （载入）已调用send()方法，正在发送请求
* 2 - （载入完成）send()方法调用完成，已接收到全部响应内容
* 3 - （交互）正在解析响应内容
* 4 - （完成）响应内容解析完成，可在客户端调用

#### xhr.status  

status是我们常见的http协议的状态码。

* 2xx - 表示成功处理请求，如200
* 3xx - 需要重定向，重定向不用我们自己处理，服务器返回之后浏览器会自己去跳转，如301 302 304
* 4xx - 客户端请求错误，如404 403
* 5xx - 服务端错误

### ajax 基本工作过程

xhr.readyState 等于 4 的时候才说明 ajax 请求成功了，其他需要判断的东西只有 xhr.status 也就是 http 状态码了。比如
网络断开的情况下 xhr 不可能等于 4，所以前端 ajax 请求的业务逻辑中根本就不用判断类似断网的这种情况。

#### get 请求

```js
const xhr = new XMLHttpRequest()
xhr.open('GET', '/api', true)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      alert(xhr.responseText) // 返回的信息是字符串
    } else {
      console.log('其他情况')
    }
  }
}
xhr.send()
```

post 请求

```js
const xhr = new XMLHttpRequest()
xhr.open('POST', '/api', true)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      alert(xhr.responseText) // 返回的信息是字符串
    } else {
      console.log('其他情况')
    }
  }
}
const postData = {
  username: 'zhangsan',
  password: 'xxx'
}
// 使发送的数据也是字符串
xhr.send(JSON.stringifypost(Data))
```

#### 手写一个简易的 ajax

```js
// 回调函数版
function ajax (url, method, successFn, errorFn) {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successFn(
          JSON.parse(xhr.responseText)
        )
      } else if (xhr.status === 404) {
        errorFn(new Error('404 not found'))
      }
    }
  }
  xhr.send()
}
```

```js
// promise版
function ajax (url, method) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(
            JSON.parse(xhr.responseText)
          )
        } else if (xhr.status === 404) {
          reject(new Error('404 not found'))
        }
      }
    }
    xhr.send()
  })
  return p
}

const url = '/data/test.json'
const method = 'GET'
ajax(url, method)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
```



### 跨域，跨域解决方案

#### 什么是跨域

##### 同源策略

ajax 请求的时候，浏览器要求当前网页和 server 必须同源（安全）。在服务端或非浏览器的环境下是可以请求的。这个同源策略是浏览器要求的。

##### 同源

对于一个 url 来说，前端页面和 server 端做对比，协议、域名、端口，三者必须一致。

##### 加载图片，css，js 可无视同源策略

同源策略第一个条件就是 ajax 请求，如果不是 ajax 请求，比如说图片，css，js 等文件的加载可无视同源策略，它们的地址都可以跨域，浏览器不会限制。

```html
<img src="跨域的图片地址" />
<link href="跨域的css地址" />
<script src="跨域的js地址"></script>
```

应用：

图片，css，js 可以无视同源策略可以实现跨域，它们都是有一定的功能的，浏览器也是为了它们有一定功能做了一些考虑的，并不是这三个平白无故的就实现了跨域的。

1.\<img/>

图片可用于统计打点。统计可能是使用第三方统计服务，比如站长之家，百度统计等，这些都是外域的，统计打点无非就是发一个请求嘛，这个时候如果我们用 ajax 发的话那就出现跨域，那就不好解决了。所以说我们用图片，去初始化一个图片，然后把图片的地址写成第三方统计服务的地址，然后在地址里面写上我们各种各样需要的参数，通过图片去发这个请求，就不会出现跨域的问题。 

2.\<link/> \<script>

\<link /> \<script> 可以使用 cdn，cdn 一般都是外域。

3.\<script> 可以实现 jsonp

jsonp 是前端实现跨域一个比较常用的方案。

##### 跨域

所有的跨域，都必须经过 server 端允许和配合。

如果未经 server 端允许就实现的跨域，说明浏览器有漏洞，是一个危险信号。

#### 跨域解决方案

##### Jsonp

我们先看一个问题，浏览器随便访问一个网址，服务端返回的一定是一个 html 文件吗。服务端拿到这个网址 url 之后分析，获取这个请求文件的内容，然后把文件内容返回，其实服务端不一定返回一个 html 文件的内容，服务端可以动态拼接任何的数据内容返回，只要符合相应文件的格式要求，同理 script 去访问一个 js 地址，也不一定就返回一个 js 静态文件。

###### Jsonp 原理

* \<script> 可以绕过跨域限制
* 服务端可以拼接任意动态数据返回
* 所以就可以通过 \<script> 获得跨域的数据，只要服务端愿意返回

###### jsonp 简易 demo

```html
<script>
  window.callback = function (data) {
    // 这是我们跨域接收的信息
    console.log(data)
  }
</script>

<!-- 这个script将返回 callback({x: 100, y: 200}) -->
<script src="https://imooc.com/getData.js?cb=callback&id=123"></script>
```

##### cors

服务端支持的一种解决跨域的方式，是纯服务器端的操作。

cors 其实是一个统称，就是服务器端可以设置 http header，在服务端 response 返回的时候可以设置 header，如下面这些东西。

```js
response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081') // 允许的域名是什么 
response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')     // 允许的headers是什么 
response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS') // 允许的methods是什么 
response.setHeader('Access-Control-Allow-Credentials', 'true') // 接收跨域的cookie，是否允许传cookie
```



## 存储

### cookie

cookie 本身是用于浏览器端和 server 端通讯的，也就是 http 请求的一部分。

早期是被借用来做本地存储，因为 localStorage 和 sessionStorage 是 09 年 html5 之后提出来的，之前没有，所以早期我们只能用 cookie 来做本地存储。

前端可以用 document.cookie = '' 的方式来去修改。后端也可以修改 cookie，因为 cookie 本身是通讯的一个标准。

cookie 的价值不在于本地存储，而在于本地和服务器端进行通讯。cookie 的信息中一般是有用户个人的一些信息标识的。

cookie 是个字符串，中间通过分号分割的形式，每一部分都是 key=value 的形式。

怎么加一个 cookie：

```js
document.cookie = 'a=100'
console.log(document.cookie) // 'a=100'
document.cookie = 'b=200'
console.log(document.cookie) // 'a=100; b=200'
// 每赋值一个就追加一遍，这是一个追加的过程，不是覆盖的过程，所以说这个api看着还比较怪异。同一个key它会覆盖，不同key它会追加
document.cookie = 'a=300'
console.log(document.cookie) // 'b=200; a=300'
```

所以这种 api 的计算形式和我们之前做的 js 的普通计算形式不一样，很难让人理解，不知道的话可能就会掉到坑里面去。所以从 api 的易用程度来说，cookie 做本地存储就不合适。

我们加上 cookie 之后，以后访问这个页面的时候，Request Headers 里面就带了这个 cookie，后端是可以接收到这个cookie 的。比如这个 cookie 里面有一个 userId=xxx，服务端接收到这个 cookie 之后，就知道登录用户是谁了，登录的过程通常可以用 cookie 来实现。

我们存储了一些 cookie 信息，刷新页面后，还能够查到这些信息，也就是说只要我们的 cookie 不清除，页面不管怎么刷新，cookie 存储信息都会在的，浏览器会帮我们存下来。所以说它能做本地存储。这也是我们在 html5 规范出来或普及之前唯一的能在页面中做本地存储的一种能力。

但是 cookie 当时的设计并不是为了做本地存储，它是为了浏览器和服务端进行通讯，它只是被借用来做本地存储，它本来不是干这个活的，所以用它来做本地存储肯定会有一些问题。

cookie的缺点：

* 存储大小，cookie 是有存储大小限制的，最大存4kb，超过了4kb，就存不下了，为什么有这个限制呢，因为在发送请求的时候，是要把 cookie 带上的。如果 cookie 的内容很多。每次请求都带上 cookie，会严重影响每次的请求。
* cookie 回跟随 http 请求发送出去，你存什么东西，每次请求都会带到服务器上去，增加请求的数据量，请求会变慢一些。
* 只能用 document.cookie = '' 这种方式来修改，这种 api 太过简陋也太不好理解。

### localStorage sessionStorage

这两个是 html5 专门为存储设计的，最大可存储 5M，空间更大，因为前端存储的信息基本上也就存储个字符串或数字，就是简单的缓存一下。不会存一些很大的数据量，所以说 5M 绝对是绰绰有余，而且这 5M 是针对每个域名来说的。每个 host，每个域我们可以存储 5M。

api 简单易用，是用 setItem getItem 来做的。这个方式就完全符合于我们自己写一个存储的功能或者缓存的功能。get set这种 api，很多这种 key value 的库都是用这种 get set api，所以说非常符合我们的使用。

```js
localStorage.setItem('a', 100)
localStorage.getItem('a')
sessionStorage.setItem('b', 200)
sessionStorage.getItem('b')
```

不会随着 http 请求被发送出去，如果是 5M 都随便发的话那就麻烦了。你如果是自己实现一个类似于存储缓存的一个功能的话，其实也是有一个 get 有一个 set 就可以了，别的基本上用处不是很大。

localStorage 和 sessionStorage 的区别：

* localStorage 的数据会永久存储，除非使用代码或手动删除。
* sessionStorage 的数据只存在于当前会话，当前会话就是当前你和服务端的一个连接，比如说浏览器关闭的时候它会清空，sessionStorage 类似于服务端的一个 session。session 是和登录和用户验证有关系的。sessionStorage 它会存在于用户活跃的这段事件，如果用户关闭浏览器走了，不再访问这个网站了，它就会自动清空了。
* 用的话一般用 localStorage 会更多一些。