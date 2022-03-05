/** Referencing Values with Refs */
//When you want a component to “remember” some information, but you 
//don’t want that information to trigger new renders, you can use a ref—
//it’s like a secret “pocket” for storing information in your component!

//You will learn
//···How to add a ref to your component
//···How to update a ref’s value
//···How refs are different from state
//···How to use refs safely

//Adding a ref to your component-----------------------------------------------------------
import {useRef} from 'react';
const ref = useRef(0);
// {
//   current:0
// }

//Ref is a plain JavaScript object with the current property that you can read and modify.
//Like state, refs are retained by React between re-renders but setting a ref doesn't re-render a component.

//Example: building a stopwatch------------------------------------------------------------
//When a piece of information is used for rendering, keep it in state. 
//When a piece of information is only needed by event handlers and changing it doesn’t require a re-render, 
//using a ref may be more efficient.

//Differences between refs and state---------------------------------------------------------

//Deep Dive:How does useRef work inside?------------------------------------------------
function useRef(initialValue){
  const [ref,unused] = useState({current:initialValue});

  return ref;
}

//When to use refs-----------------------------------------------------------------------------
//Typically, you will use a ref when your component needs to “step outside” React 
//and communicate with external APIs—often a browser API that won’t impact the appearance of the component.
//···Storing timeout IDs;
//···Storing and manipulating DOM elements, which we cover on the next page;
//···Storing other objects that aren’t necessary to calculate the JSX.

//If your component needs to store some value, but it doesn’t impact the rendering logic, choose refs.

//Best practices for refs-----------------------------------------------------------------------
//···Treat refs as an escape hatch. 
//···Don’t read or write ref.current during rendering.

//State acts like a snapshot for every render and doesn’t update synchronously. 
//But when you mutate the current value of a ref, it changes immediately:

//This is because the ref itself is a regular JavaScript object, and so it behaves like one.

//As long as the object you’re mutating isn’t used for rendering, 
//React doesn’t care what you do with the ref or its contents.

//Refs and the DOM---------------------------------------------------------------------------
//The most common use case for a ref is to access a DOM element. 
//For example, this is handy if you want to focus an input programmatically. 
//When you pass a ref to a ref attribute in JSX, like <div ref={myRef}>, 
//React will put the corresponding DOM element into myRef.current. 

//Recap------------------------------------------------------------------------------------------
//Refs are an escape hatch to hold onto values that aren’t used for rendering. You won’t need them often.
//A ref is a plain JavaScript object with a single property called current, which you can read or set.
//You can ask React to give you a ref by calling the useRef Hook.
//Like state, refs let you retain information between re-renders of a component.
//Unlike state, setting the ref’s current value does not trigger a re-render.
//Don’t read or write ref.current during rendering. This makes your component hard to predict.

//Try out some challenges--------------------------------------------------------------------
//The current value of a ref is used to calculate the rendering output. 
//This is a sign that this information should not be in a ref.



