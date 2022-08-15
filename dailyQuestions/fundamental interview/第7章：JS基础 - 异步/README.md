异步和单线程：
    题目：
        同步和异步的区别是什么？
        手写Promise加载一张图片；
        前端使用异步的场景有哪些？
        setTimeout；

    知识点：
        单线程和异步；
            JS是单线程语言，只能同时做一件事；
            浏览器和nodejs已经支持启动进程，如WebWorker；
            JS和DOM渲染公用同一个线程，因为JS可以修改DOM结构；
            遇到等待（网络请求，定时任务）不能卡住；
            需要异步；
            回调callback函数形式；

            异步和同步：
                基于JS是单线程语言；
                异步不会阻塞代码执行；
                同步会阻塞代码执行；
        应用场景；
            网络请求，如ajax图片加载；
            定时任务，如setTimeout；
        callback hell和Promise；

小结：
    单线程和异步，异步和同步区别；
    前端异步的应用场景：网络请求&定时任务；
    Promise解决callback hell；