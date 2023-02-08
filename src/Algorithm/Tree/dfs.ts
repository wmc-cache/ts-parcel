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

dfs2(tree)



function dfs2(tree: TreeNode) {
  const arr = [tree]
  while (arr.length > 0) {
    const currentNode = arr.shift()
    console.log(currentNode?.value)
    if (currentNode?.children)
      arr.unshift(...currentNode?.children)
    console.log(arr)
  }
}

export { }
