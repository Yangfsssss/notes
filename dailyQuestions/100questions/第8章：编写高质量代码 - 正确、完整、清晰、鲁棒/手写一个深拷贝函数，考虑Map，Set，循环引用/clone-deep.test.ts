/**
 * @description 深拷贝 test
 * @author Yang
 */

import { cloneDeep } from './clone-deep';

describe('深拷贝', () => {
  test('值类型', () => {
    expect(cloneDeep(100)).toBe(100);
    expect(cloneDeep('abc')).toBe('abc');
    expect(cloneDeep(null)).toBe(null);
  });

  test('普通对象和数组', () => {
    const obj = {
      name: 'Yang',
      info: {
        city: 'Shanghai',
      },
      arr: [10, 20, 30],
    };

    const cloneObj = cloneDeep(obj);

    obj.info.city = 'MaJiaDian';
    obj.arr.push(40);

    expect(cloneObj.info.city).toBe('Shanghai');
    expect(cloneObj.arr).toEqual([10, 20, 30]);
  });

  test('Map', () => {
    const map = new Map([
      ['x', 10],
      ['y', 20],
    ]);
    const cloneMap = cloneDeep(map);
    expect(cloneMap.size).toBe(2);

    const obj = {
      map: new Map([
        ['x', 10],
        ['y', 20],
      ]),
    };
    const cloneObj = cloneDeep(obj);
    expect(cloneObj.map.size).toBe(2);
  });

  test('Set', () => {
    const set = new Set([10, 20, 30]);
    const cloneSet = cloneDeep(set);
    expect(cloneSet.size).toBe(3);

    const obj = {
      set: new Set([10, 20, 30]),
    };
    const cloneObj = cloneDeep(obj);
    expect(cloneObj.set.size).toBe(3);
  });

  test('循环引用', () => {
    const a: any = {};
    a.self = a;

    const b = cloneDeep(a);
    expect(b.self).toBe(b);
  });

  // test('其他类型数据', () => {
  //   const a = {
  //     date: Date(),
  //     regExp: /abc/,
  //     func: () => console.log(100),
  //     symbol: Symbol('abc'),
  //     bigint: BigInt(100),
  //     error: new Error('error'),
  //     math: Math,
  //   };

  //   const b = cloneDeep(a);

  // expect(b.date).toEqual(Date());
  // expect(b.regExp).toEqual(/abc/);
  // expect(b.func).toEqual(a.func);
  // expect(b.func).toBe(a.func);
  // expect(b.symbol).toEqual(Symbol('abc'));
  // expect(b.symbol).not.toBe(Symbol('abc'));
  // expect(b.bigint).toEqual(BigInt(100));
  // expect(b.error).toEqual(new Error('error'));
  // expect(b.math).toEqual(Math);
  // });
});
