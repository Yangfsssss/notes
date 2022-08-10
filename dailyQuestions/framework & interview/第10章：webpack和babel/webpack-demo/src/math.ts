export function sum(a: number, b: number): number {
  return a + b + 5;
}

export const multi = (a: number, b: number): number => {
  return a * b;
};

// 必须使用 ES6 Module 才能让 Tree Shaking 生效
// commonjs 就不行
