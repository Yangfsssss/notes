// 快速排序：
// 取一个中间值minValue，遍历数组，小于midValue的值放在lowerSector，大于midValue的值放在upperSector；
// 递归处理lowerSector和upperSector，将结果和midValue合并为一个数组，返回；

// 时间复杂度：O(n*logn) 遍历 * 二分

export function quickSort(arg:number[]):number[]{
  if(!Array.isArray(arg)) throw new Error('arg must be an array');
  if(arg.length <= 1) return arg;

  const midIndex = Math.floor(arg.length / 2);
  const midValue = arg[midIndex];

  const lowerSector = [];
  const upperSector = [];

  for(const value of arg){
    if(value < midValue){
      lowerSector.push(value);
    }else if(value > midValue){
      upperSector.push(value);
    }
  }

  // return quickSort(lowerSector).concat(midValue).concat(quickSort(upperSector));
  return [...quickSort(lowerSector), midValue, ...quickSort(upperSector)];
}