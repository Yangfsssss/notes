export const obj = {
  f1() {
    const fn = () => {
      console.log('this1', this);
    };

    fn();
    fn.call(window);
  },
  f2: () => {
    function fn(this: unknown) {
      console.log('this2', this);
    }

    fn();
    fn.call(this);
  },
};

obj.f1(); // ? - obj - obj
obj.f2(); // ? - window - window

class Foo {
  f2: () => void;
  f3: () => void;

  constructor() {
    this.f2 = () => {
      console.log('this2', this);
    };

    this.f3 = () => {
      console.log('this3', this);
    };
  }

  f1() {
    console.log('this1', this);
  }

  // f2 = () => {
  //   console.log('this2', this);
  // };

  // f3 = () => {
  //   console.log('this3', this);
  // };

  static f4() {
    console.log('this4', this);
  }
}

const f = new Foo();

f.f1(); // ? - f
f.f2(); // ? - f
f.f3.call(this); // ? - f
Foo.f4(); // ? - Foo
