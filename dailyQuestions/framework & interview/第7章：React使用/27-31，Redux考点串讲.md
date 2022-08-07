27，Redux使用：
    和Vuex作用相同，但比Vuex学习成本高；
    不可变值，纯函数；
    面试常考；

    基本概念；
    单向数据流；
    react-redux；
    异步action；
    中间件；

28，描述Redux单向数据流：
    基本概念：
        store/state；
        action；
        reducer；

    单向数据流概述：
        dispatch(action);
        reducer -> newState;
        subscribe 触发通知；

29，串讲react-redux知识点：
    <Provider>；
    connect；
    mapStateToProps/mapDispatchToProps；


30，Redux action如何处理异步？
    redux-thunk；
    redux-promise；
    redux-saga；

    创建 store 时，作为中间件引入；

31，简述Redux中间件原理：
```js
    // 自己修改 dispatch，增加 logger
    let next = store.dispatch;
    store.dispatch = function dispatchAndLog(action){
        console.log('dispatching', action);
        next(action);
        console.log('next state', store.getState());
    }
```

    Redux知识点总结：
        基本概念；
        单向数据流；
        react-redux；
        异步action；
        中间件；
