/** 获取字符串最后一个单词的长度 */
export function getTheLengthOfTheLastWord(str: string): number {
  let result = 0;

  const length = str.length;

  for (let i = length - 1; i >= 0; i--) {
    if (str[i] !== ' ') {
      result++;
    } else {
      return result;
    }
  }

  return result;
}

// console.log(getLengthOfLastWord('hello nowcoder'));

/** 计算给定字符出现次数 */
function appearedTimes(str: string, value: string): number {
  function isUppercaseEqual(a: string, b: string) {
    return a.toUpperCase() === b.toUpperCase();
  }

  let result = 0;

  const length = str.length;

  for (const i of str) {
    if (isUppercaseEqual(i, value)) {
      result++;
    }
  }

  return result;
}

// console.log(appearTimes('ABCabcasdjapsdjaobfeusbjfbnasndakadiapdjakwda','A'))

/** 明明的随机数 - 先去重再排序 */
function flattenAndSort(arr: number[]): number[] {
  const flattenedArr = Array.from(new Set(arr));

  function quickSort(arr: number[]): number[] {
    const length = arr.length;
    if (arr.length <= 1) return arr;

    let upperSector = [];
    let lowerSector = [];

    let midIndex = Math.floor(length / 2);
    let midValue = arr[midIndex];

    for (const n of arr) {
      if (n > midValue) {
        upperSector.push(n);
      } else if (n < midValue) {
        lowerSector.push(n);
      }
    }

    return [...quickSort(lowerSector), midValue, ...quickSort(upperSector)];
  }

  return quickSort(flattenedArr);
}

// console.log(flattenAndSort([8, 7, 4, 6, 9, 2, 3, 7, 1, 1, 3, 4, 5]));

/** 字符串分隔 - 每8个字符分隔，最后一个用0补全 */
function divideString(str: string): string[] {
  const result = [];
  const length = str.length;

  let n = 0;
  let s = '';

  for (let i = 0; i < length; i++) {
    if (str[i] === ' ') continue;

    if (n === 8) {
      result.push(s);
      n = 0;
      s = '';
      i--;
    } else {
      s = s + str[i];
      n++;
    }

    if (i === length - 1) {
      result.push(s);
      break;
    }
  }

  let lastStr = result[result.length - 1];
  const lastStrLength = lastStr.length;

  for (let j = lastStrLength; j < 8; j++) {
    lastStr = lastStr + '0';
  }

  result[result.length - 1] = lastStr;

  return result;
}

// console.log(divideString('kandskdj a oisjdias n dkasmdlaksmdoaisjdaksjdmaklsmdoiasdasdasdad1a123456789888'))

/** 进制转换 */
function parse(n: string) {
  return parseInt(n, 10);
}

/** 求给定数的质数因子，并从小到大排序 */
function primaries(n: number): number[] {
  // function isInteger(n: number): boolean {
  //   return !n.toString().includes('.');
  // }

  const numbers = [2, 3, 5, 7];

  function isPrimary(n: number): boolean {
    for (const i of numbers) {
      if (Number.isInteger(n / i)) return false;
    }

    return true;
  }

  const result = [];

  while (!isPrimary(n)) {
    for (const i of numbers) {
      if (Number.isInteger(n / i)) {
        result.push(i);
        n = n / i;
        break;
      }
    }
  }

  if (n !== 1) result.push(n);
  return result;
}

// console.log(primaries(720));
