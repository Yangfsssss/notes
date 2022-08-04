/**
 * @description 二分查找 test
 * @author Yang
 */

import { binarySearchIterative, binarySearchRecursive } from './binary-search';

describe('二分查找', () => {
  test('正常情况', () => {
    const arr = [10, 20, 30, 40, 50];
    const target = 40;
    const index = binarySearchIterative(arr, target);

    expect(index).toBe(3);
  });

  test('空数组', () => {
    expect(binarySearchIterative([], 100)).toBe(-1);
  });

  test('找不到 target', () => {
    const arr = [10, 20, 30, 40, 50];
    const target = 400;
    const index = binarySearchIterative(arr, target);

    expect(index).toBe(-1);
  });
});
