/**
 * @description 二叉搜索树
 * @author Yang
 */

interface ITreeNode {
  value: number;
  left: ITreeNode | null;
  right: ITreeNode | null;
}

const arr: number[] = [];

export const bst: ITreeNode = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null,
    },
    right: {
      value: 4,
      left: null,
      right: null,
    },
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 8,
      left: null,
      right: null,
    },
  },
};

/**
 * 二叉树前序遍历
 * @param node tree node
 */

export function preOrderTraverse(node: ITreeNode | null) {
  if (node === null) return;

  // console.log(node.value);
  arr.push(node.value);

  if (node.left) {
    preOrderTraverse(node.left);
  }

  if (node.right) {
    preOrderTraverse(node.right);
  }
}

// preOrderTraverse(bst);

/**
 * 二叉树中序遍历
 * @param node tree node
 */

export function inOrderTraverse(node: ITreeNode | null) {
  if (node === null) return;

  if (node.left) {
    inOrderTraverse(node.left);
  }

  // console.log(node.value);
  arr.push(node.value);

  if (node.right) {
    inOrderTraverse(node.right);
  }
}

// inOrderTraverse(bst);

/**
 * 二叉树后序遍历
 * @param node tree node
 */

export function postOrderTraverse(node: ITreeNode | null) {
  if (node === null) return;

  if (node.left) {
    postOrderTraverse(node.left);
  }

  if (node.right) {
    postOrderTraverse(node.right);
  }

  // console.log(node.value);
  arr.push(node.value);
}

// postOrderTraverse(bst);

/**
 * 寻找 BST 里的第 K 小值
 * @param node tree node
 * @param k 第几个值
 */

export function getKthValue(node: ITreeNode, k: number): number | null {
  inOrderTraverse(node);

  console.log(arr);

  // [100,200,300]
  // 第一小的是100(index:0)
  // 第二小的是200(index:1)
  // 第三小的是300(index:2)
  // 第 k 小的是arr[k-1](index:k-1)
  return arr[k - 1] || null;
}

// getKthValue(bst, 3);
