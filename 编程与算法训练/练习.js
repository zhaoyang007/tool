// 移动零：1.遇零删除，记录数量，最后添加零 2. 利用新的数据存储非零和零。3. 双指针交换
// 1
// function moveZeroes(nums) {
//   let count = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === 0) {
//       nums.splice(i, 1);
//       count++;
//       i--;
//     }
//   }
//   for (let i = 0; i < count; i++) {
//     nums.push(0);
//   }
//   return nums;
// }
// 2
// function moveZeroes(nums) {
//   let res1 = [];
//   let res2 = [];
//   nums.forEach(item => {
//     if (item === 0) {
//       res1.push(item);
//     } else {
//       res2.push(item);
//     }
//   });
//   return res2.concat(res1);
// }
// function moveZeroes(nums) {
//   let j = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {
//       let c = nums[j];
//       nums[j] = nums[i];
//       nums[i] = c;
//       j++;
//     }
//   }
//   return nums;
// }
// function moveZeroes(nums) {
//   let j = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {
//       let c = nums[j];
//       nums[j] = nums[i];
//       if (c === 0) {
//         nums[i] = 0;
//       }
//       j++;
//     }
//   }
//   return nums;
// }
// 盛水最多的容器 1.双循环 2.左右夹逼
// function maxArea(arr) {
//   let max = 0;
//   for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       let area = Math.min(arr[i], arr[j]) * (j - i);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function maxArea(arr) {
//   let max = 0;
//   for (let i = 0, j = arr.length - 1; i < j; ) {
//     let minHeight = arr[i] < arr[j] ? arr[i++] : arr[j--];
//     let area = (j - i + 1) * minHeight;
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 爬楼梯 1.暴力递归 2.记忆化递归 3.动态规划
// function climbStairs(n) {
//   if (n <= 2) return n;
//   return climbStairs(n - 1) + climbStairs(n - 2);
// }
// let mapData = new Map();
// function climbStairs(n) {
//   if (n <= 2) return n;
//   if (mapData.get(n)) {
//     return mapData.get(n);
//   }
//   let res = climbStairs(n - 1) + climbStairs(n - 2);
//   mapData.set(n, res);
//   return res;
// }
// function climbStairs(n) {
//   if (n <= 2) return n;
//   let arr = [];
//   arr[1] = 1;
//   arr[2] = 2;
//   for (let i = 3; i <= n; i++) {
//     arr[i] = arr[i - 1] + arr[i - 2];
//   } 
//   return arr[n];
// }
// function climbStairs(n) {
//   if (n <= 2) return n;
//   let a = 1, b = 2, r = 0;
//   for (let i = 0; i < n - 2; i++) {
//     r = a + b;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// 移动零：1.遇零删除，记录数量，最后添加零 2. 利用新的数据存储非零和零。3. 双指针交换
// 1
// function moveZeroes(nums) {
//   let count = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === 0) {
//       nums.splice(i, 1);
//       count++;
//       i--;
//     }
//   }
//   for (let i = 0; i < count; i++) {
//     nums.push(0);
//   }
//   return nums;
// }
// 2
// function moveZeroes(nums) {
//   let res1 = [];
//   let res2 = [];
//   nums.forEach(item => {
//     if (item === 0) {
//       res1.push(item);
//     } else {
//       res2.push(item);
//     }
//   });
//   return res2.concat(res1);
// }
// function moveZeroes(nums) {
//   let j = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {
//       let c = nums[j];
//       nums[j] = nums[i];
//       nums[i] = c;
//       j++;
//     }
//   }
//   return nums;
// }
// function moveZeroes(nums) {
//   let j = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {
//       let c = nums[j];
//       nums[j] = nums[i];
//       if (c === 0) {
//         nums[i] = 0;
//       }
//       j++;
//     }
//   }
//   return nums;
// }
// 盛水最多的容器 1.双循环 2.左右夹逼
// function maxArea(arr) {
//   let max = 0;
//   for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       let area = Math.min(arr[i], arr[j]) * (j - i);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function maxArea(arr) {
//   let max = 0;
//   for (let i = 0, j = arr.length - 1; i < j; ) {
//     let minHeight = arr[i] < arr[j] ? arr[i++] : arr[j--];
//     let area = (j - i + 1) * minHeight;
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 爬楼梯 1.暴力递归 2.记忆化递归 3.动态规划
// function climbStairs(n) {
//   if (n <= 2) return n;
//   return climbStairs(n - 1) + climbStairs(n - 2);
// }
// let mapData = new Map();
// function climbStairs(n) {
//   if (n <= 2) return n;
//   if (mapData.get(n)) {
//     return mapData.get(n);
//   }
//   let res = climbStairs(n - 1) + climbStairs(n - 2);
//   mapData.set(n, res);
//   return res;
// }
// function climbStairs(n) {
//   if (n <= 2) return n;
//   let arr = [];
//   arr[1] = 1;
//   arr[2] = 2;
//   for (let i = 3; i <= n; i++) {
//     arr[i] = arr[i - 1] + arr[i - 2];
//   } 
//   return arr[n];
// }
// function climbStairs(n) {
//   if (n <= 2) return n;
//   let a = 1, b = 2, r = 0;
//   for (let i = 0; i < n - 2; i++) {
//     r = a + b;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// 两数之和 1.暴力循环O(n^2) 2.哈希表O(n)
// function twoSum(nums, target) {
//   let a = [];
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] === target) {
//         a[0] = i;
//         a[1] = j;
//       }
//     }
//   }
//   return a;
// }
// console.log(twoSum([3,2,4], 6))
// 三数之和
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) {
//    	return [];   
//   }
//   nums.sort();
//   let a = [];
//   let mapData = new Map();
//   for (let k = 0; k < nums.length - 2; k++) {
//     let i = k + 1, j = nums.length - 1;
//     while(i < j) {
//     	let sum = nums[k] + nums[i] + nums[j];
//       if (sum < 0) {
//       	while(i < j && nums[i] === nums[++i]);
//       } else if (sum > 0) {
//       	while(i < j && nums[j] === nums[--j]);   
//       } else {
//         let tmp = [nums[k], nums[i], nums[j]];
//         tmp.sort();
//         if (!mapData.has(tmp.join())) {
//         	a.push([nums[k], nums[i], nums[j]]);
//           mapData.set(tmp.join(), [nums[k], nums[i], nums[j]]);
//         }
//         while(i < j && nums[i] === nums[++i]);   
//         while(i < j && nums[j] === nums[--j]);   
//       }
//     }
//   }
//   return a;
// }
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) {
//    	return [];   
//   }
//   let a = [];
//   let mapData = new Map();
//   for (let i = 0; i < nums.length - 2; i++) {
// 		for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
// 				if (nums[i] + nums[j] + nums[k] === 0) {
//           // let tmp = [nums[i], nums[j], nums[k]];
//           // tmp.sort();
//           // if (!mapData.has(tmp.join())) {
//           	a.push([nums[i], nums[j], nums[k]]);
//           //   mapData.set(tmp.join(), [nums[i], nums[j], nums[k]]);
//          	// }
//         }
//       }
//     }
//   }
//   return a;
// }
// console.log(threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4]));
// 移动零 1.遇零删除，最后补零 O(n) 2.开辟新内存O(n) 3.双指针交换O(n)
// function moveZeroes(nums) {
//   let count = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === 0) {
//       nums.splice(i, 1);
//       count++;
//       i--;
//     }
//   }
//   for (let i = 0; i < count; i++) {
//     nums.push(0);
//   }
//   return nums;
// }
// function moveZeroes(nums) {
//   let res1 = [];
//   let res2 = [];
//   nums.forEach(item => {
//     if (item === 0) {
//       res1.push(item);
//     } else {
//       res2.push(item);
//     }
//   });
//   return res2.concat(res1);
// }
// function moveZeroes(nums) {
//   let j = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {
//       let c = nums[j];
//       nums[j] = nums[i];
//       nums[i] = c;
//       j++;
//     }
//   }
// }
// console.log(moveZeroes([1,3,0,0,8,0,2,0]))
// function moveZeroes(nums) {
//   let j = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {
//       nums[j] = nums[i];
//       if (i !== j) {
//         nums[i] = 0;
//       }
//       j++;
//     }
//   }
// }
// function moveZeroes(nums) {
//   let j = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {
//       let c = nums[j];
//       nums[j] = nums[i];
//       if (c === 0) {
//         nums[i] = 0;
//       }
//       j++;
//     }
//   }
// }
// 盛水最多的容器 1.暴力枚举O(n^2) 2.夹逼 O(n)
// function maxArea(arr) {
//   let max = 0;
//   for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       let area = Math.min(arr[i], arr[j]) * (j - i);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// console.log(maxArea([4,3,2,1,4]))
// function maxArea(arr) {
//   let max = 0;
//   for (let i = 0, j = arr.length - 1; i < j; ) {
//     let minHeight = arr[i] < arr[j] ? arr[i++] : arr[j--];
//     let area = minHeight * (j - i + 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 爬楼梯 1.暴力递归 O(2^n) 2.记忆化递归 O(n) 3.动态规划 O(n)
// function climbStairs(n) {
//   if (n <= 2) return n;
//   return climbStairs(n - 1) + climbStairs(n - 2);
// }
// console.log(climbStairs(5))
// let mapData = new Map();
// function climbStairs(n) {
//   if (n <= 2) return n;
//   if (mapData.has(n)) {
//     return mapData.get(n);
//   }
//   let value = climbStairs(n - 1) + climbStairs(n - 2);
//   mapData.set(n, value);
//   return value;
// }
// function climbStairs(n) {
//   if (n <= 2) return n;
//   let arr = [];
//   arr[1] = 1;
//   arr[2] = 2;
//   for (let i = 3; i <= n; i++) {
//     arr[i] = arr[i - 1] + arr[i - 2];
//   }
//   return arr[n];
// }
// function climbStairs(n) {
//   if (n <= 2) return n;
//   let a = 1, b = 2, r = 0;
//   for (let i = 0; i < n - 2; i++) {
//     r = a + b;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// 两数之和 1.暴力枚举 O(n^2) 2.hash O(n)
// function twoSum(nums, target) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       let sum = nums[i] + nums[j];
//       if (sum === target) {
//         return [i, j];
//       }
//     }
//   }
//   return [];
// }
// function twoSum(nums, target) {
//   let mapData = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     if (mapData.has(nums[i])) {
//       return [mapData.get(nums[i]), i];
//     }
//     mapData.set(target - nums[i], i);
//   }
//   return [];
// }
// 三数之和 1.暴力枚举 2.hash 3.夹逼
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let mapData = new Map();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         let tmp = [nums[i], nums[j], nums[k]];
//         tmp.sort((a, b) => a - b);
//         if (sum === 0) {
//           if (!mapData.has(tmp.join())) {
//             a.push([nums[i], nums[j], nums[k]]);
//             mapData.set(tmp.join(), [nums[i], nums[j], nums[k]]);
//           }
//         }
//       }
//     }
//   }
//   return a;
// }
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   nums.sort((a, b) => a - b);
//   for (let k = 0; k < nums.length - 2; k++) {
//     if (nums[k] > 0) break;
//     if (k > 0 && nums[k] === nums[k - 1]) continue;
//     let i = k + 1, j = nums.length - 1;
//     while(i < j) {
//       let sum = nums[k] + nums[i] + nums[j];
//       if (sum < 0) {
//         while(i < j && nums[i] === nums[++i]);
//       } else if (sum > 0) {
//         while(i < j && nums[j] === nums[--j]);
//       } else {
//         a.push([nums[k], nums[i], nums[j]]);
//         while(i < j && nums[i] === nums[++i]);
//         while(i < j && nums[j] === nums[--j]);
//       }
//     }
//   }
//   return a;
// }
// 移动零 1.遇零删除，再补零 2.加入新的内存 3.双指针交换元素
// function moveZeroes(nums) {
//   let count = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === 0) {
//       nums.splice(i, 1);
//       count++;
//       i--;
//     }
//   }
//   for (let i = 0; i < count; i++) {
//     nums.push(0)
//   }
//   return nums;
// }
// function moveZeroes(nums) {
//   let res1 = [];
//   let res2 = [];
//   nums.forEach(item => {
//     if (item === 0) {
//       res1.push(item);
//     } else {
//       res2.push(item);
//     }
//   });
//   return res2.concat.res1;
// }
// function moveZeroes(nums) {
//   let j = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {
//       let c = nums[j];
//       nums[j] = nums[i];
//       if (c === 0) {
//         nums[i] = 0;
//       }
//       j++;
//     }
//   }
//   return nums;
// }
// function moveZeroes(nums) {
//   let j = 0;
//   for (i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {
//       let c = nums[j];
//       nums[j] = nums[i];
//       nums[i] = c;
//       j++;
//     }
//   }
//   return nums;
// }
// 盛水最多的容器 1.暴力枚举 2.夹逼
// function maxArea(arr) {
//   let max = 0;
//   for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       let area = Math.min(arr[i], arr[j]) * (j - i)
//       max = Math.max(max, area);
//     }
//   }
//   return max;       
// }
// function maxArea(arr) {
//   let max = 0;
//   for (let i = 0, j = arr.length - 1; i < j; ) {
//     let minHeight = arr[i] < arr[j] ? arr[i++] : arr[j--];
//     let area = minHeight * (j - i + 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 爬楼梯 1.暴力递归 2.记忆化递归 3.动态规划
// function climbStairs(n) {
//   if (n <= 2) return n;
//   return climbStairs(n - 1) + climbStairs(n - 2);
// }
// let mapData = new Map();
// function climbStairs(n) {
//   if (n <= 2) return n;
//   if (mapData.has(n)) return mapData.get(n);
//   let value = climbStairs(n - 1) + climbStairs(n - 2);
//   mapData.set(n, value);
//   return value;
// }
// function climbStairs(n) {
//   if (n <= 2) return n;
//   let arr = [];
//   arr[1] = 1;
//   arr[2] = 2;
//   for (let i = 3; i <= n; i++) {
//     arr[i] = arr[i - 1] + arr[i - 2];
//   }
//   return arr[n];
// }
// function climbStairs(n) {
//   if (n <= 2) return n;
//   let a = 1, b = 2, r = 0;
//   for (let i = 0; i < n - 2; i++) {
//     r = a + b;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// 两数之和 1.暴力枚举 2.hash
// function twoSum(nums, target) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] === target) {
//         return [i, j];
//       }
//     }
//   }
//   return [];
// }
// function twoSum(nums, targe) {
//   let mapData = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     if (mapData.has(target - nums[i])) {
//       return [i, mapData.get(target - nums[i])];
//     }
//     mapData.set(nums[i], i);
//   }  
//   return [];
// }
// function twoSum(nums, target) {
//   let mapData = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     mapData.set(nums[i], i);
//   }
//   for (let i = 0; i < nums.length; i++) {
//     if (mapData.has(target - nums[i])) {
//       return [mapData.get(target - nums[i]), i];
//     }
//   }
//   return [];
// }
// 三数之和 1.暴力枚举 2.hash 3.夹逼
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let mapData = new Map();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (sum === 0) {
//           let tmp = [nums[i], nums[j], nums[k]];
//           tmp.sort();
//           if (!mapData.has(tmp.join())) {
//             a.push([nums[i], nums[j], nums[k]]);
//             mapData.set(tmp.join(), [nums[i], nums[j], nums[k]]);
//           }
//         }
//       }
//     }
//   }
//   return a;
// }
// console.log(threeSum([-1,0,1,2,-1,-4]))
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   nums.sort((a, b) => a - b);
//   let a = [];
//   for (let k = 0; k < nums.length - 2; k++) {
//     if (nums[k] > 0) break;
//     if (k > 0 && nums[k] === nums[k - 1]) continue;
//     let i = k + 1;
//     let j = nums.length - 1;
//     while(i < j) {
//       let sum = nums[k] + nums[i] + nums[j];
//       if (sum < 0) {
//         while(i < j && nums[i] === nums[++i]);
//       } else if (sum > 0) {
//         while(i < j && nums[j] === nums[--j]);
//       } else {
//         a.push([nums[k], nums[i], nums[j]]);
//         while(i < j && nums[i] === nums[++i]);
//         while(i < j && nums[j] === nums[--j]);
        
//       }
//     }
//   } 
//   return a;
// }
// 移动零 1.遇零删除 2.新增内存 3.双指针交换
// function moveZeroes(nums) {
//   let count = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === 0) {
//       nums.splice(i, 1);
//       count++;
//       i--;
//     }
//   }
//   for (let i = 0; i < count; i++) {
//     nums.push(0);
//   }
//   return nums;
// }
// function moveZeroes(nums) {
//   let res1 = [];
//   let res2 = [];
//   nums.forEach(item => {
//     if (item === 0) {
//       res1.push(item);
//     } else {
//       res2.push(item);
//     }
//   });
//   return res2.concat(res1);
// }
// function moveZeroes(nums) {
//   let j = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {
//       let c = nums[j];
//       nums[j] = nums[i];
//       if (c === 0) {
//         nums[i] = 0;
//       }
//       j++;
//     }
//   }
// }
// 盛水最多的容器 1.暴力枚举 2.夹逼
// function maxArea(arr) {
//   let max = 0;
//   for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       let area = Max.min(arr[i], arr[j]) * (j - i);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function maxArea(arr) {
//   let max = 0;
//   for (let i = 0, j = arr.length - 1; i < j; ) {
//     let minHeight = arr[i] < arr[j] ? arr[i++] : arr[j--];
//     let area = minHeight * (j - i + 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 爬楼梯 1.暴力递归 2.记忆化递归 3.动态规划
// function climbStairs(n) {
//   if (n <= 2) return n;
//   return climbStairs(n - 1) + climbStairs(n - 2); 
// }
// let mapData = new Map();
// function climbStairs(n) {
//   if (n <= 2) return n;
//   if (mapData.has(n)) {
//     return mapData.get(n);
//   }
//   let value = climbStairs(n - 1) + climbStairs(n - 2);
//   mapData.set(n, value);
//   return value;
// }
// function climbStair(n) {
//   if (n <= 2) return n;
//   let arr = [];
//   arr[1] = 1;
//   arr[2] = 2;
//   for (let i = 3; i <= n; i++) {
//     arr[i] = arr[i - 1] + arr[i - 2];
//   }
//   return arr[n];
// }
// function climbStairs(n) {
//   if (n <= 2) return n;
//   let a = 0, b = 1, r = 2;
//   for (let i = 0; i < n - 2; i++) {
//     a = b;
//     b = r;
//     r = a + b;
//   }
//   return r;
// }
// 两数之和 1.暴力枚举 2.hash
// function twoSum(nums, target) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] === target) {
//         return [i, j];
//       }
//     }
//   }
//   return [];
// }
// function twoSum(nums, target) {
//   let mapData = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     mapData.set(nums[i], i);
//   }
//   for (let i = 0; i < nums.length; i++) {
//     if (mapData.has(target - nums[i]) && mapData.get(target - nums[i]) !== i) {
//       return [i, mapData.get(target - nums[i])];
//     }
//   }
//   return [];
// }
// 三数之和 1.暴力枚举 2.hash 3.夹逼
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let mapData = new Map();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (sum === 0) {
//           let tmp = [nums[i], nums[j], nums[k]];
//           tmp.sort();
//           if (!mapData.has(tmp.join())) {
//             a.push([nums[i], nums[j], nums[k]]);
//             mapData.set(tmp.join(), [nums[i], nums[j], nums[k]]);
//           }
//         }
//       }
//     }
//   }
//   return a;
// }
// console.log(threeSum([-1,0,1,2,-1,-4]))
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   nums.sort((a, b) => a - b);
//   for (let k = 0; k < nums.length - 2; k++) {
//     if (nums[k] > 0) break;
//     if (k > 0 && nums[k] === nums[k - 1]) continue;
//     let i = k + 1;
//     let j = nums.length - 1;
//     while(i < j) {
//       let sum = nums[k] + nums[i] + nums[j];
//       if (sum < 0) {
//         while(i < j && nums[i] === nums[++i]);
//       } else if (sum > 0) {
//         while(i < j && nums[j] === nums[--j]);
//       } else {
//         a.push([nums[k], nums[i], nums[j]]);
//         while(i < j && nums[i] === nums[++i]);
//         while(i < j && nums[j] === nums[--j]);
//       }
//     }
//   }
//   return a;
// }
// 移动零 1.遇零删除 2.增加新的内存 3. 双指针交换
// function moveZeroes(nums) {
//   let count = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === 0) {
//       nums.splice(i, 1);
//       count++;
//       i--;
//     }
//   }
//   for (let i = 0; i < count; i++) {
//     nums.push(0);
//   }
//   return nums;
// }
// function moveZeroes(nums) {
//   let res1 = [];
//   let res2 = [];
//   nums.forEach(item => {
//     if (item === 0) {
//       res1.push(item);
//     } else {
//       res2.push(item);
//     }
//   });
//   return res2.concat(res1);
// }
// function moveZeroes(nums) {
//   let j = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== 0) {
//       let c = nums[j];
//       nums[j] = nums[i];
//       nums[i] = c;
//       j++;
//     }
//   }
//   return nums; 
// }
// 盛水最多的容器 1.暴力枚举 2.夹逼
// function maxArea(arr) {
//   let max = 0;
//   for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       let area = Math.min(arr[i], arr[j]) * (j - i);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function maxArea(arr) {
//   let max = 0;
//   for (let i = 0, j = arr.length - 1; i < j; ) {
//     let minHeight = arr[i] < arr[j] ? arr[i++] : arr[j--];
//     let area = minHeight * (j - i + 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 爬楼梯 1.暴力递归 2.记忆化递归 3.动态规划
// function climbStair(n) {
//   if (n <= 2) return n;
//   return climbStair(n - 1) + climbStair(n - 2); 
// }
// let mapData = new Map();
// function climbStair(n) {
//   if (n <= 2) return n;
//   if (mapData.has(n)) return mapData.get(n);
//   let value = climbStair(n - 1) + climbStair(n - 2);
//   mapData.set(n, value);
//   return value;
// }
// function climbStair(n) {
//   if (n <= 2) return n;
//   let arr = [];
//   arr[1] = 1;
//   arr[2] = 2;
//   for (let i = 3; i <= n; i++) {
//     arr[i] = arr[i - 1] + arr[i - 2];
//   }
//   return arr[n];
// }
// function climbStair(n) {
//   if (n <= 2) return n;
//   let a = 1, b = 2, r = 0;
//   for (let i = 0; i < n - 2; i++) {
//     let r = a + b;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// 两书之和 1.暴力枚举 2.hash
// function twoSum(nums, target) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] === target) {
//         return [i, j];
//       }
//     }
//   }
//   return [];
// }
// function twoSum(nums, target) {
//   let mapData = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     if (mapData.has(target - nums[i])) {
//       return [mapData.get(target - nums[i]), i];
//     }
//     mapData.set(nums[i], i);
//   }
// }
// 三数之和 1.暴力枚举 2.hash 3.夹逼
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let mapData = new Map();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (sum === 0) {
//           let tmp = [nums[i], nums[j], nums[k]];
//           tmp.sort();
//           if (!mapData.has(tmp.join())) {
//             a.push([nums[i], nums[j], nums[k]]);
//             mapData.set(tmp.join(), [nums[i], nums[j], nums[k]]);
//           }
//         }
//       }
//     }
//   }
//   return a;
// }
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   nums.sort((a, b) => a - b);
//   for (let k = 0; k < nums.length - 2; k++) {
//     if (nums[k] > 0) break;
//     if (k > 0 && nums[k] === nums[k - 1]) continue;
//     let i = k + 1;
//     let j = nums.length - 1;
//     while(i < j) {
//       let sum = nums[i] + nums[j] + nums[k];
//       if (sum < 0) {
//         while(i < j && nums[i] === nums[++i]);
//       } else if (sum > 0) {
//         while(i < j && nums[j] === nums[--j]);
//       } else {
//         a.push([nums[i], nums[j], nums[k]]);
//         while(i < j && nums[i] === nums[++i]);
//         while(i < j && nums[j] === nums[--j]);
//       }
//     }
//   }
//   return a;
// }
// 声明链表数据结构
// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }
// class LinkedList {
//   constructor(arr) {
//     let head = new Node(arr.shift());
//     let next = head;
//     arr.forEach(item => {
//       next.next = new Node(item);
//       next = next.next;
//     });
//     return head;
//   }
// }
// // 环形链表 1.hash 2.快慢指针
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let slow = head;
//   let fast = head.next;
//   while(fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     } else {
//       slow = slow.next;
//       fast = fast.next.next;
//     }
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let mapData = new Map();
//   let p = head;
//   while(p != null) {
//     if (mapData.has(p)) {
//       return true;
//     } else {
//       mapData.set(p, 1);
//       p = p.next;
//     }
//   }
//   return false;
// }
// 爬楼梯 1.暴力递归 2.记忆化递归 3.动态规划
// function climbStair(n) {
//   if (n <= 2) return n;
//   return climbStair(n - 1) + climbStair(n - 2); 
// }
// let mapData = new Map();
// function climbStair(n) {
//   if (n <= 2) return n;
//   if (mapData.has(n)) {
//     return mapData.get(n);
//   }
//   let value = climbStair(n - 1) + climbStair(n - 2);
//   mapData.set(n, value);
//   return value;
// }
// function climbStair(n) {
//   if (n < 2) return n;
//   let arr = [];
//   arr[1] = 1;
//   arr[2] = 2;
//   for (let i = 3; i <= n; i++) {
//     arr[i] = arr[i - 1] + arr[i - 2];
//   }
//   return arr[n];
// }
// function climbStair(n) {
//   if (n <= 2) return n;
//   let a = 1, b = 2, r = 0;
//   for (let i = 0; i < n - 2; i++) {
//     r = a + b;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// 两数之和 1.暴力枚举 O(n^2) 2.hash O(n)
// function twoSum(nums, target) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] === target) {
//         return [i, j];
//       }
//     }
//   }
//   return [];
// }
// function twoSum(nums, target) {
//   let mapData = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     if (mapData.has(target - nums[i])) {
//       return [mapData.get(target - nums[i]), i];
//     }
//     mapData.set(nums[i], i);
//   }
//   return [];
// }
// 三数之和 1.暴力枚举 2.hash 3.夹逼
// function threeSum(nums) {
//   let a = [];
//   let mapData = new Map();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (sum === 0) {
//           let tmp = [nums[i], nums[j], nums[k]];
//           tmp.sort();
//           if (!mapData.has(tmp.join())) {
//             a.push([nums[i], nums[j], nums[k]]);
//             mapData.set(tmp.join(), [nums[i], nums[j], nums[k]]);
//           }
//         }
//       } 
//     }
//   }
//   return a;
// }
// console.log(threeSum([-1,0,1,2,-1,-4]));
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return []; 
//   let a = [];
//   nums.sort((a, b) => a - b);
//   for (let k = 0; k < nums.length - 2; k++) {
//     if (nums[k] > 0) break;
//     if (k > 0 && nums[k] === nums[k - 1]) continue;
//     let i = k + 1;
//     let j = nums.length - 1;
//     while(i < j) {
//       let sum = nums[i] + nums[j] + nums[k];
//       if (sum < 0) {
//         while(i < j && nums[i] === nums[++i]);
//       } else if (sum > 0) {
//         while(i < j && nums[j] === nums[--j]);
//       } else {
//         a.push([nums[i], nums[j], nums[k]]);
//         while(i < j && nums[i] === nums[++i]);
//         while(i < j && nums[j] === nums[--j]);
//       }
//     }
//   }
//   return a;
// }
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let mapData = new Map();
//   let uniqMapData = new Map();
//   // nums.sort((a, b) => a -b);
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (mapData.has(nums[i] + nums[j]) && mapData.get(nums[i] + nums[j]) !== i) {
//         // a.push([nums[i], nums[j], mapData.get(nums[i] + nums[j])]);
//         let tmp = [nums[i], nums[j], nums[mapData.get(nums[i] + nums[j])]];
//         tmp.sort((a, b) => a - b);
//         if (!uniqMapData.has(tmp.join())) {
//           a.push([nums[i], nums[j], nums[mapData.get(nums[i] + nums[j])]]);
//           uniqMapData.set(tmp.join(), 1);
//         }
//       } else {
//         mapData.set(-nums[i], i);
//       }
//     }
//   }
//   return a;
// }
// 声明链表数据结构
// class Node {
//   costructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }
// class LinkedList {
//   constructor(arr) {
//     let head = new Node(arr.shift());
//     let next = head;
//     arr.forEach(item => {
//       next.next = new Node(item);
//       next = next.next;
//     });
//     return head;
//   }
// }
// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }
// class LinkedList {
//   constructor(arr) {
//     let head = new Node(arr.shift());
//     let next = head;
//     arr.forEach(item => {
//       next.next = new Node(item);
//       next = next.next;
//     });
//     return head;
//   }
// }
// // 环形链表
// function hasCycle(head) {
//   if(head === null || head.next === null) return false;
//   let mapData = new Map();
//   let p = head;
//   while(p != null) {
//     if (mapData.has(p)) {
//     	return true;
//     } else {
// 			mapData.set(p, 1);
//       p = p.next;
//     }
//   }
//   return false;
// }
// let head = new LinkedList([6, 1, 2, 5, 7, 9]);
// // head.next.next.next.next.next.next = head.next;
// console.log(hasCycle(head))
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let mapData = new Map();
//   let next = head;
//   while(next != null) {
//     if (mapData.has(next)) {
//       return true;
//     }
//     mapData.set(next, 1);
//     next = next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let slow = head;
//   let fast = head.next;
//   while(fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let mapData = new Map();
//   let next = head;
//   while(next != null) {
//     if (mapData.has(next)) {
//       return true;
//     }
//     mapData.set(next, 1);
//     next = next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let mapData = new Map();
//   let next = head;
//   while(next != null) {
//     if (mapData.has(next)) {
//       return true;
//     }
//     mapData.set(next, 1);
//     next = next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let slow = head;
//   let fast = head.next;
//   while(fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let slow = head;
//   let fast = head.next;
//   while(fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let mapData = new Map();
//   let next = head;
//   while(next != null) {
//     if (mapData.has(next)) {
//       return true;
//     }
//     mapData.set(next, 1);
//     next = next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let slow = head;
//   let fast = head.next;
//   while(fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// 两数之和 1.暴力枚举 2.hash
// function twoSum(nums, target) {
//   if (nums == null || nums.length <= 1) return [];
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] === target) {
//         return [i, j];
//       }
//     }
//   }
//   return [];
// }
// function twoSum(nums, target) {
//   if (nums == null || nums.length <= 1) return [];
//   let mapData = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     if (mapData.has(target - nums[i])) {
//       return [mapData.get(target - nums[i]), i]
//     }
//     mapData.set(nums[i], i);
//   }
//   return [];
// }
// 三数之和 1.暴力枚举 2.hash 3.夹逼
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let mapData = new Map();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (sum === 0) {
//           let tmp = [nums[i], nums[j], nums[k]];
//           tmp.sort();
//           if (!mapData.has(tmp.join())) {
//             a.push([nums[i], nums[j], nums[k]]);
//             mapData.set(tmp.join(), 1);
//           }
//         }
//       }
//     }
//   }
//   return a;
// }
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   nums.sort((a, b) => a - b);
//   for (let k = 0; k < nums.length - 2; k++) {
//     if (nums[k] > 0) break;
//     if (k > 0 && nums[k] === nums[k - 1]) continue;
//     let i = k + 1;
//     let j = nums.length - 1;
//     while(i < j) {
//       let sum = nums[i] + nums[j] + nums[k];
//       if (sum < 0) {
//         while(i < j && nums[i] === nums[++i]);
//       } else if (sum > 0) {
//         while(i < j && nums[j] === nums[--j]);
//       } else {
//         a.push([nums[i], nums[j], nums[k]]);
//         while(i < j && nums[i] === nums[++i]);
//         while(i < j && nums[j] === nums[--j]);
//       }
//     }
//   } 
//   return a;
// }
// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }
// class LinkedList {
//   constructor(arr) {
//     let head = new Node(arr.shift());
//     let next = head;
//     arr.forEach(item => {
//       next.next = new Node(item);
//       next = next.next;
//     }); 
//     return head;
//   }
// }
// 环形链表 1.暴力枚举 hash 2.快慢指针
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let next = head;
//   let mapData = new Map();
//   while(next != null) {
//     if (mapData.has(next)) {
//       return true;
//     }
//     mapData.set(next, 1);
//     next = next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let slow = head;
//   let fast = head.next;
//   while(fast != null || fast.next != null) {
//     if (fast == slow || fast.next == slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null) return false;
//   let mapData = new Map();
//   let next = head;
//   while(next != null) {
//     if (mapData.has(next)) {
//       return true;
//     }
//     mapData.set(next, 1);
//     next = next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let mapData = new Map();
//   let next = head;
//   while(next != null) {
//     if (mapData.has(next)) {
//       return true;
//     }
//     mapData.set(next, 1);
//     next = next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let slow = head;
//   let fast = head.next;
//   while(fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let slow = head;
//   let fast = head.next;
//   while(fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// function isValid(s) {
//   if (s.length % 2 === 1) return false;
//   let mapData = new Map([
//     ['(', ')'],
//     ['[', ']'],
//     ['{', '}']
//   ]);
//   let stack = [];
//   for (let i of s) {
//     if (mapData.has(i)) {
//       stack.push(i);
//     } else {
//       if (!stack.length || mapData.get(stack.pop()) !== i) {
//         return false;
//       }
//     }
//   }
//   return !stack.length;
// }
// function isValid(s) {
//   if (s.length % 2 === 1) return false;
//   let mapData = new Map([
//     [')', '('],
//     [']', '['],
//     ['}', '{']
//   ]);
//   let stack = [];
//   for (let i of s) {
//     if (mapData.has(i)) {
//       if (!stack.length || stack.pop() !== mapData.get(i)) {
//         return false;
//       }
//     } else {
//       stack.push(i);
//     }
//   }
//   return !stack.length;
// }
// function isValid(s) {
//   if (s.length % 2 === 1) return false;
//   let length = s.length / 2;
//   for (let i = 0; i < length; i++) {
//     s = s.replace('()', '').replace('[]', '').replace('{}', '');
//   }
//   return !s.length;
// }
// 有效的括号 1.暴力 replace 括号替换成'' O(n^2) 2.栈 O(n)
// function isValid(s) {
//   if (s.length % 2 === 1) return false;
//   let l = s.length / 2;
//   for (let i = 0; i < l; i++) {
//     s = s.replace('()', '').replace('[]', '').replace('{}', '');
//   }
//   return !s.length;
// }
// function isValid(s) {
//   if (s.length % 2 === 1) return false;
//   let mapData = new Map([
//     [')', '('],
//     [']', '['],
//     ['}', '{']
//   ]);
//   let stack = [];
//   for (let i of s) {
//     if (mapData.has(i)) {
//       if (!stack.length || stack.pop() !== mapData.get(i)) {
//         return false;
//       }
//     } else {
//       stack.push(i);
//     }
//   }
//   return !stack.length;
// }
// 有效的括号 1.暴力 遍历 replace 括号 -> '' O(n^2) 2.栈 O(n)
// function isValid(s) {
//   if (s.length % 2 === 1) return false;
//   let l = s.length / 2;
//   for (let i = 0; i < l; i++) {
//     s = s.replace('()', '').replace('[]', '').replace('{}', '');
//   }
//   return !s.length;
// }
// function isValid(s) {
//   if (s.length % 2 === 1) return false;
//   let mapData = new Map([
//     [')', '('],
//     [']', '['],
//     ['}', '{']
//   ]);
//   let stack = [];
//   for (let i of s) {
//     if (mapData.has(i)) {
//       if (!s.length || stack.pop() !== mapData.get(i)) {
//         return false;
//       }
//     } else {
//       stack.push(i);
//     }
//   }
//   return !stack.length;
// }
