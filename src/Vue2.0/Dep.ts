//Dep 的角色，宛如一个“工具人”，它是 Watcher 和 Observer 之间的纽带，是“通信兵”

export class Dep {
  constructor(private subs: any[] = []) {}
  // 存储所有的观察者
  static target: any
  // 添加观察者
  addSub(sub: any) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  // 发送通知
  notify() {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
