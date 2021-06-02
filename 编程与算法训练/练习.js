/**
 * 思路：1.枚举，遇到0就删除，记录删除多少，在最后加上删除个数的0
 *      2.枚举，创建新的数组存储非0和0
 *      3.双指针，把非零的交换到零前面去
 */
// function moveZeroes(nums) {
//     let count = 0;
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] === 0) {
//             nums.splice(i, 1);
//             i--;
//             count++;
//         }
//     }
//     for (let i = 0; i < count; i++) {
//         nums.push(0);
//     }
//     return nums;
// }

// function moveZeroes(nums) {
//     let res1 = [];
//     let res2 = [];
//     nums.forEach(item => {
//         if (item === 0) {
//             res1.push(item);
//         } else {
//             res2.push(item);
//         }
//     });
//     return res2.concat(res1);
// }

// function moveZeroes(nums) {
//     let j = 0;
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] !== 0) {
//             let c = nums[j];
//             nums[j] = nums[i];
//             nums[i] = c;
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

// function moveZeroes(nums) {
//     let j = 0;
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] !== 0) {
//             let c = nums[j];
//             nums[j] = nums[i];
//             if (c === 0) {
//                 nums[i] = 0;
//             }
//             j++;
//         }
//     }
//     return nums;
// }

// console.log(moveZeroes([8,3,5,0,4,0,2]));

/**
 *  思路：1.双循环，每两个元素都要算一次面积
 *       2.左右夹逼，左右边界i,j向中间收敛，最后在中间汇合，只有一层循环
 */

// function maxArea(arr) {
//     let max = 0;
//     for (let i = 0; i < arr.length - 1; i++) {
//         for (j = i + 1; j < arr.length; j++) {
//             let area = (j - i) * Math.min(arr[i], arr[j]);
//             max = Math.max(max, area);
//         }
//     }
//     return max;
// }
function maxArea(arr) {
    let max = 0;
    for (let i = 0, j = arr.length - 1; i < j; ) {
        let minHeight = arr[i] < arr[j] ? arr[i++] : arr[j--];
        let area = (j - i + 1) * minHeight;
        max = Math.max(max, area);
    }
    return max
}

console.log(maxArea([1,1]));
