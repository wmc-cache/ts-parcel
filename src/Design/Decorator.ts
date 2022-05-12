function log<T extends { new (...arg: any): any }>(FA: T) {
  class coding extends FA {
    constructor(...args: any) {
      super(...args)
      console.log('Coding')
    }
  }
  return coding
}

function log2(target: any, key: string, describe: any) {
  const oldFn = describe.value
  describe.value = () => {
    console.log('前置拦截')
    oldFn()
    console.log('后置拦截')
  }
}

@log
class code {
  constructor() {
    console.log('constructor')
  }
  @log2
  getName() {
    console.log('name')
    //return 'name'
  }
}

const co = new code()
co.getName()
