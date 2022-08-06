/**
 * @description Array rotate test
 * @author Yang
 */

import { rotatePop, rotateSlice } from './array-rotate';

describe('数组旋转', () => {
  test('正常情况', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const k = 3;
    const res = rotateSlice(arr, k);

    expect(res).toEqual([5, 6, 7, 1, 2, 3, 4]);
  });

  test('数组为空', () => {
    const res = rotateSlice([], 3);

    expect(res).toEqual([]);
  });

  test('k 为负值', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const k = -3;

    const res = rotateSlice(arr, k);
    expect(res).toEqual([5, 6, 7, 1, 2, 3, 4]);
  });

  test('k 为 0', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const k = 0;

    const res = rotateSlice(arr, k);
    expect(res).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test('k 不是数字', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const k = 'abc';

    //@ts-ignore
    const res = rotateSlice(arr, k);
    expect(res).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
