interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export type InorderTraversal<T extends TreeNode | null> = [T] extends [TreeNode]
  ? [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>]
  : [];

// export type InorderTraversal<T extends TreeNode | null> = T extends TreeNode
//   ? T['left'] extends TreeNode
//     ? T['right'] extends TreeNode
//       ? [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>]
//       : [...InorderTraversal<T['left']>, T['val']]
//     : T['right'] extends TreeNode
//     ? [T['val'], ...InorderTraversal<T['right']>]
//     : [T['val']]
//   : [];

//分辨遍历的目的：
//1，返回遍历取得的值（需要数据结构来储存）。
//2，遍历时将遍历到的值用来运算（不需要数据结构来储存）。

//当嵌套过深时，做尽量多次细分判断。
//使用外部包裹元组类型来做细分判断：[T] extends [TreeNode]。

type testInorderTraversal = typeof tree1;
type testInorderTraversal1 = InorderTraversal<typeof tree1['right']>;
type testInorderTraversal2 = InorderTraversal<typeof tree1['right']['left']>;

//中序遍历：左-中-右
//          1
//null       2
//          3   null
//  null  null

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const;

type A = InorderTraversal<typeof tree1>; // [1, 3, 2]
