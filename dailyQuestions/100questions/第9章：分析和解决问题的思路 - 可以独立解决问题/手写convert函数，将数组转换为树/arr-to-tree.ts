/**
 * @description array to tree
 * @author Yang
 */

export interface IArrayItem {
  id: number;
  name: string;
  parentId: number;
}

export interface ITreeNode {
  id: number;
  name: string;
  children?: ITreeNode[];
}

export default function convert(arr: IArrayItem[]): ITreeNode | null {
  // 用于 id 和 treeNode 的映射
  const idToTreeNode: Map<number, ITreeNode> = new Map();

  let root = null;

  for (const item of arr) {
    const { id, name, parentId } = item;

    // 定义treeNode 并加入 map
    const treeNode: ITreeNode = { id, name };
    idToTreeNode.set(id, treeNode);

    // 找到 parentNode 并加入到它的 children
    const parentNode = idToTreeNode.get(parentId);
    if (parentNode) {
      if (!parentNode.children) {
        parentNode.children = [];
      }
      parentNode.children.push(treeNode);
    }

    // 找到根结点
    if (parentId === 0) {
      root = treeNode;
    }
  }

  return root;
}

const arr = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 1 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 2 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
];

const tree = convert(arr);
console.log(tree);
