/** Extracting State Logic into a Reducer */
//Components with many state updates spread across many event handlers can get overwhelming. 
//For these cases, you can consolidate all the state update logic outside your component in a single function, called a “reducer.”

//You will learn
//···What a reducer function is
//···How to refactor useState to useReducer
//···When to use a reducer
//···How to write one well

//Consolidate state logic with a reducer-------------------------------------------------------------------------------------------------------
//To reduce this complexity and keep all your logic in one easy-to-access place, 
//you can move that state logic into a single function outside your component, called a “reducer.”

//Reducers are a different way to handle state. You can migrate from useState to useReducer in three steps:
//1,Move from setting state to dispatching actions.
//2,Write a reducer function.
//3,Use the reducer from your component.

//##Step 1: Move from setting state to dispatching actions
// Instead of telling React “what to do” by setting state, 
//you specify “what the user just did” by dispatching “actions” from your event handlers.

//##Step 2: Write a reducer function
function yourReducer(state: any, action: any){
  //return next state for React to set.
}

//Deep Dive:Why are reducers called this way?
//Array.prototype.reduce()
//Reducer take the state so far and the action, and return the next state. In this way, 
//they accumulate actions over time into state.

//##Step 3: Use the reducer from your component
const [state,dispatch] = useReducer(reducer,initialState)

//Comparing useState and useReducer--------------------------------------------------------------------------------------------------
//···Code Size;
//···Readability;
//···Debugging;
//···Testing;
//···Personal preference;

//Use a reducer if you often encounter bugs due to incorrect state updates in some component, 
//and want to introduce more structure to its code.
//Feel free to mix and match! 

//Writing reducers well--------------------------------------------------------------------------------------------------------------------
//···Reducers must be pure.
//Similar to state updater functions, reducers run during rendering! (Actions are queued until the next render.) 

//···Each action describes a single user interaction, even if that leads to multiple changes in the data. 

//Writing concise reducers with Immer--------------------------------------------------------------------------------------------------
//Immer provides a copy of  the state which is safe to mutate. 

//Recap---------------------------------------------------------------------------------------------------------------------------------------
//To convert from useState to useReducer requires 3 steps.
//Reducers require you to write a bit more code, but they help with debugging and testing.
//Reducers must be pure.
//Each action describes a single user interaction.
//Use Immer if you want to write reducers in a mutating style.

//Try out some challenges------------------------------------------------------------------------------------------------------------------
//Action types should ideally describe “what the user did” rather than “how you want the state to change”.
//The reducer should be a pure function—it should only calculate the next state.