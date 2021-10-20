const { promisify } = require('util');

// 字母拼图案
const figlet = promisify(require('figlet'));

// 清屏
const clear = require('clear');
// 粉笔
const chalk = require('chalk');

// 加颜色的log
const log = content => console.log(chalk.green(content));

// clone
const { clone } = require('./download');

// 自动打开浏览器
const open = require('open');

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

module.exports = async name => {
    // 打印欢迎界面
    clear();
    const data = await figlet('KKB Welcome');
    log(data);

    // 脚手架新建一个工程一般是要从某一个种子工程下载下来的
    // clone种子库
    await clone('github:su37josephxia/vue-template', name);

    // 安装依赖 npm install
    log('安装依赖');
    await spawn('npm', ['install'], { cwd: `./${name}` });
    log(chalk.green(`
👌安装完成:
To get Start: ===========================
cd ${name}
npm run serve
===========================`
    ));

    // 启动本地服务
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}`});
    
    // 自动打开浏览器
    open(`http://localhost:8080`);
    
}