useRef；
useContext；
useReducer：
    当state变更的逻辑比较复杂时，可以使用useReducer；

    useReducer和redux的区别：
        useReducer是useState的代替方案，用于state复杂变化；
        useReducer是单个组件状态管理，组件通讯还需要props；
        redux是全聚德状态管理，多组件共享数据；

useMemo：
    React 默认会更新所有子组件；
    class组件使用SCU和PureComponent做优化；
    Hooks中使用useMemo，但优化的原理是相同的；
    都是浅比较props；
    与React.memo()结合使用；
useCallback；