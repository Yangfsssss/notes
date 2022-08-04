/**
 * @description 用链表实现队列
 * @author Yang
 */

interface IListNode {
  value: number;
  next: IListNode | null;
}

export class MyQueue {
  private head: IListNode | null = null;
  private tail: IListNode | null = null;
  private len: number = 0;

  /**
   * 入队，在 tail 位置
   * @param n number
   */
  add(n: number) {
    const newNode: IListNode = {
      value: n,
      next: null,
    };

    // 处理 head
    if (this.head === null) {
      this.head = newNode;
    }

    // 处理 tail
    const tailNode = this.tail;
    if (tailNode) {
      tailNode.next = newNode;
    }
    this.tail = newNode;

    // 记录长度
    this.len++;
  }

  /**
   * 出队，在 head 位置
   */
  delete(): number | null {
    const headNode = this.head;
    if (!headNode) return null;
    if (this.len <= 0) return null;

    // 处理head
    this.head = headNode.next;

    // 记录长度
    this.len--;

    return headNode.value;
  }

  get length(): number {
    // length 要单独存储，不能遍历链表来获取（否则时间复杂度太高O(n)）
    return this.len;
  }
}

// 功能测试
// const q = new MyQueue();
// q.add(100);
// q.add(200);
// q.add(300);
// console.log('length1', q.length);
// console.log('delete1', q.delete());
// console.log('length2', q.length);
// console.log('delete2', q.delete());
// console.log('length3', q.length);
// console.log('delete3', q.delete());
// console.log('length4', q.length);
// console.log('delete4', q.delete());
// console.log('length5', q.length);

// 性能测试
const q1 = new MyQueue();
console.time('queue with list');
for (let i = 0; i < 100 * 1000; i++) {
  q1.add(i);
}
for (let i = 0; i < 100 * 1000; i++) {
  q1.delete();
}
console.timeEnd('queue with list'); // 17ms

const q2 = [];
console.time('queue with array');
for (let i = 0; i < 100 * 1000; i++) {
  q2.push(i);
}
for (let i = 0; i < 100 * 1000; i++) {
  q2.shift();
}
console.timeEnd('queue with array'); // 431ms
