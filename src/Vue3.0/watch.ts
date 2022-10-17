import { effect, data_proxy } from "./effect";

export function watch(source: any, cb: Function) {
  let getter: any;
  if (typeof source === "function") {
    getter = source;
  } else {
    //todo
  }
  let oldValue: any;
  let newValue: any;
  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler() {
      newValue = effectFn();
      cb(newValue, oldValue);
      oldValue = newValue;
    },
  });
  oldValue = effectFn();
}
//debugger
watch(
  function getAge(){
    return data_proxy.age
  },
  (newValue: number, oldValue: number) => {
    console.log("watch", data_proxy, newValue, oldValue);
  }
);
