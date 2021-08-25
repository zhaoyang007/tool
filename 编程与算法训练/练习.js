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
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let mapData = new Map();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = 0; j < nums.length - 1; j++) {
//       for (let k = 0; k < nums.length; k++) {
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
//   nums.sort((a, b) => a - b);
//   let a = [];
//   for (let k = 0; k < nums.length - 2; k++) {
//     if (nums[k] > 0) break;
//     if (k > 0 && nums[k] === nums[k - 1]) continue;
//     let i = k + 1, j = nums.length - 1;
//     while(i < j) {
//       let sum = nums[i] + nums[j] + nums[k];
//       if (sum < 0) {
//         while(i < j && nums[i] === nums[++i]);
//       } else if(sum > 0) {
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
// js声明链表数据结构
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
// 环形链表 1.hash 2.快慢指针
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let mapData = new Map();
//   let next = head;
//   while (next != null) {
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
//   while (fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// 有效的括号 1.replace O(n^2) 2.stack o(1)
// function isValid(s) {
//   if (s.length % 2 === 1) return false;
//   let l = a.length / 2;
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
// 最小栈 1.辅助栈
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [Infinity];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
//   }
//   pop() {
//     this.x_stack.pop();
//     this.min_stack.pop();
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// // }
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [Infinity];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
//   }
//   pop() {
//     if (this.x_stack.length) {
//       this.x_stack.pop();
//       this.min_stack.pop();
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     if (this.min_stack.length === 0 || x <= this.min_stack[this.min_stack.length - 1]) {
//       this.min_stack.push(x);
//     }
//   }
//   pop() {
//     if (this.x_stack.length) {
//       if (this.x_stack.pop() === this.min_stack[this.min_stack.length - 1]) {
//         this.min_stack.pop();
//       }
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [Infinity];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
//   }
//   pop() {
//     if (this.x_stack.length) {
//       this.x_stack.pop();
//       this.min_stack.pop();
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     if (!this.min_stack.length || x <= this.min_stack[this.min_stack.length - 1]) {
//       this.min_stack.push(x);
//     }
//   }
//   pop() {
//     if (this.x_stack.length) {
//       if (this.x_stack.pop() === this.min_stack[this.min_stack.length - 1]) {
//         this.min_stack.pop();
//       }
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// js声明链表数据结构
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
//   let setData = new Set();
//   let next = head;
//   while (next != null) {
//     if (setData.has(next)) {
//       return true;
//     }
//     setData.add(next);
//     next = next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let slow = head;
//   let fast = head.next;
//   while (fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// 有效的括号 1.暴力 replace O(n^2) 2.栈 O(n)
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
// 最小栈 1.使用两个栈，一个正常存储元素的栈，一个辅助栈
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [Infinity];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
//   }
//   pop() {
//     if (this.x_stack.length) {
//       this.x_stack.pop();
//       this.min_stack.pop();
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     if (!this.min_stack.length || x <= this.min_stack[this.min_stack.length - 1]) {
//       this.min_stack.push(x);
//     }
//   }
//   pop() {
//     if (this.x_stack.length) {
//       if (this.x_stack.pop() === this.min_stack[this.min_stack.length - 1]) {
//         this.min_stack.pop();
//       }
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// js声明链表数据结构
// class Node {
//   constructor(value ) {
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
// 环形链表 1.暴力 hash 2.快慢指针
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let mapData = new Map();
//   let next = head.next;
//   while (next) {
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
//   while (fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// 有效的括号 1.暴力 replace O(n^2) 2.栈 O(n)
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
// 最小栈 1.两个栈
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [Infinity];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     if (this.min_stack.length) {
//       this.min_stack.push(Math.min(x, this.min_stack[this.min_stack.length - 1]));
//     }
//   }
//   pop() {
//     if (this.x_stack.length) {
//       this.x_stack.pop();
//       this.min_stack.pop();
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     if (this.min_stack.length === 0 || x <= this.min_stack[this.min_stack.length - 1]) {
//       this.min_stack.push(x);
//     }
//   }
//   pop() {
//     if (this.x_stack.length) {
//       if (this.x_stack.pop() === this.min_stack[this.min_stack.length - 1]) {
//         this.min_stack.pop();
//       }
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// 移动零 1.遇零删除O(n^2) 2.新内存O(n) 3.双指针交换元素O(n)
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
// 盛水最多的容器 1.暴力 O(n^2) 2.夹逼 O(n)
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
// 声明链表数据结构
// class Node {
//   contructor(value) {
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
// 环形链表 1.hash 2.快慢指针
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let mapData = new Map();
//   let next = head.next;
//   while (next != null) {
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
//   while (fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// 有效的括号 1.暴力 replace O(n^2) 2.栈 O(n)
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
//       if (stack.length === 0 || stack.pop() !== mapData.get(i)) {
//         return false;
//       }
//     } else {
//       stack.push(i);
//     }
//   }
//   return !stack.length;
// }
// 最小栈 1.栈
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     this.min_stack.push(Math.min(x, this.min_stack[this.min_stack.length - 1]));
//   }
//   pop() {
//     if (this.x_stack.length) {
//       this.x_stack.pop();
//       this.min_stack.pop();
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     if (!this.min_stack.length || x <= this.min_stack[this.min_stack.length - 1]) {
//       tihs.min_stack.push(x);
//     }
//   }
//   pop() {
//     if (this.x_stack.length) {
//       if (this.x_stack.pop() === this.min_stack[this.min_stack.length - 1]) {
//         this.min_stack.pop();
//       }
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// 三数之和 1.暴力 2.hash 3.夹逼
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let mapData = new Map();
//   let setData = new Set();
//   for (let i = 0; i < nums.length - 2; i++) {
//     mapData.set(nums[i], nums[i]);
//     for (let j = i + 2; j < nums.length; j++) {
//       let sum = nums[i + 1] + nums[j];
//       if (mapData.has(-sum)) {
//         let tmp = [mapData.get(-sum), nums[i + 1], nums[j]];
//         tmp.sort();
//         if (!setData.has(tmp.join())) {
//           a.push([mapData.get(-sum), nums[i + 1], nums[j]]);
//           setData.add(tmp.join(), 1);
//         }
//       }
//     }
//   }
//   return a;
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
// function climbStairs(n) {
//   if (n <= 2) return n;
//   let a = [];
//   a[1] = 1;
//   a[2] = 2;
//   for (let i = 3; i <= n; i++) {
//     a[i] = a[i - 1] + a[i - 2];
//   }
//   return a[n];
// }
// function climbstairs(n) {
//   if (n <= 2) return n;
//   let a = 1, b = 2, r = 0;
//   for (let i = 0; i < n - 2; i++) {
//     r = a + b;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// js声明链表数据结构
// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }
// class LinkedList {
//   constructor(list) {
//     let head = new Node(list.shift());
//     let next = head;
//     list.forEach(item => {
//       next.next = new Node(item);
//       next = next.next;
//     });
//     return head;
//   }
// }
// 环形链表 1.hash 2.快慢指针
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let mapData = new Map();
//   let next = head;
//   while (next) {
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
//   while (fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// 有效的括号 1.暴力 replace 2.栈
// function isValid(s) {
//   if (s.length % 2 === 1) return false;
//   let l = s.length / 2;
//   for (let i = 0; i < l; i++) {
//     s = s.replace('()', '').replace('[]', '').replace('{}', '');
//   }  
//   return !s.length;
// }
// function isValue(s) {
//   if (s.length % 2 === 1) return false;
//   let mapData = new Map([
//     [')', '('],
//     [']', '['],
//     ['}', '{']
//   ]);
//   let stack = [];
//   for (let i of s) {
//     if (mapData.has(i)) {
//       if (stack.length === 0 || stack.pop() !== mapData.get(i)) {
//         return false;
//       }
//     } else {
//       stack.push(i);
//     }
//   }
//   return !stack.length;
// }
// 最小栈 1.辅助栈
// 同步
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [Infinity];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
//   }
//   pop() {
//     this.x_stack.pop();
//     this.min_stack.pop();
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// 不同步
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     if (!this.min_stack.length || x <= this.min_stack[this.min_stack.length - 1]) {
//       this.min_stack.push(x);
//     }
//   }
//   pop() {
//     if (this.x_stack.pop() === this.min_stack[this.min_stack.length - 1]) {
//       this.min_stack.pop();
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// 滑动窗口最大值 1.暴力 O(n*k) 2.双端队列
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   for (let i = 0; i < nums.length; i++) {
//     let max = nums[i];
//     for (let j = i; j < i + k; j++) {
//       max = Math.max(max, nums[j]);
//     }
//     a.push(max);
//   }
//   return a;
// }
// 滑动窗口最大值
// function maxSlidingWindow(nums, k) {
//   let q = [];
//   for (let i = 0; i < k; i ++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//   }
//   let res = [nums[q[0]]];
//   for (let i = k; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     res.push(nums[q[0]]);
//   }
//   return res;
// }
// 滑动窗口最大值
// function maxSlidingWindow(nums, k) {
//   let res = [];
//   let q = [];
//   for (let i = 0; i < k; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//   }
//   res[0] = nums[q[0]];
//   for (let i = k; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     res.push(nums[q[0]]);
//   }
//   return res;
// }
// 滑动窗口最大值
// function maxSlidingWindow(nums, k) {
//   let res = [];
//   let q = [];
//   for (let i = 0; i < k; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//   }
//   res.push(nums[q[0]]);
//   for (let i = k; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     res.push(nums[q[0]]);
//   }
//   return res;
// }
// function maxSlidingWindow(nums, k) {
//   let res = [];
//   let q = [];
//   for (let i = 0; i < nums.length; i++) {
//     while (q.length && nums[i] > nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     if (i >= k - 1) res.push(nums[q[0]]);
//   }
//   return res;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   for (let i = 0; i < nums.length - k + 1; i++) {
//     let max = nums[i];
//     for (let j = i; j < i + k; j++) {
//       if (nums[j] > max) {
//         max = nums[j];
//       }
//     }
//     a.push(max);
//   }
//   return a;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let minHeight = heights[i];
//     for (let j = i; j < heights.length; j++) {
//       minHeight = Math.min(minHeight, heights[j]);
//       let area = (j - i + 1) * minHeight;
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     for (let j = i; j < heights.length; j++) {
//       let area = (j - i + 1) * Math.min.apply(null, heights.slice(i, j + 1));
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// console.log(largestRectangleArea([0,9]))
// 有效的括号 1.暴力 replace 2.栈
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
// 最小栈 1.辅助栈
// 同步
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [Infinity];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     this.min_stack.push(Math.min(x, this.min_stack[this.min_stack.length - 1]));
//   }
//   pop() {
//     this.x_stack.pop();
//     this.min_stack.pop();
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// 不同步
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     if (this.min_stack.length === 0 || x <= this.min_stack[this.min_stack.length - 1]) {
//       this.min_stack.push(x);
//     }
//   }
//   pop() {
//     if (this.x_stack.pop() === this.min_stack[this.min_stack.length - 1]) {
//       this.min_stack.pop();
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// 滑动窗口最大值 1.暴力 O(n*k) 2.双端单调递减队列 O(n)
// function maxSlidingWindow(nums, k) {
//   let res = [];
//   for (let i = 0; i < nums.length - k + 1; i++) {
//     let max = nums[i];
//     for (let j = i; j < i + k; j++) {
//       max = Math.max(max, nums[j]);
//     }
//     res.push(max);
//   }
//   return res;
// }
// function maxSlidingWindow(nums, k) {
//   let res = [];
//   let q = [];
//   for (let i = 0; i < k; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//   }
//   res.push(nums[q[0]]);
//   for (let i = k; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     res.push(nums[q[0]]);
//   }
//   return res;
// }
// function maxSlidingWindow(nums, k) {
//   let res =[];
//   let q = [];
//   for (let i = 0; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     if (i >= k - 1) res.push(nums[q[0]]);
//   }
//   return res;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i;
//     let k = i;
//     // for (; j >= 0; j--) {
//     //   if (heights[j] < heights[i]) break;
//     // }
//     // for (; k < heights.length; k++) {
//     //   if (heights[k] < heights[i]) break;
//     // }
//     while (j >= 0 && heights[j] >= heights[i]) j--;
//     while (k < heights.length && heights[k] >= heights[i]) k++;
//     let area = (k - j - 1) * heights[i];
//     max = Math.max(max, area);
//   }
//   return max;
// }
// console.log(largestRectangleArea([5,4]))
// largestRectangleArea
// function largestRectangleArea(heights) {
// 	let max = 0;
//   let stack = [];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = (i - index) * heights[index];
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   for (let i = 0; i < stack.length; i++) {
//     let area = (stack[stack.length - 1] - stack[i] + 1) * heights[stack[i]];
//     max = Math.max(max, area);
//   }
//   return max;
// }
// console.log(largestRectangleArea([2,1,5,6,2,3]))
// 两数之和 1.暴力枚举 O(n^2) 2.hash O(n)
// function twoSum(nums, k) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] === k) {
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
//       return [i, mapData.get(target - nums[i])];
//     }
//     mapData.set(nums[i], i);
//   }
//   return [];
// }
// 最小栈 1.辅助栈
// 同步
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [Infinity];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     this.min_stack.push(Math.min(x, this.min_stack[this.min_stack.length - 1]));
//   }
//   pop() {
//     this.x_stack.pop();
//     this.min_stack.pop();
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// 不同步
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     if (this.min_stack.length === 0 || x <= this.min_stack[this.min_stack.length - 1]) {
//       this.min_stack.push(x);
//     }
//   }
//   pop() {
//     if (this.x_stack.pop() === this.min_stack[this.min_stack.length - 1]) {
//       this.min_stack.pop();
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// 滑动窗口最大值 1.暴力 O(n*k) 2.单调双端队列 O(n)
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   let max = 0;
//   for (let i = 0; i < nums.length - k + 1; i++) {
//     for (let j = i; j < i + k; j++) {
//       max = Math.max(max, nums[j]);
//       a.push(max);
//     }
//   }
//   return a;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   for (let i = 0; i < nums.length - k + 1; i++) {
//     let max = nums[i];
//     for (let j = i; j < i + k; j++) {
//       max = Math.max(max, nums[j]);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < k; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//   }
//   a.push(nums[q[0]]);
//   for (let i = k; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     a.push(nums[q[0]]);
//   }
//   return a;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     if (i >= k - 1) a.push(nums[q[0]]); 
//   }
//   return a;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < k; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//   }
//   a.push(nums[q[0]]);
//   for (let i = k; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     a.push(nums[q[0]]);
//   }
//   return a;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     if (i >= k - 1) a.push(nums[q[0]]);
//   }
//   return a;
// }
// function largestRectangleArea(heights) {
// 	let max = 0;
//   let stack = [];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = (i - index) * heights[index];
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   for (let i = 0; i < stack.length; i++) {
//     let area = (stack[stack.length - 1] - stack[i] + 1) * heights[stack[i]];
//     max = Math.max(max, area);
//   }
//   return max;
//   // let max = 0;
//   // let stack = [-1];
//   // for (let i = 0; i < heights.length; i++) {
//   //   while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//   //     let area = (i - stack[stack.length - 2] - 1) * heights[stack.pop()];
//   //     max = Math.max(max, area);
//   //   }
//   //   stack.push(i);
//   // }
//   // for (let i = 1; i < stack.length; i++) {
//   //   let area = heights[stack[i]] * (stack[stack.length - 1] - stack[i - 1]);
//   //   max = Math.max(max, area);
//   // }
//   // return max;
// }
// console.log(largestRectangleArea([6,5]))
// function largestRectangleArea(heights) {
// 	let left = [];
//   let right = new Array(heights.length).fill(heights.length);
//   let stack = [];
//   for (let i = 0; i < heights.length; i++) {
// 		while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
//     	right[stack.pop()] = i;
//     }
//     left[i] = !stack.length ? -1 : stack[stack.length - 1];
//     stack.push(i);
//   }
//   console.log(left)
//   console.log(right)
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// console.log(largestRectangleArea([2,1,5,6,2,3]))
// 滑动窗口最大值 1.暴力 O(n*k) 2.双端递减队列 O(n)
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   for (let i = 0; i < nums.length - k + 1; i++) {
//     let max = nums[i];
//     for (let j = i; j < i + k; j++) {
//       max = Math.max(max, nums[j]);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     if (i >= k - 1) a.push(nums[q[0]]);
//   }
//   return a;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < k; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//   }
//   a.push(nums[q[0]]);
//   for (let i = k; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     a.push(nums[q[0]]);
//   }
//   return a;
// }
// 三数之和 1.暴力枚举 2.hash 2.夹逼
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let map = new Map();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         let tmp = [nums[i], nums[j], nums[k]];
//         tmp.sort();
//         if (sum === 0) {
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
//     while (i < j) {
//       let sum = nums[i] + nums[j] + nums[k];
//       if (sum < 0) {
//         while (i < j && nums[i] === nums[++i]);
//       } else if (sum > 0) {
//         while (i < j && nums[j] === nums[--j]);
//       } else {
//         a.push([nums[k], nums[i], nums[j]]);
//         while (i < j && nums[i] === nums[++i]);
//         while (i < j && nums[j] === nums[--j]);
//       }
//     }
//   }
//   return a;
// }
// 有效的字母异位词
// function isAnagram(s, t) {
//   let sortS = Array.from(s).sort().join();
//   let sortT = Array.from(t).sort().join();
//   return sortS === sortT;
// }
// function isAnagram(s, t) {
//   let mapData = new Map();
//   for (let i of s) {
//     if (mapData.has(i)) {
//       mapData.set(i, mapData.get(i) + 1);
//     } else {
//       mapData.set(i, 1);
//     }
//   }
//   for (let i of t) {
//     if (mapData.has(i)) {
//       mapData.set(i, mapData.get(i) - 1);
//       if (mapData.get(i) < 0) return false;
//     } else {
//       return false;
//     }
//   }
//   // for (let [key, value] of mapData) {
//   //   if (mapData.get(key) !== 0) {
//   //     return false;
//   //   }
//   // }
//   return true;
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) {
//     return false;
//   }
//   const table = new Array(26).fill(0);
//   for (let i = 0; i < s.length; ++i) {
//       table[s.codePointAt(i) - 'a'.codePointAt(0)]++;
//   }
//   for (let i = 0; i < t.length; ++i) {
//       table[t.codePointAt(i) - 'a'.codePointAt(0)]--;
//       if (table[t.codePointAt(i) - 'a'.codePointAt(0)] < 0) {
//           return false;
//       }
//   }
//   return true;
// }
// console.log(isAnagram("anagram", "nagaram"));
// function groupAnagrams(strs) {
//   let a = [];
//   let mapData = new Map();
//   strs.forEach(item => {
//     let key = [...item].sort().join('');
//     if (mapData.has(key)) {
//       let a = mapData.get(key);
//       a.push(item);
// 			mapData.set(key, a);
//     } else {
// 			mapData.set(key, [item]);
//     }
//   });
//   for (let [key, value] of mapData) {
//   	a.push(value); 
//   }
//   return a;
// }
// function groupAnagrams(strs) {
//   let mapData = new Map();
//   for (let str of strs) {
//     let key = [...str].sort().join('');
//    	let list = mapData.has(key) ? mapData.get(key) : [];
//     list.push(str);
//     mapData.set(key, list);
//   };
//   return [...mapData.values()];
// }
// groupAnagrams(["eat","tea","tan","ate","nat","bat"]);
// function groupAnagrams(strs) {
//   let map = {};
//   for (let str of strs) {
//     let count = new Array(26).fill(0);
//     for (let c of str) {
//       count[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     map[count] ? map[count].push(str) : map[count] = [str];
//   }
//   console.log(map)
//   return Object.values(map);
// }
// function groupAnagrams(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let count = new Array(26).fill(0);
//     for (let c of str) {
//       count[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     let list = map.has(count.join()) ? map.get(count) : [];
//     list.push(str);
//     map.set(count, list);
//   }
//   return Array.from(map.values());
// }
// groupAnagrams(["eat","tea","tan","ate","nat","bat"])
// 滑动窗口最大值 1.暴力 O(n*k) 2.双端单调队列 O(n)
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   for (let i = 0; i < nums.length - k + 1; i++) {
//     let max = nums[i];
//     for (let j = i; j < i + k; j++) {
//       max = Math.max(max, nums[j]);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < k; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//   }
//   a.push(nums[q[0]]);
//   for (let i = k; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     a.push(nums[q[0]]);
//   }
//   return a;
// }
// 柱状图中最大的矩形 1.暴力 O(n^3) 2.暴力2 O(n^2) 3.栈 O(n)
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     for (let j = i; j < heights.length; j++) {
//       let area = (j - i + 1) * Math.min.apply(null, heights.slice(i, j + 1));
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// console.log(largestRectangleArea([0,9]))
// 柱状图中最大的矩形 1.暴力 O(n^3) 2.扩散 O(n^2) 3.栈 O(n)
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     for (let j = i; j <heights.length; j++) {
//       let area = Math.min.apply(null, heights.slice(i, j + 1)) * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let minHeight = heights[i];
//     for (let j = i; j < heights.length; j++) {
//       minHeight = Math.min(minHeight, heights[j]);
//       let area = minHeight * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i, k = i;
//     while (j >= 0 && heights[j] >= heights[i]) j--;
//     while (k < heights.length && heights[k] >= heights[i]) k++;
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     // let j = i, k = i;
//     for (let j = i; j >= 0; j--) {
//       if (heights[j] < heights[i]) break;
//     }
//     for (let k = i; k < heights.length; k++) {
//       if (heights[k] < heights[i]) break;
//     }
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   for (let i = 0 ; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   for (let i = 1; i < stack.length; i++) {
//     let area = heights[stack[i]] * (stack[stack.length - 1] - stack[i - 1]);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   heights.push(0);
//   for (let i = 0; i < heights.length; i++) {
//     while (heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let left = [];
//   let right = [];
//   let stack = [];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     left[i] = !stack.length ? -1 : stack[stack.length - 1];
//     stack.push(i);
//   }
//   stack = [];
//   for (let i = heights.length - 1; i >= 0; i--) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     right[i] = !stack.length ? heights.length : stack[stack.length - 1];
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let left = [];
//   let right = new Array(heights.length).fill(heights.length);
//   let stack = [];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
//       right[stack.pop()] = i;
//     }
//     left[i] = !stack.length ? -1 : stack[stack.length - 1];
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 滑动窗口最大值 2.暴力 O(n*k) 2.队列 O(n)
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   for (let i = 0; i < nums.length - k + 1; i++) {
//     let max = nums[i];
//     for (let j = i; j < i + k; j++) {
//       max = Math.max(max, nums[j]);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < k; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//   }
//   a.push(nums[q[0]]);
//   for (let i = k; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     a.push(nums[q[0]])
//   }
//   return a;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     if (i >= k - 1) a.push(nums[q[0]]);
//   }
//   return a;
// }
// 有效的字母异位词 1.排序后比较是否相等 O(nlogn) 2.hash map 统计字母出现频次
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   return [...s].sort().join() === [...t].sort().join();
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let map = new Map();
//   for (let i of s) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let i of t) {
//     if (map.has(i)) {
//       map.set(i, map.get(i) - 1);
//     } else {
//       return false;
//     }
//   }
//   for (let [key, value] of map) {
//     if (value !== 0) return false;
//   }
//   return true;
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let map = new Map();
//   for (let i of s) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let i of t) {
//     if (map.has(i)) {
//       map.set(i, map.get(i) - 1);
//       if (map.get(i) < 0) return false;
//     } else {
//       return false;
//     }
//   }
//   return true;
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let table = new Array(26).fill(0);
//   for (let i = 0; i < s.length; i++) {
//     table[s.codePointAt(i) - 'a'.codePointAt(0)]++;
//   }
//   for (let i = 0; i < t.length; i++) {
//     table[t.codePointAt(i) - 'a'.codePointAt(0)]--;
//     if (table[t.codePointAt(i) - 'a'.codePointAt(0)] < 0) return false;
//   }
//   return true;
// }
// 字母异位词分组 1.排序后归类 O(nklogk) 2.自制hash O(n*k)
// function groupAnagrams(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let key = [...str].sort().join();
//     let value = map.has(key) ? map.get(key) : [];
//     value.push(str);
//     map.set(key, value);
//   }
//   return [...map.values()];
// }
// function groupAnagrams(strs) {
//   let map = {};
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     map[table] ? map[table].push(str) : map[table] = [str];
//   }
//   return Object.values(map);
// }
// function groupAnagrams(strs) {
  // let map = new Map();
  // for (let str of strs) {
  //   let table = new Array(26).fill(0);
  //   for (let c of str) {
  //     table[c.charCodeAt() - 'a'.charCodeAt()]++;
  //   }
  //   let value = map.has(table) ? map.get(table) : [];
  //   value.push(str);
  //   map.set(table, value);
  // }
  // return Array.from(map.values());
  // let map = new Map();
  // for (let str of strs) {
  //   let count = new Array(26).fill(0);
  //   for (let c of str) {
  //     count[c.charCodeAt() - 'a'.charCodeAt()]++;
  //   }
  //   console.log(map.get(count.join(',')))
  //   map.has(count.join(',')) ? map.get(count.join(',')).push(str) : map.set(count.join(','), [str]);
  // }
  // return Array.from(map.values());
// }
// console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))
// 三数之和 2.hash O(n^2)
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length - 2; i++) {
//     map.set(nums[i], nums[i]);
//     for (let j = i + 2; j < nums.length; j++) {
//       let sum = nums[i + 1] + nums[j];
//       if (map.has(-sum)) {
//         let tmp = [map.get(-sum), nums[i + 1], nums[j]];
//         tmp.sort();
//         if (!set.has(tmp.join())) {
//           a.push([map.get(-sum), nums[i + 1], nums[j]]);
//           set.add(tmp.join());
//         }
//       }
//     }
//   }
//   return a;
// }
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length - 2; i++) {
//     map.set(nums[i], i);
//     for (let j = i + 2; j < nums.length; j++) {
//       let sum = nums[i + 1] + nums[j];
//       if (map.has(-sum)) {
//         let tmp = [nums[map.get(-sum)], nums[i + 1], nums[j]];
//         tmp.sort();
//         if (!set.has(tmp.join())) {
//           a.push([nums[map.get(-sum)], nums[i + 1], nums[j]]);
//           set.add(tmp.join());
//         }
//       }
//     }
//   }
//   return a;
// }
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       let sum = nums[i] + nums[j];
//       if (map.has(-sum)) {
//         let tmp = [nums[map.get(-sum)], nums[i], nums[j]];
//         tmp.sort();
//         if (!set.has(tmp.join())) {
//           a.push([nums[map.get(-sum)], nums[i], nums[j]]);
//           set.add(tmp.join());
//         }
//       }
//     }
//     map.set(nums[i], i);
//   }
//   return a;
// }
// function fourSum(nums, target) {
//   if (nums == null || nums.length <= 3) return [];
//   let a = [];
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (map.has(target - sum)) {
//           let tmp = [nums[map.get(target - sum)], nums[i], nums[j], nums[k]];
//           tmp.sort();
//           if (!set.has(tmp.join())) {
//             a.push([nums[map.get(target - sum)], nums[i], nums[j], nums[k]]);
//             set.add(tmp.join());
//           }
//         }
//       }
//     }
//     map.set(nums[i], i);
//   }
//   return a;
// }
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let mapData = new Map();
//   let setData = new Set();
//   for (let i = 0; i < nums.length - 2; i++) {
//     mapData.set(nums[i], i);
//   }
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       let sum = nums[i] + nums[j];
//       if (mapData.has(-sum) && mapData.get(-sum) !== i && mapData.get(-sum) !== j) {
//         let tmp = [nums[mapData.get(-sum)], nums[i], nums[j]];
//         tmp.sort();
//         if (!setData.has(tmp.join())) {
//           a.push([nums[mapData.get(-sum)], nums[i], nums[j]]);
//           setData.add(tmp.join());
//         }
//       }
//     }
//   }
//   return a;
// }
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       let sum = nums[i] + nums[j];
//       if (map.has(-sum)) {
//         let tmp = [map.get(-sum), nums[i], nums[j]];
//         tmp.sort();
//         if (!set.has(tmp.join())) {
//           a.push([map.get(-sum), nums[i], nums[j]]);
//           set.add(tmp.join());
//         }
//       }
//     }
//     map.set(nums[i], nums[i]);
//   }
//   return a;
// }
// 三数之和 1.暴力 O(n^3) 2.hash O(n^2) 3.夹逼 O(n^2)
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let set = new Set();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (sum === 0) {
//           let tmp = [nums[i], nums[j], nums[k]];
//           tmp.sort();
//           if (!set.has(tmp.join())) {
//             a.push([nums[i], nums[j], nums[k]]);
//             set.add(tmp.join());
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
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       let sum = nums[i] + nums[j];
//       if (map.has(-sum)) {
//         let tmp = [map.get(-sum), nums[i], nums[j]];
//         tmp.sort();
//         if (!set.has(tmp.join())) {
//           a.push([map.get(-sum), nums[i], nums[j]]);
//           set.add(tmp.join());
//         }
//       }
//     }
//     map.set(nums[i], nums[i]);
//   }
//   return a;
// }
// function threeSum(nums) {
//   if (nums == null || nums.length <= 2) return [];
//   let a = [];
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length; i++) {
//     map.set(nums[i], i);
//   }
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       let sum = nums[i] + nums[j];
//       if (map.has(-sum) && map.get(-sum) !== i && map.get(-sum) !== j) {
//         let tmp = [nums[map.get(-sum)], nums[i], nums[j]];
//         tmp.sort();
//         if (!set.has(tmp.join())) {
//           a.push([nums[map.get(-sum)], nums[i], nums[j]]);
//           set.add(tmp.join());
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
//     while (i < j) {
//       let sum = nums[k] + nums[i] + nums[j];
//       if (sum < 0) {
//         while (i < j && nums[i] === nums[++i]);
//       } else if (sum > 0) {
//         while (i < j && nums[j] === nums[--j]);
//       } else {
//         a.push([nums[i], nums[j], nums[k]]);
//         while (i < j && nums[i] === nums[++i]);
//         while (i < j && nums[j] === nums[--j]) ;
//       }
//     }
//   }
//   return a;
// }
// 有效的字母异位词 1.字母排序后比较是否相等 O(nlogn) 2.hash 统计每个字母出现的频次 O(n)
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   return Array.from(s).sort().join() === Array.from(t).sort().join();
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let map = new Map();
//   for (let i of s) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let i of t) {
//     if (map.has(i)) {
//       map.set(i, map.get(i) - 1);
//       if (map.get(i) < 0) return false;
//     } else {
//       return false;
//     }
//   }
//   return true;
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let table = new Array(26).fill(0);
//   for (let i of s) {
//     table[i.charCodeAt() - 'a'.charCodeAt()]++;
//   }
//   for (let i of t) {
//     table[i.charCodeAt() - 'a'.charCodeAt()]--;
//     if (table[i.charCodeAt() - 'a'.charCodeAt()] < 0) return false; 
//   }
//   return true;
// }
// 字母异位词分组 1.排序后 hash O(n*klogk) 2.自制 hash O(n*k)
// function groupAnagrams(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let key = [...str].sort().join();
//     let value = map.has(key) ? map.get(key) : [];
//     value.push(str);
//     map.set(key, value);
//   }
//   return [...map.values()];
// }
// function groupAnagrams(strs) {
//   let map = {};
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     map[table] ? map[table].push(str) : map[table] = [str];
//   }
//   return Object.values(map);
// }
// function groupAnagrams(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     map.has(table.join()) ? map.get(table.join()).push(str) : map.set(table.join(), [str]);
//   }
//   return [...map.values()];
// }
// 柱状图中最大的矩形 1.暴力 O(n^3) 2.扩散遍历 3.栈
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let minHeight = heights[i];
//     for (let j = i; j < heights.length; j++) {
//       minHeight = Math.min(minHeight, heights[j]);
//       let area = minHeight * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i, k = i;
//     while (j >= 0 && heights[j] >= heights[i]) j--;
//     while (k < heights.length && heights[k] >= heights[i]) k++;
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area); 
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   for (let i = 1; i < stack.length; i++) {
//     let area = heights[stack[i]] * (stack[stack.length - 1] - stack[i - 1]);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = new Array(heights.length).fill(heights.length);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       right[stack.pop()] = i;
//     }
//     left[i] = !stack.length ? -1 : stack[stack.length - 1];
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 声明链表的数据结构
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
// 环形链表 1.hash 2.快慢指针
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let map = new Map();
//   let next = head;
//   while (next != null) {
//     if (map.has(next)) {
//       return true;
//     }
//     map.set(next, 1);
//     next = next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let slow = head;
//   let fast = head.next;
//   while (fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// 字母异位词分组 1.排序+hash O(n*klogk) 2.自制hash+hash O(n*k)
// function groupAnagrams(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let key = [...str].sort().join();
//     let value = map.has(key) ? map.get(key) : [];
//     value.push(str);
//     map.set(key, value);
//   }
//   return [...map.values()];
// }
// function groupAnagrams(strs) {
//   let map = {};
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     map[table] ? map[table].push(str) : map[table] = [str];
//   }
//   return Object.values(map);
// }
// function groupAnagrams(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     let value = map.has(table.join()) ? map.get(table.join()) : [];
//     value.push(str);
//     map.set(table.join(), value);
//   }
//   return [...map.values()];
// }
// 有效的字母异位词 1.排序后比较 O(nlogn) 2.hash 计数 O(n)
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   return [...s].sort().join() === [...t].sort().join();
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let map = new Map();
//   for (let i of s) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let i of t) {
//     if (map.has(i)) {
//       map.set(i, map.get(i) - 1);
//       if (map.get(i) < 0) return false;
//     } else {
//       return false;
//     }
//   }
//   return true;
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let table = new Array(26).fill(0);
//   for (let i of s) {
//     table[i.charCodeAt() - 'a'.charCodeAt()]++;
//   }
//   for (let i of t) {
//     if (table[i.charCodeAt() - 'a'.charCodeAt()]) {
//       table[i.charCodeAt() - 'a'.charCodeAt()]--;
//       if (table[i.charCodeAt() - 'a'.charCodeAt()] < 0) return false;
//     } else {
//       return false;
//     }
//   }
//   return true;
// }
// 四数之和 1.hash
// function fourSum(nums, target) {
//   if (nums === null || nums.length <= 3) return [];
//   let a = [];
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (map.has(target - sum)) {
//           let tmp = [target - sum, nums[i], nums[j], nums[k]];
//           tmp.sort();
//           if (!set.has(tmp.join())) {
//             a.push([target - sum, nums[i], nums[j], nums[k]]);
//             set.add(tmp.join());
//           }
//         }
//       }
//     }
//     map.set(nums[i], nums[i]);
//   }
//   return a;
// }
// 滑动窗口最大值 1.暴力 O(n*k) 2.双端递减队列
// function maxSlidingWindow(nums) {
//   let a = [];
//   for (let i = 0; i < nums.length - k + 1; i++) {
//     let max = nums[i];
//     for (let j = i; j < i + k; j++) {
//       max = Math.max(max, nums[j]);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function maxSlidingWindow(nums) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     if (i >= k - 1) a.push(nums[q[0]]);
//   }
//   return a;
// }
// function maxSlidingWindow(nums) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < k; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//   }
//   a.push(nums[q[0]]);
//   for (let i = k; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     a.push(nums[q[0]]);
//   }
//   return a;
// }
// 柱状图中最大的矩形 1.暴力 O(n^3) 2.扩散 O(n^2) 3.递增栈 O(n)
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let minHieght = heights[i];
//     for (let j = i; i < heights.length; j++) {
//       minHieght = Math.min(minHieght, heights[j]);
//       let area = minHieght * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     for (let j = i; j < heights.length; j++) {
//       let minHeight = Math.min.apply(null, heights.slice(i, j + 1));
//       let area = minHeight * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i;
//     let k = i;
//     while (j >= 0 && heights[j] >= heights[i]) j--;
//     while (k < heights.length && heights[k] >= heights[i]) k++;
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area); 
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i;
//     let k = i;
//     for ( ; j >= 0; j--) {
//       if (heights[j] < heights[i]) break;
//     }
//     for ( ; k < heights.length; k++) {
//       if (heights[k] < heights[i]) break;
//     }
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   heights.push(0);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   for (let i = 1; i < stack.length; i++) {
//     let area = heights[stack[i]] * (stack[stack.length - 1] - stack[i - 1]);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = new Array(heights.length).fill(heights.length);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
//       right[stack.pop()] = i;
//     }
//     left[i] = !stack.length ? -1 : stack[stack.length - 1];
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = [];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     left[i] = !stack.length ? -1 : stack[stack.length - 1];
//     stack.push(i);
//   }
//   stack = [];
//   for (let i = heights.length - 1; i >= 0; i--) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     right[i] = !stack.length ? heights.length : stack[stack.length - 1];
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
// 	let max = 0;
//   let stack = [-1];
//   heights.push(0);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = (i - stack[stack.length - 1] - 1) * heights[index];
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   return max;
// }
// 有效的括号 1.暴力replace O(n^2) 2.栈 O(n)
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
//   let map = new Map([
//     [')', '('],
//     [']', '['],
//     ['}', '{']
//   ]);
//   let stack = [];
//   for (let i of s) {
//     if (map.has(i)) {
//       if (!stack.length || stack.pop() !== map.get(i)) {
//         return false;
//       }
//     } else {
//       stack.push(i);
//     }
//   }
//   return !stack.length;
// }
// 最小栈 1.辅助栈
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [Infinity];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     this.min_stack.push(Math.min(x, this.min_stack[this.min_stack.length - 1]));
//   }
//   pop() {
//     this.x_stack.pop();
//     this.min_stack.pop();
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// class MinStack {
//   constructor() {
//     this.x_stack = [];
//     this.min_stack = [];
//   }
//   push(x) {
//     this.x_stack.push(x);
//     if (!this.min_stack.length || x <= this.min_stack[this.min_stack.length - 1]) {
//       this.min_stack.push(x);
//     }
//   }
//   pop() {
//     if (this.x_stack.pop() === this.min_stack[this.min_stack.length - 1]) {
//       this.min_stack.pop();
//     }
//   }
//   top() {
//     return this.x_stack[this.x_stack.length - 1];
//   }
//   getMin() {
//     return this.min_stack[this.min_stack.length - 1];
//   }
// }
// 有效的字母异位词 1.排序后比较 O(nlogn) 2.hash 计数 O(n)
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   return Array.from(s).sort().join() === Array.from(t).sort().join();
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let map = new Map();
//   for (let i of s) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let i of t) {
//     if (map.has(i)) {
//       map.set(i, map.get(i) - 1);
//       if (map.get(i) < 0) return false;
//     } else {
//       return false;
//     }
//   }
//   return true;
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let table = new Array(26).fill(0);
//   for (let i of s) {
//     table[i.charCodeAt() - 'a'.charCodeAt()]++;
//   }
//   for (let i of t) {
//     table[i.charCodeAt() - 'a'.charCodeAt()]--;
//     if (table[i.charCodeAt() - 'a'.charCodeAt()] < 0) return false;
//   }
//   return true;
// }
// 字母异位词分组 1.排序后hash归类 n*klogk 2.自制hash后hash归类n*k
// function groupAnagrams(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let key = [...str].sort().join();
//     let value = map.has(key) ? map.get(key) : [];
//     value.push(str);
//     map.set(key, value);
//   }
//   return Array.from(map.values());
// }
// function groupAnagrams(strs) {
//   let map = {};
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     map[table] ? map[table].push(str) : map[table] = [str];
//   }
//   return Object.values(map);
// }
// function groupAnagrams(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     let value = map.has(table.join()) ? map.get(table.join()) : [];
//     value.push(str);
//     map.set(table.join(), value);
//   }
//   return [...map.values()];
// }
// 四数之和 1.hash O(n^3)
// function fourSum(nums, target) {
//   let a = [];
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (map.has(target - sum)) {
//           let key = [target - sum, nums[i], nums[j], nums[k]].sort();
//           if (!set.has(key.join())) {
//             a.push(key);
//             set.add(key.join());
//           }
//         }
//       }
//     }
//     map.set(nums[i], nums[i]);
//   }
//   return a;
// }
// 滑动窗口最大值 1.暴力 O(n*k) 2.双端递减队列 O(n)
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   for (let i = 0; i < nums.length - k + 1; i++) {
//     let max = nums[i];
//     for (let j = i; j < i + k; j++) {
//       max = Math.max(max, nums[j]);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     if (i >= k - 1) a.push(nums[q[0]]);
//   }
//   return a;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < k; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//   }
//   a.push(nums[q[0]]);
//   for (let i = k; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     a.push(nums[q[0]]);
//   }
//   return a;
// }
// 柱状图中最大的矩形 1.暴力 O(n^3) 2.扩散 O(n^2) 3.单调递增栈
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let minHeight = heights[i];
//     for (let j = i; j < heights.length; j++) {
//       minHeight = Math.min(minHeight, heights[j]);
//       let area = minHeight * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     for (let j = i; j < heights.length; j++) {
//       let minHeight = Math.min.apply(null, heights.slice(i, j + 1));
//       let area = minHeight * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i;
//     let k = i;
//     while (j >= 0 && heights[j] >= heights[i]) j--;
//     while (k < heights.length && heights[k] >= heights[i]) k++;
//     let area = heights[i] * (j - i - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i;
//     let k = i;
//     for ( ; j >= 0; j--) {
//       if (heights[j] < heights[i]) break;
//     }
//     for ( ; k < heights.length; j--) {
//       if (heights[k] < heights[i]) break;
//     }
//     let area = heights[i] * (j - i - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   heights.push(0);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] <= heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heihgts[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] <= heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   for (let i = 1; i < stack.length; i++) {
//     let area = heights[stack[i]] * (stack[stack.length - 1] - stack[i - 1]);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = [];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] <= heights[stack[stack.legnth - 1]]) {
//       stack.pop();
//     }
//     left[i] = !stack.length ? -1 : stack[stack.length - 1];
//     stack.push(i);
//   }
//   stack = [];
//   for (let i = heights.length - 1; i >= 0; i++) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     right[i] = !stack.length ? heights.length : stack[stack.length - 1];
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = new Array(heights.length).fill(heights.length);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       right[stack.pop()] = i;
//     }
//     left[i] = !stack.length ? -1 : stack[stack.length - 1];
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 柱状图中最大的矩形 1.暴力 O(n^3) 2.扩散 O(n^2) 3.栈
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let minHeight = heights[i];
//     for (let j = i; j < heights.length; j++) {
//       minHeight = Math.min(minHeight, heights[j]);
//       let area = minHeight * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     for (let j = i; j < heights.length; j++) {
//       minHeight = Math.min.apply(null, heights.slice(i, j + 1));
//       let area = minHeight * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heihgts) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i;
//     let k = i;
//     while (j >= 0 && heights[j] >= heights[i]) j--;
//     while (k < heights.length && heights[k] >= heihgts[i]) k++;
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i;
//     let k = i;
//     for ( ; j >= 0; j--) {
//       if (heights[j] < heights[i]) break;
//     }
//     for ( ; k < heights.length; k++) {
//       if (heights[k] < heights[i]) break;
//     }
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   heights.push(0);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   return max;
// }
// function largestRectangleArea(heihgts) {
//   let max = 0;
//   let stack = [-1];
//   for (let i = 0; i < heihgts.length; i++) {
//     while (stack.length > 1 && heihgts[i] < heihgts[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heihgts[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   for (let i = 1; i < stack.length; i++) {
//     let area = heihgts[stack[i]] * (stack[stack.length - 1] - stack[i - 1]);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = [];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     left[i] = !stack.length ? -1 : stack[stack.length - 1];
//     stack.push(i);
//   }
//   stack = [];
//   for (let i = heights.length - 1; i >= 0; i--) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     right[i] = !stack.length ? heights.length : stack[stack.length - 1];
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = new Array(heights.length).fill(heights.length);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
//       right[stack.pop()] = i;
//     }
//     left[i] = !stack.length ? -1 : stack[stack.length - 1];
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 四数之和 1.hash O(n^3)
// function fourSum(nums, target) {
//   let a = [];
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (map.has(target - sum)) {
//           let tmp = [target - sum, nums[i], nums[j], nums[k]].sort();
//           let key = tmp.sort().join();
//           if (!set.has(key)) {
//             a.push(tmp);
//             set.add(key);
//           }
//         }
//       }
//     }
//     map.set(nums[i], nums[i]);
//   }
//   return a;
// }
// 柱状图中最大的矩形 1.暴力 O(n^3) 2.扩散 O(n^2) 3.栈 O(n)
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let minHeight = heights[i];
//     for (let j = i; j < heights.length; j++) {
//       minHeight = Math.min(minHeight, heights[j]);
//       let area = minHeight * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i, k = i;
//     for ( ; j >= 0; j--) {
//       if (heights[j] < heights[i]) break;
//     }
//     for ( ; k < heights.length; k++) {
//       if (heights[k] < heights[i]) break;
//     }
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i, k = i;
//     while (j >= 0 && heights[j--] >= heights[i]);
//     while (k < heights.length && heights[k++] >= heights[i]);
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// console.log(largestRectangleArea([2,4]))
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   heights.push(0);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   for (let i = 1; i < stack.length; i++) {
//     let area = heights[stack[i]] * (stack[stack.length - 1] - stack[i - 1]);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = [];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     left[i] = stack.length ? stack[stack.length - 1] : -1;
//     stack.push(i);
//   }
//   stack = [];
//   for (let i = heights.length - 1; i >= 0; i--) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     right[i] = stack.length ? stack[stack.length - 1] : heights.length;
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = new Array(heights.length).fill(heights.length);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
//       right[stack.pop()] = i;
//     }
//     left[i] = stack.length ? stack[stack.length - 1] : -1;
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 有效的字母异位词 1.排序后比较是否相等 O(nlogn) 2.hash map 统计字母出现次数 O(n)
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   return [...s].sort().join() === [...t].sort().join();
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let map = new Map();
//   for (let i of s) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let i of t) {
//     if (map.has(i)) {
//       map.set(i, map.get(i) - 1);
//       if (map.get(i) < 0) return false;
//     } else {
//       return false;
//     }
//   }
//   return true;
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let table = new Array(26).fill(0);
//   for (let i of s) {
//     table[i.charCodeAt() - 'a'.charCodeAt()]++;
//   }
//   for (let i of t) {
//     table[i.charCodeAt() - 'a'.charCodeAt()]--;
//     if (table[i.charCodeAt() - 'a'.charCodeAt()] < 0) return false;
//   }
//   return true;
// }
// 字母异位词分组 1.排序后归类 O(nklogk) 2.hash后归类 O(n*k)
// function groupAnagram(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let key = [...str].sort().join();
//     let value = map.has(key) ? map.get(key) : [];
//     value.push(str);
//     map.set(key, value);
//   }
//   return [...map.values()];
// }
// function groupAnagram(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     let value = map.has(table.join()) ? map.get(table.join()) : [];
//     value.push(str);
//     map.set(table.join(), value);
//   }
//   return [...map.values()];
// }
// function groupAnagrams(strs) {
//   let map = {};
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     map[table] ? map[table].push(str) : map[table] = [str];
//   }
//   return Object.values(map);
// }
// 树节点定义
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// // js声明二叉树数据结构
// class Tree {
//   constructor(data) {
//     let nodeList = [];
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList.push(node);
//       if (i > 0) {
//         let n = Math.floor(Math.sqrt(i + 1));
//         let q = Math.pow(2, n) - 1;
//         let p = Math.pow(2, n - 1) - 1;
//         let parent = nodeList[p + Math.floor((i - q) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]))
// js 声明二叉树数据结构
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// class Tree {
//   constructor(data) {
//     let nodeList = [];
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList.push(node);
//       if (i > 0) {
//         let n = Math.floor(Math.sqrt(i + 1));
//         let q = Math.pow(2, n) - 1;
//         let p = Math.pow(2, n - 1) - 1;
//         let parent = nodeList[p + Math.floor((i - q) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]))
// 二叉树的中序遍历 1.递归 O(n)
// function inorderTraversal(root) {
//   let res = [];
//   function inorder(root) {
//     if (inorder) {
//       inorder(root.left);
//       res.push(root.val);
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return res;
// }
// 二叉树的中序遍历
// function inorderTraversal(root) {
//   let res = [];
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       res.push(root.val);
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return res;
// }
// 柱状图中最大的矩形 1.暴力 O(n^3) 2.扩散 O(n^2) 3.栈 O(n)
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let minHeight = heights[i];
//     for (let j = i; i < heights.length; j++) {
//       minHeight = Math.min(minHeight, heights[j]);
//       let area = minHeight * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i, k = i;
//     while (j >= 0 && heights[j] >= heights[i]) {
//       j--;
//     }
//     while (k < heights.length && heights[k] >= heights[i]) {
//       k++
//     }
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heihgts) {
//   let max = 0;
//   for (let i = 0; i < heihgts.length; i++) {
//     let j = i, k = i;
//     for ( ; j >= 0; j--) {
//       if (heihgts[j] < heihgts[i]) break;
//     }
//     for ( ; k < heihgts.length; k++) {
//       if (heihgts[k] < heihgts[i]) break;
//     }
//     let area = heihgts[i] * (k - j - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//   }
//   for (let i = 1; i < stack.length; i++) {
//     let area = heights[stack[i]] * (stack[stack.length - 1] - stack[i - 1]);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   heights.push(0);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = [];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     left[i] = stack.length ? stack[stack.length - 1] : -1;
//     stack.push(i);
//   }
//   stack = [];
//   for (let i = heights.length - 1; i >= 0; i--) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     right[i] = stack.length ? stack[stack.length - 1] : heights.length;
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right  = new Array(heights.length).fill(heights.length);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
//       right[stack.pop()] = i;
//     }
//     left[i] = stack.length ? stack[stack.length - 1] : -1;
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 有效的字母异位词 1.排序后哈希归类 O(nlogn) 2.自制hash后哈希归类 O(n)
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   return [...s].sort().join() === [...t].sort().join();
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let table = new Array(26).fill(0);
//   for (let i of s) {
//     table[i.charCodeAt() - 'a'.charCodeAt()]++;
//   }
//   for (let i of t) {
//     table[i.charCodeAt() - 'a'.charCodeAt()]--;
//     if (table[i.charCodeAt() - 'a'.charCodeAt()] < 0) return false;
//   }
//   return true;
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let map = new Map();
//   for (let i of s) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let i of t) {
//     if (map.has(i)) {
//       map.set(i, map.get(i) - 1);
//       if (map.get(i) < 0) return false;
//     } else {
//       return false;
//     }
//   }
//   return true;
// }
// 字母异位词分组 1.排序后归类 2.自制hash后归类
// function groupAnagrams(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let key = [...str].sort().join();
//     let value = map.has(key) ? map.get(key) : [];
//     value.push(str);
//     map.set(key, value);
//   }
//   return [...map.values()];
// }
// function groupAnagrams(strs) {
//   let map = {};
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     map[table] ? map[table].push(str) : map[table] = [str];
//   }
//   return Object.values(map);
// }
// 柱状图中的最大矩形 1.暴力 O(n^3) 2.扩散 O(n^2) 3.栈 O(n)
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let minHeight = heights[i];
//     for (let j = i; j < heights.length; j++) {
//       minHeight = Math.min(minHeight, heights[j]);
//       let area = minHeight * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     for (let j = i; j < heights.length; j++) {
//       let minHeight = Math.min.apply(null, heights.slice(i, j + 1));
//       let area = minHeight * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i, k = i;
//     while (j >= 0 && heights[j] >= heights[i]) {
//       j--;
//     }
//     while (k < heights.length && heights[k] >= heights[i]) {
//       k++;
//     }
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i, k = i;
//     for (; j >= 0; j--) {
//       if (heights[j] < heights[i]) break;
//     }
//     for (; k < heights.length; k++) {
//       if (heights[k] < heights[i]) break;
//     }
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   for (let i = 1; i < stack.length; i++) {
//     let area = heights[stack[i]] * (stack[stack.length - 1] - stack[i - 1]);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   heights.push(0);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = [];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     left[i] = stack.length ? stack[stack.length - 1] : -1;
//     stack.push(i);
//   }
//   stack = [];
//   for (let i = heights.length - 1; i >= 0; i--) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     right[i] = stack.length ? stack[stack.length - 1] : heights.length;
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = new Array(heights.length).fill(heights.length);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
//       right[stack.pop()] = i;
//     }
//     left[i] = stack.length ? stack[stack.length - 1] : -1;
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 四数之和 1.hash
// function fourSum(nums, target) {
//   let a = [];
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (map.has(target - sum)) {
//           let key = [target - sum, nums[i], nums[j], nums[k]].sort();
//           if (!set.has(key.join())) {
//             a.push(key);
//             set.add(key.join());
//           }
//         }
//       }
//     }
//     map.set(nums[i], nums[i]);
//   }
//   return a;
// }
// 有效的字母异位词 1.排序后比较是否相等 O(nlogn) 2.hash 计数
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   return [...s].sort().join() === [...t].sort().join();
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let map = new Map();
//   for (let i of s) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let i of t) {
//     if (map.has(i)) {
//       map.set(i, map.get(i) - 1);
//       if (map.get(i) < 0) return false;
//     } else {
//       return false;
//     }
//   }
//   return true;
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let table = new Array(26).fill(0);
//   for (let i of s) {
//     table[i.charCodeAt() - 'a'.charCodeAt()]++;
//   }
//   for (let i of t) {
//     table[i.charCodeAt() - 'a'.charCodeAt()]--;
//     if (table[i.charCodeAt() - 'a'.charCodeAt()] < 0) return false;
//   }
//   return true;
// }
// 字母异位词分组 1.key 排序后hash分组 2.key hash后hash分组
// function groupAnagrams(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let key = [...str].sort().join();
//     map.has(key) ? map.get(key).push(str) : map.set(key, [str]);
//   }
//   return [...map.values()];
// }
// function groupAnagrams(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     map.has(table.join()) ? map.get(table.join()).push(str) : map.set(table.join(), [str]);
//   }
//   return [...map.values()];
// }
// function groupAnagrams(strs) {
//   let map = {};
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     map[table] ? map[table].push(str) : map[table] = [str];
//   }
//   return Object.values(map);
// }
// js 声明二叉树数据结构
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// class Tree {
//   constructor(data) {
//     let nodeList = [];
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList.push(node);
//       if (i > 0) {
//         let n = Math.floor(Math.sqrt(i + 1));
//         let q = Math.pow(2, n) - 1;
//         let p = Math.pow(2, n - 1) - 1;
//         let parent = nodeList[p + Math.floor((i - q) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]))
// 二叉树的中序遍历 1.递归 O(n)
// function inorderTraversal(root) {
//   let res = [];
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       res.push(root.val);
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return res;
// }
// 二叉树的中序遍历 1.递归 O(n) 2.栈迭代 O(n)
// function inorderTraversal(root) {
//   let res = [];
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       res.push(root.val);
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return res;
// }
// 二叉树的中序遍历
// function inorderTraversal(root) {
//   let res = [];
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       res.push(root.val);
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return res;
// }
// function inorderTraversal(root) {
//   let res = [];
//   let stack = [];
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     res.push(root.val);
//     root = root.right;
//   }
//   return res;
// }
// function inorderTraversal(root) {
//   let res = [];
//   let stack = [];
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     res.push(root.val);
//     root = root.right;
//   }
//   return res;
// }
// function inorderTraversal(root) {
//   let res = [];
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       res.push(root.val);
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return res;
// }
// function inorderTraversal(root) {
//   let res = [];
//   let stack = [];
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     res.push(root.val);
//     root = root.right;
//   }
//   return res;
// }
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// class Tree {
//   constructor(data) {
//     let nodeList = [];
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList.push(node);
//       if (i > 0) {
//         let n = Math.floor(Math.sqrt(i + 1));
//         let q = Math.pow(2, n) - 1;
//         let p = Math.pow(2, n - 1) - 1;
//         let parent = nodeList[p + Math.floor((i - q) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([1,null,2,3]))
// 四数之和
// function fourSum(nums, target) {
//   let a = [];
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (map.has(target - sum)) {
//           let key = [target - sum, nums[i], nums[j], nums[k]].sort();
//           if (!set.has(key.join())) {
//             a.push(key);
//             set.add(key.join());
//           }
//         }
//       }
//     }
//     map.set(nums[i], nums[i]);
//   }
//   return a;
// }
// 四数之和 1.hash
// function fourSum(nums, target) {
//   let a = [];
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (map.has(target - sum)) {
//           let key = [target - sum, nums[i], nums[j], nums[k]].sort();
//           if (!set.has(key.join())) {
//             a.push(key);
//             set.add(key.join());
//           }
//         }
//       }
//     }
//     map.set(nums[i], nums[i]);
//   }
//   return a;
// }
// 滑动窗口最大值 1.暴力 O(n*k) 2.单调递减双端队列 O(n)
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   for (let i = 0; i < nums.length - k + 1; i++) {
//     let max = nums[i];
//     for (let j = i; j < i + k; j++) {
//       max = Math.max(max, nums[j]);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function maxSlidinWindow(nums, k) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     if (i >= k - 1) a.push(nums[q[0]]);
//   }
//   return a;
// }
// function maxSlidingWindow(nums, k) {
//   let a = [];
//   let q = [];
//   for (let i = 0; i < k; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//   }
//   a.push(nums[q[0]]);
//   for (let i = k; i < nums.length; i++) {
//     while (q.length && nums[i] >= nums[q[q.length - 1]]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] < i - k + 1) {
//       q.shift();
//     }
//     a.push(nums[q[0]]);
//   }
//   return a;
// }
// js声明二叉树数据结构
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// class Tree {
//   constructor(data) {
//     let nodeList = [];
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList.push(node);
//       if (i > 0) {
//         let n = Math.floor(Math.sqrt(i + 1));
//         let q = Math.pow(2, n) - 1;
//         let p = Math.pow(2, n - 1) - 1;
//         let parent = nodeList[p + Math.floor((i - q) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
      
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]))
// 二叉树的中序遍历 1.递归 O(n) 2.利用栈迭代 O(n)
// function inorderTraversal(root) {
//   let res = [];
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       res.push(root.val);
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return res;
// }
// function inorderTraversal(root) {
//   let res = [];
//   let stack = [];
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     res.push(root.val);
//     root = root.right;
//   }
//   return res;
// }
// js 声明二叉树数据结构
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// class Tree {
//   constructor(data) {
//     let nodeList = [];
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList.push(node);
//       if (i > 0) {
//         let n = Math.floor(Math.sqrt(i + 1));
//         let q = Math.pow(2, n) - 1;
//         let p = Math.pow(2, n - 1) - 1;
//         let parent = nodeList[p + Math.floor((i - q) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]))
// 二叉树的中序遍历 1.递归 O(n) 2.栈迭代 O(n)
// function inorderTraversal(root) {
//   let res = [];
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       res.push(root.val);
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return res;
// }
// function inorderTraversal(root) {
//   let res = [];
//   let stack = [];
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     res.push(root.val);
//     root = root.right;
//   }
//   return res;
// }
// 移动零 1.遇零删除，最后补零 O(n^2) 2.新增内存 O(n) 3.双指针交换 O(n)
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
//       j++
//     }
//   }
//   return nums;
// }
// js根据一维数组声明二叉树完全二叉树数据结构
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// class Tree {
//   constructor(data) {
//     let nodeList = [];
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList.push(node);
//       if (i > 0) {
//         let parent = nodeList[Math.floor((i - 1) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([0,1,2,3,4,5,6]));
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// class Tree {
//   constructor(data) {
//     let nodeList = [];
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList.push(node);
//       if (i > 0) {
//         let n = Math.floor(Math.sqrt(i + 1));
//         let q = Math.pow(2, n) - 1;
//         let p = Math.pow(2, n - 1) - 1;
//         let parent = nodeList[p + Math.floor((i - q) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([1,4,5,6,7,8,9]))
// 二叉树的中序遍历 1.递归 O(n) 2.栈迭代 O(n)
// function inorderTraversal(root) {
//   let res = [];
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       res.push(root.val);
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return res;
// }
// function inorderTraversal(root) {
//   let res = [];
//   let stack = [];
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     res.push(root.val);
//     root = root.right;
//   }
//   return res;
// }
// class BinaryHeap {  
//   constructor() {    
//     this.data = [];    
//   }  
//   insert(value) {    
//     this.insertAt(this.data.length, value);  
//   }  
//   insertAt(index, value) {    
//     this.data[index] = value;    
//     // 对比当前节点与其父节点，如果当前节点更大就交换它们    
//     while (index > 0 && value > this.data[Math.floor((index - 1) / 2)]) {      
//       this.data[index] = this.data[Math.floor((index - 1) / 2)];      
//       this.data[Math.floor((index - 1) / 2)] = value;      
//       index = Math.floor((index - 1) / 2);    
//     }  
//   }  
//   delete(index) {    
//     if (this.data.length === 0) return;    
//     let value = this.data[index];    
//     let i = index;    
//     // fix heap    
//     while (i < this.data.length) {      
//       let left = i * 2 + 1;      
//       let right = i * 2 + 2;      
//       // 没有左子节点      
//       if (left >= this.data.length) break;      
//       // 没有右子节点      
//       if (right >= this.data.length) {        
//         this.data[i] = this.data[left];        
//         i = left;        
//         break;      
//       }      
//       // 比较左右子节点的大小，更大的补到父节点      
//       if (this.data[left] > this.data[right]) {        
//         this.data[i] = this.data[left];        
//         i = left;      
//       } else {        
//         this.data[i] = this.data[right];        
//         i = right;      
//       }    
//     }    
//     // 查看最后的空位是不是最后的叶子节点    
//     if (i < this.data.length - 1) {      
//       this.insertAt(i, this.data.pop());    
//     } else {      
//       this.data.pop();    
//     }    
//     return value;  
//   }
//   deleteMax() {
//     return this.delete(0);
//   }
//   findMax() {
//     return this.data[0];
//   }
//   printHeap() {    
//     console.log("nHeap = ");    
//     console.log(this.data);  
//   }
// }
// let maxHeap = new BinaryHeap();
// // maxHeap.insert(10);
// // maxHeap.insert(11);
// // maxHeap.insert(20);
// // maxHeap.insert(7);
// // maxHeap.insert(99);
// // maxHeap.insert(5);
// // maxHeap.printHeap();
// let a = [10,2,4,89,99,7,3,44]
// for (let i of a) {
//   maxHeap.insert(i);
// }
// let b = [];
// let l =  maxHeap.data.length;
// for (let i = 0; i < l; i++) {
//   b.push(maxHeap.delete(0));
// }
// console.log(b);
// js根据一维数组实现完全二叉树数据结构
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// class Tree {
//   constructor(data) {
//     let nodeList = [];
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList.push(node);
//       if (i > 0) {
//         let parent = nodeList[Math.floor((i - 1) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]))
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// class Tree {
//   constructor(data) {
//     let nodeList = [];
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList.push(node);
//       if (i > 0) {
//         let n = Math.floor(Math.sqrt(i + 1));
//         let q = Math.pow(2, n) - 1;
//         let p = Math.pow(2, n - 1) - 1;
//         let parent = nodeList[p + Math.floor((i - q) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]))
// 二叉树的中序遍历 1.递归 O(n) 2.栈迭代 O(n)
// function inorderTraversal(root) {
//   let res = [];
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       res.push(root.val);
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return res;
// }
// function inorderTraversal(root) {
//   let res = [];
//   let stack = [];
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     res.push(root.val);
//     root = root.right;
//   }
//   return res;
// }
// class Heap {
//   constructor() {
//     this.data = [];
//   }
//   insert(value) {
//     this.insertAt(this.data.length, value);
//   }
//   insertAt(index, value) {
//     this.data[index] = value;
//     while (index > 0 && value > this.data[Math.floor((index - 1) / 2)]) {
//       this.data[index] = this.data[Math.floor((index - 1) / 2)];
//       this.data[Math.floor((index - 1) / 2)] = value;
//       index = Math.floor((index - 1) / 2);
//     }
//   }
//   delete(index) {
//     if (this.data.length === 0) return;
//     let value = this.data[index];
//     let i = index;
//     while (i < this.data.length) {
//       let left = 2 * i + 1;
//       let right = 2 * i + 2;
//       if (left >= this.data.length) break;
//       if (right >= this.data.length) {
//         this.data[i] = this.data[left];
//         i = left;
//         break;
//       }
//       if (this.data[left] > this.data[right]) {
//         this.data[i] = this.data[left];
//         i = left;
//       } else {
//         this.data[i] = this.data[right];
//         i = right;
//       }
//     }
//     if (i < this.data.length - 1) {
//       this.insertAt(i, this.data.pop());
//     } else {
//       this.data.pop();
//     }
//     return value;
//   }
//   deleteMax() {
//     return this.delete(0);
//   }
//   findMax() {
//     return this.data[0];
//   }
//   printHeap() {
//     console.log(this.data);
//   }
// }
// let maxHeap = new Heap();
// maxHeap.insert(10);
// maxHeap.insert(6);
// maxHeap.insert(5);
// maxHeap.insert(8);
// maxHeap.insert(3);
// maxHeap.insert(7);
// maxHeap.insert(2);
// maxHeap.printHeap();
// let a = [];
// let l = maxHeap.data.length;
// a.push(maxHeap.findMax());
// for (let i = 1; i < l; i++) {
//   maxHeap.delete(0);
//   a.push(maxHeap.findMax());
// }
// console.log(a);
// js根据一维数组声明完全二叉树数据结构
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// class Tree {
//   constructor(data) {
//     let nodeList = [];
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList.push(node);
//       if (i > 0) {
//         let parent = nodeList[Math.floor((i - 1) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([1,2,3,4,5,6]))
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// class Tree {
//   constructor(data) {
//     let nodeList = [];
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList.push(node);
//       if (i > 0) {
//         let n = Math.floor(Math.sqrt(i + 1));
//         let q = Math.pow(2, n) - 1;
//         let p = Math.pow(2, n - 1) - 1;
//         let parent = nodeList[p + Math.floor((i - q) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([0,1,2,3,4,5]))
// 二叉树的中序遍历 1.递归 O(n) 2.栈迭代 O(n)
// function inorderTraversal(root) {
//   let res = [];
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       res.push(root.val);
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return res;
// }
// function inorderTraversal(root) {
//   let res = [];
//   let stack = [];
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     res.push(root.val);
//     root = root.right;
//   }
//   return res;
// }
// js声明二叉堆数据结构
// class BinaryHeap {  
//   constructor() {    
//     this.data = [];    
//   }  
//   insert(value) {    
//     this.insertAt(this.data.length, value);  
//   }  
//   insertAt(i, value) {
//     this.data[i] = value;
//     // 对比当前节点与其父节点，如果当前节点更大就交换它们 
//     while (i > 0 && value > this.data[Math.floor((i - 1) / 2)]) {
//       this.data[i] = this.data[Math.floor((i - 1) / 2)];
//       this.data[Math.floor((i - 1) / 2)] = value;
//       i = Math.floor((i - 1) / 2);
//     }
//   }
//   delete(i) {    
//     if (this.data.length === 0) return;    
//     let value = this.data[i];     
//     // fix heap    
//     while (i < this.data.length) {      
//       let left = i * 2 + 1;      
//       let right = i * 2 + 2;      
//       // 没有左子节点      
//       if (left >= this.data.length) break;      
//       // 没有右子节点      
//       if (right >= this.data.length) {        
//         this.data[i] = this.data[left];        
//         i = left;        
//         break;      
//       }      
//       // 左右子节点都有，比较左右子节点的大小，更大的补到父节点      
//       if (this.data[left] > this.data[right]) {        
//         this.data[i] = this.data[left];        
//         i = left;      
//       } else {        
//         this.data[i] = this.data[right];        
//         i = right;      
//       }    
//     }    
//     // 查看最后的空位是不是最后的叶子节点    
//     if (i < this.data.length - 1) {      
//       this.insertAt(i, this.data.pop());    
//     } else {      
//       this.data.pop();    
//     }    
//     return value;  
//   }
//   printHeap() {       
//     console.log(this.data);  
//   }
// }
// let maxHeap = new BinaryHeap();
// let a = [1,3,4,2,92,8,7];
// for (let i of a) {
//   maxHeap.insert(i);
// }
// let b = [];
// for (let i of a) {
//   b.push(maxHeap.delete(0));
// }
// console.log(b)
// 柱状图中最大的矩形 1.暴力 O(n^3) 2.扩散 O(n^2) 3.栈 O(n)
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let minHeight = heights[i];
//     for (let j = i; j < heights.length; j++) {
//       minHeight = Math.min(minHeight, heights[j]);
//       let area = minHeight * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     for (let j = i; j < heights.length; j++) {
//       let minHeight = Math.min.apply(null, heights.slice(i, j + 1));
//       let area = minHeight * (j - i + 1);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i, k = i;
//     while (j >= 0 && heights[j] >= heights[i]) {
//       j--;
//     }
//     while (k < heights.length && heights[k] >= heights[i]) {
//       k++;
//     }
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   for (let i = 0; i < heights.length; i++) {
//     let j = i, k = i;
//     for (; j >= 0; j--) {
//       if (heights[j] < heights[i]) break; 
//     }
//     for (; k < heights.length; k++) {
//       if (heights[k] < heights[i]) break;
//     }
//     let area = heights[i] * (k - j - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   heights.push(0);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [-1];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
//       let index = stack.pop();
//       let area = heights[index] * (i - stack[stack.length - 1] - 1);
//       max = Math.max(max, area);
//     }
//     stack.push(i);
//   }
//   for (let i = 1; i < stack.length; i++) {
//     let area = heights[i] * (stack[stack.length - 1] - (i - 1));
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = new Array(heights.length).fill(heights.length);
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
//       right[stack.pop()] = i;
//     }
//     left[i] = stack.length ? stack[stack.length - 1] : -1;
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// function largestRectangleArea(heights) {
//   let max = 0;
//   let stack = [];
//   let left = [];
//   let right = [];
//   for (let i = 0; i < heights.length; i++) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     left[i] = stack.length ? stack[stack.length - 1] : -1;
//     stack.push(i);
//   }
//   stack = [];
//   for (let i = heights.length - 1; i >= 0; i--) {
//     while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
//       stack.pop();
//     }
//     right[i] = stack.length ? stack[stack.length - 1] : heights.length;
//     stack.push(i);
//   }
//   for (let i = 0; i < heights.length; i++) {
//     let area = heights[i] * (right[i] - left[i] - 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 有效的字母异位词 1.sort后比较 O(nlogn) 2.hash统计自负出现频次 O(n)
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   return [...s].sort().join() === [...t].sort().join(); 
// }
// function isAnagram(s, t) {
//   if(s.length !== t.length) return false;
//   let map = new Map();
//   for (let i of s) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let i of t) {
//     if (map.has(i)) {
//       map.set(i, map.get(i) - 1);
//       if (map.get(i) < 0) return false; 
//     } else {
//       return false;
//     }
//   }
//   return true;
// }
// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;
//   let table = new Array(26).fill(0);
//   for (let i of s) {
//     table[i.charCodeAt() - 'a'.charCodeAt()]++;
//   }
//   for (let i of t) {
//     table[i.charCodeAt() - 'a'.charCodeAt()]--;
//     if (table[i.charCodeAt() - 'a'.charCodeAt()] < 0) {
//       return false;
//     }
//   }
//   return true;
// }
// 字母异位词分组 1.排序归类 O(nklogk) 2.自制hash归类 O(n*k)
// function groupAnagrams(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let key = [...str].sort().join();
//     let value = map.has(key) ? map.get(key) : [];
//     value.push(str);
//     map.set(key, value);
//   }
//   return [...map.values()];
// }
// function groupAnagrams(strs) {
//   let map = {};
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     map[table] ? map[table].push(str) : map[table] = [str];
//   }
//   return Object.values(map);
// }
// function groupAnagrams(strs) {
//   let map = new Map();
//   for (let str of strs) {
//     let table = new Array(26).fill(0);
//     for (let c of str) {
//       table[c.charCodeAt() - 'a'.charCodeAt()]++;
//     }
//     let value = map.has(table.join()) ? map.get(table.join()) : [];
//     value.push(str);
//     map.push(table.join(), value);
//   }
//   return [...map.values()];
// }
// js声明二叉堆数据结构
// class BinaryHeap {
//   constructor() {
//     this.data = [];
//   }
//   insert(value) {
//     this.insertAt(this.data.length, value);
//   }
//   insertAt(i, value) {
//     this.data[i] = value;
//     while (i > 0 && value > this.data[Math.floor((i - 1) / 2)]) {
//       this.data[i] = this.data[Math.floor((i - 1) / 2)];
//       this.data[Math.floor((i - 1) / 2)] = value;
//       i = Math.floor((i - 1) / 2);
//     }
//   }
//   delete(i) {
//     if (this.data.length === 0) return;
//     let value = this.data[i];
//     while (i < this.data.length) {
//       let left = 2 * i + 1;
//       let right = 2 * i + 2;
//       if (left >= this.data.length) break;
//       if (right >= this.data.length) {
//         this.data[i] = this.data[left];
//         i = left;
//         break;
//       }
//       if (this.data[left] > this.data[right]) {
//         this.data[i] = this.data[left];
//         i = left;
//       } else {
//         this.data[i] = this.data[right];
//         i = right;
//       }
//     }
//     if (i < this.data.length - 1) {
//       this.insertAt(i, this.data.pop());
//     } else {
//       this.data.pop();
//     }
//     return value;
//   }
// }
// let heap = new BinaryHeap();
// let a = [1,5,49,83,2,4];
// for (let i of a) {
//   heap.insert(i);
// }
// console.log(heap.data)
// let b = [];
// for (let i of a) {
//   b.push(heap.delete(0));
// }
// console.log(b)
// 四数之和 1.hash O(n^3)
// function fourSum(nums, target) {
//   let a = [];
//   let map = new Map();
//   let set = new Set();
//   for (let i = 0; i < nums.length - 2; i++) {
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         let sum = nums[i] + nums[j] + nums[k];
//         if (map.has(target - sum)) {
//           let key = [target -  sum, nums[i], nums[j], nums[k]].sort();
//           if (!set.has(key.join())) {
//             a.push(key);
//             set.add(key.join());
//           }
//         }
//       }
//     }
//     map.set(nums[i], nums[i]);
//   }
//   return a;
// }
// js声明二叉堆数据结构
// class BinaryHeap {
//   constructor() {
//     this.data = [];
//   }
//   insert(value) {
//     this.insertAt(this.data.length, value);
//   }
//   insertAt(i, value) {
//     this.data[i] = value;
//     while (i > 0 && value > this.data[Math.floor((i - 1) / 2)]) {
//       this.data[i] = this.data[Math.floor((i - 1) / 2)];
//       this.data[Math.floor((i - 1) / 2)] = value;
//       i = Math.floor((i - 1) / 2);
//     }
//   }
//   delete(i) {
//     if (this.data.length === 0) return;
//     let value = this.data[i];
//     while (i < this.data.length) {
//       let left = 2 * i + 1;
//       let right = 2 * i + 2;
//       if (left >= this.data.length) break;
//       if (right >= this.data.length) {
//         this.data[i] = this.data[left];
//         i = left;
//         break;
//       }
//       if (this.data[left] > this.data[right]) {
//         this.data[i] = this.data[left];
//         i = left;
//       } else {
//         this.data[i] = this.data[right];
//         i = right;
//       }
//     }
//     if (i < this.data.length - 1) {
//       this.insertAt(i, this.data.pop());
//     } else {
//       this.data.pop();
//     }
//     return value;
//   }
//   printHeap() {
//     console.log(this.data);
//   }
// }
// let heap = new BinaryHeap();
// let a = [0,8,3,9,4,6,7,2];
// for (let i of a) {
//   heap.insert(i);
// }
// heap.printHeap();
// let b = [];
// for (let i of a) {
//   b.push(heap.delete(0));
// }
// console.log(b);
// 盛水最多的容器 1.暴力 O(n^2) 2.双指针夹逼 O(n)
// function maxArea(height) {
//   let max = 0;
//   for (let i = 0; i < height.length - 1; i++) {
//     for (let j = i + 1; j < height.length; j++) {
//       let minHeight = Math.min(height[i], height[j]);
//       let area = minHeight * (j - i);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// }
// function maxArea(height) {
//   let max = 0;
//   for (let i = 0, j = height.length - 1; i < j; ) {
//     // 谁高度小谁往里面挪，来找那个更高的棒子。
//     let minHeight = height[i] < height[j] ? height[i++] : height[j--];
//     let area = minHeight * (j - i + 1);
//     max = Math.max(max, area);
//   }
//   return max;
// }
// 爬楼梯 1.递归 O(n^2) 2.记忆化递归 O(n) 3.动态规划 O(n)
// function climbStairs(n) {
//   if (n <= 2) return n;
//   return climbStairs(n - 1) + climbStairs(n - 2);
// }
// let map = new Map();
// function climbStairs(n) {
//   let map = new Map();
//   function recursion(n) {
//     if (n <= 2) return n;
//     if (map.has(n)) return map.get(n);
//     let value = recursion(n - 1) + recursion(n - 2);
//     map.set(n, value);
//     return value; 
//   }
//   return recursion(n);
// }
// function climbStairs(n) {
//   if (n <= 2) return n;
//   let a = 1, b = 2, res = 0;
//   for (let i = 0; i < n - 2; i++) {
//     res = a + b;
//     a = b;
//     b = res;
//   }
//   return res;
// }
// function climbStairs(n) {
//   if (n <= 2) return n;
//   let arr = [];
//   arr[0] = 1;
//   arr[1] = 1;
//   for (let i = 2; i <= n; i++) {
//     arr[i] = arr[i - 1] + arr[i - 2];
//   }
//   return arr[n];
// }
// 两数之和 1.暴力枚举 O(n^2) 2.hash O(n)
// function towSum(nums, target) {
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
//   let map = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     if (map.has(target - nums[i])) {
//       return [map.get(target - nums[i]), i];
//     }
//     map.set(nums[i], i);
//   }
//   return [];
// }
// 最小的k个数 1.
// function getLeastNumbers(arr, k) {
//   let a = [];
//   arr.sort((a, b) => a - b);
//   for (let i = 0; i < k; i++) {
//     a.push(arr[i]);
//   }
//   return a;
// }
// class BinaryHeap {  
//   constructor() {    
//     this.data = [];    
//   }  
//   insert(value) {    
//     this.insertAt(this.data.length, value);  
//   }  
//   insertAt(i, value) {
//     this.data[i] = value;
//     // 对比当前节点与其父节点，如果当前节点更大就交换它们 
//     while (i > 0 && value < this.data[Math.floor((i - 1) / 2)]) {
//       this.data[i] = this.data[Math.floor((i - 1) / 2)];
//       this.data[Math.floor((i - 1) / 2)] = value;
//       i = Math.floor((i - 1) / 2);
//     }
//   }
//   delete(i) {    
//     if (this.data.length === 0) return;    
//     let value = this.data[i];     
//     // fix heap    
//     while (i < this.data.length) {      
//       let left = i * 2 + 1;      
//       let right = i * 2 + 2;      
//       // 没有左子节点      
//       if (left >= this.data.length) break;      
//       // 没有右子节点      
//       if (right >= this.data.length) {        
//         this.data[i] = this.data[left];        
//         i = left;        
//         break;      
//       }      
//       // 左右子节点都有，比较左右子节点的大小，更大的补到父节点      
//       if (this.data[left] < this.data[right]) {        
//         this.data[i] = this.data[left];        
//         i = left;      
//       } else {        
//         this.data[i] = this.data[right];        
//         i = right;      
//       }    
//     }    
//     // 查看最后的空位是不是最后的叶子节点    
//     if (i < this.data.length - 1) {      
//       this.insertAt(i, this.data.pop());    
//     } else {      
//       this.data.pop();    
//     }    
//     return value;  
//   }
//   printHeap() {       
//     console.log(this.data);  
//   }
// }
// let heap = new BinaryHeap();
// let a = [1,4,3,6,7,5,2,2]
// for (let i of a) {
//   heap.insert(i);
// }
// let b = [];
// for (let i of a) {
//   b.push(heap.delete(0));
// }
// console.log(b)
// function getLeastNumbers(arr, k) {
//   let a = [];
//   for (let i of arr) {
//     heap.insert(i);
//   }
//   for (let i = 0; i < k; i++) {
//     a.push(heap.delete(0));
//   }
//   return a;
// }
// function getLeastNumbers(arr, k) {
//   let a = [];
//   for (let i of arr) {
//     heap.insert(i);
//   }
//   for (let i = 0; i < k; i++) {
//     let value = heap.delete(0);
//     console.log(value);
//     a.push(value);
//   }
//   return a;
// }
// console.log(getLeastNumbers([0,0,1,2,4,2,2,3,1,4], 8))
// class BinaryHeap {  
//   constructor(compare) {    
//     this.data = [];    
//     this.compare = compare;
//   }  
//   insert(value) {    
//     this.insertAt(this.data.length, value);  
//   }  
//   insertAt(i, value) {
//     this.data[i] = value;
//     // 对比当前节点与其父节点，如果当前节点更大就交换它们 
//     while (i > 0 && this.compare(value, this.data[Math.floor((i - 1) / 2)]) < 0) {
//       this.data[i] = this.data[Math.floor((i - 1) / 2)];
//       this.data[Math.floor((i - 1) / 2)] = value;
//       i = Math.floor((i - 1) / 2);
//     }
//   }
//   delete(i) {    
//     if (this.data.length === 0) return;    
//     let value = this.data[i];     
//     // fix heap    
//     while (i < this.data.length) {      
//       let left = i * 2 + 1;      
//       let right = i * 2 + 2;      
//       // 没有左子节点      
//       if (left >= this.data.length) break;      
//       // 没有右子节点      
//       if (right >= this.data.length) {        
//         this.data[i] = this.data[left];        
//         i = left;        
//         break;      
//       }      
//       // 左右子节点都有，比较左右子节点的大小，更大的补到父节点      
//       if (this.compare(this.data[left], this.data[right]) < 0) {        
//         this.data[i] = this.data[left];        
//         i = left;      
//       } else {        
//         this.data[i] = this.data[right];        
//         i = right;      
//       }    
//     }    
//     // 查看最后的空位是不是最后的叶子节点    
//     if (i < this.data.length - 1) {      
//       this.insertAt(i, this.data.pop());    
//     } else {      
//       this.data.pop();    
//     }    
//     return value;  
//   }
//   printHeap() {       
//     console.log(this.data);  
//   }
// }
// let maxHeap = new BinaryHeap((a, b) => b - a);
// // // 滑动窗口最大值 1.堆 O(nlogk)
// function maxSlidingWindow(nums, k) {
//   let res = [];
//   for (let i = 0; i < k; i++) {
//     maxHeap.insert(nums[i]);
//   }
//   res.push(maxHeap.data[0]);
//   for (let i = k; i < nums.length; i++) {
//     console.log(maxHeap.data)
//     maxHeap.data.splice(maxHeap.data.findIndex(item => item === nums[i - k]), 1);
//     maxHeap.insert(nums[i]);
//     res.push(maxHeap.data[0]);
//   }
//   return res;
// }
// console.log(maxSlidingWindow([1,3,1,2,0,5], 3))
// js声明二叉堆数据结构
// class BinaryHeap {
//   constructor(compare) {
//     this.data = [];
//     this.compare = compare;
//   }
//   insert(value) {
//     this.insertAt(this.data.length, value);
//   }
//   insertAt(i, value) {
//     this.data[i] = value;
//     while (i > 0 && this.compare(value, this.data[Math.floor((i - 1) / 2)]) < 0) {
//       this.data[i] = this.data[Math.floor((i - 1) / 2)];
//       this.data[Math.floor((i - 1) / 2)] = value;
//       i = Math.floor((i - 1) / 2);
//     }
//   }
//   delete(i) {
//     if (this.data.length === 0) return;
//     let value = this.data[i];
//     while (i < this.data.length) {
//       let left = i * 2 + 1;
//       let right = i * 2 + 2;
//       if (left >= this.data.length) break;
//       if (right >= this.data.length) {
//         this.data[i] = this.data[left];
//         i = left;
//         break;
//       }
//       if (this.compare(this.data[left], this.data[right]) < 0) {
//         this.data[i] = this.data[left];
//         i = left;
//       } else {
//         this.data[i] = this.data[right];
//         i = right;
//       }
//     }
//     if (i < this.data.length - 1) {
//       this.insertAt(i, this.data.pop());
//     } else {
//       this.data.pop();
//     }
//     return value;
//   }
//   printHeap() {
//     console.log(this.data)
//   }
// }
// let maxHeap = new BinaryHeap((a, b) => b - a);
// let a = [1,2,6,4,7,3,5];
// for (let i of a) {
//   maxHeap.insert(i);
// }
// maxHeap.printHeap();
// let b = [];
// for (let i of a) {
//   b.push(maxHeap.delete(0));
// }
// console.log(b)
// function getLeastNumbers(arr, k) {
//   arr.sort((a, b) => a - b);
//   return arr.slice(0, k);
// }
// function getLeastNumbers(arr, k) {
//   let a = [];
//   for (let i of arr) {
//     minHeap.insert(i);
//   }
//   for (let i = 0; i < k; i++) {
//     a[i] = minHeap.delete(0);
//   }
//   return a;
// }
// 前k个高频元素
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     maxHeap.insert(v);
//   }
//   for (let i = 0; i < k; i++) {
//     let value = maxHeap.delete(0);
//     for (let [k1, v] of map) {
//       if (value === v) {
//         a.push(k1);
//         map.delete(k1);
//         break;
//       }
//     }
//   }
//   return a;
// }
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     maxHeap.insert(v);
//   }
//   arr = [...map.values()].sort((a,b) => b - a);
//   for (let i = 0; i < k; i++) {
//     let value = arr.shift();
//     for (let [k1, v] of map) {
//       if (value === v) {
//         a.push(k1);
//         map.delete(k1);
//         break;
//       }
//     }
//   }
//   return a;
// }
// console.log(topKFrequent([1,1,1,2,2,3], 2))
// js声明二叉堆数据结构
// class BinaryHeap {
//   constructor(compare) {
//     this.data = [];
//     this.compare = compare;
//   }
//   insert(value) {
//     this.insertAt(this.data.length, value);
//   }
//   insertAt(i, value) {
//     this.data[i] = value;
//     while (i > 0 && this.compare(value, this.data[Math.floor((i - 1) / 2)]) < 0) {
//       this.data[i] = this.data[Math.floor((i - 1) / 2)];
//       this.data[Math.floor((i - 1) / 2)] = value;
//       i = Math.floor((i - 1) / 2);
//     }
//   }
//   delete(i) {
//     if (this.data.length === 0) return;
//     let value = this.data[i];
//     while (i < this.data.length) {
//       let left = i * 2 + 1;
//       let right = i * 2 + 2;
//       if (left >= this.data.length) break;
//       if (right >= this.data.length) {
//         this.data[i] = this.data[left];
//         i = left;
//         break;
//       }
//       if (this.compare(this.data[left], this.data[right]) < 0) {
//         this.data[i] = this.data[left];
//         i = left;
//       } else {
//         this.data[i] = this.data[right];
//         i = right;
//       }
//     }
//     if (i < this.data.length - 1) {
//       this.insertAt(i, this.data.pop());
//     } else {
//       this.data.pop();
//     }
//     return value;
//   }
//   printHeap() {
//     console.log(this.data);
//   }
// }
// let minHeap = new BinaryHeap((a, b) => a - b);
// let a = [9,3,5,6,7,8,2,1];
// for (let i of a) {
//   minHeap.insert(i);
// }
// minHeap.printHeap();
// let b = [];
// for (let i = 0; i < a.length; i++) {
//   b[i] = minHeap.delete(0);
// }
// console.log(b)
// 前k个高频元素 1.排序 2.堆
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [, v] of map) {
//     maxHeap.insert(v);
//   }
//   for (let i = 0; i < k; i++) {
//     let value = maxHeap.delete(0);
//     for (let [k, v] of map) {
//       if (value === v) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   let arr = [...map.values()].sort((a, b) => b - a);
//   for (let i = 0; i < k; i++) {
//     let value = arr.shift();
//     for (let [k, v] of map) {
//       if (value === v) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// 最小的k个数
// function getLeastNumbers(arr, k) {
//   arr.sort((a, b) => a - b);
//   return arr.slice(0, k);
// }
// function getLeastNumbers(arr, k) {
//   let a = [];
//   for (let i of arr) {
//     minHeap.insert(i);
//   }
//   for (let i = 0; i < k; i++) {
//     a[i] = minHeap.delete(0);
//   }
//   return a;
// }
// 最小的k个数 1.sort O(nlogn) 2.heap
// function getLeastNumbers(arr, k) {
//   arr.sort((a, b) => a - b);
//   return arr.slice(0, k);
// }
// function getLeastNumbers(arr, k) {
//   let a = [];
//   let minHeap = new BinaryHeap((a, b) => a - b);
//   for (let i of arr) {
//     minHeap.insert(i);
//   }
//   for (let i = 0; i < k; i++) {
//     a[i] = minHeap.delete(0);
//   }
//   return a;
// }
// 前k个高频元素 1.sort 2.heap
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   let arr = [...map.values()].sort((a, b) => b - a);
//   for (let i = 0; i < k; i++) {
//     let value = arr.shift();
//     for (let [k, v] of map) {
//       if (value === v) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   let maxHeap = new BinaryHeap((a, b) => b - a);
//   for (let [k, v] of map) {
//     maxHeap.insert(v);
//   }
//   for (let i = 0; i < k; i++) {
//     let value = maxHeap.delete(0);
//     for (let [k, v] of map) {
//       if (value === v) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// function factorial(n) {
//   if (n === 1) return 1;
//   return n * factorial(n - 1);
// }
// console.log(factorial(8))
// function generateParenthesis(n) {
//   let a = [];
//   function generate(left, right, n, s) {
//     // 终止条件
//     if (left === n && right === n) {
//       a.push(s);
//       return;
//     }
//     // 处理当前层
//     // 下探下一层
//     if (left < n)
//       generate(left + 1, right, n, s + '(');
//     if (left > right)
//       generate(left, right + 1, n, s + ')');
//     // 清理当前层
//   }
//   generate(0, 0, n, '');
//   return a;
// }
// 括号生成 1.递归 O(n^2)
// function generateParenthesis(n) {
//   let a = [];
//   function generate(left, right, n, s) {
//     // 递归终止条件
//     if (left === n && right === n) {
//       a.push(s);
//       return;
//     }
//     // 处理当前层
//     // 下探下一层
//     if (left < n) 
//       generate(left + 1, right, n, s + '(');
//     if (left > right)
//       generate(left, right + 1, n, s + ')');
//   }
//   generate(0, 0, n, '');
//   return a;
// }
// js根据一维数组声明完全二叉树数据结构
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// class Tree {
//   constructor(data) {
//     let nodeList = [];
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList.push(node);
//       if (i > 0) {
//         let parent = nodeList[Math.floor((i - 1) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([1,2,3,4,5,6,7,8]))
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }
// class Tree {
//   constructor(data) {
//     let nodeList = [];
    
//     for (let i = 0; i < data.length; i++) {
//       let node = new Node(data[i]);
//       nodeList[i] = node;
//       if (i > 0) {
//         let n = Math.floor(Math.sqrt(i + 1));
//         let q = Math.pow(2, n) - 1;
//         let p = Math.pow(2, n - 1) - 1;
//         let parent = nodeList[p + Math.floor((i - q) / 2)];
//         if (parent.left) {
//           parent.right = node;
//         } else {
//           parent.left = node;
//         }
//       }
//     }
//     let root = nodeList.shift();
//     nodeList.length = 0;
//     return root;
//   }
// }
// console.log(new Tree([1,2,3,4,5,6]))
// 二叉树的中序遍历 1.递归 2.栈迭代
// function inorderTraversal(root) {
//   let a = [];
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       a.push(root.val);
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return a;
// }
// function inorderTraversal(root) {
//   let a = [];
//   let stack = [];
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     a.push(root.val);
//     root = root.right;
//   }
//   return a;
// }
// 最小的k个数 1.sort 2.heap
// function getLeastNumbers(nums, k) {
//   nums.sort((a, b) => a - b);
//   return nums.slice(0, k);
// }
// function getLeastNumbers(nums, k) {
//   let a = [];
//   for (let i of nums) {
//     minHeap.insert(i);
//   }
//   for (let i = 0; i < k; i++) {
//     a[i] = minHeap.delete(0);
//   }
//   return a;
// }
// 前k个高频元素 1.sort 2.heap
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   let arr = [...map.values()].sort((a, b) => b - a);
//   for (let i = 0; i < k; i++) {
//     let value = arr.shift();
//     for (let [k, v] of map) {
//       if (v === value) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// function topKFrequent(nums, k) {
  // let a = [];
  // let map = new Map();
  // for (let i of nums) {
  //   let value = map.has(i) ? map.get(i) + 1 : 1;
  //   map.set(i, value);
  // }
  // for (let [k, v] of map) {
  //   maxHeap.insert(v);
  // }
  // for (let i = 0; i < k; i++) {
  //   let value = maxHeap.delete(0);
  //   for (let [k, v] of map) {
  //     if (value === v) {
  //       a.push(k);
  //       map.delete(k);
  //       break;
  //     }
  //   }
  // }
  // return a;
// }
// n的阶乘
// function factorial(n) {
//   if (n === 1) return 1;
//   return n * factorial(n - 1);
// }
// console.log(factorial(5))
// 括号生成 1.递归
// function generateParenthesis(n) {
//   let a = [];
//   function generate(left, right, n, s) {
//     if (left === n && right === n) {
//       a.push(s);
//       return;
//     }
//     if (left < n)
//       generate(left + 1, right, n, s + '(');
//     if (left > right)
//       generate(left, right + 1, n, s + ')');
//   }
//   generate(0, 0, n, '');
//   return a;
// }
// function generateParenthesis(n) {
//   let a = [];
//   function generate(level, n, s) {
//     // 递归终止条件
//     if (level > 2 * n) {
//       a.push(s);
//       return;
//     }
//     // 处理当前层
//     // 下探下一层
//     generate(level + 1, n, s + '(');
//     generate(level + 1, n, s + ')');
//   }
//   generate(1, n, '');
//   return a;
// }
// console.log(generateParenthesis(3).length);
// 递归代码模版
// function recursion(level, params) {
//   // 递归终止条件
//   if (level > MAX_LEVEL) {
//     process_resulet
//     return;
//   }
//   // 处理当前层
//   process(level, params);
//   // 下探到下一层
//   recursion(level + 1, params);
//   // 清理当前层
// }
// 递归代码模版
// function recursion(level, params) {
//   // 递归终止条件
//   if (level > MAX_LEVEL) {
//     process_result;
//     return;
//   } 
//   // 处理当前层
//   process(level, params);
//   // 下探到下一层
//   recursion(level + 1, params);
//   // 清理当前层
// }
// 递归代码模版
// function recursion(level, params) {
//   // 递归终止条件
//   if (level > MAX_LEVEL) {
//     process_result;
//     return;
//   }
//   // 处理当前层
//   process(level, params);
//   // 下探到下一层
//   recursion(level + 1, params);
//   // 清理当前层
// }
// 递归代码模版
// function recursion(level, params) {
//   // 递归终止条件
//   if (level > MAX_LEVEL) {
//     process_result;
//     return;
//   }
//   // 处理当前层
//   process(level, params);
//   // 下探到下一层
//   recursion(level + 1, params);
//   // 清理当前层
// }
// function inorderTraversal(root) {
//   let a = [];
//   let stack = [];
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     res.push(root.val);
//     root = root.right;
//   }    
//   return a;
// }
// function inorderTraversal(root) {
//   let res = [];
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       res.push(root.val);
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return res;
// }
// function generateParenthesis(n) {
//   let a = [];
//   function generate(level, n, s) {
//     // 递归终止条件
//     if (level > 2 * n) {
//       a.push(s);
//       return;
//     }
//     // 处理当前层
//     // 下探下一层
//     generate(level + 1, n, s + '(');
//     generate(level + 1, n, s + ')');
//   }
//   generate(1, n, '');
//   return a;
// }
// function isValidBST(root) {
//   function recursion(root, lower, upper) {
//     // 递归终止条件
//     if (root == null) {
//       return true;
//     }
//     if (root.val <= lower || root.val >= upper) {
//       return false;
//     }
//     // 处理当前层
//     // 下探下一层
//     return recursion(root.left, lower, root.val) && recursion(root.right, root.val, upper);
//   }
//   return recursion(root, -Infinity, Infinity);
// }
// 二叉树的最大深度
// function maxDepth(root) {
//   if (root == null) return 0;
//   let leftHeight = maxDepth(root.left);
//   let rightHeight = maxDepth(root.right);
//   return  Math.max(leftHeight, rightHeight) + 1;
// }
//                               root
//                   2 left              1 right
//             1  left    1 right        0
//             0
// 最小的k个数 1.sor
// function getLeastNumbers(nums, k) {
//   nums.sort((a, b) => a - b);
//   return nums.slice(0, k);
// }
// function getLeastNumbers(nums, k) {
//   let a = [];
//   for (let i of nums) {
//     minHeap.insert(i);
//   }
//   for (let i = 0; i < k; i++) {
//     a[i] = minHeap.delete(0);
//   }
//   return a;
// }
// 前k个高频元素
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   let arr = [...map.values()].sort((a, b) => b - a);
//   for (let i = 0; i < k; i++) {
//     let value = arr.shift();
//     for (let [k, v] of map) {
//       if (value === v) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     maxHeap.insert(v);
//   }
//   for (let i = 0; i < k; i++) {
//     let value = maxHeap.delete(0);
//     for (let [k, v] of map) {
//       if (value === v) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// 递归代码模版
// function recursion(level, params) {
//   // 递归终止条件
//   if (level > MAX_LEVEL) {
//     process_result;
//     return;
//   }
//   // 处理当前层
//   process(level, params);
//   // 下探下一层
//   recursion(level + 1, params);
//   // 清理当前层
// }
// n!
// function factorial(n) {
//   if (n === 1) return 1;
//   return n * factorial(n - 1);
// }
// console.log(factorial(4))
// 括号生成 1.递归 O(n)
// function generateParenthesis(n) {
//   let a = [];
//   function generate(left, right, n, s) {
//     if (left === n && right === n) {
//       a.push(s);
//       return;
//     }
//     if (left < n) generate(left + 1, right, n, s + '(');
//     if (left > right) generate(left, right + 1, n, s + ')');
//   }
//   generate(0, 0, n, '');
//   return a;
// }
// 生成全部括号 O(2^2n)
// function generateParenthesis(n) {
//   let a = [];
//   function generate(level, max, s) {
//     if (level === max) {
//       a.push(s);
//       return;
//     }
//     generate(level + 1, max, s + '(');
//     generate(level + 1, max, s + ')');
//   }
//   generate(0, 2 * n, '');
//   return a;
// }
// console.log(generateParenthesis(2))
// 验证二叉搜索树 1.递归 2.中序遍历是升序
// function isValidBST(root) {
//   function recursion(root, lower, upper) {
//     if (root == null) return true;
//     if (root.val <= lower || root.val >= upper) return false;
//     return recursion(root.left, lower, root.val) && recursion(root.right, root.val, upper);
//   }
//   return recursion(root, -Infinity, Infinity);
// }
// function isValidBST(root) {
//   let pre = -Infinity;
//   let flag = true;
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       if (root.val <= pre) {
//         flag = false;
//       }
//       pre = root.val;
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return flag;
// }
// function isValidBST(root) {
//   let stack = [];
//   let pre = -Infinity;
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     if (root.val <= pre) {
//       return false;
//     }
//     pre = root.val;
//     root = root.right;
//   }
//   return true;
// }
// 二叉树的最大深度 1.递归 2.广搜
// function maxDepth(root) {
//   if (root == null) return 0;
//   let leftHeight = maxDepth(root.left);
//   let rightHeight = maxDepth(root.right);
//   return Math.max(leftHeight, rightHeight) + 1;
// }
// function maxDepth(root) {
//   if (root == null) return 0;
//   let res = 0;
//   let q = [];
//   q.push(root);
//   while (q.length) {
//     let length = q.length;
//     while (length > 0) {
//       let node = q.shift();
//       if (node.left != null) q.push(node.left);
//       if (node.right != null) q.push(node.right);
//       length--;
//     }
//     res++;
//   }
//   return res;
// }
// function maxDepth(root) {
//   if (root == null) return 0;
//   let res = 0;
//   let q = [];
//   q.push(root);
//   while (q.length) {
//     let length  = q.length;
//     while (length > 0) {
//       let node = q.shift();
//       if (node.left != null) q.push(node.left);
//       if (node.right != null) q.push(node.right); 
//       length--;
//     }
//     res++;
//   }
//   return res;
// }
// 最小的k个数
// function getLeastNumbers(nums, k) {
//   nums.sort((a, b) => a - b);
//   return nums.slice(0, k);
// }
// function getLeastNumbers(nums, k) {
//   let a = [];
//   for (let i of nums) {
//     minHeap.insert(i);
//   }
//   for (let i = 0; i < k; i++) {
//     a.push(minHeap.delete(0));
//   }
//   return a;
// }
// 前k个高频元素
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   let arr = [...map.values()].sort((a, b) => b - a);
//   for (let i = 0; i < k; i++) {
//     let value = arr.shift();
//     for (let [k, v] of map) {
//       if (value === v) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     maxHeap.insert(v);
//   }
//   for (let i = 0; i < k; i++) {
//     let value = maxHeap.delete(0);
//     for (let [k, v] of map) {
//       if (value === v) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// 递归代码模版
// function recursion(level, params) {
//   // 递归终止条件
//   if (level > MAX_LEVEL) {
//     process_result;
//     return;
//   }
//   // 处理当前层
//   process(level, params);
//   // 下探下一层
//   recursion(level + 1, params);
//   // 清理当前层
// }
// n!
// function factorial(n) {
//   if (n === 1) return 1;
//   return n * factorial(n - 1);
// }
// console.log(factorial(3));
// 括号生成
// function generateParenthesis(n) {
//   let a = [];
//   function generate(left, right, n, s) {
//     if (left == n && right == n) {
//       a.push(s);
//       return;
//     }
//     if (left < n) generate(left + 1, right, n, s + '(');
//     if (left > right) generate(left, right + 1, n, s + ')');
//   }
//   generate(0, 0, n, '');
//   return a;
// }
// function generateParenthesis(n) {
//   let a = [];
//   function recursion(level, max, s) {
//     if (level === max) {
//       a.push(s);
//       return;
//     }
//     recursion(level + 1, max, s + '(');
//     recursion(level + 1, max, s + ')');
//   }
//   recursion(0, 2 * n, '');
//   return a;
// }
// console.log(generateParenthesis(3))
// 验证二叉搜索树 1.递归 2.中序遍历是升序
// function isValidBST(root) {
//   function recursion(root, lower, upper) {
//     if (root == null) return true;
//     if (root.val <= lower || root.val >= upper) {
//       return false;
//     }
//     return recursion(root.left, lower, root.val) && recursion(root.right, root.val, upper);
//   }
//   return recursion(root, -Infinity, Infinity);
// }
// function isValidBST(root) {
//   let flag = true;
//   let pre = -Infinity;
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       if (root.val <= pre) {
//         flag = false;
//       }
//       pre = root.val;
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return flag;
// }
// function isValidBST(root) {
//   let stack = [];
//   let pre = -Infinity;
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     if (root.val <= pre) return false;
//     pre = root.val;
//     root = root.right;
//   }
//   return true;
// }
// 二叉树的最大深度 1.递归 2.广搜
// function maxDepth(root) {
//   if (root == null) return 0;
//   let leftHeight = maxDepth(root.left);
//   let rightHeight = maxDepth(root.right);
//   return Math.max(leftHeight, rightHeight) + 1;
// }
// function maxDepth(root) {
//   if (root == null) return 0;
//   let res = 0;
//   let q = [];
//   q.push(root);
//   while (q.length) {
//     let length = q.length;
//     while (length > 0) {
//       let node = q.shift();
//       if (node.left != null) q.push(node.left);
//       if (node.right != null) q.push(node.right);
//       length--;
//     }
//     res++;
//   }
//   return res;
// }
// js声明链表数据结构
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }
// class LinkedList {
//   constructor(data) {
//     let head = new Node(data.shift());
//     let next = head;
//     for (let i of data) {
//       next.next = new Node(i);
//       next = node.next;
//     }
//     return head;
//   }
// }
// 环形链表 1.hash O(n) 2.快慢指针 O(n)
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let next = head;
//   let map = new Map();
//   while (next != null) {
//     if (map.has(next)) {
//       return true;
//     }
//     map.set(next, 1);
//     next = next.next;
//   }
//   return false;
// }
// function hasCycle(head) {
//   if (head == null || head.next == null) return false;
//   let slow = head;
//   let fast = head.next;
//   while (fast != null && fast.next != null) {
//     if (fast === slow || fast.next === slow) {
//       return true;
//     }
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// }
// 有效的括号 1.暴力 replace O(n^2) 2.栈
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
//   let stack = [];
//   let map = new Map([
//     [')', '('],
//     [']', '['],
//     ['}', '{']
//   ]);
//   for (let i of s) {
//     if (map.has(i)) {
//       if (!stack.length || map.get(i) !== stack.pop()) {
//         return false;
//       }
//     } else {
//       stack.push(i);
//     }
//   }
//   return !stack.length;
// }
// myPow = function (x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   if (n === 1) return x;
//   return x * myPow(x, n - 1);
// };
// function myPow(x, n) {
//   if (n === 0) return 1;
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function pow(x, n) {
//     if (n === 1) return x;
//     return x * pow(x, n - 1);
//   }
//   return pow(x, n);
// }
// console.log(myPow(2, 10000))
// pow(x, n)
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   let res = 1;
//   for (let i = 0; i < n; i++) {
//     res = res * x;
//   }
//   return res;
// }
// console.log(myPow(2, -3))
// function myPow(x, n) {
//   if (n === 0) return 1;
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function pow(x, n) {
//     if (n === 1) return x;
//     subResult = pow(x, Math.floor(n / 2));
//     return n % 2 === 1 ? subResult * subResult * x : subResult * subResult;
//   }
//   return pow(x, n);
// }
// 最小的k个数
// function getLeastNumbers(nums, k) {
//   nums.sort((a, b) => a - b);
//   return nums.slice(0, k);
// }
// function getLeastNumbers(nums, k) {
//   let a = [];
//   for (let i of nums) {
//     minHeap.insert(i);
//   }
//   for (let i = 0; i < k; i++) {
//     a[i] = minHeap.delete(0);
//   }
//   return a;
// }
// 前k个高频元素
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   let arr = [...map.values()].sort((a, b) => b - a);
//   for (let i = 0; i < k; i++) {
//     let value = arr.shift();
//     for (let [k, v] of map) {
//       if (value === v) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     maxHeap.insert(v);
//   }
//   for (let i = 0; i < k; i++) {
//     let value = maxHeap.delete(0);
//     for (let [k, v] of map) {
//       if (value === v) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// 递归代码模版
// function recursion(level, params) {
//   // 递归终止条件
//   if (level > MAX_LEVEL) {
//     process_result;
//     return;
//   }
//   // 处理当前层
//   process(level, params);
//   // 下探下一层
//   recursion(level + 1, params);
//   // 清理当前层
// }
// n!
// function factorial(n) {
//   if (n === 1) return 1;
//   return n * factorial(n - 1);
// }
// console.log(factorial(4));
// 括号生成 1.递归
// function generateParenthesis(n) {
//   let a = [];
//   function generate(level, max, s) {
//     if (level === max) {
//       a.push(s);
//       return;
//     }
//     generate(level + 1, max, s + '(');
//     generate(level + 1, max, s + ')');
//   }
//   generate(0, 2 * n, '');
//   return a;
// }
// console.log(generateParenthesis(3).length);
// function generateParenthesis(n) {
//   let a = [];
//   function generate(left, right, n, s) {
//     if (left === n && right === n) {
//       a.push(s);
//       return;
//     }
//     if (left < n) generate(left + 1, right, n, s + '(');
//     if (left > right) generate(left, right + 1, n, s + ')');
//   }
//   generate(0, 0, n, '');
//   return a;
// }
// 验证二叉搜索树 1.递归 2.中序遍历是升序的
// function isValidBST(root) {
//   function recursion(root, lower, upper) {
//     if (root == null) return true;
//     if (root.val <= lower || root.val >= upper) {
//       return false;
//     }
//     return recursion(root.left, lower, root.val) && recursion(root.right, root.val, upper);
//   }
//   return recursion(root, -Infinity, Infinity);
// }
// function isValidBST(root) {
//   let flag = true;
//   let pre = -Infinity;
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       if (root.val <= pre) flag = false;
//       pre = root.val;
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return flag;
// }
// function isValidBST(root) {
//   let stack = [];
//   let pre = -Infinity;
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     if (root.val <= pre) return false;
//     pre = root.val;
//     root = root.right;
//   }
//   return true;
// }
// 二叉树最大深度 1.递归 O(n) 2.广搜 O(n)
// function maxDepth(root) {
//   if (root == null) return 0;
//   let leftHeight = maxDepth(root.left);
//   let rightHeight = maxDepth(root.right);
//   return Math.max(leftHeight, rightHeight) + 1;
// }
// function maxDepth(root) {
//   if (root == null) return 0;
//   let res = 0;
//   let q = [];
//   q.push(root);
//   while (q.length) {
//     let length = q.length;
//     while (length > 0) {
//       let node = q.shift();
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//       length--;
//     }
//     res++;
//   }
//   return res;
// }
// pow(x, n) 1.暴力枚举进行累乘 O(n) 2.傻递归 3.分治
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   let res = 1;
//   for (let i = 0; i < n; i++) {
//     res = res * x;
//   }
//   return res;
// }
// function myPow(x, n) {
//   if (n === 0) return 1;
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function pow(x, n) {
//     if (n === 1) return x;
//     return x * pow(x, n - 1);
//   }
//   return pow(x, n);
// }
// function myPow(x, n) {
//   if (n === 0) return 1;
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function pow(x, n) {
//     if (n === 1) return x;
//     let subResult = pow(x, Math.floor(n / 2));
//     return n % 2 === 0 ? subResult * subResult : subResult * subResult * x;
//   }
//   return pow(x, n);
// }
// myPow = function(x, n) {
//   if (n === 0) return 1;
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function pow(x, n) {
//     if (n === 1) return x;
//     // subResult = pow(x, Math.floor(n / 2));
//     return n % 2 === 0 ? pow(x, Math.floor(n / 2)) * pow(x, Math.floor(n / 2)) : pow(x, Math.floor(n / 2)) * pow(x, Math.floor(n / 2)) * x;
//   }
//   return pow(x, n);
// };
// console.log(myPow(2, 10))
// function subsets(nums) {
//   let a = [];
//   function recursion(level, nums, list) {
//     if (level === nums.length) {
//       a.push(list);
//       return;
//     }
//     recursion(level + 1, nums, JSON.parse(JSON.stringify(list)));
//     list.push(nums[level]);
//     recursion(level + 1, nums, JSON.parse(JSON.stringify(list)));
//     // list.splice(list.length - 1, 1);
//   }
//   recursion(0, nums, []);
//   return a;
// }
// console.log(subsets([1,2,3]))
// function subsets(nums) {
//   let a = [[]];
//   for (let num of nums) {
//     let newsets = [];
//     for (let i of a) {
//       let tmp = i.concat(num);
//       newsets.push(tmp);
//     }
//     a = a.concat(newsets);
//   }
//   return a;
// }
// console.log(subsets([1,2,3]));
// 子集 1.递归 O(n^2) 2.迭代 O(n^2)
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list);
//       return;
//     }
//     recursion(nums, JSON.parse(JSON.stringify(list)), index + 1);
//     list.push(nums[index]);
//     recursion(nums, JSON.parse(JSON.stringify(list)), index + 1);
//   }
//   recursion(nums, [], 0);
//   return a;
// }
// function subsets(nums) {
//   let a = [[]];
//   for (let num of nums) {
//     let newsets = [];
//     for (let i of a) {
//       newsets.push(i.concat(num));
//     }
//     a = a.concat(newsets);
//   }
//   return a;
// }
// 前k个高频元素
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   let arr = [...map.values()].sort((a, b) => b - a);
//   for (let i = 0; i < k; i++) {
//     let value = arr.shift();
//     for (let [k, v] of map) {
//       if (value === v) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     maxHeap.insert(v);
//   }
//   for (let i = 0; i < k; i++) {
//     let value = maxHeap.delete(0);
//     for (let [k, v] of map) {
//       if (value === v) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// 递归代码模版
// function recursion(level, params) {
//   if (level > MAX_LEVEL) {
//     process_result;
//     return;
//   }
//   process(level, params);
//   recursion(level + 1, params);
//   // 清理当前层
// }
// n!
// function factorial(n) {
//   if (n === 1) return 1;
//   return n * factorial(n - 1);
// }
// console.log(factorial(4))
// 括号生成 1.递归
// function generateParenthesis(n) {
//   let a = [];
//   function generate(level, max, s) {
//     if (level === max) {
//       a.push(s);
//       return;
//     }
//     generate(level + 1, max, s + '(');
//     generate(level + 1, max, s + ')');
//   }
//   generate(0, 2 * n, '');
//   return a;
// }
// console.log(generateParenthesis(3).length)
// function generateParenthesis(n) {
//   let a = [];
//   function generate(left, right, n, s) {
//     if (left === n && right === n) {
//       a.push(s);
//       return;
//     }
//     if (left < n) generate(left + 1, right, n, s + '(');
//     if (left > right) generate(left, right + 1, n, s + ')');
//   }
//   generate(0, 0, n, '');
//   return a;
// }
// 验证二叉搜索树 1.递归 2.中序遍历是升序
// function isValidBST(root) {
//   function recursion(root, lower, upper) {
//     if (root == null) return true;
//     if (root.val <= lower || root.val >= upper) return false;
//     return recursion(root.left, lower, root.val) && recursion(root.right, root.val, upper); 
//   }
//   return recursion(root, -Infinity, Infinity);
// }
// function isValidBST(root) {
//   let flag = true;
//   let pre = -Infinity;
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       if (root.val <= pre) flag = false;
//       pre = root.val;
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return flag;
// }
// function isValidBST(root) {
//   let stack = [];
//   let pre = -Infinity;
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     if (root.val <= pre) return false;
//     pre = root.val;
//     root = root.right;
//   }
//   return true;
// }
// 二叉树的最大深度 1.递归 2.迭代
// function maxDepth(root) {
//   function recursion(root) {
//     if (root == null) return 0;
//     let leftDepth = maxDepth(root.left);
//     let rightDepth = maxDepth(root.right);
//     return Math.max(leftDepth, rightDepth) + 1;
//   }
//   return recursion(root);
// }
// function maxDepth(root) {
//   if (root == null) return 0;
//   let res = 0;
//   let q = [];
//   q.push(root);
//   while (q.length) {
//     let length = q.length;
//     while (length > 0) {
//       let node = q.shift();
//       if (node.left != null) q.push(node.left);
//       if (node.right != null) q.push(node.right);
//       length--;
//     }
//     res++;
//   }
//   return res;
// }
// pow(x, n) 1.暴力枚举累乘 2.傻递归 3.分治递归
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   let res = 1;
//   for (let i = 0; i < n; i++) {
//     res = res * x;
//   }
//   return res;
// }
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function pow(x, n) {
//     if (n === 0) return 1;
//     return x * pow(x, n - 1);
//   }
//   return pow(x, n);
// }
// console.log(myPow(2, -10))
// function myPow(x, n) {
//   // if (n === 0) return 1;
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function pow(x, n) {
//     if (n === 0) return 1;
//     let sub = pow(x, Math.floor(n / 2));
//     return n % 2 === 0 ? sub * sub : sub * sub * x;
//   }
//   return pow(x, n);
// }
// 子集 1.递归 2.迭代
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list);
//       return;
//     }
//     recursion(nums, JSON.parse(JSON.stringify(list)), index + 1);
//     list.push(nums[index]);
//     recursion(nums, JOSN.parse(JOSN.stringify(list)), index + 1);
//   }
//   recursion(nums, [], 0);
//   return a;
// }
// function subsets(nums) {
//   let a = [[]];
//   for (let num of nums) {
//     let res = [];
//     for (let sub of a) {
//       res.push(sub.concat(num));
//     }
//     a = a.concat(res);
//   }
//   return a;
// }
// js声明二叉堆数据结构
// class BinaryHeap {
//   constructor(compare) {
//     this.compare = compare;
//     this.data = [];
//   }
//   insert(value) {
//     this.insertAt(this.data.length, value);
//   }
//   insertAt(i, value) {
//     this.data[i] = value;
//     while (i > 0 && this.compare(value, this.data[Math.floor((i - 1) / 2)]) < 0) {
//       this.data[i] = this.data[Math.floor((i - 1) / 2)];
//       this.data[Math.floor((i - 1) / 2)] = value;
//       i = Math.floor((i - 1) / 2);
//     }
//   }
//   delete(i) {
//     if (this.data.length === 0) return;
//     let value = this.data[i];
//     while (i < this.data.length) {
//       let left = 2 * i + 1;
//       let right = 2 * i + 2;
//       if (left >= this.data.length) break;
//       if (right >= this.data.length) {
//         this.data[i] = this.data[left];
//         i = left;
//         break;
//       }
//       if (this.compare(this.data[left], this.data[right]) < 0) {
//         this.data[i] = this.data[left];
//         i = left;
//       } else {
//         this.data[i] = this.data[right];
//         i = right;
//       }
//       if (i < this.data.length - 1) {
//         this.insertAt(i, this.data.pop());
//       } else {
//         this.data.pop();
//       }
//     }
//     return value;
//   }
//   printHeap() {
//     console.log(this.data);
//   }
// }
// let maxHeap = new BinaryHeap((a, b) => b - a);
// let a = [1,4,2,7,9,6,3];
// for (let i of a) {
//   maxHeap.insert(i);
// }
// maxHeap.printHeap();
// let b = [];
// for (let i of a) {
//   b.push(maxHeap.delete(0));
// }
// console.log(b);
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     if (v > nums.length / 2) {
//       return k;
//     }
//   }
// }
// 电话号码的字母组合
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let mapData = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   if (digits.length === 1) return mapData[digits].split('');
//   let tmp = digits.split('');
//   let arr = [];
//   for (let i of tmp) {
//     arr.push(mapData[i]);
//   }
//   // ['abc', 'def']
//   function recursion(arr) {
//     if (arr.length === 1) {
//       return arr[0];
//     }
//     let res = [];
//     let a1 = arr.shift();
//     let a2 = arr.shift();
//     for (let i of a1) {
//       for (let j of a2) {
//         res.push(i + j);
//       }
//     }
//     arr.unshift(res);
//     return recursion(arr);
//   }
//   return recursion(arr);
// }
// console.log(letterCombinations('2'))
// 递归代码模版
// function recursion(level, params) {
//   // 递归终止条件
//   if (level > MAX_LEVEL) {
//     process_result
//     return;
//   }
//   // 处理当前层
//   process(level, params);
//   // 下探下一层
//   recursion(level + 1, params);
//   清理当前层
// }
// 计算n!
// function factorial(n) {
//   if (n === 1) return n;
//   return n * factorial(n - 1);
// }
// console.log(factorial(4))
// 括号生成
// function generateParenthesis(n) {
//   let a = [];
//   function generate(level, max, s) {
//     if (level === max) {
//       a.push(s);
//       return;
//     }
//     generate(level + 1, max, s + '(');
//     generate(level + 1, max, s + ')');
//   }
//   generate(0, 2 * n, '');
//   return a;
// }
// console.log(generateParenthesis(3).length)
// function generateParenthesis(n) {
//   let a = [];
//   function generate(left, right, n, s) {
//     if (left === n && right === n) {
//       a.push(s);
//       return;
//     }
//     if (left < n) generate(left + 1, right, n, s + '(');
//     if (left > right) generate(left, right + 1, n, s + ')');
//   }
//   generate(0, 0, n, '');
//   return a;
// }
// 验证二叉搜索树 1.递归 2.中序遍历是升序的
// function isValidBST(root) {
//   function recursion(root, lower, upper) {
//     if (root == null) return true;
//     if (root.val <= lower || root.val >= upper) return false;
//     return recursion(root.left, lower, root.val) && recursion(root.right, root.val, upper);
//   }
//   return recursion(root, -Infinity, Infinity);
// }
// function isValidBST(root) {
//   let flag = true;
//   let pre = -Infinity;
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       if (root.val <= pre) flag = false;
//       pre = root.val;
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return flag;
// }
// function isValidBST(root) {
//   let pre = -Infinity;
//   let stack = [];
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     if (root.val <= pre) return false;
//     pre = root.val;
//     root = root.right;
//   }
//   return true;
// }
// 二叉树最大深度 1.递归 2.层序遍历
// function maxDepth(root) {
//   if (root == null) return 0;
//   let leftDepth = maxDepth(root.left);
//   let rightDepth = maxDepth(root.right);
//   return Math.max(leftDepth, rightDepth) + 1;
// }
// function maxDepth(root) {
//   let res = 0;
//   let q = [];
//   q.push(root);
//   while (q.length) {
//     let length = q.length;
//     while (length > 0) {
//       let node = q.shift();
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//       length--;
//     }
//     res++;
//   }
//   return res;
// }
// pow(x, n) 1.暴力枚举累乘 O(n) 2.傻递归 O(n) 3.分治递归 O(logn)
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   let res = 1;
//   for (let i = 0; i < n; i++) {
//     res = res * x;
//   }
//   return res;
// }
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function pow(x, n) {
//     if (n === 0) return 1;
//     return x * pow(x, n - 1);
//   }
//   return pow(x, n);
// }
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function pow(x, n) {
//     if (n === 0) return 1;
//     let sub = pow(x, Math.floor(n / 2));
//     return n % 2 === 0 ? sub * sub : sub * sub * x;
//   }
//   return pow(x, n);
// }
// 子集 1.递归 O(n^2) 2.迭代 O(n)
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list);
//       return;
//     }
//     recursion(nums, JSON.parse(JSON.stringify(list)), index + 1);
//     list.push(nums[index]);
//     recursion(nums, JSON.parse(JSON.stringify(list)), index + 1);
//   }
//   recursion(nums, [], 0);
//   return a;
// }
// function subsets(nums) {
//   let a = [[]];
//   for (let num of nums) {
//     let res = [];
//     for (let i of a) {
//       res.push(i.concat(num));
//     }
//     a = a.concat(res);
//   }
//   return a;
// }
// 多数元素 1.hash O(n) 2.排序
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//     if (map.get(i) > nums.length / 2) return i;
//   }
// }
// function majorityElement(nums) {
//   nums.sort((a, b) => a - b);
//   return nums[Math.floor(nums.length / 2)];
// }
// 电话号码字母组合 1.分治递归
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let data = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   if (digits.length === 1) return data[digits].split('');
//   let a = digits.split('');
//   let b = [];
//   for (let i of a) {
//     b.push(data[i]);
//   }
//   function recursion(arr) {
//     if (arr.length === 1) return arr[0];
//     let a1 = arr.shift();
//     let a2 = arr.shift();
//     let tmp = [];
//     for (let i of a1) {
//       for (let j of a2) {
//         tmp.push(i + j);
//       }
//     }
//     arr.unshift(tmp);
//     return recursion(arr);
//   }
//   return recursion(b);
// }
// letterCombinations('23')
// function letterCombinations(digits) {
//   let res = [];
//   let a = digits.split('');
//   let b = [];
//   for (let i of a) {
//     b.push(data[i]);
//   }
//   // ['abc', 'def']
//   function recursion(arr, s, index) {
//     if (index === arr.length) {
//       res.push(s);
//       return;
//     }
//     for (let i = 0; i < arr.length; i++) {
//       for (let j of arr[i]) {
//         recursion(arr, s + j,i + 1);
//       }
//     }
//   }
//   recursion(b, '', 0);
//   return res;
// }
// letterCombinations = function(digits) {
//   if (digits === '') return [];
//   let mapData = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   if (digits.length === 1) return mapData[digits].split('');
//   let tmp = digits.split('');
//   let b = [];
//   let res = [];
//   for (let i of tmp) {
//     b.push(mapData[i]);
//   }
//   function recursion(arr, s, index) {
//     if (index === digits.length) {
//       res.push(s);
//       return;
//     }
//     let letter = arr[index];
//     for (let i of letter) {
//       recursion(arr, s + i, index + 1);
//     }
//   }
//   recursion(b, '', 0);
//   return res;
// }
// var letterCombinations = function(digits) {
//   if (digits === '') return [];
//   let mapData = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   if (digits.length === 1) return mapData[digits].split('');
//   let tmp = digits.split('');
//   let b = [];
//   let res = [];
//   for (let i of tmp) {
//     b.push(mapData[i]);
//   }
//   // ['abc', 'def']
//   function recursion(arr, s, index) {
//     if (index === arr.length) {
//       res.push(s);
//       return;
//     }
//     for (let i = 0; i < arr.length; i++) {
//       for (let j of arr[i]) {
//         recursion(arr, s + j, i + 1);
//         for (let i = 0; i < arr.length; i++) {
//           for (let j of arr[i]) {
//             recursion(arr, s + j, i + 1);
//           }
//         }
//       }
//     }
//   }
//   recursion(b, '', 0);
//   return res;
// };
// 递归代码模版
// function recursion(level, params) {
//   if (level > MAX_LEVEL) {
//     process_result;
//     return;
//   }
//   process(level, params);
//   recursion(level + 1, params);
//   // 清理当前层
// }
// 验证二叉搜索树 1.递归 2.中序遍历是升序的
// function isValidBST(root) {
//   function recursion(root, lower, upper) {
//     if (root == null) return true;
//     if (root.val <= lower || root.val >= upper) return false;
//     return recursion(root.left, lower, root.val) && recursion(root.right, root.val, upper);
//   }
//   return recursion(root, -Infinity, Infinity);
// }
// function isValidBST(root) {
//   let flag = true;
//   let pre = -Infinity;
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       if (root.val <= pre) return false;
//       pre = root.val;
//       inorder(root.right);
//     }
//   }
//   inorder(root);
//   return flag;
// }
// function isValidBST(root) {
//   let stack = [];
//   let pre = -Infinity;
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     if (root.val <= pre) return false;
//     root = root.right;
//   }
//   return true;
// }
// 二叉树的最大深度 1.递归 2.迭代
// function maxDepth(root) {
//   function recursion(root) {
//     if (root == null) return 0;
//     let leftDepth = recursion(root.left);
//     let rightDepth = recursion(root.right);
//     return Math.max(leftDepth, rightDepth) + 1;
//   }
//   return recursion(root);
// }
// function maxDepth(root) {
//   if (root == null) return 0;
//   let res = 0;
//   let q = [];
//   q.push(root);
//   while (q.length) {
//     let length = q.length;
//     while (length > 0) {
//       let node = q.shift();
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//       length--;
//     }
//     res++;
//   }
//   return res;
// }
// 验证二叉搜索树 1.递归 2.中序遍历是升序的
// function isValidBST(root) {
//   function recursion(root, lower, upper) {
//     if (root == null) return true;
//     if (root.val <= lower || root.val >= upper) return false;
//     return recursion(root.left, lower, root.val) && recursion(root.right, root.val, upper);
//   }
//   return recursion(root, -Infinity, Infinity);
// }
// function isValidBST(root) {
//   let flag = true;
//   let pre = -Infinity;
//   function inorder(root) {
//     if (root) {
//       inorder(root.left);
//       if (root.val <= pre) flag = false;
//       pre = root.val;
//       inorder(root.right);
//     } else {
//       return true;
//     }
//   }
//   return inorder(root);
// }
// function isValidBST(root) {
//   let stack = [];
//   let pre = -Infinity;
//   while (root || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     if (root.val <= pre) return false;
//     pre = root.val;
//     root = root.right;
//   }
//   return true;
// }
// 二叉树的最大深度 1.递归 2.迭代
// function maxDepth(root) {
//   function recursion(root) {
//     if (root == null) return 0;
//     let leftDepth = recursion(root.left);
//     let rightDepth = recursion(root.right);
//     return Math.max(leftDepth, rightDepth) + 1;
//   }
//   recursion(root);
// }
// function maxDepth(root) {
//   if (root == null) return 0;
//   let res = 0;
//   let q = [];
//   q.push(root);
//   while (q.length) {
//     let length = q.length;
//     while (length > 0) {
//       let node = q.shift();
//       if (node.left != null) q.push(node.left);
//       if (node.right != null) q.push(node.right);
//       length--;
//     }
//     res++;
//   }
//   return res;
// }
// pow(x, n) 1.暴力枚举累乘 O(n) 2.傻递归 O(n) 调用栈溢出 3.分治递归 O(logn )
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   let res = 1;
//   for (let i = 0; i < n; i++) {
//     res = res * x;
//   }
//   return res;
// }
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function pow(x, n) {
//     if (n === 0) return 1;
//     return pow(x, n - 1) * x;
//   }
//   return pow(x, n);
// }
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function pow(x, n) {
//     if (n === 0) return 1;
//     let sub = pow(x, Math.floor(n / 2));
//     return n % 2 === 0 ? sub * sub : sub * sub * x;
//   }
//   return pow(x, n);
// }
// 子集 1.递归 2.迭代
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list.slice());
//       return;
//     }
//     recursion(nums, list, index + 1);
//     list.push(nums[index]);
//     recursion(nums, list, index + 1);
//     list.pop();
//   }
//   recursion(nums, [], 0);
//   return a;
// }
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list);
//       return;
//     }
//     recursion(nums, list.slice(), index + 1);
//     list.push(nums[index]);
//     recursion(nums, list.slice(), index + 1);
//   }
//   recursion(nums, [], 0);
//   return a;
// }
// function subsets(nums) {
//   let a = [[]];
//   for (let num of nums) {
//     let res = [];
//     for (let i of a) {
//       res.push(i.concat(num));
//     }
//     a = a.concat(res);
//   }
//   return a;
// }
// 多数元素 1.hash O(n) 2.排序 O(nlogn) 3.分治递归 O(nlogn)
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//     if (map.get(i) > n / 2) return i;
//   }
// }
// functon majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value); 
//   }
//   for (let [k, v] of map) {
//     if (v > nums.length / 2) return k;
//   }
// }
// function majorityElement(nums) {
//   nums.sort((a, b) => a - b);
//   return nums[Math.floor(nums.length / 2)];
// // }
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let a = [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   // if (digits.length === 1) return map[digits];
//     let b = [];
//     for (let i of digits) {
//       b.push(map[i]);
//     }
//   function recursion(arr, s, index) {
//     if (index === digits.length) {
//       a.push(s);
//       return;
//     }
//     for (let i of arr[index]) {
//       recursion(arr, s + i, index + 1);
//     }
//   }
//   recursion(b, '', 0); 
//   return a;
// }
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   if (digits.length === 1) return map[digits[0]].split('');
//   let b = [];
//   for (let i of digits) {
//     b.push(map[i]);
//   }
//   function recursion(arr) {
//     if (arr.length === 1) {
//       return arr[0];
//     }
//     let a1 = arr.shift();
//     let a2 = arr.shift();
//     let res = [];
//     for (let i of a1) {
//       for (let j of a2) {
//         res.push(i + j);
//       }
//     }
//     arr.unshift(res);
//     return recursion(arr);
//   }
//   return recursion(b);
// }
// pow(x, n) // 1.暴力枚举迭代 O(n) 2.傻递归 O(n) 3.分治递归 O(logn)
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   let res = 1;
//   for (let i = 0; i < n; i++) {
//     res = res * x;
//   }
//   return res;
// }
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function recursion(x, n) {
//     if (n === 0) return 1;
//     return x * recursion(n - 1);
//   }
//   return recursion(x, n);
// }
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function recursion(x, n) {
//     if (n === 0) return 1;
//     let sub = recursion(x, Math.floor(n / 2));
//     return n % 2 === 0 ? sub * sub : sub * sub * x;
//   }
//   recursion(x, n);
// }
// 子集 1.递归 2.迭代
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list.slice());
//       return;
//     }
//     recursion(nums, list, index + 1);
//     list.push(nums[index]);
//     recursion(nums, list, index + 1);
//     list.pop();
//   }
//   recursion(nums, [], 0);
//   return a;
// }
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list);
//       return;
//     }
//     recursion(nums, list.slice(), index + 1);
//     list.push(nums[index]);
//     recursion(nums, list.slice(), index + 1);
//   }
//   recursion(nums, [], 0);
//   return a;
// }
// function subsets(nums) {
//   let a = [[]];
//   for (let num of nums) {
//     let res = [];
//     for (let i of a) {
//       res.push(i.concat(num));
//     }
//     a = a.concat(res);
//   }
//   return a;
// }
// 多数元素 1.hash 2.排序
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//     if (map.get(i) > nums.length / 2) return i;
//   }
// }
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     if (v > nums.length / 2) return k;
//   }
// }
// function majorityElement(nums) {
//   nums.sort((a, b) => a - b);
//   return nums[Math.floor(nums.length / 2)];
// }
// 电话号码组合 1.递归
// function letterCombinations(digits) {
//   if (digits.length === 0) return [];
//   let a = [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   let b = [];
//   for (let i of digits) {
//     b.push(map[i]);
//   }
//   function recursion(arr, s, index) {
//     if (index === digits.length) {
//       a.push(s);
//       return;
//     }
//     for (let i of arr[index]) {
//       recursion(arr, s + i, index + 1);
//     }
//   }
//   recursion(b, '', 0);
//   return a;
// }
// function letterCombinations(digits) {
//   if (digits.length === 0) return [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   if (digits.length === 1) return map[digits].split('');
//   let b = [];
//   for (let i of digits) {
//     b.push(map[i]);
//   }
//   function recursion(arr) {
//     if (arr.length === 1) {
//       return arr[0];
//     }
//     let a1 = arr.pop();
//     let a2 = arr.pop();
//     let res = [];
//     for (let i of a1) {
//       for (let j of a2) {
//         res.push(i + j);
//       }
//     }
//     arr.push(res);
//     return recursion(arr);
//   }
//   return recursion(b);
// }
// function factorial(n) {
//   if (n === 1) return 1;
//   let res = n * factorial(n - 1);
//   return res;
// }
// pow(x, n) 1.暴力枚举累乘 O(n) 2.傻递归 O(n) 3.分治 O(logn)
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   let res = 1;
//   for (let i = 0; i < n; i++) {
//     res = res * x;
//   }
//   return res;
// }
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function recursion(x, n) {
//     if (n === 0) return 1;
//     return recursion(x, n - 1) * x;
//   }
//   recursion(x, n);
// }
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function recursion(x, n) {
//     if (n === 0) return 1;
//     let sub = recursion(x, Math.floor(n / 2));
//     return n % 2 === 0 ? sub * sub : sub * sub * x;
//   }
//   return recursion(x, n);
// }
// 子集 1.递归深搜 2.广搜
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list.slice());
//       return;
//     }
//     recursion(nums, list, index + 1);
//     list.push(nums[index]);
//     recursion(nums, list, index + 1);
//     list.pop();
//   }
//   recursin(nums, [], 0);
//   return a;
// }
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list);
//       return;
//     }
//     recursion(nums, list, index + 1);
//     list.push(nums[index]);
//     recursion(nums, list, index + 1);
//   }
//   recursion(nums, [], 0)
//   return a;
// }
// function subsets(nums) {
//   let a = [[]];
//   for (let num of nums) {
//     let res = [];
//     for (let i of a) {
//       res.push(i.concat(num));
//     }
//     a = a.concat(res);
//   }
//   return a;
// }
// 多数元素 1.hash O(n) 2.排序 O(nlogn) 3.分治
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//     if (map.get(i) > nums.length / 2) return i;
//   }
// }
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     if (v > nums.length / 2) return k;
//   }
// }
// function majorityElement(nums) {
//   nums.sort((a, b) => a - b);
//   return nums[Math.floor(nums.length / 2)];
// }
// 电话号码字母组合 1.递归
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   let b = [];
//   for (let i of digits) {
//     b.push(map[i]);
//   }
//   function recursion(arr, s, index) {
//     if (index === arr.length) {
//       a.push(s);
//       return;
//     }
//     for (let i of arr[index]) {
//       recursion(arr, s + i, index + 1);
//     }
//   }
//   recursion(b, '', 0);
//   return a;
// }
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   if (digits.length === 1) return map[digits].split('');
//   let b = [];
//   for (let i of digits) {
//     b.push(map[i]);
//   }
//   function recursion(arr) {
//     if (arr.length === 1) {
//       return arr[0];
//     }
//     let a1 = arr.shift();
//     let a2 = arr.shift();
//     let res = [];
//     for (let i of a1) {
//       for (let j of a2) {
//         res.push(i + j);
//       }
//     }
//     arr.unshift(res);
//     return recursion(arr);
//   }
//   return recursion(b);
// }
// 最小的k个数 1.排序 2.堆排序
// function getLeastNumbers(nums, k) {
//   nums.sort((a, b) => a - b);
//   return nums[k - 1];
// }
// function getLeastNumbers(nums, k) {
//   let minHeap = new BinaryHeap((a, b) => a - b);
//   let a = [];
//   for (let i of nums) {
//     minHeap.insert(i);
//   }
//   for (let i = 0; i < k; i++) {
//     a[i] = minHeap.delete(0);
//   }
//   return a;
// }
// pow(x, n) 1.暴力枚举累乘 2.傻递归 3.分治递归
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   let res = 1;
//   for (let i = 0; i < n; i++) {
//     res = res * x;
//   }
//   return res;
// }
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function recursion(x, n) {
//     if (n === 0) return 1;
//     return x * recursion(x, n - 1); 
//   }
//   return recursion(x, n);
// }
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function recursion(x, n) {
//     if (n === 0) return 1;
//     let sub = recursion(x, Math.floor(n / 2));
//     return n % 2 === 0 ? sub * sub : sub * sub * x;
//   }
//   return recursion(x, n);
// }
// 子集 1.递归 2.迭代
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list.slice());
//       return;
//     } 
//     recursion(nums, list, index + 1);
//     list.push(nums[index]);
//     recursion(nums, list, index + 1);
//     list.pop();
//   }
//   recursion(nums, [], 0);
//   return a;
// }
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list);
//       return;
//     }
//     recursion(nums, list.slice(), index + 1);
//     list.push(nums[index]);
//     recursion(nums, list.slice(), index + 1);
//   }
//   recursion(nums, [], 0);
//   return a;
// }
// function subsets(nums) {
//   let a = [[]];
//   for (let num of nums) {
//     let res = [];
//     for (let i of a) {
//       res.push(a.concat(num));
//     }
//     a = a.concat(res);
//   }
//   return a;
// }
// 多数元素 1.hash 2.排序 2.分治
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     if (v > nums.length / 2) return k;
//   }
// }
// function majorityelement(nums) {
//   nums.sort((a, b) => a - b);
//   return nums[Math.floor(num.length / 2)];
// }
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   let b = [];
//   for (let i of digits) {
//     b.push(map[i]);
//   }
//   let a = [];
//   function recursion(arr, s, index) {
//     if (index === arr.length) {
//       a.push(s);
//       return;
//     }
//     for (let i of arr[index]) {
//       recursion(arr, s + i, index + 1);
//     }
//   }
//   recursion(b, '', 0);
//   return a;
// }
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   if (digits.length === 1) return map[digits].split('');
//   let b = [];
//   for (let i of digits) {
//     b.push(map[i]);
//   }
//   function recursin(arr) {
//     if (arr.length === 1) {
//       return arr[0];
//     }
//     let a1 = arr.shift();
//     let a2 = arr.shift();
//     let res = [];
//     for (let i of a1) {
//       for (let j of a2) {
//         res.push(i + j);
//       }
//     }
//     arr.unshift(res);
//     return recursin(arr);
//   }
//   return recursin(b);
// }
// 二叉树的层序遍历 1.广度搜索 2.深度搜索
// function levelOrder(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let n = q.length;
//     let res = [];
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// function levelOrder(root) {
//   let a = [];
//   function recursion(root, index) {
//     if (root == null) return;
//     arr[index] ? arr[index].push(root.val) : arr[index] = [root.val];
//     recursion(root.left, index + 1);
//     recursion(root.right, index + 1);
//   }
//   recursion(root, 0);
//   return a;
// }
// 在每个树行中找最大值
// function largestValues(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length > 0) {
//     let max = -Infinity;
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       max = Math.max(max, node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function largestValues(root) {
//   let a = [];
//   function recursion(root, index) {
//     if (root == null) return;
//     if (a[index] != null) {
//       a[index] = Math.max(a[index], root.val);
//     } else {
//       a[index] = root.val;
//     }
//     recursion(root.left, index + 1);
//     recursion(root.right, index + 1);
//   }
//   recursion(root, 0);
//   return a;
// }
// 前k个高频元素 1.sort 2.堆排序
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   let arr = [...map.values()].sort((a, b) => b - a);
//   for (let i = 0; i < k; i++) {
//     let value = arr[i];
//     for (let [k, v] of map) {
//       if (v === value) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// function topKFrequent(nums, k) {
//   let a = [];
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     maxHeap.insert(v);
//   }
//   for (let i = 0; i < k; i++) {
//     let value = maxHeap.delete(0);
//     for (let [k, v] of map) {
//       if (value === v) {
//         a.push(k);
//         map.delete(k);
//         break;
//       }
//     }
//   }
//   return a;
// }
// 子集 1.递归 2.迭代
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list.slice());
//       return;
//     }
//     recursion(nums, list, index + 1);
//     list.push(nums[index]);
//     recursion(nums, list, index + 1);
//     list.pop();
//   }
//   recursion(nums, [], 0);
//   return a;
// }
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list);
//       return;
//     }
//     recursion(nums, list.slice(), index + 1);
//     list.push(nums[index]);
//     recursion(nums, list.slice(), index + 1);
//   }
//   recursion(nums, [], 0);
//   return a;
// }
// function subsets(nums) {
//   let a = [[]];
//   for (let num of nums) {
//     let res = [];
//     for (let i of a) {
//       res.push(i.concat(num));
//     }
//     a = a.concat(res);
//   }
//   return a;
// }
// 多数元素 1.hash 2.排序
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//     if (map.get(i) > nums.length / 2) return i;
//   }
// }
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     if (v > nums.length / 2) return k;
//   }
// }
// function majorityElement(nums) {
//   nums.sort((a, b) => a - b);
//   return nums[Math.floor(nums.length / 2)];
// }
// 电话号码字母组合 
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let a = [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   let b = [];
//   for (let i of digits) {
//     b.push(map[i]);
//   }
//   function recursion(arr, s, index) {
//     if (index === arr.length) {
//       a.push(s);
//       return;
//     }
//     for (let i of arr[index]) {
//       recursion(arr, s + i, index + 1);
//     }
//   }
//   recursion(b, '', 0);
//   return a;
// }
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   if (digits.length === 1) return map[digits].split('');
//   let b = [];
//   for (let i of digits) {
//     b.push(map[i]);
//   }
//   function recursion(arr) {
//     if (arr.length === 1) {
//       return arr[0];
//     }
//     let a1 = arr.shift();
//     let a2 = arr.shift();
//     let res = [];
//     for (let i of a1) {
//       for (let j of a2) {
//         res.push(i + j);
//       }
//     }
//     arr.unshift(res);
//     recursion(arr);
//   }
//   return recursion(b);
// }
// 二叉树的层序遍历 1.bfs 2.dfs
// function levelOrder(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let res = [];
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// function levelOrder(root) {
//   let a = [];
//   function recursion(root, index) {
//     if (root == null) return;
//     a[index] ? a[index].push(root.val) : a[index] = [root.val];
//     recursion(root.left, index + 1);
//     recursion(root.right, index + 1);
//   }
//   recursion(root, 0);
//   return a;
// }
// 在每个树行中找最大值
// function largestValues(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let max = -Infinity;
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       max = Math.max(max, node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function largestValues(root) {
//   let a = [];
//   function recursion(root, index) {
//     if (root == null) return;
//     a[index] = a[index] == null ? root.val : Math.max(a[index], root.val);
//     recursion(root.left, index + 1);
//     recursion(root.right, index + 1);
//   }
//   recursion(root, 0);
//   return a;
// }
// 计算n!
// function factorial(n) {
//   function recursion(n) {
//     if (n === 0) return 1;
//     return n * recursion(n - 1);
//   }
//   return recursion(n);
// }
// console.log(factorial(4))
// 括号生成 1.递归
// function generateParenthesis(n) {
//   let a = [];
//   function generate(n, s, index) {
//     if (index === 2 * n) {
//       a.push(s);
//       return;
//     }
//     generate(n, s + '(', index + 1);
//     generate(n, s + ')', index + 1);
//   }
//   generate(n, '', 0);
//   return a;
// }
// function generateParenthesis(n) {
//   let a = [];
//   function generate(n, s, left, right) {
//     if (left === n && right === n) {
//       a.push(s);
//       return;
//     }
//     if (left < n) generate(n, s + '(', left + 1, right);
//     if (left > right) generate(n, s + ')', left, right + 1);
//   }
//   generate(n, '', 0, 0);
//   return a;
// }
// 多数元素 1.hash 2.排序
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//     if (map.get(i) > nums.length / 2) return i;
//   }
// }
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     if (v > nums.length / 2) return k;
//   }
// }
// function majorityElement(nums) {
//   nums.sort((a, b) => a - b);
//   return nums[Math.floor(nums.length / 2)];
// }
// 电话号码的字母组合 1.递归
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let a = [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   let b = [...digits].map(item => map[item]);
//   function recursion(arr, s, index) {
//     if (index === arr.length) {
//       a.push(s);
//       return;
//     }
//     for (let i of arr[index]) {
//       recursion(arr, s + i, index + 1);
//     }
//   }
//   recursion(b, '', 0);
//   return a;
// }
// letterCombinations('23')
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   if (digits.length === 1) return map[digits].split('');
//   let b = [...digits].map(item => map(item));
//   function recursion(arr) {
//     if (arr.length === 1) {
//       return arr[0];
//     }
//     let a1 = arr.shift();
//     let a2 = arr.shift();
//     let res = [];
//     for (let i of a1) {
//       for (let j of a2) {
//         res.push(i + j);
//       }
//     }
//     arr.unshift(res);
//     return recursion(arr);
//   }
//   return recursin(b);
// }
// 二叉树的层序遍历 1.bfs 2.dfs
// function levelOrder(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let n = q.length;
//     let res = [];
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// function levelOrder(root) {
//   let a = [];
//   function recursion(root, index) {
//     if (root == null) return;
//     a[index] = a[index] ? a[index].push(root.val) : a[index] = [root.val];
//     recursion(root.left, index + 1);
//     recursion(root.right, index + 1);
//   }
//   recursion(root, 0);
//   return a;
// }
// 在每个树行中找最大值 1.bfs 2.dfs
// function largestValues(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let max = -Infinity;
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       max = Math.max(max, node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function largestValues(root) {
//   let a = [];
//   function recursion(root, index) {
//     if (root == null) return;
//     a[index] = a[index] == null ? root.val : Math.max(a[index], root.val);
//     recursion(root.left, index + 1);
//     recursion(root.right, index + 1);
//   }
//   recursion(root, 0);
//   return a;
// }
// 递归代码模版
// function recursion(level, params) {
//   // 递归终止条件
//   if (level > MAX_LEVEL) {
//     process_result;
//     return;
//   }
//   // 处理当前层
//   process(level, params);
//   // 下探下一层
//   recursion(level + 1, params);
//   // 清理当前层
// }
// 二叉树的层序遍历
// function levelOrder(root) {
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let res = [];
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// function levelOrder(root) {
//   let a = [];
//   function recursion(root, index) {
//     if (root == null) return;
//     root[index] == null ? root[index] = [root.val] : root[index].push(root.val);
//     recursion(root.left, index + 1);
//     recursion(root.right, index + 1);
//   }
//   recursion(root, 0);
//   return a;
// }
// 在每个树行中找最大值
// function largestValues(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let max = -Infinity;
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       max = Math.max(max, node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     res.push(max);
//   }
//   return a;
// }
// function largestValues(root) {
//   let a = [];
//   function recursion(root, index) {
//     if (root == null) return;
//     a[index] = a[index] == null ? root.val : Math.max(a[index], root.val);
//     recursion(root.left, index + 1);
//     recursion(root.right, index + 1);
//   }
//   recursion(root, 0);
//   return a;
// }
// function numIslands(grid) {
//   let count = 0;
//   let n = grid.length;
//   if (n === 0) return 0;
//   let m = grid[0].length;
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (grid[i][j] === '1') {
//         console.log(1)
//         count++;
//         dfsMarking(grid, i, j);
//       }
//     }
//   }
//   function dfsMarking(grid, i, j) {
//     if (i < 0 || j < 0 || i >= n || j >= m || grid[i][j] !== '1') {
//       return;
//     } 
//     grid[i][j] = '0';
//     dfsMarking(grid, i - 1, j);
//     dfsMarking(grid, i + 1, j);
//     dfsMarking(grid, i, j - 1);
//     dfsMarking(grid, i, j + 1);
//   }
//   return count;
// }
// numIslands([
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ])
// 验证二叉搜索树 1.递归 2.中序遍历是升序的
// function isValidBST(root) {
//   if (root == null) return;
//   function recursion(root, lower, upper) {
//     if (root == null) return true;
//     if (root.val <= lower || root.val >= upper) return false;
//     return recursion(root.left, lower, root.val) && recursion(root.right, root.val, upper);
//   }
//   return recursion(root, -Infinity, Infinity);
// }
// function isValidBST(root) {
//   if (root == null) return true;
//   let pre = -Infinity;
//   let flag = true;
//   function recursion(root) {
//     if (root) {
//       recursion(root.left);
//       if (pre >= root.val) flag = false;
//       pre = root.val;
//       recursion(root.right);
//     } 
//   }
//   recursion(root);
//   return flag;
// }
// function isValidBST(root) {
//   if (root == null) return true;
//   let pre = -Infinity;
//   let stack = [];
//   while (root != null || stack.length) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     if (root.val <= pre) return false;
//     pre = root.val;
//     root = root.right;
//   }
//   return true;
// }
// 二叉树的最大深度 1.dfs 2.bfs
// function maxDepth(root) {
//   function recursion(root) {
//     if (root == null) return 0;
//     let leftDepth = recursion(root.left);
//     let rightDepth = recursion(root.right);
//     return Math.max(leftDepth, rightDepth) + 1;
//   }
//   return recursion(root);
// }
// function maxDepth(root) {
//   if (root == null) return 0;
//   let count = 0;
//   let q = [root];
//   while (q.length) {
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     count++;
//   }
//   return count;
// }
// function maxDepth(root) {
//   if (node == null) return;
//   let count = 0;
//   let q = [root];
//   while (q.length) {
//     let n = q.length;
//     while (n > 0) {
//       let node = q.shift();
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//       n--;
//     }
//     count++;
//   }
//   return count;
// }
// 二叉树的层序遍历 1.bfs 2.dfs
// function levelOrder(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let n = q.length;
//     let res = [];
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// function levelOrder(root) {
//   let a = [];
//   function recursion(root, index) {
//     if (root == null) return;
//     a[index] ? a[index].push(root.val) : a[index] = [root.val];
//     recursion(root.left, index + 1);
//     recursion(root.right, index + 1);
//   }
//   recursion(root, 0);
//   return a;
// }
// 在每个树行中找最大值 1.bfs 2.dfs
// function largestValues(root) {
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let n = q.length;
//     let max = -Infinity;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//       max = Math.max(max, node.val);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function largestValues(root) {
//   let a = [];
//   function recursion(root, index) {
//     if (root == null) return;
//     a[index] = a[index] == null ? root.val : Math.max(a[index], root.val);
//     recursion(root.left, index + 1);
//     recursion(root.right, index + 1);
//   }
//   recursion(root, 0);
//   return a;
// }
// 岛屿数量 1.dfs
// function numIslands(grid) {
//   let n = grid.length;
//   if (n === 0) return 0;
//   let m = grid[0].length;
//   let count = 0;
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (grid[i][j] === '1') {
//         count++;
//         recursion(grid, i, j);
//       }
//     }
//   }
//   function recursion(grid, i, j) {
//     if (i < 0 || j < 0 || i >= n || j >= m || grid[i][j] === '0') return;
//     grid[i][j] = '0';
//     recursion(grid, i - 1, j);
//     recursion(grid, i + 1, j);
//     recursion(grid, i, j - 1);
//     recursion(grid, i, j + 1);
//   }
//   return count;
// }
// pow(x, n) 1.暴力枚举累乘 O(n) 2.傻递归 O(n) 3.分治递归 O(logn)
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   let res = 1;
//   for (let i = 0; i < n; i++) {
//     res = res * x;
//   }
//   return res;
// }
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function recursion(x, n) {
//     if (n === 0) return 1;
//     return x * recursion(x, n - 1);
//   }
//   return recursion(x, n);
// }
// function myPow(x, n) {
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   function recursion(x, n) {
//     if (n === 0) return 1;
//     let sub = recursion(x, Math.floor(n / 2));
//     return n % 2 === 0 ? sub * sub : sub * sub * x;
//   }
//   return recursion(x, n);
// }
// 二叉树的层序遍历 1.bfs 2.dfs
// function levelOrder(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let res = [];
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// function levelOrder(root) {
//   let a = [];
//   function dfs(root, index) {
//     if (root == null) return;
//     a[index] ? a[index].push(root.val) : a[index] = [root.val];
//     dfs(root.left, index + 1);
//     dfs(root.right, index + 1);
//   }
//   dfs(root, 0);
//   return a;
// }
// 在每个树行中找最大值 1.bfs 2.dfs
// function largestValues(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let max = -Infinity;
//     let n = q.length;
//     while (n > 0) {
//       let node = q.shift();
//       max = Math.max(max, node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//       n--;
//     }
//     a.push(max);
//   } 
//   return a;
// }
// function largestValues(root) {
//   let a = [];
//   function dfs(root, index) {
//     if (root == null) return [];
//     a[index] = a[index] == null ? root.val : Math.max(a[index], root.val);
//     dfs(root.left, index + 1);
//     dfs(root.right, index + 1);
//   }
//   dfs(root, 0);
//   return a;
// }
// 岛屿数量 1.dfs
// function numIslands(grid) {
//   let n = grid.length;
//   if (n === 0) return 0;
//   let count = 0;
//   let m = grid[0].length;
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (grid[i][j] === '1') {
//         count++;
//         dfs(grid, i, j);
//       }
//     }
//   }
//   function dfs(grid, i, j) {
//     if (i < 0 || j < 0 || i >= n || j >= m || grid[i][j] === '0') {
//       return;
//     }
//     grid[i][j] = '0';
//     dfs(grid, i - 1, j);
//     dfs(grid, i + 1, j);
//     dfs(grid, i, j - 1);
//     dfs(grid, i, j + 1);
//   }
//   return count;
// }
// bfs代码模版
// function bfs(root) {
//   let a = [];
//   let q = [root];
//   while (q.length > 0) {
//     let n = q.length;
//     let res = [];
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// dfs代码模版
// let set = new Set();
// function dfs(root) {
//   if (set.has(root)) return;
//   set.add(root);
//   dfs(root.left);
//   dfs(root.right);
// }
// let set = new Set();
// function dfs(root) {
//   if (set.has(root)) return;
//   set.add(root);
//   for (let child_node of root.children) {
//     dfs(child_node);
//   }
// }
// 子集 1.递归 O(2^n) 2.迭代 O(2^n)
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list.slice());
//       return;
//     }
//     recursion(nums, list, index + 1);
//     list.push(nums[index]);
//     recursion(nums, list, index + 1);
//     list.pop();
//   }
//   return a;
// }
// function subsets(nums) {
//   let a = [];
//   for (let num of nums) {
//     let res = [];
//     for (let i of a) {
//       res.push(i.concat(num));
//     }
//     a = a.concat(res);
//   }
//   return a;
// }
// function subsets(nums) {
//   let a = [];
//   function recursion(nums, list, index) {
//     if (index === nums.length) {
//       a.push(list);
//       return;
//     }
//     recursion(nums, list.slice(), index + 1);
//     list.push(nums[index]);
//     recursion(nums, list.slice(), index + 1);
//   }
//   recursion(nums, [], 0);
//   return a;
// }
// 二叉树的层序遍历 1.bfs 2.dfs
// function levelOrder(root) {
//   if (root == null) return []; 
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let res = [];
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// function levelOrder(root) {
//   let a = [];
//   function dfs(root, index) {
//     if (root == null) return;
//     a[index] ? a[index].push(root.val) : a[index] = [node.val];
//     dfs(root.left, index + 1);
//     dfs(root.right, index + 1);
//   }
//   dfs(root, 0);
//   return a;
// }
// 在每个数行中找最大值 1.bfs 2.dfs
// function largestValues(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let max = -Infinity;
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       max = Math.max(max, node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function largestValues(root) {
//   let a = [];
//   function dfs(root, index) {
//     if (root == null) return;
//     a[index] = a[index] ? Math.max(a[index], root.val) : root.val;
//     dfs(root.left, index + 1);
//     dfs(root.right, index + 1);
//   }
//   dfs(root, 0);
//   return a;
// }
// 岛屿数量 1.dfs
// function numIslands(grid) {
//   let count = 0;
//   let n = grid.length;
//   if (n === 0) return 0;
//   let m = grid[0].length;
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (grid[i][j] === '1') {
//         count++;
//         dfs(grid, i, j);
//       }
//     }
//   }
//   function dfs(grid, i, j) {
//     if (i < 0 || j < 0 || i >= n || j >= m || grid[i][j] === '0') return;
//     grid[i][j] = 0;
//     dfs(grid, i - 1, j);
//     dfs(grid, i + 1, j);
//     dfs(grid, i, j - 1);
//     dfs(grid, i, j + 1);
//   }
//   return count;
// }
// dfs代码模版
// let visited = new Set();
// // function dfs(root) {
// //   if (visited.has(root)) {
// //     return;
// //   }
// //   visited.add(root);
// //   dfs(root.left);
// //   dfs(root.right);
// // }
// function dfs(root) {
//   if (visited.has(root)) {
//     return;
//   }
//   visited.add(root);
//   for (let node of root.children) {
//     dfs(node);
//   }
// }
// 深搜代码模版
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) {
//     return;
//   }
//   visited.add(root);
//   dfs(root.left);
//   dfs(root.right);
// }
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   for (let node of root.children) {
//     dfs(node);
//   }
// }
// function dfs(root) {
//   if (root == null) return;
//   let visited = new Set();
//   let stack = [root];
//   while (stack.length) {
//     let node = stack.pop();
//     if (visited.has(node)) continue;
//     visited.add(node);
//     for (let i = node.children.length - 1; i >= 0; i--) {
//       stack.push(node.children[i]);
//     }
//   }
// }
// dfs代码模版
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   dfs(root.left);
//   dfs(root.right);
// }
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   for (let node of root.children) {
//     dfs(node);
//   }
// }
// function dfs(root) {
//   if (root == null) return;
//   let stack = [root];
//   let visited = new Set();
//   while (stack.length) {
//     let node = stack.pop();
//     if (visited.has(node)) continue;
//     visited.add(node);
//     for (let i = node.children.length - 1; i >= 0; i--) {
//       stack.push(node.children[i]);
//     }
//   }
// }
// function bfs(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let res = [];
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// function mySqrt(x) {
//   if (x === 0 || x === 1) return x;
//   let left = 0;
//   let right = x;
//   let mid = 1;
//   while (left <= right) {
//     mid = (left + right) >> 1;
//     if (mid * mid === x) {
//       return mid;
//     } else if (mid * mid < x) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return right;
// }
// console.log(mySqrt(4))
// 多数元素 1.排序 2.hash
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//     if (map.get(i) > nums.length / 2) return i;
//   }
// }
// function majorityElement(nums) {
//   let map = new Map();
//   for (let i of nums) {
//     let value = map.has(i) ? map.get(i) + 1 : 1;
//     map.set(i, value);
//   }
//   for (let [k, v] of map) {
//     if (v > nums.length / 2) return k;
//   }
// }
// function majorityElement(nums) {
//   nums.sort((a, b) => a - b);
//   return nums[nums.length >> 1];
// }
// 电话号码的字母组合 
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let a = [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   let b = [];
//   for (let i of digits) {
//     b.push(map[i]);
//   }
//   function recursion(arr, s, index) {
//     if (index === arr.length) {
//       a.push(s);
//       return;
//     }
//     for (let i of arr[index]) {
//       recursion(arr, s + i, index + 1);
//     }
//   }
//   recursion(arr, '', 0);
//   return a;
// }
// function letterCombinations(digits) {
//   if (digits === '') return [];
//   let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//   if (digits.length === 1) return map[digits].split('');
//   let b = [];
//   for (let i of digits) {
//     b.push(map[i]);
//   }
//   function recursion(arr) {
//     if (arr.length === 1) return arr[0];
//     let a1 = arr.shift();
//     let a2 = arr.shift();
//     let res = [];
//     for (let i of a1) {
//       for (let j of a2) {
//         res.push(i + j);
//       }
//     }
//     arr.unshift(res);
//     return recursion(arr);
//   }
//   return recursion(b);
// }
// 在每个树行中找最大值 1.bfs 2.dfs
// function largestValues(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let max = -Infinity;
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       max = Math.max(max, node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function largestValues(root) {
//   let a = [];
//   function dfs(root, index) {
//     if (root == null) return;
//     a[index] = a[index] != null ? a[index] = Math.max(a[index], root.val) : root.val;
//     dfs(root.left, index + 1);
//     dfs(root.right, index + 1);
//   }
//   dfs(root, 0);
//   return a;
// }
// 岛屿数量
// function numIslands(grid) {
//   let n = grid.length;
//   if (n === 0) return 0;
//   let count = 0;
//   let m = grid[0].length;
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (grid[i][j] === '1') {
//         count++;
//         recursion(grid, i, j);
//       }
//     }
//   }
//   function recursion(grid, i, j) {
//     if (i < 0 || j < 0 || i >= n || j >= m || grid[i][j] === '0') return;
//     grid[i][j] = '0';
//     recursion(grid, i - 1, j);
//     recursion(grid, i + 1, j);
//     recursion(grid, i, j - 1);
//     recursion(grid, i, j + 1);
//   }
//   return count;
// }
// 深度优先搜索代码模版
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) {
//     return;
//   } 
//   visited.add(root);
//   dfs(root.left);
//   dfs(root.right);
// }
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   for (let node of root.children) {
//     dfs(node);
//   }
// }
// function dfs(root) {
//   if (root == null) return;
//   let visited = new Set();
//   let stack = [root];
//   while (stack.length) {
//     let node = stack.pop();
//     if (visited.has(node)) continue;
//     visited.add(node);
//     for (let i = node.children.length - 1; i >= 0; i--) {
//       stack.push(node);
//     }
//   }
// }
// 广度优先搜索代码模版
// function bfs(root) {
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let n = q.length;
//     let res = [];
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// 深度优先搜索代码模版
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   dfs(root.left);
//   dfs(root.right);
// }
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   for (let node of root.children) {
//     dfs(node);
//   }
// }
// function dfs(root) {
//   if (root == null) return;
//   let stack = [root];
//   let visited = new Set();
//   while (stack.length) {
//     let node = stack.pop();
//     if (visited.has(node)) continue;
//     visited.add(node);
//     for (let i = node.children.length - 1; i >= 0; i--) {
//       stack.push(node.children[i]);
//     }
//   }
// }
// function bfs(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let res = [];
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// 岛屿数量 1.dfs
// function numIslands(grid) {
//   let count = 0;
//   let n = grid.length;
//   if (n === 0) return 0;
//   let m = grid[0].length;
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (grid[i][j] === '1') {
//         count++;
//         recursion(grid, i, j);
//       }
//     }
//   }
//   function recursion(grid, i, j) {
//     if (i < 0 || j < 0 || i >= n || j >= m || grid[i][j] === '0') return;
//     grid[i][j] = '0';
//     recursion(grid, i - 1, j);
//     recursion(grid, i + 1, j);
//     recursion(grid, i, j - 1);
//     recursion(grid, i, j + 1);
//   }
//   return count;
// }
// 二分查找代码模版
// let left = 0;
// let right = arr.length - 1;
// while (left <= right) {
//   let mid = (left + right) >> 1;
//   if (arr[mid] === target) {
//     return;
//   } else if (arr[mid] < target) {
//     left = mid + 1;
//   } else {
//     right = mid - 1;
//   }
// }
// 二分查找代码模版
// function binarySearch(arr, target) {
//   let left = 0;
//   let right = arr.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (arr[mid] === target) {
//       return mid;
//     } else if (arr[mid] < target) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
// }
// function mySqrt(x) {
//   if (x === 0 || x === 1) return x;
//   let left = 0;
//   let right = x;
//   let mid = 1;
//   while (left <= right) {
//     mid = (left + right) >> 1;
//     if (mid * mid === x) {
//       return mid;
//     } else if (mid * mid < x) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return right;
// }  
// function mySqrt(x) {
//   if (x === 0 || x === 1) return x;
//   let left = 0;
//   let right = x;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === x) {
//       return mid;
//     } else if (mid * mid < x) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return right;
// }
// 深度优先搜索代码模版
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   dfs(root.left);
//   dfs(root.right);
// }
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   for (let node of root.children) {
//     dfs(node);
//   }
// }
// function dfs(root) {
//   if (root == null) return;
//   let visited = new Set();
//   let stack = [root];
//   while (stack.length) {
//     let node = stack.pop();
//     if (!visited.has(node)) continue;
//     visited.add(node);
//     for (let i = nodd.children.length - 1; i >= 0; i--) {
//       stack.push(node.children[i]);
//     }
//   }
// }
// 广度优先搜索模版
// function bfs(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let res = [];
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// 岛屿数量 1.dfs
// function numIslands(grid) {
//   let count = 0;
//   let n = grid.length;
//   if (n === 0) return 0;
//   let m = grid[0].length;
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (grid[i][j] === '1') {
//         count++;
//         recursion(grid, i, j);
//       }
//     }
//   }
//   function recursion(grid, i, j) {
//     if (i < 0 || j < 0 || i >= n || m >= m || grid[i][j] === '0') return;
//     grid[i][j] = '0';
//     recursion(grid, i - 1, j);
//     recursion(grid, i + 1, j);
//     recursion(grid, i, j - 1);
//     recursion(grid, i, j + 1);
//   }
//   return count;
// }
// 二分查找代码模版
// function binarySearch(arr, target) {
//   let left = 0;
//   let right = arr.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (arr[mid] === target) {
//       return mid;
//     } else if (arr[mid] < target) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
// }
// x的平方根 1.二分查找 O(logn)
// function mySqrt(x) {
//   if (x === 0 || x === 1) return x;
//   let left = 0;
//   let right = x;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === x) {
//       return mid;
//     } else if (mid * mid < x) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return right;
// }
// function mySqrt(x) {
//   let r = x;
//   while (r * r > x) {
//     r = (r + x / r) / 2 | 0; 
//   }
//   return r;
// }
// function maxProfit(prices) {
//   let res = 0;
//   for (let i = 0; i < prices.length - 1; i++) {
//     if (prices[i] < prices[i + 1]) {
//       res += prices[i + 1] - prices[i];
//     }
//   }
//   return res;
// }
// 深度优先搜索代码模版
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   dfs(root.left);
//   dfs(root.right);
// }
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   for (let node of root.children) {
//     dfs(node);
//   }
// }
// function dfs(root) {
//   if (root == null) return;
//   let stack = [root];
//   let visited = new Set();
//   while (stack.length) {
//     let node = stack.pop();
//     if (visited.has(node)) continue;
//     visited.add(node);
//     for (let i = node.children.length - 1; i >= 0; i--) {
//       stack.push(node.children[i]);
//     }
//   }
// }
// 广度优先搜索代码模版
// function bfs(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let n = q.length;
//     let res = [];
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// 岛屿数量 1.dfs
// function numIslands(grid) {
//   let n = grid.length;
//   if (n === 0) return 0;
//   let m = grid[0].length;
//   let count = 0;
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (grid[i][j] === '1') {
//         count++;
//         recursion(grid, i, j);
//       }
//     }
//   }
//   function recursion(grid, i, j) {
//     if (i < 0 || j < 0 || i >= n || j >= m || grid[i][j] === '0') return;
//     grid[i][j] = '0';
//     recursion(grid, i - 1, j);
//     recursion(grid, i + 1, j);
//     recursion(grid, i, j - 1);
//     recursion(grid, i, j + 1);
//   }
//   return count;
// }
// 买卖股票最佳时机
// function maxProfit(prices) {
//   let money = 0;
//   for (let i = 0; i < prices.length - 1; i++) {
//     if (prices[i + 1] > prices[i]) {
//       money += prices[i + 1] - prices[i];
//     }
//   }
//   return money;
// }
// 二分查找代码模版
// function binarySearch(arr, target) {
//   let left = 0;
//   let right = arr.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (arr[mid] === target) {
//       return mid;
//     } else if (arr[mid] < target) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
// }
// x的平方根
// function mySqrt(x) {
//   if (x === 0 || x === 1) return x;
//   let left = 0;
//   let right = x;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === x) {
//       return mid;
//     } else if (mid * mid < x) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return right;
// }
// function mySqrt(x) {
//   let r = x;
//   while (r * r > x) {
//     r = (r + x / r) / 2 | 0;
//   }
//   return r;
// }
// 有效的完全平方数 1.二分查找 
// function isPerfectSquare(num) {
//   let left = 0;
//   let right = num;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === num) {
//       return true;
//     } else if (mid * mid < num) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return false;
// }
// 搜索旋转排序数组 1.暴力枚举 O(n) 2.二分查找 O(logn)
// function search(nums, target) {
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === target) return i;
//   }
//   return -1;
// }
// function search(nums, target) {
//   let left = 0;
//   let right = nums.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (nums[mid] === target) {
//       return mid;
//     } else if (nums[left] <= nums[mid]) {
//       if (target >= nums[left] && target <= nums[mid]) {
//         right = mid - 1;
//       } else {
//         left = mid + 1;
//       }
//     } else {
//       if (target >= nums[mid] && target <= nums[right]) {
//         left = mid + 1;
//       } else {
//         right = mid - 1;
//       }
//     }
//   }
//   return -1;
// }
// function search(nums, target) {
//   let left = 0;
//   let right = nums;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (nums[mid] === target) {
//       return mid;
//     }
//     if (nums[left] <= nums[mid]) {
//       if (target >= nums[left] && target <= nums[mid]) {
//         right = mid - 1;
//       } else {
//         left = mid + 1;
//       }
//     } else {
//       if (target >= nums[mid] && target <= nums[right]) {
//         left = mid + 1;
//       } else {
//         right = mid - 1;
//       }
//     }
//   }
//   return -1;
// }
// 深度优先搜索代码模版
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   dfs(root.left);
//   dfs(root.right);
// }
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   for (let node of root.children) {
//     dfs(node);
//   }
// }
// function dfs(root) {
//   if (root == null) return;
//   let stack = [root];
//   let visited = new Set();
//   while (stack.length) {
//     let node = stack.pop();
//     if (visited.has(node)) continue;
//     visited.add(node);
//     for (let i = node.children.length - 1; i >= 0; i--) {
//       stack.push(node.children[i]);
//     }
//   }
// }
// 广度优先搜索代码模版
// function bfs(root) {
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let n = q.length;
//     let res = [];
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// 买卖股票最佳时机
// function maxProfit(prices) {
//   let money = 0;
//   for (let i = 0; i < prices.length - 1; i++) {
//     if (prices[i] < prices[i + 1]) {
//       money += prices[i + 1] - prices[i];
//     }
//   }
//   return money;
// }
// 二分查找代码模版
// function binarySearch(arr, target) {
//   let left = 0;
//   let right = arr.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (arr[mid] === target) {
//       return mid;
//     } else if (arr[mid] < target) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
// }
// x的平方根 1.二分查找 2.牛顿迭代法
// function mySqrt(x) {
//   if (x === 0 || x === 1) return x;
//   let left = 0;
//   let right = x;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === x) {
//       return mid;
//     } else if (mid * mid < x) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return right;
// }
// 有效的完全平方数
// function isPerfectSquare(num) {
//   let left = 0;
//   let right = num;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === num) {
//       return true;
//     } else if (mid * mid < num) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return false;
// }
// 搜索旋转排序数组 1.暴力枚举 O(n) 2.二分查找 O(logn)
// function search(nums, target) {
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === target) return i;
//   }
//   return -1;
// }
// function search(nums, target) {
//   let left = 0;
//   let right = nums.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (nums[mid] === target) return mid;
//     if (nums[left] <= nums[mid]) {
//       if (target >= nums[left] && target <= nums[mid]) {
//         right = mid - 1;
//       } else {
//         left = mid + 1;
//       }
//     } else {
//       if (target >= nums[mid] && target <= nums[right]) {
//         left = mid + 1;
//       } else {
//         right = mid - 1;
//       }
//     }
//   }
//   return -1;
// }
// 0 1 2 3 5 8 13 21 34 55
// function fib(n) {
// 	let a = [];
//   a[0] = 0;
//   a[1] = 1;
//   for (let i = 2; i <= n; i++) {
//     a[i] = a[i - 1] + a[i - 2];
//   }
//   return a[n];
// }
// console.log(fib(45))
// 深度优先搜索代码模版
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   dfs(root.left);
//   dfs(root.right);
// }
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   for (let node of root.children) {
//     dfs(node);
//   }
// }
// function dfs(root) {
//   if (root == null) return;
//   let visited = new Set();
//   let stack = [root];
//   while (stack.length) {
//     let node = stack.pop();
//     if (visited.has(node)) continue;
//     visited.add(node);
//     for (let i = node.children.length - 1; i >= 0; i--) {
//       stack.push(node.children[i]);
//     }
//   }
// }
// function dfs(root) {
//   if (root == null) return;
//   let stack = [root];
//   let visited = new Set();
//   while (stack.length) {
//     let node = stack.pop();
//     if (visited.has(node)) continue;
//     visited.add(node);
//     for (let i = node.children.length - 1; i >= 0; i--) {
//       stack.push(node.children[i]);
//     }
//   }
// }
// 广度优先搜索代码模版
// function dfs(root) {
//   if (root == null) return;
//   let stack = [root];
//   let visited = new Set();
//   while (stack.length) {
//     let node = stack.pop();
//     if (visited.has(node)) continue;
//     visited.add(node);
//     for (let i = node.children.length; i >= 0; i--) {
//       stack.push(node.children[i]);
//     }
//   }
// }
// 广度优先搜索代码模版
// function bfs(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let res = [];
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// 买卖股票最佳时机 1.贪心 O(n)
// function maxProfit(prices) {
//   let res = 0;
//   for (let i = 0; i < prices.length - 1; i++) {
//     if (prices[i] < prices[i + 1]) {
//       res += prices[i + 1] - prices[i];
//     }
//   }
//   return res;
// }
// 二分查找代码模版
// function binarySearch(arr, target) {
//   let left = 0;
//   let right = arr.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (arr[mid] === target) {
//       return mid;
//     } else if (arr[mid] < target) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return -1;
// }
// x的平方根 1.二分查找
// function mySqrt(x) {
//   if (x === 0 || x === 1) return x;
//   let left = 0;
//   let right = x;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === x) {
//       return mid;
//     } else if (mid * mid < x) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return right;
// }
// 有效的完全平方数 1.二分查找
// function isPerfectSquare(num) {
//   let left = 0;
//   let right = num;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === nums) {
//       return true;
//     } else if (mid * mid < num) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return false;
// }
// 搜索旋转排序数组 1.暴力枚举 O(n) 2.二分查找 O(logn)
// function search(nums, target) {
//     for (let i = 0; i < nums.length; i++) {
//       if (nums[i] === target) return i;
//     }
//     return -1;
// }
// function search(nums, target) {
//   let left = 0;
//   let right = nums.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (nums[mid] === target) return mid;
//     if (nums[left] <= nums[mid]) {
//       if (target >= nums[left] && targe <= nums[mid]) {
//         right = mid - 1;
//       } else {
//         left = mid + 1;
//       }
//     } else {
//       if (target >= nums[mid] && target <= nums[right]) {
//         left = mid + 1;
//       } else {
//         right = mid - 1;
//       }
//     }
//   }
//   return -1;
// }
// 斐波那契数列 1.傻递归 O(n*2) 2.记忆化递归 O(n) 3.动态规划 O(n)
// function fib(n) {
//   if (n <= 1) return n;
//   return fib(n - 1) + fib(n - 2);
// }
// function fib(n) {
//   let a = [];
//   a[0] = 0;
//   a[1] = 1;
//   for (let i = 2; i <= n; i++) {
//     a[i] = (a[i - 1] + a[i - 2]) % 1000000007;
//   }
//   return a[n];
// }
// function fib(n) {
//   let a = [];
//   function recursion(n) {
//     if (n <= 1) a[n] = n;
//     if (a[n] == null) a[n] = (recursion(n - 1) + recursion(n - 2)) % 1000000007;
//   }
//   recursion(n)
//   return a[n];
// }
// console.log(fib(5))
// let a = [];
// function fib(n) {
//   if (n <= 1) return n;
//   if (a[n] == null) a[n] = (fib(n - 1) + fib(n - 2));
//   return a[n];
// }
// 斐波那契数列 1.暴力递归 O(2*n) 2.记忆化递归 O(n) 3.动态规划 O(n)
// function fib(n) {
//   if (n <= 1) return n;
//   return (fib(n - 1) + fib(n - 2)) % 1000000007;
// }
// let a = [];
// function fib(n) {
//   if (n <= 1) return n;
//   if (a[n] == null) a[n] = (fib(n - 1) + fib(n - 2)) % 1000000007;
//   return a[n];
// }
// function fib(n) {
//   let a = [];
//   if (n <= 1) return n;
//   function recursion(n) {
//     if (n <= 1) return n;
//     if (a[n] == null) a[n] = (recursion(n - 1) + recursion(n - 2)) % 1000000007;
//     return a[n];
//   }
//   recursion(n);
//   return a[n];
// }
// function fib(n) {
//   let a = [];
//   a[0] = 0;
//   a[1] = 1;
//   for (let i = 2; i <= n; i++) {
//     a[i] = (a[i - 1] + a[i - 2]) % 7;
//   }
//   return a[n];
// // }
// uniquePathsWithObstacles = function(obstacleGrid) {
//   let a = [];
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   a[n - 1] = [];
//   a[n - 1][m - 1] = 1;
//   for (let i = n - 1; i >= 0; i--) {
//     a[i] = [];
//     for (let j = m - 1; j >= 0; j--) {
//         if (obstacleGrid[i][j] === 0) {
          
//             if (i === n - 1) {
//                 a[i][j] = a[i][j + 1];
//                 break;
//             }
//             if (j === m - 1) {
//                 a[i][j] = a[i + 1][j];
//                 break;
//             }
//             a[i][j] = a[i + 1, j] + a[i, j + 1];
//         } else {
//             a[i][j] = 0;
//         }
//     }
//   }
//   console.log(a)
//   return a[0][0];
// }
// console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]]));
// var uniquePathsWithObstacles = function(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     let value = 0;
//     if (i === n - 1){
//       value = recursion(i, j + 1);
//     } else if (j === m - 1) {
// 		value = recursion(i + 1, j);
//     } else {
// 	    value = recursion(i + 1, j) + recursion(i, j + 1);
//     }
//     return value;
//   }
//   return recursion(0, 0);
  
// };
// console.log(uniquePathsWithObstacles([
//   [0, 0, 0],
//   [0, 1, 0],
//   [0, 0, 0],
// ]))
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = new Array(n + 1);
//   a[1] = 1;
//   for (let i = 0; i < n; i++) {
//     for (let j = 1; j <= m; j++) {
//       if (obstacleGrid[i][j] === 1) {
//         a[j] = 0;
//       } else {
//         a[j] += a[j - 1];
//       }
//     }
//   }
//   return a[m];
// }
// 二叉树的层序遍历 1.bfs 2.dfs
// function levelOrder(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let res = [];
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// function levelOrder(root) {
//   let a = [];
//   function dfs(root, index) {
//     if (root == null) return;
//     a[index] ? a[index].push(root.val) : a[index] = [root.val];
//     dfs(root.left, index + 1);
//     dfs(root.right, index + 1);
//   }
//   dfs(root, 0);
//   return a;
// }
// 买卖股票最佳时机 1.贪心 O(n)
// function maxProfit(prices) {
//   let res = 0;
//   for (let i = 0; i < prices.length - 1; i++) {
//     if (prices[i] < prices[i + 1]) res += prices[i + 1] - prices[i];
//   }
//   return res;
// }
// 二分查找代码模版
// function binarySearch(arr, target) {
//   let left = 0;
//   let right = arr.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (arr[mid] === target) {
//       return mid;
//     } else if (arr[mid] < target) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return -1;
// }
// x的平方根 1.二分查找
// function mySqrt(x) {
//   if (x === 0 || x === 1) return x;
//   let left = 0;
//   let right = x;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === x) {
//       return mid;
//     } else if (mid * mid < x) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return right;
// }
// 有效的完全平方数 1.二分查找
// function isPerfectSquare(num) {
//   let left = 0;
//   let right = num.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === num) {
//       return true;
//     } else if (mid * mid < num) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return false;
// }
// 搜索旋转排序数组 1.暴力枚举 O(n) 2.二分查找 O(logn)
// function search(nums, target) {
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === target) return i;
//   }
//   return -1;
// }
// function search(nums, target) {
//   let left = 0;
//   let right = nums.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (nums[mid] === target) return mid;
//     if (nums[left] < nums[mid]) {
//       if (target >= nums[left] && target <= nums[mid]) {
//         right = mid - 1;
//       } else {
//         left = mid + 1;
//       }
//     } else {
//       if (target >= nums[mid] && target <= nums[right]) {
//         left = mid + 1;
//       } else {
//         right = mid - 1;
//       }
//     }
//   }
//   return -1;
// }
// 斐波那契数列 1.暴力递归 O(n^2) 2.记忆化递归 O(n) 3.动态规划 O(n)
// function fib(n) {
//   if (n <= 1) return n;
//   return (fib(n - 1) + fib(n - 2)) % 1000000007;
// }
// function fib(n) {
//   let a = [];
//   function recursion(n) {
//     if (n <= 1) return n;
//     if (a[n] == null) a[n] = (recursion(n - 1) + recursion(n - 2)) % 1000000007;
//     return a[n];
//   }
//   return recursion(n);
// }
// function fib(n) {
//   let a = [];
//   a[0] = 0;
//   a[1] = 1;
//   for (let i = 2; i <= n; i++) {
//     a[i] = (a[i - 1] + a[i - 2]) % 1000000007;
//   }
//   return a[n];
// }
// function fib(n) {
//   if (n <= 1) return 1;
//   let a = 0;
//   let b = 1;
//   let r;
//   for (let i = 2; i <= n; i++) {
//     r = (a + b) % 1000000007;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// 不同路径2 1.递归 2.记忆化递归 3.动态规划
// f(i, j) = f(i + 1, j) + f(i, j + 1)
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     if (i === n - 1) return recursion(i, j + 1);
//     if (j === m - 1) return recursion(i + 1, j);
//     return recursion(i + 1, j) + recursion(i, j + 1);
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     let value = 0;
//     if (i === n - 1) {
//       value = recursion(i, j + 1);
//     } else if (j === m - 1) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i + 1, j) + recursion(i, j + 1);
//     }
//     a[i][j] = value;
//     return value;
//   }
//   return recursion(0, 0);
// }
// 在每个树行中找最大值 1.bfs 2.dfs
// function largestValues(root) {
//   if (root == null) return [];
//   let a = [];
//   let q = [root];
//   while (q.length) {
//     let max = -Infinity;
//     let n = q.length;
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       max = Math.max(max, node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(max);
//   }
//   return a;
// }
// function largestValues(root) {
//   let a = [];
//   function dfs(root, index) {
//     if (root == null) return;
//     a[index] = a[index] == null ?  root.val : Math.max(a[index], root.val);
//     dfs(root.left, index + 1);
//     dfs(root.right, index + 1);
//   }
//   dfs(root, 0);
//   return a;
// }
// 买卖股票最佳时机 1.贪心
// function maxProfit(prices) {
//   let res = 0;
//   for (let i = 0; i < prices.length - 1; i++) {
//     if (prices[i] < prices[i + 1]) {
//       res += prices[i + 1] - prices[i];
//     }
//   }
//   return res;
// }
// 二分查找代码模版
// function binarySearch(arr, target) {
//   let left = 0;
//   let right = arr.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (arr[mid] === target) {
//       return mid;
//     } else if (arr[mid] < target) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return -1;
// }
// x的平方根
// function mySqrt(x) {
//   if (x === 0 || x === 1) return x;
//   let left = 0;
//   let right = x;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === x) {
//       return mid;
//     } else if (mid * mid < x) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return right;
// }
// 有效的完全平方数
// function isPerfectSquare(num) {
//   let left = 0;
//   let right = num;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === num) {
//       return true;
//     } else if (mid * mid < num) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return false;
// }
// 搜索旋转排序数组
// function search(nums, target) {
//   let left = 0;
//   let right = nums.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (nums[mid] === target) return mid;
//     if (nums[left] <= nums[mid]) {
//       if (target >= nums[left] && target <= nums[mid]) {
//         right = mid - 1;
//       } else {
//         left = mid + 1;
//       }
//     } else {
//       if (target >= nums[mid] && target <= nums[right]) {
//         left = mid + 1;
//       } else {
//         right = mid - 1;
//       }
//     }
//   }
//   return -1;
// }
// 斐波那契数列 1.暴力递归(自顶向下) O(2*n) 2.记忆化递归(自顶向下) O(n) 3.动态规划(自底向上) O(n)
// function fib(n) {
//   if (n <= 1) return n;
//   return fib(n - 1) + fib(n - 2);
// }
// function fib(n) {
//   let a = [];
//   function recursion(n) {
//     if (n <= 1) return n;
//     if (a[n] == null) a[n] = (fib(n - 1) + fib(n - 2)) % 1000000007;
//     return a[n]; 
//   }
//   return recursion(n);
// }
// function fib(n) {
//   let a = [];
//   a[0] = 0;
//   a[1] = 1;
//   for (let i = 2; i <= n; i++) {
//     a[i] = (a[i - 1] + a[i - 2]) % 1000000007;
//   }
//   return a[n];
// }
// function fib(n) {
//   if (n <= 1) return n;
//   let a = 0;
//   let b = 1;
//   let r;
//   for (let i = 0; i < n - 2; i++) {
//     r = (a + b) % 1000000007;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// 不同路径2 1.暴力递归(自顶向下) O(2^n) 2.记忆化递归(自顶向下) O(n) 3.动态规划(自底向上) O(n)
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     if (i === n - 1) return recursion(i, j + 1);
//     if (j === m - 1) return recursion(i + 1, j);
//     return recursion(i + 1, j) + recursion(i, j + 1);
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     let value = 0;
//     if (i === n - 1) {
//       value = recursion(i, j + 1);
//     } else if (j === m - 1) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i + 1, j) + recursion(i, j+ 1);
//     } 
//     a[i][j] = value;
//     return value;
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     let value = 0;
//     if (i === n - 1) {
//       value = recursion(i, j + 1);
//     } else if (j === m - 1) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i, j + 1) + recursion(i + 1, j);
//     }
//     a[i][j] = value;
//     return value;
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = n - 1; i >= 0; i--) {
//     for (let j = m - 1; j >= 0; j--) {
//       if (a[i] == null) a[i] = [];
//       if (obstacleGrid[i][j] === 1) {
//         a[i][j] = 0;
//       } else {
//         if (i === n - 1 && j === m - 1) {
//           a[i][j] = 1;
//         } else if (i === n - 1) {
//           a[i][j] = a[i][j + 1];
//         } else if (j === m - 1) {
//           a[i][j] = a[i + 1][j];
//         } else {
//           a[i][j] = a[i + 1][j] + a[i][j + 1];
//         }
//       }
//     }
//   }
//   return a[0][0];
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = 0; i < n; i++) {
//     a[i] = [];
//     for (let j = 0; j < m; j++) {
//       if (obstacleGrid[i][j] === 1) {
//         a[i][j] = 0;
//       } else {
//         if (i === 0 && j === 0) {
//           a[i][j] = 1;
//         } else if (i === 0) {
//           a[i][j] = a[i - 1][j];
//         } else if (j === 0) {
//           a[i][j] = a[i][j - 1];
//         } else {
//           a[i][j] = a[i][j - 1] + a[i - 1][j];
//         }
//       }
//     }
//   }
//   return a[n - 1][m - 1];
// }
// 买卖股票的最佳时机2 1.贪心 O(n)
// function maxProfit(prices) {
//   let res = 0;
//   for (let i = 0; i < prices.length - 1; i++) {
//     if (prices[i + 1] - prices[i]) {
//       res += prices[i + 1] - prices[i];
//     }
//   }
//   return res;
// }
// x的平方根 1.二分查找
// function mySqrt(x) {
//   if (x === 0 || x === 1) return x;
//   let left = 0;
//   let right = x;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === x) {
//       return mid;
//     } else if (mid * mid < x) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return right;
// }
// 有效的完全平方数 1.二分查找
// function isPerfectSquare(num) {
//   let left = 0;
//   let right = num;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === num) {
//       return true;
//     } else if (mid * mid < num) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return false;
// }
// 搜索旋转排序数组 1.暴力枚举 O(n) 2.二分查找 O(logn)
// function search(nums, target) {
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === target) return i;
//   }
//   return -1;
// }
// function search(nums, target) {
//   let left = 0;
//   let right = nums.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (nums[mid] === target) return mid;
//     if (nums[left] <= nums[mid]) {
//       if (target >= nums[left] && target <= nums[mid]) {
//         right = mid - 1;
//       } else {
//         left = mid + 1;
//       }
//     } else {
//       if (target >= nums[mid] && target <= nums[right]) {
//         left = mid + 1;
//       } else {
//         right = mid - 1;
//       }
//     }
//   }
//   return -1;
// }
// 斐波那契数列 1.暴力递归（自顶向下） O(n^2) 2.记忆化递归（自顶向下） O(n) 3.动态规划（自底向上） O(n)
// function fib(n) {
//   if (n <= 1) return n;
//   return fib(n - 1) + fib(n - 2);
// }
// function fib(n) {
//   let a = [];
//   function recursion(n) {
//     if (n <= 1) return n;
//     if (a[n] == null) a[n] = (recursion(n - 1) + recursion(n - 2)) % 1000000007;
//     return a[n];
//   }
//   return recursion(n);
// }
// function fib(n) {
//   let a = [];
//   a[0] = 0;
//   a[1] = 1;
//   for (let i = 2; i <= n; i++) {
//     a[i] = a[i - 1] + a[i - 2];
//   }
//   return a[n];
// }
// function fib(n) {
//   if (n <= 1) return n;
//   let a = 0;
//   let b = 1;
//   let r;
//   for (let i = 2; i <= n; i++) {
//     r = a + b;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// 不同路径2 1.暴力递归（自顶向下）O(n^2) 2.记忆化递归（自顶向下）O(n) 3.动态规划（自底向上）O(n)
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length - 1;
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     let value = 0;
//     if (i === n - 1) {
//       value = recursion(i, j + 1);
//     } else if (j === m - 1) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i + 1, j) + recursion(i, j + 1);
//     }
//     return value;
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] == null) {
//       let value = 0;
//       if (i === n - 1) {
//         value = recursion(i, j + 1);
//       } else if (j === m - 1) {
//         value = recursion(i + 1, j);
//       } else {
//         value = recursion(i, j + 1) + recursion(i + 1, j);
//       }
//       a[i][j] = value;
//     }
//     return a[i][j];
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = n - 1; i >= 0; i--) {
//     a[i] = [];
//     for (let j = m - 1; j >= 0; j--) {
//       if (obstacleGrid[i][j] === 1) {
//         a[i][j] = 0;
//       } else if (i === n - 1 && j === m - 1) {
//         a[i][j] = 1;
//       } else if (i === n - 1) {
//         a[i][j] = a[i][j + 1];
//       } else if (j === m - 1) {
//         a[i][j] = a[i + 1][j];
//       } else {
//         a[i][j] = a[i + 1][j] + a[i][j + 1];
//       }
//     }
//   }
//   return a[0][0];
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = 0; i < n; i++) {
//     a[i] = [];
//     for (let j = 0; j < m; j++) {
//       if (obstacleGrid[i][j] === 1) {
//         a[i][j] = 0;
//       } else if (i === 0 && j === 0) {
//         a[i][j] = 1;
//       } else if (i === 0) {
//         a[i][j] = a[i - 1][j];
//       } else if (j === 0) {
//         a[i][j] = a[i][j - 1];
//       } else {
//         a[i][j] = a[i - 1][j] + a[i][ j - 1];
//       }
//     }
//   }
//   return a[n - 1][m - 1];
// }
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i, j];
//     return Math.min(recursion(i + 1, j), recursion(i + 1, j + 1)) + triangle[i, j];
//   }
//   return recursion(0, 0);
// }
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   let a = [];
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i, j];
//     a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     let value = recursion(i + 1, j) + recursion(i + 1, j + 1);
//     a[i][j] = value;
//     return value;
//   }
//   return recursion(0, 0);
// }
// function minimumTotal(triangle) {
//   for (let i = triangle.length - 2; i >= 0; i--) {
//     for (let j = 0; j < triangle[i].length; j++) {
//       triangle[i][j] += Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]);
//     }
//   }
//   return triangle[0][0];
// }
// 搜索旋转排序数组 1.二分查找
// function search(nums, target) {
//   let left = 0;
//   let right = nums.length;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (nums[mid] === target) return mid;
//     if (nums[left] <= nums[mid]) {
//       if (target >= nums[left] && target <= nums[mid]) {
//         right = mid - 1;
//       } else {
//         left = mid + 1;
//       }
//     } else {
//       if (target >= nums[mid] && target <= nums[right]) {
//         left = mid + 1;
//       } else {
//         right = mid - 1;
//       }
//     }
//   }
//   return -1;
// }
// 斐波那契数列 1.暴力递归（自顶向下）O(n^2) 2.记忆化递归（自顶向下）O(n) 3.动态规划（自底向上）O(n)
// function fib(n) {
//   if (n <= 1) return n;
//   return fib(n - 1) + fib(n - 2);
// }
// function fib(n) {
//   let a = [];
//   function recursion(n) {
//     if (n <= 1) return n;
//     if (a[n] != null) return a[n];
//     a[n] = (recursion(n - 1) + recursion(n - 2)) % 1000000007;
//     return a[n];
//   }
//   return recursion(n);
// }
// function fib(n) {
//   let a = [];
//   a[0] = 0;
//   a[1] = 1;
//   for (let i = 2; i <= n; i++) {
//     a[i] = a[i - 1] + a[i - 2];
//   }
//   return a[n];
// }
// function fib(n) {
//   if (n <= 1) return n;
//   let a = 0;
//   let b = 1;
//   let r;
//   for (let i = 2; i <= n; i++) {
//     r = a + b;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// 不同路径2 1.暴力递归（自顶向下）O(n^2) 2.记忆化递归（自底向上）O(n) 3.动态规划（自底向上）O(n)
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === 0 && j === 0) return 1;
//     let value = 0;
//     if (i === 0) {
//       value = recursion(i, j + 1);
//     } else if (j === 0) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i + 1, j) + recursion(i, j + 1);
//     }
//     return value;
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     let value = 0;
//     if (i === n - 1) {
//       value = recursion(i, j + 1);
//     } else if (j === m - 1) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i + 1, j) + recursion(i, j + 1);
//     }
//     a[i][j] = value;
//     return value;
//   }
//   recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = n - 1; i >= 0; i--) {
//     a[i] = [];
//     for (let j = m - 1; j >= 0; j--) {
//       if (obstacleGrid[i][j] === 1) {
//         a[i][j] = 0;
//       } else {
//         if (i === n - 1 && j === m - 1) {
//           a[i][j] = 1;
//         } else if (i === n - 1) {
//           a[i][j] = a[i][j + 1];
//         } else if (j === m - 1) {
//           a[i][j] = a[i + 1][j];
//         } else {
//           a[i][j] = a[i + 1][j] + a[i][j + 1];
//         }
//       }
//     }
//   }
//   return a[0][0];
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = 0; i < n; i++) {
//     a[i] = [];
//     for (let j = 0; j < m; j++) {
//       if (obstacleGrid[i][j] === 1) {
//         a[i][j] = 0;
//       } else {
//         if (i === 0 && j === 0) {
//           a[i][j] = 1;
//         } else if (i === 0) {
//           a[i][j] = a[i][j - 1];
//         } else if (j === 0) {
//           a[i][j] = a[i - 1][j];
//         } else {
//           a[i][j] = a[i - 1][j] + a[i][j - 1];
//         }
//       }
//     }
//   }
//   return a[n - 1][m - 1];
// }
// 三角形最小路径和 1.暴力递归（自顶向下） O(n) 2.记忆化递归（自顶向下）O(n) 3.动态规划（自底向上） O(n)
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i, j];
//     return Math.min(recursion(i + 1, j), recursion(i + 1, j + 1)) + triangle[i][j];
//   }
//   return recursion(0, 0);
// }
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   let a = [];
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i][j];
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     a[i][j] = Math.min(recursion(i + 1, j), recursion(i + 1, j + 1)) + triangle[i][j];
//     return a[i][j]; 
//   }
//   return recursion(0, 0);
// }
// function minimumTatal(triangle) {
//   let n = triangle.length;
//   let a = [];
//   for (let i = n - 2; i >= 0; i--) {
//     a[i] = [];
//     for (let j = 0; j < triangle[i].length; j++) {
//       a[j] = Math.min(a[j], a[j + 1]) + triangle[i + 1][j + 1];
//     }
//   }
//   return a[0];
// }
// function maxSubArray(nums) {
//   let a = nums;
//   for (let i = 1; i < nums.length; i++) {
//     a[i] = Math.max(nums[i], nums[i] + a[i - 1]);
//   }
//   return Math.max.apply(null, a);
// }
// function coinChange(coins, amount) {
//   let a = [];
//   for (let i = 0; i < coins.length; i++) {
//     a[i] = coins[i];
//   }
//   for (let i = 0; i < amount; i++) {
//     a[i] = a[i - 1] + 
//   }
// }
// 岛屿数量 1.dfs
// function numIslands(grid) {
//   let n = grid.length;
//   if (n === 0) return 0;
//   let count = 0;
//   let m = grid[0].length;
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (grid[i][j] === '1') {
//         count++;
//         recursion(grid, i, j);
//       }
//     }
//   }
//   function recursion(grid, i, j) {
//     if (i < 0 || j < 0 || i > n - 1 || j > m - 1 || grid[i][j] === '0') return;
//     grid[i][j] = '0';
//     recursion(grid, i - 1, j);
//     recursion(grid, i + 1, j);
//     recursion(grid, i, j - 1);
//     recursion(grid, i, j + 1);
//   }
//   return count;
// }
// 斐波那契数列 1.暴力递归（自顶向下）O(2^n) 2.记忆化递归(自顶向下) O(n) 3.动态规划 O(n)
// function fib(n) {
//   if (n <= 1) return n;
//   return fib(n - 1) + fib(n - 2);
// }
// function fib(n) {
//   let a = [];
//   function recursion(n) {
//     if (n <= 1) return n;
//     if (a[n] != null) return a[n];
//     a[n] = fib(n - 1) = fib(n - 2);
//     return a[n];
//   }
//   return recursion(n);
// }
// function fib(n) {
//   if (n <= 1) return n;
//   let a = [];
//   a[0] = 0;
//   a[1] = 1;
//   for (let i = 2; i <= n; i++) {
//     a[i] = (a[i - 1] + a[i - 2]) % 1000000007;
//   }
//   return a[n];
// }
// function fib(n) {
//   if (n <= 1) return n;
//   let a = 0;
//   let b = 1;
//   let r;
//   for (let i = 2; i <= n; i++) {
//     r = a + b;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// 不同路径2 1.暴力递归（自顶向下）O(2^n) 2.记忆化递归（自顶向下）O(n) 3.动态规划 O(n) 
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     let value = 0;
//     if (i === n - 1) {
//       value = recursion(i, j + 1);
//     } else if (j === m - 1) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i + 1, j) + recursion(i, j + 1); 
//     }
//     return value;
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     let value = 0;
//     if (i === n - 1) {
//       value = recursion(i, j + 1);
//     } else if (j = m - 1) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i + 1, j) + recursion(i, j + 1);
//     }
//     a[i][j] = value;
//     return value;
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = n - 1; i >= 0; i--) {
//     a[i] = [];
//     for (let j = m - 1; j >= 0; j--) {
//       if (obstacleGrid[i][j] === 1) {
//         a[i][j] = 0;
//       } else {
//         if (i === n - 1 && j === m - 1) {
//           a[i][j] = 1;
//         } else if (i === n - 1) {
//           a[i][j] = a[i][j + 1];
//         } else if (j === m - 1) {
//           a[i][j] = a[i + 1][j];
//         } else {
//           a[i][j] = a[i + 1][j] + a[i][j + 1];
//         }
//       }
//     }
//   }
//   return a[0][0];
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = 0; i < n; i++) {
//     a[i] = [];
//     for (let j = 0; j < m; j++) {
//       if (obstacleGrid[i][j] === 1) {
//         a[i][j] = 0;
//       } else {
//         if (i === 0 && j === 0) {
//           a[i][j] = 1;
//         } else if (i === 0) {
//           a[i][j] = a[i][j - 1];
//         } else if (j === 0) {
//           a[i][j] = a[i - 1][j];
//         } else {
//           a[i][j] = a[i - 1][j] + a[i][j - 1];
//         }
//       }
//     }
//   }
//   return a[n - 1][m - 1];
// }
// 三角形最小路径和 1.递归 2.记忆化递归 3.动态规划
// function minimumTatol(triangle) {
//   let n = triangle.length;
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i][j];
//     return Math.min(recursion(i + 1, j), recursion(i + 1, j + 1)) + triangle[i][j];
//   }
//   return recursion(0, 0);
// }
// 记忆化递归
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   let a = [];
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i][j];
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     a[i][j] = Math.min(recursion(i + 1, j), recursion(i + 1, j + 1)) + triangle[i][j];
//     return a[i][j];
//   }
//   return recursion(0, 0);
// }
// 动态规划
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   for (let i = n - 2; i >= 0; i--) {
//     for (let j = 0; j < triangle[i].length; j++) {
//       triangle[i][j] += Math.min(triangle[i][j + 1], triangle[i + 1][j + 1]);
//     }
//   }
//   return triangle[0][0];
// }
// 最大子序和 1.暴力枚举 2.递归 3.动态规划
// [-2,1,-3,4,-1,2,1,-5,4]
// function maxSubArray(nums) {
//   let max = -Infinity;
//   for (let i = 0; i < nums.length; i++) {
//     subMax = nums[i];
//     let sum = nums[i];
//     for (let j = i + 1; j < nums.length; j++) {
//       sum += nums[j];
//       subMax = Math.max(subMax, sum);
//     }
//     max = Math.max(max, subMax);
//   }
//   return max;
// }
// function maxSubArray(nums) {
//   for (let i = 1; i < nums.length; i++) {
//     nums[i] = Math.max(nums[i - 1] + nums[i], nums[i]);
//   }
//   return Math.max.apply(null, nums);
// }
// [-2,1,-3,4,-1,2,1,-5,4]
// function maxSubArray(nums) {
//   function recursion(index, a) {
//     if (index === 0) {
//       a[index] = nums[0];
//       return nums[0];
//     }
//     let max = Math.max(nums[index], recursion(index - 1, a) + nums[index]);
//     a[index] = max;
//     return max;
//   }
//   let a = recursion(nums.length - 1, []);
//   return Math.max.apply(null, a);
// }
// 最大子序和 1.暴力枚举 O(n^2) 2.递归 O(n) 3.动态规划
// function maxSubArray(nums) {
//   let max = -Infinity;
//   for (let i = 0; i < nums.length; i++) {
//     let subMax = nums[i];
//     let sum = nums[i];
//     for (let j = i + 1; j < nums.length; j++) {
//       sum += nums[j];
//       subMax = Math.max(subMax, sum);
//     }
//     max = Math.max(max, subMax);
//   }
//   return max;
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === 0) {
//       a.push(nums[0]);
//       return nums[0];
//     }
//     let max = Math.max(nums[index], recursion(index - 1) + nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(nums.length - 1);
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   for (let i = 1; i < nums.length; i++) {
//     nums[i] = Math.max(nums[i], nums[i] + nums[i - 1]);
//   }
//   return Math.max.apply(null, nums);
// }
// function maxSubArray(nums) {
//   for (let i = nums.length - 1; i > 0; i--) {
//     nums[i] = Math.max(nums[i], nums[i] + nums[i - 1]);
//   }
//   return Math.max.apply(null, nums);
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === nums.length - 1) {
//       a.push(nums[nums.length - 1]);
//       return nums[nums.length - 1];
//     }
//     let max = Math.max(nums[index], recursion(index + 1) + nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(0);
//   return Math.max.apply(null, a);
// }
// 斐波那契数列 1.递归（自顶向下）O(2^n) 2.记忆化递归（自顶向下）O(n) 3.动态规划(自底向上) O(n)
// function fib(n) {
//   if (n <= 1) return n;
//   return fib(n - 1) + fib(n - 2);
// }
// function fib(n) {
//   let a = [];
//   function recursion(n) {
//     if (n <= 1) return n;
//     if (a[n] != null) return a[n];
//     a[n] = (recursion(n - 1) + recursion(n - 2)) % 1000000007;
//     return a[n];
//   }
//   return recursion(n);
// }
// function fib(n) {
//   let a = [];
//   a[0] = 0;
//   a[1] = 1;
//   for (let i = 2; i <= n; i++) {
//     a[i] = (a[i - 1] + a[i - 2]) % 100000007;
//   }
//   return a[n];
// }
// function fib(n) {
//   if (n <= 1) return n;
//   let a = 0;
//   let b = 1;
//   let r = a + b;
//   for (let i = 2; i <= n; i++) {
//     r = (a + b) % 1000000007;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// 不同路径2 1.暴力递归（自顶向下）2.记忆化递归（自顶向下）3.动态规划
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     let value = 0;
//     if (i === n - 1) {
//       value = recursion(i, j + 1);
//     } else if (j === m - 1) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i + 1, j) + recursion(i, j + 1);
//     }
//     return value;
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     let value = 0;
//     if (i === n - 1) {
//       value = recursion(i, j + 1);
//     } else if (j === m - 1) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i + 1, j) + recursion(i, j + 1);
//     }
//     a[i][j] = value;
//     return value;
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = n - 1; i >= 0; i--) {
//     a[i] = [];
//     for (let j = m - 1; j >= 0; j--) {
//       if (obstacleGrid[i][j] === 1) {
//         a[i][j] = 0;
//       } else {
//         if (i === n - 1 && j === m - 1) {
//           a[i][j] = 1;
//         } else if (i === n - 1) {
//           a[i][j] = a[i][j + 1];
//         } else if (j === m - 1) {
//           a[i][j] = a[i + 1][j];
//         } else {
//           a[i][j] = a[i + 1][j] + a[i][j + 1];
//         }
//       }
//     }
//   }
//   return a[0][0];
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = 0; i < n; i++) {
//     a[i] = [];
//     for (let j = 0; j < m; j++) {
//       if (obstacleGrid[i][j] === 1) {
//         a[i][j] = 0;
//       } else {
//         if (i === 0 && j === 0) {
//           a[i][j] = 1;
//         } else if (i === 0) {
//           a[i][j] = a[i][j - 1];
//         } else if (j === 0) {
//           a[i][j] = a[i - 1][j];
//         } else {
//           a[i][j] = a[i - 1][j] + a[i][j - 1];
//         }
//       }
//     }
//   }
//   return a[n - 1][m - 1];
// }
// 三角形最小路径和 1.暴力递归 2.记忆化递归 3.动态规划
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i][j];
//     return Math.min(recursion(i + 1, j), recursion(i + 1, j + 1)) + triangle[i][j]; 
//   }
//   return recursion(0, 0);
// }
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   let a = [];
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i][j];
//     if (a[i] === null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     a[i][j] = Math.min(recursion(i + 1, j), recursion(i + 1, j + 1)) + triangle[i][j];
//     return a[i][j];
//   }
//   return recursion(0, 0);
// }
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   for (let i = n - 2; i >= 0; i--) {
//     for (let j = 0; i < triangle[i].length; j++) {
//       triangle[i][j] += Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]) + triangle[i][j];
//     }
//   }
//   return triangle[0][0];
// }
// 最大子序和 1.暴力枚举 2.递归 3.动态规划
// function maxSubArray(nums) {
//   let max = -Infinity;
//   for (let i = 0; i < nums.length; i++) {
//     let subMax = nums[i];
//     let sum = nums[i];
//     for (let j = i + 1; i < nums.length; j++) {
//       sum += nums[j];
//       subMax = Math.max(subMax, sum);
//     }
//     max = Math.max(max, subMax);
//   }
//   return max;
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === nums.length - 1) {
//       a.push(nums[nums.length - 1]);
//       return nums[nums.length - 1];
//     }
//     let max = Math.max(recursion(index + 1) + nums[index], nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(0);
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === 0) {
//       a.push(nums[0]);
//       return nums[0];
//     }
//     let max = Math.max(nums[index], recursion(index - 1) + nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(nums.length - 1);
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   for (let i = 1; i < nums.length; i++) {
//     nums[i] = Math.max(nums[i], nums[i - 1] + nums[i]);
//   }
//   return Math.max.apply(null, nums);
// }
// function maxSubArray(nums) {
//   for (let i = nums.length - 2; i >= 0; i--) {
//     nums[i] = Math.max(nums[i], nums[i + 1] + nums[i]);
//   }
//   return Math.max.apply(null, nums);
// }
// function maxSubArray(nums) {
//   let a = nums;
//   for (let i = 1; i < nums.length; i++) {
//     a[i] = Math.max(nums[i], a[i - 1] + nums[i]);
//   }
//   return Math.max.apply(null, a);
// }
// 深度优先搜索代码模版
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   dfs(root.left);
//   dfs(root.right);
// }
// let visited = new Set();
// function dfs(root) {
//   if (visited.has(root)) return;
//   visited.add(root);
//   for (let node of root.children) {
//     dfs(node);
//   }
// }
// function dfs(root) {
//   if (root == null) return;
//   let stack = [root];
//   let visited = new Set();
//   while (stack.length) {
//     let node = stack.pop();
//     if (visited.has(node)) continue;
//     visited.add(node);
//     for (let i = node.children.length - 1; i >= 0; i--) {
//       stack.push(node.children[i]);
//     }
//   }
// }
// 广度优先搜索代码模版
// function bfs(root) {
//   if (root == null) return [];
//   let q = [root];
//   let a = [];
//   while (q.length) {
//     let n = q.length;
//     let res = [];
//     for (let i = 0; i < n; i++) {
//       let node = q.shift();
//       res.push(node.val);
//       if (node.left) q.push(node.left);
//       if (node.right) q.push(node.right);
//     }
//     a.push(res);
//   }
//   return a;
// }
// 不同路径2 1.暴力递归（自顶向下）O(2^n) 2.记忆化递归（自顶向下）O(n) 3.动态规划（自底向上）O(n)
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     let value = 0;
//     if (i === n - 1) {
//       value = recursion(i, j + 1);
//     } else if (j === m - 1) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i + 1, j) + recursion(i, j + 1);
//     }
//     return value;
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     let value = 0;
//     if (i === n - 1) {
//       value = recursion(i, j + 1);
//     } else if (j === m - 1) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i + 1, j) + recursion(i, j + 1);
//     }
//     a[i][j] = value;
//     return value;
//   } 
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = n - 1; i >= 0; i--) {
//     for (let j = m - 1; j >= 0; j--) {
//       if (obstacleGrid[i][j] === 1) {
//         obstacleGrid[i][j] = 0;
//       } else {
//         if (i === n - 1 && j === m - 1) {
//           obstacleGrid[i][j] = 1;
//         } else if (i === n - 1) {
//           obstacleGrid[i][j] = obstacleGrid[i][j + 1];
//         } else if (j === m - 1) {
//           obstacleGrid[i][j] = obstacleGrid[i + 1][j];
//         } else {
//           obstacleGrid[i][j] = obstacleGrid[i + 1][j] + obstacleGrid[i][j + 1];
//         }
//       }
//     }
//   }
//   return obstacleGrid[0][0];
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (obstacleGrid[i][j] === 1) {
//         obstacleGrid[i][j] = 0;
//       } else {
//         if (i === 0 && j === 0) {
//           obstacleGrid[i][j] = 1;
//         } else if (i === 0) {
//           obstacleGrid[i][j] = obstacleGrid[i][j - 1];
//         } else if (j === 0) {
//           obstacleGrid[i][j] = obstacleGrid[i - 1][j];
//         } else {
//           obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1];
//         }
//       }
//     }
//   }
//   return obstacleGrid[n - 1][m - 1];
// }
// 三角形最小路径和 1.暴力递归 2.记忆化递归 3.动态规划
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i][j];
//     return Math.min(recursion(i + 1, j), recursion(i + 1, j + 1)) + triangle[i][j];
//   }
//   return recursion(0, 0);
// }
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   let a = [];
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i][j];
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     a[i][j] = Math.min(recursion(i + 1, j), recursion(i + 1, j + 1)) + triangle[i][j];
//     return a[i][j];
//   }
//   return recursion(0, 0);
// }
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   for (let i = n - 2; i >= 0; i--) {
//     for (let j = 0; j < triangle[i].length; j++) {
//       triangle[i][j] = Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]) + triangle[i][j];
//     }
//   }
//   return triangle[0][0];
// }
// 最大子序和 1.暴力枚举 2.递归 3.动态规划
// function maxSubArray(nums) {
//   let max = nums[i];
//   for (let i = 0; i < nums.length; i++) {
//     let sum = nums[i];
//     for (let j = i + 1; j < nums.length; j++) {
//       sum += nums[j];
//       max = Math.max(max, sum);
//     }
//   }
//   return max;
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === nums.length - 1) {
//       a.push(nums[nums.length - 1]);
//       return nums[nums.length - 1];
//     }
//     let max = Math.max(recursion(index + 1) + nums[index], nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(0);
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === 0) {
//       a.push(nums[index]);
//       return nums[index];
//     }
//     let max = Math.max(recursion(index - 1) + nums[index], nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(nums.length - 1);
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   for (let i = 1; i < nums.length; i++) {
//     nums[i] = Math.max(nums[i - 1] + nums[i], nums[i]);
//   }
//   return Math.max.apply(null, nums);
// }
// function maxSubArray(nums) {
//   let a = nums;
//   for (let i = nums.length - 2; i >= 0; i--) {
//     a[i] = Math.max(a[i + 1] + nums[i], nums[i]);
//   }
//   return Math.max.apply(null, nums);
// }
// 不同路径 1.暴力递归 2.记忆化递归 3.动态规划
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   function recursion(i, j) {
//     if (obstacleGrid[i, j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     let value = 0;
//     if (i === n - 1) {
//       value = recursion(i, j + 1);
//     } else if (j === m - 1) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i + 1, j) + recursion(i, j + 1);
//     }
//     return value;
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = []
//   function recursion(i, j) {
//     if (obstacleGrid[i][j] === 1) return 0;
//     if (i === n - 1 && j === m - 1) return 1;
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     let value = 0;
//     if (i === n - 1) {
//       value = recursion(i, j + 1);
//     } else if (j === m - 1) {
//       value = recursion(i + 1, j);
//     } else {
//       value = recursion(i + 1, j) + recursion(i, j + 1);
//     }
//     a[i][j] = value;
//     return value;
//   }
//   return recursion(0, 0);
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = n - 1; i >= 0; i--) {
//     a[i] = [];
//     for (let j = m - 1; j >= 0; j--) {
//       if (obstacleGrid[i][j] === 1) {
//         a[i][j] = 0;
//       } else {
//         if (i === n - 1 && j === m - 1) {
//           a[i][j] = 1
//         } else if (i === n - 1) {
//           a[i][j] = a[i][j + 1];
//         } else if (j === m - 1) {
//           a[i][j] = a[i + 1][j];
//         } else {
//           a[i][j] = a[i + 1][j] + a[i][j + 1];
//         }
//       }
//     }
//   }
//   return a[0][0];
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   let n = obstacleGrid.length;
//   let m = obstacleGrid[0].length;
//   let a = [];
//   for (let i = 0; i < n; i++) {
//     a[i] = [];
//     for (let j = 0; j < m; j++) {
//       if (obstacleGrid[i][j] === 1) {
//         a[i][j] = 0;
//       } else {
//         if (i === 0 && j === 0) {
//           a[i][j] = 1;
//         } else if (i === 0) {
//           a[i][j] = a[i][j - 1];
//         } else if (j === 0) {
//           a[i][j] = a[i - 1][j];
//         } else {
//           a[i][j] = a[i - 1][j] + a[i][j - 1];
//         }
//       }
//     }
//   }
//   return a[n - 1][m - 1];
// }
// 三角形最小路径和 1.暴力递归 2.记忆化递归 3.动态规划
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i][j];
//     return Math.min(recursion(i + 1, j), recursion(i + 1, j + 1)) + triangle[i][j];
//   }
//   return recursion(0, 0);
// }
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   let a = [];
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i][j];
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     a[i][j] = Math.min(recursion(i + 1, j), recursion(i + 1, j + 1)) + triangle[i][j];
//     return a[i][j];
//   }
//   return recursion(0, 0);
// }
// function minimumTotal(triangle) {
//   for (let i = triangle.length - 2; i >= 0; i--) {
//     for (let j = 0; j < triangle.length; j--) {
//       triangle[i][j] = Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]);
//     }
//   }
//   return triangle[0][0];
// }
// 最大子序和 1.暴力枚举 2.递归 3.动态规划
// function maxSubArray(nums) {
//   let max = -Infinity;
//   for (let i = 0; i < nums.length; i ++) {
//     let sum = nums[i];
//     max = nums[i];
//     for (let j = i + 1; j < nums.length; j++) {
//       sum += nums[j];
//       max = Math.max(max, sum);
//     }
//   }
//   return max;
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === 0) {
//       a.push(nums[index]);
//       return nums[index];
//     }
//     let max = Math.max(nums[index], recursion(index - 1) + nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(nums.length - 1);
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === nums.length - 1) {
//       a.push(nums[index]);
//       return nums[index];
//     }
//     let max = Math.max(nums[index], recursion(index + 1) + nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(0);
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   for (let i = 1; i < nums.length; i++) {
//     nums[i] = Math.max(nums[i], nums[i - 1] + nums[i]);
//   }
//   return Math.max.apply(null, nums);
// }
// function maxSubArray(nums) {
//   let a = nums;
//   for (let i = nums.length - 2; i >= 0; i--) {
//     a[i] = Math.max(nums[i], a[i + 1] + nums[i]);
//   }
//   return Math.max.apply(null, a);
// }
// 二分查找代码模版
// function binarySearch(nums, target) {
//   let left = 0;
//   let right = nums.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (nums[mid] === target) {
//       return mid;
//     } else if (nums[mid] < target) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return -1;
// }
// 三角形最小路径和 1.递归 2.记忆化递归 3.动态规划
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i][j];
//     return Math.min(triangle(i + 1, j), triangle(i + 1, j + 1)) + triangle[i][j];
//   }
//   return recursion(0, 0);
// }
// function minimumTotal(triangle) {
//   let n = triangle.length;
//   let a = []
//   function recursion(i, j) {
//     if (i === n - 1) return triangle[i][j];
//     if (a[i] == null) a[i] = [];
//     if (a[i][j] != null) return a[i][j];
//     a[i][j] = Math.min(recursion(i + 1, j), recursion(i + 1, j + 1)) + triangle;
//     return a[i][j];
//   }
//   return recursion(0, 0);
// }
// function minimumTotal(triangle) {
//   for (let i = triangle.length - 2; i >= 0; i--) {
//     for (let j = 0; j < triangle[i].length; j++) {
//       triangle[i][j] = Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]) + triangle[i][j];
//     }
//   }
//   return triangle[0][0];
// }
// 最大子序和 1.暴力枚举 2.递归 3.动态规划
// function MaxSubArray(nums) {
//   let max = 0;
//   for (let i = 0; i < nums.length; i++) {
//     let sum = nums[i];
//     let subMax = nums[i];
//     for (let j = i + 1; j < nums.length; j++) {
//       sum += nums[j];
//       subMax = Math.max(subMax, sum);
//     }
//     max = Math.max(max. subMax);
//   }
//   return max;
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === nums.length - 1) {
//       a.push(nums[index]);
//       return nums[index];
//     }
//     let max = Math.max(nums[index], recursion(index + 1) + nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(0);
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   let max = -Infinity;
//   for (let i = 0; i < nums.length; i++) {
//     let sum = nums[i];
//     max = Math.max(max, nums[i]);
//     for (let j = i + 1; j < nums.length; j++) {
//       sum += sum;
//       max = Math.max(max, sum);
//     }
//   }
//   return max;
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === 0) {
//       a.push(nums[index]);
//       return nums[index];
//     }
//     let max = Math.max(nums[index], recursion(index - 1) + nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(nums.length - 1);
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   for (let i = 1; i < nums.length; i++) {
//     nums[i] = Math.max(nums[i], nums[i - 1] + nums[i]);
//   }
//   return Math.max.apply(null, nums);
// }
// function maxSubArray(nums) {
//   let a = nums;
//   for (let i = nums.length - 2; i >= 0; i--) {
//     a[i] = Math.max(nums[i], a[i + 1] + nums[i]);
//   }
//   return Math.max.apply(null, a);
// }
// 选择排序
// function selectionSort(arr) {
//   let minIndex, c;
//   for (let i = 0; i < arr.length - 1; i++) {
//     minIndex = i;
// 		for (let j = i + 1; j < arr.length; j++) {
// 			if (arr[j] < arr[minIndex]) {
//         minIndex = j;
//       }
//     }
//     if (minIndex !== i) {
//       c = arr[i];
//       arr[i] = arr[minIndex];
//       arr[minIndex] = c;
//     }
//   }
//   return arr;
// }
// console.log(selectionSort([1,5,7,4,8,9,14,81,5,2,71,62]))
// function insertionSort(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i; j > 0; j--) {
//       // console.log('i', i)
//       // console.log('j', j)
//       if (arr[j] < arr[j - 1]) {
//         let c = arr[j - 1]
//         arr[j - 1] = arr[j];
//         arr[j] = c;
//       }
//     }
//   }
//   return arr;
// }
// console.log(insertionSort([1,5,7,4,8,9,14,81,5,2,71,62]));
// function bubbleSort(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr.length - i - 1; j++) {
//       if (arr[j + 1] < arr[j]) {
//         let c = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = c;
//       }
//     }
//   }
//   return arr;
// }
// console.log(bubbleSort([1,5,7,4,8,9,81,5,2,71,62]))
// 买卖股票的最佳时机2 1.贪心
// function maxProfit(prices) {
//   let count = 0;
//   for (let i = 0; i < prices.length - 1; i++) {
//     if (prices[i] < prices[i + 1]) {
//       count += prices[i + 1] - prices[i];
//     }
//   }
//   return count;
// }
// function mySqrt(x) {
//   let left = 0;
//   let right = x;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === x) {
//       return mid;
//     } else if (mid * mid < x) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   } 
//   return right;
// }
// 有效的完全平方数 1.二分查找
// function isPerfectSquare(num) {
//   let left = 0;
//   let right = num;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (mid * mid === num) {
//       return true;
//     } else if (mid * mid < num) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return false;
// }
// 最大子序和 1.暴力枚举 2.递归 3.动态规划
// function maxSubArray(nums) {
//   let max = -Infinity;
//   for (let i = 0; i < nums.length; i++) {
//     let sum = nums[i];
//     let subMax = nums[i];
//     for (let j = i + 1; j < nums.length; j++) {
//       sum += nums[j];
//       subMax = Math.max(subMax, sum);
//     }
//     max = Math.max(max, subMax);
//   }
//   return max;
// }
// function maxSubArray(nums) {
//   let max = -Infinity;
//   for (let i = 0; i < nums.length; i++) {
//     let sum = nums[i];
//     max = Math.max(max, sum);
//     for (let j = i + 1; j < nums.length; j++) {
//       sum += nums[j];
//       max = Math.max(max, sum);
//     }
//   }
//   return max;
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === nums.length - 1) {
//       a.push(nums[nums.length - 1]);
//       return nums[nums.length - 1];
//     }
//     let max = Math.max(recursion(index + 1) + nums[index], nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(0);
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === 0) {
//       a.push(nums[0]);
//       return nums[0];
//     }
//     let max = Math.max(nums[index], recursion(index - 1) + nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(nums.length - 1);
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   let a = nums;
//   for (let i = 1; i < nums.length; i++) {
//     a[i] = Math.max(nums[i], a[i - 1] + nums[i]);
//   }
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   for (let i = 1; i < nums.length; i++) {
//     nums[i] = Math.max(nums[i - 1] + nums[i], nums[i]);
//   }
//   return Math.max.apply(null, nums);
// }
// function maxSubArray(nums) {
//   for (let i = nums.length - 2; i >= 0; i--) {
//     nums[i] = Math.max(nums[i], nums[i + 1] + nums[i]);
//   }
//   return Math.max.apply(null, nums);
// }
// function maxSubArray(nums) {
//   let a = nums;
//   for (let i = nums.length - 2; i >= 0; i--) {
//     a[i] = Math.max(nums[i], a[i + 1] + nums[i]);
//   }
//   return Math.max.apply(null, a);
// }
// 搜索旋转排序数组 1.暴力枚举 2.二分查找
// function search(nums, target) {
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === target) return i;
//   }
//   return -1;
// }
// function search(nums, target) {
//   let left = 0;
//   let right = nums.length - 1;
//   while (left <= right) {
//     let mid = (left + right) >> 1;
//     if (nums[mid] === target) return mid;
//     if (nums[left] < nums[mid]) {
//       if (target >= nums[left] && target <= nums[mid]) {
//         right = mid - 1;
//       } else {
//         left = mid + 1;
//       }
//     } else {
//       if (target >= nums[mid] && target <= nums[right]) {
//         left = mid + 1;
//       } else {
//         right = mid - 1;
//       }
//     }
//   }
//   return -1;
// }
// 最大子序和 1.暴力枚举 2.递归 3.动态规划
// function maxSubArray(nums) {
//   let max = -Infinity;
//   for (let i = 0; i < nums.length; i++) {
//     let sum = nums[i];
//     let subMax = nums[i];
//     for (let j = i + 1; j < nums.length; j++) {
//       sum += nums[j];
//       subMax = Math.max(subMax, sum);
//     }
//     max = Math.max(max, subMax);
//   }
//   return max;
// }
// function maxSubArray(nums) {
//   let max = -Infinity;
//   for (let i = 0; i < nums.length; i++) {
//     let sum = nums[i];
//     max = Math.max(max, nums[i]);
//     for (let j = i + 1; j < nums.length; j++) {
//       sum += nums[j];
//       max = Math.max(max, sum);
//     }
//   }
//   return max;
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === nums.length - 1) {
//       a.push(nums[nums.length - 1]);
//       return nums[nums.length - 1];
//     }
//     let max = Math.max(nums[index], recusion(index + 1) + nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(0);
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   let a = [];
//   function recursion(index) {
//     if (index === 0) {
//       a.push(nums[0]);
//       return nums[0];
//     }
//     let max = Math.max(nums[index], recursion(index - 1) + nums[index]);
//     a.push(max);
//     return max;
//   }
//   recursion(nums.length -1);
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   let a = nums;
//   for (let i = 1; i < nums.length; i++) {
//     a[i] = Math.max(nums[i], a[i - 1] + nums[i]);
//   }
//   return Math.max.apply(null, a);
// }
// function maxSubArray(nums) {
//   for (let i = nums.length - 2; i >= 0; i--) {
//     nums[i] = Math.max(nums[i], nums[i + 1] + nums[i]);
//   }
//   return Math.max.apply(null, nums);
// }
// 选择排序
// 每次找最小值，放到待排序数组的起始位置
// function selectionSort(arr) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     let minIndex = i;
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[j] < arr[minIndex]) {
//         minIndex = j;
//       }
//     }
//     if (minIndex !== i) {
//       let c = arr[i];
//       arr[i] = arr[minIndex];
//       arr[minIndex] = c;
//     }
//   }
//   return arr;
// }
// console.log(selectionSort([1,2,3,8,7,3,4,5,2,1]))
// 插入排序 O(n^2)
// 从前到后构建有序序列，对于未排序的数据，在已排序序列中从后向前扫描，找到相应的位置并插入。
// function insertionSort(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i; j > 0; j--) {
//       if (arr[j] < arr[j - 1]) {
//         let c = arr[j - 1];
//         arr[j - 1] = arr[j];
//         arr[j] = c;
//       }
//     }
//   }
//   return arr;
// }
// console.log(insertionSort([1,2,3,8,7,3,4,5,2,1]))
// 冒泡排序
// 两层嵌套循环，内层循环两两比较，每次把最大值放到最后
// function bubbleSort(arr) {
//   for (let i = 0; i < arr.length; i ++) {
//     for (let j = 0; j < arr.length - i - 1; j ++) {
//       if (arr[j] > arr[j + 1]) {
//         let c = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = c;
//       }
//     }
//   }
//   return arr;
// }
// console.log(bubbleSort([1,2,3,8,7,3,4,5,2,1,9]))
// function quickSort(arr) {
//   function recursion(arr, start, end) {
//     if (start === end) {
//       return;
//     }
//     let pivot = arr[start];
//     for (let i = start; i <= end; i++) {
//       if (arr[i] < pivot) {
//         arr[start] = arr[i];
//         start++;
//       }
//     }
//     arr[start] = pivot;
//     recursion(arr.slice(0, start), 0, start - 1);
//     recursion(arr.slice(start + 1, end), start + 1, end);
//   }
//   recursion(0, arr.length - 1);
// }
// let arr = [6,3,8,7,9,2,0];
// quickSort(arr);
// console(arr);
// let arr = [6,3,8,7,9,2,0];
// [3,2,0,7,9,6,8]
// let start = 0, end = arr.length - 1;
// let pivot = arr[start];
// for (let i = start; i <= end; i++) {
//   if (arr[i] < pivot) {
//     let c = arr[start];
//     arr[start] = arr[i];
//     arr[i] = c;
//     if (arr[i] === pivot) index = i;
//     start++;
//   }
// }
// let c = arr[start];
// arr[start] = arr[index];
// arr[index] = c;
// console.log(arr)
// function quickSort(arr) {
//   function recursion(start, end) {
//     if (start > end) {
//       return;
//     }
//     function partition(nums, left, right) {
//       let pivot = left, counter = left + 1;
//       for (let i = left; i <= right; i++) {
//         if (nums[i] < nums[pivot]) {
//           [nums[i], nums[counter]] = [nums[counter], nums[i]];
//           counter++;
//         }
//       }
//       [nums[pivot], nums[counter - 1]] = [nums[counter - 1], nums[pivot]];
//       return counter - 1;
//     }
//     index = partition(arr, start, end);
//     recursion(start, index - 1);
//     recursion(index + 1, end);
//   }
//   recursion(0, arr.length - 1);
// }
// let arr = [6,3,8,7,9,2,0,18,33,44,6,5,7];
// quickSort(arr);
// console.log(arr)
// 选择排序
// 每次找到最小值，放到未排序数组的起始位置。
// function selectionSort(arr) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     let minIndex = i;
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[j] < arr[minIndex]) {
//         minIndex = j;
//       }
//     }
//     if (minIndex !== i) {
//       let c = arr[i];
//       arr[i] = arr[minIndex];
//       arr[minIndex] = c;
//     }
//   }
//   return arr;
// }
// console.log(selectionSort([9,4,9,8,3,3,2,2,5,6]))
// function insertionSort(arr) {
//   for (let i = 0; i < arr.length; i ++) {
//     for (let j = i; j > 0; j--) {
//       if (arr[j - 1] > arr[j]) {
//         let c = arr[j - 1];
//         arr[j - 1] = arr[j];
//         arr[j] = c;
//       }
//     }
//   }
//   return arr;
// }
// console.log(insertionSort([2,2,5,6,7,3]))
// 冒泡排序
// 内层循环每次把最大值放到最后
// function bubbleSort(arr) {
//   for (let i = 0; i < arr.length - 1; i ++) {
//     for (let j = 0; j < arr.length - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         let c = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = c;
//       }
//     }
//   }
//   return arr;
// }
// console.log(bubbleSort([9,4,91,8,33,3,2,2,5,6]))
// function insertionSort(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     let temp = arr[i];
//     let preIndex = i - 1;
//     while (preIndex >= 0 && arr[preIndex] > temp) {
//       arr[preIndex + 1] = arr[preIndex];
//       preIndex--;
//     }
//     arr[preIndex + 1] = temp;
//   }
//   return arr;
// }
// console.log(insertionSort([9,4,91,8,33,3,2,2,5,6]))
// [0,3,2,6,9,8,7];
// counter: 1;2;3;4
// pivot: 0;

// function partition(nums, left, right) {
//   let pivot = left;
//   let counter = left + 1;
//   for (let i = left; i <= right; i++) {
//     if (nums[i] < nums[pivot]) {
//       [nums[i], nums[counter]] = [nums[counter], nums[i]];
//       counter++;
//     }
//   }
//   [nums[pivot], nums[counter - 1]] = [nums[counter - 1], nums[pivot]];
//   return counter - 1;
// }
// function quickSort(nums, left, right) {
//   if (nums.length <= 1) return nums;
//   if (right <= left) return;
//   index = partition(nums, left, right);
//   quickSort(nums, left, index - 1);
//   quickSort(nums, index + 1, right);
// }
// let arr = [1,9,8,4,7,6,5,1,2];
// quickSort(arr, 0, arr.length - 1);
// console.log(arr);

// const quickSort = (nums, left, right) => {  
//   if (nums.length <= 1) return nums;
//   if (left < right) {    
//     index = partition(nums, left, right)    
//     quickSort(nums, left, index-1)    
//     quickSort(nums, index+1, right)  
//   }
// }      
// const partition = (nums, left, right) => {  
//   let pivot = left, index = left + 1; 
//   for (let i = index; i <= right; i++) {    
//     if (nums[i] < nums[pivot]) {      
//       [nums[i], nums[index]] = [nums[index], nums[i]];      
//       index++;
//     }  
//   }  
//   [nums[pivot], nums[index-1]] = [nums[index-1], nums[pivot]];  
//   return index -1;
// }
// function quickSort(nums) {
//   if (nums.length <= 1) return nums;
//   function recursion(left, right) {
//     if (right <= left) return;
//     let index = partition(left, right);
//     recursion(left, index - 1);
//     recursion(index + 1, right);
//   }
//   recursion(0, nums.length - 1);
//   function partition(left, right) {
//     let pivot = left, counter = left + 1;
//     for (let i = left; i <= right; i++) {
//       if (nums[i] < nums[pivot]) {
//         [nums[counter], nums[i]] = [nums[i], nums[counter]];
//         counter++;
//       }
//     }
//     [nums[counter - 1], nums[pivot]] = [nums[pivot], nums[counter - 1]];
//     return counter - 1;
//   }
//   return nums;
// }
// console.log(quickSort([0,2,7,8,44,3,2,6,7,55,32]))
// function quickSort(nums) {
//   if (nums.length < 2) return nums;
//   let tmp = nums[0];
//   let left = [];
//   let right = [];
//   for (let i = 1; i < nums.length; i++) {
//     if (nums[i] < tmp) {
//       left.push(nums[i]);
//     } else {
//       right.push(nums[i]);
//     }
//   }
//   return quickSort(left).concat(tmp, quickSort(right));
// }
// console.log(quickSort([0,5,3,2,4,4,7,7,5,10,66]))
// function mergeSort(nums, left, right) {
//   if (right <= left) return;    
//   let mid = (left + right) >> 1; 
//   mergeSort(nums, left, mid);   
//   mergeSort(nums, mid + 1, right);    
//   merge(nums, left, mid, right);
// }
// function merge(arr, left, mid, right) {
//   let temp = []; 
//   let i = left, j = mid + 1, k = 0;        
//   while (i <= mid && j <= right) {            
//     temp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];        
//   }        
//   while (i <= mid) temp[k++] = arr[i++];        
//   while (j <= right) temp[k++] = arr[j++];        
//   for (let p = 0; p < temp.length; p++) {            
//     arr[left + p] = temp[p];        
//   }
// }
// function mergeSort(nums) {
//   function recursion(nums, left, right) {
//     if (right <= left) return;
//     let mid = (left + right) >> 1;
//     recursion(nums, left, mid);
//     recursion(nums, mid + 1, right);
//     merge(nums, left, mid, right);
//   }
//   recursion(nums, 0, nums.length - 1);
//   function merge(nums, left, mid, right) {
//     let temp = [];
//     let i = left, j = mid + 1, k = 0;
//     while (i <= mid && j <= right) {
//       temp[k++] = nums[i] <= nums[j] ? nums[i++] : nums[j++];
//     }
//     while (i <= mid) temp[k++] = nums[i++];
//     while (j <= right) temp[k++] = nums[j++];
//     for (let p = 0; p < temp.length; p++) {
//       nums[left + p] = temp[p];
//     } 
//   }
//   return nums;
// }
// let nums = [6,4,5,3,6,5,7,3,99,30];
// console.log(mergeSort(nums, 0, nums.length - 1))
// 选择排序
// 每次选出最小值，放到待排序数组最前面
// function selectionSort(nums) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     let minIndex = i;
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[j] < nums[minIndex]) {
//         minIndex = j;
//       }
//     }
//     if (minIndex !== i) {
//       let c = nums[i];
//       nums[i] = nums[minIndex];
//       nums[minIndex] = c;
//     }
//   }
//   return nums;
// }
// console.log(selectionSort([2,3,6,3,7,29,22]))
// 插入排序
// 每次将 i 放入已排序数组中，从后向前把 i 交换到相应的位置。
// function insertionSort(nums) {
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i; j > 0; j--) {
//       if (nums[j] < nums[j - 1]) {
//         let c = nums[j - 1];
//         nums[j - 1] = nums[j];
//         nums[j] = c;
//       }
//     }
//   }
//   return nums;
// }
// console.log(insertionSort([9,2,4,34,4,5,8,1]))
// 冒泡排序
// 两层嵌套循环，内层循环每次把最大值放到最后
// function bubbleSort(nums) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = 0; j < nums.length - i - 1; j++) {
//       if (nums[j] > nums[j + 1]) {
//         let c = nums[j];
//         nums[j] = nums[j + 1];
//         nums[j + 1] = c;
//       }
//     }
//   }
//   return nums;
// }
// console.log(bubbleSort([1,2,6,7,4,5,8,10,9,8]))
// function insertSort(nums) {
//   for (let i = 0; i < nums.length; i++) {
//     let preIndex = i - 1;
//     let temp = nums[i];
//     while (preIndex >= 0 && nums[preIndex] > temp) {
//       nums[preIndex + 1] = nums[preIndex];
//       preIndex--;
//     }
//     nums[preIndex + 1] = temp;
//   }
//   return nums;
// }
// console.log(insertSort([9,3,4,5,1,6,22,10,16]))
// 快速排序
// function quickSort(nums) {
//   if (nums.length <= 1) return nums;
//   function recursion(nums, left, right) {
//     if (right <= left) return;
//     let index = partition(nums, left, right);
//     recursion(nums, left, index - 1);
//     recursion(nums, index + 1, right);
//   }
//   recursion(nums, 0, nums.length - 1);
//   function partition(nums, left, right) {
//     let pivot = left;
//     let counter = left + 1;
//     for (let i = left + 1; i <= right; i++) {
//       if (nums[i] < nums[pivot]) {
//         [nums[counter], nums[i]] = [nums[i], nums[counter]];
//         counter++;
//       }
//     }
//     [nums[pivot], nums[counter - 1]] = [nums[counter - 1], nums[pivot]];
//     return counter - 1;
//   }
//   return nums;
// }
// console.log(quickSort([19,2,4,5,2,6,2,9,20,3]))
// function quickSort(nums) {
//   if (nums.length <= 1) return nums;
//   function recursion(nums, left, right) {
//     if (right <= left) return;
//     let index = partition(nums, left, right);
//     recursion(nums, left, index - 1);
//     recursion(nums, index + 1, right);
//   }
//   recursion(nums, 0, nums.length -1);
//   function partition(nums, left, right) {
//     let pivot = left;
//     let counter = left + 1;
//     for (let i = left; i <= right; i++) {
//       if (nums[i] < nums[pivot]) {
//         [nums[counter], nums[i]] = [nums[i], nums[counter]];
//         counter++;
//       }
//     }
//     [nums[pivot], nums[counter - 1]] = [nums[counter - 1], nums[pivot]];
//     return counter - 1;
//   }
//   return nums;
// }
// console.log(quickSort([0,3,9,4,86,7,4,2]))
// function mergeSort(nums) {
//   // if (nums.length <= 1) return nums;
//   function recursion(nums, left, right) {
//     if (right <= left) return;
//     let mid = (left + right) >> 1;
//     recursion(nums, left, mid);
//     recursion(nums, mid + 1, right);
//     merge(nums, left, mid, right);
//   }
//   recursion(nums, 0, nums.length - 1);
//   function merge(nums, left, mid, right) {
//     let temp = [];
//     let i = left, j = mid + 1, k = 0;
//     while (i <= mid && j <= right) {
//       temp[k++] = nums[i] <= nums[j] ? nums[i++] : nums[j++];
//     }
//     while (i <= mid) temp[k++] = nums[i++];
//     while (j <= right) temp[k++] = nums[j++];
//     for (let p = 0; p < temp.length; p++) {
//       nums[left + p] = temp[p];
//     }
//   }
//   return nums;
// }
// console.log(mergeSort([]))
// function mergeSort(nums) {
//   // if (nums.length <= 1) return nums;
//   function recursion(nums, left, right) {
//     if (right <= left) return;
//     let mid = (left + right) >> 1;
//     recursion(nums, left, mid);
//     recursion(nums, mid + 1, right);
//     merge(nums, left, mid, right);
//   }
//   recursion(nums, 0, nums.length - 1);
//   function merge(nums, left, mid, right) {
//     let temp = [];
//     let i = left, j = mid + 1, k = 0;
//     while (i <= mid && j <= right) {
//       temp[k++] = nums[i] <= nums[j] ? nums[i++] : nums[j++];
//     }
//     while (i <= mid) temp[k++] = nums[i++];
//     while (j <= right) temp[k++] = nums[j++];
//     for (let p = 0; p < temp.length; p++) {
//       nums[left + p] = temp[p];
//     }
//   }
//   return nums;
// }
// console.log(mergeSort([]))
// function heapSort(nums) {
//   // if (nums.length === 0) return;
//   let len = nums.length;
//   // 建堆
//   for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
//     heapify(nums, len, i);
//   }
//   // 排序
//   for (let i = len - 1; i >= 0; i--) {
//     [nums[0], nums[i]] = [nums[i], nums[0]];
//     heapify(nums, i, 0);
//   }
//   // 维护堆
//   // 从上至下维护。
//   function heapify(nums, len, i) {
//     let left = 2 * i + 1;
//     let right = 2 * i + 2;
//     let largest = i;
//     if (left < len && nums[left] > nums[largest]) {
//       largest = left;
//     }
//     if (right < len && nums[right] > nums[largest]) {
//       largest = right;
//     }
//     if (largest !== i) {
//       [nums[i], nums[largest]] = [nums[largest], nums[i]];
//       heapify(nums, len, largest);
//     }
//   }
//   return nums;
// }
// console.log(heapSort([1]))
// 斐波那契额数列 1.暴力递归 2.记忆化递归 3.动态规划
// function fib(n) {
//   if (n <= 1) return n;
//   return fib(n - 1) + fib(n - 2);
// }
// function fib(n) {
//   let a = [];
//   function recursion(n) {
//     if (n <= 1) return n;
//     if (a[n] != null) return a[n];
//     a[n] = fib(n - 1) + fib(n - 2);
//     return a[n];
//   }
//   return recursion(n);
// }
// function fib(n) {
//   if (n <= 1) return n;
//   let a = [];
//   a[0] = 0, a[1] = 1;
//   for (let i = 2; i <= n; i++) {
//     a[i] = a[i - 1] + a[i - 2];
//   }
//   return a[n];
// }
// function fib(n) {
//   if (n <= 1) return n;
//   let a = 0, b = 1, r = 0;
//   for (let i = 0; i < n - 1; i++) {
//     r = (a + b) % 1000000007;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// function fib(n) {
//   if (n <= 1) return n;
//   let a = 0, b = 1, r = 0;
//   for (let i = 2; i <= n; i++) {
//     r = (a + b) % 1000000007;
//     a = b;
//     b = r;
//   }
//   return r;
// }
// 选择排序
// 每次选出最小值放到待排序序列的最前面
// function selectionSort(nums) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     let minIndex = i;
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[j] < nums[minIndex]) {
//         minIndex = j;
//       }
//     }
//     if (minIndex !== i) {
//       [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
//     }
//   }
//   return nums;
// }
// console.log(selectionSort([9,3,5,2,7,5,5,44,3]))
// function insertionSort(nums) {
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i; j > 0; j--) {
//       if (nums[j] < nums[j - 1]) {
//         [nums[j - 1], nums[j]] = [nums[j], nums[j - 1]];
//       }
//     }
//   }
//   return nums;
// }
// console.log(insertionSort([0,3,5,2,94,8,4,5]))
// 插入排序
// 从前到后构建有序序列，从后到前遍历有序序列，把 i 插入相应的位置。
// function insertionSort(nums) {
//   for (let i = 0; i < nums.length; i++) {
//     let preIndex = i - 1;
//     let temp = nums[i];
//     while (preIndex >= 0 && nums[preIndex] > temp) {
//       nums[preIndex + 1] = nums[preIndex];
//       preIndex--;
//     }
//     nums[preIndex + 1] = temp;
//   }
//   return nums;
// }
// console.log(insertionSort([0,2,3,49,4,2,3,5]))
// function bubbleSort(nums) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = 0; j < nums.length - 1 - i; j++) {
//       if (nums[j] > nums[j + 1]) {
//         [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
//       }
//     }
//   }
//   return nums;
// }
// console.log(bubbleSort([0,2,3,49,4,2,3,55]));
// function quickSort(nums) {
//   if (nums.length <= 1) return nums;
//   function recursion(nums, left, right) {
//     if (right <= left) return;
//     let index = partition(nums, left, right);
//     recursion(nums, left, index - 1);
//     recursion(nums, index + 1, right);
//   }
//   recursion(nums, 0, nums.length -1);
//   function partition(nums, left, right) {
//     let pivot = left;
//     let target = left + 1;
//     for (let i = left; i <= right; i++) {
//       if (nums[i] < nums[pivot]) {
//         [nums[target], nums[i]] = [nums[i], nums[target]];
//         target++;
//       }
//     }
//     [nums[pivot], nums[target - 1]] = [nums[target - 1], nums[pivot]];
//     return target - 1;
//   }
//   return nums;
// }
// console.log(quickSort([9,3,4,1,2,4,6,4,3,6,7]))
// 归并排序
// function mergeSort(nums) {
//   if (nums.length <= 1) return nums;
//   function recursion(nums, left, right) {
//     if (right <= left) return;
//     let mid = (left + right) >> 1;
//     recursion(nums, left, mid);
//     recursion(nums, mid + 1, right);
//     merge(nums, left, mid, right);
//   }
//   recursion(nums, 0, nums.length - 1);
//   function merge(nums, left, mid, right) {
//     let temp = [];
//     let i = left, j = mid + 1, k = 0;
//     while (i <= mid && j <= right) {
//       temp[k++] = nums[i] <= nums[j] ? nums[i++] : nums[j++];
//     }
//     while (i <= mid) temp[k++] = nums[i++];
//     while (j <= right) temp[k++] = nums[j++];
//     for (let p = 0; p < temp.length; p++) {
//       nums[left + p] = temp[p];
//     }
//   }
//   return nums;
// }
// console.log(mergeSort([0,3,2,8,4,23,4]))
// function heapSort(nums) {
//   if (nums.length <= 1) return nums;
//   let len = nums.length;
//   // 建堆
//   for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
  //   heapify(nums, len, i);
  // }
  // 排序
  // for (let i = 0; i < len; i++) {
  //   [nums[0], nums[len - i - 1]] = [nums[len - i - 1], nums[0]];
  //   heapify(nums, len - i - 1, 0);
  // }
//   for (let i = len - 1; i >= 0; i--) {
//     [nums[0], nums[i]] = [nums[i], nums[0]];
//     heapify(nums, i, 0);
//   }
//   // 从上至下维护堆
//   function heapify(nums, len, i) {
//     let largest = i;
//     let left = i * 2 + 1;
//     let right = i * 2 + 2;
//     if (left < len && nums[left] > nums[largest]) {
//       largest = left;
//     }
//     if (right < len && nums[right] > nums[largest]) {
//       largest = right;
//     }
//     if (largest !== i) {
//       [nums[i], nums[largest]] = [nums[largest], nums[i]];
//       heapify(nums, len, largest);
//     }
//   }
//   return nums;
// }
// console.log(heapSort([9,3,42,2,5,3,9,4,10]))