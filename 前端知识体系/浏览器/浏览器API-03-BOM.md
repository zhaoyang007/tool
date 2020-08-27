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



### navigator



### 存储

#### cookie

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

但是 cookie 当时的设计并不是为了做本地存储，它是为了浏览器和服务端进行通讯，它只是被借用来做本地存储，它本来不是干这个活的，所以用它来做本地存储肯定会有一些问题：

* 存储大小，cookie 是有存储大小限制的，最大存 4kb，超过了 4kb，就存不下了，为什么有这个限制呢，因为在发送请求的时候，是要把 cookie 带上的。如果 cookie 的内容很多。每次请求都带上 cookie，会严重影响每次的请求。
* cookie 回跟随 http 请求发送出去，你存什么东西，每次请求都会带到服务器上去，增加请求的数据量，请求会变慢一些。
* 只能用 document.cookie = '' 这种方式来修改，这种 api 太过简陋也太不好理解。

#### localStorage sessionStorage

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
* sessionStorage 的数据只存在于当前会话，当前会话就是当前你和服务端的一个连接，比如说浏览器关闭的时候它会清空，sessionStorage 类似于服务端的一个 session。session 是和登录和用户验证有关系的。sessionStorage 它会存在于用户活跃的这段时间，如果用户关闭浏览器走了，不再访问这个网站了，它就会自动清空了。
* 用的话一般用 localStorage 会更多一些。
