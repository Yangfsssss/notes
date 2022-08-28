// AOP：
// Aspect Oriented Program 面向切面编程；
// 业务和系统基础功能分离，和Decorator很配；
// AOP和OOP并不冲突；

export function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const oldValue = descriptor.value;

  // 重新定义fn1方法
  descriptor.value = function () {
    console.log('记录日志');
    return oldValue.apply(this, arguments);
  };
}

class Foo {
  @log
  fn1() {
    console.log('业务功能 - 点赞');
  }
}

const f = new Foo();
f.fn1();
