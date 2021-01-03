### HTTP 协议格式

##### 请求部分

* 请求行 request line

  * 请求的方法：表示此次 HTTP 请求希望执行的操作类型。实际上这只是语义上的一种约定，并没有强约束。

    GET, POST, HEAD, PUT, DELETE, CONNECT, OPTIONS, TRACE。

    浏览器通过地址栏访问页面都是 GET 方法。表单提交产生 POST 方法。

    HEAD 则是跟 GET 类似，只返回请求头，多数由 JavaScript 发起。

    PUT 和 DELETE 分别表示添加资源和删除资源。

    CONNECT 现在多用于 HTTPS 和 WebSocket。

    OPTIONS 和 TRACE 一般用于调试，多数线上服务都不支持。

  * 请求的路径

  * 协议和版本

* 请求头 request header：这些头由若干行组成，每行是用冒号分隔的名称和值。

  HTTP 头可以看作一个键值对。原则上，HTTP 头也是一种数据，我们可以自由定义 HTTP 头和值。不过在 HTTP 规范中，规定了一些特殊的 HTTP 头，我们现在就来了解一下它们。

  * Accept：告诉服务端我想要怎么样的一个数据类型
  * Accept-Encoding：代表我这个数据是怎么样的一个编码方式来进行一个传输，主要的就是用来限制服务端如何进行一个数据的压缩。
  * Accept-Language：语言。
  * User-Agent：用来表示浏览器的一些相关的信

  ![Request Header](/Users/zhaoyang/tool/images/前端知识体系/浏览器工作原理/Request Header.png)

* 请求体：头之后，以一个空行为分隔，请求体可能包含文件或者表单数据

  HTTP 请求的 body 主要用于提交表单场景。实际上，HTTP 请求的 body 是比较自由的，只要浏览器端发送的 body 服务端认可就可以了。一些常见的 body 格式是：

  * application/json
  * application/x-www-form-urlencoded
  * multipart/form-data
  * text/xml

  我们使用 HTML 的 form 标签提交产生的 HTML 请求，默认会产生 application/x-www-form-urlencoded 的数据格式，当有文件上传时，则会使用 multipart/form-data。

##### 响应部分

* 响应行 response line

  * 协议和版本
  * 状态码
    * 1xx：临时回应，表示客户端请继续。对前端来说，1xx 系列的状态码是非常陌生的，原因是 1xx 的状态被浏览器 HTTP 库直接处理掉了，不会让上层应用知晓。
    * 2xx：请求成功。
      * 200：请求成功。
    * 3xx: 表示请求的目标有变化，希望客户端进一步处理。
      * 301&302：永久性与临时性跳转。表示当前资源已经被转移。
      * 304：跟客户端缓存没有更新。
    * 4xx：客户端请求错误。
      * 401：就代表你发送这个请求的时候你没有做认证，那么你是没有权限去获取你请求的。
      * 403：无权限。禁止访问，服务器收到请求，但是拒绝提供服务
      * 404：表示请求的页面不存在。
      * 418：It’s a teapot. 这是一个彩蛋，来自 ietf 的一个愚人节玩笑。（超文本咖啡壶控制协议）
    * 5xx：服务端请求错误。
      * 500：服务端错误。
      * 502：网关错误。
      * 503：由于超载或停机维护，服务器目前无法使用，请求超时，一段时间后可恢复正常，服务端暂时性错误，可以一会再试。
  * 状态文本

* 响应头 response header：这些头由若干行组成，每行是用冒号分隔的名称和值。

  HTTP 头可以看作一个键值对。原则上，HTTP 头也是一种数据，我们可以自由定义 HTTP 头和值。不过在 HTTP 规范中，规定了一些特殊的 HTTP 头，我们现在就来了解一下它们。

  * Content
  * Content-Type：那么与之对应的就是服务端返回的时候，服务端返回的 Content，它里面会有 Content-Type 来对应 Accept，Accept 里面可以接收好几种不同的数据格式，那么 Content-Type 可以从里面选择一种然后做为它真正返回的数据格式进行一个返回 a，客户端根据这个来进行一个怎么样的显示。一个是 text/plain,一个是 multipart/form-data，还有一个是 application/x-www-from-urlencoded。
  * Content-Encoding：对应的是 Accept-Encoding，我服务端具体到底是用了 gzip 还是 deflate 这种数据压缩的方式。
  * Content-Language：语言。

  ![Response Header](/Users/zhaoyang/tool/images/前端知识体系/浏览器工作原理/Response Header.png)

* 响应体：头之后，以一个空行为分隔，响应体则是 HTML 代码



### HTTP 缓存

这些缓存配置都是由服务端控制的，第一次请求成功之后，响应头中会携带相关的缓存信息。

命中强缓存后不会发送请求，没有命中强缓存后才走协商缓存，协商缓存每次都要发送请求，是否命中协商缓存由后端对比相关 header 字段来确定。

##### 强缓存

cache-control 优先级高于 expires

* **expires**：它的值为一个绝对时间的GMT格式的时间字符串。发送请求的时间在expires之前，本地缓存始终有效，强缓存命中。
* **cache-control**：max-age=number，它是一个相对值，根据资源第一次的请求时间和在这个相对值，计算出一个资源过期时间，请求时间在过期时间之前，就能命中缓存。
  * no-cache：不使用强缓存，需要使用缓存协商。
  * no-store：直接禁止包括强缓存和协商缓存在内的任何缓存行为，每次请求都重新到服务器拉取最新资源。
  * public：可以被所有的用户缓存，包括终端和CDN等中间代理服务器。
  * private：只能被终端用户的浏览器缓存，不允许CDN等中继缓存服务器对其缓存。

##### 协商缓存

协商缓存的这两组搭档是成对出现的，即第一次请求的响应头带上某个字段（Last-Modified 或者 Etag），则后续请求的请求头就会带上对应字段（If-Modified-Since或者If-None-Match），若响应头没有相应字段，则请求头也不会有对应的字段。

服务器会优先验证 ETag，一致的情况下，才会继续比对 Last-Modified。

* **Last-Modified/If-Modified-Since**：

  这两个值是 GMT 格式的时间字符串。

  * 浏览器第一次跟服务器请求一个资源，服务器在返回这个资源的同时，在 respone 的 header 加上 Last-Modified 的 header，这个 header 表示这个资源在服务器上的最后修改时间。
  * 浏览器再次跟服务器请求这个资源时，在 request 的 header 上加上 If-Modified-Since 的 header，这个 header 的值就是上一次请求时返回的 Last-Modified 的值。
  * 服务器再次收到资源请求时，根据浏览器传过来 If-Modified-Since 和资源在服务器上的最后修改时间判断资源是否有变化，如果没有变化则返回 304 Not Modified，但是不会返回资源内容；如果有变化，就正常返回资源内容和新的 Last-Modified 的 header。当服务器返回 304 Not Modified 的响应时，response header 中不会再添加 Last-Modified 的 header，因为既然资源没有变化，那么 Last-Modified 也就不会改变。
  * 浏览器收到 304 的响应后，就会从缓存中加载资源。

* **Etag/If-None-Match**

  这两个值是由服务器生成的每个资源的唯一标识字符串，只要资源有变化就这个值就会改变。

  判断过程与 Last-Modified/If-Modified-Since 类似。不同的是，当服务器返回 304 Not Modified 的响应时，由于 ETag 重新生成过，response header 中还会把这个 ETag 返回，即使这个 ETag 跟之前的没有变化。

* 优缺点

  * Last-Modified
    * 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新GET；
    * 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，If-Modified-Since能检查到的粒度是s级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；
    * 某些服务器不能精确的得到文件的最后修改时间。
  * Etag
    * Etag 能很好的解决上面 Last-Modified 遇到的问题，但由于要生成 hash，会消耗性能。

##### 用户行为对缓存的影响

![用户行为对缓存的影响](/Users/zhaoyang/tool/images/前端知识体系/浏览器工作原理/用户行为对缓存的影响.png)



### ajax

xhr.readyState 等于 4 的时候才说明 ajax 请求成功了，然后判断 xhr.status 也就是 http 状态码就可以了。比如网络断开的情况下 xhr 不可能等于 4，所以前端 ajax 请求的业务逻辑中根本就不用判断类似断网的这种情况。

##### 简易 ajax 封装

```js
// 回调函数版
function ajax (url, method, successFn, errorFn, postData) {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successFn(
          JSON.parse(xhr.responseText) // 返回的信息是字符串
        )
      } else if (xhr.status === 404) {
        errorFn(new Error('404 not found'))
      }
    }
  }
  if (method === 'GET') {
  	xhr.send()
  } else {
    xhr.send(JSON.stringify(postData)) // 发送的数据也要求是字符串
  }
}

const url = '/data/test.json'
const method = 'POST'
const postData = {
  username: 'zhangsan',
  password: 'xxx'
}
ajax(url, method, postData, function(res) {
  console.log(res)
}, function(err) {
  console.log(err)
})
```

```js
// promise版
function ajax (url, method, postData) {
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
    if (method === 'GET') {
      xhr.send()
    } else {
      xhr.send(JSON.stringify(postData)) // 发送的数据也要求是字符串
    }
  })
  return p
}

const url = '/data/test.json'
const method = 'GET'
const postData = {
  username: 'zhangsan',
  password: 'xxx'
}
ajax(url, method, postData)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
```



### 跨域

##### 同源策略

ajax 请求的时候，浏览器要求当前网页和 server 必须同源（安全），同源指的是协议、域名、端口三者一致。在服务端或非浏览器的环境下是没有这个限制的。

##### 加载图片，css，js 可无视同源策略

同源策略第一个条件就是 ajax 请求，如果不是 ajax 请求，比如说图片，css，js 等文件的加载可无视同源策略，它们的地址都可以跨域，浏览器不会限制。

图片，css，js 可以无视同源策略，都是有一定的功能需求的，浏览器也是为了它们有一定功能做了一些考虑。

```html
<img src="跨域的图片地址" />
<link href="跨域的css地址" />
<script src="跨域的js地址"></script>
```

1.\<img/>

图片可用于统计打点。统计可能是使用第三方统计服务，比如站长之家，百度统计等，这些都是外域的，统计打点无非就是发一个请求，如果用 ajax 发的话就会出现跨域。所以说我们用图片，初始化一个图片，把图片的地址写成第三方统计服务的地址，在地址里面写上我们各种各样需要的参数，通过图片去发这个请求就可以了。

2.\<link/> \<script>

\<link /> \<script> 可以使用 cdn，cdn 一般都是外域。

3.\<script> 可以实现 jsonp

jsonp 是前端实现跨域一个比较常用的方案。

##### 跨域解决方案

所有的跨域，都必须经过 server 端允许和配合。

如果未经 server 端允许就实现的跨域，说明浏览器有漏洞，是一个危险信号。

1.Jsonp

我们先看一个问题，浏览器随便访问一个网址，服务端返回的一定是一个 html 文件吗。服务端拿到这个网址 url 之后分析，获取这个请求文件的内容，然后把文件内容返回，其实服务端不一定返回一个 html 文件的内容，服务端可以动态拼接任何的数据内容返回，只要符合相应文件的格式要求，同理 script 去访问一个 js 地址，也不一定就返回一个 js 静态文件。

Jsonp 原理

* \<script> 可以绕过跨域限制
* 服务端可以拼接任意动态数据返回
* 所以就可以通过 \<script> 获得跨域的数据，只要服务端愿意返回
* 只能用 GET 请求，并且要求返回 JavaScript。

jsonp 简易 demo

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

2.cors

其实不管我们有没有返回 'Access-Control-Allow-Origin' 这个头，浏览器它都会向我们的服务去发送这个请求，浏览器在发送一个请求的时候它并不知道我们这个服务是不是跨域的，所以说它还是会发送请求，并且接收你的返回内容，只不过呢在浏览器接收到它的数据返回的时候，它看到里面没有一个'Access-Control-Allow-Origin'这么一个头并且设置为允许的话，那么它会把这个请求返回的内容给它忽略掉并且在控制台中报跨域的错。

服务端支持的一种解决跨域的方式，是纯服务器端的操作。

cors 其实是一个统称，就是服务器端可以设置 http header，在服务端 response 返回的时候可以设置 header，如下面这些东西。

```js
response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081') // 允许的域名是什么 
response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')     // 允许的headers是什么 
response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS') // 允许的methods是什么 
response.setHeader('Access-Control-Allow-Credentials', 'true') // 接收跨域的cookie，是否允许传cookie
```



### cookie 和 session

cookie 是在服务端返回数据的时候通过 Set-Cookie 这个 header 设置到浏览器里面。

在网站的开发当中，经常用到的就是使用 cookie 来保存 session，我们经常会做的一个方式就是把用户登录之后的一个 id 或者是 session的一个 key 给它设置到 cookie 里面，然后下一次用户请求过来的时候呢，我们就可以读取这个 cookie 下面的值，然后通过这个 key 去定位这个用户的信息，这就是 session 的概念，只要能够保证定位到这个用户，那么它就是一种 session 的实现方案，我们可以直接把用户的 id 给它写到 cookie 里面去，然后下次请求过来的时候，我们根据这个 id 去搜索用户的信息，但是呢因为用户 id 也算是用户信息的一部分，那么直接保存在客户端，那么相对是不太安全的，那么也有其他的方案就是说我们把这个 id 相关的一些信息给它转化一下，转化成一个对应的唯一key，然后这个用户信息跟这个sessionkey的对应关系就存在服务端的数据库或者缓存里面，然后请求过来的时候我们读取这个 sessionkey 然后再去搜索一下，把这个对应的关系拿出来就可以，这就是 session 的一个概念，它跟 cookie 不是一一对应的，它不一定要用 cookie 来实现，我们可以通过 js 的方式写在 header 里面那也是可以实现的，所以方式有很多种。