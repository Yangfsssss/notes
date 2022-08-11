让函数组件实现state和setState：
    默认函数组件没有state；
    函数组件是一个纯函数，执行完即销毁，无法存储state；
    需要State Hook，即把state功能“钩”到纯函数中；

让函数组件模拟生命周期：
    默认函数组件没有生命周期；
    函数组件是一个纯函数，执行完就销毁，自己无法实现生命周期；
    使用Effect Hook把生命周期“钩”到纯函数中；

    useEffect可以模拟DidMount/DidUpdate/WillUnmount生命周期；
        注意：模拟WillUnmount，但不完全相等：
            useEffect的回调函数返回的函数会在下一次回调函数执行之前执行；
            即可以实现WillUnmount中的卸载事件；

      useEffect中返回函数fn：
          useEffect依赖[]，组件销毁时执行fn，等于WillUnmount；
          useEffect无依赖或依赖[a,b]，组件更新时执行fn；
          即，下一次执行useEffect之前，就会执行fn，无论更新或卸载；

    useEffect让纯函数有了副作用：
        默认情况下，执行纯函数，输入参数，返回结果，无副作用；
        所谓副作用，就是函数之外造成影响，如设置全局任务；
        而组件需要副作用，所以需要useEffect“钩”入纯函数中；

小结：
    函数组件更适合React组件，但需要Hooks增强功能；
    useState可实现state和setState；
    useEffect可模拟组件主要的生命周期；