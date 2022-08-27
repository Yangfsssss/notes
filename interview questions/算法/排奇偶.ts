// 将一个数字数组中的所有奇数排在偶数之前
// 例如：[4,7,3,5,9,8,6,2,1] => [7,3,5,9,1,4,8,6,2]
// [7,3,5,9,1,8,6,2,4]

// 思路：双指针i，j；
// i永远持有第一个偶数，即遍历数组至第一个偶数时，初始化i；
// 当i被初始化时，j同时被初始化为i + 1，此时判断；
// 如果j指向偶数，则不操作，j向后移动，重复判断，直至j抵达末尾；
// 如果j指向奇数，则交换i与j指向的值，i向后移动，j向后移动，重复判断，直至j抵达末尾；注意：交换值需要声明临时变量

export function orderOddEvens(arr: number[]): number[] {
  function isEven(n: number): boolean {
    return n % 2 === 0;
  }

  const length = arr.length;

  let i = 0;
  let j = -1;

  for (; j <= length - 1; ) {
    // 初始化i，j
    if (isEven(arr[i]) && j === -1) {
      j = i + 1;
    } else if (!isEven(arr[i]) && j === -1) {
      i++;
    }

    // 判断arr[j]的奇偶
    if (isEven(arr[j])) {
      j++;
    } else {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j++;
    }
  }

  return arr;
}
