// js数据类型
// typeof a
// 'string', 'boolean', 'number', 'undefined', 'symbol'
// // 'function', 'object'(数组，对象，null)
// Object.prototype.toString.call(a);
// '[objec Undefined]', '[object String]', '[object, Number]', '[object, Boolean]'
// '[object Symbol]', '[object Function]', '[object Object]', '[object, Null]'
// '[object Array]'
// 作用域：变量或函数能够使用的范围
// 作用域链：自由变量查找的顺序
// 自由变量：当前作用域没有定义却使用了的变量
// 自由变量的查找，是在函数定义的地方，向上级查找，而不是函数执行的地方。
// for (var i = 0; i< 10; i++){
//     (function(i) {
//         setTimeout(() => {
//             console.log(i);
//         }, 1000);
//     })(i);
// }
// for (var i = 0; i< 10; i++){
//     setTimeout(((i) => {
//       return function() {
//               console.log(i);
//       }
//     })(i), 1000);
//   }
// const isObject = (obj) =>
//   obj !== null && (typeof obj === "object" || typeof obj === "function");
// const isFunction = (obj) => typeof obj === "function";
// function deepClone(obj, hash = new WeakMap()) {
//   if (hash.get(obj)) {
//     // 环处理
//     return hash.get(obj);
//   }
//   if (!isObject(obj)) {
//     return obj;
//   }

//   if (isFunction(obj)) {
//     // function返回原引用
//     return obj;
//   }

//   let cloneObj;

//   const Constructor = obj.constructor;

//   switch (Constructor) {
//     case Boolean:
//     case Date:
//       return new Date(+obj);
//     case Number:
//     case String:
//     case RegExp:
//       return new Constructor(obj);
//     default:
//       cloneObj = new Constructor();
//       hash.set(obj, cloneObj);
//   }

//   [
//     ...Object.getOwnPropertyNames(obj),
//     ...Object.getOwnPropertySymbols(obj),
//   ].forEach((k) => {
//     cloneObj[k] = deepClone(obj[k], hash);
//   });
//   return cloneObj;
// }
function isObject(val) {
  return typeof val === "object" && val !== null;
}
function deepClone(obj, hash = new WeakMap()) {
  if (!isObject(obj)) return obj;
  if (hash.has(obj)) return hash.get(obj);
  const result = Array.isArray(obj) ? [] : {};
  hash.set(obj, result);
  // Reflect.ownKeys(obj):Object.getOwnPropertyNames(obj)+Object.getOwnPropertySymbols(obj)
  [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj),
  ].forEach(k => {
    result[k] = deepClone(obj[k], hash);
  });
  return result;
}
// 测试
const symbolName = Symbol();
const obj = {
  number: 1,
  string: "stirng",
  function: function () {},
  array: [{ a: 1 }, 2],
  a: {
    b: {
      c: 1
    }
  },
  [symbolName]: 111,
};
obj.d = obj;
const o = deepClone(obj);
obj.number = 2;
console.log((o.number));