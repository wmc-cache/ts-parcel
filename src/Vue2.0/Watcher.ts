import { Dep } from './Dep'

export class Watcher {
  private oldValue: any
  constructor(
    private vm: any,
    private key: string,
    private cb: (...arg: any[]) => void
  ) {
    // 把Watcher对象变化的时候更新视图
    Dep.target = this
    console.log('Dep.target', Dep.target)
    // 触发get方法, 在get方法中调用addSub
    this.oldValue = vm[key]
    Dep.target = null
  }
  // 当数据发生变化的时候更新视图
  update() {
    let newValue = this.vm[this.key]
    // 判断新值和旧值是否相等
    if (this.oldValue === newValue) {
      return
    }
    this.cb(newValue)
  }
}
