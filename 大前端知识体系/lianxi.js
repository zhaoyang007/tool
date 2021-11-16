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
// Function.prototype.call_ = function (obj, ...args) {
//     obj = obj == null ? window : Object(obj);
//     obj.fn = this;
//     let result = obj.fn(...args)
//     delete obj.fn
//     return result
// }
// function a() {
//     console.log(this);
// }
// a.call_('')
// 实现数组push
// Array.prototype.push = function() {
//     for (let i = 0; i < arguments.length; i++) {
//         this[this.length]  = arguments[i];
//     }
//     return this.length;
// }
// 实现数组filter
// Array.prototype.filter = function(fn) {
//     if (typeof fn !== 'function') throw new TypeError('参数必须是一个函数');
//     let res = [];
//     for (let i = 0; i < this.length; i++) {
//         if (fn(this[i], i)) res.push(this[i]);
//     }
//     return res;
// }
// 实现数组map
// Array.prototype.map = function(fn) {
//     if (typeof fn !== 'function') throw new TypeError('参数必须是一个函数');
//     let res = [];
//     for (let i = 0; i < this.length; i++) {
//         res.push(fn(this[i], i));
//     }
//     return res;
// }
// 实现数组flat
// function flat(arr, depth = 1) {
//     if (!Array.isArray(arr) || depth <= 0) return arr;
//     return arr.reduce((acc, cur) => {
//         return Array.isArray(cur) ? acc.concat(flat(cur, depth - 1)) : acc.concat(cur);
//     }, []);
// }
// function flat(arr) {
//     const arrs = [...arr];
//     const res = [];
//     while(arrs.length) {
//         const tmp = arrs.shift();
//         Array.isArray(tmp) ? arrs.unshift(...tmp) : res.push(tmp);
//     }
//     return res;
// }
// function flat(arr, depth = 1) {
//     if (!Array.isArray(arr) || depth <= 0) return arr;
//     const res = [];
//     arr.forEach(item => {
//         Array.isArray(item) ? res.push(...flat(item, depth - 1)) : res.push(item);
//     });
//     return res;
// }
// 实现字符串repeat
// String.prototype.repeat = function(n) {
//     return (new Array(n + 1)).join(this);
// }
// String.prototype.repeat = function(n) {
//     return n > 0 ? this.repeat(n - 1) + this : '';
// }
// Object.create = function(obj) {
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
// Object.assign = function(target, sources) {
//     if (target == null) throw new TypeError('cannot revert undefined or null to object');
//     let res = Object(target);
//     sources.forEach(source => {
//         for (let key in source) {
//             if (source.hasOwnProperty(key)) res[key] = source[key];
//         }
//     });
//     return res;
// }
// function Instanceof(left, right) {
//     while(true) {
//         if (left == null) return false;
//         if (left.__proto__ === right.prototype) return true;
//         left = left.__proto__;
//     }
// }
// JSON.parse1 = function(jsonStr) {
//     return eval(`(${jsonStr})`);
// }
// // JSON.parse = function(jsonStr) {
// //     return (new Function(`return ${jsonStr}`))();
// // }
// console.log(JSON.parse1('{b: 12}').b);
// 实现 new
// function New(fn, ...args) {
//     let obj = Object.create(fn.prototype);
//     let res = fn.call(obj, ...args);
//     if (res && (typeof res === 'object' || typeof res === 'function')) {
//         return res;
//     }
//     return obj;
// }
// function New(fn, ...args) {
//     let obj = Object.create(fn.prototype);
//     let res = fn.call(obj, ...args);
//     if (res && (typeof res === 'object' || typeof res === 'function')) {
//         return res;
//     }
//     return obj;
// }
// Function.prototype.bind1 = function(obj, ...args) {
//     if(typeof this !== 'function') throw new TypeError('参数必须是一个函数');
//     obj = obj == null ? window : Object(obj);
//     const fn  = this;
//     const bound = function(...innerArgs) {
//       if (this instanceof bound) {
//         return new fn(...args, ...innerArgs);
//       } else {
//         // return fn.call(obj, ...args, ...innerArgs);
//         obj.fn = fn;
//         const res = obj.fn(...args, ...innerArgs);
//         delete obj.fn;
//         return res;
//       }
//     }
//     return bound;
// }
// function a(...param) {
//     this.a = 2
//     console.log(this.a);
//     console.log(...param);
// }
// a.prototype.b = 3;
// const obj = {a: 1, b: 2};
// // res = a.bind1(obj, 1,2,3);
// res = a.bind1(obj, 1,2);
// res2 = new res(4,5);
// console.log(res2.b);
// 实现数组push
// Array.prototype.push = function() {
//     for (let i = 0; i < arguments.length; i++) {
//         this[this.length] = arguments[i];
//     }
//     return this.length;
// }
// Array.prototype.filter = function(fn) {
//     if (typeof fn !== 'function') throw new TypeError('参数必须是一个函数');
//     const res = [];
//     for (let i = 0; i < this.length; i++) {
//         if (fn(this[i], i)) res.push(this[i]);
//     }
//     return res;
// }
// Array.prototype.map = function(fn) {
//     if (typeof fn !== 'function') throw new TypeError('参数必须是一个函数');
//     const res = [];
//     for (let i = 0; i < this.length; i++) {
//         res.push(fn(this[i], i));
//     }
//     return res;
// }
// 实现数组flat
// function flat(arr, depth) {
//     if (!Array.isArray(arr) || depth <= 0) return arr;
//     return arr.reduce((acc, cur) => {
//         return Array.isArray(cur) ? acc.concat(flat(cur, depth - 1)) : acc.concat(cur);
//     }, []);
// }
// function flat(arr) {
//     const res = [];
//     const arrs = [...arr];
//     while(arrs.length) {
//         const tmp = arrs.shift();
//         Array.isArray(tmp) ? arrs.unshift(...tmp) : res.push(tmp);
//     }
//     return res;
// }
// function flat(arr, depth) {
//     if (!Array.isArray(arr) || depth <= 0) throw new TypeError('参数必须是一个函数');
//     const res = [];
//     arr.forEach(item => {
//         Array.isArray(item) ? res.push(...flat(item, depth - 1)) : res.push(item);
//     });
//     return res;
// }
// 实现字符串 repeat
// String.prototype.repeat = function(n) {
//     return (new Array(n + 1)).join(this);
// }
// String.prototype.repeat = function(n) {
//     return n > 0 ? this.repeat(n - 1) + this : '';
// }
// Object.create = function(obj) {
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
// Object.assign = function(target, sources) {
//     if (target == null) throw new TypeError('cannot revert undefined or null to object');
//     const res = Object(target);
//     sources.forEach(source => {
//         for (let key in source) {
//             if (source.hasOwnProperty(key)) res[key] = source[key];
//         }
//     });
//     return res;
// }
// function Instanceof(left, right) {
//     while(true) {
//         if (left == null) return false;
//         if (left.__proto__ === right.prototype) return true;
//         left = left.__proto__;
//     }
// }
// JSON.parse1 = function(jsonStr) {
//     return eval(`${jsonStr}`);
// }  
// // JSON.parse = function(jsonStr) {
// //     return (new Function(`return ${jsonStr}`))();
// // }
// console.log(JSON.parse1('{a: 1}'));
// function New(fn, ...args) {
//     const obj = Object.create(fn.prototype);
//     const res = fn.call(obj, ...args);
//     if (res && (typeof res === 'object' || typeof res === 'function')) return res;
//     return obj;
// }
// 实现 call, apply, bind
// Function.prototype.call = function(obj, ...args) {
//     obj = obj == null ? window : Object(obj);
//     obj.fn = this;
//     const res = obj.fn(...args);
//     delete obj.fn;
//     return res;
// }
// Function.prototype.apply = function(obj, args) {
//     obj = obj == null ? window : Object(obj);
//     obj.fn = this;
//     const res = args ? obj.fn(...args) : obj.fn();
//     delete obj.fn;
//     return res;
// }
// Function.prototype.bind = function(obj, ...args) {
//     obj = obj == null ? window : Object(obj);
//     const fn = this;
//     const bound = function(...innerArgs) {
//         if (this instanceof bound) {
//             return new fn(...args, ...innerArgs);
//         } else {
//             obj.fn = fn;
//             const res = obj.fn(...args, ...innerArgs);
//             delete obj.fn;
//             return res;
//         }
//     }
//     return bound;
// }
// Function.prototype.call = function(obj, ...args) {
//     obj = obj == null ? window : Object(obj);
//     obj.fn = this;
//     const res = obj.fn(...args);
//     delete obj.fn;
//     return res;
// }
// Function.prototype.applu = function(obj, args) {
//     obj = obj == null ? window : Object(obj);
//     obj.fn = this;
//     const res = args ? obj.fn(...args) : obj.fn();
//     delete obj.fn;
//     return res;
// }
// Function.prototype.bind = function(obj, ...args) {
//     obj = obj == null ? window : Object(obj);
//     const fn = this;
//     const bound = function(...innerArgs) {
//         if (this instanceof bound) {
//             return new fn(...args, ...innerArgs);
//         } else {
//             // return fn.call(obj, ...args, ...innerArgs);
//             obj.fn = fn;
//             const res = obj.fn(...args, ...innerArgs);
//             delete obj.fn;
//             return res;
//         }
//     }
//     return bound;
// }
// Promise.all = promiseArr => {
//     let result = [];
//     let count = 0;
//     return new Promise((resolve, reject) => {
//         if (promises.length === 0) {
//             resolve(result);
//         } else {
//             for (let i = 0; i < promiseArr.length; i++) {
//                 Promise.resolve(promiseArr[i]).then(res => {
//                     result[i] = res;
//                     count++;
//                     if (count === promiseArr.length) {
//                         resolve(result);
//                     }
//                 }, err => {
//                     reject(err);
//                 });
//             }
//         }
//     });
// }
// 实现push
// Array.prototype.push = function() {
//     for (let i = 0; i < arguments.length; i++) {
//         this[this.length] = arguments[i];
//     }
//     return this.length;
// }
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
//         res.push(this[i], i);
//     }
//     return res;
// }
// 实现数组flat
// function flat(arr, depth) {
//     if (!Array.isArray(arr) || depth <= 0) return arr;
//     return arr.reduce((acc, cur) => {
//         return Array.isArray(cur) ? acc.concat(flat(cur, depth - 1)) : acc.concat(cur);
//     }, []);
// }
// function flat(arr) {
//     const res = [];
//     const arrs = [...arr];
//     while(arrs.length) {
//         const tmp = arrs.shift();
//         Array.isArray(tmp) ? arrs.unshift(...tmp) : res.push(tmp);
//     }
//     return res;
// }
// function flat(arr, depth) {
//     if (!Array.isArray(arr) || depth <= 0) throw new TypeError('参数必须是一个函数');
//     const res = [];
//     arr.forEach(item => {
//         Array.isArray(item) ? res.push(...flat(item, depth - 1)) : res.push(item);
//     });
//     return res;
// }
// String.prototype.repeat = function(n) {
//     return (new Array(n + 1)).join('this');
// }
// String.prototype.repeat = function(n) {
//     return n > 0 ? this.repeat(n - 1) + this : '';
// }
// Object.create = function(obj) {
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
// Object.assign1 = function(target, ...sources) {
//     if (target == null) throw new TypeError('cannot convert undefined or null to object');
//     const res = Object(target);
//     sources.forEach(source => {
//         for (let key in source) {
//             if (source.hasOwnProperty(key)) res[key] = source[key]; 
//         }
//     });
//     return res;
// }
// a = {a: 1}
// console.log(Object.assign1(1, {b: 1}));
// console.log();
// function Instanceof(left, right) {
//     while(true) {
//         if (left == null) return false;
//         if (left.__proto__ === right.prototype) return true;
//         left = left.__proto__;
//     }
// }
// JSON.parse = function(jsonStr) {
//     return eval(`(${jsonStr})`);
// }
// JSON.parse = function(jsonStr) {
//     return (new Function(`return ${jsonStr}`))();
// }
// function New(fn, ...args) {
//     const obj = Object.create(fn.prototype);
//     const res = fn.call(obj, ...args);
//     if (res && (typeof res === 'object' || typeof res === 'function')) return res;
//     return obj;
// }
// call,apply,bind
// Function.prototype.call = function(obj, ...args) {
//     obj = obj == null ? window : obj;
//     obj.fn = this;
//     const res = obj.fn(...args);
//     delete obj.fn;
//     return res;
// }
// Function.prototype.apply = function(obj, args) {
//     obj = obj == null ? window : obj;
//     obj.fn = this;
//     const res = args ? obj.fn(...args) : obj.fn();
//     delete obj.fn;
//     return res;
// }
// function a(args) {
//     console.log(...args);
// }
// a(1)
// Function.prototype.bind = function(obj, ...args) {
//     obj = obj == null ? window : obj;
//     const fn = this;
//     const bound = function(...innerArgs) {
//         if (this instanceof bound) {
//             return new fn(...args, ...innerArgs);
//         } else {
//             // return fn.call(obj, ...args, ...innerArgs);
//             obj.fn = fn;
//             const res = obj.fn(...args, ...innerArgs);
//             delete obj.fn;
//             return res;
//         }
//     }
//     return bound;
// }
// Promise.all
// Promise.all = function(promises) {
//     return new Promise((resolve, reject) => {
//         const result = [];
//         let count = 0;
//         if (promises.length === 0) {
//             resolve(res);
//         } else {
//             for (let i = 0; i < promises.length; i++) {
//                 Promise.resolve(promises[i]).then(res => {
//                     count++;
//                     result[i] = res;
//                     if (count === promises.length) {
//                         resolve(result);
//                     }
//                 }, err => {
//                     reject(err);
//                 });
//             }
//         }
//     });
// }
// // Promise.race
// Promise.race = function(promises) {
//     return new Promise((resolve, reject) => {
//         for (let i = 0; i < promises.length; i++) {
//             Promise.resolve(promises[i]).then(res => {
//                 resolve(res);
//             }, err => {
//                 reject(err);
//             })
//         }
//     });
// }
// Promise.all
// Promise.all = function(promises) {
//     return new Promise((resolve, reject) => {
//         const result = [];
//         let count = 0;
//         if (promises.length === 0) {
//             resolve(result);
//         } else {
//             for (let i = 0; i < promises.length; i++) {
//                 Promise.resolve(promises[i]).then(res => {
//                     count++;
//                     result[i] = res;
//                     if (count === promises.length) {
//                         resolve(result);
//                     }
//                 }, err => {
//                     reject(err);
//                 });
//             }
//         }
//     });
// }
// Promise.race = function(promises) {
//     return new Promise((resolve, reject) => {
//         for (let i = 0; i < promises.length; i++) {
//             Promise.resolve(promises[i]).then(res => {
//                 resolve(res);
//             }, err => {
//                 reject(err);
//             })
//         }
//     })
// }
// 实现trim
// String.prototype.trim1 = function() {
//     return this.replace(/^\s*|\s*$/g, '');
// }
// a = '    aaa   '
// console.log(a.trim1());
// String.prototype.trim = function() {
//     return this.replace(/(^\s*)|(\s*$)/g, '');
// }
// 数组去重
// 1
// function uniqueArr(arr) {
//     const res = [];
//     const map = new Map();
//     for (let item of arr) {
//         if (!map.has(item)) {
//             res.push(item);
//             map.set(item, 1);
//         }
//     }
//     return res;
// }
// function uniqueArr(arr) {
//     return [...new Set(arr)];
// }
// function uniqueArr(arr) {
//     const res = [];
//     const map = new Map();
//     for (let item of arr) {
//         if (!map.has(item)) {
//             res.push(item);
//             map.set(item, 1);
//         }
//     }
//     return res;
// }
// 浅拷贝
// Object.assign();
// ...
// a.slice()
// a.concat();
// 深拷贝
// JSON.parse(JSON.stringify());
// function isObjet(obj) {
//     return typeof obj === 'object' && obj !== null;
// }
// function deepClone(obj, hash = new WeapMap()) {
//     if (!isObjet(obj)) return obj;
//     if (hash.has(obj)) return hash.get(obj);
//     const res = Array.isArray(obj) ? [] : {};
//     has.set(obj, res);
//     [
//         ...Object.getOwnPropertyNames(obj),
//         ...Object.getOwnPropertySymbols(obj)
//     ].forEach(k => {
//         res[k] = deepClone(obj[k], hash);
//     });
//     return res;
// }
// function isObject(obj) {
//     return typeof obj === 'object' && obj !== null;
// }
// function deepClone(obj, hash = new WeakMap()) {
//     if (!isObject(obj)) return obj;
//     if (hash.has(obj)) return hash.get(obj);
//     const res = Array.isArray(obj) ? [] : {};
//     hash.set(obj, res);
//     Reflect.ownKeys.forEach(key => {
//         res[key] = deepClone(obj[key], hash);
//     });
//     return res;
// }
class EventEmitter {
    constructor() {
      this.events = {};
    }
    on(name, handler){
      this.events[name] = this.events[name] || [];
      this.events[name].push(handler);
    }
    emit(name, ...args) {
      if (!this.events[name]) throw new Error('该事件未注册');
      if (this.events[name]) {
        this.events[name].forEach(fn => fn.call(this, ...args));
      }
    }
    off(name, handler) {
      if (!this.events[name]) throw new Error('该事件未注册');
      if (!handler) {
              delete this.events[name];
      } else {
        this.events[name] = this.events[name].filter(fn => fn !== handler);
      }
    }
    once(name, handler) {
      this.on(name, (...args) => {
        handler.call(this, ...args);
        this.off(name, handler);
      });
    }
  }