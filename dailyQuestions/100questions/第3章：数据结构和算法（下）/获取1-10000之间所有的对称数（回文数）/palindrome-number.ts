/**
 * @description 对称数
 * @author Yang
 */

/**
 * 查询 1-max 的所有对称数（数组反转）
 * @param max 最大值
 */

export function findPalindromeNumbersArrayReverse(max: number): number[] {
  const res: number[] = [];
  if (max <= 0) return res;

  for (let i = 1; i <= max; i++) {
    // 先转换为字符串，再转换为数组，反转，比较
    const s = i.toString();
    if (s === s.split('').reverse().join('')) {
      res.push(i);
    }
  }

  return res;
}

/**
 * 查询 1-max 的所有对称数（字符串前后比较）
 * @param max 最大值
 */

export function findPalindromeNumbersStringCompare(max: number): number[] {
  const res: number[] = [];
  if (max <= 0) return res;

  for (let i = 1; i <= max; i++) {
    const s = i.toString();
    const length = s.length;

    // 字符串头尾比较
    let flag = true;
    let startIndex = 0; // 字符串开始
    let endIndex = length - 1; // 字符串结束
    while (startIndex < endIndex) {
      if (s[startIndex] !== s[endIndex]) {
        flag = false;
        break;
      } else {
        // 继续比较
        startIndex++;
        endIndex--;
      }
    }

    if (flag) res.push(i);
  }

  return res;
}

/**
 * 查询 1-max 的所有对称数（翻转数字）
 * @param max 最大值
 */

export function findPalindromeNumbersReverseNumber(max: number): number[] {
  const res: number[] = [];
  if (max <= 0) return res;

  for (let i = 1; i <= max; i++) {
    let n = i;
    let rev = 0; // 存储翻转数

    // i:123
    // n:123

    // 生成翻转数
    while (n > 0) {
      rev = rev * 10 + (n % 10); // rev:3 --- 32 --- 321
      n = Math.floor(n / 10); // n:12 --- 1 --- 0
    }

    // n:0
    // rev:321

    if (i === rev) res.push(i);
  }

  return res;
}

// 功能测试
// 思路1:
// console.log(findPalindromeNumbersArrayReverse(100));
// 思路2:
// console.log(findPalindromeNumbersStringCompare(100));
// 思路3:
// console.log(findPalindromeNumbersReverseNumber(100));

// 性能测试
console.time('findPalindromeNumbersArrayReverse');
findPalindromeNumbersArrayReverse(1000 * 1000);
console.timeEnd('findPalindromeNumbersArrayReverse'); // 201ms

console.time('findPalindromeNumbersStringCompare');
findPalindromeNumbersStringCompare(1000 * 1000);
console.timeEnd('findPalindromeNumbersStringCompare'); // 22ms

console.time('findPalindromeNumbersReverseNumber');
findPalindromeNumbersReverseNumber(1000 * 1000);
console.timeEnd('findPalindromeNumbersReverseNumber'); // 14ms
