封装通用的功能；
开发和使用第三方Hooks；
自定义Hook带来了无限的扩展性，解耦代码；

本质是一个函数，以use开头（重要）；
内部正常使用useState useEffect或者其他Hooks；
自定义返回结果，格式不限；

Hooks使用规范：
    再次强调命名规范：useXXX；
    Hooks的使用规则（重要）：
        只能用于React函数组件和自定义Hook中，其他地方不可以；
        只能用于顶层代码，不能在循环、判断中使用Hooks；
        使用eslint-plugin-react-hooks插件；
    关于Hooks的调用顺序:
        无论是render还是re-render，Hooks调用顺序必须一致；
        如果Hooks出现在循环、判断里，则无法保证顺序一致；
        Hooks严重依赖调用顺序！重要！