/**
 * @description EventBus test
 * @author Yang
 */

// import { EventBus } from './event-bus';
import EventBus from './event-bus-split-on-once';

describe('EventBus 自定义事件', () => {
  test('绑定事件，触发事件', () => {
    const event = new EventBus();

    // 注意
    const fn1 = jest.fn(); // jest mock function
    const fn2 = jest.fn(); // jest mock function
    const fn3 = jest.fn(); // jest mock function

    event.on('key1', fn1);
    event.on('key1', fn2);
    event.on('xxxxxx', fn3);

    event.emit('key1', 10, 20);

    expect(fn1).toBeCalledWith(10, 20);
    expect(fn2).toBeCalledWith(10, 20);
    expect(fn3).not.toBeCalled();
  });

  test('解绑单个事件', () => {
    const event = new EventBus();

    const fn1 = jest.fn(); // jest mock function
    const fn2 = jest.fn(); // jest mock function

    event.on('key1', fn1);
    event.on('key1', fn2);

    event.off('key1', fn1);

    event.emit('key1', 10, 20);

    expect(fn1).not.toBeCalled();
    expect(fn2).toBeCalledWith(10, 20);
  });

  test('解绑所有事件', () => {
    const event = new EventBus();

    const fn1 = jest.fn(); // jest mock function
    const fn2 = jest.fn(); // jest mock function

    event.on('key1', fn1);
    event.on('key1', fn2);

    event.off('key1');

    event.emit('key1', 10, 20);

    expect(fn1).not.toBeCalled();
    expect(fn2).not.toBeCalled();
  });

  test('once', () => {
    const event = new EventBus();

    const fn1 = jest.fn(); // jest mock function
    const fn2 = jest.fn(); // jest mock function

    event.once('key1', fn1);
    event.once('key1', fn2);

    event.emit('key1', 10, 20);
    expect(fn1).toBeCalledWith(10, 20);
    expect(fn2).toBeCalledWith(10, 20);

    event.emit('key1', 10, 20);
    expect(fn1).toBeCalledTimes(1);
    expect(fn2).toBeCalledTimes(1);
  });

  test('once2', () => {
    const event = new EventBus();

    let n = 1;

    const fn1 = jest.fn(() => n++); // jest mock function
    const fn2 = jest.fn(() => n++); // jest mock function

    event.once('key1', fn1);
    event.once('key1', fn2);

    // 无论 emit 多少次，只有一次生效
    event.emit('key1');
    event.emit('key1');
    event.emit('key1');
    event.emit('key1');
    event.emit('key1');

    expect(n).toBe(3);
  });
});
