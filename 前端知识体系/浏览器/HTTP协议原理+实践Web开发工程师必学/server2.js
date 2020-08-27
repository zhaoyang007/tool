const http = require('http')

http.createServer(function (request, response) {
    // request对应就是请求我们这个服务它发送的内容都会封装到这个request对象里面
    // response就是我们要做一些返回的内容的时候我们使用这个对象来进行一个操作就可以返回我们想要返回的东西了
    console.log('request come', request.url)

    // 设置允许跨域的头'Access-Control-Allow-Origin'
    response.writeHead('200', {
        'Access-Control-Allow-Origin': '*', // 可以设置为某一个特定的域名比如说'http://baidu.com'
        'Access-Control-Allow-Headers': 'X-Test-Cors' // 设置为我们自定义的头允许跨域
    })

    // 然后呢我们要做出一个返回，不然的话我们就相当于没有进行一个返回的操作，这样的话我们的页面就直接报错了
    response.end('123')

}).listen(8887) // 那么我们有了这个服务之后呢，我们需要去监听一个端口，因为我们所有的服务要监听一个端口之后才能进行一个访问

console.log('server listening on 8887')

/* 
    那么我们最简单的一个nodejs的http服务就已经写好了，写好了之后呢，我们就可以去启动它，创建成功之后呢我们就可以通过
    localhost:8888来进行一个访问。我们可以看到浏览器页面上有一个内容的显示是我们的123，它显示出来了代表我们服务请求
    成功了，而且它有返回内容了。
    接下去我们要讲的内容都会基于这个服务我们来进行一个演示，让大家能够更好的去理解在http协议当中我们如何去传输数据以及使用数据的。
*/
