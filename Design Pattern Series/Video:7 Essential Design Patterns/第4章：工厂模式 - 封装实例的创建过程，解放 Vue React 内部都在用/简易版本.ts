// 简易版本
export class Product {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  fn1() {
    alert('product fn1');
  }

  fn2() {
    alert('product fn2');
  }
}

// 工厂
class Creator {
  create(name: string): Product {
    return new Product(name);
  }
}

// test
const creator = new Creator();
const p1 = creator.create('p1');
const p2 = creator.create('p2');
const p3 = creator.create('p3');
