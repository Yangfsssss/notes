/** Preserving and Resetting State */
//State is isolated between components. 
//React keeps track of which state belongs to which component based on their place in the UI tree. 
//You can control when to preserve state and when to reset it between re-renders.

//You will learn
//···How React “sees” component structures.
//···When React chooses to preserve or reset the state.
//···How to force React to reset component’s state.
//···How keys and types affect whether the state is preserved.

//The UI tree------------------------------------------------------------------------------------------------------
//Browsers use many tree structures to model UI. DOM/CSSOM
//React also uses tree structures to manage and model the UI you make.
//Then React DOM updates the browser DOM elements to match that UI tree.
//Components----(React)---->UI Tree----(ReactDOM)---->DOM Tree

//State is tied to a position in the tree--------------------------------------------------------------------------
//React associates each piece of state it’s holding with the correct component by where that component sits in the UI tree.
//React preserves a component’s state for as long as it’s being rendered at its position in the UI tree. 
//If it gets removed, or a different component gets rendered at the same position, React discards its state.

//Same component at the same position preserves state----------------------------------------------------
//Remember that it’s the position in the UI tree—not in the JSX markup—that matters to React! 
//All it “sees” is the tree you return.

//Different components at the same position reset state----------------------------------------------------
//If you want to preserve the state between re-renders, the structure of your tree needs to “match up” from one render to another.
//If the structure is different, the state gets destroyed because React destroys state when it removes a component from the tree.

//Do not nest component function definitions.
//内嵌函数在每次父组件更新时都会被重新声明，即引用变量绑定的函数值会更新。
//React通过比较该函数值是否变化来确定UI Tree的结构是否发生变化。
//即内嵌函数每次都会使UI Tree的结构发生变化。

//Resetting state at the same position-------------------------------------------------------------------------
//Option 1: Rendering a component in different positions.
//Option 2: Resetting state with a key.
//Remember that keys are not globally unique. They only specify the position within the parent.

//Resetting a form with a key----------------------------------------------------------------------------------
//Resetting state with a key is particularly useful when dealing with forms.

//Deep Dive:Preserving state for removed components---------------------------------------------------
//Option 1:Render all chats instead of just the current one, but hide all the others with CSS. 
//Option 2:Lift the state up and hold the pending message for each recipient in the parent component.
//Option 3:Use a different source in addition to React state such as localStorage.

//Recap----------------------------------------------------------------------------------------------------------
//···React keeps state for as long as the same component is rendered at the same position.
//···State is not kept in JSX tags. It’s associated with the tree position in which you put that JSX.
//···You can force a subtree to reset its state by giving it a different key.
//···Don’t nest component definitions, or you’ll reset state by accident.

//Try out some challenges-------------------------------------------------------------------------------------
//State is associated with the tree position. A key lets you specify a named position instead of relying on order.