type FlattenOnce<T extends readonly unknown[]> = T extends [infer U, ...infer V]
  ? U extends unknown[]
    ? [...U, ...FlattenOnce<V>]
    : [U, ...FlattenOnce<V>]
  : T;

type FlattenDepth<
  T extends unknown[],
  Depth = 1,
  Count extends 1[] = [],
  Flattened extends unknown[] = Count['length'] extends Depth ? T : FlattenOnce<T>
> = Flattened extends T ? Flattened : FlattenDepth<Flattened, Depth, [...Count, 1]>;

// type FlattenDepth<T extends unknown[], Depth = 1, Count extends 1[] = [1]> = Count['length'] extends Depth
//   ? FlattenOnce<T>
//   : FlattenDepth<FlattenOnce<T>, Depth, [...Count, 1]>;

//递归
//TypeScript中数字字面量类型的比较方法

// type testFlattenOnce = FlattenOnce<[1, 2, [3, 4], [[[5]]]]>

type FlattenDepthA = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>; // [1, 2, 3, 4, [5]]. flattern 2 times
type FlattenDepthB = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1

function flattenDepth<T extends readonly any[]>(ary: T, depth: number = 1): unknown[] {
  let result = [];

  for (const i of ary) {
    Array.isArray(i) ? result.push(...i) : result.push(i);
  }

  if (depth === 1) return result;
  return flattenDepth(result, depth - 1);
}
