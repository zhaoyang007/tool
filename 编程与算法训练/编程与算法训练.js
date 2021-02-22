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
console.log(getBinarySubString("00110011"))
