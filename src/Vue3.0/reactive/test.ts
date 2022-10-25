import VIEW from "./view";

const { reactive, watch, computed, effect } = VIEW;

// 测试数据
let data: any = {
  name: "pino",
  age: 18,
  hidden: {
    realAge: 88,
  },
};

let data_proxy = reactive(data);

effect(() => {
  console.log(data_proxy.name)
});

setTimeout(() => {
  data_proxy.name = 'wmc'
}, 2000);

// const add = computed(() => data_proxy.age + data_proxy.name);

// watch(
//   () => data_proxy.hidden.realAge,
//   (newValue: number, oldValue: number, onInvalidate: Function) => {
//     // let expired = false;
//     // onInvalidate(() => {
//     //   expired = true;
//     // });
//     // if (!expired) {
//     //   console.log("watch", data_proxy, newValue, oldValue);
//     // }
//     console.log("watch", data_proxy, newValue, oldValue);
//   },
//   {
//     immediate: true,
//   }
// );











