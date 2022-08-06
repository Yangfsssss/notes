/**
 * @description 切换字母大小写 test
 * @author Yang
 */

import {
  switchLetterCaseUsingRegExp,
  switchLetterCaseUsingASCII,
  switchLetterCaseUsingToUpperCase,
} from './switch-letter-case';

describe('切换字母大小写', () => {
  test('正常情况', () => {
    const str = '100aBcD$#xYz';
    const res1 = switchLetterCaseUsingRegExp(str);
    const res2 = switchLetterCaseUsingASCII(str);
    const res3 = switchLetterCaseUsingToUpperCase(str);

    expect(res1).toBe('100AbCd$#XyZ');
    expect(res2).toBe('100AbCd$#XyZ');
    expect(res3).toBe('100AbCd$#XyZ');
  });

  test('空字符串', () => {
    expect(switchLetterCaseUsingRegExp('')).toBe('');
    expect(switchLetterCaseUsingASCII('')).toBe('');
    expect(switchLetterCaseUsingToUpperCase('')).toBe('');
  });

  test('非字母', () => {
    expect(switchLetterCaseUsingRegExp('100$#你好')).toBe('100$#你好');
    expect(switchLetterCaseUsingASCII('100$#你好')).toBe('100$#你好');
    expect(switchLetterCaseUsingToUpperCase('100$#你好')).toBe('100$#你好');
  });
});
