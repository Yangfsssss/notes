/** Principle 4:Keep the Local State Isolated */
//If you’re not sure whether some state is local, ask yourself: 
//“If this component was rendered twice, should this interaction reflect in the other copy?” 
//Whenever the answer is “no”, you found some local state.

//Conclusion:---------------------------------------------------------------------------------------------------------
//Avoid making truly local state global. 

//Recap:---------------------------------------------------------------------------------------------------------------
//1,Don't stop the data flow.
//Props and state can change,and components should handle these changes whenever they happen.

//2,Always be ready to render.
// A component shouldn't break because it's rendered more or less often.

//3,No component is a singleton.
//Even if a component is rendered once,your design will improve if rendering twice doesn't break it.

//4,Keep the local state isolated.
//Think about which state is local to a particular UI presentation -- and don't hoist that state higher than necessary.

//These principles help you write components that are optimized for change. 
//It’s easy to add, change them, and delete them.