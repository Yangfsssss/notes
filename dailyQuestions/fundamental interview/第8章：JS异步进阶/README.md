JS异步 - 进阶：
    之前讲解JS异步，在于初阶的应用；
    本章在于JS异步的原理和进阶；
    对初学者有点难度，尽量深入浅出；

主要内容：
    event loop；
        JS是单线程运行的；
        异步要基于回调来实现；
        event loop就是异步回调的实现原理；

        JS如何执行？
            从前到后，一行一行执行；
            如果某一行执行报错，则停止下面代码的执行；
            先把同步代码执行完，再执行异步；

        总结event loop过程1：
            同步代码，一行一行放在Call Stack执行；
            遇到异步，会先“记录”下，等待时机（定时、网络请求等）；
            时机到了，就移动到Callback Queue；

            如Call Stack为空（即同步代码执行完），Event Loop 开始工作；
            轮询查找Callback Queue，如有则移动到Call Stack执行；
            然后继续轮询查找（像永动机一样）；

        DOM事件和event loop：
            JS是单线程的；
            异步（setTimeout，ajax等）使用回调，基于event loop；
            DOM事件也使用回调（事件触发时时将cb推入Callback Queue），基于event loop；

    promise进阶；
        三种状态：
            pending/resolved/rejected；
            pending  --> resolved/pending --> rejected；
            变化不可逆；

        状态的表现和变化：
            pending 状态，不会触发then和catch；
            resolved 状态，会触发后续的then回调函数；
            rejected 状态，会触发后续的catch回调函数；

        then和catch对状态的影响；
            then/catch方法正常情况下返回一个resolved状态的promise，但如果其指定的cb执行时抛出错误，则返回rejected状态的promise；

        总结：
            三种状态，状态的表现和变化；
            then和catch对状态的影响（重要）；
            then和catch的链式调用（常考）；

    async/await；
        异步回调 callback hell；
        Promise then/catch链式调用，但也是基于回调函数；
        async/await是同步语法，切底消灭回调函数；

        async/await和Promise的关系：
            async/await是消灭异步回调的终极武器；
            但和Promise并不互斥，反而，两者相辅相成；

            执行async函数，返回的是Promise对象；
            await相当于Promise的then；
            try...catch可捕获异常，代替了Promise的catch；
            await之后的rejected的promise需要用try...catch来捕获；

        async/await总结：
            async/await解决了异步回调，是一个很香的语法糖；
            async/await和Promise的关系，重要！
            for...of的使用；

    异步的本质：
        async/await是消灭异步回调的终极武器；
        JS还是单线程，还是得有异步，还是基于event loop；
        async/await只是一个语法糖；

    微任务/宏任务；
        什么是宏任务，什么是微任务；
            宏任务：setTimeout，setInterval，Ajax，DOM事件；
            微任务：Promise，async/await；

        event loop和DOM渲染；
            再次回归一遍event loop的过程；
            JS是单线程的，而且和DOM渲染共用一个线程；
            JS执行的时候，得留一些时机供DOM渲染；

            每次Call Stack清空（即每次轮询结束），即同步任务执行完；
            都是DOM重新渲染的机会，DOM结构如有改变则重新渲染；
            然后再去出发下一次Event Loop；

        宏任务和微任务的区别；
            宏任务：DOM渲染后触发，如setTimeout；
            微任务：DOM渲染前触发，如Promise；

        从event loop的解释，为什么微任务执行更早？
            微任务是ES6规范，不是浏览器规范；
            宏任务是由浏览器规定的；
        
        总结：
            宏任务有哪些？微任务有哪些？微任务触发时机更早；
            微任务、宏任务和DOM渲染的关系；
            微任务、宏任务和DOM渲染，在event loop的过程；

先看几个面试题：
    请描述event loop的机制，可画图；
        自行回顾event loop的过程；
        和DOM渲染的关系；
        微任务和宏任务在event loop过程中的不同处理；

    什么是宏任务和微任务，两者有什么区别？
        略；

    Promise有哪三种状态？如何变化？
        略；

    场景题 - promise then 和catch的连接；
        略；

    场景题 - async/await语法；
        略；

    场景题 - promise和setTimeout的顺序；
        略；

    场景题 - 外加async/await的顺序问题；
        略；