import { Watcher } from './Watcher'

 export class Compiler {
  private el: any
  constructor(private vm: any) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }
  // 编译模板, 处理文本节点和元素节点
  compile(el: any) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach((node: any) => {
      // 处理文本节点
      // console.log(node.nodeType, 'nodeType')
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node)
      }

      // 判断node节点,是否有子节点, 如果有子节点,要递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 编译元素节点, 出来指令
  compileElement(node: any) {
    console.log(node.attributes)
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach((attr: any) => {
      // 判断是否是指令
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        // v-text --> text
        attrName = attrName.substr(2)
        let key = attr.value
        this.update(node, key, attrName)
      }

      if (this.isEvent(attrName)) {
        // 是事件on开头
        console.log(this.vm, 'attrName')
        let key = attr.value
        const dir = attrName.substring(3)
        this.eventHandler(node, this.vm, key, dir)
      }
    })
  }

  isEvent(attr: any) {
    console.log(attr)
    return attr.indexOf('on') === 0
  }

  update(node: any, key: any, attrName: any) {
    //@ts-ignore
    let updateFn = this[attrName + 'Updater']
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }

  // 处理 v-text 指令
  textUpdater(node: any, value: any, key: string) {
    node.textContent = value
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }
  // v-model
  modelUpdater(node: any, value: any, key: string) {
    node.value = value
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })

    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }

  // 处理v-html
  htmlUpdater(node: any, value: any, key: string) {
    node.innerHTML = value
    new Watcher(this.vm, key, (newValue) => {
      console.log(newValue, 'newValue')
      node.innerHTML = newValue
    })
  }

  // 编译文本节点，出来差值
  compileText(node: any) {
    // console.dir(node)
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])

      // 创建watcher对象, 当数据改变更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }

  // 添加事件
  eventHandler(node: any, vm: any, exp: any, dir: any) {
    const fn = vm.$options.methods && vm.$options.methods[exp]
    if (dir && fn) {
      node.addEventListener(dir, fn.bind(vm))
    }
  }

  // 判断元素属性是否是指令
  isDirective(attrName: any) {
    return attrName.startsWith('v-')
  }

  // 判断节点是否是文本节点
  isTextNode(node: any) {
    return node.nodeType === 3
  }

  // 判读节点是否是元素节点
  isElementNode(node: any) {
    return node.nodeType === 1
  }
}
