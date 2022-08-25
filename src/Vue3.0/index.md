// 一个最简单的响应式
// 在对象被读取时把函数收集到一个“仓库”，在对象的值被设置时触发仓库中的函数。
// 定义一个“仓库”，用于存储触发函数
let store = new Set()
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
    store.forEach(fn => fn())
  }
})






// 定义一个对象
let data = {
  name: 'pino',
  age: 18
}

let nextVal
// 待绑定函数
function effect() {
  // 依赖函数在这里被收集
  // 当调用data.age时，effect函数被收集到“仓库”中
  nextVal = data.age + 1
  console.log(nextVal)
}
// 执行依赖函数
effect() // 19

setTimeout(()=>{
  // 使用proxy进行代理后，使用代理后的对象名
  // 触发设置操作，此时会取出effect函数进行执行
  data_proxy.age++ // 2秒后输出 20
}, 2000)


[](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5a6f1e8b1a94060878cee2cb388ee10~tplv-k3u1fbpfcp-zoom-in-crop-mark%3A3024%3A0%3A0%3A0.awebp)

[](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9f81765c42f4943a82d00a17e27cee5~tplv-k3u1fbpfcp-zoom-in-crop-mark%3A3024%3A0%3A0%3A0.awebp)







问题一

其实上面实现的功能还有很大的缺陷，首先最明显的问题是，我们把effect函数给固定了，如果用户使用的依赖函数不叫effect怎么办，显然我们的功能就不能正常运行了。

所以先来进行第一步的优化：抽离出一个公共方法，依赖函数由用户来传递参数。


let activeEffect // 新增

function effect(fn) {
  // 保存到全局变量activeEffect
  activeEffect = fn // 新增
  // 执行依赖函数
  fn()
}

// 而在get内部只需要收集activeEffect即可
get(target, key) {
  store.add(activeEffect)
  return target[key]
},




问题二
从上面我们定义的对象可以看到，我们的对象data中有两个属性，上面的例子中我们只给age建立了响应式连接，那么如果我现在也想给name建立响应式连接怎么办呢？那好说，那我们直接向“仓库”中继续添加依赖函数不就行了吗。
其实这会带来很严重的问题，由于 “仓库”并没有与被操作的目标属性之间建立联系，而上面我们的实现只是将整个“仓库”遍历了一遍，所以无论哪个属性被触发，都会将“仓库”中所有的依赖函数都取出来执行一遍，因为整个执行程序中可能有很多对象及属性都设置了响应式联系，这将会带来很大的性能浪费。所谓牵一发而动全身，这种结果显然不是我们想要的。



data
       -> name
               -> effectFn

// 如果两个属性读取了同一个依赖函数
data
       -> name
               -> effectFn
       -> age
               -> effectFn

// 如果两个属性读取了不同的依赖函数
data
       -> name
               -> effectFn
       -> age
               -> effectFn1

// 如果是两个不同的对象
data
       -> name
               -> effectFn
       -> age
               -> effectFn1
data2
       -> addr
               -> effectFn



let newObj = new Proxy(obj, {
  // 读取拦截
  get: function (target, propKey) {
  },
  // 设置拦截
  set: function (target, propKey, value) {
  }
});

// 封装为

function reactive(obj) {
  return new Proxy(obj, {
    // 读取拦截
    get: function (target, propKey) {
    },
    // 设置拦截
    set: function (target, propKey, value) {
    }
  });
}              







function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      // 收集依赖
      track(target, key)
      return target[key]
    },
    set(target, key, newVal) {
      target[key] = newVal
      // 触发依赖
      trigger(target, key)
    }
  })
}

function track(target, key) {
  // 如果没有依赖函数，则不需要进行收集。直接return
  if (!activeEffect) return

  // 获取target，也就是对象名，对应上面例子中的data
  let depsMap = store.get(target)
  if (!depsMap) {
    store.set(target, (depsMap = new Map()))
  }
  // 获取对象中的key值，对应上面例子中的name或age
  let deps = depsMap.get(key)

  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  // 收集依赖函数
  deps.add(activeEffect)
}

function trigger(target, key) {
  // 取出对象对应的Map
  let depsMap = store.get(target)
  if(!depsMap) return
  // 取出key所对应的Set
  let deps = depsMap.get(key)
  // 执行依赖函数
  deps && deps.forEach(fn => fn());
}
[](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7c830761e764e60bdda99b8b685844f~tplv-k3u1fbpfcp-zoom-in-crop-mark%3A3024%3A0%3A0%3A0.awebp)



Reflect

function reactive(obj) {
 return new Proxy(obj, {
   get(target, key, receiver) {
     track(target, key)
     // 使用Reflect.get操作读取数据
     return Reflect.get(target, key, receiver)
   },
   set(target, key, value, receiver) {
     trigger(target, key)
     // 使用Reflect.set来操作触发数据
     Reflect.set(target, key, value, receiver)
   }
 })
}


const obj = {
  foo: 1,
  get bar() {
    return this.foo
  }
}

effect(()=>{
  console.log(p.bar) // 1
})

