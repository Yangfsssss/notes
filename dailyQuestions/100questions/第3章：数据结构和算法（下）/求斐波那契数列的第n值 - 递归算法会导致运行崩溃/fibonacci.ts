/**
 * @description 求斐波那契数列的第n值
 * @author Yang
 */

/**
 * 求斐波那契数列的第n值（递归）
 * @param n n
 */

export function nthValueOfFibonacciRecursive(n: number): number {
  if (typeof n !== 'number') throw new Error('n must be a number');
  // if (n < 0) throw new Error('n must be a positive number');
  if (n <= 0) return 0;
  if (n === 1) return 1;

  // O(2^n)
  return nthValueOfFibonacciRecursive(n - 2) + nthValueOfFibonacciRecursive(n - 1);
}

/**
 * 求斐波那契数列的第n值（迭代）
 * @param n n
 */

export function nthValueOfFibonacciIterative(n: number): number {
  if (typeof n !== 'number') throw new Error('n must be a number');
  // if (n < 0) throw new Error('n must be a positive number');
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let i = 1;
  // const queue = [0, 1];
  let n1 = 0;
  let n2 = 1;
  let n3 = 1;

  // O(n)
  while (i < n) {
    // const n1 = queue[0];
    // const n2 = queue[1];
    // queue.push(n1 + n2);
    // queue.shift();

    n3 = n1 + n2;
    n1 = n2;
    n2 = n3;
    i++;
  }

  return n3;
}
