import React, { Component } from 'react';
import { ReactRouterHistory } from '../type';
import RouterContext from './RouterContext';

class Router extends Component<{ history: ReactRouterHistory }, { location: ReactRouterHistory['location'] }> {
  unListen: () => void;

  static computeRootMatch(pathname: string) {
    return {
      path: '/',
      url: '/',
      params: {},
      isExact: pathname === '/',
    };
  }

  constructor(props: { history: ReactRouterHistory }) {
    super(props);
    this.state = {
      location: props.history.location,
    };

    this.unListen = props.history.listen((location) => {
      this.setState({ location });
    });
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const { location } = this.state;

    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location,
          match: Router.computeRootMatch(this.state.location.pathname),
        }}
      >
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
