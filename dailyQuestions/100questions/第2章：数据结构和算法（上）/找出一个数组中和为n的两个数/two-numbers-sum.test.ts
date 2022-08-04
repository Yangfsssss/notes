/**
 * @description 两数之和 test
 * @author Yang
 */

import { findTwoNumbers2 } from './two-numbers-sum';

describe('两数之和', () => {
  test('正常情况', () => {
    const arr = [1, 2, 4, 7, 11, 15];
    const n = 15;
    const res = findTwoNumbers2(arr, n);

    expect(res).toEqual([4, 11]);
  });

  test('空数组', () => {
    const res = findTwoNumbers2([], 100);

    expect(res).toEqual([]);
  });

  test('找不到结果', () => {
    const arr = [1, 2, 4, 7, 11, 15];
    const n = 100;
    const res = findTwoNumbers2(arr, n);

    expect(res).toEqual([]);
  });
});
