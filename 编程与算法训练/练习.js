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