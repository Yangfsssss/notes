//1，返回新函数
//2，指定this
//3，累积参数


// declare function MyBind<T extends unknown[], S extends unknown[], U>(fn: (arg: T) => U, args: S) : (...args: [...T, ...S]) => U;

function MyBind(this:(...args:unknown[])=>unknown,bindThis:unknown ,...args:unknown[]):(...newArgs:unknown[]) => unknown{
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this;
  return function(...newArgs:unknown[]):unknown{
    return self.call(bindThis,...args,...newArgs);
  }
}

Function.prototype.bind = MyBind

const bindFunc = function(this:Record<string,number>,a:number,b = 0){console.log(a + b + this.x)}.bind({x:1000},5);

bindFunc(7);