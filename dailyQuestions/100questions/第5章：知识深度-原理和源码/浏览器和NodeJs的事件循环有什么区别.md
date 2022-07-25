单线程和异步
    浏览器中JS执行和DOM渲染共用一个线程。
    异步是单线程的解决方案。

宏任务和微任务
    宏任务：setTimeout/setInterval、网络请求。
    微任务：promise、async/await、MutationObserver。
    微任务在下一轮DOM渲染之前执行，宏任务在之后执行。

nodejs中的宏任务和微任务分不同类型，有不同优先级。
在较高版本的nodejs中推荐使用setImmediate代替process.nextTick()