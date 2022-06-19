type DropChar<S extends string, C extends string> = S extends `${infer U}${infer V}`
  ? U extends C
    ? `${DropChar<V, C>}`
    : `${U}${DropChar<V, C>}`
  : S;

//思路：
//infer递归对比第一个字符串字面量类型U是否与参数相等，
//如果相等，除去U，返回下一轮递归的结果
//如果不相等，保留U，返回U和下一轮递归的结果

type Butterfly = DropChar<' b u t t e r f l y ! ', ' '>; // 'butterfly!'
type Butterfly1 = DropChar<'butter fly!', ''>; // 'butterfly!'
