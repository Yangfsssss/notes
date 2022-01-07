/** Tree data structure in JavaScript */
//https://stackfull.dev/tree-data-structure-in-javascript

//Introduction--------------------------------------------------------------------
//create a binary tree
interface Node {
  value: any;
  left: Node;
  right: Node;
}

function NodeConstructor(value: any) {
  this.value = value;
  this.left = null;
  this.right = null;
}

const root = new NodeConstructor(2) as Node;
root.left = new NodeConstructor(1);
root.right = new NodeConstructor(3);

// console.log(root);

//Traversal------------------------------------------------------------------------
//it would be cool if we can 'iterate' through tree nodes as well.
//However, trees are not linear data structures like arrays,
//so there isn't just one way of traversing these.
//We can broadly classify the traversal approaches into following:

//···Breadth first traversal(BFS，广度优先遍历)
//···Depth first traversal(DFS，深度优先遍历)

//Breadth First Search/Traversal (BFS)--------------------------------------
//In this approach, we traverse the tree level by level.
//We would start at the root, then cover all of it's children, and we cover all of 2nd level children,
//so on and so forth.

//the overall algorithm would be like:
//1,Initiate a queue with root in it
//2,Remove the first item out of the queue
//3,Push the left and right children of the popped item into the queue
//4,Repeat steps 2 and 3 until the queue is empty
function walkBFS(root: Node) {
  if (root === null) {
    return;
  }

  const queue = [root];

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

// walkBFS(root);

//We can modify above algorithm slightly to return an array of arrays,
//where each inner array represents a level with elements within in:
function walkBFS1(root: Node) {
  if (root === null) {
    return;
  }

  const queue = [root];
  const ans = [];

  while (queue.length > 0) {
    const length = queue.length;
    const level = [];

    for (let i = 0; i < length; i++) {
      const poppedItem = queue.shift();

      level.push(poppedItem);

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

// walkBFS1(root);

//Depth First Search/Traversal (DFS)-----------------------------------------
//In DFS, we take one node and keep exploring it's children until the depth the fully exhausted.
//It can be done in one of following ways:

//root node -> left node -> right node  ---pre-order traversal(前序遍历)
//left node -> root node -> right node  ---in-order traversal(中序遍历)
//left node -> right node -> root node  ---post-order traversal(后序遍历)

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

console.log(root1);

//Recursive approach:
function walkPreOrderOfRecursiveApproach(root: Node) {
  if (root === null) {
    return;
  }

  //do something here
  console.log(root.value);

  //recurse through child nodes
  if (root.left) {
    walkPreOrderOfRecursiveApproach(root.left);
  }
  if (root.right) {
    walkPreOrderOfRecursiveApproach(root.right);
  }
}

// walkPreOrderOfRecursiveApproach(root1);

//Iterative approach:
//Iterative approach for PreOrder traversal is very similar to BFS,
//except we use a stack instead of a queue and we push the right child first into the stack:
function walkPreOrderOfIterativeApproach(root: Node) {
  if (root === null) {
    return;
  }

  const stack = [root];

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
//left node -> root node -> right node

//Recursive:
function walkInOrderRecursive(root: Node) {
  if (root === null) {
    return;
  }

  if (root.left) {
    walkInOrderRecursive(root.left);
  }

  // do something here
  console.log(root.value);

  if (root.right) {
    walkInOrderRecursive(root.right);
  }
}

// walkInOrderRecursive(root1);

//Iterative:
function walkInOrderIterative(root: Node) {
  if(root === null) {
    return;
  }


  const stack = [];
  let current = root;

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

//             A 
//         B        C
//   D     E   F   G
// x   H
//xx I x

//Post-Order traversal
//left node -> right node -> root node

//Recursive:
function walkPostOrderRecursive(root: Node){
  if(root === null) {
    return;
  }

  if(root.left) {
    walkPostOrderRecursive(root.left);
  }
  if(root.right) {
    walkPostOrderRecursive(root.right);
  }

  //do something here
  console.log(root.value);
}

// walkPostOrderRecursive(root1)

//Iterative:
function walkPostOrderIterative(root: Node){
  if (root === null) {
    return;
  }

  const tempStack = [root];
  const result = [];

  while(tempStack.length > 0){
    const last = tempStack.pop();

    result.push(last.value);
    console.log(last.value);

    if(last.left) {
      tempStack.push(last.left);
    }
    if(last.right) {
      tempStack.push(last.right);
    }
  }

  console.log(result.reverse());
  
  return result.reverse()
                  //tempStack
                 //------------------------------
                    //root root.left root.right
                //------------------------------
                //result
                //------------------------------
                    //root root.right root.left
               //-------------------------------


}

walkPostOrderIterative(root1);