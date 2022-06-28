// 创建响应式
function reactive(target = {}):any {
  if (typeof target !== 'object' || target == null) {
    // 不是对象或数组，则返回
    return target
  }

  // 代理配置
  const proxyConf = {
    get(target: any, key: string, receiver: any) {
      // target表示原对象 key表示访问的属性名
      // receiver 的确是可以表示代理对象，但是这仅仅是 receiver 代表的一种情况而已
      // receiver 不仅仅代表的是 Proxy 代理对象本身，同时也许他会代表继承 Proxy 的那个对象
      // 只处理本身（非原型的）属性
      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        console.log('get', key) // 监听
      }

      const result = Reflect.get(target, key, receiver)

      // 深度监听
      // 性能如何提升的？
      return reactive(result)
    },
    set(target: any, key: string, val: any, receiver: any) {
      console.log('>>>>', target, receiver)
      // 重复的数据，不处理
      if (val === target[key]) {
        return true
      }

      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        console.log('已有的 key', key)
      } else {
        console.log('新增的 key', key)
      }

      const result = Reflect.set(target, key, val, receiver)
      console.log('set', key, val)
      // console.log('result', result) // true
      return result // 是否设置成功
    },
    deleteProperty(target: any, key: string) {
      const result = Reflect.deleteProperty(target, key)
      console.log('delete property', key)
      // console.log('result', result) // true
      return result // 是否删除成功
    },
  }

  // 生成代理对象
  const observed = new Proxy(target, proxyConf)
  return observed
}

// 测试数据
const data = {
  name: 'zhangsan',
  age: 20,
  info: {
    city: 'beijing',
    a: {
      b: {
        c: {
          d: {
            e: 100,
          },
        },
      },
    },
  },
}

const proxyData = reactive(data)
// proxyData.name = 'lisi'
// proxyData.kkk = "wmc"
// console.log(proxyData)
// delete proxyData.kkk
console.log(proxyData.info.a.b.c.d.e)


export {}