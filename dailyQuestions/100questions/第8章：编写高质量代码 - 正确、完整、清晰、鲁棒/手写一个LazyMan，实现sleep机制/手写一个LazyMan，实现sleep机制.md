支持sleep和eat两个方法；
支持链式调用；

代码设计：
    由于有sleep功能，函数不能直接在调用时触发；
    初始化一个列表，把函数注册进去；
    由每个item触发next执行（遇到sleep则异步触发）；

划重点：
    任务队列；
    触发next；
    sleep异步触发；

    两种等待方式：
        LazyMan：命令等待 ---> 在系统执行流中；
        SimpleLazyMan：空等待 ---> 在系统执行流中，但存在短暂空闲；

示例：
```js
const me = new LazyMan('Yang');
me.eat('apple').eat('banana').sleep(5).eat('grape');

// Yang eat apple
// Yang eat banana
// Yang sleep 5s
// Yang eat grape
```