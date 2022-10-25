interface Options {
  scheduler?: Function;
  lazy?: Boolean;
}

// 定义仓库
let store = new WeakMap(); //WeakMap经常用于key所引用的对象没有被回收才有价值的信息
// 定义当前处理的依赖函数
let activeEffect: any;

const effectStack: Array<Function> = [];

const ITERATE_KEY = Symbol();

/**
 *
 * @param fn 副作用函数(原本)
 */
export function effect(fn: Function, options: Options = {}) {
  // 将操作包装为一个函数
  const effectFn: any = () => {
    cleanup(effectFn);

    activeEffect = effectFn;

    effectStack.push(effectFn);

    const result = fn();

    effectStack.pop();

    activeEffect = effectStack[effectStack.length - 1];

    return result;
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

export function reactive(obj: any, isShallow = false): any {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 收集依赖
      console.log("get>>>>>");
      track(target, key);

      const result = Reflect.get(target, key, receiver);

      if (isShallow) {
        return result;
      }

      if (typeof result === "object" && result !== null) {
        return reactive(result);
      }
      return result;
    },
    has(target, key) {
      console.log("has>>>>>");
      // 收集依赖
      track(target, key);

      return Reflect.has(target, key);
    },
    ownKeys(target) {
      console.log("ownKeys>>>>>");
      // 收集依赖
      track(target, ITERATE_KEY);

      return Reflect.ownKeys(target);
    },
    deleteProperty(target, key) {
      console.log("delete>>>>>");
      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      const result = Reflect.deleteProperty(target, key);
      if (hadKey && result) {
        trigger(target, key, "DELETE");
      }
      return result;
    },
    set(target, key, newVal, receiver) {
      console.log("set>>>>>");
      const type = Object.prototype.hasOwnProperty.call(target, key)
        ? "SET"
        : "ADD";

      const oldVal = target[key];

      const result = Reflect.set(target, key, newVal, receiver);

      if (oldVal !== newVal) {
        // 触发依赖
        trigger(target, key, type);
      }
      return result;
    },
  });
}

/**
 * 收集依赖
 * @param target
 * @param key
 * @returns
 */
export function track(target: any, key: string | symbol) {
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

/**
 * 触发响应
 * @param target
 * @param key
 * @returns
 */
export function trigger(target: any, key: string | symbol, type = "") {
  // 取出对象对应的Map
  let depsMap = store.get(target);
  if (!depsMap) return;
  // 取出key所对应的Set
  const effects = depsMap.get(key);

  // 创建一个新的Set来进行执行依赖函数 避免无限循环
  let effectsToRun = new Set<Function>();

  effects &&
    effects.forEach((effectFn: any) => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });
  if (type === "ADD" || type === "DELETE") {
    const iterateEffects = depsMap.get(ITERATE_KEY);
    iterateEffects &&
      iterateEffects.forEach((effectFn: any) => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn);
        }
      });
  }
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

export {};
