/**
 * @description 数组深度扁平化 test
 * @author Yang
 */

import { flattenAll } from './array-flatten-all';

describe('数组深度扁平化', () => {
  test('非数组', () => {
    expect(() => {
      //@ts-ignore
      flattenAll(1);
    }).toThrowError('参数必须是数组');
  });

  test('空数组', () => {
    const res = flattenAll([]);
    expect(res).toEqual([]);
  });

  test('非嵌套数组', () => {
    const res = flattenAll([1, 2, 3]);
    expect(res).toEqual([1, 2, 3]);
  });

  test('一级嵌套', () => {
    const res = flattenAll([1, 2, [10, 20], 3]);
    expect(res).toEqual([1, 2, 10, 20, 3]);
  });

  test('二级嵌套', () => {
    const res = flattenAll([1, 2, [10, [100, 200], 20], 3]);
    expect(res).toEqual([1, 2, 10, 100, 200, 20, 3]);
  });

  test('三级嵌套', () => {
    const res = flattenAll([1, 2, [10, [100, ['a', [true], 'b'], 200], 20], 3]);
    expect(res).toEqual([1, 2, 10, 100, 'a', true, 'b', 200, 20, 3]);
  });
});
