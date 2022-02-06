import React, { Component } from 'react';
// import {connect} from "react-redux";
// import {bindActionCreators} from "redux";
import { bindActionCreators, connect } from '../kReactRedux';
import { Dispatch } from '../type';

type ReactReduxPageProps = {
  count: number;
  dispatch: Dispatch;
  add: () => void;
  minus: () => void;
};

class ReactReduxPage extends Component<ReactReduxPageProps> {
  render() {
    console.log('props', this.props); //sy-log
    const { count, dispatch, add, minus } = this.props;
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

const WrappedReactReduxPage = connect<{ count: number }>(
  // mapStateToProps 把state map（映射） props上一份
  ({ count }) => ({ count }),

  // mapDispatchToProps object | function
  // {
  //   add: () => ({ type: 'ADD' }),
  //   minus: () => ({ type: 'MINUS' }),
  // }
  (dispatch: Dispatch) => {
    let creator = {
      add: () => ({ type: 'ADD' }),
      minus: () => ({ type: 'MINUS' }),
    };

    return bindActionCreators(creator, dispatch);
  }
)(ReactReduxPage);

export default WrappedReactReduxPage;
// export default ReactReduxPage;
// connect(state => state)(ReactReduxPage);
