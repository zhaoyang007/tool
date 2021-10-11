/*
 * @Author: your name
 * @Date: 2021-09-06 22:40:22
 * @LastEditTime: 2021-10-11 15:18:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tool/前端知识体系/架构/lianxi/app.js
 */
/*
 * @Author: your name
 * @Date: 2021-09-06 21:23:42
 * @LastEditTime: 2021-09-10 11:20:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tool/前端知识体系/架构/练习.js
 */
// node server 基础
// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello Worrd!');
// });
// const hostname = '127.0.0.1';
// const port = '9000';

// server.listen(port, hostname, () => {
//     console.log(`server is listening on ${hostname}:${port}`);
// });
// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World!!!!');
// });
// const hostname = 'localhost';
// const port = 9000;
// server.listen(port, hostname, () => {
//     console.log(`server is listening on ${hostname}:${port}`);
// });
// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('hhhhh');
// });
// const hostname = '127.0.0.1';
// const port = 9000;
// server.listen(port, hostname, () => {
//     console.log(`server is listening on ${hostname}:${port}`);
// });
// setTimeout(() => {
//     process.exit(1);
// }, 2000);
// console.log(process.env);
// console.log(process.env.NODE_ENV);
// console.log(process.argv)
// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World!');
// });
// const hostname = '127.0.0.1';
// const port = '9000';
// server.listen(3000, () => {
//     console.log(`server is listening on ${hostname}:${port}`);
// });
// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('hhhhhh')
// });
// const hostname = '127.0.0.1';
// const port = 3000;
// server.listen(port, hostname, () => {
//     console.log(`server is listening on ${hostname}:${port}`);
// });
// const path = require('path');
// console.log(path.resolve('conf.js'));
// 搭建node服务器
// const http = require('http');
// const server = http.createServer((req, res) => {
//     let data = '';
//     req.on('data', chunk => {
//         data += chunk;
//     });
//     req.on('end', () => {
//         JSON.parse(data).todo;
//     });
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World!');
// });
// const hostname = '127.0.0.1';
// const port = 3000;
// server.listen(port, hostname, () => {
//     console.log(`server is listening on ${hostname}:${port}`);
// });
// const http = require('http');
// const server = http.createServer((req, res) => {
//     let data = '';
//     req.on('data', chunk => {
//         data += chunk;
//     });
//     res.on('end', () => {
//         JSON.parse(data).todo;
//     });
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello Node!');
// });
// const hostname = '127.0.0.1';
// const port = 3000;
// server.listen(port, hostname, () => {
//     console.log(`server is listening on ${hostname}:${port}`);
// });
// 从路径中获取信息
// const path = require('path');
// const url = '/users/joe/notes.txt';
// console.log(path.dirname(url));
// console.log(path.basename(url));
// console.log(path.extname(url));
// console.log(path.basename(url, path.extname(url)));
// 使用路径
// const path = require('path');
// console.log(path.normalize('/users/joe/..//./conf.js'));
// console.log(process.cwd());
// console.log(path.resolve('tmp', 'app.js'));
// console.log(path.resolve('./'));
// path
// let url = '/users/joe/test.txt'
// console.log
// console.log(process.argv)
// console.log(process.execArgv)
// const minimist = require('minimist');
// // console.log(process.argv.slice(2))
// const argvs = process.argv.slice(2);
// console.log(process.cwd());
// console.log({a:1})
// console.log('%o', Number)
// const chalk = require('chalk');
// console.log(chalk.red('nihao'))
// const ProgressBar = require('progress');
// const bar = new ProgressBar(':bar', {total: 10});
// const timer = setInterval(() => {
//     bar.tick();
//     if (bar.complete) {
//         clearInterval(timer);
//     }
// }, 100);
// const http = require('http');
// const server = http.createServer((req, res) => {
// });
// const hostname = '127.0.0.1';
// const port = 9000;
// server.listen(port, hostname, () => {
//     console.log(`server is listening on ${hostname}:${port}`);
// });
// const https = require('https')

// const data = JSON.stringify({
//   todo: '做点事情'
// })

// const options = {
//   hostname: 'nodejs.cn',
//   port: 443,
//   path: '/todos',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Length': data.length
//   }
// }

// const req = https.request(options, res => {
//   console.log(`状态码: ${res.statusCode}`)

//   res.on('data', d => {
//     process.stdout.write(d)
//   })
// })

// req.on('error', error => {
//   console.error(error)
// })

// req.write(data)
// req.end()
// console.log(process.argv)
// const args = require('minimist')(process.argv.slice(2))
// console.log(args);
// console.log(args.name);
// console.log('%o', Number)
// console.log('我的%s已经%d岁', '猫', 2)
// const x = 1
// const y = 2
// const z = 3
// console.count(
//   'x 的值为 ' + x + ' 且已经检查了几次？'
// )
// console.count(
//   'x 的值为 ' + x + ' 且已经检查了几次？'
// )
// console.count(
//   'y 的值为 ' + y + ' 且已经检查了几次？'
// )
// const oranges = ['橙子', '橙子']
// const apples = ['苹果']
// oranges.forEach(fruit => {
//   console.count(fruit)
// })
// apples.forEach(fruit => {
//   console.count(fruit)
// })
// const doSomething = () => console.log('测试')
// const measureDoingSomething = () => {
//   console.time('doSomething()')
//   //做点事，并测量所需的时间。
//   doSomething()
//   console.timeEnd('doSomething()')
// }
// measureDoingSomething()
// const http = require('http');
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World!');
// });
// const hostname = '127.0.0.1';
// const port = 9000;
// server.listen(port, hostname, () => {
//   console.log(`server is listening at ${hostname}:${port}`);
// });
// const fs = require('fs');
// const path = require('path');
// console.log(fs.readdirSync('./src'));
// fs.readdirSync('./src').map(filename => {
//   console.log(path.join('/src', filename));
// })
// console.log(fs.statSync('./src/a').isFile());
// const isFile = filename => {
//   return fs.lstatSync(filename).isFile();
// };
// console.log(
//   fs.readdirSync('/')
    // .map(filename => {
    //   return path.join('./src', filename);
    // })
    // .filter(isFile)
// );
// try {
//   fs.renameSync('./src/b', './src/c')
// } catch (error) {
//   console.log(error);
// } 
// fs.rename('./src/b.txt', './src/c.txt', err => {
//   // if (err) throw err;
// })
// fs.rmdir('./src/b', err => {
//   console.error(err)
// })
// const fs = require('fs');
// fs.remove('./src/b', err => {
//   console.err(err);
// })
// console.log(fs.readdirSync('src'));
// fs.unlink('./src/a.txt', err => {});
// console.log(fs.lstatSync('./src/c/c.txt').isFile());
// fs.watchFile('./src', (eventType, filename) => {
//   console.log(filename)
// })
// const rs = fs.createReadStream('./src/aa.txt');
// rs.pipe(process.stdout);
// const ws = fs.createWriteStream('./src/test.txt');
// ws.write('hahahaha!');
// ws.end();
// ws.on('finish', () => {
//   console.log('done!');
// });
// const http = require('http');
// // console.log(http.STATUS_CODES['404']);
// const server = http.createServer((req, res) => {
// 	// 使用此回调处理每个单独请求
//   res.writeHead(200, { 'Content-Type': 'application/json'});
//   res.end(JSON.stringify({
//     data: 'hello world!'
//   }));
// });
// server.listen(8000)
// const buf = Buffer.from('Hey!');
// console.log(buf[0]);
// console.log(buf[1]);
// console.log(buf[2]);
// console.log(buf[4]);
// console.log(buf.toString());
// const buf = Buffer.from('Hey!')
// let bufcopy = Buffer.alloc(4) //分配 4 个字节。
// buf.copy(bufcopy)
// console.log(bufcopy.toString());
// const http = require('http');
// http.get('http://localhost:8000/', (res) => {
//   const { statusCode } = res;
//   const contentType = res.headers['content-type'];

//   let error;
//   // 任何 2xx 状态码都表示成功响应，但这里只检查 200。
//   if (statusCode !== 200) {
//     error = new Error('Request Failed.\n' +
//                       `Status Code: ${statusCode}`);
//   } else if (!/^application\/json/.test(contentType)) {
//     error = new Error('Invalid content-type.\n' +
//                       `Expected application/json but received ${contentType}`);
//   }
//   if (error) {
//     console.error(error.message);
//     // 消费响应数据以释放内存
//     res.resume();
//     return;
//   }
//   res.setEncoding('utf8');
//   let rawData = '';
//   res.on('data', (chunk) => { rawData += chunk; });
//   res.on('end', () => {
//     try {
//       const parsedData = JSON.parse(rawData);
//       console.log(parsedData);
//     } catch (e) {
//       console.error(e.message);
//     }
//   });
// }).on('error', (e) => {
//   console.error(`Got error: ${e.message}`);
// });
// 创建本地服务器来从其接收数据
// const server = http.createServer((req, response) => {
// //   res.writeHead(200, { 'Content-Type': 'application/json' });
//     response.setHeader('Content-Type', 'text/html');
//     // response.setHeader('Content-Length', Buffer.byteLength(body));
//     response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
//     const contentType = response.getHeader('content-type');
//     console.log(contentType);
//     // contentType 是 'text/html'
//     const contentLength = response.getHeader('Content-Length');
//     // contentLength 是数字类型
//     const setCookie = response.getHeader('set-cookie');
//     console.log(typeof setCookie);
//     // setCookie 是 string[] 类型
//     response.end(JSON.stringify({
//         data: 'Hello World!'
//     }));
// });
// server.listen(8000);
// const url = require('url');
// const http = require('http');
// const server = http.createServer((req, res) => {
//     let params = url.parse(req.url, true).query;
//     // console.log('new URL', new URL(req.url, `http://${req.headers.host}`));
//     console.log(params);
//     res.end('123')
// });
// server.listen(8000);
// const http = require('http');
// http.get('http://localhost:8000/', (res) => {
//   const { statusCode } = res;
//   const contentType = res.headers['content-type'];
//   let error;
//   // 任何 2xx 状态码都表示成功响应，但这里只检查 200。
//   if (statusCode !== 200) {
//     error = new Error('Request Failed.\n' +
//                       `Status Code: ${statusCode}`);
//   } else if (!/^application\/json/.test(contentType)) {
//     error = new Error('Invalid content-type.\n' +
//                       `Expected application/json but received ${contentType}`);
//   }
//   if (error) {
//     console.error(error.message);
//     // 消费响应数据以释放内存
//     res.resume();
//     return;
//   }
//   res.setEncoding('utf8');
//   let rawData = '';
//   i = 0
//   res.on('data', (chunk) => { rawData += chunk;i++; });
//   res.on('end', () => {
//     try {
//       const parsedData = JSON.parse(rawData);
//       console.log(parsedData);
//     } catch (e) {
//       console.error(e.message);
//     }
//   });
// }).on('error', (e) => {
//   console.error(`Got error: ${e.message}`);
// });
// // 创建本地服务器来从其接收数据
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify({
//     data: 'Hello World!'
//   }));
// });
// server.listen(8000);
// brew install node
// nvm install 10.15.3
// nvm install 10.15.3
// 官网下载安装包
// 当程序包提供了可从shell运行的可执行命令并且可以在项目间复用时
// 当要安装的程序包提供了可在命令行shell运行的可执行命令并且可在项目间复用的时候，应该全局安装，其余情况都应该在项目本地安装。
// node 安装
// brew install node
// nvm install 10
// 官网下载安装包
// npm 安装
// 安装所有依赖
// npm install
// 安装某个依赖
// npm install <package-name>
// 安装某个依赖的指定版本
// npm install <package-mame>@<version>
// 卸载某个依赖
// npm uninstall <package-name>
// 按依赖安装时的方式卸载
// npm uninstall -S <package-name>
// npm uninstall -D <package-name>
// npm uninstall -g <package-name>
// 重装某个依赖
// npm uninstall <package-name>
// npm install <package-name>
// 重装所有依赖
// rm -rf node_modules && npm cahce clean -force && npm install
// 发觉软件包新版本
// npm outdated
// 更新所有依赖, update永远不会跟新主版本
// npm update
// 更新某个依赖
// npm update <package-name>
// 更新到主版本
// npm install -g npm-check-updates
// ncu -u
// npm update
// 投入生产环境，只安装生产依赖
// npm install --production
// npm install -g npm-check-updates
// ncu -u
// npm update
// npm outdated
// npm list
// npm list -g
// npm list --depth=0
// npm list -g --depth=0
// npm list -g --depth 0
// npm list <package-name>
// npm view <package-name> version
// npm view <package-name> versions
// npm root -g
// ./node_modules/.bin/saycow
// npx cowsay
// npm root -g
// const process = require('process');
// const minimist = require('minimist');
// process.exit(1);
// console.log(process.cwd())
// console.log(process.env.NODE_ENV)
// console.log(process.argv)
// console.log(process.argv.slice(2));
// console.log(process.execArgv);
// const args = minimist(process.argv.slice(2));
// console.log(args.a, args.b);
// const minimist = require('minimist');
// console.log(minimist(process.argv.slice(2)).a, minimist(process.argv.slice(2)).b);
// 从给定的path路径中获取信息
// const path = require('path');
// const paths = '/users/joe/app.js';
// console.log(path.dirname(paths));
// console.log(path.basename(paths));
// console.log(path.extname(paths));
// 可以指定basename的第二个参数来去掉文件后缀名
// console.log(path.basename(paths, path.extname(paths)));
// const path = require('path');
// console.log(path.normalize('./users/log/../a/b/c//d.js'));
// console.log(path.join(__dirname, 'b/c.js'));
// console.log(path.resolve('/b','c.txt','a.js'));
// console.log(path.relative('/d/c.js', '/a/b/c'));
// console.log(path.parse('/a/b/c/d/e.js'));
// const url = {
//     root: '/',
//     dir: 'a/b',
//     base: 'c.js',
//     ext: '.js',
//     name: 'e'
// }
// console.log(path.format(url));
// console.log(path.isAbsolute('//bab'));
// console.log(__filename);
// const fs = require('fs');
// fs.stat('./lianxi/package.json', (err, stats) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
//     console.log(stats.size);
// })
// fs.readFile('./package.json', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(JSON.parse(data.toString()).name);
// })
// try {
//     const data = fs.readFileSync('package.json', 'utf-8');
//     console.log(typeof data);
// } catch(err) {
//     console.error(err);
// }
// fs.unlink('a.txt', err => {
//     if (err) throw err;
// })
// const fs = require('fs');
// fs.writeFile('./a.txt', 'bbbb', 'utf8', (err) => {
//     if (err) throw err;
//     console.log('写入成功');
// });
// try {
//     fs.writeFileSync('./a.txt', 'ddd', { flag: 'a' });
//     console.log('写入成功');
// } catch(err) {
//     throw err;
// }
// fs.appendFile('a.txt', 'ggggg', err => {
//     if (err) throw err;
//     console.log('done');
// })
// const rs = fs.createReadStream('a.txt');
// rs.pipe(process.stdout);
// const ws = fs.createWriteStream('a.txt');
// ws.write('hhh');
// ws.write('iii')
// ws.end();
// ws.on('finish', () => {
//     console.log('done!');
// });
// fs.access('a.txt', err => {
//     if (err) {
//         console.error('不存在');
//         return;
//     };
//     console.log('存在')
// });
// try {
//     fs.accessSync('a.txt');
//     console.log(a);
// } catch(err) {
//     console.error(err);
// }
// try {
//     if (!fs.existsSync('a')) {
//         fs.mkdirSync('a');
//     }
// } catch(err) {
//     console.error(err);
// }
// fs.mkdir('a', err => {
//     if (err) throw err;
//     console.log('done');
// })
// const path = require('path');
// // const dir = fs.readdirSync('./src').map(name => path.join('./src', name));
// const dir = fs.readdirSync('src').filter(name => {
//     // console.log(name);
//     return fs.statSync('src/' + name).isFile();
// });
// console.log(dir);
// const fs = require('fs');
// const fs = require('fs-extra');
// // fs.rmdirSync('./src/d');
// fs.remove('./src/c/c.txt', err => {
//     // if (err) throw err;
//     console.log('done');
// })
// node 安装
// brew install node
// nvm install 10
// 官网下载安装包安装
// npm 
// 安装所有依赖
// npm install
// 安装某个依赖
// npm install <package-name>
// 安装指定版本
// npm install <package-name>@10.10.2
// 删除某个依赖
// npm uninstall <package-name>
// 按安装方式删除，这样能够修改package.json的内容
// npm uninstall -S <package-name>
// npm uninstall -D <package-name>
// npm uninstall -g <package-name>
// 重装某个依赖
// npm uninstall <package-name>
// npm install <package-name>
// 重装所有依赖
// rm -rf node_modules && npm cache clean --force && npm install
// 发现软件包新版本
// npm outdated
// npm outdated
// 更新某个依赖
// npm update <package-name>
// 更新所有依赖
// npm update
// npm update
// npm update <package-name>
// 永远不会更新主版本
// 使用 npm-check-updates 可以更新主版本
// npm install np-check-updates
// ncu -u
// npm update
// 投入生产环境的时候要使用--production来安装线上依赖，默认是开发环境
// npm install --production
// 查看npm 软件包版本
// npm list
// npm list -g
// 查看顶层软件包
// npm list --depth=0
// npm list --depth 0
// npm list -g --depth=0
// npm list -g --depth 0
// npm list <package-name>
// 查看软件包在npm上的罪行版本
// npm view <package-name> version
// 查看软件包以前的所有版本
// npm view <package-name> versions
// 查看全局node_modules软件包的位置
// npm root -g
// ./node_modules/.bin/cowsay
// npx cowsay
// process
// 退出进程
// process.exit(1)
// 查看当前命令执行的绝对路径，和linux pwd命令是一样的。
// process.cwd();
// 获取环境变量
// process.env.NODE_ENV
// 从命令行接收参数
// 第一个参数是node命令的位置，第二个参数是正在执行的文件的位置
// 从第三个开始才是执行命令传进去的参数
// console.log(process.execPath);
// console.log(process.argv.slice(2));
// 使用minimist库来处理参数
// 参数前面必须加--
// const minimist = require('minimist');
// const args = process.argv.slice(2);
// console.log(minimist(args));
// console.log(minimist(args).a);
// console.log(minimist(args).b);
// path
// 从路径中获取信息
// const path = require('path');
// const url = '/users/a/b/c.js'
// console.log(path.dirname(url));
// console.log(path.basename(url));
// console.log(path.extname(url));
// console.log(path.basename(url, path.extname(url)));
// 使用路径
// const path = require('path');
// console.log(path.normalize('/a/b/c//../d/e.js'));
// console.log(path.join('/a', 'b', '../', 'c'));
// console.log(path.resolve('/a/b/c.js'));
// console.log(path.relative('a/b', 'c.js'));
// console.log(path.parse('./a/b/c/d/e.js'));
// let url = {
//     root: '../',
//     // dir: '/a/b/c',
//     name: 'd',
//     ext: '.js'
// }
// console.log(path.format(url));
// console.log(path.isAbsolute('/'));
// __dirname
// process.cwd()
// path.resolve()
// const http = require('http');
// http.get('http://localhost:8000/', (res) => {
//   const { statusCode } = res;
//   const contentType = res.headers['content-type'];

//   let error;
//   // 任何 2xx 状态码都表示成功响应，但这里只检查 200。
//   if (statusCode !== 200) {
//     error = new Error('Request Failed.\n' +
//                       `Status Code: ${statusCode}`);
//   } else if (!/^application\/json/.test(contentType)) {
//     error = new Error('Invalid content-type.\n' +
//                       `Expected application/json but received ${contentType}`);
//   }
//   if (error) {
//     console.error(error.message);
//     // 消费响应数据以释放内存
//     res.resume();
//     return;
//   }

//   res.setEncoding('utf8');
//   let rawData = '';
//   res.on('data', (chunk) => { rawData += chunk; });
//   res.on('end', () => {
//     try {
//       const parsedData = JSON.parse(rawData);
//       console.log(parsedData);
//     } catch (e) {
//       console.error(e.message);
//     }
//   });
// }).on('error', (e) => {
//   console.error(`Got error: ${e.message}`);
// });

// // 创建本地服务器来从其接收数据
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify({
//     data: 'Hello World!'
//   }));
// });

// server.listen(8000);
// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World!');
// });
// const hostname = '127.0.0.1';
// const port = 8000;
// server.listen(port, hostname, () => {
//     console.log(`server is listening at ${hostname}:${port}`);
// });
// const http = require('http');
// const server = http.createServer((req, res) => {
//     let data = '';
//     req.on('data', chunk => {
//         data += chunk;
//     });
//     req.on('end', () => {
//         console.log('server recived data:', JSON.parse(data).msg);
//     });
//     res.end('hello world2222');
// })
// server.listen(8000);


// const postData = JSON.stringify({
//     msg: 'hello world'
// });
// const options = {
//     hostname: 'localhost',
//     port: 8000,
//     path: '/',
//     methods: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': Buffer.byteLength(postData),
//     }
// }
// const request = http.request(options, res => {
//     console.log(`STATUS: ${res.statusCode}`);
//     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//     // res.setEncoding('utf8');
//     res.on('data', chunk => {
//         console.log(`send request recived data: ${chunk}`);
//     });
//     res.on('end', () => {
//         console.log('响应数据接收成功');
//     });
// });
// request.on('error', err => {
//     console.error(err.message);
// });
// // 将请求数据写入请求正文
// request.write(postData);
// request.end();
// const http = require('http');
// http.get('http://localhost:8000/', res => {
//     const { statusCode } = res;
//     const contentType = res.headers['Content-Type'];
//     let error;
//     if (statusCode !== 200) {
//         error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
//     } else if (!/^application\/json/.test(contentType)) {
//         error = new Error('Invalid content-type.\n' + `Expected application/json but received ${contentType}`);
//     }
//     if (error) {
//         console.error(error.message);
//         res.resume();
//         return;
//     }
//     res.setEncoding('utf8');
//     let data = '';
//     res.on('data', chunk => {
//         data += chunk;
//     });
//     res.on('end', () => {
//         try {
//             console.log(JSON.parse(data));
//         } catch(err) {
//             console.error(err.message);
//         }
//     });
// }).on('error', err => {
//     console.error(err);
// });

// http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'application/json'
//     });
//     res.end(JSON.stringify({
//         data: 'hello world'
//     }));
// });
// http.listen(8000);
// res.setHeader('Content-Type', 'application/json');
// res.getHeader('content-type')
// res.getHeaderNames();
// res.getHeaders();
// res.hasHeader('Content-Type')
// res.removeHeader('Content-Type')
// res.statusCode = 200
// res.statusMessage = 'Not Found'
// request.url
// request.method
// request.headers
// request.statusCode
// request.statusMessage
// request.setEncoding('utf8')
// request.on('data', chunk => {

// });
// request.on('end', () => {

// });
// const http = require('http');
// const qs = require('querystring');
// const data = JSON.stringify({a: '456'});
// const options = {
//     hostname: 'localhost',
//     port: 8000,
//     url: '/',
//     method: 'POST',
//     header: {
//         'Content-Type': 'application/json',
//         'Content-Length': Buffer.byteLength(data)
//     }
// }
// const req = http.request(options, res => {

// })
// req.write(data)
// req.end();
// const server = http.createServer((req, res) => {
//     req.setEncoding('utf8')
//     let postdata = '';
//     let a = ''
//     // if (req.method === 'POST') {
//         req.on('data', chunk => {
//             postdata += chunk;
//         });
//         req.on('end', () => {
//             console.log(postdata);
//             a = JSON.parse(postdata).a;
            
//         });
//     // }
//     // const a = JSON.parse(postdata) || '123';
//     res.end(a || '123');
// });
// server.listen(8000);
// node 安装
// 1.brew install node
// 2.nvm install 10
// 3.官网下载安装包安装
// npm 
// npm install <package-name>
// npm install
// npm install <package-name>@10.0.1
// npm uninstall <package-name>
// rm -rf node_modules && npm cache clean --force
// npm outdated
// npm update
// npm install -g npm-check-updates
// ncu -u
// npm update
// npm install --production
// npm list
// npm list -g
// npm list --depth 0
// npm list -g --depth=0
// npm view <package-name> version
// npm view <package-name> versions
// npm root -g
// ./node_modules/.bin/cowsay
// npx cowsay
// process.exit(1)
// process.cwd()
// process.env.NODE_ENV
// process.argv
// npm install minimist
// const minimist = require('minimist');
// args = minimist(process.argv.slice(2));
// node app.js --a=1 --b=2
// args.a = 1
// args.b = 2;
// const path = require('path')
// console.log(path.normalize('/a/b/c/d/..//e'));
// console.log(path.join('a', 'b', '..', 'b', 'b'));
// console.log(path.resolve('a', '/b', 'c'));
// console.log(path.relative('a/', 'a/b'));
// console.log(path.parse('/a/b/c/d.js'));
// const url = {
//     root: '/q/v',
//     dir: 'a/c',
//     base: 'a/b.js',

// }
// console.log(path.format(url));
// console.log(path.isAbsolute('a'));
// const path = require('path')
// const url = '/a/b/c/d.js'
// console.log(path.dirname(url));
// console.log(path.basename(url));
// console.log(path.extname(url));
// console.log(path.basename(url, path.extname(url)));
// node 安装
// brew install node
// nvm install 10
// 官网下载安装包
// npm 安装依赖
// npm install <package-name>
// npm install <package-name>@10.9.2
// npm install -S <package-name>
// npm install -D <package-name>
// npm install -g <package-name>
// npm install
// npm install --production
// npm uninstall <package-name>
// npm uninstall -S <package-name>
// npm uninstall -D <package-name>
// npm uninstall -g <package-name>
// rm -rf node_modules && npm cache clean --force
// npm update <package-name>
// npm undate
// npm install -g npm-check-updates
// ncu -u
// npm update
// npm outdated
// npm list
// npm list -g
// npm list --depth=0
// npm list -g --depth 0
// npm list <package-name>
// npm view <package-name> version
// npm view <package-name> versions
// npm root -g
// ./node_modules/.bin/cowsay
// npx cowsay
// process.exit(1)
// process.cwd()
// process.env.NODE_ENV
// console.log(process.argv);
// const minimist = require('minimist');
// console.log(minimist(process.argv.slice(2)));
// 参数需要加--
// path
// 从路径中获取信息
// const path = require('path')
// const url = '/a/b/c/d.js'
// console.log(path.dirname(url));
// console.log(path.basename(url));
// console.log(path.extname(url));
// console.log(path.basename(url, path.extname(url)));
// 使用路径
// console.log(path.normalize('/a/b/c/d//e/..//f.js'));
// console.log(path.join('a','/b', 'c'));
// console.log(path.resolve('a', 'b', 'b'));
// console.log(path.resolve('c', 'd'));
// console.log(path.parse('/a/b/c/d.js'));
// const url = {
//     root: '/',
//     // dir: '/a/b',
//     // base: 'c.js',
//     name: 'c',
//     ext: '.js'
// }
// console.log(path.format(url));
// console.log(path.relative('/a', '/a/b.js'));
// console.log(path.isAbsolute("a"));
// __dirname __filename
// process.cwd()
// path.resolve();
// console.log(path.resolve());
// const fs = require('fs');
// fs.stat('/a/b/c/d', (err, stat) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(stat.isFile());
//     console.log(stat.isDirectory());
//     console.log(stat.size);
// })
// fs.readFile('a.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });
// try {
//     const data = fs.readFileSync('a.txt', 'utf8');
//     console.log(data);
// } catch(err) {
//     console.error(err);
// }
// fs.writeFile('a.txt', 'bbb', 'utf8', err => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// })
// try {
//     fs.writeFileSync('a.txt', 'aaa', 'utf8');
//     console.log(data);
// } catch(err) {
//     console.error(err);
// }
// fs.appendFile('a.txt', content, err => {
//     if (err) {
//         console.error(err);
//         return
//     }
//     console.log('写入文件成功！');
// })
// const rs = fs.createReadStream('a.txt');
// rs.pipe(process.stdout);
// const ws = fs.createWriteStream('a.txt');
// ws.write('aaa')
// ws.write('bbb')
// ws.end();
// ws.on('finish', () => {
//     console.log('done');
// })
// const fs = require('fs');
// fs.stat('a.txt', (err, stats) => {
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
//     console.log(stats.size);
// })
// try {
//     const stats = fs.statSync("a.txt");
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
//     console.log(stats.size);
// } catch(err) {
//     console.error(err);
// }
// const fs = require('fs');
// fs.readFile('a.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// })
// try {
//     const data = fs.readFileSync('a.txt', 'utf8')
//     console.log(data);
// } catch(err) {
//     console.error(err);
// }
// const fs = require('fs');
// fs.writeFile('b.txt', 'ccc', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log('write done!');
// });
// try {
//     fs.writeFileSync('b.txt', '好的', 'utf8');
//     console.log('write done!');
// } catch(err) {
//     console.error(err);
// }
// fs.appendFile('b.txt', 'ddd', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log('append done!');
// });
// const fs = require('fs');
// const rs = fs.createReadStream('a.txt');
// rs.pipe(process.stdout);
// const ws = fs.createWriteStream('c.txt');
// ws.write('a')
// ws.write('b')
// ws.write('c')
// ws.end();
// ws.on('finish', ()=> {
//     console.log('done!');
// })
// const fs = require("fs");
// if (!fs.existsSync('f')) {
//     fs.mkdir('f', err => {
//         if (err) throw err;
//         console.log('done');
//     })
// }
// try {
//     if (!fs.existsSync('e')) {
//         fs.mkdirSync('e');
//     } 
// } catch(err) {
//     console.log(1);
//     // console.error(err);
//     throw err
// }
// const fs = require('fs');
// fs.readdir('src', (err, files) => {
//     if (err) throw err;
//     console.log(files);
// });
// try {
//     const files = fs.readdirSync('src').map(file => {
//         return path.join('src', file)
//     }).filter(file => {
//         return fs.statSync(file).isFile();
//     });
//     console.log(files);
// } catch(err) {
//     console.error();
// }
// node安装
// brew install node
// nvm install 10
// 官网下载安装包
// npm
// npm install
// npm install --production
// npm install <package-name>
// npm install <package-name>@<version>
// npm install -g <package-name>
// npm install -S <package-name>
// npm install -D <package-name>
// npm uninstall <package-name>
// npm uninstall -g <package-name>
// npm uninstall -S <package-name>
// npm uninstall -D <package-name>
// rm -rf node_modules && npm cache clean --force
// npm update
// npm update <package-name>
// npm outdated
// npm install -g npm-check-updates
// ncu -u
// npm update
// npm list
// npm list -g
// npm list --depth 0
// npm list <package-name>
// npm list -g --depth=0
// npm view <package-name> version
// npm view <package-name> versions
// npm root
// npm root -g
// ./node_modules/.bin/cowsay
// npx cowsay
// process.exit(1)
// process.cwd();
// process.env.NODE_ENV
// process.argv
// npm install minimist
// const minimist = require('minimist');
// console.log(minimist(process.argv.slice(2)));
// console.log(process.argv);
// path
// const path = require('path');
// console.log(path.normalize('a/b/c/..//d/e///f.js'));
// console.log(path.join('a', '/b'));
// console.log(path.resolve('a', '/b'));
// console.log(path.relative('a', 'a/b.js'));
// console.log(path.isAbsolute('/a'));
// console.log(path.parse('/a/b/bc/c/d.js'));
// console.log(path.format({
//     dir: '/a/b',
//     base: '/../c.js',
// }));
// const path = require('path')
// console.log(__dirname);
// console.log(__filename);
// console.log(process.cwd());
// console.log(path.resolve());
// node安装
// brew install node
// nvm install 10
// 官网下载安装包
// npm
// npm install
// npm install --production
// npm install <package-name>
// npm install <package-name>@10.0.1
// npm install -g <package-name>
// npm install -S <package-name>
// npm install -D <package-name>
// npm uninstall <package-name>
// npm uninstall -g <package-name>
// npm uninstall -S <package-name>
// npm uninstall -D <package-name>
// rm -rf node_modules && npm cache clean --force
// npm install
// npm update
// npm outdated
// npm update <package-name>
// npm install -g npm-check-updates
// ncu -u
// npm update
// npm list
// npm list -g
// npm list --depth=0
// npm list -g --depth 0
// npm view <package-name> version
// npm view <package-name> versions
// npm root
// npm root -g
// ./node_modules/.bin/cowsay
// npx cowsay
// process
// process.exit(1)
// process.cwd()
// process.env.NODE_ENV
// process.argv
// npm install minimist
// const minimist = require('minimist')
// console.log(minimist(process.argv.slice(2)));
// path
// const path = require('path')
// console.log(path.normalize('a/b/c./d./../e/f./g.js'));
// console.log(path.join('a', 'b', 'c', 'd.js'));
// console.log(path.resolve('a', 'b'));
// console.log(path.relative('a/b', 'c/b'));
// console.log(path.isAbsolute('.'));
// console.log(path.parse('a/b/c/d.js'));
// console.log(path.format({
//     dir: 'a/b',
//     base: 'c.js'
// }));
// console.log(__dirname);
// console.log(__filename);
// console.log(process.cwd());
// console.log(path.resolve());
// fs
// const fs = require('fs');
// fs.stat('a.txt', (err, stats) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
//     console.log(stats.size);
// })
// try {
//     const stats = fs.statSync('a.txt');
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
//     console.log(stats.size);
// } catch(err) {
//     console.error(err);
// }
// fs.readFile('a.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// })
// try {
//     const data = fs.readFileSync('a.txt', 'utf-8');
//     console.log(data);
// } catch(err) {
//     console.error(err);
// }
// const fs = require('fs');
// fs.writeFile('a.txt', '的', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('done');
// })
// try {
//     fs.writeFileSync('a.txt', 'bbb')
//     console.log('done');
// } catch(err) {
//     console.error(err);
// }
// fs.appendFile('a.txt', 'ccc', 'utf8', err => {
//     if (err) throw err;
//     console.log('append done');
// })
// try {
//     fs.appendFile('a.txt', 'fff', 'utf8')
//     console.log('done');
// } catch(err) {
//     console.error(err);
// }
// const rs = fs.createReadSteam('a.txt');
// rs.pipe(process.stdout)
// const fs = require('fs');
// const rs = fs.createReadStream('a.txt');
// rs.pipe(process.stdout)
// const ws = fs.createWriteStream('a.txt');
// ws.write('1');
// ws.write('2');
// ws.write('3');
// ws.end();
// const fs = require('fs');
// fs.mkdir('h', err => {
//     if (err) throw err;
//     console.log('done');
// })
// try {
//     if (!fs.existsSync('i')) {
//         fs.mkdirSync('i');
//         console.log('done2');
//     }
    
// } catch(err) {
//     console.error(err);
// }
// const fs = require('fs')
// // console.log(fs.existsSync('a.txt'));
// fs.readdir('src', (err, files) => {
//     if (err) throw err;
//     console.log(files.map(file => fs.statSync('src/'+file).isFile()));
// });
// fs
// const fs = require('fs');
// fs.stat('a.txt', (err, stats) => {
//     if (err) throw err;
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
//     console.log(stats.size);
// });
// try {
//     const stats = fs.statSync('a.txt');
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
//     console.log(stats.size);
// } catch(err) {
//     console.error(err);
// }
// fs.readFile('a.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(file);
// });
// try {
//     const data = fs.readFileSync('a.txt', 'utf8');
//     console.log(file);
// } catch(err) {
//     console.error(err);
// }
// fs.writeFile('a.txt', 'aaa', 'utf8', err => {
//     if (err) throw err;
//     console.log('done!');
// })
// try {
//     fs.writeFileSync('a.txt', 'ccc', 'utf8')
//     console.log('done');
// } catch(err) {
//     console.error(err);
// }
// fs.writeFile('a.txt', 'ddd', 'utf8')
// fs.appendFile('d.txt', 'bbb', 'utf8', err => {
//     if (err) throw err;
//     console.log('append done!');
// })
// try {
//     fs.appendFileSync('a.txt', 'eee', 'utf8')
//     console.log('done');
// } catch(err) {
//     console.error(err);
// }
// const rs = fs.createReadStream('a.txt');
// rs.pipe(process.stdout)
// const ws = fs.createWriteStream('e.txt');
// ws.write('fff')
// ws.write('ggg');
// ws.end();
// const fs = require('fs');
// fs.mkdir('a', err =>{
//     if (err) throw err;
//     console.log('done');
// })
// console.log(11);
// try {
    // if (!fs.existsSync('b/a')) {
        // fs.mkdirSync('b/a');
        // console.log('done');
    // }
// } catch(err) {
//     console.error(err);
// }
// fs.readdir('src', (err, files) => {
//     if (err) throw err;
//     console.log(files);
// });
// try {
//     const files = fs.readdirSync('src');
//     console.log(files.filter(file => fs.statSync('src/' + file).isFile()));
// } catch(err) {
//     console.error(err);
// }
// console.log(require('path').join(__dirname + '/src'));
// const http = require('http');
// const server = http.createServer((req, res) => {
// });
// node 安装
// brew install node
// nvm install 10.0.0
// 官网下载安装包安装
// npm
// npm install
// npm install --production
// npm install <package-name>
// npm install <package-name>@1.0.1
// npm install -g <package-name>
// npm install -S <package-name>
// npm install -D <package-name>
// npm uninstall <package-name>
// npm uninstall -g <package-name>
// npm uninstall -S <package-name>
// npm uninstall -D <package-name>
// rm -rf node_modules && npm cache clean --force
// npm install
// npm update
// npm update <package-name>
// npm outdated
// npm install npm-check-updates
// ncu -u
// npm update
// ./node_modules/.bin/cowsay
// cowsay
// npx cowsay
// npm list 
// npm list -g
// npm list --depth=0
// npm list -g --depth 0
// npm view <package-name> version
// npm view <package-name> versions
// npm root 
// npm root -g
// process
// process.exit(1);
// process.cwd();
// process.env.NODE_ENV;
// process.argv
// console.log(process.argv);
// npm install minimist
// const minimist = require('minimist')
// console.log(minimist(process.argv));
// path
// const path = require("path")
// console.log(path.normalize('a/b/c/../d//e/./f/g.js'));
// console.log(path.join('a', 'b'));
// console.log(path.resolve('a', 'b'));
// console.log(path.relative('a/c', 'a/c/b'));
// console.log(path.parse('/a/b/c/d.js'));
// console.log(path.format({
//     dir: 'a/b',
//     base:'c.js'
// }));
// console.log(path.isAbsolute('/a'));
// console.log(__dirname);
// console.log(__filename);
// console.log(process.cwd());
// console.log(path.resolve());
// const url = '/a/b/c/d.js'
// console.log(path.dirname(url));
// console.log(path.basename(url));
// console.log(path.extname(url));
// console.log(path.basename(url,path.extname(url)));
// fs
// const fs = require('fs')
// fs.stat('a.txt', (err, stats) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
//     console.log(stats.size);
// });
// const stats = fs.statSync('a.txt');
// console.log(stats.isFile());
// console.log(stats.isDirectory());
// console.log(stats.size);
// fs.readFile('a.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// })
// try {
//     const data = fs.readFileSync('a.txt', 'utf-8');
//     console.log(data);
// } catch(err) {
//     console.error(err);
// }
// fs.writeFile('a.txt', 'ccc', 'utf8', err => {
//     if (err) throw err;
//     console.log('文件写入成功！');
// });
// try {
//     fs.writeFileSync('a.txt', 'ddd', 'utf8');
//     console.log('done!');
// } catch(err) {
//     console.error(err);
// }
// fs.appendFile('a.txt', 'eee', 'utf8', err => {
//     if (err) throw err;
//     console.log('done');
// })
// try {
//     fs.appendFileSync('a.txt', 'fff', 'utf8');
//     console.log('done!');
// } catch(err) {
//     console.error(err);
// }
// const fs = require('fs');
// fs.mkdir('f/e', err => {
//     if (err) throw err;
//     console.log('done');
// });
// try {
//     if (!fs.existsSync('e')) {
//         fs.mkdirSync('e');
//         console.log('done');
//     }
// } catch(err) {
//     console.error(err);
// }
// fs.readdir('src', (err, files) => {
//     if (err) throw err;
//     console.log(files);
// })
// try {
//     const files = fs.readdirSync('src');
//     console.log(files.filter(file => fs.statSync('src' + file).isFile()));
// } catch(err) {
//     console.error(err);
// }
// const fs = require('fs');
// // const rs = fs.createReadStream('a.txt');
// // rs.pipe(process.stdout);
// const ws = fs.createWriteStream('a.txt');
// ws.write('还好');
// ws.write('b')
// ws.end();
// node安装
// brew install node
// nvm install 10.0.0
// 官网下载安装包安装
// npm
// npm install
// npm install --production
// npm install <package-name>
// npm install <package-name>@1.1.2
// npm install -g <package-name>
// npm install -S <package-name>
// npm install -D <package-name>
// npm uninstall <package-name>
// npm uninstall -g <package-name>
// npm uninstall -S <package-name>
// npm uninstall -D <package-name>
// rm -rf node_modules && npm cache clean --force
// npm install
// npm update
// npm outdated
// npm install -g npm-check-updates
// ncu -u
// npm update
// npm list
// npm list -g
// npm list --depth 0
// npm list -g --depth=0 
// npm view <package-name> version
// npm view <package-name> versions
// npm root
// npm root -g
// ./node_modules/.bin/cowsay
// npx cowsay
// process
// process.exit(0)
// process.env.NODE_ENV
// process.cwd();
// process.argv
// npm install minimist
// const minimist = require('minimist')
// console.log(minimist(process.argv.slice(2)));
// path
// const path = require('path');
// console.log(path.normalize('/a/b/c/../d//e//./.f'));
// console.log(path.join('a', 'b'));
// console.log(path.resolve('/a', 'b'));
// console.log(path.parse('/a/b/c/d.js'));
// console.log(path.format({
//     dir: '/a/b/c',
//     base: '/d.js'
// }));
// console.log(path.isAbsolute('/a'));
// console.log(path.relative('/a/b', 'b'));
// // __dirname __filename
// // process.cwd() 
// console.log(path.resolve());
// console.log(path.format({
//     root: '/ignored',
//     dir: '/home/user/dir',
//     base: 'file.txt'
//   }));
// const path = require('path')
// console.log(path.dirname('/ab/c/d.js'));
// console.log(path.extname('a/b/c.js'));
// console.log(path.basename('a/b/c/d.js'));
// console.log(path.basename('a/b/c/d.js', path.extname('a/b/c/d.js')));
// console.log(path.relative('a/b', 'a/c'));
// fs
// const fs = require('fs');
// fs.stat('a.txt', (err, stats) => {
//     if (err) throw err;
//     console.log(stats.isDirectory());
//     console.log(stats.isFile());
//     console.log(stats.size);
// });
// try {
//     const stats = fs.statSync('a.txt');
//     console.log(stats.isDirectory());
//     console.log(stats.isFile());
//     console.log(stats.size);
// } catch(err) {
//     console.error(err);
// }
// fs.readFile('a.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });
// try {
//     const data = fs.readFileSync('a.txt', 'utf8');
//     console.log(data);
// } catch(err) {
//     console.error(err);
// }
// fs.writeFile('a.txt', 'aaa', 'utf8', err => {
//     if (err) throw err;
//     console.log('done!');
// });
// try {
//     fs.writeFileSync('a.txt', '地方');
//     console.log('done');
// } catch(err) {
//     console.error(err);
// }
// fs.appendFile('a.txt', 'ccc', 'utf8', err => {
//     if (err) throw err;
//     console.log('done!');
// })
// try {
//     fs.appendFileSync('a.txt', 'ddd', 'utf8');
//     console.log('done');
// } catch(err) {
//     console.error(err);
// }
// const rs = fs.createReadStream('a.txt');
// rs.pipe(process.stdout)
// const ws = fs.createWriteStream('a.txt');
// ws.write('aaa');
// ws.write('bbb')
// ws.end('done');
// const fs = require('fs');
// fs.mkdir('a/b', err => {
//     if (err) throw err;
//     console.log('done');
// })
// fs.mkdir('a/c/d', err => {
//     if (err) throw err;
//     console.log('done');
// })
// try {
//     fs.mkdirSync('b');
//     console.log('done');
// } catch(err) {
//     console.error(err);
// }
// fs.readdir('a', (err, files) => {
//     if (err) throw err;
//     console.log(files);
// });
// console.log(fs.existsSync('c'));
// try {
//     if (fs.existsSync('c')) {
//         const files = fs.readdirSync('c');
//         console.log(files);
//     }
// } catch(err) {
//     console.error(err);
// }
// const path = require('path')
// try {
//     const files = fs.readdirSync('a').filter(file => fs.statSync('a/' + file).isFile());
//     console.log(files);
// } catch(err) {
//     console.error(err);
// }
// fs
// fs.stat('a.txt', (err, stats) => {
//     if (err) throw err;
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
//     console.log(stats.size);
// })
// const fs = require('fs');
// try {
//     const stats = fs.statSync('a.txt');
//     console.log(stats.isDirectory());
//     console.log(stats.isFile());
//     console.log(stats.size);
// } catch(err) {
//     console.error(err);
// }
// fs.readFile('a.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })
// try {
//     const data = fs.readFileSync('a.txt', 'utf8');
//     console.log(data);
// } catch(err) {
//     console.error(err);
// }
// fs.writeFile('a.txt', 'hello', 'utf8', err => {
//     if (err) throw err;
//     console.log('done');
// });
// try {
//     fs.writeFileSync('a.txt', 'hello world', 'utf8');
//     console.log('done');
// } catch(err) {
//     console.error(err);
// }
// fs.appendFile('a.txt', ', hi', 'utf8', err => {
//     if (err) throw err;
//     console.log('done');
// })
// try {
//     const data = fs.appendFileSync('a.txt', ' world', 'utf8');
//     console.log(data);
// } catch(err) {
//     console.error(err);
// }
// const rs = fs.createReadStream('a.txt');
// rs.pipe(process.stdout);
// const ws = fs.createWriteStream('a.txt');
// ws.write('hello');
// ws.write(' world');
// ws.end();
// const fs = require('fs');
// const path = require('path');
// fs.mkdir('c', err => {
//     if (err) throw err;
//     console.log('done');
// })
// if (!fs.existsSync('f')) {
//     try {
//         fs.mkdir('f');
//         console.log('done');
//     } catch(err) {
//         console.error(err);
//     }
// }
// fs.readdir('a', (err, files) => {
//     if (err) throw err;
//     console.log(files);
// });
// try {   
//     const files = fs.readdirSync('a');
//     console.log(files.map(file => path.join('a', file)).filter(file => fs.statSync(file).isFile()));
// } catch (error) {
//     console.error(error);
// }
// http
// http.OutgoingMessage
// 继承自 <stream>可写流
// http.OutgoingMessage 作为 http.ClientRequest 和 http.ServerResponse 的父类，从http事务的参与
// 者的角度来看，是对传出消息的抽象。
// http.ClientRequest
// 此对象从http.request()内部创建，表示正在进行的请求
// 当响应被接收时，会使用响应 http.IncomingMessage实例最为参数来调用 response 事件。
// 继承自 <stream>可写流
// http.ServerResponse
// 继承自可写流
// 此对象由 http 服务器内部的 http.Server 创建，而不是由用户创建，并作为第二个参数传给request事件。
// header
// response.setHeader('Content-Type', 'text/html');
// response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
// response.getHeader('Set-Cookie');
// response.getHeader('Content-Type');
// response.getHeaderNames();
// response.getHeaders();
// response.hasHeader('Content-Type');
// response.removeHeader('Content-Type');
// response.statusCode = 404;
// response.statusMessage = 'Not Found'
// response.writeHead(404, 'Not Found', {
//     'Content-Type': 'text/html',
//     'Set-Cookie': ['type=ninja', 'language=javascript'],
// })
// response.writeHead(statusCode[,statusMessage][,headers])
// response.write(chunk[,encoding][,callback]);
// response.end([data[,encoding]][,callback]);
// request.url
// request.method
// request.headers
// request.statusCode
// request.statusMessage
// request.setEncoding('utf8')
// request.on('data', chunk => {})
// request.on('end', () => {})
// http.createServer
// const http = require('http');
// const url = require('url');
// const qs = require('qs');
// const server = http.createServer((req, res) => {
//     const method = req.method;
//     let params;
//     if (method === 'GET') {
//         params = url.parse(req.url, true).query;
//     } else if (method === 'POST') {
//         let data = '';
//         req.on('data', chunk => {
//             data += chunk;
//         });
//         req.on('end', () => {
//             const contentType = req.headers['Content-Type'];
//             if (contentType === 'application/x-www-form-urlencoded') {
//                 params = qs.parse(data);
//             } else if (contentType === 'application/json') {
//                 params = JSON.parse(data);
//             }
//         });
//     }
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write('参数：' + params.key);
//     res.end();
// });
// const hostname = '127.0.0.1';
// const port = 8000;
// server.listen(port, hostname, () => {
//     console.log(`server is listening at ${hostname}:${port}`);
// });
// const http = require('http');
// const postData = JSON.stringify({
//     msg: 'Hello World'
// })
// const options = {
//     hostname: '127.0.0.1',
//     port: 8000,
//     path: '/',
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': Buffer.byteLength(postData),
//     }
// }
// const request = http.request(options, res => {
//     const { statusCode } = res;
//     const contentType = res.headers['Content-Type'];
//     let error;
//     if (statusCode !== 200) {
//         error = new Error(`Request Failed.\n Status Code ${statusCode}`);
//     } else if (!/^application\/json/.test(contentType)) {
//         error = new Error(`Invilid content-type.\n Expected application/json but received ${contentType}`);
//     }
//     if (error) {
//         console.error(error);
//         res.resume();
//         return;
//     }
//     let data = '';
//     res.on('data', chunk => {
//         data += chunk;
//     });
//     res.on('end', () => {
//         console.log(data);
//     });
// });
// request.on('error', err => {
//     console.error(err);
// });
// request.write(postData);
// request.end();