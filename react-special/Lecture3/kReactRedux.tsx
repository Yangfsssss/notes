import React, { ReactChild, useCallback, useContext, useEffect, useLayoutEffect, useReducer } from 'react';
import {
  BoundCreators,
  Creator,
  Creators,
  Dispatch,
  DispatchProps,
  MapDispatchToProps,
  MapStateToProps,
  Selector,
  Store,
} from './type';

//Provider
//context 跨层级数据传递
//1，创建context对象
const Context = React.createContext<Store<any>>(null);
//2，Provider传递value
export function Provider({ children, store }: { children: ReactChild; store: Store<any> }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

//connect
export function connect<T, U>(mapStateToProps: MapStateToProps<T>, mapDispatchToProps: MapDispatchToProps) {
  return function hoc(WrapperComponent: React.ComponentType<T & U & { dispatch: Dispatch }>) {
    return function Component(props: U) {
      const store = useContext(Context);

      const stateProps = mapStateToProps(store.getState());

      // let dispatchProps = { dispatch: store.dispatch } as DispatchProps ;

      // if (typeof mapDispatchToProps === 'function') {
      //   dispatchProps = { ...bindActionCreators(mapDispatchToProps(),store.dispatch), ...dispatchProps };
      // } else if (typeof mapDispatchToProps === 'object') {
      const dispatchProps = {
        ...bindActionCreators(mapDispatchToProps, store.dispatch),
        dispatch: store.dispatch,
      };
      // }

      const forceUpdate = useForceUpdate();

      //useEffect在DOM渲染完成之后延迟执行，即有可能在执行subscribe之前发生dispatch，
      //由于subscribe还未执行，所以订阅事件，即forceUpdate无法执行
      useLayoutEffect(() => {
        const unsubscribe = store.subscribe(() => {
          forceUpdate();
        });

        return () => {
          unsubscribe();
        };
      });

      return <WrapperComponent {...props} {...stateProps} {...dispatchProps} />;
    };
  };
}

function useForceUpdate() {
  const [, setState] = useReducer((x) => x + 1, 0);

  return useCallback(() => setState(), []);
}

function bindActionCreator(creator: Creator, dispatch: Dispatch) {
  return () => dispatch(creator());
}

export function bindActionCreators(creators: Creators, dispatch: Dispatch) {
  let result: BoundCreators = {};

  Object.keys(creators).forEach((key) => {
    result[key] = bindActionCreator(creators[key], dispatch);
  });

  return result;
}

//hooks
export function useDispatch() {
  const store = useContext(Context);

  return store.dispatch;
}

export function useSelector<T>(selector: Selector<T>) {
  const store = useContext(Context);
  const selectedState = selector(store.getState());

  const forceUpdate = useForceUpdate();

  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });

    return () => {
      unsubscribe();
    };
  });

  return selectedState;
}
