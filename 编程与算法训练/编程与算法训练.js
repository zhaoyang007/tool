/**
 * 1.反转字符串中的单词 III（557）
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
console.log(reverseWord3("Let's take LeetCode contest"))

/**
 * 
 * 
 * 
 */

