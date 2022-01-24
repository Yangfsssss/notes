在 React 中使用 custom hooks 来分离 container 和 presentational components

https://felixgerschau.com/react-hooks-separation-of-concerns/

Why: 
1，单一职责原则：每个函数或组件只负责一项功能能够使其更易改变和维护。 
2，在 React 中，代码会更整洁。 
3，改变 hook 不会影响到 UI。 
4，能够脱离 UI 进行测试。

如何使用 hooks 进行逻辑解耦： 
  示例见@jira/components/ExponentCalculator

Best practices: 
1，命名：useXXX，使用单独文件@/hooks 
2，不要过度分离 
3，不要和 CSS-in-JS 的 hook 混在一起

总结： 
1，是否使用 custom hook 取决于个人爱好，codebase 中不包含大量逻辑时可能效果一般 
2，custom hook 只是提升代码模块化程度的一种方式，还有其他方式比如将组件和函数分离成更小的，可复用的模块
