/** Chapter1： 面对对象的JavaScript*/
//1.1 动态语言类型和鸭子类型----------------------------------------------------
//静态类型语言：编译时确定变量的类型
//动态类型语言：程序运行时，变量被赋予某个值后，才能确定变量的类型

//鸭子类型
function oo() {
  var duck = {
    duckSinging: function () {
      console.log('a duck voice');
    },
  };

  var chicken = {
    duckSinging: function () {
      console.log('a duck voice');
    },
  };

  var choir = [];

  var joinChoir = function (animal) {
    if (animal && typeof animal.duckSinging === 'function') {
      choir.push(animal);
      console.log('welcome!');
      console.log('we got ' + choir.length + ' members');
    }
  };

  joinChoir(duck); //'welcome'
  joinChoir(chicken); //'welcome'
}

// oo();

//1.2 多态----------------------------------------------------------------------------
//多态，即复数形态
//指同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果

//1.2.1 一段“多态”的JavaScript代码
function oto() {
  var makeSound = function (animal) {
    if (animal instanceof Duck) {
      console.log('a duck voice');
    } else if (animal instanceof Chicken) {
      console.log('a chicken voice');
    }
  };

  var Duck = function () {};
  var Chicken = function () {};

  makeSound(new Duck());
  makeSound(new Chicken());
}

// oto()

//1.2.2 对象的多态性
function ott() {
  //不变部分：发出声音
  var makeSound = function (animal) {
    animal.sound();
  };

  //可变部分：不同动物声音不同
  var Duck = function () {};
  Duck.prototype.sound = function () {
    console.log('a duck voice');
  };

  //   var Chicken = function () {};
  //   Chicken.prototype.sound = function () {
  //     console.log('a chicken voice');
  //   };

  class Chicken {
    constructor(props) {}

    sound = function () {
      console.log('a chicken voice');
    };
  }

  //调用（发出同一指令）
  makeSound(new Duck());
  makeSound(new Chicken());

  //发生变化：可变部分
  var Dog = function () {};
  Dog.prototype.sound = function () {
    console.log('a dog voice');
  };

  makeSound(new Dog());
}

// ott();

//1.2.3 类型检查和多态
//静态类型语言能够检查参数的类型并做出限制，称为类型检查
//类型检查带来安全性的同时也对开发做出了限制
//为了解决这一问题，静态类型的面向对象语言通常被设计为可以向上转型
//即当给一个类变量赋值时，这个变量的类型既可以使用这个类本身
//也可以使用这个类的超类

//1.2.4 使用继承得到多态效果（Java）
//使用继承来得到多态效果，是让对象表现出多态性的最常用手段
//继承通常包括实现继承和接口继承

//实现继承
//Java代码....

//1.2.5 JavaScript的多态
//JavaScript中的多态性是与生俱来的，它在编译时没有检查类型的过程
//既没有检查创建对象的类型，也没有检查传递参数的类型
//所以不需要诸如向上转型之类的技术来取得多态的效果

//1.2.6 多态在面对对象程序设计中的作用
function ots() {
  //原始状态
  var googleMap = {
    show: function () {
      console.log('render google map');
    },
  };

  //增加
  var baiduMap = {
    show: function () {
      console.log('render baidu map');
    },
  };

  var renderMap = function (type) {
    if (type === 'google') {
      googleMap.show();
    } else if (type === 'baidu') {
      baiduMap.show();
    }
  };

  renderMap('google');

  renderMap('baidu');
}

// ots();

//多态增强版
function ots1() {
  var renderMap = function (map) {
    if (map.show instanceof Function) {
      map.show();
    }
  };

  //原始状态
  var googleMap = {
    show: function () {
      console.log('render google map');
    },
  };

  var baiduMap = {
    show: function () {
      console.log('render baidu map');
    },
  };

  renderMap(googleMap);
  renderMap(baiduMap);

  //增加
  var sosoMap = {
    show: function () {
      console.log('render soso map');
    },
  };

  renderMap(sosoMap);
}

// ots1()

//1.2.7 设计模式与多态
//通过对封装、继承、多态、组合等技术的反复使用，提炼出一些
//可重复使用的面向对象设计技巧，而多态在其中又是重中之重，
//绝大部分设计模式的实现都离不开多态性的思想。

//1.3 封装--------------------------------------------------------------------------------
//封装的目的是将信息隐藏。一般而言，我们讨论的封装是封装数据
//和封装实现。这一节将讨论更广义的封装，不仅包括封装数据和
//封装实现，还包括封装类型和封装变化

//1.3.1 封装数据
//利用函数来创建作用域
function oto() {
  var myObject = (function () {
    var _name = 'sven'; //私有变量

    return {
      //公开方法
      getName: function () {
        return _name;
      },
    };
  })();

  console.log(myObject.getName());
  console.log(myObject._name);
}

// oto();

//1.3.2 封装实现
//封装的目的是将信息隐藏，封装应该被视为“任何形式的封装”，
//也就是说，封装不仅仅是隐藏数据，还包括隐藏实现细节、
//设计细节以及隐藏对象的类型等

//1.3.3 封装类型
//JavaScript是一门类型模糊的语言，没有对抽象类和接口的支持
//JavaScript没有能力，也没有必要做得更多

//1.3.4 封装变化
//从设计模式的角度出发，封装在更重要的层面体现为封装变化。
//当我们想办法把程序中变化的部分封装好之后，剩下的即是稳定而可复用的部分了。

//1.4 原型模式和基于原型继承的JavaScript对象系统------------------------------------------
//在以类为中心的面向对象编程语言中，类和对象的关系可以想象成铸模和铸件的关系，
//对象总是从类中创建而来。而在原型编程的思想中，
//类并不是必需的，对象未必需要从类中创建而来，
//一个对象是通过克隆另外一个对象所得到的。

//1.4.1 使用克隆的原型模式
//从设计模式的角度讲，原型模式是用于创建对象的一种模式，
//如果我们想要创建一个对象，一种方法是先指定它的类型，然后通过类来创建这个对象。
//原型模式选择了另外一种方式，我们不再关心对象的具体类型，而是找到一个对象，
//然后通过克隆来创建一个一模一样的对象。既然原型模式是通过克隆来创建对象的，
//那么很自然地会想到，如果需要一个跟某个对象一模一样的对象，就可以使用原型模式。

//原型模式的关键，是语言本身是否提供了clone()方法
function ofo() {
  var Plane = function () {
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
  };

  var plane = new Plane();

  plane.blood = 500;
  plane.attackLevel = 10;
  plane.defenseLevel = 7;

  var clonePlane = Object.create(plane);

  console.log(clonePlane.blood);
  console.log(clonePlane.attackLevel);
  console.log(clonePlane.defenseLevel);

  //在不支持Object.create方法的浏览器中
  var anotherPlane = (function () {
    var F = function () {
      Plane.call(this);
    };

    F.prototype = Plane;

    return new F();
  })();

  console.log(anotherPlane);
  console.log(anotherPlane.blood);
  console.log(anotherPlane.attackLevel);
  console.log(anotherPlane.defenseLevel);
}

// ofo();

//1.4.2 克隆是创建对象的手段

//1.4.3 体验lo语言

//1.4.4 原型编程范型的一些规则
//所有的数据都是对象。
//要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
//对象会记住它的原型。
//如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。

//1.4.5 JavaScript中的原型继承
function off() {
  //1,所有的数据都是对象,Object.prototype === {}
  var obj1 = new Object();
  var obj2 = {};

  console.log(Object.getPrototypeOf(obj1) === Object.prototype);
  console.log(Object.getPrototypeOf(obj2) === Object.prototype);

  //2,要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
  function Person(name) {
    this.name = name;
  }

  Person.prototype.getName = function () {
    return this.name;
  };

  var a = new Person('sven');

  console.log(a.name);
  console.log(a.getName());
  console.log(Object.getPrototypeOf(a) === Person.prototype);

  //3,对象会记住它的原型：__proto__
  //对象把请求委托给它的构造器的原型

  //4,如果对象无法响应某个请求，它会把这个请求委托给它的构造器的原型
  //b---B---B.prototype(new A())---A---A.prototype---Object---Object.prototype
}

//   off()

//new运算的过程
function off1() {
  function Person(name) {
    this.name = name;
  }

  Person.prototype.getName = function () {
    return this.name;
  };

  var objectFactory = function () {
    var obj = new Object();
    var Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    var ret = Constructor.apply(obj, arguments);

    return typeof ret === 'object' ? ret : obj;
  };

  var a = objectFactory(Person, 'sven');

  console.log(a.name);
  console.log(a.getName());
  console.log(Object.getPrototypeOf(a) === Person.prototype);
}

// off1()

//1.4.6 原型继承的未来
function ofs() {
  //创建没有原型的对象
  const objWithoutPrototype = Object.create(null);
  console.log(Object.getPrototypeOf(objWithoutPrototype));

  //Class语法
  class Animal {
    constructor(name) {
      this.name = name;
    }

    getName() {
      return this.name;
    }
  }

  class Dog extends Animal {
    constructor(name) {
      super(name);
    }

    speak() {
      return 'woof';
    }
  }

  var dog = new Dog('Scamp');
  console.log(dog.getName() + ' says ' + dog.speak());
}

// ofs();
