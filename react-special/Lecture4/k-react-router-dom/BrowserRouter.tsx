import React, { Component } from 'react';
//可以使用BOM提供的history，但可能存在兼容性问题
import { createBrowserHistory } from 'history';
import Router from './Router';
import { ReactRouterHistory } from '../type';

class BrowserRouter extends Component {
  history: ReactRouterHistory;

  constructor(props: {}) {
    super(props);
    this.history = createBrowserHistory();
  }

  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}

export default BrowserRouter;
