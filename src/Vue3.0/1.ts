// 一个最简单的响应式
// 在对象被读取时把函数收集到一个“仓库”，在对象的值被设置时触发仓库中的函数。
// let nextVal
let data: any = {
  name: 'pino',
  age: 18,
}
function effect() {
  // 依赖函数在这里被收集
  // 当调用data.age时，effect函数被收集到“仓库”中
  console.log(data.age)
}
let store = new Set<Function>()
// 使用proxy进行代理
let data_proxy = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 收集依赖函数
    store.add(effect)
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newVal) {
    target[key] = newVal
    // 取出所有的依赖函数，执行
    store.forEach((fn) => fn())
    return true
  },
})
setTimeout(()=>{
  // 使用proxy进行代理后，使用代理后的对象名
  // 触发设置操作，此时会取出effect函数进行执行
  data_proxy.age++ // 2秒后输出 19
}, 2000)

export {}
