/** Item25: 使用async函数代替异步代码的回调， Use async Functions Instead of Callbacks for Asynchronous Code*/
//There are a few good reasons to prefer Promises or async/await to callbacks:
//• Promises are easier to compose than callbacks.
//• Types are able to flow through Promises more easily than callbacks.

//When you work with Promises, all of TypeScript’s type inference machinery works to get you the right types.

// Generally prefer async/await to raw Promises for two reasons if you have a choice:
//• It typically produces more concise and straightforward code.
//• It enforces that async functions always return Promises.

//A function should either always be run synchronously or always be run asynchronously.
//It should never mix the two.

//Things to Remember
//• Prefer Promises to callbacks for better composability and type flow.
//• Prefer async and await to raw Promises when possible. They produce more concise, straightforward code and eliminate whole classes of errors.
//• If a function returns a Promise, declare it async.
