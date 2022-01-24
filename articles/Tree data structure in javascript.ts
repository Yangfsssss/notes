/** Tree data structure in JavaScript */
//https://stackfull.dev/tree-data-structure-in-javascript

//Introduction--------------------------------------------------------------------
//create a binary tree
interface TreeNode {
  value: any;
  left: TreeNode;
  right: TreeNode;
}

function NodeConstructor(value: any) {
  this.value = value;
  this.left = null;
  this.right = null;
}

const node: TreeNode = new NodeConstructor(2);
node.left = new NodeConstructor(1);
node.right = new NodeConstructor(3);

// console.log(node);

//Traversal------------------------------------------------------------------------
//it would be cool if we can 'iterate' through tree nodes as well.
//However, trees are not linear data structures like arrays,
//so there isn't just one way of traversing these.
//We can broadly classify the traversal approaches into following:

//···Breadth first traversal(BFS，广度优先遍历)
//···Depth first traversal(DFS，深度优先遍历)

//Breadth First Search/Traversal (BFS)--------------------------------------
//In this approach, we traverse the tree level by level.
//We would start at the node, then cover all of it's children, and we cover all of 2nd level children,
//so on and so forth.

//the overall algorithm would be like:
//1,Initiate a queue with node in it
//2,Remove the first item out of the queue
//3,Push the left and right children of the popped item into the queue
//4,Repeat steps 2 and 3 until the queue is empty
function walkBFS(node: TreeNode) {
  if (node === null) {
    return;
  }

  const queue = [node];

  while (queue.length > 0) {
    const poppedItem = queue.shift();

    //do something with the popped item
    console.log(poppedItem);

    if (poppedItem.left) {
      queue.push(poppedItem.left);
    }

    if (poppedItem.right) {
      queue.push(poppedItem.right);
    }
  }
}

// walkBFS(node);

//We can modify above algorithm slightly to return an array of arrays,
//where each inner array represents a level with elements within in:
function walkBFSWithLevel(node: TreeNode) {
  if (node === null) {
    return;
  }

  const queue = [node];
  const ans = [];

  while (queue.length > 0) {
    const length = queue.length;
    const level = [];

    for (let i = 0; i < length; i++) {
      const poppedItem = queue.shift();

      level.push(poppedItem.value);

      if (poppedItem.left) {
        queue.push(poppedItem.left);
      }

      if (poppedItem.right) {
        queue.push(poppedItem.right);
      }
    }

    ans.push(level);
  }

  console.log(ans);
  return ans;
}

// walkBFSWithLevel(getRoot1());

//Depth First Search/Traversal (DFS)-----------------------------------------
//In DFS, we take one node and keep exploring it's children until the depth the fully exhausted.
//It can be done in one of following ways:

//node node -> left node -> right node  ---pre-order traversal(前序遍历)
//left node -> node node -> right node  ---in-order traversal(中序遍历)
//left node -> right node -> node node  ---post-order traversal(后序遍历)

//All of these traversal techniques can be implemented recursively as well as iteratively.
//Let's jump into the implementation details:

//···Pre-Order traversal
//root node -> left node -> right node
const root1 = new NodeConstructor('A');
root1.left = new NodeConstructor('B');
root1.right = new NodeConstructor('C');

root1.left.left = new NodeConstructor('D');
root1.left.left.right = new NodeConstructor('H');
root1.left.left.right.left = new NodeConstructor('I');
root1.left.right = new NodeConstructor('E');

root1.right.left = new NodeConstructor('F');
root1.right.right = new NodeConstructor('G');

function getRoot1() {
  return root1;
}

// console.log(root1);

//Recursive approach:
function walkPreOrderOfRecursiveApproach(node: TreeNode) {
  if (node === null) {
    return;
  }

  //do something here
  console.log(node.value);

  //recurse through child nodes
  if (node.left) {
    walkPreOrderOfRecursiveApproach(node.left);
  }
  if (node.right) {
    walkPreOrderOfRecursiveApproach(node.right);
  }
}

// walkPreOrderOfRecursiveApproach(getRoot1());

//Iterative approach:
//Iterative approach for PreOrder traversal is very similar to BFS,
//except we use a stack instead of a queue and we push the right child first into the stack:
function walkPreOrderOfIterativeApproach(node: TreeNode) {
  if (node === null) {
    return;
  }

  const stack = [node];

  while (stack.length > 0) {
    const poppedItem = stack.pop();

    //do something with the popped item
    console.log(poppedItem.value);

    // Left child is pushed after right one, since we want to print left child first hence it must be above right child in the stack
    if (poppedItem.right) {
      stack.push(poppedItem.right);
    }
    if (poppedItem.left) {
      stack.push(poppedItem.left);
    }
  }
}

// walkPreOrderOfIterativeApproach(root1);

//···In-Order traversal
//left node -> node node -> right node

//Recursive:
function walkInOrderRecursive(node: TreeNode) {
  if (node === null) {
    return;
  }

  if (node.left) {
    walkInOrderRecursive(node.left);
  }

  // do something here
  console.log(node.value);

  if (node.right) {
    walkInOrderRecursive(node.right);
  }
}

// walkInOrderRecursive(root1);

//Iterative:
function walkInOrderIterative(node: TreeNode) {
  if (node === null) {
    return;
  }

  const stack = [];
  let current = node;

  while (stack.length > 0 || current !== null) {
    while (current !== null) {
      stack.push(current); // keep recording the trail,to backtrack
      current = current.left; // get to leftmost child
    }

    const last = stack.pop();
    console.log(last.value);

    current = last.right;
  }
}

// walkInOrderIterative(root1);

//               A
//         B        C
//   D     E   F   G
// x   H
//xx I x

//Post-Order traversal
//left node -> right node -> node node

//Recursive:
function walkPostOrderRecursive(node: TreeNode) {
  if (node === null) {
    return;
  }

  if (node.left) {
    walkPostOrderRecursive(node.left);
  }
  if (node.right) {
    walkPostOrderRecursive(node.right);
  }

  //do something here
  console.log(node.value);
}

// walkPostOrderRecursive(root1);

//Iterative:
function walkPostOrderIterative(node: TreeNode) {
  if (node === null) {
    return;
  }

  const tempStack = [node];
  const result = [];

  while (tempStack.length > 0) {
    const last = tempStack.pop();

    result.push(last.value);

    console.log(last.value);

    if (last.left) {
      tempStack.push(last.left);
    }
    if (last.right) {
      tempStack.push(last.right);
    }
  }

  console.log(result.reverse());

  return result.reverse();
  //tempStack
  //------------------------------
  //node node.left node.right
  //------------------------------
  //result
  //------------------------------
  //node node.right node.left
  //-------------------------------
}

// walkPostOrderIterative(root1);

//review------------------------------------------------------------------------------------------
//               A
//         B        C
//   D     E   F   G
// x  H
//xx I x

//D I H B E A F C G

//------------------------------------------
// A, B C, C D E, D E F G, E F G H, F G H, G H, H, I
//------------------------------------------

//------------------------------------------
// A, B C,  D E F G,  H, I
//------------------------------------------

//[
//   [A],
//   [B,C],
//   [D,E,F,G],
//   [H],
//   [I]
// ]

function reviewBFS() {
  function walkBFS(node: TreeNode) {
    if (node === null) {
      return;
    }

    const queue = [node];

    while (queue.length > 0) {
      const poppedItem = queue.shift();
      console.log(poppedItem.value);

      if (poppedItem.left) {
        queue.push(poppedItem.left);
      }

      if (poppedItem.right) {
        queue.push(poppedItem.right);
      }
    }
  }

  // walkBFS(getRoot1());

  function walkBFSWithLevel(node: TreeNode) {
    if (node === null) {
      return;
    }

    const queue = [node];
    const result = [];

    while (queue.length > 0) {
      const length = queue.length;
      const level = [];

      //不同于基础版遍历在每次循环中只处理队头的元素
      //分层版遍历在每次循环中处理掉队列里所有的元素，
      //原理是如果从根元素开始一次处理掉队列里所有元素，
      //那么处理结束后队列里现存的就是处理的结果，即下一层的所有元素
      for (let i = 0; i < length; i++) {
        const poppedItem = queue.shift();

        level.push(poppedItem.value);

        if (poppedItem.left) {
          queue.push(poppedItem.left);
        }

        if (poppedItem.right) {
          queue.push(poppedItem.right);
        }
      }

      result.push(level);
    }

    console.log(result);
  }

  walkBFSWithLevel(getRoot1());
}

// reviewBFS();

function reviewDFS() {
  //Pre-Order traversal
  //node -> left -> right;
  function preOrderTraversal() {
    //Recursive
    function recursive(node: TreeNode) {
      if (node === null) {
        return;
      }

      console.log(node.value);

      if (node.left) {
        recursive(node.left);
      }

      if (node.right) {
        recursive(node.right);
      }
    }

    // recursive(getRoot1());

    //Iterative
    function iterative(node: TreeNode) {
      if (node === null) {
        return;
      }

      const stack = [node];

      //用栈迭代，先进后出
      while (stack.length > 0) {
        //每次循环处理栈顶的节点
        const poppedItem = stack.pop();

        //处理过程
        console.log(poppedItem.value);

        //先推入右节点，再推入左节点
        //使左节点总是能够被先处理
        if (poppedItem.right) {
          stack.push(poppedItem.right);
        }

        if (poppedItem.left) {
          stack.push(poppedItem.left);
        }
      }
    }

    iterative(getRoot1());
  }

  // preOrderTraversal();

  //In-Order traversal
  //left -> node -> right;
  function inOrderTraversal() {
    //Recursive
    function recursive(node: TreeNode) {
      if (node === null) {
        return;
      }

      //先遍历左节点，直到最左的子节点
      if (node.left) {
        recursive(node.left);
      }

      //处理
      console.log(node.value);

      //再遍历右节点，直到右节点中最左的子节点
      if (node.right) {
        recursive(node.right);
      }
    }

    // recursive(getRoot1());

    //Iterative
    function iterative(node: TreeNode) {
      if (node === null) {
        return;
      }

      const stack = [];

      let current = node;

      //stack.length > 0 :执行迭代条件；current !== null：开启迭代条件
      while (stack.length > 0 || current !== null) {
        //
        while (current !== null) {
          //沿左节点找到最左的节点
          //并将沿途的左节点推入栈中
          stack.push(current);
          current = current.left;
        }

        //取出栈中所存的最左节点
        const last = stack.pop();

        //处理
        //最左的节点没有左子节点，即最左节点一定是中节点或子节点
        console.log(last.value);

        //同理处理其右节点
        current = last.right;
      }
    }

    // iterative(getRoot1());
  }

  // inOrderTraversal();

  //Post-Order traversal
  //left -> right -> node;
  function postOrderTraversal() {
    //Recursive
    function recursive(node: TreeNode) {
      if (node === null) {
        return;
      }

      if (node.left) {
        recursive(node.left);
      }

      if (node.right) {
        recursive(node.right);
      }

      console.log(node.value);
    }

    // recursive(getRoot1())

    //Iterative
    function iterative(node: TreeNode) {
      if (node === null) {
        return;
      }

      //临时用栈
      const queue = [node];
      const result = [];

      //---------------------------------------------
      //root ,right left
      //---------------------------------------------

      //---------------------------------------------
      //
      //---------------------------------------------

      while (queue.length > 0) {
        const poppedItem = queue.pop();

        result.push(poppedItem.value);

        // console.log(poppedItem.value);

        if (poppedItem.left) {
          queue.push(poppedItem.left);
        }
        if (poppedItem.right) {
          queue.push(poppedItem.right);
        }

      }

      console.log(result.reverse());
    }

    iterative(getRoot1());
  }

  postOrderTraversal();
}

// reviewDFS();

//traverse the tree using generator--------------------------------------------------
function* walkPreOrder(node: TreeNode){
  if(node === null){
    return;
  }

  const stack = [node];

  while (stack.length > 0) {
    const poppedItem = stack.pop();

    yield poppedItem

    if(poppedItem.right){
      stack.push(poppedItem.right);
    }
    if(poppedItem.left){
      stack.push(poppedItem.left);
    }
  }
}

for(const node of walkPreOrder(getRoot1())){
  console.log(node.value);
}
