假设浏览器已经接收到初次渲染的静态 HTML 页面，接下来浏览器会解析并渲染该页面。
在解析过程中，浏览器会发现 HTML 代码中存在 <link> 和 <script> 标签，
于是会从 CDN 或服务器获取相应的资源，这一步与 CSR 一致。
当JavaScript 资源加载完毕后，会进行激活操作，
这里的激活就是我们在 Vue.js 中常说的 “hydration”。激活包含两部分工作内容


1.Vue.js 在当前页面已经渲染的 DOM 元素以及 Vue.js 组件所渲染的虚拟 DOM 之间建立联系。
2.Vue.js 从 HTML 页面中提取由服务端序列化后发送过来的数据，用以初始化整个 Vue.js 应用程序。




激活完成后，整个应用程序已经完全被 Vue.js 接管为 CSR 应用程序了。
后续操作都会按照 CSR 应用程序的流程来执行。
当然，如果刷新页面，仍然会进行服务端渲染，然后再进行激活，如此往复



01 function renderElementVNode(vnode) {
02   // 取出标签名称 tag 和标签属性 props，以及标签的子节点
03   const { type: tag, props, children } = vnode
04   // 开始标签的头部
05   let ret = `<${tag}`
06   // 处理标签属性
07   if (props) {
08     for (const k in props) {
09       // 以 key="value" 的形式拼接字符串
10       ret += ` ${k}="${props[k]}"`
11     }
12   }
13   // 开始标签的闭合
14   ret += `>`
15
16   // 处理子节点
17   // 如果子节点的类型是字符串，则是文本内容，直接拼接
18   if (typeof children === 'string') {
19     ret += children
20   } else if (Array.isArray(children)) {
21     // 如果子节点的类型是数组，则递归地调用 renderElementVNode 完成渲染
22     children.forEach(child => {
23       ret += renderElementVNode(child)
24     })
25   }
26
27   // 结束标签
28   ret += `</${tag}>`
29
30   // 返回拼接好的 HTML 字符串
31   return ret
32 }


# 客户端激活的原理

由于浏览器在渲染了由服务端发送过来的 HTML 字符串之后，页面中已经存在对应的 DOM 元素了，
所以组件代码在客户端运行时，不需要再次创建相应的 DOM 元素。
但是，组件代码在客户端运行时，仍然需要做两件重要的事：

●在页面中的 DOM 元素与虚拟节点对象之间建立联系

●为页面中的 DOM 元素添加事件绑定。




01 // html 代表由服务端渲染的字符串
02 const html = renderComponentVNode(compVNode)
03
04 // 假设客户端已经拿到了由服务端渲染的字符串
05 // 获取挂载点
06 const container = document.querySelector('#app')
07 // 设置挂载点的 innerHTML，模拟由服务端渲染的内容
08 container.innerHTML = html
09
10 // 接着调用 hydrate 函数完成激活
11 renderer.hydrate(compVNode, container)
