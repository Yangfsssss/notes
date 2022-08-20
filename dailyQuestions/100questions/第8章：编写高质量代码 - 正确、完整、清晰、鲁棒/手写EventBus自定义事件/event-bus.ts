/**
 * @description: EventBus
 * @author: Yang
 */

export default class EventBus {
  // 数组是有序结构，对象不是。
  private events: {
    [key: string]: Array<{ fn: (...args:unknown[])=>unknown; isOnce: boolean }>;
  };

  constructor() {
    this.events = {};
  }

  on(type: string, fn: (...args:unknown[])=>unknown, isOnce = false) {
    const events = this.events;

    // 第一次订阅，在events中注册这个type。
    if (events[type] == null || events[type] == undefined) {
      events[type] = [];
    }

    events[type].push({ fn, isOnce });
  }

  once(type: string, fn: (...args:unknown[])=>unknown) {
    this.on(type, fn, true);
  }

  off(type: string, fn?: (...args:unknown[])=>unknown) {
    if (!fn) {
      // this.events[type] = [];
      delete this.events[type];
    } else if (fn && typeof fn === 'function') {
      this.events[type] = this.events[type].filter((item) => item.fn !== fn);
    }
  }

  emit(type: string, ...args: unknown[]) {
    const fnList = this.events[type];
    if (fnList == null || fnList == undefined) return;

    // 注意，在这里filter既遍历执行了fnList，
    // 也过滤掉了isOnce为true的fn，
    // 即filter()可以实现遍历执行和过滤的双重作用。
    this.events[type] = fnList.filter((item) => {
      const { fn, isOnce } = item;
      fn(...args);

      // once执行一次就要过滤掉
      if (!isOnce) return true;
      return false;
    });
  }
}

const e = new EventBus();

function fn1(a: unknown, b: unknown) {
  console.log('fn1', a, b);
}
function fn2(a: unknown, b: unknown) {
  console.log('fn2', a, b);
}
function fn3(a: unknown, b: unknown) {
  console.log('fn3', a, b);
}

e.on('key1', fn1);
e.on('key1', fn2);
e.once('key1', fn3);
e.on('xxxxxx', fn3);

// log三次，分别是：
// fn1 10 20
// fn2 10 20
// fn3 10 20
// 此时fn3自动卸载
e.emit('key1', 10, 20);

// 卸载key1下的fn1
e.off('key1', fn1);

// 此时key1下只有fn2
// log一次，fn2 100 200
e.emit('key1', 100, 200);
