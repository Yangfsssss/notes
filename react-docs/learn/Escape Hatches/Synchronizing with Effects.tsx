//https://beta.reactjs.org/learn/synchronizing-with-effects

import React, { useRef, useState, useEffect } from 'react';

//Synchronizing with Effects
//Effects let you run some code after rendering so that you can synchronize your component with some system outside of React.

//You will learn
//···What Effects are
//···How Effects are different from events
//···How to declare an Effect in your component
//···How to skip re-running an Effect unnecessarily
//···Why Effects run twice in development and how to fix them

//What are Effects and how are they different from events?--------------------------------------------------------------
//two types of logic inside React components:
//1,Rendering code
//2,Event handlers

//Effects let you specify side effects that are caused by rendering itself, rather than by a particular event.
//Effects run at the end of the rendering process after the screen updates.

//You might not need an Effect------------------------------------------------------------------------------------------------
//Keep in mind that Effects are typically used to “step out” of your React code and synchronize with some external system.

//How to write an Effect in your component---------------------------------------------------------------------------------
//Step 1: Declare an Effect
// useEffect(()=>{
// Code here will run after *every* render
// })

//A example of using an Effect to synchronize with an external system.
export function VideoPlayer({ src, isPlaying }: { src: string; isPlaying: boolean }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  // if (ref.current !== null) {
  //   isPlaying ? ref.current.play() : ref.current.pause();
  // }

  // if (isPlaying) {
  //   ref.current.play();  // Calling these while rendering isn't allowed.
  // } else {
  //   ref.current.pause(); // Also, this crashes.
  // }

  //solution:wrap the side effects with useEffect to move it out of the rendering calculation:
  useEffect(() => {
    if (isPlaying) {
      ref.current!.play();
    } else {
      ref.current!.pause();
    }
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}

//By wrapping the DOM update in an Effect, you let React update the screen first. Then your Effect runs.
//Step 2: Specify the Effect dependencies
//By default, Effects run after every render.
//Sometimes, it’s slow.
//Sometimes, it’s wrong.

//You can tell React to skip unnecessarily re-running the Effect by specifying an array of dependencies as the second argument to the useEffect call.
//React compares the dependency values using the Object.is comparison.

//React guarantees you’ll always get the same object from the same useRef call on every render.

//Step 3: Add cleanup if needed
//In development React remounts every component once immediately after its initial mount.
//You can turn off Strict Mode to opt out of the development behavior, but we recommend keeping it on.
//React will call your cleanup function each time before the Effect runs again, and one final time when the component unmounts (gets removed).

//How to handle the Effect firing twice in development?---------------------------------------------------------------------------------
//The right question isn’t “how to run an Effect once,” but “how to fix my Effect so that it works after remounting”.

//The cleanup function should stop or undo whatever the Effect was doing.
//The rule of thumb is that the user shouldn’t be able to distinguish between the Effect running once (as in production) and an effect → cleanup → effect sequence (as you’d see in development).

//Most of the Effects you’ll write will fit into one of the common patterns below.
//Controlling non-React widgets:
//Example:
// useEffect(() => {
//   const dialog = dialogRef.current;
//   dialog.showModal();
//   return () => dialog.close();
// }, []);

//Some APIs may not allow you to call them twice in a row.  Implement the cleanup function to handle that.

//Subscribing to events:
//If your Effect subscribes to something, the cleanup function should unsubscribe:
//Example:
// useEffect(() => {
//   function handleScroll(e) {
//     console.log(e.clientX, e.clientY);
//   }
//   window.addEventListener('scroll', handleScroll);
//   return () => window.removeEventListener('scroll', handleScroll);
// }, []);

//Triggering animations:
//If your Effect animates something in, the cleanup function should reset the animation to the initial values:
//Example:
// useEffect(() => {
//   const node = ref.current;
//   node.style.opacity = 1; // Trigger the animation
//   return () => {
//     node.style.opacity = 0; // Reset to the initial value
//   };
// }, []);

//Fetching data:
//If your Effect fetches something, the cleanup function should either abort the fetch or ignore its result:
//Example:
// useEffect(() => {
//   let ignore = false;

//   async function startFetching() {
//     const json = await fetchTodos(userId);
//     if (!ignore) {
//       setTodos(json);
//     }
//   }

//   startFetching();

//   return () => {
//     ignore = true;
//   };
// }, [userId]);
//Avoid Race Conditions

//Deep Dive:What are good alternatives to data fetching in Effects?
//todo:

//Sending analytics:
//Example:
// useEffect(() => {
//   logVisit(url); // Sends a POST request
// }, [url]);
//For even more precise analytics, intersection observers can help track which components are in the viewport and how long they remain visible.

//Not an Effect: Initializing the application:
//Some logic should only run once when the application starts. You can put it outside your components:
//Example:
// if (typeof window !== 'undefined') { // Check if we're running in the browser.
//   checkAuthToken();
//   loadDataFromLocalStorage();
// }

// function App() {
//   // ...
// }
//This guarantees that such logic only runs once after the browser loads the page.

//Not an Effect: Buying a product:
//Sometimes, even if you write a cleanup function, there’s no way to prevent user-visible consequences of running the Effect twice.
//Wrong Example:
// useEffect(() => {
//   // 🔴 Wrong: This Effect fires twice in development, exposing a problem in the code.
//   fetch('/api/buy', { method: 'POST' });
// }, []);

//Correct Example:
// function handleClick() {
//   // ✅ Buying is an event because it is caused by a particular interaction.
//   fetch('/api/buy', { method: 'POST' });
// }

//If remounting breaks the logic of your application, this usually uncovers existing bugs.
//From the user’s perspective, visiting a page shouldn’t be different from visiting it, clicking a link, and then pressing Back.
//React verifies that your components don’t break this principle by remounting them once in development.

//Putting it all together--------------------------------------------------------------------------------------------------------
//Effects from each render are isolated from each other.

//Deep Dive:Each render has its own Effects
//You can think of useEffect as “attaching” a piece of behavior to the render output.

//Recap:
//·Unlike events, Effects are caused by rendering itself rather than a particular interaction.
//·Effects let you synchronize a component with some external system (third-party API, network, etc).
//·By default, Effects run after every render (including the initial one).
//·React will skip the Effect if all of its dependencies have the same values as during the last render.
//·You can’t “choose” your dependencies. They are determined by the code inside the Effect.
//·An empty dependency array ([]) corresponds to the component “mounting”, i.e. being added to the screen.
//·When Strict Mode is on, React mounts components twice (in development only!) to stress-test your Effects.
//·If your Effect breaks because of remounting, you need to implement a cleanup function.
//·React will call your cleanup function before the Effect runs next time, and during the unmount.

//如果存在fetch的竞态条件，需要在组件卸载时，关闭所有的setValue通道。
