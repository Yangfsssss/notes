// 装饰class：
// 装饰器的工厂函数（工厂模式）
export function testable(value: boolean) {
  return function (target: any) {
    target.isTestable = value;
  };
}

@testable(false)
class Foo {
  static isTestable?: boolean;
}

// console.log(Foo.isTestable);

// ----------------------------------------------------------------
// 装饰class方法：
/**
 * readOnly 装饰器
 * @param target 实例
 * @param key key
 * @param descriptor 属性描述符
 */

function readOnly(target: any, key: string, descriptor: PropertyDescriptor) {
  // console.log('target', target);
  // console.log('key', key);
  descriptor.writable = false;
}

function configurable(value: boolean) {
  return function (target: any,key: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  }
}

class Bar {
  private readonly name = 'Jack';
  private age = '28';

  @readOnly
  getName() {
    return this.name;
  }

  @configurable(false)
  getAge() {
    return this.age;
  }
}

const b = new Bar();

// b.getName = ()=>{console.log('修改了');return '123'};
// b.getName();

// console.log(Object.getOwnPropertyDescriptor(b.__proto__,'getAge'));


 
