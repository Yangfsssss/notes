setState和batchUpdate：
    有时异步（普通使用），有时同步（setTimeout、DOM事件）；
    有时合并（对象形式），有时不合并（函数形式）；
    后者比较好理解（像Object.assign()），主要讲解前者；

核心要点：
    setState主流程；
    batchUpdate机制；
    transaction（事务）机制；

isBatchingUpdates；

setState是异步还是同步？
    setState无所谓异步还是同步；
    看是否能命中batchUpdate机制；
    判断isBatchingUpdates；

    哪些能命中batchUpdate机制：
        生命周期（和它调用的函数）；
        React 中注册的事件（和它调用的函数）；
        React 可以“管理”的入口；

    哪些不能命中batchUpdate机制：
        setTimeout setInterval等（和它调用的函数）；
        自定义的DOM事件（和它调用的函数）；
        React “管不到”的入口；

transaction事务机制：
```js
    transaction.initialize = function() {
      console.log('initialize');
    };
    transaction.close = function() {
      console.log('close');
    };
    function method(){
      console.log('abc');
    };
    // initialize
    // abc
    // close
    transaction.perform(method);
```