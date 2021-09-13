/*
 * @Author: your name
 * @Date: 2021-09-06 22:40:22
 * @LastEditTime: 2021-09-13 08:29:21
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
const doSomething = () => console.log('测试')
const measureDoingSomething = () => {
  console.time('doSomething()')
  //做点事，并测量所需的时间。
  doSomething()
  console.timeEnd('doSomething()')
}
measureDoingSomething()