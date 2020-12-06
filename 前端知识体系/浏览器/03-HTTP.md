### HTTP 协议格式

#### HTTP 格式

我们的实验需要使用 telnet 客户端，这个客户端是一个纯粹的 TCP 连接工具（安装方法）。

首先我们运行 telnet，连接到极客时间主机，在命令行里输入以下内容：

```bash
telnet time.geekbang.org 80
```

这个时候，TCP 连接已经建立，我们输入以下字符作为请求：

```bash
GET / HTTP/1.1
Host: time.geekbang.org
```

按下两次回车，我们收到了服务端的回复：

```
HTTP/1.1 301 Moved Permanently
Date: Fri, 25 Jan 2019 13:28:12 GMT
Content-Type: text/html
Content-Length: 182
Connection: keep-alive
Location: https://time.geekbang.org/
Strict-Transport-Security: max-age=15768000

<html>
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
<hr><center>openresty</center>
</body>
</html>
```

这就是一次完整的 HTTP 请求的过程了，我们可以看到，在 TCP 通道中传输的，完全是文本。

在请求部分，第一行被称作 request line，它分为三个部分，请求的方法，请求的路径和请求的协议和版本。

在响应部分，第一行被称作 response line，它也分为三个部分，协议和版本、状态码和状态文本。

紧随在 request line 或者 response line 之后，是请求头 / 响应头，这些头由若干行组成，每行是用冒号分隔的名称和值。

在头之后，以一个空行为分隔，是请求体 / 响应体，请求体可能包含文件或者表单数据，响应体则是 HTML 代码。

#### HTTP Method（方法）

我们首先来介绍一下 request line 里面的方法部分。这里的方法跟我们编程中的方法意义类似，表示我们此次 HTTP 请求希望执行的操作类型。方法有以下几种定义：

* GET
* POST
* HEAD
* PUT
* DELETE
* CONNECT
* OPTIONS
* TRACE

浏览器通过地址栏访问页面都是 GET 方法。表单提交产生 POST 方法。

HEAD 则是跟 GET 类似，只返回请求头，多数由 JavaScript 发起。

PUT 和 DELETE 分别表示添加资源和删除资源，但是实际上这只是语义上的一种约定，并没有强约束。

CONNECT 现在多用于 HTTPS 和 WebSocket。

OPTIONS 和 TRACE 一般用于调试，多数线上服务都不支持。

#### HTTP Status code（状态码）和 Status text（状态文本）

接下来我们看看 response line 的状态码和状态文本。常见的状态码有以下几种。

* 1xx：临时回应，表示客户端请继续。
* 2xx：请求成功。
  * 200：请求成功。
* 3xx: 表示请求的目标有变化，希望客户端进一步处理。
  * 301&302：永久性与临时性跳转。
  * 304：跟客户端缓存没有更新。
* 4xx：客户端请求错误。
  * 403：无权限。
  * 404：表示请求的页面不存在。
  * 418：It’s a teapot. 这是一个彩蛋，来自 ietf 的一个愚人节玩笑。（超文本咖啡壶控制协议）
* 5xx：服务端请求错误。
  * 500：服务端错误。
  * 503：服务端暂时性错误，可以一会再试。

对我们前端来说，1xx 系列的状态码是非常陌生的，原因是 1xx 的状态被浏览器 HTTP 库直接处理掉了，不会让上层应用知晓。

2xx 系列的状态最熟悉的就是 200，这通常是网页请求成功的标志，也是大家最喜欢的状态码。

3xx 系列比较复杂，301 和 302 两个状态表示当前资源已经被转移，只不过一个是永久性转移，一个是临时性转移。实际上 301 更接近于一种报错，提示客户端下次别来了。

304 又是一个每个前端必知必会的状态，产生这个状态的前提是：客户端本地已经有缓存的版本，并且在 Request 中告诉了服务端，当服务端通过时间或者 tag，发现没有更新的时候，就会返回一个不含 body 的 304 状态。

#### HTTP Head (HTTP 头)

HTTP 头可以看作一个键值对。原则上，HTTP 头也是一种数据，我们可以自由定义 HTTP 头和值。不过在 HTTP 规范中，规定了一些特殊的 HTTP 头，我们现在就来了解一下它们。

在 HTTP 标准中，有完整的请求 / 响应头规定，这里我们挑几个重点的说一下：

Request Header。

![Request Header](/Users/zhaoyang/tool/images/前端知识体系/浏览器工作原理/Request Header.png)

Response Header。

![Response Header](/Users/zhaoyang/tool/images/前端知识体系/浏览器工作原理/Response Header.png)

#### HTTP Request Body

HTTP 请求的 body 主要用于提交表单场景。实际上，HTTP 请求的 body 是比较自由的，只要浏览器端发送的 body 服务端认可就可以了。一些常见的 body 格式是：

* application/json
* application/x-www-form-urlencoded
* multipart/form-data
* text/xml

我们使用 HTML 的 form 标签提交产生的 HTML 请求，默认会产生 application/x-www-form-urlencoded 的数据格式，当有文件上传时，则会使用 multipart/form-data。



### HTTP 缓存

所谓缓存就是把数据存在本地，下一次请求可以直接读这个缓存，而不需要到真正返回这个内容的服务器上面去重新操作返回内容了，代理服务器以及发起请求的客户端，都可以做缓存的操作。

##### 强缓存



##### 协商缓存





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



## 跨域

### 什么是跨域

#### 同源策略

ajax 请求的时候，浏览器要求当前网页和 server 必须同源（安全）。在服务端或非浏览器的环境下是可以请求的。这个同源策略是浏览器要求的。

#### 同源

对于一个 url 来说，前端页面和 server 端做对比，协议、域名、端口，三者必须一致。

#### 加载图片，css，js 可无视同源策略

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

#### 跨域

所有的跨域，都必须经过 server 端允许和配合。

如果未经 server 端允许就实现的跨域，说明浏览器有漏洞，是一个危险信号。

### 跨域解决方案

#### Jsonp

我们先看一个问题，浏览器随便访问一个网址，服务端返回的一定是一个 html 文件吗。服务端拿到这个网址 url 之后分析，获取这个请求文件的内容，然后把文件内容返回，其实服务端不一定返回一个 html 文件的内容，服务端可以动态拼接任何的数据内容返回，只要符合相应文件的格式要求，同理 script 去访问一个 js 地址，也不一定就返回一个 js 静态文件。

##### Jsonp 原理

* \<script> 可以绕过跨域限制
* 服务端可以拼接任意动态数据返回
* 所以就可以通过 \<script> 获得跨域的数据，只要服务端愿意返回

##### jsonp 简易 demo

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

#### cors

服务端支持的一种解决跨域的方式，是纯服务器端的操作。

cors 其实是一个统称，就是服务器端可以设置 http header，在服务端 response 返回的时候可以设置 header，如下面这些东西。

```js
response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081') // 允许的域名是什么 
response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')     // 允许的headers是什么 
response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS') // 允许的methods是什么 
response.setHeader('Access-Control-Allow-Credentials', 'true') // 接收跨域的cookie，是否允许传cookie
```
