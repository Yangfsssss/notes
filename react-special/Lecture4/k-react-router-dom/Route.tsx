import React, { Component } from 'react';
import { Match, RouterContextType } from '../type';
import matchPath from './matchPath';
import RouterContext from './RouterContext';

class Route extends Component<{
  path?: string;
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
  component?: React.FunctionComponent<RouterContextType> | React.ComponentType<RouterContextType>;
  render?: (props: any) => JSX.Element;
  computedMatch?: Match;
}> {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { path, children, component, render, computedMatch } = this.props;
          const { location } = context;
          const match = computedMatch ? computedMatch : path ? matchPath(location.pathname, this.props) : context.match;
          const props = {
            ...context,
            match,
          };

          //1，match:children -> component -> render
          //2,，no match:children(function) -> null
          return (
            <RouterContext.Provider value={props}>
              {match
                ? children
                  ? typeof children === 'function'
                    ? children(props)
                    : children
                  : component
                  ? React.createElement<RouterContextType>(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === 'function'
                ? children(props)
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Route;
