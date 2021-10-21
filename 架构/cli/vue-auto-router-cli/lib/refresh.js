const fs = require('fs');
const handlebars = require('handlebars');
const chalk = require('chalk');

module.exports = async () => {
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