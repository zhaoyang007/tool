#!/usr/bin/env node
const program = require('commander');

// kkb -V
program.version(require('../package.json').version);

// kkb init abc 创建一个叫abc的工程
program.command('init <name>')
    .description('init project')
    // .action(name => {
    //     console.log('init', name);
    // })
    .action(require('../lib/init'))
// 固定要写的，program是通过解析process.argv来获取命令行参数的
program.parse(process.argv);