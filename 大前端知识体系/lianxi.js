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
// function isObject(val) {
//   return typeof val === "object" && val !== null;
// }
// function deepClone(obj, hash = new WeakMap()) {
//   if (!isObject(obj)) return obj;
//   if (hash.has(obj)) return hash.get(obj);
//   const result = Array.isArray(obj) ? [] : {};
//   hash.set(obj, result);
//   // Reflect.ownKeys(obj):Object.getOwnPropertyNames(obj)+Object.getOwnPropertySymbols(obj)
//   [
//     ...Object.getOwnPropertyNames(obj),
//     ...Object.getOwnPropertySymbols(obj),
//   ].forEach(k => {
//     result[k] = deepClone(obj[k], hash);
//   });
//   return result;
// }
// // 测试
// const symbolName = Symbol();
// const obj = {
//   number: 1,
//   string: "stirng",
//   function: function () {},
//   array: [{ a: 1 }, 2],
//   a: {
//     b: {
//       c: 1
//     }
//   },
//   [symbolName]: 111,
// };
// obj.d = obj;
// const o = deepClone(obj);
// obj.number = 2;
// console.log((o.number));
// 实现数组push
// Array.prototype.push = function() {
//     for (let i = 0; i < arguments.length; i++) {
//         this[this.length] = arguments[i];
//     }
//     return this.length;
// }
// Array.prototype.push = function() {
//     for (let i = 0; i < arguments.length; i++) {
//         this[this.length] = arguments[i];
//     }
//     return this.length;
// }
// Array.prototype.push = function() {
//     for (let i = 0; i < arguments.length; i++) {
//         this[this.length] = arguments[i];
//     }
//     return this.length;
// }
// Array.prototype.filter = function(fn) {
//     if (typeof fn !== 'function') throw Error('参数必须是一个函数');
//     let arr = [];
//     for (let i = 0; i < this.length; i++) {
//         if (fn(this[i])) arr.push(this[i]); 
//     }
//     return arr;
// }
// Array.prototype.map = function(fn) {
//     if (typeof fn !== 'function') throw Error('参数必须是一个函数');
//     let arr = [];
//     for (let i = 0; i < this.length;) {
//         arr.push(fn(this[i]));
//     }
//     return arr;
// }
// String.prototype.repeat = function(n) {
//     return new Array(n + 1).join(this);
// }
// String.prototype.repeat4 = function(n) {
//     let s = '';
//     for (let i = 0; i < n; i++) {
//         s += this;
//     }
//     return s;
// }
// a = 'a'
// console.log(a.repeat4(5));
// String.prototype.repeat5 = function(n) {
//     return n > 0 ? repeat5(n - 1) + this : '';
// }
// a = 'b'
// console.log(a.repeat5(10));

// String.prototype.repeat6 = function(n) {
// 	return (n > 0) ? this.concat(repeat(this, --n)) : "";
// }

// console.log(a.repeat6(10));
// String.prototype.repeat1 = function(n) {
// 	return n > 0 ? this.repeat(n - 1) + this : '';
// }
// a = 'b'
// console.log(a.repeat1(7));
// String.prototype.repeat1 = function(n) {
//     return (new Array(n + 1)).join(this);
// }
// console.log('a'.repeat1(9));
// String.prototype.repeat1 = function(n) {
//     return n > 0 ? this.repeat1(n-1) + this : '';
// }
// console.log('b'.repeat1(6));
// a = [1,2,3,4,5]
// b = a.reduce((acc, cur, index) => {
//     console.log('acc', acc);
//     console.log('cur', cur);
//     console.log('index', index);
//     return acc + cur;
// }, 1);
// console.log(b);
// arr = [{a:9, b:3, c:4}, {a:1, b:3}, {a:3}] 
// res = arr.reduce((prev, cur) => {
//     return prev + cur.a;
// }, 0);
// console.log(res);
// arr = [1,2,[3,4]]
// a = arr.reduce((acc, cur) => acc.concat(cur), []);
// console.log(a);
// function flatDeep(arr, d = 1) {
//     return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
//                  : arr.slice();
//  };
// function Instanceof(left, right) {
//     while(true) {
//         if (left == null) return false;
//         if (left.__proto__ === right.prototype) return true;
//         left = left.__proto__;
//     }
// }
// function Instanceof(left, right) {
//     while(true) {
//         if (left == null) return false;
//         if (left.__proto__ === right.prototype) return true;
//         left = left.__proto__;
//     }
// }
// function create(obj) {
//     function F() {};
//     F.prototype = obj;
//     return new F();
// }
// function create(obj) {
//     function F() {};
//     F.prototype = obj;
//     return new F();
// }
// Object.is = function(x, y) {
//     if (x === y) {
//         return x !== 0 || 1 / x === 1 / y;
//     }
//     return x !== x && y !== y;
// }
// JSON.parse1 = function(jsonStr) {
// 	return (new Function('return ' + jsonStr))();
// }
// console.log(JSON.parse1('{a: 1, b: 2,c: 3}'));
// a = {a: 1, b: 2,c: 3};
// console.log(JSON.stringify(a));
// JSON.parse1 = function(jsonStr) {
//     return eval(`(${jsonStr})`);
// }
// console.log(JSON.parse1('{a: 1, b: 2, c: 3, c: 4}'));
// JSON.parse1 = function(jsonStr) {
//     return (new Function(`return ${jsonStr}`))();
// }
// console.log(JSON.parse1('{a: "b"}'));
// Object.assign1 = function(target, ...sources) {
//     if (target == null) throw new TypeError('Cannot convert undefined or null to object');
//     console.log(sources);
//     let res = Object(target);
//     sources.forEach(source => {
//         if (source != null) {
//             console.log(source);
//             for (let key in source) {
//                 if (source.hasOwnProperty(key)) res[key] = source[key];
//             }
//         }
//     })
//     return res;
// }
// Object.assign1 = function (target, ...sources) {
//     if (target == null) throw new TypeErrot('Cannot convert undefined or null to object');
//     const res = Object(target);
//     sources.forEach(source => {
//         if (source != null) {
//             for (let key in source) {
//                 if (source.hasOwnProperty(key)) res[key] = source[key];
//             }
//         }
//     });
//     return res;
// }
// a = {a: 1}
// b = {b: 2}
// c = {c: 3}
// d = [1,2]
// console.log(Object.assign1(a, b, c, d, {a: 5}));
// 实现push
// Array.prototype.push1 = function() {
//     for (let i = 0; i < arguments.length; i++) {
//         this[this.length] = arguments[i];
//     }
//     return this.length;
// }
// Array.prototype.push = function() {
//     for (let i = 0; i < arguments.length; i++) {
//         this[this.length] = arguments[i];
//     }
//     return this.length;
// }
// 实现数组filter
// Array.prototype.filter1 = function(fn) {
//     if (typeof fn !== 'function') throw new TypeError('参数必须是一个函数');
//     let arr = [];
//     for (var i = 0; i < this.length; i++) {
//         if (fn(this[i], i)) arr.push(this[i]);
//     }
//     return arr;
// }
// a = [1,2,3,4,5]
// b = a.filter1((item, index) => {console.log(index); return item >2})
// console.log(b);
// Array.prototype.filter = function(fn) {
//     if (typeof fn !== 'function') throw new TypeError('参数必须是一个函数');
//     let arr = [];
//     for (let i = 0; i < this.length; i++) {
//         if (fn(this[i], i)) arr.push(this[i]);
//     }
//     return arr;
// }
// 实现数组map
// Array.prototype.map = function(fn) {
//     if (typeof fn !== 'function') throw new TypeError('参数必须是一个函数');
//     let arr = [];
//     for (let i = 0; i < this.length; i++) {
//         arr.push(fn(this[i], i));
//     }
//     return arr;
// }
// 实现字符串repeat
// String.prototype.repeat1 = function(n) {
//     return (new Array(n + 1)).join(this);
// }
// a = 'a'
// console.log(a.repeat1(5));
// String.prototype.repeat1 = function(n) {
//     return n > 0 ? this.repeat1(n - 1) + this : '';
// }
// a = 'b'
// console.log(a.repeat1(5));
// 实现Object.create()
// Object.create = function(obj) {
//     function F() {};
//     F.prototype = obj;
//     return new F();
// }
// 实现Object.is
// Object.is = function(x, y) {
//     if (x === y) {
//         return x !== 0 || 1 / x === 1 / y;
//     }
//     return x !== x && y !== y;
// }
// 实现instanceof
// function Instanceof(left, right) {
//     while(true) {
//         if (left == null) return false;
//         if (left.__proto__ === right.prototype) return true;
//         left = left.__proto__;
//     }
// }
// JSON.parse
// JSON.parse1 = function(jsonStr) {
//     return eval(`(${jsonStr})`);
// }
// a = JSON.parse1(`{a: 1, b: 2,c}`)
// console.log(a);
// JSON.parse1 = function(jsonStr) {
//     return (new Function(`return ${jsonStr}`))();
// }
// a = JSON.parse1('{a: 1, b: 2}')
// console.log(a);
// 实现Object.assign
// Object.assign = function(target, ...sources) {
//     if (target == null) throw new TypeError('Cannot convert undefined or nul to object');
//     let res = Object(target);
//     sources.forEach(source => {
//         if (source != null) {
//             for (let key in source) {
//                 if (source.hasOwnProperty(key)) res[key] = source[key];
//             }
//         }
//     });
//     return res;
// }
// Object.assign1 = function(target, ...sources) {
//     if (target == null) throw new TypeError('Cannot convert undefined or null to object');
//     let res = Object(target);    
//     sources.forEach(source => {
//         // if (source != null) {
//             for (let key in source) {
//                 if (source.hasOwnProperty(key)) res[key] = source[key]; 
//             }
//         // }
//     });
//     return res;
// }
// a = 1
// console.log(Object.assign1(a, {b: 1}, 3, {c: 2}, null));
// a = [1,2,3]
// a.flat()
// 实现flat
// function flat(arr, depth) {
//     if (!Array.isArray(arr) || depth <= 0) return arr;
//     return arr.reduce((acc, cur) => {
//         return Array.isArray(cur) ? acc.concat(flat(cur, depth - 1)) : acc.concat(cur);
//     }, []);
// }
// function flat(arr) {
//     let arrs = [...arr];
//     let res = [];
//     while(arrs.length) {
//         let tmp = arrs.shift();
//         Array.isArray(tmp) ? arrs.unshift(...tmp) : res.push(tmp);
//     }
//     return res;
// }
// function flat(arr) {
//     let res = [];
//     arr.forEach(item => {
//         Array.isArray(item) ? res.push(...flat(item)) : res.push(item);
//     });
//     return res;
// }
// 实现数组flat
// function flat(arr, depth = 1) {
//     if (!Array.isArray(arr) || depth <= 0) return arr;
//     return arr.reduce((acc, cur) => {
//         return Array.isArray(cur) ? acc.concat(flat(cur, depth - 1)) : acc.concat(cur);
//     }, []);
// }
// a = [1,2,3,4,[5,6,[7,8,9]]]
// console.log(flat(a, 0));
// function flat(arr) {
//     let res = [];
//     let arrs = [...arr];
//     while(arrs.length) {
//         const tmp = arrs.shift();
//         Array.isArray(tmp) ? arrs.unshift(...tmp) : res.push(tmp);
//     }
//     return res;
// }
// function flat(arr) {
//     const res = [];
//     arr.forEach(item => {
//         Array.isArray(item) ? res.push(...flat(item)) : res.push(item);
//     });
//     return res;
// }
// 实现数组push
// Array.prototype.push = function() {
//     for (let i = 0; i < arguments.length; i++) {
//         this[this.length] = argunments[i];
//     }
//     return this.length;
// }
// 实现数组filter
// Array.prototype.filter = function(fn) {
//     if (typeof fn !== 'function') throw new TypeError('参数必须是一个函数');
//     const res = [];
//     for (let i = 0; i < this.length; i++) {
//         if (fn(this[i], i)) res.push(this[i]);
//     }
//     return res;
// }
// 实现数组map
// Array.prototype.map = function(fn) {
//     if (typeof fn !== 'function') throw new TypeError('参数必须是一个函数');
//     const res = [];
//     for (let i = 0; i < this.length; i++) {
//         res.push(map(this[i], i));
//     }
//     return res;
// }
// 实现字符串repeat
// String.prototype.repeat = function(n) {
//     return (new Array(n + 1)).join(this);
// }
// String.prototype.repeat = function(n) {
//     return n > 0 ? this.repeat(n - 1) + this : '';
// }
// 实现Object.create
// Object.create = function(obj) {
//     function F() {};
//     F.prototype = obj;
//     return new F();
// }
// 实现Object.is
// Object.is = function(x, y) {
//     if (x === y) {
//         return x !== 0 || 1 / x === 1 / y;
//     }
//     return x !== x && y !== y;
// }
// 实现Object.assign
// Object.assign = function(target, ...sources) {
//     if (target == null) throw new TypeError('cannot convert undefined or null to object');
//     const obj = Object(target);
//     sources.forEach(source => {
//         for (let key in source) {
//             if (source.hasOwnProperty(key)) obj[key] = source[key];
//         }
//     });
//     return obj;
// }
// Object.assign = function(target, ...sources) {
//     if (target == null) throw new TypeError('cannot convert undefined or null to object');
//     const res = Object(target);
//     sources.forEach(source => {
//         for (let key in source) {
//             if (source.hasOwnProperty(key)) res[key] = source[key];
//         }
//     });
//     return res;
// }
// 实现instanceof
// function Instanceof(left, right) {
//     while(true) {
//         if (left == null) return false;
//         if (left.__proto__ === right.prototype) return true;
//         left = left.__proto__;
//     }
// }
// 实现JSON.parse
// JSON.parse = function(jsonStr) {
//     return eval(`(${jsonStr})`);
// }
// JSON.parse = function(jsonStr) {
//     return (new Function(`return ${jsonStr}`))();
// }
// 实现数组flat
// function flat(arr, depth = 1) {
//     if (!Array.isArray(arr) || depth <= 0) return arr;
//     return arr.reduce((acc, cur) => {
//         return Array.isArray(cur) ? acc.concat(flat(cur, depth - 1)) : acc.concat(cur);
//     }, []);
// }
// a = [1,2,3,[4,5,[6,7,[8]]]]
// console.log(flat(a));
// function flat(arr, depth = 1) {
//     if (!Array.isArray(arr)) return arr;
//     let arrs = [...arr];
//     const res = [];
//     while(arrs.length) {
//         const tmp = arrs.shift();
//         Array.isArray(tmp) ? arrs.unshift(...tmp) : res.push(tmp);
//     }
//     return res;
// }
// a = [1,2,3,[4,5,[6,7,[8]]]]
// console.log(flat(a));
// function flat(arr, depth = 1) {
//     if (!Array.isArray(arr) || depth <= 0) return arr;
//     const res = []
//     arr.forEach(item => {
//         Array.isArray(item) ? res.push(...flat(item, depth - 1)) : res.push(item);
//     });
//     return res;
// }
// a = [1,2,3,[4,5,[6,7,[8]]]]
// console.log(flat(a, 2));
Function.prototype.call_ = function (obj, ...args) {
    obj = obj == null ? window : Object(obj);
    obj.fn = this;
    let result = obj.fn(...args)
    delete obj.fn
    return result
}
function a() {
    console.log(this);
}
a.call_('')