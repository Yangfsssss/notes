// import {applyMiddleware, combineReducers, createStore} from "redux";
import { createStore } from '../kredux';
import { applyMiddleware } from '../kredux/applyMiddleware';
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import promise from 'redux-promise';
import { logger } from '../middlewares/logger';
import { thunk } from '../middlewares/thunk';
import { promise } from '../middlewares/promise';
// import isPromise from "is-promise";

export type Action<T> = { type: string; payload?: T };
export type Reducer<T> = (state: T, action: Action<T>) => T;

// 定义修改规则
const countReducer: Reducer<{ count: number }> = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'ADD':
      return { count: state.count + 1 };
    case 'MINUS':
      return { count: state.count - action.payload.count || 1 };
    default:
      return state;
  }
};

// 创建一个数据仓库
export const store = createStore(
  countReducer,
  // combineReducers({count: countReducer}),
  applyMiddleware(thunk, promise, logger)
);
