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
    let j = str.match(/^(0+|1+)/)[0]; // 取出最前面的连续的0或连续的1
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
  console.log(code)
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
  // while(group.length > 1) {
  //   let a = group.shift().length;
  //   let b = group.shift().length;
  //   let v = gcd(a, b);
  //   if (v === 1) {
  //     return false;
  //   } else {
  //     group.unshift('0'.repeat(v));
  //   }
  // }

  for (let i = 0; i < group.length - 1; i++) {
    if (gcd(group[i].length, group[i+1].length) === 1) {
      return false;
    }
  }
  return group.length ? group[0].length > 1 : false;
}
console.log(cardGroup([1,1]))