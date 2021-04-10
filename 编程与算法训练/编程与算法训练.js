/* 一、基础算法 */
// 字符串
/**
 * 1.反转字符串中的单词 III(557)
 * 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
 * 输入："Let's take LeetCode contest"
 * 输出："s'teL ekat edoCteeL tsetnoc"
 */
function reverseWord1(str) {
  let result = str.split(' ').map(item => {
    return item.split('').reverse().join('');
  }).join(' ');
  return result;
}
function reverseWord2(str) {
  let result = str.split(/\s/g).map(item => {
    return item.split('').reverse().join('');
  }).join(' ');
  return result;
}
function reverseWord3(str) {
  let result = str.match(/[\w']+/g).map(item => {
    return item.split('').reverse().join('');
  }).join(' ');
  return result;
}
// console.log(reverseWord3("Let's take LeetCode contest"))

/**
 * 2.计数二进制子串(696)
 * 给定一个字符串 s，计算具有相同数量 0 和 1 的非空（连续）子字符串的数量，并且这些子字符串中的所
 * 有 0 和所有 1 都是连续的。重复出现的子串要计算它们出现的次数。
 * 输入: "00110011"
 * 输出: 6
 * 解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。
 * 请注意，一些重复出现的子串要计算它们出现的次数。
 */
// 有一种从前往后找的规律，每次的子输入都向后移一位。
// 在子输入中找子串的过程是一样的，这个就要用递归去做。
function getBinarySubString(str) {
  let result = [];
  let match = (str) => {
    let j = str.match(/^0+|1+/)[0]; // 取出最前面的连续的0或连续的1
    let o = (j[0] ^ 1).toString().repeat(j.length);
    let reg = new RegExp(`^(${j}${o})`);
    if (reg.test(str)) {
      return RegExp.$1;
    } else {
      return '';
    }
  }
  for (let i = 0; i < str.length - 1; i++) {
    let sub = match(str.slice(i));
    if (sub) {
      result.push(sub);
    }
  }
  return result;
}
// console.log(getBinarySubString("00110011"))

// 数组
// 1.电话号码的组合（公式运算）
// 2.卡牌分组（归类运算）
// 3.种花问题（筛选运算）
// 4.格雷编码（二进制运算）

/**
 * 1.电话号码的字母组合(17)
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 * 给出数字到字母的映射如下（与电话九宫格按键相同）。注意 1 不对应任何字母。
 * 输入：digits = "23"
 * 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 */
// 当 for 循环的层数是不确定的时候，这时就必须要用递归来循环。
function phoneCombination(str) {
  let map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  let num = str.split('');
  let code = num.map(item => map[item]);
  let combination = (arr) => {
    let tmp = [];
    for (let i = 0; i < arr[0].length; i++) {
      for (let j = 0; j < arr[1].length; j++) {
        tmp.push(`${arr[0][i]}${arr[1][j]}`);
      }
    }
    arr.splice(0, 2, tmp);
    if (arr.length > 1) {
      combination(arr);
    } else {
      return tmp;
    }
    return arr[0];
  }
  return combination(code);
}
// console.log(phoneCombination("23"))
function phoneCombination2(str) {
  let map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  let arr = str.split('').map(item => map[item]);
  let comb = (arr) => {
    let tmp = [];
    let arr0 = arr.shift();
    let arr1 = arr.shift();
    for (let i = 0; i < arr0.length; i++) {
      for (let j = 0; j < arr1.length; j++) {
        tmp.push(`${arr0[i]}${arr1[j]}`);
      }
    }
    arr.unshift(tmp);
    if (arr.length < 2) {
      return arr[0];
    } else {
      return comb(arr);
    }
    // return arr[0];
  }
  return comb(arr);
}
// console.log(phoneCombination2('234'))


/**
 * 2.卡牌分组(914)
 * 给定一副牌，每张牌上都写着一个整数。
 * 此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：
 *   每组都有 X 张牌。
 *   组内所有的牌上都写着相同的整数。
 * 仅当你可选的 X >= 2 时返回 true。
 * 输入：[1,2,3,4,4,3,2,1]
 * 输出：true
 * 解释：可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]
 */
// 求两个数的最大公约数
function gcd(a, b) {
  let c = a % b;
  if (c === 0) {
    return b;
  } else {
    return gcd(b, c);
  }
}
function cardGroup(arr) {
  let str = arr.sort().join('');
  let group = str.match(/(\d)\1+|\d/g);
  while(group.length > 1) {
    let a = group.shift().length;
    let b = group.shift().length;
    let v = gcd(a, b);
    if (v === 1) {
      return false;
    } else {
      group.unshift('0'.repeat(v));
    }
  }
  // for (let i = 0; i < group.length - 1; i++) {
  //   if (gcd(group[i].length, group[i+1].length) === 1) {
  //     return false;
  //   }
  // }
  return group.length ? group[0].length > 1 : false;
}
// console.log(cardGroup([1,2])) // [1,1,2,2,3,3,4,4]

function cardGroup2(arr) {
  let str = arr.sort().join('');
  let group = str.match(/\d\1+|\d/g); // \1 表示与小括号中要匹配的内容相同。
  function getToF(arr) {
    if (group.length > 1) {
      let a = arr.shift().length;
      let b = arr.shift().length;
      let v = gcd(a, b);
      if (v === 1) {
        return false;
      } else {
        arr.unshift('0'.repeat(v));
        return getToF(arr);
      }
    }
  }
  if (group.length > 1) {
    getToF(group);
  }
  return group.length ? group[0].length > 1 : false;
}
// console.log(cardGroup2([1,1,2,2]))

/**
 * 3.种花问题(605)
 * 假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花不能种植在相邻的地块上，它们会争
 * 夺水源，两者都会死去。
 * 给你一个整数数组  flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，1 表示种植了花。
 * 另有一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则返回 true ，不能则返回 false。
 * 输入：flowerbed = [1,0,0,0,1], n = 1
 * 输出：true
 * 输入：flowerbed = [1,0,0,0,1], n = 2
 * 输出：false
 */
// 问题抽象
// for循环索引边界考虑
// 索引前进
function growFlower(arr, n) {
  let num = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i === 0 && arr[0] === 0 && arr[1] === 0) {
      num++;
    } else if (arr[i] === 0 && arr[i + 1] === 0 & arr[i + 2] === 0) {
      num++;
      i += 1;
    } else if (i === arr.length - 2 && arr[arr.length - 1] === 0 && arr[arr.length - 2] === 0) {
      num++;
    }
  }
  return num;
}
// console.log(growFlower([1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0]))

function growFlower2(arr, n) {
  let num = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 0) {
      if (i === 0 && arr[1] === 0) {
        num++;
        i++;
      } else if (i === arr.length - 2 && arr[arr.length - 1] === 0) {
        num++;
      } else if (arr[i-1] === 0 && arr[i+1] === 0) {
        i++;
        num++;
        if (i === arr.length - 2 && arr[arr.length - 2] === 0 && arr[arr.length - 1] === 0) {
          num++;
        }
      }
    }
  }
  return num;
}
// console.log(growFlower2([0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0]))

/**
 * 4.格雷编码(89)
 * 格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。
 * 给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。即使有多个不同答案，你也只需要返回其中一种。
 * 格雷编码序列必须以 0 开头。
 * 输入: 2
 * 输出: [0,1,3,2]
 * 解释:
 * 00 - 0
 * 01 - 1
 * 11 - 3
 * 10 - 2
 * 当 n = 0 时，其格雷编码序列为 [0]。
 */
// 递归
// 对称处理 n-i-1

function grayCode(n) {
  let prevArr = [];
  let getNext = (prev, j) => {
    let next = [];
    for (let i = 0; i < prev.length; i++) {
      next[i] = `0${prev[i]}`;
      next[2 ** j - i - 1] = `1${prev[i]}`;
    }
    prevArr = next;
  }
  for (let i = 1; i <= n; i++) {
    if (i === 1) {
      prevArr = [0, 1];
    } else {
      getNext(prevArr, i);
    }
  }
  if (n === 0) {
    return [0];
  }
  return prevArr;
};
// console.log(grayCode(0));

function grayCode2(n) {
  let make = (n) => {
    if (n === 1) {
      return [0, 1];
    } else {
      let prev = make(n - 1);
      let result = [];
      for (let i = 0; i < prev.length; i++) {
        result[i] = `0${prev[i]}`;
        result[2 ** n - i - 1] =`1${prev[i]}`;
      }
      return result;
    }
  }
  return make(n);
}
// console.log(grayCode2(3));

function grayCode3(n) {
  let num = 0;
  let getNext = (prev) => {
    num++;
    let next = [];
    for (let i = 0; i < prev.length; i++) {
      next[i] = `0${prev[i]}`;
      next[2 ** (num + 1) - i - 1] = `1${prev[i]}`;
    }
    if (next.length === 2 ** n) {
      return next;
    } else {
      return getNext(next);
    }
  }
  return getNext([0, 1]);
};
// console.log(grayCode3(2));

// 正则
/**
 * 1.重复的子字符串(459)
 * 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。
 * 输入: "abab"
 * 输出: True
 * 解释: 可由子字符串 "ab" 重复两次构成。
 * 输入: "aba"
 * 输出: False
 * 输入: "abcabcabcabc"
 * 输出: True
 * 解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)
 */
function repeatedSubstringPattern(str) {
  let reg = /^(\w+)\1+$/;
  return reg.test(str);
}
// console.log(repeatedSubstringPattern("ababc"));

/**
 * 2.正则表达式匹配(10)
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 *   '.' 匹配任意单个字符
 *   '*' 匹配零个或多个前面的那一个元素
 * 所谓匹配，是要涵盖整个字符串s的，而不是部分字符串。
 * 输入：s = "aa" p = "a"
 * 输出：false
 * 解释："a" 无法匹配 "aa" 整个字符串。
 * 输入：s = "aa" p = "a*"
 * 输出：true
 * 解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
 * 输入：s = "mississippi" p = "mis*is*p*."
 * 输出：false
 */
function regexp(s, p) {
  const isMatch = (s, p) => {
    // 边界，是否匹配完
    if (p.length <= 0) {
      return !s.length;
    }
    // 第一个字符是否相等
    let match = false;
    if (s.length > 0 && (p[0] === s[0] || p[0] === '.')) {
      match = true;
    }
    if (p.length > 1 && p[1] === '*') {
      // 有模式
      // *匹配0个，然后递归 || *匹配1个，然后递归
      return isMatch(s, p.slice(2)) || (match && isMatch(s.slice(1), p));
    } else {
      // 无模式
      return match && isMatch(s.slice(1), p.slice(1));
    }
  }
  return isMatch(s, p);
}
// console.log(regexp("mississippi", "mis*is*ip*i"));
function regexp2(s, p) {
  const isMatch = (s, p) => {
    if (s.length === 0 && p.length === 0) {
      return true;
    }
    let firstIsEqual = s[0] === p[0];
    if (!firstIsEqual) {
      return false;
    }
    if (p[1] !== '*') {
      // 无模式
      return isMatch(s.slice(1), p.slice(1));
    } else {
      // 有模式
      return isMatch(s, p.slice(2));
    }
  }
  return isMatch(s, p);
}
// console.log(regexp2("mississippi", "mis*is*ip*i"));

// 排序
/**
 * 1.冒泡排序：两两比较，大的放后面去。每循环一次会把最大的数放到最后。
 */
function bubbleSort(arr) {
  for (let i = arr.length - 1; i > 0; i--) { // 控制每次遍历的范围
    let tmp;
    for (let j = 0; j < i; j++) { // 遍历规定范围内的所有数。两两比较，做交换
      tmp = arr[j];
      if (tmp > arr[j + 1]) {
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
}
// console.log(bubbleSort([1,9,3,6,5,4]));

function bubbleSort2(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      let tmp = arr[j];
      if (arr[j] > arr[j + 1]) {
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  } 
  return arr;
}
// console.log(bubbleSort2([9,1,3,20,6,5,4,10]));

/**
 * 2.选择排序
 */
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < min) { // 找下一个最小值跟当前的最小值交换
        let c = min;
        min = arr[j];
        arr[j] = c;
      }
    }
    arr[i] = min; // 把第一个位置换成最终的最小值
  }
  return arr;
}
// console.log(selectSort([9,1,3,20,6,5,4,10,11]))

/**
 * 3.按奇偶排序数组 II(922)
 * 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。
 * 对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。
 * 你可以返回任何满足上述条件的数组作为答案
 * 输入：[4,2,5,7]
 * 输出：[4,5,2,7]
 * 解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
 */
function oddEvenSort(arr) {
  // arr.sort();
  let res = [];
  let evenIndex = 0;
  let oddIndex = 1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      res[evenIndex] = arr[i];
      evenIndex += 2;
    } else {
      res[oddIndex] = arr[i];
      oddIndex += 2;
    }
  }
  return res;
}
// console.log(oddEvenSort([4,2,5,7,3,6]))

function oddEvenSort2(arr) {
  let res = [];
  let even = 0;
  let odd = 1;
  arr.forEach(item => {
    if (item % 2 === 0) {
      res[even] = item;
      even += 2;
    } else {
      res[odd] = item;
      odd += 2;
    }
  });
  return res;
}
// console.log(oddEvenSort2([1,3,5,6,9,4,8,2]))

/**
 * 4.数组中的第K个最大元
 * 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个
 * 最大的元素，而不是第 k 个不同的元素。
 * 示例 1:
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 * 示例 2:
 * 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 * 输出: 4
 */
function maxK(arr, k) {
  return arr.sort((a, b) => b - a)[k - 1];
}

function maxK2(arr, k) {
  for (let i = arr.length - 1; i > arr.length - k - 1; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        let c = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = c; 
      }
    }
  }
  return arr[arr.length - k];
}
// console.log(maxK2([1,2,5,6,4,3], 2));

/**
 * 5.最大间距(164)
 * 给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。
 * 如果数组元素个数小于 2，则返回 0。
 * 输入: [3,6,9,1]
 * 输出: 3
 * 解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。
 * 输入: [10]
 * 输出: 0
 * 解释: 数组元素个数小于 2，因此返回 0。
 */
function maxDiff(arr) {
  if (arr.length < 2) {
    return 0;
  }
  arr.sort();
  let max = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    let diff = arr[i + 1] - arr[i];
    if (diff > max) {
      max = diff;
    }
  }
  return max;
}

function maxDiff2(arr) {
  if (arr.length < 2) {
    return 0;
  }
  let max = 0;
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        let c = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = c;
      }
    }
    if (i < arr.length - 1) {
      let diff =  arr[i + 1] - arr[i];
      if (diff > max) {
        max = diff;
      }
    }
  }
  let tmp = arr[1] - arr[0];
  return tmp > max ? tmp : max;
}

// console.log(maxDiff2([13, 16, 19, 1]));

/**
 * 6.缺失的第一个正数(41)
 * 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
 * 输入：nums = [1,2,0]
 * 输出：3
 * 输入：nums = [3,4,-1,1]
 * 输出：2
 */

function getFirstMin(arr) {
  arr = arr.filter(item => item > 0);
  if (arr.length) {
    arr.sort((a, b) => a - b);
    if (arr[0] !== 1) {
      return 1;
    } else {
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] - arr[i] > 1) {
          return arr[i] + 1;
        }
      }
      return arr.pop() + 1;
    }
  } else {
    return 1;
  }
}
function getFirstMin2(arr) {
  arr = arr.filter(item => item > 0);
  if (arr.length) {
    for (let i = 0; i < arr.length; i++) {
      let min = arr[i];
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < min) {
          let c = arr[j];
          arr[j] = min;
          min = c;
        }
      }
      arr[i] = min;
      if (i > 0) {
        if (arr[i] - arr[i - 1] > 1) {
          return arr[i - 1] + 1;
        }
      } else {
        if (min !== 1) {
          return 1;
        }
      }
    }
    return arr.pop() + 1;
  } else {
    return 1;
  }
}
// console.log(getFirstMin2([3,7,2,1,5,4,8]))

/**
 * 7.快速排序
 * 数组中指定一个元素，比它大的放放它后面，比它小的放它前面。将前面和后面的元素再进行如上步骤，
 * 直至全部正序排列。
 */
// [5,1,3,4,2,8,6,7,9]
// [1,3,4,2] [5] [8,6,7,9]
// [][1][3,4,2] [5] [6,7][8][9]

function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let tmp = arr[0];
  let left = [];
  let right = [];
  arr.forEach(item => {
    if (item < tmp) {
      left.push(item);
    } else if (item > tmp) {
      right.push(item);
    }
  });
  return quickSort(left).concat([tmp]).concat(quickSort(right));
}
// console.log(quickSort([5,1,3,4,2,8,6,7,9]))
function quickSort2(arr) {
  if (arr.length < 2) {
    return arr;
  } else {
    let tmp = arr[0];
    let left = [];
    let right = [];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < tmp) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return quickSort2(left).concat(tmp, quickSort2(right));
  }
}
// console.log(quickSort2([5,1,3,4,2,8,6,7,9]))
// in-place 利用交换不再带来新的内存的增加
function quickSort3(arr) {
  function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  function findCenter(arr, left, right) {
    let flag = arr[left];
    // 核心：用小的把大的全部换掉放在一起。
    let idx = left + 1;
    for (let i = idx; i <= right; i++) {
      if (arr[i] < flag) {
        swap(arr, i, idx);
        idx++;
      }
    }
    swap(arr, left, idx - 1);
    return idx;
  }
  function sort(arr, left, right) {
    if (right > left) {
      let center = findCenter(arr, left, right);
      sort(arr, left, center - 1);
      sort(arr, center, right);
    }
  }
  sort(arr, 0, arr.length - 1);
  return arr;
}
// [5,3,2,6,9,1,4,7]
function quickSort4(arr) {
  function change(arr, i, j) {
    let c = arr[i];
    arr[i] = arr[j];
    arr[j] = c;
  }
  function findCenter(arr, left, right) {
    let flag = arr[left];
    let index = left + 1;
    for (let i = left + 1; i <= right; i++) {
      if (arr[i] < flag) {
        change(arr, i, index);
        index++;
      }
    }
    change(arr, left, index - 1);
    return index - 1;
  }
  function sort(arr, left, right) {
    if (right > left) {
      let center = findCenter(arr, left, right);
      sort(arr, left, center - 1);
      sort(arr, center + 1, right);
    }
  }
  sort(arr, 0, arr.length - 1);
}

// 递归
/**
 * 1.复原IP地址(93)
 * 给定一个只包含数字的字符串，用以表示一个 IP 地址，返回所有可能从 s 获得的 有效 IP 地址 。
 * 你可以按任何顺序返回答案。有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，
 * 且不能含有前导 0），整数之间用 '.' 分隔。
 * 输入：s = "25525511135"
 * 输出：["255.255.11.135","255.255.111.35"]
 * 输入：s = "0000"
 * 输出：["0.0.0.0"]
 */
// 25525511135
function getIP(str) {
  let res = [];
  function search(cur, sub) {
    if (cur.length === 4 && cur.join('') === str) {
      res.push(cur.join('.'));
    } else {
      for (let i = 0; i < Math.min(3, sub.length); i++) {
        let tmp = sub.substr(0, i + 1);
        if (tmp < 256) {
          search(cur.concat([tmp]), sub.substr(i + 1));
        }
      }
    }
  }
  search([], str);
  return res;
}

/**
 * 2.串联所有单词的子串(30)
 * 给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词
 * 串联形成的子串的起始位置。
 * 注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。
 * 输入：
 * s = "barfoothefoobarman",
 * words = ["foo","bar"]
 * 输出：[0,9]
 * 解释：
 * 从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
 * 输出的顺序不重要, [9,0] 也是有效答案。
 */

// ['A', 'B', 'C', 'D']
// [] ['A', 'B', 'C', 'D']
// ['A'] ['B', 'C', 'D']
// ['A', 'B'] ['C', 'D']

function getSubStr(str, words) {
  let res = [];
  function range(pre, rest) {
    if (pre.length === words.length) {
      res.push(pre.join(''));
    } else {
      rest.forEach((item, index) => {
        let tmp = [].concat(rest);
        tmp.splice(index, 1);
        range(pre.concat(item), tmp);
      }); 
    }
  }
  range([], words);
  return res.map(item => {
    return str.indexOf(item);
  }).filter(item => item !== -1);
}
// console.log(getSubStr('barfoothefoobarman', ["foo","bar"]))

/* 二、数据结构 */
// 栈
/**
 * 1.棒球比赛(682)
 * 你现在是一场采用特殊赛制棒球比赛的记录员。这场比赛由若干回合组成，过去几回合的得分可能会
 * 影响以后几回合的得分。比赛开始时，记录是空白的。你会得到一个记录操作的字符串列表 ops，
 * 其中 ops[i] 是你需要记录的第 i 项操作，ops 遵循下述规则：
 * 整数 x - 表示本回合新获得分数 x
 * "+" - 表示本回合新获得的得分是前两次得分的总和。题目数据保证记录此操作时前面总是存在两个有效的分数。
 * "D" - 表示本回合新获得的得分是前一次得分的两倍。题目数据保证记录此操作时前面总是存在一个有效的分数。
 * "C" - 表示前一次得分无效，将其从记录中移除。题目数据保证记录此操作时前面总是存在一个有效的分数。
 * 请你返回记录中所有得分的总和。
 * 
 * 输入：ops = ["5","2","C","D","+"]
 * 输出：30
 * 解释：
 * "5" - 记录加 5 ，记录现在是 [5]
 * "2" - 记录加 2 ，记录现在是 [5, 2]
 * "C" - 使前一次得分的记录无效并将其移除，记录现在是 [5].
 * "D" - 记录加 2 * 5 = 10 ，记录现在是 [5, 10].
 * "+" - 记录加 5 + 10 = 15 ，记录现在是 [5, 10, 15].
 * 所有得分的总和 5 + 10 + 15 = 30
 */
function recordScore(arr) {
  let res = 0;
  let score = [];
  arr.forEach(item => {
    switch (item) {
      case 'C': 
        if (score.length) {
          score.pop();
        }
        break
      case 'D': 
        if (score.length > 0) {
          let pre = score.pop();
          score.push(pre, pre * 2);
        }
        break
      case '+': 
        if (score.length > 1) {
          let pre1 = score.pop();
          let pre2 = score.pop();
          score.push(pre2, pre1, Number(pre1) + Number(pre2));
        }
        break
      default: 
        score.push(item);
    }
  });
  score.forEach(item => res += Number(item));
  return res;
}
// console.log(recordScore(["5","2","C","D","+"]))

/**
 * 2.最大矩形(85)
 * 给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
 */
function getMaxRect(arr) {

}

// 队列
/**
 * 1.设计循环队列(622)
 * 设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾
 * 被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。循环队列的一个好处是我们可以利用这个队列
 * 之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有
 * 空间。但是使用循环队列，我们能使用这些空间去存储新的值。
 * 你的实现应该支持如下操作：
 * MyCircularQueue(k): 构造器，设置队列长度为 k 。
 * Front: 从队首获取元素。如果队列为空，返回 -1 。
 * Rear: 获取队尾元素。如果队列为空，返回 -1 。
 * enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
 * deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
 * isEmpty(): 检查循环队列是否为空。
 * isFull(): 检查循环队列是否已满。
 * MyCircularQueue circularQueue = new MyCircularQueue(3); // 设置长度为 3
 * circularQueue.enQueue(1);  // 返回 true
 * circularQueue.enQueue(2);  // 返回 true
 * circularQueue.enQueue(3);  // 返回 true
 * circularQueue.enQueue(4);  // 返回 false，队列已满
 * circularQueue.Rear();  // 返回 3
 * circularQueue.isFull();  // 返回 true
 * circularQueue.deQueue();  // 返回 true
 * circularQueue.enQueue(4);  // 返回 tru
 * circularQueue.Rear();  // 返回 4
 */
class MyCircularQueue {
  constructor(k) {
    this.list = Array(k);
    this.max = k;
    this.front = 0;
    this.rear = 0;
  }
  enQueue(num) {
    if (this.isFull()) {
      return false;
    } else {
      this.list[this.rear] = num;
      this.rear = (this.rear + 1) % this.max;
      return true;
    }
  }
  deQueue() {
    let v = this.list[this.front];
    this.list[this.front] = '';
    this.front = (this.front + 1) % this.max;
    return true;
  }
  isEmpty() {
    return this.front === this.rear && !this.list[this.front];
  }
  isFull() {
    return this.front === this.rear && !!this.list[this.front];
  }
  Front() {
    return this.list[this.front];
  }
  Rear() {
    return this.list[this.rear - 1 < 0 ? this.max - 1 : this.rear - 1];
  }
}
// let circularQueue = new MyCircularQueue(3); // 设置长度为 3
// console.log(circularQueue.enQueue(1)); // 返回 true
// console.log(circularQueue.enQueue(2)) // 返回 true
// console.log(circularQueue.enQueue(3)) // 返回 true
// console.log(circularQueue.enQueue(4)) // 返回 false，队列已满
// console.log(circularQueue.Rear()) // 返回 3
// console.log(circularQueue.isFull()) // 返回 true
// console.log(circularQueue.deQueue()) // 返回 true
// console.log(circularQueue.enQueue(4)) // 返回 true
// console.log(circularQueue.Rear()) // 返回 4

/**
 * 2.任务调度器(621)
 * 给你一个用字符数组 tasks 表示的 CPU 需要执行的任务列表。其中每个字母表示一种不同种类的任务。任务可以以任意顺序执行，
 * 并且每个任务都可以在 1 个单位时间内执行完。在任何一个单位时间，CPU 可以完成一个任务，或者处于待命状态。然而，两个 
 * 相同种类 的任务之间必须有长度为整数 n 的冷却时间，因此至少有连续 n 个单位时间内 CPU 在执行不同的任务，或者在待命状态。
 * 你需要计算完成所有任务所需要的 最短时间 。
 * 输入：tasks = ["A","A","A","B","B","B"], n = 2
 * 输出：8
 * 解释：A -> B -> (待命) -> A -> B -> (待命) -> A -> B
 * 在本示例中，两个相同类型任务之间必须间隔长度为 n = 2 的冷却时间，而执行一个任务只需要一个单位时间，所以中间出现了（待命）状态。
 */

// 链表
/**
 * 1.给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 * 进阶：
 * 你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
 * 输入：head = [4,2,1,3]
 * 输出：[1,2,3,4]
 * 输入：head = [-1,5,3,4,0]
 * 输出：[-1,0,3,4,5]
 * 输入：head = []
 * 输出：[]
 */
// 声明链表的节点
class Node {
  constructor(value) {
    this.val = value;
    this.next = undefined;
  }
}
// 声明链表的数据结构
class NodeList {
  constructor(arr) {
    // 声明链表的头部节点
    let head = new Node(arr.shift());
    // 把剩下的数据都用节点的方式实例化并跟头部指针关联起来
    let next = head;
    arr.forEach(item => {
      next.next = new Node(item);
      next = next.next;
    });
    return head;
  }
}
// 交换两个节点的值
function swap(p, q) {
  let val = p.val;
  p.val = q.val;
  q.val = val;
} 
// 寻找基准元素的节点
function partion(begin, end) {
  let val = begin.val;
  let p = begin;
  let q = begin.next;
  while(q !== end) {
    if (q.val < val) {
      swap(p.next, q);
      p = p.next;
    }
    q = q.next;
  }
  swap(p, begin);
  return p;
}
function sort(begin, end) {
  if (begin !== end) {
    let part = partion(begin, end);
    sort(begin, part);
    sort(part.next, end);
  }
}
// 测试用例
let head = new NodeList([4, 1, 3, 2, 7, 9, 10, 12]);
sort(head);
let res = [];
let next = head;
while(next) {
  res.push(next.val);
  next = next.next;
}
// console.log(res);

/**
 * 2.环形链表(141)
 * 给定一个链表，判断链表中是否有环。
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来
 * 表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅
 * 是为了标识链表的实际情况。
 * 如果链表中存在环，则返回 true 。 否则，返回 false 。
 */
// 声明链表的节点
function isCircle(head) {
  let slow = head;
  let fast = head.next;
  while(1) {
    if (!fast || !fast.next) {
      return false;
    } else if (fast === slow || fast.next === slow) {
      return true;
    } else {
      slow = slow.next;
      fast = fast.next.next;
    }
  }
}
let head2 = new NodeList([6, 1, 2, 5, 7, 9]);
head2.next.next.next.next.next.next = head2.next;
// console.log(isCircle(head2));
 
