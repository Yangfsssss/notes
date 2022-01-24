//Chapter4：给我一张名片---工厂方法模式
//工厂方法模式（Factory Method）：通过对产品类的抽象使其创建业务
//主要负责用于创建多类产品的实例

//4.1 广告展现---------------------------------------------------------------------------
//培训广告
function fo() {
  //创建java学科类
  var Java = function (content) {
    //将内容保存在content里面以备日后使用
    this.content = content;
    //创建对象时，通过闭包，直接执行，将内容按需求的样式插入到页面内
    (function (content) {
      var div = document.createElement('div');

      div.innerHTML = content;
      div.style.color = 'green';

      document.getElementById('container').appendChild(div);
    })(content);
  };

  //创建PHP学科类
  var Php = function (content) {
    this.content = content;

    (function (content) {
      var div = document.createElement('div');

      div.innerHTML = content;
      div.style.color = 'yellow';

      document.getElementById('container').appendChild(div);
    })(content);
  };

  //创建JavaScript学科类
  var JavaScript = function (content) {
    this.content = content;

    (function (content) {
      var div = document.createElement('div');

      div.innerHTML = content;
      div.style.color = 'pink';

      document.getElementById('container').appendChild(div);
    })(content);
  };

  //学科类工厂
  function JobFactory(type, content) {
    switch (type) {
      case 'java':
        return new Java(content);
      case 'php':
        return new Php(content);
      case 'JavaScript':
        return new JavaScript(content);
    }
  }

  const js = JobFactory('JavaScript', 'najiaqiang');

  console.log(js);
}

// fo();


//4.2 方案的抉择------------------------------------------------------------------
//工厂方法模式


//4.3 安全模式类------------------------------------------------------------------
//判断构造函数是否包含new关键字调用


//4.4 安全的工厂方法
function ff(){
    //安全模式创建的工厂类
    var Factory = function(type,content){
        if(this instanceof Factory){
            var s = new this[type](content);
            
            return s;
        } else {
            return new Factory(type, content);
        }
    }

    //工厂原型中设置创建所有类型数据对象的基类
    Factory.prototype = {
        Java:function (content) {
            console.log('Java Content',content);
            //...
        }, 
        JavaScript:function (content) {
            console.log('JavaScript Content',content);
            //...
        },
        UI:function (content) {
            this.content = content;

            (function (content) {
                var div = document.createElement('div');

                div.innerHTML = content;
                div.style.border = '1px solid red';
            })

            document.getElementById('container').appendChild(div)
        },
        php:function (content) {
            console.log('php Content',content);
        }
    }
}

