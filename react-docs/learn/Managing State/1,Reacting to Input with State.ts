/** Reacting to Input with State */
//React uses a declarative way to manipulate the UI. Instead of manipulating individual pieces of the UI directly, 
//you describe the different states that your component can be in, and switch between them in response to the user input. 

//How declarative UI compares to imperative------------------------------------------------------------------
//When you design UI interactions, think about how the UI changes in response to user actions. 

//Manipulating the UI imperatively to adding a new UI element or a new interaction would require 
//carefully checking all existing code to make sure you haven’t introduced a bug (for example, forgetting to show or hide something).
//React was built to solve this problem.

//Thinking about UI declaratively--------------------------------------------------------------------------------
//How to implement the UI in React:
//1:Identify your component’s different visual states
//2:Determine what triggers those state changes
//3:Represent the state in memory using useState
//4:Remove any non-essential state variables
//5:Connect the event handlers to set the state

//##Step 1: Identify your component’s different visual states
//Visualize all the different “states” of the UI the user might see and create “mocks” for them before you add logic.
//Mocking lets you quickly iterate on the UI before you wire up any logic.
//Displaying many visual states at once.

//##Step 2: Determine what triggers those state changes
//You can trigger state updates in response to two kinds of inputs:
//···Human inputs, like clicking a button, typing in a field, navigating a link.
//···Computer inputs, like a network response arriving, a timeout completing, an image loading.

//To help visualize this flow, try drawing each state on paper as a labeled circle, 
//and each change between two states as an arrow. 
//You can sketch out many flows this way and sort out bugs long before implementation.

//##Step 3: Represent the state in memory with useState
//Each piece of state is a “moving piece”, and you want as few “moving pieces” as possible.
//Your first idea likely won’t be the best, but that’s ok—refactoring state is a part of the process!

//##Step 4: Remove any non-essential state variables
//Spending a little time on refactoring your state structure will make your components easier to understand, 
//reduce duplication, and avoid unintended meanings. 
//Your goal is to prevent the cases where the state in memory doesn’t represent any valid UI that you’d want a user to see. 

//Questions you can ask about your state variables:
//1:Does this state cause a paradox? A paradox usually means that the state is not constrained enough.
//2:Is the same information available in another state variable already? 
//3:Can you get the same information from the inverse of another state variable?

//##Step 5: Connect the event handlers to set state
//Lastly, create event handlers to set the state variables.

//Recap---------------------------------------------------------------------------------------------------------------
//Declarative programming means describing the UI for each visual state rather than micromanaging the UI (imperative).
//Follow the 5 steps when developing a component.

//Try out some challenges