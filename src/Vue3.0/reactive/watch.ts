import { effect } from "./effect";

interface Options {
  immediate?: Boolean;
}

export function watch(source: any, cb: Function, options?: Options) {
  let getter: any;
  if (typeof source === "function") {
    getter = source();                                                                                                                                                               cvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv 
  } else {
    getter = () => traverse(source);
  }

  let oldValue: any;
  let newValue: any;
  let cleanup: any;

  function scheduler(fn?: Function) {
    newValue = effectFn?.();
    if (cleanup) cleanup();
    cb(newValue, oldValue, onInvalidate);
    oldValue = newValue;
  }

  function onInvalidate(fn: Function) {
    cleanup = fn;
  }

  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler,
  });

  if (options?.immediate) {
    scheduler();
  } else {
    oldValue = effectFn?.();
  }
}

function traverse(value: any, seen = new Set()) {
  // 如果要读取的数据是原始值，或者已经被读取过了，那么什么都不做
  if (typeof value !== "object" || value === null || seen.has(value)) return;
  // 将数据添加到 seen 中，代表遍历地读取过了，避免循环引用引起的死循环
  seen.add(value);
  // 暂时不考虑数组等其他结构
  // 假设 value 就是一个对象，使用 for...in 读取对象的每一个值，并递归地调用 traverse 进行处理
  for (const k in value) {
    traverse(value[k], seen);
  }
  return value;
}
