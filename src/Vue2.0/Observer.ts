//Observer 的作用是遍历所有的属性，给它们安装上 getter / setter 方法

import { Dep } from "./Dep"


export class Observer {
  constructor(data: any) {
    this.walk(data)
  }
  walk(data: any) {
    // 1. 判断data是否是对象
    if (!data || typeof data !== 'object') {
      return
    }
    // 2.遍历data对象的所有属性
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(obj: any, key: string, val: any) {
    let that = this
    // 负责收集依赖, 并发送通知
    let dep = new Dep()

    // 如果是val对象,把val内部的属性转换成响应式对象
    that.walk(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        console.log(Dep.target)
        return val
      },
      set(newValue) {
        if (newValue === val) {
          return
        }
        val = newValue
        that.walk(newValue)
        // 发送通知
        dep.notify()
      },
    })
  }
}
