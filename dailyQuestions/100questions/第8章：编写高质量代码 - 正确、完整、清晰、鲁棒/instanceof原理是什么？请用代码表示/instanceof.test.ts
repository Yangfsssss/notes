/**
 * @description 自定义 instanceof test
 * @author Yang
 */

import { myInstanceof } from './instanceof';

describe('自定义 instanceof', () => {
  test('null/undefined', () => {
    const res1 = myInstanceof(null, Object);
    expect(res1).toBe(false);

    const res2 = myInstanceof(undefined, Object);
    expect(res2).toBe(false);
  });

  test('值类型', () => {
    const res1 = myInstanceof(100, Object);
    expect(res1).toBe(false);

    const res2 = myInstanceof(true, Object);
    expect(res2).toBe(false);

    const res3 = myInstanceof('string', Object);
    expect(res3).toBe(false);
  });

  test('引用类型', () => {
    const res1 = myInstanceof([], Array);
    expect(res1).toBe(true);

    const res2 = myInstanceof({}, Object);
    expect(res2).toBe(true);

    const res3 = myInstanceof({}, Array);
    expect(res3).toBe(false);
  });

  test('函数', () => {
    function fn() {}
    const res1 = myInstanceof(fn, Function);
    expect(res1).toBe(true);
  });

  test('自定义', () => {
    class Foo {}
    const f = new Foo();
    const res1 = myInstanceof(f, Foo);
    expect(res1).toBe(true);

    const res2 = myInstanceof(f, Object);
    expect(res2).toBe(true);
  });
});
