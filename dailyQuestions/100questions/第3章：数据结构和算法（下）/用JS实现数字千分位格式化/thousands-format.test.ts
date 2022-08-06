/**
 * @description 数字千分位格式化 test
 * @author Yang
 */

import { formatUsingArray, formatUsingString } from './thousands-format';

describe('数字千分位格式化', () => {
  test('正常情况', () => {
    const num = 10201004050;
    const res1 = formatUsingArray(num);
    const res2 = formatUsingString(num);

    expect(res1).toEqual('10,201,004,050');
    expect(res2).toEqual('10,201,004,050');
  });

  test('小于1000', () => {
    expect(formatUsingArray(0)).toEqual('0');
    expect(formatUsingArray(10)).toEqual('10');

    expect(formatUsingString(0)).toEqual('0');
    expect(formatUsingString(10)).toEqual('10');
  });
});
