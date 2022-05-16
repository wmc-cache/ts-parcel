interface TreeNode {
  value: string
  children?: TreeNode[]
}

const tree: TreeNode = {
  value: 'A',
  children: [
    { value: 'B', children: [{ value: 'D', children: [{ value: 'E' }] }] },
    { value: 'C' },
  ],
}
function bfs(tree: TreeNode) {
  const queue: TreeNode[] = [tree]
  while (queue.length > 0) {
    const node = queue.shift()
    console.log(node?.value)
    if (node?.children) queue.push(...node.children)
  }
}

bfs(tree)

export {}


