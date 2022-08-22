// 二分查找
// 在一个有序数组中查找是否包含目标元素
// 三指针，均指向数组索引
// 初始化时，low指向0，high指向length - 1，mid指向(high + low) / 2
// 预判断，如果target < ary[low] 或者 target > ary[high])，返回-1
// 循环判断，如果target == ary[mid]，返回mid
// 如果target > ary[mid]，将low指向mid；如果target < ary[mid]，将high指向mid；
// 当low和high相遇并错开，即low > high时，结束判断，返回-1

function binarySearch(ary: number[], target: number): number {
  if (!Array.isArray(ary)) throw new Error('ary must be an array');
  if (ary.length === 0) return -1;

  let low = 0;
  let high = ary.length - 1;
  if(target < ary[low] || target > ary[high]) return -1;

  let mid = Math.floor((high - low) / 2);

  while (low <= high) {
    if (target ===ary[mid] ) return mid;

    if (target > ary[mid]) {
      low = mid
    } else {
      high = mid
    }

    mid = Math.floor((high + low) / 2);
  }

  return -1;
}
