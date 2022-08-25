function effect(fn:Function) {
  // 执行依赖函数
  fn()
}

function reactive(obj: any) {
  return new Proxy(obj, {
    // 读取拦截
    get: function (target, propKey) {
      // 收集依赖函数
      return target[propKey]
    },
    // 设置拦截
    set: function (target, propKey, value) {
      target[propKey] = value
      return true
    },
  })
}

const obj = {
  foo: 1,
  get bar() {
    return this.foo
  },
}

const p = reactive(obj)

console.log(p.bar) // 1

export {}
