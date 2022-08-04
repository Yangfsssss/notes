/**
 * @description 反转单向链表
 * @author Yang
 */

import { ILinkListNode, createLinkList, reverseLinkList } from './reverse-link-list';

describe('反转单向链表', () => {
  test('单个元素', () => {
    const node: ILinkListNode = {
      value: 100,
    };
    const node1 = reverseLinkList(node);
    expect(node1).toEqual({ value: 100 });
  });

  test('多个元素', () => {
    const node = createLinkList([100, 200, 300]);
    const node1 = reverseLinkList(node);

    expect(node1).toEqual({
      value: 300,
      next: {
        value: 200,
        next: {
          value: 100,
        },
      },
    });
  });
});
