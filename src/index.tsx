import * as React from 'react';
import * as ReactDOM from 'react-dom';
import customRender from '../react-special/Lecture5/render';
import AppRoute from '../State Manage in React/code/src/routes';

import 'antd/dist/antd.less';

import App from './App';
// import TodoList from '../dailyQuestions/framework & interview/第11章：项目设计/TodoList/index';

// const customRender: null | (() => ReturnType<typeof ReactDOM.render>) = null;

// customRender ? customRender() : ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<AppRoute />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
