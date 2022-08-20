// 合并两个递增数组：
// 一层循环，对比longAry[i]和shortAry[j]；
// 如果longAry[i] 大于 shortAry[j]，push(shortAry[j]) i++；
// 如果longAry[i] 小于 shortAry[j]，push(longAry[i]]) j++；
// 如果longAry[i] 等于 shortAry[j]，push(longAry[i]]) i++，j++；

// 当shortAry[j] == null时，代表j已经越过shortAry的长度，
//即shortAry的最后一个值（最大值）已经小于longAry[i]，直接push(longAry[i])；

// 补充：双指针；

function mergeTwoIndexedArray(arr1: number[], arr2: number[]): number[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) throw new Error('arg must be an array');

  if (arr1.length === 0) return arr2;
  if (arr2.length === 0) return arr1;
  if (arr1.length === 0 && arr2.length === 0) return [];

  const longLength = Math.max(arr1.length, arr2.length);
  const longAry = arr1.length > arr2.length ? arr1 : arr2;
  const shortAry = arr1.length > arr2.length ? arr2 : arr1;
  const result = [];

  for (let i = 0, j = 0; i < longLength; ) {
    if (longAry[i] < shortAry[j] || shortAry[j] == null) {
      result.push(longAry[i]);
      i++;
    } else if (longAry[i] < shortAry[j]) {
      result.push(longAry[i]);
      i++;
      j++;
    } else {
      result.push(shortAry[j]);
      j++;
    }
  }

  return result;
}
