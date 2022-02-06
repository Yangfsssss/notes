**React全家桶 02-React-Redux![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.001.png)**

[**React全家桶 02-React-Redux** ](#_page0_x532.95_y64.97)

[课堂⽬标](#_page0_x532.95_y495.12)

[资源](#_page0_x532.95_y624.31)

[知识要点](#_page1_x532.95_y25.73)

[Hooks API ](#_page1_x532.95_y61.62)

[useReducer](#_page1_x532.95_y89.65)

[useEffect](#_page1_x532.95_y667.05)

[useLayoutEffect](#_page2_x532.95_y174.34)

[使⽤ react-redux](#_page2_x532.95_y316.71)

[API](#_page2_x532.95_y503.93) ![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.002.png)

[<Provider store> ](#_page2_x532.95_y528.76)![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.003.png)

[connect(\[mapStateToProps\], \[mapDispatchToProps\], \[mergeProps\], \[options\]) ](#_page2_x532.95_y622.77)[参数](#_page2_x532.95_y699.16)

[实现 react-redux](#_page5_x532.95_y751.29)

[react-redux hooks API及实现 ](#_page7_x532.95_y690.43)

[react-router简介](#_page9_x532.95_y444.71)

[安装](#_page9_x532.95_y587.57)

[基本使⽤](#_page9_x532.95_y683.67)

[使⽤ Router](#_page10_x532.95_y423.75)

[404⻚⾯](#_page10_x532.95_y451.78)

[回顾 ](#_page10_x532.95_y687.22)

[作业 ](#_page11_x532.95_y362.37)[下节课内容 ](#_page12_x532.95_y50.56)

**课堂⽬标 ![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.004.png)**

1. 掌握所有 Hooks⽅法 
1. 掌握⾼阶组件
1. 掌握 react-redux使⽤和 **原理**

**资源![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.005.png)**

1. [React Redux API](https://www.redux.org.cn/docs/react-redux/api.html)
1. [react-redux github源码](https://github.com/reduxjs/react-redux)
1. [react-router⽂档地址](http://react-router.docschina.org/)

**知识要点![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.006.png)**

**Hooks API**

**useReducer**

const [state, dispatch] = useReducer(reducer, initialArg, init);![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.007.png)

[useState ](https://zh-hans.reactjs.org/docs/hooks-reference.html%23usestate)的替代⽅案。它接收⼀个形如 (state, action) => newState 的 reducer，并返回当前 的 state 以及与其配套的![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.008.png)![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.009.png) dispatch ⽅法。（如果你熟悉 Redux 的话，就已经知道它如何⼯作了。）![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.010.png)

import React, {useReducer, useLayoutEffect, useEffect} from "react";![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.011.png)

import {counterReducer} from "../store";

const init = initArg => { ![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.002.png)  return initArg - 0; 

}; 

export default function HooksPage(props) {

`  `const [state, dispatch] = useReducer(counterReducer, "0", init);

`  `useEffect(() => { 

console.log("useEffect"); //sy-log   }); 

`  `useLayoutEffect(() => { 

console.log("useLayoutEffect"); //sy-log   });

`  `console.log("---"); //sy-log

`  `return ( 

<div> 


<h3>HooksPage</h3> <p>{state}</p>

<button onClick={() => dispatch({type: "ADD"})}>add</button> </div>

`  `);

}

**useEffect**

useEffect(didUpdate);![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.012.png)

该 Hook 接收⼀个包含命令式、且可能有副作⽤代码的函数。

在函数组件主体内（这⾥指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录⽇志以及执 ⾏其他包含副作⽤的操作都是不被允许的，因为这可能会产⽣莫名其妙的 bug 并破坏 UI 的⼀致性。

使⽤  useEffect 完成副作⽤操作。赋值给 useEffect 的函数会在组件渲染到屏幕之后 **延迟** 执⾏。你 可以把![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.013.png)![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.014.png) effect 看作从 React 的纯函数式世界通往命令式世界的逃⽣通道。

默认情况下， effect 将在每轮渲染结束后执⾏，但你可以选择让它 [在只有某些值改变的时候 ](https://zh-hans.reactjs.org/docs/hooks-reference.html%23conditionally-firing-an-effect)才执⾏。 官⽹地址： [https://zh-hans.reactjs.org/docs/hooks-reference.html#useeffect](https://zh-hans.reactjs.org/docs/hooks-reference.html%23useeffect)

**useLayoutEffect**

其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后 **同步** 调⽤ effect。可以使⽤它来读取 DOM 布局并同步触发重渲染。在浏览器执⾏绘制之前，![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.015.png) useLayoutEffect 内部的更新计划将被同步 刷新。![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.016.png)

尽可能使⽤标准的 useEffect 以避免阻塞视觉更新。![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.002.png)![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.017.png)

**使⽤ react-redux**

每次都重新调⽤ render和 getState太 low了，想⽤更 react的⽅式来写，需要 react-redux的⽀持。

yarn add react-redux![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.018.png)

提供了两个 api

1. Provider 为后代组件提供 store
1. connect 为组件提供数据和变更⽅法

**API**

**<Provider store>![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.019.png)**

<Provider store> 使组件层级中的 connect() ⽅法都能够获得 Redux store。正常情况下，你的根 组件应该嵌套在![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.020.png)![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.021.png) <Provider> 中才能使⽤ connect() ⽅法。

**connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.022.png)**连接 React 组件与 Redux store。

**返回** ⼀个新的已与 Redux store 连接的组件类。

**参数**

![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.023.png) mapStateToProps(state, [ownProps]): stateProps ] (*Function*) 该回调函数必须返回⼀个纯对象，这个对象会与组件的![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.024.png) props 合并。

如果定义该参数，组件将会监听 Redux store 的变化，否则 不监听。![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.025.png)

ownProps 是当前组件⾃身的 props，如果指定了，那么只要组件接收到新的 props， mapStateToProps 就会被调⽤， mapStateToProps 都会被重新计 算， mapDispatchToProps 也会被调⽤。 **注意性能！**

mapDispatchToProps(dispatch, [ownProps]): dispatchProps ] (*Object* or *Function*): 如果你省略这个 mapDispatchToProps 参数，默认情况下， dispatch 会注⼊到你的组件 props 

中。

如果传递的是⼀个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，对象所 定义的⽅法名将作为属性名；每个⽅法将返回⼀个新的函数，函数中 dispatch ⽅法会将 action creator的返回值作为参数执⾏。这些属性会被合并到组件的 props 中。

如果传递的是⼀个函数，该函数将接收⼀个 dispatch 函数，然后由你来决定如何返回⼀个对

象。

ownProps 是当前组件⾃身的 props，如果指定了，那么只要组件接收到新的 props，![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.002.png) mapDispatchToProps 就会被调⽤。 **注意性能！**

mergeProps(stateProps, dispatchProps, ownProps): props ] (*Function*) 如果指定了这个参数， mapStateToProps() 与  mapDispatchToProps() 的执⾏结果和组件⾃

身的  props 将传⼊到这个回调函数中。该回调函数返回的对象将作为 props 传递到被包装的组件 中。你也许可以⽤这个回调函数，根据组件的 props 来筛选部分的 state 数据，或者把 props 中 的某个特定变量与 action creator 绑定在⼀起。如果你省略这个参数，默认情况下返回

Object.assign({}, ownProps, stateProps, dispatchProps) 的结果。

全局提供 store， index.js

import React from "react";

import ReactDOM from "react-dom";

import "./index.css";

import App from "./App";

// import {Provider} from "react-redux"; import {Provider} from "./kReactRedux";

import store from "./store/";

// 把 Provider放在根组件外层，使⼦组件能获得 store ReactDOM.render(

`  `<Provider store={store}>

<App />

`  `</Provider>,

`  `document.getElementById("root")

);

获取状态数据， ReactReduxPage.js

import React, { Component } from "react";

import { connect } from "react-redux";![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.026.png)

class ReactReduxPage extends Component {

`  `render() {

const { num, add, minus, asyAdd } = this.props; return (

<div>


<h1>ReactReduxPage</h1> <p>{num}</p>

<button onClick={add}>add</button>

<button onClick={minus}>minus</button> </div>

`    `);   } }

const mapStateToProps = state => {   ![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.002.png)return { 

num: state, 

`  `}; 

}; 

const mapDispatchToProps = { 

`  `add: () => { 

return { type: "add" }; 

`  `}, 

`  `minus: () => { 

return { type: "minus" }; 

`  `} 

}; 

export default connect( 

`  `mapStateToProps, //状态映射 mapStateToProps   mapDispatchToProps, //派发事件映射 )(ReactReduxPage);

connect中的参数： state映射和事件映射 详细使⽤

import React, {Component} from "react";

// import {connect} from "react-redux";

// import {bindActionCreators} from "redux";

import {bindActionCreators, connect} from "../kReactRedux";

// connect⽤于连接 React组件与 store， 返回⼀个新的已经与 store连接的组件类（ HOC） export default connect(

`  `// mapStateToProps Fucntion

`  `// !慎重定义 ownProps，因为你⼀旦定义 ownProps，那么每当 ownProps发⽣改变的时候，当前的 mapStateToProps都会被调⽤，

`  `// !这⾥的 state也会被重新计算，容易影响性能![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.027.png)

`  `state => {

// console.log("mapStateToProps"); //sy-log

return {

count: state

`    `};

`  `},

`  `// mapDispatchToProps Object Fucntion

`  `// Object 此时 props中没有 dispacth，但是有 action creators，内部实现 dispatch   // {

`  `//   add: () => ({type: "ADD"}),

`  `//   minus: () => ({type: "MINUS"})

`  `// }

`  `// Fucntion 参数是 dispatch与 ownProps

`  `// !慎重定义 ownProps，因为你⼀旦定义 ownProps，那么每当 ownProps发⽣改变的时候，当前的 mapStateToProps都会被调⽤，容易影响性能 ![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.002.png)

`  `(dispatch, ownProps) => { 

console.log("mapDispatchToProps--", ownProps); //sy-log

let creators = {

add: payload => ({type: "ADD", payload}),

minus: () => ({type: "MINUS"})

};

creators = bindActionCreators(creators, dispatch); return {dispatch, ...creators};

`  `} 

)( 

`  `class ReactReduxPage extends Component { add = () => {

this.props.dispatch({type: "ADD"});

};

render() { 

console.log("props", this.props); //sy-log

const {count, dispatch, add, minus} = this.props;

return (

<div>


<h3>ReactReduxPage</h3>

<p>omg:{count}</p>

<button onClick={this.add}>add-use dispatch</button> <button onClick={() => add(100)}> add</button> <button onClick={minus}>minus</button>

</div>

`      `);     }

`  `}

);

**实现 react-redux**

实现 kReact-redux.js![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.028.png)

import React, {

`  `useContext,

`  `useEffect,

`  `useReducer,

`  `useState,

`  `useCallback,

`  `useLayoutEffect } from "react";

// 通过 Context传递 store

// \*step1 创建⼀个 Context对象

const Context = React.createContext();

// \*step2 通过 Provider组件传递 value（ store）

export function Provider({store, children}) {![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.002.png)

`  `return <Context.Provider value={store}>{children}</Context.Provider>; }

// \*step3 ⼦组件接收 context value (Consumser\contextType\useContext) // ⽅法 1 connect

// hoc 函数，参数是组件，返回值是个新组件

export const connect = (

`  `mapStateToProps = state => state,

`  `mapDispatchToProps

) => WrappedComponent => props => {

`  `const store = useContext(Context);

`  `const {getState, dispatch, subscribe} = store;

`  `// store state

`  `const stateProps = mapStateToProps(getState());

`  `let dispatchProps = {dispatch};

`  `if (typeof mapDispatchToProps === "object") {

dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);   } else if (typeof mapDispatchToProps === "function") {

dispatchProps = mapDispatchToProps(dispatch);

`  `}

`  `// 让函数强制更新的⽅法

`  `// const [, forceUpdate] = useReducer(x => x + 1, 0);

`  `// const [, forceUpdate] = useState({});

`  `const forceUpdate = useForceUpdate();

`  `// \* useEffect \_ \_  DOM变更  effect执⾏ (订阅 )

`  `// \* useLayoutEffect \_\_   DOM变更 -effect执⾏ (订阅 )

`  `// 订阅   //

`  `useLayoutEffect(() => {![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.029.png)

//有订阅 ⼀定要有取消订阅

const unsubscribe = store.subscribe(() => {

// todo 让函数组件更新

forceUpdate();

});

return () => {

if (unsubscribe) { unsubscribe();

`      `}

`    `};

`  `}, [store]);

`  `return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />; }; ![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.002.png)

// hook只能⽤在函数组件或者是⾃定义 hook function useForceUpdate() {

`  `const [state, setState] = useState(0);   const update = useCallback(() => {

setState(prev => prev + 1);

`  `}, []);

`  `return update; } 

function bindActionCreator(creator, dispatch) {

`  `return (...args) => dispatch(creator(...args));

}

export function bindActionCreators(creators, dispatch) {   let obj = {};

`  `// todo

`  `for (let key in creators) {

obj[key] = bindActionCreator(creators[key], dispatch);

`  `}

`  `return obj; }

**react-redux hooks API及实现**

useSelector  获取 store state useDispatch 获取 dispatch

import React, {useCallback} from "react";![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.030.png)

import {useSelector, useDispatch} from "react-redux";

export default function ReactReduxHookPage({value}) {   const dispatch = useDispatch();

`  `const add = useCallback(() => {

dispatch({type: "ADD"});

`  `}, []);

`  `const count = useSelector(({count}) => count);   return (

<div>


<h3>ReactReduxHookPage</h3> <p>{count}</p>

<button onClick={add}>add</button>![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.002.png)

</div>

`  `);

}

实现：

export function useSelector(selector) {

`  `const store = useStore();

`  `const {getState, subscribe} = store;

`  `const selectedState = selector(getState());

`  `const [ignored, forceUpdate] = useReducer(x => x + 1, 0);   useLayoutEffect(() => {

const unsubscribe = store.subscribe(() => {

forceUpdate();

`    `});

return () => {

if (unsubscribe) { unsubscribe();

`      `}

`    `};

`  `}, [store]);

`  `return selectedState; }

export function useDispatch() {   const store = useStore();

`  `return store.dispatch;

}![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.031.png)

export function useStore() {

`  `const store = useContext(Context);   return store;

}

拓展

**function组件中有类似 forceUpdate 的东⻄吗？**

如果前后两次的值相同， useState 和  useReducer Hook [都会放弃更新 ](https://zh-hans.reactjs.org/docs/hooks-reference.html%23bailing-out-of-a-state-update)。原地修改 state 并调

⽤  setState 不会引起重新渲染。 通常，你不应该在 React 中修改本地 state。然⽽，作为⼀条出路，你可以⽤⼀个增⻓的计数器来![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.002.png)

在 state 没变的时候依然强制⼀次重新渲染：

const [ignored, forceUpdate] = useReducer(x => x + 1, 0); function handleClick() {

forceUpdate();

}

可能的话尽量避免这种模式。

**react-router简介**

react-router包含 3个库， react-router、 react-router-dom和 react-router-native。 react-router提供最 基本的路由功能，实际使⽤的时候我们不会直接安装 react-router，⽽是根据应⽤运⾏的环境选择安装 react-router-dom（在浏览器中使⽤）或 react-router-native（在 rn中使⽤）。 react-router-dom和 react-router-native都依赖 react-router，所以在安装时， react-router也会⾃动安装，创建 web应⽤， 使⽤：

**安装**

yarn add react-router-dom

**基本使⽤**

react-router中奉⾏⼀切皆组件的思想，路由器 -**Router**、链接 -**Link**、路由 -**Route**、独占 -**Switch**、重 定向 -**Redirect**都以组件形式存在

创建 RouterPage.js

import React, { Component } from "react";![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.032.png)

import { BrowserRouter, Link, Route } from "react-router-dom"; import HomePage from "./HomePage";

import UserPage from "./UserPage";

export default class RouterPage extends Component {

`  `render() {

return (

<div>


<h1>RouterPage</h1>

<BrowserRouter>

<nav>


<Link to="/">⾸⻚ </Link>

<Link to="/user">⽤户中⼼ </Link>

</nav>

`          `{/\* 根路由要添加 exact，实现精确匹配 \*/}![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.002.png)

<Route exact path="/" component={HomePage} />

<Route path="/user" component={UserPage} /> </BrowserRouter>

</div>

`    `);   } }

**使⽤ Router**

**404⻚⾯**

设定⼀个没有 path的路由在路由列表最后⾯，表示⼀定匹配

{/\*  添加 Switch表示仅匹配⼀个 \*/}![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.033.png)

<Switch>

`  `{/\* 根路由要添加 exact，实现精确匹配 \*/}

`  `<Route exact path="/" component={HomePage} />

`  `<Route path="/user" component={UserPage} />

`  `<Route path="/search/:id" component={Search} />   <Route render={() => <h1>404</h1>} />

</Switch>

**回顾![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.034.png)**

[**React全家桶 02-React-Redux** ](#_page0_x532.95_y64.97)

[课堂⽬标](#_page0_x532.95_y495.12)

[资源](#_page0_x532.95_y624.31)

[知识要点](#_page1_x532.95_y25.73)

[Hooks API ](#_page1_x532.95_y61.62)

[useReducer](#_page1_x532.95_y89.65)

[useEffect](#_page1_x532.95_y667.05)

[useLayoutEffect](#_page2_x532.95_y174.34)

[使⽤ react-redux](#_page2_x532.95_y316.71)

[API](#_page2_x532.95_y503.93)

[<Provider store>](#_page2_x532.95_y528.76)![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.035.png)

[connect(\[mapStateToProps\], \[mapDispatchToProps\], \[mergeProps\], \[options\]) ](#_page2_x532.95_y622.77)[参数](#_page2_x532.95_y699.16)

[实现 react-redux](#_page5_x532.95_y751.29)

[react-redux hooks API及实现 ](#_page7_x532.95_y690.43)

[react-router简介](#_page9_x532.95_y444.71)

[安装](#_page9_x532.95_y587.57)

[基本使⽤](#_page9_x532.95_y683.67)

[使⽤ Router ](#_page10_x532.95_y423.75)![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.002.png)

[404⻚⾯ ](#_page10_x532.95_y451.78)

[回顾 ](#_page10_x532.95_y687.22)

[作业 ](#_page11_x532.95_y362.37)[下节课内容 ](#_page12_x532.95_y50.56)

**作业 ![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.036.png)**

画 redux数据流向图，就交这个图， **补充这个图并⾃⼰画⼀遍** ， **不要交⽹图** 。

![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.037.jpeg)

**下节课内容![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.001.png)**

实现 react-router：动态路由，实现 Router、 Link、 Route、 Switch、 Redirect和 react-router hooks⽅ 法。

![](Aspose.Words.591a6c82-a91a-4175-8bd1-17a6e7d1d9b8.002.png)