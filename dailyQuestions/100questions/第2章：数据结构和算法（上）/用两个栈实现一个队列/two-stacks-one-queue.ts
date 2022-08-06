/**
 * @description 两个栈 - 一个队列
 * @author Yang
 */

export class MyQueue {
  private mainStack: number[] = [];
  private subStack: number[] = [];

  /**
   * 入队
   * @param n n
   */
  add(n: number) {
    this.mainStack.push(n);
  }

  /**
   * 出队
   */
  delete(): number | null {
    let res;

    const mainStack = this.mainStack;
    const subStack = this.subStack;

    // 将 mainStack 所有元素移动到 subStack 中
    while (mainStack.length) {
      const n = mainStack.pop();
      if (n !== undefined && n !== null) {
        subStack.push(n);
      }
    }

    // subStack pop
    res = subStack.pop();

    // 将 subStack 所有元素“还给” mainStack
    while (subStack.length) {
      const n = subStack.pop();
      if (n !== undefined && n !== null) {
        mainStack.push(n);
      }
    }

    return res || null;
  }

  get length(): number {
    return this.mainStack.length;
  }
}

// 功能测试
const q = new MyQueue();
q.add(100);
q.add(200);
q.add(300);
console.log(q.length);
console.log(q.delete());
console.log(q.length);
