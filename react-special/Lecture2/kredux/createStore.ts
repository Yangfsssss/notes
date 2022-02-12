import { Action, Reducer } from '../store';
import { applyMiddleware } from './applyMiddleware';

export type Store<T> = {
  getState: () => T;
  dispatch: (...args: any) => void;
  subscribe: (listener: () => void) => () => void;
};

type Enhancer = ReturnType<typeof applyMiddleware>;

// export function createStore<T>(reducer: Reducer<T>): Store<T>;
export function createStore<T>(reducer: Reducer<T>, enhancer?: Enhancer): Store<T> {
  if (enhancer && typeof enhancer === 'function') {
    return enhancer(createStore)(reducer);
  }

  let currentState: T;
  let currentListeners: (() => void)[] = [];

  function getState() {
    return currentState;
  }

  function dispatch(action: Action<T>) {
    currentState = reducer(currentState, action);
    currentListeners.map((listener) => listener());
  }

  function subscribe(listener: () => void) {
    currentListeners.push(listener);

    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  dispatch({ type: `${Date.now().toString()}` });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
