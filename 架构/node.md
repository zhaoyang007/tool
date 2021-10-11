##### node 安装（7次）2021.09.30（8次）2021.10.08

当安装 Node.js 之后，就可以在命令行中访问 `node` 可执行程序。

1. `brew install node`
2. `nvm install 10.15.3`
3. 官网下载安装包

##### npm（7次）2021.09.30（8次）2021.10.08

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

##### process（7次）2021.09.30（8次）2021.10.08

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

##### path（7次）2021.09.30（8次）2021.10.08

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

##### fs（7次）2021.10.09

文件

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
    fs.mkdirSync('/Users/joe/test')
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
} catch(err) {
	console.error(err);
}
```

##### http（1次）

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
// header
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
  const method = req.method;
  let params;
  if (method === 'GET') {
    // 获取 get 请求数据
		params = url.parse(req.url, true).query;
  } else if (method === 'POST') {
    // 获取 post 请求数据
  	let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      const contentType = res.getHeader['content-type'];
      if (contentType === 'application/x-www-form-urlencoded') {
				params = qs.parse(data);
      } else if (contentType === 'application/json') {
				params = JSON.parse(data);
      }
    });  
  }
  res.writeHead(200, { 'Content-Type': 'text/html'});
  res.write('参数：' + params.key);
  res.end();
});

const hostname = '127.0.0.1';
const port = 9527;
server.listen(port, host, () => {
	console.log(`serve is listening at ${hostname}:${port}`);
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
  msg: 'Hello World!'
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
  const { statusCode } = res;
  const contentType = res.headers['content-type'];
  let error;
  if (statusCode !== 200) {''
    error = new Error(`Request Failed.\n Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error(`Invalid content-type.\n Expected application/json but received ${contentType}`);
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

##### 客户端提交数据

1.form 表单提交

form 表单

* action：url 地址，服务器接收表单数据的地址
* method：提交服务器的http方法，一般为post和get
* name：name属性的唯一性
* enctype: 表单数据提交时使用的编码类型，默认使用"pplication/x-www-form-urlencoded"，如果是使用POST请求，则请求头中的content-type指定值就是该值。如果表单中有上传文件，编码类型需要使用"multipart/form-data"类型，才能完成传递文件数据。

浏览器提交表单时，会默认执行如下步骤

1. 识别出表单中表单元素的有效项，作为提交项
2. 构建一个表单数据集
3. 根据form表单中的enctype属性的值作为content-type对数据进行编码
4. 根据form表单中的action属性和method属性向指定的地址发送数据

提交方式

1. get：表单数据会被encodeURIComponent后以参数的形式:name1=value1&name2=value2 附带在url?后面，再发送给服务器，并在url中显示出来。
2. post：enctype 默认"application/x-www-form-urlencoded"对表单数据进行编码，数据以键值对在http请求体中发送给服务器；如果enctype 属性为"multipart/form-data"，则以消息的形式发送给服务器。

2.四种常见的 POST 提交数据方式

HTTP 请求分为三个部分：状态行、请求头、消息主体。

```
<method> <request-URL> <version>
<headers>

<entity-body>
```

服务端根据请求头（headers）中的 Content-Type 字段来获知请求中的消息主体是用何种方式编码，再对请求主体数据进行解析。

1.application/x-www-form-urlencoded

浏览器的原生 <form> 表单，如果不设置 `enctype` 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。Content-Type 被指定为 application/x-www-form-urlencoded，提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。可以使用 qs.stringify(data) 将data转换为url格式。

```
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8

title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
```

2.multipart/form-data

使用表单上传文件时，必须让 <form> 表单的 `enctype` 等于 multipart/form-data。

```
POST http://www.example.com HTTP/1.1
Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA

------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="text"

title
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="file"; filename="chrome.png"
Content-Type: image/png

PNG ... content of chrome.png ...
------WebKitFormBoundaryrGKCBY7qhFd3TrwA--
```

3.application/json

这种方案，可以方便的提交复杂的结构化数据。

```
POST http://www.example.com HTTP/1.1 
Content-Type: application/json;charset=utf-8

{"title":"test","sub":[1,2,3]}
```

4.text/xml

它是一种使用 HTTP 作为传输协议，XML 作为编码方式的远程调用规范。

```
POST http://www.example.com HTTP/1.1 
Content-Type: text/xml

<?xml version="1.0"?>
<methodCall>
    <methodName>examples.getStateName</methodName>
    <params>
        <param>
            <value><i4>41</i4></value>
        </param>
    </params>
</methodCall>
```

##### 字符集和字符编码

通俗的说，按照何种规则将字符存储在计算机中，如'a'用什么表示，称为"编码"；反之，将存储在计算机中的二进制数解析显示出来，称为"解码"。

字符集就是规定了某个文字对应的二进制数字存放方式（编码）和某串二进制数值代表了哪个文字（解码）的转换关系。

字符集只是一个规则集合的名字，对应到真实生活中，字符集就是对某种语言的称呼。例如：英语，汉语，日语。

对于一个字符集来说要正确编码转码一个字符需要三个关键元素：字库表（character repertoire）、编码字符集（coded character set）、字符编码（character encoding form）。

* 字库表是一个相当于所有可读或者可显示字符的数据库，字库表决定了整个字符集能够展现表示的所有字符的范围。
* 编码字符集，即用一个编码值`code point`来表示一个字符在字库中的位置。
* 字符编码，编码字符集和实际存储数值之间的转换关系。

Unicode就是上文中提到的编码字符集，而UTF-8就是字符编码，即Unicode规则字库的一种实现形式。

随着互联网的发展，对同一字库集的要求越来越迫切，Unicode标准也就自然而然的出现。它几乎涵盖了各个国家语言可能出现的符号和文字，并将为他们编号。

Unicode的编号从`0000`开始一直到`10FFFF`共分为17个Plane，每个Plane中有65536个字符。而UTF-8则只实现了第一个Plane，可见UTF-8虽然是一个当今接受度最广的字符集编码，但是它并没有涵盖整个Unicode的字库，这也造成了它在某些场景下对于特殊字符的处理困难。

**UTF-8**（8-bit Unicode Transformation Format）是一种针对 Unicode 的可变长度字符编码（定长码），也是一种前缀码。它可以用来表示Unicode标准中的任何字符，且其编码中的第一个字节仍与ASCII兼容，这使得原来处理ASCII字符的软件无须或只须做少部份修改，即可继续使用。因此，它逐渐成为电子邮件、网页及其他存储或传送文字的应用中，优先采用的编码。[互联网工程工作小组](http://zh.wikipedia.org/wiki/網際網路工程工作小組)（IETF）要求所有互联网协议都必须支持UTF-8编码。

在HTTP中，与字符集和字符编码相关的消息头是Accept-Charset/Content-Type，另外主区区分Accept-Charset/Accept-Encoding/Accept-Language/Content-Type/Content-Encoding/Content-Language：

* Accept-Charset：浏览器申明自己接收的字符集，这就是本文前面介绍的各种字符集和字符编码，如gb2312，utf-8（通常我们说Charset包括了相应的字符编码方案）；
* Accept-Encoding：浏览器申明自己接收的编码方法，通常指定压缩方法，是否支持压缩，支持什么压缩方法（gzip，deflate），（注意：这不是只字符编码）；
* Accept-Language：浏览器申明自己接收的语言。语言跟字符集的区别：中文是语言，中文有多种字符集，比如big5，gb2312，gbk等等；
* Content-Type：WEB服务器告诉浏览器自己响应的对象的类型和字符集。例如：Content-Type: text/html; charset='gb2312'
* Content-Encoding：WEB服务器表明自己使用了什么压缩方法（gzip，deflate）压缩响应中的对象。例如：Content-Encoding：gzip
* Content-Language：WEB服务器告诉浏览器自己响应的对象的语言。

##### todo

1. npm 命令是否就是 node 可执行文件的名字

2. 事件循环

3. 使用setTimeout封装setInterval

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

4. promise 原理，async/await 原理

5. 错误处理

6. Error

7. events

8. url

9. 模块化

10. timer

    ```js
    // nextTick 早于另外两个，是在当前事件循环的最后执行
    process.nextTick(() => {
    	console.log('nextTick');
    });
    // 延迟 0 毫秒的 setTimeout() 回调与 setImmediate() 非常相似。 执行顺序取决于各种因素，但是它们都会在事件循环的下一个迭代中运行。
    setImmediate(() => {
      console.log('setImmediate');
    });
    setTimeout(() => {
      console.log('setTimeout');
    }, 0);
    ```

11. 
