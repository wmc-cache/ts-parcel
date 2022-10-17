import VIEW from "./view";

const { reactive, watch } = VIEW;

// 测试数据
let data: any = {
  name: "pino",
  age: 18,
};

let data_proxy = reactive(data);

setTimeout(() => {
  data_proxy.age++;
  data_proxy.age = 333;
}, 2000);

watch(
  function getAge() {
    return data_proxy.age;
  },
  (newValue: number, oldValue: number, onInvalidate: Function) => {
    let expired = false;
    onInvalidate(() => {
      expired = true;
    });
    if (!expired) {
      console.log("watch", data_proxy, newValue, oldValue);
    }
  },
  {
    immediate: true,
  }
);
