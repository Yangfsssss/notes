/**
 * @description 数组扁平化 test
 * @author Yang
 */

import { flatten } from './array-flatten';

describe('数组扁平化', () => {
  test('非数组', () => {
    expect(() => {
      //@ts-ignore
      flatten(1);
    }).toThrowError('参数必须是数组');
  });

  test('空数组', () => {
    const res = flatten([]);
    expect(res).toEqual([]);
  });

  test('非嵌套数组', () => {
    const res = flatten([1, 2, 3]);
    expect(res).toEqual([1, 2, 3]);
  });

  test('一级嵌套', () => {
    const res = flatten([1, 2, [10, 20], 3]);
    expect(res).toEqual([1, 2, 10, 20, 3]);
  });

  test('二级嵌套', () => {
    const res = flatten([1, 2, [10, [100, 200], 20], 3]);
    expect(res).toEqual([1, 2, 10, [100, 200], 20, 3]);
  });
});
