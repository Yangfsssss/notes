//     f(m,n) = f(m-1,n) + f(m,n-1)
export function steps(m: number, n: number): number {
  if ((m === 1 && n > 1) || (n === 1 && m > 1)) {
    return 1;
  }

  return steps(m - 1, n) + steps(m, n - 1);
}

console.log(steps(5, 4));

// 或者使用二维数组：
function getPaths(m: number, n: number) {
  // m * n 二维数组，模拟网格
  const map = new Array(m);
  for (let i = 0; i < m; i++) {
    map[i] = new Array(n);
  }

  // 如果只走第一行，就只有一条路径。所以第一行所有 item 都填充 1
  map[0].fill(1);

  // 如果只走第一列，也只有一条路径。所以第一列所有 item 都填充 1
  for (let i = 0; i < m; i++) {
    map[i][0] = 1;
  }

  // 其他 item ，根据这个公式 map[i][j] = map[i - 1][j] + map[i][j - 1]
  // 如走到 [5, 4] 的路径数，就是 [4, 4] 和 [5, 3] 路径数的总和 —— 动态规划的思想
  // 注意：i 和 j 都从 1 开始 ！！！ 因为 0 位置已经被上文赋值为了
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      map[i][j] = map[i - 1][j] + map[i][j - 1];
    }
  }

  // 返回 finish 节点的路径数
  return map[m - 1][n - 1];
}

console.log('paths', getPaths(5, 4));
