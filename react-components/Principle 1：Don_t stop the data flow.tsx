/** Principle 1:Don't Stop the Data Flow */
//Keep your data flowing is essential in rendering,side effects,and optimization of you components.

import React from 'react';

//Don't Stop the Data Flowing in Rendering----------------------------------------------------------------------
export class Button extends React.Component<{ color: string }, { color: string; textColor: string }> {
  constructor(props: { color: string }) {
    super(props);

    console.log('constructor');

    this.state = {
      color: props.color,
      textColor: this.slowlyCalculateTextColor(props.color),
    };
  }

  slowlyCalculateTextColor(color: string) {
    return Math.round(Math.random() * 100).toString() + color;
  }

  componentDidUpdate(prevProps:{ color: string }) {
    if (prevProps.color !== this.props.color) {
      this.setState({
        textColor: this.slowlyCalculateTextColor(this.props.color),
      });
    }
  }

  render() {
    // const { color } = this.state;

    return (
      <button style={{ background: this.props.color, color: this.state.textColor, width: '100px', height: '100px' }}>
        {/* <button style={{ background: this.state.color, color: this.state.textColor, width: '100px', height: '100px' }}> */}
        {/* <button style={{ background: color, color: this.state.textColor, width: '100px', height: '100px' }}> */}
        {this.props.children + this.state.textColor}
      </button>
    );
  }
}

// console.log('button', new Button({ color: 'yellow' }));
// console.log('Button', Button);
//初始化时，类组件会生成一个实例，并调用其原型方法render返回初始JSX
//更新时，实例再次调用render,返回更新后的JSX
//传入组件的props的变化会且仅会体现为该实例的props属性的变化，
//所以render函数中由props决定的的JSX应该只依赖于props及其派生的数据，
//且派生数据的过程只在render函数内完成
//state同理

//conclusion:
//Dont't copy props into state,rendering results should respect changes to props.

//Don’t Stop the Data Flow in Side Effects--------------------------------------------------------------------------
//it is important that side effects (e.g. data fetching) are also a part of the data flow.
export class SearchResult extends React.Component<{ query: string }, { data: {} }> {
  constructor(props:{ query: string }) {
    super(props);

    this.state = {
      data: null,
    };
  }

  getFetchUrl() {
    return 'http://localhost:3001/api/mockedApi/' + this.props.query;
  }

  fetchResults() {
    const url = this.getFetchUrl();
    fetch(url, { method: 'POST' })
      .then((res) => res.json())
      .then((result) => console.log(result));
  }

  componentDidMount() {
    this.fetchResults();
  }

  componentDidUpdate(prevProps:{ query: string }) {
    if (prevProps.query !== this.props.query) {
      this.fetchResults();
    }
  }

  render() {
    return <div>SearchResult</div>;
  }
}

//conclusion:
//Props and state are a part of the React data flow.
//Both rendering and side effects should reflect changes in that data flow, not ignore them!

//It is important to respect all prop and state updates for effects regardless of whether you’re writing component as a class or a function.
//In class components, you have to think about consistency yourself,
//and verify that changes to every relevant prop or state are handled by componentDidUpdate.
//In function components, the useEffect API flips the default by encouraging consistency.

//Don’t Stop the Data Flow in Optimizations-----------------------------------------------------------------------
export class Button1 extends React.Component<{ color: string,onClick:() => void}, { color: string; textColor: string }> {
  constructor(props:{ color: string,onClick:() => void}) {
    super(props);

    this.state = {
      color: props.color,
      textColor: this.slowlyCalculateTextColor(props.color),
    };
  }

  slowlyCalculateTextColor(color: string) {
    return Math.round(Math.random() * 100).toString() + color;
  }

  shouldComponentUpdate(prevProps:{ color: string,onClick:() => void}){
    return this.props.color !== prevProps.color;
  }
  

  render() {
    const onClick = this.props.onClick;
    const textColor = this.slowlyCalculateTextColor(this.props.color);

    return (
      <button onClick={onClick} style={{ background: this.props.color, color: this.state.textColor, width: '100px', height: '100px' }}>
        {this.props.children + textColor}
      </button>
    );
  }
}

class MyForm extends React.Component {
  state = {
    isEnabled: true
  };

  handleClick = () => {
    this.setState({ isEnabled: false });
    // Do something
  }

  render() {
    return (
      <>
        <h1>Hello!</h1>
        <Button1 color='green' onClick={
          // 🔴 Button ignores updates to the onClick prop
          this.state.isEnabled ? this.handleClick : null
        }>
          Press me
        </Button1>
      </>
    )
  }
}

//conclusion:-------------------------------------------------------------------------------------------------------------
//Avoid manually implementing shouldComponentUpdate and to avoid specifying a custom comparison to React.memo(). 
//the default shallow comparison in React.memo will respect changing function identity.

//In a class, PureComponent has the same behavior.
//If you insist on a custom comparison, make sure that you don’t skip functions.

//In function components:
//1,Functions are different on every render so you discover this problem right away.
//2,With useCallback and useContext, you can avoid passing functions deep down altogether. 
//This lets you optimize rendering without worrying about functions.

//Summary---------------------------------------------------------------------------------------------------------------
//Whenever you use props and state, consider what should happen if they change. 
//In most cases, a component shouldn’t treat the initial render and updates differently. 
//That makes it resilient to changes in the logic.

//With classes, it’s easy to forget about updates when using props and state inside the lifecycle methods. 
//Hooks nudge you to do the right thing — but it takes some mental adjustment if you’re not used to already doing it.