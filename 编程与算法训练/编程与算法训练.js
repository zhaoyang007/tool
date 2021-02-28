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
console.log(repeatedSubstringPattern("ababc"));

/**
 * 2.正则表达式匹配(10)
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 *   '.' 匹配任意单个字符
 *   '*' 匹配零个或多个前面的那一个元素
 * 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 * 输入：s = "aa" p = "a"
 * 输出：false
 * 解释："a" 无法匹配 "aa" 整个字符串。
 * 输入：s = "aa" p = "a*"
 * 输出：true
 * 解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
 */
function isMatch() {
  
}



