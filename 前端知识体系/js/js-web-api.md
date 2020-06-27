## DOM

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



## 事件

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
