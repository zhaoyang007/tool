初始化（5次）

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

