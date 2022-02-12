import { Middleware } from '../kredux/applyMiddleware';

export const promise: Middleware = ({ middleDispatch, getState }) => {
  return (next) => (action) => {
    if (action instanceof Promise) {
      return action.then((res) => next(res)).catch((err) => next(err));
    }

    return next(action);
  };
};
