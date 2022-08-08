//https://beta.reactjs.org/learn/you-might-not-need-an-effect

//@ts-nocheck
import React from 'react';
import { useEffect, useState } from 'react';

//You Might Not Need an Effect
//If there is no external system involved , you shouldn’t need an Effect.

//You will learn
//···Why and how to remove unnecessary Effects from your components
//···How to cache expensive computations without Effects
//···How to reset and adjust component state without Effects
//···How to share logic between event handlers
//···Which logic should be moved to event handlers
//···How to notify parent components about changes

//How to remove unnecessary Effects-------------------------------------------------------
//There are two common cases in which you don’t need Effects:
//1,You don’t need Effects to transform data for rendering.
//2,You don’t need Effects to handle user events.

//Keep in mind that modern frameworks provide more efficient built-in data fetching mechanisms than writing Effects directly in your components.

//Updating state based on props or state---------------------------------------------------
export default function Form() {
  const [firstName, setFirstName] = useState('Rudi');
  const [lastName, setLastName] = useState('Pieters');

  // const [fullName,setFullName] = useState('');

  console.log('rendered');

  const fullName = `${firstName} ${lastName}`;

  //render twice
  // useEffect(() =>{
  //   setFullName(`${firstName} ${lastName}`);
  // },[firstName,lastName]);

  return <div>{fullName}</div>;
}

//When something can be calculated from the existing props or state, don’t put it in state.

//Caching expensive calculations-------------------------------------------------------------
//useMemo();

//Deep Dive:How to tell if a calculation is expensive?
//Add a console log to measure the time spent in a piece of code:
//console.time();
//doSomethingExpensive();
//console.timeEnd();

//If the overall logged time adds up to a significant amount (say, 1ms or more), it might make sense to memoize that calculation.
//You can then wrap the calculation in useMemo to verify whether the total logged time has decreased for that interaction or not.

//useMemo won’t make the first render faster. It only helps you skip unnecessary work on updates.
//To get the most accurate timings, build your app for production and test it on a device like your users have.

//Resetting all state when a prop changes--------------------------------------------------
// export default function ProfilePage({userId}){
//   return (
//     <Profile
//       userId={userId}
//       key={userId}
//     />
//   )
// }

// function Profile({userId}){
//   // ✅ This and any other state below will reset on key change automatically
//   const [comment,setComment] = useState('');
//   // ...
// }

//Normally, React preserves the state when the same component is rendered in the same spot.
//By passing userId as a key to the Profile component, you’re asking React to treat two Profile components with different userId as two different components that should not share any state.

//Adjusting some state when a prop changes----------------------------------------------
// Better:Adjust the state while rendering
// function List({item}){
//   const [isReverse,setIsReverse] = useState(false);
//   const [selection,setSelection] = useState(null);

//   const [prevItems,setPrevItems] = useState(items);
//   if(items !== prevItems){
//     setPrevItems(items);
//     setSelection(null);
//   }

//   //...
// }

// ✅ Best: Calculate everything during rendering
// function List({item}){
//   const [isReverse,setIsReverse] = useState(false);
//   const [selectedId,setSelectedId] = useState(null);

//   const selection = items.find(item => item.id === selectedId) ?? null;
//   //...
// }

//Sharing logic between event handlers---------------------------------------------------
// function ProductPage({product,addToCart}){
//   // 🔴 Avoid: Event-specific logic inside an Effect
//   useEffect(() => {
//     if(product.isInCart){
//       showToast(`Added ${product.name} to the shopping cart!`)
//     }
//   },[product])

//   function handleBuyClick(){
//     addToCart(product);
//   }

//   function handleCheckoutClick(){
//     addToCart(product);
//     navigateTo('/checkout');
//   }
//   //...
// }

//When you’re not sure whether some code should be in an Effect or in an event handler, ask yourself why this code needs to run.
//Use Effects only for code that should run because the component was displayed to the user.
// function ProductPage({product,addToCart}){
//   // ✅ Good: Event-specific logic is called from event handlers
//   function buyProduct(){
//     addToCart(product);
//     showToast(`Added ${product.name} to the shopping cart!`);
//   }

//   function handleBuyClick(){
//     buyProduct();
//   }

//   function handleCheckoutClick(){
//     buyProduct();
//     navigateTo('/checkout');
//   }
//   //...
// }

//Sending a POST request----------------------------------------------------------------------
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Good: This logic should run because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  // 🔴 Avoid: Event-specific logic inside an Effect
  // const [jsonToSubmit,setJsonToSubmit] = useState(null);
  // useEffect(() => {
  //   if(jsonToSubmit !== null){
  //     post('/api/register',jsonToSubmit)
  //   }
  // },[jsonToSubmit])

  function handleSubmit(e) {
    e.preventDefault();
    // setJsonToSubmit({firstName,lastName});
    // ✅ Good: Event-specific logic is in the event handler
    post('/api/register', { firstName, lastName });
  }
  //...
}

//the main question you need to answer is what kind of logic it is from the user’s perspective.

//Initializing the application----------------------------------------------------------------
function App() {
  // 🔴 Avoid: Effects with logic that should only ever run once
  useEffect(() => {
    loadDataFormLocalStorage();
    checkAuthToken();
  }, []);
  //...
}

//If some logic must run once per app load rather than once per component mount,
//you can add a top-level variable to track whether it has already executed, and always skip re-running it:
let didInit = false;

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ Only runs once per app load
      loadDataFormLocalStorage();
      checkAuthToken();
    }
  }, []);
}

//You can also run it during module initialization and before the app renders:
if (typeof window !== 'undefined') {
  // check if we're running in the browser
  // ✅ Only runs once per app load
  checkAuthToken();
  loadDataFormLocalStorage();
}

function App() {
  //...
}

//Code at the top level runs once when your component is imported—even if it doesn’t end up being rendered.
//To avoid slowdown or surprising behavior when importing arbitrary components, don’t overuse this pattern.
//Keep app-wide initialization logic to root component modules like App.js or in your application’s entry point module.

//Notifying parent components about state changes--------------------------------------------
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  // 🔴 Avoid: The onChange handler runs too late
  useEffect(() => {
    onChange(isOn);
  }, [isOn, onChange]);

  function handleClick() {
    setIsOn(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }
  //...
}

//Delete the Effect and instead update the state of both components within the same event handler:
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  function updateToggle(nextIsOn){
    // ✅ Good: Perform all updates during the event that caused them
    setIsOn(nextIsOn);
    onChange(nextIsOn);
  }

  function handleClick() {
    updateToggle(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      updateToggle(true);
    } else {
      updateToggle(false);
    }
  }

  // ...
}

//React batches updates from different components together, so there will only be one render pass as a result.
//also:
function Toggle({isOn, onChange}) {
  function handleClick() {
    onChange(!isOn);
  }

  function handleDragEnd(e){
    if(isCloserToRightEdge(e)){
      onChange(true);
    }else{
      onChange(false);
    }
  }

  // ...
}

//This means the parent component will have to contain more logic, but there will be less state overall to worry about. 
//Whenever you try to keep two different state variables synchronized, it’s a sign to try lifting state up instead!

//Passing data to the parent--------------------------------------------------------------------------
function Parent(){
  const [data,setData] = useState(null);
  //...
  return <Child onFetched={setData}/>
}

function Child({onFetched}){
  const data = useSomeApi();

  // 🔴 Avoid: Passing data to the parent in an Effect
  useEffect(() => {
    if(data){
      onFetched(data);
    }
  },[onFetched,data])
  // ...
}

//In React, data flows from the parent components to their children.
function Parent(){
  const data = useSomeApi();
  // ...

  // ✅ Good: Passing data down to the child
  return <Child data={data}/>
}

function Child({data}){
  // ...
}

//Subscribing to an external store---------------------------------------------------------
//If your components need to subscribe to some data outside of the React state.
//you need to manually subscribe your components to it. This is often done with an Effect.
function useOnlineStatus(){
  const [isOnline,setIsOnline] = useState(true);

  // Not ideal: Manual store subscription in an Effect
  useEffect(() => {
    function updateState(){
      setIsOnline(navigator.onLine);
    }

    updateState();

    window.addEventListener('online', () => updateState);
    window.addEventListener('offline', () => updateState);
    return () => {
      window.removeEventListener('online', () => updateState);
      window.removeEventListener('offline', () => updateState);
    }
  },[])

  return isOnline;
}

function ChatIndicator(){
  const isOnline = useOnlineStatus();
  // ...
}

//useSyncExternalStore:
function subscribe(callback){
  window.addEventListener('online', () => callback);
  window.addEventListener('offline', () => callback);
  return () => {
    window.removeEventListener('online', () => callback);
    window.removeEventListener('offline', () => callback);
  }
}

function useOnlineStatus(){
  // ✅ Good: Subscribing to an external store with a built-in Hook
  return useSyncExternalStore(
    subscribe, // React won't resubscribe for as long as you pass the same function
    () => navigator.onLine, // How to get the value on the client
    () => true // How to get the value on the server
  )
}

function ChatIndicator(){
  const isOnline = useOnlineStatus();
  // ...
}

//Fetching data--------------------------------------------------------------------------------
//“race condition”: two different requests “raced” against each other and came in a different order than you expected.

//Think about:
//how to cache the responses;
//how to fetch them on the server;
//how to avoid network waterfalls;

//Use modern frameworks or extracting your fetching logic into a custom Hook.

//When you have to resort to writing Effects,keep an eye out for extracting a piece of functionality into a custom Hook.
//The fewer raw useEffect calls you have in your components, the easier you will find to maintain your application.

//Recap
//If you can calculate something during render, you don’t need an Effect.
//To cache expensive calculations, add useMemo instead of useEffect.
//To reset the state of an entire component tree, pass a different key to it.
//To reset a particular bit of state in response to a prop change, set it during rendering.
//Code that needs to run because a component was displayed should be in Effects, the rest should be in events.
//If you need to update the state of several components, it’s better to do it during a single event.
//Whenever you try to synchronize state variables in different components, consider lifting state up.
//You can fetch data with Effects, but you need to implement cleanup to avoid race conditions.
