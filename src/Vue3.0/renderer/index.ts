import VIEW from "../reactive/view";
const { effect, reactive } = VIEW;

function createRenderer(options: any) {
  const { createElement, insert, setElementText } = options;

  function render(vnode: Object, container: any) {
    if (vnode) {
      // 新 vnode 存在，将其与旧 vnode 一起传递给 patch 函数，进行打补丁
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        // 旧 vnode 存在，且新 vnode 不存在，说明是卸载（unmount）操作
        // 只需要将 container 内的 DOM 清空即可
        container.innerHTML = "";
      }
    }
    // 把 vnode 存储到 container._vnode 下，即后续渲染中的旧 vnode
    container._vnode = vnode;
  }

  /**
   *
   * @param n1 旧vnode
   * @param n2 新vnode
   * @param container 容器
   */
  function patch(n1: Object | null, n2: Object, container: Object) {
    if (!n1) {
      mountElement(n2, container);
    } else {
      mountElement(n2, container);
    }
  }

  function mountElement(vnode: any, container: any) {
    // 创建 DOM 元素
    const el = createElement(vnode.type);
    if (vnode.props) {
      for (const key in vnode.props) {
        // 用 in 操作符判断 key 是否存在对应的 DOM Properties
        if (key in el) {
          // 获取该 DOM Properties 的类型
          const type = typeof el[key];
          const value = vnode.props[key];
          // 如果是布尔类型，并且 value 是空字符串，则将值矫正为 true
          if (type === "boolean" && value === "") {
            el[key] = true;
          } else {
            el[key] = value;
          }
        } else {
          // 如果要设置的属性没有对应的 DOM Properties，则使用 setAttribute 函数设置属性
          el.setAttribute(key, vnode.props[key]);
        }
      }
    }
    // 处理子节点，如果子节点是字符串，代表元素具有文本节点
    if (typeof vnode.children === "string") {
      // 因此只需要设置元素的 textContent 属性即可
      setElementText(el, vnode.children);
    }
    if (Array.isArray(vnode.children)) {
      vnode.children.forEach((child: any) => {
        patch(null, child, el);
      });
    }
    //console.log(el, container);
    // 将元素添加到容器中
    insert(el, container);
  }

  return {
    render,
  };
}

// 在创建 renderer 时传入配置项
const renderer = createRenderer({
  // 用于创建元素
  createElement(tag: string) {
    return document.createElement(tag);
  },
  // 用于设置元素的文本节点
  setElementText(el: any, text: string) {
    el.textContent = text;
  },
  // 用于在给定的 parent 下添加指定元素
  insert(el: any, parent: any, anchor = null) {
    const dom = document.getElementById(parent.type);
    dom && dom.insertBefore(el, anchor);
  },
});

let vnode = reactive({
  type: "h1",
  children: "hello",
});

// 使用一个对象模拟挂载点
const container = { type: "root" };


//effect(() => renderer.render(vnode, container))

effect(() => {
  console.log(vnode.type)
});

setInterval(() => {
  vnode.children += "/";
}, 2000);






