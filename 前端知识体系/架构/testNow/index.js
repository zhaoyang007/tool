/*
 * @Author: your name
 * @Date: 2021-09-02 22:08:07
 * @LastEditTime: 2021-09-05 19:48:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /架构/testNow/index.js
 */

const path = require('path');
const fs = require('fs');

console.log(path.resolve('./'));
module.exports = class TestNow {
    /**
     * @description: 生成测试文件
     * @param {*} sourcePath 源文件路径
     * @return {*}
     */    
    genTestFileDir(sourcePath = path.resolve('./')) {
        const testPath = `${sourcePath}/__test__`;
        if (!fs.existsSync(testPath)) {
            fs.mkdirSync(testPath);
        }
        // 遍历代码文件
        let list = fs.readdirSync(sourcePath);
        list
            // 添加完整路径
            .map(v => `${sourcePath}/${v}`)
            // 过滤文件
            .filter(v => fs.statSync(v).isFile())
            // 排除测试代码
            .filter(v => !v.includes('.spec'))
            .map(v => this.genTestFile(v));
    }
    genTestFile(fileName) {
        const testFileName = this.getTestFileName(fileName);
        if (fs.existsSync(testFileName)) {
            console.log('该测试代码已存在', testFileName);
            return;
        }
        const mod = require(fileName);
        let source;
        if (typeof mod === 'object') {
            source = mod.keys()
                .map(fnName => this.getTestSource(fnName, path.baseName(fileName), true))
                .join('\n');
        } else if (typeof mod === 'function') {
            const baseName = path.basename(fileName);
            source = this.getTestSource(baseName.replace('.js', ''), baseName);
        }
        fs.writeFileSync(testFileName, source);
    }
    /**
     * @description: 生成测试代码
     * @param {*} methodName 方法名
     * @param {*} fileName 文件名
     * @param {*} isObj 导出的是否是class
     * @return {*}
     */    
    getTestSource(methodName, fileName, isObj = false) {
        console.log('getTestSource:', methodName);
        return `
            test('TEST ' + ${methodName}, () => {
                const ${isObj ? '{' + methodName + '}' : methodName} = require('${'../' +fileName}');
                const res = ${methodName}();
            });
            // expect(res)
            //     .toBe('test res');
        `
    }
    /**
     * @description: 生成测试文件名
     * @param {*} fileName 代码文件名
     * @return {*}
     */    
    getTestFileName(fileName) {
        const dirName = path.dirname(fileName);
        const baseName = path.basename(fileName);
        const extName = path.extname(fileName);
        const testName = baseName.replace(extName, `.spec.${extName}`); 
        return path.format({
            root: dirName + '/__test__/',
            base: testName,
        });
    }
}