关于setState的两个考点：
    state同步更新 or 异步更新；
    state合并 or 不合并；

    默认情况：
        state默认异步更新；
        state默认合并后更新；

        setState同步更新 - 不在React上下文中触发：
            setTimeout，setInterval，setImmediate；
            自定义的DOM事件；
            Ajax回调；
        
        注意：React 18中不一样：
            上述场景，在React 18中可以异步更新（Auto Batch）；
            需将ReactDOM.render替换为ReactDOM.createRoot；
            React 18发布不久，后面会继续升级补充；
        
        setState不合并：
            state同步更新时；
            setState传入函数时；

划重点：
    不可变数据；
    何时state同步更新（注意React 18）；
    何时state不合并；

连环问：setState是宏任务还是微任务？
    异步，可讨论是 微任务/宏任务；
    同步，则无所谓 微任务/宏任务；

    setState本质是同步：
        setState是同步，只不过让React做成了异步的样子；
        因为要考虑性能，多次state修改，只进行一次DOM渲染；
        日常说的“异步”是不严谨的，但沟通成本低；

    答案：
        setState是同步执行，state都是同步更新；
        即，在微任务promise.then开始之前，state已经计算完了；
        同步，不是宏任务或微任务；

理解setState callback的“异步”：
```js
  clickHandler = () => {
    console.log('---- start ----');

    Promise.resolve().then(() => {
      console.log('promise then'); // callback
    })
    
    // “异步”
    this.setState(
      {val: this.state.val + 1},
      () => console.log('state', this.state.val) // callback
    );
    // console.log('state...', this.state);
    
    console.log('---- end ----');
  };

  function fn(){
    // 前置处理
    clickHandler();
    // 后置处理，“异步”，执行 setState 的 callback // 同步
  }

  // React 合成事件
  // root node
```





