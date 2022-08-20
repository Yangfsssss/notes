// 两个数组do和undo，用useReducer控制；
// do：添加新状态value到do数组；
// undo：从do数组中取出尾状态value，添加到undo数组；
// redo：从undo数组中取出尾状态value，添加到do数组；
// UI显示do数组中的最后一个状态value；
import React, { Reducer, useReducer } from 'react';

interface State {
  do: string[];
  undo: string[];
}

type Action =
  | {
      type: 'do';
      value: string;
    }
  | {
      type: 'undo';
    }
  | {
      type: 'redo';
    };

const reducer: Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case 'do':
      return {
        do: [...prevState.do, action.value],
        undo: [...prevState.undo],
      };
    case 'undo':
      return {
        do: [...prevState.do.slice(0, -1)],
        undo: [...prevState.undo, ...prevState.do.slice(-1)],
      };
    case 'redo':
      return {
        do: [...prevState.do, ...prevState.undo.slice(-1)],
        undo: [...prevState.undo.slice(0, -1)],
      };
    default:
      return prevState;
  }
};

const initialState: State = {
  do: [],
  undo: [],
};

export const UndoAndRedo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'do',
      value: e.target.value,
    });
  };

  const undoClickHandler = () => {
    dispatch({
      type: 'undo',
    });
  };

  const redoClickHandler = () => {
    dispatch({
      type: 'redo',
    });
  };

  return (
    <div>
      <input type="text" value={state.do[state.do.length - 1]} onChange={onInputChange} />
      <button onClick={undoClickHandler}>undo</button>
      <button onClick={redoClickHandler}>redo</button>
    </div>
  );
};

export default UndoAndRedo;
