interface EffectFn {
  deps?: Array<Set<Function>>;
  options?: Options;
}
interface Options {
  scheduler?: Function;
  lazy?: Boolean;
}

//debugger
// 定义仓库
let store = new WeakMap();
// 定义当前处理的依赖函数
let activeEffect: any;

const effectStack: Array<any> = [];

/**
 *
 * @param fn 副作用函数
 */
export function effect(fn: Function, options: Options = {}) {
  // 将操作包装为一个函数
  const effectFn: any = () => {
    cleanup(effectFn);

    activeEffect = effectFn;

    effectStack.push(effectFn);

    const result  = fn();

    effectStack.pop();

    activeEffect = effectStack[effectStack.length - 1];

    return result
  };
  effectFn.options = options;
  //用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];
  if (!options.lazy) {
    effectFn();
  } else {
    return effectFn;
  }
}

function reactive(obj: any) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, newVal, receiver) {
      const result = Reflect.set(target, key, newVal, receiver);
      // 触发依赖
      trigger(target, key);
      return result;
    },
  });
}

// 收集依赖
function track(target: any, key: string | symbol) {
  // 如果没有依赖函数，则不需要进行收集。直接return
  if (!activeEffect) return;

  // 获取target，也就是对象名
  let depsMap = store.get(target);
  if (!depsMap) {
    store.set(target, (depsMap = new Map()));
  }
  // 获取对象中的key值
  let deps = depsMap.get(key);

  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  // 收集依赖函数
  deps.add(activeEffect);

  activeEffect.deps.push(deps);
}

// 触发响应
function trigger(target: any, key: string | symbol) {
  // 取出对象对应的Map
  let depsMap = store.get(target);
  if (!depsMap) return;
  // 取出key所对应的Set
  const effects = depsMap.get(key);

  // 创建一个新的Set来进行执行依赖函数
  let effectsToRun = new Set<Function>(effects);

  effects &&
    effects.forEach((effectFn: any) => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });

  effectsToRun.forEach((effectFn: any) => {
    if (effectFn?.options?.scheduler) {
      effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}

function cleanup(effectFn: any) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

// 测试数据
let data: any = {
  name: "pino",
  age: 18,
};

export let data_proxy = reactive(data);

// effect(() => {
//   const num = data_proxy.age;
//   console.log(num);
// });

setTimeout(() => {
  data_proxy.age++;
  data_proxy.age = 333
}, 2000);

export {};
