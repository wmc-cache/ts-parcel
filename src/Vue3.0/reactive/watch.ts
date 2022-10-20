import { effect } from "./effect";

interface Options {
  immediate?: Boolean;
}

export function watch(source: any, cb: Function, options?: Options) {
  let getter: any;
  if (typeof source === "function") {
    getter = source;
  } else {
    //todo
  }

  let oldValue: any;
  let newValue: any;
  let cleanup: any;

  function scheduler(fn?: Function) {
    newValue = effectFn();
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
    oldValue = effectFn();
  }
}
