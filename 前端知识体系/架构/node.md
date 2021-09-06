##### node 基础

js 在前端操作的对象是针对浏览器，DOM/BOM/XMLHttpRequest(网络通讯)。

js 在后端操作的对象主要是：

* os 操作系统
* process 进程
* fs 文件系统
* net 网络通讯

##### node 基础 API

global（全局对象）

* CommonJS
* Buffer、process、console
* timer

process

```js
// argv 启动prcess时的参数
const { argv, argv0, execArgv, execPath } = process;
argv.forEach(item => {
	console.log(item);
});
console.log(argv0);
console.log(execArgv);
console.log(execPath);
// 环境
const { env } = process;
console.log(env);
// cwd() 当前process命令执行的路径，和linux pwd命令是一样的
const { env } = process;
console.log(cwd());
// 下一个事件执行队列
// 执行早于setImmediate
process.nextTick(() => {
	console.log('nextTick');
});
setImmediate(() => {
  console.log('setImmediate');
});
```

path

```js
path.basename('/foo/bar/baz/asdf/quux.html'); // 返回: 'quux.html'
path.basename('/foo/bar/baz/asdf/quux.html', '.html'); // 返回: 'quux'
path.dirname('/foo/bar/baz/asdf/quux.html'); // 返回: '/foo/bar/baz/asdf'
path.extname('index.html'); // 返回: '.html'

path.normalize(); // 规范化给定的 path
path.join(); // 拼接路径，内部调用了normalize使不规范的路径更规范，传入非字符串则抛出TypeError
path.resolve(); // 把相对路径解析成绝对路径

path.parse('/home/user/dir/file.txt');
// 返回:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'}
path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt'
});
// 返回: '/home/user/dir/file.txt'
// 如果提供 dir，则忽略 root
// 如果 pathObject.base 存在，则忽略 ext 和 name

// __dirname __filename 总是返回文件的绝对路径
// process.cwd() 总是返回执行node命令所在的文件夹
// path.resolve('./') 相对node执行命令的文件夹的路径
```

buffer

buffer 用于处理二进制数据流。

buffer 实例类似整数数组，大小固定。

buffer 是 c++ 代码在 v8 堆外分配的物理内存。

event

```js
const EventEmitter = require('events');
class CustomEvent extends EventEmitter {}
const ce = new CustomEvent();
ce.on('test', () => {
	console.log('this is a test')
});

setInterval(() => {
	ce.emit('test')
}, 500);

setTimeout(() => {
  ce.removeListener('test', fn);
  ce.removeAllListeners('test');
});
```

fs

```js
// 文件读写
fs.readFile('./path.js', 'utf8',(err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.writeFile('./text', 'this is a text', 'utf8', (err) => {
  if (err) throw err;
  console.log('done!');
});

// stat 文件信息
fs.stat('./test.js', (err, stats) => {
  if (err) {
    // throw err;
    console.log('文件不存在');
    return;
  }
  console.log(stats.isFile());
	console.log(stats.isDirectory());
  console.log(stats)
});

fs.rename('./text', './text.txt', err => {
  if (err) throw err;
  console.log('done!')
});
fs.unlink('./text.txt', err => {
  if (err) throw err;
});

fs.readdir('./', (err, files) => {
  if (err) throw err;
  // files是该文件夹下的所有文件名。
  console.log(files);
})
fs.mkdir('test', err => {});
fs.rmdir('./test', err => {});

fs.watch('./', () => {
  recursive: true,
}, (eventType, filename) => {
	console.log(eventType, filename);
});

// 这个含义跟readFile是很像的，但是比readFile实现的更加优雅
const rs = fs.createReadStream('./test.js');
rs.pipe(process.stdout);
  
const ws = fs.createWriteStream('./test.txt');
const timer = setInterVal(() => {
  const num = parseInt(Math.random() * 10);
  if (num < 7) {
		ws.write(num + '');
  } else {
    clearInterval(timer);
		ws.end();
  }
}, 200);
ws.on('finish', () => {
  console.log('done!');
});
```

http

```js
const http = require('http');
// requestListener 会自动添加到 'request' 事件，每次有请求时触发。
const server = http.createServer((req, res) => {
	res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
});
const port = 9527;
const host = '127.0.0.1';
server.listen(port, host, () => {
	console.log(`serve is listening on ${host}:${port}`);
});
```



##### koa

```js
const Koa = require('koa');
const app = new Koa();

app.listen(3000, () => {
	console.log('server is listening on http://localhost:3000');
});
```

##### koa-middleware

```js
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
```

每收到一个 http 请求，koa 就会调用通过 `app.use()` 注册的 async 函数，并传入 `ctx` 和 `next` 参数。

我们可以对 `ctx` 操作，并设置返回内容。但是为什么要调用 `await next()`？

原因是 koa 把很多 async 函数组成一个处理链，每个 async 函数都可以做一些自己的事情，然后用 `await next()` 来调用下一个 async函数。我们把每个 async 函数称为 middleware，这些 middleware 可以组合起来，完成很多有用的功能。

例如，可以用以下3个middleware组成处理链，依次打印日志，记录处理时间，输出HTML：

```js
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
```

middleware的顺序很重要，也就是调用`app.use()`的顺序决定了middleware的顺序。

如果一个 middleware 没有调用`await next()`，会怎么办？答案是后续的middleware将不再执行了。这种情况也很常见，例如，一个检测用户权限的middleware可以决定是否继续处理请求，还是直接返回403错误：

```js
app.use(async (ctx, next) => {
    if (await checkUserPermission(ctx)) {
        await next();
    } else {
        ctx.response.status = 403;
    }
});
```

##### koa-router

`koa-router` 这个 middleware，负责处理 URL 映射。

```js
const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});
router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
```

处理post请求：

用 post 请求处理 URL 时，我们会遇到一个问题：post 请求通常会发送一个表单，或者 JSON，它作为 request 的 body 发送，但无论是 Node.js 提供的原始 request 对象，还是 koa 提供的 request 对象，都不提供解析 request 的 body 的功能！

所以，我们又需要引入另一个 middleware 来解析原始 request 请求，然后，把解析后的参数，绑定到 `ctx.request.body` 中。

##### koa-bodyparser

`koa-bodyparser ` 就是用来干这个活的。

```js
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());
```

由于 middleware 的顺序很重要，这个 `koa-bodyparser` 必须在 `router `之前被注册到 `app `对象上。

现在我们就可以处理 post 请求了。写一个简单的登录表单：

```js
router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    let name = ctx.request.body.name || '';
    let password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});
```

##### 重构

现在，我们已经可以处理不同的 URL 了，但是看看 `app.js`，总觉得还是有点不对劲。

所有的 URL 处理函数都放到 `app.js` 里显得很乱，而且，每加一个 URL，就需要修改 `app.js`。随着 URL 越来越多，`app.js `就会越来越长。

如果能把URL处理函数集中到某个js文件，或者某几个js文件中就好了，然后让`app.js`自动导入所有处理URL的函数。这样，代码一分离，逻辑就显得清楚了。最好是这样：

```
url2-koa/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- controllers/
|  |
|  +- login.js <-- 处理login相关URL
|  |
|  +- users.js <-- 处理用户管理相关URL
|
+- app.js <-- 使用koa的js
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```

我们先在 `controllers `目录下编写 `index.js`：

```js
var fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

var fn_signin = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
};
```

类似的，`hello.js `把一个 URL 处理函数暴露出来：

```js
var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = {
    'GET /hello/:name': fn_hello
};
```

现在，我们修改 `app.js`，让它自动扫描 `controllers` 目录，找到所有 `js ` 文件，导入，然后注册每个 URL：

```js
// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
var files = fs.readdirSync(__dirname + '/controllers');

// 过滤出.js文件:
var js_files = files.filter((f)=>{
    return f.endsWith('.js');
});

// 处理每个js文件:
for (var f of js_files) {
    console.log(`process controller: ${f}...`);
    // 导入js文件:
    let mapping = require(__dirname + '/controllers/' + f);
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            // 如果url类似"GET xxx":
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx":
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}
```

如果上面的大段代码看起来还是有点费劲，那就把它拆成更小单元的函数：

```js
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router) {
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

addControllers(router);
```

##### Controller Middleware

最后，我们把扫描`controllers`目录和创建`router`的代码从`app.js`中提取出来，作为一个简单的middleware使用，命名为`controller.js`：

```js
const fs = require('fs');

function addMapping(router, mapping) {
    ...
}

function addControllers(router, dir) {
    ...
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers'; // 如果不传参数，扫描目录默认为'controllers'
    let router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};
```

这样一来，我们在`app.js`的代码又简化了：

```js
...

// 导入controller middleware:
const controller = require('./controller');

...

// 使用middleware:
app.use(controller());

...
```

经过重新整理后的工程`url2-koa`目前具备非常好的模块化，所有处理URL的函数按功能组存放在`controllers`目录，今后我们也只需要不断往这个目录下加东西就可以了，`app.js`保持不变。

##### npm

重装所有依赖

```bash
npm reinstall
# 或
rm -rf node_modules && npm cache clean && npm install
```

重装某个依赖

```bash
npm uninstall ant-design-vue
```

```bash
npm install ant-design-vue@1.4.11
```

##### MIME 类型

媒体类型（通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型 ）是一种标准，用来表示文档、文件或字节流的性质和格式。

浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理URL，因此Web服务器在响应头中添加正确的MIME类型非常重要。如果配置不正确，浏览器可能会曲解文件内容，网站将无法正常工作，并且下载的文件也会被错误处理。

通用结构：

*type* 表示可以被分多个子类的独立类别。*subtype* 表示细分后的每个类型。

```
type/subtype
```

独立类型：

独立类型表明了对文件的分类，可以是如下之一：

| 类型          | 描述                                                         | 典型示例                                                     |
| :------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `text`        | 表明文件是普通文本，理论上是人类可读                         | `text/plain`, `text/html`, `text/css, text/javascript`       |
| `image`       | 表明是某种图像。不包括视频，但是动态图（比如动态gif）也使用image类型 | `image/gif`, `image/png`, `image/jpeg`, `image/bmp`, `image/webp`, `image/x-icon`, `image/vnd.microsoft.icon`, `image/svg+xml` |
| `audio`       | 表明是某种音频文件                                           | `audio/midi`, `audio/mpeg, audio/webm, audio/ogg, audio/wav`,`audio/*` |
| `video`       | 表明是某种视频文件                                           | `video/webm`, `video/ogg`,`video/mp4`                        |
| `application` | 表明是某种二进制数据                                         | `application/octet-stream`, `application/pkcs12`, `application/vnd.mspowerpoint`, `application/xhtml+xml`, `application/xml`, `application/pdf`, `application/*`, `application/json`, `application/javascript `, `application/ecmascript` |

对于text文件类型若没有特定的subtype，就使用 `text/plain`。类似的，二进制文件没有特定或已知的 subtype，即使用 `application/octet-stream`。

历史原因，[MIME 嗅探标准](https://mimesniff.spec.whatwg.org/) 允许使用匹配以下任意的 MIME 类型服务 JavaScript：

- `application/javascript`
- `application/ecmascript`
- `application/x-ecmascript` 
- `application/x-javascript` 
- `text/javascript`
- `text/ecmascript`
- `text/javascript1.0` 
- `text/javascript1.1` 
- `text/javascript1.2` 
- `text/javascript1.3` 
- `text/javascript1.4` 
- `text/javascript1.5` 
- `text/jscript` 
- `text/livescript` 
- `text/x-ecmascript` 
- `text/x-javascript` 

注意：即便任何给定的 [user agent](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent) 可能支持这些中的任意或所有，你只应该使用 `text/javascript`。它是唯一确保能在目前和以后正常工作的 MIME 类型。

你可能发现某些内容在 `text/javascript` 媒体类型末尾有一个 `charset` 参数，指定用于表示代码内容的字符集。这不是合法的，而且在大多数场景下会导致脚本不被载入。

Multipart 类型：

```
multipart/form-data
multipart/byteranges
```

*Multipart* 类型表示细分领域的文件类型的种类，经常对应不同的 MIME 类型。这是*复合*文件的一种表现方式。`multipart/form-data` 可用于联系 [HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/Forms) 和 [`POST`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST) 方法，此外 `multipart/byteranges`使用状态码[`206`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/206) `Partial Content`来发送整个文件的子集，而HTTP对不能处理的复合文件使用特殊的方式：将信息直接传送给浏览器（这时可能会建立一个“另存为”窗口，但是却不知道如何去显示内联文件。）

MIME 嗅探：

在缺失 MIME 类型或客户端认为文件设置了错误的 MIME 类型时，浏览器可能会通过查看资源来进行MIME嗅探。每一个浏览器在不同的情况下会执行不同的操作。因为这个操作会有一些安全问题，有的 MIME 类型表示可执行内容而有些是不可执行内容。浏览器可以通过请求头来设置 [`X-Content-Type-Options`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Content-Type-Options) 以阻止MIME嗅探。

```
X-Content-Type-Options: nosniff
```

