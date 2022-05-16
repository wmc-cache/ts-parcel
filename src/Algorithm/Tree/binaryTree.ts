interface BinaryTreeNode {
  value: string
  left: BinaryTreeNode | null
  right: BinaryTreeNode | null
}

//         A
//       B   C
//     D
//   E
const tree: BinaryTreeNode = {
  value: 'A',
  left: {
    value: 'B',
    left: {
      value: 'D',
      left: {
        value: 'E',
        left: null,
        right: null,
      },
      right: null,
    },
    right: null,
  },
  right: {
    value: 'C',
    left: null,
    right: null,
  },
}
function formerSequenceTraversal(tree: BinaryTreeNode | null) {
  if (tree === null) return
  console.log(tree.value)
  formerSequenceTraversal(tree.left)
  formerSequenceTraversal(tree.right)
}

formerSequenceTraversal(tree)

function SequenceTraversal(tree: BinaryTreeNode) {
  if (tree === null) return
  formerSequenceTraversal(tree.left)
  console.log(tree.value)
  formerSequenceTraversal(tree.right)
}

SequenceTraversal(tree)
