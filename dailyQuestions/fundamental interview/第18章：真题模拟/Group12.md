手写深拷贝：
    见deepClone.ts；

介绍一下RAF（requestAnimationFrame）：
    要想动画流畅，更新频率要60帧/s，即16.67ms更新一次视图；
    setTimeout要手动控制频率，而RAF浏览器会自动控制；
    后台标签或隐藏iframe中，RAF会暂停，而setTimeout依旧执行；

前端性能如何优化？一般从哪几个方面考虑？
    原则：
        多使用内存、缓存，减少计算、减少网络请求；
        方向：加载页面，页面渲染，页面操作流畅度；