/** 第2章 写的都是看到的---面对对象编程 */
//2.1 两种编程风格---面向过程与面向对象
//2.2 包装明星---封装
//创建一个类
function tt() {
  var Book = function (id, bookName, price) {
    this.id = id;
    this.bookName = bookName;
    this.price = price;
  };

  Book.prototype.display = function () {
    //展示这本书
  };

  //或者
  Book.prototype = {
    display: function () {
      //展示这本书
    },
  };

  var book = new Book(10, 'Javascript设计模式', 50);
  console.log(book.bookName);
}

// tt()

//属性方法与封装
//私有属性与私有方法，特权方法，对象公有属性和方法，构造器
function tt1() {
  var Book = function (id, name, price) {
    //私有属性
    var num = 1;

    //私有方法
    function checkId() {
      //...
    }

    //特权方法
    this.getName = function () {};
    this.getPrice = function () {};
    this.setName = function (name) {
      this.name = name;
    };
    this.setPrice = function (price) {
      this.price = price;
    };

    //对象公有属性
    this.id = id;

    //对象公有方法
    this.copy = function () {};

    //构造器
    this.setName(name);
    this.setPrice(price);
  };

  //类静态公有属性（对象不能访问）
  Book.inChinese = true;

  //类静态公有方法（对象不能访问）
  Book.resetTime = function () {
    console.log('new Time');
  };

  Book.prototype = {
    //公有属性
    isJsBook: false,

    //公有方法
    display: function () {},
  };

  var book = new Book(5, 'The unbearable lightness of being', 38);

  console.log(book);
  console.log(book.num);
  console.log(book.isJsBook);
  console.log(book.id);
  console.log(book.inChinese);

  console.log(Book.inChinese);
  Book.resetTime();
}

// tt1()

//闭包实现
function tt2() {
  var Book = (function () {
    //静态私有变量
    var bookNum = 0;

    //静态私有方法
    function checkBook(name) {}

    //返回构造函数
    return function (newId, newName, newPrice) {
      //私有变量
      var name, price;

      //私有方法
      function checkID(id) {}

      //特权方法
      this.getName = function () {};
      this.getPrice = function () {};
      this.setName = function () {};
      this.setPrice = function () {};

      //公有属性
      this.id = newId;

      //公有方法
      this.copy = function () {};

      bookNum++;

      if (bookNum > 100) {
        throw new Error('我们仅出版100本书');
      }

      //构造器
      this.setName(newName);
      this.setPrice(newPrice);
    };
  })();

  Book.prototype = {
    //静态公有属性
    isJsBook: false,

    //静态公有方法
    display: function () {},
  };
}

//避免遗漏new关键字的方法
function tt3() {
  var Book = function (title, time, type) {
    //方法一：判断this是否为构造函数的实例
    if (this instanceof Book) {
      this.title = title;
      this.time = time;
      this.type = type;
    } else {
      console.log("this isn't a instance of Book");
    }

    //方法二：判断new.target是否存在
    if (new.target) {
      this.title = title;
      this.time = time;
      this.type = type;
    } else {
      console.log("new.target didn't exist");
    }

    // console.log(new.target)
  };

  var book = Book('The unbearable lightness of being', 12, 'fiction');
  console.log(book);
}

// tt3()

//2.3 传宗接代---继承
//类式继承------------------------------------------------------------
function tt() {
  //声明父类
  function SuperClass() {
    this.superValue = true;
  }

  //为父类添加公有方法
  SuperClass.prototype.getSuperValue = function () {
    return this.superValue;
  };

  //声明子类
  function SubClass() {
    this.subValue = false;
  }

  //继承父类
  SubClass.prototype = new SuperClass();

  //为子类添加公有方法
  SubClass.prototype.getSubValue = function () {
    return this.subValue;
  };

  //!!!遗漏了将子类原型的constructor属性置为子类构造函数
  SubClass.prototype.constructor = SubClass;

  // console.log(new subClass().constructor)

  var instance = new SubClass();

  // console.log(instance.getSubValue())
  // console.log(instance.getSuperValue())
  console.log(instance instanceof SubClass);
  console.log(instance instanceof SuperClass);
  console.log(SubClass instanceof SuperClass);
  console.log(SubClass.prototype instanceof SuperClass);
  console.log(instance instanceof Object);
}

// tt4()

//类式继承的缺点：一个子类对继承属性的更改会影响其他子类------------------------------------------------------------
//原因是父类的实例属性在原型链中传递成为了子类的静态属性
function tt1() {
  function SuperClass(arg) {
    console.log('this in SuperClass', this);
    this.books = ['JavaScript', 'html', 'css', arg];
  }

  function SubClass(arg) {
    // SuperClass()
    //修复：将父类构造实例的过程引用至子类构造实例的过程中
    //即将父类的实例属性也构造至子类中，成为子类的实例属性
    SuperClass.call(this, arg);
  }

  SubClass.prototype = new SuperClass();

  var instance1 = new SubClass('a test book');
  var instance2 = new SubClass();

  console.log(instance2.books);

  instance1.books.push('设计模式');

  console.log(instance1.books);
  console.log(instance2.books);
}

// tt1()

//构造函数式继承------------------------------------------------------------
//将父类的实例属性也构造至子类中，但不设置原型链
function tt2() {
  //声明父类
  function SuperClass(id) {
    //引用类型公有属性
    this.books = ['JavaScript', 'html', 'css'];
    //值类型公有属性
    this.id = id;
  }

  //父类声明原型方法
  SubClass.prototype.showBooks = function () {
    console.log(this.books);
  };

  //声明子类
  function SubClass(id) {
    //继承父类
    SuperClass.call(this, id);
  }

  var instance1 = new SubClass(10);

  console.log(instance1);
  instance1.showBooks();
}

// tt2()

//原型式继承-----------------------------------------------------------------------
//类似类式继承
function tt3() {
  function inheritObject(o) {
    //声明一个过渡函数对象
    function F() {}

    //过度对象的原型继承父对象
    F.prototype = o;

    //返回过渡对象的一个实例，该实力的原型继承了父对象
    return new F();
  }

  const SuperClass = {
    superValue: 'superClass',
    valueArrayCanBeEffected: ['1', '2', '3'],
  };

  const f = inheritObject(SuperClass);

  f.superValue = 'subClass';
  //赋值语句，在f中创建一个valueArrayCanBeEffected属性，并赋值
  f.valueArrayCanBeEffected = ['2', '2', '3'];
  //先查询，查找到存在valueArrayCanBeEffected属性，再对其赋值
  f.valueArrayCanBeEffected[0] = '2';

  console.log(f);
  console.log(SuperClass);
}

// tt3()

function InheritObject(o) {
  //声明一个过渡函数对象
  function F() {}

  //过度对象的原型继承父对象
  F.prototype = o;

  //返回过渡对象的一个实例，该实例的原型继承了父对象
  return new F();
}

//如虎添翼---寄生式继承------------------------------------------------------------
function tt4() {
  //声明基对象
  var SuperBook = {
    name: 'js book',
    aLikeBook: ['css book', 'html book'],
  };

  //原型链f---InheritObject---F()---
  function InheritObject(o) {
    //声明一个过渡函数对象
    function F() {}

    //过度对象的原型继承父对象
    F.prototype = o;

    //返回过渡对象的一个实例，该实例的原型继承了父对象
    return new F();
  }

  function createBook(obj) {
    //通过原型继承方式创建新对象
    var o = new InheritObject(obj);

    //拓展新对象
    o.getName = function () {
      console.log(this.name);
    };

    //返回拓展后的新对象
    return o;
  }

  const f = createBook(SuperBook);

  console.log(f);
  f.getName();
  console.log(f.name);
  console.log(f.aLikeBook);
  console.log(f.hasOwnProperty('name'));
  console.log(f.hasOwnProperty('aLikeBook'));
  f.aLikeBook[0] = 'typeScript';
  console.log(f.aLikeBook);
}

// tt4()

//寄生组合式继承-------------------------------------------------------------
function inheritPrototype(SubClass, SuperClass) {
  //复制一份父类的原型副本保存在变量中
  var p = InheritObject(SuperClass.prototype);

  //修正因为重写子类原型导致子类的constructor属性被修改
  p.constructor = SubClass;

  //设置子类的原型
  SubClass.prototype = p;
}

function tt5() {
  //定义父类
  function SuperClass(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
  }

  //定义父类原型方法
  SuperClass.prototype.getName = function () {
    console.log(this.name);
  };

  //定义子类
  function SubClass(name, time) {
    //构造函数式继承
    SuperClass.call(this, name);

    //子类新增属性
    this.time = time;
  }

  //寄生式继承父类原型
  inheritPrototype(SubClass, SuperClass);

  //子类新增原型方法
  SubClass.prototype.getTime = function () {
    console.log(this.time);
  };

  //创建两个测试方法
  var instance1 = new SubClass('js book', 2014);
  var instance2 = new SubClass('css book', 2013);

  instance1.colors.push('black');
  console.log(instance1.colors);
  console.log(instance2.colors);
  instance2.getName();
  instance2.getTime();
}

// tt5()

//2.4 多继承--------------------------------------------------------------------------
//单继承 属性复制
function tt6() {
  var extend = function (target, source) {
    //遍历源对象中的属性
    for (var property in source) {
      //将源对象中的属性复制到目标对象中
      target[property] = source[property];
    }

    //返回目标对象
    return target;
  };

  const newObj = {};

  const sourceObj = {
    key1: 'value1',
    key2: 'value2',
  };

  console.log(extend(sourceObj, newObj));
}

// tt6()

//多继承 属性复制
function tt7() {
  var mix = function (target, ...sources) {
    //从第二个参数起为被继承的对象
    var i = 1;
    //获取参数长度
    var len = arguments.length;
    //第一个对象为目标对象
    var target = arguments[0];
    //缓存参数对象
    var arg;

    //遍历被继承的对象
    for (; i < len; i++) {
      //缓存当前对象
      arg = arguments[i];
      //遍历被继承对象中的属性
      for (var property in arg) {
        //将被继承对象中的属性复制到目标对象中
        target[property] = arg[property];
      }
    }

    //返回目标对象
    return target;
  };

  const targetObj = {};

  const sourceObj1 = {
    key1: 'value1',
  };

  const sourceObj2 = {
    key2: 'value2',
  };

  const sourceObj3 = {
    key3: 'value3',
  };

  console.log(mix(targetObj, sourceObj1, sourceObj2, sourceObj3));

  // return mix;
}

// tt7()

//将多属性赋值方法绑定到原型Object上，就不需要传入目标对象
//
function tt8() {
  Object.prototype.mix = function () {
    //从第一个参数起为被继承的对象
    var i = 0;
    //获取参数长度
    var len = arguments.length;
    //缓存参数对象
    var arg;

    //遍历被继承的对象
    for (; i < len; i++) {
      //缓存当前对象
      arg = arguments[i];

      // arg[Symbol.iterator] = function* (){
      //   const keys = Reflect.ownKeys(this);

      //   for(const key of keys) {
      //     yield key;
      //   }

      //   console.log('iterator executed');
      // }

      // Object.defineProperty(arg,Symbol.iterator,{enumerable:false})
      // console.log(Object.getOwnPropertyDescriptor(arg,Symbol.iterator));

      //遍历被继承对象中的属性
      for (var property of Object.keys(arg)) {
        console.log(i, property);
        //将被继承对象中的属性复制到目标对象中
        this[property] = arg[property];
      }
    }

    //返回目标对象
    // return this;
  };

  const targetObj = {};

  const sourceObj1 = {
    key1: 'value1',
  };

  const sourceObj2 = {
    key2: 'value2',
  };

  const sourceObj3 = {
    key3: 'value3',
  };

  Object.prototype.asdasdasdasd = function () {};

  targetObj.mix(sourceObj1, sourceObj2, sourceObj3);

  console.log(targetObj);

  const anotherObj = {};

  // console.log(Object.getOwnPropertyDescriptor(targetObj,'mix'));
  // console.log(Object.getOwnPropertyDescriptor(Object.prototype,'toString'));
  // console.log(targetObj.hasOwnProperty('mix'));
  // console.log(anotherObj.hasOwnProperty('mix'));
  // console.log({}.hasOwnProperty('mix'));
  // console.log(targetObj.hasOwnProperty('toString'));
  // console.log(Object.prototype.hasOwnProperty('toString'));
}

// tt8();

// const obj = {
//   key1: 'value1',
//   key2: 'value2',
// };

// for(const key of Object.keys(obj)) {
//   console.log(key);
// }

//**总结：
//1，for...in..会查找对象自身加上原型链上enumerable为true
//（通常为手动添加到原型上的属性或方法）的属性或方法的key
//2，[Symbol.iterator]属性值为一个生成器函数，其产出（yield）的
//值即为for value of...中的value
//3，由于1，可以用for ... of Object.keys(obj) 来遍历取得对象的key

//2.5 多种调用方式---多态-------------------------------------------------------------
//判断参数实现多种调用方式
function tf() {
  //多态
  function add() {
    //获取参数
    var arg = arguments;
    //获取参数长度
    var len = arg.length;

    switch (len) {
      //没有参数
      case 0:
        return 10;
      //一个参数
      case 1:
        return 10 + arg[0];
      //两个参数
      case 2:
        return arg[0] + arg[1];
    }
  }

  console.log(add());
  console.log(add(5));
  console.log(add(6, 7));
}

// tf()

//类形式
function tf1() {
  function Add() {
    //无参数算法
    function zero() {
      return 10;
    }

    //一个参数算法
    function one(num) {
      return 10 + num;
    }

    //两个参数算法
    function two(num1, num2) {
      return num1 + num2;
    }

    //相加公有方法
    this.add = function () {
      //获取参数
      var arg = arguments;
      //获取参数长度
      var len = arg.length;

      switch (len) {
        //没有参数
        case 0:
          return zero();
        //一个参数
        case 1:
          return one(arg[0]);
        //两个参数
        case 2:
          return two(arg[0], arg[1]);
      }
    };
  }

  var a = new Add();

  console.log(a.add());
  console.log(a.add(5));
  console.log(a.add(6,7));
}

// tf1()


//我问你答-----------------------------------------------------------------------
//1：如何实现深拷贝
