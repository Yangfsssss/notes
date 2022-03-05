/** Sharing State Between Components */

//You will learn
//···How to share state between components by lifting it up.
//···What are controlled and uncontrolled components.

//Lifting state up------------------------------------------------------------------------------------------------
////##Step1: Remove state from the child components.
////##Step2: Pass hardcoded data from the common parent.
////##Step3: Add state to the common parent.

//Controlled and Uncontrolled Components----------------------------------------------------------------
//Controlled Components:driven by props.
//Uncontrolled Components:driven by its own local state.

// “controlled” and “uncontrolled” aren’t strict technical terms—
//each component usually has some mix of both local state and props. 

//When writing a component, consider which information in it should be controlled (via props), 
//and which information should be uncontrolled (via state).

//A single source of truth for each state----------------------------------------------------------------------
//For each piece of state, there is a specific component that holds that piece of information.
//Instead of duplicating shared state between components, you will lift it up to their common shared parent, 
//and pass it down to the children that need it.

//Try out some challenges--------------------------------------------------------------------------------------------------
//It’s useful to consider components as “controlled” (driven by props) or “uncontrolled” (driven by state).