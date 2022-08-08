//https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e
// import React, { useState } from 'react';
import React from 'react';

export default function App() {
  let state: unknown[] = [];
  let setters: ((newVal: unknown) => void)[] = [];
  let firstRun = true;
  let cursor = 0;

  function createSetter(cursor: number) {
    return function setterWithCursor(newVal: unknown) {
      state[cursor] = newVal;
    };
  }

  function useState(initVal: unknown) {
    if (firstRun) {
      state.push(initVal);
      setters.push(createSetter(cursor));
      firstRun = false;
    }

    const setter = setters[cursor];
    const value = state[cursor];

    cursor++;

    return [value, setter] as const;
  }

  function RenderFunctionComponent() {
    const [firstName, setFirstName] = useState('Rudi'); // cursor:0
    const [lastName, setLastName] = useState('Yardley'); // cursor:1

    return (
      <div>
        {firstName} {lastName}
        <button onClick={() => setFirstName('Richard')}>Richard</button>
        <button onClick={() => setFirstName('Fred')}>Fred</button>
      </div>
    );

    // const div = document.createElement('div');

    // const buttonA = document.createElement('button');
    // buttonA.innerHTML = 'Richard';
    // buttonA.addEventListener('click', () => setFirstName('Richard'));

    // const buttonB = document.createElement('button');
    // buttonB.innerHTML = 'Fred';
    // buttonB.addEventListener('click', () => setFirstName('Fred'));

    // div.appendChild(buttonA);
    // div.appendChild(buttonB);
    // document.body.appendChild(div);
  }

  //sort of simulating React rendering cycle:
  function MyComponent() {
    cursor = 0;

    return <RenderFunctionComponent />;
    // return RenderFunctionComponent()
  }

  console.log(state); // Pre-render:[]
  MyComponent();
  console.log(state); // First-render:['Rudi','Yardley']
  MyComponent();
  console.log(state); // Subsequent-render:['Rudi','Yardley']

  // click the 'Fred' button

  console.log(state); // After-click:['Fred','Yardley']
  console.log(1);

  // return <RenderFunctionComponent />;
}


//unstable order:
// let firstRender = true;

// function RenderFunctionComponent() {
//   let initName;
  
//   if(firstRender){
//     [initName] = useState("Rudi");
//     firstRender = false;
//   }
//   const [firstName, setFirstName] = useState(initName);
//   const [lastName, setLastName] = useState("Yardley");

//   return (
//     <Button onClick={() => setFirstName("Fred")}>Fred</Button>
//   );
// }

//first render:
//state:
//      0          1            2  
//['Rudi','Rudi','Yardley']
//setters:
//          0                   1                          2  
//['setVoid,'setFirstName','setLastName']

//second render:
//state:
//      0          1            2
//['Rudi','Rudi','Yardley']
//setters:
//          0                   1                          2
//['setVoid,'setFirstName','setLastName']

//we are dealing with a cursor pointing to a set of arrays, 
//if you change the order of the calls within render, 
//the cursor will not match up to the data and your use calls will not point to the correct data or handlers.
