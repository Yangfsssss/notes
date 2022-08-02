import { ITreeNode, IArrayItem } from './arr-to-tree';

const tree = {
  id: 1,
  name: '部门A',
  children: [
    {
      id: 2,
      name: '部门B',
      children: [
        {
          id: 4,
          name: '部门D',
        },
        {
          id: 5,
          name: '部门E',
        },
      ],
    },
    {
      id: 3,
      name: '部门C',
      children: [
        {
          id: 6,
          name: '部门F',
        },
      ],
    },
  ],
};

// 深度优先 递归
function DFSConvert(treeNode: ITreeNode, parentId: number): IArrayItem[] {
  const result = [];

  result.push({ id: treeNode.id, name: treeNode.name, parentId: parentId || 0 });

  if (treeNode.children) {
    for (const child of treeNode.children) {
      const arrItem = DFSConvert(child, treeNode.id);
      if (arrItem) {
        result.push(...arrItem);
      }
    }
  }

  return result;
}

// 广度优先 队列
function BFSConvert(treeNode: ITreeNode): IArrayItem[] {
  const nodeToParent: Map<ITreeNode, ITreeNode> = new Map();

  const result: IArrayItem[] = [];

  const queue: ITreeNode[] = [treeNode];

  while (queue.length > 0) {
    const curTreeNode = queue.pop();
    if (curTreeNode === null || curTreeNode === undefined) break;

    const arrayItem = {
      id: curTreeNode.id,
      name: curTreeNode.name,
      parentId: nodeToParent.get(curTreeNode)?.id || 0,
    };

    result.push(arrayItem);

    if (curTreeNode.children) {
      for (const child of curTreeNode.children) {
        nodeToParent.set(child, curTreeNode);
        queue.unshift(child);
      }
    }
  }

  return result;
}
