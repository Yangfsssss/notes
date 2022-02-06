export type Action<T> = { type: string; payload?: T };
export type Dispatch = (action: Action<any>) => void;
export type Selector<T> = (state: any) => T;

export type Creator = () => Action<any>;
export type Creators = Record<string, Creator>;

export type Store<T> = {
  getState: () => T;
  dispatch: (...args: any) => void;
  subscribe: (listener: () => void) => () => void;
};

export type MapStateToProps<T> = (value: T) => T;
export type MapDispatchToProps = Creators | ((dispatch: Dispatch) => Record<string, () => void>);
