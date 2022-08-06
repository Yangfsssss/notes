/**
 * @description 数字千分位格式化
 * @author Yang
 */

/**
 * 数字千分位格式化（使用数组）
 * @param n number
 */

export function formatUsingArray(n: number): string {
  n = Math.floor(n); // 只考虑整数

  const s = n.toString();
  const arr = s.split('').reverse();

  return arr.reduce((prev, curr, index) => {
    // 连接字符，每连接三次插入一个逗号
    if (index % 3 === 0) {
      if (prev) {
        return curr + ',' + prev;
      } else {
        return curr;
      }
    } else {
      return curr + prev;
    }
  }, '');
}

/**
 * 数字千分位格式化（使用字符串）
 * @param n number
 */

export function formatUsingString(n: number): string {
  n = Math.floor(n); // 只考虑整数

  let res = '';
  let s = n.toString();
  const length = s.length;

  for (let i = length - 1; i >= 0; i--) {
    const j = length - i;
    if (j % 3 === 0 && i !== 0) {
      res = ',' + s[i] + res;
    } else {
      res = s[i] + res;
    }
  }

  return res;
}

// 功能测试
const n = 10201004050;
console.log(formatUsingArray(n));
console.log(formatUsingString(n));
