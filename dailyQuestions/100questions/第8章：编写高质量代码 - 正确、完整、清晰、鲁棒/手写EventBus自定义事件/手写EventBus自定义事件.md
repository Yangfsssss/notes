EventBus：事件总线
    分析：
        on和once注册函数，存储起来；
        emit时找到对应的函数，执行；
        off找到对应的函数，从对象中删除；

    注意区分on和once：
        on绑定的事件可以连续执行，除非off；
        once绑定的函数emit一次即删除，也可以未执行而被off；
        数据结构上标识出on和once；

划重点：
    区分on和once；
    合理的数据结构，比算法优化更有效；
