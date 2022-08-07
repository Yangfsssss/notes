React vs Vue：
    React 和 Vue 一样重要（特别是大场面试），力求两者都会学会；
    React 和 Vue 有很多相通之处，而且正在趋于一致；
    React 比 Vue 学习成本高，尤其对于初学者；

React 使用：
    基本使用 --- 常用，必须会；
    高级特性 --- 不常用，但体现深度；
    Redux 和 React-router 使用；

自己去看文档不行吗？
    行。但这是一种最低效的方式；
    文档是一个备忘录，给会用的人查阅，并不是入门教程；
    文档全面冗长且细节过多，不能突出面试考点；

回顾之前的 React 面试题：
    React 组件间如何通信？
    JSX本质是什么？
    context是什么，有何用途？
    shouldComponentUpdate的用途？
    描述redux单向数据流；
    setState是同步还是异步？

针对上述题目：
    先自己思考，不着急解答；
    可能会涉及React原理（本来应用和原理就是分不开的）；
    这几道题是“开胃菜”，后面还有真题演练“大餐”；

2，关于React17:
    没有明显的新特性，和React16的使用是一致的；
    面试时也不会被重点考察；
    放心学习，需要注意的地方，视频中会重点提醒出来；

3-4，JSX基本知识点串讲：
    React基本使用：
        日常使用，必须掌握，面试必考（不一定全考）；
        梳理知识点，从冗长的文档中摘出考点和重点；
        考察形式不限（参考后面的面试真题），但都在范围之内；

    JSX基本使用：
        变量、表达式；
        class/style；
        子元素和组件；

        props:dangerouslySetInnerHTML={'<span>rawHTML</span>'}

    JSX中的条件判断：
        if/else；
        三元表达式；
        逻辑运算符 && ||；

5-6，React事件为何要bind this，事件：
    bind this；
    关于event参数；
    传递自定义参数；

    event：
        event 是 SyntheticEventEvent，模拟出来 DOM 事件所有能力；
        event.nativeEvent 是原生事件对象；
        所有的事件，都被挂载到root上；
        和 DOM 事件不一样，和 Vue 事件也不一样；

        事件挂载到root上有利于多个React版本共存，例如微前端；

7，React表单知识点串讲：
    表单：
    受控组件；
    input/textarea/select 用value；
    checkbox/radio 用checked；

8，父子组件通讯

9-10，state使用不可变值，setState同步/异步

11，setState合适时会合并state：
    传入对象会被合并；
    传入函数不会被合并

    setState三个要点：
        不可变值；
        可能是异步更新；
        可能会被合并；

12，React组件的生命周期：
    constructor();
    (getDerivedStateFromProps())
    (shouldComponentUpdate())
    render();
    componentDidMount();
    (getSnapshotBeforeUpdate())
    componentDidUpdate();
    componentWillUnmount();

13，知识点总结复习：
    JSX基本使用；
    条件；
    列表；
    事件；
    表单；
    组件和props；
    setState；
    生命周期；

    总结：
        日常使用，必须掌握，面试必考（不一定全考）；
        和 Vue 对比；
        知道setState和不可变值，React基石；




    

