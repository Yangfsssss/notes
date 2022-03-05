/** Passing Data Deeply with Context */
//Usually, you will pass information from a parent component to a child component via props. 
//But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, 
//or if many components in your app need the same information. 
//Context lets the parent component make some information available to any component in the tree below it—
//no matter how deep—without passing it explicitly through props.

//You will learn
//···What “prop drilling” is
//···How to replace repetitive prop passing with context
//···Common use cases for context
//···Common alternatives to context

//The problem with passing props--------------------------------------------------------------------------------------------
//"lifting state up"---->"props drilling"

//Context: an alternative to passing props----------------------------------------------------------------------------------
//##Step 1: Create the context
import { createContext } from 'react';
//##Step 2: Use the context
import { useContext } from 'react';
//##Step 3: Provide the context
//The component will use the value of the nearest <Context.Provider> in the UI tree above it.

//Using and providing context from the same component----------------------------------------------------------------
//可以在同一组件中获取上层Context，处理递进关系，然后Provide给下层。
//You can use it to pass down any information needed by the entire subtree.

//Context passes through intermediate components-----------------------------------------------------------------------
//Like  CSS property inheritance,in React, the only way to override some context coming from above is 
//to wrap children into a context provider with a different value.
//Similarly, different React contexts don’t override each other. 
//Each context that you make with createContext() is completely separate from other ones, 
//and ties together components using and providing that particular context. 
//One component may use or provide many different contexts without a problem.

//Before you use context-------------------------------------------------------------------------------------------------------
//Consider before using context:
//1,Start by passing props.It can make the data flow explicit.
//2,Extract components and pass JSX as children to them. 
// If you pass some data through many layers of intermediate components that don’t use that data (and only pass it further down), 
//this often means that you forgot to extract some components along the way. 

//If neither of these approaches works well for you, consider context.

//Use cases for context--------------------------------------------------------------------------------------------------------
//···Theming;
//···Current account;
//···Routing;
//···Managing state;

//Context is not limited to static values. 
//If you pass a different value on the next render, React will update all the components reading it below!
//In general, if some information is needed by distant components in different parts of the tree, it’s a good indication that context will help you.

//Recap--------------------------------------------------------------------------------------------------------------------------
//Context lets a component provide some information to the entire tree below it.

//To pass context:
//Create and export it with export const MyContext = createContext(defaultValue).
//Pass it to the useContext(MyContext) Hook to read it in any child component, no matter how deep.
//Wrap children into <MyContext.Provider value={...}> to provide it from a parent.

//Context passes through any components in the middle.
//Context lets you write components that “adapt to their surroundings.”
//Before you use context, try passing props or passing JSX as children.

//Try out some challenges-----------------------------------------------------------------------------------------------------