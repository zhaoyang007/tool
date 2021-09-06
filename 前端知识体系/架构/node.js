/**
 * fs
 * 
 */
const fs = require('fs');
// // 同步读取
// const data = fs.readFileSync('./conf.js');
// console.log(data.toString());
// // 异步读取
// fs.readFile('./conf.js', (err, data) => {
//     // 错误优先的的约定
//     if (err) throw err;
//     console.log('data', data.toString());
// });
(async () => {
    const fs = require('fs');
    const { promisify } = require('util');
    const readFile = promisify(fs.readFile);
    const data = await readFile('./conf.js');
    // console.log(data.toString());
})();

/**
 * buffer：处理二进制代码，在内存中开启了一个二进制缓冲区。
 * 
 */
// 创建一个长度为10字节以0填充的Buffer
const buf1 = Buffer.alloc(10)
// console.log(buf1)

// 创建一个Buffer包含ascii.
const buf2 = Buffer.from('a')
// console.log(buf2,buf2.toString())

// 创建Buffer包含UTF-8字节
const buf3 = Buffer.from('中文')
// console.log(buf3)

// 合并Buffer
const buf4 = Buffer.concat([buf2,buf3])
// console.log(buf4,buf4.toString())

/**
 * stream 流
 * 不去直接读取文件，而是建立文件之间的通路，将两个文件连通起来，流在里面经过。
 * 这样内存中就不会完全的存一个文件的副本在缓冲区里面。大量节省了内存的资源。
 * 开发中会大量的使用流的操作来提高我们的系统性能。
 */
//  const rs = fs.createReadStream('./cat.jpeg');
//  const ws = fs.createWriteStream('./cat2.jpeg');
 
//  rs.pipe(ws)


/**
 * http
 * 
 */
const http = require('http');
const server = http.createServer((request, response) => {
    // request/response都继承自流Stream
    // console.log('this is a req')
    // response.end('hello node');
    const { url, method, headers } = request;
    if (url === '/' && method  === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                response.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'});
                response.end('500 服务器错误');
                return;
            }
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html');
            response.end(data);
        });
    } else if (url === '/users' && method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.end(JSON.stringify({name: 'TOM'}));
    
        // 所有的图片请求
    } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        // url是/cat.jpeg，要转为./cat.jpeg
        fs.createReadStream('.' + url).pipe(response);
    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.end('404 nopage');
    }
});
server.listen(9000)
