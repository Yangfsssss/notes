import React, { Component } from 'react';
// import {connect} from "react-redux";
// import {bindActionCreators} from "redux";
import { bindActionCreators, connect } from '../kReactRedux';
import { Creator, Dispatch } from '../type';

type ReactReduxPageProps = {
  count: number;
  dispatch: Dispatch;
  add: () => void;
  minus: () => void;
  isStable: boolean;
};

class ReactReduxPage extends Component<ReactReduxPageProps> {
  render() {
    console.log('props', this.props); //sy-log
    const { count, dispatch, add, minus, isStable } = this.props;
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{count}</p>
        <button onClick={() => dispatch({ type: 'ADD', payload: 100 })}>dispatch add</button>

        <button onClick={add}> add </button>
        <button onClick={minus}> minus </button>
      </div>
    );
  }
}

// hoc是个函数，接收组件作为参数，返回新的组件
// @connect<{ count: number }>(
//   // mapStateToProps 把state map（映射） props上一份
//   ({ count }) => ({ count }),

//   // mapDispatchToProps object | function
//   {
//     add: () => ({ type: 'ADD' }),
//     minus: () => ({ type: 'MINUS' }),
//   }
// )

const Wrapper = connect<{ count: number }, { isStable: boolean }>(
  // mapStateToProps 把state map（映射） props上一份
  ({ count }) => ({ count }),

  // mapDispatchToProps object | function
  {
    add: () => ({ type: 'ADD' }),
    minus: () => ({ type: 'MINUS' }),
  }
  // () => ({
  //   add: () => ({ type: 'ADD' }),
  //   minus: () => ({ type: 'MINUS' }),
  // })
);

const WrappedReactReduxPage = Wrapper(ReactReduxPage);

export default WrappedReactReduxPage;
// export default ReactReduxPage;
// connect(state => state)(ReactReduxPage);
