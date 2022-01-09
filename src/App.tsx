import * as React from 'react';
import { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
// import "./App.css";

// import FatherComponent from './components/fatherComponent';
// import ComponentWithHook from './components/ComponentWithHook';

// import Card from './components/antdTrial'
// import BasicLayout from './components/BasicLayout'

const App = () => {
  // const [count, setCount] = useState(60);

  // const handleCountReduce = () => {
  //   if (count !== 0) {
  //     let newCount = count - 1;
  //     setCount(newCount);
  //   }
  // else {
  // clearInterval(timer);
  // }
  // };

  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     handleCountReduce();
  //   }, 1000);

  // return () => {
  // if (count === 0) {
  // clearInterval(timer);
  // };
  // };
  // });

  return (
    <div>
      react123
      {/* {count} */}
      {/* <FatherComponent /> */}
      {/* <ComponentWithHook /> */}
    </div>
  );
};

export default hot(module)(App);
