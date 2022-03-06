/** Item42: 选择类型安全的方法而不是猴子补丁，Prefer Type-Safe Approaches to Monkey Patching */

export {};
declare global {
  interface Document {
    monkey: string;
  }
}
document.monkey = 'Tamarin';

interface MonkeyDocument extends Document {
  monkey: string;
}
(document as MonkeyDocument).monkey = 'Tamarin';

//Things to Remember
//• Prefer structured code to storing data in globals or on the DOM.
//• If you must store data on built-in types, use one of the type-safe approaches (aug‐
//mentation or asserting a custom interface).
//• Understand the scoping issues of augmentations.
