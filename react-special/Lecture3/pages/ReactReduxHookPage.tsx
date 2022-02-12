import React, { useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from '../kReactRedux';

function ReactReduxHookPage() {
  const count = useSelector<number>(({ count }) => count);
  const dispatch = useDispatch();

  const handle = useCallback(() => {
    dispatch({ type: 'ADD' });
  }, []);

  return (
    <div>
      <h3>ReactReduxHookPage</h3>
      <button onClick={handle}>{count}</button>
    </div>
  );
}

export default ReactReduxHookPage;
