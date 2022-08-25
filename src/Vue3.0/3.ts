// function reactive(obj) {
//   return new Proxy(obj, {
//     get(target, key) {
//       // 收集依赖
//       track(target, key)
//       return target[key]
//     },
//     set(target, key, newVal) {
//       target[key] = newVal
//       // 触发依赖
//       trigger(target, key)
//     },
//   })
// }

// function track(target, key) {
//   // 如果没有依赖函数，则不需要进行收集。直接return
//   if (!activeEffect) return

//   // 获取target，也就是对象名，对应上面例子中的data
//   let depsMap = store.get(target)
//   if (!depsMap) {
//     store.set(target, (depsMap = new Map()))
//   }
//   // 获取对象中的key值，对应上面例子中的name或age
//   let deps = depsMap.get(key)

//   if (!deps) {
//     depsMap.set(key, (deps = new Set()))
//   }
//   // 收集依赖函数
//   deps.add(activeEffect)
// }

// function trigger(target, key) {
//   // 取出对象对应的Map
//   let depsMap = store.get(target)
//   if (!depsMap) return
//   // 取出key所对应的Set
//   let deps = depsMap.get(key)
//   // 执行依赖函数
//   deps && deps.forEach((fn) => fn())
// }
