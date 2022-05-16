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

function dfs(tree: TreeNode) {
  console.log(tree.value)
  if (tree.children) tree.children.forEach((child) => dfs(child))
}

dfs(tree)

export {}
