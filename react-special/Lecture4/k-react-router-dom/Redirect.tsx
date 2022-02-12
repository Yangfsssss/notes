import React from 'react';
import RouterContext from './RouterContext';

export class Redirect extends React.Component<{ to: string }> {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { to } = this.props;
          const { history } = context;

          return <LifeCycle onMount={() => history.push(to)} />;
        }}
      </RouterContext.Consumer>
    );
  }
}

class LifeCycle extends React.Component<{ onMount: () => void }> {
  componentDidMount() {
    if (this.props.onMount && typeof this.props.onMount === 'function') {
      this.props.onMount.call(this, this);
    }
  }

  render(): null {
    return null;
  }
}
