export interface IteratorRes {
  value: number | undefined;
  done: boolean;
}

class CustomIterator {
  private length = 3;
  private index = 0;

  next() {
    this.index++;
    if (this.index <= this.length) {
      return {
        value: this.index,
        done: false,
      };
    }

    return {
      value: undefined,
      done: true,
    };
  }

  [Symbol.iterator]() {
    return this;
  }
}

const iterator = new CustomIterator();
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// for(const n of iterator){
//   console.log(n);
// }

// 使用生成器
class CustomIteratorWithGenerator {
  private data: number[];

  constructor() {
    this.data = [100, 200, 300];
  }

  *[Symbol.iterator]() {
    yield* this.data;
  }
}

const iteratorWithGenerator = new CustomIteratorWithGenerator();
for (const n of iteratorWithGenerator) {
  console.log(n);
}
