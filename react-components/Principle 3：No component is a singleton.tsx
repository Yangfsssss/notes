/** Principle 3:No Component Is a Singleton */

import React from 'react';

export default class ComponentX extends React.Component<{ value: string; onChange: (value: string) => void }> {
  constructor(props: { value: string; onChange: (value: string) => void }) {
    super(props);
  }

  componentDidMount() {
    this.props.onChange('z');
  }

  render() {
    return <div onClick={() => this.props.onChange('reset')}>{`+ ${this.props.value} +`}</div>;
  }
}

//Conclusion:---------------------------------------------------------------------------------------------------------------
//Showing or hiding a tree shouldn’t break components outside of that tree.

//Whether you plan to render this component twice or not, solving these issues pays off in the longer term.
//It leads you to a more resilient design.
