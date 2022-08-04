/**
 * @description 括号匹配 test
 * @author Yang
 */

import { matchBracket } from './match-bracket';

describe('括号匹配', () => {
  test('正常情况', () => {
    const str = '{a(b[c]d)e}f';
    const res = matchBracket(str);

    // 值类型用toBe()，引用类型用toEqual()
    expect(res).toBe(true);
  });

  test('不匹配', () => {
    const str = '{a(b[(c]d)e}f';
    const res = matchBracket(str);

    expect(res).toBe(false);
  });

  test('顺序不一致的', () => {
    const str = '{a(b[c]d}e)f';
    const res = matchBracket(str);

    expect(res).toBe(false);
  });

  test('空字符串', () => {
    const str = '';
    const res = matchBracket(str);

    expect(res).toBe(true);
  });
});
