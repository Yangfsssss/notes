import React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => {
  return <div>App</div>;
};

ReactDOM.render(
  <div>
    <App />
    <App />
  </div>,
  document.getElementById('root')
);

const Button = () => {
  return <button>I'm a button</button>;
};

const Component = (props:{params:any,data:any})=>{
  //smart part
  const smartData = useLogic(props.params);
  const dumbData = props.data
  const data = {...smartData,...dumbData}

  //dumb part
  return <DumbConsumer data={data}/>
}

//smart part：为dumb part提供值
//1，静态值：props、函数、props的派生值
//2，动态值：state(hook,custom hook)，state的派生值
