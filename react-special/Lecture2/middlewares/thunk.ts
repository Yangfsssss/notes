import { Middleware } from '../kredux/applyMiddleware';

export const thunk: Middleware = ({ getState, middleDispatch }) => {
  return (next) => (action) => {
    if (typeof action === 'function') {
      return action(middleDispatch, getState);
    }

    return next(action);
  };
};
