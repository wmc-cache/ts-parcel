function arrayToTree(arr) {
    const nodeArray = arr.map((ele, id) => {
        return {
            id,
            val: ele,
            left: null,
            right: null
        }
    })
    const length = nodeArray.length

    for (let i = 0; i < length; i++) {
        nodeArray[i].left = nodeArray[2 * i + 1]
        nodeArray[i].right = nodeArray[2 * i + 2]
    }
    return nodeArray[0]

}
