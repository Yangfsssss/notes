export declare function Currying(fn: any): any


const add = (a: number, b: number) => a + b
const three = add(1, 2)

const curriedAdd = Currying(add)
const five = curriedAdd(2)(3)

function curry(fn:(...args: any[])=>any) {
  let argAry:any[] = [];
  let executor = fn;

  return (...args: any[]) => {
    const length = fn.arguments.length

    if(argAry.length + 1 === length) {
      argAry.push(...args);
      while(argAry.length > 1) {
        executor = executor.call(null, argAry.shift());
      }

      return executor.call(null, argAry.shift());
    }else {
      argAry.push(...args);
    }
  }
}

const curryAdd = curry(add)
console.log(curryAdd(2)(3));
