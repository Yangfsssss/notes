14，React高级特性：
    不是每个都很常用，但用的时候必须知道；
    考察候选人对React的掌握是否全面，且有深度；
    考察做过的项目是否有深度和复杂度（至少能用到高级特性）；

    函数组件；
    非受控组件；
    Portals；
    context；
    异步组件；
    性能优化；
    高阶组件HOC；
    Render Props；

    函数组件：
        纯函数，输入props，输出JSX；
        没有实例，没有生命周期，没有state；
        不能扩展其他方法；

15，非受控组件：
    ref；
    defaultValue/defaultChecked；
    手动操作DOM元素；

    使用场景：
        必须手动操作DOM元素，setState实现不了；
        文件上传<input type="file">；
        某些富文本编辑器，需要传入DOM元素；
        
    受控组件 vs 非受控组件：
        优先使用受控组件，符合React设计原则；
        必须操作DOM时，再使用非受控组件；

16，什么场景需要使用React portals？
    组件默认会按照既定层次渲染嵌套；
    如何让组件渲染到父组件以外？

    ReactDOM.createPortal(element:ReactNode,target:HTMLElement):void；

    Portals使用场景：
        overflow:hidden（父组件BFC限制子组件）；
        父组件z-index太小；
        position:fixed 需要放在body第一层级；

        多用来处理CSS兼容性问题；

17，React Context：
    公共信息（语言、主题）如何传递给每个组件？
    用props太繁琐；
    用redux小题大做；

    React.createContext();
    <context.Provider value={value}>
      {children}
    </context.Provider>;
    contextType：只用于类组件；
    useContext：只用于函数组件；
    <context.Consumer>
      {children}
    </context.Consumer>;

18，React如何异步加载组件？
    import()；
    React.lazy();
    React.Suspense();

    ```jsx
    const LazyComponent = React.lazy(() => import('./LazyComponent'));
    return <Suspense fallback={<div>Loading...</div>}>
                    <LazyComponent />
                 </Suspense>
    ```

    部分高级特性 - 小结：
        函数组件；
        非受控组件；
        Portals；
        context；
        异步组件；



