/**
 * @description 自定义 new test
 * @author Yang
 */

import { customNew, foo } from './new';

describe('自定义 new', () => {
  test('new', () => {
    // function Foo(this: { name: string; city: string; n: number }, name: string, n: number) {
    //   this.name = name;
    //   this.city = '上海';
    //   this.n = n;
    // }

    // Foo.prototype.getName = function () {
    //   return this.name;
    // };
    class Foo {
      // 属性
      name: string;
      city: string;
      n: number;

      constructor(name: string, n: number) {
        this.name = name;
        this.city = '上海';
        this.n = n;
      }

      getName() {
        return this.name;
      }
    }

    const f = customNew<Foo>(Foo, 'Yang', 100);
    expect(f.name).toBe('Yang');
    expect(f.city).toBe('上海');
    expect(f.n).toBe(100);
    expect(f.getName()).toBe('Yang');
  });
});
