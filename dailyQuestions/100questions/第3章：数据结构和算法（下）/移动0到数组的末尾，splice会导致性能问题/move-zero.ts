/**
 * @description 移动 0 到数组末尾
 * @author Yang
 */

/**
 * 移动 0 到数组的末尾（嵌套循环）
 * @param arr number[]
 */

export function moveZeroDumb(arr: number[]): void {
  const length = arr.length;
  if (length === 0) return;

  let zeroLength = 0;

  // O(n^2)
  for (let i = 0; i < length - zeroLength; i++) {
    if (arr[i] === 0) {
      arr.push(arr[i]);
      arr.splice(i, 1); // 本身就有 O(n)的时间复杂度

      zeroLength++; // 累加0的长度
      i--; // 指针保持原位
    }
  }
}

/**
 * 移动0到数组末尾（双指针）
 * @param arr
 */
export function moveZeroSmart(arr: number[]): void {
  const length = arr.length;
  if (length === 0) return;

  let i = -1;
  let j;

  for (j = 0; j < length; j++) {
    // 初始化双指针：
    // 遍历到第一个 0 时，初始化 i 指向它，此时 j 尚未初始化完成；
    //  j 增加，继续遍历，当遇到 i 之后第一个非 0 时，j 初始化完成，并开始首次操作；
    if (arr[j] === 0) {
      // 第一个0
      if (i === -1) {
        i = j;
      }
    }

    // 初始化完成后，开始操作
    if (arr[j] !== 0 && i >= 0) {
      // 交换
      const n = arr[j];
      arr[j] = arr[i];
      arr[i] = n;

      i++; // 指针前移，即无论交换时 i 与 j 是否相邻，i 永远持有1个0，等待与 j 交换；如果不再发生交换，说明 i 之后全为0，操作完成；
    }
  }
}

// 功能测试
// const arr = [1, 0, 3, 4, 0, 0, 11, 0];
// moveZeroDumb(arr);
// moveZeroSmart(arr);
// console.log(arr); // [1,3,4,11,0,0,0,0]

// 性能测试
const arr1 = [];
for (let i = 0; i < 200 * 1000; i++) {
  if (i % 10 === 0) {
    arr1.push(0);
  } else {
    arr1.push(i);
  }
}
console.time('moveZeroDumb');
moveZeroDumb(arr1);
console.timeEnd('moveZeroDumb'); // 184ms

const arr2 = [];
for (let i = 0; i < 200 * 1000; i++) {
  if (i % 10 === 0) {
    arr2.push(0);
  } else {
    arr2.push(i);
  }
}
console.time('moveZeroSmart');
moveZeroSmart(arr2);
console.timeEnd('moveZeroSmart'); // 1.84ms
