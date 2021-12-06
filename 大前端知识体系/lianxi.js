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
// class EventEmitter {
//     constructor() {
//       this.events = {};
//     }
//     on(name, handler){
//       this.events[name] = this.events[name] || [];
//       this.events[name].push(handler);
//     }
//     emit(name, ...args) {
//       if (!this.events[name]) throw new Error('该事件未注册');
//       if (this.events[name]) {
//         this.events[name].forEach(fn => fn.call(this, ...args));
//       }
//     }
//     off(name, handler) {
//       if (!this.events[name]) throw new Error('该事件未注册');
//       if (!handler) {
//               delete this.events[name];
//       } else {
//         this.events[name] = this.events[name].filter(fn => fn !== handler);
//       }
//     }
//     once(name, handler) {
//       this.on(name, (...args) => {
//         handler.call(this, ...args);
//         this.off(name, handler);
//       });
//     }
//   }
// 实现push
// Array.prototype.push = function() {
//     for (let i = 0; i < arguments.length; i++) {
//         this[this.length] = arguments[i];
//     }
//     return this.length;
// }
// 实现filter
// Array.prototype.filter = function(fn) {
//     if (typeof fn !== 'function') throw new TypeError('参数必须是一个函数');
//     let res = [];
//     for (let i = 0; i < this.length; i++) {
//         if (fn(this[i], i)) res.push(this[i]);
//     }
//     return res;
// }
// 实现map
// Array.prototype.filter = function(fn) {
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
//     if (!Array.isArray(arr) || depth <= 0) return arr;
//     const res = [];
//     arr.forEach(item => {
//         Array.isArray(item) ? res.push(...flat(item, depth - 1)) : res.push(item);
//     });
//     return res;
// }
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
// Object.is = function(obj) {
//     if (x === y) {
//         return x !== 0 || 1 / x === 1 / y;
//     }
//     return x !== x && y !== y;
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
//     obj = obj == null ? windwo : Object(obj);
//     const fn = this;
//     const bound = function(...innerArgs) {
//         if (this instanceof bound) {
//             return new fn(...argrs, ...innerArgs);
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
// Function.prototype.bind = function(obj, ...args) {
//     obj = obj == null ? window : Object(obj);
//     const fn = this;
//     const bound = function(...innerArgs) {
//         if (this instanceof bound) {
//             return new fn(...args, ...innerArgs);
//         } else {
//             return fn.call(obj, ...args, ...innerArgs);
//             // obj.fn = fn;
//             // const res = obj.fn(...args, ...innerArgs);
//             // delete obj.fn;
//             // return res;
//         }
//     }
//     return bound;
// }
// Promise.all = function(promises) {
//     return new Promise((resolve, reject) => {
//         let count = 0;
//         const result = [];
//         if (promises.length === 0) {
//             resolve(result);
//         } else {
//             for (let i = 0; i < promises.length; i++) {
//                 Promise.resolve(promises[i]).then(res => {
//                     result[i] = res;
//                     count++;
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
//     });
// }
// Promise.all = function(promises) {
//     return new Promise((resolve, reject) => {
//         const result = [];
//         let count = 0;
//         if (promises.length === 0) {
//             resolve(result);
//         } else {
//             for (let i = 0; i < promises.length; i++) {
//                 Promise.resolve(promises[i]).then(res => {
//                     result[i] = res;
//                     count++;
//                     if (count === promises.length) {
//                         resolve(result);
//                     }
//                 }, err => {
//                     reject(err);
//                 })
//             }
//         }
//     });
// }
// String.prototype.trim = function() {
//     return this.replace(/(^\s*)|(\s*$)/g, '');
// }
// 数组去重
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
// 浅拷贝
// Object.assign()
// [...]{...}
// arr.slice()
// arr.concat();
// 深拷贝
// JSON.parse(JSON.stringify());
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
// function deepClone(obj, hash = new WeapMap()) {
//     if (!isObject(obj)) return obj;
//     if (hash.has(obj)) return hash.get(obj);
//     const res = Array.isArray(obj) ? [] : {};
//     // Reflect.ownKeys(obj)
//     [
//         ...Object.getOwnPropertyNames(obj),
//         ...Object.getOwnPropertySymbols(obj)
//     ].forEach(key => {
//         res[key] = deepClone(obj[key], hash);
//     });
//     return res;
// }
// function deepClone(obj) {
//     if (!isObject(obj)) return obj;
//     const res = {};
//     res = deepClone(Object.assign(res, obj));
//     return res;
// }
// 节流
// function throttle(fn, delay) {
//     let flag = true;
//     return function(...args) {
//         if (!flag) return;
//         flag = false;
//         setTimeout(() => {
//             fn.call(this, ...agrs);
//             flag = true;
//         }, delay);
//     }
// }
// function throttle(fn, delay = 300) {
//     let flag = true;
//     return function(...args) {
//         if (!flag) return;
//         flag = false;
//         setTimeout(() => {
//             fn.call(this, ...args);
//             flag = true;
//         }, delay);
//     }
// }
// function throttle(fn, delay = 300) {
//     let prev = 0;
//     return function(...args) {
//         const now = Date.now();
//         if (now - prev > delay) {
//             fn.call(this, ...args);
//             prev = now;
//         } 
//     }
// }
// div.addEventListener('drag', throttle(function(e) {
//     console.log(e.offsetX, e.offsetY);
// }, 200));
// 防抖
// function debounce(fn, delay) {
//     let timer;
//     return function(...args) {
//         if (timer) clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.call(this, ...args);
//             timer = null;
//         }, delay);
//     }
// }
// input.addEventListener('keyup', debounce(function(e) {
//     console.log(e.target.value);
// }, delay));
// 节流
// function throttle(fn, delay = 300) {
//     let flag = true;
//     return function(...args) {
//         if (!flag) return;
//         flag = false;
//         setTimeout(() => {
//             fn.call(this, ...args);
//             flag = true;
//         }, delay);
//     }
// }   
// div.addEventListener('drag', throttle(function(e) {
//     console.log(e.offsetX, e.offsetY);
// }, 200));
// function throttle(fn, delay = 300) {
//     let prev = 0;
//     return function(...args) {
//         const now = Date.now();
//         if (now - prev > delay) {
//             fn.call(this, ...args);
//             prev = now;
//         }
//     }
// }
// 防抖
// function debounce(fn, delay = 100) {
//     let timer = null;
//     return function(...args) {
//         if (timer) clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.call(this, ...args);
//             timer = null;
//         }, delay);
//     }
// }
// input.addEventListener('keyup', debounce(function(e) {
//     console.log(e.target.value);
// }, 200));
// class EventEmitter {
//     constructor() {
//         this.events = {};
//     }
//     on(name, handler) {
//         this.events[name] = this.events[name] || [];
//         this.events[name].push(handler);
//     }
//     emit(name, ...args) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         this.events[name].forEach(fn => fn.call(this, ...args));
//     }
//     off(name, handler) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         if (!handler) {
//             delete this.events[name];
//         } else {
//             this.events[name] = this.events[name].filter(fn => fn !== handler);
//         }
//     }
//     once(name, handler) {
//         function fn(...args) {
//             handler.call(this, ...args);
//             this.off(name, fn);
//         }
//         this.on(name, fn);
//     }
// }
// class EventEmitter {
//     constructor() {
//         this.events = {};
//     }
//     on(name, handler) {
//         this.events[name] = this.events[name] || [];
//         this.events[name].push(handler);
//     }
//     emit(name, ...args) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         this.events[name].forEach(fn => fn.call(this, ...args));
//     }
//     off(name, handler) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         if (!handler) {
//             delete this.events[name];
//         } else {
//             this.events[name] = this.events[name].filter(fn => fn !== handler);
//         }
//     }
//     once(name, handler) {
//         function fn(...args) {
//             handler.call(this, ...args);
//             this.off(name, fn);
//         }   
//         this.on(name, fn);
//     }
// }
// function sleep(cb, time) {
//     setTimeout(cb, time);
// }
// function sleep(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }
// sleep(1000).then(res => {
//     console.log(1);
// })
// async function out() {
//     const res = await sleep(2000);
//     console.log(res);
//     console.log(222);
// }
// out();
// 实现数组flat
// function flat(arr, depth) {
//     if (!Array.isArray(arr) || depth <= 0) return arr;
//     return arr.reduce((acc, cur) => {
//         return Array.isArray(cur) ? acc.concat(flat(cur, depth - 1)) : acc.concat(cur);
//     }, []);
// }
// function flat(arr) {
//     const res = [];
//     let arrs = [...arr];
//     while(arrs.length) {
//         const tmp = arrs.shift();
//         Array.isArray(tmp) ? arrs.unshift(...tmp) : res.push(tmp);
//     }
//     return res;
// }
// function flat(arr, depth) {
//     if (!Array.isArray(arr) || depth <= 0) return arr;
//     const res = [];
//     arr.forEach(item => {
//         Array.isArray(item) ? res.push(...flat(item, depth - 1)) : res.push(item);
//     });
//     return res;
// }
// Object.assign = function(target, ...sources) {
//     if (target == null) throw new TypeError('connot revert undefined or null to object');
//     const res = Object(target);
//     sources.forEach(source => {
//         for (let key in source) {
//             if (source.hasOwnProperty(key)) res[key] = source[key];
//         }
//     });
//     return res;
// }
// function New(fn, ...args) {
//     const obj = Object.create(fn.prototype);
//     const res = fn.call(obj, ...args);
//     if (res && (typeof res === 'object' || typeof obj === 'function')) return res;
//     return obj;
// }
// Function.prototype.call = function(obh, ...args) {
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
//             // return fn.call(obj, ...args, ...innerArgs);
//             obj.fn = fn;
//             const res = obj.fn(...args, ...innerArgs);
//             delete obj.fn;
//             return res;
//         }
//     }
//     return bound;
// }
// Promise.all = function(promises) {
//     return new Promise((resolve, reject) => {
//         let count = 0;
//         const result = [];
//         if (promises.length === 0) {
//             resolve(result);
//         } else {
//             for (let i = 0; i < promises.length; i++) {
//                 Promise.resolve(promises[i]).then(res => {
//                     result[i] = res;
//                     count++;
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
//     });
// }
// String.prototype.trim = function() {
//     return this.replace(/(^\s*)|(\s*$)/g, '');
// }
// 数组去重
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
// 浅拷贝
// Object.assign()
// {...}[...]
// arr.slice()
// arr.concat()
// 深拷贝
// JSON.parse(JSON.stringify())
// function isObject(val) {
//     return typeof val === 'object' && val !== null;
// }
// function deepClone(obj, hash = new WeapMap) {
//     if (!isObject(obj)) return obj;
//     if (hash.has(obj)) return hash.get(obj);
//     const res = Array.isArray(obj) ? [] : {};
//     hash.set(obj, res);
//     [
//         ...Object.getOwnPropertyNames(obj),
//         ...Object.getOwnPropertySymbols(obj)
//     ].forEach(key => {
//         res[key] = deepClone(obj[key], hash);
//     });
//     return res;
// }
// 节流
// function throttle(fn, delay = 100) {
//     let flag = true;
//     return function(...args) {
//         if (!flag) return;
//         flag = false;
//         setTimeout(() => {
//             fn.call(this, ...args);
//             flag = true;
//         }, delay);
//     }
// }
// function throttle(fn, delay = 100) {
//     let prev = 0;
//     return function(...args) {
//         const now = Date().now();
//         if (now - prev > delay) {
//             fn.call(this, ...args);
//             prev = now;
//         }
//     }
// }
// div.addEventListener('drag', throttle(function(e) {
//     console.log(e.offsetX, e.offsetY);
// }, 300));   
// 防抖
// function debounce(fn, delay = 100) {
//     let timer = null;
//     return function(...args) {
//         if (timer) clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.call(this, ...args);
//             timer = null;
//         }, delay);
//     }
// }
// input.addEventListener('keyup', debounce(function(e) {
//     console.log(e.target.value);
// }, 300));
// 发布订阅
// class EventEmitter {
//     constructor() {
//         this.events = {};
//     }
//     on(name, handler) {
//         this.events[name] = this.events[name] || [];
//         this.events[name].push(handler);
//     }
//     emit(name, ...args) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         this.events[name].forEach(fn => fn.call(this, ...args));
//     }
//     off(name, handler) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         if (!handler) {
//             delete this.events[name];
//         } else {
//             this.events[name] = this.events[name].filter(fn => fn !== handler);
//         }
//     }
//     once(name, handler) {
//         function fn(...args) {
//             handler.call(this, ...args);
//             this.off(name, fn);
//         }
//         this.on(name, fn);
//     }
// }
// sleep
// function sleep(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }
// async function output() {
//     await sleep(1000);
//     console.log(1);
// }
// output();
// function sleep(cb, time) {
//     setTimeout(cb, time);
// }
// sleep(function() {
//     console.log(111);
// }, 1000)
// sleep(1000).then(res => {
//     console.log(111);
// })
// function New(fn, ...args) {
//     const obj = Object.create(fn.prototype);
//     const res = fn.call(obj, ...args);
//     if (res && (typeof res === 'object' || typeof res === 'function')) return res;
//     return obj;
// }
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
//             });
//         }
//     });
// }
// String.prototype.trim = function() {
//     return this.replace(/(^\s*)|(\s*$)/g, '');
// }
// 数组去重
// function uniqueArr(arr) {
//     const map = new Map();
//     const res = [];
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
// Object.assign()
// {...}[...]
// arr.slice()
// arr.concat()
// JSON.parse(JSON.stringify())
// function isObject(val) {
//     return typeof val === 'object' && val !== null;
// }
// function deepClone(obj, hash = new WeakMap()) {
//     if (val == null || typeof obj !== 'object') return obj;
//     if (hash.has(obj)) return hash.get(obj);
//     const res = Array.isArray(obj) ? [] : {};
//     hash.set(obj, res);
//     Reflect.ownKeys.forEach(key => {
//         res[key] = deepClone(obj[key], hash);
//     });
//     return res;
// }
// 节流
// function throttle(fn, delay = 100) {
//     let flag = true;
//     return function(...args) {
//         if (!flag) return;
//         flag = false;
//         setTimeout(() => {
//             fn.call(this, ...args);
//             flag = true;
//         }, delay);
//     }
// }
// function throttle(fn, delay = 100) {
//     let prev = 0;
//     return function(...args) {
//         const now = Date.now();
//         if (now - prev > delay) {
//             fn.call(this, ...args);
//             prev = now;
//         }
//     }
// }
// div.addEventListener('drag', throttle(function(e) {
//     console.log(e.offsetX, e.offsetY);
// }, 300));
// function debounce(fn, delay = 100) {
//     let timer = null;
//     return function(...args) {
//         if (timer) clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.call(this, ...args);
//             timer = null;
//         }, delay);
//     }
// }
// input.addEventListener('keyup', debounce(function(e) {
//     console.log(e.target.value);
// }, 300));
// class EventEmitter {
//     constructor() {
//         this.events = {};
//     }
//     on(name, handler) {
//         this.events[name] = this.events[name] || [];
//         this.events[name].push(handler);
//     }
//     emit(name, ...args) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         this.events[name].forEach(fn => {
//             fn.call(this, ...args);
//         });
//     }
//     off(name, handler) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         if (!handler) {
//             delete this.events[name];
//         } else {
//             this.events[name] = this.events[name].filter(fn => fn !== handler);
//         }
//     }
//     once(name, handler) {
//         function fn(...args) {
//             handler.call(this, ...args);
//             this.off(name, fn);
//         }
//         this.on(name, fn);
//     }
// }
// function sleep(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }
// async function output() {
//     await sleep(1000);
//     console.log(1);
// }
// sleep(2000).then(() => console.log(2));
// output()
// function curry(fn, ...args) {
//     const length = fn.length;
//     let allArgs = [...args];
//     const res = (...newArgs) => {
//         allArgs = [...allArgs, ...newArgs];
//         console.log(allArgs);
//         if (allArgs.length < length) {
//             return res;
//         } else {
//             return fn(...allArgs);
//         }
//     };
//     return res;
// }
// function curry(fn, args) {
//     var length = fn.length;
//     var args = args || [];
//     return function(){
//         newArgs = args.concat(Array.prototype.slice.call(arguments));
//         console.log(newArgs);
//         if (newArgs.length === length) {
//             return fn.apply(this,newArgs);
//         }else{
//             return curry.call(this,fn,newArgs);
//         }
//     }
// }
// function multiFn(a, b, c) {
//     return a * b * c;
// }
// var multi = curry(multiFn);
// console.log(multi(2)(3)(4))
// // console.log(multi(2,3,4));
// // console.log(multi(2)(3,4));
// console.log(multi(2,3)(4));
// console.log();
// function isObject(val) {
//     return typeof val === "object" && val !== null;
//   }
//   function flatten(obj) {
//     if (!isObject(obj)) return;
//     let res = {};
//     const dfs = (cur, prefix) => {
//       if (isObject(cur)) {
//         if (Array.isArray(cur)) {
//           cur.forEach((item, index) => {
//             dfs(item, `${prefix}[${index}]`);
//           });
//         } else {
//           for (let k in cur) {
//             dfs(cur[k], `${prefix}${prefix ? "." : ""}${k}`);
//           }
//         }
//       } else {
//         res[prefix] = cur;
//       }
//     };
//     dfs(obj, "");
//     return res;
//   }
//   // 测试
//   const obj = {
//    a: {
//      b: 1,
//      c: 2,
//      d: {e: 5}
//    },
//    b: [1, 3, {a: 2, b: 3}],
//    c: 3
//   }
//   console.log(flatten(obj));

//   console.log(1);
// function bindEvent(elem, type, selector, fn) {
//     if (fn == null) {
//         fn = selector;
//         selector = null;
//     }
//     elem.addEventListener(type, e => {
//         if (selector) {
//             if (e.target.matched(selector)) {
//                 fn.call(e.target, e);
//             } 
//         } else {
//             fn.call(e.target, e);
//         }
//     });
// }
// 通用事件封装
// function bindEvent(elem, type, selector, fn) {
//     if (fn == null) {
//         fn = selector;
//         selector = null;
//     }
//     elem.addEventListener(type, function(event) {
//         const target = event.target;
//         if (selector) {
//             if (target.matched(selector)) {
//                 fn.call(target, event);
//             }
//         } else {
//             fn.call(target, event);
//         }
//     });
// }
// function bindEvent(elem, type, selector, fn) {
//     if (fn == null) {
//         fn = selector;
//         selector = null;
//     }
//     elem.addEventListener(type, function(event) {
//         const target = event.target;
//         if (selector) {
//             if (target.matched(selector)) {
//                 fn.call(target, event);
//             }
//         } else {
//             fn.call(target, event);
//         }
//     });
// }
// bindEvent('div', 'click', 'p', function(event) {
//     console.log(event.target);
// })
// function ajax(url, method, data) {
//     return new Promise((resolve, reject) => {
//         const xhr = XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.onreadystatechange = function() {
//             if (xhr.readystate === 4) {
//                 if (xhr.status === 200) {
//                     resolve(JSON.parse(xhr.responseText));
//                 } else {
//                     reject(new Error(xhr.responseText));
//                 }
//             }
//         }
//         method === 'GET' ? xhr.send() : xhr.send(JSON.stringify(data));
//     });
// }
// function ajax(url, method, postData) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open(url, method);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.onreadystatechange = function() {
//             if (xhr.readstate === 4) {
//                 if (xhr.status === 200) {
//                     resolve(JSON.parse(xhr.responseText));
//                 } else {
//                     reject(new Error(xhr.responseText));
//                 }
//             }
//         }
//         method === 'GET' ? xhr.send() : xhr.send(JSON.stringify(postData));
//     });
// }
// function setInterval(fn, time) {
//     function interval() {
//         fn();
//         setTimeout(interval, time);
//     }
//     return setTimeout(interval, time);
// }
// function setTimeout(fn, time) {
//     const timer = setInterval(() => {
//         fn();
//         clearInterval(timer);
//     }, time);
//     return timer;
// }
// function New(fn, ...args) {
//     const obj = Object.create(fn.prototype);
//     const res = fn.call(obj, ...args);
//     if (res && (typeof res === 'object' || typeof res === 'function')) return res;
//     return obj;
// }
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
// Promise.all = function(promises) {
//     return new Promise((resolve, reject) => {
//         const result = [];
//         let count = 0;
//         if (promises.length === 0) {
//             resolve(result);
//         } else {
//             for (let i = 0; i < promises.length; i++) {
//                 Promise.resolve(promises[i]).then(res => {
//                     result[i] = res;
//                     count++;
//                     if (count === promises.length) {
//                         resolve(result);
//                     }
//                 }, err => {
//                     reject(err);
//                 })
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
//             });
//         }
//     });
// }
// String.prototype.trim = function() {
//     return this.replace(/(^\s*)|(\s*$)/g, '');
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
// function uniqueArr(arr) {
//     return [...new Set(arr)];
// }
// Object.assign()
// {...}[...]
// arr.slice()
// arr.concat()
// JSON.parse(JSON.stringify());
// function isObject(val) {
//     return typeof val === 'object' && val !== null;
// }
// function deepClone(obj, hash = new WeapMap) {
//     if (obj == null || typeof obj !== 'object') return obj; 
//     if (hash.has(obj)) return hash.get(obj);
//     const res = Array.isArray(obj) ? [] : {};
//     hash.set(obj, res);
//     Reflect.ownKeys.forEach(key => {
//         res[key] = deepClone(obj[key], hash);
//     });
//     return res;
// }
// function throttle(fn, delay = 100) {
//     let flag = true;
//     return function(...args) {
//         if (!flag) return;
//         flag = false;
//         setTimeout(() => {
//             fn.call(this, ...args);
//             flag = true;
//         }, delay);
//     }
// }
// function throttle(fn, delay = 100) {
//     let prev = 0;
//     return function(...argsx    ) {
//         const now = Date.now();
//         if (now - prev > delay) {
//             fn.call(this, ...args);
//             prev = now;
//         } 
//     }
// }
// div.addEventListener('drag', throtthle(function(e) {
//     console.log(e.offsetX, e.offsetY);
// }, 200));
// function debounce(fn, delay = 100) {
//     let timer = null;
//     return function(...args) {
//         if (timer) clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.call(this, ...args);
//             timer = null;
//         }, delay);
//     }
// }
// input.addEventListener('keyup', debounce(function(e) {
//     console.log(e.target.value);
// }, 200));
// class EventEmitter {
//     constructor() {
//         this.events = {};
//     }
//     on(name, handler) {
//         this.events[name] = this.events[name] || [];
//         this.events[name].push(handler);
//     }
//     emit(name, ...args) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         this.events[name].forEach(fn => {
//             fn.call(this, ...args);
//         });
//     }
//     off(name, handler) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         if (!handler) {
//             delete this.events[name];
//         } else {
//             this.events[name] = this.events[name].filter(fn => fn !== handler);
//         }
//     }
//     once(name, handler) {
//         function fn(...args) {
//             handler.call(this, ...args);
//             this.off(name, fn);
//         }
//         this.on(name, fn);
//     }
// }
// function sleep(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }
// sleep(1000).then(() => {
//     console.log(1);
// });
// async function a() {
//     await sleep(2000);
//     console.log(2);
// }
// a();
// function bindEvent(elem, type, selector, fn) {
//     if (fn == null) {
//         fn = selector;
//         selector = null;
//     }
//     elem.addEventListener(type, function(event) {
//         const target = event.target;
//         if (selector) {
//             if (target.matched(selector)) {
//                 fn.call(target, event);
//             }
//         } else {
//             fn.call(target, event);
//         }
//     });
// }
// function ajax(url, method, postData) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.onreadystatechange = function() {
//             if (xhr.readystate === 4) {
//                 if (xhr.status === 200) {
//                     resolve(JSON.parse(xhr.responseText));
//                 } else {
//                     reject(new Error(xhr.responseText));
//                 }
//             }
//         }
//         method === 'GET' ? xhr.send() : xhr.send(JSON.stringify(postData));
//     });
// }
// function setInterval(fn, time) {
//     function interval() {
//         fn();
//         setTimeout(interval, time);
//     }
//     return setTimeout(interval, time);
// }
// function setTimeout(fn, time) {
//     const timer = setInterval(() => {
//         fn();
//         clearInterval(timer);
//     }, time);
//     return timer;
// }
// function createScript(src) {
//     const script = document.createElement('script');
//     script.src = src;
//     script.type = 'text/javascript';
//     document.body.appendChild(script);
// }
// createScript('http://xxx.xxx.com/xxx.js?callbach=handleResponse');
// function handleResponse(res) {
//     console.log(res);
// }
// handleResponse({a: 1, b: 2});
// function createScript(src) {
//     const script = document.createElement('script');
//     script.src = src;
//     script.type = 'text/javascript';
//     document.body.appendChild(script);
// }
// createScript('http://xxx.xxx.com/xxx.js?callback=handleResponse');
// function handleResponse(res) {
//     console.log(res);
// }
// handleResponse({a: 1, b: 2})
// function query(name) {
//     const search = window.location.search.substring(1);
//     const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
//     const res = search.match(reg);
//     if (res == null) return null;
//     return res[2];
// }
// function query(name) {
//     const search = location.search;
//     const p = new URLSearchParams(search);
//     return p.get(name);
// }
// String.prototype.trim = function() {
//     return this.replace(/(^\s*)|(\s*$)/g, '');
// }
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
// Promise.all = function(promises) {
//     return new Promise((resolve, reject) => {
//         const result = [];
//         let count = 0;
//         if (promises.length === 0) {
//             resolve(result);
//         } else {
//             for (let i = 0; i < promises.length; i++) {
//                 Promise.resolve(promises[i]).then(res => {
//                     result[i] = res;
//                     count++;
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
//             });
//         }
//     });
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
// function uniqueArr(arr) {
//     return [...new Set(arr)];
// }
// Object.assign()
// ...
// arr.slice()
// arr.concat()
// JSON.parse(JSON.stringify());
// function deepClone(obj, hash = new WeapMap) {
//     if (typeof obj !== 'object' || obj == null) return obj;
//     if (hash.has(obj)) return hash.get(obj);
//     const res = Array.isArray(obj) ? [] : {};
//     hash.set(obj, res);
//     Reflect.ownKeys.forEach(key => {
//         res[key] = deepClone(obj[key], hash);
//     });
//     return res;
// }
// function throttle(fn, delay) {
//     let flag = true;
//     return function(...args) {
//         if (!flag) return;
//         flag = false;
//         setTimeout(() => {
//             fn.call(this, ...args);
//             flag = true;
//         }, delay);
//     }
// }
// function throttle(fn, delay = 100) {
//     let prev = 0;
//     return function(...args) {
//         const now = Date.now();
//         if (now - prev > delay) {
//             fn.call(this, ...args);
//             prev = now;
//         }
//     }
// }
// div.addEventListener('drag', throttle(function(e) {
//     console.log(e.offsetX);
// }, 200))
// function debounce(fn, delay = 100) {
//     let timer = null;
//     return function(...args) {
//         if (timer) clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.call(this, ...args);
//             timer = null;
//         }, delay); 
//     }
// }
// input.addEventListener('keyup', debounce(function(e) {
//     console.log(e.target.value);
// }, 200));
// class EventEmitter {
//     constructor() {
//         this.events = {};
//     }
//     on(name, handler) {
//         this.events[name] = this.events[name] || [];
//         this.events[name].push(handler);
//     }
//     emit(name, ...args) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         this.events[name].forEach(fn => fn.call(this, ...args));    
//     }
//     off(name, handler) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         if (!handler) {
//             delete this.events[name];
//         } else {
//             this.events[name] = this.events[name].filter(fn => fn !== handler);
//         }
//     }
//     once(name, handler) {
//         function fn(...args) {
//             handler.call(this, ...args);
//             this.off(name, fn);
//         }
//         this.on(name, fn);
//     }
// }
// function sleep(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }
// function bindEvent(elem, type, selector, fn) {
//     if (fn == null) {
//         fn = selector;
//         selector = null;
//     }
//     elem.addeventListener(type, function(e) {
//         const target = e.target;
//         if (selector) {
//             if (target.matched(selector)) {
//                 fn.call(target, e);
//             }
//         } else {
//             fn.call(target, e);
//         }
//     });
// }
// function ajax(url, method, postData) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === 4) {
//                 if (xhr.status === 200) {
//                     resolve(JOSN.parse(xhr.responseText));
//                 } else {
//                     reject(new Error(xhr.responseText));
//                 }
//             } 
//         }
//         method === 'GET' ? xhr.send() : xhr.send(JSON.stringify(postData));
//     });
// }
// function setInterval(fn, time) {
//     function interval() {
//         fn();
//         setTimeout(interval, time);
//     }
//     return setTimeout(interval, time);
// }
// function setTimeout(fn, time) {
//     const timer = setInterval(function() {
//         fn();
//         clearInterval(timer);
//     }, time);
//     return timer;
// }
// function createScript(src) {
//     const script = document.createElement('script');
//     script.src = src;
//     script.type = 'text/javascript';
//     document.body.appendChild(script);
// }
// createScript('http://xxx.xxx.com?callback=handleResponse');
// function handleResponse(res) {
//     console.log(res);
// }
// // handleResponse({a: 1, b: 2});
// function query(name) {
//     const search = location.search.substring(1);
//     const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, i);
//     const res = search.match(reg);
//     if (res == null) return null;
//     return res[2];
// }
// function query(name) {
//     const search = new URLSearchParams();
//     return search.name;
// }
// function isObject(val) {
//   return typeof val === 'object' && val !== null;
// }
// function flatten2(obj) {
//   if (!isObject(obj)) return;
//   const res = {};
//   function dfs(cur, prefix) {
//     if (isObject(cur)) {
//       if (Array.isArray(cur)) {
//         cur.forEach((item, index) => {
//           dfs(item, `${prefix}[${index}]`);
//         });
//       } else {
//         for (let key in cur) {
//           dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`);
//         }
//       }
//     } else {
//       res[prefix] = cur;
//     }
//   }
//   dfs(obj, '');
//   return res;
// }
// const obj = {
//   a: {
//     b: 1,
//     c: 2,
//     d: {e: 5}
//   },
//   b: [1, 3, {a: 2, b: 3}],
//   c: 4
// };
// console.log(flatten2(obj));
// String.prototype.trim = function() {
//     return this.replace(/(^\s*)|(\s*$)/g, '');
// }
// Promise.all = function(promises) {
//   return new Promise((resolve, reject) => {
//     const result = [];
//     let count = 0;
//     if (promises.length === 0) {
//       resolve(result);
//     } else {
//       for (let i = 0; i < promises.length; i++) {
//         Promise.resolve(promises[i]).then(res => {
//           result[i] = res;
//           count++;
//           if (count === promises.length) {
//             resolve(result);
//           }
//         }, err => {
//           reject(err);
//         });
//       }
//     }
//   });
// }
// Promise.race = function(promises) {
//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < promises.length; i++) {
//       Promise.resolve(promises[i]).then(res => {
//         resolve(res);
//       }, err => {
//         reject(err);
//       })
//     }
//   });
// }
// function uniqueArr(arr) {
//   const res = [];
//   const map = new Map();
//   for (let item of arr) {
//     if (!map.has(item)) {
//       res.push(item);
//       map.set(item, 1);
//     }
//   }
//   return res;
// }
// function uniqueArr(arr) {
//   return [...new Set(arr)];
// }
// Object.assign()
// ...
// arr.slice()
// arr.concat()
// JSON.parse(JSON.stringify())
// function deepClone(obj, hash = new WeapMap()) {
//   if (typeof obj !== 'object' || obj === null) return obj;
//   if (hash.has(obj)) return hash.get(obj);
//   const res = Array.isArray(obj) ? [] : {};
//   hash.set(obj, res);
//   [...Object.getOwnPropertyNames, ...Object.getOwnPropertySymbols].forEach(key => {
//     res[key] = deepClone(obj[key], hash);
//   })
//   return res;
// }
// function throttle(fn, delay = 100) {
//   let flag = true;
//   return function(...args) {
//     if (!flag) return;
//     flag = false;
//     setTimeout(() => {
//       fn.call(this, ...args);
//       flag = true;
//     }, delay);
//   }
// }
// function throttle(fn, delay = 100) {
//   let prev = 0;
//   return function(...args) {
//     const now = Date.now();
//     if (now - prev > delay) {
//       fn.call(this, ...args);
//       prev = now;
//     }
//   }
// }
// div.addEventListener('drag', throttle(function(e) {
//   console.log(e.offsetX, e.offsetY);
// }, 200))
// function debounce(fn, delay = 100) {
//   let timer = null;
//   return function(...args) {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn.call(this, ...args);
//       timer = null;
//     }, delay);
//   }
// }
// input.addEventListen(debounce(function(e) {
//   console.log(e.target.value);
// }, 150));
// class EventEmitter {
//   constructor() {
//     this.events = {};
//   }
//   on(name, handler) {
//     this.events[name] = this.events[name] || [];
//     this.events[name].push(handler);
//   }
//   emit(name, ...args) {
//     if (!this.events[name]) throw new Error('该事件未注册');
//     this.events[name].forEach(fn => fn.call(this, ...args));
//   }
//   off(name, handler) {
//     if (!this.events[name]) throw new Error('该事件未注册');
//     if (!handler) {
//       delete this.events[name];
//     } else {
//       this.events[name] = this.events[name].filter(fn => fn !== handler);
//     } 
//   }
//   once(name, handler) {
//     function fn(...args) {
//       handler.call(this, ...args);
//       this.off(name, fn);
//     }
//     this.on(name, fn);
//   }
// }
// function sleep(time) {
//   return new Promise(resolve => setTimeout(resolve, time));
// }
// function bindEvent(elem, type, selector, fn) {
//   if (fn == null) {
//     fn = selector;
//     selector = null;
//   }
//   elem.addEventListener(type, function(event) {
//     const target = event.target;
//     if (selector) {
//       if (target.match(selector)) {
//         fn.call(target, event);
//       }
//     } else {
//       fn.call(target, event);
//     }
//   });
// }
// function ajax(url, method, postData) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open(method, url);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.onreadystatechange = function() {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           resolve(JSON.parse(xhr.responseText));
//         } else {
//           reject(new Error(xhr.responseText));
//         }
//       }
//     }
//     method === 'GET' ? xhr.send() : xhr.send(JSON.stringify(postData));
//   });
// }
// function setInteval(fn, time) {
//   function interval() {
//     fn();
//     setTimeout(interval, time);
//   }
//   return setTimeout(interval, time);
// }
// function setTimeout(fn, time) {
//   const timer = setInterval(function() {
//     fn();
//     clearInterval(timer);
//   }, time);
//   return timer;
// }
// function createScript(src) {
//   const script = document.createElement();
//   script.src = src;
//   script.type = 'text/javascript';
//   document.body.appendChild(script);
// }
// createScript('http://xxx.xxx.com?callback=handleResponse');
// function handleResponse(res) {
//   console.log(res);
// }
// handleResponse({a: 1, b: 2});
// function query(name) {
//   const search = location.search.substring(1);
//   const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, i);
//   const res = search.match(reg);
//   return res ? res[2] : null;
// }
// function query(name) {
//   const p = new URLSearchParams(location.search);
//   return p.get(name);
// }
// function isObject(val) {
//   return typeof val === 'object' && val !== null;
// }
// function flatten(obj) {
//   if (!isObject(obj)) return obj;
//   const res = {};
//   function dfs(cur, prefix) {
//     if (isObject(cur)) {
//       if (Array.isArray(cur)) {
//         cur.forEach((item, index) => {
//           dfs(item, `${prefix}[${index}]`);
//         });
//       } else {
//         for (let key in cur) {
//           dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`);
//         }
//       }
//     } else {
//       res[prefix] = cur; 
//     }
//   }
//   dfs(obj, '');
//   return res;
// }
// const obj = {
//   a: {
//     b: 1,
//     c: 2,
//     d: {e: 5}
//   },
//   b: [1, 3, {a: 2, b: 3}],
//   c: 3
// };
// console.log(flatten(obj));
// function throttle(fn, delay = 100) {
//     let flag = true;
//     return function(...args) {
//         if (!flag) return;
//         flag = false;
//         setTimeout(() => {
//             fn.call(this, ...args);
//             flag = true;
//         });
//     }
// }
// function throttle(fn, delay) {
//     let prev = 0;
//     return function(...args) {
//         const now = Date.now();
//         if (now - prev > delay) {
//             fn.call(this, ...args);
//             prev = now;
//         }
//     }
// }
// div.addEventListen('drag', throttle(function(e) {
//     console.log(e.offsetX, e.offsetY);
// }, 200));
// function debounce(fn, delay = 100) {
//     let timer = null;
//     return function(...args) {
//         if (timer) clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.call(this, ...args);
//             timer = null;
//         }, delay);
//     }
// }
// input.addEventListen('keyup', debounce(function(e) {
//     console.log(e.target.value);
// }, 200));
// class EventEmitter {
//     constructor() {
//         this.events = {};
//     }
//     on(name, handler) {
//         this.events[name] = this.events[name] || [];
//         this.events[name].push(handler);
//     }
//     emit(name, ...args) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         this.events[name].forEach(fn => fn.call(this, ...args));
//     }
//     off(name, handler) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         if (!handler) {
//             delete this.events[name];
//         } else {
//             this.events[name] = this.events[name].filter(fn => fn !== handler);
//         }
//     }
//     once(name, handler) {
//         function fn(...args) {
//             handler.call(this, ...args);
//             this.off(name, fn);
//         }
//         this.on(name, fn);
//     }
// }
// function sleep(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }
// function bindEvent(elem, type, selector, fn) {
//     if (fn == null) {
//         fn = selector;
//         selector = null;
//     }
//     elem.addEventListener(type, function(e) {
//         const target = e.target;
//         if (selector) {
//             if (selector.contains(target)) {
//                 fn.call(target, e);
//             }
//         } else {
//             fn.call(target, e);
//         }
//     });
// }
// function ajax(url, method, postData) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === 4) {
//                 if (xhr.status === 200) {
//                     resolve(JSON.parse(xhr.responseText));
//                 } else {
//                     reject(new Error(xhr.responseText));
//                 }
//             }
//         }
//         method === 'GET' ? xhr.send() : xhr.send(JSON.stringify(postData));
//     });
// }
// function setInterval(fn, time) {
//     function interval() {
//         fn();
//         setTimeout(interval, time);
//     }
//     return setTimeout(interval, time);
// }
// function setTimeout(fn, time) {
//     const timer = setInterval(() => {
//         fn();
//         clearInterval(timer);
//     }, time);
//     return timer;
// }
// function createScript(src) {
//     const script = document.createElement('script');
//     script.src = src;
//     script.type = 'text/javascript';
//     document.body.appendChild(script);
// }
// createScript('http://xxx.xxx.com/xxx.js?callback=handleResponse');
// function handleResponse(res) {
//     console.log(res);
// }
// handleResponse({a:1,b:2})
// function query(name) {
//     const search = location.search.substring(1);
//     const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
//     const res = search.match(reg);
//     return res ? res[2] : null;
// }
// function query(name) {
//     const p = new URLSearchParams(location.search);
//     return p.get(name);
// }
// function isObject(val) {
//     return typeof val === 'object' && val !== null;
// }
// function flatten(obj) {
//     if (!isObject(obj)) return obj;
//     const res = {};
//     function dfs(cur, prefix) {
//         if (isObject(cur)) {
//             if (Array.isArray(cur)) {
//                 cur.forEach((item, index) => {
//                     dfs(item, `${prefix}[${index}]`);
//                 });
//             } else {
//                 for (let key in cur) {
//                     dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`);
//                 }
//             }
//         } else {
//             res[prefix] = cur;
//         }
//     }
//     dfs(obj, '');
//     return res;
// }
// const obj = {
//     a: {
//         b: 1,
//         c: 2,
//         d: {e: 5}
//     },
//     b: [1, 3, {a: 2, b: 3}],
//     c: 3
// };
// console.log(flatten(obj));
// 取消promise
// function cancel(promise) {
//     const obj = {};
//     const p = new Promise((resolve, reject) => {
//         obj.resolve = resolve;
//         obj.reject = reject;
//     });
//     obj.promise = Promise.race([p, promise]);
//     return obj;
// }
// const testPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 2000);
// })
// const cancelPromise = cancel(testPromise);
// cancelPromise.promise.then(res => {
//     console.log(res);
// });
// Promise.prototype.finally = function(cb) {
//     const P = this.constructor;
//     return this.then(res => {
//         return P.resolve(cb()).then(() => res);
//     }, err => {
//         return P.resolve(cb()).then(() => { throw err });
//     });
// }
// 实现let
// {
//     let a = 1;
//     console.log(a);
// }
// console.log(a);
// (function() {
//     var a = 2;
//     console.log(a);
// })();
// console.log(a);
// var fns = [];
// for (let i = 0; i < 10; i++) {
//     fns[i] = function() {
//         console.log(i);
//     }
// }
// fns[8]();
// var fns = [];
// for (var i = 0; i < 10; i++) {
//     (function(i) {
//         fns[i] = function() {
//             console.log(i);
//         }
//     })(i);
// }
// fns[7]()
// 实现const
// function _const(key, value) {
//     window.key = value;
//     Object.defineProperties(window, key, {
//         enumerable: false,
//         configurable: false,
//         get: function() {
//             return value;
//         },
//         set: function(newVal) {
//             if (newVal !== value) {
//                 throw new TypeError('不能重复定义');
//             } else {
//                 return value;
//             }
//         }
//     });
// }
// function _const(key, value) {
//     window.key = value;
//     Object.defineProperty(window, key, {
//         enumerable: false,
//         configurable: false,
//         get: function() {
//             return value;
//         },
//         set: function(newVal) {
//             if (newVal !== value) {
//                 throw new TypeError('不能重复定义');
//             } else {
//                 return value;
//             }
//         }
//     })
// }
// function sleep(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }
// function bindEvent(elem, type, selector, fn) {
//     if (fn == null) {
//         fn = selector;
//         selector = null;
//     }
//     elem.addEventListener(type, function(e) {
//         const target = e.target;
//         if (selector) {
//             if (selector.contains(target)) {
//                 fn.call(e.target, e);
//             }
//         } else {
//             fn.call(e.target, e);
//         }
//     });
// }
// ajax
// function ajax(url, method, postData) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === 4) {
//                 if (xhr.status === 200) {
//                     resolve(JSON.parse(xhr.responseText));
//                 } else {
//                     reject(new Error(xhr.responseText));
//                 }
//             }
//         }
//         method === 'GET' ? xhr.send() : xhr.send(JSON.stringify(postData));
//     });
// }
// function setInterval(fn, time) {
//     function interval() {
//         fn();
//         setTimeout(interval, time);
//     }
//     return setTimeout(interval, time);
// }
// function setTimeout(fn, time) {
//     const timer = setInterval(function() {
//         fn();
//         clearInterval(timer);
//     }, time);
//     return timer;
// }
// function createScript(src) {
//     const script = document.createElement('script');
//     script.src = src;
//     script.type = 'text/javascript';
//     document.body.appendChild(script);
// }
// createScript('http://xxx.xxx.com/xxx.js?callbach=handleResponse');
// function handleResponse(res) {
//     console.log(res);
// }
// handleResponse({a: 1, b: 2});
// function query(name) {
//     const search = location.search.substring(1);
//     const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
//     const res = search.match(reg);
//     return res ? res[2] : null;
// }
// function query(name) {
//     const p = new URLSearchParams(location.search);
//     return p.get(name);
// }
// function isObject(val) {
//     return typeof val === 'object' && val !== null;
// }
// function flatten(obj) {
//     if (!isObject(obj)) return obj;
//     const res = {};
//     function dfs(cur, prefix) {
//         if (isObject(cur)) {
//             if (Array.isArray(cur)) {
//                 cur.forEach((item, index) => {
//                     dfs(item, `${prefix}[${index}]`);
//                 });
//             } else {
//                 for (let key in cur) {
//                     dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`);
//                 }
//             }
//         } else {
//             res[prefix] = cur; 
//         }
//     }
//     dfs(obj, '');
//     return res;
// }
// const obj = {
//     a: {
//       b: 1,
//       c: 2,
//       d: {e: 6}
//     },
//     b: [1, 3, {a: 2, b: 3}],
//     c: 3
//   };
// console.log(flatten(obj));
// Promise.prototype.finally
// Promise.prototype.finally3 = function(cb) {
//     const P = this.constructor;
//     return this.then(res => {
//         cb()
//       return res;
//     }, err => {
//       return P.resolve(cb()).then(() => { throw err });
//     });
//   }
// Promise.prototype.finally4 = function(cb) {
//     const P = this.constructor;
//     return this.then(res => {
//       return P.resolve(cb()).then(() => res);
//     }, err => {
//       return P.resolve(cb()).then(() => { throw err });
//     });
//   }
// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//             resolve(123);
//     }, 1000);
// });
// p.then(res => {
//         console.log(res);
//         return res;
//     })
//     .then(res => {
//         return Promise.resolve(cb()).then(() => res);
//       }, err => {
//         return Promise.resolve(cb()).then(() => { throw err });
//       })
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => {})
// 取消promise
// function cancel(promise) {
//     const obj = {};
//     const p = new Promise((resolve, reject) => {
//       obj.resolve = resolve;
//       obj.reject = reject;
//     });
//     obj.promise = Promise.race([p, promise]);
//     return obj;
//   }
//   // 使用
//   const testPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('成功');
//       resolve(1);
//     }, 1000);
//   });
//   const cancelPromise = cancel(testPromise);
//   cancelPromise.promise.then(res => {
//     console.log(res);
//   }); 
//   // 取消
//   cancelPromise.resolve("取消");
// {
//     let a = 1
// }
// (function() {
//     var a = 1;
// // })()
// fns = [];
// // for (let i = 0; i < 10; i++) {
// // }
// for (var i = 0; i < 10; i++) {
//     (function(i) {
//         fns[i] = function() {
//             console.log(i);
//         }
//     })(i);
// }
// fns[5]()
// function _const(key, value) {
//     window.key = value;
//     Object.defineProperty(window, key, {
//         enumerable: false,
//         configurable: false,
//         get: function() {
//             return value;
//         },
//         set: function(newVal) {
//             if (newVal !== value) {
//                 throw new TypeError('不能重复定义');
//             } else {
//                 return value;
//             }
//         }
//     })
// }
// Promise.prototype.finally = function(cb) {
//     const P = this.constructor;
//     return this.then(res => {
//         return P.resolve(cb()).then(() => res);
//     }, err => {
//         return P.resolve(cb()).then(() => {throw err});
//     })
// }
// function bindEvent(elem, type, selector, fn) {
//     if (fn == null) {
//         fn = selector;
//         selector = null;
//     }
//     elem.addEventListener(type, function(e) {
//         const target = e.target;
//         if (selector) {
//             if (selector.contains(target)) {
//                 fn.call(target, e);
//             }
//         } else {
//             fn.call(target, e);
//         }
//     })
// }
// function ajax(url, method, postData) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === 4) {
//                 if (xhr.status === 200) {
//                     resolve(JSON.parse(xhr.responseText));
//                 } else {
//                     reject(new Error(xhr.responseText));
//                 }
//             }
//         }
//         method === 'GET' ? xhr.send() : xhr.send(JSON.stringify(postData));
//     });
// }
// function setInterval(fn, time) {
//     function interval() {
//         fn();
//         setTimeout(interval, time);
//     }
//     return setTimeout(interval, time);
// }
// function setTimeout(fn, time) {
//     const timer = setInterval(() => {
//         fn();
//         clearInterval(timer);
//     }, time);
//     return timer;
// }
// function createScript(src) {
//     const script = document.createElement('script');
//     script.src = src;
//     script.type = 'text/javascript';
//     document.body.appendChild(script);
// }
// createScript('http://xxx.xxx.com/xxx.js?callback=handleResponse');
// function handleResponse(res) {
//     console.log(res);
// }
// handleResponse({a: 1, b: 2});
// function query(name) {
//     const search = location.search;
//     const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
//     const res = search.match(reg);
//     return res ? res[2] : null;
// }
// function query(name) {
//     const p = new URLSearchParams(location.search);
//     return p.get(name);
// }
// function isObject(val) {
//     return typeof val === 'object' && obj !== null;
// }
// function flatten(obj) {
//     if (!isObject(obj)) return obj;
//     const res = {};
//     function dfs(cur, prefix) {
//         if (isObject(cur)) {
//             if (Array.isArray(cur)) {
//                 cur.forEach((item, index) => {
//                     dfs(item, `${prefix}[${index}]`);
//                 });
//             } else {
//                 for (let key in cur) {
//                     dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`);
//                 }
//             }
//         } else {
//             res[prefix] = cur;
//         }
//     }
//     dfs(obj, '');
//     return res;
// }
// const obj = {
//     a: {
//       b: 1,
//       c: 2,
//       d: {e: 5}
//     },
//     b: [1, 3, {a: 2, b: 3}],
//     c: 7
// };
// console.log(flatten(obj));
// Promise.prototype.finally = function(cb) {
//     const P = this.constructor;
//     return this.then(res => {
//         return P.resolve(cb()).then(() => res);
//     }, err => {
//         return P.resolve(cb()).then(() => {throw err});
//     });
// }
// function cancel(promise) {
//     const obj = {};
//     const p = new Promise((resolve, reject) => {
//         obj.resolve = resolve;
//         obj.reject = reject;
//     });
//     obj.promise = Promise.race([p, promise]);
//     return obj;
// }
// const testPromise =  new Promise(resolve => {
//     setTimeout(function() {
//         console.log('testPromise');
//         resolve(123);
//     }, 1000); 
// })
// const cancelPromsie = cancel(testPromise);
// cancelPromsie.promise.then(res => {
//     console.log(res);
// });
// cancelPromsie.resolve('取消');
// {
//     let a = 1;
// }
// (function() {
//     var a = 1;
//     console.log(a);
// })();
// const fns = [];
// // for (let i = 0; i < 10; i++) {
// //     fns[i] = function() {
// //         console.log(i);
// //     }
// // }
// for (var i = 0; i < 10; i++) {
//     (function(i) {
//         fns[i] = function() {
//             console.log(i);
//         }
//     })(i);
// }
// fns[8](0)
// function _const(key, value) {
//     window.key = value;
//     Object.defineProperty(window, key, {
//         enumerable: false,
//         configurable: false,
//         get: function() {
//             return value;
//         },
//         set: function(newVal) {
//             if (newVal !== value) {
//                 throw new TypeError('不能重复定义');
//             } else {
//                 return value;
//             }
//         }
//     });
// }
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
// function flat(arr, depth = 3) {
//     if (!Array.isArray(arr) || depth <= 0) return arr;
//     let res = [];
//     arr.forEach(item => {
//         res = Array.isArray(item) ? res.concat(flat(item, depth - 1)) : res.concat(item);
//     });
//     return res; 
// }
// console.log((flat([1,2,[3,4,[5, 6], 7]])));
// String.prototype.repeat = function(n) {
//     return (new Array(n + 1)).join(this);
// }
// String.prototype.string = function(n) {
//     return n > 0 ? this.repeat(n - 1) + this : '';
// }
// Object.create = function(obj) {
//     function fn() {}
//     fn.prototype = obj;
//     return new fn();
// }
// Object.is = function(x, y) {
//     if (x === y) {
//         return x !== 0 || 1 / x === 1 / y;
//     }
//     return x !== x && y !== y;
// }
// Object.assign = function(target, sources) {
//     if (target == null) throw new TypeError('cannot convert undefined or null to object');
//     const res = {};
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
// JSON.parse = function(jsonStr) {
//     return eval(`(${jsonStr})`);
// }
// JSON.parse = function(jsonStr) {
//     return (new Function(`return ${jsonStr}`))();
// }
// function createScript(src) {
//     const script = document.createElement('script');
//     script.src = src;
//     script.type = 'text/javascript';
//     document.body.appendChild(script);
// }
// createScript('http://xxx.xxx.com/xxx.js?callback=handleResponse');
// function handleResponse(res) {
//     console.log(res);
// }
// handleResponse({a: 1, b: 2});
// function query(name) {
//     const search = location.search.substring(1);
//     const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
//     const res = search.match(reg);
//     return res ? res[2] : null;
// }
// function query(name) {
//     const p = new URLSearchParams(location.search);
//     return p.get(name);
// }
// function isObject(val) {
//     return typeof val === 'object' && val !== null;
// }
// function flatten(obj) {
//     if (!isObject(obj)) return obj;
//     const res = {};
//     function dfs(cur, prefix) {
//         if (isObject(cur)) {
//             if (Array.isArray(cur)) {
//                 cur.forEach((item, index) => {
//                     dfs(item, `${prefix}[${index}]`)
//                 });
//             } else {
//                 for (let key in cur) {
//                     dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`);
//                 }   
//             }
//         } else {
//             res[prefix] = cur;
//         }
//     }
//     dfs(obj, '');
//     return res;
// }
// Promise.prototype.finally = function(cb) {
//     const P = this.constructor;
//     return this.then(res => {
//         return P.resolve(cb()).then(() => res);
//     }, err => {
//         return P.resolve(cb()).then(() => {throw err});
//     });
// }
// function cancel(promise) {
//     const obj = {};
//     const p = new Promise((resolve, reject) => {
//         obj.resolve = resolve;
//         obj.reject = reject;
//     });
//     obj.promise = Promise.race([p, promise]);
//     return obj;
// }
// const testPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(123);
//     }, 1000);
// });
// const cancelPromise = cancel(testPromise);
// cancelPromise.promise.then(res => {
//     console.log(res);
// });
// cancelPromise.resolve('取消');
// {
//     let a = 1;
// }
// (function() {
//     var a = 1;
// })();
// const fns = [];
// for (let i = 0; i < 10; i++) {
//     fns[i] = function() {
//         console.log(i);
//     }
// }
// for (var i = 0; i < 10; i++) {
//     (function(i) {
//         fns[i] = function() {
//             console.log(i);
//         }
//     })(i);
// }
// fns[4]();
// function _const(key, value) {
//     window.key = value;
//     Object.defineProperty(window, key, {
//         enumerable: false,
//         configurable: false,
//         get: function() {
//             return value;
//         },
//         set: function(newVal) {
//             if (newVal !== value) {
//                 throw new TypeError('不能重复定义');
//             } else {
//                 return value;
//             }
//         }
//     });
// }
// function isObject(val) {
//     return typeof val === 'object' && val !== null;
// }
// function flatten(obj) {
//     if (!isObject(obj)) return obj;
//     const res = {};
//     function dfs(cur, prefix) {
//         if (isObject(cur)) {
//             if (Array.isArray(cur)) {
//                 cur.forEach((item, index) => {
//                     dfs(item, `${prefix}[${index}]`);
//                 });
//             } else {
//                 for (let key in cur) {
//                     dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`);
//                 }
//             }
//         } else {
//             res[prefix] = cur;
//         }
//     }
//     dfs(obj, '');
//     return res;
// }
// const obj = {
//     a: {
//       b: 1,
//       c: 2,
//       d: {e: 5}
//     },
//     b: [1, 3, {a: 2, b: 3}],
//     c: 3
// };
// console.log(flatten(obj));
// Promise.prototype.finally = function(cb) {
//     const P = this.constructor;
//     return this.then(res => {
//         return P.resolve(cb()).then(() => res);
//     }, err => {
//         return P.resolve(cb()).then(() => {throw err;});
//     });
// }
// function cancel(promise) {
//     const obj = {};
//     const p = new Promise((resolve, reject) => {
//         obj.resolve = resolve;
//         obj.reject = reject;
//     });
//     obj.promise = Promise.race([p, promise]);
//     return obj;
// }
// const testPromise = new Promise(resolve => {
//     setTimeout(() => {
//         resolve(123);
//     });
// })
// const cancelPromise = cancel(testPromise);
// cancelPromise.promise.then(res => {
//     console.log(res);
// })
// cancelPromise.resolve('取消');
// {
//     let a = 1;
// }
// (function() {
//     var a = 1;
// })();
// const fns = [];
// for (let i = 0; i < 10; i++) {
//     fns[i] = function() {
//         console.log(i);
//     }
// }
// for (var i = 0; i < 10; i++) {
//     (function(i) {
//         fns[i] = function() {
//             console.log(i);
//         }
//     })(i);
// }
// fns[4]()
// function _const(key, value) {
//     window.key = value;
//     Object.defineProperty(window, key, {
//         enumerable: false,
//         configurable: false,
//         get: function() {
//             return value;
//         },
//         set: function(newVal) {
//             if (newVal !== value) {
//                 throw new Error('不能重复定义');
//             } else {
//                 return value;
//             }
//         }
//     })
// }
// function New(fn, ...args) {
//     const obj = Object.create(fn.prototype);
//     const res = fn.call(obj, ...args);
//     if (res && typeof res === 'object' || typeof res === 'function') return res;
//     return obj;
// }
// Promise.prototype.finally = function(cb) {
//     const P = this.constructor;
//     return this.then(res => {
//         return P.resolve(cb()).then(() => res);
//     }, err => {
//         return P.resolve(cb()).then(() => { throw err });
//     });
// }
// function cancel(promise) {
//     const obj = {};
//     const p = new Promise((resolve, reject) => {
//         obj.resolve = resolve;
//         obj.reject = reject;
//     });
//     obj.promise = Promise.race([p, promise]);
//     return obj;
// }
// const testPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(123);
//     }, 1000)
// });
// const cancelPromise = cancel(testPromise);
// // cancelPromise.promise.then(res => {
// //     console.log(res);
// // });
// cancelPromise.resolve('取消');
// {
//     let a = 1;
// }
// (function() {
//     var a = 1;
// })();
// const fns = [];
// for (let i = 0; i < 10; i++) {
//     fns[i] = function() {
//         console.log(i);
//     }
// }
// for (var i = 0; i < 10; i++) {
//     // (function(i) {
//         fns[i] = function() {
//             console.log(i);
//         }
//     // })(i);
// }
// // fns[5]();
// function _const(key, value) {
//     window.key = value;
//     Object.defineProperty(window, key, {
//         enumerable: false,
//         configurable: false,
//         get() {
//             return value;
//         },
//         set(newVal) {
//             if (newVal !== value) {
//                 throw new TypeError('不能重复定义');
//             } else {
//                 return value;
//             }
//         }
//     })
// }
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
//     const bound =  function(...innerArgs) {
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
// String.prototype.trim = function() {
//     return this.replace(/(^\s*)|(\s*$)/g, '');
// }
// Promise.prototype.finally = function(cb) {
//     const P = this.constructor;
//     return this.then(res => {
//         return P.resolve(cb()).then(() => res);
//     }, err => {
//         return P.resolve(cb()).then(() => { throw err; });
//     });
// // }
// function cancel(promise) {
//     const obj = {};
//     const p = new Promise((resolve, reject) => {
//         obj.resolve = resolve;
//         obj.reject = reject;
//     });
//     obj.promise = Promise.race([p, promise]);
//     return obj;
// }
// const testPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(123);
//     }, 1500);
// });
// const cancelPromise = cancel(testPromise);
// // cancelPromise.promise.then(res => {
// //     console.log(res);
// // });
// cancelPromise.resolve('取消')
// {
//     let a = 1;
// }
// (function() {
//     var a = 1;
// })();
// const fns = [];
// for (let i = 0; i < 10; i++) {
//     fns[i] = function() {
//         console.log(i);
//     }
// }
// for (var i = 0; i < 10; i++) {
//     (function(i) {
//         fns[i] = function() {
//             console.log(i);
//         }
//     })(i);
// }
// fns[8]();
// function _const(key, value) {
//     window.key = value;
//     Object.defineProperty(window, key, {
//         enumerable: false,
//         configurable: false,
//         get() {
//             return value;
//         },
//         set(newVal) {
//             if (newVal !== value) {
//                 throw new TypeError('不能重复定义');
//             } else {
//                 return value;
//             }
//         }
//     })
// }
// Promise.all = function(promises) {
//     return new Promise((resolve, reject) => {
//         const result = [];
//         let count = 0;
//         if (promises.length === 0) {
//             resolve(result);
//         } else {
//             for (let i = 0; i < promises.length; i++) {
//                 Promise.resolve(promises[i]).then(res => {
//                     result[i] = res;
//                     count++;
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
//             });
//         }
//     }); 
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
// function uniqueArr(arr) {
//     return [...new Set(arr)];
// }
// Object.assign()
// ...
// arr.slice()
// arr.concat()
// JSON.parse(JSON.stringify())
// function isObject(val) {
//     return typeof val === 'object' && val !== null;
// }
// function deepClone(obj, hash = new WeakMap()) {
//     if (!isObject(obj)) return obj;
//     if (hash.has(obj)) return hash.get(obj);
//     const res = Array.isArray(obj) ? [] : {};
//     hash.set(obj, res);
//     // [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)]
//     Reflect.ownKeys(obj).forEach(key => {
//         res[key] = deepClone(res[key], hash);
//     });
//     return res;
// }
// 节流
// function throttle(fn, delay = 100) {
//     let flag = true;
//     return function(...args) {
//         if (!flag) return;
//         flag = false;
//         setTimeout(() => {
//             fn.call(this, ...args);
//             flag = true;
//         }, delay);
//     }
// }
// function throttle(fn, delay = 100) {
//     let prev = 0;
//     return function(...args) {
//         const now = Date.now();
//         if (now - prev > delay) {
//             fn.call(this, ...args);
//             prev = now;
//         }
//     }
// }
// div.addEventListener('drag', throttle(function(e) {
//     console.log(e.offsetX, e.offsetY);
// }, 50));
// 防抖
// function debounce(fn, delay = 100) {
//     let timer = null;
//     return function(...args) {
//         if (timer) clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.call(this, ...args);
//             timer = null;
//         }, delay);
//     }
// }
// input.addEventListener('keyup', debounce(function(e) {
//     console.log(e.target.value);
// }, 50));
// class EventEmitter {
//     constructor() {
//         this.events = {};
//     }
//     on(name, handler) {
//         this.events[name] = this.events[name] || [];
//         this.events[name].push(handler);
//     }
//     emit(name, ...args) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         this.events[name].forEach(fn => {
//             fn.call(this, ...args);
//         });
//     }
//     off(name, handler) {
//         if (!this.events[name]) throw new Error('该事件未注册');
//         if (!handler) {
//             delete this.events[name];
//         } else {
//             this.events[name] = this.events[name].filter(fn => fn !== handler);
//         }
//     }
//     once(name, handler) {
//         function fn(...args) {
//             handler.call(this, ...args);
//             this.off(name, fn);
//         }
//         this.on(name, fn);
//     }
// }
// function sleep(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }
// function bindEvent(elem, type, selector, fn) {
//     if (fn == null) {
//         fn = selector;
//         selector = null;
//     }
//     elem.addEventListener(type, function(e) {
//         const target = e.target;
//         if (selector) {
//             if (target.contains(selector)) {
//                 fn.call(target, e);
//             }
//         } else {
//             fn.call(target, e);
//         }
//     })
// }
// function ajax(url, method, postData) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === 4) {
//                 if (xhr.status === 200) {
//                     resolve(JSON.parse(xhr.responseText));
//                 } else {
//                     reject(new Error(xhr.responseText));    
//                 }
//             }
//         }
//         method === 'GET' ? xhr.send() : xhr.send(JSON.stringify(postData));
//     });
// }
// function setInterval(fn, time) {
//     function interval() {
//         fn();
//         setTimeout(interval, time);
//     }
//     return setTimeout(interval, time);
// }
// function setTimeout(fn, time) {
//     const timer = setInterval(function() {
//         fn();
//         clearInterval(timer);
//     }, time);
//     return timer;
// }
// function currying(fn, ...args) {
//     const length = fn.length;
//     return function(...newArgs) {
//         const allArgs = [...args, ...newArgs];
//         if (allArgs.length < length) {
//             return currying.call(this, fn, ...allArgs);
//         } else {
//             return fn.apply(this, allArgs);
//         }
//     }
// }
// function currying(fn, ...args) {
//     let allArgs = [...args];
//     return function temp(...newArgs) {
//         if (newArgs.length) {
//             allArgs = [...allArgs, ...newArgs];
//             return temp;
//         } else {
//             const res = fn.apply(this, allArgs);
//             allArgs = [];
//             return res;
//         }
//     }
// }
// function currying(fn, ...args) {
//     const length = fn.length;
//     return function(...newArgs) {
//         const allArgs = [...args, ...newArgs];
//         if (allArgs.length < length) {
//             return currying.call(this, fn, ...allArgs);
//         } else {
//             return fn.call(this, allArgs);
//         }
//     }
// }
// function currying(fn, ...args) {
//     const length = fn.length;
//     return function(...newArgs) {
//         const allArgs = [...args, ...newArgs];
//         if (allArgs.length < length) {
//             return currying.call(this, fn, ...allArgs);
//         } else {
//             return fn.call(this, ...allArgs);
//         }
//     }
// }
// function currying(fn, ...args) {
//     let allArgs = [...args];
//     return function temp(...newArgs) {
//         if (newArgs.length) {
//             allArgs = [...allArgs, ...newArgs];
//             return temp;
//         } else {
//             const res = fn.apply(this, allArgs);
//             allArgs = [...args];
//             return res; 
//         }
//     }
// }
// function compose(...fns) {
//     if (!fns.length) return v => v;
//     if (fns.length === 1) return fns[0];
//     return fns.reduce((pre, cur) => (...args) => pre(cur(...args)));
// }
// class LazyManClass {
//     constructor(name) {
//         this.taskList = [];
//         this.name = name;
//         console.log(`Hi I am ${this.name}`);
//         setTimeout(() => {
//             this.next();
//         }, 0);
//     }
//     next () {
//         var fn = this.taskList.shift();
//         fn && fn();
//     }
//     eat (name) {
//         var that = this;
//         var fn = (function (n) {
//             return function () {
//                 console.log(`I am eating ${n}`)
//                 that.next();
//             }
//         })(name);
//         this.taskList.push(fn);
//         return this;
//     }
//     sleepFirst (time) {
//         var that = this;
//         var fn = (function (t) {
//             return function () {
//                 setTimeout(() => {
//                     console.log(`等待了${t}秒...`)
//                     that.next();
//                 }, t * 1000);  
//             }
//         })(time);
//         this.taskList.unshift(fn);
//         return this;
//     }
//     sleep (time) {
//         var that = this
//         var fn = (function (t) {
//             return function () {
//                 setTimeout(() => {
//                     console.log(`等待了${t}秒...`)
//                     that.next();
//                 }, t * 1000); 
//             }
//         })(time);
//         this.taskList.push(fn);
//         return this;
//     }
// }
// function LazyMan(name) {
//     return new LazyManClass(name);
// }
// LazyMan('Tony').eat('lunch').sleepFirst(3).eat('dinner').sleepFirst(5).sleep(4).eat('junk food');
// class LazyManClass {
//     constructor(name) {
//       this.tasks = [];
//       const task = () => {
//         console.log(`Hi! This is ${name}`);
//         this.next();
//       };
//       this.tasks.push(task);
//       setTimeout(() => {
//         // 把 this.next() 放到调用栈清空之后执行
//         this.next();
//       }, 0);
//     }
//     next() {
//       // 取第一个任务执行
//       const task = this.tasks.shift();
//       task && task();
//     }
//     sleep(time) {
//       this.sleepWrapper(time, false);
//       return this;
//     }
//     sleepFirst(time) {
//       this.sleepWrapper(time, true);
//       return this;
//     }
//     sleepWrapper(time, isFirst) {
//       const task = () => {
//         setTimeout(() => {
//           console.log(`等待${time}秒`);
//           this.next();
//         }, time * 1000);
//       };
//       if (isFirst) {
//         this.tasks.unshift(task);
//       } else {
//         this.tasks.push(task);
//       }
//     }
//     eat(name) {
//       const task = () => {
//         console.log(`eat ${name}`);
//         this.next();
//       };
//       this.tasks.push(task);
//       return this;
//     }
//   }
//   function LazyMan(name) {
//     return new LazyManClass(name);
//   }
//   LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');
//   class LazyManClass {
//     constructor(name) {
//       this.tasks = [];
//       const task = () => {
//         console.log(`Hi! This is ${name}`);
//         this.next();
//       };
//       this.tasks.push(task);
//       setTimeout(() => {
//         // 把 this.next() 放到调用栈清空之后执行
//         this.next();
//       }, 0);
//     }
//     next() {
//       // 取第一个任务执行
//       const task = this.tasks.shift();
//       task && task();
//     }
//     sleep(time) {
//       this.sleepWrapper(time, false);
//       return this;
//     }
//     sleepFirst(time) {
//       this.sleepWrapper(time, true);
//       return this;
//     }
//     sleepWrapper(time, isFirst) {
//       const task = () => {
//         setTimeout(() => {
//           console.log(`等待${time}秒`);
//           this.next();
//         }, time * 1000);
//       };
//       if (isFirst) {
//         this.tasks.unshift(task);
//       } else {
//         this.tasks.push(task);
//       }
//     }
//     eat(name) {
//       const task = () => {
//         console.log(`eat ${name}`);
//         this.next();
//       };
//       this.tasks.push(task);
//       return this;
//     }
//   }
//   function LazyMan(name) {
//     return new LazyManClass(name);
//   }
//   LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');
// function createScript(src) {
//     const script = document.createElement('script');
//     script.src = src;
//     script.type = 'text/javascript';
//     document.body.appendChild(script);
// }
// createScript('http://xxx.xxx.com?callback=handleResponse');
// function handleResponse(res) {
//     console.log(res);
// }
// handleResponse({a: 1, b: 2});
// function query(name) {
//     const search = location.search.substring(1);
//     const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
//     const res = search.match(reg);
//     return res ? res[2] : null;
// }
// function query(name) {
//     const p = new URLSearchParams(location.search);
//     return p.get(name);
// }
// function isObject(val) {
//     return typeof val === 'object' && val !== null;
// }
// function flatten(obj) {
//     if (!isObject(obj)) return obj;
//     const res = {};
//     function dfs(cur, prefix) {
//         if (isObject(cur)) {
//             if (Array.isArray(cur)) {
//                 cur.forEach((item, index) => {
//                     dfs(item, `${prefix}[${index}]`);
//                 })
//             } else {
//                 for (let key in cur) {
//                     dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`);
//                 }
//             }
//         } else {
//             res[prefix] = cur;
//         }
//     }
//     dfs(obj, '');
//     return res;
// }
// function currying(fn, ...args) {
//     const length = fn.length;
//     return function(...newArgs) {
//         const allArgs = [...args, ...newArgs];
//         if (allArgs.length < length) {
//             return currying.call(this, fn, ...allArgs);
//         } else {
//             return fn.call(this, ...allArgs);
//         }
//     }
// }
// function currying(fn, ...args) {
//     let allArgs = [...args];
//     return function temp(...newArgs) {
//         if (newArgs.length) {
//             allArgs = [...allArgs, ...newArgs];
//             return temp;
//         } else {
//             const res = fn.apply(this, allArgs);
//             allArgs = [...args];
//             return res;
//         }
//     }
// }
// const add = (...args) => args.reduce((a, b) => a + b);
// const curryingAdd = currying(add);
// console.log(curryingAdd(1,2,3)(4)())
// console.log(curryingAdd(1,2)(3)())
// function compose(...fns) {
//     if (!fns.length) return v => v;
//     if (fns.length === 1) return fns[0];
//     return fns.reduce((pre, cur) => (...args) => pre(cur(...args)));
// }
// function fn1(x) {
//     return x + 1;
// }
// function fn2(x) {
//     return x + 2;
// }
// function fn3(x) {
//     return x + 3;
// }
// function fn4(x) {
//     return x + 4;
// }
// // fn = compose(fn1,fn2,fn3,fn4);
// // console.log(fn);
// a = (...args) => fn1(fn2(fn3(fn4(...args))))
// console.log(a(2));
// class LazyManClass {
//     constructor(name) {
//         this.tasks = [];
//         const task = () => {
//             console.log(`Hi, this is ${name}`);
//             this.next();
//         }
//         this.tasks.push(task);
//         setTimeout(() => {
//             this.next();
//         }, 0);
//     }
//     next() {
//         const task = this.tasks.shift();
//         task && task();
//     }
//     sleep(time) {
//         this.sleepWrapper(time, false);
//         return this;
//     }
//     sleepFirst(time) {
//         this.sleepWrapper(time, true);
//         return this;
//     }
//     sleepWrapper(time, isFirst) {
//         const task = () => {
//             setTimeout(() => {
//                 console.log(`等待${time}秒`);
//                 this.next();
//             }, time * 1000);
//         }
//         if (isFirst) {
//             this.tasks.unshift(task);
//         } else {
//             this.tasks.push(task);
//         }
//     }
//     eat(name) {
//         const task = () => {
//             console.log(`eat ${name}`);
//             this.next();
//         }
//         this.tasks.push(task);
//         return this;
//     }
// }
// function LazyMan(name) {
//     return new LazyManClass(name);
// }
// LazyMan('tom').eat('aaa').sleepFirst(2).eat('bbb').sleep(3).eat('ccc')
// function compose(fns) {
//     if (!fns.length) return v => v;
//     if (fns.length === 1) return fns[0];
//     return fns.reduce((pre, cur) => (...args) => pre(cur(...args)));
// }
// function currying(fn, ...args) {
//     const length = fn.length;
//     return function(...newArgs) {
//         const allArgs = [...args, ...newArgs];
//         if (allArgs.length < length) {
//             return currying.call(this, fn, ...allArgs);
//         } else {
//             return fn.call(this, ...allArgs);
//         }
//     }
// }
// function currying(fn, ...args) {
//     const allArgs = [...args];
//     return function temp(...newArgs) {
//         if (newArgs.length) {
//             allArgs = [...allArgs, ...newArgs];
//             return temp;
//         } else {
//             const res = fn.apply(this, allArgs);
//             allArgs = [...args];
//             return res;
//         }
//     }
// }
// function compose(fns) {
//     if (!fns.length) return v => v;
//     if (fns.length === 1) return fns[0];
//     return fns.reduce((pre, cur) => (...args) => pre(cur(...args)));
// }
// class LazyManClass {
//     constructor(name) {
//         this.tasks = [];
//         const task = () => {
//             console.log(`hi, this is ${name}`);
//             this.next();
//         }
//         this.tasks.push(task);
//         setTimeout(() => {
//             this.next();
//         }, 0);
//     }
//     next() {
//         const task = this.tasks.shift();
//         task && task();
//     }
//     sleep(time) {
//         this.sleepWrapper(time, false);
//         return this;
//     }
//     sleepFirst(time) {
//         this.sleepWrapper(time, true);
//         return this;
//     }
//     sleepWrapper(time, isFirst) {
//         const task = () => {
//             setTimeout(() => {
//                 console.log(`等待${time}秒`);
//                 this.next();
//             }, time * 1000);
//         }
//         if (isFirst) {
//             this.tasks.unshift(task);
//         } else {
//             this.tasks.push(task);
//         }
//     }
//     eat(name) {
//         const task = () => {
//             console.log(`eat ${name}`);
//             this.next();
//         }
//         this.tasks.push(task);
//         return this;
//     }
// }
// function LazyMan(name) {
//     return new LazyManClass(name);
// }
// LazyMan('tom').eat('aaa').sleepFirst(2).eat('bbb').sleep(2).eat('ccc')
// function Person(name) {
//     this.name = name;
// }
// Person.prototype.sayName = function() {
//     console.log(this.name);
// }
// function Student(name) {
//     Person.call(this, name);
// }
// Student.prototype.__proto__ = Person.prototype;
// console.log(new Student('a').name);
// class Student extends Person {
//     constructor() {
//         super();
//     }
// }
// function currying(fn, ...args) {
//     const length = fn.length;
//     return function(...newArgs) {
//         const allArgs = [...args, ...newArgs];
//         if (allArgs.length < length) {
//             return currying.call(this, fn, ...allArgs);
//         } else {
//             return fn.apply(this, allArgs);
//         }
//     }
// }
// function currying(fn, ...args) {
//     let allArgs = [...args];
//     return function temp(...newArgs) {
//         if (newArgs.length) {
//             allArgs = [...allArgs, ...newArgs];
//             return temp;
//         } else {
//             const res = fn.call(this, ...allArgs);
//             allArgs = [...args];
//             return res;
//         }
//     }
// }
// add = (...args) => args.reduce((a, b) => a + b);
// addCurrying = currying(add);
// console.log(addCurrying(1)(2)());
// console.log(addCurrying(1)(2)(3,4,5)(6,7)());
// console.log(addCurrying(1)(2,3,4,5)());
// function compose(fns) {
//     if (!fns.length) return v => v;
//     if (fns.length === 1) return fns[0];
//     return fns.reduce((pre, cur) => (...args) => pre(cur(...args)));
// // }
// class LazyManClass {
//     constructor(name) {
//         this.tasks = [];
//         const task = () => {
//             console.log(`hi, this is ${name}`);
//             this.next();
//         }
//         this.tasks.push(task);
//         setTimeout(() => {
//             this.next();
//         }, 0);
//     }
//     next() {
//         const task = this.tasks.shift();
//         task && task();
//     }
//     sleep(time) {
//         this.sleepWrapper(time, false);
//         return this;
//     }
//     sleepFirst(time) {
//         this.sleepWrapper(time, true);
//         return this;
//     }
//     sleepWrapper(time, isFirst) {
//         const task = () => {
//             setTimeout(() => {
//                 console.log(`等待${time}秒`);
//                 this.next();
//             }, time * 1000); 
//         }
//         if (isFirst) {
//             this.tasks.unshift(task);
//         } else {
//             this.tasks.push(task);
//         }
//     }
//     eat(name) {
//         const task = () => {
//             console.log(`eat ${name}`);
//             this.next();
//         }
//         this.tasks.push(task);
//         return this;
//     }
// }
// function LazyMan(name) {
//     return new LazyManClass(name);
// }
// LazyMan('tom').eat('aaa').sleepFirst(2).eat('bbb').sleep(2).eat('ccc').sleepFirst(3);
// function currying(fn, ...args) {
//     const length = fn.length;
//     return function(...newArgs) {
//         const allArgs = [...args, ...newArgs];
//         if (allArgs.length < length) {
//             return currying.call(this, fn, ...allArgs);
//         } else {
//             return fn.apply(this, allArgs);
//         }
//     }
// }
// function add(x, y, z){
//     return x + y + z;
// }
// const addCurrying = currying(add);
// console.log(addCurrying(1)(2)(3));
// console.log(addCurrying(1,2)(3));
// function currying(fn, ...args) {
//     let allArgs = [...args];
//     return function (...newArgs) {
//         if (newArgs.length) {
//             allArgs = [...args, ...newArgs];
//             return currying.call(this, fn, ...allArgs);
//         } else {
//             const res = fn.apply(this, allArgs);
//             allArgs = [...args];
//             return res;
//         }
//     }
// }
// function add(...args) {
//     return args.reduce((a, b) => a + b);
// }
// const addCurrying = currying(add, 1);
// console.log(addCurrying(1, 2)(5)());
// console.log(addCurrying(1, 2)(3)());
// console.log(addCurrying(1, 2)(3)());
// function compose(fns) {
//     if (!fns.length) return v => v;
//     if (fns.length === 1) return fns[0];
//     return fns.reduce((pre, cur) => (...args) => pre(cur(...args)));
// }
// function fn1(x) {
//     return x + 1;
// }
// function fn2(x) {
//     return x + 2;
// }
// function fn3(x) {
//     return x + 3;
// }
// console(compose(fn1, fn2, fn3)(1))
// (..args) => fn1(fn2(fn3(...args)))
// class LazyManClass {
//     constructor(name) {
//         this.tasks = [];
//         const task = () => {
//             console.log(`hi, this is ${name}`);
//             this.next();
//         }
//         this.tasks.push(task);
//         setTimeout(() => {
//             this.next();
//         }, 0);
//     }
//     next() {
//         const task = this.tasks.shift();
//         task && task();
//     }
//     sleep(time) {
//         this.sleepWrapper(time, false);
//         return this;
//     }
//     sleepFirst(time) {
//         this.sleepWrapper(time, true);
//         return this;
//     }
//     sleepWrapper(time, isFirst) {
//         const task = () => {
//             setTimeout(() => {
//                 console.log(`等待${time}秒`);
//                 this.next();
//             }, time * 1000);
//         }
//         if (isFirst) {
//             this.tasks.unshift(task);
//         } else {
//             this.tasks.push(task);
//         }
//     }
//     eat(name) {
//         const task = () => {
//             console.log(`eat ${name}`);
//             this.next();
//         }
//         this.tasks.push(task);
//         return this;
//     }
// }
// function LazyMan(name) {
//     return new LazyManClass(name);
//   }
//   LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');
// function currying(fn, ...args) {
//     const length = fn.length;
//     return function(...newArgs) {
//         const allArgs = [...args, ...newArgs];
//         if (allArgs.length < length) {
//             return currying.call(this, fn, ...allArgs);
//         } else {
//             return fn.apply(this, allArgs);
//         }
//     }
// }
// function currying(fn, ...args) {
//     let allArgs = [...args];
//     return function temp(...newArgs) {
//         if (newArgs.length) {
//             allArgs = [...allArgs, newArgs];
//             return temp;
//         } else {
//             const res = fn.apply(this, allArgs);
//             allArgs = [...args];
//             return res;
//         }
//     }
// }
// function compose(...fns) {
//     if (!fns.length) return v => v;
//     if (fns.length === 1) return fns[0];
//     return fns.reduce((pre, cur) => (...args) => pre(cur(...args)));
// }
// class LazyManClass {
//     constructor(name) {
//         this.tasks = [];
//         const task = () => {
//             console.log(`hi, this is ${name}`);
//             this.next();
//         }
//         this.tasks.push(task);
//         setTimeout(() => {
//             this.next();
//         }, 0);
//     }
//     next() {
//         const task = this.tasks.shift();
//         task && task();
//     }
//     sleep(time) {
//         this.sleepWrapper(time, false);
//         return this;
//     }
//     sleepFirst(time) {
//         this.sleepWrapper(time, true);
//         return this;
//     }
//     sleepWrapper(time, isFirst) {
//         const task = () => {
//             setTimeout(() => {
//                 console.log(`等待${time}秒`);
//                 this.next();
//             }, time * 1000);
//         }
//         if (isFirst) {
//             this.tasks.unshift(task);
//         } else {
//             this.tasks.push(task);
//         }
//     }
//     eat(name) {
//         const task = () => {
//             console.log(`eat ${name}`);
//             this.next();
//         }
//         this.tasks.push(task);
//         return this;
//     } 
// }
// function LazyMan(name) {
//     return new LazyManClass(name);
// }   
// LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');
// Promise.prototype.finally = function(cb) {
//     const P = this.constructor;
//     return this.then(res => {
//         return P.resolve(cb()).then(() => res);
//     }, err => {
//         return P.resolve(cb()).then(() => { throw err });
//     })
// }
// function cancel(promise) {
//     const obj = {};
//     const p = new Promise((resolve, reject) => {
//         obj.resolve = resolve;
//         obj.reject = reject;
//     });
//     obj.promise = Promise.race([p, promise]);
//     return obj;
// }
// const testPromise = new Promise((resolve, reject) => {
//     // setTimeout(() => {
//         resolve(123);
//     // }, 1000);
// });
// const cancelPromise = cancel(testPromise);
// cancelPromise.resolve('取消')
// cancelPromise.promise.then(res => {
//     console.log(res);
// });
// {
//     let a = 1;
// }
// (function() {
//     var a = 1;
// })()
// fns = [];
// // for (let i = 0; i < 10; i++) {
// //     fns[i] = function() {
// //         console.log(i);
// //     }
// // }
// for (var i = 0; i < 10; i++) {
//     (function(i) {
//         fns[i] = function() {
//             console.log(i);
//         }
//     })(i);
// }
// fns[7]()
// function _const(key, value) {
//     window.key = value;
//     Object.defineProperty(window, key, {
//         enumerable: false,
//         configurable: false,
//         get() {
//             return value;
//         },
//         set(newVal) {
//             if (newVal !== value) {
//                 throw new Error('不能重复定义');
//             } else {
//                 return value;
//             }
//         }
//     });
// }
// Promise.prototype.finally = function(cb) {
//     const P = this.contructor;
//     return this.then(res => {
//         return P.resolve(cb()).then(() => res);
//     }, err => {
//         return P.resolve(cb()).then(() => { throw err });
//     })
// }
// function defineReactive(obj, key, val) {
//     observe(val);
//     Object.defineProperty(obj, key, {
//         get() {
//             // 收集依赖
//             return val;
//         },
//         set(newVal) {
//             if (newVal !== val) {
//                 observe(newVal);
//                 val = newVal;
//                 // 通知更新
//             }
//         }
//     });
// }
// const originalProto = Array.prototype;
// const arrayProto = Object.create(originalProto);
// ['push', 'pop', 'shift', 'unshift'].forEach(method => {
//     arrayProto[method] = function(...args) {
//         arrayProto[method].call(this, ...args);
//         // 通知更新
//     }
// });
// function observe(obj) {
//     if (typeof obj !== 'object' || obj == null) return;
//     if (Array.isArray(obj)) {
//         obj.__proto__ = arrayProto;
//         for (let i = 0; i < obj.length; i++) {
//             observe(obj[i]);
//         }
//     } else {
//         Object.keys(obj).forEach(key => {
//             defineReactive(obj, key, obj[key]);
//         });
//     }
// }
// function defineReactive(obj, key, val) {
//     observe(val);
//     Object.defineProperty(obj, key, {
//         get() {
//             // 依赖收集
//             return val;
//         },
//         set(newVal) {
//             if (newVal !== val) {
//                 observe(newVal);
//                 val = newVal;
//                 // 通知更新
//             }
//         }
//     });
// }
// const arrayProto = Object.create(Array.prototype);
// ['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse'].forEach(method => {
//     arrayProto[method] = function(...args) {
//         arrayProto[method].apply(this, args);
//         // 通知更新
//     }
// });
// function observe(obj) {
//     if (typeof obj !== 'object' || obj == null) return;
//     if (Array.isArray) {
//         obj.__proto__ = arrayProto;
//         for (let i = 0; i < obj.length; i++) {
//             observe(obj[i]);
//         }
//     } else {
//         Object.keys(obj).forEach(key => {
//             defineReactive(obj, key, obj[key]);
//         });
//     }
// }
// 移动零
// function moveZero(nums) {
//     let j = 0;
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] !== 0) {
//             nums[j] = nums[i];
//             if (i !== j) {
//                 nums[i] = 0;
//             }
//             j++;
//         }
//     }
//     return nums;
// }
// function moveZeroes(nums) {
//     let j = 0;
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] !== 0) {
//             nums[j] = nums[i];
//             if (i !== j) {
//                 nums[i] = 0;
//             }
//             j++;
//         }
//     }
//     return nums;
// }
// function climbStairs(n) {
//     if (n <= 2) return n;
//     return climbStairs(n - 1) + climbStairs(n - 2);
// }
// function climbStairs(n) {
//     const map = new Map();
//     function recursion(n) {
//         if (n <= 2) return n;
//         if (map.has(n)) return map.get(n);
//         const value = recursion(n - 1) + recursion(n - 2);
//         map.set(n, value);
//         return value; 
//     }
//     return recursion(n);
// }
// function climbStairs(n) {
//     if (n <= 2) return n;
//     let a = 1, b = 2, r = 0;
//     for (let i = 0; i < n - 2; i++) {
//         r = a + b;
//         a = b;
//         b = r;
//     }
//     return r;
// }
// function climbStairs(n) {
//     const map = new Map();
//     function recursion(n) {
//         if (n <= 2) return n;
//         if (map.has(n)) return map.get(n);
//         const value = recursion(n - 1) + recursion(n - 2);
//         map.set(n, value);
//         return value;
//     }
//     return recursion(n);
// }
// function climbStairs(n) {
//     if (n <= 2) return n;
//     let a = 1, b = 2, r = 0;
//     for (let i = 0; i < n - 2; i++) {
//         r = a + b;
//         a = b;
//         b = r;
//     }
//     return r;
// }
// function twoSum(nums, target) {
//     for (let i = 0; i < nums.length - 1; i++) {
//         for (let j = 0; j < nums.length; j++) {
//             if (nums[i] + nums[j] === target) {
//                 return [i, j];
//             }
//         }
//     }
//     return [];
// }
// function twoSum(nums, target) {
//     const map = new Map();
//     for (let i = 0; i < nums.length; i++) {
//         if (map.has(target - nums[i])) {
//             return [i, map.get(target - nums[i])];
//         }
//         map.set(nums[i], i);
//     }
//     return [];
// }
// function twoSum(nums, target) {
//     const map = new Map();
//     for (let i = 0; i < nums.length; i++) {
//         if (map.has(target - nums[i])) {
//             return [i, map.get(target - nums[i])];
//         }
//         map.set(nums[i], i);
//     }
//     return [];
// }
// 环形链表
// function hasCycle(head) {
//     if (head == null || head.next == null) return false;
//     let slow = head;
//     let fast = head.next;
//     while(fast != null && fast.next != null) {
//         if (fast === slow || fast.next === slow) {
//             return true;
//         }
//         slow = slow.next;
//         fast = fast.next.next;
//     }
//     return false;
// }
// function hasCycle(head) {
//     if (head == null || head.next == null) return false;
//     let slow = head;
//     let fast = head.next;
//     while(fast != null && fast.next != null) {
//         if (fast === slow || fast.next === slow) return true;
//         slow = slow.next;
//         fast = fast.next.next;
//     }
//     return false;
// }
// function isValid(s) {
//     if (s.length % 2 === 1) return false;
//     let map = new Map([
//         [')', '('],
//         [']', '['],
//         ['}', '{']
//     ]);
//     const stack = [];
//     for (let i of s) {
//         if (map.has(i)) {
//             if (!stack.length || stack.pop() !== map.get(i)) {
//                 return false;
//             }
//         } else {
//             stack.push(i);
//         }
//     }
//     return !stack.length;
// }
// function isValid(s) {
//     if (s.length % 2 === 1) return false;
//     const map = new Map([
//         [')', '('],
//         [']', '['],
//         ['}', '{']
//     ]);
//     const stack = [];
//     for (let i of s) {
//         if (map.has(i)) {
//             if (!stack.length || stack.pop() !== map.get(i)) {
//                 return false;
//             }
//         } else {
//             stack.push(i);
//         }
//     }
//     return !stack.length;
// }