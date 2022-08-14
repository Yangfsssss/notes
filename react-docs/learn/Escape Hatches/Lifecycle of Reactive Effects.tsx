/** Lifecycle of Reactive Effects */
// Effects have a different lifecycle from components.
// Components may mount, update, or unmount. An Effect can only do two things: to start synchronizing something, and later to stop synchronizing it.
// This cycle can happen multiple times if your Effect depends on props and state that change over time.
// React provides a linter rule to check that you’ve specified your Effect’s dependencies correctly.
// This keeps your Effect synchronized to the latest props and state.

// You will learn
// ···How an Effect’s lifecycle is different from a component’s lifecycle
// ···How to think about each individual Effect in isolation
// ···When your Effect needs to re-synchronize, and why
// ···How your Effect’s dependencies are determined
// ···What it means for a value to be reactive
// ···What an empty dependency array means
// ···How React verifies your dependencies are correct with a linter
// ···What to do when you disagree with the linter

// The lifecycle of an effect---------------------------------------------------------------------------
// Why synchronization may need to happen more than once
// How React re-synchronizes your Effect
// Thinking from the Effect’s perspective
// How React verifies that your Effect can re-synchronize
// How React knows that it needs to re-synchronize the Effect
// Each Effect represents a separate synchronization process

// Effects “react” to reactive values-----------------------------------------------------------------
// What an Effect with empty dependencies means
// All variables declared in the component body are reactive
// React verifies that you specified every reactive value as a dependency
// What to do when you don’t want to re-synchronize

// Recap------------------------------------------------------------------------------------------------
// Components can mount, update, and unmount.
// Each Effect has a separate lifecycle from the surrounding component.
// Each Effect describes a separate synchronization process that can start and stop.
// When you write and read Effects, you should think from each individual Effect’s perspective (how to start and stop synchronization) rather than from the component’s perspective (how it mounts, updates, or unmounts).
// Values declared inside the component body are “reactive.”
// Reactive values should re-synchronize the Effect because they can change over time.
// The linter verifies that all reactive values used inside the Effect are specified as dependencies.
// All errors flagged by the linter are legitimate. There’s always a way to fix the code that doesn’t break the rules.

// Try out some challenges
// Ideally, most Effects in your application should eventually be replaced by custom Hooks, whether written by you or by the community.
