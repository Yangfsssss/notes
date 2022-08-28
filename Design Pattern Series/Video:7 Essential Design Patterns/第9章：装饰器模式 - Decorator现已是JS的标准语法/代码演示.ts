// 将一个对象或函数传入一个装饰函数中；
// 使其：
// 1，增加/修改某个属性，由装饰器控制 - 装饰class
// 2，聚合函数的行为，额外的行为由装饰器控制 - 装饰class method

export class Circle {
  draw(){
    console.log('画一个圆形');
  }
}

class Decorator { 
  private circle:Circle;

  constructor(circle:Circle){
    this.circle = circle;
  }

  draw(){
    this.circle.draw(); // 原有功能
    this.setBorder(); // 装饰
  }

  private setBorder(){
    console.log('设置边框的颜色');
  }
}

const circle = new Circle();
const decorator = new Decorator(circle);

decorator.draw();