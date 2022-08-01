/**
 * @description:EventBus - 拆分保存 on 和 once 事件
 * @author: Yang
 */

export default class EventBus2 {
  private events: {
    [key: string]: Array<Function>;
  };
  private onceEvents: {
    [key: string]: Array<Function>;
  };

  constructor() {
    this.events = {};
    this.onceEvents = {};
  }

  on(type: string, fn: Function) {
    const events = this.events;
    if (events[type] == null || events[type] == undefined) {
      events[type] = [];
    }
    events[type].push(fn);
  }

  once(type: string, fn: Function) {
    const onceEvents = this.onceEvents;
    if (onceEvents[type] == null || onceEvents[type] == undefined) {
      onceEvents[type] = [];
    }

    onceEvents[type].push(fn);
  }

  off(type: string, fn?: Function) {
    if (!fn) {
      delete this.events[type];
      delete this.onceEvents[type];
    } else if (fn && typeof fn === 'function') {
      const fnList = this.events[type];
      const onceFnList = this.onceEvents[type];

      if (fnList) {
        this.events[type] = this.events[type].filter((item) => item !== fn);
      }
      if (onceFnList) {
        this.onceEvents[type] = this.onceEvents[type].filter((item) => item !== fn);
      }
    }
  }

  emit(type: string, ...args: any[]) {
    const fnList = this.events[type];
    const onceFnList = this.onceEvents[type];

    if (fnList) {
      fnList.forEach((fn) => fn(...args));
    }
    if (onceFnList) {
      onceFnList.forEach((fn) => fn(...args));

      this.onceEvents[type] = [];
      // delete this.onceEvents[type];
    }
  }
}

const e = new EventBus2();

function fn1(a: any, b: any) {
  console.log('fn1', a, b);
}
function fn2(a: any, b: any) {
  console.log('fn2', a, b);
}
function fn3(a: any, b: any) {
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
