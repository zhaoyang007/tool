#!/usr/bin/env node
const program = require('commander');
const { promisify } = require('util');
const figlet = promisify(require('figlet'));
const chalk = require('chalk');
const fs = require('fs');
const handlebars = require('handlebars');

const log = content => console.log(chalk.green(content));

program.version(require('../package.json').version);

program.command('init <name>')
    .description('init project')
    .action(init);

program.command('refresh')
    .description('refresh routers....')
    .action(refresh);

program.parse(process.argv);

async function init(name) {
    // 打印欢迎界面
    const data = await figlet('mycli welcome');
    log(data);

    // 下载种子工程
    // await clone('github:su37josephxia/vue-template', name);

    // 安装依赖
    console.log('安装依赖');
    await spawn('npm', ['install'], { cwd: `./${name}`});
    log(`
To get Start=========================
cd ${name}
npm run serve
=====================================   
    `);

    // 启动本地服务
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}`});


}

const clone = async (repo, desc) => {
    const download = promisify(require('download-git-repo'));
    const ora = require('ora');
    const process = ora(`下载....${repo}`);
    process.start();
    await download(repo, desc);
    process.succeed();
}

const spawn = async (...args) => {
    const { spawn } = require('child_process');
    return new Promise(resolve => {
        const proc = spawn(...args);
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);
        proc.on('close', () => {
            resolve();
        })
    });
}

async function refresh() {
    console.log(fs.readdirSync('./src'));
    const list = fs.readdirSync('./src/views')
        .filter(v => v !== 'Home.vue')
        .map(v => ({
            name: v.replace('.vue', ''),
            file: v
        }));
    
    function compile(list, templatePath, filePath) {
        const content = fs.readFileSync(templatePath).toString();
        const result = handlebars.compile(content)(list);
        fs.writeFileSync(filePath, result);
        log(`🚀 ${filePath}创建成功`);
    }
    compile({ list }, './template/App.vue.hbs', './src/App.vue');
    compile({ list }, './template/router.js.hbs', './src/router.js');
}