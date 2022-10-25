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

const add = computed(() => data_proxy.age + data_proxy.name);

effect(() => {
  //debugger;
  console.log("add", add.value);
});

setTimeout(() => {
  data_proxy.age;
}, 2000);

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
