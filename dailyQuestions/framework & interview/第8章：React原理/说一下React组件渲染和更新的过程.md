JSX如何渲染为页面；
setState之后如何更新页面；
面试考察全流程；

回顾知识点：
    回顾Vue组件渲染和更新过程；
    再次回顾JSX本质和vdom；
        JSX即React.createElement()函数；
        执行生成vnode；
        patch(element,vnode)和patch(element,newVnode)；
    回顾dirtyComponents；

    讲解内容：
        组件渲染和更新过程；
            渲染：
                props state；
                render()生成vnode；
                patch(element,vnode)；
            更新：
                setState(newState) --> dirtyComponents（可能有子组件）；
                遍历dirtyComponents，render()生成newVnode；
                patch(element,newVnode)；

            上述的patch被拆分位两个阶段：
                1，reconciliation阶段 - 执行diff算法，纯JS计算；
                2，commit阶段 - 将diff结果渲染DOM；
            
            可能会有性能问题：
                JS是单线程，且和DOM渲染共用一个线程；
                当组件足够复杂，组件更新时计算和渲染都压力大；
                同时再有DOM操作需求（动画，鼠标拖拽等），将卡顿；

            解决方案fiber：
                将reconciliation阶段进行任务拆分（commit无法拆分）；
                DOM需要渲染时暂停，空闲时恢复；
                window.requestIdleCallback；

            关于fiber：
                React内部运行机制，开发者体会不到；
                了解背景和基本概念即可；
                
        更新的两个阶段；
            reconciliation；
            commit;
        React Fiber；

    