import ReactReduxPage from './pages/ReactReduxPage';

export type Action<T> = { type: string; payload?: T };
export type Dispatch = (action: Action<any>) => void;
export type Selector<T> = (state: any) => T;

export type Creator = () => Action<any>;
export type Creators = Record<string, Creator>;
export type BoundCreators = Record<string, () => void>;

export type Store<T> = {
  getState: () => T;
  dispatch: Dispatch;
  subscribe: (listener: () => void) => () => void;
};

export type MapStateToProps<T> = (value: any) => T;
// export type MapDispatchToProps = Creators | (() => Creators);
export type MapDispatchToProps = Creators;

export type DispatchProps = {
  [key: string]: (() => void) | Dispatch;
  dispatch: Dispatch;
};

const obj = {
  add: () => {},
  minus: () => {},
};

type key = keyof typeof obj;
type key1 = keyof Record<'add' | 'minus', Creator> & { dispatch: Dispatch };
type key2 = Record<keyof Record<'add' | 'minus', Creator>, () => void> & { dispatch: Dispatch };
