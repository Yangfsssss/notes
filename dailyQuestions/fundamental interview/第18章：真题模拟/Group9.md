手写字符串trim方法，保证浏览器兼容性：
```js
    String.prototype.trim = function() {
        // ^\s+: 匹配开头任意空白字符，包括空格、制表符、换页符等等；
        // \s+$：匹配结尾任意空白字符，包括空格、制表符、换页符等等；
        return this.replace(/^\s+/, '').replace(/\s+$/,'');
    }
```

如何获取多个数字中的最大值？
    Math.max()；
    将参数转换为数组，遍历出最大值；

如何用JS实现继承？
```js
    function SubClass(){};
    function SuperClass(){};

    SubClass.prototype = new SuperClass();
    SubClass.prototype.constructor = SubClass;
```