##### node 安装

当安装 Node.js 之后，就可以在命令行中访问 `node` 可执行程序。

1. `brew install node`
2. `nvm install 10.15.3`
3. 官网下载安装包

##### npm

安装

当程序包提供了可从 shell（CLI）运行的可执行命令、且可在项目间复用时，则该程序包应被全局安装。其余情况都应该项目本地安装。

```bash
# 安装所有依赖
npm install
# 安装某个依赖
npm install <package-name>
# 安装旧依赖
npm install <package>@<version>

# 删除某个依赖
npm uninstall <package-name>
# 如果使用 -S 或 --save 标志，则此操作还会移除 package.json 文件中的引用。
npm uninstall -S <package-name>
npm uninstall -D <package-name>
npm uninstall -g <package-name>

# 重装某个依赖
npm uninstall ant-design-vue
npm install ant-design-vue@1.4.11
# 重装所有依赖
rm -rf node_modules && npm cache clean --force && npm install

# 发觉软件包的新版本
npm outdated

# 更新所有依赖，update永远不会更新主版本
npm update
# 更新某个依赖
npm update <package-name>

# 将所有软件包更新到新的主版本，则全局安装 npm-check-updates 软件包
npm install -g npm-check-updates
# 然后运行
ncu -u
# 这会升级 package.json 文件的 dependencies 和 devDependencies 中的所有版本，以便 npm 可以安装新的主版本。
# 再运行更新
npm update

# 当投入生产环境时，需要设置 --production 标志，以避免安装开发依赖项。
npm install --production
```

查看安装的 npm 软件包版本 

```bash
# 查看所有已安装的 npm 软件包（包括它们的依赖包）的版本
npm list
npm list -g
# 仅获取顶层的软件包（基本上就是告诉 npm 要安装并在 package.json 中列出的软件包）
npm list --depth=0
npm list -g --depth=0
npm list -g --depth 0
# 通过指定名称来获取特定软件包的版本, 也适用于安装的软件包的依赖
npm list cowsay
# 查看软件包在 npm 仓库上最新的可用版本
npm view [package_name] version
# 列出软件包所有的以前的版本
npm view <package> versions
```

全局 node_modules 位置

`npm root -g` 命令会告知全局安装的 node_modules 在计算机上的确切位置。在 macOS 或 Linux 上，此位置可能是 `/usr/local/lib/node_modules`。 在 Windows 上，可能是 `C:\Users\YOU\AppData\Roaming\npm\node_modules`。使用 `nvm`，则软件包的位置可能为 `/Users/joe/.nvm/versions/node/v8.9.0/lib/node_modules`。

npm 包是可执行文件时

```bash
# 全局安装的可执行命令是放在 /usr/local/bin 下，使用 nvm 的话是在 /Users/Joe/.nvm/versions/node/v8.17.0/bin/ 目录下。直接使用命令运行。

# 本地安装它会把可执行文件放到 node_modules/.bin/ 文件夹下。可以输入来运行它 
./node_modules/.bin/cowsay 
# 或者使用 npx 来运行，npx 会找到程序包的位置。
npx cowsay 
```

##### node 基础

浏览器和 Node.js 均使用 JavaScript 作为其编程语言。区别是：

* API 不同，没有浏览器提供的 `document`、`window`、以及所有其他的对象。浏览器中，不存在 Node.js 通过其模块提供的所有不错的 API，例如文件系统访问功能。
* 在 Node.js 中，可以控制运行环境的版本。这意味着可以编写 Node.js 版本支持的所有现代的 ES6-7-8-9 JavaScript。
* 模块系统的不同。Node.js 使用 CommonJS 模块系统，而在浏览器中，则还正在实现 ES 模块标准。

当 Node.js 执行 I/O 操作时（例如从网络读取、访问数据库或文件系统），Node.js 会在响应返回时恢复操作，而不是阻塞线程并浪费 CPU 循环等待。

##### global（全局对象）

* CommonJS
* Buffer、process、console
* timer

##### timer

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

##### process

1.从 nodejs 程序退出

```js
// 当 Node.js 运行此行代码时，进程会被立即强制终止。
// 这意味着任何待处理的回调、仍在发送中的任何网络请求、任何文件系统访问、或正在写入 stdout 或 stderr 的进程，所有这些都会被立即非正常地终止。
process.exit();
// 可以传入一个整数，向操作系统发送退出码
// 默认情况下，退出码为 0，表示成功。 不同的退出码具有不同的含义，可以在系统中用于程序与其他程序的通信。
process.exit(1);
// 也可以设置 process.exitCode 属性：
// 当进程完成所有处理后，程序会正常地退出，Node.js 会返回该退出码
process.exitCode = 1;
// SIGTERM 是告诉进程要正常终止的信号。它是从进程管理者（如 upstart 或 supervisord）等发出的信号。
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('进程已终止');
  });
});
// 可以从程序内部另一个函数中、另一个正在运行的 Node.js 程序、或从系统中运行的其他任何的应用程序（能知道要终止的进程的 PID）。发送此信号
process.kill(process.pid, 'SIGTERM')
```

2.读取环境变量

```js
// Node.js 的 process 核心模块提供了 env 属性，该属性承载了在启动进程时设置的所有环境变量。
// 这是访问 NODE_ENV 环境变量的示例，该环境变量默认情况下被设置为 development。
// 在脚本运行之前将其设置为 "production"，则可告诉 Node.js 这是生产环境。
process.env.NODE_ENV
```

3.从命令行接收参数

当使用以下命令调用 Node.js 应用程序时，可以传入任意数量的参数：

```bash
node app.js
```

参数可以是独立的，也可以具有键和值。这会改变在 Node.js 代码中获取参数值的方式。

```bash
node app.js joe
# 或
node app.js name=joe
```

获取参数值的方法是使用 Node.js 中内置的 `process` 对象。它公开了 `argv` 属性。

```js
// argv 属性是一个包含了所有命令行调用参数的数组。
// 第一个参数是 node 命令的完整路径。
// 第二个参数是正被执行的文件的完整路径。
// 所有其他的参数从第三个位置开始。
process.argv // [ '/Users/Joe/.nvm/versions/node/v8.17.0/bin/node', '/Users/Joe/tool/架构/lianxi/app.js' ]
process.argv0 // node
process.execPath // /Users/Joe/.nvm/versions/node/v8.17.0/bin/node

// 可以通过创建一个排除了前两个参数的新数组来仅获取其他的参数：
const args = process.argv.slice(2)
// node app.js joe
args[0]; // joe
// node app.js name=joe
args[0]; // name=joe
```

使用 minimist 库来处理参数

```js
// 但是需要在每个参数名称之前使用双破折号 node app.js --name=joe
const args = require('minimist')(process.argv.slice(2))
args['name'] // joe
```

4.当前命令执行的路径，和 linux pwd 命令是一样的。

```js
process.cwd();
```

5.输出到命令行

```js
// 标准输入输出错误流。
process.stdin 
process.stdout 
process.stderr

// 为输出着色
const chalk = require('chalk')
console.log(chalk.yellow('你好'))

// 控制台进度条
// 创建一个 10 步的进度条，每 100 毫秒完成一步
const ProgressBar = require('progress')
const bar = new ProgressBar(':bar', { total: 10 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100)

// 使 Node.js CLI 程序具有交互性
// readline readline-sync inquirer
```

##### path

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
// 解析和规范化都不会检查路径是否存在。它只是根据获得的信息来计算路径。

// 规范化给定的 path，当包含诸如 .、.. 或双斜杠之类的相对说明符时，会尝试计算实际的路径。
path.normalize('/users/joe/..//test.txt') // '/users/test.txt'
// 可以使用 path.join() 连接路径的两个或多个片段
// 内部调用了normalize使不规范的路径更规范
const name = 'joe';
path.join('/', 'users', name, 'notes.txt'); // '/users/joe/notes.txt'
// 获得相对路径的绝对路径（执行node命令所在的文件夹的绝对路径 + 传入的参数）
path.resolve('joe.txt'); // '/Users/joe/joe.txt' 
// 如果指定第二个文件夹参数，则 resolve 会使用第一个作为第二个的基础
path.resolve('tmp', 'joe.txt') // '/Users/joe/tmp/joe.txt'
// 如果第一个参数以斜杠开头，则表示它就是绝对路径
path.resolve('/etc', 'joe.txt') // '/etc/joe.txt'
// 接受 2 个路径作为参数。 基于当前工作目录，返回从第一个路径到第二个路径的相对路径。
path.relative('/Users/joe', '/Users/joe/test.txt') //'test.txt'
path.relative('/Users/joe', '/Users/joe/something/test.txt') //'something/test.txt'
// path.parse() 将路径解析成对象。
path.parse('/home/user/dir/file.txt');
// 返回:
// { 
//   root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }
// path.format() 将对象解析成路径字符串。与 path.parse() 相反。
// 如果提供 dir，则忽略 root
// 如果提供 base，则忽略 ext 和 name
path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt'
});
// 返回: '/home/user/dir/file.txt'

// 判断是否是绝对路径
path.isAbsolute('/test/something') // true
path.isAbsolute('./test/something') // false

// 各种绝对路径的区别
// __dirname __filename 总是返回文件的绝对路径
// process.cwd() 执行node命令所在的文件夹的绝对路径
// path.resolve('./') 执行node命令所在的文件夹的绝对路径
```

##### fs

文件

```js
// 文件描述符
// 在与位于文件系统中的文件进行交互之前，需要先获取文件的描述符。
// fs.open() 调用的第二个参数：
// r+ 打开文件用于读写。
// w+ 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
// a 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
// a+ 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。
fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
  // fd 是文件描述符。
});

// 文件属性
// 每个文件都带有一组详细信息，可以使用 fs.stat() 方法查看。
fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }
 	stats.isFile() //true
  stats.isDirectory() //false
  stats.isSymbolicLink() //false
  stats.size //1024000字节 //= 1MB
});

// 读取文件
// fs.readFile() 和 fs.readFileSync() 都会在返回数据之前将文件的全部内容读取到内存中。这意味着大文件会对内存的消耗和程序执行的速度产生重大的影响。在这种情况下，更好的选择是使用流来读取文件的内容。
fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
// 同步版本
try {
	const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');
  console.log(data);
} catch(err) {
	console.error(err);
}

// 写入文件
// 所有这些方法都是在将全部内容写入文件之后才会将控制权返回给程序（在异步的版本中，这意味着执行回调）。在这种情况下，更好的选择是使用流写入文件的内容。
const content = 'this is a text';
fs.writeFile('/Users/joe/test.txt', content, 'utf8', (err) => {
  if (err) throw err; // 阻止程序运行，把错误消息打印到控制台
  console.log('写入文件成功！');
});
// 同步版本
try {
  fs.writeFileSync('/Users/joe/test.txt', content, 'utf8');
  console.log('写入文件成功！');
} catch(err) {
  console.error(err);
}
// 默认情况下，上面两个 API 会替换文件的内容（如果文件已经存在）。
// 可以通过指定标志来修改默认的行为：
fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {})
// 可能会使用的标志有：
// r+ 打开文件用于读写。
// w+ 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
// a 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
// a+ 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。
// 将内容追加到文件末尾的便捷方法
fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //完成！
})

// 创建可读的文件流。跟readFile是很像的，但是比readFile实现的更加优雅
const rs = fs.createReadStream('./test.js');
rs.pipe(process.stdout);

// 创建可写的文件流
const ws = fs.createWriteStream('./src/test.txt');
ws.write('hahahaha!');
ws.end();
ws.on('finish', () => {
  console.log('done!');
});

// 删除文件
fs.unlink('./text.txt', err => {
  if (err) throw err;
});
```

文件夹

```js
// 检查文件夹是否存在
// 使用 fs.access() 检查文件夹是否存在以及 Node.js 是否具有访问权限。
fs.access();

// 创建新的文件夹
// 使用 fs.mkdir() 或 fs.mkdirSync() 可以创建新的文件夹。
const folderName = '/Users/joe/test';
try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
} catch (err) {
  console.error(err)
}

// 读取目录内容
// 使用 fs.readdir() 或 fs.readdirSync() 可以读取目录的内容。
// 这段代码会读取文件夹的内容（全部的文件和子文件夹），并返回它们的相对路径：
const folderPath = '/Users/joe';
fs.readdirSync(folderPath);
// 可以获取完整的路径
fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName)
})
// 也可以过滤结果以仅返回文件（排除文件夹）：
const isFile = fileName => {
  return fs.lstatSync(fileName).isFile()
}
fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName)
})
.filter(isFile);

// 重命名文件夹
// 使用 fs.rename() 或 fs.renameSync() 可以重命名文件夹。 第一个参数是当前的路径，第二个参数是新的路径：
fs.rename('/Users/joe', '/Users/roger', err => {
  if (err) throw err;
  console.log('done!')
});
// 同步版本
try {
  fs.renameSync('/Users/joe', '/Users/roger')
} catch (err) {
  console.error(err)
}

// 删除文件夹
// 使用 fs.rmdir() 或 fs.rmdirSync() 可以删除文件夹。只能删除空文件夹
// 删除包含内容的文件夹可能会更复杂。
// 在这种情况下，最好安装 fs-extra 模块，该模块非常受欢迎且维护良好。 它是 fs 模块的直接替代品，在其之上提供了更多的功能。
// npm install fs-extra
const fs = require('fs-extra');
const folder = '/Users/joe';
fs.remove(folder, err => {
  console.error(err);
})
// 使用 promise
fs.remove(folder)
  .then(() => {
    //完成
  })
  .catch(err => {
    console.error(err)
  })
// 使用 async/await
async function removeFolder(folder) {
  try {
    await fs.remove(folder)
    //完成
  } catch (err) {
    console.error(err)
  }
}
const folder = '/Users/joe'
removeFolder(folder)
```

##### http

`http` 的 `createServer()` 方法会创建新的 HTTP 服务器并返回它，传入一个回调函数 requestListener。

requestListener 会自动添加到 'request' 事件，每当接收到新的请求时，[`request` 事件](http://nodejs.cn/api/http.html#http_event_request)会被调用，并提供两个对象：一个请求（[`http.IncomingMessage`](http://nodejs.cn/api/http.html#http_class_http_incomingmessage) 对象）和一个响应（[`http.ServerResponse`](http://nodejs.cn/api/http.html#http_class_http_serverresponse) 对象）。

这两个对象对于处理 HTTP 调用至关重要。

`request` 提供了请求的详细信息。 通过它可以访问请求头和请求数据。

`response` 构造要返回的数据给客户端。

搭建 node 服务（4次）

```js
const http = require('http');
const server = http.createServer((req, res) => {
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

属性

```js
// http.METHODS
// 此属性列出了所有支持的 HTTP 方法：

// http.STATUS_CODES
// 此属性列出了所有的 HTTP 状态代码及其描述

// http.globalAgent
// 指向 Agent 对象的全局实例，该实例是 http.Agent 类的实例。
```

方法

```js
// http.createServer()
// 返回 http.Server 类的新实例。
const server = http.createServer((req, res) => {
	// 使用此回调处理每个单独请求
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    data: 'hello world!'
  }));
});
server.listen(8000);

// http.request()
// 发送 HTTP 请求到服务器，并创建 http.ClientRequest 类的实例。

// http.get()
// 类似于 http.request()，但会自动地设置 HTTP 方法为 GET，并自动地调用 req.end()。
```

类

```js
// http.Agent
// Node.js 会创建 http.Agent 类的全局实例，以管理 HTTP 客户端连接的持久性和复用，这是 Node.js HTTP 网络的关键组成部分。

// http.ClientRequest
// 当 http.request() 或 http.get() 被调用时，会创建 http.ClientRequest 对象。
// 当响应被接收时，则会使用响应（http.IncomingMessage 实例作为参数）来调用 response 事件。

// http.Server
// 当使用 http.createServer() 创建新的服务器时，通常会实例化并返回此类。

// http.ServerResponse
// 由 http.Server 创建，此对象由 HTTP 服务器内部创建，而不是由用户创建。 它作为第二个参数传给 'request' 事件。

// http.IncomingMessage
// IncomingMessage 对象由 http.Server 或 http.ClientRequest 创建，并分别作为第一个参数传给 'request' 和 'response' 事件。 它可用于访问响应状态、标头和数据。

// http.OutgoingMessage
// 该类作为 http.ClientRequest 和 http.ServerResponse 的父类。 从 HTTP 事务的参与者的角度来看，它是对传出消息的抽象。
```

##### buffer

Buffer 是内存区域。

它表示在 V8 JavaScript 引擎外部分配的固定大小的内存块（无法调整大小）。

可以将 buffer 视为整数数组，每个整数代表一个数据字节。

Buffer 被引入用以帮助开发者处理二进制数据，在此生态系统中传统上只处理字符串而不是二进制数据。

Buffer 与流紧密相连。 当流处理器接收数据的速度快于其消化的速度时，则会将数据放入 buffer 中。

##### stream

在传统的方式中，当告诉程序读取文件时，这会将文件从头到尾读入内存，然后进行处理。使用流，则可以逐个片段地读取并处理（而无需全部保存在内存中）。

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

##### todo

1. 模块化
2. npm 命令是否就是 node 可执行文件的名字
3. 事件循环
4. 使用setTimeout制作setInterval
5. promise 原理，async/await 原理
6. 观察者模式事件系统
7. 错误处理
