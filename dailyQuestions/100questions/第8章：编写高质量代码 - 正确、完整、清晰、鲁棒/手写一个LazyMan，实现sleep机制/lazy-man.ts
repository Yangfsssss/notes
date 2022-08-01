// 思路：将同步任务转换为异步任务。
// 添加时，取消已有的执行任务；
// eat（同步）时，添加返回一个setTimeout 0ms后落定的promise的函数任务；
//sleep（异步）时，添加返回一个setTimeout nms后落定的promise的函数任务；
// 添加后，任务更新，setTimeout延迟0ms异步等待执行所有任务；

class LazyMan {
  private name: string;
  private taskQueue: Set<() => Promise<unknown>>;
  private timer: NodeJS.Timeout | undefined;

  constructor(name: string) {
    this.name = name;
    this.timer = undefined;
    this.taskQueue = new Set();
  }

  execTask() {
    this.timer = setTimeout(async () => {
      for (const task of this.taskQueue.values()) {
        await task();
      }
    }, 0);
  }

  eat(fruit: string) {
    clearTimeout(this.timer);

    this.taskQueue.add(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(null);
            console.log(`${this.name} eating ${fruit}`);
          }, 0);
        })
    );

    this.execTask();

    return this;
  }

  sleep(time: number) {
    clearTimeout(this.timer);

    this.taskQueue.add(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(null);
            console.log('sleep end');
          }, time * 1000);
        })
    );

    this.execTask();

    return this;
  }
}

class SimpleLazyMan {
  private name: string;
  private tasks: (() => void)[];

  constructor(name: string) {
    this.name = name;
    this.tasks = [];

    setTimeout(() => {
      this.next();
    }, 0);
  }

  private next() {
    const task = this.tasks.shift();
    task && task();
  }

  eat(fruit: string) {
    const task = () => {
      console.log(`${this.name} eating ${fruit}`);
      this.next();
    };

    this.tasks.push(task);

    return this;
  }

  sleep(time: number) {
    const task = () => {
      console.log('sleep start');

      setTimeout(() => {
        console.log('sleep end');
        this.next();
      }, time * 1000);
    };

    this.tasks.push(task);

    return this;
  }
}

const me = new LazyMan('Yang');
me.eat('apple').eat('banana').sleep(2).eat('grape');
