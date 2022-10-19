interface AxiosType {
  interceptors: {
    request: Array<{ resolved: Function; rejected?: Function }>;
    response: Array<{ resolved: Function; rejected?: Function }>;
  };
  useRequestInterceptor: (resolved: Function, rejected?: Function) => void;
  useResponseInterceptor: (resolved: Function, rejected?: Function) => void;
  run: (config: any) => Promise<any>;
}

class Axios implements AxiosType {
  interceptors: {
    request: Array<{ resolved: Function; rejected?: Function }>;
    response: Array<{ resolved: Function; rejected?: Function }>;
  };
  constructor() {
    this.interceptors = {
      request: [],
      response: [],
    };
  }
  // 注册请求拦截器
  useRequestInterceptor(resolved: Function, rejected?: Function) {
    this.interceptors?.request.push({ resolved, rejected });
  }
  // 注册响应拦截器
  useResponseInterceptor(resolved: Function, rejected?: Function) {
    this.interceptors?.response.push({ resolved, rejected });
  }

  run(config: any) {
    const chain: any = [
      // {
      //   resolved: this,
      //   rejected: undefined,
      // },
    ];

    // 把请求拦截器往数组头部推
    this.interceptors?.request.forEach((interceptor: any) => {
      chain.unshift(interceptor);
    });

    // 把响应拦截器往数组尾部推
    this.interceptors?.response.forEach((interceptor: any) => {
      chain.push(interceptor);
    });

    // 把config也包装成一个promise
    let promise = Promise.resolve(config);

    // 暴力while循环解忧愁
    // 利用promise.then的能力递归执行所有的拦截器
    while (chain.length) {
      const { resolved, rejected } = chain.shift();
      console.log(typeof resolved, resolved, rejected);
      promise = promise.then(resolved, rejected);
    }

    // 最后暴露给用户的就是响应拦截器处理过后的promise
    return promise;
  }
}

// 测试代码
const axios = new Axios();

axios.useRequestInterceptor((config: any) => {
  config.message += "**请求拦截器1处理**";
  return {
    ...config,
  };
});

axios.useRequestInterceptor((config: any) => {
  config.message += "**请求拦截器2处理**";
  return {
    ...config,
  };
});

axios.useResponseInterceptor((resp: any) => {
  resp.message += "**响应拦截器1处理**";
  return { ...resp };
});

axios.useResponseInterceptor((resp: any) => {
  resp.message += "**响应拦截器2处理**";
  return { ...resp };
});

function request() {
  const result = axios
    .run({
      message: "原始发送信息",
    })
    .then((res) => {
      console.log(res);
    });
  console.log("result: ", result);
}

request();

export {};
