const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const util = require('util');

// 输入代码
const inputCode = `
const add = (a, b) => a + b;
`;

// 1.解析
// 将输入代码解析为 AST
const ast = parser.parse(inputCode, {
  sourceType: "module",
  // tokens: true
});
// console.log('词法分析后生成的tokens', util.inspect(ast.tokens, { showHidden: false, depth: null, colors: true }));
// console.log('语法分析后生成的ast', util.inspect(ast, { showHidden: false, depth: null, colors: true }));

// 2.转换
// 创建插件实例并传递 api 和 options 参数
const plugin = require("@babel/plugin-transform-arrow-functions").default({
  assertVersion: () => true,
  // assumption: () => null,
}, {
  spec: true  // 这是你想传递给插件的 options 对象
});

// 获取插件实例的 visitor 对象
const { visitor } = plugin;

// 使用 @babel/traverse 遍历和转换 AST
traverse(ast, visitor);

// console.log('转换后生成的ast', util.inspect(ast, { showHidden: false, depth: null, colors: true }));

// 3.生成
// 使用 @babel/generator 生成转换后的代码
const output = generator(ast, {}, inputCode);

// 输出转换后的代码
console.log('生成的目标代码', output.code);