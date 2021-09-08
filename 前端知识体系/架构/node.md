##### node 安装

1. `brew install node`
2. `nvm install 10.15.3`
3. 官网下载安装包

##### node 基础

js 在前端操作的对象是针对浏览器：

* DOM
* BOM
* XMLHttpRequest 网络通讯

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
// 读取环境变量
// Node.js 的 process 核心模块提供了 env 属性，该属性承载了在启动进程时设置的所有环境变量。
process.env.NODE_ENV

// 从命令行接收参数
// argv 属性是一个包含了所有命令行调用参数的数组。
// 第一个参数是 node 命令的完整路径。
// 第二个参数是正被执行的文件的完整路径。
// 所有其他的参数从第三个位置开始。
process.argv // [ '/Users/dxm/.nvm/versions/node/v8.17.0/bin/node','/Users/dxm/tool/前端知识体系/架构/练习.js' ]
process.argv0 // node
process.execArgv // []
process.execPath // /Users/dxm/.nvm/versions/node/v8.17.0/bin/node
// 可以使用 minimist 库来处理参数

// process.cwd() 
// 当前命令执行的路径，和linux pwd命令是一样的。
process.cwd();

// 输出到命令行
// 标准输入输出错误流。
process.stdin 
process.stdout 
process.stderr
// chalk 控制台打印着色，progress 控制台进度条
// 如何使 Node.js CLI 程序具有交互性：readline readline-sync inquirer
```

timer

```js
// nextTick早于另外两个，是在当前事件循环的最后执行
process.nextTick(() => {
	console.log('nextTick');
});
// 延迟 0 毫秒的 setTimeout() 回调与 setImmediate() 非常相似。 执行顺序取决于各种因素，但是它们都会在事件循环的下一个迭代中运行。
setImmediate(() => {
  console.log('setImmediate');
});
setTimeout(() => {
  console.log('setTimeout');
}, 0)
```

```js
// 利用setTimeout实现setInterval
function mySetInterval(fn, time) {
	function myFunction() {
    fn();
    setTimeout(myFunction, time);
  }
  return setTimeout(myFunction, time);
}
let timer = mySetInterval(() => console.log(666), 1000);
setTimeout(()=>{clearTimeout(timer)}, 3000);
```

fs

```js
// 文件描述符
// 在与位于文件系统中的文件进行交互之前，需要先获取文件的描述符。
fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
  //fd 是文件描述符。
});

// 文件属性
// stat 文件信息
fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }
 	stats.isFile() //true
  stats.isDirectory() //false
  stats.isSymbolicLink() //false
  stats.size //1024000 //= 1MB
})

// 文件读写
fs.readFile('./path.js', 'utf8',(err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.writeFile('./text', 'this is a text', 'utf8', (err) => {
  if (err) throw err;
  console.log('done!');
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

path

```js
// 从路径中获取信息
// 给定一个路径，可以使用以下方法从其中提取信息：
const notes = '/users/joe/notes.txt'
path.dirname(notes) // /users/joe
path.basename(notes) // notes.txt
path.extname(notes) // .txt
// 可以通过为 basename 指定第二个参数来获取不带扩展名的文件名：
path.basename(notes, path.extname(notes)) // notes

// 使用路径
// 规范化给定的 path，当包含诸如 .、.. 或双斜杠之类的相对说明符时，其会尝试计算实际的路径
// 解析和规范化都不会检查路径是否存在。 它只是根据获得的信息来计算路径。
path.normalize('/users/joe/..//test.txt') // '/users/test.txt'
// 可以使用 path.join() 连接路径的两个或多个片段
// 内部调用了normalize使不规范的路径更规范
const name = 'joe';
path.join('/', 'users', name, 'notes.txt'); // '/users/joe/notes.txt'
// 获得相对路径的绝对路径
path.resolve('joe.txt'); // '/Users/joe/joe.txt' 如果从主文件夹运行。
// 在此示例中，Node.js 只是简单地将 /joe.txt 附加到当前工作目录。 如果指定第二个文件夹参数，则 resolve 会使用第一个作为第二个的基础：
path.resolve('tmp', 'joe.txt') // '/Users/joe/tmp/joe.txt' 如果从主文件夹运行。
// 如果第一个参数以斜杠开头，则表示它就是绝对路径：
path.resolve('/etc', 'joe.txt') // '/etc/joe.txt'

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

http

requestListener 会自动添加到 'request' 事件，每次有请求时触发。

搭建 node 服务（2次）

```js
const axios = require('axios');
axios.post('http://nodejs.cn/todos', {
  todo: '做点事情'
});
```

```js
const http = require('http');
const server = http.createServer((req, res) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    JSON.parse(data).todo;
  });
	res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
});
const hostname = '127.0.0.1';
const port = 9527;
server.listen(port, host, () => {
	console.log(`serve is listening on ${hostname}:${port}`);
});
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

安装所有依赖

```bash
npm install
```

安装某个依赖

```bash
npm install <package-name>
```

安装旧依赖

```bash
npm install <package>@<version>
```

更新所有依赖

```bash
npm update
```

更新某个依赖

```bash
npm update <package-name>
```

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

删除依赖

```bash
npm uninstall <package-name>
# 如果使用 -S 或 --save 标志，则此操作还会移除 package.json 文件中的引用。
npm uninstall -S <package-name>
npm uninstall -D <package-name>
npm uninstall -g <package-name>
```

列出软件包所有的以前的版本。 可以使用 `npm view <package> versions`

查看软件包在 npm 仓库上最新的可用版本，则运行 `npm view [package_name] version`

查看系统上安装的全局软件包 `npm list -g --depth 0`

查看项目上安装的软件包 `npm list --depth=0`

当程序包提供了可从 shell（CLI）运行的可执行命令、且可在项目间复用时，则该程序包应被全局安装。其余情况都应该项目本地安装。

当投入生产环境时，需要设置 `--production` 标志（`npm install --production`），以避免安装开发依赖项。

运行任务：

package.json 文件支持一种用于指定命令行任务（可通过使用以下方式运行）的格式：

```bash
npm run <task-name>
```

```json
{
  "scripts": {
    "start-dev": "node lib/server-development",
    "start": "node lib/server-production"
  },
}
```

使用此特性运行 Webpack 是很常见的：

```json
{
  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js",
  },
}
```

`npm root -g` 命令会告知全局安装的 node_modules 在计算机上的确切位置。

npm 包是可执行文件时，本地安装它会把可执行文件放到 `node_modules/.bin/` 文件夹下。可以输入 `./node_modules/.bin/cowsay` 来运行它或者使用 `npx cowsay` 来运行，npx 会找到程序包的位置。

全局安装的可执行命令是放在 /usr/local/bin 下，使用 nvm 的话是在 /Users/dxm/.nvm/versions/node/v8.17.0/bin/ 目录下。

全局的包是放在 /usr/local/lib/node_modules，使用 nvm /Users/dxm/.nvm/versions/node/v8.17.0/lib/node_modules

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

