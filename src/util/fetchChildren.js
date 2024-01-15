let fetchChildren = (treeNode) => {
    return this.$axios({
        url: `/userresource/complexQueryApi/queryComplexList?type=edo&queryParam=${this.searchValue}&pid=${treeNode.nodeid}`,
        method: 'get',
        params
    }).then(res => {
        const childrenData = res.data.map(ele => {
            return {
                type: ele.type,
                label: ele.name,
                nodeid: ele.id,
                deptid: ele.deptid,
                deptname: ele.deptname,
                children: []
            };
        });

        treeNode.children = childrenData;

        const typeZeroChildrenPromises = childrenData
            .filter(child => child.type === "o")
            .map(child => fetchChildren(child)); // 递归调用请求子节点

        return Promise.all(typeZeroChildrenPromises);
    }).catch(err => {
        this.$message.error(err.message);
    });
}

let treeNode = {
    type: "o",
    nodeid: "fc6bbc23d4b24accbc0dfa3996ee6a58",
    label: "广西消防",
    children: []
}

fetchChildren(treeNode).then(() => {
    this.treeData = [treeNode]
   
});
