修改CSS模拟v-show。

循环使用key。

使用Fragment减少层级。

JSX中不要定义函数。

在构造函数中bind this。

使用shouldComponentUpdate。
    使用shouldComponentUpdate判断组件是否要更新。
    或者使用React.PureComponent。
    函数组件使用React.memo。

    React默认会让所有的子组件都重新计算，无论涉及的数据是否变化。

    为什么要使用不可变数据？
        因为React要对比前后state的变化来判断是否要执行一些操作。
  
Hooks缓存数据和函数。

其他：
    异步组件（lazy/Suspense）；
    路由懒加载（lazy/import()）；
    SSR；

划重点：
    要彻底理解shouldComponentUpdate及其周边。
    在React的世界，要让不可变数据深入骨髓。

    immer

连环问：你使用React遇到过哪些坑？
    JS关键字的冲突：for/htmlFor，class/className；
    setState是异步更新的。
    props作为子组件state的初始值。


