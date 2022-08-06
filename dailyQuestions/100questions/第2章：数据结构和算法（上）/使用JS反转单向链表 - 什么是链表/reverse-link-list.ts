/**
 * @description 反转单向链表
 * @author Yang
 */

export interface ILinkListNode {
  value: number;
  next?: ILinkListNode;
}

/**
 * 反转单向链表，并返回反转之后的 head node
 * @param listNode list head node
 */
export function reverseLinkList(listNode: ILinkListNode): ILinkListNode {
  // 定义三个指针
  let prevNode: ILinkListNode | undefined = undefined;
  let curNode: ILinkListNode | undefined = undefined;
  let nextNode: ILinkListNode | undefined = listNode;

  // nextNode指向头节点，开始遍历链表
  while (nextNode) {
    // 以 curNode 为处理对象
    // 处理第一个元素，反转后它由头变为尾，不应存在next，所以删掉next，防止循环引用
    if (curNode && !prevNode) {
      delete curNode.next;
    }

    // 主流程：指针变向
    if (curNode && prevNode) {
      curNode.next = prevNode;
    }

    // 处理完毕，指针移动
    prevNode = curNode;
    curNode = nextNode;
    nextNode = nextNode?.next;
  }

  // nextNode 离开尾部的时候，遍历结束，但此时 curNode 指向的尾部还没有被处理
  // 处理最后一个元素，指针变向
  curNode!.next = prevNode;

  // 返回链表头节点
  return curNode!;
}

/**
 * 根据数组创建单向链表
 * @param arr number arr
 */
export function createLinkList(arr: number[]): ILinkListNode {
  const length = arr.length;
  if (length === 0) throw new Error('arr is empty');

  let curNode: ILinkListNode = {
    value: arr[length - 1],
  };
  if (length === 1) return curNode;

  for (let i = length - 2; i >= 0; i--) {
    curNode = {
      value: arr[i],
      next: curNode,
    };
  }

  return curNode;
}

// 功能测试
// const arr = [100, 200, 300, 400, 500];
// const list = createLinkList(arr);
// console.log('list', list);

// const list1 = reverseLinkList(list);
// console.log('list1', list1);
