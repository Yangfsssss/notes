/** Choosing the State Structure */
//Structuring state well can make a difference between a component that is pleasant to modify and debug, 
//and one that is a constant source of bugs. Here are some tips you should consider when structuring state.

//You will learn
//···When to use a single vs multiple state variables
//···What to avoid when organizing state
//···How to fix common issues with the state structure

//Principles for structuring state--------------------------------------------------------------------------------------------
//About  how many state variables to use and what the shape of their data should be:

//##1,Group related state. 
//If you always update two or more state variables at the same time, 
//consider merging them into a single state variable.

//##2,Avoid contradictions in state. 
//When the state is structured in a way that several pieces of state may contradict and “disagree” with each other, 
//you leave room for mistakes. Try to avoid this.

//##3,Avoid redundant state. 
//If you can calculate some information from the component’s props or its existing state variables during rendering, 
//you should not put that information into that component’s state.

//##4,Avoid duplication in state. 
//When the same data is duplicated between multiple state variables, or within nested objects, 
//it is difficult to keep them in sync. Reduce duplication when you can.

//##5,Avoid deeply nested state. 
//Deeply hierarchical state is not very convenient to update. When possible, prefer to structure state in a flat way.

//The goal behind these principles is to make state easy to update without introducing mistakes. 
//“Make your state as simple as it can be—but no simpler.”

//Group related state----------------------------------------------------------------------------------------------------------
//If some two state variables always change together, it might be a good idea to unify them into a single state variable. 
//Then you won’t forget to always keep them in sync.
//example: 
const [position,setPosition] = useState({x:0, y:0})

//Another case is when you don’t know how many different pieces of state you’ll need. 
//example:
//FormInstance<Record<string,unknown>>

//Pitfall:Update the whole field.
setPosition({x:100}) //×
setPosition({...position,x:100}) //√

//Avoid contradictions in state-----------------------------------------------------------------------------------------------
//example:
const [isSending,setIsSending] = useState(false)
const [isSent,setIsSent] = useState(false)
//into
const [status,setStatue]=  useState<'typing'|'sending'|'sent'>('typing')

//Avoid redundant state------------------------------------------------------------------------------------------------------
//example:
const [firstName,setFirstName] = useState()
const [lastName,setLastName] = useState()
const [fullName,setFullName] = useState() //remove

//Don't mirror props in state unless you want to ignore all updates for a specific prop.

//Avoid duplication in state-------------------------------------------------------------------------------------------------
//example:
const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];
const [items,setItems] = useState(initialItems)
const [selectedItem,setSelectedItem] = useState(items[0])
//into
const [selectedId,setSelectedId] = useState(0)

//Keep the essential state!

//Avoid deeply nested state-------------------------------------------------------------------------------------------------
//Updating nested state involves making copies of objects all the way up from the part that changed. 
//Deleting a deeply nested place would involve copying its entire parent place chain. Such code can be very verbose.
//Make state flat.

//use Immer

//You can also reduce state nesting by moving some of the nested state into the child components. 
//This works well for ephemeral UI state that doesn’t need to be stored, like whether an item is hovered.

//Recap------------------------------------------------------------------------------------------------------------------------
//1:
//If two state variables always update together, consider merging them into one.

//2:
//Choose your state variables carefully to avoid creating “impossible” states.
//Structure your state in a way that reduces the chances that you’ll make a mistake updating it.

//3,4:
//Avoid redundant and duplicate state so that you don’t need to keep it in sync.
//Don’t put props into state unless you specifically want to prevent updates.
//For UI patterns like selection, keep ID or index in state instead of the object itself.

//5:
//If updating deeply nested state is complicated, try flattening it.

//Try out some challenges--------------------------------------------------------------------------------------------------
//Keep in mind that you should not mutate objects in state, and that includes Sets, too. 
//This is why the handleToggle function creates a copy of the Set first, and then updates that copy.