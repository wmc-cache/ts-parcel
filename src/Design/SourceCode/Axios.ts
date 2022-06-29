interface Axios {
  useRequestInterceptor?: (resolved: Function, rejected?: Function) => void
  useResponseInterceptor?: (resolved: Function, rejected?: Function) => void
  run: (config: any) => Promise<any>
  interceptors?: {
    request: Array<{ resolved: Function; rejected?: Function }>
    response: Array<{ resolved: Function; rejected?: Function }>
  }
}

const run = (config: any) => {
    const chain: any = [
      {
        resolved: axios,
        rejected: undefined,
      },
    ]

    // 把请求拦截器往数组头部推
    axios.interceptors?.request.forEach((interceptor: any) => {
      chain.unshift(interceptor)
    })

    // 把响应拦截器往数组尾部推
    axios.interceptors?.response.forEach((interceptor: any) => {
      chain.push(interceptor)
    })

    // 把config也包装成一个promise
    let promise = Promise.resolve(config)

    // 暴力while循环解忧愁
    // 利用promise.then的能力递归执行所有的拦截器
    while (chain.length) {
      const { resolved, rejected } = chain.shift()
      promise = promise.then(resolved, rejected)
    }

    // 最后暴露给用户的就是响应拦截器处理过后的promise
    return promise
}

export let axios: Axios = {
  run
}

// 先构造一个对象 存放拦截器
axios.interceptors = {
  request: [],
  response: [],
}

// 注册请求拦截器
axios.useRequestInterceptor = (resolved: Function, rejected?: Function) => {
  axios.interceptors?.request.push({ resolved, rejected })
}

// 注册响应拦截器
axios.useResponseInterceptor = (resolved: Function, rejected?: Function) => {
  axios.interceptors?.response.push({ resolved, rejected })
}

axios.useRequestInterceptor((config: any) => {
  return {
    ...config,
    extraParams1: 'useRequestInterceptor1',
  }
})

axios.useRequestInterceptor((config: any) => {
  return {
    ...config,
    extraParams2: 'useRequestInterceptor2',
  }
})

axios.useResponseInterceptor(
  (resp: any) => {
    return { ...resp, axios: 'axios' }
  },
  (error: any) => {
    console.log('error', error)
  }
)

async function request() {
  const result = await axios.run({
    message: 'message1',
  })
  console.log('result1: ', result)
}

request()
