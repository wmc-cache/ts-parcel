// 定义仓库
let store = new WeakMap()
// 定义当前处理的依赖函数
let activeEffect:any

function effect(fn:Function) {
  // 将操作包装为一个函数
  const effectFn = () => {
    activeEffect = effectFn
    fn()
  }
  effectFn()
}

function reactive(obj:any) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key as string)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newVal, receiver) {
      // 触发依赖
      trigger(target, key as string)
      Reflect.set(target, key, newVal, receiver)
      return true
    },
  })
}

// 收集依赖
function track(target:any, key:string) {
  // 如果没有依赖函数，则不需要进行收集。直接return
  if (!activeEffect) return

  // 获取target，也就是对象名
  let depsMap = store.get(target)
  if (!depsMap) {
    store.set(target, (depsMap = new Map()))
  }
  // 获取对象中的key值
  let deps = depsMap.get(key)

  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  // 收集依赖函数
  deps.add(activeEffect)
}


// 触发响应
function trigger(target:any, key:string) {
  // 取出对象对应的Map
  let depsMap = store.get(target)
  if (!depsMap) return
  // 取出key所对应的Set
  const effects = depsMap.get(key)
  // 执行依赖函数
  // 为避免污染，创建一个新的Set来进行执行依赖函数
  let effectsToRun = new Set<Function>()

  effects &&
    effects.forEach((effectFn:Function) => {
      effectsToRun.add(effectFn)
    })

  effectsToRun.forEach((effect) => effect())
}


