const array = [
  { id: 1, name: 'A', parent: 0 },
  { id: 2, name: 'B', parent: 1 },
  { id: 3, name: 'C', parent: 1 },
  { id: 4, name: 'E', parent: 2 },
]

interface TreeNode {
  id: number
  name: string
  childrenNode?: TreeNode[]
}

interface TreeArrayItem {
  id: number
  name: string
  parent: number
}

export function ArrayToTree(arr: TreeArrayItem[]): TreeNode | null {
  let rootNode = null
  const findParentMap = new Map<number, TreeNode>() 
  //建立id -> node的映射 Map的优势是可以快速查找
  arr.forEach((ele) => {
    const { id, name, parent } = ele
    const TreeNode = { id, name }
    findParentMap.set(id, TreeNode)
    const ParentNode = findParentMap.get(parent)
    if (ParentNode) {
      if (ParentNode.childrenNode == null) {
        ParentNode.childrenNode = []
      }
      ParentNode.childrenNode.push(TreeNode)
    }
    if (parent === 0) {
      rootNode = TreeNode
    }
  })
  return rootNode
}
console.log(ArrayToTree(array))
