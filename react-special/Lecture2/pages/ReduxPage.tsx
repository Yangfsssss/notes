import React, { Component } from 'react';
import { store } from '../store';

export default class ReduxPage extends Component {
  private unsubscribe: () => void;

  componentDidMount() {
    // store发生变化之后，执行subscribe的监听函数
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  add = () => {
    // 修改状态 set
    console.log('123');

    store.dispatch({ type: 'ADD' });
  };

  asyAdd = () => {
    // ajax
    setTimeout(() => {
      store.dispatch({ type: 'ADD', payload: { count: 1 } });
    }, 1000);
  };
  // store.dispatch((dispatch, getState) => {
  //   setTimeout(() => {
  // console.log("now ", getState()); //sy-log
  //       dispatch({ type: 'ADD', payload: 1 });
  //     }, 1000);
  //   });
  // };

  promiseMinus = () => {
    store.dispatch(
      Promise.resolve({
        type: 'MINUS',
        payload: { count: 1 },
      })
    );
  };

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState().count}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asyAdd</button>
        <button onClick={this.promiseMinus}>promiseAdd</button>
      </div>
    );
  }
}
