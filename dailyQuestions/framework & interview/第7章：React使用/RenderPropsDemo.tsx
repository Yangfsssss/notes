import React, { Children, ReactElement } from 'react';

class Mouse extends React.Component<
  { render: ({ x, y }: { x: number; y: number }) => JSX.Element },
  { x: number; y: number }
> {
  state: {
    x: number;
    y: number;
  };

  constructor(props: { render: ({ x, y }: { x: number; y: number }) => JSX.Element }) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  handleMouseMove = (e: React.MouseEvent) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  };

  render() {
    return (
      <div style={{ height: '500px' }} onMouseMove={this.handleMouseMove}>
        {/* 将当前 state 作为 props，传递给 render */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

export const App = () => {
  return (
    <div style={{ height: '500px' }}>
      <Mouse
        render={
          /* render 是一个函数组件 */
          ({ x, y }) => <h1>{`The mouse position is (${x},${y})`}</h1>
        }
      />
    </div>
  );
};

// 用 custom hook 完全代替 render props
const useMouse = (ConsumerUI: (mouse: { x: number; y: number }) => JSX.Element) => {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  const Element = () => (
    <div style={{ height: '500px' }} onMouseMove={handleMouseMove}>
      {ConsumerUI(mouse)}
    </div>
  );

  // return [() => ConsumerUI(mouse), handleMouseMove] as const;
  return Element;
};

const Mouse2 = () => {
  // const [ConsumerUI, handleMouseMove] = useMouse(ConsumerUI1);
  const Element = useMouse(ConsumerUI1);

  return (
    // <div style={{ height: '500px' }} onMouseMove={handleMouseMove}>
    <Element />
    // </div>
  );
};

const ConsumerUI1 = (mouse: { x: number; y: number }) => <h1>{`The mouse position1 is (${mouse.x},${mouse.y})`}</h1>;
const ConsumerUI2 = (mouse: { x: number; y: number }) => <h2>{`The mouse position2 is (${mouse.x},${mouse.y})`}</h2>;

export const App2 = () => {
  return <Mouse2 />;
};

// 组件
// custom hook
// render props
// HOC

// consumer UI
