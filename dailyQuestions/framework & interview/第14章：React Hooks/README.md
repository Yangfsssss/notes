面试问到 React Hooks：
    Hooks 作为 React 的一部分，在面试中也只能占一部分时间；
    学习Hooks的前提，必须学好class组件；

本章的主要内容：
    State Hook；
    Effect Hook；
    其他 Hook；
    自定义 Hook；
    组件逻辑复用； 
    规范和注意事项；

先看几个面试题：
    为什么会有 React Hooks，它解决了哪些问题？
        完善函数组件的能力，函数更适合React组件；
        组件逻辑复用，Hooks表现更好；
        class复杂组件正在变得费解，不易拆解，不易测试，逻辑混乱；
            class组件中，相同的逻辑散落在各处：
                DidMount和DidUpdate中获取数据；
                DidMount绑定事件，WillUnMount解绑事件；
            使用Hooks，相同逻辑可分割到一个一个的useEffect中；

    React Hooks 如何模拟生命周期？
        模拟componentDidMount - useEffect依赖[]；
        模拟componentDidUpdate - useEffect无依赖，或者依赖[a,b]；
        模拟componentWillUnmount - useEffect中返回一个函数fn；
            useEffect依赖[]，组件销毁时执行fn，等于WillUnMount；
            useEffect无依赖或依赖[a,b]，组件更新时执行fn；
            即，下一次执行useEffect之前，就会执行fn，无论更新或卸载；

    如何自定义Hook？
        略；

    React Hooks 性能优化；
        useMemo缓存数据；
        useCallBack缓存函数；
        相当于class组件的SCU和PureComponent；

    使用 React Hooks遇到哪些坑？
        useState初始化值，只初始化一次；
        useEffect内部，不能修改state；
        useEffect依赖引用类型，会出现死循环；

    Hooks 相比 HOC 和 Render Props有哪些优点？
        完全符合Hooks原有规则，没有其他要求，易理解记忆；
        变量作用域明确；
        不会产生组件嵌套；