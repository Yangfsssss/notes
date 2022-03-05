/** Scaling Up with Reducer and Context */
//Reducers let you consolidate a component’s state update logic. 
//Context lets you pass information deep down to other components. 
//You can combine reducers and context together to manage state of a complex screen.

//You will learn
//···How to combine a reducer with context
//···How to avoid passing state and dispatch through props
//···How to keep context and state logic in a separate file

//Combining a reducer with context------------------------------------------------------------------------
//##Step 1: Create the context
//##Step 2: Put state and dispatch into context
//##Step 3: Use context anywhere in the tree

//Moving all wiring into a single file-----------------------------------------------------------------------
//This keeps the components clean and uncluttered, 
//focused on what they display rather than where they get the data.
//Provider---->deal;
//use---->read;
//dispatch---->update;

//As your app grows, you may have many context-reducer pairs like this. 
//This is a powerful way to scale your app and lift state up without too much work whenever you want to access the data deep in the tree.

//Recap---------------------------------------------------------------------------------------------------------
//You can combine reducer with context to let any component read and update state above it.

//To provide state and the dispatch function to components below:
//···Create two contexts (for state and for dispatch functions).
//···Provide both contexts from the component that uses the reducer.
//···Use either context from components that need to read them.

//You can further declutter the components by moving all wiring into one file.
//···You can export a component like TasksProvider that provides context.
//···You can also export custom Hooks like useTasks and useTasksDispatch to read it.

//You can have many context-reducer pairs like this in your app.