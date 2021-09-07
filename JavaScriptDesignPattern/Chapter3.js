//Chapter3：神奇的魔术师---简单工厂模式
//简单工厂模式（Simple Factory）：又叫静态工厂方法，由一个
//工厂对象决定创建某一种产品对象类的实例。主要用来创建
//同一类对象

//3.1 工作中的第一次需求-----------------------------------------------------------
function to() {
  //功能1：提示用户名长度
  var LoginAlert = function (text) {
    //第一个类
    this.content = text;
  };

  LoginAlert.prototype.show = function () {
    //显示警示框
  };

  var userNameAlert = new LoginAlert('用户名长度。。。。');

  userNameAlert.show();

  //功能2：提示密码错误
  var passwordAlert = new LoginAlert('输入的密码。。。。');

  passwordAlert.show();

  //功能3：提示用户名不存在，在警示框中增加注册按钮
  var LoginConfirm = function (text) {
    //第二个类
    this.content = text;
  };

  LoginConfirm.prototype.show = function () {
    //显示确认框
  };

  var loginFailConfirm = new LoginConfirm('您的用户名。。。。');

  loginFailConfirm.show();

  //功能4：登陆成功后提示自定义消息
  var LoginPrompt = function (text) {
    //第三个类
    this.content = text;
  };

  LoginPrompt.prototype.show = function () {
    //显示提示框
  };
}

//3.2 如果类太多，那么提供一个-------------------------------------------------------
//一个例子：
function tt() {
  //篮球基类
  var Basketball = function () {
    this.intro = 'basketball is a popular sport in us';
  };

  Basketball.prototype = {
    getMember: function () {
      console.log('5 team members are needed');
    },
    getBallsize: function () {
      console.log("it's big");
    },
  };

  //足球基类
  var Football = function () {
    this.intro = 'football is a popular sport in the world';
  };

  Football.prototype = {
    getMember: function () {
      console.log('11 team members are needed');
    },
    getBallsize: function () {
      console.log("it's big");
    },
  };

  //网球基类
  var Tennis = function () {
    this.intro = 'there are many tennis series every year';
  };

  Tennis.prototype = {
    getMember: function () {
      console.log('1 team members are needed');
    },
    getBallsize: function () {
      console.log("it's small");
    },
  };

  //运动工厂
  var SportsFactory = function (name) {
    switch (name) {
      case 'NBA':
        return new Basketball();
      case 'worldCup':
        return new Football();
      case 'FrenchOpen':
        return new Tennis();
    }
  };

  //为世界杯创建一个足球
  var football = SportsFactory('worldCup');

  console.log(football);
  console.log(football.intro);
  football.getMember();
}

// tt()

//修改之前的需求：
function tt1() {
  //功能1：提示用户名长度
  var LoginAlert = function (text) {
    //第一个类
    this.content = text;
  };

  LoginAlert.prototype.show = function () {
    console.log(this.content);
    //显示警示框
  };

  //功能2：提示密码错误
  //   var passwordAlert = new LoginAlert('输入的密码。。。。');

  //   passwordAlert.show();

  //功能3：提示用户名不存在，在警示框中增加注册按钮
  var LoginConfirm = function (text) {
    //第二个类
    this.content = text;
  };

  LoginConfirm.prototype.show = function () {
    //显示确认框
  };

  //功能4：登陆成功后提示自定义消息
  var LoginPrompt = function (text) {
    //第三个类
    this.content = text;
  };

  LoginPrompt.prototype.show = function () {
    //显示提示框
  };

  var PopFactory = function (name, content) {
    switch (name) {
      case 'alert':
        return new LoginAlert(content);
      case 'confirm':
        return new LoginConfirm(content);
      case 'prompt':
        return new LoginPrompt(content);
    }
  };

  var passwordAlert = new PopFactory('alert', 'password alert');

  passwordAlert.show();
}

// tt1()

//3.3 一个对象有时也可代替许多类------------------------------------------------------
//工厂模式
//例子：
function tt() {
  function createBook(name, time, type) {
    //创建一个对象，并对对象拓展属性和方法
    var o = new Object();

    o.name = name;
    o.time = time;
    o.type = type;

    o.getName = function () {
      console.log(this.name);
    };

    //将对象返回
    return o;
  }

  var book1 = createBook('js book', 2014, 'js');
  var book2 = createBook('css book', 2013, 'css');

  book1.getName();
  book2.getName();
}

// tt()

function tt1() {
  function createPop(type, text) {
    //创建一个对象，并对对象拓展属性和方法
    var o = new Object();

    o.content = text;
    o.show = function () {
      //显示方法
      console.log(this.content);
    };

    if (type === 'alert') {
      //警示框差异部分
    }

    if (type === 'prompt') {
      //提示框差异部分
    }

    if (type === 'confirm') {
      //确认框差异部分
    }

    //将对象返回
    return o;
  }

  //创建警示框
  var userNameAlert = createPop('alert', 'bla bla bla.....');

  userNameAlert.show();
}

// tt1()


//3.4 你的选择决定你选择的方式------------------------------------------------------
//1，类实例化创建的对象存在原型链，可以实现公用方法
//2，创建新对象然后对其增强，不存在原型链，不能实现公用方法


//总结：
//在团队开发中要尽可能少地创建全局变量
//代码复用是面向对象编程的一条准则
//简单工厂模式的使用场合通常也就限制在创建单一对象


//问题：谈谈简单工厂模式与类的异同点