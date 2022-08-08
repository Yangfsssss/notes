//https://overreacted.io/zh-hans/before-you-memo/
import React, { useMemo, useState } from 'react';

//Original bad component:
export default function App() {
  let [color, setColor] = useState('red');
  return (
    <div>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
      <ExpensiveTree />
    </div>
  );
}

function ExpensiveTree() {
  let now = performance.now();
  while (performance.now() - now < 100) {
    // Artificial delay -- do nothing for 100ms
  }
  return <p>I am a very slow component tree.</p>;
}

//1,useMemo()
// export default function App() {
//   const [color, setColor] = useState('red');

//   const  expensiveTree = useMemo(() =>{
//     console.log('I\'m executed');

//     let now = performance.now();

//     while (performance.now() - now < 100) {}

//     return <p>I'm a very slow component tree.</p>;
//   },[]);

//   return (
//     <div>
//       <input value={color} onChange={(e) => setColor(e.target.value)} />
//       <p style={{ color }}>Hello World!</p>
//       {expensiveTree}
//     </div>
//   );
// }

//2,React.memo()
// export default function App() {
//   const [color, setColor] = useState('red');

//   return (
//     <div>
//       <input value={color} onChange={(e) => setColor(e.target.value)} />
//       <p style={{ color }}>Hello World!</p>
//       <ExpensiveTree />
//     </div>
//   );
// }

// const  ExpensiveTree = React.memo(()=>{
//   console.log('I\'m executed');

//   let now = performance.now();

//   while (performance.now() - now < 100) {}

//   return <p>I'm a very slow component tree.</p>;
// });

//3,向下移动state
// export default function App() {
//   return (
//     <div>
//       <ColorControllerOfHelloWorld />
//       <ExpensiveTree />
//     </div>
//   );
// }

// function ColorControllerOfHelloWorld() {
//   const [color, setColor] = useState('red');

//   return (
//     <>
//       <input value={color} onChange={(e) => setColor(e.target.value)} />
//       <p style={{ color }}>Hello World!</p>
//     </>
//   );
// }

// function ExpensiveTree() {
//   console.log("I'm executed");

//   let now = performance.now();

//   while (performance.now() - now < 100) {}

//   return <p>I'm a very slow component tree.</p>;
// }

//4,内容提升
// export default function App() {
//   return (
//     <ColorPicker>
//       <p>Hello World!</p>
//       <ExpensiveTree />
//     </ColorPicker>
//   );
// }

// function ColorPicker({ children }: { children: React.ReactNode }) {
//   const [color, setColor] = useState('red');
//   return (
//     <div style={{ color }}>
//       <input value={color} onChange={(e) => setColor(e.target.value)} />
//       {children}
//     </div>
//   );
// }

// function ExpensiveTree() {
//   console.log("I'm executed");

//   let now = performance.now();
//   while (performance.now() - now < 100) {}

//   return <p>I'm a very slow component tree.{Date.now()}</p>;
// }
