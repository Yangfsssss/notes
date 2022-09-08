import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './style.scss';

class App extends React.Component<RouteComponentProps> {
  handleRoute = () => {
    const { location, history } = this.props;
    const { pathname } = location;

    // 自动去首页
    if (pathname === '/') {
      history.push('index');
      return false;
    }

    return true;
  };

  render() {
    const { children } = this.props;
    return <div>{this.handleRoute() ? children : null}</div>;
  }
}

export default App;
