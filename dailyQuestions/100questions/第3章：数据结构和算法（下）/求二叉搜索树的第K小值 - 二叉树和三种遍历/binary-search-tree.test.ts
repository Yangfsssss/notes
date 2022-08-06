/**
 * @description: 二叉搜索树 test
 * @author Yang
 */

import { bst, getKthValue } from './binary-search-tree';

describe('二叉搜索树', () => {
  test('正常情况', () => {
    const res = getKthValue(bst, 3);
    expect(res).toBe(4);
  });

  test('k 不在正常范围之内', () => {
    const res = getKthValue(bst, 0);
    expect(res).toBeNull();

    const res2 = getKthValue(bst, 1000);
    expect(res2).toBeNull();
  });
});
