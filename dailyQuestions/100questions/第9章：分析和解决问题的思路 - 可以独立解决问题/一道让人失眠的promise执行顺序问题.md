```js
Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4);
}).then(res => {
  console.log(4);
});

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() => {
  console.log(6);
});

//模拟“慢两拍”
Promise.resolve().then(() => {
  // 第一拍
  const p = Promise.resolve(100);

  Promise.resolve().then(() => {
    // 第二拍
    p.then(res => console.log(res))
      .then(() => console.log(200))
      .then(() => console.log(300))
      .then(() => console.log(400))
      .then(() => console.log(500))
      .then(() => console.log(600))
      .then(() => console.log(700))
  })
})
```

回顾：
    单线程，异步；
    事件循环，Event Loop；
    宏任务，微任务；

then交替执行：
    如果有多个fulfilled promise实例，同时执行then链式调用，then()会交替执行；
    这是编译器的优化，防止一个promise占据太久时间；

    then中返回promise实例：
        相当于多出一个promise实例，也会遵守“交替执行”；
        （但和直接声明一个promise实例，结果有些差异）

        “慢两拍”：
            then中返回promise实例，会出现“慢两拍”的效果；
            第一拍，promise需要由pending变为fulfilled；
            第二拍，then函数挂载到microtaskQueue（参考Event Loop）；

划重点：
    基础知识：Event Loop，宏任务，微任务；
    then交替执行；
    then中返回promise实例会“慢两拍”；

注意：
    这是纯微任务的环境，如果加入宏任务就不一样了；
    该问题本身就很难理解，所以场景要尽量简单，否则不好解释；

