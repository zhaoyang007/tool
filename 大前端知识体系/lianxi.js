// js数据类型
// typeof a
// 'string', 'boolean', 'number', 'undefined', 'symbol'
// // 'function', 'object'(数组，对象，null)
// Object.prototype.toString.call(a);
// '[objec Undefined]', '[object String]', '[object, Number]', '[object, Boolean]'
// '[object Symbol]', '[object Function]', '[object Object]', '[object, Null]'
// '[object Array]'
作用域：变量或函数能够使用的范围
作用域链：自由变量查找的顺序
自由变量：当前作用域没有定义却使用了的变量
自由变量的查找，是在函数定义的地方，向上级查找，而不是函数执行的地方。