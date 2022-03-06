/** Item37: 考虑加“烙印”来实现名义类型，Consider "Brands" for Nominal Typing */

type AbsolutePath = string & { _brand: 'abs' };
function listAbsolutePath(path: AbsolutePath) {
  //...
}

function isAbsolutePath(path: string): path is AbsolutePath {
  return path.startsWith('/');
}

function fx(path: string) {
  if (isAbsolutePath(path)) {
    listAbsolutePath(path);
  }

  //there's no such value in type "string & { _brand: 'abs' }",so you can only pass a string that isAbsolutePath():true,
  //or deliberately use type assertion "as AbsolutePath",which means you are certain its a absolute path.
  // listAbsolutePath(path);
}

type SortedList<T> = T[] & { _brand: 'sorted' };

//same,pass a T[] that isSorted():true,or use "as SortedList<T>" to show that you know the T[] is sorted.
function binarySearch<T>(xs: SortedList<T>, x: T): boolean {
  let low = 0,
    high = xs.length - 1;

  while (high >= low) {
    const mid = low + Math.floor((low + high) / 2);
    const v = xs[mid];

    if (v === x) {
      return true;
    }

    [low, high] = x > v ? [mid + 1, high] : [low, mid - 1];
  }

  return false;
}

function isSorted<T>(xs: T[]): xs is SortedList<T> {
  for (let i = 1; i < xs.length; i++) {
    if (xs[i] > xs[i - 1]) {
      return false;
    }
  }

  return true;
}

type Meters = number & { _brand: 'meters' };
type Seconds = number & { _brand: 'seconds' };

const meters = (m: number) => m as Meters;
const seconds = (s: number) => s as Seconds;

const oneKm = meters(1000);
const oneMin = seconds(60);

const tenKm = oneKm * 10;
const v = oneKm / oneMin;

//Things to Remember
//• TypeScript uses structural (“duck”) typing, which can sometimes lead to surpris‐
//ing results. If you need nominal typing, consider attaching “brands” to your values to distinguish them.
//• In some cases you may be able to attach brands entirely in the type system, rather
//than at runtime. You can use this technique to model properties outside of TypeScript’s type system.
