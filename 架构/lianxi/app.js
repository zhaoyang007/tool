/*
 * @Author: your name
 * @Date: 2021-09-06 22:40:22
 * @LastEditTime: 2021-09-22 15:03:15
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
const path = require('path');
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
console.log(__filename);