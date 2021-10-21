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
// const open = require('open');

const fs = require('fs');
const handlebars = require('handlebars');

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

const refresh = async () => {
    // 获取views页面列表
    const list = fs
        .readdirSync('./src/views')
        .filter(v => v !== 'Home.vue')
        .map(v => ({
            name: v.replace('.vue', '').toLowerCase(),
            file: v
        }));
    // 使用页面列表数据和模版生成代码
    function compile(meta, filePath, templatePath) {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(templatePath).toString();
            const result = handlebars.compile(content)(meta);
            fs.writeFileSync(filePath, result);
            console.log(chalk.green(`🚀${filePath} 创建成功`));
        }
    }
    // 生成路由
    compile({ list }, './src/router.js', './template/router.js.hbs');
    
    // 生成菜单
    compile({ list }, './src/App.vue', './template/App.vue.hbs');
}

// kkb -V
program.version(require('../package.json').version);

// kkb init abc 
// 创建一个叫abc的工程
program.command('init <name>')
    .description('init project')
    // .action(name => {
    //     console.log('init', name);
    // })
    .action(init)

// kkb refresh
// 自动生成路由配置命令
program.command('refresh')
    .description('refresh routers...')
    .action(refresh);

// 固定要写的，program是通过解析process.argv来获取命令行参数的
program.parse(process.argv);
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



todo

1. 发布之后，下载下来，看看能不能在不使用 `sudo npm link` 的情况下全局使用注册的命令。

   不能，要在下载下来的文件中执行 sudo npm link 后，命令才会挂载到全局。

2. 看看全局命令中是否有这个注册的命令。

   有

3. 生成代码： 1.模版映射 2.ast 

