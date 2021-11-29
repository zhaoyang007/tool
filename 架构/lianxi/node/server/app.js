/*
 * @Author: your name
 * @Date: 2021-10-13 14:41:35
 * @LastEditTime: 2021-10-13 15:32:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /架构/lianxi/server/app.js
 */
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url, true).pathname;
    console.log(pathname);
    if (pathname === '/') {
        const rs = fs.createReadStream(path.join(__dirname, '../client/index.html'));
        rs.pipe(res);
    } else if (pathname === '/api/user/login') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            const { username, password } = JSON.parse(data);
            if (username === 'zhaoyang' && password === 123456) {
                res.writeHead(200, 'Success', {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify({
                    code: 0,
                    msg: '登录成功'
                }));
            } else {
                res.writeHead(200, 'Success', {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify({
                    code: 1,
                    msg: '用户名密码错误'
                }));
            }
            res.end();
        });
    }
});
const hostname = '127.0.0.1';
const port = 8000;
server.listen(port, hostname, () => {
    console.log(`server is listening at ${hostname}:${port}`);
});