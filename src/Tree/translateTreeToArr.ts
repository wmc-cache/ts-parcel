interface TreeNode {
  id: number;
  value: string;
  children: TreeNode[];
  pid?: number;
}

const tree: TreeNode = {
  id: 1,
  value: "1-1",
  children: [
    {
      id: 2,
      value: "2-1",
      children: [{ id: 4, value: "3-1", children: [] }],
    },
    {
      id: 3,
      value: "2-2",
      children: [{ id: 3, value: "3-2", children: [] }],
    },
  ],
};

function translateTreeToArr(tree: TreeNode) {
  const queue: TreeNode[] = [tree];
  const map = new Map();
  const result: any = [];

  while (queue.length > 0) {
    const currentNode = queue.shift() as TreeNode;
    const { id, value, children } = currentNode;
    const parentNode = map.get(currentNode);
    if (parentNode) {
      currentNode.pid = parentNode.id;
    }
    result.push({ id, value, pid: currentNode.pid||0 });

    children.forEach((ele) => {
      map.set(ele, currentNode);
      queue.push(ele);
    });
    //console.log(id, value, children);
  }

  return result;
}

console.log(translateTreeToArr(tree));
export {};
