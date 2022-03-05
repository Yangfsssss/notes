// These give you a live reference to the exported thing(s):
// import thingRenamed, { a as defaultThing } from './module.js'; //导入了名字
// import { thing, default as defaultThing } from './module.js'; //导入了名字
// import anotherDefaultThing from './module.js'; //导入了默认名字
// import { thing as importedThing } from './module.js'; //导入了名字，并重命名
//named static imports (import { thing } …) kinda look like destructuring, but they don't behave like destructuring.
import * as moduleX from './module.js'; //导入源文件的Module对象，并重命名
// const moduleY = await import('./module.js'); //同上，动态导入了源文件的Module对象，并绑定至新变量名

// This assigns the current value of the export to a new identifier:
// const { thing: destructuredThing } = await import('./module.js'); //导入了源文件的Module对象，并将其属性“thing”的值（值类型）绑定至新变量名
// const { anotherThing: destructuredAnotherThing } = await import('./module.js'); //导入了源文件的Module对象，并将其属性“anotherThing”的值（引用类型）绑定至新变量名
// let { thing: thing } = await import('./module.js'); //同上，如果新变量名与原属性名相同时，可简写

setTimeout(() => {
  // console.log('importedThing: ', importedThing); //"changed"
  // console.log('module: ', moduleY); //awaited Promise<object>
  console.log('moduleX: ', moduleX); //awaited Promise<object>
  // console.log('module.thing: ', module.thing); // "changed"
  // console.log('destructuredThing: ', destructuredThing); //"initial"
  // console.log('destructuredAnotherThing: ', destructuredAnotherThing.a); //"5"
  // console.log('thingRenamed: ', thingRenamed); //"changed"
  // console.log('thing: ', thing); //"changed"
  // console.log('defaultThing: ', defaultThing); //"changed"
  // console.log('equals: ', defaultThing === thingRenamed); //"changed"
  // console.log('defaultThing: ', defaultThing); //"initial"
  // console.log('anotherDefaultThing: ', anotherDefaultThing); //"initial"
}, 1000);
