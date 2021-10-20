cli

```bash
mkdir vue-auto-router-cli
cd vue-auto-router-cli
npm init -y
npm i commander download-git-repo ora handlebars figlet clear chalk open -s

mkdir bin
touch kkb.js

# package.json中注册bin

# 把你注册的bin文件通过软链的形式连接到全局
sudo npm link
```

kkb.js

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
const open = require('open');

// 加颜色的log
const log = content => console.log(chalk.green(content));

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

async function init(name) {
    // 打印欢迎界面
    // clear();
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
  
  	// 自动打开浏览器
    // open(`http://localhost:8080`);
  
    // 启动本地服务
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}`});
    
}

// kkb -V
program.version(require('../package.json').version);

// kkb init abc 创建一个叫abc的工程
program.command('init <name>')
    .description('init project')
    // .action(name => {
    //     console.log('init', name);
    // })
    .action(init)
// 固定要写的，program是通过解析process.argv来获取命令行参数的
program.parse(process.argv);
```





