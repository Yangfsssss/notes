import { Reducer } from '../store';
import { createStore, Store } from './createStore';

type CreateStore = typeof createStore;

export type MidApi = { getState: () => unknown; middleDispatch: (...args: any[]) => void };

export type Middleware = (midApi: MidApi) => (next: (action: any) => any) => (action: any) => void;

export type EnhancedStore = Store<any>;

export type AppleMiddleware = (
  ...middlewares: Middleware[]
) => (createStore: CreateStore) => (reducer: Reducer<any>) => EnhancedStore;

export const applyMiddleware: AppleMiddleware = (...middlewares) => {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let enhancedDispatch = store.dispatch;
    //把中间件写成wrapper function
    //给中间件函数传参 getState dispatch

    // todo get super dispatch
    const midApi: MidApi = {
      getState: store.getState,
      //使用当前上下文中已增强过的dispatch，而非原始的store.dispatch
      middleDispatch: (args: any[]) => enhancedDispatch(...args),
    };

    // 这个时候middleware就能访问store了
    // middlewaresChain是个能够访问store的中间件数组

    const middlewaresChain = middlewares.map((middleware) => middleware(midApi));

    // super dispatch
    enhancedDispatch = compose(...middlewaresChain)(store.dispatch);

    return { ...store, dispatch: enhancedDispatch };
  };
};

// function compose(): (arg: unknown) => unknown;
// function compose(...funcs: [(arg: unknown) => unknown]): (arg: unknown) => unknown;
function compose(...funcs: ((arg: unknown) => unknown)[]) {
  if (funcs.length === 0) {
    return (...args: any) => args;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(args))
  );
}
