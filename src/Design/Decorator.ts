function log<T extends { new (...arg: any): any }>(FA: T) {
  class coding extends FA {
    constructor(...args: any) {
      super(...args)
      console.log('Coding')
    }
  }
  return coding
}

@log
class code {
  constructor() {
    console.log('constructor')
  }
}

//new code()
