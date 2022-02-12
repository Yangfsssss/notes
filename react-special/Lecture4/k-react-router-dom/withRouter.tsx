import React from 'react';
import { RouterContextType } from '../type';

import RouterContext from './RouterContext';

export function withRouter<T>(WrappedComponent: React.ComponentType<T & RouterContextType>) {
  return function hoc(props: T) {
    return (
      <RouterContext.Consumer>
        {(context) => {
          return <WrappedComponent {...props} {...context} />;
        }}
      </RouterContext.Consumer>
    );
  };
}
