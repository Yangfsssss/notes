import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

type PrivateRouteProps = {
  isLogin: boolean;
  component: React.FunctionComponent<any> | React.ComponentType<any>;
} & React.ComponentProps<typeof Route>;

// interface PrivateRouteProps extends React.ComponentProps<typeof Route> {
//   isLogin: boolean;
//   component: React.FunctionComponent | React.ComponentType;
// }

function privateRoute({ isLogin, component: Component, ...rest }: PrivateRouteProps) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location.pathname },
            }}
          />
        );
      }}
    />
  );
}

const PrivateRoute = connect<{}, {}, {}, { user: { isLogin: boolean } }>(({ user }) => ({
  isLogin: user.isLogin,
}))(privateRoute);

export default PrivateRoute;
