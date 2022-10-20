import { effect } from "./effect";

/**
 * 计算属性
 * @param getter
 * @returns
 */
export function computed(getter: Function) {
  let value: any;

  let dirty = true;

  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true;
    },
  });

  const obj = {
    get value() {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      return value;
    },
  };

  return obj;
}





