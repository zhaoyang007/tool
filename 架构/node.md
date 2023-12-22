# node

## 概念

node采用一个长期运行的进程，是单线程的。

优先错误处理，由于node应用依托在一个拥有大量共享状态的大进程中，如果某个回调函数发生了错误，整个进程都会崩溃。

使用v8，可以让执行js的速度非常快。

非阻塞IO：使用事件轮询事项实现异步，node使用回调和事件机制来实现并发。

模块系统：require exports module.exports

事件机制

中间件：就是函数，用于流程控制，使代码清晰和提高复用性。

## 技巧

1.命令行中打印对象深层属性内容

```js
const util = require('util');
const object = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
      f: {
        g: 4
      }
    }
  }
};
const fullObjectString = util.inspect(object, { showHidden: false, depth: null, colors: true });
console.log(fullObjectString);
```

2.使用管道命令与分页工具查看控制台中过长的打印内容 |less

## node 安装

当安装 Node.js 之后，就可以在命令行中访问 `node` 可执行程序。

1. `brew install node`
2. `nvm install 10.15.3`
3. 官网下载安装包

可以使用 `n` 模块进行node版本切换

- 全局安装 n  `npm install -g n`
- 查看服务器上可用的版本 `n ls-remote --all`
- 安装最新版node  `n latest`
- 安装某个具体版本  `n 16.18.0`
- 查看已经安装过的node版本  `n ls`
- 删除14.13.1版本 `n rm 14.13.1`

## 核心API

##### process

```js
// 程序退出
// 当 Node.js 运行此行代码时，进程会被立即强制终止。任何待处理的回调、仍在发送中的任何网络请求、任何文件系统访问、或正在写入 stdout 或 stderr 的进程，所有这些都会被立即非正常地终止。
process.exit(1);

// 当前命令执行的路径，和 linux pwd 命令是一样的。
process.cwd(); 

// 环境变量
// Node.js 的 process 核心模块提供了 env 属性，该属性承载了在启动进程时设置的所有环境变量。默认情况下被设置为 development。
process.env.NODE_ENV

// 从命令行接收参数
// argv 属性是一个包含了所有命令行调用参数的数组。
// 第一个参数是 node 命令的完整路径。
// 第二个参数是正被执行的文件的完整路径。
// 所有其他的参数从第三个位置开始。
process.argv // [ '/Users/Joe/.nvm/versions/node/v8.17.0/bin/node', '/Users/Joe/tool/架构/lianxi/app.js' ]
// 可以通过创建一个排除了前两个参数的新数组来仅获取其他的参数：
const args = process.argv.slice(2);
// node app.js joe
args[0]; // joe
// node app.js name=joe
args[0]; // name=joe
// 使用 minimist 库来处理参数
// 但是需要在每个参数名称之前使用双破折号 node app.js --name=joe
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
args['name'] // joe
```

##### child_process

**需要创建子进程的场景**：

1. **执行外部程序**：当需要从 Node.js 应用中运行外部程序或命令时（如 shell 命令）。
2. **CPU 密集型任务**：对于 CPU 密集型任务，如图像处理或大数据计算，使用子进程可以避免阻塞事件循环。
3. **并行处理**：当需要同时执行多个任务而不影响主应用程序的性能时。
4. **资源隔离**：创建子进程可为特定任务提供独立的运行环境和资源，从而提高安全性和稳定性。
5. **简化复杂任务**：将复杂的任务分解到不同的子进程中，可以简化代码管理和错误处理。

通过合理使用子进程，可以提高应用程序的性能和响应能力。

**创建子进程的方法**：

`child_process.spawn(command[, args][, options])` 创建子进程

* command：要运行的命令
* args：字符串参数列表
* options

`child_process.exec()` 衍生 shell 并在该 shell 中运行命令，完成后将 `stdout` 和 `stderr` 传给回调函数。

* command：要运行的命令，参数以空格分隔
* options
* callback：参数error, stdout, stderr

`child_process.execFile()`与 `child_process.exec()` 类似，不同之处在于，默认情况下，它直接衍生命令，而不先衍生 shell。

`child_process.fork()`衍生新的 Node.js 进程并使用建立的 IPC 通信通道（其允许在父子进程之间发送消息）调用指定的模块。

##### 模块系统

**nodejs模块查找策略：**

1. 文件作为模块：
   * 核心模块
   * 从 `node_modules` 中加载模块（https://www.nodejs.com.cn/api/packages.html）
     * 首先检查模块的 `package.json` 文件中，`exports`、`module` 或 `main`字段指定的入口点文件。书写顺序即优先级。
     * 如果 `package.json` 中没有指定或不存在，则默认查找模块根目录下的 `index.js` 文件。
   * 绝对路径
   * 相对路径
2. 目录作为模块：查找目录中的package.json中的main字段，如果没有就加在目录中的index文件。

**cjs和esm的区别：**

1. CommonJS (CJS):
   - 使用场景：主要用于 Node.js。
   - 导入导出：使用 `require()` 导入模块，`module.exports` 导出。
   - 特点：
     1. 基于运行时的加载方式所以不支持静态分析和树摇。
     2. CJS设计成同步的，主要是因为它最初是为服务器端环境（如 Node.js）开发的，其中模块通常在程序启动时一次性加载。在这种环境下，同步加载简化了模块管理，因为它保证了代码在执行任何操作之前模块就已经完全加载和可用。这种设计减少了编程复杂性，并确保了代码的执行顺序和模块依赖的清晰性。同步模式在服务器端应用中通常是可接受的，因为所有资源通常都是本地可用的，所以不会引起显著的性能问题。
   - 优点：简单易用，适用于服务器端。
   - 缺点：同步加载模块，可能影响性能。
2. ECMAScript Modules (ESM):
   - 使用场景：既可用于浏览器也可用于 Node.js。
   - 导入导出：使用 `import` 和 `export` 语句。
   - 特点：
     1. 基于编译时的加载方式。这意味着模块的导入和导出在代码编译阶段就已经确定，而不是在运行时。这种静态结构使得编译器和打包工具可以在代码执行之前分析模块依赖关系，从而实现优化，如树摇（tree-shaking）和代码拆分
     2. 这也使得 ESM 能够支持异步加载模块，提高了模块管理的灵活性和效率。
   - 优点：支持静态分析和树摇（tree-shaking），异步加载。
   - 缺点：语法较为严格，兼容性问题。

##### path

```js
// 从路径中获取信息
// 给定一个路径，可以使用以下方法从其中提取信息：
const notes = '/users/joe/notes.txt'
path.dirname(notes) // /users/joe
path.basename(notes) // notes.txt
path.extname(notes) // .txt
// 可以为 basename 指定第二个参数来获取不带扩展名的文件名：
path.basename(notes, path.extname(notes)) // notes

// 使用路径
// 解析和规范化都不会检查路径是否存在。它只是根据获得的信息来计算路径。
// 规范化给定的 path，当包含诸如 .、.. 或双斜杠之类的相对说明符时，会尝试计算实际的路径。
path.normalize('/users/joe/..//test.txt') // '/users/test.txt'
// 可以使用 path.join() 连接路径的两个或多个片段，内部调用了normalize使不规范的路径更规范
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
// 将路径解析成对象。
path.parse('/home/user/dir/file.txt');
// 返回:
// { 
//   root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }
// 将对象解析成路径字符串。与 path.parse() 相反。
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
// process.cwd() path.resolve('./') 返回执行node命令所在的文件夹的绝对路径
```

##### fs

文件系统

```js
// 文件属性
// 每个文件都带有一组详细信息，可以使用 fs.stat() 方法查看。
fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
 	stats.isFile(); //true
  stats.isDirectory(); //false
  stats.size; //1024000字节 //= 1MB
});
try {
    const stats = fs.statSync("a.txt");
    console.log(stats.isFile());
    console.log(stats.isDirectory());
    console.log(stats.size);
} catch(err) {
    console.error(err);
}

// 读取文件
// fs.readFile() 会将文件的全部内容读取到内存中再返回数据。这意味着大文件会对内存的消耗和程序执行的速度产生重大的影响。更好的选择是使用流来读取文件的内容。
fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
try {
	const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');
  console.log(data);
} catch(err) {
	console.error(err);
}

// 写入文件
// 将全部内容写入文件之后才会将控制权返回给程序。更好的选择是使用流写入文件的内容。
const content = 'this is a text';
fs.writeFile('/Users/joe/test.txt', content, 'utf8', err => {
  if (err) throw err; // 阻止程序运行，把错误消息打印到控制台
  console.log('写入文件成功！');
});
try {
  fs.writeFileSync('/Users/joe/test.txt', content, 'utf8');
  console.log('写入文件成功！');
} catch(err) {
  console.error(err);
}
fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('写入文件成功！');
});
try {
    fs.appendFileSync('file.log', content, 'utf8')
    console.log('写入文件成功！');
} catch(err) {
    console.error(err);
}

// 创建可读的文件流。
const rs = fs.createReadStream('./test.js');
rs.pipe(process.stdout);
// 创建可写的文件流
const ws = fs.createWriteStream('./src/test.txt');
ws.write('aaa');
ws.write('bbb');
ws.end();
```

文件夹

```js
// 创建文件夹
fs.mkdir('/Users/joe/test', err => {
    if (err) throw err;
    console.log('done');
})
try {
  if (!fs.existsSync('/Users/joe/test')) {
    fs.mkdirSync('/Users/joe/test');
    console.log('done');
  }
} catch (err) {
  console.error(err)
}

// 读取目录内容
// 会读取文件夹的内容，返回全部的文件和子文件夹的相对路径
fs.readdir('src', (err, files) => {
  if (err) throw err;
  console.log(files);
});
try {
  const files = fs.readdirSync('src');
  console.log(files);
} catch(err) {
	console.error(err);
}
```

##### http

`http.OutgoingMessage`

- 继承自: <Stream> 可写流

该类作为 http.ClientRequest 和 http.ServerResponse 的父类。 从 HTTP 事务的参与者的角度来看，它是对传出消息的抽象。

`http.ClientRequest`

- 继承自: <Stream> 可写流

此对象从 http.request() 内部创建并返回。 它表示正在进行的请求。

当响应被接收时，则会使用响应 http.IncomingMessage 实例作为参数来调用 response 事件。

`http.ServerResponse`

* 继承自: <Stream> 可写流

此对象由 HTTP 服务器内部 http.Server 创建，而不是由用户创建。 并作为第二个参数传给 'request' 事件。

```js
response.setHeader('Content-Type', 'text/html');
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
response.getHeader('content-type'); // 'text/html'
response.getHeader('set-cookie'); // ['type=ninja', 'language=javascript']
response.getHeaderNames(); // ['Content-Type', 'set-cookie']
response.getHeaders(); // { 'content-type': 'text/html', 'set-cookie': ['type=ninja', 'language=javascript'] }
response.hasHeader('Content-Type') // true
response.removeHeader('Content-Type');

response.statusCode = 404;
response.statusMessage = 'Not found';

response.writeHead(statusCode[,statusMessage][,headers]);
response.write(chunk[,encoding][,callback]);
response.end([data[,encoding]][,callback]);
```

`http.IncomingMessage`

* 继承自: <stream.Readable>

IncomingMessage 对象由 http.Server 或 http.ClientRequest 创建，并分别作为第一个参数传给 'request' 和 'response' 事件。 

```js
request.url // 仅适用于从 http.Server 获得的请求。（获取请求信息）
request.method // 仅适用于从 http.Server 获得的请求。（获取请求信息）
request.headers // http.Server 获得的是请求头，http.ClientRequest 获得的是响应头
request.statusCode // 仅对从 http.ClientRequest 获得的响应有效。（获取响应信息）
request.statusMessage // 仅对从 http.ClientRequest 获得的响应有效。（获取响应信息）

request.setEncoding(encoding) // 为读取的数据设置字符编码。默认情况下，没有分配编码，流数据将作为 Buffer 对象返回。设置编码会返回字符串。

request.on('data', chunk => {
  console.log(chunk);
});
request.on('end', () => {
  console.log('没有更多数据了');
});
```

`http.createServer([options][, requestListener])`

创建 http 服务器并返回。requestListener 会自动添加到 'request' 事件，每当接收到新的请求时，'request' 事件会被调用。

```js
const http = require('http');
const url = require('url');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  const { method } = req;
  let params;
  if (method === 'GET') {
    // 获取 get 请求数据
    params = url.parse(req.url, true).query;
    console.log(params);
  } else if (method === 'POST') {
    // 获取 post 请求数据
    req.setEncoding('utf8');
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      const contentType = req.headers['content-type'];
      if (contentType === 'application/x-www-form-urlencoded') {
        params = qs.parse(data);
      } else if (contentType === 'application/json') {
        params = JSON.parse(data);
      }
      console.log(params);
    });
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write('hello world');
  res.end();
});

const hostname = '127.0.0.1';
const port = 8000;
server.listen(port, hostname, () => {
  console.log(`server is listening at ${hostname}:${port}`);
});
```

`http.request(options[, callback])`

`http.request(url[, options][, callback])`

- url <string> | <URL>
- options <Object>
  - hostname <string> host 的别名。 为了支持 url.parse()，如果同时指定了 host 和 hostname，则将使用 hostname。
  - port <number> 远程服务器的端口。 默认值: 如果有设置则为 defaultPort，否则为 80。
  - path <string> 请求的路径。 应包括查询字符串（如果有）。 例如 '/index.html?page=12'。 当请求路径包含非法字符时抛出异常。 目前，只有空格被拒绝，但将来可能会改变。默认值: '/'。
  - method <string> 指定 HTTP 请求方法的字符串。默认值: 'GET'。
  - headers <Object> 包含请求头的对象。
- callback <Function>
- 返回 <http.ClientRequest> 可写流

发送 HTTP 请求到服务器，创建 http.ClientRequest 类的实例并返回，http.ClientRequest 的实例是可写流。如果需要使用 POST 请求上传文件，则写入 ClientRequest 对象。

url 可以是字符串或 URL 对象。 如果 url 是字符串，则会自动使用 new URL() 解析。 如果是 URL 对象，则会自动转换为普通的 options 对象。如果同时指定了 url 和 options，则合并对象，options 属性优先。

callback 参数将被添加为 'response' 事件的单次监听器。

如果在请求期间遇到任何错误（无论是 DNS 解析、TCP 级别错误还是实际的 HTTP 解析错误），都会在返回的请求对象上触发 'error' 事件。 与所有 'error' 事件一样，如果没有注册监听器，则会抛出错误。

```js
const http = require('http');

const postData = JSON.stringify({
  msg: 'request data'
});
const options = {
  hostname: '127.0.0.1',
  port: 8000,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};
const request = http.request(options, res => {
  const statusCode = res.statusCode;
  const contentType = res.headers['content-type'];
  let error;
  if (statusCode !== 200) {
    error = new Error(`request failed. status code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error(`invalid content-type. expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // 消费响应数据以释放内存
    res.resume();
    return;
  }
  res.setEncoding('utf8');
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
});
request.on('error', err => {
  console.error(err);
});
// 将请求数据写入请求正文
request.write(postData);
request.end();
```

`http.get(options[, callback])`

`http.get(url[, options][, callback])`

由于大多数请求是没有正文的 GET 请求，因此 Node.js 提供了这个便捷的方法。 此方法与 http.request() 的唯一区别在于，它将方法设置为 GET 并自动调用 req.end()。

##### buffer

Buffer 是一块固定大小的内存区域。

可以将 buffer 视为整数数组，每个整数代表一个数据字节。

Buffer 被引入用以帮助开发者处理二进制数据，可以对数据进行编码转换，在此生态系统中传统上只处理字符串而不是二进制数据。

Buffer 与流紧密相连。 当流处理器接收数据的速度快于其消化的速度时，则会将数据放入 buffer 中。

**js中处理二进制数据的api**

`ArrayBuffer`、类型化数组（Typed Arrays）和`Blob`是 JavaScript 中用于处理二进制数据的不同结构，它们各有特点和用途：

ArrayBuffer

- **定义**: `ArrayBuffer` 是一种通用的、固定长度的原始二进制数据缓冲区。
- **特点**: 你不能直接操作 `ArrayBuffer` 的内容。它提供了一个原始的二进制数据缓冲区，可以通过类型化数组或 `DataView` 对其进行读写。
- **用途**: 通常用作存储二进制数据的底层结构，如文件读取、网络通信等。

类型化数组 (Typed Arrays)

- **定义**: 类型化数组是 `ArrayBuffer` 的视图，它们提供了对 `ArrayBuffer` 的结构化访问。例如，`Uint8Array`、`Int16Array`、`Float32Array` 等。
- **特点**: 每种类型化数组固定了元素的数据类型和大小，使得对特定格式的二进制数据的读写变得容易。
- **用途**: 用于需要按特定格式处理二进制数据的场景，如图像处理、音频处理、或者其他需要操作具体二进制数据的应用。

Blob

- **定义**: `Blob`（Binary Large Object）代表了不可变的二进制数据块。
- **特点**: 通常用来处理大型的文件数据，如图片、声音、视频等。
- **用途**: 常用于文件操作，如读取用户上传的文件、在客户端生成并下载文件等。`Blob` 也经常在 Web API 中用于数据传输。

总结

- **`ArrayBuffer`** 是原始的二进制数据缓冲区。
- **类型化数组** 提供了对 `ArrayBuffer` 内容的结构化访问。
- **`Blob`** 用于表示大型的二进制数据，常用于文件操作。

它们共同构成了 JavaScript 处理二进制数据的生态系统，每种结构都有其特定的用途和应用场景。

##### stream

在传统的方式中，当告诉程序读取文件时，这会将文件从头到尾读入内存，然后进行处理。使用流，则可以逐个片段地读取并处理（而无需全部保存在内存中）。

当持续不断地对数据进行读写时，流就出现了。

# npm

## npm基础使用

安装

当要安装的程序包提供了可执行命令且可在项目间复用时，则应全局安装。其余情况都应该在项目本地安装。

```bash
# 安装所有依赖
npm install
# 只安装生产环境依赖
npm install --production
# 安装某个依赖	
npm install <package-name>
# 安装旧依赖
npm install <package-name>@<version>

# 删除某个依赖
npm uninstall <package-name>
# 如果使用 -S 或 --save 标志，则此操作还会移除 package.json 文件中的引用。
npm uninstall -S <package-name>
npm uninstall -D <package-name>
npm uninstall -g <package-name>
# 删除所有依赖
rm -rf node_modules && npm cache clean --force

# 重装：先删除再安装

# 发觉软件包的新版本
npm outdated

# 更新某个依赖
npm update <package-name>
# 更新所有依赖，update永远不会更新主版本
npm update

# 将所有软件包更新到新的主版本，则全局安装 npm-check-updates 软件包
npm install -g npm-check-updates
# 然后运行
ncu -u
# 这会升级 package.json 文件的 dependencies 和 devDependencies 中的所有版本，以便 npm 可以安装新的主版本。
# 再运行更新
npm update
```

查看安装的 npm 软件包版本 

```bash
# 查看某个软件包版本
npm list <package-name>
# 查看所有已安装的 npm 软件包（包括它们的依赖包）的版本
npm list
npm list -g
# 仅获取顶层的软件包（基本上就是告诉 npm 要安装并在 package.json 中列出的软件包）
npm list --depth=0
npm list --depth 0
npm list -g --depth=0
npm list -g --depth 0

# 查看软件包在 npm 仓库上最新的可用版本
npm view <package-name> version
# 列出软件包所有的以前的版本
npm view <package-name> versions
```

全局 node_modules 位置

`npm root -g` 命令会告知全局安装的 node_modules 在计算机上的确切位置。

* 在 macOS 或 Linux 上，此位置可能是 `/usr/local/lib/node_modules`。 
* 在 Windows 上，可能是 `C:\Users\YOU\AppData\Roaming\npm\node_modules`。
* 使用 `nvm`，则软件包的位置可能为 `/Users/joe/.nvm/versions/node/v8.9.0/lib/node_modules`。

npm 包是可执行文件时

全局安装的可执行命令是放在 `/usr/local/bin` 目录下，使用 `nvm` 的话是在 `/Users/Joe/.nvm/versions/node/v8.17.0/bin/` 目录下，直接使用全局命令运行。

本地安装它会把可执行文件放到 `node_modules/.bin/`文件夹下。可以输入文件位置来运行它。

`./node_modules/.bin/cowsay`

或者使用 `npx` 来运行，`npx` 会找到程序包的位置。

`npx cowsay`

## npm发布

##### 搭建项目

使用 vue/cli 初始化项目，并修改项目结构。

```
├── src                            // 源码目录
│   ├── lib                        // 源码
│   │   ├── index.js               // 插件入口
│   │   ├── MyPlugin.vue           // 组件
│   ├── App.vue                    // 测试写的插件
│   ├── main.js                    // 程序入口文件，加载各种公共组件
├── index.html                     // 入口html文件
```

##### 编写组件

```vue
<template>
  <div>
    
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>
```

##### 插件注册

Vue.js 的插件是一个对象或类，暴露一个 install 方法，里面来包含我们要处理的业务。这个方法的第一个参数是 Vue 构造器 , 第二个参数是一个可选的选项对象。

```js
const MyPlugin = {
  install (Vue, options) {
		// 1. 添加全局方法或 property
    Vue.myGlobalMethod = function () {
      // 逻辑...
    }

    // 2. 添加全局资源
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        // 逻辑...
      }
    })

    // 3. 注入组件选项
    Vue.mixin({
      created: function () {
        // 逻辑...
      }
    })

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
      // 逻辑...
    }
  }
}

// 导出插件
export default MyPlugin
```

##### 插件使用

通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成。

```js
import MyPlugin from 'MyPlugin'

Vue.use(MyPlugin)
// 也可以传入一个可选的选项对象
Vue.use(MyPlugin, { someOption: true })

new Vue({
  // ...组件选项
})
```

Vue.use 会自动阻止多次注册相同插件，即使多次调用也只会注册一次该插件。

使用 script 标签引入插件代码时，无法使用 import 或 require 等形式进行插件模块的导入，也就无法使用 Vue.use()，所以一些插件内部注册的时候在检测到 Vue 是可访问的全局变量时会自动调用 Vue.use() 来使用插件。Vue 只有在 script 的形式时才是可访问的全局变量，所以模块化开发的时候我们都要手动 Vue.use()。

```js
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MyPlugin);
}
```

##### 打包

方式一：添加打包命令：package.json

```json
"build:lib": "vue-cli-service build --target lib --name falcons-header src/lib/header/index.js",
```

```bash
npm run build:lib
```

方式二：修改 webpack 配置：vue.config.js

```js
module.exports = {
	entry: './src/lib/index.js',
  output: {
    path: path.resolve(__dirname, './dist'), 
    publicPath: '/dist/',
    filename: 'my-plugin.js' // 打包后输出的文件名，起一个与插件功能相对应的
    library: 'MyPlugin', // library指定的就是你使用require时的模块名，这里便是require("MyPlugin")
    libraryTarget: 'umd', // libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
    umdNamedDefine: true // 会对UMD的构建过程中的AMD模块进行命名。否则就使用匿名的define。
  }
}
```

```bash
npm run build
```

##### 发布到 npm

修改 package.json

```json
{
  "name": "my-plugin", // 最终包的名字，install和import的就是这个名字。先到npm搜索有没有被用过。
  "version": "1.0.0",
  "private": false,
  "description": "MyPlugin插件",
  "main": "dist/my-plugin.js", // 当你引入模块的时候，它默认就会去找这个文件
  "repository": { // 配置这个地址存放你项目在github上的位置
    "type": "git",
    "url": "https://github.com/zhaoyang007/my-plugin"
  }, 
  "keywords": [],
  "author": "",
  "license": "MIT"
}
```

发布到 npm：

查看当前 npm 用户：npm whoami

添加用户：npm adduser

登录 npm 账户：npm login

升级版本：

* 升级补丁版本号：npm version patch
* 升级小版本号：npm version minor
* 升级大版本号：npm version major

先提交 git，然后运行 npm version 命令会自动更新 npm 版本号，并且自动 git 提交一次版本号的更新，且自动的帮你打上一个版本号的 git tag，最后提交 git 远程。

发布版本：npm publish

##### 测试

在其他项目中安装你的插件，看看使用是否正常。

##### 如何将一个业务组件完整的功能变成一个插件

1. 将所有引用关系正确的匹配，包括组件，css，图片字体等资源。
2. 将接口调用正确的运行。
3. 将路由跳转关系进行正确的匹配。

# cli工具

初始化

```bash
mkdir my-cli
cd my-cli
npm init -y
npm i commander download-git-repo chalk figlet ora handlebars clear open -s

mkdir bin
cd bin
touch mycli.js

# package.json中注册bin
"bin": {
	"mycli": "./bin/mycli.js"
},

# 把你注册的bin文件通过软链的形式连接到全局，这样就可以全局使用mycli命令了
sudo npm link
```

mycli.js

```js
#!/usr/bin/env node
const program = require('commander');

const { promisify } = require('util');

// 字母拼图案
const figlet = promisify(require('figlet'));

// 清屏
const clear = require('clear');
// 粉笔
const chalk = require('chalk');
// 自动打开浏览器
// const open = require('open');

const fs = require('fs');
const handlebars = require('handlebars');

// 加颜色的log
const log = content => console.log(chalk.green(content));

// mycli -V
program.version(require('../package.json').version);

// mycli init abc 
// 创建一个叫abc的工程
program.command('init <name>')
    .description('init project')
    // .action(name => {
    //     console.log('init', name);
    // })
    .action(init)

// mycli refresh
// 自动生成路由配置命令
program.command('refresh')
    .description('refresh routers...')
    .action(refresh);

// 固定要写的，program是通过解析process.argv来获取命令行参数的
program.parse(process.argv);

async function init(name) {
    // 打印欢迎界面
    // clear();
    const data = await figlet('mycli welcome');
    log(data);

    // 脚手架新建一个工程一般是要从某一个种子工程下载下来的
    // clone种子库
    await clone('github:su37josephxia/vue-template', name);

    // 安装依赖 npm install
    log('安装依赖');
    await spawn('npm', ['install'], { cwd: `./${name}` });
    log(`
👌安装完成:
To get Start: ===========================
cd ${name}
npm run serve
===========================`
    );
  
  	// 自动打开浏览器
    // open(`http://localhost:8080`);
  
    // 启动本地服务
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}`});
    
}

// clone
const clone = async (repo, desc) => {
    // repo: 种子仓库地址
    // desc: 下载到哪

    // 下载git项目方法
    const download = promisify(require('download-git-repo'));

    // 下载过程中命令行loading
    const ora = require('ora');
    const process = ora(`下载....${repo}`);
    process.start();
    await download(repo, desc);
    process.succeed();
}

// nodejs里执行命令行命令: 子进程中的spawn方法
const spawn = async (...args) => {
    // 日志流对接 子进程日志 => 主进程日志
    const { spawn } = require('child_process');
    return new Promise(resolve => {
        const proc = spawn(...args);
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);
        proc.on('close', () => {
            resolve();
        });
    });
}

async function refresh() {
    // 获取views页面列表
    const list = fs
        .readdirSync('./src/views')
        .filter(v => v !== 'Home.vue')
        .map(v => ({
            name: v.replace('.vue', '').toLowerCase(),
            file: v
        }));
    // 使用页面列表数据和模版生成代码
    function compile(meta, templatePath, filePath) {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(templatePath).toString();
            const result = handlebars.compile(content)(meta);
            fs.writeFileSync(filePath, result);
            log(`🚀${filePath} 创建成功`);
        }
    }
    // 生成路由
    compile({ list }, './template/router.js.hbs', './src/router.js');
    
    // 生成菜单
    compile({ list }, './template/App.vue.hbs', './src/App.vue');
}
```

发布

publish.sh

```bash
#!usr/bin/env bash
npm config get registry # 检查npm仓库
npm config set registry=https://registry.npmjs.org
echo '请进行登录相关操作'
npm login
echo '-------publishing-------'
npm publish
# npm config set registry=https://registry.npm.taobao.org
echo '发布完成'
exit
```

```bash
chmod +x publish.sh # 新建的sh文件执行前要加执行权限
./publish.sh
```

使用

```bash
# 全局安装
npm install -g zy-vue-auto-router-cli

# 本地安装
npm install zy-vue-auto-router-cli

# 本地安装后，使用 npm link 转到全局
# 需要在下载 node_modules 包中执行，这样才会找到改包下的 bin 命令。
npm link
```

# koa

##### koa-middleware

每收到一个 http 请求，koa 就会调用 `app.use()` 注册的 async 函数，并传入 `ctx` 和 `next` 参数。

每个 async 函数就是一个中间件，可以做一些自己的事情，然后用 `await next()` 来调用下一个 async 函数。

洋葱圈模式（责任链模式）既能满足顺序描述的需要也能满足切面描述的需要，中间件之前和之后都可以做一些事情。

```js
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
```

如果一个 middleware 没有调用 `await next()`，后续的 middleware 将不再执行。这种情况也很常见，例如，一个检测用户权限的 middleware 可以决定是否继续处理请求，还是直接返回 403 错误：

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

处理 post 请求：

用 post 请求处理 URL 时，我们会遇到一个问题：post 请求通常会发送一个表单，或者 JSON，它作为 request 的 body 发送，但无论是 Node.js 提供的原始 request 对象，还是 koa 提供的 request 对象，都不提供解析 request 的 body 的功能！

所以，我们又需要引入另一个 middleware 来解析原始 request 请求，然后，把解析后的参数，绑定到 `ctx.request.body` 中。

##### koa-bodyparser

`koa-bodyparser ` 用于解析 post 请求的参数。

 `koa-bodyparser` 必须在使用 `router ` 之前注册。

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
        ctx.response.body = `<h1>Login failed!</h1><p><a href="/">Try again</a></p>`;
    }
});
```

##### 实现 koa 框架

```js
const Koa = require('./koa');
const app = new Koa();

app.use((req, res) => {
	res.writeHead(200);
  res.end('hello world');
});

app.listen(3000, () => {
	console.log(`server is listening at 3000`);
});
```

Koa.js

```js
const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Koa {
	use(callback) {
		this.callback = callback;
  }
  
  listen(...args) {
		const server = http.createServer((req, res) => {
			// this.callback(req, res);
      
      // 创建上下文
      const ctx = this.createContext(req, res);
      
      this.callback(ctx);
      
      res.end(ctx.body);
      
    });
    server.listen(...args);
  }
  
  // 构建上下文
  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    
		return ctx;
  }
}
module.exports = Koa;
```

request.js

```js
module.exports = {
	get url() {
		return this.req.url;
  },
  get method() {
    return this.req.method.toLowerCase();
  },
}
```

response.js

```js
module.exports = {
	get body() {
		return this._body;
  },
  set body(val) {
    this._body = val;
  },
}
```

context.js

```js
module.exports = {
	get url() {
		return this.request.url;
  },
  get method() {
		return this.request.method;
  },
  get body() {
		return this.response.body;
  },
	set body(val) {
    this.response.body = val;
  },
}
```

函数功能组合

compose.js

```js
const add = (x, y) => x + y;
const square = z => z * z;
const fn = (x, y) => square(add(x, y));
console.log(fn(1, 2));

// 组合两个函数
const compose = (fn1, fn2) => (...args) => fn2(fn1(...args));
const fn = compose(add, square)
console.log(fn(1, 2));

// 组合多个函数
const compose = (...[first, ...other]) => (...args) => {
  let ret = first(...args);
  other.forEach(fn => {
    ret = fn(ret);
  });
  return ret;
}
```

中间件洋葱圈模式 compose

```js
async function fn1(next) {
  console.log("fn1");
  await next();
  console.log("end fn1");
}
async function fn2(next) {
  console.log("fn2");
  await delay();
  await next();
  console.log("end fn2");
}
function fn3(next) {
  console.log("fn3");
}
function delay() {
  return new Promise((reslove, reject) => {
		setTimeout(() => {
  		reslove();
    }, 2000);
	}); 
}
const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn(); // fn1,fn2,fn3,end fn2,end fn1

function compose(middlewares) {
	return function () {
		return dispatch(0);
    function dispatch(i) {
			let fn = middlewares[i];
      if (!fn) {
				return Promise.resolve();
      }
      return Promise.resolve(
      	fn(function next() {
					// 下一级promise
          return dispatch(i + 1);
        });
      );
    }
  }
}
```

