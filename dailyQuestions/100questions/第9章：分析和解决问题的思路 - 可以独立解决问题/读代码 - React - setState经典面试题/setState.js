import React from 'react';

export default class SetStateDemo extends React.Component {
  // state: { val: number };
  constructor(props) {
    super(props);
    this.state = {
      val: 0,
    };
  }

  componentDidMount() {
    // 传入函数，不会合并
    this.setState((prevState,props) => {
      return {
        val: prevState.val + 1,
      };
    });
    // console.log('a------>', this.state.val);

    this.setState((prevState,props) => {
      return {
        val: prevState.val + 1,
      };
    });
    // console.log('b------>', this.state.val);

    // this.setState({
    //   val: this.state.val + 1,
    // });
    // console.log('a----', this.state.val);

    // this.setState({
    //   val: this.state.val + 1,
    // });
    // console.log('b----', this.state.val);

    // setTimeout，setImmediate，setInterval
    setTimeout(() => {
      this.setState({
        val: this.state.val + 1,
      });
      console.log('c------>', this.state.val);

      this.setState({
        val: this.state.val + 1,
      });
      console.log('d------>' ,this.state.val);
    }, 0);

    // 自定义，非React DOM事件
    document.getElementById('p1')
      .addEventListener('click', () => {
        this.setState({
          val: this.state.val + 1,
        });

        console.log('e----', this.state.val);
      })
  }

  render() {
    return (
      <div>
        <p id='p1'>SetStateDemo: {this.state.val}</p>
      </div>
    );
  }
}
