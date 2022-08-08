/** Item40: 在类型良好的函数中隐藏不安全的类型断言，Hide Unsafe Type Assertions in Well-Typed Functions */

// declare function cacheLast<T extends Function>(fn: T): T;

function shallowEqual(lastArgs: any[], args: any[]): boolean {
  throw new Error('Function not implemented.');
}

// declare function shallowObjectEqual<T extends object>(a: T, b: T): boolean;

function shallowObjectEqual<T extends object>(a: T, b: T): boolean {
  for (const [k, aVal] of Object.entries(a)) {
    if (!(k in b) || aVal !== (b as any)[k]) {
      return false;
    }
  }

  return Object.keys(a).length === Object.keys(b).length;
}

function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;

  return function (...args: any[]) {
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }

    return lastResult;
  } as unknown as T;
}

//Things to Remember
//• Sometimes unsafe type assertions are necessary or expedient. When you need to use one, hide it inside a function with a correct signature.
