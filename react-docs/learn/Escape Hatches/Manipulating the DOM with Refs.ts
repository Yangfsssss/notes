/** Manipulating the DOM with Refs */
//Because React handles updating the DOM to match your render output,
//your components won’t often need to manipulate the DOM.
//However, sometimes you might need access to the DOM elements managed by React—for example,
//to focus a node, scroll to it, or measure its size and position.
//There is no built-in way to do those things in React, so you will need a ref to the DOM node.

//You will learn
//···How to access a DOM node managed by React with the ref attribute
//···How the ref JSX attribute relates to the useRef Hook
//···How to access another component’s DOM node
//···In which cases it’s safe to modify the DOM managed by React

//Getting a ref to the node-----------------------------------------------------------------------------------------
import { useRef } from 'react';
const myRef = useRef(null);
// <div ref={myRef} />

//When React creates a DOM node for this <div>, React will put a reference to this node into myRef.current.
//You can then access this DOM node from your event handlers and use the built-in browser APIs defined on it.
// You can use any browser APIs, for example:
//myRef.current.scrollIntoView();

//Example: Focusing a text input--------------------------------------------------------------------------------
//Example: Scrolling to an element-----------------------------------------------------------------------------
//DOM manipulation is the most common use case for refs.

//Deep Dive:How to manage a list of refs using a ref callback----------------------------------------------
//Sometimes you might need a ref to each item in the list, and you don’t know how many you will have.

//A solution is to pass a function to the ref attribute. This is called a “ref callback”.
//React will call your ref callback with the DOM node when it’s time to set the ref, and with null when it’s time to clear it.
//This lets you maintain your own array or a Map, and access any ref by its index or some kind of ID.

type Ref<T> = RefCallback<T> | RefObject<T> | null;
type RefCallback<T> = { bivarianceHack(instance: T | null): void }['bivarianceHack'];
interface RefObject<T> {
  readonly current: T | null;
}

//Accessing another component’s DOM nodes-----------------------------------------------------------------
//It is a common pattern for low-level components like buttons, inputs,
//and so on, to forward their refs to their DOM nodes.
import { forwardRef } from 'react';
//forwardRef()方法可以标记自定义组件，将其接收到的ref参数视为透传给其原生子组件
//（或下层自定义组件，直至原生子组件）的ref实例，
//而非在其自身使用的ref。

//Deep Dive:Exposing a subset of the API with an imperative handle--------------------------------------
import { useImperativeHandle } from 'react';
//In uncommon cases, you may want to restrict the exposed functionality.
//You can do that with useImperativeHandle:
//useImperativeHandle()方法可以拦截使用forward()方法标记的自定义组件接收到的ref，并自定义其中的值。

//When React attaches the refs-----------------------------------------------------------------------------------
//In React, every update is split in two phases:
//During render, React calls your components to figure out what should be on the screen.
//During commit, React applies changes to the DOM.

//During the first render, the DOM nodes have not yet been created, so ref.current will be null.
//And during the rendering of updates, the DOM nodes haven’t been updated yet. So it’s too early to read them.

//React sets ref.current during the commit.
//Before updating the DOM, React sets the affected ref.current values to null.
//After updating the DOM, React immediately sets them to the corresponding DOM nodes.

//Deep Dive:Flushing state updates synchronously with flushSync----------------------------------------
//You can force React to update (“flush”) the DOM synchronously.
//To do this, import flushSync from react-dom and wrap the state update into a flushSync call:
import { flushSync } from 'react-dom';
function flushSync<R>(fn: () => R): R;

//Best practices for DOM manipulation with refs--------------------------------------------------------------
//Refs are an escape hatch. You should only use them when you have to “step outside React.” 
//Common examples of this include managing focus, scroll position, or calling browser APIs that React does not expose.

//Avoid changing DOM nodes managed by React. 
//Modifying, adding children to, or removing children from elements that are managed by React can lead to inconsistent visual results or crashes like above.

//You can safely modify parts of the DOM that React has no reason to update. 

//Recap--------------------------------------------------------------------------------------------------------------
//Refs are a generic concept, but most often you’ll use them to hold DOM elements.
//You instruct React to put a DOM node into myRef.current by passing <div ref={myRef}>.
//Usually, you will use refs for non-destructive actions like focusing, scrolling, or measuring DOM elements.
//A component doesn’t expose its DOM nodes by default. You can opt into exposing a DOM node by using forwardRef and passing the second ref argument down to a specific node.
//Avoid changing DOM nodes managed by React.
//If you do modify DOM nodes managed by React, modify parts that React has no reason to update.

//Try out some challenges-----------------------------------------------------------------------------------------
