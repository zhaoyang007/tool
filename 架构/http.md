##### 网络编程

* 物理层
* 网络层
* 传输层
  * TCP
  * UDP
* 应用层
  * TELNET
  * SSH
  * HTTP
  * SMTP
  * POP
  * SSL/TLS
  * FTP
  * MIME
  * HTML

##### HTTP 协议格式

```bash
curl -v http://www.baidu.com
```



请求部分：

* 请求行 request line

  * 请求方法：表示此次 HTTP 请求希望执行的操作类型。只是语义上的约定，并没有强约束。

    GET, POST, HEAD, PUT, DELETE, CONNECT, OPTIONS, TRACE。

    浏览器通过地址栏访问页面都是 GET 方法。表单提交产生 POST 方法。

    HEAD 则是跟 GET 类似，只返回请求头，多数由 JavaScript 发起。

    PUT 和 DELETE 分别表示添加资源和删除资源。

    CONNECT 现在多用于 HTTPS 和 WebSocket。

    OPTIONS 和 TRACE 一般用于调试，多数线上服务都不支持。预检请求的 method 也是 OPTIONS。

  * 请求的路径

  * 协议和版本

* 请求头 request header

  HTTP 头也是一种数据，可以自由定义 HTTP 头和值。不过在 HTTP 规范中，规定了一些特殊的 HTTP 头。

  * Accept：告诉服务端想要的数据类型
  * Accept-Charset：想要接收数据的字符集
  * Accept-Encoding：数据编码方式，用来限制服务端如何进行数据压缩。
  * Accept-Language：语言。
  * Authorization：鉴权的 token。
  * Connection：连接方式，如果是 keep-alive，且服务端支持，则会复用连接。
  * Host：Http 访问使用的域名。
  * Content-Type：请求数据 body 的编码类型。
  * Cookie：客户端存储的 cookie 字符串。
  * User-Agent：浏览器的一些相关的信息。操作系统及版本/cpu/浏览器及版本/浏览器渲染引擎/浏览器语言/浏览器插件
  * Cache-Control：控制缓存时效性。
  * If-Modified-Since：上次访问时的更改时间，如果服务端认为此时间后自己没有更新，则会给出 304 响应。
  * If-None-Match：上次访问时使用的 E-Tag，通常是页面的信息摘要。

* 请求体：请求体可能包含文件或者表单数据

  HTTP 请求的 body 主要用于提交表单场景。一些常见的 body 格式是：

  * application/json
  * application/x-www-form-urlencoded
  * multipart/form-data：既有文本数据，又有文件等二进制数据。所有的传输数据类型都会在编码里面去体现。
  * text/xml
  
  form 表单提交产生的请求，默认会产生 application/x-www-form-urlencoded 的数据格式，当有文件上传时，则会使用 multipart/form-data。

响应部分：

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
      * 400：请求参数有语法错误，不能被服务器理解。
      * 401：没登录，鉴权失败。
      * 403：无权限。禁止访问，服务器收到请求，但是拒绝提供服务。
      * 404：表示请求的页面不存在。
    * 5xx：服务端请求错误。
      * 500：服务端错误。
      * 502：网关错误。
      * 503：由于超载或停机维护，服务器目前无法使用，请求超时，一段时间后可恢复正常，服务端暂时性错误，可以一会再试。
  * 状态文本
  
* 响应头 response header

  * Content-Type：对应 Accept，Accept 里面可以接收好几种不同的数据格式，那么 Content-Type 可以从里面选择一种然后做为它真正返回的数据格式进行一个返回，客户端根据这个来进行一个怎么样的显示。
  * Content-Encoding：对应的是 Accept-Encoding，服务端具体使用的数据压缩方式。
  * Content-Language：语言。
  * Content-Length：内容长度，有利于浏览器判断内容是否已经结束。
  * Connection：连接方式，keep-alive 表示复用连接。
  * Date：当前服务器日期。
  * Keep-Alive：保持连接不断时需要的一些信息，如 timeout=5, max=100。
  * Location：告诉客户端重定向的地址。
  * Server：服务端软件类型。
  * Set-Cookie：设置 cookie，可以存在多个。
  * Via：服务端请求链路，对一些调试场景至关重要。
  * Expires：过期时间，用于判断下次请求是否需要到服务端取回页面。
  * Cache-Control：缓存控制，用于通知各级缓存保存的时间，例如 max-age=0，表示不要缓存。
  * Last-Modified：页面上次修改的时间。
  * ETag：页面信息摘要，用于判断是否需要重新到服务端取回页面。
  * Access-Control-Allow-Origin：允许的跨域的源，如：'http://localhost:3000'
  * Access-Control-Allow-Headers：允许跨域的请求头，如：'X-Token,Content-Type'
  * Access-Control-Allow-Method：允许跨域的方法，如：'PUT,OPTIONS'
  * Access-Control-Allow-Credentials: true。跨域时默认是不记录 cookie 认证信息的。加上这个让它能够记录，从而能够使用 cookie。

* 响应体：头之后，以一个空行为分隔，响应体则是 HTML 代码。

##### HTTP 缓存

缓存配置都是由服务端控制的，第一次请求成功之后，响应头中会携带相关的缓存信息。

命中强缓存后不会发送请求，没有命中强缓存后才走协商缓存，协商缓存每次都要发送请求，是否命中协商缓存由后端对比相关 header 字段来确定。

强缓存：

cache-control 优先级高于 expires

* expires：它的值为一个绝对时间的 GMT 格式的时间字符串。发送请求的时间在 expires 之前，本地缓存始终有效，强缓存命中。
* cache-control：max-age=number，它是一个相对值，根据资源第一次的请求时间和这个相对值，计算出一个资源过期时间，之后的请求时间在过期时间之前，就能命中缓存。该头可以存在多个。
  * no-cache：不使用强缓存，需要使用缓存协商。
  * no-store：禁止使用强缓存和协商缓存等任何缓存行为，每次请求都重新到服务器拉取最新资源。
  * public：可以被所有的用户缓存，包括终端和 CDN 等中间代理服务器。
  * private：只能被终端用户的浏览器缓存，不允许 CDN 等中继缓存服务器对其缓存。

协商缓存：

协商缓存的这两组搭档是成对出现的，即第一次请求的响应头带上某个字段（Last-Modified 或者 Etag），则后续请求的请求头就会带上对应字段（If-Modified-Since或者If-None-Match），若响应头没有相应字段，则请求头也不会有对应的字段。

服务器会优先验证 ETag，一致的情况下，才会继续比对 Last-Modified。

* Last-Modified/If-Modified-Since：

  这两个值是 GMT 格式的时间字符串。

  * 浏览器第一次跟服务器请求一个资源，服务器在返回这个资源的同时，在 respone 的 header 加上 Last-Modified 的 header，表示这个资源在服务器上的最后修改时间。
  * 浏览器再次跟服务器请求这个资源时，在 request 的 header 上加上 If-Modified-Since 的 header，这个 header 的值就是上一次请求时返回的 Last-Modified 的值。
  * 服务器再次收到资源请求时，根据浏览器传过来 If-Modified-Since 和资源在服务器上的最后修改时间判断资源是否有变化，如果没有变化则返回 304 Not Modified，但是不会返回资源内容；如果有变化，就正常返回资源内容和新的 Last-Modified 的 header。当服务器返回 304 Not Modified 的响应时，response header 中不会再添加 Last-Modified 的 header，因为既然资源没有变化，那么 Last-Modified 也就不会改变。
  * 浏览器收到 304 的响应后，就会从缓存中加载资源。

* Etag/If-None-Match

  这两个值是由服务器生成的每个资源的唯一标识字符串，只要资源有变化这个值就会改变。

  判断过程与 Last-Modified/If-Modified-Since 类似。不同的是，当服务器返回 304 Not Modified 的响应时，由于 ETag 重新生成过，response header 中还会把这个 ETag 返回，即使这个 ETag 跟之前的没有变化。

* 优缺点

  * Last-Modified
    * 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新 GET；
    * 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，If-Modified-Since 能检查到的粒度是 s 级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；
    * 某些服务器不能精确的得到文件的最后修改时间。
  * Etag
    * Etag 能很好的解决上面 Last-Modified 遇到的问题，但由于要生成 hash，会消耗性能。

用户行为对缓存的影响：

![用户行为对缓存的影响](图片/用户行为对缓存的影响.png)

##### 预检请求

报头使用了一些非正常报头会触发预检请求，使用非 get/post 的请求也会触发预检请求。
