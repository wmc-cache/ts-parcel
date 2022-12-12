// 动态代理就是，在程序运行期，创建目标对象的代理对象，并对目标对象中的方法进行功能性增强的一种技术。
// 在生成代理对象的过程中，目标对象不变，代理对象中的方法是目标对象方法的增强方法。
// 可以理解为运行期间，对象中方法的动态拦截，在拦截方法的前后执行功能操作

interface ConfigType {
  message: string
}

type Fun = (value: ConfigType) => ConfigType

interface InterceptorObj {
  resolved: Fun;
  rejected?: Fun
}

type InterceptorFun = (resolved: Fun, rejected?: Fun) => void

interface AxiosType {
  interceptors: {
    request: Array<InterceptorObj>;
    response: Array<InterceptorObj>;
  };
  useRequestInterceptor: InterceptorFun;
  useResponseInterceptor: InterceptorFun;
  run: (config: ConfigType) => Promise<ConfigType>;
}

class Axios implements AxiosType {
  interceptors: {
    request: Array<InterceptorObj>;
    response: Array<InterceptorObj>;
  };
  constructor() {
    this.interceptors = {
      request: [],
      response: [],
    };
  }
  // 注册请求拦截器
  useRequestInterceptor(resolved: Fun, rejected?: Fun) {
    this.interceptors?.request.push({ resolved, rejected });
  }
  // 注册响应拦截器
  useResponseInterceptor(resolved: Fun, rejected?: Fun) {
    this.interceptors?.response.push({ resolved, rejected });
  }

  run(config: ConfigType) {
    const chain: Array<InterceptorObj> = [];

    // 把请求拦截器往数组头部推
    this.interceptors?.request.forEach((interceptor: InterceptorObj) => {
      chain.unshift(interceptor);
    });

    // 把响应拦截器往数组尾部推
    this.interceptors?.response.forEach((interceptor: InterceptorObj) => {
      chain.push(interceptor);
    });

    // 把config也包装成一个promise
    let promise = Promise.resolve(config);

    // 暴力while循环解忧愁
    // 利用promise.then的能力递归执行所有的拦截器
    while (chain.length > 0) {
      const current = chain.shift()
      // const { resolved, rejected } = current;
      promise = promise.then(current?.resolved, current?.rejected);
    }
    // 最后暴露给用户的就是响应拦截器处理过后的promise
    return promise;
  }
}

// 测试代码
const axios = new Axios();

axios.useRequestInterceptor((config: ConfigType) => {
  config.message += "**请求拦截器1处理**";
  return {
    ...config,
  };
});

axios.useRequestInterceptor((config: ConfigType) => {
  config.message += "**请求拦截器2处理**";
  return {
    ...config,
  };
});

axios.useResponseInterceptor((resp: ConfigType) => {
  resp.message += "**响应拦截器1处理**";
  return { ...resp };
});

axios.useResponseInterceptor((resp: ConfigType) => {
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

export { };
