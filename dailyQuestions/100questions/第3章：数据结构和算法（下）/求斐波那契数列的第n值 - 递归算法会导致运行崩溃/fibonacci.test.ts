/**
 * @description 求斐波那契数列的第n值 test
 * @author Yang
 */

import { nthValueOfFibonacciIterative } from './fibonacci';

describe('斐波那契数列', () => {
  test('0 和 1', () => {
    expect(nthValueOfFibonacciIterative(0)).toBe(0);
    expect(nthValueOfFibonacciIterative(1)).toBe(1);
  });

  test('正常情况', () => {
    expect(nthValueOfFibonacciIterative(2)).toBe(1);
    expect(nthValueOfFibonacciIterative(3)).toBe(2);
    expect(nthValueOfFibonacciIterative(6)).toBe(8);
    expect(nthValueOfFibonacciIterative(10)).toBe(55);
  });

  test('n 小于 0', () => {
    expect(nthValueOfFibonacciIterative(-1)).toBe(0);
  });
});
