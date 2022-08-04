/**
 * @description 二分查找
 * @author Yang
 */

/**
 * 二分查找（循环）
 * @param arr arr
 * @param target target
 */
export function binarySearchIterative(arr: number[], target: number): number {
  const length = arr.length;
  if (length === 0) return -1;

  let startIndex = 0; // 开始位置
  let endIndex = length - 1; // 结束位置

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const midValue = arr[midIndex];
    if (midValue === target) {
      // 相等，返回索引
      return midIndex;
    } else if (target < midValue) {
      // 目标值较小，则继续在左侧查找
      endIndex = midIndex - 1;
    } else {
      // 目标值较大，则继续在右侧查找
      startIndex = midIndex + 1;
    }
  }

  return -1;
}

/**
 * 二分查找（递归）
 * @param arr
 * @param target target
 * @param startIndex startIndex
 * @param endIndex endIndex
 */
export function binarySearchRecursive(arr: number[], target: number, startIndex?: number, endIndex?: number): number {
  const length = arr.length;
  if (length === 0) return -1;

  // 开始和结束的范围
  if (startIndex === null || startIndex === undefined) startIndex = 0;
  if (!endIndex === null || endIndex === undefined) endIndex = length - 1;

  // 如果 start 和 end 相等，继续计算
  // 当 start 和 end 相交并错开时，说明没有找到
  if (startIndex > endIndex) return -1;

  // 计算中间索引
  const midIndex = Math.floor((startIndex + endIndex) / 2);
  const midValue = arr[midIndex];

  // 相等，返回索引
  if (midValue === target) {
    return midIndex;
  }

  // 目标值较小，则继续在左侧查找
  if (target < midValue) {
    return binarySearchRecursive(arr, target, startIndex, midIndex - 1);
  }

  // 目标值较大，则继续在右侧查找
  return binarySearchRecursive(arr, target, midIndex + 1, endIndex);
}

// 功能测试
const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
const target = 40;
// console.log(binarySearchIterative(arr, target));
// console.log(binarySearchRecursive(arr, target));

// 性能测试
console.time('Iterative');
for (let i = 0; i < 1000 * 1000; i++) {
  binarySearchIterative(arr, target);
}
console.timeEnd('Iterative'); // 17ms

console.time('Recursive');
for (let i = 0; i < 1000 * 1000; i++) {
  binarySearchRecursive(arr, target);
}
console.timeEnd('Recursive'); // 34ms
