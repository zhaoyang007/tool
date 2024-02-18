# node

## 概念

**什么是NodeJS**

JS是脚本语言，脚本语言都需要一个解析器才能运行。对于写在HTML页面里的JS，浏览器充当了解析器的角色。而对于需要独立运行的JS，NodeJS就是一个解析器。

每一种解析器都是一个运行环境，不但允许JS定义各种数据结构，进行各种计算，还允许JS使用运行环境提供的内置对象和方法做一些事情。例如运行在浏览器中的JS的用途是操作DOM，浏览器就提供了`document`之类的内置对象。而运行在NodeJS中的JS的用途是操作磁盘文件或搭建HTTP服务器，NodeJS就相应提供了`fs`、`http`等内置对象。

NodeJS的作者说，他创造NodeJS的目的是为了实现高性能Web服务器，他首先看重的是事件机制和异步IO模型的优越性，而不是JS。但是他需要选择一种编程语言实现他的想法，这种编程语言不能自带IO功能，并且需要能良好支持事件机制。JS没有自带IO功能，天生就用于处理浏览器中的DOM事件，并且拥有一大群程序员，因此就成为了天然的选择。根据上面的描述，nodejs最大的特点就是事件机制和异步I/O。

使用NodeJS编写的东西，要么是一个包，要么是一个命令行程序

node采用一个长期运行的进程，是单线程的。

优先错误处理，由于node应用依托在一个拥有大量共享状态的大进程中，如果某个回调函数发生了错误，整个进程都会崩溃。

使用v8，可以让执行js的速度非常快。

非阻塞IO：使用事件轮询事项实现异步，node使用回调和事件机制来实现并发。

模块系统：require exports module.exports

事件机制

中间件：就是函数，用于流程控制，使代码清晰和提高复用性。

## 安装

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

## 模块

编写稍大一点的程序时一般都会将代码模块化。在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，而文件路径就是模块名。

在编写每个模块时，都有`require`、`exports`、`module`三个预先定义好的变量可供使用。

* `require`函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。
* `exports`对象是当前模块的导出对象，用于导出模块公有方法和属性。别的模块通过`require`函数使用当前模块时得到的就是当前模块的`exports`对象。
* 通过`module`对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象。例如模块导出对象默认是一个普通对象，如果想改成一个函数的话，可以使用以下方式。

一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。

**模块路径解析规则**

我们已经知道，`require`函数支持斜杠（`/`）或盘符（`C:`）开头的绝对路径，也支持`./`开头的相对路径。但这两种路径在模块之间建立了强耦合关系，一旦某个模块文件的存放位置需要变更，使用该模块的其它模块的代码也需要跟着调整，变得牵一发动全身。因此，`require`函数支持第三种形式的路径，写法类似于`foo/bar`，并依次按照以下规则解析路径，直到找到模块位置。

1. 内置模块

   如果传递给`require`函数的是NodeJS内置模块名称，不做路径解析，直接返回内部模块的导出对象，例如`require('fs')`。

2. node_modules目录

   NodeJS定义了一个特殊的`node_modules`目录用于存放模块。例如某个模块的绝对路径是`/home/user/hello.js`，在该模块中使用`require('foo/bar')`方式加载模块时，则NodeJS依次尝试使用以下路径。

   ```
    /home/user/node_modules/foo/bar
    /home/node_modules/foo/bar
    /node_modules/foo/bar
   ```

3. NODE_PATH环境变量

   与PATH环境变量类似，NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径。NODE_PATH环境变量中包含一到多个目录路径，路径之间在Linux下使用`:`分隔，在Windows下使用`;`分隔。例如定义了以下NODE_PATH环境变量：

   ```
    NODE_PATH=/home/user/lib:/home/lib
   ```

   当使用`require('foo/bar')`的方式加载模块时，则NodeJS依次尝试以下路径。

   ```
    /home/user/lib/foo/bar
    /home/lib/foo/bar
   ```

**nodejs模块查找策略：**

1. 文件作为模块：

   * 相对路径
   * 绝对路径

   * 核心模块
   * 从 `node_modules` 中加载模块（https://www.nodejs.com.cn/api/packages.html）
     * 首先检查模块的 `package.json` 文件中，`exports`、`module` 或 `main`字段指定的入口点文件。书写顺序即优先级。
     * 如果 `package.json` 中没有指定或不存在，则默认查找模块根目录下的 `index.js` 文件。

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

## 文件操作

让前端觉得如获神器的不是NodeJS能做网络编程，而是NodeJS能够操作文件。小至文件查找，大至代码编译，几乎没有一个前端工具不操作文件。换个角度讲，几乎也只需要一些数据处理逻辑，再加上一些文件操作，就能够编写出大多数前端工具。本章将介绍与之相关的NodeJS内置模块。

### path

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
// 将传入的路径转换为标准路径
// 解析和规范化都不会检查路径是否存在。它只是根据获得的信息来计算路径。
// 规范化给定的 path，当包含诸如 .、.. 或双斜杠之类的相对说明符时，会尝试计算实际的路径。
path.normalize('/users/joe/..//test.txt') // '/users/test.txt'
// 将传入的多个路径拼接为标准路径
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

### fs

NodeJS通过`fs`内置模块提供对文件的操作。`fs`模块提供的API基本上可以分为以下三类：

- 文件属性读写。

  其中常用的有`fs.stat`、`fs.chmod`、`fs.chown`等等。

- 文件内容读写。

  其中常用的有`fs.readFile`、`fs.readdir`、`fs.writeFile`、`fs.mkdir`等等。

- 底层文件操作。

  其中常用的有`fs.open`、`fs.read`、`fs.write`、`fs.close`等等。

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

### buffer

Buffer 是一块固定大小的内存区域。

可以将 buffer 视为整数数组，每个整数代表一个数据字节。

Buffer 被引入用以帮助开发者处理二进制数据，可以对数据进行编码转换，在此生态系统中传统上只处理字符串而不是二进制数据。

Buffer 与流紧密相连。 当流处理器接收数据的速度快于其消化的速度时，则会将数据放入 buffer 中。

JS语言自身只有字符串数据类型，没有二进制数据类型，因此NodeJS提供了一个与`String`对等的全局构造函数`Buffer`来提供对二进制数据的操作。除了可以读取文件得到`Buffer`的实例外，还能够直接构造，例如：

```
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
```

`Buffer`与字符串类似，除了可以用`.length`属性得到字节长度外，还可以用`[index]`方式读取指定位置的字节，例如：

```
bin[0]; // => 0x68;
```

`Buffer`与字符串能够互相转化，例如可以使用指定编码将二进制数据转化为字符串：

```
var str = bin.toString('utf-8'); // => "hello"
```

或者反过来，将字符串转换为指定编码下的二进制数据：

```
var bin = new Buffer('hello', 'utf-8'); // => <Buffer 68 65 6c 6c 6f>
```

`Buffer`与字符串有一个重要区别。字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。至于`Buffer`，更像是可以做指针操作的C语言数组。例如，可以用`[index]`方式直接修改某个位置的字节。

```
bin[0] = 0x48;
```

而`.slice`方法也不是返回一个新的`Buffer`，而更像是返回了指向原`Buffer`中间的某个位置的指针，如下所示。

```
[ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]
    ^           ^
    |           |
   bin     bin.slice(2)
```

因此对`.slice`方法返回的`Buffer`的修改会作用于原`Buffer`，例如：

```
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = bin.slice(2);

sub[0] = 0x65;
console.log(bin); // => <Buffer 68 65 65 6c 6f>
```

也因此，如果想要拷贝一份`Buffer`，得首先创建一个新的`Buffer`，并通过`.copy`方法把原`Buffer`中的数据复制过去。这个类似于申请一块新的内存，并把已有内存中的数据复制过去。以下是一个例子。

```
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;
console.log(bin); // => <Buffer 68 65 6c 6c 6f>
console.log(dup); // => <Buffer 48 65 65 6c 6f>
```

总之，`Buffer`将JS的数据处理能力从字符串扩展到了任意二进制数据。

**js中处理二进制数据的api**

`ArrayBuffer`、类型化数组（Typed Arrays）和`Blob`是 JavaScript 中用于处理二进制数据的不同结构，它们各有特点和用途：

ArrayBuffer

- 定义: `ArrayBuffer` 是一种通用的、固定长度的原始二进制数据缓冲区。
- 特点: 你不能直接操作 `ArrayBuffer` 的内容。它提供了一个原始的二进制数据缓冲区，可以通过类型化数组或 `DataView` 对其进行读写。
- 用途: 通常用作存储二进制数据的底层结构，如文件读取、网络通信等。

类型化数组 (Typed Arrays)

- 定义: 类型化数组是 `ArrayBuffer` 的视图，它们提供了对 `ArrayBuffer` 的结构化访问。例如，`Uint8Array`、`Int16Array`、`Float32Array` 等。
- 特点: 每种类型化数组固定了元素的数据类型和大小，使得对特定格式的二进制数据的读写变得容易。
- 用途: 用于需要按特定格式处理二进制数据的场景，如图像处理、音频处理、或者其他需要操作具体二进制数据的应用。

Blob

- 定义: `Blob`（Binary Large Object）代表了不可变的二进制数据块。
- 特点: 通常用来处理大型的文件数据，如图片、声音、视频等。
- 用途: 常用于文件操作，如读取用户上传的文件、在客户端生成并下载文件等。`Blob` 也经常在 Web API 中用于数据传输。

总结

- `ArrayBuffer`是原始的二进制数据缓冲区。
- 类型化数组提供了对 `ArrayBuffer` 内容的结构化访问。
- `Blob` 用于表示大型的二进制数据，常用于文件操作。

它们共同构成了 JavaScript 处理二进制数据的生态系统，每种结构都有其特定的用途和应用场景。

### stream

在传统的方式中，当告诉程序读取文件时，这会将文件从头到尾读入内存，然后进行处理。使用流，则可以逐个片段地读取并处理（而无需全部保存在内存中）。

当持续不断地对数据进行读写时，流就出现了。

当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，我们就需要用到数据流。NodeJS中通过各种`Stream`来提供对数据流的操作。

## 网络操作

### http

http模块提供两种使用方式：

- 作为服务端使用时，创建一个HTTP服务器，监听HTTP客户端请求并返回响应。
- 作为客户端使用时，发起一个HTTP客户端请求，获取服务端响应。

首先我们来看看服务端模式下如何工作。如开门红中的例子所示，首先需要使用`.createServer`方法创建一个服务器，然后调用`.listen`方法监听端口。之后，每当来了一个客户端请求，创建服务器时传入的回调函数就被调用一次。可以看出，这是一种事件机制。

HTTP请求本质上是一个数据流，由请求头（headers）和请求体（body）组成。例如以下是一个完整的HTTP请求数据内容。

```
POST / HTTP/1.1
User-Agent: curl/7.26.0
Host: localhost
Accept: */*
Content-Length: 11
Content-Type: application/x-www-form-urlencoded

Hello World
```

可以看到，空行之上是请求头，之下是请求体。HTTP请求在发送给服务器时，可以认为是按照从头到尾的顺序一个字节一个字节地以数据流方式发送的。而`http`模块创建的HTTP服务器在接收到完整的请求头后，就会调用回调函数。在回调函数中，除了可以使用`request`对象访问请求头数据外，还能把`request`对象当作一个只读数据流来访问请求体数据。以下是一个例子。

```
http.createServer(function (request, response) {
    var body = [];

    console.log(request.method);
    console.log(request.headers);

    request.on('data', function (chunk) {
        body.push(chunk);
    });

    request.on('end', function () {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
}).listen(80);

------------------------------------
POST
{ 'user-agent': 'curl/7.26.0',
  host: 'localhost',
  accept: '*/*',
  'content-length': '11',
  'content-type': 'application/x-www-form-urlencoded' }
Hello World
```

HTTP响应本质上也是一个数据流，同样由响应头（headers）和响应体（body）组成。例如以下是一个完整的HTTP请求数据内容。

```
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 11
Date: Tue, 05 Nov 2013 05:31:38 GMT
Connection: keep-alive

Hello World
```

在回调函数中，除了可以使用`response`对象来写入响应头数据外，还能把`response`对象当作一个只写数据流来写入响应体数据。例如在以下例子中，服务端原样将客户端请求的请求体数据返回给客户端。

```
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    request.on('data', function (chunk) {
        response.write(chunk);
    });

    request.on('end', function () {
        response.end();
    });
}).listen(80);
```

接下来我们看看客户端模式下如何工作。为了发起一个客户端HTTP请求，我们需要指定目标服务器的位置并发送请求头和请求体，以下示例演示了具体做法。

```
var options = {
        hostname: 'www.example.com',
        port: 80,
        path: '/upload',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

var request = http.request(options, function (response) {});

request.write('Hello World');
request.end();
```

可以看到，`.request`方法创建了一个客户端，并指定请求目标和请求头数据。之后，就可以把`request`对象当作一个只写数据流来写入请求体数据和结束请求。另外，由于HTTP请求中`GET`请求是最常见的一种，并且不需要请求体，因此`http`模块也提供了以下便捷API。

```
http.get('http://www.example.com/', function (response) {});
```

当客户端发送请求并接收到完整的服务端响应头时，就会调用回调函数。在回调函数中，除了可以使用`response`对象访问响应头数据外，还能把`response`对象当作一个只读数据流来访问响应体数据。以下是一个例子。

```
http.get('http://www.example.com/', function (response) {
    var body = [];

    console.log(response.statusCode);
    console.log(response.headers);

    response.on('data', function (chunk) {
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
});

------------------------------------
200
{ 'content-type': 'text/html',
  server: 'Apache',
  'content-length': '801',
  date: 'Tue, 05 Nov 2013 06:08:41 GMT',
  connection: 'keep-alive' }
<!DOCTYPE html>
...
```

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

### https

`https`模块与`http`模块极为类似，区别在于`https`模块需要额外处理SSL证书。

在服务端模式下，创建一个HTTPS服务器的示例如下。

```
var options = {
        key: fs.readFileSync('./ssl/default.key'),
        cert: fs.readFileSync('./ssl/default.cer')
    };

var server = https.createServer(options, function (request, response) {
        // ...
    });
```

可以看到，与创建HTTP服务器相比，多了一个`options`对象，通过`key`和`cert`字段指定了HTTPS服务器使用的私钥和公钥。

另外，NodeJS支持SNI技术，可以根据HTTPS客户端请求使用的域名动态使用不同的证书，因此同一个HTTPS服务器可以使用多个域名提供服务。接着上例，可以使用以下方法为HTTPS服务器添加多组证书。

```
server.addContext('foo.com', {
    key: fs.readFileSync('./ssl/foo.com.key'),
    cert: fs.readFileSync('./ssl/foo.com.cer')
});

server.addContext('bar.com', {
    key: fs.readFileSync('./ssl/bar.com.key'),
    cert: fs.readFileSync('./ssl/bar.com.cer')
});
```

在客户端模式下，发起一个HTTPS客户端请求与`http`模块几乎相同，示例如下。

```
var options = {
        hostname: 'www.example.com',
        port: 443,
        path: '/',
        method: 'GET'
    };

var request = https.request(options, function (response) {});

request.end();
```

但如果目标服务器使用的SSL证书是自制的，不是从颁发机构购买的，默认情况下`https`模块会拒绝连接，提示说有证书安全问题。在`options`里加入`rejectUnauthorized: false`字段可以禁用对证书有效性的检查，从而允许`https`模块请求开发环境下使用自制证书的HTTPS服务器。

### url

处理HTTP请求时`url`模块使用率超高，因为该模块允许解析URL、生成URL，以及拼接URL。首先我们来看看一个完整的URL的各组成部分。

```
                           href
 -----------------------------------------------------------------
                            host              path
                      --------------- ----------------------------
 http: // user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
 -----    ---------   --------   ---- -------- ------------- -----
protocol     auth     hostname   port pathname     search     hash
                                                ------------
                                                   query
```

我们可以使用`.parse`方法来将一个URL字符串转换为URL对象，示例如下。

```
url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
/* =>
{ protocol: 'http:',
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }
*/
```

传给`.parse`方法的不一定要是一个完整的URL，例如在HTTP服务器回调函数中，`request.url`不包含协议头和域名，但同样可以用`.parse`方法解析。

```
http.createServer(function (request, response) {
    var tmp = request.url; // => "/foo/bar?a=b"
    url.parse(tmp);
    /* =>
    { protocol: null,
      slashes: null,
      auth: null,
      host: null,
      port: null,
      hostname: null,
      hash: null,
      search: '?a=b',
      query: 'a=b',
      pathname: '/foo/bar',
      path: '/foo/bar?a=b',
      href: '/foo/bar?a=b' }
    */
}).listen(80);
```

`.parse`方法还支持第二个和第三个布尔类型可选参数。第二个参数等于`true`时，该方法返回的URL对象中，`query`字段不再是一个字符串，而是一个经过`querystring`模块转换后的参数对象。第三个参数等于`true`时，该方法可以正确解析不带协议头的URL，例如`//www.example.com/foo/bar`。

反过来，`format`方法允许将一个URL对象转换为URL字符串，示例如下。

```
url.format({
    protocol: 'http:',
    host: 'www.example.com',
    pathname: '/p/a/t/h',
    search: 'query=string'
});
/* =>
'http://www.example.com/p/a/t/h?query=string'
*/
```

另外，`.resolve`方法可以用于拼接URL，示例如下。

```
url.resolve('http://www.example.com/foo/bar', '../baz');
/* =>
http://www.example.com/baz
*/
```

### query string

`querystring`模块用于实现URL参数字符串与参数对象的互相转换，示例如下。

```
querystring.parse('foo=bar&baz=qux&baz=quux&corge');
/* =>
{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }
*/

querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
/* =>
'foo=bar&baz=qux&baz=quux&corge='
*/
```

### zlib

`zlib`模块提供了数据压缩和解压的功能。当我们处理HTTP请求和响应时，可能需要用到这个模块。

首先我们看一个使用`zlib`模块压缩HTTP响应体数据的例子。这个例子中，判断了客户端是否支持gzip，并在支持的情况下使用`zlib`模块返回gzip之后的响应体数据。

```
http.createServer(function (request, response) {
    var i = 1024,
        data = '';

    while (i--) {
        data += '.';
    }

    if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
        zlib.gzip(data, function (err, data) {
            response.writeHead(200, {
                'Content-Type': 'text/plain',
                'Content-Encoding': 'gzip'
            });
            response.end(data);
        });
    } else {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end(data);
    }
}).listen(80);
```

接着我们看一个使用`zlib`模块解压HTTP响应体数据的例子。这个例子中，判断了服务端响应是否使用gzip压缩，并在压缩的情况下使用`zlib`模块解压响应体数据。

```
var options = {
        hostname: 'www.example.com',
        port: 80,
        path: '/',
        method: 'GET',
        headers: {
            'Accept-Encoding': 'gzip, deflate'
        }
    };

http.request(options, function (response) {
    var body = [];

    response.on('data', function (chunk) {
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);

        if (response.headers['content-encoding'] === 'gzip') {
            zlib.gunzip(body, function (err, data) {
                console.log(data.toString());
            });
        } else {
            console.log(data.toString());
        }
    });
}).end();
```

### net

`net`模块可用于创建Socket服务器或Socket客户端。由于Socket在前端领域的使用范围还不是很广，这里先不涉及到WebSocket的介绍，仅仅简单演示一下如何从Socket层面来实现HTTP请求和响应。

首先我们来看一个使用Socket搭建一个很不严谨的HTTP服务器的例子。这个HTTP服务器不管收到啥请求，都固定返回相同的响应。

```
net.createServer(function (conn) {
    conn.on('data', function (data) {
        conn.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World'
        ].join('\n'));
    });
}).listen(80);
```

接着我们来看一个使用Socket发起HTTP客户端请求的例子。这个例子中，Socket客户端在建立连接后发送了一个HTTP GET请求，并通过`data`事件监听函数来获取服务器响应。

```
var options = {
        port: 80,
        host: 'www.example.com'
    };

var client = net.connect(options, function () {
        client.write([
            'GET / HTTP/1.1',
            'User-Agent: curl/7.26.0',
            'Host: www.baidu.com',
            'Accept: */*',
            '',
            ''
        ].join('\n'));
    });

client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});
```

## 进程管理

NodeJS可以感知和控制自身进程的运行环境和状态，也可以创建子进程并与其协同工作，这使得NodeJS可以把多个程序组合在一起共同完成某项工作，并在其中充当胶水和调度器的作用。本章除了介绍与之相关的NodeJS内置模块外，还会重点介绍典型的使用场景。

### process

任何一个进程都有启动进程时使用的命令行参数，有标准输入标准输出，有运行权限，有运行环境和运行状态。在NodeJS中，可以通过`process`对象感知和控制NodeJS自身进程的方方面面。另外需要注意的是，`process`不是内置模块，而是一个全局对象，因此在任何地方都可以直接使用。

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

### child_process

使用`child_process`模块可以创建和控制子进程。该模块提供的API中最核心的是`.spawn`，其余API都是针对特定使用场景对它的进一步封装，算是一种语法糖。

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

### Cluster

`cluster`模块是对`child_process`模块的进一步封装，专用于解决单进程NodeJS Web服务器无法充分利用多核CPU的问题。使用该模块可以简化多进程服务器程序的开发，让每个核上运行一个工作进程，并统一通过主进程监听端口和分发请求。

## 异步编程

NodeJS最大的卖点——事件机制和异步IO，对开发者并不是透明的。开发者需要按异步方式编写代码才用得上这个卖点，而这一点也遭到了一些NodeJS反对者的抨击。但不管怎样，异步编程确实是NodeJS最大的特点，没有掌握异步编程就不能说是真正学会了NodeJS。本章将介绍与异步编程相关的各种知识。

### 回调

在代码中，异步编程的直接体现就是回调。异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了。我们首先可以看看以下代码。

```
function heavyCompute(n, callback) {
    var count = 0,
        i, j;

    for (i = n; i > 0; --i) {
        for (j = n; j > 0; --j) {
            count += 1;
        }
    }

    callback(count);
}

heavyCompute(10000, function (count) {
    console.log(count);
});

console.log('hello');

-- Console ------------------------------
100000000
hello
```

可以看到，以上代码中的回调函数仍然先于后续代码执行。JS本身是单线程运行的，不可能在一段代码还未结束运行时去运行别的代码，因此也就不存在异步执行的概念。

但是，如果某个函数做的事情是创建一个别的线程或进程，并与JS主线程并行地做一些事情，并在事情做完后通知JS主线程，那情况又不一样了。我们接着看看以下代码。

```
setTimeout(function () {
    console.log('world');
}, 1000);

console.log('hello');

-- Console ------------------------------
hello
world
```

这次可以看到，回调函数后于后续代码执行了。如同上边所说，JS本身是单线程的，无法异步执行，因此我们可以认为`setTimeout`这类JS规范之外的由运行环境提供的特殊函数做的事情是创建一个平行线程后立即返回，让JS主进程可以接着执行后续代码，并在收到平行进程的通知后再执行回调函数。除了`setTimeout`、`setInterval`这些常见的，这类函数还包括NodeJS提供的诸如`fs.readFile`之类的异步API。

另外，我们仍然回到JS是单线程运行的这个事实上，这决定了JS在执行完一段代码之前无法执行包括回调函数在内的别的代码。也就是说，即使平行线程完成工作了，通知JS主线程执行回调函数了，回调函数也要等到JS主线程空闲时才能开始执行。以下就是这么一个例子。

```
function heavyCompute(n) {
    var count = 0,
        i, j;

    for (i = n; i > 0; --i) {
        for (j = n; j > 0; --j) {
            count += 1;
        }
    }
}

var t = new Date();

setTimeout(function () {
    console.log(new Date() - t);
}, 1000);

heavyCompute(50000);

-- Console ------------------------------
8520
```

可以看到，本来应该在1秒后被调用的回调函数因为JS主线程忙于运行其它代码，实际执行时间被大幅延迟。

### 代码设计模式

异步编程有很多特有的代码设计模式，为了实现同样的功能，使用同步方式和异步方式编写的代码会有很大差异。以下分别介绍一些常见的模式。

**函数返回值**

使用一个函数的输出作为另一个函数的输入是很常见的需求，在同步方式下一般按以下方式编写代码：

```
var output = fn1(fn2('input'));
// Do something.
```

而在异步方式下，由于函数执行结果不是通过返回值，而是通过回调函数传递，因此一般按以下方式编写代码：

```
fn2('input', function (output2) {
    fn1(output2, function (output1) {
        // Do something.
    });
});
```

可以看到，这种方式就是一个回调函数套一个回调函多，套得太多了很容易写出`>`形状的代码。

**遍历数组**

在遍历数组时，使用某个函数依次对数据成员做一些处理也是常见的需求。如果函数是同步执行的，一般就会写出以下代码：

```
var len = arr.length,
    i = 0;

for (; i < len; ++i) {
    arr[i] = sync(arr[i]);
}

// All array items have processed.
```

如果函数是异步执行的，以上代码就无法保证循环结束后所有数组成员都处理完毕了。如果数组成员必须一个接一个串行处理，则一般按照以下方式编写异步代码：

```
(function next(i, len, callback) {
    if (i < len) {
        async(arr[i], function (value) {
            arr[i] = value;
            next(i + 1, len, callback);
        });
    } else {
        callback();
    }
}(0, arr.length, function () {
    // All array items have processed.
}));
```

可以看到，以上代码在异步函数执行一次并返回执行结果后才传入下一个数组成员并开始下一轮执行，直到所有数组成员处理完毕后，通过回调的方式触发后续代码的执行。

如果数组成员可以并行处理，但后续代码仍然需要所有数组成员处理完毕后才能执行的话，则异步代码会调整成以下形式：

```
(function (i, len, count, callback) {
    for (; i < len; ++i) {
        (function (i) {
            async(arr[i], function (value) {
                arr[i] = value;
                if (++count === len) {
                    callback();
                }
            });
        }(i));
    }
}(0, arr.length, 0, function () {
    // All array items have processed.
}));
```

可以看到，与异步串行遍历的版本相比，以上代码并行处理所有数组成员，并通过计数器变量来判断什么时候所有数组成员都处理完毕了。

**异常处理**

JS自身提供的异常捕获和处理机制——`try..catch..`，只能用于同步执行的代码。以下是一个例子。

```
function sync(fn) {
    return fn();
}

try {
    sync(null);
    // Do something.
} catch (err) {
    console.log('Error: %s', err.message);
}

-- Console ------------------------------
Error: object is not a function
```

可以看到，异常会沿着代码执行路径一直冒泡，直到遇到第一个`try`语句时被捕获住。但由于异步函数会打断代码执行路径，异步函数执行过程中以及执行之后产生的异常冒泡到执行路径被打断的位置时，如果一直没有遇到`try`语句，就作为一个全局异常抛出。以下是一个例子。

```
function async(fn, callback) {
    // Code execution path breaks here.
    setTimeout(function ()　{
        callback(fn());
    }, 0);
}

try {
    async(null, function (data) {
        // Do something.
    });
} catch (err) {
    console.log('Error: %s', err.message);
}

-- Console ------------------------------
/home/user/test.js:4
        callback(fn());
                 ^
TypeError: object is not a function
    at null._onTimeout (/home/user/test.js:4:13)
    at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)
```

因为代码执行路径被打断了，我们就需要在异常冒泡到断点之前用`try`语句把异常捕获住，并通过回调函数传递被捕获的异常。于是我们可以像下边这样改造上边的例子。

```
function async(fn, callback) {
    // Code execution path breaks here.
    setTimeout(function ()　{
        try {
            callback(null, fn());
        } catch (err) {
            callback(err);
        }
    }, 0);
}

async(null, function (err, data) {
    if (err) {
        console.log('Error: %s', err.message);
    } else {
        // Do something.
    }
});

-- Console ------------------------------
Error: object is not a function
```

可以看到，异常再次被捕获住了。在NodeJS中，几乎所有异步API都按照以上方式设计，回调函数中第一个参数都是`err`。因此我们在编写自己的异步函数时，也可以按照这种方式来处理异常，与NodeJS的设计风格保持一致。

有了异常处理方式后，我们接着可以想一想一般我们是怎么写代码的。基本上，我们的代码都是做一些事情，然后调用一个函数，然后再做一些事情，然后再调用一个函数，如此循环。如果我们写的是同步代码，只需要在代码入口点写一个`try`语句就能捕获所有冒泡上来的异常，示例如下。

```
function main() {
    // Do something.
    syncA();
    // Do something.
    syncB();
    // Do something.
    syncC();
}

try {
    main();
} catch (err) {
    // Deal with exception.
}
```

但是，如果我们写的是异步代码，就只有呵呵了。由于每次异步函数调用都会打断代码执行路径，只能通过回调函数来传递异常，于是我们就需要在每个回调函数里判断是否有异常发生，于是只用三次异步函数调用，就会产生下边这种代码。

```
function main(callback) {
    // Do something.
    asyncA(function (err, data) {
        if (err) {
            callback(err);
        } else {
            // Do something
            asyncB(function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    // Do something
                    asyncC(function (err, data) {
                        if (err) {
                            callback(err);
                        } else {
                            // Do something
                            callback(null);
                        }
                    });
                }
            });
        }
    });
}

main(function (err) {
    if (err) {
        // Deal with exception.
    }
});
```

可以看到，回调函数已经让代码变得复杂了，而异步方式下对异常的处理更加剧了代码的复杂度。如果NodeJS的最大卖点最后变成这个样子，那就没人愿意用NodeJS了，因此接下来会介绍NodeJS提供的一些解决方案。

### 域（Domain）

> **官方文档：** http://nodejs.org/api/domain.html

NodeJS提供了`domain`模块，可以简化异步代码的异常处理。在介绍该模块之前，我们需要首先理解“域”的概念。简单的讲，一个域就是一个JS运行环境，在一个运行环境中，如果一个异常没有被捕获，将作为一个全局异常被抛出。NodeJS通过`process`对象提供了捕获全局异常的方法，示例代码如下

```
process.on('uncaughtException', function (err) {
    console.log('Error: %s', err.message);
});

setTimeout(function (fn) {
    fn();
});

-- Console ------------------------------
Error: undefined is not a function
```

虽然全局异常有个地方可以捕获了，但是对于大多数异常，我们希望尽早捕获，并根据结果决定代码的执行路径。我们用以下HTTP服务器代码作为例子：

```
function async(request, callback) {
    // Do something.
    asyncA(request, function (err, data) {
        if (err) {
            callback(err);
        } else {
            // Do something
            asyncB(request, function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    // Do something
                    asyncC(request, function (err, data) {
                        if (err) {
                            callback(err);
                        } else {
                            // Do something
                            callback(null, data);
                        }
                    });
                }
            });
        }
    });
}

http.createServer(function (request, response) {
    async(request, function (err, data) {
        if (err) {
            response.writeHead(500);
            response.end();
        } else {
            response.writeHead(200);
            response.end(data);
        }
    });
});
```

以上代码将请求对象交给异步函数处理后，再根据处理结果返回响应。这里采用了使用回调函数传递异常的方案，因此`async`函数内部如果再多几个异步函数调用的话，代码就变成上边这副鬼样子了。为了让代码好看点，我们可以在每处理一个请求时，使用`domain`模块创建一个子域（JS子运行环境）。在子域内运行的代码可以随意抛出异常，而这些异常可以通过子域对象的`error`事件统一捕获。于是以上代码可以做如下改造：

```
function async(request, callback) {
    // Do something.
    asyncA(request, function (data) {
        // Do something
        asyncB(request, function (data) {
            // Do something
            asyncC(request, function (data) {
                // Do something
                callback(data);
            });
        });
    });
}

http.createServer(function (request, response) {
    var d = domain.create();

    d.on('error', function () {
        response.writeHead(500);
        response.end();
    });

    d.run(function () {
        async(request, function (data) {
            response.writeHead(200);
            response.end(data);
        });
    });
});
```

可以看到，我们使用`.create`方法创建了一个子域对象，并通过`.run`方法进入需要在子域中运行的代码的入口点。而位于子域中的异步函数回调函数由于不再需要捕获异常，代码一下子瘦身很多。

**陷阱**

无论是通过`process`对象的`uncaughtException`事件捕获到全局异常，还是通过子域对象的`error`事件捕获到了子域异常，在NodeJS官方文档里都强烈建议处理完异常后立即重启程序，而不是让程序继续运行。按照官方文档的说法，发生异常后的程序处于一个不确定的运行状态，如果不立即退出的话，程序可能会发生严重内存泄漏，也可能表现得很奇怪。

但这里需要澄清一些事实。JS本身的`throw..try..catch`异常处理机制并不会导致内存泄漏，也不会让程序的执行结果出乎意料，但NodeJS并不是存粹的JS。NodeJS里大量的API内部是用C/C++实现的，因此NodeJS程序的运行过程中，代码执行路径穿梭于JS引擎内部和外部，而JS的异常抛出机制可能会打断正常的代码执行流程，导致C/C++部分的代码表现异常，进而导致内存泄漏等问题。

因此，使用`uncaughtException`或`domain`捕获异常，代码执行路径里涉及到了C/C++部分的代码时，如果不能确定是否会导致内存泄漏等问题，最好在处理完异常后重启程序比较妥当。而使用`try`语句捕获异常时一般捕获到的都是JS本身的异常，不用担心上诉问题。

### 小结

本章介绍了JS异步编程相关的知识，总结起来有以下几点：

- 不掌握异步编程就不算学会NodeJS。
- 异步编程依托于回调来实现，而使用回调不一定就是异步编程。
- 异步编程下的函数间数据传递、数组遍历和异常处理与同步编程有很大差别。
- 使用`domain`模块简化异步代码的异常处理，并小心陷阱。

## util

**命令行中打印对象深层属性内容**

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

# npm

npm 由三个独立的部分组成：

- 网站
- 注册表（registry）
- 命令行工具 (CLI)

## npx

NPX 是一个 Node.js 包运行工具，它随 npm 自 5.2.0 版本起自动安装。NPX 允许您运行 npm 包中的可执行文件，而无需全局安装这些包。它的主要用途包括：

1. **运行项目本地 bin**：`npx webpack ...`
2. **无需本地安装，一次性执行**：`npx webpack ..`
3. **从 GitHub 仓库调用命令**：`npx github:username/repo` 例如，使用 `npx github:piuccio/cowsay` 或 `npx git+ssh://my.hosted.git:cowsay.git#semver:^1` 来运行 GitHub 上的代码
4. **使用指定 Node.js 版本运行命令**：`npx -p node@8 npm run build`
5. **运行不同版本的包**：`npx eslint@6.1.0 ..`
6. **执行命令的同时开启 Node.js 的调试模式**：`npx --node-arg=--inspect cowsay`，`--inspect` 标志使 Node.js 在指定端口（默认是 `127.0.0.1:9229`）上监听调试器的连接。这允许开发者使用调试工具（如 Chrome DevTools）连接到正在运行的 Node.js 进程，进行断点设置、代码步进、性能分析等调试操作。这对于开发和调试 Node.js 应用非常有用。

NPX 的这些特性使得在不污染全局命名空间的情况下，更加便捷地使用和测试 npm 包成为可能。

## npm基础使用

**基础命令**：

```bash
# 当要安装的程序包提供了可执行命令且可在项目间复用时，则应全局安装。其余情况都应该在项目本地安装。
# 安装所有依赖
npm install
# 只安装生产环境依赖
npm install --production
# 安装某个依赖的最新版本
npm install <package-name>
# 安装某个依赖的指定版本
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

#清除缓存
npm cache clean/clear/rm --force

#npm配置
npm config set key value
npm config get key
#查看当前激活的配置
npm config ls
#查看所有默认配置
npm config ls -l
npm config delete key
npm config edit

#查看软件包版本及其依赖项
npm ls [[<@scope>/]<pkg>] [-g]

#查看所有命令
npm help

#用于在 npm 注册表中搜索包（模糊搜索）
npm search package-name

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

#查看某个包的具体信息
npm view <package-name>
# 查看软件包在 npm 仓库上最新的可用版本
npm view <package-name> version
# 列出软件包所有的以前的版本
npm view <package-name> versions
#查看某个包的所有依赖
npm view <package-name> dependencies
#查看某个包的某个版本的某个依赖项的版本
npm view yui3@'>0.5.4' dependencies.jsdom
#查看某个包的源码仓库地址
npm view <package-name> repository.url

#查看包的源码仓库
npm repo vue
```

**全局 node_modules 位置**

* `npm root -g` 命令会告知全局安装的 node_modules 在计算机上的确切位置。

  * 在 macOS 或 Linux 上，此位置可能是 `/usr/local/lib/node_modules`。 

  * 在 Windows 上，可能是 `C:\Users\YOU\AppData\Roaming\npm\node_modules`。

  * 使用 `nvm`，则软件包的位置可能为 `/Users/joe/.nvm/versions/node/v8.9.0/lib/node_modules`。


* `npm bin [-g]` 命令可以显示npm的bin文件夹的路径。npm 包是可执行文件时。
  * 全局安装的可执行命令是放在 `/usr/local/bin` 目录下，使用 `nvm` 的话是在 `/Users/Joe/.nvm/versions/node/v8.17.0/bin/` 目录下，直接使用全局命令运行。
  * 本地安装它会把可执行文件放到 `node_modules/.bin/`文件夹下。可以输入文件位置来运行它：`./node_modules/.bin/cowsay`；或者使用 `npx` 来运行：`npx cowsay`，`npx` 会找到程序包的位置。

## npm发布及其更新

**发布npm包**

1. **创建用户帐户**：要发布，您必须是 npm 注册表的用户。

   1. 如果您不是用户，请创建帐户 `npm adduser`。
   2. 如果您在网站上创建了用户帐户，请使用`npm login`从终端访问您的帐户。

2. **测试是否登录成功**：

   1. 从终端输入`npm whoami [--registry <registry>]`以查看您是否已经登录（从技术上讲，这也意味着您的凭据已存储在本地）。
   2. 检查您的用户名是否已添加到注册表中：[https://npmjs.com/~username](https://npmjs.com/~).

3. **查看包目录**

   1. 查看内容

      请注意，除非被本地`.gitignore`或`.npmignore`文件忽略，否则目录中的所有内容都将被包含在内。

   2. 查看 package.json 文件

      * 为您的包选择一个唯一的包名，install和import的就是这个名字。先到npm搜索有没有被用过。
      * 版本号：从 1.0.0 开始

      * 选择一个描述性名称。

   3. 包含文档 (readme.md)

      npm 建议您包含一个自述文件来记录您的包。自述文件必须具有文件名`readme.md`。当有人找到你的包时，该文件将出现在 npm 网站上。

4. **发布**

   `npm publish`

5. **测试是否发布成功**

   去`https://npmjs.com/package/<package>`。您应该会看到一个关于您的新包的页面。

**更新npm包**

1. **先提交 git**

2. **然后运行如下 `npm version` 命令**

   该命令会自动更新`package.json`中的 npm 版本号，并且自动 git 提交一次版本号的更新，且自动的帮你打上一个版本号的 git tag，最后提交到`package.json`中设置的 git 远程仓库。

   * 升级补丁版本号：npm version patch

   * 升级小版本号：npm version minor

   * 升级大版本号：npm version major

3. **发布**

   `npm publish`

4. **测试版本是否更新成功**

   去`https://npmjs.com/package/<package>`。包版本号应更新。

**发布私有npm包**

查看[文档](https://www.npmjs.cn/getting-started/scoped-packages/)

# nvm/n/nrm

nvm和n用于管理 Node.js 的不同版本。nrm用于管理和切换不同的 npm 源（registry）。

**nvm**

```bash
#安装nvm(mac/linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
brew install nvm
#安装最新稳定版本node
nvm install node
#安装指定版本node
nvm install 14.7.0
#查看所有可用的node版本
nvm ls-remote
#查看本地已经安装过的版本
nvm ls
#使用指定版本的node
nvm use v14.8.0
#卸载指定版本node
nvm uninstall v14.8.0
```

**n**

```bash
#安装
npm install -g n
#安装最新稳定版本node
n lts
#安装指定版本node
n [install] 10.16.0
#查看所有可用的node版本
n ls-remote --all
#查看本地已经安装过的版本
n ls
#使用指定版本的node
n #从列表中选择所需版本
n 0.9.4 #使用指定版本node
#卸载指定版本node
n rm 0.9.4
```

**nrm**

```bash
#安装
npm install -g nrm
#列出所有可用的npm源
nrm ls
#切换到指定源
nrm use [源名称]
#删除指定源
nrm del [源名称]
```

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

# nestjs

## 安装

\>=node16

```bash
#安装NestCLI
npm i -g @nestjs/cli
#创建项目
nest new project-name
#创建支持ts项目
nest new project-name --strict
```

## 控制器

控制器负责处理传入请求并向客户端返回响应。

控制器的目的是接收应用的特定请求。路由机制控制哪个控制器接收哪些请求。通常，每个控制器都有不止一条路由，不同的路由可以执行不同的操作。

为了创建基本控制器，我们使用类和装饰器。装饰器将类与所需的元数据相关联，并使 Nest 能够创建路由映射（将请求绑定到相应的控制器）。

要使用 CLI 创建控制器，只需执行`$ nest g controller [name]`命令即可。

必须声明一个方法来绑定路由。

控制器必须使用`@Controller()`装饰器，且可以传入路由前缀。

示例：

`cats.controller.ts`

```ts
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
```

`app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

## 提供者

## 模块

## 三层架构示例

以下是一个简单的 Nest.js 应用的完整例子，其中包括控制器层、服务层和数据访问层。在这个例子中，我们创建了一个简单的 Cats 应用，用于管理猫的信息。

1. **数据模型（数据访问层）：**

   ```ts
   // cat.entity.ts
   import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
   
   @Entity()
   export class Cat {
     @PrimaryGeneratedColumn()
     id: number;
   
     @Column()
     name: string;
   }
   ```

2. **数据访问服务（数据访问层）：**

   ```ts
   // cats.service.ts
   import { Injectable } from '@nestjs/common';
   import { InjectRepository } from '@nestjs/typeorm';
   import { Repository } from 'typeorm';
   import { Cat } from './cat.entity';
   
   @Injectable()
   export class CatsService {
     constructor(
       @InjectRepository(Cat)
       private catRepository: Repository<Cat>,
     ) {}
   
     async findAll(): Promise<Cat[]> {
       return this.catRepository.find();
     }
   
     async create(cat: Cat): Promise<Cat> {
       return this.catRepository.save(cat);
     }
   }
   ```

3. **控制器（控制器层）：**

   ```ts
   // cats.controller.ts
   import { Controller, Get, Post, Body } from '@nestjs/common';
   import { CatsService } from './cats.service';
   import { Cat } from './cat.entity';
   
   @Controller('cats')
   export class CatsController {
     constructor(private catsService: CatsService) {}
   
     @Get()
     async findAll(): Promise<Cat[]> {
       return this.catsService.findAll();
     }
   
     @Post()
     async create(@Body() cat: Cat): Promise<Cat> {
       return this.catsService.create(cat);
     }
   }
   ```

4. **应用模块（主模块）：**

   ```ts
   // app.module.ts
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { CatsController } from './cats/cats.controller';
   import { CatsService } from './cats/cats.service';
   import { Cat } from './cats/cat.entity';
   
   @Module({
     imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Cat])],
     controllers: [CatsController],
     providers: [CatsService],
   })
   export class AppModule {}
   ```

5. **应用入口文件（main.ts）：**

   ```ts
   // main.ts
   import { NestFactory } from '@nestjs/core';
   import { AppModule } from './app.module';
   
   async function bootstrap() {
     const app = await NestFactory.create(AppModule);
     await app.listen(3000);
   }
   bootstrap();
   ```

在这个例子中，我们使用了 Nest.js 中的 `TypeOrmModule` 来进行数据库交互。整个应用分为控制器层（`CatsController`）、服务层（`CatsService`）和数据访问层（`Cat` 数据模型和 `TypeOrmModule` 的配置）。通过这种结构，我们能够更好地组织代码、实现业务逻辑，并且具备了良好的可测试性和可维护性。

# koa

## koa-middleware

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

## koa-router

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

## koa-bodyparser

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

## 实现 koa 框架

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

