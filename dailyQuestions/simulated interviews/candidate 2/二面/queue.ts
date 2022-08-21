// 队列：先进先出；
// api：入队/出队/获取队列长度；
// 思路：使用class，实现入队方法in、出队方法out和获取队列长度length；

interface ListNode {
  value: unknown;
  next?: ListNode;
}

class Queue {
  private head: ListNode | null = null;
  private tail: ListNode | null = null;
  private listLength: number = 0;

  in(value: unknown) {
    // 初始化链表
    if (this.length === 0) {
      this.head = {
        value,
      };

      this.tail = this.head;
    } else {
      // 入队
      if (this.tail) {
        this.tail.next = { value };
        this.tail = this.tail.next;
      }
    }

    this.listLength++;
  }

  out() {
    // 判断队列是否为空
    if (this.length === 0) {
      return null;
    }

    let value;

    // 出队
    if (this.head) {
      value = this.head.value;

      if (this.head.next) {
        this.head = this.head.next;
      } else {
        this.head = null;
        this.tail = null;
      }
    }

    this.listLength--;

    return value;
  }

  get length() {
    return this.listLength
  }
}

const queue = new Queue();
queue.in(1);
queue.in(2);
queue.in(3);
console.log(queue.out());
console.log(queue.length);
console.log(queue.out());
console.log(queue.out());
