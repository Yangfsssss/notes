**React全家桶 01-redux![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.001.png)**

[**React全家桶 01-redux**](#_page0_x532.95_y81.79)

[课堂⽬标](#_page0_x532.95_y620.03)

[资源](#_page1_x532.95_y34.54)

[知识点](#_page1_x532.95_y180.16)

[Reducer](#_page1_x532.95_y231.76)

[什么是 reducer](#_page1_x532.95_y271.80)

[什么是 reduce ](#_page1_x532.95_y609.58)[Redux 上⼿](#_page3_x532.95_y292.41)

[安装 redux ](#_page3_x532.95_y670.78)[redux上⼿](#_page4_x532.95_y25.73)

[检查点](#_page6_x532.95_y273.19)

[Redux拓展](#_page6_x532.95_y478.52)

[核⼼实现](#_page6_x532.95_y518.56)

[异步](#_page7_x532.95_y645.58)

[中间件实现](#_page9_x532.95_y252.37)

[applyMiddleware](#_page9_x532.95_y329.25)

[redux-logger原理](#_page10_x532.95_y320.44)

[redux-thunk原理](#_page10_x532.95_y756.89)

[redux-promise ](#_page11_x532.95_y296.41)[回顾](#_page12_x532.95_y490.22)

[作业](#_page13_x532.95_y273.95)

[下节课内容](#_page13_x532.95_y612.48)

**课堂⽬标![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.002.png)**

1. 掌握 redux使⽤及实现
1. 课件地址： <https://github.com/bubucuo/kkb-react>![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.003.png)

**资源![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.002.png)**

1. [redux](https://www.redux.org.cn/)
1. [redux github](https://github.com/reduxjs/redux)![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.004.png)

**知识点![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.005.png)**

**Reducer**

**什么是 [reducer**](https://cn.redux.js.org/docs/basics/Reducers.html)**

**reducer 就是⼀个纯函数，接收旧的 state 和 action，返回新的 state。**

;(previousState, action) => newState![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.006.png)

之所以将这样的函数称之为 reducer，是因为这种函数与被传⼊

[Array.prototype.reduce(reducer, ?initialValue) ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)⾥的回调函数属 于相同的类型。保持![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.007.png) reducer 纯净⾮常重要。 **永远不要** 在 reducer ⾥做这 些操作：

- 修改传⼊参数；
  - 执⾏有副作⽤的操作，如 API 请求和路由跳转；
    - 调⽤⾮纯函数，如 Date.now() 或 Math.random() 。![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.008.png)![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.009.png)

**什么是 reduce**

[此例来⾃ https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Ref erence/Global_Objects/Array/Reduce。](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.010.png)![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.011.png)

const array1 = [1, 2, 3, 4];![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.012.png)

const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4

console.log(array1.reduce(reducer));

// expected output: 10

// 5 + 1 + 2 + 3 + 4

console.log(array1.reduce(reducer, 5));

// expected output: 15

思考：有如下函数， 聚合成⼀个函数，并把第⼀个函数的返回值传递给下 ⼀个函数，如何处理。

function f1(arg) {![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.013.png)

`  `console.log("f1", arg);   return arg;

}

function f2(arg) {

`  `console.log("f2", arg);   return arg;

}

function f3(arg) {

`  `console.log("f3", arg);   return arg;

}

⽅法：

function compose(...funcs) {![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.014.png)

`  `if (funcs.length === 0) {

return arg => arg

`  `}

`  `if (funcs.length === 1) {

return funcs[0]

`  `}

`  `return funcs.reduce((a, b) => (...args) => a(b(...args))) }

console.log(compose(f1, f2, f3)("omg"));

**Redux 上⼿**

Redux是 JavaScript应⽤的状态容器。它保证程序⾏为⼀致性且易于测试。

![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.015.jpeg)

**安装 redux**

yarn add redux![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.016.png)

**redux上⼿**

redux较难上⼿，是因为上来就有太多的概念需要学习 ，⽤⼀个累加器举例![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.017.png)

1. 需要⼀个 store来存储数据
1. store⾥的 r[educer初始化](https://cn.redux.js.org/docs/basics/Reducers.html) state并 **定义 state修改规则**
1. 通过 dispatch⼀个 action来提交对数据的修改
1. action提交到 reducer函数⾥，根据传⼊的 action的 type，返回新的 state

创建 store， src/store/index.js

import {createStore} from "redux"; ![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.018.png)function countReducer(state = 0, action) {

`  `switch (action.type) {

case "ADD":

return state + 1;

case "MINUS":

return state - 1;

default:

return state;

`  `}

}

const store = createStore(countReducer); export default store;

创建 ReduxPage

import React, {Component} from "react";![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.019.png)

import store from "../store/";

export default class ReduxPage extends Component {

`  `componentDidMount() {![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.020.png)

store.subscribe(() => {

this.forceUpdate();

`    `});

`  `}

`  `add = () => {

store.dispatch({type: "ADD"});

`  `};

`  `minus = () => {

store.dispatch({type: "MINUS"});

`  `};

`  `render() {

console.log("store", store); //sy-log

return (

<div>

<h3>ReduxPage</h3> <p>{store.getState()}</p>

<button onClick={this.add}>add</button>

<button onClick={this.minus}>minus</button> </div>

`    `);

`  `}

}

![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.021.png) 如果点击按钮不能更新，查看是否订阅 (subscribe)状态变更。 还可以在 src/index.js的 render⾥订阅状态变更

import store from './store/' ![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.012.png)const render = ()=>{

`  `ReactDom.render(

<App/>,

document.querySelector('#root')   )

}

render()

store.subscribe(render)

**检查点**

1. createStore 创建 store
1. reducer 初始化、修改状态函数
1. getState 获取状态值
1. dispatch 提交更新
1. subscribe 变更订阅

**Redux拓展**

**核⼼实现**

- 存储状态 state
  - 获取状态 getState
    - 更新状态 dispatch
      - 变更订阅 subscribe

AkRedux.js

export default function createStore(reducer, enhancer) {   ![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.022.png)if (enhancer) {

return enhancer(createStore)(reducer);

`  `}

`  `let currentState;![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.023.png)

`  `let currentListeners = [];   function getState() {

return currentState;

`  `}

`  `function dispatch(action) {

currentState = reducer(currentState, action); currentListeners.forEach(listener => listener()); return action;

`  `}

`  `function subscribe(listener) {

currentListeners.push(listener); return () => {

currentListeners = [];

`    `};

`  `}

`  `dispatch({type: "KKBREDUX/OOOO"});   return {

getState,

dispatch,

subscribe

`  `};

}

**异步**

Redux只是个纯粹的状态管理器，默认只⽀持同步，实现异步任务 ⽐如延 迟，⽹络请求，需要中间件的⽀持，⽐如我们使⽤最简单的 redux-thunk和 redux-logger 。

中间件就是⼀个函数，对 store.dispatch ⽅法进⾏改造，在发出 Action 和执⾏![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.024.png) Reducer 这两步之间，添加了其他功能。

yarn add redux-thunk redux-logger![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.025.png)

![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.026.jpeg)

应⽤中间件， store.js

import { createStore, applyMiddleware } from "redux"; ![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.027.png)import logger from "redux-logger";

import thunk from "redux-thunk";

import counterReducer from './counterReducer'

const store = createStore(counterReducer, applyMiddleware(thunk, logger));

使⽤异步操作时的变化， ReactReduxPage.js

` `asyAdd = () => {![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.028.png)

store.dispatch((dispatch, getState) => {

setTimeout(() => {

// console.log("now ", getState()); //sy-log dispatch({type: "ADD", payload: 1});

`      `}, 1000);

`    `});

`  `};

**中间件实现**

核⼼任务是实现函数序列执⾏。

**applyMiddleware**

export default function applyMiddleware(...middlewares) {   ![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.029.png)return createStore => reducer => {

const store = createStore(reducer);

let dispatch = store.dispatch;

const midApi = {

getState: store.getState,

dispatch: (action, ...args) => dispatch(action, ...args)

`    `};

const middlewareChain = middlewares.map(middleware => middleware(midApi));

dispatch = compose(...middlewareChain)(store.dispatch); return {

...store,

// 加强版的 dispatch

dispatch

`    `};   };

}![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.030.png)

function compose(...funcs) {

`  `if (funcs.length === 0) {

return arg => arg;

`  `}

`  `if (funcs.length === 1) {

return funcs[0];

`  `}

`  `return funcs.reduce((a, b) => (...args) => a(b(...args)));

}

**redux-logger原理**

logger可打印 redux state变更⽇志。

function logger({getState}) {![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.031.png)

`  `return next => action => {

console.log("===================================="); console.log(action.type + "执⾏了！ "); //sy-log

const prevState = getState(); console.log("prev state", prevState); //sy-log

const returnValue = next(action);

const nextState = getState();

console.log("next state", nextState); //sy-log console.log("===================================="); return returnValue;

`  `}; }

**redux-thunk原理**

thunk增加了处理函数型 action的能⼒。

function thunk({dispatch, getState}) {![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.032.png)

`  `return next => action => {

if (typeof action === "function") {

return action(dispatch, getState);

}

return next(action);

`  `}; }

**redux-promise**

简版：

function promise({dispatch}) {![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.033.png)

`  `return next => action => {

return isPromise(action) ? action.then(dispatch) : next(action);

`  `};

}

完整版：

import isPromise from 'is-promise';![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.034.png)

import { isFSA } from 'flux-standard-action';

export default function promiseMiddleware({ dispatch }) {   return next => action => {

if (!isFSA(action)) {

return isPromise(action) ? action.then(dispatch) : next(action);

`    `}

return isPromise(action.payload)

? action.payload![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.035.png)

`          `.then(result => dispatch({ ...action, payload: result }))

`          `.catch(error => {

dispatch({ ...action, payload: error, error: true });

return Promise.reject(error);

`          `})

: next(action);

`  `};

}

`  `promiseMinus = () => { ![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.036.png)store.dispatch( Promise.resolve({

type: "MINUS", payload: 100

`      `})     );

`  `};

**回顾**

[**React全家桶 01-redux**](#_page0_x532.95_y81.79)

[课堂⽬标](#_page0_x532.95_y620.03)

[资源](#_page1_x532.95_y34.54)

[知识点](#_page1_x532.95_y180.16)

[Reducer](#_page1_x532.95_y231.76)

[什么是 reducer](#_page1_x532.95_y271.80)

[什么是 reduce ](#_page1_x532.95_y609.58)[Redux 上⼿](#_page3_x532.95_y292.41)

[安装 redux](#_page3_x532.95_y670.78)

[redux上⼿](#_page4_x532.95_y25.73)

[检查点 ](#_page6_x532.95_y273.19)[Redux拓展](#_page6_x532.95_y478.52)

[核⼼实现 ](#_page6_x532.95_y518.56)[异步 ](#_page7_x532.95_y645.58)[中间件实现](#_page9_x532.95_y252.37)

[applyMiddleware ](#_page9_x532.95_y329.25)[redux-logger原理 ](#_page10_x532.95_y320.44)[redux-thunk原理 ](#_page10_x532.95_y756.89)[redux-promise](#_page11_x532.95_y296.41)

[回顾 ](#_page12_x532.95_y490.22)[作业 ](#_page13_x532.95_y273.95)[下节课内容](#_page13_x532.95_y612.48)

**作业![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.001.png)**

\1.  实现 combineReducers，阅读源码，补充以下代码，调试并运⾏， **提 交⾃⼰运⾏之后的代码截图！**

![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.037.jpeg)

**下节课内容![](Aspose.Words.6534f689-c463-44a0-b40c-e174af41a538.038.png)**

React全家桶 02： react-redux使⽤及实现。
