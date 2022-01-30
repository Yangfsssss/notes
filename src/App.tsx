import * as React from 'react';
import { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import ReactComponent from '../react-components';
import MyRCFieldForm from '../react-special/Lecture1';
import ReduxExample from '../react-special/Lecture2';
// import "./App.css";

// import FatherComponent from './components/fatherComponent';
// import ComponentWithHook from './components/ComponentWithHook';

// import Card from './components/antdTrial'
// import BasicLayout from './components/BasicLayout'

const App = () => {
  const [count, setCount] = useState('60');
  const [count1, setCount1] = useState('20');
  const [count2, setCount2] = useState('30');
  const [query, setQuery] = useState('regularData1');
  const [color, setColor] = useState('red');

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
      {/* <ReduxExample /> */}
      {/* {count} */}
      {/* <FatherComponent /> */}
      {/* <ComponentWithHook /> */}
      {/* <SearchResult query={query}>Button</SearchResult> */}
      {count}
      <ReactComponent value={count1} onChange={(value:string)=>setCount1(value)}/>
      <ReactComponent value={count2} onChange={(value:string)=>setCount2(value)}/>
      {/* <button onClick={() => setCount(Math.random())}>change count</button> */}
      {/* <button onClick={()=>setQuery('regularData2')}>change query</button> */}
    </div>
  );
};

export default hot(module)(App);
