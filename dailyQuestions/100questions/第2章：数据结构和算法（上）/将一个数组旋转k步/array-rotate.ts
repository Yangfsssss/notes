/**
 *  @description Array rotate
 *  @author Yang
 */

/**
 * 旋转数组 k 步 - 使用pop/unshift
 * @param arr
 * @param k
 */

export function rotate1(arr: number[], k: number): number[] {
  const length = arr.length;
  if (!k || length === 0) return arr;

  const step = Math.abs(k % length); // abs 取绝对值，非数字参与运算返回NaN

  // O(n^2)
  // O(1)
  for (let i = 0; i < step; i++) {
    const n = arr.pop();
    if (n !== undefined && n !== null) {
      arr.unshift(n); // 数组是一个有序结构，unshift 操作非常慢！！！ - O(n)；
    }
  }

  return arr;
}

/**
 * 旋转数组 k 步 - 使用concat
 * @param arr
 * @param k
 */

export function rotate2(arr: number[], k: number): number[] {
  const length = arr.length;
  if (!k || length === 0) return arr;

  const step = Math.abs(k % length); // abs 取绝对值

  // O(1)
  // O(n)
  // 从后往前截取尾部
  // slice 的时间复杂度没有问题，因为它不会更改原数组，只是复制 - O(1)
  const part1 = arr.slice(-step);
  // 从前往后截取头部
  const part2 = arr.slice(0, length - step);

  const part3 = part1.concat(part2);

  return part3;
}

// 功能测试
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const arr1 = rotate1(arr, 3);
// console.log(arr1);

// 性能测试
const arr1 = [];
for (let i = 0; i < 100 * 1000; i++) {
  arr1.push(i);
}
console.time('rotate1');
rotate1(arr1, 90 * 1000);
console.timeEnd('rotate1'); // 747ms

const arr2 = [];
for (let i = 0; i < 100 * 1000; i++) {
  arr2.push(i);
}
console.time('rotate2');
rotate2(arr2, 90 * 1000);
console.timeEnd('rotate2'); // 0.96ms
