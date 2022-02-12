/** Principle 1:Don't Stop the Data Flow */
//Don’t try to introduce unnecessary timing assumptions into your component behavior.
//Your component should be ready to re-render at any time.

import React, { Component } from 'react';

export default class TextInput extends Component<{ value: string }, { value: string }> {
  constructor(props: { value: string }) {
    super(props);

    this.state = {
      value: '',
    };

    //Class.prototype上的方法作为回调使用时，this为undefined，
    //将这些方法使用bind()方法绑定实例作为this并复制到实例上作为实例方法以避免this失效的问题
    this.handleChange = this.handleChange.bind(this);
  }

  //🔴 reset local state on every parent render
  componentWillReceiveProps(nextProps: { value: string }) {
    this.setState({ value: nextProps.value });
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: e.target.value });
  }

  render() {
    const input = <input value={this.state.value} onChange={this.handleChange} />;
    return input;
  }
}

//避免双重控制，即子组件依赖自身state，但state可以由子组件自身和父组件同时控制。
//即避免不可预测的父组件更新导致不可预测的子组件更新
//We need to stop thinking of “receiving props” as something different from just “rendering”.
//A re-render caused by a parent shouldn’t behave differently from a re-render caused by our own local state change.
//Components should be resilient to rendering less or more often because otherwise they’re too coupled to their particular parents.

//Different solutions when you truly want to derive state from props,
//Option 1:fully controlled component
function TextInput1({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent) => void }) {
  return <input value={value} onChange={onChange} />;
}

//Option 2:fully uncontrolled component
function TextInput2() {
  const [value, setValue] = useState('');

  return <input value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />;
}

//We can reset its internal state later by changing the key:
//<TextInput2 key={formId} />

//Conclusion:-------------------------------------------------------------------------------------------------------------
// Your component shouldn’t break just because it or its parent re-renders more often.
//The React API design makes it easy if you avoid the legacy componentWillReceiveProps lifecycle method.

//Stress-test:
//componentDidMount() {
// Don't forget to remove this immediately!
// setInterval(() => this.forceUpdate(), 100);
// }

//Optimizations like PureComponent, shouldComponentUpdate, and React.memo shouldn’t be used for controlling behavior.
//Only use them to improve performance where it helps.
//If removing an optimization breaks a component, it was too fragile to begin with.

//Don’t treat “receiving props” as a special event.
//Avoid “syncing” props and state. In most cases, every value should either be fully controlled (through props), or fully uncontrolled (in local state).
//Avoid derived state when you can. And always be ready to render!
