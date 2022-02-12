import { Middleware } from '../kredux/applyMiddleware';

export const logger: Middleware = ({ middleDispatch, getState }) => {
  return (next) => (action) => {
    console.log('----------------------------------------------------------------');
    const prevState = getState();
    console.log('prevState', prevState);

    // dispatch({ type: 'any' });

    const returnedValue = next(action);
    const nextState = getState();
    console.log('nextState', nextState);
    console.log('----------------------------------------------------------------');

    return returnedValue;
  };
};
