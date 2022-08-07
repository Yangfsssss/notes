19，React性能优化，SCU的核心问题在哪里？
    性能优化，永远都是面试的重点；
    性能优化对于React更加重要；
    回顾讲setState时重点强调的不可变值；

    shouldComponentUpdate（简称SCU）；
    PureComponent和React.memo()；
    不可变值immutable；

    shouldComponentUpdate(nextProps:Props,nextState:State):boolean;


20，SCU默认返回什么？
    默认返回true；

    React默认：父组件有更新，子组件则无条件也更新；

    SCU一定要每次都用吗？ --- 需要的时候才优化；

21，SCU一定要配合不可变值：
    不可变值，指每一帧所持有的数据不能改变，如果改变，以前后帧数据对比的优化手段就会失效；

    慎用深拷贝和深度比较；

    SCU使用总结：
        SCU默认返回true，即React默认重新渲染所有子组件；
        必须配合“不可变值”一起使用；
        可先不用SCU，有性能问题时再考虑使用；

22，React性能优化，PureComponent和memo()：
    PureComponent，内置了实现了浅比较的SCU；
    memo()，函数组件中的PureComponent；
    浅比较已适用大部分情况（尽量不要做深度比较）；


23，了解immutable.js：
    彻底拥抱“不可变值”；
    基于共享数据（不是深拷贝），速度好；
    有一定的学习和迁移成本，按需使用；

    性能优化 - 小结：
        面试重点，且涉及React设计理念；
        SCU PureComponent memo() immutable.js；
        按需使用 & state层级；