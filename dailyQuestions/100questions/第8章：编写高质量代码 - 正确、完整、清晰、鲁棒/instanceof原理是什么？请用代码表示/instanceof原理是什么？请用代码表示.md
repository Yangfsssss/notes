instanceof 原理：
    例如f instanceof Foo
    顺着 f.__proto__向上查找（原型链）
    看能否找到Foo.prototype

划重点：
    处理额外情况：值类型；
    JS原型和原型链，不了解的抓紧恶补；
    通过while循环一直向上查找原型链；