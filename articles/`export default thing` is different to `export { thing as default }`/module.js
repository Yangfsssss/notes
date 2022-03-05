// let thing = 'initial';
let anotherThing = { a: 3 };

// These export a live reference:
// export { thing };
// export { thing as otherName };
//"default"可以被占用，作为用户名字导出，其行为与用户名字一致，同时创建一个隐式的结果与名字导出一致的默认导出
// export { thing as default };

// let a = 3;

//
// export default function thing() {}

// export let a;

// function thing() {}
// export { thing as default };
// export { thing };
// export default thing;

// console.log(thing, typeof thing);
// console.log('a', a);

// These export the current value:
// export default thing;
// export default 'hello';

setTimeout(() => {
  // thing = 'changed';
  anotherThing.a = 5;
}, 500);
