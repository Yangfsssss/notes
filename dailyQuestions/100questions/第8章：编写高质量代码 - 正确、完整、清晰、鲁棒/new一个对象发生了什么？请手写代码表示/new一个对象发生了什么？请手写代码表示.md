1，创建一个空对象，继承构造函数的原型。
2，运行构造函数，将该对象作为函数的this
3，构造函数是否显式返回一个指定的对象，如果不是，返回该对象。

ES5风格的构造函数可以直接调用；
（存疑）类风格的构造函数不可以直接调用：要么new，要么指定this（bind、apply、call）；

连环问：Object.create()和{}有什么区别？
```js
    Object.create({x:100}).__proto__ === {x:100};
    {}.__proto__ === Object.prototype;
```
