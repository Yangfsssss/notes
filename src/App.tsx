import * as React from 'react';
import { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import MyRCFieldForm from '../react-special/Lecture1';
import ReduxExample from '../react-special/Lecture2';
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
      {/* <MyRCFieldForm /> */}
      <ReduxExample />
      {/* {count} */}
      {/* <FatherComponent /> */}
      {/* <ComponentWithHook /> */}
    </div>
  );
};

export default hot(module)(App);
