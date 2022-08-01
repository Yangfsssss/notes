/**
 * @description  遍历DOMTree
 * @author Yang
 */

/**
 * 访问节点
 * @param n node
 */

function createHTML() {
  const p1 = document.createElement('p');
  p1.textContent = 'template';

  document.body.appendChild(p1);

  const div = document.createElement('div');

  const p2 = document.createElement('p');
  p2.textContent = 'hello';
  const b = document.createElement('b');
  b.textContent = 'world';
  p2.appendChild(b);

  const img = document.createElement('img');
  img.src = 'https://img.yzcdn.cn/vant/logo.png';

  const comment = document.createComment('comment');
  comment.textContent = 'comment';

  const ul = document.createElement('ul');
  const li1 = document.createElement('li');
  li1.textContent = 'a';
  const li2 = document.createElement('li');
  li2.textContent = 'b';
  ul.appendChild(li1);
  ul.appendChild(li2);

  div.appendChild(p2);
  div.appendChild(img);
  div.appendChild(comment);
  div.appendChild(ul);

  document.body.appendChild(div);

  return div;
}

function visitNode(n: Node) {
  if (n instanceof Comment) {
    // 注释
    console.log('Comment node ---', n.textContent);
  }

  if (n instanceof Text) {
    // 文本
    console.log('Text node ---', n.textContent?.trim());
  }

  if (n instanceof HTMLElement) {
    // element
    console.log('Element node ---', `<${n.tagName.toLowerCase()}>`);
  }
}

function depthFirstTraverse(root: Node) {
  visitNode(root);

  const childNodes = root.childNodes; // .childNodes 和 .children 不一样
  if (childNodes.length) {
    childNodes.forEach(depthFirstTraverse); // 递归
  }
}

function depthFirstTraverseIteratively(root: Node) {
  const stack: Node[] = [root];

  while (stack.length > 0) {
    const curNode = stack.pop();
    if (curNode === null || curNode === undefined) break;

    visitNode(curNode);

    if (curNode.childNodes.length) {
      stack.push(...curNode.childNodes);
    }
  }
}

function breadthFirstTraverse(root: Node) {
  const queue: Node[] = []; // 数组 vs 链表

  // 根节点入队列
  queue.unshift(root);

  while (queue.length > 0) {
    const curNode = queue.pop(); // 出队列
    if (curNode === null || curNode === undefined) break;
    // curNode || break;

    visitNode(curNode);

    // 子节点入队
    if (curNode.childNodes.length) {
      queue.unshift(...curNode.childNodes);
    }
  }
}

const box = createHTML();
if (box === null) throw new Error('box is null');
// depthFirstTraverse(box);
breadthFirstTraverse(box);
