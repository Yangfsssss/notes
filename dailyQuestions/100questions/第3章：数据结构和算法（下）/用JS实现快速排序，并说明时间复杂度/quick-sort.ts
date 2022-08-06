/**
 * @description 快速排序
 * @author Yang
 */

/**
 * 快速排序（使用splice）
 * @param arr number[]
 */

export function quickSortUsingSplice(arr: number[]): number[] {
  const length = arr.length;
  if (length === 0) return arr;

  const midIndex = Math.floor(length / 2);
  const midValue = arr.splice(midIndex, 1)[0];

  const left = [];
  const right = [];

  // O(n) * O(logn) === O(n*logn)
  // 注意：这里不能直接用 length，而是用 arr.length。因为 arr 已经被 splice 给修改了。
  for (let i = 0; i < arr.length; i++) {
    const n = arr[i];
    // O(logn)
    if (n < midValue) {
      // 小于midValue，则放在 left
      left.push(n);
    } else {
      // 大于midValue，则放在 right
      right.push(n);
    }
  }

  return quickSortUsingSplice(left).concat(midValue).concat(quickSortUsingSplice(right));
}

/**
 * 快速排序（使用slice）
 * @param arr number[]
 */

export function quickSortUsingSlice(arr: number[]): number[] {
  const length = arr.length;
  if (length === 0) return arr;

  const midIndex = Math.floor(length / 2);
  const midValue = arr.slice(midIndex, midIndex + 1)[0];

  const left = [];
  const right = [];

  for (let i = 0; i < length; i++) {
    if (i === midIndex) continue;

    const n = arr[i];
    if (n < midValue) {
      // 小于midValue，则放在 left
      left.push(n);
    } else {
      // 大于midValue，则放在 right
      right.push(n);
    }
  }

  return quickSortUsingSlice(left).concat(midValue).concat(quickSortUsingSlice(right));
}

// 功能测试
// const arr1 = [1, 6, 2, 7, 3, 8, 4, 9, 5];
// console.log(quickSortUsingSplice(arr1));

// 性能测试
// const arr1 = [];
// for (let i = 0; i < 100 * 1000; i++) {
//   arr1.push(Math.floor(Math.random() * 1000));
// }
// console.time('quickSortUsingSplice');
// quickSortUsingSplice(arr1);
// console.timeEnd('quickSortUsingSplice'); // 60ms

// const arr2 = [];
// for (let i = 0; i < 100 * 1000; i++) {
//   arr2.push(Math.floor(Math.random() * 1000));
// }
// console.time('quickSortUsingSlice');
// quickSortUsingSlice(arr2);
// console.timeEnd('quickSortUsingSlice'); // 64ms

// 单独比较 splice 和 slice
const arr1 = [];
for (let i = 0; i < 10 * 1000 * 1000; i++) {
  arr1.push(Math.floor(Math.random() * 1000));
}
console.time('splice');
arr1.splice(5 * 1000 * 1000, 1);
console.timeEnd('splice'); // 0.61ms

const arr2 = [];
for (let i = 0; i < 10 * 1000 * 1000; i++) {
  arr2.push(Math.floor(Math.random() * 1000));
}
console.time('slice');
arr2.slice(5 * 1000 * 1000, 5 * 1000 * 1000 + 1);
console.timeEnd('slice'); // 0.005ms
